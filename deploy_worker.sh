#!/usr/bin/env bash


set -euo pipefail

APP_DIR="/var/www/query-x"
BRANCH="main"
PROC_NAME="x-workers"

cd "$APP_DIR"

echo "[deploy] Pulling latest changes …"
git pull origin "$BRANCH"

echo "[deploy] Installing production dependencies …"
pnpm install --prod --frozen-lockfile

echo "[deploy] Restarting worker via PM2 …"
# If the process exists, restart it; otherwise start it
if pm2 describe "$PROC_NAME" > /dev/null 2>&1; then
  pm2 restart "$PROC_NAME"
else
  pm2 start npm --name "$PROC_NAME" -- run start:worker
fi

echo "[deploy] Done. Current PM2 status:"
pm2 ls
