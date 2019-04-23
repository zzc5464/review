const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  template: `<div>app demo 1</div>`
})
server.get('/',(req,res) => {
  renderer.renderToString(app,(err, html) => {
    if (err) { return res.state(500).end('运行时错误') }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Vue2.0 SSR渲染页面</title>
        </head>
        <body>
            ${html}
        </body>
    </html>
    `)
  })
})

server.listen('8888', _ => {
  console.log(`http://localhost:8888`);
  
})