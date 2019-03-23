import React from 'react';
import './style.css';

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', data: []};
    }

    handleChange(e) {
      const { onResultsFound } = this.props;

      if (!e.target.files[0]) {
          return
      }
      this.state = {file: e.target.files[0]}
      console.log('image uploader: ', this.state)
      this.fileToBase64(this.state.file).then(
          data => fetch('http://localhost:8001/tag-recognition/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'text/plain',
              },
              body: data
            })
            .then(response => response.json())
            .then(data => onResultsFound(data)))

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
        return (<div className="search-button">
                <input id="uploadImage"
                       className="fileInput"
                       type="file"
                       onChange={(e) => this.handleChange(e)}></input>
                <button
                        type="submit"
                        htmlFor="uploadImage">
                    <i className="fas fa-camera"></i>
                    <span> </span>
                    <label htmlFor="uploadImage" style={{cursor:'pointer'}}>Search by image</label>
                </button>
                {this.state.data.map( ({name}) =>
                    <div>{name}</div>
                )}
            </div>
        )
    }
}

export default ImageUploader
