import Inventory from "./components/inventory";
import "./styles/App.scss";

function App() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Inventory width={11} height={12} />
    </div>
  );
}

export default App;
