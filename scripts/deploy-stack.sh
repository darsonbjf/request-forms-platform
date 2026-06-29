#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-request-forms-platform}"

docker stack deploy -c docker-compose.yml "${STACK_NAME}"
