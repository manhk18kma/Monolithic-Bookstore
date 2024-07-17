import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  isStaff: boolean;
  isAdmin: boolean;
  isUser: boolean;
  sub: string;
  urlAvt: string;
  iat: number;
  exp: number;
}

const RequireAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");

      // Nếu chưa đăng nhập thì về trang /login
      if (!token) {
        navigate("/loginpage");
        return;
      }

      // Giải mã token
      const decodedToken = jwtDecode(token) as JwtPayload;

      // Lấy thông tin từ token đó
      const role = decodedToken.isAdmin;

      // Kiểm tra quyền
      if (!role) {
        navigate("/error-403");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
  return WithAdminCheck || null;
};

export default RequireAdmin;
