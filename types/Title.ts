import Position from './Position';
import Rotation from './Rotation';

export default interface Title {
  id: string;
  text: string;
  fontSize: string;
  fontWeight: string;
  fontColor: string;
  position: Position;
  rotation: Rotation;
}
