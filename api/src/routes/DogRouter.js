const { Router } = require("express");
const Dog = require("../controllers/Dog");

const router = Router();

router.get("/", Dog.getDogsByName);
router.get("/:id", Dog.getDogById);
router.post("/", Dog.createDog);

module.exports = router;