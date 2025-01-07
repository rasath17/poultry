import React from 'react';

const Loading = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
            {/*<p style={styles.text}>Loading...</p>*/}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Make sure it appears above other elements
    },
    spinner: {
        border: '8px solid #f3f3f3', // Light background color
        borderTop: '8px solid #3498db', // Spinner color
        borderRadius: '50%',
        width: '50px', // Size of the spinner
        height: '50px', // Size of the spinner
        animation: 'spin 1s linear infinite', // Infinite spinning animation
    },
    text: {
        marginTop: '10px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

// Keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Loading;
