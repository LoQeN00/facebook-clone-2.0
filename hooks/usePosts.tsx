import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { POSTS_DATA_QUERY } from '../graphql/queries';
import { Post } from '../types/index';

export const usePosts = () => {
  const [postsData, setPostsData] = useState<Post[] | []>([]);

  const { data, error, loading, fetchMore, previousData } = useQuery<{ posts: Post[] }>(POSTS_DATA_QUERY, {
    variables: {
      take: 2,
      offset: 0,
    },
    onCompleted(data) {
      setPostsData((prevState) => {
        console.log(data.posts);
        // return [...prevState, ...data.posts];
        return data.posts;
      });
    },
  });

  return {
    postsData,
    error,
    loading,
    setPostsData,
    data,

    fetchMore,
  };
};
