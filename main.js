var content;
$.get('banner.html', function(data){
    content= data;
    $('body').prepend(content);
});

//$("a").css('color','#a6a6a6');

