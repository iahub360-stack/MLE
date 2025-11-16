'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o Agente de Vendas. Como posso ajudar a fechar a sua compra hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Histórico da conversação para manter contexto com a API
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Função para comunicar com a API externa
  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const apiEndpoint = 'https://agente.mercadolivredoemagrecimento.bairro360.com/chat';
    
    // Adicionar mensagem do usuário ao histórico
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: userMessage }];
    
    const requestBody = {
      message: userMessage,
      history: updatedHistory
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const assistantMessage = data.response;
      
      // Atualizar o histórico com a resposta do assistente
      setChatHistory(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      
      return assistantMessage;
        
    } catch (error) {
      console.error('Erro ao contactar o Agente:', error);
      
      // Mensagem de fallback em caso de erro
      const fallbackMessage = "Desculpe, estou com problemas de ligação. Tente mais tarde.";
      
      // Não adicionamos ao histórico em caso de erro para permitir retry
      setChatHistory(updatedHistory); // Mantém apenas a mensagem do usuário
      
      return fallbackMessage;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Adicionar mensagem do usuário à interface
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Chamar API externa que já gerencia o histórico internamente
      const botResponse = await generateBotResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      
      // Adicionar mensagem de erro na interface
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou com problemas de ligação. Tente mais tarde.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      // Auto-focus no input quando abre
      const input = document.getElementById('chat-input');
      input?.focus();
    }
  }, [isOpen, messages.length]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg animate-pulse"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Online
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-80 h-96 md:w-96 md:h-[500px]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-2 border-blue-200">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm sm:text-base">Agente de Vendas</CardTitle>
              <Badge className="bg-green-500 text-white text-xs">Online</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-800 p-1"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-800 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-2 sm:p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2 justify-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Agente a escrever...</div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t">
              <div className="flex space-x-2">
                <input
                  id="chat-input"
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}