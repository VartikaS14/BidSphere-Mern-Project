import React from 'react'
import { Header } from '../../router'
import { Footer } from '../../router'
import PropTypes from "prop-types";
export const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main >{children}</main>
        <Footer/>
    </div>
  )
}
Layout.propTypes = {
    // href: PropTypes.any,
    // className: PropTypes.any,
    children: PropTypes.any,
    //isActive: PropTypes.any,
  };

