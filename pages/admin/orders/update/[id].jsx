import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import OrderForm from '@/components/forms/OrderForm';
import { HOST } from '@/lib/tq/orders/api';
import { getOrderFromDB } from '@/lib/api-functions/server/orders/queries';
import { useUpdateOrder } from '@/lib/tq/orders/mutations';

export default function UpdateOrder({ ssd }) {
  const router = useRouter();
  const updateMutation = useUpdateOrder();

  const updateHandler = (data) => {
    updateMutation.mutate(data);
    router.push('/admin/orders');
  };

  return (
    <>
      <Head>
        <title>Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h1">Update Order</Heading>
        <OrderForm Order={ssd} submitHandler={updateHandler} />
        {/* ssd to autofill form for update */}
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const Order = await getOrderFromDB(params.id).catch((err) => {
    console.log(err);
  });
  return {
    props: {
      ssd: JSON.parse(JSON.stringify(Order)),
    },
  };
};
