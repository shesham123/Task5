import "./App.css";
import { useState } from "react";
import userData from "./userData";
import CreateArea from "./components/CreateArea";
import Comment from "./components/Comment";

function App() {
  const currentUser = userData.currentUser;
  const initialComments = userData.comments;

  const [comments, setComments] = useState(initialComments);

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    setComments(updatedComments);
  };

  const handleUpdateScore = (commentId, updatedScore) => {
    
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, score: updatedScore };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleUpdateReplyScore = (commentId, replyId, updatedScore) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, score: updatedScore };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  // Function to add a new comment
  const addComment = (newComment) => {
    // Generate a unique ID for the new comment
    const newCommentId = comments.length + 1;

    // Create a new comment object with the provided content and other details
    const commentObject = {
      id: newCommentId,
      content: newComment,
      createdAt: "now", 
      score: 0,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replies: [],
    };

    // Update the comments state with the new comment
    setComments([...comments, commentObject]);
  };

  const addReply = (commentId, newReply) => {
    // Find the comment with the given commentId
    const commentIndex = comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (commentIndex !== -1) {
      const { username } = comments[commentIndex].user;
      // Create a new reply object with the provided content and other details
      const newReplyId = comments[commentIndex].replies.length + 1;

      const replyObject = {
        id: newReplyId,
        content: newReply,
        createdAt: "now", 
        score: 0,
        replyingTo: username, 
        user: {
          image: currentUser.image,
          username: currentUser.username,
        },
      };

      // Create a new array with the updated replies for the comment
      const updatedReplies = [...comments[commentIndex].replies, replyObject];

      // Create a new array with the updated comment (with the new replies array)
      const updatedComment = {
        ...comments[commentIndex],
        replies: updatedReplies,
      };

      // Create a new array with the updated comments array
      const updatedComments = [...comments];
      updatedComments[commentIndex] = updatedComment;

      // Update the comments state with the new array of comments
      setComments(updatedComments);
    } else {
      console.log("Comment not found with the provided commentId.");
    }
  };

  const handleEditReply = (commentID, replyId, updatedContent) => {
    

    
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentID) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, content: updatedContent };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    // Update the comments state with the new reply content
    setComments(updatedComments);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user.username}
          replies={comment.replies}
          image1={comment.user.image.webp}
          onUpdateScore={handleUpdateScore}
          onUpdateReplyScore={handleUpdateReplyScore}
          onDeleteComment={handleDeleteComment}
          onDeleteReply={handleDeleteReply}
          currentUser={currentUser.image.webp}
          onAddReply={addReply}
          onUpdateReply={handleEditReply}
        />
      ))}
      <CreateArea image1={currentUser.image.webp} onAddComment={addComment} />
    </div>
  );
}

export default App;
