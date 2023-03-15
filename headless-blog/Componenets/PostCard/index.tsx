import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

type PostCardType = {
  img: any;
  title: string;
  date: string;
  description: string;
};

const PostCard = ({ date, description, img, title }: PostCardType) => {
  return (
    <Box>
      <Card>
        <CardMedia component="img" height="300px" width="280px" image={img} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostCard;
