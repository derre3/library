class Book {
  static library = [
    new Book("The Lightning Thief", "Rick Riordan", 384, false),
    new Book("The Hunger Games", "Suzanne Collins", 486, true),
    new Book(
      "Harry Potter and the Philosopher's Stone",
      "J.K. Rowling",
      236,
      false
    ),
  ];

  static addBook() {
    let newBook = new Book(title, author, pages, read);
    Book.library.push(newBook);
    domStuff.updateCards();
  }

  static removeBook(bookIndex) {
    Book.library.splice(bookIndex, 1);
    domStuff.updateCards();
  }

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read === true ? (this.read = false) : (this.read = true);
  }
}

const domStuff = (() => {
  // queries
  const titleInput = document.querySelector("input[name=title-form]");
  const authorInput = document.querySelector("input[name=author-form]");
  const pagesInput = document.querySelector("input[name=pages-form]");
  const readInput = document.querySelector("input[name=read-form]");
  const submitButton = document.querySelector(".button-submit");
  const addButton = document.querySelector(".add-book");
  const formDialog = document.querySelector(".form-dialog");

  // event listeners
  // form validation
  submitButton.addEventListener("click", (event) => {
    if (
      titleInput.validity.valid &&
      authorInput.validity.valid &&
      pagesInput.validity.valid
    ) {
      event.preventDefault();
      title = titleInput.value;
      author = authorInput.value;
      pages = pagesInput.value;
      read = readInput.checked;

      titleInput.value = "";
      authorInput.value = "";
      pagesInput.value = "";

      formDialog.close();
      return Book.addBook();
    }
  });
  addButton.addEventListener("click", () => {
    formDialog.showModal();
  });
  // closes the form dialog if you click outside of it
  formDialog.addEventListener("click", (e) => {
    const dialogDimensions = formDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      formDialog.close();
    }
  });

  const displayCard = (book) => {
    let library = Book.library;

    const cardContainer = document.querySelector(".card-container");
    const cardItem = document.createElement("div");
    const bookInfo = document.createElement("div");
    const titleCard = document.createElement("p");
    const authorCard = document.createElement("p");
    const pagesCard = document.createElement("p");
    const readContainer = document.createElement("div");
    const bookMisc = document.createElement("div");
    const readLabel = document.createElement("label");
    const readCard = document.createElement("input");
    const removeButton = document.createElement("button");

    cardContainer.appendChild(cardItem);
    readContainer.appendChild(readLabel);
    readContainer.appendChild(readCard);
    bookInfo.appendChild(titleCard);
    bookInfo.appendChild(authorCard);
    bookInfo.appendChild(pagesCard);
    cardItem.appendChild(bookInfo);
    bookMisc.appendChild(readContainer);
    bookMisc.appendChild(removeButton);
    cardItem.appendChild(bookMisc);

    cardItem.className = "card";
    removeButton.className = "remove-card";
    bookInfo.className = "book-info";
    bookMisc.className = "book-misc";
    readContainer.className = "read-container";

    titleCard.textContent = book.title;
    authorCard.textContent = `by ${book.author}`;
    pagesCard.textContent = `${book.pages} Pages`;
    readLabel.textContent = "Read?";
    removeButton.textContent = "Remove";
    readCard.checked = book.read;

    readCard.type = "checkbox";
    readCard.name = `read${library.indexOf(book)}`;
    readCard.id = `read${library.indexOf(book)}`;
    readLabel.htmlFor = `read${library.indexOf(book)}`;

    readCard.addEventListener("click", () => {
      book.changeReadStatus();
    });

    removeButton.addEventListener("click", () => {
      Book.removeBook(library.indexOf(book));
    });
  };
  // update cards onscreen by removing them from the DOM first and then check library[]
  const updateCards = () => {
    const cards = document.querySelectorAll(".card");
    let library = Book.library;
    cards.forEach((card) => {
      card.remove();
    });
    library.forEach((book) => {
      displayCard(book);
    });
  };

  updateCards();

  return { displayCard, updateCards };
})();
