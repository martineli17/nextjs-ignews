import { GetStaticProps } from "next";
import Head from "next/head";
import { Subscribe } from "../components/Subscribe";
import { getStaticPropsHome } from "../serverRender/home";
import styles from './styles.module.scss';

interface ProductHome {
  priceId: string;
  amount: string;
}

interface HomeProps{
  product: ProductHome
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.News</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <Subscribe/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = getStaticPropsHome;
