import { useState } from "react";
import { Cell } from "../../classes/Cell";
import { FieldComponent } from "../FieldComponent/FieldComponent";
import ShipPanelComponent from "../ShipsPanelComponent/ShipPanelComponent";
import styles from "./GameBoardComponent.module.scss";

type GameBoardComponentProps = {
  showField1: boolean;
  showField2: boolean;
  field1: Cell[][]; //Field;
  field2: Cell[][];
};

export function GameBoardComponent(props: GameBoardComponentProps) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedShipSize, setSelectedShipSize] = useState(null);

  const onClickField = (e) => {
    console.log("x,y");
  };

  const handleSelectMode = (mode: string, shipSize: number = 0) => {
    setSelectedMode(mode);
    setSelectedShipSize(shipSize);

    console.log(mode, shipSize);
  };

  const handleonAutoFillClick = () => {};

  return (
    <div className="container">
      <div className={styles.gameBoard}>
        <div className="row">
          <ShipPanelComponent
            onSelectMode={handleSelectMode}
            onAutoFillClick={handleonAutoFillClick}
          />
        </div>
        <div className="row">
          <div className="col m-1">
            {props.showField1 && (
              <FieldComponent
                className="playerField"
                field={props.field1}
                onCellClick={onClickField}
              ></FieldComponent>
            )}
          </div>

          <div className="col m-1">
            {props.showField2 && (
              <FieldComponent
                className="rivalField"
                field={props.field2}
                onCellClick={onClickField}
              ></FieldComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
