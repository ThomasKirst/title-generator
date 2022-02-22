import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Create from '../components/Create';
import Title from '../types/Title';

export default function EditTitle() {
  const router = useRouter();
  const { titleId } = router.query;
  const [initialTitle, setInitialTitle] = useState<Title | null>(null);

  useEffect(() => {
    const fetchTitle = async (titleId: string) => {
      const response = await fetch('/api/titles/' + titleId);
      const title = await response.json();
      setInitialTitle(title);
    };

    if (titleId && typeof titleId === 'string') {
      fetchTitle(titleId);
    }
  }, [titleId]);

  if (initialTitle) {
    return <Create initialTitle={initialTitle} />;
  } else {
    return <h1>Could not find title with this Id</h1>;
  }
}
