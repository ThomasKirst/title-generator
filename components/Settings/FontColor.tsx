import Colors from '../../types/Colors';

interface Props {
  currentFontColor: string;
  onChangeColor: (color: string) => void;
}

export default function TextColor({ currentFontColor, onChangeColor }: Props) {
  return (
    <div className="flex flex-wrap gap-3 h-40">
      {Object.keys(backgroundColors).map((color) => (
        <div
          className={`cursor-pointer w-8 h-8 ${backgroundColors[color]} px-4 ${
            currentFontColor === color
              ? 'outline outline-2 outline-indigo-300/75 outline-offset-2'
              : ''
          }`}
          key={color}
          onClick={() => onChangeColor(color)}
          style={{ borderRadius: '50%' }}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
}

export const textColors: Colors = {
  black: 'text-black-100',
  darkGray: 'text-gray-700',
  midGray: 'text-gray-500',
  lightGray: 'text-gray-400',
  lighterGray: 'text-gray-200',
  lightestGray: 'text-gray-100',
  brightRed: 'text-red-600',
  coralRed: 'text-red-500',
  pink: 'text-pink-500',
  fuchsia: 'text-fuchsia-500',
  purple: 'text-purple-600',
  violet: 'text-violet-700',
  darkTeal: 'text-teal-600',
  lightTeal: 'text-teal-500',
  turquoiseBlue: 'text-teal-300',
  lightBlue: 'text-sky-500',
  royalBlue: 'text-indigo-500',
  cobaltBlue: 'text-blue-800',
  green: 'text-green-800',
  grassGreen: 'text-green-500',
  lime: 'text-green-400',
  yellow: 'text-yellow-300',
  peach: 'text-orange-300',
  orange: 'text-orange-400',
};

const backgroundColors: Colors = {
  brightRed: 'bg-red-600',
  coralRed: 'bg-red-500',
  pink: 'bg-pink-500',
  fuchsia: 'bg-fuchsia-500',
  purple: 'bg-purple-600',
  violet: 'bg-violet-700',
  darkTeal: 'bg-teal-600',
  lightTeal: 'bg-teal-500',
  turquoiseBlue: 'bg-teal-300',
  lightBlue: 'bg-sky-500',
  royalBlue: 'bg-indigo-500',
  cobaltBlue: 'bg-blue-800',
  green: 'bg-green-800',
  grassGreen: 'bg-green-500',
  lime: 'bg-green-400',
  yellow: 'bg-yellow-300',
  peach: 'bg-orange-300',
  orange: 'bg-orange-400',
  black: 'bg-black',
  darkGray: 'bg-gray-700',
  midGray: 'bg-gray-500',
  lightGray: 'bg-gray-400',
  lighterGray: 'bg-gray-200',
  lightestGray: 'bg-gray-100',
};
