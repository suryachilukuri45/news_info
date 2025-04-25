




import React, { useEffect, useState } from 'react';
import userImg from '../assets/images/surya.jpg'
import noImg from '../assets/images/no-img.png';
import './Blogs.css';

const Blogs = ({ onBack, onCreateBlogs, editPost, isEditing }) => {
    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [titleValid, setTitleValid] = useState(true);
    const [contentValid, setContentValid] = useState(true);

    useEffect(() => {
        if (isEditing && editPost) {
            setImage(editPost.image || null);
            setTitle(editPost.title || '');
            setContent(editPost.content || '');
            setShowForm(true);
        }
    }, [isEditing, editPost]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSize = 1 * 1024 * 1024;

            if (file.size > maxSize) {
                alert('File exceeds 1MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setTitleValid(!!title.trim());
            setContentValid(!!content.trim());
            return;
        }

        const newBlog = {
            image: image || noImg,
            title,
            content,
        };

        onCreateBlogs(newBlog, isEditing);
        resetForm();
    };

    const resetForm = () => {
        setImage(null);
        setTitle('');
        setContent('');
        setShowForm(false);
        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
            onBack();
        }, 2000);
    };

    return (
        <div className='blogs'>
            <div className="blogs-left">
                <img src={userImg} alt="User" />
            </div>
            <div className="blogs-right">
                {!showForm && !submitted && (
                    <button className='post-btn' onClick={() => setShowForm(true)}>
                        Create New Post
                    </button>
                )}
                {submitted && <p className='submission-message'>Post Submitted</p>}
                <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
                    <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="img-upload">
                            <label htmlFor="file-upload" className='file-upload'>
                                <i className="bx bx-upload"></i>Upload Image
                            </label>
                            <input type="file" id='file-upload' onChange={handleImageChange} />
                        </div>
                        <input
                            type="text"
                            placeholder='Add Title (Max 60 Characters)'
                            className={`title-input ${!titleValid ? 'invalid' : ''}`}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleValid(true);
                            }}
                            maxLength={60}
                        />
                        <textarea
                            className={`text-input ${!contentValid ? 'invalid' : ''}`}
                            placeholder='Add Text'
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setContentValid(true);
                            }}
                        />
                        <button type="submit" className='submit-btn'>
                            {isEditing ? "Update Post" : "Submit Post"}
                        </button>
                    </form>
                </div>
                <button className='blogs-close-button' onClick={onBack}>
                    Back <i className="bx bx-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Blogs;
