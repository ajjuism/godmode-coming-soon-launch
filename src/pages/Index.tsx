import { Button } from "@/components/ui/button";
import { Instagram, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import godmodeLogo from "@/assets/godmode-logo.svg";
import backgroundImage from "@/assets/background.png";

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/97 via-background/98 to-background" />
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(8_86%_53%_/_0.12),transparent)]" />
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full"
          style={{ filter: 'blur(100px)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/8 rounded-full"
          style={{ filter: 'blur(100px)' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.div 
          className="w-full max-w-3xl mx-auto text-center space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Logo with Sophisticated Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 
            }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent rounded-full"
              style={{ filter: 'blur(60px)' }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <img 
              src={godmodeLogo} 
              alt="TheGodMode Logo" 
              className="relative mx-auto w-full max-w-lg h-auto"
            />
          </motion.div>

          {/* Coming Soon with Stagger */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.h1 
                className="text-sm md:text-base font-light uppercase tracking-[0.4em] text-foreground/90"
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                Coming Soon
              </motion.h1>
              <motion.div 
                className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Godrip01 Section */}
          <motion.div 
            className="space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="space-y-3">
              <motion.div
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="font-display text-6xl md:text-7xl font-normal uppercase tracking-wider text-primary relative">
                  Godrip01
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </h2>
              </motion.div>
              <motion.p 
                className="text-xs md:text-sm text-foreground/70 font-light tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                First Drop — Available Now
              </motion.p>
            </div>

            <motion.p 
              className="text-sm md:text-base text-foreground/80 max-w-lg mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Preorders now open exclusively on Instagram. Limited quantities available.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="hero"
                size="lg"
                className="text-xs px-10 py-6 h-auto relative"
                onClick={() => window.open('https://www.instagram.com/thegodmode.in/', '_blank')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Instagram className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Preorder Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <p className="text-xs text-foreground/50 font-light tracking-[0.2em] uppercase">
              Website Launching Soon
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>
    </main>
  );
};

export default Index;
