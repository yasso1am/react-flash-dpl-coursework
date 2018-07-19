const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

const config = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    libraryTarget: 'umd',
    libary: 'ReactFlash'
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.js$/, 
        exclude: /node_modules/,
        include: APP_DIR,
        options: {
          preserts: ['latest', 'stage-2', 'react']
        }
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.externals = { 
    'react': 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
  }

  config.plugins = [
    new webpack.ProvidePlugin({ 
      'React': 'react'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        warnings: flase,
        screw_ie8: true
      },
      comments: false
    })
  ]
}

module.exports = config