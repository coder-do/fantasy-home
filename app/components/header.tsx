'use client';

import Link from "next/link";
import { useLogin } from "../context/loginContext";

const Header = () => {
  const { login, logout, isLoggedIn } = useLogin();

  return (
    <div className="header-main">
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <h1><a href="/">Fantasy Home<span>Great look in Outfit</span></a></h1>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="scroll hvr-outline-in"><a href="/">Home</a></li>
              <li><a className="scroll hvr-outline-in" href="#about">About</a></li>
              {/* <button style={{ width: '110px', position: 'relative', bottom: '9px' }}
                className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Language
                <span className="caret" style={{ position: 'relative', right: '-5px' }}></span>
              </button> */}
              {/* <ul className="dropdown-menu">
                <li><a href='#' id="en" className="scroll">En</a></li>
                <li><a href='#' id="ge" className="scroll">Ge</a></li>
              </ul> */}
              <li><a className="scroll hvr-outline-in" href="#gallery">Gallery</a></li>
              {isLoggedIn ? (
                <>
                  <li><a href="/" className="scroll hvr-outline-in" id="logout" style={{ cursor: 'pointer' }}>logout</a></li>
                </>
              ) : (
                <>
                  <li><Link href='/login' className="scroll hvr-outline-in" id="login" style={{ cursor: 'pointer' }}>login</Link></li>
                </>
              )}
            </ul>

          </div>
          <div className="clearfix"> </div>
        </nav>
        <div className="clearfix"> </div>
      </div>
    </div>
  )
}

export default Header;