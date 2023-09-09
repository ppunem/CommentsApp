import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  addNewComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const firstLetterBackgroundColor = `letter-container ${
      initialContainerBackgroundClassNames[
        Math.Floor(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      letterClassName: firstLetterBackgroundColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  changeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  changeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  likedComment = id => {
    const {commentsList} = this.state
    this.setState(prevState => ({
      commentsList: commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !prevState.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        onDelete={this.deleteComment}
        onLike={this.likedComment}
      />
    ))
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <>
        <h1 className="head">Comments</h1>
        <div className="container">
          <div className="inputs-container">
            <form className="form" onSubmit={this.addNewComment}>
              <p className="side-head">Say something about 4.0 Technologies</p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.changeNameInput}
              />
              <textarea
                className="comment-input"
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.changeCommentInput}
              />
              <button type="submit" className="submit-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
          </div>
          <hr />
        </div>
        <div className="ul-container">
          <p className="comment-class">
            <span className="count-container">{commentsList.length}</span>
            Comments
          </p>
          <ul>{this.renderCommentsList()}</ul>
        </div>
      </>
    )
  }
}

export default Comments
