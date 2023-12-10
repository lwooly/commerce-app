import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, AccessTimeFilledIcon} from '@/components/mui'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import Paragraph from '@/components/Paragraph'
import QueryBoundary from '@/components/QueryBoundary'
import ProductList from '@/components/ProductList'
import { getProductsFromDB } from '@/lib/api-functions/server/products/queries'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { STORAGE_KEY } from '@/lib/tq/products/settings'


export default function Home() {

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component={'h2'}>Home Page</Heading>
        <QueryBoundary>
          <ProductList/>
        </QueryBoundary>
      </Layout>
    </>
  )
}

export const getStaticProps = async (context) => {
  const products = await getProductsFromDB().catch((err) => console.log(err))
  const queryClient = new QueryClient()

  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products))
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


