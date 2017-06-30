import colors from 'colors';
import User from './user.model';

const data = [
  {
    username: 'admin',
    password: '123',
    email: 'admin@admin.com',
    provider: 'local',
    name: 'Admin',
    lastname: 'Main',
    roles:['admin']
  }, {
    username: 'user',
    password: '123',
    email: 'anthony@user.com',
    name: 'Anthony',
    lastname: 'Kiedis',
    roles:['user']
  }
];

User.find({}).remove(() => {
   User.create(data, (err) => {
     console.log(`Seed: Published User`.bgBlue);
   });
});
