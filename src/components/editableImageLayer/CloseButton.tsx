import { Group, Rect, Text } from "react-konva";

export function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Group x={300} y={5}>
      <Rect
        width={45}
        height={30}
        cornerRadius={4}
        fill="#e0e0e0"
        onClick={handleClose}
        onTap={handleClose}
      />
      <Text
        text="닫기"
        fontSize={16}
        fontStyle="bold"
        fill="#666666"
        x={8}
        y={8}
        onClick={handleClose}
        onTap={handleClose}
      />
    </Group>
  );
}
