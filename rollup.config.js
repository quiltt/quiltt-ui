/* eslint-disable global-require */
import swc from 'rollup-plugin-swc'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'
import typescriptEngine from 'typescript'

export default {
  input: ['src/index.tsx'],
  output: [
    {
      name: 'index.js',
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      name: 'index.esm.js',
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      modules: false,
      minimize: true,
      extract: true,
      plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    }),
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          jsx: true,
          tsx: true,
        },
        target: 'es2018',
        keepClassNames: true,
      },
      sourceMaps: true,
      minify: true,
    }),
    external({
      includeDependencies: true,
    }),
    typescript({
      typescript: typescriptEngine,
      include: ['*.js+(|x)', '**/*.js+(|x)'],
      exclude: [
        '.github',
        '.husky',
        'coverage',
        'dist',
        'node_modules/**',
        '*.test.{js+(|x), ts+(|x)}',
        '**/*.test.{js+(|x), ts+(|x)}',
      ],
    }),
    url(),
    svgr(),
    resolve(),
    commonjs(),
    terser(),
  ],
}
