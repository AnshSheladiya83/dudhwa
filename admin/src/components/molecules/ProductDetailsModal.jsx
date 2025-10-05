import React, { useState,useEffect } from 'react';
    import CustomButton from '../atoms/CustomButton';
    import FormField from './FormField';
    import Modal from '../atoms/Modal';
    
    const ProductDetailsModal = ({ isOpen, onClose, onSave }) => {
      const [productDetails, setProductDetails] = useState({
        tax: '',
        quantity: '',
        discount: '',
        unitCost: ''
      });
    
      useEffect(() => {
        if (!isOpen) {
          // Reset product details when modal is closed
          setProductDetails({
            tax: '',
            quantity: '',
            discount: '',
            unitCost: ''
          });
        }
      }, [isOpen]);
    
      const handleInputChange = (field) => (event) => {
        const value = event.target ? event.target.value : event;
        setProductDetails({ ...productDetails, [field]: value });
      };
    
      const handleSave = () => {
        onSave(productDetails);
        // Reset product details after saving
        setProductDetails({
          tax: '',
          quantity: '',
          discount: '',
          unitCost: ''
        });
        onClose();
      };
    
    
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="p-4">
            <h2 className="mb-4 text-xl font-semibold">Add Product Details</h2>
            <FormField
              title="Tax"
              type="text"
              placeholder="Enter tax"
              value={productDetails.tax}
              onChange={handleInputChange('tax')}
            />
            <FormField
              title="Quantity"
              type="number"
              placeholder="Enter quantity"
              value={productDetails.quantity}
              onChange={handleInputChange('quantity')}
            />
            <FormField
              title="Discount"
              type="number"
              placeholder="Enter discount"
              value={productDetails.discount}
              onChange={handleInputChange('discount')}
            />
            <FormField
              title="Unit Cost"
              type="number"
              placeholder="Enter unit cost"
              value={productDetails.unitCost}
              onChange={handleInputChange('unitCost')}
            />
            <div className="flex mt-4 space-x-2">
              <CustomButton title="Save" onClick={handleSave} />
              <CustomButton title="Cancel" onClick={onClose} />
            </div>
          </div>
        </Modal>
      );
    };
    
    export default ProductDetailsModal;
    