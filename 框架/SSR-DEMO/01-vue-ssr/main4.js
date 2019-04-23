const vue = require('vue');
const app = require('express')();
const renderer = require('vue-server-renderer').createRenderer();

const createApp = require('./utils/app.js');
app.get('*',(req,res) => {
  let context = {url: req.url};
  const app = createApp(context)
  renderer.renderToString(app).then(html => {
    res.send(html)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
  })
})

app.listen('1234')
