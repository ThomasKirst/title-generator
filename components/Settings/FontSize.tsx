import Sizes from '../../types/Sizes';

interface Props {
  onIncreaseSize: (size: string) => void;
  text: string;
  sizes: Sizes;
}

export const sizes: Sizes = {
  S: 'text-2xl',
  M: 'text-4xl',
  L: 'text-6xl',
  XL: 'text-8xl',
  XXL: 'text-9xl',
  default: 'text-6xl',
};

export default function FontSize({ onIncreaseSize, text = '' }: Props) {
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
