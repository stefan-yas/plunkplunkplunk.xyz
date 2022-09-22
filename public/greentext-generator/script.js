// Global
let INPUT_STATE = "inactive";
let typeOfChange = "quoted";
let INPUT_ELEMENT;

function getRandomNumber(min, max) { return Math.random() * (max - min) + min; }

function randomImg() {
    console.log("random img");
    const imgElement = document.getElementById("preview-image-file");
    let url = "https://picsum.photos/id/";
    let imgHeight = 200;
    let imgWidth = 200;

    const randomizeImgDimensions = Math.round(getRandomNumber(0,3)); // increasing the second number will decrease the odds of dimensions being randomized

    // 50% chance to randomize either height or width
    if (randomizeImgDimensions === 0) {
        imgHeight = Math.round(getRandomNumber(100,200))
    } else if (randomizeImgDimensions === 1) {
        imgWidth = Math.round(getRandomNumber(100,200))
    }

    const maxID = 1084;
    const getRandomID = (max) => Math.round(getRandomNumber(0,max));
    let imgID = getRandomID(maxID); // get random img id (1084 is max)

    url = url + imgID + "/" + imgWidth + "/" + imgHeight; // construct url
    imgElement.src = url; // set src to element
    // in the event that the image url isn't valid, onerror in the html restarts this script
}

window.onload = () => {
    console.log("initialize");
    INPUT_ELEMENT = document.getElementById("greentext-user-text");
    inputState();
    randomizeImageSize();
    randomID();
    randomFlag();
    timestamp();
    goToPreview();
    goToEdit();
    toggleImage();
    toggleHeader();
    toggleStyle();
    refreshRandom();
    autoUpdate();
    pepe();
};

function inputState() {
    INPUT_ELEMENT.addEventListener("focusin", function () { // if the textarea is activated, set state to global variable
        if (this == document.activeElement) {
            INPUT_STATE = "active";
        }
    });
}

function changeText() {

    if (INPUT_STATE === "active") { // only run if textarea is active

        // Split sections
        let selectionStart = INPUT_ELEMENT.selectionStart; // where selected text begins
        const selectionEnd = INPUT_ELEMENT.selectionEnd; // where selected text ends

        // Alter the beginning if selection start in the middle of a line
        while 
        (INPUT_ELEMENT.value[selectionStart] !== "\n" && selectionStart !== -1 // as long as the character is not newline and index exists...
        || INPUT_ELEMENT.value[selectionStart] == "\n" && selectionStart == selectionEnd) { // or the charater is newline and selection start and end are the same...
            selectionStart--; // go back one character (so go back one character until we reach a newline character (\n) or until we run out of text (-1))
        }

        const beforeSelection = INPUT_ELEMENT.value.slice(0, selectionStart + 1); // part from beginning until where selected text starts
        const selection = INPUT_ELEMENT.value.slice(selectionStart + 1, selectionEnd); // selected text
        const afterSelection = INPUT_ELEMENT.value.slice(selectionEnd); // part from where selected text ends until the ends

        const unchangedArray = selection.split("\n"); // split selected text into array by newlin
        let quotedArray = [];

        if (typeOfChange === "quoted") {

            // Make text quoted
            unchangedArray.forEach(el => { // for each element in the array...

                if (el[0] == ">") {
                    el = el.substring(1); // remove > at the beginning if there is one (to avoid double quoting)
                }
                el = ">" + el; // add >
                quotedArray.push(el);

            });

        } else if (typeOfChange === "normal") {

            // Make text normal
            unchangedArray.forEach(el => { // for each element in the array...

                if (el[0] == ">") {
                    el = el.substring(1); // remove > at the beginning if there is one
                }
                quotedArray.push(el);
            });
        }

        // Combine sections and update text area
        const outputQuoted = quotedArray.join("\n"); // merge array into a string element
        const outputAll = beforeSelection + outputQuoted + afterSelection; // merge all 3 sections together
        INPUT_ELEMENT.value = outputAll; // update text area with new value
    }
}

function changePreview() {

    const inputValue = INPUT_ELEMENT.value; // value in the input container
    const preview = document.getElementById("preview-text"); // preview container
    const unchangedArray = inputValue.split("\n"); // split input value into array by newline

    let changedArray = [];

    unchangedArray.forEach(el => {
        // Check each line if it starts with > or not
        if (el.startsWith(">")) {
            // If yes, it means the line is quoted
            //el = el.substring(1); // remove >
            el = `<span class="quoted">` + el + `</span>` // apply class

        } else {
            // If no, it means the line is not quoted: 
            el = `<span class="normal">` + el + `</span>` // apply class
        }

        changedArray.push(el); // add elements to the array
    });

    const outputStyled = changedArray.join("\n"); // merge array into a string
    preview.innerHTML = outputStyled; // set value to the preview container
}

function makeQuotedText() { // this function is triggered by button press
    if (INPUT_STATE == "active") {
        typeOfChange = "quoted";
        changeText();
        changePreview();
        INPUT_STATE = "inactive";
    }
}

function makeNormalText() { // this function is triggered by button press
    if (INPUT_STATE == "active") {
        typeOfChange = "normal";
        changeText();
        changePreview();
        INPUT_STATE = "inactive";
    }
}

