import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Modal from './donateButtonSmall';

const CustomPopup = ({ index, marker, closePopup }) => {
    return (
        <Modal>
            <Popup
                longitude={-95.758270}
                latitude={29.743360}
                onClose={closePopup}
                offsetTop={-30}
            >
                <div className="w-96 h-96 bg-white">Hello</div>
            </Popup>
        </Modal>

    )
};

export default CustomPopup