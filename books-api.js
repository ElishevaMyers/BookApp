const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Where we will keep books
let books = [
  {
    id: "01",
    name: "Harry Potter",
    published: "1997",
    author: "J. K. Rowling",
  },

  {
    id: "07",
    name: "C++",
    published: "second",
    author: "E.Balagurusamy",
  },

  {
    id: "0909",
    name: "the cat in the hat",
    published: "1957",
    author: "Theodor Geisel",
  },
];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;

  // Output for debugging
  console.log(book);
  books.push(book);

  res.send("Book is added to the database");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/book/:id", (req, res) => {
  // Reading isbn from the URL
  const id = req.params.id;
  for (let book of books) {
    if (book.id === id) {
      res.json(book);
      return;
    }
  }
  res.status(404).send("Book not found");
});

app.delete("/book/:id", (req, res) => {
  const id = req.params.id;

  // Remove item from the books array
  books = books.filter((i) => {
    if (i.id !== id) {
      return true;
    }
    return false;
  });

  res.send("Book is deleted");
});
app.post("/book/:isbn", (req, res) => {
  // Reading id from the URL
  const isbn = req.params.isbn;
  const newBook = req.body;

  // Remove item from the books array
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }

  res.send("Book is edited");
});
app.listen(port, () => console.log(`Book app listening on port ${port}!`));
