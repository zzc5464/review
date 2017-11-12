# 豆瓣电影列表检索案例

##  构建项目结构

- 克隆项目骨架

```bash
$ git clone --depth=1 https://github.com/Micua/angular-boilerplate.git moviecat
$ cd moviecat
从github中克隆在moviecat文件夹中
```

- 安装项目依赖

```bash
$ bower install bootstrap --save
```

```
.bowerrc 配置bower安装包安装到哪个路径
.editorconfig -- 统一不同开发者的不同开发工具的不同开发配置
在Sublime中使用需要安装一个EditorConfig的插件
.gitattributes 所有git开头的都是git配置文件，此文件负责设置文件的编码，比较少用
```

- 为NG做一个项目骨架的目的是为了快速开始一个新的项目
- angular-seed

- npm 在 package.json中的script节点中可以定义脚本任务.
```
    "scripts": {
    "e":"echo hellow",
    "postinstall": "bower install",
    "prestart": "npm install",
    "start": "./node_modules/.bin/hs -a localhost -p 9000 -o"
  }
  比如我定义了一个e脚本，只要输入 npm run e 他就会自动执行echo hellow;
```
- 配置完成后你可以通过 npm run start 或者 npm start 运行起来这个骨架
## 构建视图
- 简单的使用了bootstrap中的样式
 + 起步
 + 实例精选
 + 封面视图
 + 根据自己喜好进行修改样式，原则是要有三个li来装三个模块，一个搜索框，右侧一个视图
### 分析模块
- 正在热映 即将上映 豆瓣电影TOP250 搜索框 详细内容 一共是需要五个模块，那么就在项目文件夹中建五个view
- 对应好我们需要跳转的锚点名字，每个view文件中有两个文件：html和控制器的js
- 回到index.html引进
### 视图绑定
```
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" ng-view>

```
- 给右侧的内容区域盒子绑定上ng-view
 + 此指令是用于切换控制器视图;
### 编写正在上映的控制器
1. 暴露数据
2. 暴露行为
- 调用豆瓣的api
 + https://developers.douban.com/wiki/?title=guide
#### API的概念：

> Application Program Interface

> 应用程序编程接口

- 通过WEB方式提供接口叫做webAPI
 + 比如 Math.random() === API
 + 说白了都是函数
- 推荐：测试webAPI的工具： POSTMAN(要翻墙)
- 先在豆瓣api拿到静态数据设计页面结构
#### 通过angular给我们的ajax服务请求数据 $http
- 模版
```
		$http.get('data.json').then(function(data){
			//成功
		}).function (err) {
			console.log(err);
		}
```
- 最好写绝对路径，在执行ajax的时候angular可能已经执行完了，所以要先在函数外头写上一个空数组来装数据模型；
```	
		$scope.subjects = [];
		$http.get('/app/data1.json').then(function( res ){
			$scope.subjects = res.data.subjects;
			console.log(res);
		},function (err) {
			console.log(err);
		})

```
- 谷歌不支持file写一下的ajax请求，火狐可以
 + 最好架在服务器上弄
#### 获取真实数据
- 会设计到跨域问题，那么就要用到jsonp
 + $http.jsonp();
- 由于XMLHTTPRequest这个对象不支持跨域请求
- angular中将所有的jsonp的callbask挂在了angular.callbacks这个对象上面；
 + 这么做是为了不污染全局变量 
