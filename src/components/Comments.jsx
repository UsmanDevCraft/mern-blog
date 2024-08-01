import React from 'react'

const Comments = ({ comments }) => {

  return (
    <>
      <h3 className='sm:text-2xl text-xl font-bold my-6 text-gray-900'>
        Comments: 
      </h3>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <h4 className='text-xl font-bold'>{comment.username}</h4>
            <p className='mt-1 mb-4'>{comment.comments}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </>
  )
}

export default Comments
