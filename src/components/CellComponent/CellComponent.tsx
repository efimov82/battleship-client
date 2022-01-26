import { Cell, CellTypeEnum } from "../../classes/Cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (row: number, col: number) => void;
};

export function CellComponent(props: CellComponentProps) {
  function getCellClass(cell: Cell): string[] {
    const res = [styles.cellWrapper];

    // res.push(styles[cell.type]); ???
    switch (cell.type) {
      case CellTypeEnum.empty:
        res.push(styles.empty);
        break;
      case CellTypeEnum.shipX1_1:
        res.push(styles.shipX1_1);
        break;
      case CellTypeEnum.shipX1_v_1:
        res.push(styles.shipX1_v_1);
        break;
      case CellTypeEnum.shipX2_1:
        res.push(styles.shipX2_1);
        break;
      case CellTypeEnum.shipX2_2:
        res.push(styles.shipX2_2);
        break;
      case CellTypeEnum.shipX2_v_1:
        res.push(styles.shipX2_v_1);
        break;
      case CellTypeEnum.shipX2_v_2:
        res.push(styles.shipX2_v_2);
        break;
      case CellTypeEnum.shipX2_v_1:
        res.push(styles.shipX2_v_1);
        break;
      case CellTypeEnum.shipX2_v_2:
        res.push(styles.shipX2_v_2);
        break;
      case CellTypeEnum.shipX3_1:
        res.push(styles.shipX3_1);
        break;
      case CellTypeEnum.shipX3_2:
        res.push(styles.shipX3_2);
        break;
      case CellTypeEnum.shipX3_3:
        res.push(styles.shipX3_3);
        break;
      case CellTypeEnum.shipX3_v_1:
        res.push(styles.shipX3_v_1);
        break;
      case CellTypeEnum.shipX3_v_2:
        res.push(styles.shipX3_v_2);
        break;
      case CellTypeEnum.shipX3_v_3:
        res.push(styles.shipX3_v_3);
        break;
      case CellTypeEnum.shipX4_1:
        res.push(styles.shipX4_1);
        break;
      case CellTypeEnum.shipX4_2:
        res.push(styles.shipX4_2);
        break;
      case CellTypeEnum.shipX4_3:
        res.push(styles.shipX4_3);
        break;
      case CellTypeEnum.shipX4_4:
        res.push(styles.shipX4_4);
        break;
      case CellTypeEnum.shipX4_v_1:
        res.push(styles.shipX4_v_1);
        break;
      case CellTypeEnum.shipX4_v_2:
        res.push(styles.shipX4_v_2);
        break;
      case CellTypeEnum.shipX4_v_3:
        res.push(styles.shipX4_v_3);
        break;
      case CellTypeEnum.shipX4_v_4:
        res.push(styles.shipX4_v_4);
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
