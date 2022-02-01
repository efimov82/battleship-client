import Link from "next/link";
import { useTranslation } from "next-i18next";
import { LangSwitcherComponent } from "../LangSwitcherComponent/LangSwitcherComponent";
import { Container, Nav, Navbar } from "react-bootstrap";
import { SoundSwitcherComponent } from "../SoundSwitcherComponent/SoundSwitcherComponent";
import styles from "./MenuComponent.module.css";
export function MenuComponent(props: {}) {
  const { t } = useTranslation("menu");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className={styles.brand} href="/">
          <Navbar.Brand>Battleship</Navbar.Brand>
        </a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              <SoundSwitcherComponent />
            </Nav.Link>
            <Nav.Link>
              <LangSwitcherComponent />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
