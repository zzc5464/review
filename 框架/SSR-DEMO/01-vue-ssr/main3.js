const Vue = require('vue')
const server = require('express')()
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
  template: 
  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>{{title}}</title>
      </head>
      <body>
        <!--vue-ssr-outlet-->
      </body>
    </html>
  `
});
const context = { // 用于html模版的插值数据
  title: 'my title'
}
server.get('*',(req,res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>hello render2</div>`
  })
  // context 可提供插值的数据
  renderer.renderToString(app,context).then( html => {
    res.end(`
      ${html}
    `)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
  })
})

server.listen('1234')
