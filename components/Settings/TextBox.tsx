import { MutableRefObject, SyntheticEvent } from 'react';

interface Props {
  fontFamily: string;
  inputField: MutableRefObject<HTMLTextAreaElement | null>;
  onApplyText: (event: SyntheticEvent) => void;
  onChangeFontFamily: (fontFamily: string) => void;
  text: string;
}

const fonts = [
  'Comic Neue',
  'Lato',
  'Merriweather',
  'Montserrat',
  'Open Sans',
  'Oswald',
  'Raleway',
  'Roboto',
  'Source Sans Pro',
];

export default function TextBox({
  fontFamily,
  inputField,
  onApplyText,
  onChangeFontFamily,
  text,
}: Props) {
  return (
    <>
      <textarea
        ref={inputField}
        className="block border-solid border-2 border-slate-300 my-2 px-2 py-2 rounded-md shadow-md text-lg w-5/6 h-28"
        defaultValue={text}
        onChange={onApplyText}
      ></textarea>
      <select
        className="border-solid border-2 border-slate-300 rounded-md shadow-md w-5/6 py-3 px-1"
        onChange={(event) => onChangeFontFamily(event.target.value)}
        value={fontFamily}
      >
        {fonts.map((font, index) => (
          <option key={index}>{font}</option>
        ))}
      </select>
    </>
  );
}
