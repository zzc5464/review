# 拖拽

## 本地预览

- 将文件域上传的图片显示在页面中

1. FileList对象

```js
//首先，获取文件域
var ipt = document.querySelector('input[type="file"]');
var fileData = ipt.files[0];//这个就是fileList对象
```

2. 实例化FileReader对象

```js
var fr = new FileReader();
//调用readAsDataURL方法，把上获取到的fileList对象传进去
fr.readAsDataURL(fileData);
```

3. 使用FileReader的事件监听

> 因为图片加载是异步的，所以要用FileReader.on方法
>
> 图片读取的结果放在fr.result里面

```js
		fr.onload = function(){
			// 将读取结果放到了fr这个实例对象下面的result属性下面
			var data = fr.result;
			// 创建图片标签，将图片标签追加到body里面去
			var img = document.createElement('img');
			img.src = data;
			document.body.appendChild(img);
		}
```

### 图片预览完整代码

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
	button.onclick = function(){
		var fileData = files.files[0];
		var fr = new FileReader();
		fr.readAsDataURL(fileData);
		fr.onload = function(){
			var data = fr.result;
			var img = document.createElement('img');
			img.src = data;
			document.body.appendChild(img);
		}
	}
	</script>
</body>
</html>
```

## 拖拽效果

- 给要拖动的元素添加draggable属性就可以拖动了

```html
    <!-- 
		只需要在元素上面添加一个draggable=true则可以让这个元素被拖拽
		这个拖拽仅仅只是拖拽出一个影子
    -->
    <div draggable="true" class="box">1</div>
    <div draggable="true" class="box">2</div>
	<!--目标元素-->
	<div class="target"></div>
```

- `ondragstart`当拖拽开始的时候触发
- `ondragend`当拖拽结束的时候触发

```js
var box = document.querySelector('.box');
var tarTag = null;
box.ondragstart = function(){
		this.style.backgroundColor = 'green';
  		//在全局注册一个空对象，当拖拽开始的时候保存这个被拖拽的对象
  		//为了做完拖拽事件后把当前元素appendChild到目标元素
  		tarTag = this;
}
box.ondragend = function(){
		this.style.backgroundColor = 'red';
}
```

> 一般来说，拖拽分为被拖拽元素和目标元素

- `ondragenter`拖拽元素拖拽到目标元素上触发

```js
var target = document.querySelector('.target');//目标元素
target.ondragenter = function(){
	this.style.borderColor = 'red';
}
```

- `ondragleave`拖拽元素离开到目标元素上触发

```js
target.ondragleave = function(){
	this.style.borderColor = 'black';
}
```

- `ondragover `事件在可拖动元素或选取的文本正在拖动到放置目标时触发。

> 元素是默认不能拖拽到其他元素的
>
> 所以要用这个事件来阻止浏览器的默认事件

```js
target.ondragover = function(e){
	// 阻止默认事件,固定写法
	e.preventDefault();
}
```

- `ondrop`拖拽元素移入到目标元素上并且`松开鼠标`的时候触发

```js
target.ondrop = function(){
	//一般是把被拖拽的元素appendChild进来
}
```

### 完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		.box {
			width: 100px;
			height: 40px;
			background-color: red;
			margin-bottom: 10px;
		}
		.target {
			width: 200px;
			height: 200px;
			border: 1px solid #000;
			margin:100px auto;
			position: fixed;
			right: 10px;
			bottom: 10px;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0,0,0,.5);
			transition:all 1s;
		}
	</style>
</head>
<body>
	<!-- 只需要在元素上面添加一个draggable=true则可以让这个元素被拖拽 
		这个拖拽仅仅只是拖拽出一个影子
	-->
	<div draggable="true" class="box">1</div>
	<div draggable="true" class="box">2</div>
	<div draggable="true" class="box">3</div>
	<div draggable="true" class="box">4</div>
	<div draggable="true" class="box">5</div>
	<!-- 这个是目标元素 -->
	<div class="target"></div>

	<script type="text/javascript">
		var box = document.querySelectorAll('.box');
		var target = document.querySelector('.target');
		var dragElement = null;
		for(var i = 0; i < box.length; i++){
			// 拖拽开始的时候触发
			box[i].ondragstart = function(){
				this.style.backgroundColor = 'green';
				dragElement = this;
			}
			// 拖拽结束的时候触发
			/*box[i].ondragend = function(){
				this.style.backgroundColor = 'red';
			}*/

		}
		/*一般来说，拖拽分为拖拽元素和目标元素*/
		// 拖拽元素拖拽到目标元素上触发
		target.ondragenter = function(){
			this.style.borderColor = 'red';
			this.style.boxShadow = '0 0 10px 5px rgba(0,0,0,.5)';
		}
		// 拖拽元素离开到目标元素上触发
		target.ondragleave = function(){
			this.style.borderColor = 'black';
			this.style.boxShadow = '0 0 10px rgba(0,0,0,.5)'
		}

		target.ondragover = function(e){
			// 阻止默认事件
			e.preventDefault();
		}

		// 拖拽元素移入到目标元素上并且松开鼠标的时候触发
		// drop事件默认是触发不了的，需要在dragover事件里面阻止默认事件
		target.ondrop = function(){
			// alert('哎呀，客官，您来了');
			dragElement.style.width = '50px';
			dragElement.style.height = '50px';
			dragElement.style.backgroundColor = 'gray';
			target.appendChild(dragElement);
		}
	</script>
</body>
</html>
```

## 拖拽外部文件进行读取

- 当外部的文件（比如图片）拖拽到当前页面的时候，默认会覆盖掉当前页面。

```js
// 需要解决一旦拖拽外部文件就覆盖掉了当前页面
// 解决：给document绑定drop事件 drop事件默认触发不了，需要在dragover事件里面阻止默认事件
document.ondrop = function(e){
	e.preventDefault();
}
// 这个阻止默认事件是为了让drop事件得以触发
document.ondragover = function(e){
	e.preventDefault();
}
//所以第一步就是取消两个浏览器的默认事件
```

- 然后当拖拽的文件拖到目标位置的时候给目标位置做点特效

```js
box.ondragenter = function(){
  //就是为了告诉用户，已经拖到指定位置了
	box.style.boxShadow = '0 0 10px 5px rgba(255,0,0,.8)';
}
```

- 最后就是处理放置后的效果

```js
box.ondrop = function(e){
	// 得到拖拽过来的文件
	var dataFile = e.dataTransfer.files[0];
	// 得到实例
	var fr = new FileReader();
	// 异步读取文件
	fr.readAsDataURL(dataFile);
	// 读取完毕之后执行
	fr.onload = function(){
		// 获取得到的结果
		var data = fr.result;
		var img = document.createElement('img');
		img.src = data;
		box.innerHTML = '';
		box.appendChild(img);
	}
}
```

- `e.dataTransfer.files[0]`包含了拖拽过来的对象
- 和之前一样实例化`FileReader`对象，调用`readAsDataURL`把拖拽对象传进去
- append到目标元素中