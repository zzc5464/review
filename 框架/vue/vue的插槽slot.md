# slot插槽

## 默认插槽

> 组件定义好后会被渲染加载到页面上，所以在里面写标签是会被整没的。
>
> 有些时候需要在自定义标签里面写标签咋办？
>
> 通过`slot` 

```html
		<my-div>
            <p>我有吗</p>
        </my-div>
	<script type='text/template' id='tpl'>
        <div>
            <slot></slot>
            <p>我在中间</p>
        </div>
    </script>
```

- slot放在哪，写在里面的标签就会在组件的哪边。

## 带name的插槽

> slot加上一个name属性代表是谁的插槽
>
> 如果有有命名插槽没有找到相应的name则会去找默认的插槽
>
> 要插入的标签通过slot属性指定插槽的位置
>
> - 所以只看插槽的位置，不看书写的位置

```html
		<my-div>
            <p>我也是插槽</p>
            <p slot='first'>我有吗</p>
        </my-div>

	 <script type='text/template' id='tpl'>
        <div>
            <slot></slot>
            <p>我在中间</p>
            <slot name='first'></slot>
            // 带name的插槽写在哪，元素就会渲染到哪
        </div>
    </script>
```

## 作用域插槽

> 用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素
>
> 其实就是灵活的提供了一个父组件拿子组件数据的API

```js
// 比如子组件有个数组，可以渲染到插槽
Vue.component('child-c',{
    template:
    `
    <div>
		// 绑定到插槽的数据
        <slot :list='list'></slot>
        <p>child</p>
        <slot></slot>
    </div>
    `,
    data(){
        return {
            // 绑定到插槽的数据
            list : [
                {name:'zs'},
                {name:'ls'},
                {name:'ww'},
                {name:'zl'},
                {name:'wb'},
            ]
        }
    }
});
```

```html
<div slot-scope='props'>
    <p v-for='v in props.list'>{{v.name}}</p>
</div>
```

- 如此父级就可以通过子组件的数据来渲染自己的插槽了