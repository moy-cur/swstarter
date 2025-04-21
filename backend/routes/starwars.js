const express = require("express");
const router = express.Router();
const controller = require("../controllers/starwars");
const { param } = require("express-validator");

router.get("/films/:name", controller.getFilms);

router.get("/people/:name", controller.getPeople);

router.get("/people/detail/:id", controller.getPersonDetail);

router.get("/films/detail/:id", controller.getFilmDetail);

module.exports = router;
