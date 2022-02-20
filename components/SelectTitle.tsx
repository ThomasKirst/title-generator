import Link from 'next/link';
import Title from '../types/Title';
import { textColors } from './FontColor';

export default function SelectTitle({
  activeTitle,
  titles,
}: {
  activeTitle?: Title;
  titles: Title[];
}) {
  return (
    <>
      <h2 className="text-2xl mt-2 mb-3">Your title creations</h2>
      <section className="flex flex-wrap gap-3">
        {(titles as Title[]).map((title) => (
          <Link key={title.id} href={'/' + title.id}>
            <a>
              <article
                className={`flex justify-center items-center border-2 border-solid rounded-lg border-indigo-300/50 hover:bg-indigo-200/10 cursor-pointer shadow-md w-32 h-24 hover:scale-105 transition ease-in-out ${
                  activeTitle && activeTitle.id === title.id
                    ? 'outline outline-offset-2 outline-2 outline-indigo-300/75'
                    : ''
                }`}
              >
                <p className={textColors[title.fontColor] + ' pb-1'}>
                  {title.text}
                </p>
              </article>
            </a>
          </Link>
        ))}
        <Link href="/">
          <a>
            <article className="flex justify-center items-center border-2 border-solid rounded-lg border-indigo-300/50 hover:bg-indigo-200/10 cursor-pointer shadow-md w-32 h-24 hover:scale-105 transition ease-in-out">
              <p className="text-gray-300 text-4xl pb-2">+</p>
            </article>
          </a>
        </Link>
      </section>
    </>
  );
}
