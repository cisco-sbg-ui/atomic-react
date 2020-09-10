#!/bin/sh
# Credit: https://gist.github.com/willprice/e07efd73fb7f13f917ea

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_snapshots() {
  git checkout build/add-travis
  git add -A
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "test: update snapshots" -m "[skip ci]"
}

push_files() {
  # Add new "origin" with access token in the git URL for authentication
  git remote set-url origin https://frattaro:${GH_TOKEN}@github.com/threatgrid/atomic-react > /dev/null 2>&1
  git push origin build/add-travis --quiet
}

setup_git

commit_snapshots

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed snapshots exists. Uploading to GitHub"
  push_files
else
  echo "No changes to snapshots. Nothing to do"
fi
