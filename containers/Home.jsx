import { useState } from "react";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CustomCusor from '../components/CustomCusor';
import Header from '../components/Header';
import Featuerd from '../components/Featured';
import About from '../components/About';
import Gallery from '../components/Gallery';

import style from './home.module.scss'

const Home = () => {
    return (
        <>
        <CustomCusor/>

        <div className={style.main_container} id='main-container'>
            <NavBar/>
            <Header/>
            <Featuerd/>
            <About/>
            <Gallery/>
            <Footer/>
        </div>
        </>
    );
}

export default Home;

