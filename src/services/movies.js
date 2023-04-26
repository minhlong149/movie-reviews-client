import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/movies";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${BASE_URL}?page=${page}`);
  }

  get(id) {
    return axios.get(`${BASE_URL}/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(`${BASE_URL}?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`${BASE_URL}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${BASE_URL}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${BASE_URL}/review`, {
      data: { review_id: id, user_id: userId },
    });
  }
  
  getRatings() {
    return axios.get(`${BASE_URL}/ratings`);
  }
}

export default new MovieDataService();