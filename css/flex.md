# flex布局

## 定义一个范围为flex布局

> 任何元素都可以成为flex布局的范围

- 块级元素使用 `display:flex`
- 行内元素使用 `display:inline-flex`
- Webkit内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

> flex定义一个容器有两个轴：主轴和交叉轴（默认一个竖一个横）

## 设定轴的方向

- `flex-direction` 
  - `row`  横横的排 --> 左浮
  - `row-reverse`  横横的反排 --> 右浮
  - `column `  竖竖的排 --> 正常的块级元素布局
  - `column-reverse`  竖竖的反排 --> 倒着的块级元素布局

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```



## 设定是否换行

- `flex-wrap`
  - `wrap` 换
  - `nowrap` 不换
  - `wrap-reverse` 反着换

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

## 方向和换行的简写

- ` flex-flow` 

> 方向和换行的简写形式，默认值是横着不换行

```css
.box {
  flex-flow: row nowrap; // 默认值
}
```

## 定义flex在主轴上的对齐方式

- ` justify-content`

> 根据轴的方向来设定向哪边对齐

```css
justify-content:flex-start;   //  左对齐（默认值）
justify-content:flex-end; //右对齐
justify-content:center; // 居中
justify-content:space-between; //两端对齐，项目之间的间隔都相等。
justify-content:space-around; //每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```

## 定义flex在交叉轴上的对齐方式

- `align-items`

> 根据侧轴的方向来设定对齐方式

```css
.box {
  align-items: flex-start; // 顶部对齐
  align-items: flex-end; // 底部对齐
  align-items: center; // 文字的基线对齐
  align-items: baseline; // 文字的基线对齐
  align-items: stretch;  // 如果项目未设置高度或设为auto，将占满整个容器的高度。
}
```

- `align-content`
- 设定多根轴的对齐方式，如果只有一根轴则不起作用（了解）

> 以上几个属性都是设定在容器上的。

## 设定在子元素中的属性

### order

> 设定给子元素，谁的order越小排列就越靠前
>
> 看主轴方向而定

```css
li {
	order : 2; // 这就很靠前了，值可以为负数  
}
```

### flex-grow 变大

> 设定子元素在容器中占的份数，默认为0

```css
li:first-child {
	 flex-grow: 1; /* default 0 */
}
li:last-child {
	 flex-grow: 2; /* 会占两倍的空间 */
}
```

### flex-shrink 变小

> 元素的缩小比例，如果容器的宽度不足，会让设定了此属性的元素缩小
>
> 负数无效

```css
li:first-child {
	 flex-shrink: 0; /* 空间不足时，它不会缩小*/
}
li:last-child {
	 flex-shrink: 1; /* 会等比缩小 */
}
```

### flex-basis 变固定

> 给某个子元素设定了此属性的固定宽、高后不会再进行等比缩放了

```css
.item {
  flex-basis: 100px; /* 默认值为 auto */
}
```

### 变大小固定简写 flex

> 上面三个属性的简写形式`默认值为0 1 auto`
>
> 优先使用此属性
>
> 两个缩写值`auto`  和 `none `
>
> auto 代表 (大1 小1  固定auto)   | none 代表  (大0 小0 固定auto)

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
  flex:auto;
}
```

### align-self 个性

> 设定跟其他的子元素都不一样的对齐方式
>
> 会覆盖掉侧轴对齐方式的属性 

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

