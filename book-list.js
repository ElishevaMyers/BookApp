const loadBooks = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "http://localhost:3000/books", false);
  xhttp.send();

  const books = JSON.parse(xhttp.responseText);

  for (let book of books) {
    const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.id}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Published: ${book.published}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.id})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.getElementById("books").innerHTML =
      document.getElementById("books").innerHTML + x;
  }
};
const deleteBook = (id) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:3000/book/${id}`, false);
  xhttp.send();

  // Reloading the page
  location.reload();
};

const setEditModal = (id) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:3000/book/${id}`, false);
  xhttp.send();

  const book = JSON.parse(xhttp.responseText);

  const { name, author, published } = book;

  // Filling information about the book in the form inside the modal
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("author").value = author;
  document.getElementById("published").value = published;

  // Setting up the action url for the book
  document.getElementById(
    "editForm"
  ).action = `http://localhost:3000/book/${id}`;
};
loadBooks();
