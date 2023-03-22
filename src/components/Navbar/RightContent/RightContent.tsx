import AuthModal from '@/components/modal/Auth/AuthModal'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import AuthButtons from './AuthButtons'
import { signOut } from 'firebase/auth'
import {auth} from '../../../firebase/clientApp'
import {User} from 'firebase/auth'

type RightContentProps = {
  user: User | null | undefined
}



const RightContent = ({user}:RightContentProps) => {

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Button
        onClick={() => signOut(auth)}
        > Log out

        </Button>: <AuthButtons />}
      </Flex>
    </>
  );
}

export default RightContent