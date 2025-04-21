export type SearchResponse = SearchItem[];

export type SearchItem =
  | (Person & { type: "people" })
  | (Film & { type: "films" });

export type Person = {
  id: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  films: { id: string; title: string }[];
};

export type Film = {
  id: string;
  title: string;
  openingCrawl: string;
  characters: { id: string; name: string }[];
};
