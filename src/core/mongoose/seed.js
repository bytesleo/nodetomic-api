export default(db,config) => {

  db.db.listCollections().toArray((err, names) => {
    if (err)
      console.log(err);
    config.database.mongo.db.seeds.forEach(seed => {
      switch (seed.seed) {
        case 'once':
          let found;
          names.forEach(elem => {
            if (`${seed.model.toLowerCase()}s` == elem.name) {
              found = true;
            }
          });
          if (!found)
            require(`${config.base}${seed.path}`);
          break;
        case 'alway':
          require(`${config.base}${seed.path}`);
          break;
        case 'never':
          console.log('No seeds were sown :)');
          break;
        default:
      }
    });
  });

}
