import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';


class InitFirebase extends Component {
    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            user: null,
            pictures: []
        };
    }

    //se activa cuando el componentese renderiza//
    componentWillMount() {
        //se llama a la Api y el metodo onAuth devuelve un objeto o usuario//
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });

        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            });
        });
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

    handleUpload(e) {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message)
        }, () => storageRef.getDownloadURL().then(url => {
            const record = {
                photoURL: this.state.user.photoURL,
                displayName: this.state.user.displayName,
                image: url
            };

            const dbRef = firebase.database().ref('pictures')
            const newPicture = dbRef.push();
            newPicture.set(record);
        }));
    }

    renderLoginButton() {
        //si el usuario está logueado
        if (this.state.user) {
            return (
                <div>
                    <img width="100" src={this.state.user.photoURL} alt="{this.state.user.displayName}" />
                    <p>Hola {this.state.user.displayName}!</p>
                    <button onClick={this.handleLogout}>Salir</button>

                    < FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />

                    {this.state.pictures.map(picture => (
                        <div className="returnImages">
                            <figure className="card-image">
                                <figCaption className="card-header">
                                    <img width="48" className="card-Avatar" src={picture.photoURL} alt={picture.displayName} />
                                    <span className="card-name">{picture.displayName}</span>
                                </figCaption>
                                <img width="220" src={picture.image} />
                            </figure>
                        </div>
                    )).reverse()
                    }
                </div>
            );
        } else {
            return (
                //si el usuario no está logueado
                <button onClick={this.handleAuth}>Login con Google</button>
            )
        }
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

//para obtener el archivo subido
//tambien se define una constante para hacer referencia al storage de firebase//
//ref: metodo que permite por medio de un string indicarle la referencia del directorio
//o carpeta que se utiliza en el storage
//progress: barra de progreso//
//task tendra un evento "on" que escucha un estado de firebase y devuelve un snapshot de la subida
//con alguna propiedades que se le dan
//onUpload se pasa por propiedades al otro componente
// el estado en react deberia ser inmutable, push no es inmutable porque modifica el array original
//concat devuelve un array nuevo, basado en el anterior, con los nuevos elementos agregados
//se crea un objeto en task "const record", y luego se crea una referencia para almacenarlo
// asi cada vez que se agregue un hijo a pictures, se renderizara lo que hacemos