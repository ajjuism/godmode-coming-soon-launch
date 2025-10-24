import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import godmodeLogo from "@/assets/godmode-logo.svg";
import backgroundImage from "@/assets/background.png";

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/93 to-background/96" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          
          {/* Logo */}
          <div className="animate-float">
            <img 
              src={godmodeLogo} 
              alt="TheGodMode Logo" 
              className="mx-auto w-full max-w-md h-auto drop-shadow-2xl opacity-95"
            />
          </div>

          {/* Coming Soon Text */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.3em] text-foreground/90">
              Coming Soon
            </h1>
            <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          </div>

          {/* Godrip01 Section */}
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <h2 className="font-display text-5xl md:text-6xl font-normal uppercase tracking-wider text-primary">
                Godrip01
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide uppercase">
                First Drop Available Now
              </p>
            </div>

            <p className="text-sm md:text-base text-foreground/70 max-w-md mx-auto leading-relaxed font-light">
              Our inaugural collection is now taking preorders exclusively on Instagram.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              variant="hero"
              size="default"
              className="text-xs md:text-sm px-8 py-5 h-auto font-medium"
              onClick={() => window.open('https://www.instagram.com/thegodmode.in/', '_blank')}
            >
              <Instagram className="w-4 h-4" />
              Preorder on Instagram
            </Button>
          </div>

          {/* Footer Text */}
          <div className="pt-8">
            <p className="text-xs text-muted-foreground/70 font-light tracking-wider">
              Full website launching soon
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    </main>
  );
};

export default Index;
