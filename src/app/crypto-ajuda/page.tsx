'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Copy, Check, ExternalLink, Wallet, QrCode, Star, Zap, Shield, Clock, Users } from 'lucide-react';

interface CryptoOption {
  nome: string;
  simbolo: string;
  endereco: string;
  cor: string;
  icone: string;
  network: string;
  confirmations: number;
  tempoEstimado: string;
}

export default function CryptoAjuda() {
  const router = useRouter();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const cryptoOptions: CryptoOption[] = [
    { 
      nome: 'Ethereum', 
      simbolo: 'ETH', 
      endereco: '0x743cbc89b69e2338b820672908585335118ae0ca', 
      cor: 'bg-blue-600',
      icone: '💎',
      network: 'ERC20',
      confirmations: 12,
      tempoEstimado: '15 minutos'
    },
    { 
      nome: 'USDT (TRC20)', 
      simbolo: 'USDT', 
      endereco: 'TELfDE15DfT1dsfVUtQbC3aXLVtKmyKFq1', 
      cor: 'bg-green-600',
      icone: '💵',
      network: 'TRON',
      confirmations: 1,
      tempoEstimado: '5 minutos'
    },
    { 
      nome: 'USDT (ERC20)', 
      simbolo: 'USDT', 
      endereco: '0x759180520dcf92abaffc7669490adb7dec2d5fd5', 
      cor: 'bg-green-500',
      icone: '💵',
      network: 'ERC20',
      confirmations: 12,
      tempoEstimado: '15 minutos'
    },
    { 
      nome: 'Bitcoin', 
      simbolo: 'BTC', 
      endereco: '3KHcFHk9vCyhyMqSV1p3qaNDzRar87rbTP', 
      cor: 'bg-orange-600',
      icone: '🟠',
      network: 'Bitcoin',
      confirmations: 3,
      tempoEstimado: '30 minutos'
    },
    { 
      nome: 'Litecoin', 
      simbolo: 'LTC', 
      endereco: 'MGcHt8f99vEABDA7T3zj3fGXm6BpXPoVmB', 
      cor: 'bg-blue-500',
      icone: '🔷',
      network: 'Litecoin',
      confirmations: 6,
      tempoEstimado: '15 minutos'
    }
  ];

  const copyToClipboard = async (address: string, cryptoName: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(cryptoName);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      // Fallback para browsers mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedAddress(cryptoName);
      setTimeout(() => setCopiedAddress(null), 2000);
    }
  };

  const howToSteps = [
    {
      title: '1. Escolha sua Criptomoeda',
      description: 'Selecione uma das opções disponíveis. Ethereum e USDT são as mais recomendadas para transações rápidas.',
      icon: <Wallet className="h-5 w-5" />
    },
    {
      title: '2. Copie o Endereço',
      description: 'Clique no botão copiar para copiar automaticamente o endereço da wallet. Verifique sempre o endereço copiado.',
      icon: <Copy className="h-5 w-5" />
    },
    {
      title: '3. Envie o Valor',
      description: 'Abra sua carteira e envie o valor exato. Importante: envie o valor COM 20% de desconto aplicado.',
      icon: <QrCode className="h-5 w-5" />
    },
    {
      title: '4. Confirme a Transação',
      description: 'Aguarde as confirmações necessárias na blockchain. O tempo varia conforme a rede escolhida.',
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: '5. Envie o Comprovante',
      description: 'Tire um print ou salve o comprovante e envie via WhatsApp para confirmação do pedido.',
      icon: <Check className="h-5 w-5" />
    }
  ];

  const walletRecommendations = [
    {
      name: 'MetaMask',
      description: 'Carteira mais popular para Ethereum e tokens ERC20',
      url: 'https://metamask.io',
      icon: '🦊'
    },
    {
      name: 'Trust Wallet',
      description: 'Carteira móvel completa para múltiplas redes',
      url: 'https://trustwallet.com',
      icon: '🛡️'
    },
    {
      name: 'Binance',
      description: 'Exchange e carteira com suporte a todas as redes',
      url: 'https://www.binance.com',
      icon: '🟡'
    },
    {
      name: 'Coinbase',
      description: 'Carteira fácil para iniciantes',
      url: 'https://www.coinbase.com',
      icon: '🔵'
    },
    {
      name: 'TronLink',
      description: 'Carteira oficial para rede TRON',
      url: 'https://www.tronlink.org',
      icon: '🔷'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 shadow-md w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="text-white hover:bg-purple-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <img 
              src="https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png" 
              alt="MercadoLivreDoEmagrecimento" 
              className="h-8 w-8 rounded"
            />
            <span className="font-bold text-2xl text-white">MercadoLivre<span className="text-yellow-400">Crypto</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            <Badge className="bg-yellow-400 text-purple-900">Ajuda Crypto</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-scale">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Como Comprar com <span className="text-purple-600">Criptomoedas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Ganhe <Badge className="bg-red-600 text-white ml-2">20% OFF</Badge> imediato em sua compra
          </p>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-2" />
              <span className="font-semibold">Pagamento Seguro</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">Confirmação Rápida</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold">Suporte Especializado</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Endereços das Criptomoedas */}
          <div className="space-y-6">
            <Card className="animate-fade-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-600" />
                  Endereços para Pagamento
                </CardTitle>
                <CardDescription>
                  Copie o endereço da criptomoeda desejada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cryptoOptions.map((crypto) => (
                  <div key={crypto.nome} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{crypto.icone}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{crypto.nome}</h3>
                          <p className="text-sm text-gray-600">{crypto.network} • {crypto.confirmations} confirmações</p>
                        </div>
                      </div>
                      <Badge className={`${crypto.cor} text-white`}>
                        {crypto.tempoEstimado}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded border">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-gray-700 break-all">
                          {crypto.endereco}
                        </code>
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(crypto.endereco, crypto.nome)}
                          className="ml-2"
                          variant={copiedAddress === crypto.nome ? "default" : "outline"}
                        >
                          {copiedAddress === crypto.nome ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Como Funciona */}
          <div className="space-y-6">
            <Card className="animate-fade-scale animation-delay-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2 text-purple-600" />
                  Como Funciona
                </CardTitle>
                <CardDescription>
                  Siga o passo a passo para comprar com criptomoedas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {howToSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Carteiras Recomendadas */}
            <Card className="animate-fade-scale animation-delay-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-600" />
                  Carteiras Recomendadas
                </CardTitle>
                <CardDescription>
                  Plataformas seguras para gerenciar suas criptomoedas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {walletRecommendations.map((wallet) => (
                  <div key={wallet.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-purple-50 transition-colors">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{wallet.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{wallet.name}</h4>
                        <p className="text-sm text-gray-600">{wallet.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(wallet.url, '_blank')}
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Acessar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Dicas Importantes */}
            <Card className="animate-fade-scale animation-delay-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Dicas Importantes
                </CardTitle>
                <CardDescription>
                  Garanta uma transação segura e sem erros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Segurança Primeiro
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Sempre verifique o endereço copiado</li>
                    <li>• Envie apenas o valor exato solicitado</li>
                    <li>• Desconfie de ofertas com descontos maiores</li>
                    <li>• Guarde o comprovante da transação</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Tempos de Confirmação
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• <strong>TRC20 (USDT):</strong> ~5 minutos</li>
                    <li>• <strong>ERC20 (ETH/USDT):</strong> ~15 minutos</li>
                    <li>• <strong>Bitcoin:</strong> ~30 minutos</li>
                    <li>• <strong>Litecoin:</strong> ~15 minutos</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Vantagens do Pagamento Crypto
                  </h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• <strong>20% de desconto imediato</strong></li>
                    <li>• Transações rápidas e seguras</li>
                    <li>• Sem burocracia bancária</li>
                    <li>• Atendimento prioritário</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <Card className="inline-block animate-fade-scale animation-delay-400">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pronto para comprar?
              </h3>
              <p className="text-gray-600 mb-4">
                Volte para o checkout e selecione "Criptomoedas" como forma de pagamento
              </p>
              <Button
                onClick={() => router.push('/checkout')}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Voltar para Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}