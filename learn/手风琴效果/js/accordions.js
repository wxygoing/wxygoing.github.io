//事件绑定方法
function bind(el, eventType, callback) {
	if (typeof el.addEventListener === 'function') {
		//标准事件绑定方法
		el.addEventListener(eventType, callback, false);
	} else if (typeof el.attenchEvent === 'function') {
		//IE 事件绑定方法
		el.attachEvent('on' + eventType, callback);
	}
}

//鼠标悬停的处理函数
function mouseoverHandler(e) {
	var target = e.target || e.srcElement; //兼容IE
	var outer = document.getElementById('subject');
	var list = outer.getElementsByTagName('li');

	//清空所有LI元素的class
	for (var i = 0; i < list.length; i++) {
		list[i].className = '';
	}
	//根据事件的冒泡原理，找到需要变更的class的LI元素
	//IE适用吗？？？？ 应该适用，可以通过取消冒泡达到效果吗？
	while(target.tagName != 'LI' || target.tagName == 'BODY'){
        target = target.parentNode;
    }
    //给当前元素加上class big
	target.className += 'big';
}

function initList() {
	var outer = document.getElementById('subject');
	var list = outer.getElementsByTagName('li');
	for (var i = 0; i < list.length; i++) {
		bind(list[i], 'mouseover', mouseoverHandler);
	}
}

initList();