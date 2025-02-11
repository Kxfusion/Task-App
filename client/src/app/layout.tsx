import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A Small Demo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="font-sans bg-tmedium">
        <header className="w-full h-30 bg-tdark flex flex-row items-center place-content-center gap-1">
          <div className="text-3xl/6 font-black text-tblue">Todo</div>
          <div className="text-3xl/6 font-black text-tpurple">App</div>
        </header>
        {children}
      </body>
    </html>
  );
}
