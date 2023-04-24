/* eslint-disable react/prop-types */
import React, { useState } from "react";
import avatar from "../images/avatar.png";
import "./comments.css";

const CommentsBlock = (props) => {
  const [newComment, setNewComment] = useState("");
  const { comments, onSubmit, annotate_id, deleteAnnotation } = props;
  return (
    <div className="comment-wrapper">
      <div className="delete" onClick={() => deleteAnnotation(annotate_id)}>
        Delete
      </div>
      {comments.length ? (
        comments.map((comment, index) => {
          const { text, fullName } = comment;
          return index === 0 ? (
            <div key={`comment_${index}`}>
              <span>
                <img className="avatar" src={avatar} />
              </span>
              <span className="bold font-size-14 author first-author">
                {fullName}
              </span>
              <div className="font-size-12 comment first-comment">{text}</div>
            </div>
          ) : (
            <div className="replies" key={`comment_${index}`}>
              <span>
                <img className="avatar" src={avatar} />
              </span>
              <span className="bold font-size-10 author next-replies">
                {fullName} -{" "}
              </span>
              <span className="font-size-10 comment"> {text}</span>
            </div>
          );
        })
      ) : (
        <div className="no-comments">No comments added yet</div>
      )}
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(newComment);
              setNewComment("");
            }
          }}
        />
        <button
          className="comment-btn"
          onClick={() => {
            onSubmit(newComment);
            setNewComment("");
          }}
        >
          {" "}
          Add comment{" "}
        </button>
      </div>
    </div>
  );
};

export default CommentsBlock;
