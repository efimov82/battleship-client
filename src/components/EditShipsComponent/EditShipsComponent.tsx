import Image from "next/image";
import { BsXCircleFill } from "react-icons/bs";
import { ShipsCount } from "../../types/common/game.types";
import styles from "./EditShipsComponent.module.scss";

type EditShipsComponentProps = {
  modeType: string;
  shipSize: number;
  shipsCount: ShipsCount;
  onSelectMode: (
    modeType: string,
    shipSize?: number,
    isVertical?: boolean
  ) => void;
  onAutoFillClick: () => void;
};

function EditShipsComponent(props: EditShipsComponentProps) {
  const getClassName = (shipSize: number): string => {
    return props.shipSize === shipSize ? styles.selectedButton : "";
  };

  return (
    <div className="m-2">
      <div className="d-flex align-content-center">
        <span className={getClassName(1)}>
          <Image
            onClick={() => props.onSelectMode("add", 1)}
            src="/images/shots.png"
            alt="x1"
            width="32"
            height="32"
          />
        </span>
        : {props.shipsCount.x1}
        <span className={getClassName(2)}>
          <Image
            onClick={() => props.onSelectMode("add", 2)}
            className="{modeAddX1}"
            src="/images/shots.png"
            alt="x2"
            width="50"
            height="32"
          />
        </span>
        : {props.shipsCount.x2}
        <span className={getClassName(3)}>
          <Image
            onClick={() => props.onSelectMode("add", 3)}
            src="/images/shots.png"
            alt="x3"
            width="60"
            height="32"
          />
        </span>
        : {props.shipsCount.x3}
        <span className={getClassName(4)}>
          <Image
            onClick={() => props.onSelectMode("add", 4)}
            src="/images/shots.png"
            alt="x4"
            width="100"
            height="32"
          />
        </span>
        : {props.shipsCount.x4}
      </div>
      <div className="d-flex align-content-center">
        <div className="btn btn-secondary" onClick={props.onAutoFillClick}>
          Auto
        </div>
        <div>
          <BsXCircleFill
            className={
              props.modeType === "delete"
                ? styles.deleteButtonSelected
                : styles.deleteButton
            }
            onClick={() => props.onSelectMode("delete")}
          />
          <div className="btn btn-primary">Go battle!</div>
        </div>
      </div>
    </div>
  );
}

export default EditShipsComponent;
