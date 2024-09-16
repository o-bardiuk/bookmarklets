/*
 * POP UP with vids sorted by views
 */

(function () {

	let videos = new Array();
	let url;
	let views;
	let elements = document.getElementsByTagName('ytd-rich-item-renderer');

	[...elements].forEach(element => {

		let url = element.querySelector('a').getAttribute('href');
		let name = element.querySelector('#video-title').innerHTML;
		let views = element.getElementsByClassName('inline-metadata-item style-scope ytd-video-meta-block')[0].innerHTML;
		views = views.replace(' views', '');
		if (views.includes('K')) {views = parseFloat(views) * 1000}  else if
		(views.includes('M')) {views = parseFloat(views) * 1000000} else if
		(views.includes('B')) {views = parseFloat(views) * 1000000000};

		videos.push({u: url, v: views, n: name});

	});

	videos.sort((a, b) => (a.v > b.v) ? -1 : 1);

	// Create styles dynamically
	const style = document.createElement('style');
	style.textContent = `

    .popup {
      display: none; /* Hidden by default */
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: flex-start;
      z-index: 3000;
      padding-top: 20px;
    }

    .popup-content {
      box-shadow: 0px 0px 400px 30px #000;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      text-align: left;
      min-width: 300px;
    }

    #arrayList {
      list-style-type: none;
      padding: 0;
    }
    
    #arrayList a {
    	font-family: monospace;
    	font-size: 16px !important;
    }
    
    #arrayList a:visited {
    	color: red !important;
    }

    #closePopupBtn {
      margin-bottom: 20px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `;
	document.head.appendChild(style);
	// Create popup elements dynamically
	const popup = document.createElement('div');
	popup.id = 'popup';
	popup.className = 'popup';

	const popupContent = document.createElement('div');
	popupContent.className = 'popup-content';

	const arrayList = document.createElement('ul');
	arrayList.id = 'arrayList';

	const closePopupBtn = document.createElement('button');
	closePopupBtn.id = 'closePopupBtn';
	closePopupBtn.textContent = 'OK';

	popupContent.appendChild(closePopupBtn);
	popupContent.appendChild(arrayList);
	popup.appendChild(popupContent);
	document.body.appendChild(popup);

	arrayList.innerHTML = '';

	// Create list items from array
	videos.forEach(item => {
		const li = document.createElement('li');

		const link = document.createElement('a');
		link.href = item['u'];
		link.textContent = item['v'] + ' ' + item['n'];
		link.target = '_blank';

		li.appendChild(link);
		arrayList.appendChild(li);
	});

	// Show the popup
	popup.style.display = 'flex';

	// Add event listener to close popup button
	closePopupBtn.addEventListener('click', function() {
		// Hide the popup
		popup.style.display = 'none';
	});
})();

