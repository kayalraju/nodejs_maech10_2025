const HttpStatusCode = require("../helper/StatusCode");
const  {JoiModel, JoiSchemaValidation} = require("../model/joiModel"); 


class  JoiController {
    async Joidata(req, res) {
        try {
            const data={
                name: req.body.name,
                email: req.body.email,
                city: req.body.city
            }
            const{error,value}=JoiSchemaValidation.validate(data);
            if(error){
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    status: false,
                    message: error.details[0].message
                });
            }else{
                const joiData = await JoiModel.create(value);
                res.status(HttpStatusCode.CREATED).json({
                    status: true,
                    message: "Data created successfully",
                    data: joiData
                });
            }
           
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                status: "error",
                message: error.message
            });
        }
    }
}


module.exports = new JoiController();