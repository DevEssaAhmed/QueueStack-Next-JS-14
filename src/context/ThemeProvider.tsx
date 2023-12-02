"use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from 'react';

// interface ThemeContextTType {
//   theme: string;
//   setTheme: (theme: string) => void;

// }

// const ThemeContext = createContext<ThemeContextTType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState('dark');
//   const handleThemeChange = useCallback(() => {
//     if (
//       localStorage.theme === 'dark' ||
//       (!('theme' in localStorage) &&
//         window.matchMedia('(prefers-color-scheme: dark)').matches)
//     ) {
//       setTheme('dark');
//       document.documentElement.classList.add('dark');
//     } else {
//       setTheme('light');
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);

//   useEffect(() => {
//     handleThemeChange();
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }
import { ThemeProvider } from "next-themes";

export function MyThemeProvider({ children }: { children: any }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
