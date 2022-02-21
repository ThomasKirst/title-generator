import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';

import Position from '../types/Position';
import Rotation from '../types/Rotation';
import Title from '../types/Title';

import FontColor, { textColors } from './Settings/FontColor';
import FontPerspective from './Settings/FontPerspective';
import FontSize, { sizes } from './Settings/FontSize';
import FontWeight, { fontWeights } from './Settings/FontWeight';
import SettingsSection from './Settings/SettingsSection';
import TextBox from './Settings/TextBox';
import TextPosition from './Settings/TextPosition';
import TextShadow from './Settings/TextShadow';

import SelectTitle from './SelectTitle';
import SelectTitleOpener from './SelectTitleOpener';

import useLocalStorage from '../hooks/useLocalStorage';

import { moveX, moveY } from '../lib/move';
import { rotateX, rotateY, rotateZ } from '../lib/rotate';

import { fetchTitles, postTitle, updateTitle, removeTitle } from '../lib/api';

export default function Create({ initialTitle }: { initialTitle?: Title }) {
  const [titles, setTitles] = useState<Title[]>([]);
  const [_, saveTitlesLocally] = useLocalStorage('titles', []);
  const [showSelectTitle, setShowSelectTitle] = useState(false);
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

  const [title, setTitle] = useState<Title>({
    id: nanoid(12),
    text: '',
    fontColor: 'black',
    fontSize: 'L',
    fontWeight: 'default',
    position,
    rotation,
    shadow: false,
  });

  useEffect(() => {
    fetchTitles(setTitles);
  }, []);

  useEffect(() => {
    saveTitlesLocally(titles);
  }, [titles, saveTitlesLocally]);

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
      setRotation((previousRotation) => initialTitle.rotation);
      setPosition((previousPosition) => initialTitle.position);
    }
  }, [initialTitle]);

  useEffect(() => {
    setTitle((previousTitle) => ({ ...previousTitle, position, rotation }));
  }, [position, rotation]);

  const inputField = useRef<HTMLTextAreaElement | null>(null);
  const titleOutput = useRef<HTMLHeadingElement | null>(null);

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

  const toggleShadow = (event: ChangeEvent<HTMLInputElement>) => {
    const shadow = event.target.checked;
    setTitle({ ...title, shadow });
  };

  const saveTitle = () => {
    if (titles.some((t: Title) => t.id === title.id)) {
      updateTitle(title, setTitles);
      setMessage('Title has been updated with id: ' + title.id);
    } else {
      postTitle(title, setTitles);
      setMessage('Title has been saved with id: ' + title.id);
    }
  };

  const titleOutputClasses = () =>
    `${sizes[title.fontSize]} ${textColors[title.fontColor]} ${
      fontWeights[title.fontWeight]
    } transition-all transition-duration-75 ease-out pointer-events-none whitespace-pre`;

  return (
    <div className="container mx-auto flex pt-4 px-4 h-screen">
      <main className="flex-initial w-10/12 h-full">
        <section className="flex items-baseline">
          <h1 className="text-3xl basis-1/2">Title Generator</h1>
          <div className="basis-1/5">
            <SelectTitleOpener
              onSetShowSelectTitle={() => setShowSelectTitle(!showSelectTitle)}
              showSelectTitle={showSelectTitle}
              titles={titles}
            />
          </div>
          {showSelectTitle && (
            <div className="container absolute flex flex-col items-center mt-10 z-10 pr-8">
              <SelectTitle
                activeTitle={title}
                onRemoveTitle={(event) =>
                  removeTitle(event, title.id, setTitles)
                }
                titles={titles}
              />
            </div>
          )}
        </section>
        <section
          className="flex items-center justify-center h-full"
          style={{ perspective: '32rem' }}
        >
          <h2
            ref={titleOutput}
            className={titleOutputClasses()}
            style={{
              transform: `translateX(${position.x}px) translateY(${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              textShadow: title.shadow
                ? '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)'
                : 'none',
            }}
          >
            {title.text}
          </h2>
        </section>
      </main>
      <aside className="flex-none w-2/12">
        <h2 className="text-2xl mt-2 mb-4">Settings</h2>

        <SettingsSection label="Text">
          <TextBox
            inputField={inputField}
            onApplyText={applyText}
            text={title.text}
          />
        </SettingsSection>

        <SettingsSection label="Font Settings">
          <FontSize
            onIncreaseSize={increaseSize}
            sizes={sizes}
            text={title.text}
          />
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
            <TextPosition
              position={position}
              onMoveX={(event) => moveX(event, setPosition)}
              onMoveY={(event) => moveY(event, setPosition)}
            />
          </SettingsSection>

          <section>
            <SettingsSection label="Perspective">
              <FontPerspective
                onRotateX={(event) => rotateX(event, setRotation)}
                onRotateY={(event) => rotateY(event, setRotation)}
                onRotateZ={(event) => rotateZ(event, setRotation)}
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
