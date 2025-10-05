import React from 'react';
    import PropTypes from 'prop-types';
    
    const Modal = ({ isOpen, onClose, children }) => {
      if (!isOpen) return null;
    
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
            <div className="p-4">
              {children}
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    Modal.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
    };
    
    export default Modal;
    