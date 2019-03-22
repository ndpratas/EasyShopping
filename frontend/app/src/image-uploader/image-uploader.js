import React from 'react';
import './style.css';

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', fileSent: false};
    }

    handleChange(e) {
        if (!e.target.files[0]) {
            return
        }
        this.state = {file: e.target.files[0]}
        console.log('image uploader: ', this.state)
        this.fileToBase64(this.state.file).then(
            data => fetch('https://mywebsite.com/endpoint/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain',
                },
                body: data
            }).then());
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        return (<div>
                <input id="uploadImage"
                       className="fileInput"
                       type="file"
                       onChange={(e) => this.handleChange(e)}></input>
                <button className="search-button"
                        type="submit"
                        htmlFor="uploadImage"
                >
                    <i className="fas fa-camera"></i>
                    <span> </span>
                    <label htmlFor="uploadImage">Search by image</label>
                </button>
            </div>
        )
    }
}

export default ImageUploader
