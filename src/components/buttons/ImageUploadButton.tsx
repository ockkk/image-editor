import { useEditor } from "../../hooks/useEditor";

export function ImageUploadButton() {
  const { images, setImages } = useEditor();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const imageUrl = URL.createObjectURL(file);
      img.onload = () => {
        setImages([
          ...images,
          {
            id: Date.now(),
            url: imageUrl,
            opacity: 1,
            width: img.width,
            height: img.height,
          },
        ]);
      };
      img.src = imageUrl;
    }
  };

  return (
    <label>
      이미지 업로드
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </label>
  );
}
