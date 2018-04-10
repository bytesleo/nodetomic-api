module.exports = {
  "apps": [
    {
      "name": "app-dev",
      "script": "./src/app.js",
      "watch": ["src/**/*.{js,yaml}"],
      "exec_interpreter": "babel-node",
      "env": {
        "NODE_ENV": "development"
      },
      "args": [
        "--color"
      ]
    }
  ]
}
