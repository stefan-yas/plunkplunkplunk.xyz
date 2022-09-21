window.onload = () => {
    console.log("initialize");
    randomizeImageSize();
    randomID();
    randomFlag();
    timestamp();
    toggleImage();
    toggleHeader();
    autoUpdate();
    toggleStyle();
};

let typeOfChange = "quoted";

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function changeText() {
    const input = document.getElementById("greentext-user-text");

    // Split sections
    let selectionStart = input.selectionStart; // where selected text begins
    const selectionEnd = input.selectionEnd; // where selected text ends

    // Alter the beginning if selection start in the middle of a line
    while (input.value[selectionStart] !== "\n" && selectionStart !== -1) { // as long as the character is not newline and index exists...
        selectionStart--; // go back one character (so go back one character until we reach a newline character (\n) or until we run out of text (-1))
    }

    const beforeSelection = input.value.slice(0, selectionStart + 1); // part from beginning until where selected text starts
    const selection = input.value.slice(selectionStart + 1, selectionEnd); // selected text
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

    // scroll down?
    /*const ccc = document.getElementById("textarea");
    ccc.scrollIntoView({behavior: "smooth"});*/
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

    setInterval(function () {

        if (input === document.activeElement) { // check if the textbox is currently selected
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

        container.scrollIntoView({
            behavior: "smooth"
        });
    }

    // Convert to canvas
    /*html2canvas(document.getElementById("preview-image-and-text")).then(function(canvas) {
        document.getElementById("final-greentext").appendChild(canvas); // create canvas using a library
        canvas.setAttribute("id", "outputCanvas"); // set id to canvas

        scrollDown();
    });*/

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
    link.download = "greentext.png"; // default name for the image


    link.href = document.getElementById("outputCanvas").toDataURL("image/png"); // convert canvas to image
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

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            image.style.display = "flex";
        } else {
            image.style.display = "none";
        }

        randomizeImageSize();
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

    const countries = [{
            "name": "Afghanistan",
            "code": "AF"
        },
        {
            "name": "land Islands",
            "code": "AX"
        },
        {
            "name": "Albania",
            "code": "AL"
        },
        {
            "name": "Algeria",
            "code": "DZ"
        },
        {
            "name": "American Samoa",
            "code": "AS"
        },
        {
            "name": "AndorrA",
            "code": "AD"
        },
        {
            "name": "Angola",
            "code": "AO"
        },
        {
            "name": "Anguilla",
            "code": "AI"
        },
        {
            "name": "Antarctica",
            "code": "AQ"
        },
        {
            "name": "Antigua and Barbuda",
            "code": "AG"
        },
        {
            "name": "Argentina",
            "code": "AR"
        },
        {
            "name": "Armenia",
            "code": "AM"
        },
        {
            "name": "Aruba",
            "code": "AW"
        },
        {
            "name": "Australia",
            "code": "AU"
        },
        {
            "name": "Austria",
            "code": "AT"
        },
        {
            "name": "Azerbaijan",
            "code": "AZ"
        },
        {
            "name": "Bahamas",
            "code": "BS"
        },
        {
            "name": "Bahrain",
            "code": "BH"
        },
        {
            "name": "Bangladesh",
            "code": "BD"
        },
        {
            "name": "Barbados",
            "code": "BB"
        },
        {
            "name": "Belarus",
            "code": "BY"
        },
        {
            "name": "Belgium",
            "code": "BE"
        },
        {
            "name": "Belize",
            "code": "BZ"
        },
        {
            "name": "Benin",
            "code": "BJ"
        },
        {
            "name": "Bermuda",
            "code": "BM"
        },
        {
            "name": "Bhutan",
            "code": "BT"
        },
        {
            "name": "Bolivia",
            "code": "BO"
        },
        {
            "name": "Bosnia and Herzegovina",
            "code": "BA"
        },
        {
            "name": "Botswana",
            "code": "BW"
        },
        {
            "name": "Bouvet Island",
            "code": "BV"
        },
        {
            "name": "Brazil",
            "code": "BR"
        },
        {
            "name": "British Indian Ocean Territory",
            "code": "IO"
        },
        {
            "name": "Brunei Darussalam",
            "code": "BN"
        },
        {
            "name": "Bulgaria",
            "code": "BG"
        },
        {
            "name": "Burkina Faso",
            "code": "BF"
        },
        {
            "name": "Burundi",
            "code": "BI"
        },
        {
            "name": "Cambodia",
            "code": "KH"
        },
        {
            "name": "Cameroon",
            "code": "CM"
        },
        {
            "name": "Canada",
            "code": "CA"
        },
        {
            "name": "Cape Verde",
            "code": "CV"
        },
        {
            "name": "Cayman Islands",
            "code": "KY"
        },
        {
            "name": "Central African Republic",
            "code": "CF"
        },
        {
            "name": "Chad",
            "code": "TD"
        },
        {
            "name": "Chile",
            "code": "CL"
        },
        {
            "name": "China",
            "code": "CN"
        },
        {
            "name": "Christmas Island",
            "code": "CX"
        },
        {
            "name": "Cocos (Keeling) Islands",
            "code": "CC"
        },
        {
            "name": "Colombia",
            "code": "CO"
        },
        {
            "name": "Comoros",
            "code": "KM"
        },
        {
            "name": "Congo",
            "code": "CG"
        },
        {
            "name": "Congo, The Democratic Republic of the",
            "code": "CD"
        },
        {
            "name": "Cook Islands",
            "code": "CK"
        },
        {
            "name": "Costa Rica",
            "code": "CR"
        },
        {
            "name": "Cote D'Ivoire ",
            "code ": "CI"
        }, {
            "name": "Croatia",
            "code": "HR"
        },
        {
            "name": "Cuba",
            "code": "CU"
        },
        {
            "name": "Cyprus",
            "code": "CY"
        },
        {
            "name": "Czech Republic",
            "code": "CZ"
        },
        {
            "name": "Denmark",
            "code": "DK"
        },
        {
            "name": "Djibouti",
            "code": "DJ"
        },
        {
            "name": "Dominica",
            "code": "DM"
        },
        {
            "name": "Dominican Republic",
            "code": "DO"
        },
        {
            "name": "Ecuador",
            "code": "EC"
        },
        {
            "name": "Egypt",
            "code": "EG"
        },
        {
            "name": "El Salvador",
            "code": "SV"
        },
        {
            "name": "Equatorial Guinea",
            "code": "GQ"
        },
        {
            "name": "Eritrea",
            "code": "ER"
        },
        {
            "name": "Estonia",
            "code": "EE"
        },
        {
            "name": "Ethiopia",
            "code": "ET"
        },
        {
            "name": "Falkland Islands (Malvinas)",
            "code": "FK"
        },
        {
            "name": "Faroe Islands",
            "code": "FO"
        },
        {
            "name": "Fiji",
            "code": "FJ"
        },
        {
            "name": "Finland",
            "code": "FI"
        },
        {
            "name": "France",
            "code": "FR"
        },
        {
            "name": "French Guiana",
            "code": "GF"
        },
        {
            "name": "French Polynesia",
            "code": "PF"
        },
        {
            "name": "French Southern Territories",
            "code": "TF"
        },
        {
            "name": "Gabon",
            "code": "GA"
        },
        {
            "name": "Gambia",
            "code": "GM"
        },
        {
            "name": "Georgia",
            "code": "GE"
        },
        {
            "name": "Germany",
            "code": "DE"
        },
        {
            "name": "Ghana",
            "code": "GH"
        },
        {
            "name": "Gibraltar",
            "code": "GI"
        },
        {
            "name": "Greece",
            "code": "GR"
        },
        {
            "name": "Greenland",
            "code": "GL"
        },
        {
            "name": "Grenada",
            "code": "GD"
        },
        {
            "name": "Guadeloupe",
            "code": "GP"
        },
        {
            "name": "Guam",
            "code": "GU"
        },
        {
            "name": "Guatemala",
            "code": "GT"
        },
        {
            "name": "Guernsey",
            "code": "GG"
        },
        {
            "name": "Guinea",
            "code": "GN"
        },
        {
            "name": "Guinea-Bissau",
            "code": "GW"
        },
        {
            "name": "Guyana",
            "code": "GY"
        },
        {
            "name": "Haiti",
            "code": "HT"
        },
        {
            "name": "Heard Island and Mcdonald Islands",
            "code": "HM"
        },
        {
            "name": "Holy See (Vatican City State)",
            "code": "VA"
        },
        {
            "name": "Honduras",
            "code": "HN"
        },
        {
            "name": "Hong Kong",
            "code": "HK"
        },
        {
            "name": "Hungary",
            "code": "HU"
        },
        {
            "name": "Iceland",
            "code": "IS"
        },
        {
            "name": "India",
            "code": "IN"
        },
        {
            "name": "Indonesia",
            "code": "ID"
        },
        {
            "name": "Iran, Islamic Republic Of",
            "code": "IR"
        },
        {
            "name": "Iraq",
            "code": "IQ"
        },
        {
            "name": "Ireland",
            "code": "IE"
        },
        {
            "name": "Isle of Man",
            "code": "IM"
        },
        {
            "name": "Israel",
            "code": "IL"
        },
        {
            "name": "Italy",
            "code": "IT"
        },
        {
            "name": "Jamaica",
            "code": "JM"
        },
        {
            "name": "Japan",
            "code": "JP"
        },
        {
            "name": "Jersey",
            "code": "JE"
        },
        {
            "name": "Jordan",
            "code": "JO"
        },
        {
            "name": "Kazakhstan",
            "code": "KZ"
        },
        {
            "name": "Kenya",
            "code": "KE"
        },
        {
            "name": "Kiribati",
            "code": "KI"
        },
        {
            "name": "South Korea",
            "code": "KR"
        },
        {
            "name": "Kuwait",
            "code": "KW"
        },
        {
            "name": "Kyrgyzstan",
            "code": "KG"
        },
        {
            "name": "Latvia",
            "code": "LV"
        },
        {
            "name": "Lebanon",
            "code": "LB"
        },
        {
            "name": "Lesotho",
            "code": "LS"
        },
        {
            "name": "Liberia",
            "code": "LR"
        },
        {
            "name": "Libyan Arab Jamahiriya",
            "code": "LY"
        },
        {
            "name": "Liechtenstein",
            "code": "LI"
        },
        {
            "name": "Lithuania",
            "code": "LT"
        },
        {
            "name": "Luxembourg",
            "code": "LU"
        },
        {
            "name": "Macao",
            "code": "MO"
        },
        {
            "name": "Macedonia, The Former Yugoslav Republic of",
            "code": "MK"
        },
        {
            "name": "Madagascar",
            "code": "MG"
        },
        {
            "name": "Malawi",
            "code": "MW"
        },
        {
            "name": "Malaysia",
            "code": "MY"
        },
        {
            "name": "Maldives",
            "code": "MV"
        },
        {
            "name": "Mali",
            "code": "ML"
        },
        {
            "name": "Malta",
            "code": "MT"
        },
        {
            "name": "Marshall Islands",
            "code": "MH"
        },
        {
            "name": "Martinique",
            "code": "MQ"
        },
        {
            "name": "Mauritania",
            "code": "MR"
        },
        {
            "name": "Mauritius",
            "code": "MU"
        },
        {
            "name": "Mayotte",
            "code": "YT"
        },
        {
            "name": "Mexico",
            "code": "MX"
        },
        {
            "name": "Micronesia, Federated States of",
            "code": "FM"
        },
        {
            "name": "Moldova, Republic of",
            "code": "MD"
        },
        {
            "name": "Monaco",
            "code": "MC"
        },
        {
            "name": "Mongolia",
            "code": "MN"
        },
        {
            "name": "Montenegro",
            "code": "ME"
        },
        {
            "name": "Montserrat",
            "code": "MS"
        },
        {
            "name": "Morocco",
            "code": "MA"
        },
        {
            "name": "Mozambique",
            "code": "MZ"
        },
        {
            "name": "Myanmar",
            "code": "MM"
        },
        {
            "name": "Namibia",
            "code": "NA"
        },
        {
            "name": "Nauru",
            "code": "NR"
        },
        {
            "name": "Nepal",
            "code": "NP"
        },
        {
            "name": "Netherlands",
            "code": "NL"
        },
        {
            "name": "Netherlands Antilles",
            "code": "AN"
        },
        {
            "name": "New Caledonia",
            "code": "NC"
        },
        {
            "name": "New Zealand",
            "code": "NZ"
        },
        {
            "name": "Nicaragua",
            "code": "NI"
        },
        {
            "name": "Niger",
            "code": "NE"
        },
        {
            "name": "Nigeria",
            "code": "NG"
        },
        {
            "name": "Niue",
            "code": "NU"
        },
        {
            "name": "Norfolk Island",
            "code": "NF"
        },
        {
            "name": "Northern Mariana Islands",
            "code": "MP"
        },
        {
            "name": "Norway",
            "code": "NO"
        },
        {
            "name": "Oman",
            "code": "OM"
        },
        {
            "name": "Pakistan",
            "code": "PK"
        },
        {
            "name": "Palau",
            "code": "PW"
        },
        {
            "name": "Palestinian Territory, Occupied",
            "code": "PS"
        },
        {
            "name": "Panama",
            "code": "PA"
        },
        {
            "name": "Papua New Guinea",
            "code": "PG"
        },
        {
            "name": "Paraguay",
            "code": "PY"
        },
        {
            "name": "Peru",
            "code": "PE"
        },
        {
            "name": "Philippines",
            "code": "PH"
        },
        {
            "name": "Pitcairn",
            "code": "PN"
        },
        {
            "name": "Poland",
            "code": "PL"
        },
        {
            "name": "Portugal",
            "code": "PT"
        },
        {
            "name": "Puerto Rico",
            "code": "PR"
        },
        {
            "name": "Qatar",
            "code": "QA"
        },
        {
            "name": "Reunion",
            "code": "RE"
        },
        {
            "name": "Romania",
            "code": "RO"
        },
        {
            "name": "Russian Federation",
            "code": "RU"
        },
        {
            "name": "RWANDA",
            "code": "RW"
        },
        {
            "name": "Saint Helena",
            "code": "SH"
        },
        {
            "name": "Saint Kitts and Nevis",
            "code": "KN"
        },
        {
            "name": "Saint Lucia",
            "code": "LC"
        },
        {
            "name": "Saint Pierre and Miquelon",
            "code": "PM"
        },
        {
            "name": "Saint Vincent and the Grenadines",
            "code": "VC"
        },
        {
            "name": "Samoa",
            "code": "WS"
        },
        {
            "name": "San Marino",
            "code": "SM"
        },
        {
            "name": "Sao Tome and Principe",
            "code": "ST"
        },
        {
            "name": "Saudi Arabia",
            "code": "SA"
        },
        {
            "name": "Senegal",
            "code": "SN"
        },
        {
            "name": "Serbia",
            "code": "RS"
        },
        {
            "name": "Seychelles",
            "code": "SC"
        },
        {
            "name": "Sierra Leone",
            "code": "SL"
        },
        {
            "name": "Singapore",
            "code": "SG"
        },
        {
            "name": "Slovakia",
            "code": "SK"
        },
        {
            "name": "Slovenia",
            "code": "SI"
        },
        {
            "name": "Solomon Islands",
            "code": "SB"
        },
        {
            "name": "Somalia",
            "code": "SO"
        },
        {
            "name": "South Africa",
            "code": "ZA"
        },
        {
            "name": "South Georgia and the South Sandwich Islands",
            "code": "GS"
        },
        {
            "name": "Spain",
            "code": "ES"
        },
        {
            "name": "Sri Lanka",
            "code": "LK"
        },
        {
            "name": "Sudan",
            "code": "SD"
        },
        {
            "name": "Suriname",
            "code": "SR"
        },
        {
            "name": "Svalbard and Jan Mayen",
            "code": "SJ"
        },
        {
            "name": "Swaziland",
            "code": "SZ"
        },
        {
            "name": "Sweden",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "code": "CH"
        },
        {
            "name": "Syrian Arab Republic",
            "code": "SY"
        },
        {
            "name": "Taiwan, Province of China",
            "code": "TW"
        },
        {
            "name": "Tajikistan",
            "code": "TJ"
        },
        {
            "name": "Tanzania, United Republic of",
            "code": "TZ"
        },
        {
            "name": "Thailand",
            "code": "TH"
        },
        {
            "name": "Timor-Leste",
            "code": "TL"
        },
        {
            "name": "Togo",
            "code": "TG"
        },
        {
            "name": "Tokelau",
            "code": "TK"
        },
        {
            "name": "Tonga",
            "code": "TO"
        },
        {
            "name": "Trinidad and Tobago",
            "code": "TT"
        },
        {
            "name": "Tunisia",
            "code": "TN"
        },
        {
            "name": "Turkey",
            "code": "TR"
        },
        {
            "name": "Turkmenistan",
            "code": "TM"
        },
        {
            "name": "Turks and Caicos Islands",
            "code": "TC"
        },
        {
            "name": "Tuvalu",
            "code": "TV"
        },
        {
            "name": "Uganda",
            "code": "UG"
        },
        {
            "name": "Ukraine",
            "code": "UA"
        },
        {
            "name": "United Arab Emirates",
            "code": "AE"
        },
        {
            "name": "United Kingdom",
            "code": "GB"
        },
        {
            "name": "United States",
            "code": "US"
        },
        {
            "name": "United States Minor Outlying Islands",
            "code": "UM"
        },
        {
            "name": "Uruguay",
            "code": "UY"
        },
        {
            "name": "Uzbekistan",
            "code": "UZ"
        },
        {
            "name": "Vanuatu",
            "code": "VU"
        },
        {
            "name": "Venezuela",
            "code": "VE"
        },
        {
            "name": "Viet Nam",
            "code": "VN"
        },
        {
            "name": "Virgin Islands, British",
            "code": "VG"
        },
        {
            "name": "Virgin Islands, U.S.",
            "code": "VI"
        },
        {
            "name": "Wallis and Futuna",
            "code": "WF"
        },
        {
            "name": "Western Sahara",
            "code": "EH"
        },
        {
            "name": "Yemen",
            "code": "YE"
        },
        {
            "name": "Zambia",
            "code": "ZM"
        },
        {
            "name": "Zimbabwe",
            "code": "ZW"
        }
    ]

    let countryNumber = Math.round(getRandomNumber(0, countries.length - 1))

    console.log(countryNumber);

    let countryCode = countries[countryNumber].code;

    countryCode = countryCode.toLowerCase();

    console.log(countryCode);

    url = url + countryCode + ".svg";

    console.log(url);

    htmlFlagOutput.src = url;
}