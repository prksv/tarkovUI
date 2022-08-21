import { useState, useEffect } from "react";
import styles from "./inventoryItem.module.scss";
import classNames from "classnames";
import { useDrag } from "react-dnd";
export default function InventoryItem({
  id,
  type,
  width,
  height,
  position,
  setSelectedItem,
  updatePosition,
  icon,
  information,
  setActiveCells,
}) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        updatePosition(id, dropResult.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      setSelectedItem(id);
    } else {
      setActiveCells([])
    }
  }, [isDragging]);

  return (
    <div
      ref={drag}
      className={classNames(
        styles.root,
        isDragging ? styles["root--selected"] : ""
      )}
      style={{
        width: width * 50,
        height: height * 50,
        left: position.x * 50 + "px",
        top: position.y * 50 + "px",
        background: `url(${icon})`,
      }}
    >
      <div className={styles.information}>
        <span className={styles.title}>{information.title}</span>
      </div>
      {information.max_capacity &&<div className={styles.capacity}>{information.capacity} / {information.max_capacity}</div>}

    </div>
  );
}
