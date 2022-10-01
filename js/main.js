var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("urlInput");
var tbody = document.getElementById("tbody")
var searchInput = document.getElementById("searchInput")
var submit = document.getElementById("submit")
var currentIndex = 0

if (localStorage.getItem("books") === null) {
    var bookContainer = []
} else {
    bookContainer = JSON.parse(localStorage.getItem("books"))
    displayBook()
}

function creatBook() {
    var books = {
        name: nameInput.value,
        url: urlInput.value
    }
    bookContainer.push(books)
    console.log(bookContainer)
    localStorage.setItem("books", JSON.stringify(bookContainer))
    clearBook()
    displayBook()
}

function displayBook() {
    var box = '';
    for (var i = 0; i < bookContainer.length; i++) {
        box += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${bookContainer[i].name}</td>
                    
                    <td><button class="btn btn-warning" onclick=retriveBook(${i})>Update</button></td>
                    <td><button class="btn btn-primary" onclick="visitBook(${i})">Visit</button></td>
                    <td><button class="btn btn-danger" onclick=deleteBook(${i})>Delete</button></td>
                </tr>
        `
    }
    tbody.innerHTML = box
}

function clearBook() {
    nameInput.value = ''
    urlInput.value = ''
}

function deleteBook(i) {
    bookContainer.splice(i, 1)
    localStorage.setItem("books", JSON.stringify(bookContainer))
    displayBook()
}

function searchBook() {
    var box = '';
    for (var i = 0; i < bookContainer.length; i++) {
        if (bookContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            bookContainer[i].url.toLowerCase().includes(searchInput.value.toLowerCase())) {
            box += `
            <tr>
                        <td>${i + 1}</td>
                        <td>${bookContainer[i].name}</td>
                        
                        <td><button class="btn btn-warning" onclick=retriveBook(${i})>Update</button></td>
                        <td><button class="btn btn-primary" onclick="visitBook(${i})">Visit</button></td>
                        <td><button class="btn btn-danger" onclick=deleteBook(${i})>Delete</button></td>
                    </tr>
            `
        }
        tbody.innerHTML = box
    }
}

submit.onclick = function () {
    if (validURL() == true && nameInput.value != '' && urlInput != '') {
        if (submit.innerHTML == "submit") {
            creatBook()
        } else {
            updateBook()
        }
    } else {
        alert("no")

    }
}

urlInput.oninput = function () {
    if (validURL() == false) {
        urlInput.style.border = "2px solid #ce2626"
    } else {
        urlInput.style.border = "2px solid green"
    }
}

function retriveBook(i) {
    currentIndex = i
    nameInput.value = bookContainer[i].name
    urlInput.value = bookContainer[i].url
    submit.innerHTML = "update item"
}
function visitBook(i) {
    window.open(bookContainer[i].url, '_blank');
}

function updateBook() {
    var books = {
        name: nameInput.value,
        url: urlInput.value
    }
    bookContainer[currentIndex] = books
    submit.innerHTML = "submit"
    localStorage.setItem("books", JSON.stringify(bookContainer))
    clearBook()
    displayBook()
}

function validURL() {
    var redexURL = /^(https|http):\/\/([A-Z]|[a-z]){3,}\..{2,}$/;
    var urlItem = urlInput.value
    if (redexURL.test(urlItem) == true) {
        return true
    } else {
        return false
    }
}
