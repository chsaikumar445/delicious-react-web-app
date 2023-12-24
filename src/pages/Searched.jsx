import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Searched = () => {
  let params = useParams();
  const [searchedRecepies, setSearchedRecipies] = useState([]);

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f071d9ef99341b2ab373986dbee0de3&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipies(recipes.results);
    // console.log(data)
  };

  useEffect(() => {
    getSearched(params.type);
  }, [params.type]);

  return (
    <Grid>
      {searchedRecepies.map((item) => {
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

export default Searched;
