const pool =require ("../db")
const queries= require("../queries/queries")


const dateNow = () => {
    var today = new Date 
    datee = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate()
    console.log("dateeee "+datee );
    return datee
}

const HeureNow = () => {
    var today = new Date 
    heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    console.log("heure "+heure );
    return heure
}
ajouterStock = (req, res) => {
    var date_entree = dateNow()
    const  {fk_entrepot} = req.body
    pool.query(queries.ajouterStock, [date_entree, fk_entrepot] ,
             (error, result) =>{
                if (error) throw error
                res.status(200).json(result.rows[0])
             })
}

modifierStock =(req, res) => {
    const id_stock = req.params.id_stock
    date_sortie = dateNow()
    const { poids_sortie } = req.body
    pool.query(queries.ModifyStock, [date_sortie, poids_sortie, id_stock ] ,
        (error, result) =>{
           if (error) throw error
           res.status(200).send("stock bien modifier")
        })
}

module.exports = {
    ajouterStock,
    modifierStock,

}