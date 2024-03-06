// getting the URL parameters, in this case 1 param movie
let params = new URLSearchParams(window.location.search);
// Chooses the specific param 'movie' and removes all special characters
// and spaces then turns string to lower case characters only
let movie_title = params.get('movie').replace(/\s+/g, '').toLowerCase();

// getting JSON objects from data.json and calling loadInfo func
fetch("./data.json")
.then(response => response.json())
.then(movie => {
    loadInfo(movie);
});

function loadInfo(movie) {

    for (var i = 0; i < movie.movies.length; i++) {

        let title = movie.movies[i].title;

        // conditional if correct movie has been found
        // if true, display info inside if statement
        if (title.replace(/\s+/g, '').toLowerCase() == movie_title) {
            document.title = "Info: " + title;
            console.log(document.title);

            //movie images
            let imageURL = movie.movies[i].imgURL;
            let imgElement = document.createElement('img');
            imgElement.src = imageURL;

            imgElement.style.width = '600px';
            imgElement.style.height = '960px';

            imgElement.classList.add('movie-image'); // Add a class for styling
            //document.querySelector('main').appendChild(imgElement);

            //movie genres
            let genres = movie.movies[i].genres;
            let genresContainer = document.getElementById("genres");
            genresContainer.innerHTML = "";
            let genreElement = document.createElement("h3");
            genreElement.textContent = "Genres";
            genresContainer.appendChild(genreElement);

            let genresList = document.createElement("ul");
            genres.forEach(genre => {
                let listItem = document.createElement("li");
                listItem.textContent = genre;
                genresList.appendChild(listItem);
            });
            genresContainer.appendChild(genresList);

            //title
            let movieTitle = movie.movies[i].title;
            let titleContainer = document.getElementById("movieTitle");
            let titleElement = document.createElement("h1");
            titleElement.textContent = movieTitle;
            titleContainer.appendChild(titleElement);
            // document.querySelector('main').appendChild(titleElement);

            // //Release 
            let releaseDate = movie.movies[i].release;
            let releaseDateContainer = document.getElementById("releaseDate");
            let releaseDateElement = document.createElement("p");
            releaseDateElement.textContent = releaseDate;
            releaseDateContainer.appendChild(releaseDateElement);

            //movie rating
            let mvRating = movie.movies[i].mv_rating;
            let mvRatingContainer = document.getElementById("mvRating");
            let mvRatingElement = document.createElement("p");
            mvRatingElement.textContent = mvRating;
            mvRatingContainer.appendChild(mvRatingElement);

            //Description
            let desc = movie.movies[i].description;
            let descContainer = document.getElementById("desc");
            let descElement = document.createElement("p");
            descElement.textContent = desc;
            descContainer.appendChild(descElement);

            //Review Ratings
            let reviewRatings = movie.movies[i].reviewRating;

            // Clear any existing content in the review ratings container
            let reviewRatingsContainer = document.getElementById("review-ratings");
            reviewRatingsContainer.innerHTML = "";

            // Create and append header for review ratings
            let reviewRatingsElement = document.createElement("h2");
            reviewRatingsElement.textContent = "Review Ratings";
            reviewRatingsContainer.appendChild(reviewRatingsElement);

            // Create and append Rotten Tomatoes rating
            let rottenTomatoesElement = document.createElement("p");
            rottenTomatoesElement.textContent = "Rotten Tomatoes: " + reviewRatings["Rotten Tomatoes"];
            reviewRatingsContainer.appendChild(rottenTomatoesElement);

            // Create and append IMDb rating
            let imdbRatingElement = document.createElement("p");
            imdbRatingElement.textContent = "IMDb: " + reviewRatings["IMDb"];
            reviewRatingsContainer.appendChild(imdbRatingElement);
        }
        

    }

}