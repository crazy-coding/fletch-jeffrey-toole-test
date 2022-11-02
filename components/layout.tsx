import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="dark:bg-black dark:text-white">{children}</main>
      <Footer />
    </div>
  );
}
