import React, { Component } from 'react';

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadValue: 0,
        };
    }

    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100">
                {this.state.uploadValue} % 
                </progress>
                <br />
                <input type="file" onChange={this.props.onUpload}></input>
                <br />
            </div>

        );
    }

}
export default FileUpload;

//cuando se activa onChange, dispara un evento, que tiene una constante 
