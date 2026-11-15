#!/usr/bin/env python3
"""Lernlabor-Sicherung: komplettes Git-Repo (alle Branches, Tags, PR-Stände) als
git bundle plus Export aller Pull Requests (Titel, Beschreibung, Kommentare,
Reviews, Commits, Diff) als Markdown/JSON. Ergebnis: eine ZIP-Datei.

Aufruf (in einer Claude-Sitzung mit gh-Zugang):
    python3 werkzeug/backup.py   (im Repo-Ordner)

Ablage (Ordner /mnt/project-files/backup/):
    laufend/    jede Sicherung, die letzten 30 bleiben
    monatlich/  je Monat eine Dauerkopie (immer die neueste des Monats)
    AKTUELL/    die neueste Sicherung unter festem Namen
Kein Token, kein Passwort landet im Archiv (wird am Ende geprüft).
"""
from zoneinfo import ZoneInfo
import datetime, hashlib, json, os, re, shutil, subprocess, sys, tempfile, zipfile

REPO = os.environ.get("BACKUP_REPO", "bam01872/Meisterlabor")
ZIEL = os.environ.get("BACKUP_ZIEL", "/mnt/project-files/backup")
BEHALTEN = 30
GEHEIM = re.compile(rb"(gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY)")


def run(*cmd, cwd=None, roh=False):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True)
    if r.returncode:
        sys.exit("FEHLER bei %s:\n%s" % (" ".join(cmd), r.stderr.decode(errors="replace")))
    return r.stdout if roh else r.stdout.decode()


def api(pfad, diff=False):
    if diff:
        return run("gh", "api", "-H", "Accept: application/vnd.github.diff", pfad, roh=True)
    if "?" in pfad:  # Listen: alle Seiten holen
        return json.loads(run("gh", "api", "--paginate", "--slurp", pfad))
    return json.loads(run("gh", "api", pfad))


def flach(x):
    # --slurp liefert eine Liste von Seiten
    if isinstance(x, list) and x and isinstance(x[0], list):
        return [e for s in x for e in s]
    return x


def wer(o):
    return (o or {}).get("login", "?")


def pr_markdown(p, kommentare, review_k, reviews, commits):
    z = ["# PR #%d: %s" % (p["number"], p["title"]), ""]
    status = "gemergt am %s" % p["merged_at"] if p.get("merged_at") else ("offen" if p["state"] == "open" else "geschlossen ohne Merge")
    z += ["- Status: %s" % status,
          "- Branch: `%s` → `%s`" % (p["head"]["ref"], p["base"]["ref"]),
          "- Head-Commit: `%s`" % p["head"]["sha"],
          "- Merge-Commit: `%s`" % (p.get("merge_commit_sha") or "-"),
          "- Erstellt: %s von %s" % (p["created_at"], wer(p["user"])),
          "- Geändert: +%s / −%s Zeilen in %s Dateien" % (p.get("additions"), p.get("deletions"), p.get("changed_files")),
          "", "## Beschreibung", "", p.get("body") or "_(leer)_", ""]
    if commits:
        z += ["## Commits", ""] + ["- `%s` %s" % (c["sha"][:8], c["commit"]["message"].splitlines()[0]) for c in commits] + [""]
    if reviews:
        z += ["## Reviews", ""]
        for r in reviews:
            z += ["### %s – %s (%s)" % (wer(r["user"]), r["state"], r.get("submitted_at")), "", r.get("body") or "", ""]
    if kommentare:
        z += ["## Kommentare", ""]
        for k in kommentare:
            z += ["### %s am %s" % (wer(k["user"]), k["created_at"]), "", k.get("body") or "", ""]
    if review_k:
        z += ["## Zeilenkommentare", ""]
        for k in review_k:
            z += ["### %s zu `%s` Zeile %s (%s)" % (wer(k["user"]), k.get("path"), k.get("line") or k.get("original_line"), k["created_at"]), "", k.get("body") or "", ""]
    z += ["## Änderungen", "", "Siehe `PR-%04d.diff` im selben Ordner." % p["number"], ""]
    return "\n".join(z)


