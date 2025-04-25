import React, { useState,useEffect } from 'react'
import Weather from './Weather'
import Calender from './Calender'
import './News.css'
import UserImg from '../assets/images/surya.jpg'
import noImg from '../assets/images/no-img.png'
import axios from 'axios';
import NewsModal from './NewsModal'
import BookMarks from './BookMarks'
import BlogsModal from '../Components/BlogsModal'

const News = ({onShowBlogs,blogs,onEditBlog,onDeleteBlog}) => {
    const categories = ["general","world","business","technology",'entertainment','sports','science','health','nation'];
    const [headline,setHeadline] = useState(null);
    const [news,setNews] = useState([]);
    const [cat,setCat]=useState('general');
    const [searchNews,setSearchNews] = useState("");
    const [searchQuery,setSearchQuery] = useState("");
    const [showModal ,setShowModal] = useState(false);
    const [selected,setSelected] = useState(null);
    const [bookmarks,setBookMarks] = useState([]);
    const [show,setShow] = useState(false);
    const [selectedPost,setSelectedPost] = useState(null);
    const [showBlogsModal,setShowBlogsmodal]=useState(false);

    // useEffect(()=>{
    //     const fetchNews = async ()=>{
    //         let url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&apikey=444344a89e80da9029fdf63accbd0f57`;

    //         let n_url =  `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&apikey=30a36f3550b949b79651c8a1a2354d8b`;

    //         if(searchQuery){
    //             n_url = `https://gnews.io/api/v4/search?q=${searchNews}&apikey=30a36f3550b949b79651c8a1a2354d8b`;

    //         }

    //         const response = await axios.get(n_url);

    //         const fetchedNews = response.data.articles;

    //         fetchedNews.forEach((article)=>{
    //             if(!article.image){
    //                 article.image = noImg
    //             }
    //         })
    //         setHeadline(fetchedNews[0]);
    //         setNews(fetchedNews.slice(1,7));
    //         console.log(fetchedNews[0]);
    //         const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks'))||[]
    //         setBookMarks(savedBookmarks);
    //         console.log(searchNews)
    //     }
    //     fetchNews()
    // },[cat,searchQuery]);

    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&apikey=a0e7c9b6c40550bf58246e54deae9b33`;

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=a0e7c9b6c40550bf58246e54deae9b33`;
            }

            try {
                const response = await axios.get(url);
                const fetchedNews = response.data.articles || [];

                fetchedNews.forEach((article) => {
                    if (!article.image) {
                        article.image = noImg;
                    }
                });

                setHeadline(fetchedNews.length > 0 ? fetchedNews[0] : null);
                setNews(fetchedNews.slice(1, 7));

                const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
                setBookMarks(savedBookmarks);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, [cat, searchQuery]);

    const handleCat=(e,category)=>{
        e.preventDefault();
        setCat(category);
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        setSearchQuery(searchNews);
        setSearchNews("");
    }

    const handleModal=(article)=>{
        setSelected(article);
        setShowModal(true);
    }

    const handleBookMark=(article)=>{
        setBookMarks((prevBookMarks)=>{
            const updated = prevBookMarks.find((bookmark)=>bookmark.title===article.title)?
            prevBookMarks.filter((bookmark)=>bookmark.title!==article.title):[...prevBookMarks,article];
            localStorage.setItem('bookmarks',JSON.stringify(updated));
            return updated;
        })
    }

    const handleBLogClick=(blog)=>{
        setSelectedPost(blog);
        setShowBlogsmodal(true);
    }

    const closeModalBlog=()=>{
        setSelectedPost(null);
        setShowBlogsmodal(false);
    }


  return (
    <div className='news'>
        <header className="news-header">
            <h1 className="logo">News & Blogs</h1>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder='Search News...'  value={searchNews} onChange={(e)=>setSearchNews(e.target.value)}
                    />
                    <button type="submit" >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user" onClick={onShowBlogs}>
                    <img src={UserImg} alt="User Image" />
                    <p>Surya's Blog</p>
                </div>
                <nav className="categories">
                    <h1 className="nav-heading">Categories</h1>
                    <div className="nav-links">
                        {categories.map((category)=>(
                            <a href="#" key={category} className='nav-link' onClick={(e)=>handleCat(e,category)}>{category}</a>
                        ))}
                        <a href="#" className='nav-link' onClick={()=>{setShow(true)}}>
                            Bookmarks <i className="fa-solid fa-bookmark"></i>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="news-section">
                {headline && (
                    <div className="headline" onClick={()=>handleModal(headline)}>
                        <img src={headline.image || noImg} alt={headline.title} />
                        <h2 className="headline-title">
                            {headline.title}
                            <i className={`${bookmarks.some((bookmark)=>bookmark.title===headline.title)?"fa-solid":"fa-regular"} fa-bookmark bookmark`}
                            onClick={(e)=>{
                                e.stopPropagation()
                                handleBookMark(headline)
                            }}
                            ></i>
                        </h2>
                    </div>
                )}
                
                <div className="news-grid">
                    {news.map((article,index)=>(
                        <div key={index} className="news-grid-item" onClick={()=>handleModal(article)}>
                            <img src={article.image || noImg} alt={article.title} />
                            <h3>{article.title.slice(0,40)}...</h3>
                            <i className={`${bookmarks.some((bookmark)=>bookmark.title===article.title)?"fa-solid":"fa-regular"} fa-bookmark bookmark`}
                            onClick={(e)=>{
                                e.stopPropagation()
                                handleBookMark(article)
                            }}></i>
                        </div>
                    ))} 
                </div>
            </div>

            <NewsModal show={showModal} article = {selected} onClose={()=>setShowModal(false)}/>
            <BookMarks
            show = {show}
            bookmarks = {bookmarks}
            onClose = {()=>{
                setShow(false);
            }}
            onSelectArticle = {handleModal}
            onDeleteBookMark = {handleBookMark}
            />
            <div className="my-blogs">
                <h1 className="my-blogs-heading">My Blogs</h1>
                <div className="blog-posts">
                    {blogs.map((blog,index)=>(
                        <div key={index} className="blog-post" onClick={()=>handleBLogClick(blog)}>
                            <img src={blog.image || noImg} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            <div className="post-buttons">
                                <button className="edit-post" onClick={()=>onEditBlog(blog)}>
                                    <i className="bx bxs-edit"></i>
                                </button>
                                <button className="delete-post" onClick={(e)=>{
                                    e.stopPropagation()
                                    onDeleteBlog(blog)
                                    }}>
                                    <i className="bx bxs-x-circle"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    
                </div>
                {selectedPost && showBlogsModal && (
                    <BlogsModal show={showBlogsModal} blog={selectedPost} onClose={closeModalBlog} />
                )}
            </div>
            <div className="weather-calender">
                <Weather/>
                <Calender/>
            </div>
        </div>
        <footer className="news-footer">
            <p> <span>News & Blog Website</span></p>
            <p>&copy; Created by Surya</p>
        </footer>
    </div>
  )
}

export default News
