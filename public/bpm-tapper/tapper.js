let time1;
let time2;
let time3;
let time4;
let time5;

let interval1;
let interval2;
let interval3;
let interval4;
let interval0;

let lastWritten = "";

function logKey() {

  if (lastWritten === "") {

    lastWritten = "sample1";
    //console.log(lastWritten);
    time1 = Date.now();
    //console.log(time1);
    document.getElementById("sample1").textContent = time1;

  } else if (lastWritten === "sample1") {

    lastWritten = "sample2";
    //console.log(lastWritten);
    time2 = Date.now();
    //console.log(time2);
    document.getElementById("sample2").textContent = time2;

    interval1 = time2 - time1;
    //console.log(interval1);
    document.getElementById("interval1").textContent = interval1;

  } else if (lastWritten === "sample2") {

    lastWritten = "sample3";
    //console.log(lastWritten);
    time3 = Date.now();
    //console.log(time3);
    document.getElementById("sample3").textContent = time3;

    interval2 = time3 - time2;
    //console.log(interval2);
    document.getElementById("interval2").textContent = interval2;

  } else if (lastWritten === "sample3") {

    lastWritten = "sample4";
    //console.log(lastWritten);
    time4 = Date.now();
    //console.log(time4);
    document.getElementById("sample4").textContent = time4;

    interval3 = time4 - time3;
    //console.log(interval3);
    document.getElementById("interval3").textContent = interval3;

  } else if (lastWritten === "sample4") {
    lastWritten = "sample5";
    //console.log(lastWritten);
    time5 = Date.now();
    //console.log(time5);
    document.getElementById("sample5").textContent = time5;

    interval4 = time5 - time4;
    //console.log(interval4);
    document.getElementById("interval4").textContent = interval4;

  } else if (lastWritten === "sample5") {

    lastWritten = "sample1";
    //console.log(lastWritten);
    time1 = Date.now();
    //console.log(time1);
    document.getElementById("sample1").textContent = time1;

    interval0 = time1 - time5;
    //console.log(interval0);
    document.getElementById("interval0").textContent = interval0;

  } else {}

}


function updateAverage() {
  if (interval0) {
    var averageMS = document.getElementById("averageMS").textContent = (interval1 + interval2 + interval3 + interval4 + interval0) / 5;
    document.getElementById("averageS").textContent = averageMS / 1000;
    var bpm = document.getElementById("bpm").textContent = 60 / averageMS * 1000;
    document.getElementById("bps").textContent = bpm / 60;
  } else {}
}