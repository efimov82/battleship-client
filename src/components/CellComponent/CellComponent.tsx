import { Cell, CellTypeEnum } from "../../classes/Cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (row: number, col: number) => void;
};

export function CellComponent({
  cell,
  onCellClick,
}: // onCellMarked,
CellComponentProps) {
  function getCellClass(cell: Cell): string[] {
    const res = [styles.cellWrapper];

    switch (cell.getType()) {
      case CellTypeEnum.empty:
        res.push(styles.empty);
        break;
      case CellTypeEnum.water:
        res.push(styles.water);
        break;
      default:
    }
    return res;
  }

  function cellLeftClick() {
    onCellClick(cell.getRow(), cell.getCol());
  }

  function cellonMouseEnter(e) {}

  function cellonMouseLeave(e) {}

  return (
    <div
      onClick={cellLeftClick}
      onMouseEnter={cellonMouseEnter}
      onMouseLeave={cellonMouseLeave}
      //onContextMenu={cellRightClick}
      key={cell.getId()}
      className={getCellClass(cell).join(" ")}
    ></div>
  );
}
