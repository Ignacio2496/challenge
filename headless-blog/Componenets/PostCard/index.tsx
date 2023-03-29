import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
type PostCardType = {
  img?: any;
  title: string;
  date: string;
  description: string;
  id: string;
};

const PostCard = ({ date, description, title, id }: PostCardType) => {
  const { push } = useRouter();
  return (
    <Box>
      <Card
        sx={{
          minWidth: 300,
          height: 200,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          transition: "all ease-in-out 0.2s",
          "&:hover": {
            boxShadow: "1px 1px 10px 1px rgba(54, 52, 52, 0.7)",
            transform: "translateY(-10px)",
          },
        }}
      >
        <CardContent>
          <Typography textAlign={"center"} variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => push(`/${id}`)}
            size="small"
          >
            <VisibilityIcon
              sx={{
                fontSize: "17px",
              }}
            />
            <Typography fontSize={"13px"} ml={2}>
              View
            </Typography>
          </Button>

          <Button
            onClick={() => push(`/edit/${id}`)}
            variant="contained"
            color="success"
            type="submit"
          >
            <EditIcon
              sx={{
                fontSize: "17px",
              }}
            />

            <Typography fontSize={"13px"} ml={2}>
              Edit
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostCard;
