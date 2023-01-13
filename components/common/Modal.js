import React, { useState } from "react";
import {
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
  Input,
  Form,
  Button,
  ModalHeader,
} from "reactstrap";
import offerBanner from "../../public/assets/images/Offer-banner.png";

const ModalComponent = () => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <Button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                >
                </Button>
                <div className="offer-content">
                  <Media
                    src={offerBanner.src}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ModalComponent;
