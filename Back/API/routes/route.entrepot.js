const {Router} = require("express")
const entrepot = require ("../controller/controller.entrepot")
const router = Router()

router.post("/ajouterEntrepot",entrepot.ajouterEntrepot)
router.get("/getEntrepot/",entrepot.getEntrepot)


module.exports = router