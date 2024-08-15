import { SearchPage } from './components/shows';

export const metadata = {
  title: 'TV shows',
  icons: {
    icon: '/icon.png',
  },
};

export default async function Page() {
  return (
    <div>
      <SearchPage />
    </div>
  );
}
