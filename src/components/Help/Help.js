import Popup from 'reactjs-popup';
import Question from '../../assets/images/question_icon.svg';
import "./Help.scss"

const Help = () => {
    return (
        <Popup trigger={<input type="image" className="popup__icon" name="trashBin" src={Question} alt="text"></input>} modal nested>
        {close => (
            <div className="popup">
                <button className="popup__close" onClick={close}>&times;</button>
                <div className="popup__text">
                    <h1 className="popup__title"> About the app </h1>
                    <p className="popup__content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                </div>
            </div>
            )}
        </Popup>
    );
};

export default Help;