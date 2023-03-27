import PostCard from "@/Componenets/PostCard";
import { Box, Typography } from "@mui/material";

const Blog = ({ posts }: { posts: any }) => {
  return (
    <Box height={"1000px"}>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          p: 5,
        }}
      >
        <Typography variant="h2">Posts</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          p: 3,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {posts.map((post: any) => (
          <PostCard
            id={post.id}
            key={post.id}
            date={post.date}
            description={posts.description}
            title={post.title.rendered}
          />
        ))}
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  const results = await fetch("http://localhost/wordpress/wp-json/wp/v2/posts");
  const posts = await results.json();
  return { props: { posts } };
}

export default Blog;
