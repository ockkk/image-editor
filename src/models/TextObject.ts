export interface TextObject {
  id: number;
  text: string;
  x: number;
  y: number;
  isEditing?: boolean;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  align: string;
}
