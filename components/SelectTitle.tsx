import Link from 'next/link';
import { MutableRefObject, useEffect } from 'react';
import Title from '../types/Title';
import { textColors } from './Settings/FontColor';

interface Props {
  activeTitle?: Title;
  hideSelection: Function;
  textEntry?: MutableRefObject<HTMLTextAreaElement | null>;
  onRemoveTitle: (titleId: string) => void;
  titles: Title[];
}

export default function SelectTitle({
  activeTitle,
  hideSelection,
  textEntry,
  onRemoveTitle,
  titles,
}: Props) {
  const createNew = () => {
    if (textEntry && textEntry.current) {
      textEntry.current.focus();
    }
    hideSelection();
  };

  return (
    <div className="w-1/2 mx-auto flex flex-col items-center">
      <h2 className="text-2xl mt-4 mb-3">Your title creations</h2>
      <section className="flex flex-wrap gap-3">
        {(titles as Title[]).map((title) => (
          <Link key={title.id} href={'/' + title.id}>
            <a className="relative">
              <article
                className={`flex justify-center items-center group border-2 border-solid rounded-lg border-indigo-300/50 hover:bg-indigo-200/10 cursor-pointer shadow-md w-40 h-32 hover:scale-105 transition ease-in-out ${
                  activeTitle && activeTitle.id === title.id
                    ? 'outline outline-offset-2 outline-2 outline-indigo-300/75'
                    : ''
                }`}
              >
                <p
                  className={
                    textColors[title.fontColor] + ' text-sm pb-1 whitespace-pre'
                  }
                >
                  {title.text}
                </p>
                <span
                  onClick={() => onRemoveTitle(title.id)}
                  className="absolute bottom-2 right-0 transition duration-250 opacity-0 group-hover:opacity-100 w-5 h-5 text-gray-600"
                >
                  &times;
                </span>
              </article>
            </a>
          </Link>
        ))}
        <Link href="/" key="new">
          <a onClick={createNew}>
            <article className="flex justify-center items-center border-2 border-solid rounded-lg border-indigo-300/50 hover:bg-indigo-200/10 cursor-pointer shadow-md w-40 h-32 hover:scale-105 transition ease-in-out">
              <p className="text-gray-300 text-4xl pb-2">+</p>
            </article>
          </a>
        </Link>
      </section>
    </div>
  );
}
