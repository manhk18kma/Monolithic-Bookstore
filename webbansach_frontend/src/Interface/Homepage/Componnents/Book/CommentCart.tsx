import React, { MouseEvent, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import RenderRating from "../Util/RenderRating";
import { Input } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, TextField } from "@mui/material";
import Feedback from "../../../../Models/Feedback";
import User from "../../../../Models/User";
import { getUsernameByToken } from "../../../../Authentication/JwtService";
interface CommentCartInterface {
  feedback: Feedback;
  setIdFeedback: any
  
}
const CommentCart: React.FC<CommentCartInterface> = ({ feedback , setIdFeedback }) => {
  const [update, setUpdate] = useState(false);
  const [feedbacks, setFeedbacks] = useState(feedback.feedback);

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    setUpdate((prev) => !prev);
  };
  const [isOwner, setIsOnwer] = useState(
    feedback.username === getUsernameByToken()
  );
  console.log(feedbacks)

  const handleRemoveFeedback = async (event: any) => {
    try {
     
      const response = await fetch(`http://localhost:8080/su-danh-gia/${feedback.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIdFeedback(feedback.id)
      }
    } catch (error: any) {
      alert("Delete book failed");
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div
        className="d-flex justify-content-start"
        style={{
          backgroundColor: "rgb(255,248,220)",
          padding: "5px",
          borderRadius: "10px",
          alignItems: "center",
        }}
      >
        <img
          className="rounded-circle shadow-1-strong me-3"
          src={feedback.avtUser}
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <div>
            <h6 className="fw-bold mb-1">{feedback.username}</h6>
          </div>
          <div className="d-flex align-items-center mb-3">
            <p className="mb-0">March 07, 2021</p>
          </div>
          <RenderRating rating={feedback.rate} />

          {update ? (
            <Box sx={{ "& > :not(style)": { m: 1, width: "400%" } }}>
              <TextField
                id="input-with-icon-textfield"
                label="Update a comment"
                multiline
                variant="standard"
                onChange={(event) => setFeedbacks(event.target.value)}
              />
            </Box>
          ) : (
            <p className="mb-0">{feedbacks}</p>
          )}
        </div>

        {isOwner && (
          <div className="ms-auto">
            {/* Đặt button vào bên phải */}
            <Button
              style={{
                backgroundColor: "rgb(210,180,140)",
                minWidth: "unset",
                width: "fit-content",
                height: "fit-content",
                padding: "6px",
                marginRight: "2px",
              }}
              onClick={handleUpdate}
              variant="contained"
              endIcon={
                update ? (
                  <CheckIcon sx={{ fontSize: "1.2rem" }} />
                ) : (
                  <SettingsIcon sx={{ fontSize: "1.2rem" }} />
                )
              }
            >
              {update ? "Confirm" : "Update"}
            </Button>
            <Button
              style={{
                backgroundColor: "rgb(210,180,140)",
                minWidth: "unset",
                width: "fit-content",
                height: "fit-content",
                padding: "6px",
              }}
              variant="contained"
              endIcon={<DeleteForeverIcon sx={{ fontSize: "1.2rem" }} />}
              onClick={handleRemoveFeedback}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
};
export default CommentCart;
