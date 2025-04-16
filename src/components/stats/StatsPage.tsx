
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, Clock, Lightbulb, Target } from "lucide-react";

export default function StatsPage() {
  // Sample data for the chart
  const data = [
    { name: "Case 1", rate: 35 },
    { name: "Case 2", rate: 45 },
    { name: "Case 3", rate: 30 },
    { name: "Case 4", rate: 60 },
    { name: "Case 5", rate: 40 },
  ];
  
  return (
    <div className="space-y-4">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-detective text-white">Performance</h1>
        <span className="text-sm text-gray-400">Detective Stats</span>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-detective mb-3 text-crime-clue">Solve Rate</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#394049" />
              <XAxis dataKey="name" stroke="#8E9196" />
              <YAxis stroke="#8E9196" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#242b33', borderColor: '#394049' }} 
                labelStyle={{ color: '#d4a017' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#d4a017" 
                strokeWidth={2} 
                dot={{ stroke: '#d4a017', strokeWidth: 2, r: 4, fill: '#242b33' }} 
                activeDot={{ stroke: '#d4a017', strokeWidth: 2, r: 6, fill: '#242b33' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SkillCard 
          title="Deduction" 
          value="65" 
          icon={<Brain size={16} className="text-purple-400" />}
        />
        <SkillCard 
          title="Observation" 
          value="78" 
          icon={<Target size={16} className="text-blue-400" />}
        />
        <SkillCard 
          title="Response Time" 
          value="42" 
          icon={<Clock size={16} className="text-green-400" />}
        />
        <SkillCard 
          title="Insight" 
          value="51" 
          icon={<Lightbulb size={16} className="text-yellow-400" />}
        />
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-detective mb-3">Cases Solved</h2>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="text-4xl font-detective text-crime-clue">0</div>
            <div className="text-xs text-gray-400 mt-1">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-detective text-crime-blood">1</div>
            <div className="text-xs text-gray-400 mt-1">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-detective text-gray-400">2</div>
            <div className="text-xs text-gray-400 mt-1">Upcoming</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface SkillCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function SkillCard({ title, value, icon }: SkillCardProps) {
  return (
    <motion.div 
      className="bg-noir-medium p-3 rounded-lg"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="flex items-end">
        <p className="text-xl font-detective">{value}</p>
        <span className="text-xs text-gray-400 ml-1 mb-1">/100</span>
      </div>
      <div className="w-full bg-noir-dark rounded-full h-1.5 mt-2">
        <div 
          className="bg-crime-clue h-1.5 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </motion.div>
  );
}
