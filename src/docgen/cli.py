import argparse
import sys
from pathlib import Path

from .errors import DocgenError
from .pipeline import build


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="docgen", description="Build Markdown publications.")
    subparsers = parser.add_subparsers(dest="command", required=True)
    build_parser = subparsers.add_parser("build", help="Build a publication project.")
    build_parser.add_argument(
        "project", type=Path, help="Path to a project containing publication.yml"
    )
    build_parser.add_argument(
        "--profile", type=Path, help="Use a read-only publication profile outside the project root."
    )
    args = parser.parse_args(argv)
    try:
        result = build(args.project, args.profile)
    except DocgenError as error:
        print(f"docgen: error: {error}", file=sys.stderr)
        return 2
    print(f"Built {result.output_dir}")
    for warning in result.warnings:
        print(f"docgen: warning: {warning}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
