import { ChangeEvent } from 'react';
import Position from '../../types/Position';

interface Props {
  position: Position;
  onMoveX: (event: ChangeEvent<HTMLInputElement>) => void;
  onMoveY: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextPosition({ onMoveX, onMoveY, position }: Props) {
  return (
    <>
      <label htmlFor="xpos" className="block text-sm">
        {' '}
        x-Pos <span className="text-xs text-gray-500">({position.x})</span>
      </label>
      <input
        className="block"
        type="range"
        id="xpos"
        name="xpos"
        min="-600"
        max="600"
        onChange={onMoveX}
        value={position.x}
      />
      <label htmlFor="ypos" className="block text-sm mt-2">
        {' '}
        y-Pos <span className="text-xs text-gray-500">({position.y})</span>
      </label>
      <input
        className="block"
        type="range"
        id="ypos"
        name="ypos"
        min="-600"
        max="600"
        onChange={onMoveY}
        value={position.y}
      />
    </>
  );
}
