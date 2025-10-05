import React from 'react';
    import useNavigation from '../../hooks/useNavigation';
    
    const ViewButton = ({ navigateTo,itemId }) => {
      const { goToPage } = useNavigation();
      const handleClick = () => {
        const updatedPath = navigateTo.replace('/id', `/${itemId}`);
        goToPage(updatedPath);
      };
      return (
        <div className="w-11 h-11 rounded-[10px] hover:bg-[#9199AF1A] hover:bg-opacity-10 center-both cursor-pointer" onClick={handleClick}>
          <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M1 12C1 13.6394 1.46746 14.1915 2.40238 15.2957C4.26916 17.5004 7.39993 20 12 20C16.6001 20 19.7308 17.5004 21.5976 15.2957C22.5325 14.1915 23 13.6394 23 12C23 10.3606 22.5325 9.80853 21.5976 8.70433C19.7308 6.49956 16.6001 4 12 4C7.39993 4 4.26916 6.49956 2.40238 8.70433C1.46746 9.80853 1 10.3606 1 12Z"
                  fill="#2C3B44"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM9.6 12C9.6 10.6745 10.6745 9.6 12 9.6C13.3255 9.6 14.4 10.6745 14.4 12C14.4 13.3255 13.3255 14.4 12 14.4C10.6745 14.4 9.6 13.3255 9.6 12Z"
                  fill="#2C3B44"
                />
              </svg>
        </div>
      );
    };
    
    export default ViewButton;