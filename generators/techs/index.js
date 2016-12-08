const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring() {
    // this.mergeJson('package.json', {
    //   dependencies: {
    //     'vue-resource': '^0.9.3'
    //   }
    // });
  },

  writing: {
    src() {
      const src = [
        'src/index.css',
        'src/index.js',

        'src/app/techs/tech.js',
        'src/app/techs/tech.spec.js',
        'src/app/techs/techs.js',
        // 'src/app/techs/Techs.spec.js',
        'src/app/footer.js',
        // 'src/app/Footer.spec.js',
        'src/app/header.js',
        // 'src/app/Header.spec.js',
        'src/app/main.js',
        // 'src/app/Main.spec.js',
        'src/app/title.js',
        // 'src/app/Title.spec.js'

        'src/models/techs.js'
      ];
      src.map(file => this.copyTemplate(file, file));
    }
  },

  techs() {
    this.prepareTechJson();
  }
});
