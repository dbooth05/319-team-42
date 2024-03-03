// getting the URL parameters, in this case 1 param movie
let params = new URLSearchParams(window.location.search);
// Chooses the specific param 'movie' and removes all special characters
// and spaces then turns string to lower case characters only
let movie_title = params.get('movie').replace(/\s+/g, '').toLowerCase();

// getting JSON objects from data.json and calling loadInfo func
fetch("./data.json")
.then(response => response.json())
.then(movie => loadInfo(movie));

function loadInfo(movie) {

    for (var i = 0; i < movie.movies.length; i++) {

        let title = movie.movies[i].title;

        // conditional if correct movie has been found
        // if true, display info inside if statement
        if (title.replace(/\s+/g, '').toLowerCase() == movie_title) {
            document.title = "Info: " + title;
            console.log(document.title);
        }

    }

}