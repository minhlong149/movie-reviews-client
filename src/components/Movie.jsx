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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(movieId);
  }, []);

  useEffect(() => {
    console.log("Get movie:", movie);
  }, [movie]);

  return (
    <Container className="my-5">
      <Row>
        <Col md="auto">
          <Image src={`${movie.poster}/100px250`} fluid />
        </Col>

        <Col>
          <Card className="mb-3">
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
            </Card.Body>
          </Card>

          <h2>Reviews</h2>

          {movie.reviews.map((review, index) => (
            <Card key={index} className="my-3">
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Card.Subtitle>
                <Card.Text>{review.review}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
