import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export type EditPostFormType = {
  title: string;
  content: string;
  status: string;
};

type editPost = {
  id: number;
};

const useEditPost = () => {
  const cookie = getCookie("userToken");
  const schema = yup.object().shape({
    title: yup.string().required("this field is requierd"),
    content: yup.string().required("this field is requierd"),
    status: yup.string().required("this field is requierd"),
  });

  const form = useForm<EditPostFormType>({
    resolver: yupResolver(schema),
  });

  return { form, cookie };
};

export default useEditPost;
