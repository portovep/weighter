#!/bin/bash

set -xe

ENVIRONMENT=${1:-staging}

# create target remote
git remote add target-remote https://git.heroku.com/weighter-${ENVIRONMENT}.git

# deploy app
git push target-remote master

# migrate db
heroku run npm run db:setup

# restart app
heroku restart --remote target-remote

# delete target remote
git remote remove target-remote
