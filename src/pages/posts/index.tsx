import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { getStaticPropsPosts } from "../../serverRender/posts";
import styles from './styles.module.scss';

interface Post {
    id: string;
    title: string;
    summary: string;
    updateAt: string;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | ig.News</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <a>
                                <time>{post.updateAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.summary}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = getStaticPropsPosts;