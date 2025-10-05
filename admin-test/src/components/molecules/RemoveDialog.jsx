import React from 'react';
    import CancelButton from '../atoms/CancelButton';
    import DialogRemoveBtn from '../atoms/DialogRemoveBtn';
    import { IoCloseCircleOutline } from 'react-icons/io5';
    
    const RemoveDialog = ({ isOpen, onClose, onConfirm }) => {
      if (!isOpen) return null;
    
      const handleConfirm = async () => {
        await onConfirm(); // Execute deletion function
            onClose(); // Close the dialog
      };
    
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
          <div className="relative z-50 w-full max-w-sm mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-2xl antialiased font-bold text-black">
                  Are you sure?
                </h3>
                <button
                  className="float-right text-3xl font-semibold leading-none bg-transparent border-0 outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <IoCloseCircleOutline className="text-black" />
                </button>
              </div>
              {/* Body */}
              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg antialiased leading-relaxed text-black text-blueGray-500 opacity-70">
                  You will not be able to recover the deleted record!
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-6 space-x-2 border-t border-solid rounded-b border-blueGray-200">
                <CancelButton onClick={onClose}>Cancel</CancelButton>
                <DialogRemoveBtn onClick={handleConfirm}>Yes, Delete it!</DialogRemoveBtn>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default RemoveDialog;
    