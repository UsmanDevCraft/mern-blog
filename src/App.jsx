import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticlesList from './pages/ArticlesList';
import Navbar from './components/Navbar';
import Notfound404 from './pages/Notfound404';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/article/:name' element={<Article />} />
          <Route path='/articles-list' element={<ArticlesList />} />
          <Route path='*' element={<Notfound404 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