function autoUpdate() { // this functions starts when page loads
    setInterval(function () {
        if (INPUT_ELEMENT === document.activeElement) { // check if the textbox is currently selected
            changePreview(); // if yes, run the script that updates preview
        }
    }, 3000); // check every x seconds
}

function drawImageOutput() {

    const container = document.getElementById("final-greentext");
    container.textContent = ""; // delete previous element

    function scrollDown() {
        // show download button
        const downloadButton = document.getElementById("download-greentext");
        downloadButton.style.display = "block";
        container.scrollIntoView({ behavior: "smooth" });
    }

    html2canvas(document.getElementById("preview-container"), {
        /*allowTaint: true*/
        useCORS: true
    }).then(canvas => {
        document.getElementById("final-greentext").appendChild(canvas); // create canvas using a library
        canvas.setAttribute("id", "outputCanvas"); // set id to canvas

        scrollDown();
    })
}

function downloadFinalImage() {
    const link = document.createElement("a"); // virtual link for download
    link.download = "greentext.jpeg"; // default name for the image

    let imgCompression = 0.1; // should be optional to lower quality

    link.href = document.getElementById("outputCanvas").toDataURL("image/jpeg", imgCompression); // convert canvas to image
    link.click(); // click the virtual link, which opens the download interface
}

function randomizeImageSize() {
    const element = document.getElementById("random-kb-number");
    const size = Math.round(getRandomNumber(12, 222));

    element.textContent = size;
}

function toggleImage() {
    const checkbox = document.getElementById("image-toggle");
    const image = document.getElementById("preview-image");
    const imageInput = document.getElementById("upload-image");
    const imageInputLabel = document.getElementById("image-picker-label");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            image.style.display = "flex";
            imageInput.disabled = false;
            imageInputLabel.classList.remove("disabled");
        } else {
            image.style.display = "none";
            imageInput.disabled = true;
            imageInputLabel.classList.add("disabled");
        }
    });
}

function uploadImage() {
    const preview = document.getElementById("preview-image-file");
    const file = document.getElementById("upload-image").files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result; // convert image file to base64 string
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

    randomizeImageSize();
}

function randomID() {
    const element = document.getElementById("greentext-random-id");
    const size = Math.round(getRandomNumber(100000000, 999999999));
    element.textContent = "No." + size;
}

function timestamp() {

    const element = document.getElementById("greentext-date");
    const timestamp = new Date();

    const day = String(timestamp.getDate()).padStart(2, 0);
    const month = String(timestamp.getMonth()).padStart(2, 0);
    const year = String(timestamp.getFullYear()).slice(2);

    const weekday = timestamp.getDay();
    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekdayName = week[weekday - 1];

    const hour = String(timestamp.getHours()).padStart(2, 0);
    const min = String(timestamp.getMinutes()).padStart(2, 0);
    const sec = String(timestamp.getSeconds()).padStart(2, 0);

    const date = `${month}/${day}/${year}(${weekdayName})${hour}:${min}:${sec}`;
    element.textContent = date;
}

function toggleHeader() {
    const checkbox = document.getElementById("anonymous");
    const header = document.getElementById("anonymous-date-box");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            header.style.display = "flex";
        } else {
            header.style.display = "none";
        }

        randomID();
        timestamp();
    });
}

function toggleFlag() {
    const checkbox = document.getElementById("flag-toggle");
    const flag = document.getElementById("random-flag");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            flag.style.display = "inherit";
        } else {
            flag.style.display = "none";
        }
    });
}

function toggleStyle() {
    const checkbox = document.getElementById("greentext-style");
    const container = document.getElementById("preview-container");

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            container.className = "new-style";
        } else {
            container.className = "old-style";
        }
    });
}

function randomFlag() {

    const htmlFlagOutput = document.getElementById("random-flag");
    let url = "https://flagcdn.com/";
    const countryNumber = Math.round(getRandomNumber(0, countries.length - 1)); // random number between 0 and legth of array - 1, round it to whole number
    let countryCode = countries[countryNumber].code; // get country code that matches the randomly generated index  above

    countryCode = countryCode.toLowerCase(); // lower case because url requires it
    url = url + countryCode + ".svg"; // construct url
    htmlFlagOutput.src = url; // set src to element
}

function refreshRandom() {

    const flag = document.getElementById("anonymous-flag-container");
    const idAndDate = document.getElementById("timestamp-and-id");

    flag.addEventListener("click", function () {
        randomFlag();
    });
    idAndDate.addEventListener("click", function () {
        randomID();
        timestamp();
    });
}

function scrollToElement(target, block) {
    target.scrollIntoView({behavior: "smooth", block: block});
}

function goToPreview() {
    const button = document.getElementById("goToPreview");
    button.addEventListener("click", function () {
        const target = document.getElementById("preview");
        scrollToElement(target, "start");
    });
}

function goToEdit() {
    const button = document.getElementById("editbox");
    button.addEventListener("click", function () {
        const target = document.getElementById("greentext-input-container");
        scrollToElement(target, "center");
    });
}

function pepe() {
    const generateButton = document.getElementById("generate-greentext");
    generateButton.onclick = function () {
        drawImageOutput();
        (INPUT_ELEMENT.style.background = "no-repeat url(../img/pepe.svg)") && (INPUT_ELEMENT.style.backgroundSize = "contain");
    }
}