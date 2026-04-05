import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-12 h-6 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 shadow-inner transition-all"
    >
      <motion.div
        initial={false}
        animate={{ x: darkMode ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        {darkMode ? <Moon className="w-3 h-3 text-gray-700" /> : <Sun className="w-3 h-3 text-yellow-500" />}
      </motion.div>
    </motion.button>
  );
}
