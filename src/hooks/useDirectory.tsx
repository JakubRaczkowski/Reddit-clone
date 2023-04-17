import { communityState } from "@/atoms/CommunitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "@/atoms/DirectoryMenuAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaReddit } from "react-icons/fa";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const communityStateValue = useRecoilValue(communityState);

  const router = useRouter();

  const toggleMenuOpen = () => {
    setDirectoryState(prev => ({ ...prev, isOpen: !directoryState.isOpen }));
  };

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState(prev => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
     router?.push(menuItem.link);
     if (directoryState.isOpen) {
       toggleMenuOpen();
     }
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity?.id) {
      setDirectoryState(prev => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "brand.100",
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);

  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};

export default useDirectory;
