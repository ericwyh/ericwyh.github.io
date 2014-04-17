var content;
$.get('banner.html', function(data){
    content= data;
    $('body').prepend(content);
});

$("#edit").append('123');
