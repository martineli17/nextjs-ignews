import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { CreatePrismicClient } from "../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";
import { getSession } from "next-auth/client";

export const getStaticPropsPosts: GetStaticProps = async () => {
    const prismicClient = CreatePrismicClient();
    const response = await prismicClient.query([Prismic.predicates.at("document.type", "posts")],
        {
            fetch: ["posts.title", "posts.content"],
            pageSize: 100,
        });
        
    const posts = response.results.map(post => {
        return{
            id: post.uid,
            title: RichText.asText(post.data.title),
            summary: post.data.content.find(x => x.type === "paragraph")?.text ?? "",
            updateAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        }
    });
    return {
        props: {
            posts
        },
        revalidate: 60 * 60 * 2
    }
}

export const getServerSidePropsPost: GetServerSideProps = async ({req,params}) => {
    const prismicClient = CreatePrismicClient(req);
    const {id: idPost} = params;
    const session = await getSession({req});
    if(!session?.haveSubscription){
        return{
            redirect:{
                destination: "/",
                permanent: false,
            }
        }
    }
    const response = await prismicClient.getByUID("posts", String(idPost), {});
    const post = {
        id: idPost,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }
    return {
        props: {
            post
        }
    }
}

export const getStaticPathsPost: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}


export const getStaticPropsPost: GetStaticProps = async ({params}) => {
    const prismicClient = CreatePrismicClient();
    const {id: idPost} = params;
    const response = await prismicClient.getByUID("posts", String(idPost), {});
    const post = {
        id: idPost,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updateAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    }
    return {
        props: {
            post
        }
    }
}