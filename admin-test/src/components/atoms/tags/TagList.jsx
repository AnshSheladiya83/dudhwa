import React from 'react';
    import Tag from './Tag'; // import the Tag component
    
    const TagList = ({ tags, removeTag }) => {
      return (
        <div>
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} index={index} removeTag={removeTag} />
          ))}
        </div>
      );
    };
    
    export default TagList;
    