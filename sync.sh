#!/usr/bin/env bash
# Sync this directory to https://github.com/sensingschool/sensingschool.github.io
#
# Usage: ./sync.sh ["optional commit message"]
#
# First run initializes the repo, sets the remote, and pushes to main.
# Subsequent runs commit any changes and push.

set -euo pipefail

REMOTE_URL="https://github.com/sensingstudio/sensingstudio.github.io.git"
BRANCH="main"
MSG="${1:-Update site $(date +%Y-%m-%dT%H:%M:%S)}"

cd "$(dirname "$0")"

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init -b "$BRANCH"
  git remote add origin "$REMOTE_URL"
else
  if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$REMOTE_URL"
  else
    current="$(git remote get-url origin)"
    if [ "$current" != "$REMOTE_URL" ]; then
      echo "Updating origin: $current -> $REMOTE_URL"
      git remote set-url origin "$REMOTE_URL"
    fi
  fi
fi

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$MSG"
fi

echo "Pushing to $REMOTE_URL ($BRANCH)..."
git push -u origin "$BRANCH"
echo "Done."
