/*
 * Sorts all videos at the channel's page by views, 
 * creates a playlist and opens it in current tab.
 */

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
document.body.appendChild(script);

function loadAfter$() {
    var str = 'https://www.youtube.com/watch_videos?feature=c4-overview&type=0&video_ids=';
	var videos = new Array();
	var elements = new Array();
	elements = $('ytd-rich-item-renderer').each(function(){
	  var url = $(this).find('[id=\'thumbnail\'][rel=\'null\']').attr('href').replace('/watch?v=', '').replace('/shorts/', '').split('&')[0];
	  videos.push({u: url});
	});
	for (var i in videos) {
		str = str + videos[i]['u'] + ',';
	}
	alert(str);
	window.location = str;
}

const t = setTimeout(loadAfter$, 1000);


