import { Post } from "@/atoms/PostAtom";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
type CommentsProps = {
  user: User;
  selectedPost: Post | null
  communityId: string;
};

const Comments = ({ user, selectedPost, communityId }: CommentsProps) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const onCreateComment = async (commentText: string) => {};
  const onCommentDelete = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

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
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};

export default Comments;
