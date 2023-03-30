import React from "react";
import PageContent from "@/components/Layout/PageContent";
import { Box } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box
          borderBottom="1px solid"
          borderColor="white"
          p="14px 0"
          fontSize="24px"
        >
          Create a post
        </Box>
        {user && <NewPostForm user={user} />}{" "}
      </>
      <>{/* <AboutCommunity /> */}</>
    </PageContent>
  );
};

export default SubmitPostPage;
