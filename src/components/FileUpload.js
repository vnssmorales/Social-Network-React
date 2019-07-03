import React, { Component } from 'react';
import firebase from 'firebase';


class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(e) {
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref(`fotos/${file.name}`);
        let task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message)
        },() =>{
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
        });
    }

    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br />
                <input type="file" onChange={this.handleUpload}></input>
                <br />
                <img width="220" src={this.state.picture} alt="" />
            </div>

        );
    }

}
export default FileUpload;

//cuando se activa onChange, dispara un evento, que tiene una constante 
//para obtener el archivo subido
//tambien se define una constante para hacer referencia al storage de firebase//
//ref: metodo que permite por medio de un string indicarle la referencia del directorio
//o carpeta que se utiliza en el storage
//progress: barra de progreso//
//task tendra un evento "on" que escucha un estado de firebase y devuelve un snapshot de la subida
//con alguna propiedades que se le dan