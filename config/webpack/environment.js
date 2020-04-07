const { environment } = require('@rails/webpacker')

const webpack = require("webpack");
environment.plugins.prepend(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
    // $: "jquery/src/jquery",
    // jQuery: "jquery/src/jquery",
  })
);

const aliasConfig = {
  jQuery: "jquery-ui-dist/external/jquery/jquery.js",
  "jquery-ui": "jquery-ui-dist/jquery-ui.js"
};

environment.config.set("resolve.alias", aliasConfig);

module.exports = environment
