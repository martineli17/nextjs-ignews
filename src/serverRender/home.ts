import { GetStaticProps } from "next";
import { StripeApi } from "../services/stripe";

jest.mock("next-auth/client")

export const getStaticPropsHome: GetStaticProps = async() => {
    const price = await StripeApi.prices.retrieve("price_1JYG92AEDAq1nSsVx1yhO6xK");
  
    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat("un-US", {
        style: "currency",
        currency: "USD"
      }).format(price.unit_amount / 100)
    };
  
    return{
      props:{
        product
      },
      revalidate: 60 * 60 * 24
    }
  }