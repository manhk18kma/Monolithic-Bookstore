import React, { useEffect, useState } from "react";
import RequireAdmin from "../RequireAdmin";
import Book from "../../../Models/Book";
import { getBooks, getBooksByTitle } from "../../../Api/BookApi";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
let timeoutId: any;

const debounce = (callback: any, delay: any) => {
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const BookManagement = () => {
  const [idDelete, setIdDelete] = useState<number>(0);

  const [listBooks, setListBooks] = useState<Book[]>([]);
  const [stringSearch, setStringSearch] = useState<string>("");

  useEffect(() => {
    getBooks()
      .then((books) => {
        setListBooks(books);
      })
      .catch((error: any) => {
        console.error("Error fetching book list:", error);
      });
  }, [idDelete]);

  const handleSearch = debounce((searchValue: any) => {
    if (searchValue.trim() !== "") {
      getBooksByTitle(searchValue)
        .then((books) => {
          setListBooks(books);
        })
        .catch((error: any) => {
          console.error("Error fetching book list:", error);
        });
    } else {
      // Reset danh sách sách hoặc hiển thị thông báo tùy ý
      getBooks()
        .then((books) => {
          setListBooks(books);
        })
        .catch((error: any) => {
          console.error("Error fetching book list:", error);
        });
    }
  }, 200);

  async function handleDeleteBook(event: any, bookId: number) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(`http://localhost:8080/sach/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Delete book successfully");
        setIdDelete(bookId);
      } else {
        if (response.status === 404) {
          alert("Book not found");
        } else if (response.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Delete book failed");
        }
      }
    } catch (error: any) {
      alert("Delete book failed");
      console.error("Error:", error.message);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "85vh",
        height: "auto",
        overflow: "hidden",
        backgroundColor: "rgb(255,248,220)",
        marginTop: "8vh",
      }}
    >
      <div
        style={{
          margin: "auto",
          width: "60%",
          backgroundColor: "rgb(210,180,140)",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "2vh",
          marginBottom: "2vh",
        }}
      >
        <div className="d-flex">
          <input
            id="inputSearch"
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: "20vw", marginBottom: "10px" }}
            value={stringSearch}
            onChange={(e) => {
              const { value } = e.target;
              setStringSearch(value);
              handleSearch(value);
            }}
          />
          <button
            id="buttonSearch"
            className="btn btn-outline-success"
            type="button"
            style={{ height: "5vh" }}
          >
            <Search />
          </button>
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Book title</th>
                <th scope="col">Sold quantity</th>
                <th style={{ paddingRight: "4vw" }} scope="col">
                  <div style={{ textAlign: "right" }}>Change</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {listBooks.map((book, index) => (
                <tr key={index}>
                  <th scope="row">{book.id}</th>
                  <td>{book.title}</td>
                  <td>{book.soldQuantity}</td>
                  <td style={{ textAlign: "right" }}>
                    <Link to={`/book/update/${book.id}`}>
                      <button type="button" className="btn btn-success">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={(event) => handleDeleteBook(event, book.id)}
                      style={{ marginLeft: "5px" }}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BookManagementPage = RequireAdmin(BookManagement);
export default BookManagementPage;
