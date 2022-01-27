import { Cell, CellTypeEnum } from "../../classes/Cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (row: number, col: number) => void;
  className: string;
};

export function CellComponent(props: CellComponentProps) {
  function getCellClass(cell: Cell): string[] {
    const res = [styles.cellWrapper];

    res.push(styles[cell.type]);
    res.push(styles[props.className]);

    return res;
  }

  // function cellLeftClick() {
  //   onCellClick(cell.getRow(), cell.getCol());
  // }

  // function cellonMouseEnter(e) {}

  function cellRightClick(e) {
    e.preventDefault();
  }

  return (
    <div
      onClick={() => props.onCellClick(props.cell.row, props.cell.col)}
      // onMouseEnter={cellonMouseEnter}
      // onMouseLeave={cellonMouseLeave}
      onContextMenu={cellRightClick}
      key={props.cell.row}
      className={getCellClass(props.cell).join(" ")}
    ></div>
  );
}
