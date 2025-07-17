import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Globe,
  Factory,
  Truck,
  Database,
  FileText,
  Mail,
  Calculator,
  BarChart3,
  Upload,
  Download,
  CheckCircle,
  Target,
  Zap,
  Settings
} from "lucide-react";
import { ScrollSection } from "./ScrollSection";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const EmissionsIQHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for each scene with earlier triggers for better readability
  const scene1Progress = useTransform(scrollYProgress, [0, 0.16], [0, 1]);
  const scene2Progress = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const scene3Progress = useTransform(scrollYProgress, [0.24, 0.42], [0, 1]);
  const scene4Progress = useTransform(scrollYProgress, [0.36, 0.56], [0, 1]);
  const scene5Progress = useTransform(scrollYProgress, [0.50, 0.7], [0, 1]);
  const scene6Progress = useTransform(scrollYProgress, [0.64, 0.84], [0, 1]);
  const scene7Progress = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Initial Loading Animation */}
      <motion.div
        className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-3xl font-bold text-gradient"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Emissions IQ
          </motion.div>
          <motion.div
            className="flex justify-center space-x-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Emissions IQ
          </motion.div>
          <div className="hidden md:flex space-x-8">
            <a href="#platform" className="text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <Button variant="outline" size="sm">
            Request Access
          </Button>
        </div>
      </motion.nav>

      {/* Scene 1: Where Emissions Begin */}
      <ScrollSection className="section-gradient pt-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.div
            className="space-y-12"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ 
                opacity: useTransform(scene1Progress, [0, 0.3], [1, 1]),
                y: useTransform(scene1Progress, [0, 0.3], [0, -10])
              }}
            >
              Where <span className="text-gradient">Emissions</span> Begin
            </motion.h1>
            
            {/* Abstract Globe with Industrial Zones */}
            <motion.div
              className="relative w-80 h-80 mx-auto mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Globe */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-iq-grey/30 bg-gradient-to-br from-background to-secondary/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {/* Industrial zones */}
                <motion.div className="absolute top-1/4 left-1/3 w-8 h-8 bg-iq-grey/60 rounded flex items-center justify-center">
                  <Factory className="w-4 h-4" />
                </motion.div>
                <motion.div className="absolute top-2/3 left-1/2 w-8 h-8 bg-iq-grey/60 rounded flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </motion.div>
                <motion.div className="absolute top-1/2 right-1/4 w-8 h-8 bg-iq-grey/60 rounded flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </motion.div>
                
                {/* Carbon flow lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-8 bg-iq-grey/40"
                    style={{
                      left: `${30 + i * 10}%`,
                      top: `${25 + i * 8}%`,
                      transformOrigin: 'center',
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  />
                ))}
              </motion.div>
              
              {/* Floating emission particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-iq-grey/60 rounded-full"
                  style={{
                    left: `${20 + (i % 4) * 20}%`,
                    top: `${15 + Math.floor(i / 4) * 25}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              style={{ 
                opacity: useTransform(scene1Progress, [0.4, 0.8], [0.9, 1]),
                scale: useTransform(scene1Progress, [0.4, 0.8], [0.98, 1])
              }}
            >
              Emissions start at every step – raw materials, energy, logistics, and more.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 2: The Consultant's Challenge */}
      <ScrollSection className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene2Progress, [0, 0.4], [0, 1]),
                scale: useTransform(scene2Progress, [0, 0.4], [0.95, 1])
              }}
            >
              The <span className="text-gradient">Consultant's</span> Challenge
            </motion.h2>

            {/* Consultant figure surrounded by scattered data */}
            <div className="relative max-w-4xl mx-auto">
              {/* Central consultant figure */}
              <motion.div
                className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Target className="w-12 h-12 text-primary" />
              </motion.div>

              {/* Floating data elements */}
              <div className="relative">
                {[
                  { icon: FileText, label: "Invoices", position: "top-0 left-1/4" },
                  { icon: Mail, label: "Emails", position: "top-8 right-1/4" },
                  { icon: Database, label: "Databases", position: "top-16 left-1/2" },
                  { icon: Calculator, label: "Spreadsheets", position: "bottom-16 left-1/3" },
                  { icon: BarChart3, label: "Reports", position: "bottom-8 right-1/3" },
                  { icon: Settings, label: "Factors", position: "bottom-0 left-1/2" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="bg-card rounded-lg p-4 shadow-lg border flex flex-col items-center space-y-2 hover:shadow-xl transition-shadow">
                      <item.icon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p 
              className="text-xl text-foreground max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                opacity: useTransform(scene2Progress, [0.6, 1], [0.9, 1])
              }}
            >
              Carbon consultants piece together data from scattered sources…
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 3: A Complex Puzzle */}
      <ScrollSection className="section-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene3Progress, [0, 0.3], [0, 1]),
                scale: useTransform(scene3Progress, [0, 0.3], [0.95, 1])
              }}
            >
              A <span className="text-gradient">Complex</span> Puzzle
            </motion.h2>

            {/* Grid building animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {/* Scope icons */}
              {[
                { label: "Scope 1", desc: "Direct emissions", color: "bg-primary/20" },
                { label: "Scope 2", desc: "Energy indirect", color: "bg-iq-blue/20" },
                { label: "Scope 3", desc: "Other indirect", color: "bg-iq-green/20" },
                { label: "Units", desc: "kWh, £, kg, km", color: "bg-iq-grey/20" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`${item.color} rounded-lg p-6 border hover:border-primary/50 transition-all cursor-pointer`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ scale: 1.03, y: -3 }}
                >
                  <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* LCA stages overlay */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {["Cradle-to-Gate", "Gate-to-Gate", "Gate-to-Grave", "Cradle-to-Grave"].map((stage, index) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {stage}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.p 
              className="text-xl text-foreground max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 1.2 }}
              style={{
                opacity: useTransform(scene3Progress, [0.7, 1], [0.9, 1])
              }}
            >
              …map it to frameworks, scopes, and factors…
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 4: Introducing Emissions IQ */}
      <ScrollSection className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene4Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene4Progress, [0, 0.3], [0, 1]),
                scale: useTransform(scene4Progress, [0, 0.3], [0.95, 1])
              }}
            >
              Introducing <span className="text-gradient">Emissions IQ</span>
            </motion.h2>

            {/* Dashboard animation */}
            <motion.div
              className="bg-card rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {/* Upload flow */}
                <motion.div
                  className="flex items-center justify-center space-x-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-primary" />
                    <span className="text-sm">Upload Invoice</span>
                  </div>
                  
                  <motion.div
                    className="w-16 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  
                  <div className="text-center">
                    <Zap className="w-12 h-12 mx-auto mb-2 text-iq-blue" />
                    <span className="text-sm">Auto-tag</span>
                  </div>
                  
                  <motion.div
                    className="w-16 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                  
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-iq-green" />
                    <span className="text-sm">Scope Tagged</span>
                  </div>
                </motion.div>

                {/* Scope mapping visualization */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { scope: "Scope 1", items: 3, color: "bg-primary/10 border-primary/30" },
                    { scope: "Scope 2", items: 5, color: "bg-iq-blue/10 border-iq-blue/30" },
                    { scope: "Scope 3", items: 12, color: "bg-iq-green/10 border-iq-green/30" },
                  ].map((scope, index) => (
                    <motion.div
                      key={scope.scope}
                      className={`${scope.color} rounded-lg p-4 border-2`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
                    >
                      <h4 className="font-semibold mb-2">{scope.scope}</h4>
                      <p className="text-2xl font-bold">{scope.items}</p>
                      <p className="text-sm text-muted-foreground">items tagged</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.p 
              className="text-xl text-foreground max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 1.5 }}
              style={{
                opacity: useTransform(scene4Progress, [0.7, 1], [0.9, 1])
              }}
            >
              Emissions IQ automates carbon calculations — from invoices to scope-tagged outputs.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 5: Clean Output, Client-Ready */}
      <ScrollSection className="section-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene5Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene5Progress, [0, 0.3], [0, 1]),
                scale: useTransform(scene5Progress, [0, 0.3], [0.95, 1])
              }}
            >
              Clean Output, <span className="text-gradient">Client-Ready</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Emissions chart */}
              <motion.div
                className="bg-card rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-left">Emissions by Scope</h3>
                <div className="space-y-4">
                  {[
                    { scope: "Scope 3", value: 85, amount: "12.8 tCO₂e", color: "bg-iq-green" },
                    { scope: "Scope 1", value: 10, amount: "1.5 tCO₂e", color: "bg-primary" },
                    { scope: "Scope 2", value: 5, amount: "0.7 tCO₂e", color: "bg-iq-blue" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.scope}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className="w-20 text-sm font-medium">{item.scope}</div>
                      <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                        />
                      </div>
                      <div className="w-20 text-sm text-right">{item.amount}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Export options */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-left">Export & Share</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { format: "PDF Report", icon: FileText },
                    { format: "CSV Data", icon: Download },
                    { format: "API Export", icon: Database },
                    { format: "Email Client", icon: Mail },
                  ].map((option, index) => (
                      <motion.button
                        key={option.format}
                        className="flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-secondary/50 hover:border-primary/50 transition-all"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                      <option.icon className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium">{option.format}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.p 
              className="text-xl text-foreground max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                opacity: useTransform(scene5Progress, [0.6, 1], [0.9, 1])
              }}
            >
              From messy data to verified results — delivered faster, with transparency.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 6: Built for Consultants */}
      <ScrollSection className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene6Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene6Progress, [0, 0.3], [0, 1]),
                scale: useTransform(scene6Progress, [0, 0.3], [0.95, 1])
              }}
            >
              Built for <span className="text-gradient">Consultants</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Scope Mapping Logic",
                  description: "Intelligent categorization of all emission sources",
                  icon: Target,
                },
                {
                  title: "Emission Factor Database",
                  description: "Comprehensive, up-to-date factors for all industries",
                  icon: Database,
                },
                {
                  title: "LCA Stage Builder",
                  description: "Flexible framework for any lifecycle assessment",
                  icon: Settings,
                },
                {
                  title: "Spend + Activity Data",
                  description: "Support for both monetary and physical data inputs",
                  icon: Calculator,
                },
                {
                  title: "Integration-Ready",
                  description: "API access and seamless tool connectivity",
                  icon: Zap,
                },
                {
                  title: "Verified Results",
                  description: "Traceable calculations with audit trail",
                  icon: CheckCircle,
                },
              ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 150
                    }}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-xl text-foreground max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                opacity: useTransform(scene6Progress, [0.6, 1], [0.9, 1])
              }}
            >
              Everything you need. Nothing you don't.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 7: Get Early Access */}
      <ScrollSection className="section-gradient">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            style={{ opacity: scene7Progress }}
            className="space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6 }}
              style={{
                opacity: useTransform(scene7Progress, [0, 0.3], [0, 1]),
                scale: useTransform(scene7Progress, [0, 0.3], [0.95, 1])
              }}
            >
              Get <span className="text-gradient">Early Access</span>
            </motion.h2>

            {/* Background data flow animation */}
            <motion.div
              className="relative h-32 mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-1 bg-primary/30 rounded"
                  style={{
                    left: `${-20 + i * 25}%`,
                    top: `${20 + i * 15}%`,
                  }}
                  animate={{
                    x: ["-100%", "500%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground font-medium">Clean interface. Flowing data.</p>
              </div>
            </motion.div>

            {/* CTA Form */}
            <motion.div
              className="bg-card rounded-2xl p-8 shadow-xl border max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Ready to transform your LCA workflow?</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company/Consultancy"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your current LCA process and challenges"
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="flex-1 sm:flex-none">
                  Request Access
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  Try the Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Join the pilot network of leading carbon consultants
              </p>
            </motion.div>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
};