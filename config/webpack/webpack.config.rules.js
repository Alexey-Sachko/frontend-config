const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  js: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },

  cssLoader: {
    loader: 'css-loader',
    options: { sourceMap: true }
  },

  sassLoader: {
    loader: 'sass-loader',
    options: { sourceMap: true }
  },

  css: function (isDev) {
    return {
      test: /\.css$/,
      use: isDev
        ? ['style-loader', this.cssLoader]
        : ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [this.cssLoader]
          }
        )
    }
  },

  scss: function (isDev) {
    return {
      test: /\.scss$/,
      use: isDev
          ? ['style-loader', this.cssLoader, this.sassLoader]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [this.cssLoader, this.sassLoader]
          })
    };
  },

  images: function (publicPath) {
    return {
      test: /\.(jpe?g|jpg|png|gif|svg)$/,
      exclude: /fonts/,
      use: [

        // загрузка изображений
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
            outputPath: 'assets/img/',
            publicPath: publicPath
          }
        }
      ]

    };
  },


}