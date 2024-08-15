import { SearchPage } from './components/shows';
import Head from 'next/head';

export const metadata = {
  title: 'TV shows',
};

export default async function Page() {
  return (
    <div>
      <Head>
        <title>TV shows</title>
        <link rel="icon" href="/show-favicon.ico" />
      </Head>
      <SearchPage />
    </div>
  );
}
