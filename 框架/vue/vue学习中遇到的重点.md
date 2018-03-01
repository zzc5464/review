#基于element-ui封装自己的组件

##封装`el-select`组件

> 场景: 多页面开发，没有使用webpack打包工具。
>
> 没有模块化,老项目中使用。
>
> 通过script标签引入到项目中。
>
> 封装的组件也放在一个js文件中统一管理

```html
<script id="tpl" type='x-template'>
// 可以先在页面中写好全局组件，功能完成再放入组件.js中
  <div class='level_box'>
    <el-select v-model="lv1Id" @change="changeLv1">
      <el-option v-for="v in list" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</script>
```

### 注册组件

```js
Vue.component('zzc-level', {
    template: "#tpl",
    data() {
        return {
        }
    },
    methods: {
      changeLv1(val){
        // 绑定了select的change事件,每当值改变都会调用,val为当前选中option的值
        console.log(val)
      }
    }
});
```

### 难点

> 1. 无法通过change来向父组件传值。
> 2. 如果要传的不是val,传送的数据一直是上一次的。

1. 通过`@input` 传值。
   - 步骤和正常的子向父传值一样。
2. 通过`this.$nextTick(_=>{})` 更新数据后再传值

###完整封装

```js
Vue.component('zzc-level', {
    template: `
    <div class='level_box'>
        <el-select v-model="lv1Id" @change="changeLv1" @input="sendData" >
        </el-select>
    </div>            
    `,
    data() {
        return {
            lv1Id: [],
            lv1List: [
                {
                    dispatch_id: '',
                    dispatch_name: '全部'
                }
            ]
        }
    },
    methods: {
        render() {
            // 渲染当前组件的数据
        },
        changeLv1(val) {
          	// 当下拉框变更的时候触发
            
        }
        /* 
            向父组件传值
        */
        sendData(val) {

            this.$nextTick(_ => {
                this.$emit('getid', {
      			// 注意:这里的名称(getid)千万不可大写
      			// 如果非要大写getId，那么在父组件中调用时要写成get-id
                    id: this.lvAPI.info.p_id
                })
            });
        }
    },
    created() {
        this.render()
    }
});
```

###父组件中调用

```html
<zzc-level @getid='函数名'></zzc-level>

<zzc-level @get-id='函数名'></zzc-level>
// 如果$emit触发函数名写成getId，需要这样调用
```

```js
methods:{
  函数名(val){
    console.log(val)
  }
}
```

