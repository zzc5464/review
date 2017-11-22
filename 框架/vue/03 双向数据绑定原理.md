# 双向数据绑定原理

### 先写个单项数据绑定

```html
    <div id="app">
        <input type="text" name="" id="">输入数据<br>
        <p></p>
    </div>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script>
        var obj = {
            txt: ''
        }
        var ipt = document.querySelector("#app input");
        var p = document.querySelector("#app p");

        ipt.addEventListener('input', function() {
            obj.txt = this.value;
            p.innerHTML = obj.txt;
        });
    </script>
```

> 将输入框的数据绑定到obj上
>
> obj.txt会影响到p的innerHTML
>
> 但只是单向的

### Object.defineProperty()

> Vue就是通过这个属性来完成的双向数据绑定
>
> 所以对ie8以下不兼容
>
> 通过get和set的特性实现双向绑定

```js
		
		var obj = {
            name: ""
        }
        var txt = document.getElementById("txt");
        txt.oninput = function(){
            obj._name = this.value;
        }
        
		Object.defineProperty(obj, "_name", {
            get: function(){
                return this._name;
            },
            set: function(value){
                this._name = value;
                //当别人为属性赋值的时候，我们需要将这个值同步更新页面中的文本框中去
                txt.value = this._name;
            }
        });
```

> get，每次获取对象的值都会被调用
>
> set，每次设置对象的值都会被触发
>
> 