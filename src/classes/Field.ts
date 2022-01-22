import { Cell, CellTypeEnum } from "./Cell";

export class Field {
  private field: Cell[][] = [];

  constructor(private rows: number, private cols: number) {
    this.initField();
  }

  // public setField(field: Cell[][]): void {
  //   this.field = field;
  //   this.rows = field.length;
  //   this.cols = field[0].length;
  // }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public getData(): Cell[][] {
    return this.field;
  }

  public openCell(cell: Cell) {
    // [Cell, Map<string, ICell>]
    // const targetCell = this.field[cell.row][cell.col];
    // let fieldUpdate = new Map<string, ICell>();
    // targetCell.open();
    // if (targetCell.isMined()) {
    //   fieldUpdate.set(targetCell.getId(), {
    //     row: targetCell.getRow(),
    //     col: targetCell.getCol(),
    //     countMines: 'x',
    //   });
    // } else if (targetCell.getMinesAround() !== 0) {
    //   fieldUpdate.set(targetCell.getId(), {
    //     row: targetCell.getRow(),
    //     col: targetCell.getCol(),
    //     countMines: targetCell.getMinesAround(),
    //   });
    // } else {
    //   fieldUpdate = this.openEmptyCells(cell.row, cell.col);
    // }
    // return [targetCell, fieldUpdate];
  }

  protected initField(): void {
    this.field = Array.from(Array(this.rows).keys(), (x) => []).map(
      (_, rowIndex) => {
        const cellsData = Array.from(
          Array(this.cols).keys(),
          (_, cellIndex) => new Cell(rowIndex, cellIndex)
        );
        return [...cellsData];
      }
    );
  }
}
