import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default [
  // Uses Node Modules
  {
    input: [
      'tsout/scripts/pls-map.js',
    ],
    output: {
      dir: `_site/scripts`,
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
      resolve(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  },

  // Doesn't use Node Modules
  {
    input: [
      'tsout/scripts/slider.js',
    ],
    output: {
      dir: `_site/scripts`,
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  }

];
