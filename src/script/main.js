// import './component/app-bar.js';
// const main = () => {
// function main() {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", async function () {
    try {
      const inputKeyword = document.querySelector(".input-keyword");

      const movies = await getMovies(inputKeyword.value);
      // console.log(movies);
      updateUI(movies);
    } catch (err) {
      // console.log(err);
      alert(err);
    }
  });

  const getMovies = keyword => {
    return fetch(`http://www.omdbapi.com/?apikey=92b809a5&s=${keyword}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
        // console.log(response);
      }) //karena bentuk promise
      .then((response) => {
        // console.log(response);
        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        return response.Search;
        // console.log(response);
      });
  };

  const updateUI = movies => {
    let cards = "";
    movies.forEach((m) => (cards += showCards(m)));
    const movieContainer = document.querySelector(".movie-container");
    movieContainer.innerHTML = cards;
  };

  // ketika tombol detail diklik
  // event binding
  document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("modal-detail-button")) {
      // console.log('ok');
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMoviesDetail(imdbid);
      updateUIDetail(movieDetail);
    }
    // console.log(e.target);
  });
  //ketika tombol detail diklik
  const getMoviesDetail = imdbid => {
    return fetch(`http://www.omdbapi.com/?apikey=92b809a5&i=${imdbid}`)
      .then((response) => response.json())
      .then((m) => m);
  };

  const updateUIDetail = m => {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = movieDetail;
  };

  const showCards = m => {
    return `<div class="col-md-4 my-3">
                        <div class="card">
                            <img src="${m.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid = "${m.imdbID}">Show Details</a>
                            </div>
                        </div>
                    </div>`;
  }

  const showMovieDetail = m => {
    return ` <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${m.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                    <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                                    <li class="list-group-item"><strong>Actors : </strong> ${m.Actors} </li>
                                    <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                                    <li class="list-group-item"><strong>Plot :</strong> ${m.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
  }
// };

// export default main;