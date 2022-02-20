import SelectTitle from '../components/SelectTitle';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Select() {
  const [titles] = useLocalStorage('titles', []);
  return (
    <main className="container mx-auto pt-8">
      <SelectTitle titles={titles} />
    </main>
  );
}
