import ReactDOM from "react-dom";
import styled from "styled-components";
import { Box } from "./Box";
import { InputGroup, Button } from "./Form";

const ModalDom = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
`;
ModalDom.Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.modal};
`;
ModalDom.Content = styled.div`
  position: relative;
  margin: auto;

  > ${Box} {
    min-width: 300px;
    min-height: 200px;
  }
`;

export function Modal({ children, open = false, setOpen }) {
  return ReactDOM.createPortal(
    <ModalDom open={open}>
      <ModalDom.Background onClick={(evt) => setOpen(false)}></ModalDom.Background>
      <ModalDom.Content>{children}</ModalDom.Content>
    </ModalDom>,
    document.body
  );
}

export function Confirm({ children, onConfirm, title = "Please confirm!", setOpen, ...props }) {
  return (
    <>
      <Modal setOpen={setOpen} {...props}>
        <Box>
          <h2 style={{ fontWeight: "bolder" }}>{title}</h2>
          {children}
          <InputGroup>
            <Button variant="danger" onClick={onConfirm}>
              Yes
            </Button>
            <Button variant="secondary" onClick={(evt) => setOpen(false)}>
              No
            </Button>
          </InputGroup>
        </Box>
      </Modal>
    </>
  );
}
