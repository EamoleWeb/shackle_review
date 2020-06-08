import PropTypes from 'prop-types';

export const PROP_TYPES = {
  visible: PropTypes.bool.isRequired,
  initialDate: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func
};