import Sizes from '../../types/Sizes';

interface Props {
  onIncreaseSize: (size: string) => void;
  text: string;
  sizes: Sizes;
}

export default function FontSize({ onIncreaseSize, sizes, text = '' }: Props) {
  return (
    <div className="flex">
      {Object.keys(sizes)
        .filter((size) => size !== 'default')
        .map((size) => (
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
