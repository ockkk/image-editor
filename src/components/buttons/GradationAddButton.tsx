import { useEditor } from "../../hooks/useEditor";

export function GradationAddButton() {
  const { hasGradient, setHasGradient } = useEditor();

  const handleRemoveGradient = () => {
    setHasGradient(false);
  };

  const handleaddGradient = () => {
    setHasGradient(true);
  };

  return (
    <button
      onClick={hasGradient ? handleRemoveGradient : handleaddGradient}
      style={{
        backgroundColor: hasGradient ? "#dc3545" : "#20c997",
        color: "white",
      }}
    >
      {hasGradient ? "그라데이션 제거" : "그라데이션 추가"}
    </button>
  );
}
