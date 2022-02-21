import { ChangeEvent, SetStateAction } from 'react';
import Rotation from '../types/Rotation';

type RotateEvent = ChangeEvent<HTMLInputElement>;
type StateUpdate = (value: SetStateAction<Rotation>) => void;

const rotateX = (event: RotateEvent, setRotation: StateUpdate) =>
  setRotation((previousRotation) => ({
    ...previousRotation,
    x: parseInt(event.currentTarget.value),
  }));

const rotateY = (event: RotateEvent, setRotation: StateUpdate) =>
  setRotation((previousRotation) => ({
    ...previousRotation,
    y: parseInt(event.currentTarget.value),
  }));

const rotateZ = (event: RotateEvent, setRotation: StateUpdate) =>
  setRotation((previousRotation) => ({
    ...previousRotation,
    z: parseInt(event.currentTarget.value),
  }));

export { rotateX, rotateY, rotateZ };
