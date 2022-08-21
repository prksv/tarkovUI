import { useEffect, useState } from "react";
import InventoryCell from "../inventoryCell";
  import InventoryItem from "../inventoryItem";
  import styles from "./inventory.module.scss";
  import { DndProvider } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
  import { WEAPON } from "../../itemTypes";

  export default function Inventory({ width, height }) {
    const [selectedCell, setSelectedCell] = useState();
    const [activeCells, setActiveCells] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [canBeMoved, setCanBeMoved] = useState(true);
    const [items, setItems] = useState([
      {
        position: {
          x: 0,
          y: 4,
        },
        type: WEAPON,
        width: 4,
        height: 2,
        information: {
          title: "АКC-74у",
        },
        icon: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/4458811/c863445676653e7cc9fa709be47df975887f407c.png'
      },
      {
        position: {
          x: 0,
          y: 2,
        },
        type: WEAPON,
        width: 6,
        height: 2,
        information: {
          title: "АК-74Н",
        },
        icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Ak74l.png'
      },
      {
        position: {
          x: 0,
          y: 0,
        },
        type: WEAPON,
        width: 6,
        height: 2,
        information: {
          title: "M4A1 ACOG",
        },
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/dc/M4A1_ACOG.png",
      },
    {
      position: {
        x: 6,
        y: 0,
      },
      type: WEAPON,
      width: 2,
      height: 2,
      information: {
        title: "Аптечка",
        capacity: 300,
        max_capacity: 1000,
      },
      icon: "https://pogzashita.ru/wp-content/uploads/2021/02/fest7.png",
    },
  ]);

  useEffect(() => {
    if (!selectedCell) {
      return;
    }

    setCanBeMoved(true);

    let newActiveCells = [];

    for (let i = 0; i < items[selectedItem].width; i++) {
      let _activeCell = selectedCell + i;
      if (i > 0 && _activeCell % width === 0) {
        setCanBeMoved(false);
        break;
      } else {
        newActiveCells.push(_activeCell);
        newActiveCells.push(_activeCell + width);
      }
    }

    setActiveCells(newActiveCells);
  }, [selectedCell]);

  function updatePosition(item, cell) {
    let newItems = items;

    newItems[item].position.x = cell % width;
    newItems[item].position.y = Math.floor(cell / width);
    console.log(newItems);
    setItems(newItems);
    setActiveCells([]);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={styles.root}
        style={{
          maxWidth: 50 * width + "px",
          maxHeight: 50 * height + "px",
          minWidth: 50 * width + "px",
          minHeight: 50 * height + "px",
        }}
      >
        {Array.from({ length: width * height }, (_, key) => {
          return (
            <InventoryCell
              key={key}
              id={key}
              setSelectedCell={setSelectedCell}
              selected={activeCells.includes(key)}
              canBeMoved={canBeMoved}
            />
          );
        })}

        {items.map((item, key) => {
          return (
            <InventoryItem
              id={key}
              key={key}
              type={item.type}
              width={item.width}
              height={item.height}
              position={item.position}
              setSelectedItem={setSelectedItem}
              selectedCell={selectedCell}
              updatePosition={updatePosition}
              icon={item.icon}
              setActiveCells={setActiveCells}
              information={item.information}
            />
          );
        })}
      </div>
      <div style={{ fontSize: "17px", width: "100%", textAlign: "center" }}>
        Инвентарь {width} на {height}. Вместимость {width * height} ячеек
      </div>
    </DndProvider>
  );
}
