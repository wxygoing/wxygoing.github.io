///为什么点加号后，第一次点击菜单无效,已解决
(function() {
	var Menubar = function() {
		this.el = document.querySelector('#sidebar ul');
		this.state = 'allClosed'; //hasOpened
		this.el.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		var self = this;
		this.currentOpendMenuContent = null;

		//使用jquery就更方便使用Delegation
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for(var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function(e) {
				//每个菜单内容项的ID值
				var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
				if(self.state === 'allClosed') {
					console.log('OPEN'+menuContentEl.id);
					menuContentEl.style.top = '0';
					menuContentEl.style.left = '-85px';
					menuContentEl.classList = [];
			//		menuContentEl.style.className = 'nav-content';
					menuContentEl.classList.add('nav-content');
					menuContentEl.classList.add('menuContent-move-right');

					self.state = 'hasClosed';
					self.currentOpendMenuContent = menuContentEl;
				} else {
					console.log('CLOSE'+ self.currentOpendMenuContent.id);
					self.currentOpendMenuContent.classList = [];
					//self.currentOpendMenuContent.className = 'nav-content';
					self.currentOpendMenuContent.style.top = '0';
					self.currentOpendMenuContent.style.left = '35px';
					self.currentOpendMenuContent.classList.add('nav-content');
					self.currentOpendMenuContent.classList.add('menuContent-move-left');

					console.log('OPEN'+menuContentEl.id);
					menuContentEl.classList = [];
				//	menuContentEl.className = 'nav-content';
					menuContentEl.style.top = '250px';
					menuContentEl.style.left = '35px';
					menuContentEl.classList.add('nav-content');
					menuContentEl.classList.add('menuContent-move-up');

					self.state = 'hasClosed';
					self.currentOpendMenuContent = menuContentEl;
				}
			});
		}
		this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
		for(i = 0; i < this.menuContentList.length; i++) {
			this.menuContentList[i].addEventListener('click', function(e) {
				var menuContent = e.currentTarget.parentNode;
				menuContent.classList = [];
			//	menuContent.className = 'nav-content';
				menuContent.style.top = '0';
				menuContent.style.left = '35px';
				menuContent.classList.add('nav-content');
				menuContent.classList.add('menuContent-move-left');
			});
			self.state = 'allClosed';
		}
	};

	 Menubar.prototype.close = function() {
	 	this.currentOpendMenuContent.classList = [];
        //this.currentOpendMenuContent.className = 'nav-content';
        this.currentOpendMenuContent.style.top = '0px';
        this.currentOpendMenuContent.style.left = '35px';
        this.currentOpendMenuContent.classList.add('nav-content');
        this.currentOpendMenuContent.classList.add('menuContent-move-left');
        this.state = 'allClosed';
    };

    var menubar = new Menubar();

	var Sidebar = function(eId, closeBarId) {
		this.state = 'opened';
		this.el = document.getElementById(eId || 'sidebar');
		this.closeBarEl = document.getElementById(closeBarId || 'closeBar');
		var self = this;
		this.el.addEventListener('click', function(event) {
			if (event.target !== self.el) {  //如果点击不是el本身，因为不能点击除了菜单和关闭按钮之外区域，而执行这样的效果
				self.triggerSwitch();
			}
		});
	};
	Sidebar.prototype.close = function() {
		console.info('close');
		menubar.close();
		this.el.style.left = '0';
		this.el.className = 'sidebar-move-left';
		this.closeBarEl.style.left = '0';
		this.closeBarEl.className = 'closebar-move-right';
		this.state = 'closed';
	};
	Sidebar.prototype.open = function() {
		console.info('open');
		//由于动画效果只是效果，并没有使得坐标左移120px,
		//所以在open时先重置坐标
		this.el.style.left = '-120px';
		this.el.className = 'sidebar-move-right';
		this.closeBarEl.style.left = '160px';
		this.closeBarEl.className = 'closebar-move-left';
		this.state = 'opened';
	};
	Sidebar.prototype.triggerSwitch = function() {
        if(this.state === 'opened')
            this.close();
        else if(this.state === 'closed')
            this.open();
    };

    var sidebar = new Sidebar();

})();