import React from "react";
import { Cell } from "../../classes/Cell";
import { CellComponent } from "../CellComponent/CellComponent";
import styles from "./FieldComponent.module.scss";

type FieldComponentProps = {
  className: string;
  onCellClick: (row: number, col: number) => void;
  field: Cell[][];
};

export function FieldComponent(props: FieldComponentProps) {
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
    return styles.field + " " + styles[props.className];
  };

  return <div className={getClassName()}>{fieldMap}</div>;
}
