import React, { useEffect, useState } from 'react'
import News from './Components/News'
import Blogs from './Components/Blogs'

const App = () => {
  const [showNews,setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs,setblogs] = useState([]);
  const [selectedPost,setSelectedPost] =useState(null);
  const [isEditing,setIsEditing] = useState(false);

  useEffect(()=>{
    const savedBlogs = JSON.parse(localStorage.getItem("blogs"))||[]
    setblogs(savedBlogs)
  },[])

  const handleCreateBlogs=(newBlog,isEdit)=>{
    setblogs((prevblogs)=>{
      const updatedBlogs = isEdit?prevblogs.map((blog)=>(blog===selectedPost?newBlog:blog)):[...prevblogs,newBlog]
      localStorage.setItem("blogs",JSON.stringify(updatedBlogs))
      return updatedBlogs
    } );
    setIsEditing(false);
    setSelectedPost(null);
  }

  const handleEditBlog=(blog)=>{
    setSelectedPost(blog)
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowBlogs=()=>{
    setShowNews(false);
    setShowBlogs(true);
  }

  const handleShowNews=()=>{
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  }

  const handleDeleteBlog=(blogTodelete)=>{
    setblogs((prevblogs)=>{
      const updatedBlogs = prevblogs.filter((blog)=>blog!==blogTodelete);
      localStorage.setItem("blogs",JSON.stringify(updatedBlogs));
      return updatedBlogs;
    })
  }

  return (
    <div className='container'>
      <div className='news-blog-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog = {handleDeleteBlog} />}
        {showBlogs && <Blogs onBack={handleShowNews} onCreateBlogs={handleCreateBlogs} editPost={selectedPost} isEditing={isEditing} />}
      </div>
    </div>
  )
}

export default App