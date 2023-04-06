import { authModalState } from "@/atoms/AuthModalAtom";
import { communityState } from "@/atoms/CommunitiesAtom";
import { Post, PostVote, postState } from "@/atoms/PostAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  doc,
  deleteDoc,
  writeBatch,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const currentCommunity = useRecoilValue(communityState).currentCommunity;
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();
    if (!user) {
      setAuthModalState({ isOpen: true, view: "login" });
      return;
    }

    const { voteStatus } = post;
    const existingVote = postStateValue.postVotes.find(
      vote => vote.postId === post.id
    );
    const batch = writeBatch(firestore);
    try {
      let voteChange = vote;

      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];

      //NEW VOTE SITUATION
      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          voteChange *= -1;
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            vote => vote.id !== existingVote.id
          );
          batch.delete(postVoteRef);
        } else {
          voteChange = 2 * vote;
          updatedPost.voteStatus = voteStatus + 2 * vote;

          const voteIndex = postStateValue.postVotes.findIndex(
            vote => vote.id === existingVote.id
          );
          if (voteIndex !== -1) {
            updatedPostVotes[voteIndex] = {
              ...existingVote,
              voteValue: vote,
            };
          }
          batch.update(postVoteRef, {
            voteValue: vote,
          });
        }
      }
      let updatedState = {
        ...postStateValue,
        postVotes: updatedPostVotes,
      };
      const postIndex = postStateValue.posts.findIndex(
        item => item.id === post.id
      );

      updatedPosts[postIndex!] = updatedPost;
      updatedState = {
        ...updatedState,
        posts: updatedPosts,
      };

       if (updatedState.selectedPost) {
        updatedState = {
          ...updatedState,
          selectedPost: updatedPost,
        };
      }
      setPostStateValue(updatedState);

      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();

      setPostStateValue(prev => ({
        ...prev,
        post: updatedPosts,
        postVotes: updatedPostVotes,
      }));
    } catch (error: any) {
      console.log(error, "onVote error");
    }
  };

  const onSelectPost = (post: Post) => {
    setPostStateValue(prev => ({ 
      ...prev,
      selectedPost: post,
    }));
   console.log('helloooo pushing')
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (
    post: Post
  ): Promise<boolean> => {
    try {
      // if image was posted delete it from storage
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // now delete the post from firestore db
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      // delete the post from STATE
      setPostStateValue(prev => ({
        ...prev,
        posts: prev.posts.filter(item => item.id !== post.id),
      }));
    } catch (error: any) {
      return false;
    }

    return true;
  };
  const getCommunityPostVotes = async (communityId: string) => {
    const postVoteQuery = await query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );

    const postVoteDocs = await getDocs(postVoteQuery);
    const postVotes = postVoteDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostStateValue(prev => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  useEffect(() => {
    if (!user || !currentCommunity) return;
    getCommunityPostVotes(currentCommunity.id);
  }, [user, currentCommunity]);

  useEffect(() => {
    if (!user) {
      setPostStateValue(prev => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return {
    onVote,
    onSelectPost,
    onDeletePost,
    postStateValue,
    setPostStateValue,
    getCommunityPostVotes,
  };
};

export default usePosts;
