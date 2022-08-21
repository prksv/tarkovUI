import React, { useEffect } from "react";
import styles from "./inventoryCell.module.scss";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import { WEAPON } from "../../itemTypes";

export default function InventoryCell({
  id,
  setSelectedCell,
  selected,
  canBeMoved,
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: WEAPON,
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (isOver) {
      setSelectedCell(id);
    }
  }, [isOver]);

  return (
    <div
      className={classNames(
        styles.root,
        selected
          ? canBeMoved
            ? styles["root--active"]
            : styles["root--inactive"]
          : ""
      )}
      ref={drop}
    >{id}</div>
  );
}
