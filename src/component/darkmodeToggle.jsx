function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-sm text-gray-700 dark:text-gray-300">
        {darkMode ? "Dark" : "Light"}
      </span>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition 
        ${darkMode ? "bg-indigo-600" : "bg-gray-300"}`}
      >

        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition
          ${darkMode ? "translate-x-6" : "translate-x-1"}`}
        />

      </button>

    </div>
  );
}

export default DarkModeToggle;