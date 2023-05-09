import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Col, Image, Row } from "react-bootstrap";
import MovieDataService from "../services/movies";

const Movie = ({ user }) => {
  const { id: movieId } = useParams();

  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const getMovie = async (movieId) => {
    try {
      const response = await MovieDataService.get(movieId);
      setMovie(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(movieId);
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col md="5">
          <Image src={`${movie.poster}/100px250`} fluid />
        </Col>
        <Col md="7">
          <Card>
            <Card.Header>{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
