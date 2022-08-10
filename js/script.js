// For Grabbing HTML elements

const cardContainer = document.querySelector(".card-container");
const addBookButton = document.querySelector(".add-book-btn");
const popUpAddBook = document.querySelector("#input-book-card");
const popUpEditBook = document.querySelector("#edit-book-card")
const popUpAddBookButtonLayer = document.querySelector("#layer");
const popUpTitle = document.querySelector("#title");
const popUpEditTitle = document.querySelector("#edit-title");
const popUpAuthor = document.querySelector("#author");
const popUpEditAuthor = document.querySelector("#edit-author");
const popUpPages = document.querySelector("#pages");
const popUpEditPages = document.querySelector("#edit-pages");
const popUpReaded = document.querySelector("#readed");
const popUpEditReaded = document.querySelector("#edit-readed");
const imageCard = document.querySelector(".book-cover");
const popUpBookCover = document.querySelector("#set-cover");
const popUpEditBookCover = document.querySelector("#edit-set-cover");
const popUpCheckedSign = document.querySelectorAll("#span-check")
const bookCoverStorage = document.querySelector("#book-cover-storage");

const popUpSubmit = document.querySelector(".submit-btn");
const popUpEditSubmit = document.querySelector(".submit-edit-btn");

// myLibrary array

let myLibrary = [];

/* myLibrary object example
const myLibrary = [{
    title: "Lord of the Rings",
    author: "J.R.R Tolkien",
    pages: 627,
    isRead: true,
    cover: "img/cover1.jpeg"
},{
    title: "Sphere",
    author: "Michael Crichton",
    pages: 435,
    isRead: false,
    cover: "img/cover2.jpeg"
}];
*/

// Book Covers array

const bookCoversImg = [{
    image: "img/bookcover.jpg"
},{
    image: "img/cover1.jpeg"
},{
    image: "img/cover2.jpeg"
},{
    image: "img/dune.jpg"
},{
    image: "img/fiction.jpg"
},{
    image: "img/foundation.jpg"
},{
    image: "img/gameofthrones.jpg"
},{
    image: "img/interviewwiththevampire.jpg"
},{
    image: "img/nonfiction.jpg"
},{
    image: "img/phantoms.jpg"
},{
    image: "img/physician.jpg"
},{
    image: "img/2001.jpg"
}
];

// Functions to create the elements inside card

function createCardElement(element, content, className){
    const elementType = document.createElement(element);
    elementType.textContent = content;
    elementType.classList.add(className);
    return elementType;
}

function createCardReadButton(element, content, className){
    const elementType = document.createElement(element);
    elementType.textContent = content;
    elementType.classList.add(...className);
    elementType.addEventListener("click", (e) => {
        const classList = "not-readed read-btn";
        if(e.target.classList.value === classList){
            e.target.classList.replace("not-readed", "readed");
            e.target.textContent = "Readed";
            myLibrary[e.target.parentNode.parentNode.id].isRead = true;
        } else {
            e.target.classList.replace("readed", "not-readed");
            e.target.textContent = "Not readed";
            myLibrary[e.target.parentNode.parentNode.id].isRead = false;
        };
        storeMyLibraryInLocalStorage()
    })
    return elementType;
};

// Function to edit card

function cardEditButton(indexCard){
    showEditPopUp(indexCard);
};


// Function to determine is the book has been readed


function isItReaded(boolean){
    if(!boolean) {return "Not Readed"} else {return "Readed"}
};

function isItReadedClass(boolean){
    const notReaded = ["not-readed", "read-btn"];
    const readed = ["readed", "read-btn"]
    if(!boolean) {return notReaded} else {return readed}
};



// Function to remove book from library
function removeBook(index){
    myLibrary.splice(index, 1);
    storeMyLibraryInLocalStorage();
};

// Function to delete all cards in div.container

function clearAllCards(){
    let child = cardContainer.lastElementChild;
    while (child){
        cardContainer.removeChild(child);
        child = cardContainer.lastElementChild;
    };
};

// Function to create the card plus cover

function imgBookCover(book){
    if (book.cover === undefined){
        return "img/bookcover.jpg";
    } else {
        return book.cover;
    }
};

function createCardItem(book, index){
    const cardItem = document.createElement("div");
    cardItem.classList.add("card");
    cardItem.setAttribute("id", index);

    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", imgBookCover(book));

    cardImg.setAttribute("alt", "No Cover");
    cardImg.classList.add("book-cover");

    const cardEditBtn = document.createElement("img");
    cardEditBtn.setAttribute("src", "img/edit-svgrepo-com.svg");
    cardEditBtn.classList.add("card-edit-btn");

    const cardInformation = document.createElement("div");
    cardInformation.classList.add("card-right");

    cardContainer.appendChild(cardItem);
    cardItem.appendChild(cardImg);
    cardItem.appendChild(cardEditBtn);
    cardItem.querySelector(".card-edit-btn").addEventListener("click", (e)=> {
        indexCard = e.target.parentElement.id;
        cardEditButton();
    })
    cardItem.appendChild(cardInformation);
    cardInformation.appendChild(createCardElement("p", book.title, "card-ttl"));
    cardInformation.appendChild(createCardElement("p", book.author, "card-author"));
    cardInformation.appendChild(createCardElement("p", book.pages, "card-author"));
    cardInformation.appendChild(createCardReadButton("div", isItReaded(book.isRead), isItReadedClass(book.isRead)));
    cardInformation.appendChild(createCardElement("div", "Remove", "remove-btn"));
    cardInformation.querySelector(".remove-btn").addEventListener("click", ()=> {
        removeBook(index);
        clearAllCards();
        renderCard();
    }); 

}

