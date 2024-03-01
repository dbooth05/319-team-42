getLoadAll();

fetch("./data.json")
.then(response => response.json())
.then(genres => loadGenres(genres));

function loadGenres(genres) {
    let genresDiv = document.getElementById("genres");

    while (genresDiv.lastElementChild) {
        genresDiv.removeChild(genresDiv.lastElementChild);
    }

    for (var i = 0; i < genres.genres.length; i++) {
        let genre = genres.genres[i];
        let label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="genre" value="${genre}">${genre}
        `;
        genresDiv.append(label);
    }

    let form = document.createElement("form");
    form.innerHTML = `
        <form>
            <button type="button" onclick="getLoadAll();">Apply Filters</button>
        </form>
    `;
    genresDiv.append(form);
}

function getFilters() {

    var checkboxes = document.querySelectorAll('#genres input[type="checkbox"]');
    var filteredList = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            filteredList.push(checkbox.value);
        }
    });

    console.log(filteredList);

    return filteredList;
}

function getLoadAll() {

    fetch("./data.json")
        .then(response => response.json())
        .then(movies => loadAll(movies));

    function loadAll(movies) {
        
        var container = document.getElementById("movie_list");

        filtered = getFilters();
        
        let searchName = document.forms["search_form"]["search"];
        let inputSearchName = searchName.value;   
            
        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }

        if (filtered.length <= 0) {
        
            for (var i = 0; i < movies.movies.length; i++) {
                let title = movies.movies[i].title;
                if (title.includes(inputSearchName)) {
                    let desc = movies.movies[0].description;
                    let div = document.createElement("div");
                    div.id = 'cb';
                    div.innerHTML = `
                    <div id="data">
                        <h3>${title}<\h3><br>
                        <p>${desc}<\p>
                    </div>
                    `;

                    div.addEventListener('click', () => {
                        // change this to forward to page about movie
                        console.log(`button clicked ${title}`);
                    });
            
                    container.append(div);
                }
            }
    
        } else {
            for (var i = 0; i < movies.movies.length; i++) {

                if (movies.movies[i].genres.some((item) => filtered.includes(item))) {
                    let title = movies.movies[i].title;
                    if (title.includes(inputSearchName)) {
                        let desc = movies.movies[0].description;
                        let div = document.createElement("div");
                        div.id = 'cb';
                        div.innerHTML = `
                        <div id="data">
                            <h3>${title}<\h3><br>
                            <p>${desc}<\p>
                        </div>
                        `;
    
                        div.addEventListener('click', () => {
                            // change this to forward to page about movie
                            console.log(`button clicked ${title}`);
                        });
                
                        container.append(div);
                    }
                }

            }
        }
    
    }

}
