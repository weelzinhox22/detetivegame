
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Trash2 } from "lucide-react";

export default function CaseNotes() {
  const [notes, setNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  
  const handleSaveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes]);
      setNotes("");
    }
  };
  
  const handleDeleteNote = (index: number) => {
    const newNotes = [...savedNotes];
    newNotes.splice(index, 1);
    setSavedNotes(newNotes);
  };
  
  return (
    <div className="bg-noir-medium p-4 rounded-lg">
      <h2 className="text-lg font-detective mb-3">Suas Anotações</h2>
      
      <div className="bg-evidence-paper rounded-lg p-3 mb-4">
        <textarea
          className="w-full bg-transparent text-noir-dark font-typewriter text-sm resize-none min-h-[100px] outline-none"
          placeholder="Anote suas pistas e teorias aqui..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        
        <div className="flex justify-end">
          <motion.button
            onClick={handleSaveNote}
            className="flex items-center space-x-1 bg-crime-police text-white px-3 py-1 rounded text-sm font-detective"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!notes.trim()}
          >
            <Save size={14} />
            <span>Salvar</span>
          </motion.button>
        </div>
      </div>
      
      {savedNotes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-detective">Anotações Salvas</h3>
          
          {savedNotes.map((note, index) => (
            <motion.div
              key={index}
              className="bg-evidence-old p-3 rounded relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-noir-dark text-sm font-typewriter">{note}</p>
              
              <motion.button
                onClick={() => handleDeleteNote(index)}
                className="absolute top-2 right-2 text-crime-blood p-1 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={14} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
