import { GoogleGenAI } from "@google/genai";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Gem, 
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Sparkles,
  Download,
  Loader2,
  Crown,
  Star,
  Quote,
  Play,
  Video,
  Key
} from "lucide-react";

const WATCHES = [
  {
    id: "submariner",
    name: "Submariner",
    tagline: "The reference among divers' watches",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000",
    description: "The Submariner's unidirectional rotatable bezel is key to the functionality of the watch. Its 60-minute graduation allows a diver to accurately and safely monitor diving time and decompression stops.",
    color: "bg-rolex-green",
    history: "Launched in 1953, the Submariner was the first divers' wristwatch waterproof to a depth of 100 metres (330 feet). It has since become the ultimate reference for divers' watches.",
    specs: {
      case: "Oyster, 41 mm, Oystersteel",
      movement: "Perpetual, mechanical, self-winding",
      waterResistance: "Waterproof to 300 metres / 1,000 feet",
      bezel: "Unidirectional rotatable 60-minute graduated, scratch-resistant Cerachrom insert in ceramic"
    },
    usps: ["Triplock triple waterproofness system", "Chromalight display with long-lasting blue luminescence", "Oysterlock safety clasp"]
  },
  {
    id: "day-date",
    name: "Day-Date",
    tagline: "The ultimate watch of prestige",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000",
    description: "The Day-Date was the first self-winding, waterproof chronometer wristwatch to display the date and the day of the week spelt out in full in a window on the dial.",
    color: "bg-rolex-gold",
    history: "Introduced in 1956, the Day-Date was the first watch to indicate the day of the week spelled out in full. It has been worn by more presidents, leaders and visionaries than any other watch.",
    specs: {
      case: "Oyster, 40 mm, 18 ct yellow gold",
      movement: "Calibre 3255, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Fluted"
    },
    usps: ["President bracelet", "Day and date display", "18 ct gold alloy"]
  },
  {
    id: "gmt-master-ii",
    name: "GMT-Master II",
    tagline: "The cosmopolitan watch",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000",
    description: "Designed to show the time in two different time zones simultaneously, the GMT-Master II is the ideal watch for world travellers.",
    color: "bg-blue-900",
    history: "The GMT-Master was originally designed for professional use to aid airline pilots. The GMT-Master II was launched in 1982, with a movement that allowed the hour hand to be set independently.",
    specs: {
      case: "Oyster, 40 mm, Oystersteel",
      movement: "Calibre 3285, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Bidirectional rotatable 24-hour graduated bezel. Two-colour Cerachrom insert"
    },
    usps: ["Two time zones", "Jubilee or Oyster bracelet", "Parachrom hairspring"]
  },
  {
    id: "daytona",
    name: "Cosmograph Daytona",
    tagline: "Born to race",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=1000",
    description: "The Cosmograph Daytona is the ultimate tool watch for those with a passion for driving and speed.",
    color: "bg-zinc-800",
    history: "Introduced in 1963, the Cosmograph Daytona was designed to meet the needs of professional racing drivers. It is an icon joined in name and function to the high-performance world of motor sport.",
    specs: {
      case: "Oyster, 40 mm, Oystersteel",
      movement: "Calibre 4131, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Fixed, with engraved tachymetric scale, in ceramic"
    },
    usps: ["Chronograph function", "Tachymetric scale", "High-performance movement"]
  },
  {
    id: "yacht-master-titanium",
    name: "Yacht-Master 42",
    tagline: "The watch of the open seas",
    image: "https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=1000",
    description: "The Yacht-Master combines function and style, while the Yacht-Master II brings together the finest Rolex technology to create a regatta chronograph.",
    color: "bg-slate-700",
    history: "The Yacht-Master was first introduced in 1992. It is the only Professional model available in three sizes: 37, 40 and 42 mm.",
    specs: {
      case: "Oyster, 42 mm, RLX titanium",
      movement: "Calibre 3235, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Bidirectional rotatable 60-minute graduated bezel with matt black Cerachrom insert"
    },
    usps: ["RLX titanium", "Oysterflex bracelet", "Bidirectional bezel"]
  },
  {
    id: "yacht-master-gold",
    name: "Yacht-Master 42 - Elite",
    tagline: "The pinnacle of nautical luxury",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000",
    description: "Crafted in 18 ct yellow gold, this Yacht-Master 42 is the most expensive and prestigious variant in the nautical collection, featuring a diamond-set dial and a high-polish finish.",
    color: "bg-rolex-gold",
    history: "This elite variant represents the ultimate evolution of the Yacht-Master, blending the ruggedness of a professional tool watch with the opulence of fine jewelry.",
    specs: {
      case: "Oyster, 42 mm, 18 ct yellow gold",
      movement: "Calibre 3235, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Bidirectional rotatable 60-minute graduated bezel with 18 ct yellow gold numerals"
    },
    usps: ["18 ct Yellow Gold", "Diamond-set markers", "Oysterflex high-performance bracelet"]
  },
  {
    id: "explorer",
    name: "Explorer",
    tagline: "The call of the peaks",
    image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=1000",
    description: "The Explorer is inspired by the knowledge gained from decades of experience in the Himalayas.",
    color: "bg-stone-900",
    history: "The Explorer was created following the first successful ascent of Mount Everest in 1953 by Sir Edmund Hillary and Tenzing Norgay.",
    specs: {
      case: "Oyster, 36 mm, Oystersteel",
      movement: "Calibre 3230, Manufacture Rolex",
      waterResistance: "Waterproof to 100 metres / 330 feet",
      bezel: "Smooth"
    },
    usps: ["3-6-9 numerals", "Highly legible Chromalight display", "Paraflex shock absorbers"]
  }
];

