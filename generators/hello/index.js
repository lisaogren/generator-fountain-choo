const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    const src = [
      'src/index.css',
      'src/index.js',
      'src/app/hello.js',
      'src/app/hello.spec.js'
    ];
    src.map(file => this.copyTemplate(file, file));
  }
});
