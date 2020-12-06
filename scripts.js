var refreshRate = document.getElementById('refreshRate').value;
var secondRotations = 0;
var lastFullRotation;
/*
TODO: Fix css transition
TODO: Support for different timezones
*/
 
const openNav = () => {
	document.getElementById('sideBar').style.width = '250px';
	//document.getElementById('main').style.marginLeft = '250px';
}

const closeNav = () => {
	document.getElementById('sideBar').style.width = '0';
	//document.getElementById('main').style.marginLeft = '0';
}

const setRefreshRate = (rate) => {
	refreshRate = rate;
	console.log(refreshRate);
}

const setBackgroundColor = (color) => {
	document.getElementsByTagName('body')[0].style.backgroundColor = color;
}

const getCurrentDate = () => {
	let d = new Date();
	return d;
}

const setDigitalTime = (time) => {
	let digitalTimeElement = document.getElementById('digitalTime');
	digitalTimeElement.innerHTML = time;
}

const setSecondHand = (seconds) => {
	if (seconds * 6 === 0 && lastFullRotation !== (secondRotations * 360) + (360)) {
		lastFullRotation = (secondRotations * 360) + (seconds * 6);
		secondRotations += 1;
		console.log(lastFullRotation);
	} 
	//console.log(`rotations completed: ${secondRotations}`)
	let rotation = (secondRotations * 360) + (seconds * 6);
	document.getElementById('secondHand').style.transform = `rotate(${rotation}deg)`;
}

const setMinuteHand = (minutes) => {
	let rotation = minutes * 6;
	document.getElementById('minuteHand').style.transform = `rotate(${rotation}deg)`;
}

const setHourHand = (hours) => {
	if (hours >= 12) {
		var rotation = (hours - 12) * 30;
	} else {
		var rotation = hours * 30;
	}
	document.getElementById('hourHand').style.transform = `rotate(${rotation}deg)`;
}

const setAnalogTime = (time) => {
	let seconds = time.getSeconds();
	let minutes = time.getMinutes();
	let hours = time.getHours();

	setSecondHand(seconds);
	setMinuteHand(minutes);
	setHourHand(hours);
}

const mainLoop = () => {
	let currentDate = getCurrentDate();
	setAnalogTime(currentDate);
	setDigitalTime(currentDate);
	setTimeout(mainLoop, refreshRate);
}

mainLoop();