import { ChangeEvent } from 'react';
import Rotation from '../../types/Rotation';

interface Props {
  onRotateX: (event: ChangeEvent<HTMLInputElement>) => void;
  onRotateY: (event: ChangeEvent<HTMLInputElement>) => void;
  onRotateZ: (event: ChangeEvent<HTMLInputElement>) => void;
  rotation: Rotation;
}

export default function TextPerspective({
  onRotateX,
  onRotateY,
  onRotateZ,
  rotation,
}: Props) {
  return (
    <>
      <label htmlFor="rotateX" className="block text-sm mt-2">
        {' '}
        x-Rotation <span className="text-xs text-gray-500">({rotation.x})</span>
      </label>
      <input
        className="block"
        type="range"
        id="rotateX"
        name="rotateX"
        min="-180"
        max="180"
        onChange={onRotateX}
        value={rotation.x}
      />
      <label htmlFor="rotateY" className="block text-sm mt-2">
        {' '}
        y-Rotation <span className="text-xs text-gray-500">({rotation.y})</span>
      </label>
      <input
        className="block"
        type="range"
        id="rotateY"
        name="rotateY"
        min="-180"
        max="180"
        onChange={onRotateY}
        value={rotation.y}
      />
      <label htmlFor="rotateZ" className="block text-sm mt-2">
        {' '}
        z-Rotation <span className="text-xs text-gray-500">({rotation.z})</span>
      </label>
      <input
        className="block"
        type="range"
        id="rotateZ"
        name="rotateZ"
        min="-180"
        max="180"
        onChange={onRotateZ}
        value={rotation.z}
      />
    </>
  );
}
