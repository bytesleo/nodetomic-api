import colors from 'colors';
import User from '../../../api/user/user.model';

const data = [
    {
        username: 'admin',
        password: '123',
        email: 'admin@admin.com',
        provider: 'local',
        name: 'Administrator',
        photo: 'https://goo.gl/iRM3yA'
    }
];

User.find({}).remove(() => {
    User.create(data, () => {
        console.log(`Seed: Published User`.bgBlue);
    });
});
