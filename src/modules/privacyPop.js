import React from 'react'
import Button from '../components/button'

export const PrivacyPop = () => {

    return (
        <div className='privacyPop'>
            <p>
                Naršydami www.paveiksluremai.lt jūs sutinkate su mūsų privatumo politika  su kuria galite 
                susipažinti <a href='/privacy'>čia</a>.
            </p>
            <div>
                <Button 
                    buttonText='Sutinku'
                    handleClick={() => localStorage.setItem('agree', 'true')}
                />
            </div>
        </div>
    )
}