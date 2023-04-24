/* eslint-disable react/prop-types */
import React from "react";
import "./fileUpload.css";
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64TextString: "",
      images: [],
    };
  }

  componentDidMount = () => {
    this.getImages();
  };

  getImages() {
    fetch("http://localhost:3001/getImages")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const images = JSON.parse(data) && JSON.parse(data).rows;
        this.setState({
          images,
        });
      });
  }

  deleteImage(id) {
    fetch(`http://localhost:3001/${id}/deleteImage`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.getImages();
        return response.text();
      })
      .then(() => {});
  }

  uploadImages() {
    if (this.state.base64TextString) {
      let name = "image";
      let content = this.state.base64TextString;
      fetch("http://localhost:3001/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
      })
        .then((response) => {
          return response.text();
        })
        .then(() => {
          this.getImages();
        });
    }
  }

  saveFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  };

  handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      base64TextString: btoa(binaryString),
    });
  };

  uploadFile = (e) => {
    this.uploadImages();
    e.preventDefault();
  };

  render() {
    const { setImage } = this.props;
    return (
      <div>
        <div>
          <div className="choose">
            {this.state.images && this.state.images.length
              ? "Choose from the previous designs:"
              : ""}
          </div>
          <div className="flex-container">
            {this.state.images &&
              this.state.images.map((img, index) => (
                <img
                  key={`image_${index}`}
                  onClick={() => setImage(img)}
                  className="preview-images flex-items"
                  id={`uploadedFile_${img.id}`}
                  src={"data:image/png;base64," + img.content}
                />
              ))}
          </div>
        </div>
        <div className="or">
          {this.state.images && this.state.images.length
            ? "OR"
            : "No designs to show, choose file to upload"}
        </div>
        <div className="upload">
          <input type="file" onChange={this.saveFile} />
          <button className="upload-btn" onClick={this.uploadFile}>
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
