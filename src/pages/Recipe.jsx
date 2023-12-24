import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");

  const getDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=9f071d9ef99341b2ab373986dbee0de3`
    );

    const detailsData = await data.json();
    console.log(detailsData);
    setDetails(detailsData);
  };

  useEffect(() => {
    getDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <InfoButton className="">
          <Button
            className={activeTab === "Instructions" ? "active" : ""}
            onClick={() => setActiveTab("Instructions")}>
            Instructions
          </Button>
          <Button
            className={activeTab === "Instructions" ? "" : "active"}
            onClick={() => setActiveTab("Ingredients")}>
            Ingredients
          </Button>
        </InfoButton>
        {activeTab === "Instructions" && (
          <div className="">
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "Ingredients" && (
          <ul className="">
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  display: inline;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
`;

const InfoButton = styled.div`
  display: flex;
`;

export default Recipe;
