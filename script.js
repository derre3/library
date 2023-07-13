function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// placeholder books
let myLib = [
    new Book("The Lightning Thief", "Rick Riordan", 384, false),
    new Book("The Hunger Games", "Suzanne Collins", 486, true),
    new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 236, false),
];
updateCards();

function addBook() {
    let newBook = new Book(this.title, this.author, this.pages, this.read);
    myLib.push(newBook);
    displayCard(newBook);
    updateCards();
}

function displayCard(book) {
    const cardContainer = document.querySelector('.card-container');
    const cardItem = document.createElement('div')
    const bookInfo = document.createElement('div');
    const titleCard = document.createElement('p');
    const authorCard = document.createElement('p');
    const pagesCard = document.createElement('p');
    const readContainer = document.createElement('div');
    const bookMisc = document.createElement('div');
    const readLabel = document.createElement('label');
    const readCard = document.createElement('input');
    const removeButton = document.createElement('button');
    
    cardContainer.appendChild(cardItem)
    readContainer.appendChild(readLabel);
    readContainer.appendChild(readCard);
    bookInfo.appendChild(titleCard);
    bookInfo.appendChild(authorCard);
    bookInfo.appendChild(pagesCard);
    cardItem.appendChild(bookInfo);
    bookMisc.appendChild(readContainer);
    bookMisc.appendChild(removeButton)
    cardItem.appendChild(bookMisc);
    
    cardItem.className = 'card'
    removeButton.className = 'remove-card';
    bookInfo.className = 'book-info';
    bookMisc.className = 'book-misc';
    readContainer.className = 'read-container';

    titleCard.textContent = book.title;
    authorCard.textContent = `by ${book.author}`;
    pagesCard.textContent = `${book.pages} Pages`;
    readLabel.textContent = 'Read?';
    removeButton.textContent = "Remove"
    readCard.checked = book.read;

    readCard.type = 'checkbox';
    readCard.name = `read${myLib.indexOf(book)}`;
    readCard.id = `read${myLib.indexOf(book)}`;
    readLabel.htmlFor = `read${myLib.indexOf(book)}`;

    removeButton.addEventListener("click", ()=>{
        removeBookCard(myLib.indexOf(book));
    })
}

function updateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });
    myLib.forEach(book => {
        displayCard(book);
    });
}

function removeBookCard(bookIndex) {
    myLib.splice(bookIndex, 1);
    updateCards();
}

const formDialog = document.querySelector('.form-dialog');
formDialog.addEventListener("click", e => {
  const dialogDimensions = formDialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    formDialog.close()
  }
})

const addButton = document.querySelector('.add-book');
addButton.addEventListener("click", () => {
    formDialog.showModal();
})

const submitButton = document.querySelector('.button-submit');
submitButton.addEventListener("click", event => {
    const titleInput = document.querySelector('input[name=title-form]')
    const authorInput = document.querySelector('input[name=author-form]')
    const pagesInput = document.querySelector('input[name=pages-form]')
    const readInput = document.querySelector('input[name=read-form]')

    if (titleInput.validity.valid && authorInput.validity.valid && pagesInput.validity.valid) {
        event.preventDefault();
        title = titleInput.value;
        author = authorInput.value;
        pages = pagesInput.value;
        read = !readInput.value;

        titleInput.value = ''
        authorInput.value = ''
        pagesInput.value = ''
        readInput.value = ''
        
        formDialog.close();
        return addBook()
    }
})