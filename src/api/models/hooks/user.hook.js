import bcrypt from 'bcrypt';

export default (User) => {

  // Trigger method's before save
  User.pre('save', async function (next) {

    let user = this;

    // if username from social network exists then new username!
    if (user.provider !== 'local' && (user.isNew || user.isModified('username'))) {

      let username = await new Promise((resolve, reject) => {
        (function calc(username) {
          user.constructor.findOneByUsername(username)
            .then(exists => exists ? calc(`${username}1`) : resolve(username))
            .catch(err => reject(err));
        })(user.username);
      });

      user.username = username; // set new username
    }

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
      return next();

    // generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });

  });

  // Trigger method's after save
  User.post('save', function (err, doc, next) {

    if (err.name === 'MongoError' && err.code === 11000) {
      return next(`'username "${doc.username}" not available.'`);
    } else {
      return next(err);
    }
  });

};