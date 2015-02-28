var selectionCriteria = {
	size : 3,
	operations : ['addition'],
};

$(document).ready(function() {
	var size = $('#size');
	for(i=3; i<10; i++) {
		size.next().append($('<li>').attr('role','presentation')
			.append($('<a>').attr({'value': i, 'role': 'menuitem', 'tabindex':'-1', 'href':'#'})
			.append(i+' &times; '+i)));	
	}

	var operationsSelect = $('#operations'), operations = ['&plus;', '&minus;', '&times;', '&divide;'];
	for(i=0; i<4; i++) {
		var text = '';
		for(m=0; m<=i; m++) {
			text += operations[m]+' ';
		}
		operationsSelect.next().append($('<li>').attr('role','presentation')
			.append($('<a>').attr({'value': i, 'role': 'menuitem', 'tabindex':'-1', 'href':'#'})
			.append(text)));
	}

	$('ul > li > a').click(function() {
		selectionCriteria[$(this).parent().parent().prev().attr('id')] = $(this).attr('value');
    $(this).parent().parent().prev().children().eq(0).text($(this).text());
	});
});


$('#start').click(function() {
	var size = selectionCriteria.size;

	var container = $('#grid').empty(), tableSideLength = $('main').width(), tbody = $('<tbody>'), count = 0;


	for(i=0; i<size; i++) {
		var row = $('<tr>');
		for(m=0; m<size; m++) {
			var center = $('<div>').addClass('num'), td = $('<td>');
			td.append('<div class="hint" data-toggle="tooltip" title="" data-original-title="Another one here too">8&times</div>');
			td.append(center.text(++count));
			row.append(td);
		}
		tbody.append(row);
	}

	container.append(tbody);
	$('#grid').css({height:tableSideLength, width:tableSideLength});
	$('td').css('vertical-align','');
	$('td').hover(
		function() {
			$(this).css({ 'background-color':'#E0E1E1', 'cursor': 'pointer' });

		},
		function() {
			$(this).css('background-color','#FFFFFF');
		}
	);

  $('td').click(function() {
    $(this).children().eq(1).text('$');
  });
});

//use array with length equal to grid length and contains boolean values, representing if number(the index + 1) has been used. 
//we also keep track of number of valid numbers, this way we can avoid the possibility of generating duplicate values for rows at least.

//maybe try having boolean arrays for both horizontal and diagonal

function generateGrid(l) {
	//var cell = {hint:''};
	var grid = [], lastFailed = [], lastTried = [];
	for(i=0;i<l;i++) {
		row = [];
		for(j=0; j<l;j++) {
			var number, isNumberValid = false;
			while(!isNumberValid) {
				number = getRandomNumber();
				var isInvalid = false;
				if(i>0) {
					for(k=0;k<i;k++) {
						if(number==grid[i][j]) {
							isInvalid = true;
							break;
						}
					}
				}
				if(!isInvalid) {
					for(m=0;m<row.length;m++) {
						if(number==row[m]) {
							isInvalid = true;
							break;
						}
					}
				}
				if(!isInvalid) {
					isNumberValid = true;
				}
			}
			row.push(number);
		}
		grid.push(row);
	}

	function getRandomNumber() {
		return Math.floor(Math.random()*l) + 1;
	}

	return grid;
}