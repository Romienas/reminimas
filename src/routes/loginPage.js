import React from 'react'
import Login from '../modules/login'
import Footer from '../modules/footer'
import Header from '../modules/header'

export const LoginPage = () => {
    return (
        <div>
            <Header />
            <div className='loginPage'>
                <Login />
            </div>
            <Footer />
        </div>
    )
}