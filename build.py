#!/usr/bin/env python3
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "dist"

ROUTES = {
    "index.html": "",
    "technology.html": "technology",
    "design.html": "design",
    "company.html": "company",
    "beta.html": "beta",
    "journal.html": "journal",
    "journal-hello-halo.html": "journal/hello-halo",
    "privacy.html": "legal/privacy",
    "terms.html": "legal/terms",
    "404.html": "404",
}


def load(name: str) -> str:
    return (SRC / "partials" / name).read_text()


def inject(template: str, *, title: str, path_prefix: str) -> str:
    head = load("head.html").replace("{{title}}", title).replace("{{prefix}}", path_prefix)
    header = load("header.html").replace("{{prefix}}", path_prefix)
    footer = load("footer.html").replace("{{prefix}}", path_prefix)
    scripts = load("scripts.html").replace("{{prefix}}", path_prefix)
    html = template
    html = html.replace("{{head}}", head)
    html = html.replace("{{header}}", header)
    html = html.replace("{{footer}}", footer)
    html = html.replace("{{scripts}}", scripts)
    html = html.replace("{{prefix}}", path_prefix)
    return html


def title_for(name: str) -> str:
    mapping = {
        "index.html": "Halo — The quiet housemate",
        "technology.html": "Technology — Northlane",
        "design.html": "Design — Northlane",
        "company.html": "Company — Northlane",
        "beta.html": "Beta — Northlane",
        "journal.html": "Journal — Northlane",
        "journal-hello-halo.html": "Hello Halo — Journal",
        "privacy.html": "Privacy — Northlane",
        "terms.html": "Terms — Northlane",
        "404.html": "Not found — Northlane",
    }
    return mapping[name]


def prefix_for(subdir: str) -> str:
    if not subdir or subdir == "404":
        return "."
    depth = subdir.count("/") + 1
    return "/".join([".."] * depth)


def copy_static():
    for folder in ("css", "js", "assets"):
        src, dst = SRC / folder, DIST / folder
        if src.exists():
            if dst.exists():
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
    for name in ("robots.txt", ".nojekyll"):
        p = ROOT / name
        if p.exists():
            shutil.copy2(p, DIST / name)


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    for fname, subdir in ROUTES.items():
        tpl_path = SRC / "templates" / fname
        if not tpl_path.exists():
            continue
        prefix = prefix_for(subdir)
        html = inject(tpl_path.read_text(), title=title_for(fname), path_prefix=prefix)
        if subdir == "404":
            out = DIST / "404.html"
        elif not subdir:
            out = DIST / "index.html"
        else:
            out_dir = DIST / subdir
            out_dir.mkdir(parents=True, exist_ok=True)
            out = out_dir / "index.html"
        out.write_text(html)
        print("wrote", out.relative_to(ROOT))
    copy_static()
    print("build ok")


if __name__ == "__main__":
    main()
