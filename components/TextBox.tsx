import { MutableRefObject, SyntheticEvent } from 'react';

interface Props {
  inputField: MutableRefObject<HTMLTextAreaElement | null>;
  onApplyText: (event: SyntheticEvent) => void;
}

export default function TextBox({ inputField, onApplyText }: Props) {
  return (
    <>
      <textarea
        ref={inputField}
        className="block shadow-md rounded ring-1 my-4 p-4 text-lg"
      ></textarea>
      <button
        className="bg-purple-500 py-3 px-12 rounded-lg text-white"
        onClick={onApplyText}
      >
        Apply
      </button>
    </>
  );
}
