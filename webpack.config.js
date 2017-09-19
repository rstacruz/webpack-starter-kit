module.exports = require('./config/webpack')({
  root: __dirname,
  source: './web',
  destination: './public',

  entries: [
    { to: 'assets/js/app', from: 'js/app.js' }, // JS
    { to: 'assets/css/app', from: 'css/app.js' } // CSS
  ],

  copy: [
    { from: 'assets', to: 'assets' },
    { from: 'html', to: '.' }
  ]
})
