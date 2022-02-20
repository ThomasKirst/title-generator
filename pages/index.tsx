import type { NextPage } from 'next';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import FontColor from '../components/FontColor';
import FontPerspective from '../components/FontPerspective';
import FontSize from '../components/FontSize';
import FontWeight from '../components/FontWeight';
import SettingsSection from '../components/SettingsSection';
import TextBox from '../components/TextBox';
import TextPosition from '../components/TextPosition';
import TextShadow from '../components/TextShadow';
import Colors from '../types/Colors';
import Position from '../types/Position';
import Rotation from '../types/Rotation';
import Sizes from '../types/Sizes';
import Weights from '../types/Weigths';

const Home: NextPage = () => {
  const [text, setText] = useState<string>('');

  const inputField = useRef<HTMLTextAreaElement | null>(null);
  const title = useRef<HTMLHeadingElement | null>(null);

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState<Rotation>({
    x: 0,
    y: 0,
    z: 0,
  });

  const applyText = (event: SyntheticEvent) => {
    if (inputField && inputField.current) {
      setText(inputField?.current?.value);
    }
  };

  const increaseSize = (size: string) => {
    const sizes: Sizes = {
      S: 'text-2xl',
      M: 'text-4xl',
      L: 'text-6xl',
      XL: 'text-9xl',
      default: 'text-6xl',
    };
    if (size !== 'default') {
      title?.current?.classList.remove(...Object.values(sizes));
      title?.current?.classList.add(sizes[size]);
    }
  };

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

  const textColors: Colors = {
    black: 'text-black',
    cyan: 'text-cyan-500',
    teal: 'text-teal-500',
    yellow: 'text-yellow-500',
    violet: 'text-violet-500',
    pink: 'text-pink-800',
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

        <SettingsSection label="Text">
          <TextBox inputField={inputField} onApplyText={applyText} />
        </SettingsSection>

        <SettingsSection label="Font Settings">
          <FontSize onIncreaseSize={increaseSize} text={text} />
        </SettingsSection>

        <SettingsSection label="Font Weight">
          <FontWeight onChangeFontWeight={changeFontWeight} text={text} />
        </SettingsSection>

        <SettingsSection label="Color">
          <FontColor onChangeColor={changeColor} />
        </SettingsSection>

        <SettingsSection label="Shadow">
          <TextShadow onToggleShadow={toggleShadow} />
        </SettingsSection>

        <div className="flex gap-6">
          <SettingsSection label="position">
            <TextPosition position={position} onMoveX={moveX} onMoveY={moveY} />
          </SettingsSection>

          <section>
            <SettingsSection label="Perspective">
              <FontPerspective
                onRotateX={rotateX}
                onRotateY={rotateY}
                onRotateZ={rotateZ}
                rotation={rotation}
              />
            </SettingsSection>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default Home;
