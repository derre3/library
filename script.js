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

function addBook() {
    let newBook = new Book(title, author, pages, read);
    myLib.push(newBook);
    displayCards();
    return `${newBook.title} added to library`
}

function getBook() {
    title = prompt('Title');
    author = prompt('Author');
    pages = prompt('Pages');
    read = prompt('Read');
    return addBook();
}

function displayCards() {
    const cardContainer = document.querySelector('.card-container')
    let i = 0;
    myLib.forEach(book => {
        i++;
        const cardItem = document.createElement('div')
        cardItem.className = 'card'
        cardContainer.appendChild(cardItem)
        
        const titleCard = document.createElement('p');
        const authorCard = document.createElement('p');
        const pagesCard = document.createElement('p');
        const readLabel = document.createElement('label');
        const readCard = document.createElement('input');
        readCard.type = 'checkbox';
        readCard.name = `read${i}`;
        readCard.id = `read${i}`;
        readLabel.htmlFor = `read${i}`;

        titleCard.textContent = book.title;
        authorCard.textContent = book.author;
        pagesCard.textContent = `${book.pages} Pages`;
        readCard.checked = book.read;
        readLabel.textContent = 'Read?';

        cardItem.appendChild(titleCard);
        cardItem.appendChild(authorCard);
        cardItem.appendChild(pagesCard);
        cardItem.appendChild(readLabel);
        cardItem.appendChild(readCard);
    });
}

displayCards();
