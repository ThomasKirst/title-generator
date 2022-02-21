import { ChangeEvent, SetStateAction } from 'react';
import Position from '../types/Position';

type MoveEvent = ChangeEvent<HTMLInputElement>;
type StateUpdate = (value: SetStateAction<Position>) => void;

const moveX = (event: MoveEvent, setPosition: StateUpdate) => {
  const xPos = event.currentTarget.value;
  setPosition((previousPosition) => ({
    ...previousPosition,
    x: parseInt(xPos),
  }));
};

const moveY = (event: MoveEvent, setPosition: StateUpdate) => {
  const yPos = event.currentTarget.value;
  setPosition((previousPosition) => ({
    ...previousPosition,
    y: parseInt(yPos),
  }));
};

export { moveX, moveY };
