import React from 'react';

export default class Footer extends React.Component {
    render() {
        return(
            <div className='footer'>
                <div className='footer__links'>
                    <a href='/privacy' >Privatumo politika</a>
                    <a href='/orderprocedure'>Užsakymo pateikimas</a>
                </div>
                <div className='footer__signature'>
                    Sukurta <a href='https://webrom.lt' >Webrom</a>
                </div>
            </div>
        )
    }
}