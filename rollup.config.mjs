import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import external from "rollup-plugin-peer-deps-external";
import packageJson from "./package.json" assert { type: "json" };
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
      }),
      postcss({
        extract: false,
        modules: true,
        use: ["sass"],
      }),
      json(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];