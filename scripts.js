/*
TODO: 	Due to css transition now adding 360 deg each minute-
		rotation variable in setSecondHand() will reach max int-
		value in 25,019,997,929,836.09 minutes. Should not be a-
		problem but may cause issues for transform property.

TODO: 	Support for different timezones

TODO: 	Antialiasing support for firefox

TODO: 	Markings/Labels

TODO: 	Adjust second hand transition speed
*/


var refreshRate = document.getElementById('refreshRate').value;

var secondRotations = 0; // number of rotations the second hand has done
var canCompleteSecondRotation = true; // if false, second hand has just completed a full rotation

var minuteRotations = 0;
var canCompleteMinuteRotation = true;

var hourRotations = 0;
var canCompleteHourRotation = true;


//============================================================================
 
const openSideBar = () => {
	document.getElementById('sideBar').style.width = '250px';
	//document.getElementById('main').style.marginLeft = '250px';
}

const closeSideBar = () => {
	document.getElementById('sideBar').style.width = '0';
	//document.getElementById('main').style.marginLeft = '0';
}

//============================================================================

const setRefreshRate = (rate) => {
	refreshRate = rate;
	console.log(refreshRate);
}

const setBackgroundColor = (color) => {
	document.getElementsByTagName('body')[0].style.backgroundColor = color;
}

//============================================================================

const setDigitalTime = (time) => {
	let digitalTimeElement = document.getElementById('digitalTime');
	digitalTimeElement.innerHTML = time;
}

const setSecondHand = (seconds) => {
	// Do not increase second rotations if canCompleteSecondRotation is false
	if ((seconds === 0) && canCompleteSecondRotation === true) {
		secondRotations += 1;
		canCompleteSecondRotation = false // second hand can no longer complete a full rotation as they have just done so	
	} else if (seconds === 1) {
		canCompleteSecondRotation = true // second hand can once again complete a full rotation
	}
	let rotation = (secondRotations * 360) + (seconds * 6);
	document.getElementById('secondHand').style.transform = `rotate(${rotation}deg)`;
}

const setMinuteHand = (minutes) => {
	if (minutes === 0 && canCompleteMinuteRotation === true) {
		minuteRotations += 1;
		canCompleteMinuteRotation = false;
	} else if (minutes === 1) {
		canCompleteMinuteRotation = true;
	}
	let rotation = (minuteRotations * 360 ) + (minutes * 6);
	document.getElementById('minuteHand').style.transform = `rotate(${rotation}deg)`;
}

const setHourHand = (hours) => {
	if (hours >= 12) {
		hours -= 12;
	} 

	if (hours === 0 && canCompleteHourRotation === true) {
		hourRotations += 1;
		canCompleteHourRotation = false;
	} else if (hours === 2) {
		canCompleteHourRotation = true;
	}
	let rotation = (hourRotations * 360) + (hours * 30)
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

//============================================================================

const getCurrentDate = () => {
	let d = new Date();
	return d;
}

const mainLoop = () => {
	let currentDate = getCurrentDate();
	setAnalogTime(currentDate);
	setDigitalTime(currentDate);
	setTimeout(mainLoop, refreshRate);
}

mainLoop();