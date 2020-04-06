import React from 'react';
import Header from '../modules/header';
import Input from '../components/inputs/input';
// import * as firebase from 'firebase';

export default class AddProduct extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <div>
                    <Input type='text' placeholder='Prekės pavadinimas' />
                    <Input type='url' placeholder='Nuotraukos URL' />
                    <Input type='number' placeholder='Metro kaina' />
                    <Input type='number' placeholder='Bageto aukštis' />
                    <Input type='number' placeholder='Bageto plotis' />
                    
                </div>
            </div>
        )
    }
}