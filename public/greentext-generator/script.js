window.onload = () => {
    console.log("initialize");
    autoUpdate();
};

let typeOfChange = "quoted";

function changeText() {
    const input = document.getElementById("greentext-user-text");

    // Split sections
    let selectionStart = input.selectionStart; // where selected text begins
    const selectionEnd = input.selectionEnd; // where selected text ends

    // Alter the beginning if selection start in the middle of a line
    while (input.value[selectionStart] !== "\n" && selectionStart !== -1) { // as long as the character is not newline and index exists...
        selectionStart--; // go back one character (so go back one character until we reach a newline character (\n) or until we run out of text (-1))
    }

    const beforeSelection = input.value.slice(0, selectionStart+1); // part from beginning until where selected text starts
    const selection = input.value.slice(selectionStart+1, selectionEnd); // selected text
    const afterSelection = input.value.slice(selectionEnd); // part from where selected text ends until the ends

    const unchangedArray = selection.split("\n"); // split selected text into array by newline
    console.log(unchangedArray);

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
    input.value = outputAll; // update text area with new value
}

function changePreview() {

    const input = document.getElementById("greentext-user-text").value; // value in the input container
    const preview = document.getElementById("preview-text"); // preview container
    const unchangedArray = input.split("\n"); // split input value into array by newline

    let changedArray = [];

    unchangedArray.forEach(el => {
        // Check each line if it starts with > or not
        if (el.startsWith(">")) {
            // If yes, it means the line is quoted
            el = el.substring(1); // remove >
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
    typeOfChange = "quoted";
    changeText();
    changePreview();
}

function makeNormalText() { // this function is triggered by button press
    typeOfChange = "normal";
    changeText();
    changePreview();
}

function autoUpdate() { // this functions starts when page loads
    const input = document.getElementById("greentext-user-text");

    setInterval(function() {

        if(input === document.activeElement) { // check if the textbox is currently selected
            changePreview(); // if yes, run the script that updates preview
            //console.log("boop");
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

        container.scrollIntoView({behavior: "smooth"});
    }

    // Convert to canvas
    /*html2canvas(document.getElementById("preview-image-and-text")).then(function(canvas) {
        document.getElementById("final-greentext").appendChild(canvas); // create canvas using a library
        canvas.setAttribute("id", "outputCanvas"); // set id to canvas

        scrollDown();
    });*/
    
    html2canvas(document.getElementById("preview-container"), {/*allowTaint: true*/ useCORS: true}).then(canvas => {
        document.getElementById("final-greentext").appendChild(canvas); // create canvas using a library
        canvas.setAttribute("id", "outputCanvas"); // set id to canvas

        scrollDown();
    })
}

function downloadImage() {
    const link = document.createElement("a"); // virtual link for download
    link.download = "greentext.png"; // default name for the image


    link.href = document.getElementById("outputCanvas").toDataURL("image/png"); // convert canvas to image
    link.click(); // click the virtual link, which opens the download interface
}