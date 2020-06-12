import React, { createContext } from 'react'

export const UserContext = createContext()

export default class UserContextProvider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logged: false,
            trueFunc: this.updateUserStatusTrue,
            falseFunc: this.updateUserStatusFalse
        }
    }

    updateUserStatusTrue = () => {
        this.setState({
            logged: true
        })
    }
    
    updateUserStatusFalse = () => {
        this.setState({
            logged: false
        })
    }

    render() {
        return (
            <UserContext.Provider value={{...this.state}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}