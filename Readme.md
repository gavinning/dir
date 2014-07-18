#Linco.dir

[![ilinco icon](http://ilinco.com/images/logo.png)](http://www.ilinco.com)

for nodejs. 用于遍历文件夹目录及子目录

author: gavinning

homePage: [http://www.ilinco.com](http://www.ilinco.com)

More: [https://github.com/gavinning/dir](https://github.com/gavinning/dir)


##安装
```
npm install linco.dir --save
```


##示例
```
var dir = require('linco.dir');
// opt参数为可选，不设置将执行默认规则，以下为默认规则
var opt = {
	deep: true,
	filterFile		: ['^.*', '.svn-base', '_tmp', '副本', 'desktop.ini', '.DS_Store'],
	filterFolder	: ['^.git$', '^.svn$'],
	onlyFile		: [],
	onlyFolder		: []
}


var obj = dir('/Users/username/Documents/app');
// or
var obj = dir('/Users/username/Documents/app', opt);

// 存放文件的数组
console.log(obj.files)
// 存放文件夹的数组
// 包含参数文件夹
console.log(obj.folders)
```

##opt参数详解
```
var opt = {
	deep: true,
	filterFile		: [],
	filterFolder	: [],
	onlyFile		: [],
	onlyFolder		: []
}

// 是否递归子目录，默认为true
// 如果值为false，将只返回一级文件夹的文件及文件夹信息
opt.deep: Boolean

/*
 * 需要过滤的文件，默认为空数组
 * 过滤规则为正则表达式过滤
 * 内部实现：src.match(_filter)
 * 支持*通配符，*将会被视作通配符转换为[\s\S]+
 * eg: filterFile = ['.png']
 * eg: filterFile = ['.png$']
 * eg: filterFile = ['*.png']
 * eg: filterFile = ['*.png$']
 * eg: filterFile = [new RegExp('.png$')]
 * eg: filterFile = [/\.png$/]
 * 以上6种方式都是过滤png格式文件的方法
 * 6种限制的严格程度不同，如果严格过滤，推荐2,4,5,6过滤方式
 * 过滤规则详解，请见下文<过滤过则详解>
 */
opt.filterFile: Array
// 需要过滤的文件夹，默认为空数组
// 过滤规则同上
opt.filterFolder: Array

// 将返回符合条件的文件，其他文件将被抛弃
// 过滤规则同上
opt.onlyFile: Array

// 将返回符合条件的文件夹，其他文件夹将被抛弃
// ！慎用，将不会递归被过滤的文件夹子目录
// 当使用该规则的时候请确定你已完全理解此项过滤
// 过滤规则同上
opt.onlyFolder: Array


```

##过滤规则详解
`opt.filterFile = [String, RegExp]`

所有过滤，数组内的元素可以是字符串，和正则表达式


#### 数组元素为正则表达式对象

如果数组元素为正则表达式对象，则直接执行过滤，不进行任何转换

```
return src.match(reg);
```

**如果以一定的正则基础推荐直接写正则过滤，更严格更精确**


#### 数组元素为字符串
如果元素为字符串，内部将会根据此字符串创建正则对象：

1- 首先会转换通配符*

```
string = string.replace('*.', '[\\s\\S]+\\.');
string = string.replace('.*', '\\.[\\s\\S]+');
```

2- 创建正则表达式对象

```
var reg = new RegExp(string);
return src.match(reg);
```




#### 数组元素为字符串基础过滤规则示例
 * eg: filterFile = ['.png']
 * eg: filterFile = ['.png$']
 * eg: filterFile = ['*.png']
 * eg: filterFile = ['*.png$']
 * eg: filterFile = [new RegExp('.png$')]
 * eg: filterFile = [/\.png$/]
 
```
/* 
 * 过滤包含.png的文件 - 非严格，不精确
 * .pngs的文件也会被过滤，类似的文件也会被过滤
 * .png.js也会被过滤
 */
filterFile = ['.png']
```

 
```
/* 
 * 过滤以.png结尾的文件 - 严格，精确，严格正则过滤
 * .pngs的文件不会被过滤，类似的文件也不会被过滤
 * .png.js不会被过滤
 * .apng也不会被过滤
 */
filterFile = ['.png$']
```
 
```
/* 
 * 过滤包含.png文件 - 非严格，不精确
 * 同第1种过滤方式
 */
filterFile = ['*.png']
```


 
```
/* 
 * 过滤以.png结尾的文件 - 严格，精确
 * 同第2种过滤方式
 */
filterFile = ['*.png$']
```

#### 常用过滤

```
var opt = {
	deep: true,
	// 过滤以.开头的文件，通常为系统文件或配置文件
	filterFile		: ['^.*'],
	// 过滤svn和git信息目录
	filterFolder	: ['^.svn$', '^.git$'],
	onlyFile		: [],
	onlyFolder		: []
}


var opt = {
	deep: true,
	filterFile		: ['.svn-base', '.DS_Store' '_tmp', '副本'],
	filterFolder	: ['.git', '.svn'],
	onlyFile		: [],
	onlyFolder		: []
}


```