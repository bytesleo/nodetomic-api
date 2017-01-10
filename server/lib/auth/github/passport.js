
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


exports.setup = function (User, config) {

	passport.use(new GitHubStrategy({
		clientID: config.github.clientID,
		clientSecret: config.github.clientSecret,
		callbackURL: config.github.callbackURL
	},
	function (token, tokenSecret, profile, done) {

		User.findOne({
			provider: 'github',
			'social.id': profile.id
		}, function (err, user) {
			if (err) 
				return done(err);

			if (!user) {
				user = new User({
					name: profile.displayName,
					username: profile.username,
					email: profile._json.email ? profile._json.email : '',
					provider: 'github',
					photo: profile._json.avatar_url,
					'social.id': profile.id,
					'social.info': profile._json
				});

				user.save(function (err) {
					if (err)
						return done(err);
					done(err, user);
				});

			} else {
				user.social.info = profile._json;
				user.photo = profile._json.avatar_url;
				user.last_login = Date.now();
				user.save(function (err) {
					if (err)
						return done(err);
					return done(err, user);
				});
			}
		});
	}));
};
