# 零散知识点

## video标签事件

- 属性

| 属性       | 值        | 效果                                       |
| -------- | -------- | ---------------------------------------- |
| autoplay | autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| controls | controls | 如果出现该属性，则向用户显示控件，比如播放按钮。                 |
| loop     | loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。               |
| preload  | preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| src      | url      | 播放视频的路径                                  |

- 事件

```js
var video = document.querySelector('video');
video.pause();//暂停
video.play();//播放
video.webkitRequestFullScreen();//全屏
```

