import PropTypes from "prop-types";

DeleteConfirmation.propTypes = {
    onDeleteConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}


function DeleteConfirmation ({ onDeleteConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-box">
      <div className="modal-content">
        <h2>Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone</p>
        <div className="modal-buttons">
        <button onClick={onCancel} className="cancel-btn">No, Cancel</button>
        <button onClick={onDeleteConfirm} className="del-btn">Yes, Delete</button>
          
        </div>
      </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;