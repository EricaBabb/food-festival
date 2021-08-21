//Core node module that we're requiring
const path = require("path");
// Because this plugin is built into webpack, we need to be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const WebpackPwaManifest = require("webpack-pwa-manifest");

//Main config object
//We'll write options within this object that tell webpack what to do
const config = {
    //entry point is the root of the bundle and the beginning of the dependency graph
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
      },
    //webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify: dist (short for distribution)
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
      },
      //jQuery is a library dependent on the global variables $ and jQuery. Not only do we need to install jquery, but we need to specify these variables/instructions to webpack through the plugins array.
      module: {
          //this obj will find the type of files to pre-process
        rules: [
          {
              //using regex to narrow down files to png, etc
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath(url) {
                    return url.replace('../', '/assets/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },

      plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
          }),
          //"new" invokes a constructor function
        new WebpackPwaManifest({

          //the name will show up next to the app's icon on desktop devices
          name: "Food Event",

          //short_name is the name that will appear on a user's home screen when the app has been downloaded
          short_name: "Foodies",
          description: "An app that allows you to view upcoming food events.",

          //specify the homepage for the PWA relative to the location of the manifest file
          start_url: "../index.html",

          // If the app launches before the browser is loaded, the background color and theme will appear
          background_color: "#01579b",

          //The theme_color sets the color of the tool bar
          theme_color: "#ffffff",
          fingerprints: false,
          inject: false,
          icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }]
        })
      ],
    mode: 'development'  
};

module.exports = config;

//analyzerMode: "disable" to temporarily stop the reporting and automatic opening of this report in the browser.

//Fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json

//inject property determines whether the link to the manifest.json is added to the HTML. Because we are not using fingerprints, we can also set inject to be false. We will hardcode the path to the manifest.json instead, just like we would in an application without webpack.

//mode: development will have a hot-reloading of webpack and debugging features
//mode: production will build source files into minifiy files