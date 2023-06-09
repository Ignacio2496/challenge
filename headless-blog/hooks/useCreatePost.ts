import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useState } from "react";

type CreatePostForm = {
  title: string;
  content: string;
  status: string;
};

const useCreatePost = () => {
  const schema = yup.object().shape({
    title: yup.string().required("this field is requierd"),
    content: yup.string().required("this field is requierd"),
    status: yup.string().required("this field is requierd"),
  });

  const form = useForm<CreatePostForm>({
    resolver: yupResolver(schema),
  });

  const { push } = useRouter();
  const cookie = getCookie("userToken");
  const [showSnack, setShowSnack] = useState<boolean>(true);

  const { mutate: postData, isLoading: isCreatePostLoading } = useMutation({
    mutationFn: async (postData: CreatePostForm) => {
      const { data: response } = await axios({
        url: `http://localhost/wordpress/wp-json/wp/v2/posts`,
        method: "POST",
        data: postData,
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      console.log("post", postData);
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
    postData as (data: CreatePostForm) => void
  );

  return { form, handleSubmit, showSnack };
};

export default useCreatePost;
