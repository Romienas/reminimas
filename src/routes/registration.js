import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
import Button from '../components/button';

export default class Registration extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <div className='registration'>
                    <div className='registration__box'>
                        <div className='registration__input'>
                            <Input type='email' placeholder='El. pašto adresas' />
                        </div>
                        <div className='registration__input'>
                            <Input type='password' placeholder='Slaptažodis' />
                        </div>
                        <div className='registration__input'>
                            <Input type='password' placeholder='Pakartokite slaptažodį' />
                        </div>
                        <div className='registration__button'>
                            <Button buttonText='Regisrtuotis' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}