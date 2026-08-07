import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "E'xploreMe - Interactive 3D Cyber Portfolio",
  description: "An interactive 3D portfolio website built with Next.js 15, React Three Fiber, TypeScript, and Firebase. Explore software projects in a cyber purple world.",
  keywords: ["3D Portfolio", "React Three Fiber", "Next.js 15", "Cyber Purple", "Interactive WebGL"],
  openGraph: {
    title: "E'xploreMe - Interactive 3D Cyber Portfolio",
    description: "Walk freely through a cyber digital world showcasing developer projects and milestones.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#05050A] text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
