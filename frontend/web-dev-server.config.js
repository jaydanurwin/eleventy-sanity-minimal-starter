const path = require('path');
const fs = require('fs').promises;
const URL = require('url').URL;

/**
 *
 * Check if asset lives in 11ty _site folder, if not serve from root folder.
 */
const serve11tyAssets = ({ dist = '_site' } = {}) => {
  return async (context, next) => {
    // Node URL requires a full url so... whatever.com (url isnot important)
    const pathName = new URL(`https://whatever.com${context.url}`).pathname;
    // is the request for a html file?
    const url = pathName.endsWith('/') ? `${pathName}index.html` : pathName;
    try {
      // check if the file exists, if so, modify the url to come from `_site` folder.
      const stats = await fs.stat(path.join(dist, url));
      if (stats.isFile()) {
        context.url = `/${dist}${pathName}`;
      }
      return next();
    } catch {
      return next();
    }
  };
};

module.exports = {
  port: 8080,
  watch: true,
  rootDir: './_site/',
  middleware: [serve11tyAssets({ dist: '_site_' })],
  nodeResolve: true,
};
