import React from "react";
import DefaultModalSelector from "react-native-modal-selector";

const modalSelectorStyles = {
  style: { backgroundColor: "transparent", padding: 10 },
  selectStyle: { padding: 12, backgroundColor: "white" },
  overlayStyle: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  cancelStyle: { padding: 15, backgroundColor: "white" },
  optionContainerStyle: { padding: 0, backgroundColor: "white" },
  initValueTextStyle: { color: "rgba(0, 0, 0, 0.7)" },
  optionStyle: { padding: 15 },
};

const ModalSelector = ({ ...props }) => {
  return (
    <DefaultModalSelector
      animationType="fade"
      {...modalSelectorStyles}
      {...props}
    />
  );
};

export default ModalSelector;
