
//inita();
var mapData = new Array();
var containerLength = 500
var borderLength = 100;
var spaceLength = 10;
inita();
function onKeyDownEvent(e) {
	var keyNum = window.event ? e.keyCode : e.which;
	var changeStatus = false;

	if (keyNum === 37) {
		// left
		//alert('left');
		for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {
				if (mapData[i][j] > 0) {
					var a = i;
					var b = j;
					while (chenkBorder(a, b, 'left')) {
						if (mapData[a][b - 1] > 0 && mapData[a][b] === mapData[a][b - 1]) {
							mapData[a][b - 1] = 2 * mapData[a][b];
							mapData[a][b] = 0;
						} else {
							mapData[a][b - 1] = mapData[a][b];
							mapData[a][b] = 0;
						}
						moveCellWithAnimation(a, b, a, b - 1);
						changeStatus = true;
						b--;
					}
					
				}
			}
		}
	}
	if (keyNum === 38) {
		// up
		//alert ('up');
		for (var i = 1; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (mapData[i][j] > 0) {
					var a = i;
					var b = j;
					while (chenkBorder(a, b, 'up')) {
						if (mapData[a - 1][b] > 0 && mapData[a][b] === mapData[a - 1][b]) {
							mapData[a - 1][b] = 2 * mapData[a][b];
							mapData[a][b] = 0;
						} else {
							mapData[a - 1][b] = mapData[a][b];
							mapData[a][b] = 0;
						}
						moveCellWithAnimation(a, b, a - 1, b);
						changeStatus = true;
						a--;
					}
					
				}
			}
		}
	}
	if (keyNum === 39) {
		// right
		//alert('right');
		for (var i = 3; i >= 0; i--) {
			for (var j = 2; j >= 0; j--) {
				if (mapData[i][j] > 0) {
					var a = i;
					var b = j;
					while (chenkBorder(a, b, 'right')) {
						if (mapData[a][b + 1] > 0 && mapData[a][b] === mapData[a][b + 1]) {
							mapData[a][b + 1] = 2 * mapData[a][b];
							mapData[a][b] = 0;
						} else {
							mapData[a][b + 1] =  mapData[a][b];
							mapData[a][b] = 0;
						}
						moveCellWithAnimation(a, b, a, b + 1);
						changeStatus = true;
						b++;
					}
					
				}
			}
		}
	}
	if (keyNum === 40) {
		//down
		//alert('down');
		for (var i = 2; i >= 0; i--) {
			for (var j = 3; j >= 0; j--) {
				if (mapData[i][j] > 0) {
					var a = i;
					var b = j;
					while (chenkBorder(a, b, 'down')) {
						if (mapData[a + 1][b] > 0 && mapData[a][b] === mapData[a + 1][b]) {
							mapData[a + 1][b] = 2 * mapData[a][b];
							mapData[a][b] = 0;
						} else {
							mapData[a + 1][b] = mapData[a][b];
							mapData[a][b] = 0;
						}
						moveCellWithAnimation(a, b, a + 1, b);
						changeStatus = true;
						a++;
					}
					
				}
			}
		}

	}
	if (changeStatus) {
		randomAction();
		drawMap();
	}
}

function chenkBorder(a, b, status) {
	if (status === 'up') {
		if (a > 0 && mapData[a][b] > 0 && (mapData[a - 1][b] === 0 || mapData[a - 1][b] === mapData[a][b])) {
			return true;
		}
	}

	if (status === 'down') {
		if (a < 3 && mapData[a][b] > 0 && (mapData[a + 1][b] === 0 || mapData[a + 1][b] === mapData[a][b])) {
			return true;
		}
	}

	if (status === 'left') {
		if (b > 0 && mapData[a][b] > 0 && (mapData[a][b - 1] === 0 || mapData[a][b - 1] === mapData[a][b])) {
			return true;
		}
	}

	if (status === 'right') {
		if (b < 3 && mapData[a][b] > 0 && (mapData[a][b + 1] === 0 || mapData[a][b + 1] === mapData[a][b])) {
			return true;
		}
	}

	return false;
}

