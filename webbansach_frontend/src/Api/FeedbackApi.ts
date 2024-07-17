import Feedback from "../Models/Feedback";
import User from "../Models/User";

function fetchApi(url: string): Promise<Feedback[]> {
  return new Promise<Feedback[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const feedList: Feedback[] = [];

        for (const key in data) {
          feedList.push({
           id : data[key].id ,
           rate :data[key].rate ,
           feedback : data[key].feedback ,
           username:data[key].username ,
           avtUser:  data[key].avtUser
            
          });
        }
        console.log(feedList)

        resolve(feedList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getFeedBackByIDBook = (id: number , pagenumber: number): Promise<Feedback[]> => {
  const url = `http://localhost:8080/su-danh-gia/search/findBySach_MaSach?sort=maDanhGia,desc&size=${pagenumber}&page=0&maSach=${id}`;
  return fetchApi(url);
};

