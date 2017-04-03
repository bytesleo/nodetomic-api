
# Nodetomic

<img src="http://solucionesit.ldtsynergy.com/-/Srvs015/MongoDB/file/view/mongodb.png/547250106/315x368/mongodb.png" width="80">
<img src="http://code.runnable.com/images/provider-icons/icon-express-alt.svg" width="80">
<img src="https://chris.lu/upload/images/redis.png" width="80">
<img src="http://oraclelinuxworld.com/wp-content/uploads/2016/01/NodeJS-Small-Blog-Feature-Image-.jpg" width="80">

Easy server RESTful, based in MongoDb, Express, Redis, NodeJS.

## Instructions

```bash
git clone [repo Nodetomic]
npm install
```

## Directory Layout

```bash
.
├── /dist/                     # The compiled output
├── /server/                   # Node.js application source files
│   ├── /api/                  # api RESTful
│   ├── /config/               # Global Config
│   ├── /core/                 # Core
│   │   ├── /mongoose/         # database
│   │   ├── /dev.js            # dev
│   │   ├── /engine.js         # Engine
│   │   └── /routers.js        # Routers
│   ├── /lib/                  # Libs
│   │   ├── /auth/             # Authentication
│   │   └── /utility/          # Utility
│   ├── /views/                # Views
│   └── /app.js                # Node.js server (entry point)
├── /src/                      # Client
├── gulpfile.js                # gulpfile
└── package.json               # The list of project dependencies
```

## Run

command: `npm run serve`

output: http://localhost:8000

## Build

command: `npm run build`

output: `dist`

## Production

folder "dist" ready for production!

```bash
cd dist
nodemon server/app.js
```
output: http://localhost:8001

## License

MIT
