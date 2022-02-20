import { SyntheticEvent } from 'react';
import Title from '../types/Title';

interface Props {
  onSetShowSelectTitle: (event: SyntheticEvent) => void;
  showSelectTitle: boolean;
  titles: Title[];
}

export default function SelectTitleOpener({
  onSetShowSelectTitle,
  showSelectTitle,
  titles,
}: Props) {
  if (!titles || titles.length === 0) return null;

  return (
    <p
      className="cursor-pointer shadow-sm hover:shadow-md transition py-1 rounded-lg flex justify-center items-start"
      onClick={onSetShowSelectTitle}
    >
      <span>Select existing</span>
      <span
        className={`pl-1 leading-4 transition ${
          showSelectTitle ? '-rotate-180 translate-x-1 translate-y-2' : ''
        }`}
      >
        ⌄
      </span>
    </p>
  );
}
