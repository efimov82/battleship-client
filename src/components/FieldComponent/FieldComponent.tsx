import React from "react";
import { Cell } from "../../classes/Cell";
import { Field } from "../../classes/Field";
import { CellComponent } from "../CellComponent/CellComponent";
import styles from "./FieldComponent.module.css";

type FieldComponentProps = {
  onCellClick: (row: number, col: number) => void;
  field: Cell[][]; //Field;
};

export function FieldComponent(props: FieldComponentProps) {
  // extends React.PureComponent<

  //private field: Cell[][]; //Field;

  // constructor(props: FieldComponentProps, {}) {
  //   super(props);

  //   // this.field = new Field(props.rows, props.cols);
  // }
  // componentDidMount() {
  //   document.addEventListener("contextmenu", this.handleContextMenu);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("contextmenu", this.handleContextMenu);
  // }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleCellClick = (row, col) => {
    console.log(row, col);
  };

  const fieldMap = props.field.map((row, rowIndex) => {
    const rowComponent = row.map((cell, colIndex) => {
      return (
        <CellComponent
          key={`${rowIndex}_${colIndex}`}
          cell={cell}
          onCellClick={handleCellClick}
        />
      );
    });

    return rowComponent;
  });

  return <div className={styles.field}>{fieldMap}</div>;
}
