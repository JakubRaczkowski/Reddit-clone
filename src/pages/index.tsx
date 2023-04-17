import { communityState } from "@/atoms/CommunitiesAtom";
import { Post } from "@/atoms/PostAtom";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import PostLoader from "@/components/Posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const communityStateValue = useRecoilValue(communityState);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  const buildUserHomeFeed = async () => {};

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log(buildNoUserHomeFeed, "error in buildUserHomeFeed");
    }
    setLoading(false);
  };
  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  useEffect(() => {}, [user, loadingUser]);

  return (
    <PageContent>
      <>
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map(post => {
              return (
                <PostItem
                  key={post.id}
                  post={post}
                  userIsCreator={post.creatorId === user?.uid}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                  userVoteValue={
                    postStateValue.postVotes.find(item => item.id === post.id)
                      ?.voteValue
                  }
                  homePage
                />
              );
            })}
          </Stack>
        )}
      </>
      <></>
    </PageContent>
  );
};

export default Home;
