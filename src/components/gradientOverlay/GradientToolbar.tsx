import React from "react";
import { Html } from "react-konva-utils";
import styles from "./GradientToolbar.module.css";

interface GradientToolbarProps {
  startOpacity: number;
  endOpacity: number;
  onStartOpacityChange: (value: number) => void;
  onEndOpacityChange: (value: number) => void;
  onClose: () => void;
}

const GradientToolbar: React.FC<GradientToolbarProps> = ({
  startOpacity,
  endOpacity,
  onStartOpacityChange,
  onEndOpacityChange,
  onClose,
}) => {
  return (
    <Html>
      <div>
        <div className={styles.toolbarContent}>
          <div className={styles.sliderContainer}>
            <div className={styles.sliderGroup}>
              <label>시작 불투명도</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={startOpacity}
                onChange={(e) =>
                  onStartOpacityChange(parseFloat(e.target.value))
                }
              />
              <span>{(startOpacity * 100).toFixed(0)}%</span>
            </div>
            <div className={styles.sliderGroup}>
              <label>끝 불투명도</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={endOpacity}
                onChange={(e) => onEndOpacityChange(parseFloat(e.target.value))}
              />
              <span>{(endOpacity * 100).toFixed(0)}%</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </Html>
  );
};

export default GradientToolbar;