- 然而豆瓣的api不支持angular的方法
- ng中要使用jsonp的方式做跨域，就要给当前地址加上参数；参数名无所谓，参数值必须是： JSON_CALLBACK
```
	你的地址+'?callback:JSON_CALLBACK'
	//但是豆瓣不支持ng的这种方式，没给回调函数，而是直接给了数据
```
### 自己写jsonp
- 设想一下jsonp的方法需要什么参数(抽象一下)
```
		(function(){
			jsonp(
				'http://api.douban.com/v2/movie/in_theaters'
				,{
					count:10,
					start:5
				}
				,function ( data ) {

				}
			)
		})()
```
- 完整思路如下
```
var jsonp = function(url, data, callback) {

// 		/*
// 		挂载回调函数
// 		将传过来的数据转换成字符串的格式
// 		处理url中的回调
// 		创建一个script标签
// 		将它append到页面中
// 		*/
// 		// 挂载回调函数
// 		var cbFn = 'cb_jsonp' + Math.random().toString().replace('.', '');
// 		window[cbFn] = callback;
// 		/*
// 			=window.cb_jsonp1324681235 = callback
// 			相当于给window对象附了一个方法，可以通过window全局调用
// 		*/
// 		// 将传过来的数据转换成字符串的格式
// 		var query = url.indexOf('?')==-1?'?' : '&';
// 		//判断一下有没有？ 如果传过来的url有？的话就用&代替
// 		for (var key in data) {
// 			query += key + '=' + data[key] + '&';
// 			//query = ?name=1&
// 		}
// 		// 处理url中的回调
// 		query += 'callback=' + cbFn;
// 		//query = ?name=1&cb_jsonp1324681235

// 		// 创建一个script标签
// 		var scriptTag = document.createElement('script');
// 		scriptTag.src = url + query;
// 		//将它append到页面中
// 		document.body.appendChild(scriptTag);
// 		/*
// 			代码执行到这里 script 标签会自动执行链接的地址
// 		*/
// 	};
// 	window.$jsonp = jsonp;
// 	//写在自执行函数中 ，给他暴露在全局中

```
- 但是这个时候你仍然无法绑定数据
 + 官方文档中，如果你使用的是第三方的库调用的XHR方法，需要用到$apply通知ng重新绑定文件。
```
	module.controller('InTheatersContorller', [
		'$scope'
		,'httpServer'
		, function($scope,httpServer) {
			$scope.subjects = [];
			$scope.count = 0;
			$scope.loading = true;
			httpServer.jsonp('http://api.douban.com/v2/movie/in_theaters',{},function( data ){
				$scope.subjects = data.subjects;
				$scope.count = data.total;
				//因为是自己写的jsonp，所以要用到$apply
				$scope.loading = false;//mask层
				$scope.$apply();//同步数据
			})
		}])
```
### 处理分页
#### 需求:
1. 每一页只展示10条信息
2. 每个分页都要有单独的锚点
#### 思路：
1. 给url地址后面添加参数/:param
2. 豆瓣给的api中 传入start（从哪开始） count (要多少条数据)
 - start = （page-1）*count
3. 提取url地址/后面的参数 $routeParams
 + 注入此模块
 + 获取到值 var x = $routeParams.param;
 + 将需要的值都获取过来：count,start,page
4. 在自己写的jsonp函数中传入   start和count 来链接豆瓣
 + 通过http://localhost:9000/app/#/in_theaters/1获取到如下字段
```
 http://api.douban.com/v2/movie/in_theaters?start=0&count=10&callback=cb_jsonp06312110770054862

```
5. 算出你当前需要多少页 Math.ceil(获取过来的所有数据/count)
6. 先做个简单的翻页（bootstrap上找个分页样式来用）
7. 在控制器中暴露一个行为用于翻页
 + 参数是页码，你传进来第几页我就跳第几页
 + 要用更新url地址里面的参数$route模块的updataParams
8. 载入$route模块 在暴露出来的行为中调用 $route.updateParams();
```
$scope.paging = function( page ){
	$route.updateParams({page:page});
}

```
9. 在视图中将$scope.currentPage = page; 当前页码传进去 上/下一页就-1/+1;
10. 处理能不能点的问题
```
  <ul class="pager">
    <li ng-class="{disabled:currentPage<=1}"><a ng-click="paging(currentPage-1)">上一页</a></li>
    <li ng-class="{disabled:currentPage>=pageCount}"><a ng-click="paging(currentPage+1)">下一页</a></li>
  </ul>
  <!-- 直接在视图层面去进行判断就行 -->
```
11. 在控制器中仍然要写一个合法化判断
12. 其他模块用的都是一样的，所以不用去另外写top250和正在热映的模块了
 + 把路由的参数改一下行了
