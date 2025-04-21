const { getData, getDetail, getMultipleData } = require("../services/starwars");
const { validationResult } = require("express-validator");
const { saveStat } = require("../services/stats");

exports.getFilms = async (req, res, next) => {
  const errors = validationResult(req);
  const response = [];
  const start = Date.now();

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const filmName = req.params.name;
  const results = await getData("films", filmName);

  const responseTime = Date.now() - start;

  saveStat({ query: filmName, type: "films", responseTimeMs: responseTime });

  if (!results) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  for (let result of results) {
    const characters = result.characters.map((c) => {
      let arr = c.split("/");
      return arr[arr.length - 2];
    });
    response.push({
      title: result.title,
      id: result.url.split("/")[result.url.split("/").length - 2],
    });
  }

  return res.json(response);
};

exports.getPeople = async (req, res, next) => {
  const errors = validationResult(req);
  const response = [];
  const start = Date.now();
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const personName = req.params.name;
  const results = await getData("people", personName);

  const responseTime = Date.now() - start;

  saveStat({ query: personName, type: "people", responseTimeMs: responseTime });

  if (!results) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  for (let result of results) {
    const films = result.films.map((c) => {
      let arr = c.split("/");
      return arr[arr.length - 2];
    });
    response.push({
      id: result.url.split("/")[result.url.split("/").length - 2],
      name: result.name,
    });
  }

  return res.json(response);
};

exports.getFilmDetail = async (req, res, next) => {
  const errors = validationResult(req);
  const start = Date.now();
  let response = {};
  let characterIds = [];
  let characters = [];
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const filmId = req.params.id;
  const results = await getDetail("films", filmId);

  const responseTime = Date.now() - start;

  saveStat({ query: filmId, type: "films", responseTimeMs: responseTime });

  if (!results) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  for (let character of results.characters) {
    let arr = character.split("/");
    let id = arr[arr.length - 2];
    characterIds.push(id);
  }
  const char = await getMultipleData("people", characterIds);

  for (let i = 0; i < char.length; i++) {
    characters.push({ id: characterIds[i], name: char[i].name });
  }

  response = {
    title: results.title,
    openingCrawl: results.opening_crawl,
    characters,
  };

  return res.json(response);
};

exports.getPersonDetail = async (req, res, next) => {
  const errors = validationResult(req);
  const start = Date.now();
  let response = {};
  let filmsIds = [];
  let films = [];
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const personId = req.params.id;
  const results = await getDetail("people", personId);

  const responseTime = Date.now() - start;

  saveStat({ query: personId, type: "people", responseTimeMs: responseTime });

  if (!results) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  for (let film of results.films) {
    let arr = film.split("/");
    filmsIds.push(arr[arr.length - 2]);
  }

  const filmsResponse = await getMultipleData("films", filmsIds);

  for (let i = 0; i < filmsResponse.length; i++) {
    films.push({ id: filmsIds[i], title: filmsResponse[i].title });
  }

  response = {
    name: results.name,
    birthYear: results.birth_year,
    gender: results.gender,
    eyeColor: results.eye_color,
    hairColor: results.hair_color,
    height: results.height,
    mass: results.mass,
    films,
  };

  return res.json(response);
};
