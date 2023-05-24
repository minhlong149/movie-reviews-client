import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

import MovieDataService from "../services/movies";

function AddReview({ user }) {
  const { id: movieId } = useParams();
  const { state: currentReview } = useLocation();

  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState(currentReview?.review);

  const saveReview = async (e) => {
    try {
      e.preventDefault();
      const reviewData = {
        review,
        name: user.name,
        user_id: user.id,
        movie_id: movieId,
      };
      if (!currentReview) {
        await MovieDataService.createReview(reviewData);
      } else {
        await MovieDataService.updateReview({
          ...reviewData,
          review_id: currentReview._id,
        });
      }
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return !submitted ? (
    <Form onSubmit={saveReview} className="mx-auto w-50 mt-5">
      <Form.Group className="mb-3">
        <Form.Label>{`${
          !currentReview ? "Add new" : "Edit"
        } Review`}</Form.Label>
        <Form.Control
          required
          as="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  ) : (
    <Stack gap={2} className="col-md-5 mx-auto mt-5">
      <h4 className="text-center">Review submitted successfully</h4>
      <Link to={`/movies/${movieId}`} className="btn btn-success">
        Back to Movie
      </Link>
    </Stack>
  );
}

export default AddReview;
