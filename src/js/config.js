import * as model from './model.js';
import { API_KEY } from './API_KEY';

export const API_LINK_THEATRE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
export const API_LINK_TOP = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
export const API_LINK_TRENDING = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
export const API_LINK_TV = ` https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`;
export const IMAGE_PATH = `https://image.tmdb.org/t/p/w500`;
