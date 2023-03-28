import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useAuthContext } from "@/context/AuthContext";

type LoginForm = {
  username: string;
  password: string;
  status: string;
};

const useLogin = () => {
  const { push } = useRouter();
  const schema = yup.object().shape({
    username: yup.string().required("this field is requierd"),
    password: yup.string().required("this field is requierd"),
  });

  const form = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const { mutate: logInFetch, isLoading: isLogInLoading } = useMutation({
    mutationFn: async (formData: LoginForm) => {
      const { data: response } = await axios({
        url: `http://localhost/wordpress/wp-json/jwt-auth/v1/token?username=${formData.username}&password=${formData.password}`,
        method: "POST",
        data: formData,
      });
      return response;
    },

    onError: (data) => {},
    onSuccess: (data) => {
      setCookie("userToken", data.token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });

      push("/blog");
    },
  });

  const handleSubmit = form.handleSubmit(
    logInFetch as (data: LoginForm) => void
  );

  return { form, handleSubmit, isLogInLoading };
};

export default useLogin;
