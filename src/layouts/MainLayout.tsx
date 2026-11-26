
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import StickyNav from "../components/StickyNav";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <StickyNav />

            {children}

        </div>
    )
}

export default MainLayout;