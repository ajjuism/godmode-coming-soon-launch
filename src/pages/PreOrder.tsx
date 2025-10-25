import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, Minus, Plus, Phone, Ruler, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-is-mobile";
import backgroundImage from "@/assets/background.png";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const godmodeLogo = "/logo.png";
const productImages = [
  "/GodMode (2).png",
  "/GodMode (3).png",
  "/GodModeCult (3).png",
  "/GodModeCult (4).png",
];
const qrCodeImage = "/QR.PNG";

const SIZES = ["S", "M", "L", "XL", "XXL"];

// Pricing constants
const ORIGINAL_PRICE = 1599.0;
const DISCOUNTED_PRICE = 1199.0;
const DISCOUNT_PERCENTAGE = 25;
const SHIPPING_COST = 0; // Free shipping

// Utility function to format currency (moved outside component)
const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Image component with loading state - Memoized for better performance
const ImageWithLoading = memo(({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <p className="text-sm text-foreground/60">Failed to load image</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading="lazy"
          decoding="async"
          style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}
        />
      )}
    </div>
  );
});

const PreOrder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const loadingScreenRemoved = useRef(false);
  const isMobile = useIsMobile();
  
  // Reduce animation complexity on mobile
  const animationConfig = useMemo(() => ({
    enableOrbs: !isMobile,
    reducedMotion: isMobile,
  }), [isMobile]);

  useEffect(() => {
    // Remove loading screen when component mounts (only once)
    if (!loadingScreenRemoved.current) {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.classList.add('loaded');
        // Remove from DOM after transition
        const timeoutId = setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.remove();
          }
        }, 500);
        loadingScreenRemoved.current = true;
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  // Track carousel slide changes
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect();

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);
  const [formData, setFormData] = useState({
    variant: "goddrip01",
    color: "black",
    quantity: 1,
    sizes: ["M"],
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
    transactionId: "",
  });

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleSizeToggle = useCallback((size: string, index: number) => {
    setFormData(prev => {
      const newSizes = [...prev.sizes];
      newSizes[index] = size;
      return { ...prev, sizes: newSizes };
    });
  }, []);

  const handleQuantityChange = useCallback((increment: boolean) => {
    setFormData(prev => {
      const newQuantity = increment
        ? Math.min(prev.quantity + 1, 5)
        : Math.max(prev.quantity - 1, 1);
      
      if (increment && prev.quantity === 5) {
        toast.warning("Maximum Quantity Reached", {
          description: "You've reached the maximum quantity of 5 units per order. Please place another order if you require additional units, or contact us for bulk orders.",
          duration: 5000,
        });
        return prev; // Return previous state unchanged
      }

      const newSizes = Array(newQuantity).fill("M");
      for (let i = 0; i < Math.min(prev.sizes.length, newQuantity); i++) {
        newSizes[i] = prev.sizes[i];
      }
      return { ...prev, quantity: newQuantity, sizes: newSizes };
    });
  }, []);

  // Memoized validation checks
  const canProceedToStep2 = useMemo(() => {
    return formData.quantity > 0;
  }, [formData.quantity]);

  const canProceedToStep3 = useMemo(() => {
    return formData.sizes.slice(0, formData.quantity).every((size) => size !== "");
  }, [formData.sizes, formData.quantity]);

  const canSubmit = useMemo(() => {
    return (
      formData.name &&
      formData.street &&
      formData.city &&
      formData.state &&
      formData.postalCode &&
      formData.country &&
      formData.phone &&
      formData.transactionId
    );
  }, [formData.name, formData.street, formData.city, formData.state, formData.postalCode, formData.country, formData.phone, formData.transactionId]);

  // Memoized price calculations
  const priceCalculations = useMemo(() => ({
    unitPrice: formatCurrency(DISCOUNTED_PRICE),
    originalPrice: formatCurrency(ORIGINAL_PRICE),
    savings: formatCurrency(ORIGINAL_PRICE - DISCOUNTED_PRICE),
    subtotal: formatCurrency(DISCOUNTED_PRICE * formData.quantity),
    totalSavings: formatCurrency((ORIGINAL_PRICE - DISCOUNTED_PRICE) * formData.quantity),
    total: formatCurrency((DISCOUNTED_PRICE * formData.quantity) + SHIPPING_COST),
  }), [formData.quantity]);

  const handleWhatsAppRedirect = useCallback(() => {
    if (isSubmitting) return; // Prevent double-click
    
    setIsSubmitting(true);
    
    try {
      const orderDetails = `
🛍️ *GodDrip01 Pre-Order Confirmation*

📦 *Order Details:*
Variant: ${formData.variant}
Color: ${formData.color}
Quantity: ${formData.quantity}
Sizes: ${formData.sizes.slice(0, formData.quantity).join(", ")}

📍 *Shipping Address:*
${formData.name}
${formData.street}
${formData.city}, ${formData.state} ${formData.postalCode}
${formData.country}

📞 Phone: ${formData.phone}

💳 Transaction ID: ${formData.transactionId}
      `.trim();

      const whatsappNumber = "917356063375";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;
      window.open(whatsappUrl, "_blank");
      
      // Reset submitting state after a short delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      setIsSubmitting(false);
      toast.error("Failed to open WhatsApp. Please try again.");
    }
  }, [formData]);

  const getStepLabel = useCallback(() => {
    switch (step) {
      case 1:
        return "Product Details";
      case 2:
        return "Select Sizes";
      case 3:
        return "Shipping & Payment";
      default:
        return "";
    }
  }, [step]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
      `}</style>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            willChange: 'auto',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/94 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(8_86%_53%_/_0.08),transparent)]" />

        {/* Animated Orbs - Only on desktop for better mobile performance */}
        {animationConfig.enableOrbs && (
          <>
            <motion.div
              className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full"
              style={{ filter: "blur(100px)", willChange: 'transform' }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/8 rounded-full"
              style={{ filter: "blur(100px)", willChange: 'transform' }}
              animate={{
                x: [0, -40, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          className="max-w-6xl mx-auto mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationConfig.reducedMotion ? 0.3 : 0.5 }}
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-foreground/80 hover:text-foreground h-9"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <img src={godmodeLogo} alt="TheGodMode" className="h-5 md:h-7" />
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationConfig.reducedMotion ? 0.1 : 0.2, duration: animationConfig.reducedMotion ? 0.3 : 0.5 }}
        >
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 md:p-6 shadow-2xl">
            {/* Progress Indicator */}
            <div className="mb-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                    step === 1
                      ? "bg-primary text-primary-foreground"
                      : step > 1
                      ? "bg-primary/60 text-primary-foreground"
                      : "bg-primary/20 text-foreground"
                  }`}
                >
                  1
                </div>
                <div className={`h-px w-10 transition-colors ${step > 1 ? "bg-primary/60" : "bg-border"}`} />
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                    step === 2
                      ? "bg-primary text-primary-foreground"
                      : step > 2
                      ? "bg-primary/60 text-primary-foreground"
                      : "bg-primary/20 text-foreground"
                  }`}
                >
                  2
                </div>
                <div className={`h-px w-10 transition-colors ${step > 2 ? "bg-primary/60" : "bg-border"}`} />
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                    step === 3
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/20 text-foreground"
                  }`}
                >
                  3
                </div>
              </div>
              <p className="text-center text-xs text-foreground/60">
                {getStepLabel()}
              </p>
            </div>

            {/* Step 1: Product Details - Two Column Layout */}
            {step === 1 && (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, x: animationConfig.reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: animationConfig.reducedMotion ? 0.2 : 0.3 }}
              >
                {/* Left Column - Product Image Carousel */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <Carousel className="w-full" opts={{ loop: true }} setApi={setCarouselApi}>
                      <CarouselContent>
                        {productImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg">
                              <ImageWithLoading
                                src={image}
                                alt={`GodDrip01 Product Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => carouselApi?.scrollTo(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentSlide
                              ? "w-8 bg-primary"
                              : "w-2 bg-primary/30 hover:bg-primary/50"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="flex flex-col justify-center space-y-5">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-3">
                      Pre-Order #GodDrip01
                    </h2>
                    
                    {/* Price Section */}
                    <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-foreground">
                            ₹{priceCalculations.unitPrice}
                          </span>
                          <span className="text-lg line-through text-foreground/40">
                            ₹{priceCalculations.originalPrice}
                          </span>
                        </div>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {DISCOUNT_PERCENTAGE}% OFF
                        </span>
                      </div>
                      <p className="text-xs text-center md:text-left text-foreground/60 mt-2">
                        💰 Save ₹{priceCalculations.savings} on this exclusive pre-order!
                      </p>
                    </div>
                  </div>

                  {/* Variant & Color */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/30 rounded-lg p-3 border border-border/30 text-center">
                      <p className="text-xs text-foreground/60 mb-1">Variant</p>
                      <p className="font-semibold uppercase tracking-wider text-primary text-sm">
                        {formData.variant}
                      </p>
                    </div>
                    <div className="bg-background/30 rounded-lg p-3 border border-border/30 text-center">
                      <p className="text-xs text-foreground/60 mb-1">Color</p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-black border border-border" />
                        <p className="font-semibold capitalize text-sm">{formData.color}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Select Quantity (Max 5)</Label>
                    <div className="flex items-center justify-center gap-6 py-4 bg-background/30 rounded-lg border border-border/30">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(false)}
                        disabled={formData.quantity <= 1}
                        className="h-11 w-11 rounded-full"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <div className="text-center min-w-[80px]">
                        <span className="text-5xl font-bold text-primary">
                          {formData.quantity}
                        </span>
                        <p className="text-xs text-foreground/60 mt-1">
                          {formData.quantity === 1 ? "unit" : "units"}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(true)}
                        className="h-11 w-11 rounded-full"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-xs text-center text-foreground/50">
                      Need more?{" "}
                      <a 
                        href="tel:917356063375" 
                        className="text-primary hover:underline font-medium"
                      >
                        Contact us
                      </a>
                      {" "}for bulk orders
                    </p>
                  </div>

                  {/* Next Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      setStep(2);
                      // Ensure smooth scroll to top
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }}
                    disabled={!canProceedToStep2}
                  >
                    Continue to Sizes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Size Selection - Two Column Layout */}
            {step === 2 && (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, x: animationConfig.reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: animationConfig.reducedMotion ? 0.2 : 0.3 }}
              >
                {/* Left Column - Product Summary */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="bg-background/30 rounded-xl p-5 border border-border/30">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                    <div className="relative w-full max-w-xs mx-auto mb-4">
                      <Carousel className="w-full" opts={{ loop: true }}>
                        <CarouselContent>
                          {productImages.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-primary/20">
                                <ImageWithLoading
                                  src={image}
                                  alt={`GodDrip01 Product ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-1 h-7 w-7" />
                        <CarouselNext className="right-1 h-7 w-7" />
                      </Carousel>
                      {/* Pagination Dots */}
                      <div className="flex justify-center gap-1.5 mt-3">
                        {productImages.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all ${
                              index === currentSlide
                                ? "w-6 bg-primary"
                                : "w-1.5 bg-primary/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Product:</span>
                        <span className="font-semibold uppercase">{formData.variant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Color:</span>
                        <span className="font-semibold capitalize">{formData.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Quantity:</span>
                        <span className="font-semibold">{formData.quantity} {formData.quantity === 1 ? "unit" : "units"}</span>
                      </div>
                      
                      <div className="pt-2 border-t border-border/30 space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-foreground/60">Price per unit:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">₹{priceCalculations.unitPrice}</span>
                            <span className="text-xs line-through text-foreground/40">₹{priceCalculations.originalPrice}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground/60">Discount:</span>
                          <span className="font-semibold text-green-600">{DISCOUNT_PERCENTAGE}% Off</span>
                        </div>
                        <div className="flex justify-between pt-1.5 border-t border-border/20">
                          <span className="font-semibold">Subtotal:</span>
                          <span className="font-bold text-foreground">₹{priceCalculations.subtotal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Size Selection */}
                <div className="flex flex-col justify-center space-y-3">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-0.5">
                          Select Your Size{formData.quantity > 1 ? "s" : ""}
                        </h2>
                        <p className="text-xs text-foreground/70">
                          Choose size for {formData.quantity === 1 ? "your item" : `${formData.quantity} items`}
                        </p>
                      </div>
                      <Dialog open={sizeChartOpen} onOpenChange={setSizeChartOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-1.5"
                          >
                            <Ruler className="w-3.5 h-3.5" />
                            Size Chart
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                              <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                              Size Chart - GodDrip01
                            </DialogTitle>
                            <DialogDescription className="text-xs sm:text-sm">
                              All measurements are in inches. Measure your favorite t-shirt for best fit.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="overflow-y-auto flex-1 -mx-6 px-6 py-4">
                            <div className="space-y-3 sm:space-y-4">
                              {/* Size Chart - Mobile Cards (visible on mobile only) */}
                              <div className="sm:hidden space-y-2">
                                {[
                                  { size: "S", chest: 38, length: 27, shoulder: 17, sleeve: 8.5 },
                                  { size: "M", chest: 40, length: 28, shoulder: 18, sleeve: 9 },
                                  { size: "L", chest: 42, length: 29, shoulder: 19, sleeve: 9.5 },
                                  { size: "XL", chest: 44, length: 30, shoulder: 20, sleeve: 10 },
                                  { size: "XXL", chest: 46, length: 31, shoulder: 21, sleeve: 10.5 },
                                ].map((item) => (
                                  <div key={item.size} className="bg-background/50 border border-border rounded-lg p-3">
                                    <div className="font-bold text-primary text-lg mb-2">Size {item.size}</div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-foreground/60">Chest:</span>
                                        <span className="font-semibold">{item.chest}"</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-foreground/60">Length:</span>
                                        <span className="font-semibold">{item.length}"</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-foreground/60">Shoulder:</span>
                                        <span className="font-semibold">{item.shoulder}"</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-foreground/60">Sleeve:</span>
                                        <span className="font-semibold">{item.sleeve}"</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Size Chart Table - Desktop (hidden on mobile) */}
                              <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-primary/10 border-b border-border">
                                      <th className="text-left p-3 text-sm font-semibold">Size</th>
                                      <th className="text-center p-3 text-sm font-semibold">Chest (in)</th>
                                      <th className="text-center p-3 text-sm font-semibold">Length (in)</th>
                                      <th className="text-center p-3 text-sm font-semibold">Shoulder (in)</th>
                                      <th className="text-center p-3 text-sm font-semibold">Sleeve (in)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-border hover:bg-primary/5 transition-colors">
                                      <td className="p-3 font-semibold text-sm">S</td>
                                      <td className="p-3 text-center text-sm">38</td>
                                      <td className="p-3 text-center text-sm">27</td>
                                      <td className="p-3 text-center text-sm">17</td>
                                      <td className="p-3 text-center text-sm">8.5</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-primary/5 transition-colors">
                                      <td className="p-3 font-semibold text-sm">M</td>
                                      <td className="p-3 text-center text-sm">40</td>
                                      <td className="p-3 text-center text-sm">28</td>
                                      <td className="p-3 text-center text-sm">18</td>
                                      <td className="p-3 text-center text-sm">9</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-primary/5 transition-colors">
                                      <td className="p-3 font-semibold text-sm">L</td>
                                      <td className="p-3 text-center text-sm">42</td>
                                      <td className="p-3 text-center text-sm">29</td>
                                      <td className="p-3 text-center text-sm">19</td>
                                      <td className="p-3 text-center text-sm">9.5</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-primary/5 transition-colors">
                                      <td className="p-3 font-semibold text-sm">XL</td>
                                      <td className="p-3 text-center text-sm">44</td>
                                      <td className="p-3 text-center text-sm">30</td>
                                      <td className="p-3 text-center text-sm">20</td>
                                      <td className="p-3 text-center text-sm">10</td>
                                    </tr>
                                    <tr className="hover:bg-primary/5 transition-colors">
                                      <td className="p-3 font-semibold text-sm">XXL</td>
                                      <td className="p-3 text-center text-sm">46</td>
                                      <td className="p-3 text-center text-sm">31</td>
                                      <td className="p-3 text-center text-sm">21</td>
                                      <td className="p-3 text-center text-sm">10.5</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              {/* How to Measure Section */}
                              <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/20">
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  📏 How to Measure
                                </h4>
                                <div className="space-y-1.5 text-xs text-foreground/80">
                                  <div>
                                    <span className="font-semibold">Chest:</span> Measure around the fullest part of your chest.
                                  </div>
                                  <div>
                                    <span className="font-semibold">Length:</span> From shoulder to bottom hem.
                                  </div>
                                  <div>
                                    <span className="font-semibold">Shoulder:</span> From one shoulder point to the other.
                                  </div>
                                  <div>
                                    <span className="font-semibold">Sleeve:</span> From shoulder seam to sleeve end.
                                  </div>
                                </div>
                              </div>

                              {/* Fit Guide */}
                              <div className="bg-background/50 rounded-lg p-3 sm:p-4 border border-border/50">
                                <h4 className="font-semibold text-sm mb-2">💡 Fit Guide</h4>
                                <p className="text-xs text-foreground/70 leading-relaxed">
                                  This t-shirt has an oversized fit. For a relaxed, street-style look, order your true size. If you prefer a more fitted look, consider sizing down.
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Array.from({ length: formData.quantity }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-background/40 rounded-lg p-2.5 border border-border/40 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <Label className="text-xs font-semibold text-foreground">
                            {formData.quantity > 1 ? `Item ${index + 1}` : "Your Size"}
                          </Label>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            formData.sizes[index] 
                              ? "bg-primary/10 text-primary border border-primary/20" 
                              : "bg-muted/30 text-muted-foreground/60"
                          }`}>
                            {formData.sizes[index] || "—"}
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {SIZES.map((size) => (
                            <Button
                              key={size}
                              type="button"
                              variant={formData.sizes[index] === size ? "default" : "outline"}
                              className={`h-8 text-xs font-semibold transition-all ${
                                formData.sizes[index] === size 
                                  ? "ring-2 ring-primary ring-offset-1 ring-offset-background" 
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => handleSizeToggle(size, index)}
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setStep(1);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => {
                        setStep(3);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      disabled={!canProceedToStep3}
                      className="flex-1"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Shipping & Payment - Two Column Layout */}
            {step === 3 && (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, x: animationConfig.reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: animationConfig.reducedMotion ? 0.2 : 0.3 }}
              >
                {/* Left Column - Order Summary & Payment */}
                <div className="space-y-4">
                  {/* Order Summary */}
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <h3 className="text-sm font-semibold mb-3">Order Summary</h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">GodDrip01 × {formData.quantity}</p>
                          <p className="text-xs text-foreground/60">
                            Sizes: {formData.sizes.slice(0, formData.quantity).join(", ")}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-foreground">₹{priceCalculations.unitPrice}</span>
                            <span className="text-xs line-through text-foreground/40">₹{priceCalculations.originalPrice}</span>
                            <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">{DISCOUNT_PERCENTAGE}% Off</span>
                          </div>
                        </div>
                        <span className="font-semibold">₹{priceCalculations.subtotal}</span>
                      </div>
                      
                      <div className="pt-2 border-t border-primary/20 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground/70">Subtotal</span>
                          <span className="font-medium">₹{priceCalculations.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground/70">Shipping</span>
                          <span className="font-medium text-green-600">FREE</span>
                        </div>
                        <div className="flex justify-between text-xs text-green-600">
                          <span>You Save</span>
                          <span className="font-semibold">₹{priceCalculations.totalSavings}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-primary/20">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-foreground text-base">₹{priceCalculations.total}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-primary/20 text-center">
                        <p className="text-xs text-foreground/70">⏰ Delivery: 2-4 weeks</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-background/30 rounded-lg p-4 border border-border/30">
                    <h3 className="text-sm font-semibold mb-3">Payment Information</h3>
                    <div className="text-center space-y-3">
                      <p className="text-xs text-foreground/60">Scan QR Code to Pay via UPI</p>
                      <div className="flex justify-center">
                        <div className="w-56 h-56 bg-white rounded-lg overflow-hidden shadow-lg">
                          <ImageWithLoading
                            src={qrCodeImage}
                            alt="UPI QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="pt-2 space-y-1">
                        <p className="text-xs text-foreground/60">Or pay to UPI ID:</p>
                        <p className="font-mono font-semibold text-primary text-sm">
                          akshaybinz7@okicici
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Shipping Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Shipping Information</h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="name" className="text-xs">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="John Doe"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          className="mt-1 h-9"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="street" className="text-xs">Street Address *</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        placeholder="House no., Street name"
                        className="mt-1 h-9"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city" className="text-xs">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="City"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-xs">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="State"
                          className="mt-1 h-9"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="postalCode" className="text-xs">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          placeholder="000000"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-xs">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          placeholder="India"
                          className="mt-1 h-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <Label htmlFor="transactionId" className="text-xs font-semibold">
                      UPI Transaction ID / UTR Number *
                    </Label>
                    <Input
                      id="transactionId"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange("transactionId", e.target.value)}
                      placeholder="Enter 12-digit transaction ID"
                      className="mt-2 h-10 bg-background"
                      maxLength={12}
                    />
                    <p className="text-xs text-foreground/50 mt-2">
                      💡 Find this in your payment app after completing the transaction
                    </p>
                  </div>

                  {/* Verification Notice */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/40">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-base">✓</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-medium text-foreground">
                          Quick Verification Process
                        </p>
                        <p className="text-xs text-foreground/60 leading-relaxed">
                          Our team will verify your transaction ID and send order confirmation within 2 hours. You'll receive updates via WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setStep(2);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleWhatsAppRedirect}
                      disabled={!canSubmit || isSubmitting}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Confirm
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>
    </main>
  );
};

export default PreOrder;
