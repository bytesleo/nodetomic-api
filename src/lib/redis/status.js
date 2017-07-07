import chalk from 'chalk';

export default(db, uri) => {

  db.on("connect", () => {
    console.log(chalk.greenBright(`----------\nRedis-> connected on ${uri}\n----------`));
  });

  db.on("error", err => {
    console.log(chalk.redBright(`Redis-> connection error: ${err}`));
    process.exit(-1);
  });

};
