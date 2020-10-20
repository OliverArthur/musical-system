# V-CALENDAR-APP

> SPA based on Vuejs version 3. This a calendar application with a month's views.

![spa calendar app](docs/screen-recording.gif)


**How can I work with the project?**

-------------------------------
Before start working with the project you should have some tools to be installed in your machine.

- Docker for window [see here](https://docs.docker.com/docker-for-windows/install/)
- Docker for mac [see here](https://docs.docker.com/docker-for-mac/install/)
- git
- npm
- node +12

After you have installed all the tools and are ready to start, then your next step. Will be cloning the repo.

```ssh
git clone https://github.com/OliverArthur/v-calendar-app.git
```

if you have installed docker in your machine, then you only have to-do:

```ssh
cd v-calendar-app
```

```ssh
docker-compose build
```

And the build process is completed without error, then.

```ssh
docker-compose up
```

If this command finish without errors you can check in the browser the api documentation.

```html
http://0.0.0.0/api/v1/docs
```

**front-end set-up**

Got to the frontend folder
```ssh
cd v-calendar-app/frontend
```

Inside the frontend folder run this command

```ssh
npm install
```

After you have installed all the dependencies. Then you can run the frontend server by running this command.

```ssh
npm run serve
```

Build the to production

```ssh
npm run build
```

Run the linter and fix anny linter errors

```ssh
npm run lint
```

**vue-cli Customize configuration**

See [Configuration Reference](https://cli.vuejs.org/config/).

**Work with the database**

I you are using docker for the backend. Work with db migrations will be more easy

first you have to ssh into the docker container by running this command.

```ssh
docker exec -it calendarapi /bin/bash
```

Run the migrations if your database is empty.

```ssh
alembic upgrade head
```

Add an automatic alembic migration

```ssh
alembic revision --autogenerate -m "migration message"
```

```ssh
alembic upgrade head
```

If you what to run those command manually, make sure that you tell alembic where is the python script by exporting this ENV.

```ssh
export PYTHONPATH=/backend
```

Project structure

- backend
- frontend

Technologies used

- Docker
- Python 3.8
- Vue 3
- vue-cli
