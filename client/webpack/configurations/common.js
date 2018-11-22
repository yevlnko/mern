import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { loader } from 'mini-css-extract-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { resolve } from 'path';
import scssToJson from 'scss-to-json';
import { loadPostCSS } from '../modules';
import { source, build } from '../paths';

const smp = new SpeedMeasurePlugin();

export const generateCommonConfiguration = () => {
  const { BUILD_ENV, REPOSITORY_NAME, NODE_ENV } = process.env;
  const IS_PRODUCTION = NODE_ENV === 'production';

  return {
    entry: {
      app: source,
      react: ['react', 'react-dom'],
      redux: [
        'redux',
        'react-redux',
        'redux-saga',
        'react-router-redux',
        'react-router',
        'react-router-dom',
      ],
      immutable: ['immutable', 'reselect'],
    },
    output: {
      filename: 'js/[name].[hash].js',
      path: build,
      pathinfo: false,
      chunkFilename: 'js/[name].chunk.[hash].js',
      publicPath: '',
    },
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.json',
        '.css',
        '.m.css',
        '.png',
        '.jpg',
      ],
      modules: [source, 'node_modules'],
      alias: {
        '@ant-design/icons': 'purched-antd-icons',
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: source,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: true,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss/,
          include: [source, /node_modules/],

          use: [
            IS_PRODUCTION ? loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_PRODUCTION,
                camelCase: 'only',
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 1,
              },
            },
            {
              loader: 'fast-sass-loader',
              options: {
                sourceMap: IS_PRODUCTION,
                importLoaders: 1,
              },
            },
            loadPostCSS(),
          ],
        },
        {
          test: /\.less$/,
          use: [
            IS_PRODUCTION ? loader : 'style-loader',
            {
              loader: 'fast-css-loader',
              options: {
                importLoaders: 1,
                sourceMap: IS_PRODUCTION,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                importLoaders: 1,
                modifyVars: JSON.parse(
                  JSON.stringify(
                    scssToJson(
                      resolve(__dirname, '../../source/theme/theme.scss'),
                    ),
                  ).replace(/\$/gi, ''),
                ),
              },
            },
          ],
        },
        {
          test: /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?$/,
          include: source,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:5].[ext]',
              publicPath: REPOSITORY_NAME
                ? `/${process.env.REPOSITORY_NAME}/`
                : '',
            },
          },
        },
        {
          test: /\.jpe?g|png|svg$/,
          include: source,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:5].[ext]',
              publicPath: REPOSITORY_NAME
                ? `/${process.env.REPOSITORY_NAME}/`
                : '',
              sourceMap: IS_PRODUCTION,
            },
          },
        },
      ],
    },

    plugins: [
      new FriendlyErrorsWebpackPlugin(),

      new HtmlWebpackPlugin({
        hash: true,
        inject: false,
        minify: true,
        template: HtmlWebpackTemplate,
        title: 'PictureSpeed | Skylum',
        // favicon: './source/theme/assets/favicon.ico',
        appMountIds: ['app'],
        alwaysWriteToDisk: true,
        meta: [
          {
            name: 'robots',
            content: 'noindex',
          },
        ],
        mobile: false,
      }),
      new DefinePlugin({
        __ENV__: JSON.stringify(BUILD_ENV),
        __DEV__: BUILD_ENV === 'development',
        __PROD__: BUILD_ENV === 'production',
      }),
    ],
  };
};
