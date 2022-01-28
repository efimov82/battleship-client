import { useState } from "react";
import { Cell } from "../../classes/Cell";
import { FieldComponent } from "../FieldComponent/FieldComponent";
import styles from "./GameBoardComponent.module.scss";
import EditShipsComponent from "../EditShipsComponent/EditShipsComponent";
import { ShipsCount } from "../../types/common/game.types";

type GameBoardComponentProps = {
  editMode: boolean;
  shipsCount1: ShipsCount;
  shipsCount2: ShipsCount;
  showField1: boolean;
  showField2: boolean;
  field1: Cell[][];
  field2: Cell[][];
  rivalName: string;
  onAutoFillClick: () => void;
  onStartButtonClick: () => void;
  onPlayerFieldClick: (
    row: number,
    col: number,
    editShipsData: EditShipsMode
  ) => void;
  onRivalFieldClick: (row: number, col: number) => void;
};

export type EditShipsMode = {
  modeType: "add" | "delete" | "";
  shipSize?: number;
  isShipVertical: boolean;
};

export function GameBoardComponent(props: GameBoardComponentProps) {
  const [editShipsMode, setEditShipsMode] = useState<EditShipsMode>({
    modeType: "",
    isShipVertical: false,
  });

  const handlePlayerFieldClick = (row: number, col: number) => {
    if (props.editMode) {
      props.onPlayerFieldClick(row, col, editShipsMode);
    }
  };
  const handleSelectEditShipsMode = (
    modeType: "add" | "delete" | "",
    shipSize?: number
  ) => {
    let isShipVertical = false;
    if (shipSize === editShipsMode.shipSize) {
      isShipVertical = !editShipsMode.isShipVertical;
    }

    setEditShipsMode({
      modeType,
      shipSize,
      isShipVertical,
    });
  };

  return (
    <div className="container">
      <div className={styles.gameBoard}>
        <div className="row">
          <div>Nickname: {props.rivalName}</div>
          <EditShipsComponent
            shipSize={editShipsMode.shipSize}
            modeType={editShipsMode.modeType}
            isVertical={editShipsMode.isShipVertical}
            shipsCount={props.shipsCount1}
            onSelectMode={handleSelectEditShipsMode}
            onAutoFillClick={props.onAutoFillClick}
            onStartButtonClick={props.onStartButtonClick}
          />
        </div>
        <div className="row">
          <div className="col m-1">
            {props.showField1 && (
              <FieldComponent
                className="playerField"
                field={props.field1}
                onCellClick={handlePlayerFieldClick}
              ></FieldComponent>
            )}
          </div>

          <div className="col m-1">
            {props.showField2 && (
              <FieldComponent
                className="rivalField"
                field={props.field2}
                onCellClick={props.onRivalFieldClick}
              ></FieldComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
