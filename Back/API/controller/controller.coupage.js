const pool =require ("../db")
const queries= require("../queries/queries.coupage")
const q= require("../queries/queries")

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
const TimeNow = () => {
    var today = new Date 
    heure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()+ ':' + today.getMilliseconds()
    console.log("heure "+heure );
    return heure
}
const generieIdCoupage = (fk_proditFourni, etape ) => {
    
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (fk_proditFourni+"-"+spl[0]+spl[1]+"-"+dateNow()+" "+TimeNow())  
    return id
}

ajouterProcessCoupage =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    
    const { categorie, nom_produit, etape, poids, nombre, id_nettoyage, fk_proditFourni } = req.body
    var id_gnerate = generieIdCoupage(fk_proditFourni,etape)
    pool.query(queries.ajouterProcessCoup, [categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni, id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         })
    pool.query(queries.ajouterProcessCoupHist, [categorie, nom_produit, etape, poids, nombre, datee, heure, id_nettoyage, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error
        res.status(200)
    })
}
modifierProcessCoupage = (req, res) => {
    const id_coupage = parseInt(req.params.id_coupage)
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessCoup,[fk_stock , id_coupage],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process coupage bien modifier ")
        })
    pool.query(queries.ModifyProcessCoupHist,[fk_stock , id_coupage],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process coupage bien modifier ")
        })
}

getProcessId = (req, res) => {
    const id = req.params.id_gnerate
    pool.query(queries.getProcessByIdSortie, [id], 
        (error, result) => {
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else{
                pool.query(queries.getProcessbyIdNettoyage, [id], 
                    (error, resultat) => {
                        const notExiste = resultat.rows.length
                        if (!notExiste) {
                            res.status(200).json(result.rows[0])

                        }
                         else res.send("box deja couper")   
                    })


            }
            
            
    })

    
    
}

ajouterBoxCoupage = (req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    const {id_produit , id_enregistrement, id_nettoyage, id_generate} = req.body
    pool.query(queries.ajouterBox_couper, [id_produit , id_enregistrement, id_nettoyage, id_generate, datee, heure],
        (error, resultat) => {
            if (error) throw error 
            res.status(200).json(resultat.rows[0])
        }
        )
}

getProcessByDateHeure = (req, res) => {
    pool.query(q.getProcessBydateHeure, ['coupage'],
    (error, result) => {
         res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(q.getProcessByEtapes_categorie, ['coupage', categorie], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(q.getProcessByEtapes_produit, ['coupage', nom_produit], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(q.getProcessByEtapes_idGnerate, ['coupage', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}

module.exports = {
    ajouterProcessCoupage,
    ajouterBoxCoupage,
    modifierProcessCoupage,
    getProcessId,
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate

}