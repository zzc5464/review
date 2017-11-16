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

 ## 监听网络状态

```js
		// H5新增的检测当前是否有网的属性
		// 这个监听的是本地连接 不是真正的网络数据流量
		alert(window.navigator.onLine);

		//online事件 是当无网到有网的时候触发

		window.addEventListener('online',function(){
			console.log('恭喜你，网络畅通');
		})

		window.addEventListener('offline',function(){
			console.log('不好意思，没有网络');
		})
```

## 本地图片预览

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="file" name="" id="">
	<button>点击我读取本地文件</button>
	<script type="text/javascript">
	var files = document.querySelector('input[type="file"]');
	var button = document.querySelector('button');
	console.log(2);
	button.onclick = function(){
		// 需求：读取用户上传到input：file里面的文件 呈递到页面上
		// (1) 获取用户上传到file控件里面的文件
		// files.value 获取的仅仅是当前图片的路径，而我们需要的是一个真正的文件
		var fileData = files.files[0];
		// (2)解析图片文件
		// 得到读取文件的实例对象
		var fr = new FileReader();
		// (3)解析图片
		// 这个方法会将图片解析成base64的字符串 
		// 参数：图片文件
		fr.readAsDataURL(fileData);
		//因为读取是一个异步操作，所以有一个事件专门监听
		fr.onload = function(){
			// 将读取结果放到了fr这个实例对象下面的result属性下面
			var data = fr.result;
			// 创建图片标签，将图片标签追加到body里面去
			var img = document.createElement('img');
			img.src = data;
			document.body.appendChild(img);
		}
	}
	</script>
</body>
</html>
```

## 操作类名

> classList

- classList.add();  添加类名
- classList.remove();  删除类名
- classList.contains(); 判断是否有类名
- classList.toggle(); 切换类名

## dataset

> 获取data自定义属性

```js
<div class="box" data-info="呵呵哒" data-path="www.baidu.com" data-big-img="我是大图片"></div>
	var box = document.querySelector('.box');
	console.log(box.dataset['bigImg']);
	console.log(box.dataset['path']);
```

