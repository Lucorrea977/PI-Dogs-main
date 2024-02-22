const { Router } = require("express");
const Temperament = require("../controllers/Temperament");

const router = Router();

router.get("/", Temperament.getTemperaments);

module.exports = router;