import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from '@/modules/builder/BuilderLayout';

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Resume Builder</title>
        <meta name="description" content="Build your professional resume in minutes" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <BuilderLayout />
    </div>
  );
};

export default HomePage;
