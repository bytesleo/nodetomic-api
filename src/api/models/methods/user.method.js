import bcrypt from 'bcrypt';

export default (User) => {

  // Methods
  User.methods = {
    // Compare password
    authenticate(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    }

  };

};