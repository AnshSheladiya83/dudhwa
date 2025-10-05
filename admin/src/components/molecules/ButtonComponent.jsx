// ButtonComponent.js
    import React from 'react';
    import ViewButton from '../atoms/ViewButton';
    import EditButton from '../atoms/EditButton';
    import RemoveButton from '../atoms/RemoveButton';
    
    const ButtonComponent = ({ type, navigateTo, onClick, itemId }) => {
      switch (type) {
        case 'view':
          return <ViewButton navigateTo={navigateTo} itemId={itemId}/>;
        case 'edit':
          return <EditButton navigateTo={navigateTo} itemId={itemId}/>;
        case 'remove':
          return <RemoveButton onClick={onClick} itemId={itemId} />;
        default:
          return null;
      }
    };
    
    export default ButtonComponent;
    
    