import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    if (
      window.localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <footer className="text-center dark:bg-black text-gray-600 dark:text-gray-200 py-5 border-t border-gray-300">
      Powered by{" "}
      <a
        href="https://www.linkedin.com/in/jeffrey-toole/"
        target="_blank"
        rel="linkedin"
      >
        Jeffrey Toole
      </a>
    </footer>
  );
}
