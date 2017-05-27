import bcrypt from 'bcrypt';

export default (User) => {

  User.methods = {

    authenticate(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password).then(isMatch => {
        return isMatch;
      });
    }

  };

  User.pre('save', function(next, done) {

    const user = this;

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

  User.post('save', function(err, doc, next) {

    if (err.name === 'MongoError' && err.code === 11000) {
      next(
       `'username "${doc.username}" not available.'`
      );
    } else {
      next(err);
    }
  });

};
