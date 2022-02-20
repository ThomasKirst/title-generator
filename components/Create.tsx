import { useEffect } from 'react';
import { nanoid } from 'nanoid';
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
import Title from '../types/Title';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Create({ initialTitle }: { initialTitle: Title }) {
  const [titles, saveTitleLocally] = useLocalStorage('titles', []);
  const [message, setMessage] = useState('');

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState<Rotation>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [title, setTitle] = useState<Title>(
    initialTitle ?? {
      id: nanoid(12),
      text: '',
      fontSize: 'L',
      fontWeight: 'default',
      fontColor: 'black',
      position,
      rotation,
    }
  );

  useEffect(() => {
    setTitle((title) => ({ ...title, position, rotation }));
  }, [position, rotation]);

  const inputField = useRef<HTMLTextAreaElement | null>(null);
  const titleOutput = useRef<HTMLHeadingElement | null>(null);

  const sizes: Sizes = {
    S: 'text-2xl',
    M: 'text-4xl',
    L: 'text-6xl',
    XL: 'text-9xl',
    default: 'text-6xl',
  };

  const fontWeights: Weights = {
    thin: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
    default: 'font-normal',
  };

  const textColors: Colors = {
    black: 'text-black',
    cyan: 'text-cyan-500',
    teal: 'text-teal-500',
    yellow: 'text-yellow-500',
    violet: 'text-violet-500',
    pink: 'text-pink-800',
  };

  const applyText = (event: SyntheticEvent) => {
    if (inputField && inputField.current) {
      setTitle({ ...title, text: inputField?.current?.value });
    }
  };

  const increaseSize = (size: string) => {
    if (size !== 'default') {
      setTitle({ ...title, fontSize: size });
    }
  };

  const changeFontWeight = (weight: string) => {
    if (weight !== 'default') {
      setTitle({ ...title, fontWeight: weight });
    }
  };

  const changeColor = (color: string) =>
    setTitle({ ...title, fontColor: color });

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
    titleOutput?.current?.style.setProperty(
      'text-shadow',
      shadow
        ? '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)'
        : 'none'
    );
  };

  const saveTitle = () => {
    const index = titles.findIndex((t: Title) => t.id === title.id);

    if (index > -1) {
      titles[index] = title;
    } else {
      titles.push(title);
    }
    saveTitleLocally(titles);
    setMessage('Title has been saved with id: ' + title.id);
  };

  const titleOutputClasses = () =>
    `${sizes[title.fontSize]} ${textColors[title.fontColor]} ${
      fontWeights[title.fontWeight]
    } transition-all transition-duration-75 ease-out`;

  return (
    <div className="container mx-auto flex pt-4 pl-4 h-screen">
      <main className="flex-initial w-9/12 h-full">
        <h1 className="text-3xl">Title Generator</h1>
        <section
          className="flex items-center justify-center h-full"
          style={{ perspective: '32rem' }}
        >
          <h2
            ref={titleOutput}
            className={titleOutputClasses()}
            style={{
              transform: `translateX(${position.x}px) translateY(${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              whiteSpace: 'pre',
            }}
          >
            {title.text}
          </h2>
        </section>
      </main>
      <aside className="flex-none w-3/12">
        <h2 className="text-2xl mt-2 mb-4">Settings</h2>

        <SettingsSection label="Text">
          <TextBox inputField={inputField} onApplyText={applyText} />
        </SettingsSection>

        <SettingsSection label="Font Settings">
          <FontSize onIncreaseSize={increaseSize} text={title.text} />
        </SettingsSection>

        <SettingsSection label="Font Weight">
          <FontWeight onChangeFontWeight={changeFontWeight} text={title.text} />
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

        <button
          className="bg-purple-800 hover:bg-indigo-500 py-3 px-12 rounded-lg text-white"
          onClick={saveTitle}
        >
          Save Title
        </button>
        {message != '' && <p className="text-sm transition mt-2">{message}</p>}
      </aside>
    </div>
  );
}