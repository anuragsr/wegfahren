import React, { useRef } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.bundle.min'

import Home from './components/pages/Home'
import Team from './components/pages/Team'
import FAQ from './components/pages/FAQ'
import Impressum from './components/pages/Impressum'
import ScrollToTop from './components/helpers/ScrollToTop'
import { useModal } from './components/common/Modal'

import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

export default function App() {
  
  const refs = {
    ref0: useRef(null)
    , ref1: useRef(null)
    , ref2: useRef(null)
    , ref3: useRef(null)
  }
  , { 
    isShowing, toggle, 
    showMoreInfo, toggleMoreInfo,
  } = useModal()
  , modalFns = { 
    isShowing, toggle, 
    showMoreInfo, toggleMoreInfo,
  };

  const { REACT_APP_PROJECT_PATH } = process.env;

  return (
    <BrowserRouter basename={REACT_APP_PROJECT_PATH}>
      <div className="ctn-link">
        <Link to="/">Home</Link>
        <Link to="/team">Team</Link>
        <Link to="/faq">FAQ</Link>                
        <Link to="/impressum">Impressum</Link>  
      </div>
      <ScrollToTop />
      <Header {...refs} {...modalFns}/>
      <Switch>
        <Route exact path="/"><Home {...refs} {...modalFns}/></Route>
        <Route path="/team"><Team /></Route>
        <Route path="/faq"><FAQ /></Route>
        <Route path="/impressum"><Impressum /></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}