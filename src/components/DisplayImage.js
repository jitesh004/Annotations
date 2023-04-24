/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./image.css";
import CommentsBlock from "./CommentsBlock";
import Tooltip from "./tooltip";

class DisplayImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotates: [],
      comments: [],
      index: "",
      annotate_id: "",
    };
  }

  componentDidMount() {
    const { image } = this.props;
    this.getAnnotates(image.id);
  }

  getComments(id) {
    fetch(`http://localhost:3001/${id}/getComments`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const comments = JSON.parse(data);
        if (comments.length) {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt);
          });
          this.setState({
            comments,
          });
        }
      });
  }

  addComment(annotate_id, comment, fullName) {
    fetch("http://localhost:3001/setComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ annotate_id, comment, fullName }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        this.getComments(annotate_id);
      });
  }

  getAnnotates(id) {
    fetch(`http://localhost:3001/${id}/getAnnotates`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const annotates = JSON.parse(data);
        this.setState({
          annotates,
        });
      });
  }

  updateAnnotates(photo_id, annotates) {
    fetch("http://localhost:3001/updateAnnotates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo_id, annotates }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        this.getAnnotates(photo_id);
      });
  }

  setAnnotates(photo_id, annotates) {
    fetch("http://localhost:3001/setAnnotates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo_id, annotates }),
    })
      .then((response) => {
        return response.text();
      })
      .then(() => {
        this.getAnnotates(photo_id);
      });
  }

  deleteAnnotation(id, image_id) {
    fetch(`http://localhost:3001/${id}/deleteAnnotate`)
      .then((response) => {
        return response.text();
      })
      .then(() => {
        this.setState({
          comments: [],
          annotates: [],
          index: "",
        });
        this.getAnnotates(image_id);
      });
  }

  handleAnnotation = (e, photo_id) => {
    this.setState({
      annotates: [],
    });
    this.setAnnotates(
      photo_id,
      JSON.stringify({
        x: e.nativeEvent.offsetX - 10,
        y: e.nativeEvent.offsetY - 10,
      })
    );
  };

  showToolTip = (index, annotate) => {
    if (this.state.index !== index) {
      this.setState({
        comments: [],
        index: index,
        annotate_id: annotate.id,
      });
      this.getComments(annotate.id);
    }
  };

  render() {
    const { image, setImage } = this.props;
    return (
      <>
        <div className="info">
          Click anywhere on the design to annotate and add comments
        </div>
        <div className="image-wrapper">
          <img
            alt="clicked"
            id="img_1"
            className="img-wrap"
            src={"data:image/png;base64," + image.content}
            onClick={(e) => this.handleAnnotation(e, image.id)}
          />
          {this.state.annotates.map((annotate, index) => (
            <Tooltip
              place="left"
              key={`annotates_${annotate.id}`}
              className="overlay-box number-circle"
              style={{ top: annotate.y, left: annotate.x }}
              tooltipId={`host-tooltip_${this.state.annotate_id}`}
              event="mouseup"
              content={
                <CommentsBlock
                  comments={this.state.comments}
                  annotate_id={this.state.annotate_id}
                  onSubmit={(text) => {
                    if (text.length > 0) {
                      this.addComment(
                        this.state.annotate_id,
                        text,
                        "Johny Doe"
                      );
                    }
                  }}
                  deleteAnnotation={(annotate_id) => {
                    this.deleteAnnotation(annotate_id, image.id);
                  }}
                />
              }
            >
              <div
                className="numbering"
                onClick={() => this.showToolTip(index, annotate)}
              >
                {index + 1}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="back" onClick={() => setImage()}>
          Back
        </div>
      </>
    );
  }
}

export default DisplayImage;
