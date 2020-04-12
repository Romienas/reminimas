import React from 'react';
import Header from '../modules/header';
import * as firebase from 'firebase';
import Input from '../components/inputs/input';
import Button from '../components/button';
import Loading from '../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

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
            colors: [],
            colorInputVal:''
        }

        this.addCatInputVal = this.addCatInputVal.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleCatInput = this.handleCatInput.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.handleColorInput = this.handleColorInput.bind(this);
        this.getColorInputValue = this.getColorInputValue.bind(this);
        this.addColor = this.addColor.bind(this);
    }

    componentDidMount(){
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
                                                            className='admin__trash' 
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
                    </div>
                </div>
            </div>
        )
    }
}