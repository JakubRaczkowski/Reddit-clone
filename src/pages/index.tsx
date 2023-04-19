import { communityState } from "@/atoms/CommunitiesAtom";
import { Post, PostVote } from "@/atoms/PostAtom";
import PersonalHome from "@/components/Community/PersonalHome";
import Premium from "@/components/Community/Premium";
import Recommendations from "@/components/Community/Recommendations";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import PostLoader from "@/components/Posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          item => item.communityId
        );
        const postQurey = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          orderBy("voteStatus", "desc"),
          limit(10)
        );
        const postDocs = await getDocs(postQurey);
        const posts = postDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue(prev => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log(error, "error in buildUserHomeFeed for logged in user");
    }
    setLoading(false);
  };

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
  const getUserPostVotes = async () => {
    try {
      const postId = postStateValue.posts.map(item => item.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postId) 
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPostStateValue(prev => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }))
    } catch (error) {
      console.log(error, "error in getUserPostVotes");
    }
  };

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();
    return () => {
      setPostStateValue(prev=>({
        ...prev,
        postVotes: []
      }))
    }
  }, [user, postStateValue.posts]);

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);

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
      <Stack spacing='5'>
      <Recommendations />
      <Premium />
      <PersonalHome />
      </Stack>
    </PageContent>
  );
};

export default Home;
