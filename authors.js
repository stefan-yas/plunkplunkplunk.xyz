const authors = document.getElementById("authors-container");

let flag = true;

function showAuthors() {
    authors.style.display = flag ? "flex" : "";
    flag = !flag;
}