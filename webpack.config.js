const path = require("path");

module.exports = {
  mode: "development", // Change to 'production' for production builds
  entry: "./src/main.ts", // Your entry point
  output: {
    filename: "bundle.js", // Output bundle filename
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: false, // Clean the output directory before each build
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply this rule to .ts files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map", // Enable source maps
};
