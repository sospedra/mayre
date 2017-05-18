import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    uglify()
  ],
  dest: 'build/bundle.min.js',
}
