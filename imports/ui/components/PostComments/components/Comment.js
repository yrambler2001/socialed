import React from 'react'
import moment from 'moment';

const Comment = ({ text, author, createdAt }) => {
  return (
    <div>
      <b>{ author ? author.profile.fullName : '' }</b>
      <p>
        {text}
      </p>
      <small>
        { moment(createdAt).format('lll') }
      </small>
    </div>
  )
}

export default Comment
