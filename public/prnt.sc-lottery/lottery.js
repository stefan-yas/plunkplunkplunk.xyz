const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
var input = document.getElementById("random");
var linkResult = "prnt.sc/" + generateString(6);

function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

    
};

function reGen() {
    var inputField = document.getElementById("random");
    var linkResult = "prnt.sc/" + generateString(6);
    inputField.value = linkResult;
    console.log("linkresult: "+linkResult);
}

function urlDetermine() {
    var url = document.getElementById('random').value;
    window.open("https://"+url, '_blank').focus;
}