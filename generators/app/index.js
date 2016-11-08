const fountain = require('fountain-generator');
const version = require('../../package.json').version;

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'choo';
      return this.fountainPrompting();
    },

    sample() {
      this.option('sample', {type: Boolean, required: false});

      const prompts = [
        {
          when: !this.options.sample,
          type: 'list',
          name: 'sample',
          message: 'Do you want a sample app?',
          choices: [
            {name: 'A working landing page', value: 'techs'},
            {name: 'Just a Hello World', value: 'hello'}
          ]
        }
      ];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring: {
    config() {
      this.config.set('version', version);
      this.config.set('props', this.props);
    },

    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          choo: '^3.3.0'
        }
      });
    },

    babel() {
      if (this.props.js !== 'typescript') {
        const presets = ['es2015'];
        if (this.props.modules === 'webpack') {
          this.mergeJson('.babelrc', {
            env: {
              development: {presets},
              production: {presets}
            }
          });
        } else {
          this.mergeJson('.babelrc', {presets});
        }
      }
    }
  },

  composing() {
    const options = {
      framework: this.props.framework,
      modules: this.props.modules,
      js: this.props.js,
      ci: this.props.ci,
      css: this.props.css,
      router: this.props.router,
      sample: this.props.sample,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    const modules = this.props.sample === 'todoMVC' ? `/${this.props.modules === 'inject' ? 'inject' : 'modules'}` : '';

    this.composeWith(`fountain-choo:${this.props.sample}`, {options}, {
      local: require.resolve(`../${this.props.sample}${modules}`)
    });
    this.composeWith('fountain-gulp', {options}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
