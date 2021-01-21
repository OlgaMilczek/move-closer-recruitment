import './SwitchSlider.css'; 

function SwitchSlider( {toggleAction, checkedValue} ) {

    const onClick = (e) => {
        e.stopPropagation();
    };

    return <label className="switch" onClick={onClick}>
        <input type="checkbox" id="togBtn" onChange ={toggleAction} checked = {checkedValue}/>
        <div className="slider round">
            <span className="on">On</span>
            <span className="off">Off</span>
        </div>
    </label>;
}

export default SwitchSlider;