import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Create from '../components/Create';
import useLocalStorage from '../hooks/useLocalStorage';
import Title from '../types/Title';

export default function EditTitle() {
  const router = useRouter();
  const { titleId } = router.query;
  const [initialTitle, setInitialTitle] = useState<Title | null>(null);
  const [titlesSavedLocally] = useLocalStorage('titles', []);

  useEffect(() => {
    const fetchTitle = async (titleId: string) => {
      const response = await fetch('/api/titles/' + titleId);
      const title = await response.json();
      setInitialTitle(title);
    };
    setInitialTitle(titlesSavedLocally.find((t: Title) => t.id === titleId));
    titleId && typeof titleId === 'string' && fetchTitle(titleId);
  }, [titleId, titlesSavedLocally]);

  if (initialTitle) {
    return <Create initialTitle={initialTitle} />;
  } else {
    return <h1>Could not find title with this Id</h1>;
  }
}
