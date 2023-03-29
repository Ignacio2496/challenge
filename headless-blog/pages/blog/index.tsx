import PostCard from "@/Componenets/PostCard";
import { Box, Typography } from "@mui/material";

const Blog = ({ posts }: { posts: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: { xs: "fit-content", md: "100vh" },
        backgroundImage: `url("/Images/blog2.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          borderBottom: "1px solid #f1f1f1ab",
        }}
      >
        <Box>
          <Typography color="#e2e2e2e4" variant="h2">
            Blog
          </Typography>
        </Box>
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
