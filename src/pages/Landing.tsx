import React, { useEffect, useState } from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../assets/css/pages/Landing.css";

// Define the type for the square's position
interface SquarePosition {
  top: number;
  left: number;
}

const LandingPage: React.FC = () => {
  const [squares, setSquares] = useState<SquarePosition[]>([]); // Update state to hold objects with top and left
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger re-rendering of squares

  const generateRandomPosition = (): SquarePosition => {
    // Generate random position within the boundaries, avoiding content box area
    const top = Math.random() * 100; // Random top position percentage
    const left = Math.random() * 100; // Random left position percentage
    return { top, left };
  };

  const generateSquares = (count: number) => {
    const squaresArr: SquarePosition[] = []; // Use the correct type for squares
    for (let i = 0; i < count; i++) {
      const position = generateRandomPosition();
      squaresArr.push(position);
    }
    setSquares(squaresArr); // Set the state with the correct type
  };

  const handleSquareTransition = () => {
    setTimeout(() => {
      const updatedSquares = squares.map(() => generateRandomPosition());
      setSquares(updatedSquares); // Update the square positions with new random ones
      setAnimationKey((prevKey) => prevKey + 1); // Trigger re-render for the squares
    }, 4000); // Transition after 4 seconds (same as fade-out duration)
  };

  useEffect(() => {
    generateSquares(10); // Generate 10 squares
    handleSquareTransition(); // Start the animation loop
  }, []);

  return (
    <Container className="landing-page" maxWidth="lg">
      <Box className="content" textAlign="center">
        <Typography variant="h2" component="h1" className="headline">
          Welcome to Music Diary
        </Typography>
        <Typography variant="h4" component="h2" className="subheadline">
          Track your musical journey and share your experiences with friends.
        </Typography>

        <Box mt={4}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
            className="cta-button"
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Render the squares at random positions */}
      {squares.map((square, index) => (
        <div
          key={index}
          className={`square fade-out-fade-in-${animationKey}`}
          style={{
            top: `${square.top}%`,
            left: `${square.left}%`,
          }}
        />
      ))}
    </Container>
  );
};

export default LandingPage;
