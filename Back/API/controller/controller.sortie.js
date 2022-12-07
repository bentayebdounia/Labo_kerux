const pool =require ("../db")
const queries= require("../queries/queries.sortie")
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

const generieIdNettoyage = (fk_proditFourni, etape ) => {
    
    
    const spl = etape.split('')
    console.log(spl[0]+spl[1])
    var id = (fk_proditFourni+"-"+spl[0]+spl[1]+"-"+dateNow()+" "+TimeNow())  
    return id
}

ajouterProcessSortie =(req, res) => {
    var datee = dateNow()
    var heure = HeureNow()
    const { categorie, nom_produit, etape, poids, nombre, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement,  fk_proditFourni } = req.body
    var id_gnerate = generieIdNettoyage(fk_proditFourni,etape)

    
    
        //console.log(id[i]);
       
     /*   
    pool.query(queries.ajouterProcessSortie, [ categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement,  fk_proditFourni, id_gnerate ] ,
         (error, result) =>{
            if (error) throw error
            res.status(200).json(result.rows[0])
         }) */
    pool.query(queries.ajouterProcessSortieHist, [ categorie, nom_produit, etape, poids, nombre, datee, heure, id_enregistrement, id_nettoyage, id_coupage, id_conditionnement, fk_proditFourni, id_gnerate ] ,
    (error, result) =>{
        if (error) throw error
        res.status(200).json(result.rows[0])
    })
}

const supprimerProcess = (req, res) => {
    var id = [id_enregistrement, id_nettoyage, id_coupage]
    console.log(id)
    pool.query(queries.supprimerProcess, id_enregistrement, 
        (error, result) =>{
            if (error) throw error }
        
        )

}

modifierProcessSortie = (req, res) => {
    const id_sortie = req.params.id_sortie
    const {fk_stock} = req.body
    pool.query(queries.ModifyProcessSortie,[fk_stock , id_sortie],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process sortie bien modifier ")
        })
    pool.query(queries.ModifyProcessSortie,[fk_stock , id_sortie],
        (error, result) =>{
            if (error) throw error
            res.status(200).send("process sortie bien modifier ")
        })
}

getProcessId = (req, res) => {
    const id = req.params.id_gnerate
    console.log(id)
    pool.query(queries.getProcessByIdSortie, [id], 
        (error, result) => {
            const notExiste = result.rows.length
            if (!notExiste) {
                res.send("ID n'existe pas")
            }
            else{
                pool.query(queries.getProcessbyIdConitionnement, [id], 
                    (error, resultat) => {
                        const notExiste = resultat.rows.length
                        if (!notExiste) {
                            res.status(200).json(result.rows[0])
                        }
                         else res.send("box deja sortie")   
                    })


            }
            
            
    })
    
}

getProcessByDateHeure = (req, res) => {
    pool.query(q.getProcessBydateHeure, ['sortie'],
    (error, result) => {
         res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_categorie = (req, res) => {
    const categorie = req.params.categorie
    pool.query(q.getProcessByEtapes_categorie, ['sortie', categorie], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_produit = (req, res) => {
    const nom_produit = req.params.nom_produit
    pool.query(q.getProcessByEtapes_produit, ['sortie', nom_produit], 
        (error, result) => {
            res.status(200).json(result.rows)
    }
    )
}

getProcessByEtapes_idGnerate = (req, res) => {
    const id_gnerate = req.params.id_gnerate
    pool.query(q.getProcessByEtapes_idGnerate, ['sortie', id_gnerate], 
        (error, result) => {
            res.status(200).json(result.rows)  
    }
    )
}

module.exports = {
    ajouterProcessSortie,
    modifierProcessSortie,
    getProcessId,
    getProcessByDateHeure,
    getProcessByEtapes_categorie,
    getProcessByEtapes_produit,
    getProcessByEtapes_idGnerate
    

}