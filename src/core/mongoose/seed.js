import chalk from 'chalk';

export default(connection, config) => {

  connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.log(err);
    } else {
      config.database.mongo.db.seeds.forEach(seed => {
        let model = seed.path.split('/').reverse()[0].match(/\S+(?=.seed)/g)[0] + 's';
        switch (seed.plant) {
          case 'once':
            connection.db.collection(model).count((err, count) => {
              if (count <= 0) {
                connection.db.dropCollection(model, (err, result) => {
                  console.log(chalk.cyan(`Seed-> Sowing seed ${model}...`));
                  require(`${config.base}${seed.path}`);
                });
              }
            });
            break;
          case 'alway':
            connection.db.dropCollection(model, (err, result) => {
              console.log(chalk.cyan(`Seed-> Sowing seed ${model}...`));
              require(`${config.base}${seed.path}`);
            });
            break;
          case 'never':
            //console.log(chalk.magentaBright(`Seed-> ${model} never`));
            break;
          default:
        }
      });
    }
  });

}
