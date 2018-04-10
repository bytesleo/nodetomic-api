import chalk from 'chalk';

export default (conn, config) => {

  return new Promise((resolve, reject) => {

    const length = config.mongoose.seed.list.length;

    if (length > 0) {

      (function exec(i) {
        // get seed
        let seed = config.mongoose.seed.list[i];
        // get model
        let model = conn.model(seed.schema);
        // get data
        let data = require(`${config.base}${config.mongoose.seed.path}${seed.file}`).default;
        // plant seed
        switch (seed.plant) {

          case 'once':
            model.count({}, (err, count) => {
              if (count <= 0) {
                model.collection.drop(() => {
                  plant(model, data).then(() => i >= length - 1 ? resolve() : exec(i + 1));
                });
              } else {
                i >= length - 1 ? resolve() : exec(i + 1);
              }
            });
            break;

          case 'always':
            model.collection.drop(() => {
              plant(model, data).then(() => i >= length - 1 ? resolve() : exec(i + 1));
            });
            break;

          case 'never':
            i >= length - 1 ? resolve() : exec(i + 1);
            break;
          default:

        }

      })(0);

    } else {
      resolve();
    }

  });

}

function plant(model, data) {

  return new Promise((resolve, reject) => {
    console.log(chalk.cyan(`Seed: Sowing seed ${model.modelName}'s...`));

    model.insertMany(data)
      .then(() => {
        console.log(chalk.cyanBright(`Seed: Published ${model.modelName}'s!`));
        resolve();
      })
      .catch(err => {
        console.log({ err });
      });
  });

}