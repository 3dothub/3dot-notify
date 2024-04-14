const path = require('path');

module.exports = {
    mode: 'development', // or 'production' for minified output
    entry: './src/index.ts', // Entry point of your TypeScript application
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'] // Resolve these extensions
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Match TypeScript files
                exclude: /node_modules/,
                use: 'ts-loader' // Use ts-loader for TypeScript files
            },
            {
                test: /\.css$/, // Match CSS files
                use: ['style-loader', 'css-loader'] // Use style-loader and css-loader for CSS files
            },
            {
                test: /\.svg$/, // Match SVG files
                use: 'file-loader' // Use file-loader for SVG files
            }
        ]
    }
};
