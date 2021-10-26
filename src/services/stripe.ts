import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

export const StripeApi = new Stripe(
    process.env.STRIPE_API_KEY,{
        apiVersion: "2020-08-27",
        appInfo:{
            name: "Ignite Chapter 03 - RocketSeat",
            version: "1.0"
        } 
    }
)

export async function CreateCustomer(email: string, name: string): Promise<string>{
   const response = await StripeApi.customers.create({
       email,
       name,
   })
   return response.id;
}

export async function Checkout(idCustomer: string): Promise<string>{
    const response = await StripeApi.checkout.sessions.create({
        customer: idCustomer,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
            { price: "price_1JYG92AEDAq1nSsVx1yhO6xK", quantity: 1 }
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return response.id;
}

export async function GetStripeJs(){
    return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
}