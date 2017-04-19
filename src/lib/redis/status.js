import colors from 'colors';

export default(db, uri) => {

  db.on("connect", () => {
    console.log(`Redis-> connected on ${uri}`.bgGreen);
  });

  db.on("error", err => {
    console.log(`Redis-> connection error: ${err}`.bgRed);
    process.exit(-1);
  });

};
