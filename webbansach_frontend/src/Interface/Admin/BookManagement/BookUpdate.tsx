import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import Genres from "../../../Models/Genres";
import { getAllGenres, getAllGenresOfBook } from "../../../Api/GenresApi";
import { Author } from "../../../Models/Author";
import { getAllAuthorOfBook, getAllAuthors } from "../../../Api/AuthorApi";
import { CloudUpload } from "react-bootstrap-icons";
import CircularIndeterminate from "../../../Authentication/CircularProcess";
import Book from "../../../Models/Book";
import { getAllImgByBookId } from "../../../Api/ImagesApi";
import { getBookByID } from "../../../Api/BookApi";
import { useParams } from "react-router-dom";

interface BookUpdateInterface {
  oldBook: Book;
}

const BookUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  // Hanle ollbook

  const [book, setBook] = useState({
    id: 0,
    title: "",
    description: "",
    listedPrice: 0,
    discountPercent: 0,
    price: 0,
    quantity: 0,
    urlAvt: "",
    relatedImg: [] as string[],
    genres: [] as number[],
    author: [] as number[],
  });

  useEffect(() => {
    getBookByID(idNumber)
      .then((oldBook) => {
        setBook({
          id: oldBook.id,
          title: oldBook.title,
          description: oldBook.description,
          listedPrice: oldBook.listedPrice,
          discountPercent: oldBook.discountPercent,
          price: oldBook.price,
          quantity: oldBook.quantity,
          urlAvt: "",
          relatedImg: [] as string[],
          genres: [] as number[],
          author: [] as number[],
        });
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);

  // List
  const [listGenres, setListGenres] = useState<Genres[]>([]);
  const [listAuthors, setListAuthors] = useState<Author[]>([]);

  // Id choice
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [listRelatedImg, setListRelatedImg] = useState<string[]>([]);
  const [avt, setAvt] = useState<string>();

  // lay danh sach from db
  useEffect(() => {
    getAllGenres()
      .then((genres) => {
        setListGenres(genres);
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);
  useEffect(() => {
    getAllAuthors()
      .then((author) => {
        setListAuthors(author);
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);

  //   lay danh sach cu
  // THeloai
  useEffect(() => {
    getAllGenresOfBook(idNumber)
      .then((genres) => {
        let oldGenresID = genres.map((gen) => gen.id);
        setSelectedGenres(oldGenresID);
        setBook((prev) => ({
          ...prev,
          genres: oldGenresID,
        }));
      })
      .catch(() => {
        console.error("Error fetching genre list:");
      });
  }, []);
  // Tacgia
  useEffect(() => {
    getAllAuthorOfBook(idNumber)
      .then((authors) => {
        let oldAuthorsID = authors.map((au) => au.authorID);
        setSelectedAuthors(oldAuthorsID);
        setBook((prev) => ({
          ...prev,
          author: oldAuthorsID,
        }));
      })
      .catch(() => {
        console.error("Error fetching author list:");
      });
  }, []);
  //   Images
  useEffect(() => {
    getAllImgByBookId(idNumber)
      .then((imgs) => {
        let oldRelatedImg = imgs
          .filter((img) => !img.isAvt)
          .map((img) => img.urlImg);
        let oldAvt = imgs.filter((img) => img.isAvt).map((img) => img.urlImg);
        setListRelatedImg(oldRelatedImg);
        oldAvt && setAvt(oldAvt[0]);

        setBook((prev) => ({
          ...prev,
          urlAvt: oldAvt[0],
          relatedImg: oldRelatedImg,
        }));
      })
      .catch((error) => {
        console.error("Error fetching image list:", error);
      });
  }, []);

  function handleAuthorChange(authorID: number): void {
    if (selectedAuthors.includes(authorID)) {
      let newSelected = selectedAuthors.filter((id) => id !== authorID);
      setSelectedAuthors(newSelected);
      setBook((prev) => ({
        ...prev,
        author: newSelected,
      }));
    } else {
      let newSelected = [...selectedAuthors, authorID];
      setSelectedAuthors(newSelected);
      setBook((prev) => ({
        ...prev,
        author: newSelected,
      }));
    }
  }

  function handleGenresChange(genresId: number): void {
    if (selectedGenres.includes(genresId)) {
      let newSelected = selectedGenres.filter((id) => id !== genresId);
      setSelectedGenres(newSelected);
      setBook((prevBook) => ({
        ...prevBook,
        genres: newSelected,
      }));
    } else {
      let newSelected = [...selectedGenres, genresId];
      setSelectedGenres(newSelected);
      setBook((prevBook) => ({
        ...prevBook,
        genres: newSelected,
      }));
    }
  }

  // string render
  const [stringAuthor, setStringAuthor] = useState<string>("");
  useEffect(() => {
    let selectedAuthorNames = listAuthors
      .filter((author) => selectedAuthors.includes(author.authorID))
      .map((author) => author.authorName);
    let authorString = selectedAuthorNames.join(", ");
    setStringAuthor(authorString);
  }, [selectedAuthors]);

  const [stringGenres, setStringGenres] = useState<string>("");
  useEffect(() => {
    let selectedGenresNames = listGenres
      .filter((gen) => selectedGenres.includes(gen.id))
      .map((gen) => gen.name);
    let authorString = selectedGenresNames.join(", ");
    setStringGenres(authorString);
  }, [selectedGenres]);

  // HANDLE SUBMIT
  async function handleSubmitForm(event: any) {
    event.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(book));
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/book/update-book", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        alert("Update book successfully");
      } else {
        alert("Update book successfully");
      }
    } catch (error) {
      alert("Update book successfully");
      console.error("Error:", error);
    }
    setLoading(false);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const newPreviewImages = [...listRelatedImg];

      // Duyệt qua từng file đã chọn
      for (let i = 0; i < inputElement.files.length; i++) {
        const selectedFile = inputElement.files[i];

        const reader = new FileReader();

        // Xử lý sự kiện khi tệp đã được đọc thành công
        reader.onload = (e: any) => {
          // e.target.result chính là chuỗi base64
          const thumbnailBase64 = e.target?.result as string;

          setBook((prevBook) => ({
            ...prevBook,
            relatedImg: [...prevBook.relatedImg, thumbnailBase64],
          }));

          newPreviewImages.push(URL.createObjectURL(selectedFile));

          // Cập nhật trạng thái với mảng mới
          setListRelatedImg(newPreviewImages);
        };

        // Đọc tệp dưới dạng chuỗi base64
        reader.readAsDataURL(selectedFile);
      }
    }
  }

  function handleAtvUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];

      const reader = new FileReader();

      // Xử lý sự kiện khi tệp đã được đọc thành công
      reader.onload = (e: any) => {
        // e.target.result chính là chuỗi base64
        const base64 = e.target?.result as string;

        setBook({ ...book, urlAvt: base64 });

        setAvt(URL.createObjectURL(selectedFile));
      };

      // Đọc tệp dưới dạng chuỗi base64
      reader.readAsDataURL(selectedFile);
    }
  }

  const calculatePrice = (listedPrice: any, discountPercent: any) => {
    const price =
      discountPercent === 0
        ? listedPrice
        : (listedPrice / 100) * (100 - discountPercent);
    return price;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(255,248,220)",
        width: "100vw",
        minHeight: "85vh",
        height: "auto",
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
        <h1 style={{}}>THÊM SÁCH</h1>
        <input type="hidden" id="maSach" />
        <TextField
          required={true}
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          type="text"
          label="Tên Sách"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e: any) => setBook({ ...book, title: e.target.value })}
          value={book.title}
        />
        <TextField
          required={true}
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          type="text"
          label="Mô Tả"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e: any) =>
            setBook({ ...book, description: e.target.value })
          }
          value={book.description}
        />
        <TextField
          required={true}
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          type="number"
          label="Số Lượng"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e: any) =>
            setBook({ ...book, quantity: parseInt(e.target.value) || 0 })
          }
          value={book.quantity === 0 ? "" : book.quantity}
        />

        <TextField
          required={true}
          type="number"
          label="Giá Niêm Yết"
          style={{ width: "100%", marginBottom: "10px" }}
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          onChange={(e: any) =>
            setBook({
              ...book,
              listedPrice: parseInt(e.target.value) || 0,
              price: calculatePrice(
                parseInt(e.target.value) || 0,
                book.discountPercent,
              ),
            })
          }
          value={book.listedPrice === 0 ? "" : book.listedPrice}
        />

        <TextField
          required={true}
          type="number"
          label="Phần Trăm Giảm Giá"
          style={{ width: "100%", marginBottom: "10px" }}
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          onChange={(e: any) =>
            setBook({
              ...book,
              discountPercent: parseInt(e.target.value) || 0,
              price: calculatePrice(
                book.listedPrice,
                parseInt(e.target.value) || 0,
              ),
            })
          }
          value={book.discountPercent === 0 ? "" : book.discountPercent}
        />

        <TextField
          InputProps={{ style: { backgroundColor: "rgb(255,248,220)" } }}
          disabled
          type="number"
          label="Giá Bán"
          style={{ width: "100%", marginBottom: "10px" }}
          aria-readonly={true}
          value={book.price === 0 ? 0 : book.price}
        />

        <InputLabel id="genre-dropdown-label">Thể loại</InputLabel>
        <Select
          labelId="genre-dropdown-label"
          id="genre-dropdown"
          multiple
          value={selectedGenres}
          renderValue={() => (
            <Typography style={{ whiteSpace: "normal" }}>
              {stringGenres}
            </Typography>
          )}
          style={{ backgroundColor: "rgb(255,248,220)" }}
        >
          {listGenres.map((genre, index) => (
            <MenuItem
              style={{
                backgroundColor: "rgb(210,180,140)",
                marginTop: "-8px",
                marginBottom: "-8px",
              }}
              key={index}
              value={genre.name}
            >
              <Checkbox
                checked={selectedGenres.includes(genre.id)}
                onChange={() => handleGenresChange(genre.id)}
              />
              <ListItemText
                primary={genre.name}
                style={{
                  backgroundColor: "rgb(255,248,220)",
                  borderRadius: "2px",
                  padding: "2px",
                }}
              />
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="genre-dropdown-label">Tác giả</InputLabel>
        <Select
          labelId="genre-dropdown-label"
          id="genre-dropdown"
          multiple
          value={selectedAuthors}
          renderValue={() => (
            <Typography style={{ whiteSpace: "normal" }}>
              {stringAuthor}
            </Typography>
          )}
          style={{ backgroundColor: "rgb(255,248,220)" }}
        >
          {listAuthors.map((author, index) => (
            <MenuItem
              style={{
                backgroundColor: "rgb(210,180,140)",
                marginTop: "-8px",
                marginBottom: "-8px",
              }}
              key={index}
            >
              <Checkbox
                checked={selectedAuthors.includes(author.authorID)}
                onChange={() => handleAuthorChange(author.authorID)}
              />
              <ListItemText
                primary={author.authorName}
                style={{
                  backgroundColor: "rgb(255,248,220)",
                  borderRadius: "2px",
                  padding: "2px",
                }}
              />
            </MenuItem>
          ))}
        </Select>
        {/* AVt */}
        <div className="d-flex align-items-center mt-3">
          <Button
            size="small"
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            style={{ backgroundColor: "rgb(255,248,220)", border: "1px solid" }}
          >
            Tải ảnh đại diện
            <input
              style={{ opacity: "0", width: "10px" }}
              // required={props.option === "update" ? false : true}
              type="file"
              accept="image/*"
              onChange={handleAtvUpload}
              alt=""
            />
          </Button>
          <img
            src={avt}
            alt=""
            width={100}
            style={{
              borderRadius: "10px",
              marginLeft: "5px",
              border: "1px solid white",
            }}
          />
        </div>
        {/* Realted img */}
        <div className="d-flex align-items-center mt-3">
          <Button
            size="small"
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            style={{ backgroundColor: "rgb(255,248,220)", border: "1px solid" }}
          >
            Tải ảnh liên quan
            <input
              style={{ opacity: "0", width: "10px" }}
              required
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              alt=""
            />
          </Button>
          {listRelatedImg.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              width={100}
              style={{
                borderRadius: "10px",
                marginLeft: "5px",
                border: "1px solid white",
              }}
            />
          ))}
          {listRelatedImg.length > 0 && (
            <Button
              onClick={() => {
                setListRelatedImg([]);
                setBook({ ...book, relatedImg: [] });
              }}
              style={{
                backgroundColor: "rgb(255,248,220)",
                marginLeft: "5px",
                border: "1px solid",
              }}
            >
              Xoá tất cả
            </Button>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            width: "40%",
            marginTop: "10px",
            marginLeft: "30%",
            fontSize: "23px",
          }}
          onClick={handleSubmitForm}
        >
          {loading ? <CircularIndeterminate /> : "Lưu sách"}
        </Button>
      </div>
    </div>
  );
};

export default BookUpdate;
