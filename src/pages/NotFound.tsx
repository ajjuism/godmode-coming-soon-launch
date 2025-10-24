import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/background.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
          
          {/* 404 with Glitch Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 
            }}
            className="relative"
          >
            <div className="relative">
              {/* Red Glitch Layer */}
              <motion.h1 
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{ 
                  color: '#FF4444',
                  textShadow: '0 0 30px rgba(255, 68, 68, 0.8)',
                  mixBlendMode: 'screen',
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 0, 0, 0.7, 0, 0.8, 0, 0, 0, 0],
                  x: [0, 0, 0, -8, 0, -5, 0, 0, 0, 0],
                  y: [0, 0, 0, 3, 0, -2, 0, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.8, 1]
                }}
              >
                404
              </motion.h1>
              
              {/* Cyan Glitch Layer */}
              <motion.h1 
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{ 
                  color: '#00FFFF',
                  textShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
                  mixBlendMode: 'screen',
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 0, 0, 0.7, 0, 0.8, 0, 0, 0, 0],
                  x: [0, 0, 0, 8, 0, 6, 0, 0, 0, 0],
                  y: [0, 0, 0, -3, 0, 2, 0, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.8, 1]
                }}
              >
                404
              </motion.h1>
              
              {/* Main 404 */}
              <motion.h1 
                className="relative text-8xl md:text-9xl font-bold"
                style={{ 
                  color: '#FF4444',
                  textShadow: '0 0 30px rgba(255, 68, 68, 0.8), 0 0 15px rgba(255, 68, 68, 0.6), 0 4px 20px rgba(0, 0, 0, 0.9)'
                }}
                animate={{
                  x: [0, 0, 0, 2, 0, -1, 0, 0, 0],
                  skewX: [0, 0, 0, 1, 0, -0.5, 0, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.1, 0.2, 0.25, 0.3, 0.35, 0.4, 0.7, 1]
                }}
              >
                404
              </motion.h1>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3">
              <AlertCircle className="w-5 h-5 text-primary" />
              <h2 
                className="text-xl md:text-2xl font-semibold uppercase tracking-wider text-foreground"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
              >
                Page Not Found
              </h2>
            </div>
            
            <motion.p 
              className="text-sm md:text-base text-foreground/80 max-w-md mx-auto leading-relaxed font-light"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              The page you're looking for doesn't exist or has been moved. Let's get you back home.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
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
                onClick={() => navigate('/')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full" />
                <Home className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-semibold">Back to Home</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Footer note */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <p className="text-[10px] md:text-xs text-foreground/50 font-light tracking-[0.2em] uppercase"
               style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>
              Error Code: 404
            </p>
          </motion.div>

          {/* Powered By */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
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

export default NotFound;
