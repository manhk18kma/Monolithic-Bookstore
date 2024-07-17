package vn.titv.webbansach_backend.Endpoints;

public class Endpoints {
    public static final String FRONT_END_HOST = "http://localhost:3000";

    // PUBLIC ENDPOINTS
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/**",
            "/hoa-don/**",
            "/nguoi-dung/**",
            "/sach",
            "/sach/**",
            "/hinh-anh",
            "/hinh-anh/**",
            "/nguoi-dung/search/existsByTenDangNhap",
            "/nguoi-dung/search/existsByEmail",
            "/tai-khoan/kich-hoat",
            "/nguoi-dung/ten-danh-gia/**",
            "/su-danh-gia/search/findBySach_MaSach/**",
            "/the-loai",
            "/vnpay/**"
            ,"/otp/**",
            "/tai-khoan/time-change-password"
            ,"/secretKey/**",
            "/otp-pass-reges/**"
            ,"/cart-item/**",
            "hinh-thuc-giao-hang/**",
            "hinh-thuc-thanh-toan/**"
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/**",

            "/tai-khoan/dang-ky",
            "/tai-khoan/dang-nhap",
            "/nguoi-dung/sua-danh-gia"
            ,"/vnpay/create-payment/**"
            ,"tai-khoan/initiate"
            ,"tai-khoan/change-password"
            ,"/cart-item/**"
            ,"/hoa-don/**"


    };
    public static final String[] PUBLIC_DELETE_ENDPOINTS = {
            "/**",
    };

    public static final String[] PUBLIC_PUT_ENDPOINTS = {
            "/**",

            "/tai-khoan/dang-ky",
            "/tai-khoan/dang-nhap"
            ,"/cart-item/**"


    };

    // ADMIN ENDPOINTS
    public static final String[] ADMIN_GET_ENDPOINTS = {

            "/nguoi-dung",
            "/nguoi-dung/**",
            "/su-danh-gia/**",
//            "/nguoi-dung/ten-danh-gia/**",

    };

    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/hinh-anh",
            "/sach/**",
            "/sach",
            "/hinh-anh/dang-anh",
            "/sach/them-sach",
            "/nguoi-dung/them-danh-gia"

    };

    public static final String[] ADMIN_DELETE_ENDPOINTS = {
            "/sach/**",
    };

    public static final String[] ADMIN_UPDATE_ENDPOINTS = {
            "/sach/**",
            "/hinh-anh/**",
            "/sach/sua-sach",
            "/nguoi-dung/sua-danh-gia"


    };

    // USER ENDPOINTS
    public static final String[] USER_GET_ENDPOINTS = {};

    public static final String[] USER_POST_ENDPOINTS = {
            "/nguoi-dung/them-danh-gia"
    };

    public static final String[] USER_UPDATE_ENDPOINTS = {
            "/nguoi-dung/sua-danh-gia"

    };

    public static final String[] USER_DELETE_ENDPOINTS = {
            "/su-danh-gia/**"
    };
}
