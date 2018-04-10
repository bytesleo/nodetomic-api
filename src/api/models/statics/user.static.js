
export default (User) => {

  // Statics
  User.statics = {

    loginByLocal(username, password) {

      return new Promise((resolve, reject) => {

        const User = this;

        User.findOne({
          username: username,
          provider: 'local'
        }).select("+password").exec().then(user => {

          if (!user)
            reject(`${username}' is not registered.`); // You can register user here

          user.authenticate(password).then(isMatch => { // validate password
            if (!isMatch)
              reject(`This password is not correct.`);

            user.lastLogin = Date.now();

            user.save().then(_user => resolve(_user)).catch(err => reject(err));

          });

        }).catch(err => reject(err));

      });

    },

    loginBySocial(provider, profile) {

      return new Promise((resolve, reject) => {

        const User = this;

        User.findOne({
          provider,
          'social.id': profile.id
        }).exec().then(user => {

          if (!user) {
            user = new User({
              provider: provider,
              name: profile.displayName,
              username: profile.username,
              email: profile.email || '',
              photo: profile.photo || '',
              'social.id': profile.id,
              'social.info': profile._json
            });
          } else {
            user.social.info = profile._json;
            user.photo = profile.photo || '';
          }

          user.lastLogin = Date.now();

          user.save().then(_user => resolve(_user)).catch(err => reject(err));

        }).catch(err => reject(err));

      });

    },

    findOneByUsername(username) {

      return new Promise((resolve, reject) => {

        this.findOne({ username }).count().exec().then(found => {
          resolve(found);
        });

      });

    }

  }

};