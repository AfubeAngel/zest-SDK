import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zest Payment Integration',
  description: 'Integrate Zest Payment Gateway in a Next.js 13 app',
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          strategy="beforeInteractive"
          src="https://sdk.dev.gateway.zestpayment.com/paymentgatewaysdk/omni-payment-gateway-sdk.js"
          // integrity="sha384-rp0/hmoRAhtqp1swmc1foqqjBhc+MJ6FidhLj4LuXjl2Q7egyh1jjY49TPHWVqqF"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

