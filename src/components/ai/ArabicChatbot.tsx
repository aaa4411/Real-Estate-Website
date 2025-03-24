import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Send, X, Minimize, Maximize, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ArabicChatbotProps {
  initialMessage?: string;
  direction?: "rtl" | "ltr";
  minimized?: boolean;
  onMinimizeToggle?: () => void;
}

export default function ArabicChatbot({
  initialMessage = "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
  direction = "rtl",
  minimized = false,
  onMinimizeToggle,
}: ArabicChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(minimized);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const sampleResponses: Record<string, string> = {
    مرحبا: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
    hello: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
    "عايز شقة":
      "بالتأكيد! هل لديك منطقة معينة في مصر تفضلها؟ وما هي ميزانيتك التقريبية؟",
    "كم سعر":
      "أسعار العقارات تختلف حسب المنطقة والمساحة. هل يمكنك تحديد المنطقة التي تهتم بها؟",
    "التجمع الخامس":
      "التجمع الخامس منطقة رائعة! متوسط أسعار الشقق هناك يتراوح بين 1.5 مليون إلى 3 مليون جنيه مصري حسب المساحة والموقع.",
    "مدينة نصر":
      "مدينة نصر خيار ممتاز! متوسط أسعار الشقق هناك يتراوح بين 1.2 مليون إلى 2.5 مليون جنيه مصري.",
    شكرا: "العفو! هل هناك أي شيء آخر يمكنني مساعدتك به؟",
    thank: "العفو! هل هناك أي شيء آخر يمكنني مساعدتك به؟",
    خدمات:
      "نقدم خدمات متنوعة مثل التنظيف والصيانة وتأثيث المنازل. هل تريد معرفة المزيد عن إحدى هذه الخدمات؟",
    تنظيف:
      "خدمات التنظيف لدينا تبدأ من 300 جنيه للزيارة الواحدة. هل ترغب في حجز موعد؟",
    صيانة:
      "نقدم خدمات صيانة للسباكة والكهرباء وتكييف الهواء. هل تحتاج إلى مساعدة في أحد هذه المجالات؟",
    أثاث: "لدينا تشكيلة واسعة من الأثاث المنزلي بأسعار تنافسية. هل تبحث عن قطع معينة؟",
    "طرق الدفع":
      "نقبل الدفع عبر فودافون كاش، وفوري، وانستا باي، والبطاقات البنكية، والدفع عند الاستلام.",
    "وقت التسليم":
      "وقت التسليم يعتمد على المنطقة، لكن عادة ما يكون خلال 2-3 أيام عمل.",
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle minimize/maximize from parent
  useEffect(() => {
    setIsMinimized(minimized);
  }, [minimized]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "عذرًا، لم أفهم طلبك. هل يمكنك توضيح ما تحتاجه؟";

      // Check for keywords in the input
      for (const [keyword, response] of Object.entries(sampleResponses)) {
        if (inputValue.toLowerCase().includes(keyword.toLowerCase())) {
          botResponse = response;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Simulate voice recording and recognition
      setTimeout(() => {
        const sampleVoiceInputs = [
          "عايز شقة في التجمع الخامس",
          "كم سعر الشقق في مدينة نصر؟",
          "ما هي خدمات التنظيف المتوفرة؟",
        ];
        const randomInput =
          sampleVoiceInputs[
            Math.floor(Math.random() * sampleVoiceInputs.length)
          ];
        setInputValue(randomInput);
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimizeToggle) {
      onMinimizeToggle();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: initialMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
        onClick={toggleMinimize}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </Button>
    );
  }

  return (
    <Card
      className="fixed bottom-4 right-4 w-80 sm:w-96 shadow-xl"
      dir={direction}
    >
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-primary text-primary-foreground">
        <CardTitle className="text-base font-medium">
          {direction === "rtl" ? "المساعد الذكي" : "AI Assistant"}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={clearChat}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={toggleMinimize}
          >
            <Minimize className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=bot123" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString(
                    direction === "rtl" ? "ar-EG" : "en-US",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t">
        {isRecording && (
          <div className="absolute bottom-16 left-0 right-0 p-2 bg-red-50 border-t border-red-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="animate-pulse h-2 w-2 bg-red-500 rounded-full mr-2"></div>
              <p className="text-xs text-red-700">
                {direction === "rtl" ? "جاري التسجيل..." : "Recording..."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsRecording(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div className="flex w-full items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`flex-shrink-0 ${isRecording ? "text-red-500 border-red-200 bg-red-50" : ""}`}
            onClick={handleVoiceInput}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            placeholder={
              direction === "rtl"
                ? "اكتب رسالتك هنا..."
                : "Type your message..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={direction === "rtl" ? "text-right" : "text-left"}
          />
          <Button
            variant="default"
            size="icon"
            className="flex-shrink-0"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
