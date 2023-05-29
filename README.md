# App already has deployed

Frontend on Github pages.
You can check it via link [https://stalkert.github.io/eliftech-frontend](https://stalkert.github.io/eliftech-frontend)
Backand deployed to heroku [https://intense-ravine-24262.herokuapp.com](https://intense-ravine-24262.herokuapp.com),
but for use it you need only link for deployed frontend. Every call to backend should work (if not, just let me know and I will restart the heroku server).

## Frontend repository on Github

[https://github.com/stalkert/eliftech-frontend](https://github.com/stalkert/eliftech-frontend)

### For launch FE locally make next steps:

1. Install nodejs 16.14.2 version
2. Clone FE repository `git clone https://github.com/stalkert/eliftech-frontend.git`
3. Go to the root folder with FE repository with terminal (or other program) and run command `npm install`;
4. You have to options:
   a) start app with mock server - `npm run start:mock` (before you should start mock server from root project folder in another terminal `npm run mock`)
   FE will be started on [http://localhost:6200](http://localhost:6200)
   Mock server will be started on [http://localhost:6001](http://localhost:6001)

   b)start app with real BE local server - `npm run start:local` (before you should start BE server locally (see instruction below))
   FE will be started on [http://localhost:6400](http://localhost:6400)
   Backend server will be started on [http://localhost:8080](http://localhost:8080)

## Backend repository on Github

[https://github.com/stalkert/eliftech-backend](https://github.com/stalkert/eliftech-backend)

### For launch BE locally make next steps:

1. Install nodejs 16.14.2 version (no need if already done)
2. Clone FE repository `git clone https://github.com/stalkert/eliftech-backend.git`
3. Go to the root folder with BE repository with terminal (or other program) and run command `npm install`;
4. Start BE app - `npm run start:dev`
   BE will be started on [http://localhost:8080](http://localhost:8080)

# Attention. Check all needed ports on localhost(6200, 6400, 6001,8080). All should be available. If some process already use it, please terminate this process.
