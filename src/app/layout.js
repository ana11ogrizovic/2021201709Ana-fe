'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <div className="container py-3">
            <Header />
            <main> <TestProvider>
                <ListActionProvider>
                    {children}
                </ListActionProvider>
            </TestProvider></main>
            <Footer />
        </div>
        </body>
        </html>
    );
}
