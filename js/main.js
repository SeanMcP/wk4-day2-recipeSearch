let search = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');
let searchResults = document.querySelector('main');

searchBtn.addEventListener('click', function(){

  searchResults.innerHTML = "";

  let searchQuery = search.value;
  console.log("searchQuery: ", searchQuery);
  let urlBase = 'http://recipepuppyproxy.herokuapp.com/api/?q=';
  let urlQuery = urlBase + searchQuery;
  console.log('urlQuery: ', urlQuery);

  fetch(urlQuery)
    .then(function(response){
      return response.json().then(function(data){
        console.log("This is data: ", data);
        for (var i = 0; i < data.results.length; i++) {
          let art = document.createElement('article');
          if(data.results[i].thumbnail) {
            art.innerHTML +=
              `
              <a href='${data.results[i].href}'><img src='${data.results[i].thumbnail}'/></a>
              `
          } else {
            art.innerHTML +=
              `
              <a href='${data.results[i].href}'><img src='https://baconmockup.com/600/450'/></a>
              `
          }
          art.innerHTML +=
            `
            <h2><a href='${data.results[i].href}'>${data.results[i].title}</a></h2>
            <p class="ingredients">${data.results[i].ingredients}</p>
            `
          searchResults.appendChild(art);
        }
      })
    })

    .catch(function(error){
      console.log("Nuts: It no work");
    })

})
