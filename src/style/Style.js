import PropTypes from 'prop-types';

function calClassName(selected) {
    if (selected === true) return 'Qr-item Qr-item-selected';
    return 'Qr-item';
}

const Style = ({ value, renderer, selected }) => (
    <div className={calClassName(selected)}>
        <div className="Qr-item-image">
            <div className="Qr-item-image-inner">{renderer}</div>
        </div>
        <div className="Qr-item-detail">{value}</div>
    </div>
);

Style.propTypes = {
    value: PropTypes.string.isRequired,
    renderer: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelected: PropTypes.func.isRequired,
};

export default Style;
