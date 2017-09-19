module.exports = [
  require('./config/webpack')({
    to: './public/assets/js/app.js',
    from: './web/js/app.js',

    copy: [
      { from: 'web/assets', to: 'public/assets' },
      { from: 'web/html', to: 'public' }
    ]
  }),
  require('./config/webpack')({
    to: './public/assets/css/app.js',
    from: './web/css/app.js',
  })
]
