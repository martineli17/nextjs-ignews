import { GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSidePropsPost } from "../../serverRender/posts";
import styles from './post.module.scss';

interface PostProps {
    post: {
        title: string;
        content: string;
        updateAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | ig.News</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={styles.postContent} 
                        dangerouslySetInnerHTML={{ __html: post.content }}/>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsPost;