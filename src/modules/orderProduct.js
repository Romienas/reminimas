import React from 'react'
import * as firebase from 'firebase'
import '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Input from '../components/inputs/input'
import DescriptionPop from '../components/desriptionPop'
import Button from '../components/button'

let db = firebase.firestore()
let storage = firebase.storage()
let storageRef = storage.ref()

export default class OrderProduct extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            heightVal:'',
            widthVal: '',
            dimensionErr: false,
            stiklaiArr: [],
            nugaraArr: [],
            selectedStiklai: '',
            stiklaiName: '',
            stiklaiPrice: 0,
            stiklaiErr: false,
            nugaraName: '',
            nugaraPrice: 0,
            nugaraErr: false,
            commentVal: '',
            totalPrice: 0
        }

    }

    componentDidMount(){

        //Get Stiklai array
        db.collection('prices').doc('stiklai').get()
        .then(doc => {
            let data = doc.data()
            data = JSON.stringify(data)
            data = JSON.parse(data)

            this.setState({
                stiklaiArr: data.stiklai,
            })
        })

        //Get Nugara array
        db.collection('prices').doc('nugara').get()
        .then(doc => {
            let data = doc.data()
            data = JSON.stringify(data)
            data = JSON.parse(data)

            this.setState({
                nugaraArr: data.nugara
            })
        })

        // Get images url
        this.props.productObj.image.forEach(img => {
            storageRef.child(`images/${img}`)
            .getDownloadURL()
            .then(url => {
                document.getElementById(img).src = url
            })
        });

        // Set gallery main image
        storageRef.child(`images/${this.props.productObj.image[0]}`)
        .getDownloadURL()
        .then(url => {
            document.getElementById('orderProduct__mainImg').src = url
        })
    }


    componentDidUpdate(prevProps, prevState) {
        // Get frame price
        let framePrice = (this.props.productObj.width/1000 * 4 + this.state.heightVal/100 + this.state.widthVal/100) * 2 * this.props.productObj.price
        framePrice = Math.round(framePrice)
        
        //Get square meter
        const sqM = this.state.heightVal * this.state.widthVal / 10000

        //Get glass price
        let glassPrice = this.state.stiklaiPrice * sqM
        glassPrice = Math.round(glassPrice)

        //Get back price
        let backPrice = this.state.nugaraPrice * sqM
        backPrice = Math.round(backPrice)

        //Get total price
        let total = framePrice + glassPrice + backPrice

        if (total < 21) {
            total++
        }
        
        if(total !== prevState.totalPrice){
            this.setState({
                totalPrice: total
            })
        }
    }            

    handleClick = () =>{
        this.props.handleClick('')
    }
    
    changeImage = (e) => {
        document.getElementById('orderProduct__mainImg').src = e.target.src
    }

    getHeightVal = (heightVal) => {
        this.setState({
            heightVal
        })
    }

    getWidthVal = (widthVal) => {
        this.setState({
            widthVal
        })
    }

    selectedStiklai = (selectedStiklai) => {
        this.setState({
            selectedStiklai
        })
    }

    getStiklaiInputVal = (stiklaiPrice, stiklaiName) => {
        this.setState({
            stiklaiPrice,
            stiklaiName
        })
    }
    
    getNugaraInputVal = (nugaraPrice, nugaraName) => {
        this.setState({
            nugaraPrice,
            nugaraName
        })
    }

    getCommentVal = (e) => {
        this.setState({
            commentVal: e.target.value
        })
    }

    addOrder = () => {
        //Check is everything filled up
        if (this.state.heightVal === '' || this.state.widthVal === ''){
            this.setState({
                dimensionErr: true
            })
        } else if (this.state.heightVal !== '' && this.state.widthVal !== ''){
            this.setState({
                dimensionErr: false
            })
        }

        if (this.state.stiklaiName === '') {
            this.setState({
                stiklaiErr: true
            })
        } else {
            this.setState({
                stiklaiErr: false
            })
        }
        
        if (this.state.nugaraName === '') {
            this.setState({
                nugaraErr: true
            })
        } else {
            this.setState({
                nugaraErr: false
            })
        }

    }

    render() {
        return(
            <div className='orderProduct' >
                <div className='orderProduct__closeBackground' onClick={this.handleClick}></div>
                <div className='orderProduct__box'>
                    <FontAwesomeIcon 
                        className='orderProduct__closeButton'
                        icon={faWindowClose}
                        onClick={this.handleClick}
                    />
                    <div className='orderProduct__padding'>
                        <div className='global__title'>
                            <h2>Rėmo užsakymas</h2>    
                        </div>
                        <div className='orderProduct__productName'>
                            <h3>{this.props.productObj.productName}</h3>
                        </div>
                        <div className='orderProduct__gallery'>
                            <div className='orderProduct__gallery-mainImg'>
                                <img id='orderProduct__mainImg' src='' alt={this.props.productObj.productName} />
                            </div>
                            <div className='orderProduct__gallery-images'>
                                {this.props.productObj.image.map((img, i) => {
                                    return <img 
                                                id={img} 
                                                key={i} 
                                                src='' 
                                                alt={this.props.productObj.productName} 
                                                onClick={this.changeImage}
                                            />
                                })}
                            </div>
                        </div>
                        <div className='orderProduct__productPrice'>
                            Kaina: {this.props.productObj.price} &euro;/m
                        </div>
                        <div className='orderProduct__inputHeader'>
                            Įveskite rėminamo darbo išmatavimus:
                        </div>
                        <div className='orderProduct__sizeInputs'>
                            <Input type='number' placeholder='Plotis cm' changeHandler={this.getHeightVal}/>
                            <span>X</span>
                            <Input type='number' placeholder='Aukštis cm' changeHandler={this.getWidthVal} />
                        </div>
                        <div className='orderProduct__inputHeader'>
                            Pasirinkite norimą stiklą:
                        </div>
                        <ul className='orderProduct__select'>
                            {this.state.stiklaiArr.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <label>
                                            <input 
                                                type='radio' 
                                                id={item.name} 
                                                name='stiklai' 
                                                value={item.price} 
                                                onChange={() => this.getStiklaiInputVal(item.price, item.name)}
                                            />
                                            {item.name}
                                            <DescriptionPop description={item.description} />
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                        
                        <div className='orderProduct__inputHeader'>
                            Pasirinkite norimą nugarą:
                        </div>
                        <ul className='orderProduct__select'>
                            {this.state.nugaraArr.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <label>
                                            <input 
                                                type='radio' 
                                                id={item.name} 
                                                name='nugara' 
                                                value={item.price} 
                                                onChange={() => this.getNugaraInputVal(item.price, item.name)}
                                            />
                                            {item.name}
                                            <DescriptionPop description={item.description} />
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className='orderProduct__inputHeader'>
                            Komentaras:
                        </div>
                        <textarea 
                            className='orderProduct__comment'
                            placeholder='Pateikite savo pageidavimus arba pastabas'
                            onChange={this.getCommentVal}
                        />

                        <div className='orderProduct__totalPrice'>
                            Preliminari kaina: {this.state.totalPrice} &euro;
                        </div>
                        <p className='orderProduct__totalPrice-note'>Tiksli kaina bus pasakyta įvertinus 
                        gautus darbus ir papildomus pageidavimus.</p>
                        <div className='orderProduct__error'> 
                            {this.state.dimensionErr && <p>Įveskite išmatavimus</p>}
                            {this.state.stiklaiErr && <p>Pažymėkite pageidaujamą stiklą</p>}
                            {this.state.nugaraErr && <p>Pažymėkite pageidaujamą nugarėlę</p>}
                        </div>
                        <div className='orderProduct__order'>
                            <div className='orderProduct__cancel-order' onClick={this.handleClick}>
                                Atšaukti
                            </div>
                            <Button 
                                buttonText='Užsakyti'
                                handleClick={this.addOrder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}