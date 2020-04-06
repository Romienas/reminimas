import React from 'react';
import Header from '../modules/header';
import * as firebase from 'firebase';
import Input from '../components/inputs/input';
import Button from '../components/button';
import Loading from '../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

let db = firebase.firestore();

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            catInputVal: '',
            loaded: false,
            handleInput: false
        }

        this.addCatInputVal = this.addCatInputVal.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleInput = this.handleInput.bind(this);
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
            handleInput: !this.state.handleInput
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
                                                /> 
                                            </li>
                                    })}
                                </ul>
                            </div>
                            <div className='admin__prodcat-add' onClick={this.handleInput}>
                                <span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                Pridėti kategoriją
                            </div>
                            { this.state.handleInput ?
                                <div>
                                <div>
                                    <Input type='text' changeHandler={this.addCatInputVal} />
                                </div>
                                <div>
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