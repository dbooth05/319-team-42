getLoadAll();

fetch("./data.json")
.then(response => response.json())
.then(genres => loadGenres(genres));

function loadGenres(genres) {
    let genresDiv = document.getElementById("genres");

    while (genresDiv.lastElementChild) {
        genresDiv.removeChild(genresDiv.lastElementChild);
    }

    let section = document.createElement('h3');
    section.innerHTML = `Genres`;
    genresDiv.append(section);

    for (var i = 0; i < genres.genres.length; i++) {
        let genre = genres.genres[i];
        let label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="genre" value="${genre}">${genre}
        `;
        genresDiv.append(label);
    }

}

function getFilters() {

    var checkboxes = document.querySelectorAll('#genres input[type="checkbox"]');
    var filteredList = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            filteredList.push(checkbox.value);
        }
    });

    return filteredList;
}

function sortMovies(movies) {

    let options = document.getElementsByName('sorting');
    
    var checked;

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            checked = options[i].value;
            break;
        }
    }

    if (checked == "titleAZ") {
        movies.movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (checked == "titleZA") {
        movies.movies.sort((a, b) => b.title.localeCompare(a.title));
    } else if (checked == "oldNew") {
        movies.movies.sort((a, b) => new Date(a.release) - new Date(b.release));
    } else if (checked == "newOld") {
        movies.movies.sort((a, b) => new Date(b.release) - new Date(a.release));
    } else if (checked == "reviewHL") {
        movies.movies.sort((a, b) => b.reviewRating["Rotten Tomatoes"] - a.reviewRating["Rotten Tomatoes"]);
    } else if (checked == "reviewLH") {
        movies.movies.sort((a, b) => a.reviewRating["Rotten Tomatoes"] - b.reviewRating["Rotten Tomatoes"]);
    }

}

function getLoadAll() {

    fetch("./data.json")
        .then(response => response.json())
        .then(movies => loadAll(movies));

    function loadAll(movies) {
        
        var container = document.getElementById("movieList");

        sortMovies(movies);

        filtered = getFilters();
        
        let searchName = document.forms["searchForm"]["search"];
        let inputSearchName = searchName.value;   

        let numCols = (window.innerWidth > 1000 ? 3 : 2);
        console.log(window.innerWidth);
            
        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }

        if (filtered.length <= 0) {
        
            var i = 0;
            while (i < movies.movies.length) {
                let div = document.createElement('div');
                div.id = 'row';
                let cnt = 0;
                while (cnt < numCols && i < movies.movies.length) {
                    let title = movies.movies[i].title;
                    if (title.toLowerCase().includes(inputSearchName.toLowerCase())) {
                        let desc = movies.movies[i].description;
                        let imgURL = movies.movies[i].imgURL;
                        let innerdiv = document.createElement('div');
                        innerdiv.id = 'cb';
                        innerdiv.innerHTML = `
                            <img src="${imgURL}" alt="Cover image for movie" width="125px" height="175px">
                            <div id="data">
                                <h3>${title}<\h3><br>
                                <p>${desc}<\p>
                            <\div>
                        `;
    
                        innerdiv.addEventListener('click', () => {
                            console.log(`button clicked ${title}`);
                            window.location.href = `info.html?movie=${title.replaceAll(' ', '')}`;
                        });
    
                        div.append(innerdiv);
                        cnt++;
                    }
                    i++;
                }
                container.append(div);
            }
    
        } else {
            var i = 0;
            while (i < movies.movies.length) {
                let div = document.createElement('row');
                div.id = 'row';
                let cnt = 0;
                while (cnt < numCols && i < movies.movies.length) {
                    let title = movies.movies[i].title;
                    if (movies.movies[i].genres.some((item) => filtered.includes(item)) && 
                        title.toLowerCase().includes(inputSearchName.toLowerCase())) {
                            let desc = movies.movies[i].description;
                            let imgURL = movies.movies[i].imgURL;
                            let innerdiv = document.createElement('div');
                            innerdiv.id = 'cb';
                            innerdiv.innerHTML = `
                                <img src="${imgURL}" alt="Cover image for movie" width="125px" height="175px">
                                <div id="data">
                                    <h3>${title}<\h3><br>
                                    <p>${desc}<\p>
                                <\div>
                            `;
        
                            innerdiv.addEventListener('click', () => {
                                console.log(`button clicked ${title}`);
                                window.location.href = `info.html?movie=${title.replaceAll(' ', '')}`;
                            });
        
                            div.append(innerdiv);
                            cnt++;
                    }
                    i++;
                }
                container.append(div);
            }
        }
    
    }

}
