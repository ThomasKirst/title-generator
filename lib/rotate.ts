import { ChangeEvent, SetStateAction } from 'react';
import Rotation from '../types/Rotation';

type RotateEvent = ChangeEvent<HTMLInputElement>;
type StateUpdate = (value: SetStateAction<Rotation>) => void;

const rotateX = (event: RotateEvent, setRotation: StateUpdate) => {
  const x = event.currentTarget.value;
  setRotation((previousRotation) => ({
    ...previousRotation,
    x: parseInt(x),
  }));
};

const rotateY = (event: RotateEvent, setRotation: StateUpdate) => {
  const y = event.currentTarget.value;
  setRotation((previousRotation) => ({
    ...previousRotation,
    y: parseInt(y),
  }));
};

const rotateZ = (event: RotateEvent, setRotation: StateUpdate) => {
  const z = event.currentTarget.value;
  setRotation((previousRotation) => ({
    ...previousRotation,
    z: parseInt(z),
  }));
};

export { rotateX, rotateY, rotateZ };
