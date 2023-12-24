import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("Veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=9f071d9ef99341b2ab373986dbee0de3&number=9&tag=veggie`
      );
      const data = await api.json();
      localStorage.setItem("Veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Veggie Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  marggin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 13rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0%;
    object-fit: cover;
  }
  p {
    width: 100%;
    height: 40%;
    position: absolute;
    font-size: 1rem;
    font-weight: 600;
    left: 50%;
    bottom: 0%;
    color: white;
    z-index: 10;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, 0%);
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
