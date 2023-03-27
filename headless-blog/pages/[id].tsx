import useDeletePost from "@/hooks/useDeletePost";
import { Box, Button, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const IndividualPost = ({ post }: { post: any }) => {
  const myHtml = `<div style="color: red; fontSize: 20px;">${post.content.rendered}</div`;
  const { deletePost } = useDeletePost();
  const { push } = useRouter();
  const cookie = getCookie("userToken");
  const checkToken = (token: string) => (token ? "do nothing" : push("/login"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        alignItems: "center",
        flexDirection: "column",

        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography fontSize={"50px"} variant="h1">
            {post.title.rendered}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Post description:</Typography>
          <div dangerouslySetInnerHTML={{ __html: myHtml }}></div>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Post status:</Typography>
          <Typography>{post.status}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Publication date: </Typography>
          <Typography>{post.date}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Post ID:</Typography>
          <Typography>{post.id}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Author:</Typography>
          <Typography>{post.author}</Typography>
        </Box>
      </Box>
      <Button
        onClick={() => deletePost(post.id)}
        color="error"
        variant="contained"
      >
        Delete post
      </Button>
    </Box>
  );
};

export async function getServerSideProps({ params }: any) {
  const results = await fetch(
    `http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}`
  );
  const post = await results.json();
  return { props: { post } };
}

export default IndividualPost;
