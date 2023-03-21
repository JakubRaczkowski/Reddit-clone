import React from 'react'

import { PropsWithChildren } from 'react'
import { Navbar } from '../Navbar/Navbar'


const Layout = ({children}:PropsWithChildren) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    </>
  )
}

export default Layout