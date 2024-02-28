window.onload = getLoadAll;

function getLoadAll() {

    fetch("./data.json")
    .then(response => response.json())
    .then(movies => loadAll(movies));

    function loadAll(movies) {
        
        var container = document.getElementById("movie_list");

        console.log("made it here");

        while (container.lastElementChild) {
            container.remove(container.lastElementChild);
        }

        for (var i = 0; i < movies.movies.length; i++) {
            let title = movies.movies[i].title;
            let desc = movies.movies[i].description;

            let div = document.createElement("div");
            div.innerHTML = `
                <h3>${title}<\h3><br>
                <p>${desc}<\p>
            `;

            container.append(div);
        }

    }
}

function getLoadFilter() {

    fetch("./data.json")
        .then(response => response.json())
        .then(movies => loadFilter(movies));

    function loadFilter(movies) {

        var container = document.getElementById("movie_list");

        var checkboxes = document.querySelectorAll('#genres input[type="checkbox"]');
        var selectGenres = [];

        checkboxes.forEach((checkbox) => {

            if (checkbox.checked) {
                selectGenres.push(checkbox.value);
            } else {
                const idx = selectGenres.indexOf(checkbox.value);
                if (idx !== -1) {
                    selectGenres.splice(idx, 1);
                }
            }

        });

        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }

        if (selectGenres.length <= 0) {

            for (var i = 0; i < movies.movies.length; i++) {
                let title = movies.movies[i].title;
                let desc = movies.movies[i].description;
    
                let div = document.createElement("div");
                div.innerHTML = `
                    <h3>${title}<\h3><br>
                    <p>${desc}<\p>
                `;
    
                container.append(div);
            }

        } else {

            for (var i = 0; i < movies.movies.length; i++) {

                if (movies.movies[i].genres.some((item) => selectGenres.includes(item))) {
                    let title = movies.movies[i].title;
                    let desc = movies.movies[i].description;
            
                    let div = document.createElement("div");
                    div.innerHTML = `
                        <h3>${title}<\h3><br>
                        <p>${desc}<\p>
                    `;
            
                    container.append(div);
                }

            }
        }
    }

}

function getLoadSearch() {

    fetch("./data.json")
        .then(response => response.json())
        .then(movies => loadSearch(movies));

    function loadSearch(movies) {

        var container = document.getElementById("movie_list");

        let searchName = document.forms["search_form"]["search"];
        let inputSearchName = searchName.value;

        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }
    
        for (var i = 0; i < movies.movies.length; i++) {
            let title = movies.movies[i].title;
            if (title.includes(inputSearchName)) {
                let title = movies.movies[i].title;
                let desc = movies.movies[i].description;
        
                let div = document.createElement("div");
                div.innerHTML = `
                    <h3>${title}<\h3><br>
                    <p>${desc}<\p>
                `;
        
                container.append(div);
            }
        }
    }

}
