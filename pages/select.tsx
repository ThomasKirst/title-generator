import { SyntheticEvent, useEffect, useState } from 'react';
import SelectTitle from '../components/SelectTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import { removeTitle } from '../lib/api';
import Title from '../types/Title';

export default function Select() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [titlesLocallySaved] = useLocalStorage('titles', []);

  useEffect(() => setTitles(titlesLocallySaved), [titlesLocallySaved]);

  return (
    <main className="container mx-auto pt-8">
      <SelectTitle
        onRemoveTitle={removeTitle}
        titles={titles}
        setTitles={setTitles}
      />
    </main>
  );
}
