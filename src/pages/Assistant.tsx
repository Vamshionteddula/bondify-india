import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Shield, AlertTriangle, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Assistant() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadPreviousSession();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const loadPreviousSession = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('session_type', 'chat')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && data.messages) {
        setMessages(data.messages.map((msg: any, index: number) => ({
          ...msg,
          id: `${data.id}-${index}`,
          timestamp: new Date(msg.timestamp || data.created_at)
        })));
      }
    } catch (error) {
      // No previous session found, start fresh
    }
  };

  const saveSession = async (newMessages: Message[]) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ai_sessions')
        .upsert({
          user_id: user.id,
          session_type: 'chat',
          locale: profile?.locale || 'en',
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString()
          }))
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving session:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response (replace with actual AI service call)
      const aiResponse = await simulateAIResponse(input, profile?.locale || 'en');
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      await saveSession(finalMessages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const simulateAIResponse = async (question: string, locale: string): Promise<string> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      en: {
        compliance: "Based on SEBI guidelines, retail investors should always verify the registration of investment advisors before taking advice. Key points: 1) Check SEBI registration number, 2) Verify track record, 3) Understand fee structure, 4) Read all disclosures carefully.",
        fraud: "Common investment fraud patterns include: 1) Promises of guaranteed high returns, 2) Pressure to invest immediately, 3) Unregistered investment schemes, 4) Lack of proper documentation. Always verify through official SEBI channels.",
        general: "I'm here to help with SEBI compliance, fraud detection, and investment guidance. Feel free to ask about regulatory requirements, suspicious activities, or document analysis."
      },
      hi: {
        compliance: "सेबी दिशानिर्देशों के अनुसार, खुदरा निवेशकों को सलाह लेने से पहले हमेशा निवेश सलाहकारों का पंजीकरण सत्यापित करना चाहिए। मुख्य बिंदु: 1) सेबी पंजीकरण संख्या जांचें, 2) ट्रैक रिकॉर्ड सत्यापित करें, 3) फीस संरचना समझें, 4) सभी प्रकटीकरण ध्यान से पढ़ें।",
        fraud: "सामान्य निवेश धोखाधड़ी के पैटर्न में शामिल हैं: 1) गारंटीशुदा उच्च रिटर्न के वादे, 2) तुरंत निवेश करने का दबाव, 3) अपंजीकृत निवेश योजनाएं, 4) उचित दस्तावेजों की कमी। हमेशा आधिकारिक सेबी चैनलों के माध्यम से सत्यापित करें।",
        general: "मैं सेबी अनुपालन, धोखाधड़ी का पता लगाने और निवेश मार्गदर्शन में मदद के लिए यहां हूं। नियामक आवश्यकताओं, संदिग्ध गतिविधियों या दस्तावेज़ विश्लेषण के बारे में बेझिझक पूछें।"
      },
      te: {
        compliance: "SEBI మార్గదర్శకాల ప్రకారం, రిటైల్ పెట్టుబడిదారులు సలహా తీసుకునే ముందు ఎల్లప్పుడూ పెట్టుబడి సలహాదారుల నమోదును ధృవీకరించాలి. ముఖ్య అంశాలు: 1) SEBI నమోదు సంఖ్యను తనిఖీ చేయండి, 2) ట్రాక్ రికార్డ్‌ను ధృవీకరించండి, 3) ఫీజు నిర్మాణాన్ని అర్థం చేసుకోండి, 4) అన్ని వెల్లడింపులను జాగ్రత్తగా చదవండి.",
        fraud: "సాధారణ పెట్టుబడి మోసపు నమూనాలు: 1) హామీతో కూడిన అధిక రాబడుల వాగ్దానాలు, 2) వెంటనే పెట్టుబడి పెట్టాలని ఒత్తిడి, 3) నమోదు చేయని పెట్టుబడి పథకాలు, 4) సరైన డాక్యుమెంటేషన్ లేకపోవడం. ఎల్లప్పుడూ అధికారిక SEBI చానెల్స్ ద్వారా ధృవీకరించండి.",
        general: "నేను SEBI కంప్లయన్స్, మోసం గుర్తింపు మరియు పెట్టుబడి మార్గదర్శకత్వంలో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. నియంత్రణ అవసరాలు, అనుమానాస్పద కార్యకలాపాలు లేదా డాక్యుమెంట్ విశ్లేషణ గురించి సేధించడానికి సంకోచించకండి."
      }
    };

    const langResponses = responses[locale as keyof typeof responses] || responses.en;
    
    if (question.toLowerCase().includes('sebi') || question.toLowerCase().includes('compliance')) {
      return langResponses.compliance;
    } else if (question.toLowerCase().includes('fraud') || question.toLowerCase().includes('scam')) {
      return langResponses.fraud;
    } else {
      return langResponses.general;
    }
  };

  const examples = [
    t('assistant.example1'),
    t('assistant.example2'),
    t('assistant.example3'),
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('assistant.title')}</h1>
        <p className="text-muted-foreground">{t('assistant.subtitle')}</p>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">{t('assistant.capabilities.compliance')}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold">{t('assistant.capabilities.fraud')}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold">{t('assistant.capabilities.translation')}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>AI Assistant Chat</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground space-y-4">
                <p>{t('assistant.examples')}</p>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start"
                      onClick={() => setInput(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <User className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {loading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
          
          <div className="border-t p-4">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistant.askQuestion')}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}