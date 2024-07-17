import React, { createContext, useContext, useEffect, useState } from "react";
import { getIdUserByToken, isTokenExists } from "./JwtService";
import Book from "../Models/Book";
import { getListFavouriteBook } from "../Api/BookApi";

interface AuthenticationContextInterface {
  children: React.ReactNode;
}

interface AuthenticationContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: any;
  listFavouriteBook: Book[];
  setIdChanged: any;
}

//create context
const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);
//create provider
export const AuthenticationProvider: React.FC<
  AuthenticationContextInterface
> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenExists());
  const [listFavouriteBook, setListFavouriteBook] = useState<Book[]>([]);
  const [idChanged, setIdChanged] = useState<number>(0);

  useEffect(() => {
    getListFavouriteBook(Number(getIdUserByToken()))
      .then((books) => setListFavouriteBook(books))
      .catch();
  }, [idChanged]);

  return (
    <AuthenticationContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, listFavouriteBook, setIdChanged }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
//provider context
export const useAuthenticationContext = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("Lỗi context");
  }
  return context;
};
