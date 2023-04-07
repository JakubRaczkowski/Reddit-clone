import { Post, postState } from "@/atoms/PostAtom";
import { firestore } from "@/firebase/clientApp";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import CommentItem from "./CommentItem";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import { Comment } from "./CommentItem";
type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments = ({ user, selectedPost, communityId }: CommentsProps) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const setPostState = useSetRecoilState(postState);

  const handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId: communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update number of comments in post
      const postDocRef = doc(collection(firestore, "posts"), selectedPost?.id);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();

      setCommentText("");
      setComments(prev => [newComment, ...prev]);
      setPostState(prev => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log(error.message, "onCreateComment");
    }
    setCreateLoading(false);
  };

  
  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);
    const batch = writeBatch(firestore);
    try {
      const commentDocRef = doc(collection(firestore, "comments"), comment.id);
      console.log(commentDocRef,'helooooo')
      batch.delete(commentDocRef);

      const postDocRef = doc(collection(firestore, "posts"), selectedPost?.id);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();
      setPostState(prev => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      setComments(prev => prev.filter(item => item.id !== comment.id));
    } catch (error: any) {
      console.log(error.message, "onDeleteComment");
    }
    setLoadingDeleteId("");
  };

  const getPostComments = async () => {
    try {
      const commentsColRef = collection(firestore, "comments");
      const commentsQuery = query(
        commentsColRef,
        where("postId", "==", selectedPost!.id),
        orderBy("createdAt", "desc")
      );
      const commentsDocs = await getDocs(commentsQuery);
      const comments = commentsDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log(error.message, "getPostComments failed to fetch comments");
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

  return (
    <Box bg="white" borderRadius="0 0 4px 4px" p="2">
      <Flex
        direction="column"
        pl="10"
        mb="6"
        pr="4"
        width="100%"
        fontSize="10pt"
      >
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing="6" p="2">
        {fetchLoading ? (
          <>
            {[0, 1, 2, 3].map(item => {
              <Box key={item} p="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>;
            })}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p="20"
              >
                <Text fontWeight="700" opacity="0.3">
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map(comment => {
                  return (
                    <CommentItem
                      comment={comment}
                      key={comment.id}
                      onDeleteComment={onDeleteComment}
                      loadingDelete={loadingDeleteId === comment.id}
                      userId={user!.uid}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
