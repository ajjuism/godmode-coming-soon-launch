import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/background.png";

const godmodeLogo = "/godmode-logo-svg 1.png";

const Index = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadingScreenRemoved = useRef(false);

  useEffect(() => {
    // Preload critical images
    const imagesToLoad = [godmodeLogo, backgroundImage];
    let loadedCount = 0;

    const removeLoadingScreen = () => {
      if (!loadingScreenRemoved.current) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.parentNode) {
          loadingScreen.classList.add('loaded');
          // Remove from DOM after transition
          setTimeout(() => {
            if (loadingScreen.parentNode) {
              loadingScreen.remove();
            }
          }, 500);
          loadingScreenRemoved.current = true;
        }
      }
    };

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setImagesLoaded(true);
          removeLoadingScreen();
        }, 100);
      }
    };

    imagesToLoad.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Still proceed even if image fails
      img.src = src;
    });

    // Fallback: show content after 3 seconds even if images haven't loaded
    const fallbackTimer = setTimeout(() => {
      setImagesLoaded(true);
      removeLoadingScreen();
    }, 3000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/94 to-background" />
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(8_86%_53%_/_0.08),transparent)]" />
        
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
          className="w-full max-w-2xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Logo with Glitch Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 
            }}
            className="relative cursor-pointer group"
            onMouseEnter={() => {}}
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
            
            {/* Logo with Glitch Effect */}
            <div className="relative">
              {/* Red/Magenta Glitch Layer */}
              <motion.img 
                src={godmodeLogo} 
                alt="" 
                className="absolute inset-0 mx-auto w-full max-w-[200px] md:max-w-[260px] h-auto pointer-events-none"
                style={{ 
                  mixBlendMode: 'screen',
                  filter: 'hue-rotate(-40deg) saturate(4) brightness(1.3) contrast(1.2)',
                  opacity: 0
                }}
                decoding="async"
                loading="eager"
                animate={{
                  opacity: [0, 0, 0, 0.75, 0, 0.8, 0, 0, 0, 0],
                  x: [0, 0, 0, -10, 0, -6, 0, 0, 0, 0],
                  y: [0, 0, 0, 4, 0, -3, 0, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.8, 1]
                }}
              />
              
              {/* Cyan/Blue Glitch Layer */}
              <motion.img 
                src={godmodeLogo} 
                alt="" 
                className="absolute inset-0 mx-auto w-full max-w-[200px] md:max-w-[260px] h-auto pointer-events-none"
                style={{ 
                  mixBlendMode: 'screen',
                  filter: 'hue-rotate(40deg) saturate(4) brightness(1.3) contrast(1.2)',
                  opacity: 0
                }}
                decoding="async"
                loading="eager"
                animate={{
                  opacity: [0, 0, 0, 0.75, 0, 0.8, 0, 0, 0, 0],
                  x: [0, 0, 0, 10, 0, 7, 0, 0, 0, 0],
                  y: [0, 0, 0, -4, 0, 3, 0, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.8, 1]
                }}
              />

              {/* Green Glitch Layer - adds extra chromatic depth */}
              <motion.img 
                src={godmodeLogo} 
                alt="" 
                className="absolute inset-0 mx-auto w-full max-w-[200px] md:max-w-[260px] h-auto pointer-events-none"
                style={{ 
                  mixBlendMode: 'screen',
                  filter: 'hue-rotate(100deg) saturate(3.5) brightness(1.2)',
                  opacity: 0
                }}
                decoding="async"
                loading="eager"
                animate={{
                  opacity: [0, 0, 0, 0, 0.5, 0, 0.6, 0, 0, 0],
                  x: [0, 0, 0, 0, -4, 0, 5, 0, 0, 0],
                  y: [0, 0, 0, 0, -5, 0, 2, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.32, 0.36, 0.5, 0.8, 1]
                }}
              />

              {/* Main Logo with color shift during glitch */}
              <motion.img 
                src={godmodeLogo} 
                alt="TheGodMode Logo" 
                className="relative mx-auto w-full max-w-[200px] md:max-w-[260px] h-auto drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))' }}
                decoding="async"
                loading="eager"
                animate={{
                  x: [0, 0, 0, 2, 0, -1, 0, 0, 0],
                  skewX: [0, 0, 0, 1, 0, -0.5, 0, 0, 0],
                  filter: [
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 0 20px rgba(255, 0, 100, 0.6)) drop-shadow(0 0 30px rgba(0, 255, 255, 0.4))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 0 15px rgba(255, 68, 68, 0.5))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                    'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.7, 1]
                }}
              />
            </div>
          </motion.div>

          {/* Coming Soon with Stagger */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div 
                className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.h1 
                className="text-xs md:text-sm font-light uppercase tracking-[0.3em] text-foreground"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                Coming Soon
              </motion.h1>
              <motion.div 
                className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Godrip01 Section */}
          <motion.div 
            className="space-y-6 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-block relative"
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider relative"
                    style={{ 
                      color: '#FF4444',
                      textShadow: '0 0 30px rgba(255, 68, 68, 0.8), 0 0 15px rgba(255, 68, 68, 0.6), 0 4px 20px rgba(0, 0, 0, 0.9)' 
                    }}>
                  #GodDrip01
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </h2>
              </motion.div>
              <motion.p 
                className="text-[10px] md:text-xs text-foreground font-light tracking-[0.25em] uppercase"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                First Drop — Available Now
              </motion.p>
            </div>

            <motion.p 
              className="text-xs md:text-sm text-foreground/90 max-w-md mx-auto leading-relaxed font-light px-4"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Preorders now open exclusively on Instagram. Limited quantities available.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                variant="hero"
                size="default"
                className="text-xs px-10 py-6 h-auto relative rounded-full border-2"
                style={{
                  background: 'linear-gradient(135deg, #FF4444 0%, #EF4444 50%, #DC2626 100%)',
                  boxShadow: '0 0 40px rgba(255, 68, 68, 0.5), 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 100, 100, 0.5)',
                }}
                onClick={() => navigate('/preorder')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full" />
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-semibold">Preorder Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            <p className="text-[10px] md:text-xs text-foreground/60 font-light tracking-[0.2em] uppercase"
               style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>
              Website Launching Soon
            </p>
          </motion.div>

          {/* Powered By */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
          >
            <a 
              href="https://www.pxl8.studio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[8px] text-foreground/25 hover:text-foreground/40 font-light tracking-widest uppercase transition-colors duration-300"
              style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}
            >
              Powered by PXL8.Studio
            </a>
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
