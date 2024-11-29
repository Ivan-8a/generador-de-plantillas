import "./globals.css";

export const metadata = {
  title: "Mi Proyecto",
  description: "Este es el punto de partida de mi app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
