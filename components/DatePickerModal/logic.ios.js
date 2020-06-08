import { useState, useEffect, useCallback, useMemo } from 'react';

export default props => {
  const today = useMemo(() => new Date(), []);

  const {
    initialDate,
    onSave,
    onClose
  } = props;

  // The current value of the date in the modal.
  const [date, setDate] = useState(initialDate || today);

  // When initialDate changed, also change initialDate.
  useEffect(() => setDate(initialDate || today), [initialDate]);

  // On cancel, close modal and change the current value back to the initial one.
  const onClosePress = useCallback(() => {
    onClose();
    setDate(initialDate || today);
  }, [onClose, setDate, initialDate]);

  // On confirm, submit the new value via props, and close modal.
  const onSavePress = useCallback(() => {
    onSave(date);
    onClose();
  }, [onSave, date, onClose]);

  const overlayActions = {
    close: onClosePress,
    save: onSavePress
  };

  return {
    date,
    overlayActions,
    onDateChange: (_, date) => setDate(date)
  };
};