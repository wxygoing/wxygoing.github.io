function $(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function() {
	//当前高亮的页签索引
	var index = 0;
	var timer = null;

	//获取所有页签和要切换的内容
	var lis = $('notice-tit').getElementsByTagName('li');
	var divs = $('notice-con').getElementsByTagName('div');
	if (lis.length != divs.length){
		return;
	}
	//遍历每一个页签给他们绑定事件
	for(var i = 0; i < lis.length; i++) {
		lis[i].id = i;
		lis[i].onmouseover = function() {
			clearInterval(timer);
			changeOption(this.id);
		}
		lis[i].onmouseout = function() {
			timer = setInterval(autoPlay, 2000);
		}
	}
	//鼠标移动很快，可能会开启多个定时器，所有在开始判断timer
	//是否存在
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
	//添加定时器，改变当前高亮的索引
	timer = setInterval(autoPlay, 2000);
	function autoPlay() {
		index++;
		if (index >= lis.length) {
			index = 0;
		}
		changeOption(index);
	}

	function changeOption(curIndex) {
		for(var j = 0; j < lis.length; j++) {
			lis[j].className = '';
			divs[j].style.display = 'none';
		}
		//高亮显示当前页签
		lis[curIndex].className = 'select';
		divs[curIndex].style.display = 'block';
		index = curIndex;
	}
}