const path = require("path");
const fs = require("fs");

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pagesPath = path.resolve(__dirname, "src/pages");

function getPages() {
  return fs.readdirSync(pagesPath);
}

module.exports = function(env) {
  return {
    mode: env.production ? "production" : "development",
    entry: [
      path.resolve(__dirname, "src/js/main.js"),
      path.resolve(__dirname, "src/styles/main.scss")
    ],
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: env.production ? "./" : "/",
      filename: "js/[name].js"
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.njk$/,
              use: [
                "html-loader",
                {
                  loader: "shiny-nunjucks-loader",
                  options: {
                    filters: path.resolve(
                      __dirname,
                      "nunjucks-helpers/filters.js"
                    ),
                    extensions: path.resolve(
                      __dirname,
                      "nunjucks-helpers/extentions.js"
                    ),
                    globals: path.resolve(
                      __dirname,
                      "nunjucks-helpers/globals.js"
                    )
                  }
                }
              ]
            },
            {
              test: /\.js$/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    exclude: [/node_modules/],
                    presets: [
                      [
                        "@babel/preset-env",
                        { modules: false, useBuiltIns: "usage", corejs: 3 }
                      ]
                    ]
                  }
                }
              ]
            },
            {
              test: /\.s?css$/,
              sideEffects: true,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: !env.production
                  }
                },
                {
                  loader: require.resolve("css-loader"),
                  options: { importLoaders: 2 }
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss",
                    sourceMap: true
                  }
                },
                {
                  loader: require.resolve("resolve-url-loader"),
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: require.resolve("sass-loader"),
                  options: {
                    implementation: require("sass"),
                    sourceMap: true
                  }
                }
              ]
            },
            {
              loader: "file-loader",
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                outputPath: "assets",
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [new CleanWebpackPlugin()].concat(
      getPages()
        .map(page => {
          return new HtmlPlugin({
            inject: true,
            template: path.join(pagesPath, page),
            filename: page.replace("njk", "html")
          });
        })
        .concat([
          new MiniCssExtractPlugin({
            filename: "styles/styles.css"
          })
          // env.development && new webpack.HotModuleReplacementPlugin()
        ])
        .filter(Boolean)
    ),
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname, "./dist"),
      watchContentBase: true
    },
    target: "web"
  };
};
