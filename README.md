HEAD
# Movie-Review-site
A simple movie review site built with SvelteKit, TypeScript, and Svelte stores. Users can search for movies, submit reviews, and see average ratings.

# 🚀 Features

Homepage: Displays a list of movies with title, poster, and average rating.

Movie Details Page: Shows movie information (title, description, release date, genre, etc.) and user reviews.

Review Submission: Users can submit ratings (out of 5) and text reviews.

Search Functionality: Search movies by title or genre.

State Management: Svelte stores manage movie data, reviews, and search results.

Responsive UI: Works well on all devices.

# 🛠️ Setup Instructions

## Install Dependencies

Make sure you have Node.js installed.
```bash
npm install
```

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
This will start the SvelteKit development server. Open http://localhost:5173 in your browser.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
bad7d98 (Initial commit)


# 📂 Project Structure

📦 movie-review-site
 ┣ 📂 src
 ┃ ┣ 📂 lib
 ┃ ┃ ┣ 📂 stores
 ┃ ┃ ┃ ┗ 📜 movieStore.ts  # Manages movie & review state
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 +page.svelte  # Homepage listing movies & search
 ┃ ┃ ┣ 📜 movie/[id]/+page.svelte  # Movie details page with reviews
 ┃ ┣ 📜 app.html  # Main HTML file
 ┣ 📜 package.json  # Project metadata & dependencies
 ┣ 📜 README.md 


 # 🏗️ Component Details

🔹 movieStore.ts

A Svelte store that holds the movie list and their reviews.

```bash
import { writable } from 'svelte/store';
export const movieStore = writable([...]);
```
🔹 +page.svelte (Homepage)

Displays a search bar and a grid of movies.

Uses movieStore to fetch and display movie data.

Filters movies based on user input.

🔹 movie/[id]/+page.svel``te (Movie Details Page)

Shows detailed movie information.

Displays all reviews and allows users to submit a new review.







