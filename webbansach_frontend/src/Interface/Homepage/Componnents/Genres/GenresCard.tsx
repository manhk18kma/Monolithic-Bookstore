import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MDBCardText } from "mdb-react-ui-kit";
import { IconButton } from "@mui/material";
import { GoHeartFill } from "react-icons/go";

function GenresCard() {
  return (
    <Card
      sx={{
        maxWidth: "23%",
        marginLeft: "16px",
        marginBottom: "5px",
        marginTop: "5px",
        backgroundColor: "rgb(255,248,220)",
        border: "0.25vw solid rgb(255,248,220)",
      }}
    >
      <CardMedia
        sx={{ height: 170 }}
        image="https://storage.googleapis.com/ltkcms.appspot.com/fs/yd/images/cover/book-genres.base?v=1591896477"
        title="green iguana"
      />
      <CardContent style={{ marginBottom: "0px" }}>
        <Typography gutterBottom variant="h5" component="div">
          Tên thể loại
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mô tả thể loại : Lizards are a widespread group of squamate reptiles
          species
        </Typography>

        <div>
          <MDBCardText className="font-italic mb-1">
            Sách :{" "}
            <a href="#">
              <span className="h5">1026</span>
            </a>
          </MDBCardText>
          <MDBCardText className="font-italic mb-1">
            Tác giả :{" "}
            <a href="#">
              <span className="h5">1026</span>
            </a>
          </MDBCardText>
        </div>
      </CardContent>
      {/* <CardActions style={{marginTop : '-20px'}}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
export default GenresCard;
