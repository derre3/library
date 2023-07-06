function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook() {
    let newBook = new Book(title, author, pages, read);
    myLib.push(newBook)
    return `${newBook.title} added to library`
}

function getBook() {
    title = prompt('Title');
    author = prompt('Author');
    pages = prompt('Pages');
    read = prompt('Read');
    return addBook();
}

let myLib = [
    new Book("The Lightning Thief", "Rick Riordan", 384, false),
    new Book("The Hunger Games", "Suzanne Collins", 486, true),
    new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 236, false),
];
