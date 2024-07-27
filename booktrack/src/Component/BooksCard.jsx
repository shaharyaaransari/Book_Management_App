import React from 'react'
import "./Book.css"
export const BooksCard = ({title,image,price,author,genre,_id,handleDelete,handleOpenModal,role}) => {
  return (
    <div className='book-container'>
        
         <img src={image} alt="image" />
   <span>Title : {title}</span>
     <span>Author : {author}</span>
     <span>Genre : {genre}</span>
       <span>Price : $ {price}</span>
          <div>
          { role ==="CREATOR" &&   <button onClick={() => handleOpenModal({ title, image, price, author, genre, _id })}>Edit</button>}
          { role ==="CREATOR" &&  <button onClick={()=>handleDelete(_id)}>Delete</button>}
          </div>
    </div>
  )
}
