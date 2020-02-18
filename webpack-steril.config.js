const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
      // inject: false //don't add js and css to html
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./src-steril/html/views");


const config = {
  entry: ["./src-steril/js/index.js", "./src-steril/scss/steril.scss"],
  output: {
    path: __dirname + "/dist-steril",
    filename: "./js/bundle.js"
  },
  devtool: "source-map",
  mode: "production",
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       sourceMap: true,
  //       extractComments: true
  //     })
  //   ]
  // },
  module: {
    rules: [
      
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src-steril/scss"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },

          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                require("cssnano")({
                  preset: [
                    "default",
                    {
                      discardComments: {
                        removeAll: true
                      }
                    }
                  ]
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src-steril/html/includes"),
        use: ["raw-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.bundle.css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/fonts",
        to: "./fonts"
      },
      {
        from: "./src/favicon",
        to: "./favicon"
      },
      {
        from: "./src-steril/assets",
        to: "./assets"
      }
    ])
  ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
   externals: {
     // ymaps: 'ymaps'
   }
  if (argv.mode === "production") {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};









// /////////////////////////////////






// module.exports = {
// 	externals: {
// 		// ymaps: 'ymaps'
// 	},
// 	entry: './src-steril/index.js',
// 	output: {
// 		// mode: 'development', // 'production' = -p key
// 		filename: './js/main.js',
// 		path: path.resolve(__dirname,'dist'),
// 		// publicPath: 'http://suxscribe.tmweb.ru/transsignal/'
// 	},
// 	devtool: 'source-map',
// 	devServer: {
// 		contentBase: './dist'
// 	},
// 	plugins: [

// 		new HtmlWebpackPlugin({
// 			template: './src-steril/html/views/index.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'catalog.html',
// 			template: './src-steril/html/views/catalog.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'section.html',
// 			template: './src-steril/html/views/section.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'product.html',
// 			template: './src-steril/html/views/product.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'about.html',
// 			template: './src-steril/html/views/about.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'production.html',
// 			template: './src-steril/html/views/production.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'news.html',
// 			template: './src-steril/html/views/news.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'content.html',
// 			template: './src-steril/html/views/content.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'certificates.html',
// 			template: './src-steril/html/views/certificates.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'service.html',
// 			template: './src-steril/html/views/service.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'contacts.html',
// 			template: './src-steril/html/views/contacts.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'search.html',
// 			template: './src-steril/html/views/search.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: '404.html',
// 			template: './src-steril/html/views/404.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'sitemap.html',
// 			template: './src-steril/html/views/sitemap.html',
// 		}),
// 		new HtmlWebpackPlugin({
// 			filename: 'form.html',
// 			template: './src-steril/html/views/form.html',
// 		}),
// 		new MiniCssExtractPlugin({
// 			// Options similar to the same options in webpackOptions.output
// 			// all options are optional
// 			filename: './css/[name].css', // создает одноименный файл
// 		}),
// 		new CopyWebpackPlugin([{
// 				from: './src-steril/fonts',
// 				to: './fonts'
// 			  },
// 			  {
// 				from: './src-steril/favicon',
// 				to: './favicon'
// 			  },
// 			  {
// 				from: './src-steril/assets',
// 				to: './assets'
// 			  },
// 			  /*{
// 				from: './src-steril/uploads',
// 				to: './uploads'
// 			  }*/
// 		]),
// 		/*new CleanWebpackPlugin({
// 			cleanOnceBeforeBuildPatterns:['./dist/*.*'] //remove everything before build
// 		}
// 		),*/
// 		/*new OptimizeCssAssetsPlugin({
// 			assetNameRegExp: /\.css$/g,
// 			cssProcessor: require('cssnano'),
// 			cssProcessorPluginOptions: {
// 				preset: ['default', { discardComments: { removeAll: true } }], //remove comments
// 			},
// 			canPrint: true
// 		})*/
// 		/*new webpack ProvidePlugin({
// 			$: 'jquery',
// 			jQuery: 'jquery',
// 			'window.jQuery': 'jquery'
// 		})*/
// 	], //.concat(htmlPlugins)
// 	module: {
// 		rules: [
// 			/*{
// 				test: /\.css$/, //scan files and check if it's css
// 				use: [
// 					{
// 						loader: MiniCssExtractPlugin.loader,

// 					},
// 					'css-loader',
// 				],
// 			},*/
// 			{ test: /\.html$/,
// 			  include: path.join(__dirname, 'src/html/includes'),
// 			  use: {
// 			    loader: 'html-loader',
// 			    options: {
// 			      interpolate: true
// 			    }
// 			  }
// 			},
// 			{
// 				test: /\.scss$/,
// 				use: [
// 					MiniCssExtractPlugin.loader,
// 					'css-loader',
// 					'sass-loader'
// 				]
// 			},
// 			{
// 				test: /\.(jpg|png|svg|gif)$/,
// 				use: [
// 					{
// 						loader: 'file-loader',
// 						options: {
// 							name: '[name].[ext]',
// 							outputPath: './assets/',
// 							useRelativePath: true
// 						}
// 					},
// 					/*{ //optimize images
// 						loader: 'image-webpack-loader',
// 						options: {
// 							mozjpeg: {
// 								progressive: true,
// 								quality: 70
// 							}
// 						}
// 					}*/
// 				]
// 			},
// 			{ test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' }
// 		],
// 	},
// }