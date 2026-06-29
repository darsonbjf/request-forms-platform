#!/usr/bin/env bash
set -euo pipefail

REGISTRY_NAMESPACE="${REGISTRY_NAMESPACE:-darsonbjf}"
TAG="${TAG:-latest}"

docker build -t "${REGISTRY_NAMESPACE}/request-forms-api:${TAG}" ./apps/api
docker build -t "${REGISTRY_NAMESPACE}/request-forms-web:${TAG}" ./apps/web
docker build -t "${REGISTRY_NAMESPACE}/request-forms-admin:${TAG}" ./apps/admin

if [ "${PUSH_IMAGES:-false}" = "true" ]; then
  docker push "${REGISTRY_NAMESPACE}/request-forms-api:${TAG}"
  docker push "${REGISTRY_NAMESPACE}/request-forms-web:${TAG}"
  docker push "${REGISTRY_NAMESPACE}/request-forms-admin:${TAG}"
fi
