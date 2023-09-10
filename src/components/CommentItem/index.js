// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, deleteComment, likedComment} = props
  const {id, name, comment, isLiked, date, letterClassName} = commentDetails
  const likeImage = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  const LIKE = isLiked ? 'like-like' : ''

  const delComment = () => {
    deleteComment(id)
  }

  const onlike = () => {
    likedComment(id)
  }

  return (
    <li>
      <div className="container">
        <div className="name-time">
          <div className={letterClassName}>{name.slice(0, 1)}</div>
          <p className="Name">{name}</p>
          <p className="time">{formatDistanceToNow(date)}</p>
        </div>
        <p className="Comment">{comment}</p>
        <div className="like-del-container">
          <div className="like-container">
            <img src={likeImage} alt="like" />
            <button
              className={`like-button ${LIKE}`}
              type="button"
              onClick={onlike}
            >
              Like
            </button>
          </div>
          <button className="del-button" type="button" onClick={delComment}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              data-testid="delete"
              alt="delete"
            />
          </button>
        </div>
        <hr />
      </div>
    </li>
  )
}

export default CommentItem
