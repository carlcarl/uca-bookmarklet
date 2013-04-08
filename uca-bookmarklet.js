javascript:(function()
{
	if(!($ = window.jQuery))
	{
		script = document.createElement('script');
		script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		script.onload=uca;
		document.body.appendChild(script);
	}
	else
	{
		uca();
	}

	function uca()
	{
		panel = $('<div>');
		panel.css('width', '100%').css('height', '100px').css('z-index', '99999').css('position', 'absolute').css('background-color', 'white');
		panel.hide();
		response = $('<div>');
		panel.append(response);
		$(document.body).prepend(panel);
		$.ajax({
			type: 'GET',
			url: 'http://uca.tw/api/1/', 
			data: {link: location.href}, 
			dataType: 'jsonp',
			success: function(data){
				if(data.err == false)
				{
					linkNode = '<a href="' + data.hashLink + '">' + data.hashLink + '</a>';
					response.html(linkNode);
				}
				else
				{
					msg = '';
					switch(data.msg)
					{
					case -1:
						msg = 'Unknown http error';
						break;
					case 1:
						msg = 'Empty url';
						break;
					case 2:
						msg = 'Empty protocol';
						break;
					case 3:
						msg = 'Invalid protocol';
						break;
					case 4:
						msg = 'url too short';
						break;
					case 5:
					default:
						msg = 'Invalid url';
						break;
					}
					msg = 'Error: ' + msg + '!';
					response.html(msg);
				}
			}
		});
		panel.slideDown('slow');
	}
})()
