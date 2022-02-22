import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SelectTitle from '../components/SelectTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import { deleteTitle } from '../lib/api';
import Title from '../types/Title';

export default function Select() {
  const [titles, setTitles] = useLocalStorage<Title[]>('titles', []);
  const [selectTitles, setSelectTitles] = useState<Title[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (titles.length === 0) router.push('/');
    setSelectTitles(titles);
  }, [titles, router]);

  const removeTitle = async (titleId: string) => {
    await deleteTitle(titleId, setTitles);
    router.push('/select');
  };

  return (
    <main className="container mx-auto pt-8">
      <SelectTitle onRemoveTitle={removeTitle} titles={selectTitles} />
    </main>
  );
}
