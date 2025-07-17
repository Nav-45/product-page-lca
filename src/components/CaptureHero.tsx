import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Sprout, 
  Package, 
  Factory, 
  Package2, 
  Truck, 
  Store, 
  Trash2,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { ScrollSection } from "./ScrollSection";
import { ValueChainStage } from "./ValueChainStage";
import { ProductVisual } from "./ProductVisual";
import { Button } from "./ui/button";

export const CaptureHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Value chain stages
  const valueChainStages = [
    { 
      icon: Sprout, 
      label: "Farming",
      emissionData: {
        activity: "Crop production",
        scope: "Scope 3",
        factor: "0.8 kg CO₂e/kg",
        amount: "0.96 kg CO₂e"
      }
    },
    { 
      icon: Package, 
      label: "Ingredients",
      emissionData: {
        activity: "Processing",
        scope: "Scope 3",
        factor: "0.3 kg CO₂e/kg",
        amount: "0.36 kg CO₂e"
      }
    },
    { 
      icon: Factory, 
      label: "Manufacturing",
      emissionData: {
        activity: "Production",
        scope: "Scope 1",
        factor: "0.2 kg CO₂e/kg",
        amount: "0.24 kg CO₂e"
      }
    },
    { 
      icon: Package2, 
      label: "Packaging",
      emissionData: {
        activity: "Materials",
        scope: "Scope 3",
        factor: "0.1 kg CO₂e/unit",
        amount: "0.12 kg CO₂e"
      }
    },
    { 
      icon: Truck, 
      label: "Transport",
      emissionData: {
        activity: "Logistics",
        scope: "Scope 3",
        factor: "0.15 kg CO₂e/km",
        amount: "0.45 kg CO₂e"
      }
    },
    { 
      icon: Store, 
      label: "Store",
      emissionData: {
        activity: "Retail",
        scope: "Scope 3",
        factor: "0.05 kg CO₂e/unit",
        amount: "0.06 kg CO₂e"
      }
    },
    { 
      icon: Trash2, 
      label: "Waste",
      emissionData: {
        activity: "Disposal",
        scope: "Scope 3",
        factor: "0.08 kg CO₂e/unit",
        amount: "0.10 kg CO₂e"
      }
    }
  ];

  // Transform values based on scroll progress
  const scene1Progress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scene2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const scene3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scene4Progress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const scene5Progress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Capture
          </motion.div>
          <div className="hidden md:flex space-x-8">
            <a href="#story" className="text-muted-foreground hover:text-foreground transition-colors">
              Our Story
            </a>
            <a href="#platform" className="text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <Button variant="outline" size="sm">
            Request Demo
          </Button>
        </div>
      </motion.nav>

      {/* Scene 1: The Invisible Carbon */}
      <ScrollSection className="section-gradient pt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            style={{ opacity: scene1Progress }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The <span className="text-gradient">Invisible</span> Carbon
            </motion.h1>
            
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ProductVisual showParticles={true} />
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Every product has a carbon story – but most companies can't see it.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 2: The Carbon Value Chain */}
      <ScrollSection className="bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene2Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The Carbon <span className="text-gradient">Value Chain</span>
            </motion.h2>

            {/* Value Chain Timeline */}
            <div className="relative">
              {/* Connection Line */}
              <motion.div
                className="absolute top-8 left-0 right-0 h-0.5 bg-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />

              {/* Stages */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-4">
                {valueChainStages.map((stage, index) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <ValueChainStage
                      icon={stage.icon}
                      label={stage.label}
                      index={index}
                      isActive={scene2Progress.get() > index * 0.15}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Carbon emissions are created at every stage.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 3: How Capture Helps */}
      <ScrollSection className="section-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene3Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              How <span className="text-gradient">Capture</span> Helps
            </motion.h2>

            {/* Enhanced Value Chain with Capture Data */}
            <div className="relative">
              <motion.div
                className="absolute top-8 left-0 right-0 h-0.5 bg-primary/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-4">
                {valueChainStages.map((stage, index) => (
                  <motion.div
                    key={`capture-${stage.label}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <ValueChainStage
                      icon={stage.icon}
                      label={stage.label}
                      index={index}
                      isActive={scene3Progress.get() > index * 0.15}
                      emissionData={stage.emissionData}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Capture breaks it down — from supply to shelf.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 4: The Emissions Dashboard */}
      <ScrollSection className="bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            style={{ opacity: scene4Progress }}
            className="text-center space-y-12"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The <span className="text-gradient">Emissions</span> Dashboard
            </motion.h2>

            {/* Dashboard Mockup */}
            <motion.div
              className="bg-card rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-left">Emissions by Scope</h3>
                  <div className="relative w-48 h-48 mx-auto">
                    <motion.div
                      className="absolute inset-0 rounded-full border-8 border-primary/20"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-8 border-primary border-r-transparent border-b-transparent"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 320 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">2.4</div>
                        <div className="text-sm text-muted-foreground">kg CO₂e</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                        Scope 3
                      </span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-primary/60 rounded mr-2"></div>
                        Scope 1
                      </span>
                      <span className="font-semibold">8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-primary/30 rounded mr-2"></div>
                        Scope 2
                      </span>
                      <span className="font-semibold">3%</span>
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-left">Emissions by Stage</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Farming", value: 40, amount: "0.96" },
                      { label: "Transport", value: 19, amount: "0.45" },
                      { label: "Ingredients", value: 15, amount: "0.36" },
                      { label: "Manufacturing", value: 10, amount: "0.24" },
                      { label: "Packaging", value: 5, amount: "0.12" },
                      { label: "Other", value: 11, amount: "0.27" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="w-16 text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <div className="w-12 text-sm font-medium text-right">
                          {item.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Visualise your impact. Understand your emissions. Report with confidence.
            </motion.p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Scene 5: Call to Action */}
      <ScrollSection className="section-gradient">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            style={{ opacity: scene5Progress }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to uncover your product's carbon footprint?
            </motion.h2>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ProductVisual showCleanBadges={true} />
            </motion.div>

            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's talk.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button size="lg" className="group">
                Start a Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  );
};