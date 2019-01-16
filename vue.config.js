//const path = require('path');
//const { name: packageName, version } = require('./package.json');

module.exports =
{
    devServer: {
      disableHostCheck: true
    }
};

/*
    publicPath: './',
    outputDir: './static',
    configureWebpack: {
      entry: {
        'main': './src/main.js'
      },
      output: {
        path: path.resolve('./static'),
        filename: packageName + '.js',
        library: packageName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        chunkFilename: '[id].[hash:8].js'
      },

      resolve: {
        extensions: ['.js, .vue']
      },

      module: {
        rules: [
          {
            test: /\.(js)$/,
            include: [
              path.resolve('./src')
            ],
            use: {
              loader: 'babel-loader',
              options: {
                plugins: [
                  ['@babel/plugin-proposal-class-properties'],
                  ['@babel/plugin-transform-runtime', {
                    helpers: false, useESModules: true, // Уменьшение размера при сборке через WebPack.
                    regenerator: true, // Использование среды регенератора (не загрязняется глобальная область).
                    corejs: false // Поддержка в Internet Explorer 10-11 объектов Promise, Set, Map и т.д.
                  }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: [
              path.resolve('./src/styles')
            ],
          }
        ]
      }

    }
* */