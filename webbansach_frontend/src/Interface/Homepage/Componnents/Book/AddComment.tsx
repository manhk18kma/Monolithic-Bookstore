import React, { MouseEvent, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import RenderRating from "../Util/RenderRating";
import { Input } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  InputLabel,
  Pagination,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import PaginationRounded from "../Util/Pagination";
import Feedback from "../../../../Models/Feedback";
import {
  getFeedBackByIDBook,
} from "../../../../Api/FeedbackApi";
import User from "../../../../Models/User";
import {
  getAvatarByToken,
  getIdUserByToken,
  getUsernameByToken,
} from "../../../../Authentication/JwtService";
import CircularIndeterminate from "../../../../Authentication/CircularProcess";
import { IconButton } from "material-ui";
import CommentCart from "./CommentCart";

interface CommentInterface {
  idBook: number;
}

const AddComment: React.FC<CommentInterface> = ({ idBook }) => {
  const [username, setUsername] = useState(getUsernameByToken);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [listFeedback, setListFeedback] = useState<Feedback[]>([]);
  const [idFeedback, setIdFeedback] = useState(0);
  const [page , setPage] = useState<number>(0)
  useEffect(() => {
    getFeedBackByIDBook(idBook , page)
      .then((feeds) => {
        setListFeedback(feeds);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [idBook , idFeedback]);

  const [rate, setRate] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleAddComment = async (event: any) => {
    event.preventDefault();
    setLoadingFeedback(true);
    try {
      const idUser = getIdUserByToken();

      const jsonData = {
        idBook: idBook,
        idUser: idUser,
        rate: rate,
        feedback: feedback,
      };

      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      };

      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:8080/feedback/add-feedback",
        requestOptions,
      );

      if (!response.ok) {
        throw new Error("Lỗi khi gửi request: " + response.statusText);
      }
      const responseData = await response.json();
      console.log(responseData);
      setIdFeedback(responseData);
      setRate(0);
      setFeedback("");
      console.log("Kết quả từ server:", responseData);
    } catch (error) {
      console.error("Lỗi khi gửi JSON:", error);
    }
    setLoadingFeedback(false);
  };

  return (
    <div className="container my-5 py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="card text-dark">
            <div
              className="card-body p-4"
              style={{
                backgroundColor: "rgb(210,180,140)",
                borderRadius: "10px",
              }}
            >
              <h4 className="mb-0">Recent comments</h4>
              <p className="fw-light mb-4 pb-2">
                Latest Comments section by users
              </p>

              {
                listFeedback.map((feed, index) => (
                  <CommentCart feedback={feed} key={index} setIdFeedback={setIdFeedback}
                   
                  />
                ))}

              <div style={{ marginLeft: "64%" }}>
                <Stack
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgb(210,180,140)",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  spacing={2}
                >
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </Stack>
              </div>

              <div
                className="d-flex flex-start"
                style={{
                  backgroundColor: "rgb(255,248,220)",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              >
                <img
                  className="rounded-circle shadow-1-strong me-3"
                  src={getAvatarByToken()}
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 className="fw-bold mb-1">{username}</h6>
                  <div className="d-flex align-items-center mb-3"></div>
                  <Rating
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newValue) => {
                      setRate(Number(newValue));
                    }}
                  />

                  <Box sx={{ "& > :not(style)": { m: 1, width: "400%" } }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Add a comment"
                      multiline
                      variant="standard"
                      onChange={(event) => setFeedback(event.target.value)}
                      value={feedback}
                    />
                  </Box>

                  {loadingFeedback ? (
                    <CircularIndeterminate />
                  ) : (
                    <Button
                      style={{ backgroundColor: "rgb(210,180,140)" }}
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleAddComment}
                    >
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-0" />

            {/* Additional comment cards go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
