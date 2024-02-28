window.onload = getLoadAll();

function getFilters() {

    var checkboxes = document.querySelectorAll('#genres input[type="checkbox"]');
    var filteredList = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            filteredList.push(checkbox.value);
        } else {
            const idx = filteredList.indexOf(checkbox.value);
            if (idx !== -1) {
                filteredList.splice(idx, 1);
            }
        }
    });

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
                    let desc = movies.movies[i].description;
            
                    let div = document.createElement("div");
                    div.innerHTML = `
                        <div id="data">
                            <h3>${title}<\h3><br>
                            <p>${desc}<\p>
                        </div>
                            <div id="get_info">
                            <button type="button" onclick="">View More Info</button>
                        </div>
                    `;
            
                    container.append(div);
                }
            }
    
        } else {
            for (var i = 0; i < movies.movies.length; i++) {

                if (movies.movies[i].genres.some((item) => filtered.includes(item))) {
                    let title = movies.movies[i].title;
                    if (title.includes(inputSearchName)) {
                        let desc = movies.movies[i].description;
                
                        let div = document.createElement("div");
                        div.innerHTML = `
                        <div id="data">
                            <h3>${title}<\h3> </br>
                            <p>${desc}<\p>
                        </div>
                            <div id="get_info">
                            <button type="button" onclick="">View More Info</button>
                        </div>
                        `;
                
                        container.append(div);
                    }
                }

            }
        }
    
    }

}
