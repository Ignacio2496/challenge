import PostCard from "@/Componenets/PostCard";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import useBlog from "./useBlog";

const Blog = () => {
  const { PostsData } = useBlog();
  return (
    <Box height={"1000px"}>
      <Typography>This is a blog</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {PostsData?.map((post: any) => (
          <Link key={post.title} href={`/${post.id}`}>
            <PostCard
              date={post.date}
              description={post.description}
              img={post.featuredImage.node.sourceUrl}
              title={post.title}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
