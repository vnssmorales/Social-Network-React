import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';


class InitFirebase extends Component {
    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            user: null
        };
    }

    //se activa cuando el componentese renderiza//
    componentWillMount() {
        //se llama a la Api y el metodo onAuth devuelve un objeto o usuario//
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user});
        })
    }

    handleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider();
        //se crea un proveedor//

        //llamar a la función del Api de firebase//
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout() {
        firebase.auth().signOut()
        .then(result => console.log(`${result.user.email} ha cerrado sesión`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    renderLoginButton() {
        //si el usuario está logueado
        if(this.state.user) {
            return(
                <div>
                    <img width="100" src={this.state.user.photoURL} alt="{this.state.user.displayName}"/>
                    <p>Hola {this.state.user.displayName}!</p>
                    <button onClick={this.handleLogout}>Salir</button>
                    < FileUpload />
                </div>
            );
        }else{
            return(
        //si el usuario no está logueado
       <button onClick={this.handleAuth}>Login con Google</button>
        )}        
    }

    render() {
        return (
            <React.Fragment>
                {this.renderLoginButton()}
            </React.Fragment>
        );
    }
}

export default InitFirebase;