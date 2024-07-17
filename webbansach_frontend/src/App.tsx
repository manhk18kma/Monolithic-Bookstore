import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Interface/Header/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Interface/Footer/Footer";
import HomePage from "./Interface/Homepage/Homepage";
import Authors from "./Interface/Homepage/Author";
import AuthorDetails from "./Interface/Homepage/Componnents/Author/AuthorDetails";
import { Book } from "react-bootstrap-icons";
import BookPage from "./Interface/Homepage/Book";
import Genres from "./Interface/Homepage/Genres";
import UserDropdonw from "./Interface/Homepage/Componnents/Util/UserDropdown";
import BookDetails from "./Interface/Homepage/Componnents/Book/BookDetails";
import LoginPage from "./Interface/User/LoginPage";
import RegistrationPage from "./Interface/User/RegintrationPage";
import MyOTPInput from "./Interface/User/OTPPage";
import { AuthenticationProvider } from "./Authentication/AuthenticationContext";
import CircularIndeterminate from "./Authentication/CircularProcess";
import BookManagementPage from "./Interface/Admin/BookManagement/BookManagement";
import BookCreate from "./Interface/Admin/BookManagement/BookCreate";
import BookUpdate from "./Interface/Admin/BookManagement/BookUpdate";

const AllRoleRoutes = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgb(255,248,220)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularIndeterminate />
          </div>
        </div>
      ) : (
        <div>
          <AuthenticationProvider>
            <Navbar />
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />

              {/* Author */}
              <Route path="/author" element={<Authors />} />
              <Route path="/author/details/:id" element={<AuthorDetails />} />

              {/* Book */}
              <Route path="/book" element={<BookPage />} />
              <Route path="/book/detail/:id" element={<BookDetails />} />

              {/* Genres */}
              <Route path="/genres" element={<Genres />} />

              <Route path="/loginpage" element={<LoginPage />} />

              <Route path="/registrationpage" element={<RegistrationPage />} />

              <Route path="/bookManagement" element={<BookManagementPage />} />

              <Route path="/bookCreate" element={<BookCreate />} />

              <Route path="/book/update/:id" element={<BookUpdate />} />
            </Routes>
            <Footer />
          </AuthenticationProvider>
        </div>
      )}
    </>
  );
};

function App() {
  return <BrowserRouter>{<AllRoleRoutes />}</BrowserRouter>;
}

export default App;
