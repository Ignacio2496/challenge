import useCreatePost from "@/hooks/useCreatePost";
import useEditPost, { EditPostFormType } from "@/hooks/useEditPost";
import {
  Box,
  Button,
  FormControl,
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
      push("/blog");
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
        height: "100%",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          p: 5,
          width: { xs: "98%", md: "50%" },
          background: "#c7cacb",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="black" variant="h3">
            Edit Post
          </Typography>
        </Box>
        <Box>
          <Typography color="black" mb={1}>
            Title
          </Typography>
          <TextField
            defaultValue={post.title.rendered}
            fullWidth
            {...form.register("title")}
            sx={{
              color: "white",
              border: "white",
            }}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography color="black" mb={1}>
            Content
          </Typography>
          <TextField
            defaultValue={"Edit your content here"}
            fullWidth
            maxLength={12}
            inputProps={{
              style: {
                height: "100px",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
              },
            }}
            {...form.register("content")}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>

        <Box>
          <Typography color="black" mb={1}>
            Status
          </Typography>
          <FormControl fullWidth>
            <Select
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
          Create text
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

export default EditPost;
