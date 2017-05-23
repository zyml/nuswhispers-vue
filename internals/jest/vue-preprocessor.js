// Adapted from https://github.com/locoslab/vue-typescript-jest,
// which was heavily based on vueify (Copyright (c) Evan You).

const compiler = require('vue-template-compiler');
const nextCompiler = require('vue-template-es2015-compiler');

const stringifyRender = render => nextCompiler(`function render() { ${render} }`);
const stringifyStaticRender = fns => `[${fns.map(stringifyRender).join('')}]`;

const generateOutput = ({ transpiledScript, render, staticRender }) => {
  let output = '';

  output += `
  /* istanbul ignore next */;(function(){\n${transpiledScript}\n})()\n
  /* istanbul ignore next */if (module.exports.__esModule) module.exports = module.exports.default\n
  /* istanbul ignore next */var __vue__options__ = (typeof module.exports === "function"
    ? module.exports.options: module.exports)\n
  `;

  if (render && staticRender) {
    // Temporarily cast CSS module as a string until we can figure out a better way.
    render = render.replace(/_vm\.\$style\.(.*?)(,|\})/gi, "'$1'$2"); // eslint-disable-line

    output += `
    /* istanbul ignore next */__vue__options__.render = ${render}\n
    /* istanbul ignore next */__vue__options__.staticRenderFns = ${staticRender}\n
    `;
  }

  return output;
};

module.exports = {
  process(src) {
    let render;
    let staticRender;
    let transpiledScript = '';

    const { template, script } = compiler.parseComponent(src, { pad: true });

    if (script && script.src) {
      transpiledScript = `module.exports = require('${script.src}')`;
    }

    if (template && template.content) {
      const res = compiler.compile(template.content);
      render = stringifyRender(res.render);
      staticRender = stringifyStaticRender(res.staticRenderFns);
    }

    return generateOutput({ transpiledScript, render, staticRender });
  },
};
