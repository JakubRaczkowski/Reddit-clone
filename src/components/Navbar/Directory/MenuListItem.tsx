import useDirectory from "@/hooks/useDirectory";
import { Flex, MenuItem, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}: MenuListItemProps) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>onSelectMenuItem({displayText, link, icon, iconColor, imageURL})}
    >
      <Flex align="center">
        {imageURL ? (
          <>
            <Image
              src={imageURL}
              alt="community pic"
              borderRadius="full"
              boxSize="18px"
              mr="2"
            ></Image>
          </>
        ) : (
          <Icon as={icon} fontSize="20px" mr="2" color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
