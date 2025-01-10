import { ImageEditor } from "./components/ImageEditor";
import "./App.css";

function App() {
  return (
    <div>
      <h1>CanvasImageEditor</h1>
      {/* <CanvasImageEditor imageUrl="https://stg.connect.mysuni.com/suni-asset/icon/group/C_01.png" /> */}
      <ImageEditor backgroundImage="https://stg.connect.mysuni.com/suni-asset/icon/group/C_01.png" />
    </div>
  );
}

export default App;
