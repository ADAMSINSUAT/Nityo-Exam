const path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [

            {

                test: /\.(js|jsx)$/,

                exclude: /node_modules/,

                use: {

                    loader: 'babel-loader',

                },

            },

            {

                test: /\.css$/i,

                // include: [path.resolve(__dirname, 'src')],

                use: ['style-loader', 'css-loader'],

            },

            {

                test: /\.(jpe?g|png|gif|svg|avif)$/i,

                use: [

                    {

                        loader: 'file-loader',

                        options: {

                            query: {

                                name: 'src/images/[name].[ext]',

                            },

                        },

                    },

                    {

                        loader: 'image-webpack-loader',

                        options: {

                            query: {

                                mozjpeg: {

                                    progressive: true,

                                },

                                gifsicle: {

                                    interlaced: true,

                                },

                                optipng: {

                                    optimizationLevel: 7,

                                },

                            },

                        },

                    },

                ],

            },

        ],
    }
};