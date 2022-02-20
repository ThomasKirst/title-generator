interface Props {
  onIncreaseSize: (size: string) => void;
  text: string;
}

export default function FontSize({ onIncreaseSize, text = '' }: Props) {
  return (
    <div className="flex">
      {['S', 'M', 'L', 'XL'].map((size) => (
        <button
          key={size}
          onClick={() => onIncreaseSize(size)}
          className={`border ${
            text ? 'bg-indigo-500' : 'bg-indigo-300'
          } rounded-md text-lg text-white px-4 py-2`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
