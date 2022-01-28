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
  onAutoFillClick: () => void;
};

type editShipsMode = {
  modeType: "add" | "delete" | "";
  shipSize?: number;
  isShipVertical: boolean;
};

export function GameBoardComponent(props: GameBoardComponentProps) {
  // const [editMode, setSelectedMode] = useState(null);
  // const [selectedShipSize, setSelectedShipSize] = useState(null);
  const [editShipsMode, setEditShipsMode] = useState<editShipsMode>({
    modeType: "",
    isShipVertical: false,
  });

  const onPlayerFieldClick = (e) => {
    console.log("x,y");
  };

  const onRivalFieldClick = (e) => {};

  const handleSelectEditShipsMode = (
    modeType: "add" | "delete" | "",
    shipSize?: number,
    isVertical?: boolean
  ) => {
    if (shipSize === editShipsMode.shipSize) {
      shipSize = 0;
      modeType = "";
    }
    setEditShipsMode({
      modeType,
      shipSize,
      isShipVertical: editShipsMode.isShipVertical,
    });
  };

  return (
    <div className="container">
      <div className={styles.gameBoard}>
        <div className="row">
          <EditShipsComponent
            shipSize={editShipsMode.shipSize}
            modeType={editShipsMode.modeType}
            shipsCount={props.shipsCount1}
            onSelectMode={handleSelectEditShipsMode}
            onAutoFillClick={props.onAutoFillClick}
          />
        </div>
        <div className="row">
          <div className="col m-1">
            {props.showField1 && (
              <FieldComponent
                className="playerField"
                field={props.field1}
                onCellClick={onPlayerFieldClick}
              ></FieldComponent>
            )}
          </div>

          <div className="col m-1">
            {props.showField2 && (
              <FieldComponent
                className="rivalField"
                field={props.field2}
                onCellClick={onRivalFieldClick}
              ></FieldComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
