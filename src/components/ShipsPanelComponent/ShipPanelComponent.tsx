import Image from "next/image";
import { BsXCircleFill } from "react-icons/bs";
import { useService } from "../../di/injector";
import { GameService } from "../../services/game.service";
import styles from "./ShipPanelComponent.module.scss";

type ShipPanelComponentProps = {
  onSelectMode: (mode: string, shipSize?: number) => void;
  onAutoFillClick: () => void;
};

function ShipPanelComponent(props: ShipPanelComponentProps) {
  const [gameService] = useService<GameService>(GameService);
  // const selectMode = (mode: string, typeShip: number) => {
  //   console.log(mode, typeShip);
  // };
  const onAutoFillClick = () => {
    gameService.autoFill();
  };

  return (
    <div className="m-2">
      <div className="d-flex align-content-center">
        <Image
          onClick={() => props.onSelectMode("add", 1)}
          src="/images/shots.png"
          alt="x1"
          width="32"
          height="32"
        />
        : 4
        <Image
          className="{modeAddX1}"
          src="/images/shots.png"
          alt="x1"
          width="50"
          height="32"
        />
        : 3
        <Image src="/images/shots.png" alt="x1" width="60" height="32" />: 2
        <Image src="/images/shots.png" alt="x1" width="100" height="32" />: 1
      </div>
      <div className="d-flex align-content-center">
        <div className="btn btn-secondary" onClick={onAutoFillClick}>
          Auto
        </div>
        <div>
          <BsXCircleFill
            className={styles.deleteButton}
            onClick={() => props.onSelectMode("delete")}
          />
        </div>
      </div>
    </div>
  );
}

export default ShipPanelComponent;
