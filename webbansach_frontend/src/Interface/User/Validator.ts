interface ReturnState {
  check: boolean;
  text: string;
}

export async function validateUsername(
  username: string,
): Promise<{ check: boolean; text: string }> {
  const minLength = 6;
  const maxLength = 20;
  const validCharacters = /^[a-zA-Z0-9_.]+$/;

  // Kiểm tra độ dài
  if (
    username.trim().length < minLength ||
    username.trim().length > maxLength
  ) {
    return {
      check: false,
      text: `Tên đăng nhập phải có độ dài từ ${minLength} đến ${maxLength} ký tự.`,
    };
  }

  // Kiểm tra ký tự hợp lệ (chữ cái, số, _, .)
  if (!validCharacters.test(username)) {
    return {
      check: false,
      text: "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới (_), và dấu chấm (.)",
    };
  }

  // Kiểm tra thông tin cá nhân
  // (tùy thuộc vào yêu cầu cụ thể của bạn)

  // Kiểm tra tính duy nhất
  const response = await fetch(
    `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${username}`,
  );
  if (!response.ok) {
    console.error(`Server responded with status: ${response.status}`);
    return { check: false, text: "Lỗi máy chủ, vui lòng thử lại sau" };
  }
  const data = (await response.text()).trim();

  // Check if the server response indicates that the username already exists
  if (data === "true") {
    return {
      check: false,
      text: "Tên đăng nhập đã tồn tại, vui lòng nhập tên khác",
    };
  }

  // Kiểm tra không chứa khoảng trắng
  if (username.includes(" ")) {
    return {
      check: false,
      text: "Tên đăng nhập không được chứa khoảng trắng.",
    };
  }

  // Nếu tất cả kiểm tra đều thành công, trả về kết quả hợp lệ
  return { check: true, text: "Chúc mừng! Tên đăng nhập hợp lệ" };
}

export function validatePassword(password: string): {
  check: boolean;
  text: string;
} {
  // Độ dài tối thiểu là 8 ký tự
  if (password.trim().length < 8) {
    return { check: false, text: "Mật khẩu phải có ít nhất 8 ký tự." };
  }

  // Kiểm tra chữ cái
  if (!/[a-zA-Z]/.test(password)) {
    return { check: false, text: "Mật khẩu phải chứa ít nhất một chữ cái." };
  }

  // Kiểm tra số
  if (!/\d/.test(password)) {
    return { check: false, text: "Mật khẩu phải chứa ít nhất một số." };
  }

  // Kiểm tra ký tự đặc biệt
  if (!/[^a-zA-Z\d]/.test(password)) {
    return {
      check: false,
      text: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.",
    };
  }

  // Không chứa thông tin cá nhân
  const commonWords = ["password", "123456", "admin"]; // Danh sách từ thông dụng
  if (commonWords.some((word) => password.toLowerCase().includes(word))) {
    return {
      check: false,
      text: "Mật khẩu không được chứa thông tin dễ đoán.",
    };
  }

  // Nếu không có lỗi, trả về kết quả hợp lệ
  return { check: true, text: "Chúc mừng! Mật khẩu hợp lệ" };
}

