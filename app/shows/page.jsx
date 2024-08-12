import { SearchPage } from './components/shows';

export const metadata = {
  title: 'TV shows',
};

export default async function Page() {
  return (
    <div>
      <SearchPage />
    </div>
  );
}
