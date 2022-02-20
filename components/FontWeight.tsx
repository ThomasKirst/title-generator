interface Props {
  onChangeFontWeight: (weight: string) => void;
  text: string;
}

export default function FontWeight({ onChangeFontWeight, text = '' }: Props) {
  return (
    <div className="flex">
      {['thin', 'normal', 'semibold', 'bold'].map((weight) => (
        <button
          key={weight}
          onClick={() => onChangeFontWeight(weight)}
          className={`border ${
            text ? 'bg-indigo-500' : 'bg-indigo-300'
          } rounded-md text-sm text-white px-3 py-2`}
        >
          {weight}
        </button>
      ))}
    </div>
  );
}
