#!/usr/bin/env bash

# -----------------------------------------------------------------------------

set -euo pipefail

# -------- Settings -----------------------------------------------------------
REPO_URL="https://gitlab.com/dibkb/query-x.git"
APP_DIR="/var/www/query-x"
BRANCH="main"
NODE_ENV="production"

# -------- Helper functions ---------------------------------------------------
log() { printf "\e[32m[deploy] %s\e[0m\n" "$1"; }

# -------- Clone or pull latest code -----------------------------------------
if [[ -d "$APP_DIR/.git" ]]; then
  log "Pulling latest changes in $APP_DIR …"
  git -C "$APP_DIR" fetch --all
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" pull --ff-only origin "$BRANCH"
else
  log "Cloning repository into $APP_DIR …"
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$APP_DIR"
fi

# -------- Install dependencies ----------------------------------------------
log "Installing production dependencies …"
cd "$APP_DIR"
# Prefer `npm ci` for reproducible installs if package-lock.json exists
if [[ -f package-lock.json ]]; then
  npm ci --unsafe-perm --production
else
  npm install --legacy-peer-deps
fi

# -------- Start / reload worker via PM2 -------------------------------------
log "Starting (or reloading) worker with PM2 …"
export NODE_ENV="$NODE_ENV"
# Process name used in PM2
PROC_NAME="query-x-worker"

if pm2 describe "$PROC_NAME" > /dev/null 2>&1; then
  # The process exists → reload it to pick up new code
  pm2 reload "$PROC_NAME"
else
  # Start new process in fork mode using npm script
  pm2 start npm --name "$PROC_NAME" -- run start:worker
fi

# Persist PM2 list across reboots
pm2 save

log "Deployment complete. Current PM2 status:"
pm2 ls
