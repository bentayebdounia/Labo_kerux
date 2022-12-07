const {Router} = require("express")
const stock = require ("../controller/controller.stock")
const router = Router()

router.post("/ajouterStock", stock.ajouterStock)
router.put("/modifierStock/:id_stock", stock.modifierStock)


module.exports = router