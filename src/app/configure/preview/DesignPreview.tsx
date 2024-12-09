"use client";
import Configuration from "@/models/configuration.model";
import Phone from "@/components/Phone";
import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowRight, Check, Info } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/configure/LoginModal";
import { useTheme } from "next-themes";
const DesignPreview = ({ config }: { config: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setShowConfetti(true);
  });
  const { color, model, material, finish } = config;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;
  const { label: modelLabel } = MODELS.options!.find(
    ({ value }) => value === model
  ) as { label: string; value: string };
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "There was an error on our end, please try again later.",
        variant: "destructive",
      });
    },
  });
  const handleCheckout = () => {
    if (user) {
      setIsLoading(true);
      // create payment session
      createPaymentSession({ configId: config._id });
    } else {
      // Log in
      localStorage.setItem("congiguraitonId", config._id);
      setIsLoginModalOpen(true);
    }
  };
  return (
    <>
      <div
        className="pointer-events-none select-none absolute inset-0 flex justify-center"
        aria-hidden={true}
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 500, spread: 360, startVelocity: 40 }}
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <div className="mt-20 flex flex-col items-center md:grid   text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-3 lg:col-span-3 md:row-span-4 md:row-end-2">
          <Phone
            imgSrc={config.croppedImageUrl}
            darkPhone={theme === "dark"}
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
          />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 dark:border-gray-500 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950 dark:text-zinc-50">
                Highlights
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                <li>Wireless Charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 years print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950 dark:text-zinc-50">
                Material
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                <li>High quality durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 dark:text-gray-400">Base Price</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatPrice(BASE_PRICE)}
                  </p>
                </div>
                {finish === "textured" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 dark:text-gray-400">
                      Textured Finish
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formatPrice(PRODUCT_PRICES.finish.textured)}
                    </p>
                  </div>
                )}
                {material === "polycarbonate" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Soft Polycarbonate Material</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate)}
                    </p>
                  </div>
                )}
                <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Order total
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 bg-gray-50 dark:bg-gray-900 p-2 my-2 sm:rounded-lg sm:p-2">
              <Info className="h-4 w-4" />
              <p>
                Use card number{" "}
                <span className="font-semibold">4242 4242 4242 4242</span> while
                making the payment.
              </p>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                disabled={isLoading}
                onClick={() => {
                  handleCheckout();
                }}
                className="px-4 sm:px-6 lg:px-8"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    {"Checkout "}{" "}
                    <ArrowRight className="h-4 w-4 shrink-0 ml-1.5 inline" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
