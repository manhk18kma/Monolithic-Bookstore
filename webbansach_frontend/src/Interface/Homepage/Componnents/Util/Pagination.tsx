import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <Stack
      style={{
        display: "inline-block",
        backgroundColor: "rgb(210,180,140)",
        borderRadius: "10px",
        margin: "5px 10vw",
        padding: "10px",
      }}
      spacing={2}
    >
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
