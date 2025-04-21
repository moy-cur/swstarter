import React, { useState } from "react";
import styled from "styled-components";

import PrimaryButton from "@components/ui/PrimaryButton";
import TextInput from "@components/ui/TextInput";
import Radio from "@components/ui/Radio";
import Card from "@components/ui/Card";

const SearchBox: React.FC<{
  loading: boolean;
  onSearch: (type: string, name: string) => void;
}> = ({ loading, onSearch }) => {
  const [input, setInput] = useState("");
  const [type, setType] = useState("people");

  const handleSearch = () => {
    if (loading) return;
    onSearch(type, input);
  };

  return (
    <Card>
      <Container>
        <StyledText>What are you searching for?</StyledText>
        <RadiosContainer>
          <Radio
            label="People"
            id="people"
            name="type"
            type="radio"
            value="people"
            checked={type === "people"}
            onChange={(e) => setType(e.target.value)}
          />

          <Radio
            label="Movies"
            id="films"
            name="type"
            type="radio"
            value="films"
            checked={type === "films"}
            onChange={(e) => setType(e.target.value)}
          />
        </RadiosContainer>
        <TextInput
          type="text"
          placeholder="e.g. Chewbacca, Yoda, Boba Fett"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <PrimaryButton disabled={!input} onClick={handleSearch}>
          {loading ? "SEARCHING..." : "SEARCH"}
        </PrimaryButton>
      </Container>
    </Card>
  );
};

export default SearchBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  width: 352px;
`;

const RadiosContainer = styled.div`
  display: flex;
  gap: 20px;
  color: black;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const StyledText = styled.p`
  color: #383838;
  font-weight: 600;
  text-align: left;
`;
