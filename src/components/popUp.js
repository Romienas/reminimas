import React from 'react';
import Input from './inputs/input';
import Button from './button';

export default class PopUp extends React.Component {

    render(){
        return(
            <div className='popup'>
                <div className='popup__input'>
                    <Input type='text' placeholder='Vartotojo vardas'/>
                </div>
                <div className='popup__input'>
                    <Input type='password' placeholder='Slaptažodis'/>
                </div>
                <div className='popup__bottom'>
                    <div className='popup__text'>
                        <a href='/registration' >Registruotis</a>
                    </div>
                    <Button buttonText='Prisijungti' />
                </div>
            </div>
        )
    }
}