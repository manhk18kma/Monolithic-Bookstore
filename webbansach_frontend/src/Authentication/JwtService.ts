import { jwtDecode } from "jwt-decode";
import { useAuthenticationContext } from "./AuthenticationContext";
// import { JwtPayload } from "../../admin/RequireAdmin";

export interface JwtPayload {
  idUser: string;
  isStaff: boolean;
  isAdmin: boolean;
  isUser: boolean;
  sub: string;
  urlAvt: string;
  iat: number;
  exp: number;
}

const validateTime = (iat: any, exp: any) => {
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime >= iat && currentTime <= exp) {
    return true;
  } else {
    return false;
  }
};

export const isTokenExists = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export function getAvatarByToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.urlAvt;
  }
}

// export function getLastNameByToken() {
//    const token = localStorage.getItem('token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.lastName;
//    }
// }

export function getUsernameByToken() {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token).sub;
  }
}

export function getIdUserByToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.idUser;
  }
}

// export function getRoleByToken() {
//    const token = localStorage.getItem('token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.role;
//    }
// }

export function getUrlAvt() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken.urlAvt;
  }
}

export function logout(navigate: any) {
  localStorage.removeItem("token");
  navigate("/loginpage");
}

export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    console.log(decodedToken);
  }
};