### 处理焦点
- ng要尽量的避免操作dom，如果实在需要就在自定义的指令中使用link去操作
```
	link: function($scope, iElm, iAttrs, controller) {
				var aLink = iElm.children().attr('href');//li的子元素a的href
				//判断aLink的值和和当前的path值是否匹配，匹配的话就给加active样式
				//用正则匹配path
				// var replacePath =
				console.log(aLink);
				//点击切换样式
				iElm.on('click',function(){
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				});
			}
```
- iElm可以获取到你给出的指令当前在哪个dom元素上 此处完成了点击添加样式的操作
- 页面一开始的时候当前页面的focus样式
 + 使用$location可以获取到当前页面的path值 $location.path();
 + 在link中 var aLink = iElm.children().attr('href'); 获取到各个li>a中的链接值
 + 判断这两个是否相等，如果相等就添加active样式
```
打印出来这两个的值是这样的
$location.path() === /top250/1
aLink === #/in_theaters/1
```
- 使用正则来提取aLink的值  var pipei = aLink.replace(/#(\/.+?)\/\d+/,'$1');
- 代码如下，记得要在app.js中载入这个模块
```
//焦点样式
(function (angular) {
	angular.module('moviecat.directives.auto-focus', [])
	.directive('autoFocus', ['$location', function($location){
		// 拿$location就是为了一开始的时候给选中页面添加active样式
		var path = $location.path();//获取当前页面的path值
		console.log(path);
		return {
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			link: function($scope, iElm, iAttrs, controller) {
				var aLink = iElm.children().attr('href');//li的子元素a的href
				//判断aLink的值和和当前的path值是否匹配，匹配的话就给加active样式
				//用正则匹配path
				var pipei = aLink.replace(/#(\/.+?)\/\d+/,'$1');
				// var replacePath =
				console.log(aLink);
				if(path.startsWith(pipei)){
					iElm.addClass('active');
				}
				//点击切换样式
				iElm.on('click',function(){
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				});
			}
		};
	}]);
})(angular)

```
- 小优化
 + 让页面可以加载过后实现聚焦
```
			link: function($scope, iElm, iAttrs, controller) {

				$scope.$location = $location//挂载到$scope
				$scope.$watch('$location.path()',function(now){
					var aLink = iElm.children().attr('href');//li的子元素a的href
					//判断aLink的值和和当前的path值是否匹配，匹配的话就给加active样式
					//用正则匹配path
					var pipei = aLink.replace(/#(\/.+?)\/\d+/,'$1');
					// var replacePath =
					if(now.startsWith(pipei)){
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				})

				//点击切换样式
				// iElm.on('click',function(){
				// 	iElm.addClass('active');
				// });
			}
```
## 异步方式加载包
- 包都在index直接引用的方式会拖累我们的页面加载，那么就要用到异步加载了
```
		$ bower install script.js --save 
```
- 用法
```
			$script('you want to load',function(){

				})
			$script(['包1','包2'],function(){

				})			
```
- 包与包之间如果有依赖关系就只能一层层往里套了
``` //外面套被引用的，回调套最小的包
$script('jquery.js', function () {
  $script('my-jquery-plugin.js', function () {
    $script('my-app-that-uses-plugin.js')
  })
})
```
- angular-loader
 + 它的作用就是帮你自动的管理包的依赖
```
	下载包之后直接在最开始引用这个包就ok了
	$ bower install angular-loader --save
	<script src="./app/bower_components/angular-loader.js"></script>
```
- 这类加载包非常多  script.js header.js 等  你也可以试试手写一个  类似jsonp
 + 简单实现
```
	function $script( load,callback ){
		var Ele = document.createElement('script');
		Ele.src = load;
		document.head.appendChild(Ele);
		Ele.addEventListener( 'load',callback );
	}
```
### 优化jsonp操作
- 如果不再回调完成后把标签删了，页面会一直加script标签，造成缓存变大
```
this.jsonp = function(url, data, callback) {
			var query = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				query += key + '=' + data[key] + '&';
				//query = ?name=1&
			}
			var cbFn = 'cb_jsonp' + Math.random().toString().replace('.', '');
			query += 'callback=' + cbFn;
			var scriptTag = $document[0].createElement('script');
			scriptTag.src = url + query;
			$window[cbFn] = function(data) {
				callback(data);
				$document[0].body.removeChild(scriptTag);
				//函数执行完后就删除
			};
			$document[0].body.appendChild(scriptTag);
		};
```
## 搜索框功能

> https://developers.douban.com/wiki/?title=movie_v2#search
> http://api.douban.com//v2/movie/search?q=内容

- 豆瓣的搜索api
 +　http://api.douban.com/v2/movie/search?q=你要搜索的内容
 +　会发现跟其他几个模块的结构是一样的，只需要改成search
 +　q的参数加不加都是一样的（仅该案例）
- 思路：改变搜索地址还有？后面的参数就能实现这个功能了
1. 给搜索框那个form标签添加一个新的控制器，在app.js中写逻辑。
2. 在之前写的httpServer模块中添加一个参数
 + //$routeParams的数据来源：1-你自己定义了，2-取?后面的参数
 + q:$routeParams.q
3. 控制器的逻辑
```
	mainModule.controller('searchController', ['$scope','$route', function($scope,$route){
		$scope.input = '';//取文本框的输入
		$scope.search = function(){
			$route.updateParams({category: 'search',q:$scope.input})
		}
	}])
```
 + 暴露一个空文本框数据用来装输入的值
 + 暴露一个search函数，通过$route.updateParams修改url地址的值
4. 视图
```
	<form class="navbar-form navbar-rigng-controller="searchController" ng-submit="search()">
		<input type="text" class="form-contrplaceholder="Search..." ng-model='input'>
	</form>
```
## 条目明细功能
- 个人觉得直接跳到豆瓣的网址就挺好
- 不过如果公司要做自己的模块的话能适应手机。
- 新写一个模块：movie_detil/view.html 
```
(function(angular) {

	var module = angular.module(
		'moviecat.movie_detail', [
		'ngRoute'
		,'moviecat.server.http'
		]);
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailContorller'
		});
	}]);
	module.controller('MovieDetailContorller', [
		'$scope'
		,'$route'
		,'$routeParams'
		,'httpServer'
		, function($scope,$route,$routeParams,httpServer) {
			$scope.movie = {};
			var id = $routeParams.id;
			var apiAddress = 'http://api.douban.com/v2/movie/subject/' + id;
			httpServer.jsonp(apiAddress,{},function ( data ) {
				$scope.movie = data;
				$scope.$apply();
			});
		}
		}])
})(angular)
```
- 至此获取到豆瓣的详细信息api数据，可以绑定到视图上了
 + 在app.js中载入模块，要在'moviecat.movie_list'之前否则会先匹配它
 + index视图引包
- 绑定点击事件
 + 到视图的a链接中 ng-href="#/detail/{{item.id}}"
## 最后再优化一下
- 每页个页数在此例子中是写死的
- 豆瓣的api也是写固定的，要是以后它变了那又要改代码
### 做成配置
- content 定义一些永恒不变的量
- 使用：通过此方式为模块定义一些常量
```
	mainModule.constant('appConfig',{
		//页码
		pageSize:10,
		//豆瓣地址
		APIAddress:'https://api.douban.com/v2/movie/',
		//搜索地址
		detailAPI:'https://api.douban.com/v2/movie/subject/'
	})
```
- 配置完后在控制器注入
#### jsonp的tips
- 支持跨域的有:
 + img 可以拿，但是拿不到数据
 + iframe 可以拿，但是太复杂
 + link 只有rel是stylesheet才能跨，而且js执行的时候会报错
 + a标签不行
 + 最终还是script标签适合跨域
#### github问题
- 豆瓣的不是https的api，没办法在github上获取数据  蓝瘦。。

