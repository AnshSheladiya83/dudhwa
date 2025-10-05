// useFieldValidation.js

    import useToast from "./useToast";
    
    const useFieldValidation = () => {
      const { showToast } = useToast(); // Assuming you have a toast library with a showToast function
    
      const validateFields = (fields, requiredFields) => {
        const emptyFields = requiredFields.filter(field => !fields[field].trim());
        if (emptyFields.length > 0) {
          const fieldName = emptyFields[0];
          showToast(`${fieldName} is required.`, { type: 'error' });
          return false; // Fields are not valid
        }
        return true; // Fields are valid
      };
    
      return validateFields;
    };
    
    export default useFieldValidation;
    