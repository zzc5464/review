const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server').default

server.use('/',express.static(__dirname + '/dist'))

const clientBundleFileUrl = '/bundle.client.js'

server.get('/api/getMsg', (req,res) => { // 接口地址
    res.send('获取到的信息请求')
} )

// 响应路由请求
server.get('*', (req, res) => {
  
  const context = { url: req.url }

  // 创建vue实例，传入请求路由信息
  createApp(context).then(app => {
    let state = JSON.stringify(context.state)
		renderer.renderToString(app, (err, html) => {
			if (err) { return res.state(500).end('运行时错误') }
			res.send(`
					<!DOCTYPE html>
					<html lang="en">
							<head>
									<meta charset="UTF-8">
									<title>Vue2.0 SSR渲染页面</title>
									<script>window.__INITIAL_STATE__ = ${state}</script>
									<script src="${clientBundleFileUrl}"></script>
							</head>
							<body>
								<div id='app'>
										${html}
								</div>
							</body>
					</html>
			`)
		})
  }, err => {
		if(err.code === 404) { res.status(404).end('所请求的页面不存在') }
		console.log(err);
		
    res.end(`${err}`)
  })
})

server.listen('8081', _ => {
  console.log(`http://localhost:8081`);
})