function inita() {

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var border = document.getElementById('row_'+ i +'_col_'+ j);
			border.style.top = getPosition(i) + 'px';
			border.style.left = getPosition(j) + 'px';
			border.style.background= getFontColor(0);
		}
	}
	map();
	drawMap();
}

function map() {
	//var mapData = new Array();
	for(var i = 0; i < 4; i++) {
		 mapData[i] = new Array();
		 for (var j =0; j < 4; j++) {
			mapData[i][j] = 0;
		}
	}
	randomAction();
	randomAction();
}

function randomAction() {
	//var randX = parseInt(Math.floor(Math.random() * 4));
	//var randY = parseInt(Math.floor(Math.random() * 4));

	//随机一个位置
	var randX = parseInt(Math.floor(Math.random() * 4));
	var randY = parseInt(Math.floor(Math.random() * 4));
	var time = 0;
	while (time < 50) {
		if (mapData[randX][randY] == 0) {
			break;
		}
		randX = parseInt(Math.floor(Math.random() * 4));
		randY = parseInt(Math.floor(Math.random() * 4));
		time++;
	}
	if (time == 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (mapData[i][j] == 0) {
					randX = i;
					randY = j;
				}
			}
		}
	}
	//随机一个数字
	mapData[randX][randY] = Math.random() < 0.7 ? 2 : 4;
    moveCellWithAnimation(randX, randY, mapData[randX][randY]);
	/*while(mapData[randX][randY] !== 0) {
		randX = parseInt(Math.floor(Math.random() * 4));
		randY = parseInt(Math.floor(Math.random() * 4));
	}

	if (mapData[randX][randY] === 0) {
		mapData[randX][randY] = Math.random() > 0.7 ? 4 : 2;
	}*/

}

function drawMap() {
	var container = document.getElementsByClassName('main')[0];
	var numberCells = document.getElementsByClassName('number_cell');
	var length = numberCells.length;
	for(var i = 0; i < length; i++) {
		container.removeChild(numberCells[0]);
	}
	
	//container.style.width = 
	for(var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var numberCell = document.createElement('div');
				container.appendChild(numberCell);
				numberCell.id = 'number_cell_' + i + '_' + j;
				numberCell.className = 'number_cell';
			if (mapData[i][j] >= 2) {

				//var border = document.getElementById('row_'+ i +'_col_'+ j);
				numberCell.style.width = borderLength + 'px';
				numberCell.style.height = borderLength + 'px';
				numberCell.style.top = getPosition(i) + 'px';
				numberCell.style.left = getPosition(j) + 'px';
				numberCell.style.background = getFontColor(mapData[i][j]);
				numberCell.style.color = getNumberColor(mapData[i][j]);
				numberCell.innerText = mapData[i][j]; 

				 
			} else {
				//var border = document.getElementById('row_'+ i +'_col_'+ j);
				numberCell.style.width = '0px';
				numberCell.style.height = '0px';
				numberCell.style.top = getPosition(i) + borderLength / 2 + 'px';
				numberCell.style.left = getPosition(j) + borderLength / 2 + 'px';
				//numberCell.style.background= getFontColor(0);
				//numberCell.innerText = '';
			}
		}
	}

}

function showNumWithAnimation(x, y) {
	
}

function moveCellWithAnimation1(fromX, fromY, toX, toY) {
	var cell = document.getElementById('number_cell_' + fromX + '_' + fromY);

	function changePosition() {
		var x = parseInt(cell.style.left);
		cell.style.left = x + 1 + 'px';
		var y = parseInt(cell.style.top);
		cell.style.left = y + 1 + 'px';

		if (x > toX) {
			cle
		} 
	}
}

function getFontColor(number) {
	switch (number) {
		case 0: return '#ccc5b4'; break;
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return 'black';
}

function getPosition(index) {
	return index * borderLength + (index + 1) * spaceLength;
}
