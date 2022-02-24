import Position from './Position';
import Rotation from './Rotation';

export default interface Title {
  id: string;
  text: string;
  fontColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  position: Position;
  rotation: Rotation;
  shadow: boolean;
}
