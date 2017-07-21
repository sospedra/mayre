import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js-harmony'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'dist/mayre.min.js',
  format: 'cjs',
  moduleName: 'mayre',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['createElement']
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify({}, minify)
  ],
  sourceMap: true
}
