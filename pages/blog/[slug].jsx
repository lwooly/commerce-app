
import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'

export default function SinglePost() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>Single Post</Heading>
      </Layout>
    </>
  )
}

const getStaticProps = () => {}