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
          minWidth: 275,
          height: 150,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
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
          }}
        >
          <Button
            variant="contained"
            onClick={() => push(`/${id}`)}
            size="small"
          >
            Show more
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostCard;
