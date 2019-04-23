const express = require('express');
const app = express();
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
// const renderer = require('vue-server-renderer').createRenderer({
//   template: fs.readFileSync(path.join(__dirname,'../src/index.html'), 'utf-8')
// })
const { createBundleRenderer } = require('vue-server-renderer')
const createApp = require('../dist/bundle.js').default



const renderer = createBundleRenderer(createApp,{
  runInNewContext:false,
  template: fs.readFileSync(path.join(__dirname,'../src/index.html'), 'utf-8')

})
const port = '8881'
app.get('/api/msg', (req,res) => {
  res.send(`获取到的信息请求`)
})

app.get('*', (req,res) => {
  const context = {url: req.url}
  // createApp(context).then( app => {
    renderer.renderToString(context, (err, html) => {
      let errInfo = chalk.red(`err info${err}`)
      // console.log(errInfo);
      
      if (err) { return res.status(500).end('运行时错误') }
      res.send(`${html}`)
    },err => {
      // console.log(err);
    })
  // }).catch( err => {
  //   if(err.code === 404) { res.status(404).end('所请求的页面不存在') }
    
  //   res.send( `err info ${err}` )
  // })
} )

app.listen(port, _ => {
  console.log(`http://localhost:${port}`);
  
})