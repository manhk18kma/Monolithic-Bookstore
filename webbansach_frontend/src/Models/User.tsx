class User {
  id: number;
  username: string;
  urlAvt: string;

  constructor(id: number, username: string, urlAvt: string) {
    this.id = id;
    this.username = username;
    this.urlAvt = urlAvt;
  }
}

export default User;
