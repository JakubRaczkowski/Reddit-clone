import { Community } from "@/atoms/CommunitiesAtom";
import { Post } from "@/atoms/PostAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Alert, AlertIcon, AlertTitle, Flex, Stack } from "@chakra-ui/react";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
};

const Posts = ({ communityData }: PostsProps) => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postQuery);

      const posts = postDocs.docs.map(item => {
        return { id: item.id, ...item.data() };
      });

      setPostStateValue(prev => ({
        ...prev,
        posts: posts as unknown as Post[],
      }));
    } catch (error: any) {
      console.log(error.message, "getPosts error");
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack direction={"column"}>
          {postStateValue.posts.map(
            (item: Post) => (
              console.log(item.id, "helloooo its me id"),
              (
                <PostItem
                  key={item.id}
                  post={item}
                  userIsCreator={item?.creatorId === user?.uid}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      vote => vote.postId === item.id
                    )?.voteValue
                  }
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                />
              )
            )
          )}
        </Stack>
      )}
    </>
  );
};

export default Posts;
