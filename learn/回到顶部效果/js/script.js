window.onload = function() {
	var obtn = document.getElementById('btn');
	//获取页面可视区的高度
	var clientHeight = document.documentElement.clientHeight;

	var timer = null;
	var isTop = true;
	//滚动条滚动时触发
	window.onscroll = function() {
		//获取滚动条距离顶部的高度
		var osTop = document.documentElement.scrollTop || document.body.scrollTop; //兼容IE和chrome
		if (osTop >= clientHeight) {
			obtn.style.display = 'block';
		} else {
			obtn.style.display = 'none';
		}

		//滚动时，将定时器停止
		if (!isTop) {
			clearInterval(timer);
		}
		isTop = false;
	}

	obtn.onclick = function() {
		//设置定时器
		timer = setInterval(function() {
			//获取滚动条距离顶部的高度
			var osTop = document.documentElement.scrollTop || document.body.scrollTop; //兼容IE和chrome
			if(osTop >= clientHeight) {
				//显示按钮
			}
			//向下取整,如果是正数，向下取整就会，一直为0,osTop最终不能减少到0，所以要用负数
			var ispeed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

			isTop = true;
			if (osTop <= 0) {
				clearInterval(timer);
			}
		}, 30);
	}
}