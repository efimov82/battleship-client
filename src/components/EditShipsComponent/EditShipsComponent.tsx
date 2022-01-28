import Image from "next/image";
import { ReactNode } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { ShipsCount } from "../../types/common/game.types";
import styles from "./EditShipsComponent.module.scss";

type EditShipsComponentProps = {
  modeType: string;
  shipSize: number;
  shipsCount: ShipsCount;
  isVertical: boolean;
  onSelectMode: (modeType: string, shipSize?: number) => void;
  onAutoFillClick: () => void;
  onStartButtonClick: () => void;
};

function EditShipsComponent(props: EditShipsComponentProps) {
  const getClassName = (shipSize: number): string => {
    return props.shipSize === shipSize ? styles.selectedButton : "";
  };

  const getImage = (shipSize: number, width: number) => {
    const src =
      props.shipSize === shipSize && props.isVertical
        ? "/images/ship-x1-v-1.png"
        : "/images/ship-x1-1.png";
    const alt = `x${shipSize}`;
    return (
      <Image
        onClick={() => props.onSelectMode("add", shipSize)}
        src={src}
        alt={alt}
        width={width}
        height="32"
      />
    );
  };

  const shipButton = (shipSize: number, width: number, shipsCount: number) => {
    return (
      <div className="col-2 col-md-1 d-flex">
        <span className={getClassName(shipSize)}>
          {getImage(shipSize, width)}
        </span>
        <span className="m-1">
          <span className="d-none d-sm-inline">x</span>{" "}
          <strong>{shipsCount}</strong>
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex">
        {shipButton(1, 32, props.shipsCount.x1)}
        {shipButton(2, 50, props.shipsCount.x2)}
        {shipButton(3, 50, props.shipsCount.x3)}
        {shipButton(4, 60, props.shipsCount.x4)}
      </div>
      <div className="d-flex align-content-center">
        <div className="btn btn-info" onClick={props.onAutoFillClick}>
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
          <div
            className="btn btn-primary ml-2"
            onClick={props.onStartButtonClick}
          >
            Start battle!
          </div>
        </div>
      </div>
    </>
  );
}

export default EditShipsComponent;
