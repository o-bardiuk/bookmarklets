/*
 * POP UP with vids sorted by views
 */

(function () {

	let videos = new Array();
	let url;
	let views;
	let elements = document.getElementsByClassName('e19c29qe8');
	[...elements].forEach(element => {

		let url = element.querySelector('a');
		let views = element.getElementsByClassName('video-count')[0].innerHTML;
		
		if (views.includes('K')) {views = parseFloat(views) * 1000}  else if
		(views.includes('M')) {views = parseFloat(views) * 1000000} else if
		(views.includes('B')) {views = parseFloat(views) * 1000000000};

		videos.push({u: url, v: views});
		
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
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: flex-start;
    }

    .popup-content {
      background-color: white;
      padding: 80px 20px 20px 20px;
      border-radius: 5px;
      text-align: center;
      min-width: 300px;
    }

    #arrayList {
      list-style-type: none;
      padding: 0;
    }
    
    #arrayList a {
    	font-family: monospace;
    }
    
    #arrayList a:visited {
    	color: red !important;
    }

    #closePopupBtn {
      margin-top: 20px;
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

	popupContent.appendChild(arrayList);
	popupContent.appendChild(closePopupBtn);
	popup.appendChild(popupContent);
	document.body.appendChild(popup);

	arrayList.innerHTML = '';

	// Create list items from array
	videos.forEach(item => {
		const li = document.createElement('li');

		const link = document.createElement('a');
		link.href = item['u'];
		link.textContent = item['v'];
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








