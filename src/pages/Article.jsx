import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import articleContent from './Article-content'
import Articles from '../components/Articles'
import Notfound404 from './Notfound404'
import Comments from '../components/Comments'

const Article = () => {

  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  if(!article) return <Notfound404 />;
  const otherArticles = articleContent.filter(article => article.name !== name);


  const [comments, setComment] = useState([]);
    const fetchingData = async () => {
        const response = await fetch(`http://localhost:3000/api/articles/learn-node`, {
            method: "GET",
        });
        const commentsAll = await response.json();
        console.log(commentsAll);
        setComment(commentsAll);
    };
    useEffect(()=>{
        fetchingData();
    }, []);

  return (
    <>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>{article.title}</h1>

      {article.content.map((para, index) => (
        <p key={index} className='mx-auto leading-relaxed text-base mb-4'>{para}</p>
      ))}
      <Comments comments={comments}/>

      <h1 className='sm:text-2xl text-xl font-bold my-4 '>Other Articles</h1>
      <div className='flex flex-wrap -m-4'>
      <Articles article={otherArticles} />
      </div>
    </>
  )
}

export default Article
