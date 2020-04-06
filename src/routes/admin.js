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
            handleInput: false,
            plusMinus: false
        }

        this.addCatInputVal = this.addCatInputVal.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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


    handleInput = () => {
        this.setState({
            handleInput: !this.state.handleInput,
            plusMinus: !this.state.plusMinus
        })
    }

    render() {
        return(
            <div>
                <Header />
                {this.state.loaded === false ? <Loading /> : null}
                <div className='amdin'>
                    <div className='admin__title'><h2>Valdymo pultas</h2></div>
                    <div className='admin__prodcat'>
                        <div className='admin__padding'>
                            <div className='admin__prodcat-title'>
                                <h3>Produktų kategorijos</h3>
                            </div>
                            <div className='admin__prodcat-cat'>
                                <ul>
                                    {this.state.categories.map( (cat, i) => {
                                        return <li key={i}>
                                                {cat} 
                                                <FontAwesomeIcon 
                                                    className='admin-prodcat-trash' 
                                                    icon={faTrash} 
                                                    onClick={() => this.deleteCategory(cat)}
                                                /> 
                                            </li>
                                    })}
                                </ul>
                            </div>
                            <div className='admin__prodcat-add' onClick={this.handleInput}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={this.state.plusMinus ? faMinus : faPlus} 
                                    />
                                </span>
                                Pridėti kategoriją
                            </div>
                            { this.state.handleInput ?
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
                </div>
            </div>
        )
    }
}