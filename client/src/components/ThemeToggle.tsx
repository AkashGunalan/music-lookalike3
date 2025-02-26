import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setDark] = useState(false);

    useEffect(() => {
        const applyTheme = (isDarkMode) => {
            setDark(isDarkMode);
            document.body.classList.toggle("dark", isDarkMode);
            document.body.classList.toggle("light", !isDarkMode)
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        }

        const savedTheme = localStorage.getItem("theme");

        if(savedTheme){
            if(savedTheme === "dark")
                applyTheme(true);
            else
                applyTheme(false);
        }else
            applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }, []);

    const handleThemeToggle = () => {
        const newTheme = !isDark;
        setDark(newTheme);
        document.body.classList.toggle("dark", newTheme);
        document.body.classList.toggle("light", !newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    }    

    return (
        <>
        <div onClick={handleThemeToggle} className="absolute top-8 left-8 scale-125 md:scale-150">
            {isDark ? <Moon /> : <Sun />}
        </div>
        </>
    );
}



export default ThemeToggle;
