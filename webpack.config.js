//Core node module that we're requiring
const path = require("path");
// Because this plugin is built into webpack, we need to be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");


//Main config object
//We'll write options within this object that tell webpack what to do
module.exports = {
    //entry point is the root of the bundle and the beginning of the dependency graph
    entry: './assets/js/script.js',
    //webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify: dist (short for distribution)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
      },
      //jQuery is a library dependent on the global variables $ and jQuery. Not only do we need to install jquery, but we need to specify these variables/instructions to webpack through the plugins array.
      plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
      ],
    mode: 'development'  
};

//mode: development will have a hot-reloading of webpack and debugging features
//mode: production will build source files into minifiy files