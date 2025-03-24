import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface EgyptianPaymentMethodsProps {
  amount: number;
  onPaymentComplete?: (method: string, transactionId: string) => void;
  direction?: "rtl" | "ltr";
}

export default function EgyptianPaymentMethods({
  amount = 1000,
  onPaymentComplete,
  direction = "ltr",
}: EgyptianPaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("vodafone-cash");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePayment = () => {
    if (!mobileNumber) {
      toast({
        title:
          direction === "rtl" ? "رقم الهاتف مطلوب" : "Mobile number required",
        description:
          direction === "rtl"
            ? "يرجى إدخال رقم الهاتف للمتابعة"
            : "Please enter your mobile number to proceed",
        variant: "destructive",
      });
      return;
    }

    if (mobileNumber.length < 11) {
      toast({
        title:
          direction === "rtl" ? "رقم هاتف غير صالح" : "Invalid mobile number",
        description:
          direction === "rtl"
            ? "يرجى إدخال رقم هاتف صالح مكون من 11 رقم"
            : "Please enter a valid 11-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Generate a mock transaction ID
      const transactionId = `TRX-${Math.floor(Math.random() * 1000000)}`;

      if (onPaymentComplete) {
        onPaymentComplete(selectedMethod, transactionId);
      }

      toast({
        title:
          direction === "rtl" ? "تمت عملية الدفع بنجاح" : "Payment successful",
        description:
          direction === "rtl"
            ? `تم الدفع بنجاح باستخدام ${getMethodName(selectedMethod)}. رقم العملية: ${transactionId}`
            : `Payment completed successfully using ${getMethodName(selectedMethod)}. Transaction ID: ${transactionId}`,
      });
    }, 2000);
  };

  const getMethodName = (method: string): string => {
    const methods: Record<string, { ar: string; en: string }> = {
      "vodafone-cash": { ar: "فودافون كاش", en: "Vodafone Cash" },
      fawry: { ar: "فوري", en: "Fawry" },
      instapay: { ar: "انستا باي", en: "InstaPay" },
      "bank-card": { ar: "بطاقة بنكية", en: "Bank Card" },
      "cash-on-delivery": { ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
    };

    return direction === "rtl"
      ? methods[method]?.ar || method
      : methods[method]?.en || method;
  };

  return (
    <Card className="w-full max-w-md mx-auto" dir={direction}>
      <CardHeader>
        <CardTitle className={direction === "rtl" ? "text-right" : "text-left"}>
          {direction === "rtl" ? "اختر طريقة الدفع" : "Choose Payment Method"}
        </CardTitle>
        <CardDescription
          className={direction === "rtl" ? "text-right" : "text-left"}
        >
          {direction === "rtl"
            ? `المبلغ المطلوب: ${amount.toLocaleString()} ج.م`
            : `Amount to pay: EGP ${amount.toLocaleString()}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="vodafone-cash" id="vodafone-cash" />
            <Label
              htmlFor="vodafone-cash"
              className="flex items-center cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/1200px-Vodafone_icon.svg.png"
                alt="Vodafone Cash"
                className="h-6 w-6 mr-2"
              />
              {direction === "rtl" ? "فودافون كاش" : "Vodafone Cash"}
            </Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="fawry" id="fawry" />
            <Label htmlFor="fawry" className="flex items-center cursor-pointer">
              <img
                src="https://play-lh.googleusercontent.com/MO4jVMbg4ELTnSNE1MXYpBQ2WO6N7v22oLVmCELPUKGBONVJKTIcVJ9N0y7xjcwvYK4"
                alt="Fawry"
                className="h-6 w-6 mr-2"
              />
              {direction === "rtl" ? "فوري" : "Fawry"}
            </Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="instapay" id="instapay" />
            <Label
              htmlFor="instapay"
              className="flex items-center cursor-pointer"
            >
              <img
                src="https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr"
                alt="InstaPay"
                className="h-6 w-6 mr-2"
              />
              {direction === "rtl" ? "انستا باي" : "InstaPay"}
            </Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="bank-card" id="bank-card" />
            <Label
              htmlFor="bank-card"
              className="flex items-center cursor-pointer"
            >
              <svg
                className="h-6 w-6 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              {direction === "rtl" ? "بطاقة بنكية" : "Bank Card"}
            </Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
            <Label
              htmlFor="cash-on-delivery"
              className="flex items-center cursor-pointer"
            >
              <svg
                className="h-6 w-6 mr-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {direction === "rtl" ? "الدفع عند الاستلام" : "Cash on Delivery"}
            </Label>
          </div>
        </RadioGroup>

        <Separator className="my-4" />

        {(selectedMethod === "vodafone-cash" ||
          selectedMethod === "instapay") && (
          <div className="space-y-3 mt-4">
            <Label
              htmlFor="mobile-number"
              className={
                direction === "rtl" ? "text-right block" : "text-left block"
              }
            >
              {direction === "rtl" ? "رقم الهاتف المحمول" : "Mobile Number"}
            </Label>
            <Input
              id="mobile-number"
              type="tel"
              placeholder={
                direction === "rtl"
                  ? "أدخل رقم الهاتف المحمول"
                  : "Enter your mobile number"
              }
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 11))
              }
              className={direction === "rtl" ? "text-right" : "text-left"}
            />
            <p className="text-xs text-gray-500">
              {direction === "rtl"
                ? "سيتم إرسال رمز التحقق إلى هذا الرقم"
                : "A verification code will be sent to this number"}
            </p>
          </div>
        )}

        {selectedMethod === "fawry" && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              {direction === "rtl"
                ? "سيتم إنشاء كود فوري لك. يمكنك الدفع في أي منفذ فوري خلال 48 ساعة."
                : "A Fawry code will be generated for you. You can pay at any Fawry outlet within 48 hours."}
            </p>
          </div>
        )}

        {selectedMethod === "bank-card" && (
          <div className="space-y-3 mt-4">
            <div>
              <Label
                htmlFor="card-number"
                className={
                  direction === "rtl" ? "text-right block" : "text-left block"
                }
              >
                {direction === "rtl" ? "رقم البطاقة" : "Card Number"}
              </Label>
              <Input
                id="card-number"
                placeholder="XXXX XXXX XXXX XXXX"
                className={direction === "rtl" ? "text-right" : "text-left"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label
                  htmlFor="expiry"
                  className={
                    direction === "rtl" ? "text-right block" : "text-left block"
                  }
                >
                  {direction === "rtl" ? "تاريخ الانتهاء" : "Expiry Date"}
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className={direction === "rtl" ? "text-right" : "text-left"}
                />
              </div>
              <div>
                <Label
                  htmlFor="cvv"
                  className={
                    direction === "rtl" ? "text-right block" : "text-left block"
                  }
                >
                  {direction === "rtl" ? "رمز الأمان" : "CVV"}
                </Label>
                <Input
                  id="cvv"
                  placeholder="XXX"
                  className={direction === "rtl" ? "text-right" : "text-left"}
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "cash-on-delivery" && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              {direction === "rtl"
                ? "سيتم الدفع عند استلام المنتج أو الخدمة. يرجى التأكد من توفر المبلغ المطلوب."
                : "Payment will be collected upon delivery of the product or service. Please ensure you have the exact amount ready."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {direction === "rtl" ? "جاري المعالجة..." : "Processing..."}
            </>
          ) : direction === "rtl" ? (
            "إتمام الدفع"
          ) : (
            "Complete Payment"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
