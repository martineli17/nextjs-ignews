import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Checkout, CreateCustomer } from "../../services/stripe";
import { GetAsync, UpdateAsync } from "../../services/userDataBase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if(req.method === "POST"){
            const session = await getSession({ req });
            let user = await GetAsync(session.user.email);

            if(!user.data.idStripe){
                const customerStripeId = await CreateCustomer("teste@teste.com", "Teste");
                user.data.idStripe = customerStripeId;
                if(!await UpdateAsync(user))
                return res.status(400);
            }
            const responseCheckoutId = await Checkout(user.data.idStripe);
            return res.status(200).json({ checkoutId: responseCheckoutId });
        }
    } catch (error) {
        return res.status(500);
    }
    
}