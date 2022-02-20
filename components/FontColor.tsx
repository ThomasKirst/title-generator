import Colors from '../types/Colors';

interface Props {
  onChangeColor: (color: string) => void;
}

export default function TextColor({ onChangeColor }: Props) {
  const backgroundColors: Colors = {
    black: 'bg-black',
    cyan: 'bg-cyan-500',
    teal: 'bg-teal-500',
    yellow: 'bg-yellow-500',
    violet: 'bg-violet-500',
    pink: 'bg-pink-800',
  };

  return (
    <div className="flex">
      {Object.keys(backgroundColors).map((color) => (
        <div
          className={`cursor-pointer w-8 h-8 ${backgroundColors[color]} px-4 mr-2`}
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
