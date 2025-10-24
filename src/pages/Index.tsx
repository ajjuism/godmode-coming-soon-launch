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
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/90 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl text-center space-y-12">
          
          {/* Logo */}
          <div className="animate-float">
            <img 
              src={godmodeLogo} 
              alt="TheGodMode Logo" 
              className="mx-auto w-full max-w-2xl h-auto drop-shadow-2xl"
            />
          </div>

          {/* Coming Soon Text */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground">
              Coming Soon
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Godrip01 Section */}
          <div className="space-y-6 py-8">
            <div className="inline-block">
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-primary animate-pulse-glow">
                  Godrip01
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mt-2 font-medium">
                  First Drop Now Available
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              The wait is over. Our inaugural collection is now taking preorders exclusively on Instagram. 
              Join the movement.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button 
              variant="hero"
              size="lg"
              className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 h-auto"
              onClick={() => window.open('https://www.instagram.com/thegodmode.in/', '_blank')}
            >
              <Instagram className="w-6 h-6" />
              Preorder on Instagram
            </Button>
          </div>

          {/* Footer Text */}
          <div className="pt-12">
            <p className="text-sm text-muted-foreground">
              Stay tuned for the full website launch
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
    </main>
  );
};

export default Index;
