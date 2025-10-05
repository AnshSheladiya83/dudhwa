import React, { useState } from 'react';
    import TagList from './tags/TagList';
    
    const TagsInput = ({ label, placeHolderLabel, tags, setTags }) => {
      const [tagInput, setTagInput] = useState('');
      console.log("tags------",tags)
      const addTag = () => {
        if (tagInput.trim() !== '') {
          setTags([...tags, tagInput.trim()]);
          setTagInput('');
        }
      };
    
      const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
      };
    
      return (
        <div className="flex flex-col mb-4">
          <span className="text-xs font-medium uppercase font-urbanist text-rhythm">
            {label}<span className="text-sm text-primary">*</span>
          </span>
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder={placeHolderLabel}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-4 py-2 text-sm font-medium placeholder-gray-400 border rounded-md shadow-sm font-urbanist text-rhythm border-rhythm focus:border-border focus:outline-none"
            />
            <button
              onClick={addTag}
              className="px-4 py-2 ml-2 text-sm text-white rounded-lg bg-primary"
            >
              Add Tag
            </button>
          </div>
          {/* Display the list of tags */}
          <TagList tags={tags} removeTag={removeTag} />
        </div>
      );
    };
    
    export default TagsInput;
    