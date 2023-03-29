import React from "react";
import PageContent from "@/components/Layout/PageContent";
import { Box } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";

const SubmitPostPage = () => {
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
        <NewPostForm />
      </>
      <>
      {/* <AboutCommunity /> */}
      
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
