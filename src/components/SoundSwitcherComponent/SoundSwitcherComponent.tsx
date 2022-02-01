import { useContext } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import AppContext from "../../AppContext";
import styles from "./SoundSwitcherComponent.module.scss";

export function SoundSwitcherComponent() {
  const context = useContext(AppContext);
  let { soundMuted } = context.state;

  return soundMuted ? (
    <BsFillVolumeMuteFill
      className={styles.soundIcon}
      onClick={() => context.setSoundMute(false)}
    />
  ) : (
    <BsFillVolumeUpFill
      className={styles.soundIcon}
      onClick={() => context.setSoundMute(true)}
    />
  );
}
