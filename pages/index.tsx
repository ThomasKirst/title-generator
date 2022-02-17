import type { NextPage } from 'next';
import { SyntheticEvent, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [text, setText] = useState<string>('');

  const inputField = useRef<HTMLTextAreaElement | null>(null);

  const applyText = (event: SyntheticEvent) => {
    if (inputField && inputField.current) {
      setText(inputField?.current?.value);
    }
  };

  return (
    <div className="container mx-auto flex pt-4 pl-4 h-screen">
      <main className="flex-initial w-9/12 h-full">
        <h1 className="text-3xl">Title Generator</h1>
        <section className="flex items-center justify-center h-full">
          <h2 className="text-4xl">{text}</h2>
        </section>
      </main>
      <aside className="flex-none w-3/12">
        <h2 className="text-2xl mb-4">Settings</h2>

        <label className="block font-semibold text-1xl">Text</label>
        <textarea
          ref={inputField}
          className="shadow-md rounded ring-1 my-4 p-4 text-lg"
        ></textarea>
        <button
          className="bg-purple-500 py-3 px-12 rounded-lg text-white"
          onClick={applyText}
        >
          Apply
        </button>
      </aside>
    </div>
  );
};

export default Home;
