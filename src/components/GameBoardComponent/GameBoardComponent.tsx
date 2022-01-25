import { Cell } from "../../classes/Cell";
import { FieldComponent } from "../FieldComponent/FieldComponent";
import styles from "./GameBoardComponent.module.scss";

type GameBoardComponentProps = {
  showField1: boolean;
  showField2: boolean;
  field1: Cell[][]; //Field;
  field2: Cell[][];
};

export function GameBoardComponent(props: GameBoardComponentProps) {
  const onClickField = (e) => {
    console.log("x,y");
  };

  return (
    <div className="container">
      <div className={styles.gameBoard}>
        <div className="row">
          <div className="col m-1">
            {props.showField1 && (
              <FieldComponent
                field={props.field1}
                onCellClick={onClickField}
              ></FieldComponent>
            )}
          </div>

          <div className="col m-1">
            {props.showField2 && (
              <FieldComponent
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
