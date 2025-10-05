import React from 'react';
    import useNavigation from '../../hooks/useNavigation';
    
    const EditButton = ({ navigateTo ,itemId}) => {
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
                  opacity="0.4"
                  d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                  stroke="#2C3B44"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.24234 12.3258L8.24268 12.3234C8.2578 12.2151 8.31313 12.0405 8.41 11.8478C8.50675 11.6553 8.61389 11.5064 8.69021 11.4301L16.5702 3.55009C17.2073 2.91302 17.7872 2.56075 18.3431 2.50618C18.8598 2.45546 19.546 2.64653 20.4495 3.55009C21.3531 4.45366 21.5442 5.13985 21.4935 5.6565C21.4389 6.21249 21.0866 6.79236 20.4495 7.42943L12.5747 15.3043C12.4891 15.386 12.3351 15.4938 12.1443 15.5896C11.9492 15.6877 11.7767 15.7426 11.6738 15.7573L8.66763 16.1868C8.66708 16.1868 8.66654 16.1869 8.66599 16.187C8.31902 16.2343 8.09955 16.132 7.98038 16.0134C7.86243 15.8959 7.76157 15.6818 7.81193 15.3387L7.81234 15.3358L8.24234 12.3258Z"
                  fill="#2C3B44"
                  stroke="#2C3B44"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5 5.5C15.1781 7.91903 16.0709 8.81174 18.5 9.5"
                  stroke="#9D9B97"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
        </div>
      );
    };
    
    export default EditButton;
    