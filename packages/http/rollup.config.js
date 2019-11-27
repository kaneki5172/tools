import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.bundle.js',
      format: "umd",
      name: "ToolsHttp",
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      configFile: "../../babel.config.js",
      extensions: ["js", "jsx", "ts", "tsx"]
    })
  ]
};