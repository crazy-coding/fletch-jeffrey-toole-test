import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setMode("dark");
    }
  }, []);

  const toogleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      setMode("light");
      document.documentElement.classList.remove("dark");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-md dark:shadow-gray-700 py-2 px-5 bg-white dark:bg-black dark:text-white relative flex items-center w-full justify-between">
      <Head>
        <title>Fletch - Jeffrey Toole</title>
        <meta
          name="description"
          content="Fletch Jeffrey Toole's Test project"
        />
        <meta
          name="keywords"
          content="fletch, jeffrey-toole, test, assessment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`text-2xl py-3`}>Fletch</div>
      <div className="flex">
        <button onClick={toogleTheme}>
          {mode === "dark" ? (
            <Image
              src="/sun-light.svg"
              alt="Light Mode"
              width={32}
              height={32}
            />
          ) : (
            <Image src="/sun-dark.svg" alt="Dark Mode" width={32} height={32} />
          )}
        </button>
      </div>
    </nav>
  );
}
