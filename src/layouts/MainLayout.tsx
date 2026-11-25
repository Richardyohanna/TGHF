
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#F9F9F9]">
            <Navbar />
            
            {children}

        </div>
    )
}

export default MainLayout;