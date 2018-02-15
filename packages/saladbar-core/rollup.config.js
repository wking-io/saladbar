import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'modules/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: ['../../node_modules', '../'],
      },
    }),
    commonjs({
      include: /node_modules/,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;
