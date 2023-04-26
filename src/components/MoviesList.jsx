import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import MovieDataService from "../services/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    console.log("Retrieving movies and ratings");
    retrieveMovies();
    retrieveRatings();
  }, []);

  useEffect(() => {
    console.log("Movies updated", movies);
  }, [movies]);

  const retrieveMovies = async () => {
    try {
      const response = await MovieDataService.getAll();
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveRatings = async () => {
    try {
      const response = await MovieDataService.getRatings();
      setRatings(["All Ratings"].concat(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = async (query, by) => {
    try {
      let response = await MovieDataService.find(query, by);
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const findByTitle = () => {
    console.log(`Find movie with title '${searchTitle}' `);
    find(searchTitle, "title");
  };

  const findByRating = () => {
    console.log(`Find movie with rating '${searchRating}' `);
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <Container className="my-5">
      <Form as={Row} className="my-4">
        <InputGroup as={Col} className="">
          <FloatingLabel label="Search by title">
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
          </FloatingLabel>
          <Button variant="primary" type="button" onClick={findByTitle}>
            Search
          </Button>
        </InputGroup>

        <InputGroup as={Col} className="">
          <FloatingLabel label="Ratings">
            <Form.Select onChange={onChangeSearchRating}>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Button variant="primary" type="button" onClick={findByRating}>
            Search
          </Button>
        </InputGroup>
      </Form>

      <Row className="g-4">
        {movies.map((movie) => (
          <Col md={3} key={movie._id}>
            <Card>
              <Card.Img
                variant="top"
                src={movie.poster + "/100px180"}
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Rating: {movie.rated}</Card.Text>
                <Card.Text>{movie.plot}</Card.Text>
                <Button as={Link} to={"/movies/" + movie._id}>
                  View Reviews
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MoviesList;
