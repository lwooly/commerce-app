import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import ProductForm from '@/components/forms/ProductForm';
// import { HOST } from '@/lib/tq/products/api';
import { getProductFromDB } from '@/lib/api-functions/server/products/queries';
import { useUpdateProduct } from '@/lib/tq/products/mutations';

export default function UpdateProduct({ ssd }) {
  const router = useRouter();
  const updateMutation = useUpdateProduct();

  const updateHandler = (data) => {
    updateMutation.mutate(data);
    router.push('/admin/products');
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
        <Heading component="h1">Update Product</Heading>
        <ProductForm product={ssd} submitHandler={updateHandler} />
        {/* ssd to autofill form for update */}
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const product = await getProductFromDB(params.id).catch((err) => {
    console.log(err);
  });
  return {
    props: {
      ssd: JSON.parse(JSON.stringify(product)),
    },
  };
};
