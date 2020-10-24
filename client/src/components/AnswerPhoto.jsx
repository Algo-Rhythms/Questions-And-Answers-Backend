import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';

const AnswerPhoto = ({answer}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [clicked, setClick] = useState('');
  const handleShow = (url) => {
    setClick(url);
    setShow(true);
  };
  

  const mappedPhotos = answer.photos.length && answer.photos[0].url !== "" ? answer.photos.map((photo, i) =>
    <div key={i}>
      <Figure>
        <Image
          width={100}
          height={100}
          style={{paddingLeft: '5px', borderRadius: '8px', cursor: 'pointer'}}
          alt="user img of product"
          src={photo.url}
          onClick={() => handleShow(photo)}
        />
        <Modal
          centered
          show={show}
          onHide={handleClose}
          src={clicked}
        >
          <Image
            width={500}
            height={400}
            // eslint-disable-next-line max-len
            style={{padding: '4px', borderRadius: '8px', cursor: 'pointer', marginBottom: '0px'}}
            alt="user img of product"
            src={clicked.url}
            onClick={() => handleClose()}
          />
        </Modal>
      </Figure>
    </div> ) : '';

  return (
    <Row style={{marginLeft: '26px'}}>
      {mappedPhotos}
    </Row>
  );
};

export default AnswerPhoto;
