const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // Ensures the output is not minified

  module: {
    rules: [
      {
        test: /\.css$/, // Regex to test for .css files
        use: ['style-loader', 'css-loader'], // Loaders to handle CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regex to test for image files
        type: 'asset/resource', // Asset modules to handle images
      },
    ],
  },
  devtool: 'inline-source-map',
  mode: 'development', // Mode can be 'development' or 'production'
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template
      filename: 'index.html', // Name of the output HTML file
    }),
  ],
};
