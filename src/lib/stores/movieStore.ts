import { writable } from 'svelte/store';

export const movieStore = writable([
  {
    id: 1,
    title: "Inception",
    poster: "/images/inception.jpg",
    description: "A mind-bending thriller...",
    releaseDate: "2010-07-16",
    genre: "Sci-Fi",
    reviews: [
      { rating: 5, comment: "Amazing movie!" },
      { rating: 4, comment: "Loved the visuals." }
    ]
  }, // ✅ Added comma here

  {
    id: 2,
    title: "The Dark Knight",
    poster: "/images/the-dark-knight.jpg",
    description: "A gripping superhero crime thriller.",
    releaseDate: "2008-07-18",
    genre: "Action",
    reviews: [
      { rating: 5, comment: "Best Batman movie ever!" },
      { rating: 4, comment: "Heath Ledger was amazing." }
    ]
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/images/interstellar.jpg",
    description: "A visually stunning space adventure.",
    releaseDate: "2014-11-07",
    genre: "Sci-Fi",
    reviews: [
      { rating: 5, comment: "Mind-blowing science fiction!" }, // ✅ Removed unnecessary quotes
      { rating: 4, comment: "Emotional and visually amazing." }
    ]
  },
  {
    id: 4,
    title: "Parasite",
    poster: "/images/parasite.jpg",
    description: "A thrilling social satire.",
    releaseDate: "2019-05-30",
    genre: "Thriller",
    reviews: [
      { rating: 5, comment: "Brilliant storytelling!" },
      { rating: 4, comment: "A must-watch!" }
    ]
  },
  {
    id: 5,
    title: "Toy Story",
    poster: "/images/toy-story.jpg",
    description: "A heartwarming animated adventure.",
    releaseDate: "1995-11-22",
    genre: "Animation",
    reviews: [
      { rating: 5, comment: "A childhood classic!" },
      { rating: 4, comment: "Fun and emotional." }
    ]
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    poster: "/images/the-shawshank-redemption.jpg",
    description: "An inspiring prison drama.",
    releaseDate: "1994-09-23",
    genre: "Drama",
    reviews: [
      { rating: 5, comment: "One of the best movies ever made!" },
      { rating: 5, comment: "Powerful and emotional." }
    ]
  },
  {
    id: 7,
    title: "Avengers: Endgame",
    poster: "/images/avengers-endgame.jpg",
    description: "An epic superhero showdown.",
    releaseDate: "2019-04-26",
    genre: "Superhero",
    reviews: [
      { rating: 5, comment: "An epic conclusion to the saga!" },
      { rating: 4, comment: "Loved every moment!" }
    ]
  },
  {
    id: 8,
    title: "The Conjuring",
    poster: "/images/the-conjuring.jpg",
    description: "A terrifying horror experience.",
    releaseDate: "2013-07-19",
    genre: "Horror",
    reviews: [
      { rating: 4, comment: "Scary and well-executed!" },
      { rating: 4, comment: "Chilling story and great acting." }
    ]
  },
  {
    id: 9,
    title: "La La Land",
    poster: "/images/la-la-land.jpg",
    description: "A beautifully crafted musical romance.",
    releaseDate: "2016-12-09",
    genre: "Musical",
    reviews: [
      { rating: 5, comment: "A mesmerizing musical experience!" },
      { rating: 4, comment: "Beautiful cinematography and music." }
    ]
  },
  {
    id: 10,
    title: "The Grand Budapest Hotel",
    poster: "/images/the-grand-budapest-hotel.jpg",
    description: "A quirky and artistic comedy.",
    releaseDate: "2014-02-06",
    genre: "Comedy",
    reviews: [
      { rating: 5, comment: "Wes Anderson at his best!" },
      { rating: 4, comment: "Visually stunning and funny." }
    ]
  }
]);

export function addReview(movieId: number, rating: number, comment: string) {
  movieStore.update(movies => {
    return movies.map(movie => {
      if (movie.id === movieId) {
        return {
          ...movie,
          reviews: [...movie.reviews, { rating, comment }]
        };
      }
      return movie;
    });
  });
}
