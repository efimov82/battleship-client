import React from "react";
import { Cell } from "../../classes/Cell";
import { Field } from "../../classes/Field";
import { CellComponent } from "../CellComponent/CellComponent";
import styles from "./FieldComponent.module.scss";

type FieldComponentProps = {
  className: string;
  onCellClick: (row: number, col: number) => void;
  field: Cell[][]; //Field;
};

export function FieldComponent(props: FieldComponentProps) {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  // const handleCellClick = (row, col) => {
  //   console.log(row, col);
  // };

  const fieldMap = props.field.map((row, rowIndex) => {
    const rowComponent = row.map((cell, colIndex) => {
      return (
        <CellComponent
          key={`${rowIndex}_${colIndex}`}
          cell={cell}
          onCellClick={props.onCellClick}
          className={props.className}
        />
      );
    });

    return rowComponent;
  });

  const getClassName = () => {
    return styles.field + " " + props.className;
  };

  return <div className={getClassName()}>{fieldMap}</div>;
}
