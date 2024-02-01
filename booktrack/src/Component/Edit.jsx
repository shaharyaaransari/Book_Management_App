import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBook = ({ bookId, onClose, userRole, fetchData }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(`https://sample-bakened.onrender.com/books/${bookId}`, config);
      const book = response.data;
      setBookData(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      if (userRole === 'CREATOR') {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.put(`https://sample-bakened.onrender.com/books/${bookId}`, bookData, config);
        onClose();
     
        fetchData();
      } else {
        console.error('You are not authorized to update the book.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={bookData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={bookData.author} onChange={handleInputChange} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" name="genre" value={bookData.genre} onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={bookData.price} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="text" name="image" value={bookData.image} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBook;
