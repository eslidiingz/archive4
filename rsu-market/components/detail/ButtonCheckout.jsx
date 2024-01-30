import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";

const ButtonCheckout = ({ buttonName, children, buttonClass }) => {
  const { toggle, visible } = useModal();
  return (
    <>
      <button className={buttonClass} onClick={() => toggle()}>
        {buttonName}
      </button>

      <Modal show={visible} onHide={toggle} size="lg">
        {children}
      </Modal>
    </>
  );
};

export default ButtonCheckout;
