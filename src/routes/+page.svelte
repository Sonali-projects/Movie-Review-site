<script lang="ts">
  import { movieStore } from '$lib/stores/movieStore'; 
  import { get } from 'svelte/store';

  let search = ''; // Search input
  let selectedMovie: any = null; // To store movie details when writing a review
  let newReviewText = ''; // User's review text
  let newReviewRating: number | undefined; // No default rating
  let filteredMovies = []; // Initialize filteredMovies

  // Reactive filteredMovies
  $: filteredMovies = $movieStore.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase())
  );

  function openReviewModal(movie) {
    selectedMovie = movie;
  }

  function submitReview() {
    if (!selectedMovie || !newReviewText.trim() || newReviewRating === undefined) return;

    // Create a new review
    const newReview = { rating: Number(newReviewRating), comment: newReviewText };

    // Update store properly
    movieStore.update(movies => {
      return movies.map(movie => {
        if (movie.id === selectedMovie.id) {
          return { ...movie, reviews: [...movie.reviews, newReview] };
        }
        return movie;
      });
    });

    // Reset input
    newReviewText = '';
    newReviewRating = undefined;
    selectedMovie = null; // Close modal
  }
</script>

<main class="container">
  <h1>Movie Review Site 🎬</h1>

  <!-- Search Bar -->
  <input 
    type="text" 
    placeholder="Search movies..." 
    bind:value={search} 
    class="search-box"
  />

  <!-- No Movies Found Message -->
  {#if filteredMovies.length === 0}
    <p class="no-movies">No movies found. Try searching for something else!</p>
  {/if}

  <!-- Movie List -->
  <div class="movie-list">
    {#each filteredMovies as movie}
      <div class="movie-card">
        <a href={`/movie/${movie.id}`} class="movie-link">
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>
            ⭐ {movie.reviews.length 
                ? (movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length).toFixed(1) 
                : "No reviews yet"}
          </p>
        </a>
        <button class="review-btn" on:click={() => openReviewModal(movie)}>Write a Review</button>
      </div>
    {/each}
  </div>

  <!-- Review Modal -->
  {#if selectedMovie}
    <div class="modal">
      <div class="modal-content">
        <h2>Write a Review for {selectedMovie.title}</h2>
        <select bind:value={newReviewRating}>
          <option value="" disabled selected>Select Rating</option>
          <option value="5">⭐️⭐️⭐️⭐️⭐️ (5)</option>
          <option value="4">⭐️⭐️⭐️⭐️ (4)</option>
          <option value="3">⭐️⭐️⭐️ (3)</option>
          <option value="2">⭐️⭐️ (2)</option>
          <option value="1">⭐️ (1)</option>
        </select>
        <textarea bind:value={newReviewText} placeholder="Write your review..."></textarea>

        <!-- Updated Buttons (Symmetrical & Styled) -->
        <div class="button-container">
          <button class="modal-button submit-btn" on:click={submitReview}>Submit Review</button>
          <button class="modal-button close-btn" on:click={() => selectedMovie = null}>Close</button>
        </div>
      </div>
    </div>
  {/if}
</main>


<style>
  body {
      font-family: 'Poppins', sans-serif;
      background: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
  }

  .container {
      text-align: center;
      padding: 20px;
  }

  .search-box {
      width: 60%;
      padding: 12px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
  }

  .movie-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      justify-content: center;
      padding: 20px;
  }

  .no-movies {
      text-align: center;
      font-size: 18px;
      color: #888;
      margin-top: 20px;
  }
  .movie-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      padding: 15px;
      transition: transform 0.2s ease-in-out;
      text-align: center;
  }

  .movie-card h2 {
      text-decoration: none; /* Remove underline */
      color: #333; /* Change color to dark gray */
      font-size: 18px; /* Adjust font size */
      font-weight: bold; /* Make it bold */
      margin: 10px 0; /* Add some spacing */
  }

  .movie-link {
      text-decoration: none; /* Ensure links don't have underline */
      color: inherit; /* Keep the same text color */
  }

  .movie-container {
      position: relative;
      display: inline-block;
      width: 200px; /* Adjust based on your layout */
      margin: 10px;
  }

  .movie-poster {
      width: 100%;
      border-radius: 8px; /* Optional: rounded corners */
      display: block;
  }

  .movie-title-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
      color: white;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
      font-weight: bold;
  }

  .movie-card:hover {
      transform: scale(1.05);
  }

  .movie-card img {
      width: 100%;
      border-radius: 10px;
  }

  .review-btn {
      background: #ff6b6b;
      color: white;
      padding: 8px 12px;
      border: none;
      cursor: pointer;
      margin-top: 8px;
  }

  .review-btn:hover {
      background: #ff4b4b;
  }

  /* Modal */
  .modal {
      position: fixed;
      top: 0;
      left: 0;
      right:0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
  }

  .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      width: 500px;
  }

  .modal-content textarea {
      width: 100%;
      height: 80px;
      margin-top: 10px;
      padding: 2px;
  }

  /* Updated Buttons */
  .button-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
  }

  .modal-button {
      width: 130px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s;
  }

  /* Submit Review Button */
  .submit-btn {
      background: #007BFF;
      color: white;
  }

  .submit-btn:hover {
      background: #0056b3;
  }

  /* Close Button */
  .close-btn {
      background: #6c757d;
      color: white;
  }

  .close-btn:hover {
      background: #545b62;
  }

  .modal-button:active {
      transform: scale(0.95);
  }
</style>
