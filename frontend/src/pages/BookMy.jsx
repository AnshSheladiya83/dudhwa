import React, { useState } from 'react';

// --- Helper Components ---

/**
 * Common style object for inputs (to ensure consistency across all fields)
 */
const sharedInputStyle = {
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    height: '40px',
    boxSizing: 'border-box',
    width: '100%',
};

/**
 * A reusable input/select field with styling.
 */
const DetailInput = ({ type = 'text', placeholder, options = [], disabled = false }) => {
    
    // Custom style for select to mimic the dropdown arrow
    const selectCustomStyle = type === 'select' ? {
        appearance: 'none', 
        background: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\'%3e%3cpath d=\'M5 7.5L10 12.5L15 7.5H5Z\' fill=\'%23333\'/%3e%3c/svg%3e") no-repeat right 10px center',
        backgroundSize: '12px',
        paddingRight: '30px',
    } : {};

    const style = {
        ...sharedInputStyle,
        ...selectCustomStyle,
        backgroundColor: disabled ? '#f5f5f5' : 'white',
        color: disabled ? '#999' : '#333',
        cursor: disabled ? 'not-allowed' : 'auto',
    };

    if (type === 'select') {
        return (
            <select style={style} disabled={disabled}>
                <option value="" disabled selected>{placeholder}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    }

    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            style={style} 
            disabled={disabled}
        />
    );
};

/**
 * Renders a single row for a passenger (Adult/Child).
 * Simulates a controlled component for structure, though state is omitted for brevity.
 */
const PassengerRow = ({ title, passengerType, index }) => {
    // Determine the label text for the Full Name field
    const namePlaceholder = (index === 1 && passengerType === 'Adult') ? 'Same as ID' : 'Full Name (Same as ID)';

    // Passenger row styling
    const rowStyle = {
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 1fr', // Full Name | Gender | ID Type | ID Number | Age
        gap: '10px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: index === 1 ? '#fff' : '#f9f9f9', // Slightly different background for first row
        borderRadius: '6px',
        border: index === 1 ? '1px solid #eee' : 'none',
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
        display: 'block',
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>
                ID of {title}
            </h3>
            <div style={rowStyle}>
                {/* Full Name */}
                <DetailInput 
                    type="text" 
                    placeholder={namePlaceholder} 
                />
                
                {/* Gender */}
                <DetailInput 
                    type="select" 
                    placeholder="Gender" 
                    options={['Male', 'Female', 'Other']}
                />
                
                {/* Select ID Type */}
                <DetailInput 
                    type="select" 
                    placeholder="Select your ID Type" 
                    options={['Aadhaar', 'Passport', 'Voter ID']}
                />
                
                {/* ID Number */}
                <DetailInput 
                    type="text" 
                    placeholder="ID Number" 
                />
                
                {/* Age */}
                <DetailInput 
                    type="select" 
                    placeholder="Age" 
                    options={[...Array(60).keys()].map(i => i + 1)} // Ages 1 to 60
                />
            </div>
        </div>
    );
};

// --- Main Component ---
const PassengerDetailsForm = ({ initialAdults = 1, initialChildren = 0 }) => {
    // State is hardcoded here to simulate data passed from the previous step
    // In a real app, this would be props or context data
    const adultsCount = initialAdults;
    const childrenCount = initialChildren;

    // --- Dynamic Render Logic ---
    const renderAdults = () => {
        const rows = [];
        for (let i = 1; i <= adultsCount; i++) {
            rows.push(
                <PassengerRow 
                    key={`adult-${i}`} 
                    title={i === 1 ? `Person booking the tickets` : `Adult Passenger ${i}`} 
                    passengerType="Adult"
                    index={i}
                />
            );
        }
        return rows;
    };

    const renderChildren = () => {
        const rows = [];
        for (let i = 1; i <= childrenCount; i++) {
            rows.push(
                <PassengerRow 
                    key={`child-${i}`} 
                    title={`Children ${i}`} 
                    passengerType="Child"
                    index={i}
                />
            );
        }
        return rows;
    };

    // --- Inline Styles ---

    const mainContainerStyle = {
        maxWidth: '850px',
        margin: '40px auto',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
    };

    const noteContainerStyle = {
        padding: '20px',
        border: '1px solid #ff4d4f', // Red/Pink border
        borderRadius: '8px',
        marginTop: '30px',
        marginBottom: '30px',
        backgroundColor: '#fff0f0',
    };

    const noteTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ff4d4f',
        marginBottom: '15px',
    };

    const noteListItemStyle = {
        fontSize: '14px',
        color: '#333',
        marginBottom: '10px',
        lineHeight: '1.5',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '15px',
        paddingTop: '20px',
        borderTop: '1px solid #eee',
    };

    const prevButtonStyle = {
        padding: '10px 25px',
        backgroundColor: 'white',
        color: '#e96d2b',
        border: '1px solid #e96d2b',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    };
    
    const nextButtonStyle = {
        padding: '10px 25px',
        backgroundColor: '#e96d2b',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    };

    // --- Component Render ---

    return (
        <div style={mainContainerStyle}>
            {/* Passenger Rows */}
            {renderAdults()}
            {renderChildren()}

            {/* Please Note Section */}
            <div style={noteContainerStyle}>
                <div style={noteTitleStyle}>Please Note</div>
                <ol style={{ paddingLeft: '20px', margin: 0 }}>
                    <li style={noteListItemStyle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </li>
                    <li style={noteListItemStyle}>
                        Type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into.
                    </li>
                    <li style={noteListItemStyle}>
                        Electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </li>
                    <li style={noteListItemStyle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </li>
                </ol>
            </div>

            {/* Navigation Buttons */}
            <div style={buttonContainerStyle}>
                <button style={prevButtonStyle}>Previous</button>
                <button style={nextButtonStyle}>Next</button>
            </div>
        </div>
    );
};

export default PassengerDetailsForm;