export function validatePasswordLogin(password: string): {
  check: boolean;
  text: string;
} {
  // Độ dài tối thiểu là 8 ký tự
  if (password.trim().length < 8) {
    return { check: false, text: "Mật khẩu phải có ít nhất 8 ký tự." };
  }

  // Nếu không có lỗi, trả về kết quả hợp lệ
  return { check: true, text: "" };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): { check: boolean; text: string } {
  // Độ dài tối thiểu là 8 ký tự
  if (password.trim().length < 8) {
    return { check: false, text: "Mật khẩu phải có ít nhất 8 ký tự." };
  }

  // Kiểm tra chữ cái
  if (!/[a-zA-Z]/.test(password)) {
    return { check: false, text: "Mật khẩu phải chứa ít nhất một chữ cái." };
  }

  // Kiểm tra số
  if (!/\d/.test(password)) {
    return { check: false, text: "Mật khẩu phải chứa ít nhất một số." };
  }

  // Kiểm tra ký tự đặc biệt
  if (!/[^a-zA-Z\d]/.test(password)) {
    return {
      check: false,
      text: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.",
    };
  }

  // Không chứa thông tin cá nhân
  const commonWords = ["password", "123456", "admin"]; // Danh sách từ thông dụng
  if (commonWords.some((word) => password.toLowerCase().includes(word))) {
    return {
      check: false,
      text: "Mật khẩu không được chứa thông tin dễ đoán.",
    };
  }

  if (password !== confirmPassword) {
    return { check: false, text: "Mật khẩu nhập lại không trùng khớp." };
  }
  return { check: true, text: "Chúc mừng! Mật khẩu hợp lệ" };
}

export const validateHoDemTen = (
  hoDemTen: string,
): { check: boolean; text: string } => {
  if (hoDemTen.trim().length === 0) {
    return { check: false, text: "Đây là thông tin bắt buộc" };
  }
  return { check: true, text: "Chúc mừng! Họ đệm hợp lệ" };
};

export const validateTen = (
  hoDemTen: string,
): { check: boolean; text: string } => {
  if (hoDemTen.trim().length === 0) {
    return { check: false, text: "Đây là thông tin bắt buộc" };
  }
  return { check: true, text: "Chúc mừng! Tên hợp lệ" };
};

export async function validateGmailEmail(
  gemail: string,
): Promise<{ check: boolean; text: string }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (gemail.trim().length === 0) {
    return { check: false, text: "Đây là thông tin bắt buộc" };
  }

  if (!emailRegex.test(gemail) && !gmailRegex.test(gemail)) {
    return { check: false, text: "Địa chỉ email hoặc Gmail không hợp lệ." };
  }

  const response = await fetch(
    `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${gemail}`,
  );
  if (!response.ok) {
    console.error(`Server responded with status: ${response.status}`);
    return { check: false, text: "Lỗi máy chủ, vui lòng thử lại sau" };
  }

  const data = (await response.text()).trim();

  // Check if the server response indicates that the email already exists
  if (data === "true") {
    return {
      check: false,
      text: "Email hoặc Gmail đã được sử dụng, vui lòng sử dụng địa chỉ khác",
    };
  }

  return { check: true, text: "Chúc mừng! Email hoặc Gmail hợp lệ" };
}

export const validatePhoneNumber = (
  phoneNumber: string,
): { check: boolean; text: string } => {
  // Mẫu biểu thức chính quy cho định dạng số điện thoại di động Việt Nam
  const phoneNumberPattern = /^(0|\+84)(9\d|3[2-9]|7[06-9]|8[1-9]|5\d)\d{7}$/;
  if (phoneNumber.trim().length === 0) {
    return { check: false, text: "Đây là thông tin bắt buộc" };
  }
  // Kiểm tra xem số điện thoại có khớp với mẫu không
  if (phoneNumberPattern.test(phoneNumber)) {
    return { check: true, text: "Chúc mừng! Số điện thoại hợp lệ" };
  } else {
    return { check: false, text: "Số điện thoại không đúng" };
  }
};

export const validateNgaySinh = (ngaySinh: string) => {
  if (!ngaySinh) {
    return { check: false, text: "Ngày sinh không được để trống" };
  }

  const currentDate = new Date();
  const minDate = new Date("1900-01-01");
  const ngaySinhDate = new Date(ngaySinh);

  if (ngaySinhDate < minDate || ngaySinhDate > currentDate) {
    console.error("Ngày sinh không hợp lệ");
    return { check: false, text: "Ngày sinh không hợp lệ" };
  }

  return { check: true, text: "Chúc mừng ngày sinh hợp lệ" };
};
