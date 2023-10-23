const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname,'backend/public'),
        filename: 'js/bundle.js'
    },
    mode: 'production',
    
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            // {
            //     test: /\.(png|gif|jpg)$/,
            //     use: [
            //       {
            //         loader: 'file-loader',
            //         options: { name: 'assets/[hash].[ext]' },
            //       }
            //     ],
            //   },
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            filename:"index.html",
            template: './frontend/index.html',
            minify:{
                collapseWhitespace: true, //quita todos los espacios en blanco que tenga el html
                removeComments: true, //remueve comentarios
                removeRedundantAttributes: true, //remueve condigo redundante del condigo de css
                removeScriptTypeAttributes: true, // remueve el tipo de los atributos de los scripts que se colocan en html
                removeStyleLinkTypeAttributes: true, // remueve la etiqueta link de los atributos}
                useShortDoctype: true,
            }
        }),
        new HtmlWebPackPlugin({
            filename:"tu_ruta.html",
            template: './frontend/tu_ruta.html',
            minify:{
                collapseWhitespace: true, //quita todos los espacios en blanco que tenga el html
                removeComments: true, //remueve comentarios
                removeRedundantAttributes: true, //remueve condigo redundante del condigo de css
                removeScriptTypeAttributes: true, // remueve el tipo de los atributos de los scripts que se colocan en html
                removeStyleLinkTypeAttributes: true, // remueve la etiqueta link de los atributos}
                useShortDoctype: true,
            }
        }),
        new HtmlWebPackPlugin({
            filename:"sobre_nosotros.html",
            template: './frontend/sobre_nosotros.html',
            minify:{
                collapseWhitespace: true, //quita todos los espacios en blanco que tenga el html
                removeComments: true, //remueve comentarios
                removeRedundantAttributes: true, //remueve condigo redundante del condigo de css
                removeScriptTypeAttributes: true, // remueve el tipo de los atributos de los scripts que se colocan en html
                removeStyleLinkTypeAttributes: true, // remueve la etiqueta link de los atributos}
                useShortDoctype: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new CopyPlugin({
            patterns: [
              { from: './frontend/assets', to: './assets' },
            ],
          }),

    ],

    devtool: 'source-map'
};