<script lang="ts">
    import { movieStore } from '$lib/stores/movieStore'; 
    import { page } from '$app/stores'; 

    // Get the movie ID from the URL reactively
    $: id = $page.params.id;

    // Find the correct movie reactively
    $: movie = $movieStore.find(m => m.id === parseInt(id));

    // Handle case where movie is not found
    if (!movie) {
        console.error('Movie with ID ${id} not found');


    }
</script>

<main class="container">
    {#if movie}
        <div class="movie-card">
            <img src={movie.poster} alt={movie.title} class="poster"/>

            <div class="movie-details">
                <h1 class="movie-title">{movie.title}</h1>
                <p class="genre"><strong>Genre:</strong> {movie.genre}</p>
                <p class="release-date"><strong>Release Date:</strong> {movie.releaseDate}</p>
                <p class="description">{movie.description}</p>

                <!-- Reviews Section -->
                <div class="reviews-section">
                    <h2>Reviews</h2>
                    {#if movie.reviews.length > 0}
                        <ul class="reviews">
                            {#each movie.reviews as review}
                                <li>
                                    <span class="rating">⭐ {review.rating}</span>
                                    <p class="review-comment">"{review.comment}"</p>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="no-reviews">No reviews yet.</p>
                    {/if}
                </div>

                

                <!-- Back to Homepage -->
                <a href="/" class="back-button">⬅ Back to Home</a>
            </div>
        </div>
    {:else}
        <h2 class="error-text">Movie Not Found 😢</h2>
        <a href="/" class="back-button">⬅ Back to Home</a>
    {/if}
</main>

<style>
    /* General Styles */
    body {
        font-family: 'Poppins', sans-serif;
        background: #1a1a2e;
        color: #eaeaea;
        margin: 0;
        padding: 0;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 20px;
    }

    /* Movie Card */
    .movie-card {
        display: flex;
        background: #16213e;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        max-width: 800px;
        width: 100%;
        transition: transform 0.2s ease-in-out;
    }

    .movie-card:hover {
        transform: scale(1.02);
    }

    .poster {
        width: 300px;
        object-fit: cover;
        border-radius: 12px 0 0 12px;
    }

    .movie-details {
        padding: 20px;
        flex: 1;
    }

    .movie-title {
        font-size: 24px;
        margin-bottom: 10px;
        background-color: #ff5733;
        color: #fff;
        padding: 8px;
        border-radius: 5px;
        display: inline-block;
    }

    .genre, .release-date {
        font-size: 14px;
        color: #b5b5b5;
        margin-bottom: 5px;
    }

    .description {
        font-size: 16px;
        line-height: 1.5;
        color: #ddd;
    }

    /* Reviews */
    .reviews-section {
        margin-top: 20px;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 10px;
        color: #ffcc00;
    }

    .reviews {
        list-style: none;
        padding: 0;
    }

    .reviews li {
        background: #0f3460;
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 5px;
        color: #fff;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .rating {
        font-weight: bold;
        color: #ffcc00;
        font-size: 18px;
    }

    .review-comment {
        font-size: 14px;
        font-style: italic;
        margin-top: 5px;
    }

    .no-reviews {
        font-style: italic;
        color: #888;
    }

    /* Buttons */
    .review-button {
        background: #ffcc00;
        color: #1a1a2e;
        border: none;
        padding: 10px 15px;
        font-size: 16px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        transition: background 0.3s;
    }

    .review-button:hover {
        background:  #e6b800;
    }

    .back-button {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        padding: 10px 15px;
        background: #ffcc00;
        color: #1a1a2e;
        border-radius: 5px;
        font-weight: bold;
        transition: background 0.3s;
    }

    .back-button:hover {
        background: #e6b800;
    }

    /* Error Message */
    .error-text {
        text-align: center;
        font-size: 20px;
        color: #ff4b4b;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .movie-card {
            flex-direction: column;
            max-width: 90%;
        }

        .poster {
            width: 100%;
            border-radius: 12px 12px 0 0;
        }

        .movie-details {
            text-align: center;
        }
    }
</style>                                          