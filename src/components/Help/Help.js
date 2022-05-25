import Popup from 'reactjs-popup';
import Question from '../../assets/images/question_icon.svg';
import Emotions from '../../assets/images/emotions.jpg';
import "./Help.scss"

const Help = () => {
    return (
        <Popup trigger={<input type="image" className="popup__icon" name="trashBin" src={Question} alt="text"></input>} modal nested>
        {close => (
            <div className="popup">
                <button className="popup__close" onClick={close}>&times;</button>
                <div className="popup__text">
                    <h1 className="popup__title"> About the app </h1>
                    <p className="popup__content">Color me up! Is an app that matches the feeling emotions of your messages and renders it into the background to join the party!</p>
                    <p className="popup__content">Why? Because we live in a world where people interacting on the internet never look at someone's feelings when they are trying to interact with each other. I believe our emotions are attached to our messages. Color me up! works to show the real emotion of any kind of messages or paragraphs that you submit.</p>
                    <p className="popup__content">How does it work? Color me up! Connects its backend to an API which runs a machine learning program to get the closest parameters to the emotion that wording is related to. Then show up on screen as the emotion-labels (each color is a different emotion, described in the graph below).</p>
                    <img className="popup__image" alt="help" src={Emotions}></img>
                </div>
            </div>
            )}
        </Popup>
    );
};

export default Help;