import { Person } from "@/types/api/search";
import React from "react";

const PersonDetails: React.FC<{ data: Person }> = ({ data }) => {
  return (
    <>
      <p>Birth Year: {data.birthYear}</p>
      <p>Gender: {data.gender}</p>
      <p>Eye Color: {data.eyeColor}</p>
      <p>Hair Color: {data.hairColor}</p>
      <p>Height: {data.height}</p>
      <p>Mass: {data.mass}</p>
    </>
  );
};

export default PersonDetails;
