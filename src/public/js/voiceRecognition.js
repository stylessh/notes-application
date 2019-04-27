let inputTitle = document.querySelector('#icon-title');

let inputDescription = document.querySelector('#icon-description');


inputTitle.addEventListener('click', ()=> {
  
    let rec;
	if(!("webkitSpeechRecognition" in window)) {
		alert("Sorry, you can't use this API")
	} else {
		rec = new webkitSpeechRecognition();
		rec.lang = "es-AR";
		rec.continuous = false;
		rec.interin = true;
		rec.addEventListener("result", init);
	}

function init(event) {
	for(i = event.resultIndex; i < event.results.length; i++) {
		document.querySelector('.input-title').value = event.results[i][0].transcript;
	}
}

rec.start();

});


inputDescription.addEventListener('click', ()=> {
  
    let rec;
	if(!("webkitSpeechRecognition" in window)) {
		alert("Sorry, you can't use this API")
	} else {
		rec = new webkitSpeechRecognition();
		rec.lang = "es-AR";
		rec.continuous = false;
		rec.interin = true;
		rec.addEventListener("result", init);
	}

function init(event) {
	for(i = event.resultIndex; i < event.results.length; i++) {
		document.querySelector('.input-description').value = event.results[i][0].transcript;
	}
}

rec.start();

});