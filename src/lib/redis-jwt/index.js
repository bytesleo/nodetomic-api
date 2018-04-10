import RedisJWT from 'redis-jwt';
import chalk from 'chalk';
import config from '../../config';

export const r = new RedisJWT(config['redis-jwt']);

export const exec = r.exec();

export const call = r.call();

export function connect() {

    return new Promise((resolve, reject) => {
        
        r.on('ready', () => {
            console.log(chalk.greenBright(`-------\nRedis-> connected on ${config['redis-jwt'].host}:${config['redis-jwt'].port}/${config['redis-jwt'].db}\n-------`));
            resolve();
        });

        r.on('error', (err) => {
            console.log(chalk.redBright(err));
        });
    });

}
