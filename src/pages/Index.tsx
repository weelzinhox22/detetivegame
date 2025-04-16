
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redireciona automaticamente para o dashboard após um curto atraso
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-noir-dark p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-detective text-white mb-3">Crime Chronicles</h1>
        <p className="text-gray-400 mb-8">Investigação criminal interativa</p>
        
        <motion.button
          className="bg-crime-police text-white py-3 px-6 rounded-full flex items-center justify-center space-x-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
        >
          <span className="font-detective">Iniciar Investigação</span>
          <ChevronRight size={18} />
        </motion.button>
      </motion.div>
      
      <motion.div
        className="fixed bottom-10 left-0 right-0 flex justify-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Carregando caso #1: O Último Brinde
      </motion.div>
    </div>
  );
}
