import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type GameOverComponentProps = {
  isPlayerWin: boolean;
  onNewGameClick: () => void;
};

export default function GameOverComponent(props: GameOverComponentProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.isPlayerWin
            ? "Congratulations! You won!"
            : "Sorry, you're lose... Let's play again?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onNewGameClick}>
            Play again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
