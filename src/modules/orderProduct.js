import React from 'react'
import * as firebase from 'firebase'
import '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Input from '../components/inputs/input'
import DescriptionPop from '../components/desriptionPop'

let db = firebase.firestore()
let storage = firebase.storage()
let storageRef = storage.ref()

export default class OrderProduct extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            heightVal:'',
            widthVal: '',
            stiklaiArr: [],
            nugaraArr: [],
            selectedStiklai: '',
            stiklaiName: '',
            stiklaiPrice: 0
        }

        this.getHeightVal = this.getHeightVal.bind(this)
        this.getWidthVal = this.getWidthVal.bind(this)
        this.selectedStiklai = this.selectedStiklai.bind(this)
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
                        
                    </div>
                </div>
            </div>
        )
    }
}