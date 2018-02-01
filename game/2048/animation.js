//use jQuery, as I can not write the javascript animation
function showNumWithAnimation(x, y, number) {
	var cell = $('number_cell_' + x + '_' + y);
	cell.css('background-color', getFontColor(number));
	cell.css('color', getNumberColor(number));
	number_cell.text(number);
	cell.animate({
		width: borderLength,
		height: borderLength,
		top: getPosition(x),
		left: getPosition(y)
	}, 60);
}

function moveCellWithAnimation(fromX, fromY, toX, toY) {
	var cell = $('number_cell_' + fromX + '_' + fromY);
	cell.animate({
		top: getPosition(toX),
		left: getPosition(toY)
	}, 200);
}

function getNumberColor(number) {
	if (number <= 4)
		return '#776e65';
	return 'white';
}

