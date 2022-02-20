import { useRouter } from 'next/router';
import Create from '../components/Create';
import useLocalStorage from '../hooks/useLocalStorage';
import Title from '../types/Title';

export default function EditTitle<NextPage>() {
  const router = useRouter();
  const { titleId } = router.query;
  const [titles] = useLocalStorage('titles', []);

  const title = titles.find((t: Title) => t.id === titleId);
  if (title) {
    return <Create initialTitle={title} />;
  } else {
    return <h1>Could not find title with this Id</h1>;
  }
}
