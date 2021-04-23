const BootstrapVueLoader = require('bootstrap-vue-loader')
module.exports = {
     configureWebpack: {
          plugins: [new BootstrapVueLoader()],
     },

     //pang production
     // configureWebpack: {
     //      performance: {
     //           hints: false,
     //      },

     //      optimization: {
     //           splitChunks: {
     //                minSize: 10000,
     //                maxSize: 200000,
     //           },
     //      },
     // },
}
