import { useState } from "react";
import PropTypes from "prop-types";

function CreateArea(props) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSendComment = () => {
    if (newComment.trim() !== "") {
      props.onAddComment(newComment); // Pass the new comment to the parent component
      setNewComment(""); // Clear the comment input after sending
    }
  };

  return (
    <div className="main">
      <div className="new-comment">
        <img className="new-comment-img" src={props.image1} alt="User Avatar" />
        <textarea
          name="content"
          placeholder="Add a Comment..."
          rows={8}
          cols={80}
          value={newComment}
          onChange={handleCommentChange}
          maxLength={280}
        />
        <button className="send-button" onClick={handleSendComment}>
          Send
        </button>
      </div>
    </div>
  );
}

CreateArea.propTypes = {
  image1: PropTypes.any,
  onAddComment: PropTypes.func.isRequired, // Add the prop type for the new function prop
};

export default CreateArea;
