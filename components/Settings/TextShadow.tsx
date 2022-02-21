import { ChangeEvent } from 'react';

interface Props {
  onToggleShadow: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextShadow({ onToggleShadow }: Props) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="shadow"
          className="mr-2"
          onChange={onToggleShadow}
        />
        Shadow
      </label>
    </div>
  );
}
