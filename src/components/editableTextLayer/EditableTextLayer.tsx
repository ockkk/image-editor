import { KonvaEventObject } from "konva/lib/Node";
import { Text } from "react-konva";
import { Html } from "react-konva-utils";
import { useEditor } from "../../hooks/useEditor";

export function EditableTextLayer() {
  const { texts, setTexts } = useEditor();

  const handleTextEdit = (id: number) => {
    setTexts(
      texts.map((t) => ({
        ...t,
        isEditing: t.id === id,
      }))
    );
  };

  const handleTextChange = (id: number, newText: string) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const handleTextSubmit = () => {
    setTexts(
      texts.map((t) => ({
        ...t,
        isEditing: false,
      }))
    );
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    setTexts(
      texts.map((t) =>
        t.id === id ? { ...t, x: e.target.x(), y: e.target.y() } : t
      )
    );
  };

  const handleStyleChange = (
    id: number,
    property: "fontSize" | "fontFamily" | "fill" | "align" | "fontWeight",
    value: string | number
  ) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, [property]: value } : t)));
  };

  const handleDelete = (id: number) => {
    setTexts(texts.filter((t) => t.id !== id));
  };

  return (
    <>
      {texts.map((textObj) =>
        textObj.isEditing ? (
          <Html key={textObj.id}>
            <div
              style={{
                position: "absolute",
                left: textObj.x,
                top: textObj.y,
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
              }}
            >
              <textarea
                value={textObj.text}
                onChange={(e) => handleTextChange(textObj.id, e.target.value)}
                onBlur={(e) => {
                  if (
                    !e.currentTarget.parentElement?.contains(
                      e.relatedTarget as Node
                    )
                  ) {
                    handleTextSubmit();
                  }
                }}
                autoFocus
                style={{
                  fontSize: `${textObj.fontSize}px`,
                  fontFamily: textObj.fontFamily,
                  fontWeight: textObj.fontWeight,
                  color: textObj.fill,
                  background: "transparent",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "8px",
                  outline: "none",
                  width: "200px",
                  minHeight: "60px",
                  resize: "both",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="number"
                  value={textObj.fontSize}
                  onChange={(e) =>
                    handleStyleChange(
                      textObj.id,
                      "fontSize",
                      Number(e.target.value)
                    )
                  }
                  style={{
                    width: "60px",
                    padding: "4px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <select
                  value={textObj.fontFamily}
                  onChange={(e) =>
                    handleStyleChange(textObj.id, "fontFamily", e.target.value)
                  }
                  style={{
                    padding: "4px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "white",
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
                <input
                  type="color"
                  value={textObj.fill}
                  onChange={(e) =>
                    handleStyleChange(textObj.id, "fill", e.target.value)
                  }
                  style={{
                    width: "40px",
                    height: "30px",
                    padding: "0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />
                <select
                  value={textObj.align}
                  onChange={(e) =>
                    handleStyleChange(textObj.id, "align", e.target.value)
                  }
                  style={{
                    padding: "4px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "white",
                  }}
                >
                  <option value="left">왼쪽</option>
                  <option value="center">가운데</option>
                  <option value="right">오른쪽</option>
                </select>
                <select
                  value={textObj.fontWeight}
                  onChange={(e) =>
                    handleStyleChange(textObj.id, "fontWeight", e.target.value)
                  }
                  style={{
                    padding: "4px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    background: "white",
                  }}
                >
                  <option value="100">Thin</option>
                  <option value="300">Light</option>
                  <option value="500">Medium</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginLeft: "auto",
                  }}
                >
                  <button
                    onClick={() => handleTextSubmit()}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                      color: "#333",
                    }}
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => handleDelete(textObj.id)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      border: "1px solid #ff4d4f",
                      background: "#fff",
                      cursor: "pointer",
                      color: "#ff4d4f",
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </Html>
        ) : (
          <Text
            key={textObj.id}
            text={textObj.text}
            x={textObj.x}
            y={textObj.y}
            draggable
            onDragEnd={(e) => onDragEnd(e, textObj.id)}
            onClick={() => handleTextEdit(textObj.id)}
            fontSize={textObj.fontSize}
            fontFamily={textObj.fontFamily}
            fontStyle={textObj.fontWeight}
            fill={textObj.fill}
            align={textObj.align}
          />
        )
      )}
    </>
  );
}
