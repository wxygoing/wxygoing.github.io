function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function() {
	var index = 0;
	var timer = null;
	//获取鼠标滑过或点击的标签和要切换内容的元素
	var titles = $('notice-tit').getElementsByTagName('li'),
		divs = $('notice-con').getElementsByTagName('div');
	if (titles.length != divs.length){
		return;
	}
	//遍历titles下的所有li
	for (var i = 0; i < titles.length; i++) {
		titles[i].id = i;
		titles[i].onmouseover = function() {
			//用that这个变量来引用当前滑过的li
			var that = this;
			//如果存在准备执行的定时器，立刻清除，只有当前停留时间大于500ms时才开始执行
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			//延迟半秒执行
			timer = setTimeout(function() {
				//清除所有li上的class
				for (var j = 0; j < titles.length; j++) {
					titles[j].className = '';
					divs[j].style.display = 'none';
				}
				that.className = 'select';
				divs[that.id].style.display = 'block';
				//这里不能直接用this，因为这里this指代window对象，所以
				//外面的this赋值给that
				//this.className = 'select';
				//divs[this.id].style.display = 'block';
				//设置当前为高亮显示
			}, 500);
		}
	}
}