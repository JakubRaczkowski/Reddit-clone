import { Flex } from '@chakra-ui/react';
import React from 'react'
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/AuthModalAtom';


type Props = {}

const Reset = (props: Props) => {
      const [modalState, setModalState] = useRecoilState(authModalState);

  return (
    <Flex>
        
    </Flex>
  )
}

export default Reset