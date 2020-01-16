const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');

/*function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
	const parts = item.split('.');
	const name = parts[0];
	const extension = parts[1];
	return new HtmlWebpackPlugin({
	  filename: `${name}.html`,
	  template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
	  inject: false,
	})
  })
}*/

// const htmlPlugins = generateHtmlPlugins('./src/html/views')

module.exports = {
	externals: {
		// ymaps: 'ymaps'
	},
	entry: './src/index.js',
	output: {
		// mode: 'development', // 'production' = -p key
		filename: './js/main.js',
		path: path.resolve(__dirname,'dist'),
		// publicPath: 'http://suxscribe.tmweb.ru/transsignal/'
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	},
	plugins: [

		new HtmlWebpackPlugin({
			template: './src/html/views/index.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'catalog.html',
			template: './src/html/views/catalog.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'section.html',
			template: './src/html/views/section.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'product.html',
			template: './src/html/views/product.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'about.html',
			template: './src/html/views/about.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'production.html',
			template: './src/html/views/production.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'news.html',
			template: './src/html/views/news.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'content.html',
			template: './src/html/views/content.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'certificates.html',
			template: './src/html/views/certificates.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'service.html',
			template: './src/html/views/service.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'contacts.html',
			template: './src/html/views/contacts.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'search.html',
			template: './src/html/views/search.html',
		}),
		new HtmlWebpackPlugin({
			filename: '404.html',
			template: './src/html/views/404.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'sitemap.html',
			template: './src/html/views/sitemap.html',
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: './css/[name].css', // создает одноименный файл
		}),
		new CopyWebpackPlugin([{
				from: './src/fonts',
				to: './fonts'
			  },
			  {
				from: './src/favicon',
				to: './favicon'
			  },
			  {
				from: './src/assets',
				to: './assets'
			  },
			  /*{
				from: './src/uploads',
				to: './uploads'
			  }*/
		]),
		/*new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns:['./dist/*.*'] //remove everything before build
		}
		),*/
		/*new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }], //remove comments
			},
			canPrint: true
		})*/
		/*new webpack ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})*/
	], //.concat(htmlPlugins)
	module: {
		rules: [
			/*{
				test: /\.css$/, //scan files and check if it's css
				use: [
					{
						loader: MiniCssExtractPlugin.loader,

					},
					'css-loader',
				],
			},*/
			{ test: /\.html$/,
			  include: path.join(__dirname, 'src/html/includes'),
			  use: {
			    loader: 'html-loader',
			    options: {
			      interpolate: true
			    }
			  }
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './assets/',
							useRelativePath: true
						}
					},
					/*{ //optimize images
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 70
							}
						}
					}*/
				]
			},
			{ test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' }
		],
	},
}