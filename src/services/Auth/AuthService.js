import Shop from "../../models/shop.model"


class AuthService {
    async signUp(name, email, password) {
        try {
            //Step1: Check Email
            const hodelShop = await Shop.findOne({email}).lean()
            
        }catch(err) {
            return {
                code: 2009,
                messsage: err
            }
        }
    }
}