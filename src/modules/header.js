import React from 'react';
import PopUp from '../components/popUp';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false
        }
    }

    showPopUp = () => {
        this.setState({
            showPopUp: !this.state.showPopUp
        })
    }

    render() {
        return(
            <div className='header'>
                <div>
                    <h1>Paveikslų rėminimas</h1>
                </div>
                <div>
                    <div className='header__login' onClick={this.showPopUp}>Prisijungti</div>
                    {this.state.showPopUp === false ? null :
                    <div>
                        <div className='header__close-popup' onClick={this.showPopUp}></div>
                        <PopUp />
                        </div>
                    }
                </div>
            </div>
        )
    }
}