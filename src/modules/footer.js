import React from 'react';

export default class Footer extends React.Component {
    render() {
        return(
            <div className='footer'>
                <div className='footer__links'>
                    <a href='/privacy' >Privatumo politika</a>
                    <a href='/'>Užsakymo pateikimas</a>
                </div>
                <div>
                    Sukurta <a href='https://webrom.lt' >Webrom</a>
                </div>
            </div>
        )
    }
}