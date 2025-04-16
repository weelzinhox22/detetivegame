
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, AlertTriangle, Trophy } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-detective text-white">Crime Chronicles</h1>
        <span className="text-sm text-gray-400">Detective Bureau</span>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-detective mb-3 text-crime-clue">Active Investigations</h2>
        <p className="text-sm text-gray-300 mb-3">Cases awaiting your detective skills</p>
        
        <div className="space-y-3">
          <CaseCard 
            title="O Último Brinde" 
            progress={30} 
            lastUpdated="Today" 
            isNew 
          />
          
          <CaseCard 
            title="Case #2" 
            progress={0} 
            lastUpdated="Coming soon" 
            isLocked
          />
          
          <CaseCard 
            title="Case #3" 
            progress={0} 
            lastUpdated="Coming soon" 
            isLocked
          />
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StatCard 
          title="Solve Rate" 
          value="34%" 
          icon={<Trophy size={16} className="text-yellow-400" />} 
        />
        <StatCard 
          title="Active Cases" 
          value="1" 
          icon={<BookOpen size={16} className="text-blue-400" />} 
        />
      </motion.div>
      
      <motion.div
        className="bg-crime-blood bg-opacity-20 p-4 rounded-lg flex items-center space-x-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="rounded-full bg-crime-blood bg-opacity-30 p-2">
          <AlertTriangle size={20} className="text-crime-blood" />
        </div>
        <div>
          <h3 className="text-sm font-detective">New evidence available</h3>
          <p className="text-xs text-gray-300">Check "O Último Brinde" case</p>
        </div>
      </motion.div>
    </div>
  );
}

interface CaseCardProps {
  title: string;
  progress: number;
  lastUpdated: string;
  isNew?: boolean;
  isLocked?: boolean;
}

function CaseCard({ title, progress, lastUpdated, isNew, isLocked }: CaseCardProps) {
  return (
    <motion.a 
      href={isLocked ? "#" : `/cases/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}
      className={`block bg-noir-light rounded-lg p-3 relative ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-opacity-80'}`}
      whileHover={isLocked ? {} : { scale: 1.02 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-detective text-md">{title}</h3>
        {!isLocked && <ChevronRight size={18} className="text-crime-clue" />}
        {isLocked && <span className="text-xs bg-noir-dark px-2 py-1 rounded">Locked</span>}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
        <span>Progress: {progress}%</span>
        <span>{lastUpdated}</span>
      </div>
      
      <div className="w-full bg-noir-dark rounded-full h-1.5 mt-2">
        <div className="bg-crime-clue h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-crime-blood text-white text-xs px-2 py-0.5 rounded-full">
          NEW
        </div>
      )}
    </motion.a>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <motion.div 
      className="bg-noir-medium p-3 rounded-lg"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{title}</span>
        {icon}
      </div>
      <p className="text-xl font-detective">{value}</p>
    </motion.div>
  );
}
