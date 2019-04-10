# webpack-loader

> loader 用于解析对应的文件内容，到 `html/js/css` 中。
>
> loader 其实是一个函数，基本功能是接受一个`字符串/buffer` ,通过函数处理返回一个结果。
>
> buffer 是为了能够处理一些静态资源 音频图片等。
>
> 每个 loader 必须返回一个模块包

## 编写一个 loader

> 编写一个可以解析`.zzc$` 的文件
>
> 作用是把`.zzc` 文件的字符串转化成数组

- demo.zzc文件

```tex
a,b,c
```



```js
"use strict";
module.exports = (source) {
  return `export default (${JSON.stringify(source.split())})`;
}
```

- 使用

```js
// webpack.config.js
{
    test: /\.zzc$/,
    use: [
        'html-loader',
        {
            // loader 可以指定本地的 loader 来解析文件
            loader: path.resolve('./zzc-loader.js'),
        }
    ],
},
```

- 在 `demo.js`中引入此模块

```js
import zzc from './zzc/test.zzc';
console.log('zzc-loader', zzc); // [a,b,c]
```



### 传参

> 传入一些参数，改变 loader 的功能
>
> 需要用到官方的插件 `loader-utils`

```js
"use strict";
const { getOptions } = require("loader-utils");

function splitZzc(source) {
  const options = getOptions(this) // 获取配置项
  const {type = ''} = options
  return `export default (${JSON.stringify(source.split(type))})`;
}
module.exports = splitZzc
```

- 修改`.zzc`

```tex
a-b-c
```

## resolveLoader

> 如果要引入多个 loader ，路径就是个问题。
>
> 可以使用 `resolveLoader` 指定 webpack 去哪里找 `loader`



```
resolveLoader:{
	// 去哪些目录下寻找 Loader，有先后顺序之分
	modules: ['node_modules','./loaders/'],
}
```

- 例子

```js
module: {
    rules: [ // 解析模块 loader 相关
      {
        test: /\.zzc$/,
        use: [
          {
            loader: 'zzc-loader',
            options: {
              type: '-'
            }
          }
        ],
      },
    ]
},
resolveLoader: {
    modules: ['node_modules',resolve('./loaders/')]
},
```



## npm link

> 用 `npm-link` 也可以便于本地 loader 调试