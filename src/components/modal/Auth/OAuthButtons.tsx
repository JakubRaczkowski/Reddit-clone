import { auth } from '@/firebase/clientApp'
import { Button, Flex,Image,Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FIREBASE_ERRORS } from '../../../firebase/errors'
import {setDoc, collection,doc } from 'firebase/firestore'
import { firestore } from '@/firebase/clientApp'
import { User } from 'firebase/auth'

const googleLogo = '/images/googlelogo.png'


const OAuthButtons = () => {

    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)


    const createUserDocument = async (user: User) => {
      const userDocRef = doc(firestore, 'users',user.uid)
      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))

    };
    useEffect(() => {
      if (userCred) {
        createUserDocument(userCred.user);
      }
    }, [userCred]);


  return (
    <Flex direction="column" width="100%">
      <Button
        variant={"oauth"}
        mb="2"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src='/images/googlelogo.png'
          height="20px"
          mr="2"
          alt="google"
        />
        Continue with Google
      </Button>
      {error && (
        <Text color="red.500">
          {error.message === "Firebase: Error (auth/popup-closed-by-user)."
            ? null
            : error.message}
        </Text>
      )}
    </Flex>
  );
}

export default OAuthButtons