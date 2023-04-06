import { Post } from "@/atoms/PostAtom";

import { Flex, Icon, Text, Stack, Image, Skeleton, Spinner, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number | undefined;
   onVote: (post: Post, vote: number, communityId: string) => void
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}: PostItemProps) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const sucess = await onDeletePost(post);

      if (!sucess) {
        throw new Error("delete failed");
      }
      console.log("post was deleted");
    } catch (error: any) {
      console.log(error, "set Item handle delete error");
      setError(error.message);
    }
    setLoadingDelete(false);
  };
  return (
    <Flex
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4"
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        bg="gray.100"
        align="center"
        p="2"
        width="40px"
        borderRadius="4"
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize="22"
          onClick={() => onVote(post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize="22"
          onClick={() => onVote(post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" bg="white" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr="2">{error}</AlertTitle>
          </Alert>
        )}
        <Stack spacing="1" p="10px">
          <Stack direction="row" spacing="0.6" align="center" fontSize="9pt">
            {/* HOME PAGE ? DISPLAY ICON : DONT DISPLAY ICON */}
            <Text>
              Created by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>

          <Text fontSize="12pt" fontWeight="600">
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" pt="2">
              {imageIsLoading && (
                <Skeleton
                  height="200px"
                  width="100%"
                  borderRadius="4"
                ></Skeleton>
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                width="100%"
                alt="image"
                display={imageIsLoading ? "none" : "unset"}
                onLoad={() => setImageIsLoading(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml="1" mb="0.5" color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr="2" />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr="2" />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr="2" />
            <Text fontSize="9pt">Save</Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius="4"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr="2" />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
