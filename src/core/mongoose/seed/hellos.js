import colors from 'colors';
import Hello from '../../../api/hello/hello.model';

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

Hello.find({}).remove(() => {
  Hello.create(data, () => {
    console.log(`Seed: Published Hello`.bgBlue);
  });
});
