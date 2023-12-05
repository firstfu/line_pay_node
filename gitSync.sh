#!/bin/bash

## Git同步script

echo "+++++++++++++++++++++++ Start +++++++++++++++++++++++"

git fetch --all
# origin/master 是你需要同步的分支，這裡是同步遠端分支main
git reset --hard origin/main
# git reset --hard origin/develop
git pull

echo "+++++++++++++++++++++++ END +++++++++++++++++++++++"
