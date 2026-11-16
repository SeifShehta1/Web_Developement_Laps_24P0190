import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title,
      rating: Number(rating),
      review,
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setReview("");
    setRating("5");
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "32px", lineHeight: "1.4", textAlign: "center", marginBottom: "20px" }}>
        🎬 My Movies Watch List
      </h1>

      {/* Form to Add Movie */}
      <form onSubmit={handleAddMovie} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Movie title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        
        <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: "8px", fontSize: "16px" }}>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <textarea
          placeholder="Write a comment review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />

        <button type="submit" style={{ padding: "10px", background: "#007bff", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
          Add Movie
        </button>
      </form>

      {/* Movies List */}
      <div>
        <h2>Watch List ({movies.length})</h2>
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px", background: "#f9f9f9" }}>
              <h3>{movie.title}</h3>
              <p>Rating: {"⭐".repeat(movie.rating)} ({movie.rating}/5)</p>
              <p>Review: {movie.review || "No review added."}</p>
              <button onClick={() => handleDelete(movie.id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;