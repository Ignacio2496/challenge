import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Blog = ({ posts }: any) => {
  console.log(posts);
  return (
    <Box>
      <Typography>This is a blog</Typography>
      <ul>
        {posts?.map((post: any) => (
          <Link key={post.title.rendered} href={`/${post.id}`}>
            <Typography>{post.title.rendered}</Typography>
          </Link>
        ))}
      </ul>
    </Box>
  );
};

export async function getServerSideProps() {
  const result = await fetch("http://localhost/wordpress/wp-json/wp/v2/posts");
  const posts = await result.json();

  return { props: { posts } };
}

export default Blog;
