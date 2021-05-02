import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


export default function withHeaderFooter(Component, hasHeader = true, hasFooter = false) {
    return (props) => (
        <>
            {hasHeader && <Header />}
            <Component />
            {hasFooter && <Footer />}
        </>
    );
}