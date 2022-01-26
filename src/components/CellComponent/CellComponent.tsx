import { Cell, CellTypeEnum } from "../../classes/Cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (row: number, col: number) => void;
};

export function CellComponent(props: CellComponentProps) {
  function getCellClass(cell: Cell): string[] {
    const res = [styles.cellWrapper];

    switch (cell.type) {
      case CellTypeEnum.empty:
        res.push(styles.empty);
        break;
      case CellTypeEnum.shipX1:
        res.push(styles.ship1v);
        break;
      case CellTypeEnum.shipX2:
        res.push(styles.ship2v);
        break;
      case CellTypeEnum.shipX3:
        res.push(styles.ship3v);
        break;
      case CellTypeEnum.shipX4:
        res.push(styles.ship4v);
        break;
      default:
    }
    return res;
  }

  // function cellLeftClick() {
  //   onCellClick(cell.getRow(), cell.getCol());
  // }

  // function cellonMouseEnter(e) {}

  // function cellonMouseLeave(e) {}

  return (
    <div
      onClick={() => props.onCellClick(props.cell.row, props.cell.col)}
      // onMouseEnter={cellonMouseEnter}
      // onMouseLeave={cellonMouseLeave}
      //onContextMenu={cellRightClick}
      key={props.cell.row}
      className={getCellClass(props.cell).join(" ")}
    ></div>
  );
}
