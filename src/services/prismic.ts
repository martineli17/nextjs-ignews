import Prismic from '@prismicio/client';

export function CreatePrismicClient(req?: unknown){
    const client = Prismic.client(
        process.env.PRISMIC_URL,
        {
            req,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        }
    );
    return client;
}