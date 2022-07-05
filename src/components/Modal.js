import React from "react";

function Modal({openModal,setOpenModal,children}) {
  return (
    <div
      id="open-modal"
      class="modal-window"
      style={
        openModal
          ? { visibility: "visible", opacity: "1", pointerEvents: "auto" }
          : {}
      }
    >
      <div>
        <a href="#" onClick={() => setOpenModal(false)} id="modelClose">
          <img
            src="data:image/png;base64,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"
            width={25}
            height={25}
          />
        </a>
        {children}
      </div>
    </div>
  );
}

export default Modal;
