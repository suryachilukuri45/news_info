import React from 'react'
import './NewsModal.css'
import './Modal.css'
const NewsModal = ({show,article,onClose}) => {
    if(!show){
        return null;
    }
  return (
    <div className='modal-overlay'>
        <div className="model-content">
            <span className="close-button" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            {article && (
                <>
            <img src={article.image} alt={article.title} className='model-image'/>
            <h2 className="modal-title">{article.title}</h2>
            <p className="model-source">Source: {article.source.name}</p>
            <p className="modal-date">
                {new Date(article.publishedAt).toLocaleString('en-US',{month:'short' ,day:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})} 
            </p>
            <p className="model-content-text">
                {article.content}
            </p>
            <a href={article.url} target='_blank' className="read-more">Read More</a>
            </>
            )}
        </div>
    </div>
  )
}

export default NewsModal