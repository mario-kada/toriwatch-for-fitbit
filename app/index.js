import { me } from "appbit";
import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import { preferences } from "user-settings";
import * as util from "./utils";
import { goals } from "user-activity";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";
const mySteps = document.getElementById("mySteps");
const myHRT = document.getElementById("myHRT");

let settings = loadSettings();
applyTheme(settings.background, settings.foreground);

// TIME
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

//STEPS
let steps0 = document.getElementById("steps0");
let steps1 = document.getElementById("steps1");
let steps2 = document.getElementById("steps2");
let steps3 = document.getElementById("steps3");
let steps4 = document.getElementById("steps4");
let steps5 = document.getElementById("steps5");

//HRT
let hrt0 = document.getElementById("hrt0");
let hrt1 = document.getElementById("hrt1");
let hrt2 = document.getElementById("hrt2");

// DATE
// let day = document.getElementById("day");
// let date1 = document.getElementById("date1");
// let date2 = document.getElementById("date2");

clock.granularity = "seconds";

clock.ontick = evt => {
  let d = evt.date;

  // DATE
  // setDate(d.getDate());

  // DAY NAME
  // setDay(d.getDay());

  // HOURS
  let hours =  ("0" +d.getHours()).slice(-2);
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  setHours(hours);

  // MINUTES
  let minute = ("0" + d.getMinutes()).slice(-2);
  setMins(minute);

  // BLINK SEPARATOR
  setSeparator(d.getSeconds());
  
  // Steps ----------------------------------------------------------------------------------------------------------------

  let myStepsVal = (today.local.steps || 0);
  let myStepsValString = myStepsVal + "";
  let stepsArray = [steps0,steps1,steps2,steps3,steps4,steps5];
//console.log(myStepsValString.length);
  for (var a = 0; a < myStepsValString.length; a++) {
    //let id = "steps" + a;
    let letter = myStepsValString.slice(a,a+1)+ "-small";
    drawDigit(letter, stepsArray[a]);
  }

  // Steps  End----------------------------------------------------------------------------------------------------------------
  
 //HRT ----------------------------------------------------------------------------------------------------------------
// Create a new instance of the HeartRateSensor object

var hrm = new HeartRateSensor();
hrm.onreading = function() {
  // Peek the current sensor values
  //console.log("Current heart rate: " + hrm.heartRate);
  let myHRTVal = (hrm.heartRate);
  let myHRTValString = myHRTVal + ""; 
  let hrtArray = [hrt0,hrt1,hrt2];
  hrt0.image = "";
  hrt1.image = "";
  hrt2.image = "";
  for (var j = 0; j < myHRTValString.length; j++) {
    let hrtLetter = myHRTValString.slice(j,j+1) + "-small";
    drawDigit(hrtLetter, hrtArray[j]);
  }
 

  // Stop monitoring the sensor
  hrm.stop();
}
// Begin monitoring the sensor
hrm.start();
  

  // HRT  End----------------------------------------------------------------------------------------------------------------
}

// Apply theme colors to elements
function applyTheme(background, foreground) {
  let items = document.getElementsByClassName("background");
  items.forEach(function(item) {
    item.style.fill = background;
  });
  let items = document.getElementsByClassName("foreground");
  items.forEach(function(item) {
    item.style.fill = foreground;
  });
  settings.background = background;
  settings.foreground = foreground;
}

// Blink time separator
function setSeparator(val) {
  separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("0", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}


// function setDate(val) {
//   drawDigit(Math.floor(val / 10), date1);
//   drawDigit(Math.floor(val % 10), date2);
// }

// function setDay(val) {
//   day.image = getDayImg(val);
// }

function drawDigit(val, place) {
  place.image = `${val}.png`;
}

// function getDayImg(index) {
//   let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
//   return `day_${days[index]}.png`;
// }

// Listen for the onmessage event
messaging.peerSocket.onmessage = evt => {
  applyTheme(evt.data.background, evt.data.foreground);
}

// Register for the unload event
me.onunload = saveSettings;

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      background: "#000000",
      foreground: "#FFFFFF"
    }
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}


