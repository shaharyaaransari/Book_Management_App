import axios from "axios";
import { BooksCard } from "./BooksCard";
import Modal from "./Modal";
import { useState } from "react";

export default function Book({ data, fetchData ,role}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    image: '',
  });

  const handleDelete = (bookId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `https://sample-bakened.onrender.com/books/${bookId}`;

    axios
      .delete(url, config)
      .then((res) => {
        console.log("Book deleted:", res.data);
        fetchData();
        setSelectedBook(null);
      })
      .catch((err) => {
        console.log("Error deleting book:", err);
      });
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setBookData(book); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setBookData({
      title: '',
      author: '',
      genre: '',
      price: '',
      image: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const url = `https://sample-bakened.onrender.com/books/${selectedBook._id}`;
      await axios.put(url, bookData, config);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {data.length > 0 && data.map((el) => (
        <BooksCard
          key={el._id}
          {...el}
          handleDelete={handleDelete}
            role = {role}
          handleOpenModal={handleOpenModal}
        />
      ))}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedBook && (
          <form onSubmit={handleSave} className="book-form">
            <h2 style={{ color: "wheat" }}>Edit Book</h2>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Author
              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleChange}
              />
            </label>
            <label>
              Genre
              <input
                type="text"
                name="genre"
                value={bookData.genre}
                onChange={handleChange}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                name="price"
                value={bookData.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Image URL
              <input
                type="text"
                name="image"
                value={bookData.image}
                onChange={handleChange}
              />
            </label>
            <div className="modal-buttons">
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
