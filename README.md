
# Nodetomic

<img src="http://solucionesit.ldtsynergy.com/-/Srvs015/MongoDB/file/view/mongodb.png/547250106/315x368/mongodb.png" width="80">
<img src="http://code.runnable.com/images/provider-icons/icon-express-alt.svg" width="80">
<img src="https://chris.lu/upload/images/redis.png" width="80">
<img src="http://oraclelinuxworld.com/wp-content/uploads/2016/01/NodeJS-Small-Blog-Feature-Image-.jpg" width="80">
<img src="http://www.themightycribb.com/wp-content/uploads/2016/08/gulpjs-logo.jpg" width="80">
<img src="https://cms-assets.tutsplus.com/uploads/users/16/posts/24511/preview_image/babel-1.png" width="80">
<img src="https://avatars0.githubusercontent.com/u/8770005?v=3&s=400" width="80">
<img src="https://nodemon.io/nodemon.svg" width="80">
<img src="https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc.png" width="80">
<img src="http://www.erikasland.com/static/images/mongoose.png" width="80">

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
