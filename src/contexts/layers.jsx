// LayersProvider.js
import React, { createContext, useContext, useState } from "react";
import { databases } from "../services/appwrite";
import { FaSpotify } from "react-icons/fa6";
import ConfirmationModal from "../components/core/elements/Modal/Modals/base/ConfirmationModal";

export const Layers = createContext(null);

export const LayersProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(null);
  const [location, setLocation] = useState([0, 0]);
  const showModal = (goal, jsx) => {
    setModal(jsx);
    setVisible(true);
    setLocation(goal);
  };
  const hideModal = () => {
    setModal(null);
    setVisible(false);
    setLocation([0, 0]);
  };

  const confirmationModal = (
    title,
    description,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
  ) => {
    showModal(
      "center",
      <ConfirmationModal
        title={title}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText={confirmText}
        cancelText={cancelText}
      />,
    );
  };

  return (
    <Layers.Provider
      value={{
        showModal,
        modal,
        visible,
        hideModal,
        location,
        confirmationModal,
      }}
    >
      {children}
    </Layers.Provider>
  );
};
