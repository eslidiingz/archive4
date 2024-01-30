const Spinner = ({showText = false, text = 'Loading', style = {}, parentClassName = ''}) => {
    return (
        <div className={`d-flex justify-content-center ${parentClassName}`}>
            <div class="d-flex justify-content-center" style={{...style}}>
                <div class="spinner-border" role="status" />
            </div>
            {showText && <h4 className="ms-2">{text}</h4>}
        </div>
    );
};

export default Spinner;