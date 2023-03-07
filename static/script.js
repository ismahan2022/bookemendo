const forms= document.querySelector(".forms"),
    pwShowHide= document.querySelectorAll(".eye-icon"),
    links= document.querySelectorAll(".link");


pwShowHide.forEach(eyeIcon=>{
    eyeIcon.addEventListener("click",() =>{
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        pwFields.forEach(password =>{
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide","bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show","bx-hide");
        })
    })
})

links.forEach(link=>{
    link.addEventListener("click", e =>{
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})
/* jshint esversion: 11, jquery: true */

// root tech YouTube tutorial helped with some of the code in this app
// Youtube link - https://www.youtube.com/watch?v=bsZKDIaij-A&list=PLv3FkN9_9-cvHY-oSLsSFL9OwRalG793b&index=1
// sorce code root tech - https://github.com/zentech/Book-Finder

// display bookData in to a html document below the search bar.
function displayBookResults(response) {
     
    if (response.totalItems === 0) {
        $("#loader").html(`<div><h2 class="search-message text-center"> No Books!</h2></div>`);
    } else {
    
        // Loop through book results and display in div
        for (var i = 0; i < 2; i++) {
            let item = response.items[i];
            // Placeholder image for when book search has no image
            let placeHolder = "assets/images/book-search-placeholder.jpg";
            let noInformation = `No information`;
            let bookImage = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : placeHolder;
            let title = item.volumeInfo.title;
            let author = item.volumeInfo.authors;
            let publisher = item.volumeInfo.publisher ? item.volumeInfo.publisher : noInformation;
            let description = item.searchInfo ? item.searchInfo.textSnippet : noInformation;
            let bookLink = item.volumeInfo.previewLink;
            let averageRating = item.volumeInfo.averageRating;
            
            // Append results to a div to display results and pass to display book
            $("#book-data").append(`<div class="col-lg-6">` +
                displayBook(bookImage, title, author, publisher, description, bookLink, averageRating) +
                `</div>`);

            // Display message when a Movie is Found!!
            $("#loader").html(`<h2 class="search-message text-center">Book Found!!!</h2>`);
        }
    }
}

// Display results in a html div
function displayBook(bookImage, title, author, publisher, description, bookLink, averageRating) {

    let results = "";
    results += `
    <div class="book-display-container">
    <div class="book-display-box">
        <div class="row">
            <div class="col">
                <h2 class="text-center movie-title">${title}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <img src="${bookImage}" class="rounded mx-auto d-block book-image" alt="${title}">
            </div>
            <div class="col-sm-8">
                <div class="row">
                    <div class="col">
                        <h3 class="">Author: ${author}</h3>
                        <h3 class="">Publisher: ${publisher}</h3>
                        <h3 class="">Average Rating: ${averageRating}</h3>
                        <p>Description: ${description}</p>
                    </div>
                    <div class="row">
                        <div class="col">
                            <a target="_blank" href="${bookLink}" class="btn btn-secondary movie-button mb-2 ms-3"
                                aria-label="Read book opens in new window">Read Book</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                `;
    return results;
}

// Fetch the movie search information in the book search bar and search the api for the book.
function fetchBookInformation(event) {

    // Google book api url from https://developers.google.com/books/docs/v1/using#PerformingSearch 
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";

    // Define contence of the serach value'
    let search = $("#book").val();
    $("#book-data").html("");

    // If the search box is empty display message under search bar.
    if (!search) {
        $("#loader").html(`<h2 class="search-message text-center">
        Pease Search For A Book!!</h2>`);
        return;
    }

    // loader image gif while searching for a movie shown under search bar from https://icons8.com/preloaders/en/search/ 
    $("#loader").html(
            `<div id="loader">
                    <img src="assets/loader-image/loader.gif" alt="loading..." />
                    </div>`
        ),

        // Gets movie information from google books url.
        $.getJSON(bookUrl + search,
            function (bookData) {

                // Pass book data to display book function
                (displayBookResults(bookData));
            },

            // If an error occurs then show error response under search bar
            function error(errorResponse) {
                if (errorResponse.status === 404) {
                    $("#loader").html(
                        `<h2 class="search-message text-center">No Book found ${search}</h2>`
                    );
                } else {
                    $("#loader").html(
                        `<h2 class"search-message text-center">Error: ${errorResponse.reponseJSON.message}</h2>`
                    );
                }
            }
        );
}

// function to get the html document ready for the app to start.
$(document).ready(fetchBookInformation);