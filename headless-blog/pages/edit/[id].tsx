import SuccessResponse from "@/Componenets/Toast";
import useEditPost, { EditPostFormType } from "@/hooks/useEditPost";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useMutation } from "react-query";

const EditPost = ({ post }: { post: any }) => {
  const { form, cookie } = useEditPost();
  const [status, setStatus] = useState("publish");
  const { push } = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [showSnack, setShowSnack] = useState<boolean>();
  const { mutate: editPostForm, isLoading: isEditPostLoading } = useMutation({
    mutationFn: async (postEdit: EditPostFormType) => {
      const { data: response } = await axios({
        url: `http://localhost/wordpress/wp-json/wp/v2/posts/${post.id}`,
        method: "POST",
        data: postEdit,
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      return response;
    },

    onError: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      setShowSnack(true);
      setTimeout(() => {
        push("/blog");
      }, 1000);
    },
  });

  const handleSubmit = form.handleSubmit(
    editPostForm as (data: EditPostFormType) => void
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        bgcolor: "rgba(254, 252, 252, 0.765)",
        p: 2,
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          color={"rgba(0, 0, 0, 0.75) "}
          fontWeight={700}
          fontSize={"50px"}
          variant="h1"
        >
          Edit post
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          p: 5,
          width: { xs: "98%", md: "50%" },
          border: "1px solid black",
          boxShadow: " 10px 10px 0px 2px rgba(0,0,0,0.75)",
          webkitBoxShadow: "10px 10px 0px 2px rgba(0,0,0,0.75)",
          mozBoxShadow: "10px 10px 0px 2px rgba(0,0,0,0.75) ",
        }}
      >
        <Box>
          <TextField
            label="title"
            defaultValue={post.title.rendered}
            fullWidth
            {...form.register("title")}
            sx={{
              color: "white",
              border: "white",
              bgcolor: "rgba(181, 181, 181, 0.765)",
            }}
            id="outlined-basic"
            variant="standard"
          />
        </Box>
        <Box>
          <TextField
            sx={{
              color: "white",
              border: "white",
              bgcolor: "rgba(181, 181, 181, 0.765)",
            }}
            label="content"
            defaultValue={"Edit your content here"}
            fullWidth
            {...form.register("content")}
            id="outlined-basic"
            variant="standard"
          />
        </Box>

        <Box>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <FormControl fullWidth>
            <Select
              sx={{
                border: "white",
                bgcolor: "rgba(181, 181, 181, 0.765)",
              }}
              {...form.register("status")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={"publish"}>Publish</MenuItem>
              <MenuItem value={"no-Published"}>Not Published</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button type="submit" color="info" variant="contained">
          Edit
        </Button>
      </Box>
      {showSnack && <SuccessResponse message="Post successfully edited" />}
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

export default EditPost;
