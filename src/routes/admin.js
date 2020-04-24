import React from 'react';
import Header from '../modules/header';
import Footer from '../modules/footer';
import * as firebase from 'firebase';
import Input from '../components/inputs/input';
import Button from '../components/button';
import Loading from '../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

let db = firebase.firestore();

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            catInputVal: '',
            loaded: false,
            handleCatInput: false,
            handleColorInput: false,
            catPlusMinus: false,
            colorPlusMinus: false,
            stiklaiPlusMinus: false,
            colors: [],
            colorInputVal:'',
            stiklaiPrices: [],
            priceVal: '',
            descriptionVal: '',
            availableVal: true
        }

        this.addCatInputVal = this.addCatInputVal.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleCatInput = this.handleCatInput.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.handleColorInput = this.handleColorInput.bind(this);
        this.getColorInputValue = this.getColorInputValue.bind(this);
        this.addColor = this.addColor.bind(this);
        this.editPriceValue = this.editPriceValue.bind(this);
        this.getPriceVal = this.getPriceVal.bind(this);
        this.getAvailableVal = this.getAvailableVal.bind(this);
        this.getDescriptionVal = this.getDescriptionVal.bind(this);
        this.updatePriceVal = this.updatePriceVal.bind(this);
    }

    componentDidMount(){

        //GET CATEGORIES
        db.collection('categories').doc('cat').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                categories: data.category,
                loaded: true
            })
        })
        //GET COLORS
        db.collection('categories').doc('colors').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);

            this.setState({
                colors: data.colors,
                loaded: true
            })
        })

        //GET PRICES
        db.collection('prices').doc('stiklai').get()
        .then(doc => {
            let data = doc.data();
            data = JSON.stringify(data);
            data = JSON.parse(data);
            this.setState({
                stiklaiPrices: data.stiklai,
                loaded: true
            })
        })
    }

    addCatInputVal = (value) => {
        this.setState({
            catInputVal: value
        })
    }

    deleteCategory = (cat) => {
        let index = this.state.categories.indexOf(cat);
        if( index > -1) {
            this.state.categories.splice(index, 1);
            this.setState({
                categories: this.state.categories
            },() => {
                db.collection('categories').doc('cat').set({
                    category: this.state.categories
                })
            })
        }
    }

    addCategory = () => {
        let categories = this.state.categories.concat(this.state.catInputVal);
        this.setState({
            categories: categories
        },() => {
            db.collection('categories').doc('cat').set({
                category: this.state.categories
            })
        })
        
    }


    handleCatInput = () => {
        this.setState({
            handleCatInput: !this.state.handleCatInput,
            catPlusMinus: !this.state.catPlusMinus
        })
    }

    handleColorInput = () => {
        this.setState({
            handleColorInput: !this.state.handleColorInput,
            colorPlusMinus: !this.state.colorPlusMinus
        })
    }

    showStiklai = () => {
        this.setState({
            stiklaiPlusMinus: !this.state.stiklaiPlusMinus
        })
    }

    getColorInputValue = (colorInputVal) => {
        this.setState({
            colorInputVal
        })
    }

    addColor = () => {
        let colors = this.state.colors.concat(this.state.colorInputVal);
        this.setState({
            colors
        },() => {
            db.collection('categories').doc('colors').set({
                colors: this.state.colors
            })
        })
    }

    deleteColor = (color) => {
        let index = this.state.colors.indexOf(color);
        if( index > -1) {
            this.state.colors.splice(index, 1);
            this.setState({
                colors: this.state.colors
            },() => {
                db.collection('categories').doc('colors').set({
                    colors: this.state.colors
                })
            })
        }
    }

    editPriceValue = (id) => {
        let inputs = document.getElementById(id).getElementsByClassName('admin__prices-showInput');

        for (let i = 0; i < inputs.length; i++) {
            let inputClass = inputs[i];
            if (inputClass.style.display === 'block') {
                inputClass.style = 'display: none'
            }else {
                inputClass.style = 'display: block'
            }
        }
    }

    getPriceVal = (priceVal) => {
        this.setState({
            priceVal
        })
    }

    getDescriptionVal = (descriptionVal) => {
        this.setState({
            descriptionVal
        })
    }
    
    getAvailableVal = (e) => {
        this.setState({
            availableVal: e.target.value
        })
    }

    updatePriceVal = (idVal, productName) => {
        this.setState({
            loaded: false
        })
        let array = this.state.stiklaiPrices
        let index = array.findIndex(i => i.id === idVal)

        let arrayItem = {
            id: idVal,
            available: this.state.availableVal,
            description: this.state.descriptionVal,
            name: productName,
            price: this.state.priceVal
        }

        array.splice(index, 1, arrayItem)

        db.collection('prices').doc('stiklai').update({
            stiklai: array
        }).then(() => {
            this.setState({
                loaded: true,
                stiklaiPlusMinus: false,
                priceVal: '',
                descriptionVal: '',
                availableVal: true
            })
        })
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loaded === false ? <Loading /> : null}
                <div className='amdin'>
                    <div className='global__title'><h2>Valdymo pultas</h2></div>
                    <div className='admin__container'>

                        {/* HANDLE CATEGORIES */}
                        <div className='admin__prodcat'>
                            <div className='admin__padding'>
                                <div className='admin__title'>
                                    <h3>Produktų kategorijos</h3>
                                </div>
                                <div className='admin__categories'>
                                    <ul>
                                        {this.state.categories.map( (cat, i) => {
                                            return <li key={i}>
                                                    {cat} 
                                                    <FontAwesomeIcon 
                                                        className='global__trash' 
                                                        icon={faTrash} 
                                                        onClick={() => this.deleteCategory(cat)}
                                                    /> 
                                                </li>
                                        })}
                                    </ul>
                                </div>  
                                <div className='admin__add-category' onClick={this.handleCatInput}>
                                    <span>
                                        <FontAwesomeIcon 
                                            icon={this.state.catPlusMinus ? faMinus : faPlus} 
                                        />
                                    </span>
                                    Pridėti kategoriją
                                </div>
                                { this.state.handleCatInput ?
                                    <div>
                                        <div className='admin__prodcat-input'>
                                            <Input type='text' changeHandler={this.addCatInputVal} />
                                        </div>
                                        <div className='admin__prodcat-button'>
                                            <Button buttonText='Pridėti' handleClick={this.addCategory} />
                                        </div>
                                </div> : null}
                            </div>
                        </div>
                        
                        {/* HANDLE COLORS */}
                        <div className='admin__prodColor'>
                            <div className='admin__padding'>
                                <div className='admin__title'>
                                    <h3>Spalvos</h3>
                                </div>
                                <div className='admin__categories'>
                                    <ul>
                                        {this.state.colors.map((color, i) => {
                                            return <li key={i}>
                                                        {color}
                                                        <FontAwesomeIcon 
                                                            className='global__trash' 
                                                            icon={faTrash} 
                                                            onClick={() => this.deleteColor(color)}
                                                        />     
                                                    </li>
                                        })}
                                    </ul>
                                </div>
                                <div className='admin__add-category' onClick={this.handleColorInput}>
                                    <span>
                                        <FontAwesomeIcon 
                                            icon={this.state.colorPlusMinus ? faMinus : faPlus} 
                                        />
                                    </span>
                                    Pridėti spalvą
                                </div>
                                { this.state.handleColorInput ?
                                    <div>
                                        <div className='admin__prodcat-input'>
                                            <Input type='text' changeHandler={this.getColorInputValue} />
                                        </div>
                                        <div className='admin__prodcat-button'>
                                            <Button buttonText='Pridėti' handleClick={this.addColor} />
                                        </div>
                                </div> : null}
                            </div>
                        </div>
                        {/* HANDLE PRICES */}
                        <div className='admin__prodColor'>
                            <div className='admin__padding'>
                                <div className='admin__title'>
                                    <h3>Kainos</h3>
                                </div>
                                <div className='admin__categories'>
                                    <div className='admin__add-category' onClick={this.showStiklai}>
                                        <span>
                                            <FontAwesomeIcon 
                                                icon={this.state.stiklaiPlusMinus ? faMinus : faPlus} 
                                            />
                                        </span>
                                        Stiklai
                                    </div>
                                    {this.state.stiklaiPlusMinus ? 
                                        <ul className='admin__price-ul'>
                                            {this.state.stiklaiPrices.map((prices, i) => {
                                                return <li key={i} id={prices.id}>
                                                            <div className='admin__price-ul-title'>
                                                                {prices.name} 
                                                                <FontAwesomeIcon 
                                                                    className='admin__prices-edit'
                                                                    icon={faPen}
                                                                    onClick={() => this.editPriceValue(prices.id)}
                                                                />
                                                            </div>
                                                            <div>
                                                                Kaina: {prices.price} &euro;/m&sup2;
                                                                <div className='admin__prices-showInput'>
                                                                    <Input 
                                                                        type='number'
                                                                        placeholder={prices.price}
                                                                        changeHandler={this.getPriceVal}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                Aprašymas: {prices.description}
                                                                <div className='admin__prices-showInput'>
                                                                    <Input 
                                                                        type='text'
                                                                        placeholder={prices.description}
                                                                        changeHandler={this.getDescriptionVal}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                Rodomas: {prices.available ? 'Taip' : 'Ne'}
                                                                <div className='admin__prices-showInput'>
                                                                    <select onChange={this.getAvailableVal}>
                                                                        <option value={true}>Taip</option>
                                                                        <option value={false}>Ne</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='admin__prices-showInput'>
                                                                <div>
                                                                    <Button 
                                                                        buttonText='Atnaujinti'
                                                                        handleClick={() => this.updatePriceVal(prices.id, prices.name)}
                                                                    />   
                                                                </div>
                                                            </div>
                                                        </li>
                                            })}
                                        </ul> : null 
                                    }
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}