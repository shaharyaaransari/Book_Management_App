import axios from "axios";
import React, { useEffect, useState } from "react";
import EditBook from "../Component/Edit";

export default function HomePage() {
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState(""); 
    const [sortOrder, setSortOrder] = useState(1); 
    const [selectedGenres, setSelectedGenres] = useState([]); 
    const [userRole, setUserRole] = useState(""); 
    const [editBookId, setEditBookId] = useState(null);

    const handleEdit = (bookId) => {
        setEditBookId(bookId);
    };

    const handleCloseEdit = () => {
        setEditBookId(null);
       
    };

    useEffect(() => {
        fetchData();
       const role = localStorage.getItem("role")
         console.log(role)
       setUserRole(role)
    }, []); 

    const fetchData = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        let url = `https://sample-bakened.onrender.com/books`;

        axios.get(url, config)
            .then((res) => {
                setData(res.data);
             
            })
            .catch((err) => {
                console.log(err);
            });
    }

   
    const handleSort = (criteria) => {
        if (sortBy === criteria) {
          
            setSortOrder(sortOrder === 1 ? -1 : 1);
        } else {
            
            setSortBy(criteria);
            setSortOrder(1);
        }
    }

  
    const handleGenreFilter = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }

  
    const filterByGenre = (book) => {
        if (!book.genre || selectedGenres.length === 0) {
            return true; 
        }
    
        
        const bookGenres = book.genre.split(',').map(genre => genre.trim());
    
        
        return selectedGenres.some(genre => bookGenres.includes(genre));
    }

    
    console.log(userRole)
   
    const renderActionButtons = (book) => {
      
        if (userRole === 'CREATOR') {
            return (
                <React.Fragment>
                    <td><button onClick={() => handleEdit(book._id)}>Edit</button></td>
                    <td><button onClick={() => handleDelete(book._id)}>Delete</button></td>
                </React.Fragment>
            );
        }
        return null; 
    }

   
    
    const handleDelete = (bookId) => {
       
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const url = `https://sample-bakened.onrender.com/books/${bookId}`;

        axios.delete(url, config)
            .then((res) => {
                console.log("Book deleted:", res.data);
                
                setData(data.filter(book => book._id !== bookId));
            })
            .catch((err) => {
                console.log("Error deleting book:", err);
            });
    }

   
    const sortedData = [...data].sort((a, b) => {
        if (sortBy === 'price') {
            return (a.price - b.price) * sortOrder;
        }
      
        return 0;
    });

    return (
        <div>
            <div className="sortingButtons">
                <button className="sortByRentAsc" onClick={() => handleSort('price')}>Sort by Price Asc</button>
                <button className="sortByRentDesc" onClick={() => handleSort('price')}>Sort by Price Desc</button>
            </div>

            <div>
                <div>Filter by Genre:</div>
                <button onClick={() => handleGenreFilter('Action')}>Action</button>
                <button onClick={() => handleGenreFilter('Adventure')}>Adventure</button>
                <button onClick={() => handleGenreFilter('Fantasy')}>Fantasy</button>
                <button onClick={() => handleGenreFilter('Shounen')}>Shounen</button>
            </div>

          

            <div style={{ textAlign: "center" }}>
                <table className="table" style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead style={{ backgroundColor: "cyan" }}>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Created At</th>
                            {userRole === 'CREATOR' && <React.Fragment><th> 
                            {editBookId && <EditBook bookId={editBookId} onClose={handleCloseEdit} userRole={userRole} />}</th><th>Delete</th></React.Fragment>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.filter(filterByGenre).map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                                    />
                                </td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.price}</td>
                                <td>{book.createdAt}</td>
                                {userRole === 'CREATOR'&& renderActionButtons(book)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
