var Observer = function(obj){
	this.data = obj //画龙点睛之笔   联通obj和data   使得若无返回值则只将传入对象设为observe，若存在返回值则获得有data属性的一个observe实例   vue.data

	for(let key of Object.keys(obj)){
		if (typeof obj[key] === 'object' && obj[key] instanceof Object) {
			new Observer(obj[key])
			break;
		}
		this.defineSetget(obj, key)
	}
}

Observer.prototype.defineSetget = function(obj, key, callback){
	let val = obj[key]
	Object.defineProperty(obj, key, {
		get: function(){
			console.log(`你访问了 ${key}`)
			return val
		},
		set: function(newVal){
			val = newVal
			if (typeof val === 'object' && val instanceof Object) {
				new Observer(val)
			}
			if(!callback){
				console.log(`你设置了 ${key}，新的值为${val}`)
			}else{
				callback(newVal)
			}
		}
	})
}

Observer.prototype.$watch = function(key, callback){
	this.defineSetget(this.data, key, callback)
}




