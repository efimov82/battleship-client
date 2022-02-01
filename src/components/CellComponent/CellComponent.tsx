import { Cell, CellState, CellTypeEnum } from "../../classes/Cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (row: number, col: number) => void;
  className: string;
};

export function CellComponent(props: CellComponentProps) {
  const getCellClass = (): string[] => {
    const res = [styles.cellWrapper];
    let name = props.cell.type.toString();
    if (props.cell.state === CellState.killed) {
      name += "_killed";
    }
    res.push(styles[name]);
    // res.push(styles.animated);

    return res;
  };

  const getContentClass = () => {
    if (props.cell.state === CellState.hitted) {
      if (props.cell.type === CellTypeEnum.empty) {
        return styles.emptyHitted + " " + styles.animated;
      } else {
        return styles.shipHitted + " " + styles.animated;
      }
    }
  };

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
      className={getCellClass().join(" ")}
    >
      <div className={getContentClass()}></div>
    </div>
  );
}
