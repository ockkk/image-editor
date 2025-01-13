import { Group } from "react-konva";
import { Html } from "react-konva-utils";
import opacityIcon from "../../assets/opacity.webp";

export function OpacitySlider({
  opacity,
  handleOpacityChange,
}: {
  opacity: number;
  handleOpacityChange: (newOpacity: number) => void;
}) {
  return (
    <Group x={100} y={5}>
      <Html>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={opacityIcon}
            alt="opacity"
            width={24}
            height={24}
            style={{ marginTop: "4px" }}
          />
          <input
            type="range"
            className="opacity-slider"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            style={{
              width: "100px",
              height: "6px",
              appearance: "none",
              background: `linear-gradient(to right, #000000 ${
                opacity * 100
              }%, #CCCCCC ${opacity * 100}%)`,
              borderRadius: "4px",
              cursor: "pointer",
              WebkitAppearance: "none",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#666666",
            }}
          >
            {Math.round(opacity * 100)}%
          </span>
        </div>
      </Html>
    </Group>
  );
}
