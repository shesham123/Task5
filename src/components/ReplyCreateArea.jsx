import { useState } from "react";
import PropTypes from "prop-types";

function ReplyCreateArea(props) {
  const [newReply, setNewReply] = useState("");

  const handleReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const handleSendReply = () => {
    if (newReply.trim() !== "") {
      props.onAddReply(newReply); // Pass the new comment to the parent component
      setNewReply(""); // Clear the comment input after sending
    }
  };

  return (
    <div className="main">
      <div className="new-comment">
        <img className="new-comment-img" src={props.image1} alt="User Avatar" />
        <textarea
          name="content"
          placeholder="Add a Reply..."
          rows={8}
          cols={80}
          value={newReply}
          onChange={handleReplyChange}
          maxLength={280}
        />
        <button className="send-button" onClick={handleSendReply}>
          Reply
        </button>
      </div>
    </div>
  );
}

ReplyCreateArea.propTypes = {
  image1: PropTypes.any,
  onAddComment: PropTypes.func.isRequired,
  replyingTo: PropTypes.any,
  onAddReply: PropTypes.func.isRequired,
};

export default ReplyCreateArea;
