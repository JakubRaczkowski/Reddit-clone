import React, { useState } from "react";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../modal/CreateCommunity/CreateCommunityModal";

type Props = {};

const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false)
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex justify="left" align="center">
          <Icon as={GrAdd} fontSize="20px" mr="2" />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
