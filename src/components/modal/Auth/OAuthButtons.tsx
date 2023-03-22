import { auth } from '@/firebase/clientApp'
import { Button, Flex,Image,Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FIREBASE_ERRORS } from '../../../firebase/errors'

type Props = {}

const OAuthButtons = (props: Props) => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  return (
    <Flex direction="column" width="100%">
      <Button
        variant={"oauth"}
        mb="2"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="images/googlelogo.png" height="20px" mr="2" alt="google" />
        Continue with Google
      </Button>
      {error && (
        <Text color="red.500">
          {error.message === "Firebase: Error (auth/popup-closed-by-user)." ? null : error.message}
        </Text>
      )}
    </Flex>
  );
}

export default OAuthButtons