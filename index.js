// v0.0.2 版本之后将linco.dir集成至lincolab模块中的lib.dir方法中
// 所以这里直接调用lib.dir即可

module.exports = function(src, opt){
	return require('linco.lab').lib.dir(src, opt);
}