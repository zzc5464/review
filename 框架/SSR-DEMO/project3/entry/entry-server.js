

/* entry-server.js */
import { createApp } from '../src/main'

export default context => {
    return new Promise((resolve, reject) => {
        const app = createApp()

        // 更改路由
        app.$router.push(context.url)

        // 获取相应路由下的组件
        const matchedComponents = app.$router.getMatchedComponents()

        // 如果没有组件，说明该路由不存在，报错404
        if (!matchedComponents.length) { return reject({ code: 404 }) }
        Promise.all(matchedComponents.map( v => {
            if(v.serverRequest) {
                return v.serverRequest(app.$store)
            }
        } ))
        .then( _ => {
            context.state = app.$store.state
            resolve(app)
        } )
        .catch(reject)
    })

}