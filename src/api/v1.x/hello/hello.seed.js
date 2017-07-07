import Hello from './hello.model';
import chalk from 'chalk';

const data = [
  {
    greet: 'Hello World',
    language: 'English'
  }, {
    greet: 'Hola Mundo',
    language: 'Spanish'
  }, {
    greet: 'salut monde',
    language: 'French'
  }, {
    greet: 'Hallo Welt',
    language: 'Germany'
  }, {
    greet: 'こんにちは',
    language: 'Japanese'
  }, {
    greet: '你好世界',
    language: 'Chinese'
  }
];

Hello.create(data, () => {
  console.log(chalk.cyanBright(`Seed-> Published Hello's!`));
});
