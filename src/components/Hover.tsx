import { useState } from 'react';
import { IconType } from 'react-icons'; // Import IconType for type safety

const HoverButton = ({ text, icon: Icon }: { text: string; icon: IconType }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
      >
        <Icon size={30}  /> 
      </button>
      {isHovered && (
        <div
          className=" absolute top-full left-1/2 transform -translate-x-1/2 text-black text-center rounded py-1 opacity-100 transition-opacity duration-300"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverButton;
