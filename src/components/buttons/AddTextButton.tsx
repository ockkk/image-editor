import { useEditor } from "../../hooks/useEditor";

export function AddTextButton() {
  const { inputText, setInputText, texts, setTexts } = useEditor();

  const handleAddText = () => {
    if (inputText.trim() !== "") {
      setTexts([
        ...texts,
        {
          ...initialText,
          text: inputText,
        },
      ]);
      setInputText("");
    }
  };
  return (
    <>
      <textarea
        className="textarea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="텍스트를 입력하세요"
      />
      <button
        className="button"
        style={{ backgroundColor: "#007bff", color: "white" }}
        onClick={handleAddText}
      >
        텍스트 추가
      </button>
    </>
  );
}

const initialText = {
  id: Date.now(),
  text: "",
  x: 50,
  y: 50,
  isEditing: false,
  fontSize: 16,
  fontFamily: "Arial",
  fontWeight: "",
  fill: "black",
  align: "left",
};
