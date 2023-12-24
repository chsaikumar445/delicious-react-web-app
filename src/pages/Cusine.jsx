import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Cusine = () => {
  const [cusine, setCusine] = useState([]);
  let params = useParams();

  useEffect(() => {
    getCusine(params.type);
    console.log(params.type);
  }, [params.type]);

  const getCusine = async (name) => {
    const reqUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f071d9ef99341b2ab373986dbee0de3&query=${name}`;
    console.log(reqUrl);
    const data = await fetch(reqUrl);
    const recipes = await data.json();
    // console.log(recipes.results)
    setCusine(recipes.results);
  };

  return (
    <Grid>
      {cusine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cusine;
