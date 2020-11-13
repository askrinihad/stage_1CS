const CompteWeb =require("../models/compteWeb")
const CompteMob=require("../models/compteMob")
const Service =require("../models/service")
const Secteur =require("../models/secteur")


class compteController {
   
   
    static async loginWeb(req,res){
        const user = await CompteWeb.findOne({username:req.body.username})
        .then((user) =>{
            console.log(user)
            if(user== null)
            {   console.log("nom d'utilisateur n'existe pas")
                return res.status(403).send({message:"nom d'utilisateur n'existe pas"})
                }
            else{
                       
                     
                            if (req.body.password==user.password) {
                                console.log("welcom")
                                console.log(user)
                                return res.send({message:"welcom "+ user.username})
                                
                            } 
                            else {
                                console.log("Mot de passe incorrect")
                                return res.status(403).send({message:"Mot de passe incorrect"})
                            }
            
                        

                    
               
                
            }


        })
    }
///////////////////////Login mobile/////////////////////////
static async loginMob(req,res){
    var user = await CompteMob.findOne({username:req.body.username})
    .then((user) =>{
        console.log("i'm the user "+user)
        if(user== null)
        { console.log("nom d'utilisateur n'existe pas")
          res.send({message:"nom d'utilisateur n'existe pas"})
        }
        else{
            
                    if (req.body.password==user.password) {
                        console.log("welcom")
                        console.log(user)
                        return res.send({message:"welcom "+ user.username})
                    } 
                    else {
                        console.log("Mot de passe incorrect")
                        return res.send({message:"Mot de passe incorrect"})
                    }
    
            
        }


    })
}

////////////Ajouter compte//////////////////////
static async ajouter(req,res){
   
const secteur = await Secteur.findOne({name:req.body.nameSe})
if(secteur!=null)
{
                
        const user = new CompteMob({
        username: req.body.username,
        password: req.body.password,
        nameSe: req.body.nameSe,
      
           });
            user.save()
            .then(()=>  res.send({message:"compte ajouté"}))
            .catch(err => {
              
                  res.send({message:"echec de sauvegarde"});
                })
                
                
               
          
}
else{
    res.send({message:"ce secteur n'existe pas" })
}
  
   
   
}
   
}
 module.exports = compteController