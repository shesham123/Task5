import { useState } from "react";
import PropTypes from "prop-types";
import DeleteConfirmation from "./DeleteConfirmation";
import Reply from "./Reply";
import ReplyCreateArea from "./ReplyCreateArea";
// import userData from "../userData";

Comment.propTypes = {
  image1: PropTypes.any,
  user: PropTypes.any,
  createdAt: PropTypes.any,
  score: PropTypes.any,
  content: PropTypes.any,
  id: PropTypes.any,
  onUpdateScore: PropTypes.func.isRequired,
  onUpdateReplyScore: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  onShowDeleteModal: PropTypes.func.isRequired,
  onHideDeleteModal: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
  onAddReply: PropTypes.func.isRequired,
  onUpdateReply: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      replyingTo: PropTypes.string.isRequired,
      user: PropTypes.shape({
        image: PropTypes.shape({
          png: PropTypes.string.isRequired,
          webp: PropTypes.string.isRequired,
        }).isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

function Comment(props) {
  const [hasIncremented, setHasIncremented] = useState(false);
  const [hasDecremented, setHasDecremented] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyCreateArea, setShowReplyCreateArea] = useState(false);

  const handleUpdateReplyScore = (replyId, updatedScore) => {
    // Call the parent onUpdateScore function to update the reply score in the comment
    props.onUpdateReplyScore(props.id, replyId, updatedScore);
  };

  const handleIncrement = () => {
    if (!hasIncremented) {
      setHasIncremented(true);
      setHasDecremented(false);
      const updatedScore = props.score + 1;
      props.onUpdateScore(props.id, updatedScore);
    }
  };

  const onDeleteReply = (replyId) => {
    props.onDeleteReply(props.id, replyId);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    props.onDeleteComment(props.id);
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

  const handleNewReply = (newReply) => {
    props.onAddReply(props.id, newReply);
  };

  const handleEditReply = (replyID, updatedReply) => {
    props.onUpdateReply(props.id, replyID, updatedReply);
  };

  return (
    <div className="master">
      <div className="main">
        <div className="comment">
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
                <a className="delete-cta" onClick={handleShowDeleteModal}>
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
              <a
                className="reply-cta"
                onClick={() => setShowReplyCreateArea(!showReplyCreateArea)}
              >
                <img src="/images/icon-reply.svg" alt="report" />
                <p>Reply</p>
              </a>
            </div>
            <p className="comment-text">{props.content}</p>
          </div>
        </div>
      </div>
      {props.replies.map((reply) => (
        <Reply
          key={reply.id}
          id={reply.id}
          commentID={props.id}
          content={reply.content}
          createdAt={reply.createdAt}
          score={reply.score}
          user={reply.user.username}
          image1={reply.user.image.webp}
          replyingto={reply.replyingTo}
          onUpdateScore={handleUpdateReplyScore}
          onDeleteReply={onDeleteReply}
          onUpdateReply={handleEditReply}
        />
      ))}
      {showReplyCreateArea && (
        <ReplyCreateArea
          commentID={props.id}
          image1={props.currentUser}
          replyingTo={props.user}
          onAddReply={handleNewReply}
        />
      )}
    </div>
  );
}

export default Comment;
