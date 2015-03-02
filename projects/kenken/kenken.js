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
	var size = selectionCriteria.size, container = $('#grid').empty(), tableSideLength = $('main').width(), tbody = $('<tbody>'), count = 0;

	for(i=0; i<size; i++) {
		var row = $('<tr>');
		for(m=0; m<size; m++) {
			row.append($('<td>').addClass('t'+(++count))
        .append($('<div>').addClass('cell').css('height',(0.99*tableSideLength/size)+'px')
          .append($('<div>').addClass('hint').html('&nbsp;8&plus;'))
          .append($('<div>').addClass('num n'+count))));
		}
		tbody.append(row);
	}

	container.append(tbody);
	$('#grid').css({height:tableSideLength, width:tableSideLength});
	$('td').hover(
		function() {
			$(this).addClass('hover');
      var num = $(this).children().eq(1);
		},
		function() {
			$(this).removeClass('hover');
      var num = $(this).children().eq(1);
      if(num.text()=='??') {
       num.css('color','#fff'); 
      }
		}
	);

  $('td > .cell').click(function() {
    var cellWidth = $(this).width();
    if($(this).children().length<3) {
      var ul = $('<ul>').attr('class','dropdown-menu').css('width',cellWidth);
      var createLi = function(i) {
        return $('<li>').attr('role','presentation').append($('<a>').attr({'href':'#','tabindex':'-1','role':'menuitem'}).text(i))
      }
      for(i=1;i<=size;i++) {
        ul.append(createLi(i));
      }
      ul.append(createLi('Clear'));

      $(this).append($('<div>').css({'position':'absolute'}).append(ul));
    }
    var num = $(this).children().eq(1);
    $(this).find('ul').each(function(){
      $(this).toggle();
      $(this).children().each(function(){
        $(this).click(function(){
          var val = $(this).children().eq(0).text();
          if(val=='Clear') {
            val = '';
          }
          num.text(val);
        });
      });
      return false;
    });
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