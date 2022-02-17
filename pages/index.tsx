import type { NextPage } from 'next';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [text, setText] = useState<string>('');

  const inputField = useRef<HTMLTextAreaElement | null>(null);
  const title = useRef<HTMLHeadingElement | null>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>(
    { x: 0, y: 0, z: 0 }
  );

  const applyText = (event: SyntheticEvent) => {
    if (inputField && inputField.current) {
      setText(inputField?.current?.value);
    }
  };

  interface Sizes {
    [index: string]: string;
  }

  const increaseSize = (size: string) => {
    const sizes: Sizes = {
      S: 'text-2xl',
      M: 'text-4xl',
      L: 'text-6xl',
      XL: 'text-9xl',
      default: 'text-9xl',
    };
    if (size !== 'default') {
      title?.current?.classList.remove(...Object.values(sizes));
      title?.current?.classList.add(sizes[size]);
    }
  };

  interface Weights {
    [index: string]: string;
  }

  const changeFontWeight = (weight: string) => {
    const fontWeights: Weights = {
      thin: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
      default: 'font-normal',
    };

    if (weight !== 'default') {
      title?.current?.classList.remove(...Object.values(fontWeights));
      title?.current?.classList.add(fontWeights[weight]);
    }
  };

  interface Colors {
    [index: string]: string;
  }

  const textColors: Colors = {
    black: 'text-black',
    cyan: 'text-cyan-500',
    teal: 'text-teal-500',
    yellow: 'text-yellow-500',
    violet: 'text-violet-500',
    pink: 'text-pink-800',
  };

  const backgroundColors: Colors = {
    black: 'bg-black',
    cyan: 'bg-cyan-500',
    teal: 'bg-teal-500',
    yellow: 'bg-yellow-500',
    violet: 'bg-violet-500',
    pink: 'bg-pink-800',
  };

  const changeColor = (color: string) => {
    title?.current?.classList.remove(...Object.values(textColors));
    title?.current?.classList.add(textColors[color]);
  };

  const moveX = (event: ChangeEvent<HTMLInputElement>) => {
    const xPos = event.currentTarget.value;
    setPosition({ ...position, x: parseInt(xPos) });
  };

  const moveY = (event: ChangeEvent<HTMLInputElement>) => {
    const yPos = event.currentTarget.value;
    setPosition({ ...position, y: parseInt(yPos) });
  };

  const rotateX = (event: ChangeEvent<HTMLInputElement>) =>
    setRotation({ ...rotation, x: parseInt(event.currentTarget.value) });
  const rotateY = (event: ChangeEvent<HTMLInputElement>) =>
    setRotation({ ...rotation, y: parseInt(event.currentTarget.value) });
  const rotateZ = (event: ChangeEvent<HTMLInputElement>) =>
    setRotation({ ...rotation, z: parseInt(event.currentTarget.value) });

  const toggleShadow = (event: ChangeEvent<HTMLInputElement>) => {
    const shadow = event.target.checked;
    title?.current?.style.setProperty(
      'text-shadow',
      shadow
        ? '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)'
        : 'none'
    );
  };

  return (
    <div className="container mx-auto flex pt-4 pl-4 h-screen">
      <main className="flex-initial w-9/12 h-full">
        <h1 className="text-3xl">Title Generator</h1>
        <section
          className="flex items-center justify-center h-full"
          style={{ perspective: '32rem' }}
        >
          <h2
            ref={title}
            className="text-9xl transition-all transition-duration-75 ease-out"
            style={{
              transform: `translateX(${position.x}px) translateY(${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              whiteSpace: 'pre',
            }}
          >
            {text}
          </h2>
        </section>
      </main>
      <aside className="flex-none w-3/12">
        <h2 className="text-2xl mt-2 mb-4">Settings</h2>

        <section className="mb-6">
          <label className="block font-semibold text-1xl">Text</label>
          <textarea
            ref={inputField}
            className="block shadow-md rounded ring-1 my-4 p-4 text-lg"
          ></textarea>
          <button
            className="bg-purple-500 py-3 px-12 rounded-lg text-white"
            onClick={applyText}
          >
            Apply
          </button>
        </section>

        <label className="block font-semibold text-1xl mb-2">
          Font Settings
        </label>
        <div className="flex mb-6">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => increaseSize(size)}
              className={`border ${
                text ? 'bg-indigo-500' : 'bg-indigo-300'
              } rounded-md text-lg text-white px-4 py-2`}
            >
              {size}
            </button>
          ))}
        </div>

        <label className="block font-semibold text-1xl mb-2">Font Weight</label>
        <div className="flex mb-6">
          {['thin', 'normal', 'semibold', 'bold'].map((weight) => (
            <button
              key={weight}
              onClick={() => changeFontWeight(weight)}
              className={`border ${
                text ? 'bg-indigo-500' : 'bg-indigo-300'
              } rounded-md text-sm text-white px-3 py-2`}
            >
              {weight}
            </button>
          ))}
        </div>

        <section className="mb-6">
          <label className="block font-semibold text-1xl mb-2">Color</label>
          <div className="flex">
            {Object.keys(backgroundColors).map((color) => (
              <div
                className={`cursor-pointer w-8 h-8 ${backgroundColors[color]} px-4 mr-2`}
                key={color}
                onClick={() => changeColor(color)}
                style={{ borderRadius: '50%' }}
              >
                &nbsp;
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <label className="block font-semibold text-1xl mb-2">Shadow</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="shadow"
                className="mr-2"
                onChange={toggleShadow}
              />
              Shadow
            </label>
          </div>
        </section>

        <div className="flex gap-6">
          <section className="mb-6">
            <label className="block font-semibold text-1xl mb-2">
              Position
            </label>
            <div>
              <label htmlFor="xpos" className="block text-sm">
                {' '}
                x-Pos{' '}
                <span className="text-xs text-gray-500">({position.x})</span>
              </label>
              <input
                className="block"
                type="range"
                id="xpos"
                name="xpos"
                min="-400"
                max="400"
                onChange={moveX}
                value={position.x}
              />
            </div>
            <label htmlFor="ypos" className="block text-sm mt-2">
              {' '}
              y-Pos{' '}
              <span className="text-xs text-gray-500">({position.y})</span>
            </label>
            <input
              className="block"
              type="range"
              id="ypos"
              name="ypos"
              min="-400"
              max="400"
              onChange={moveY}
              value={position.y}
            />
          </section>

          <section>
            <label className="block font-semibold text-1xl mb-2">
              Perspective
            </label>

            <label htmlFor="rotateX" className="block text-sm mt-2">
              {' '}
              x-Rotation{' '}
              <span className="text-xs text-gray-500">({rotation.x})</span>
            </label>
            <input
              className="block"
              type="range"
              id="rotateX"
              name="rotateX"
              min="-180"
              max="180"
              onChange={rotateX}
              value={rotation.x}
            />
            <label htmlFor="rotateY" className="block text-sm mt-2">
              {' '}
              y-Rotation{' '}
              <span className="text-xs text-gray-500">({rotation.y})</span>
            </label>
            <input
              className="block"
              type="range"
              id="rotateY"
              name="rotateY"
              min="-180"
              max="180"
              onChange={rotateY}
              value={rotation.y}
            />
            <label htmlFor="rotateZ" className="block text-sm mt-2">
              {' '}
              z-Rotation{' '}
              <span className="text-xs text-gray-500">({rotation.z})</span>
            </label>
            <input
              className="block"
              type="range"
              id="rotateZ"
              name="rotateZ"
              min="-180"
              max="180"
              onChange={rotateZ}
              value={rotation.z}
            />
          </section>
        </div>
      </aside>
    </div>
  );
};

export default Home;
