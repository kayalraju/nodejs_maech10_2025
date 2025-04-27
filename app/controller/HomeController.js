

class HomeController{

   async homepage(req,res){
    try{

        res.render('home',{
            title:"home page",
            student:{
                name:"sachin",
                age:23
            }
        })

    }catch(err){
        console.log(err)
        
    }
}

    async aboutpage(req,res){
        try{

            res.render('about',{
                title:"about page",
                data:{
                    name:"sachin",
                    age:23
                }
                
            })

        }catch(err){
            console.log(err)
            
        }
    }
   
}

module.exports = new HomeController();