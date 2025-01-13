import { Group, Rect, Text } from "react-konva";

export function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
  return (
    <Group x={350} y={5}>
      <Rect
        width={45}
        height={30}
        cornerRadius={4}
        fill="red"
        onClick={handleDelete}
        onTap={handleDelete}
      />
      <Text
        text="삭제"
        fontSize={16}
        fontStyle="bold"
        fill="white"
        x={8}
        y={8}
        onClick={handleDelete}
        onTap={handleDelete}
      />
    </Group>
  );
}
