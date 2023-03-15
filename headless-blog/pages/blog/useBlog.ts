import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Posts } from "../../graphql/queries";

const useBlog = () => {
  const [PostsData, setPostsData] = useState<any>();

  useQuery(Posts, {
    onCompleted(data) {
      setPostsData(data.posts.nodes);
    },
  });

  return { PostsData };
};

export default useBlog;
