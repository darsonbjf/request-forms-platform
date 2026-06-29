#!/usr/bin/env sh
set -eu

load_secret_if_present() {
  var_name="$1"
  secret_file="/run/secrets/${var_name}_FORMS_BACKEND"
  current_value="$(eval "printf '%s' \"\${$var_name:-}\"")"

  if [ -f "$secret_file" ] && [ -z "$current_value" ]; then
    secret_value="$(cat "$secret_file")"
    export "$var_name=$secret_value"
  fi
}

for var_name in \
  POSTGRES_USER \
  POSTGRES_PASSWORD \
  POSTGRES_HOST \
  POSTGRES_PORT \
  POSTGRES_DB \
  DATABASE_URL \
  JWT_SECRET \
  SECRET_KEY \
  RECAPTCHA_VERIFY_URL \
  ADMIN_PASSWORD \
  OTEL_EXPORTER_OTLP_ENDPOINT \
  OTEL_SERVICE_NAME; do
  load_secret_if_present "$var_name"
done

: "${DATABASE_URL:?DATABASE_URL precisa estar configurada}"
: "${JWT_SECRET:?JWT_SECRET precisa estar configurada}"

echo "Gerando Prisma Client..."
npx prisma generate

echo "Aplicando migrations..."
npx prisma migrate deploy

if [ -n "${ADMIN_PASSWORD:-}" ]; then
  echo "Executando seed administrativo..."
  node prisma/seed.js
else
  echo "ADMIN_PASSWORD não definida; seed administrativo ignorado."
fi

echo "Iniciando API..."
exec node src/server.js
