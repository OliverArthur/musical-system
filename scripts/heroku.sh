
#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "v-calendar-app" ]; then
    npm run v-calendar-app build
  elif [ "$BUILD_ENV" = "v-calendar-api" ]; then
    uvicorn backend.app:app --host=0.0.0.0 --port=${PORT}
  else
    echo "Error: no build config for INATO_BUILD_ENV value '$INATO_BUILD_ENV'"
    exit 1
  fi
)
