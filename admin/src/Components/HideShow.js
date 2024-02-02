import React, { useEffect, useState } from 'react'

const HideShowComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <button onClick={toggleVisibility}>Toggle Visibility</button>
            {isVisible && (
                <div>
                </div>
            )}
        </>
    );
};

export default HideShowComponent;