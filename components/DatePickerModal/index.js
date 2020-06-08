import React from 'react';
import { Modal, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { PROP_TYPES } from './constants';

/*
 * NOTE:
 * This file is a placeholder for unsupported platforms, and provides the
 *     documentation/autocomplete information. See the appropriate
 *     `.android.js`, `.ios.js`, etc files for the actual implementation.
 * Platform-specific implementations required as Android and iOS use different
 *     components for this.
 */

/**
 * When `visible` is true, renders a platform-specific date picker modal. This
 *     component is cross-platform, so props do not need to be
 *     platform-specific.
 */
const DatePickerModal = props => {
  const { onClose, visible } = props;

  return (
    <Modal visible={visible}>
      <Text>
				Not supported on this platform
      </Text>
      <Button onPress={onClose} title={'Close'} />
    </Modal>
  );
};

DatePickerModal.propTypes = PROP_TYPES;

export default DatePickerModal;