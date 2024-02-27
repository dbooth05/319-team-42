fetch("./data.json")
.then(response => response.json())
.then(movies => loadAll(movies));

function loadAll(movies) {
    
    var container = document.getElementById("movie_list");

    while (container.lastElementChild) {
        container.remove(container.lastElementChild);
    }

    for (var i = 0; i < movies.movies.length; i++) {
        let title = movies.movies[i].title;
        let desc = movies.movies[i].description;

        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${title}<\h3><br>
            <h3>${desc}<\h3>
        `;

        container.append(div);
    }

}

function loadFilter() {

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
            console.log(title.includes(inputSearchName));
            if (title.includes(inputSearchName)) {
                let title = movies.movies[i].title;
                let desc = movies.movies[i].description;
        
                let div = document.createElement("div");
                div.innerHTML = `
                    <h3>${title}<\h3><br>
                    <h3>${desc}<\h3>
                `;
        
                container.append(div);
            }
        }
    }

}
