import User from './user.model';
import chalk from 'chalk';

const data = [
  {
    username: 'admin',
    password: '123',
    email: 'admin@admin.com',
    provider: 'local',
    name: 'Admin',
    lastname: 'Main',
    roles: ['admin']
  }, {
    username: 'user',
    password: '123',
    email: 'anthony@user.com',
    name: 'Anthony',
    lastname: 'Kiedis',
    roles: ['user']
  }
];

User.create(data, (err) => {
  console.log(chalk.cyanBright(`Seed-> Published User!`));
});
