import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import useBlog from "./useBlog";

const Blog = () => {
  const { PostsData } = useBlog();
  console.log("posts", PostsData?.posts?.nodes.title);
  return (
    <Box>
      <Typography>This is a blog</Typography>
      <ul>
        {PostsData?.map((post: any) => (
          <Link key={post.title} href={`/${post.id}`}>
            <Typography>{post.date}</Typography>
          </Link>
        ))}
      </ul>
    </Box>
  );
};

export default Blog;
