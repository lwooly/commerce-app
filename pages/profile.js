import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import { getSession , withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, AccessTimeFilledIcon } from '@/components/mui';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import { UIContext, UIProvider } from '@/components/contexts/UI.context';
import Paragraph from '@/components/Paragraph';
import UserDisplay from '@/components/UserDisplay';
import settings from '@/lib/api-functions/server/permissions';

export default function Profile({ user }) {
  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Profile Page</Heading>
        <UserDisplay ssd={user} />
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
