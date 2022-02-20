import { SyntheticEvent, useEffect, useState } from 'react';
import SelectTitle from '../components/SelectTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import Title from '../types/Title';

export default function Select() {
  const [titles, setTitles] = useState([]);
  const [titlesLocallySaved, saveTitlesLocally] = useLocalStorage('titles', []);

  useEffect(() => setTitles(titlesLocallySaved), [titlesLocallySaved]);

  const removeTitle = (event: SyntheticEvent, titleId: string) => {
    event.stopPropagation();
    event.preventDefault();
    saveTitlesLocally(titles.filter((t: Title) => t.id !== titleId));
  };

  return (
    <main className="container mx-auto pt-8">
      <SelectTitle onRemoveTitle={removeTitle} titles={titles} />
    </main>
  );
}
