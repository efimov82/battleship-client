import React from "react";
import { Cell } from "../../classes/Cell";
import { Field } from "../../classes/Field";
import { CellComponent } from "../CellComponent/CellComponent";
import styles from "./FieldComponent.module.css";

type FieldComponentProps = {
  rows: number;
  cols: number;
  onCellClick: (row: number, col: number) => void;
  // field: Field;
};

export class FieldComponent extends React.PureComponent<
  FieldComponentProps,
  {}
> {
  private field: Field;

  constructor(props: FieldComponentProps, {}) {
    super(props);

    this.field = new Field(props.rows, props.cols);
  }
  // componentDidMount() {
  //   document.addEventListener("contextmenu", this.handleContextMenu);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("contextmenu", this.handleContextMenu);
  // }

  handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  render() {
    const fieldMap = this.field.getData().map((row, rowIndex) => {
      const rowComponent = row.map((cell, cellIndex) => {
        return (
          <div className={styles.filedRow} key={cellIndex.toString()}>
            <CellComponent
              cell={cell}
              onCellClick={this.props.onCellClick}
              // onCellMarked={this.props.onCellMarked}
            />
          </div>
        );
      });

      return (
        <div key={rowIndex.toString()} className={styles.filedRow}>
          {/* <div className={styles.rowLabel}>
            <span>{rowIndex + 1}</span>
          </div> */}
          {rowComponent}
        </div>
      );
    });

    return (
      <div className="mb-3">
        <div className="field">{fieldMap}</div>
      </div>
    );
  }
}
