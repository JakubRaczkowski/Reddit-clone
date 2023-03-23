import AuthModal from "@/components/modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent = ({ user }: RightContentProps) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} /> 
      </Flex>
    </>
  );
};

export default RightContent;
