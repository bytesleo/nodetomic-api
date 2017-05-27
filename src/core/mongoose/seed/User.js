import colors from 'colors';
import User from '../../../api/user/user.model';

const data = [
  {
    username: 'admin',
    password: '123',
    email: 'admin@admin.com',
    provider: 'local',
    name: 'Admin',
    lastname: 'Main',
    photo: 'https://goo.gl/iRM3yA',
    roles:['admin']
  }, {
    username: 'user',
    password: '123',
    email: 'anthony@user.com',
    name: 'Anthony',
    lastname: 'Kiedis',
    photo: 'https://goo.gl/iRM3yA',
    roles:['user']
  }
];

User.find({}).remove(() => {
  User.create(data, () => {
    console.log(`Seed: Published User`.bgBlue);
  });
});
