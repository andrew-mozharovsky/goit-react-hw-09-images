import React, { useEffect } from "react";

const Modal = ({ closeModal, largeImage, alt }) => {
  useEffect(() => {
    const handleKeyDownEsc = (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDownEsc);
    return () => {
      window.removeEventListener("keydown", handleKeyDownEsc);
    };
  }, [closeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImage} alt={alt} />
      </div>
    </div>
  );
};
export default Modal;