const NEW_GEN_WATCHES = [
  {
    id: "sky-dweller",
    name: "Sky-Dweller",
    tagline: "Mastering the world's time",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000",
    year: "2024 Edition",
    features: ["Annual Calendar", "Dual Time Zone", "Ring Command Bezel"]
  },
  {
    id: "sea-dweller",
    name: "Sea-Dweller",
    tagline: "The watch that conquered the deep",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000",
    year: "Next Gen",
    features: ["Helium Escape Valve", "Cerachrom Bezel", "Deepsea Challenge"]
  }
];

const StudioSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("A hyper-realistic 4K close-up of a Rolex Yacht-Master watch with a rose gold case and a black Oysterflex bracelet, resting on a luxury yacht deck at sunset, cinematic lighting, professional product photography");
  const [needsKey, setNeedsKey] = useState(false);

  const checkKey = async () => {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setNeedsKey(true);
      return false;
    }
    setNeedsKey(false);
    return true;
  };

  const handleOpenKey = async () => {
    await (window as any).aistudio.openSelectKey();
    setNeedsKey(false);
  };

  const generateImage = async (customPrompt?: string) => {
    const hasKey = await checkKey();
    if (!hasKey) {
      await handleOpenKey();
    }

    setIsGenerating(true);
    try {
      const apiKey = (process.env.API_KEY || process.env.GEMINI_API_KEY) as string;
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: customPrompt || prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
          break;
        }
      }
    } catch (error: any) {
      console.error("Generation failed:", error);
      const errorMessage = error.message || "";
      if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("403") || error.error?.code === 403) {
        setNeedsKey(true);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateEliteYachtMaster = () => {
    const elitePrompt = "A hyper-realistic 4K macro shot of an ultra-expensive Rolex Yacht-Master 42 in solid 18ct yellow gold, bezel set with baguette-cut diamonds and sapphires, diamond-paved dial, resting on a white silk cushion in a high-end jewelry boutique, dramatic soft lighting, 8k resolution, professional luxury photography";
    setPrompt(elitePrompt);
    generateImage(elitePrompt);
  };

  return (
    <section className="py-32 px-6 bg-zinc-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-rolex-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block"
            >
              Rolex Visual Studio
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-serif italic mb-8 leading-tight">
              Generate Your <br /> Perfect Timepiece
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Experience the future of luxury visualization. Use our AI-powered studio to generate high-definition, 4K renders of the Yacht-Master and other iconic models in any setting you imagine.
            </p>
            
            <div className="space-y-6">
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/10">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-3 block">Visual Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-sm focus:ring-0 resize-none h-24"
                  placeholder="Describe the watch and setting..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {needsKey ? (
                  <button 
                    onClick={handleOpenKey}
                    className="flex-1 bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rolex-gold transition-all"
                  >
                    <Key size={18} />
                    <span>Select API Key</span>
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => generateImage()}
                      disabled={isGenerating}
                      className="flex-1 bg-rolex-gold text-rolex-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>Crafting...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          <span>Generate 4K</span>
                        </>
                      )}
                    </button>
                    <button 
                      onClick={generateEliteYachtMaster}
                      disabled={isGenerating}
                      className="flex-1 bg-white/5 border border-white/20 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rolex-gold hover:text-rolex-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Gem size={18} />
                      <span>Elite Model</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group">
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.img 
                    key="generated"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={generatedImage} 
                    alt="Generated Rolex" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.div 
                    key="placeholder"
                    className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Clock className="text-zinc-700" size={40} />
                    </div>
                    <p className="text-zinc-500 text-sm">Your generated masterpiece will appear here. Start by clicking the generate button.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="animate-spin text-rolex-gold mx-auto mb-4" size={48} />
                    <p className="text-rolex-gold text-xs uppercase tracking-widest font-bold">Rendering Excellence</p>
                  </div>
                </div>
              )}

              {generatedImage && !isGenerating && (
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white hover:text-black transition-all">
                    <Download size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-rolex-black/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button className="text-white hover:text-rolex-gold transition-colors lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium">
            <a href="#" className="hover:text-rolex-gold transition-colors">Watches</a>
            <a href="#" className="hover:text-rolex-gold transition-colors">World of Rolex</a>
            <a href="#" className="hover:text-rolex-gold transition-colors">Retailers</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Crown className="text-rolex-gold mb-1" size={isScrolled ? 24 : 32} />
          </motion.div>
          <h1 className={`${isScrolled ? "text-xl" : "text-2xl lg:text-3xl"} font-serif tracking-[0.3em] uppercase font-light transition-all duration-500`}>
            Rolex
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-white hover:text-rolex-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:text-rolex-gold transition-colors">
            <MapPin size={16} />
            <span>Store Locator</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-rolex-black z-[60] lg:hidden flex flex-col p-8"
      >
        <div className="flex justify-end">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
            <X size={32} />
          </button>
        </div>
        <div className="flex flex-col gap-8 mt-12 text-2xl font-serif italic">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Watches</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>World of Rolex</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Retailers</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Store Locator</a>
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const curatedCollections = [
    { name: "Oyster Perpetual", desc: "The purest expression of the Oyster concept" },
    { name: "Professional Watches", desc: "Engineered for excellence in extreme conditions" },
    { name: "Classic Watches", desc: "Timeless elegance and prestige" },
    { name: "New 2024 Models", desc: "The latest innovations from the Manufacture" }
  ];

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000" 
          alt="Rolex Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 luxury-gradient"></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="w-20 h-20 border border-rolex-gold/30 rounded-full flex flex-col items-center justify-center mb-4 backdrop-blur-sm"
          >
            <span className="text-rolex-gold text-xl font-serif">121</span>
            <span className="text-[8px] uppercase tracking-widest text-white/60">Years</span>
          </motion.div>
          <span className="text-rolex-gold uppercase tracking-[0.4em] text-xs lg:text-sm block font-medium">
            A Crown for Every Achievement
          </span>
        </div>
        <h2 className="text-5xl lg:text-8xl font-serif italic font-light mb-8 leading-tight">
          The Essence of <br /> Excellence
        </h2>
        
        <div className="relative inline-block">
          <motion.button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-white/30 hover:border-rolex-gold hover:text-rolex-gold transition-all duration-300 px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium rounded-full relative z-20"
          >
            Explore Collection
          </motion.button>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[320px] bg-rolex-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-30"
              >
                <div className="text-left space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-rolex-gold font-bold block mb-2">Curated Selection</span>
                  {curatedCollections.map((col, idx) => (
                    <motion.div 
                      key={col.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group/item cursor-pointer"
                    >
                      <h4 className="text-white text-sm font-serif italic group-hover/item:text-rolex-gold transition-colors">{col.name}</h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">{col.desc}</p>
                    </motion.div>
                  ))}
                  <div className="pt-4 border-t border-white/5">
                    <button className="text-[10px] uppercase tracking-widest font-bold text-white flex items-center gap-2 hover:text-rolex-gold transition-colors">
                      View All Collections <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-rolex-black/80 border-t border-l border-white/10 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

interface WatchCardProps {
  watch: typeof WATCHES[0];
  index: number;
  key?: string | number;
}

const WatchDetailsModal = ({ watch, onClose }: { watch: typeof WATCHES[0], onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-rolex-black/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-white hover:text-black transition-all border border-white/10"
        >
          <X size={24} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-full">
            <img 
              src={watch.image} 
              alt={watch.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
          </div>

          <div className="p-8 lg:p-16">
            <span className="text-rolex-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              Rolex Heritage
            </span>
            <h2 className="text-4xl lg:text-6xl font-serif italic mb-6">{watch.name}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12 italic">
              "{watch.tagline}"
            </p>

            <div className="space-y-12">
              <section>
                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white mb-4 flex items-center gap-2">
                  <Clock size={14} className="text-rolex-gold" />
                  Historical Significance
                </h4>
                <p className="text-zinc-400 leading-relaxed">
                  {watch.history}
                </p>
              </section>

              <section>
                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-rolex-gold" />
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(watch.specs).map(([key, value]) => (
                    <div key={key} className="border-l border-rolex-gold/30 pl-4">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm text-zinc-200">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white mb-4 flex items-center gap-2">
                  <Gem size={14} className="text-rolex-gold" />
                  Unique Selling Points
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {watch.usps.map((usp, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-rolex-gold"></div>
                      {usp}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-rolex-gold text-rolex-black py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
                Configure This Watch
              </button>
              <button className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Find a Retailer
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WatchCard = ({ watch, index, onDiscover }: WatchCardProps & { onDiscover: (watch: typeof WATCHES[0]) => void }) => {
  const [is360Active, setIs360Active] = useState(false);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!is360Active || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) - 0.5;
    setRotation(percentage * 40); // Max 20 degrees tilt
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!is360Active || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) - 0.5;
    setRotation(percentage * 40);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden bg-zinc-900/50 rounded-2xl border border-white/5"
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => setRotation(0)}
        className="aspect-[4/5] overflow-hidden relative cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          {!is360Active ? (
            <motion.img 
              key="static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
              src={watch.image} 
              alt={watch.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.div 
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full h-full relative preserve-3d"
              >
                <img 
                  src={watch.image} 
                  alt={watch.name} 
                  className="w-full h-full object-cover grayscale-0"
                  referrerPolicy="no-referrer"
                />
                {/* Simulated Light Reflection */}
                <motion.div 
                  animate={{ x: -rotation * 5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-12"
                />
              </motion.div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10">
                Drag to Rotate
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIs360Active(!is360Active)}
          className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all z-20 ${is360Active ? "bg-rolex-gold text-rolex-black border-rolex-gold" : "bg-black/40 text-white border-white/20 hover:bg-white hover:text-black"}`}
        >
          <Clock size={18} className={is360Active ? "animate-pulse" : ""} />
        </button>
      </div>

      <div className="p-8">
        <span className="text-rolex-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
          Rolex Collection
        </span>
        <h3 className="text-3xl font-serif italic mb-4">{watch.name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {watch.tagline}
        </p>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => onDiscover(watch)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold group/btn"
          >
            <span>Discover More</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
          {is360Active && (
            <span className="text-rolex-gold text-[10px] font-bold uppercase tracking-widest animate-pulse">
              360° Active
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CinemaSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("A cinematic close-up of a Rolex Submariner watch underwater, sunlight rays piercing through the crystal clear blue water, bubbles gently rising, the watch face shimmering with luxury, 4k, slow motion");
  const [status, setStatus] = useState("");
  const [needsKey, setNeedsKey] = useState(false);

  const checkKey = async () => {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setNeedsKey(true);
      return false;
    }
    setNeedsKey(false);
    return true;
  };

  const handleOpenKey = async () => {
    await (window as any).aistudio.openSelectKey();
    setNeedsKey(false);
  };

  const generateVideo = async () => {
    const hasKey = await checkKey();
    if (!hasKey) {
      await handleOpenKey();
    }

    setIsGenerating(true);
    setVideoUrl(null);
    setStatus("Initializing Veo Engine...");

    try {
      // Use process.env.API_KEY for Veo models as they require a user-selected paid key
      const apiKey = (process.env.API_KEY || process.env.GEMINI_API_KEY) as string;
      const ai = new GoogleGenAI({ apiKey });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      setStatus("Crafting Cinematic Motion...");

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        setStatus("Refining Textures & Lighting...");
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        setStatus("Finalizing Render...");
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error: any) {
      console.error("Video generation failed:", error);
      
      let isPermissionError = false;
      const errorMessage = error.message || "";
      
      // Check for permission denied in various formats
      if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("403")) {
        isPermissionError = true;
      } else if (error.error?.status === "PERMISSION_DENIED" || error.error?.code === 403) {
        isPermissionError = true;
      }
      
      if (isPermissionError || errorMessage.includes("Requested entity was not found")) {
        setNeedsKey(true);
        setStatus("Access denied. A paid Google Cloud API key is required for Veo.");
      } else {
        setStatus("Generation failed. Please try again.");
      }
    } finally {
      setIsGenerating(false);
      setStatus("");
    }
  };

  return (
    <section className="py-32 px-6 bg-rolex-black border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <div className="aspect-video relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl">
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-rolex-gold/20 flex items-center justify-center mb-6 mx-auto border border-rolex-gold/30">
                      <Video className="text-rolex-gold" size={32} />
                    </div>
                    <h3 className="text-xl font-serif italic mb-2">Rolex Cinema</h3>
                    <p className="text-zinc-400 text-sm max-w-xs mx-auto">Generate a cinematic 4K motion sequence of your chosen timepiece.</p>
                  </div>
                </div>
              )}
              
              {isGenerating && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-rolex-gold/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-rolex-gold rounded-full animate-spin"></div>
                      <Crown className="absolute inset-0 m-auto text-rolex-gold animate-pulse" size={32} />
                    </div>
                    <p className="text-rolex-gold text-xs uppercase tracking-[0.3em] font-bold mb-2">Veo Engine Active</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">{status}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-rolex-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block"
            >
              The Art of Motion
            </motion.span>
            <h2 className="text-4xl lg:text-6xl font-serif italic mb-8 leading-tight">
              Cinematic <br /> Masterpieces
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Witness the fluid precision of Rolex movements through AI-generated cinematography. Our Veo-powered studio creates high-definition sequences that capture the interplay of light, water, and steel.
            </p>
            
            <div className="space-y-6">
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/10">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-3 block">Director's Script</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-sm focus:ring-0 resize-none h-24"
                  placeholder="Describe the cinematic scene..."
                />
              </div>
              
              <div className="flex flex-col gap-4">
                {needsKey ? (
                  <button 
                    onClick={handleOpenKey}
                    className="w-full bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rolex-gold transition-all"
                  >
                    <Key size={18} />
                    <span>Select API Key to Begin</span>
                  </button>
                ) : (
                  <button 
                    onClick={generateVideo}
                    disabled={isGenerating}
                    className="w-full bg-rolex-gold text-rolex-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Rendering Scene...</span>
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        <span>Generate Cinematic Video</span>
                      </>
                    )}
                  </button>
                )}
                <p className="text-[9px] text-zinc-600 uppercase tracking-widest text-center">
                  Powered by Veo 3.1 • High Definition 1080p • 16:9 Aspect Ratio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientFeedback = () => {
  const feedbacks = [
    {
      name: "Alexander Sterling",
      role: "Collector",
      text: "The precision and heritage of Rolex are unmatched. My Submariner has been with me through every major milestone of my life.",
      rating: 5
    },
    {
      name: "Elena Vance",
      role: "Professional Diver",
      text: "In the depths of the ocean, reliability is everything. Rolex doesn't just make watches; they make life-saving instruments.",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      role: "Entrepreneur",
      text: "Wearing a Rolex is a statement of intent. It represents the culmination of hard work and the pursuit of perfection.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 px-6 bg-rolex-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <Crown className="w-full h-full text-rolex-gold" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-rolex-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block"
          >
            Client Testimonials
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-serif italic">Voices of Excellence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 backdrop-blur-sm flex flex-col"
            >
              <Quote className="text-rolex-gold mb-6 opacity-50" size={32} />
              <p className="text-zinc-400 italic mb-8 flex-grow leading-relaxed">
                "{item.text}"
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-rolex-gold text-rolex-gold" />
                ))}
              </div>
              <div>
                <h4 className="text-white font-serif italic text-lg">{item.name}</h4>
                <span className="text-rolex-gold text-[10px] uppercase tracking-widest font-bold">{item.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Craftsmanship = () => {
  return (
    <section className="py-32 px-6 bg-rolex-cream text-rolex-black">
      <div className="max-w-7xl mx-auto grid lg:grid-auto-cols lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-rolex-green uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            The Art of Watchmaking
          </span>
          <h2 className="text-4xl lg:text-6xl font-serif italic mb-8 leading-tight">
            Crafted with <br /> Uncompromising Precision
          </h2>
          <p className="text-zinc-600 leading-relaxed mb-10 text-lg">
            Every Rolex watch is designed, manufactured and tested with constant attention to the tiniest of details. This unique approach ensures that every timepiece meets the highest standards of performance and aesthetics.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <ShieldCheck className="text-rolex-green" size={32} />
              <h4 className="font-semibold uppercase text-xs tracking-widest">Superlative Chronometer</h4>
              <p className="text-xs text-zinc-500">Certified precision beyond industry standards.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Gem className="text-rolex-green" size={32} />
              <h4 className="font-semibold uppercase text-xs tracking-widest">Oystersteel</h4>
              <p className="text-xs text-zinc-500">Specially developed high-performance alloy.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-square rounded-full overflow-hidden border-[20px] border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=1000" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rolex-green rounded-full flex items-center justify-center text-white text-center p-6 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
              100% In-House <br /> Manufacture
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-rolex-black pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-serif tracking-[0.3em] uppercase font-light mb-8">Rolex</h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Rolex is a Swiss luxury watch manufacturer based in Geneva. Founded in 1905, Rolex has become a global icon of prestige and excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Collections</h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Oyster Perpetual</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Professional Watches</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Classic Watches</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">New Watches 2024</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Buying a Rolex</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Care and Service</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">Find a Retailer</a></li>
              <li><a href="#" className="hover:text-rolex-gold transition-colors">User Manuals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-6">Subscribe to receive updates on new collections and events.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-rolex-gold transition-colors"
              />
              <button className="bg-rolex-gold text-rolex-black rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            © 2024 Rolex. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const NewGenSection = () => {
  return (
    <section className="py-32 bg-rolex-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-rolex-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block"
            >
              The Next Generation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-7xl font-serif italic leading-tight"
            >
              Defining the <br /> Future of Time
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 max-w-sm text-sm leading-relaxed"
          >
            Pushing the boundaries of horological engineering with advanced materials and revolutionary movements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {NEW_GEN_WATCHES.map((watch, index) => (
            <motion.div 
              key={watch.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative group h-[600px] rounded-3xl overflow-hidden border border-white/10"
            >
              <img 
                src={watch.image} 
                alt={watch.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-rolex-gold text-rolex-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                      {watch.year}
                    </span>
                    <h3 className="text-4xl font-serif italic mb-2">{watch.name}</h3>
                    <p className="text-zinc-300 text-sm italic">{watch.tagline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {watch.features.map(feature => (
                    <span key={feature} className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-white/70">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all">
                  Explore Technology
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedWatch, setSelectedWatch] = useState<typeof WATCHES[0] | null>(null);

  return (
    <div className="min-h-screen bg-rolex-black selection:bg-rolex-gold selection:text-rolex-black">
      <Navbar />
      
      <AnimatePresence>
        {selectedWatch && (
          <WatchDetailsModal 
            watch={selectedWatch} 
            onClose={() => setSelectedWatch(null)} 
          />
        )}
      </AnimatePresence>

      <main>
        <Hero />

        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-rolex-gold uppercase tracking-[0.5em] text-xs font-bold mb-4 block"
            >
              The Collection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-serif italic"
            >
              Iconic Timepieces
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WATCHES.map((watch, index) => (
              <WatchCard 
                key={watch.id} 
                watch={watch} 
                index={index} 
                onDiscover={setSelectedWatch}
              />
            ))}
          </div>
        </section>

        <NewGenSection />

        <StudioSection />

        <CinemaSection />

        <ClientFeedback />

        <Craftsmanship />

        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=2000" 
            alt="Rolex Heritage" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center max-w-3xl px-6">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-4xl lg:text-7xl font-serif italic mb-8"
            >
              A Legacy of <br /> Innovation
            </motion.h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-10">
              From the first waterproof wristwatch to the development of the Perpetual rotor, Rolex has been at the forefront of horological innovation for over a century.
            </p>
            <button className="text-rolex-gold uppercase tracking-[0.3em] text-xs font-bold border-b border-rolex-gold pb-2 hover:text-white hover:border-white transition-all">
              Our History
            </button>
          </div>
        </section>

        <section className="py-32 px-6 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl lg:text-5xl font-serif italic mb-6">Find Your Rolex</h3>
              <p className="text-zinc-400 mb-8">Visit an Official Rolex Retailer to discover the collection and receive expert advice on choosing the perfect timepiece.</p>
              <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-rolex-gold transition-colors">
                <MapPin size={16} />
                <span>Find a Retailer</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="aspect-square w-full lg:w-48 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=400" alt="Store 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square w-full lg:w-48 rounded-2xl overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400" alt="Store 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
