#!/bin/bash

set -xe

ENVIRONMENT=${1:-staging}

# create target remote
git remote add target-remote https://git.heroku.com/weighter-${ENVIRONMENT}.git

# tell Heroku to install additional dev dependencies to be able to build the app during deployment
heroku config:set NPM_CONFIG_PRODUCTION=false --remote target-remote

# deploy app
git push -f target-remote master

# migrate db
heroku run npm run db:setup

# restart app
heroku restart --remote target-remote

# delete target remote
git remote remove target-remote