// Function to create the Book cover storage

function createBookCoverImg(cover, index){
    const image = document.createElement("img");
    image.setAttribute("id", index);
    image.setAttribute("src", cover.image );
    image.setAttribute("alt", "No Cover");
    image.classList.add("image-book-cover");
    bookCoverStorage.appendChild(image);
};

function clearBookcover(){
    let child = bookCoverStorage.lastElementChild;
    while (child){
        bookCoverStorage.removeChild(child);
        child = bookCoverStorage.lastElementChild;
    };
}

function renderBookCover(){
    bookCoversImg.map((cover, index)=>{
        createBookCoverImg(cover, index);
    })  
};

// Function to display the cards

function renderCard(){
    myLibrary = JSON.parse(localStorage.getItem("myBookLibrary"));
    if (myLibrary !== null) {
        myLibrary.map((book, index) => {
        createCardItem(book, index);
        });
    }
};

// popUp functionality (Background Layer and input, edit card)

function hidePopUp() {
    if (popUpAddBook.classList.contains("active")){
        popUpAddBook.classList.add("hidden")
        popUpAddBook.classList.remove("active");
        popUpAddBookButtonLayer.classList.remove("active-layer");
    } else if (popUpEditBook.classList.contains("active")){
        popUpEditBook.classList.add("hidden")
        popUpEditBook.classList.remove("active");
        popUpAddBookButtonLayer.classList.remove("active-layer");
    }
    bookCoverStorage.classList.replace("book-cover-layer", "hidden");
};

function showPopUp(){
    signBookCover(false);
    popUpAddBook.classList.add("active");
    popUpAddBook.classList.remove("hidden");
    popUpAddBookButtonLayer.classList.add("active-layer");
    popUpTitle.value = "";
    popUpAuthor.value = "";
    popUpPages.value = "";
    popUpReaded.checked = false;
    tempBookcover = undefined;
};

let indexCard

function showEditPopUp(){
    signBookCover(false);
    popUpEditBook.classList.add("active");
    popUpEditBook.classList.remove("hidden");
    popUpAddBookButtonLayer.classList.add("active-layer");
    tempBookcover = myLibrary[indexCard].cover;
    popUpEditTitle.value = myLibrary[indexCard].title;
    popUpEditAuthor.value = myLibrary[indexCard].author;
    popUpEditPages.value = myLibrary[indexCard].pages;
    popUpEditReaded.checked = myLibrary[indexCard].isRead;
    popUpEditSubmit.addEventListener("click", ()=> updateBookToLibrary(indexCard))

};


function signBookCover(boolean){
    if(boolean){
        for(let i=0; i < popUpCheckedSign.length; i++){
            popUpCheckedSign[i].classList.replace("hidden", "span-check");
        }
    } else if(!boolean){
        for(let i=0; i < popUpCheckedSign.length; i++){
            popUpCheckedSign[i].classList.replace("span-check", "hidden");
        }
    };
};

function chooseBookCover(){
    bookCoverStorage.classList.replace("hidden", "book-cover-layer");
    renderBookCover();
    bookCoverStorage.addEventListener("click", (e)=> {
        bookCoverChoosed(e.target.id);
        bookCoverStorage.classList.replace("book-cover-layer", "hidden");
        signBookCover(true)
        clearBookcover();
    });
};

let tempBookcover;


function bookCoverChoosed(index){
    tempBookcover = bookCoversImg[index].image;
};

function book(title, author, pages, isRead, cover){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.cover = cover;
};

function addBookToLibrary(){
    const newEntry = new book(popUpTitle.value, popUpAuthor.value, popUpPages.value, popUpReaded.checked, tempBookcover);
    if (myLibrary === null){
        myLibrary = [newEntry];
    } else {
        myLibrary.push(newEntry);
    };
    hidePopUp();
    clearAllCards();
    storeMyLibraryInLocalStorage();
    renderCard();
};

function updateBookToLibrary(indexCard){
    console.log(indexCard);
    myLibrary[indexCard].title = popUpEditTitle.value;
    myLibrary[indexCard].author = popUpEditAuthor.value;
    myLibrary[indexCard].pages = popUpEditPages.value;
    myLibrary[indexCard].isRead = popUpEditReaded.checked;
    myLibrary[indexCard].cover = tempBookcover;
    hidePopUp();
    clearAllCards();
    storeMyLibraryInLocalStorage();
    renderCard();
    indexCard = "";
};

popUpSubmit.onclick = addBookToLibrary;
popUpAddBookButtonLayer.onclick = hidePopUp;
addBookButton.onclick = showPopUp;
popUpBookCover.onclick = chooseBookCover;
popUpEditBookCover.onclick = chooseBookCover;

//Local Storage

function storeMyLibraryInLocalStorage(){
    localStorage.setItem("myBookLibrary", JSON.stringify(myLibrary));
};

// Invoking renderCard

renderCard();

