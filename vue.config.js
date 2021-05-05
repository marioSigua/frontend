module.exports = {
     publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
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
