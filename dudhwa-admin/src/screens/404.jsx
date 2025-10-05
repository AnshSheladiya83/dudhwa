import React from 'react'
    import NotFoundImg from '../assets/404.png'
    const NotFoundPage = () => {
      return (
        <div className="h-screen center-both">
            <img
                  src={NotFoundImg}
                  alt="flag"
                  className="fixed w-auto h-1/2"
                />
        </div>
      )
    }
    
    export default NotFoundPage;