def main():
    jetzt = datetime.datetime.now(ZoneInfo("Europe/Berlin"))
    tmp = tempfile.mkdtemp(prefix="llbackup-")
    spiegel = os.path.join(tmp, "spiegel.git")
    inhalt = os.path.join(tmp, "inhalt")
    os.makedirs(os.path.join(inhalt, "pull-requests"))

    # 1) Kompletter Spiegel: alle Branches, Tags und refs/pull/* (PR-Stände, auch wenn der Branch gelöscht ist)
    print("Klone Spiegel von", REPO)
    run("git", "clone", "--quiet", "--mirror", "https://github.com/%s" % REPO, spiegel)
    main_sha = run("git", "rev-parse", "main", cwd=spiegel).strip()
    html = run("git", "show", "main:index.html", cwd=spiegel)
    appv = (re.search(r"APPV=(\d+)", html) or [None, "x"])[1]
    name = "lernlabor-backup-v%s-%s" % (appv, jetzt.strftime("%Y-%m-%d-%H%M"))

    bundle = os.path.join(inhalt, "lernlabor.bundle")
    run("git", "bundle", "create", "--quiet", bundle, "--all", cwd=spiegel)
    run("git", "bundle", "verify", "--quiet", bundle, cwd=spiegel)
    refs = run("git", "for-each-ref", "--format=%(objectname:short) %(refname)", cwd=spiegel).splitlines()

    # 1b) Versionsverlauf von main (lesbar)
    log = run("git", "log", "main", "--date=format:%d.%m.%Y %H:%M", "--format=| %ad | `%h` | %s |", cwd=spiegel)
    with open(os.path.join(inhalt, "VERSIONEN.md"), "w", encoding="utf-8") as f:
        f.write("# Versionsverlauf (main)\n\nNeueste zuerst. Repository https://github.com/%s, App live: https://bam01872.github.io/Lernlabor/\n\n| Datum | Commit | Änderung |\n|---|---|---|\n%s" % (REPO, log))

    # 2) App-Stand von main als normale Dateien (zum direkten Öffnen ohne Git)
    run("git", "archive", "--format=zip", "--prefix=app-main/", "-o", os.path.join(inhalt, "app-main.zip"), "main", cwd=spiegel)

    # 3) Alle Pull Requests
    prs = flach(api("repos/%s/pulls?state=all&per_page=100" % REPO))
    print("Exportiere", len(prs), "Pull Requests")
    uebersicht = ["# Pull Requests von %s" % REPO, "", "Stand %s" % jetzt.strftime("%d.%m.%Y %H:%M"), "",
                  "| Nr. | Titel | Status | Datum |", "|---|---|---|---|"]
    for kurz in sorted(prs, key=lambda p: p["number"]):
        n = kurz["number"]
        p = api("repos/%s/pulls/%d" % (REPO, n))
        kom = flach(api("repos/%s/issues/%d/comments?per_page=100" % (REPO, n)))
        rk = flach(api("repos/%s/pulls/%d/comments?per_page=100" % (REPO, n)))
        rv = flach(api("repos/%s/pulls/%d/reviews?per_page=100" % (REPO, n)))
        cm = flach(api("repos/%s/pulls/%d/commits?per_page=100" % (REPO, n)))
        diff = api("repos/%s/pulls/%d" % (REPO, n), diff=True)
        basis = os.path.join(inhalt, "pull-requests", "PR-%04d" % n)
        with open(basis + ".json", "w", encoding="utf-8") as f:
            json.dump({"pr": p, "kommentare": kom, "zeilenkommentare": rk, "reviews": rv, "commits": cm}, f, ensure_ascii=False, indent=1)
        with open(basis + ".md", "w", encoding="utf-8") as f:
            f.write(pr_markdown(p, kom, rk, rv, cm))
        with open(basis + ".diff", "wb") as f:
            f.write(diff)
        st = "gemergt" if p.get("merged_at") else p["state"]
        uebersicht.append("| [#%d](PR-%04d.md) | %s | %s | %s |" % (n, n, p["title"].replace("|", "/"), st, (p.get("merged_at") or p["created_at"])[:10]))
    with open(os.path.join(inhalt, "pull-requests", "UEBERSICHT.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(uebersicht) + "\n")

    # 4) Issues (ohne PRs), falls vorhanden
    iss = [i for i in flach(api("repos/%s/issues?state=all&per_page=100" % REPO)) if "pull_request" not in i]
    if iss:
        with open(os.path.join(inhalt, "issues.json"), "w", encoding="utf-8") as f:
            json.dump(iss, f, ensure_ascii=False, indent=1)

    # 5) Beipackzettel
    sha = hashlib.sha256(open(bundle, "rb").read()).hexdigest()
    info = ["# Lernlabor-Sicherung %s" % name, "",
            "- Erstellt: %s" % jetzt.strftime("%d.%m.%Y %H:%M"),
            "- Repository: https://github.com/%s" % REPO,
            "- App-Version auf main: v%s (Commit `%s`)" % (appv, main_sha),
            "- Pull Requests: %d, Issues: %d" % (len(prs), len(iss)),
            "- SHA-256 von lernlabor.bundle: `%s`" % sha, "",
            "## Inhalt", "",
            "- `lernlabor.bundle`: das komplette Git-Repository (alle Branches, Tags, PR-Stände, ganze Historie).",
            "- `VERSIONEN.md`: alle Versionen von main mit Datum und Änderung.",
            "- `app-main.zip`: die App auf dem Stand von main als normale Dateien.",
            "- `pull-requests/`: je PR eine lesbare `.md`, die Rohdaten `.json` und die Änderungen `.diff`; Übersicht in `UEBERSICHT.md`.", "",
            "## Wiederherstellen", "",
            "```", "git clone lernlabor.bundle lernlabor", "cd lernlabor",
            "git remote set-url origin https://github.com/<neues-konto>/<neues-repo>",
            "git push origin --all", "```", "",
            "PR-Stände liegen im Bundle unter `refs/pull/<Nr>/head` und lassen sich mit",
            "`git fetch ../lernlabor.bundle 'refs/pull/*:refs/remotes/pr/*'` holen.", "",
            "## Enthaltene Referenzen", "", "```"] + refs + ["```", ""]
    with open(os.path.join(inhalt, "LIESMICH.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(info))

    # 6) Geheimnis-Prüfung über alle Textdateien
    for wurzel, _, dateien in os.walk(inhalt):
        for d in dateien:
            if d.endswith((".md", ".json", ".diff")) and GEHEIM.search(open(os.path.join(wurzel, d), "rb").read()):
                sys.exit("ABBRUCH: mögliches Geheimnis in %s" % d)

    # 7) Zippen und ablegen
    for o in ("laufend", "monatlich", "AKTUELL"):
        os.makedirs(os.path.join(ZIEL, o), exist_ok=True)
    zipf = os.path.join(ZIEL, "laufend", name + ".zip")
    with zipfile.ZipFile(zipf + ".tmp", "w", zipfile.ZIP_DEFLATED) as z:
        for wurzel, _, dateien in os.walk(inhalt):
            for d in sorted(dateien):
                v = os.path.join(wurzel, d)
                z.write(v, os.path.join(name, os.path.relpath(v, inhalt)))
    os.replace(zipf + ".tmp", zipf)
    shutil.copyfile(zipf, os.path.join(ZIEL, "monatlich", "lernlabor-backup-%s.zip" % jetzt.strftime("%Y-%m")))
    shutil.copyfile(zipf, os.path.join(ZIEL, "AKTUELL", "lernlabor-backup-aktuell.zip"))
    lauf = os.path.join(ZIEL, "laufend")
    alle = sorted((f for f in os.listdir(lauf) if f.endswith(".zip")), key=lambda f: os.path.getmtime(os.path.join(lauf, f)))
    for alt in alle[:-BEHALTEN] if len(alle) > BEHALTEN else []:
        os.remove(os.path.join(ZIEL, "laufend", alt))
    with open(os.path.join(ZIEL, "protokoll.txt"), "a", encoding="utf-8") as f:
        f.write("%s  v%s  main %s  %d PRs  %s\n" % (jetzt.strftime("%Y-%m-%d %H:%M"), appv, main_sha[:8], len(prs), name + ".zip"))
    shutil.rmtree(tmp)
    print("OK", zipf, "%.1f MB" % (os.path.getsize(zipf) / 1e6))


if __name__ == "__main__":
    main()
