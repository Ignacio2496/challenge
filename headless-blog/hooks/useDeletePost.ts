import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

type DeletePost = {
  id: number;
};

const useCreatePost = () => {
  const cookie = getCookie("userToken");
  const { push } = useRouter();
  const [showSnack, setShowSnack] = useState<boolean>();

  const { mutate: deletePost, isLoading: isDeletingPostLoading } = useMutation({
    mutationFn: async (id: DeletePost) => {
      const { data: response } = await axios({
        url: `http://localhost/wordpress/wp-json/wp/v2/posts/${id}`,
        method: "DELETE",
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

  return { isDeletingPostLoading, deletePost, showSnack };
};

export default useCreatePost;
