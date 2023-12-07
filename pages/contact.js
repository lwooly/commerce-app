import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import {Button, AccessTimeFilledIcon} from '@/components/mui'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import ContactForm from '@/components/forms/ContactForm'



// const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Form</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>Contact</Heading>
        <ContactForm/>
      </Layout>
    </>
  )
}
