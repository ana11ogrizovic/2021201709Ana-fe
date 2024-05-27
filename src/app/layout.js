'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {TestProvider} from "@/contexts/testContext";
import {ListActionProvider} from "@/contexts/listActionContext";
import Provider from "@/app/provider";
import SessionStatusWrapper from "@/components/Session/SessionStatusWrapper";

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
