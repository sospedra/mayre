import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'

export default {
  input: 'src/index.js',
  output: {
    name: 'mayre',
    file: 'dist/mayre.min.js',
    format: 'cjs',
    sourcemap: true
  },
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
  ]
}
