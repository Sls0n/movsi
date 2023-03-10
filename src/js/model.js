import { async } from 'regenerator-runtime';
import { API_KEY } from './API_KEY.js';
import {
  API_LINK_THEATRE,
  API_LINK_GROSS,
  API_LINK_TOP,
  API_LINK_TV,
  IMAGE_PATH,
  API_LINK_SEARCH,
  API_LINK_DISCOVER,
  API_LINK_DISCOVER_TV,
  API_LINK_MOVIE,
  API_LINK_SHOW,
} from './config.js';

export const state = {
  search: {},
  bookmarksMovie: {},
  bookmarksShow: {},
  resultArray: {
    results: [],
  },
  searchResults: {
    result: [],
  },
};

export const loadBookmarkMovie = async function (id) {
  try {
    const response = await fetch(`${API_LINK_MOVIE}${id}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.bookmarksMovie = {
      title: data.title,
      posterPath: `${IMAGE_PATH}/${data.poster_path}`,
      overview: data.overview,
      releaseDate: data.release_date,
      voteAverage: data.vote_average,
      id: data.id,
    };
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const loadBookmarkShow = async function (id) {
  try {
    const response = await fetch(`${API_LINK_SHOW}${id}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.bookmarksShow = {
      title: data.name,
      posterPath: `${IMAGE_PATH}/${data.poster_path}`,
      overview: data.overview,
      releaseDate: data.release_date,
      voteAverage: data.vote_average,
      id: data.id,
    };
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const loadTheatreMovies = async function (page) {
  try {
    const response = await fetch(`${API_LINK_THEATRE}&language=en-US&page=${page}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        originalLanguage: result.original_language,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}/${result.poster_path}`,
        releaseDate: result.release_date,
        title: result.title,
        voteAverage: result.vote_average,
      };
    });
    console.log(state.resultArray.results);
  } catch (err) {
    console.error(err);
  }
};

export const loadGrossMovies = async function (page) {
  try {
    const response = await fetch(`${API_LINK_GROSS}&language=en-US&page=${page}&vote_count.gte=100`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        originalLanguage: result.original_language,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}/${result.poster_path}`,
        releaseDate: result.release_date,
        title: result.title,
        voteAverage: result.vote_average,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadTopMovies = async function (page) {
  try {
    const response = await fetch(`${API_LINK_TOP}&language=en-US&page=${page}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        originalLanguage: result.original_language,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}/${result.poster_path}`,
        releaseDate: result.release_date,
        title: result.title,
        voteAverage: result.vote_average,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadTvShows = async function (page) {
  try {
    const response = await fetch(`${API_LINK_TV}&page=${page}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    console.log(data.results);
    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        name: result.name,
        originalLanguage: result.original_language,
        originalName: result.original_name,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}${result.poster_path}`,
        releaseDate: result.first_air_date,
        voteAverage: result.vote_average,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadSearchResults = async function (page, query) {
  try {
    const response = await fetch(`${API_LINK_SEARCH}&language=en-US&page=${page}&query=${query}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    state.searchResults.result = data.results
      .filter(result => result.media_type !== 'person')
      .map(result => {
        if (result.media_type === 'tv') {
          return {
            adult: result.adult,
            backdropPath: result.backdrop_path,
            genreIds: result.genre_ids,
            id: result.id,
            title: result.name,
            originalLanguage: result.original_language,
            overview: result.overview,
            posterPath: `${IMAGE_PATH}${result.poster_path}`,
            releaseDate: result.first_air_date,
            voteAverage: result.vote_average,
          };
        } else if (result.media_type === 'movie') {
          return {
            adult: result.adult,
            backdropPath: result.backdrop_path,
            genreIds: result.genre_ids,
            id: result.id,
            title: result.title,
            originalLanguage: result.original_language,
            overview: result.overview,
            posterPath: `${IMAGE_PATH}${result.poster_path}`,
            releaseDate: result.release_date,
            voteAverage: result.vote_average,
          };
        }
      });
  } catch (err) {
    console.error(err);
  }
};

export const loadGenreTop = async function (page, genres) {
  try {
    const genreString = genres.join(',');
    const response = await fetch(`${API_LINK_DISCOVER}&sort_by=vote_average.desc&vote_count.gte=200&with_genres=${genreString}&page=${page}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    console.log(data);

    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        originalLanguage: result.original_language,
        originalTitle: result.original_title,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}/${result.poster_path}`,
        releaseDate: result.release_date,
        title: result.title,
        voteAverage: result.vote_average,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadGenreTv = async function (page, genres) {
  try {
    const genreString = genres.join(',');
    const response = await fetch(`${API_LINK_DISCOVER_TV}&sort_by=vote_average.desc&vote_count.gte=200&with_genres=${genreString}&page=${page}`);
    if (!response.ok) throw new Error(`Problem getting movie data (${response.status})`);
    const data = await response.json();
    console.log(data);

    state.resultArray.results = data.results.map(result => {
      return {
        adult: result.adult,
        backdropPath: result.backdrop_path,
        genreIds: result.genre_ids,
        id: result.id,
        title: result.name,
        originalLanguage: result.original_language,
        originalTitle: result.original_name,
        overview: result.overview,
        posterPath: `${IMAGE_PATH}${result.poster_path}`,
        releaseDate: result.first_air_date,
        voteAverage: result.vote_average,
      };
    });
  } catch (err) {
    console.error(err);
  }
};
