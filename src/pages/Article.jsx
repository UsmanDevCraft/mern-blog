import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import articleContent from './Article-content'
import Articles from '../components/Articles'
import Notfound404 from './Notfound404'
import Comments from '../components/Comments'

const Article = () => {

  const { name } = useParams();
  const [ userdata, setUserdata] = useState({username:'', text:''});
  const article = articleContent.find((article) => article.name === name);
  if(!article) return <Notfound404 />;
  const otherArticles = articleContent.filter(article => article.name !== name);


  const [comments, setComment] = useState([]);
    // < -------------------- API FOR FETCHING THE COMMENTS SAVED -------------------- >
    const fetchingData = async () => {
        try {
          const response = await fetch(`https://backend-blog-mern.vercel.app/api/articles/${name}`, {
            method: "GET",
        });
        const commentsAll = await response.json();
        setComment(commentsAll);
        } catch (error) {
          console.error('An error occurred:', error.message);
          alert('An error occurred: ' + error.message);
        }
    };
    useEffect(()=>{
        fetchingData();
    }, [name]);




    // < -------------------- API FOR FETCHING THE ADD COMMENT FUNCTIONALITY -------------------- >
    const fetchComment = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`https://backend-blog-mern.vercel.app/api/articles/${name}/add-comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "username":userdata.username,
            "text": userdata.text
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        };

        setUserdata({ username: '', text: '' });
        fetchingData();

      } catch (error) {
        console.error('An error occurred:', error.message);
        alert('An error occurred: ' + error.message);
      }
    };



    // < -------------------- API FOR FETCHING THE DELETE COMMENT FUNCTIONALITY -------------------- >
    const deleteComment = async (id) => {
      // e.preventDefault();
      try {
        const response = await fetch(`https://backend-blog-mern.vercel.app/api/articles/deletecomment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        const json = await response.json();
        setComment(comments.filter(comment => comment._id !== id));
        fetchingData();

      } catch (error) {
        console.error('An error occurred:', error.message);
        alert('An error occurred: ' + error.message);
      }
    };

    const userData = (e) => {
      setUserdata({...userdata, [e.target.name]: e.target.value})
    };

  return (
    <>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>{article.title}</h1>

      {article.content.map((para, index) => (
        <p key={index} className='mx-auto leading-relaxed text-base mb-4'>{para}</p>
      ))}
      <Comments comments={comments} deleteComment={deleteComment}/>

      <form onSubmit={fetchComment}>
        <label htmlFor="username" className='mx-2'>Username</label>
        <input type="text" className='border-2' name='username' id='username' placeholder='your name here' value={userdata.username} onChange={userData}/>
        <label htmlFor="text" className='mx-2'>Comment</label>
        <input type="text" className='border-2' name='text' id='text' placeholder='your comment here' value={userdata.text} onChange={userData}/>
        <button type='submit' className='mx-2 border-2 p-1 font-semibold'>submit</button>
      </form>

      <h1 className='sm:text-2xl text-xl font-bold my-4 '>Other Articles</h1>
      <div className='flex flex-wrap -m-4'>
      <Articles article={otherArticles} />
      </div>
    </>
  )
}

export default Article
