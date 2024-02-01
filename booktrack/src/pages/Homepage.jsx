import axios from "axios";
import React, { useEffect, useState } from "react";
import EditBook from "../Component/Edit";

export default function HomePage() {
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState(""); // State for sorting criteria
    const [sortOrder, setSortOrder] = useState(1); // State for sorting order
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
    const [userRole, setUserRole] = useState(""); // State for user role
    const [editBookId, setEditBookId] = useState(null);

    const handleEdit = (bookId) => {
        setEditBookId(bookId);
    };

    const handleCloseEdit = () => {
        setEditBookId(null);
        // Refresh book list or perform other necessary actions
    };

    useEffect(() => {
        fetchData();
        // Assume userRole is obtained after authentication
        setUserRole("CREATOR"); // Set user role here
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
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Function to handle sorting
    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // If already sorted by the same criteria, reverse the order
            setSortOrder(sortOrder === 1 ? -1 : 1);
        } else {
            // If sorting by a new criteria, set it and default to ascending order
            setSortBy(criteria);
            setSortOrder(1);
        }
    }

    // Function to handle genre filter
    const handleGenreFilter = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }

    // Function to check if a book matches selected genre(s)
    const filterByGenre = (book) => {
        if (!book.genre || selectedGenres.length === 0) {
            return true; // If no genre selected or genre is undefined, show all books
        }
    
        // Split the genre string into an array of genres
        const bookGenres = book.genre.split(',').map(genre => genre.trim());
    
        // Check if any of the selected genres are included in the book's genres
        return selectedGenres.some(genre => bookGenres.includes(genre));
    }

    // Function to handle search
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Implement search functionality
    }

    // Function to render "Edit" and "Delete" buttons based on user's role
    const renderActionButtons = (book) => {
        if (userRole === 'CREATOR') {
            return (
                <React.Fragment>
                    <td><button onClick={() => handleEdit(book._id)}>Edit</button></td>
                    <td><button onClick={() => handleDelete(book._id)}>Delete</button></td>
                </React.Fragment>
            );
        }
        return null; // Hide the buttons if the user is not a creator
    }

   
    // Function to handle delete action
    const handleDelete = (bookId) => {
        // Implement delete functionality
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
                // Remove the deleted book from the state
                setData(data.filter(book => book._id !== bookId));
            })
            .catch((err) => {
                console.log("Error deleting book:", err);
            });
    }

    // Function to sort data
    const sortedData = [...data].sort((a, b) => {
        if (sortBy === 'price') {
            return (a.price - b.price) * sortOrder;
        }
        // Add more sorting criteria if needed
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
                <input
                    style={{ width: "300px", borderColor: "lime" }}
                    className="searchAddress"
                    placeholder="Search Data"
                    value={searchQuery}
                    onChange={handleSearch}
                />
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
                                {renderActionButtons(book)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
