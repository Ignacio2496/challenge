import useDeletePost from "@/hooks/useDeletePost";
import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useEditPost from "@/hooks/useEditPost";
import { useState } from "react";
import useCreatePost from "@/hooks/useCreatePost";

const IndividualPost = ({ post }: { post: any }) => {
  const myHtml = `<div style="color: red; fontSize: 20px;">${post.content.rendered}</div`;
  const { deletePost } = useDeletePost();
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const { form } = useCreatePost();

  const handleDelte = () => {
    deletePost(post.id);
  };

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
          {isEditActive ? (
            <TextField
              {...form.register("title")}
              defaultValue={"Add your new title"}
              color="secondary"
              inputProps={{
                style: {
                  color: "white",
                },
              }}
              fullWidth
              id="standard-basic"
              label="title"
              variant="standard"
            />
          ) : (
            <Typography fontSize={"50px"} variant="h1">
              {post.title.rendered}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography>Post description:</Typography>
          {isEditActive ? (
            <TextField
              {...form.register("content")}
              defaultValue={"Add your new description"}
              color="secondary"
              inputProps={{
                style: {
                  color: "white",
                },
              }}
              fullWidth
              id="standard-basic"
              label="description"
              variant="standard"
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: myHtml }}></div>
          )}
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
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Button onClick={() => handleDelte()} color="error" variant="contained">
          <DeleteForeverIcon
            sx={{
              fontSize: "17px",
            }}
          />
          <Typography fontSize={"13px"} ml={2}>
            {isEditActive ? "Cancel Edit" : "Delete post"}
          </Typography>
        </Button>
      </Box>
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
