'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronRight, Package, Shield, Clock, Star } from 'lucide-react';
import AIChatBubble from '@/components/ai-chat-bubble';

export default function Home() {
  const [valorBRL, setValorBRL] = useState('');

  const handleComprar = (dosagem: any) => {
    const params = new URLSearchParams({
      dosagem: `${dosagem.mg} mg`,
      preco: dosagem.preco.toString()
    });
    window.location.href = `/checkout?${params.toString()}`;
  };

  const dosagens = [
    { mg: '2,5', preco: 750, precoOriginal: 1154, desconto: 35, tag: 'Top Avaliações', tagColor: 'bg-green-100 text-green-700', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_e5vj8h.png' },
    { mg: '5', preco: 900, precoOriginal: 1500, desconto: 40, tag: 'Mais Procurado', tagColor: 'bg-blue-100 text-blue-700', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_widelg_ajc88l.png' },
    { mg: '7,5', preco: 1200, precoOriginal: 2182, desconto: 45, tag: 'Mais Vendido', tagColor: 'bg-orange-100 text-orange-700', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302166/captura-de-tela-2025-04-25-175356_widelg_d5nxqg.jpg' },
    { mg: '10', preco: 1500, precoOriginal: 3000, desconto: 50, tag: 'Oferta BlackFriday', tagColor: 'bg-red-100 text-red-700', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763301625/Imagem2_tx8dxr.png' },
    { mg: '12,5', preco: 1650, precoOriginal: 3667, desconto: 55, tag: 'Últimas Unidades', tagColor: 'bg-purple-100 text-purple-700', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763301625/Imagem5_wb626i.png' },
    { mg: '15', preco: 1800, precoOriginal: 4500, desconto: 60, tag: 'OFERTA IMPERDÍVEL', tagColor: 'bg-red-600 text-white', focus: true, imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_widelg_ajc88l.png' }
  ];

  const etapas = [
    { dose: '2,5 mg', periodo: '4 semanas', descricao: 'Início do tratamento', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_e5vj8h.png' },
    { dose: '5 mg', periodo: '4 semanas', descricao: 'Primeiro ajuste', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_widelg_ajc88l.png' },
    { dose: '7,5 mg', periodo: '4 semanas', descricao: 'Ajuste intermediário', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302166/captura-de-tela-2025-04-25-175356_widelg_d5nxqg.jpg' },
    { dose: '10 mg', periodo: '4 semanas', descricao: 'Dose de manutenção', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763301625/Imagem2_tx8dxr.png' },
    { dose: '12,5 mg', periodo: '4 semanas', descricao: 'Manutenção avançada', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763301625/Imagem5_wb626i.png' },
    { dose: '15 mg', periodo: 'Contínuo', descricao: 'Dose máxima', imagem: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_widelg_ajc88l.png' }
  ];

  const formatarBRL = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calcularDesconto = () => {
    const valor = parseFloat(valorBRL) || 0;
    const descontoPercentual = 0.20;
    const economia = valor * descontoPercentual;
    const valorFinal = valor - economia;
    
    return {
      subtotal: formatarBRL(valor),
      economia: formatarBRL(economia),
      final: formatarBRL(valorFinal)
    };
  };

  const valores = calcularDesconto();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 shadow-md w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png" 
              alt="MercadoLivreDoEmagrecimento" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded"
            />
            <span className="font-bold text-lg sm:text-2xl text-gray-900">MercadoLivre<span className="text-blue-600">DoEmagrecimento</span></span>
          </div>
          <div className="flex-1 max-w-xs sm:max-w-xl mx-2 sm:mx-4 hidden sm:block">
            <input 
              type="text" 
              placeholder="Buscar dosagens, informações..." 
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <Badge className="bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full uppercase shadow-sm mb-3 sm:mb-4">
              Super Oferta BlackFriday
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 sm:mt-4 leading-tight">
              Mounjaro — Encomende Hoje
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-2">
              Tirzepatida — Dados, Dosagens
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-3 sm:mt-4">
              Compare dosagens, consulte preços e encomende agora com entrega expressa para o Mercado Brasileiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-lg shadow-lg text-sm sm:text-base"
                onClick={() => document.getElementById('dosagens')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Dosagens
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-lg border-2 border-gray-300 text-sm sm:text-base"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Como Funciona
              </Button>
              <Button 
                size="lg" 
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-lg shadow-lg text-sm sm:text-base"
                onClick={() => document.getElementById('dosagens')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Encomende Já
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative glow-effect w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-2xl sm:blur-3xl rounded-lg"></div>
              <img 
                src="https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763302167/mounjaro_widelg_ajc88l.png" 
                alt="Caneta injetável Mounjaro" 
                className="relative rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre o Produto */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                Tecnologia de última geração em controle metabólico.
              </h2>
              <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">
                Mounjaro (tirzepatida) é um medicamento inovador que atua em múltiplos receptores para controle metabólico. 
                Informações de catálogo sobre o produto com maior relevância clínica e alta procura no mercado global.
              </p>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Aplicação única semanal</span>
                </div>
                <div className="flex items-start sm:items-center">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Dosagens progressivas para titulação</span>
                </div>
                <div className="flex items-start sm:items-center">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Design de caneta segura (estilo KwikPen)</span>
                </div>
                <div className="flex items-start sm:items-center">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Alta procura e forte relevância clínica</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                O que você precisa saber
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Pontos-chave do produto (caráter informativo):
              </p>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                <li><strong>— Titulação Progressiva:</strong> O escalonamento de doses começa com 2,5 mg.</li>
                <li><strong>— Funções Metabólicas:</strong> Atua em múltiplos receptores (GIP e GLP-1).</li>
                <li><strong>— Indicação Geral:</strong> Associado ao controle glicêmico e metabólico.</li>
                <li><strong>— Segurança:</strong> Caneta desenhada para aplicação segura e precisa.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela de Dosagens */}
      <section id="dosagens" className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
          Destaques BlackFriday
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {dosagens.map((dosagem, index) => (
            <Card 
              key={index} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover-lift ${
                dosagem.focus ? 'ring-2 ring-blue-500 animate-pulse-focus' : ''
              }`}
            >
              {dosagem.focus && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 sm:px-4 py-1 rounded-bl-lg rounded-tr-lg z-10">
                  <span className="hidden sm:inline">FOCO PRINCIPAL</span>
                  <span className="sm:hidden">FOCO</span>
                </div>
              )}
              <div className="relative">
                <img 
                  src={dosagem.imagem}
                  alt={`Caneta ${dosagem.mg} mg`} 
                  className="w-full h-36 sm:h-48 object-cover bg-gray-100"
                />
                <Badge className={`absolute top-2 left-2 ${dosagem.tagColor} text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase`}>
                  {dosagem.tag}
                </Badge>
              </div>
              <CardContent className="p-3 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-3">
                  Mounjaro — Dosagem {dosagem.mg} mg
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Caneta unitária</p>
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-500 line-through">{formatarBRL(dosagem.precoOriginal)}</p>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <p className="text-xl sm:text-3xl font-bold text-gray-900">
                      {formatarBRL(dosagem.preco)}
                    </p>
                    <span className="text-sm sm:text-lg font-bold text-green-600">{dosagem.desconto}% OFF</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-green-600">Frete Express</p>
                </div>
                <p className="text-xs text-gray-600 mt-2 sm:mt-3 h-10 sm:h-12">
                  Caneta de dose única. Produto para entrega Mercado Brasil. Informações técnicas certificadas.
                </p>
                <Button 
                  className="w-full mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base py-2"
                  onClick={() => handleComprar(dosagem)}
                >
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Como Funciona</h2>
          <p className="text-base sm:text-lg text-gray-600">Linha do tempo de titulação e uso semanal</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 sm:w-1 bg-blue-200 hidden sm:block"></div>
          {etapas.map((etapa, index) => (
            <div key={index} className={`relative flex items-center mb-6 sm:mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} lg:flex-row`}>
              <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'text-right pr-0 sm:pr-8' : 'text-left pl-0 sm:pl-8'}`}>
                <Card className="p-4 sm:p-6 shadow-md">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{etapa.dose}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{etapa.periodo}</p>
                      <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2">{etapa.descricao}</p>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <img 
                        src={etapa.imagem}
                        alt={`Caneta ${etapa.dose}`}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full border-2 sm:border-4 border-white shadow-md"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Desconto Crypto */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Pagamento Exclusivo: 20% OFF Imediato
          </h2>
          <p className="text-base sm:text-lg text-blue-200 mt-2">
            Use <span className="font-bold text-yellow-400">USDT (TRC20)</span> ou <span className="font-bold text-yellow-400">Bitcoin (BTC)</span> e ganhe 20% de desconto + Frete Grátis.
          </p>

          <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-lg mx-auto border border-white/20">
            <label className="block text-sm font-medium text-white mb-2">
              Simule seu Desconto (Valor do pedido em R$)
            </label>
            <input 
              type="number" 
              value={valorBRL}
              onChange={(e) => setValorBRL(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-900 font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 1800.00"
            />
            
            <div className="mt-4 sm:mt-6 bg-white/90 text-gray-900 p-4 sm:p-6 rounded-lg text-left">
              <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-300">
                <span className="text-xs sm:text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm sm:text-base font-semibold">{valores.subtotal}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-300">
                <span className="text-xs sm:text-sm text-gray-600">Economia (20%):</span>
                <span className="text-sm sm:text-base font-semibold text-green-600">-{valores.economia}</span>
              </div>
              <div className="flex justify-between items-center mt-3 sm:mt-4">
                <span className="text-base sm:text-lg font-bold">Valor Final (Crypto):</span>
                <span className="text-lg sm:text-2xl font-extrabold text-blue-600">{valores.final}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h4 className="text-base sm:text-lg font-semibold text-white">
              Não tem Crypto? Compre em portais confiáveis:
            </h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
              <Button variant="secondary" className="bg-white text-gray-900 font-bold px-3 sm:px-5 py-2 rounded-lg shadow-md text-sm sm:text-base">
                Binance
              </Button>
              <Button variant="secondary" className="bg-white text-gray-900 font-bold px-3 sm:px-5 py-2 rounded-lg shadow-md text-sm sm:text-base">
                Mercado Bitcoin
              </Button>
              <Button variant="secondary" className="bg-white text-gray-900 font-bold px-3 sm:px-5 py-2 rounded-lg shadow-md text-sm sm:text-base">
                KuCoin
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Perguntas Frequentes</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            <AccordionItem value="item-1" className="bg-white p-4 sm:p-5 rounded-lg shadow">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-gray-900">
                Quem pode prescrever Mounjaro?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 mt-2">
                Apenas profissionais de saúde qualificados (médicos, endocrinologistas) podem prescrever Mounjaro. 
                Este site é informativo e não substitui consulta médica.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white p-4 sm:p-5 rounded-lg shadow">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-gray-900">
                Existe diferença entre marcas?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 mt-2">
                Mounjaro é a marca comercial da tirzepatida. Existem outros medicamentos com a mesma substância, 
                mas sempre consulte seu médico para orientação adequada.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white p-4 sm:p-5 rounded-lg shadow">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-gray-900">
                O que é titulação?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 mt-2">
                Titulação é o processo de ajuste gradual da dose, começando com 2,5 mg e aumentando progressivamente 
                a cada 4 semanas conforme orientação médica e resposta individual.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white p-4 sm:p-5 rounded-lg shadow">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-gray-900">
                O medicamento substitui dieta?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 mt-2">
                Não. Mounjaro deve ser utilizado como parte de um plano completo que inclui dieta equilibrada, 
                exercícios físicos e acompanhamento médico regular.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-white p-4 sm:p-5 rounded-lg shadow">
              <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-gray-900">
                Quais cuidados são necessários?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-gray-600 mt-2">
                Siga sempre a orientação médica, mantenha armazenamento adequado (refrigeração), 
                respeite o dia e horário de aplicação semanal e acompanhe seus exames regularmente.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-gray-600 text-xs sm:text-sm">
            <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Informações Técnicas</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contato</a>
          </nav>
          <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8">
            © 2025 MercadoLivreDoEmagrecimento. Todos os direitos reservados.
            <br />
            Este é um site de simulação para fins de catálogo e portfólio.
          </p>
        </div>
      </footer>
      
      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
}