import Head from 'next/head';
import { useContext } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Button } from '@/components/mui';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from '@/components/QueryBoundary';
import ProductList from '@/components/ProductList';
import { getProductsFromDB } from '@/lib/api-functions/server/products/queries';
import { STORAGE_KEY } from '@/lib/tq/products/settings';
import { UIContext } from '@/components/contexts/UI.context';

export default function Home() {
  const { showMessage } = useContext(UIContext);

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Home Page</Heading>
        <Button
          variant="contained"
          onClick={() =>
            showMessage({
              type: 'error',
              string: 'test message',
            })
          }
        >
          Alert
        </Button>
        <QueryBoundaries>
          <ProductList />
        </QueryBoundaries>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const products = await getProductsFromDB().catch((err) => console.log(err));
  const queryClient = new QueryClient();

  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products)),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
