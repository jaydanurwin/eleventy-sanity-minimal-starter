require('dotenv').config();
const CleanCSS = require('clean-css');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addWatchTarget('src/css');

  /**
   * Bundle, minify, and inline a CSS file. Path is relative to ./src/css/.
   *
   * In dev mode, instead import the CSS file directly.
   */
  eleventyConfig.addShortcode('inlinecss', (path) => {
    if (process.env.ELEVENTY_ENV === 'dev') {
      return `<link rel="stylesheet" href="/css/${path}">`;
    }
    const result = new CleanCSS({ inline: ['local'] }).minify([
      `./src/css/${path}`,
    ]);
    if (result.errors.length > 0 || result.warnings.length > 0) {
      throw new Error(
        `CleanCSS errors/warnings on file ${path}:\n\n${[
          ...result.errors,
          ...result.warnings,
        ].join('\n')}`
      );
    }
    return `<style>${result.styles}</style>`;
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
