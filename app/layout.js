import "./globals.css";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import CursorSparkles from "../components/CursorSparkles";
import AnimatedBackground from "../components/AnimatedBackground";

export const metadata = {
  title: "Ansh Maurya | Full Stack Developer",
  description: "Portfolio of Ansh Maurya, Full Stack Developer and AI Integration Specialist from Kanpur, India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <AnimatedBackground />
        <CursorSparkles />
        <Navbar />
        <main className="pt-16 relative z-10">{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}
