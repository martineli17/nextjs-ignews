import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { Subscribe } from "../../../components/Subscribe";
import { getStaticPathsPost, getStaticPropsPost } from "../../../serverRender/posts";
import styles from '../post.module.scss';

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string;
        updateAt: string;
    }
}

export default function PostPreview({ post }: PostProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.haveSubscription){
            router.push(`/posts/${post.id}`);
            return;
        }
    },[session])

    return (
        <>
            <Head>
                <title>{post.title} | ig.News</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={`${styles.postContent} ${styles.postContentPreview}`} 
                        dangerouslySetInnerHTML={{ __html: post.content }}/>
                </article>
            </main>
            <button className={styles.buttonSubscribe}
                onClick={() => router.push("/")}>
                Do you want continue reading? So, subscribe now!
            </button>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = getStaticPathsPost;
export const getStaticProps: GetStaticProps = getStaticPropsPost;