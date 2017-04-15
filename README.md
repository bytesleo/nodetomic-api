
# Nodetomic-serve

<img src="http://solucionesit.ldtsynergy.com/-/Srvs015/MongoDB/file/view/mongodb.png/547250106/315x368/mongodb.png" width="80">
<img src="http://code.runnable.com/images/provider-icons/icon-express-alt.svg" width="80">
<img src="https://chris.lu/upload/images/redis.png" width="80">
<img src="http://oraclelinuxworld.com/wp-content/uploads/2016/01/NodeJS-Small-Blog-Feature-Image-.jpg" width="80">
<img src="http://www.themightycribb.com/wp-content/uploads/2016/08/gulpjs-logo.jpg" width="80">
<img src="https://cms-assets.tutsplus.com/uploads/users/16/posts/24511/preview_image/babel-1.png" width="80">
<img src="https://avatars0.githubusercontent.com/u/8770005?v=3&s=400" width="80">
<img src="http://bluebirdjs.com/img/logo.png" width="80">
<img src="https://nodemon.io/nodemon.svg" width="80">
<img src="https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc.png" width="80">
<img src="http://www.erikasland.com/static/images/mongoose.png" width="80">
<img src="https://nr-platform.s3.amazonaws.com/uploads/platform/published_extension/branding_icon/300/PKpktytKH9.png" width="80">

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
├── /src/                      # Node.js application source files
│   ├── /api/                  # api RESTful
│   ├── /assets/               # Assets, example : Upload files
│   ├── /config/               # Global Config (development | production)
│   ├── /core/                 # Core
│   ├── /lib/                  # Libs
│   ├── /views/                # Views, example: 404.html
│   └── /app.js                # Node.js server (entry point)
├── /client/                   # Client
├── /test/                     # Test with Mocha
├── .babelrc                   # babel
├── .eslintrc                  # lint
├── gulpfile.js                # gulpfile
└── package.json               # The list of project dependencies
```

## Start [Development]

`npm start`

output: http://localhost:8000

## Build

 `npm run build`

output: `dist`

## Test

 `npm test`

output: `dist`

## Run [Production]

DIST folder must exist!

 `npm run serve`

output: http://localhost:8001

## License

MIT
