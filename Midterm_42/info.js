let params = new URLSearchParams(window.location.search);
let movie_title = params.get('movie').replace(/\s+/g, '').toLowerCase();

fetch("./data.json")
.then(response => response.json())
.then(movie => loadInfo(movie));

function loadInfo(movie) {

    for (var i = 0; i < movie.movies.length; i++) {

        let title = movie.movies[i].title;

        if (title.replace(/\s+/g, '').toLowerCase() == movie_title) {
            document.title = "Info: " + title;
            console.log(document.title);
        }

    }

}