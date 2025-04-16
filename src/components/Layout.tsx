
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Home, User, FolderOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  // Define o tab ativo com base na URL atual
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path) {
      setActiveTab(path);
    }
  }, [location]);
  
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-noir-dark relative overflow-hidden">
      {/* Conteúdo principal */}
      <motion.main 
        className="flex-1 overflow-y-auto p-4 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-noir-medium border-t border-noir-light">
        <ul className="flex justify-around items-center">
          <NavItem 
            icon={<Home size={20} />} 
            label="Início" 
            path="dashboard" 
            isActive={activeTab === "dashboard"} 
          />
          <NavItem 
            icon={<FolderOpen size={20} />} 
            label="Casos" 
            path="cases" 
            isActive={activeTab === "cases"} 
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Estatísticas" 
            path="stats" 
            isActive={activeTab === "stats"} 
          />
          <NavItem 
            icon={<User size={20} />} 
            label="Perfil" 
            path="profile" 
            isActive={activeTab === "profile"} 
          />
        </ul>
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
}

function NavItem({ icon, label, path, isActive }: NavItemProps) {
  return (
    <li className="relative">
      <Link
        to={`/${path}`}
        className={cn(
          "flex flex-col items-center justify-center pt-2 pb-1 w-full",
          isActive ? "text-crime-clue" : "text-gray-400"
        )}
      >
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -top-1 left-2 right-2 h-0.5 bg-crime-clue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Link>
    </li>
  );
}
