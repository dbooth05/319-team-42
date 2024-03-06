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

            imgElement.style.width = '480px';
            imgElement.style.height = '768px';

            imgElement.classList.add('movie-image'); // Add a class for styling
            document.getElementById('left').appendChild(imgElement);

            //title
            let movieTitle = movie.movies[i].title;
            let titleContainer = document.createElement("div");
            titleContainer.id = "title"
            let titleElement = document.createElement("h1");
            titleElement.textContent = movieTitle;
            titleContainer.appendChild(titleElement);
            document.getElementById('right').appendChild(titleContainer);

            //movie genres
            let genres = movie.movies[i].genres;
            let genresContainer = document.createElement("div");
            genresContainer.id = "genres";
            let genreElement = document.createElement("h3");
            genreElement.textContent = "Genres: ";
            genresContainer.appendChild(genreElement);

            let genresList = document.createElement("ul");
            genres.forEach(genre => {
                let listItem = document.createElement("li");
                listItem.textContent = genre;
                genresList.appendChild(listItem);
            });
            genresContainer.appendChild(genresList);
            document.getElementById('right').appendChild(genresContainer);

            // //Release 
            let releaseDate = movie.movies[i].release;
            let releaseDateContainer = document.createElement("div");
            releaseDateContainer.id = "releaseDate";
            releaseDateContainer.innerHTML = `
                <h3>Release Date:</h3>
                <p> ${releaseDate}</p>
            `;
            document.getElementById('right').appendChild(releaseDateContainer);

            //movie rating
            let mvRating = movie.movies[i].mv_rating;
            let mvRatingContainer = document.createElement("div");
            mvRatingContainer.id = "mvRating";
            mvRatingContainer.innerHTML = `
                <h3>Movie Rating:</h3>
                <p>${mvRating}</p>
            `;
            document.getElementById('right').appendChild(mvRatingContainer);

            //Description
            let desc = movie.movies[i].description;
            let descContainer = document.createElement("div");
            descContainer.id = "description";
            descContainer.innerHTML = `
                <h3>Description:</h3>
                <p>${desc}</p>
            `;
            document.getElementById('right').appendChild(descContainer);

            //Review Ratings
            let reviewRatings = movie.movies[i].reviewRating;

            // Clear any existing content in the review ratings container
            let reviewRatingsContainer = document.createElement("div");
            reviewRatingsContainer.id = "reviewRatings";

            document.getElementById('right').appendChild(reviewRatingsContainer);

            reviewRatingsContainer.innerHTML = `
                <h3>Review Ratings:</h3>
                <p>Rotten Tomatoes: ${reviewRatings["Rotten Tomatoes"]}</p>
                <p>IMDb: ${reviewRatings["IMDb"]}</p>
            `;
        }
        

    }

}