var content;
$.get('banner.html', function(data){
    content= data;
    $('body').prepend(content);
});
var months = [ "January", "February", "March", "April", "May", "June", 
			 	"July", "August", "September", "October", "November", "December" ],
	lastMod = new Date(document.lastModified);
$('.content').append('<p class="pull-right"><i>Eric W '+months[lastMod.getMonth()]+', '+lastMod.getFullYear()+'</i></p>');