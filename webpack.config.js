module.exports = require('./config/webpack')({
  root: __dirname,
  destination: './public',

  entries: {
    'assets/js/app': './web/js/app.js', // JS
    'assets/css/app': './web/css/app.js' // CSS
  },

  copy: [
    { from: 'web/assets', to: 'assets' },
    { from: 'web/html', to: '.' }
  ]
})
