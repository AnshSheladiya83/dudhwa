import React from 'react';
    import Tag from './Tag'; // import the Tag component
    
    const TagList = ({ tags, removeTag }) => {
      console.log(tags); // Log tags to see its value
    
      // Check if tags is an array before using map
      if (!Array.isArray(tags)) {
        console.error('Tags is not an array:', tags);
        return null; // Or render a message indicating an error
      }
    
      return (
        <div>
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} index={index} removeTag={removeTag} />
          ))}
        </div>
      );
    };
    
    export default TagList;
    