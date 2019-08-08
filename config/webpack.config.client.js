const webpack = require('webpack');
const path = require('path');

const pug = require('pug');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const aliases = require('./aliases');
const indexTemplate = require('./webpack/index.template'); 
const rules = require('./webpack/webpack.config.rules');

module.exports = (env) => {
  const { NODE_ENV } = process.env;
  const IS_DEV = NODE_ENV == 'development'

  const config = {
    // настройки контекста сборки webpack
    context: path.resolve(__dirname),

    // mode
    mode: NODE_ENV,
    
    // короткие алиасы для загрузки файлов
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
      alias: aliases.webpack
    },

    // точки входа файлов в сборку
    entry: {
      bootstrap: 'bootstrap-loader',
      app: [
        '../src/app/app.js'
      ]
    },

    // настройки результата билда
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].bundle.js',
      sourceMapFilename: 'js/[name].bundle.map',
      publicPath: '/'
    },
    
    // sourcemap
    devtool: IS_DEV ? 'eval-source-map' : 'inline-source-map',

    // правила загрузки файлов и модулей
    module: {
      rules: [
        rules.js,
        // rules.css(IS_DEV),
        rules.scss(IS_DEV),
        rules.images('/'),
      ]
    },

    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      port: process.env.npm_package_config_PORT_DEV,
      hot: true,
      compress: true,
      publicPath: '/',
      stats: 'minimal',
      clientLogLevel: 'warning'
    },

    optimization: {
      
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: IS_DEV
        })
      ]
    },


    plugins: [
      new HtmlWebpackPlugin({
        hash: true,

        // собирает из .pug шаблона разметку и рендерит её
        templateContent: function () {
            return pug.render(indexTemplate({}), {pretty: true});
        },

      }),

      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
      }),

      new webpack.HotModuleReplacementPlugin(),

    ].concat(
      !IS_DEV

        ? // плагины для продакшена
        [
          new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
              zindex: false,
              discardComments: {
                removeAll:
                  true
              }
            },
            canPrint: true
          })
          ,

        ]

        :// плагины для разработки
        []
    )
,

  }

  return config;
}