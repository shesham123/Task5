import { useState } from "react";
import PropTypes from "prop-types";
import DeleteConfirmation from "./DeleteConfirmation";

Reply.propTypes = {
  image1: PropTypes.any,
  user: PropTypes.any,
  createdAt: PropTypes.any,
  score: PropTypes.any,
  content: PropTypes.any,
  id: PropTypes.any,
  commentID: PropTypes.any,
  onUpdateScore: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onShowDeleteModal: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  onHideDeleteModal: PropTypes.func.isRequired,
  replyingto: PropTypes.any,
  onUpdateReply: PropTypes.func.isRequired,
};

function Reply(props) {
  const [hasIncremented, setHasIncremented] = useState(false);
  const [hasDecremented, setHasDecremented] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(props.content);

  const handleUpdateReply = () => {
    props.onUpdateReply(props.id, updatedContent);
    setIsEditing(false); // Exit edit mode after updating
  };

  const handleIncrement = () => {
    if (!hasIncremented) {
      setHasIncremented(true);
      setHasDecremented(false);
      const updatedScore = props.score + 1;
      props.onUpdateScore(props.id, updatedScore);
    }
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    props.onDeleteReply(props.id);
    handleHideDeleteModal();
  };

  const handleDeleteCancel = () => {
    handleHideDeleteModal();
  };

  const handleDecrement = () => {
    if (!hasDecremented && props.score > 0) {
      setHasIncremented(false);
      setHasDecremented(true);
      const updatedScore = props.score - 1;
      props.onUpdateScore(props.id, updatedScore);
    }
  };

  return (
    <div className="reply-container">
      <div className="vl"></div>
      <div className="reply">
        <div className="score-div">
          <div className="score-counter">
            <a onClick={handleIncrement}>+</a>
            <p className="comment-score-count">{props.score}</p>
            <a onClick={handleDecrement}>-</a>
          </div>
        </div>
        <div className="comment-content">
          <div className="credentials">
            <img className="existing-img" src={props.image1} alt="user" />
            <h4>{props.user}</h4>
            {props.user === "juliusomo" && (
              <div className="you">
                <h5 className="own-user">You</h5>
              </div>
            )}
            <div className="timestamp">
              <h5>{props.createdAt}</h5>
            </div>
            {props.user === "juliusomo" && (
              <a className="reply-delete-cta" onClick={handleShowDeleteModal}>
                <img src="/images/icon-delete.svg" alt="report" />
                <p>Delete</p>
              </a>
            )}
            {showDeleteModal && (
              <DeleteConfirmation
                onDeleteConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            )}
            {props.user !== "juliusomo" && (
              <a className="reply-reply-cta">
                <img src="/images/icon-reply.svg" alt="report" />
                <p>Reply</p>
              </a>
            )}
            {props.user === "juliusomo" && (
              <a
                className="reply-edit-cta"
                onClick={() => setIsEditing(!isEditing)}
              >
                <img src="/images/icon-edit.svg" alt="report" />
                <p>Edit</p>
              </a>
            )}
          </div>
          {isEditing ? (
            <textarea
              type="text"
              rows={6}
              cols={50}
              maxLength={280}
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          ) : (
            <>
              <p className="comment-text">
                <span className="recipient">@{props.replyingto}</span>
                {props.content}
              </p>
            </>
          )}
          {isEditing && (
            <button className="update-button" onClick={handleUpdateReply}>
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reply;
