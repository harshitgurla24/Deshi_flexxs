import { useSearchParams } from 'react-router-dom';
import SearchResults from '../components/home/SearchResults';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchResults searchQuery={query} />;
};

export default SearchPage;