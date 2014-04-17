$("#banner").load("banner.html", 
	function() {
		if(document.location.pathname.search('projects')!=-1){
			$(this).find("#projects").addClass('selected');
		}
		else {
			$(this).find("#home").addClass('selected');
		}
	}
);
var months = [ "January", "February", "March", "April", "May", "June", 
			 	"July", "August", "September", "October", "November", "December" ],
	lastMod = new Date(document.lastModified);
$('.content').append('<div class="pull-right"><i>Eric W '+months[lastMod.getMonth()]+', '+lastMod.getFullYear()+'</i></div>');

function isMobile() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}

$( document ).ready(function() {
	if(isMobile()) {
		$('body').css('width','100%');
	}
});

