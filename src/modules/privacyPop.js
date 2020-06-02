import React, { useState, useEffect } from 'react'
import Button from '../components/button'

export const PrivacyPop = () => {
    const [bool, setBool] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('agree') === 'true'){
            setBool(true)
        } else {
            setBool(false)
        }
    }, [])

    return (
        <div className='privacyPop'>
            {bool === false ? 
            <div className='privacyPop__content'>
                <p>
                    Naršydami www.paveiksluremai.lt jūs sutinkate su mūsų privatumo politika  su kuria galite 
                    susipažinti <a href='/privacy'>čia</a>.
                </p>
                <div>
                    <Button 
                        buttonText='Sutinku'
                        handleClick={() => {
                            localStorage.setItem('agree', 'true')
                            setBool(true)
                        }}
                    />
                </div>
            </div>: null}
        </div>
    )
}