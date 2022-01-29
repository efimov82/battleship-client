import { useState } from "react";
import { Toast } from "react-bootstrap";

export function NotificationComponent() {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Game started!</strong>
        <small>1 seconds ago</small>
      </Toast.Header>
      <Toast.Body>Woohoo, yere reading this text in a Toast!</Toast.Body>
    </Toast>
  );
}
