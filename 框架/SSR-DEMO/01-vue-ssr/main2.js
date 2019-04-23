const Vue = require('vue')
const server = require('express')()
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
  // <!--vue-ssr-outlet--> 标记服务器渲染的html入口
  // template: 
  // `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head><title>Hello</title></head>
  //     <body>
  //       <!--vue-ssr-outlet-->
  //     </body>
  //   </html>
  // `
  // 可以写一个html模版导入进来
  template: fs.readFileSync(__dirname+'/index.template.html','utf-8')
});
server.get('*',(req,res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>hello render2</div>`
  })
  
  renderer.renderToString(app).then( html => {
    res.end(`
      ${html}
    `)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
  })
})

server.listen('1234')
