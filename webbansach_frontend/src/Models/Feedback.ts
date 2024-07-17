class Feedback {
    id: number;
    rate: number;
    feedback: string;
    username: string;
    avtUser: string;
  
    constructor(id: number, rate: number, feedback: string, username: string, avtUser: string) {
      this.id = id;
      this.rate = rate;
      this.feedback = feedback;
      this.username = username;
      this.avtUser = avtUser;
    }
  }
  
  export default Feedback;
  