import React from "react";
import { useSelector } from "react-redux";

// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);
//   // dark:bg-[rgb(16,23,42)]
//   console.log("ThemeProvider rendered with theme:", theme);
//   return (
//     <div className={theme}>
//       <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-black  min-h-screen">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ThemeProvider;
// import React from "react";
// import { useSelector } from "react-redux";

// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);
  
//   // Ensure theme is either "dark" or "light"
//   const appliedTheme = theme === "dark" ? "dark" : "light";
  
//   return (
//     <div className={appliedTheme}>
//       <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen transition-colors duration-300">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ThemeProvider;

// const ThemeProvider = ({ children }) => {
//     const { theme } = useSelector((state) => state.theme);
    
//     return (
//       <div 
//         className="min-h-screen"
//         style={{
//           '--bg-color': theme === 'dark' ? 'rgb(16,23,42)' : '#ffffff',
//           '--text-color': theme === 'dark' ? '#e2e8f0' : '#374151'
//         }}
//       >
//         <div 
//           className="min-h-screen" 
//           style={{
//             backgroundColor: 'var(--bg-color)',
//             color: 'var(--text-color)'
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     );
//   };

// export default ThemeProvider;

// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);
  
//   return (
//     <div className={`${theme} h-full`}>
//       <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
//         {children}
//       </div>
//     </div>
//   );
// };

// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);
  
//   return (
//     <div className={`${theme} flex flex-col min-h-screen bg-white dark:bg-[rgb(16,23,42)]`}>
//       {children}
//     </div>
//   );
// };

// export default ThemeProvider;
// Then ensure your root HTML element has:
// <html className="h-full">
// <body className="h-full">

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--bg-color', 
      theme === 'dark' ? 'rgb(16,23,42)' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--text-color', 
      theme === 'dark' ? '#e2e8f0' : '#374151'
    );
  }, [theme]);
  
  return <>{children}</>;
};

export default ThemeProvider;

// import { useEffect } from 'react';


// const ThemeProvider = ({ children }) => {
//   const { theme } = useSelector((state) => state.theme);
  
//   useEffect(() => {
//     // Set CSS variables for your custom components
//     document.documentElement.style.setProperty(
//       '--bg-color', 
//       theme === 'dark' ? 'rgb(16,23,42)' : '#ffffff'
//     );
//     document.documentElement.style.setProperty(
//       '--text-color', 
//       theme === 'dark' ? '#e2e8f0' : '#374151'
//     );
    
//     // Toggle Flowbite's dark mode class
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);
  
//   return <>{children}</>;
// };

// export default ThemeProvider;