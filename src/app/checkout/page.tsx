'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, ArrowLeft, ShoppingCart, User, MapPin, CreditCard, MessageCircle, QrCode, Star, Crown, Zap } from 'lucide-react';

interface CheckoutData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  produto: string;
  dosagem: string;
  preco: number;
  formaPagamento: 'pix' | 'whatsapp' | 'crypto';
  tipoCrypto?: string;
  walletAddress?: string;
}

interface CryptoOption {
  nome: string;
  simbolo: string;
  endereco: string;
  cor: string;
  icone: string;
}

export default function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutData>({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    produto: 'Mounjaro',
    dosagem: '',
    preco: 0,
    formaPagamento: 'pix' // PIX pré-selecionado
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cryptoOptions: CryptoOption[] = [
    { 
      nome: 'Ethereum', 
      simbolo: 'ETH', 
      endereco: '0x743cbc89b69e2338b820672908585335118ae0ca', 
      cor: 'bg-blue-600',
      icone: '💎'
    },
    { 
      nome: 'USDT (TRC20)', 
      simbolo: 'USDT', 
      endereco: 'TELfDE15DfT1dsfVUtQbC3aXLVtKmyKFq1', 
      cor: 'bg-green-600',
      icone: '💵'
    },
    { 
      nome: 'USDT (ERC20)', 
      simbolo: 'USDT', 
      endereco: '0x759180520dcf92abaffc7669490adb7dec2d5fd5', 
      cor: 'bg-green-500',
      icone: '💵'
    },
    { 
      nome: 'Bitcoin', 
      simbolo: 'BTC', 
      endereco: '3KHcFHk9vCyhyMqSV1p3qaNDzRar87rbTP', 
      cor: 'bg-orange-600',
      icone: '🟠'
    },
    { 
      nome: 'Litecoin', 
      simbolo: 'LTC', 
      endereco: 'MGcHt8f99vEABDA7T3zj3fGXm6BpXPoVmB', 
      cor: 'bg-blue-500',
      icone: '🔷'
    }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dosagem = urlParams.get('dosagem') || '';
    const preco = parseFloat(urlParams.get('preco') || '0');
    
    if (dosagem && preco > 0) {
      setFormData(prev => ({
        ...prev,
        dosagem,
        preco
      }));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutData> = {};

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF inválido (use formato: 000.000.000-00)';
    }

    if (formData.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido (use formato: (00) 00000-0000)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    let formattedValue = value;

    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'telefone') {
      formattedValue = formatPhone(value);
    } else if (field === 'cep') {
      formattedValue = formatCEP(value);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (formData.formaPagamento === 'whatsapp') {
        await sendToWhatsApp();
      } else if (formData.formaPagamento === 'crypto') {
        await processCryptoPayment();
      } else {
        // PIX é o padrão e prioridade
        await generatePixPayment();
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Ocorreu um erro ao processar seu pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendToWhatsApp = async () => {
    const message = `*NOVO PEDIDO - MOUNJARO*%0A%0A` +
      `*Dados do Cliente:*%0A` +
      `👤 Nome: ${formData.nome || 'Não informado'}%0A` +
      `📋 CPF: ${formData.cpf || 'Não informado'}%0A` +
      `📱 Telefone: ${formData.telefone || 'Não informado'}%0A` +
      `📧 Email: ${formData.email || 'Não informado'}%0A%0A` +
      `*Endereço de Entrega:*%0A` +
      `📍 CEP: ${formData.cep || 'Não informado'}%0A` +
      `🏠 Endereço: ${formData.endereco || 'Não informado'}, ${formData.numero || 'Não informado'}%0A` +
      `📝 Complemento: ${formData.complemento || 'N/A'}%0A` +
      `🏘️ Bairro: ${formData.bairro || 'Não informado'}%0A` +
      `🏙️ Cidade: ${formData.cidade || 'Não informado'}%0A` +
      `🗺️ Estado: ${formData.estado || 'Não informado'}%0A%0A` +
      `*Dados do Pedido:*%0A` +
      `💊 Produto: ${formData.produto}%0A` +
      `📏 Dosagem: ${formData.dosagem}%0A` +
      `💰 Valor: R$ ${formData.preco.toFixed(2)}%0A%0A` +
      `*Forma de Pagamento:* WhatsApp%0A%0A` +
      `Por favor, confirmar o pedido e informar os próximos passos.`;

    const whatsappUrl = `https://wa.me/5516988142848?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const processCryptoPayment = () => {
    if (!formData.tipoCrypto) {
      alert('Por favor, selecione uma criptomoeda.');
      return;
    }

    const crypto = cryptoOptions.find(c => c.nome === formData.tipoCrypto);
    if (!crypto) return;

    window.open('/crypto-ajuda', '_blank');
    
    setTimeout(() => {
      const message = `*PAGAMENTO CRYPTO - MOUNJARO*%0A%0A` +
        `*Dados do Cliente:*%0A` +
        `👤 Nome: ${formData.nome || 'Não informado'}%0A` +
        `📱 Telefone: ${formData.telefone || 'Não informado'}%0A` +
        `📧 Email: ${formData.email || 'Não informado'}%0A%0A` +
        `*Dados do Pedido:*%0A` +
        `💊 Produto: ${formData.produto}%0A` +
        `📏 Dosagem: ${formData.dosagem}%0A` +
        `💰 Valor: R$ ${formData.preco.toFixed(2)}%0A` +
        `💰 Valor com 20% OFF: R$ ${(formData.preco * 0.8).toFixed(2)}%0A%0A` +
        `*Forma de Pagamento:* ${crypto.nome}%0A%0A` +
        `📍 Wallet: ${crypto.endereco}%0A%0A` +
        `Pagamento realizado. Aguardando confirmação na blockchain.`;

      const whatsappUrl = `https://wa.me/5516988142848?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  const generatePixPayment = () => {
    const pixUrl = `https://pix.nextrustx.com/pagar/${formData.preco}`;
    window.open(pixUrl, '_blank');
    
    // Envia dados para WhatsApp após 2 segundos para automatizar o processo
    setTimeout(() => {
      const message = `*PEDIDO VIA PIX - MOUNJARO*%0A%0A` +
        `*Dados do Cliente:*%0A` +
        `👤 Nome: ${formData.nome || 'Não informado'}%0A` +
        `📋 CPF: ${formData.cpf || 'Não informado'}%0A` +
        `📱 Telefone: ${formData.telefone || 'Não informado'}%0A` +
        `📧 Email: ${formData.email || 'Não informado'}%0A%0A` +
        `*Endereço de Entrega:*%0A` +
        `📍 CEP: ${formData.cep || 'Não informado'}%0A` +
        `🏠 Endereço: ${formData.endereco || 'Não informado'}, ${formData.numero || 'Não informado'}%0A` +
        `📝 Complemento: ${formData.complemento || 'N/A'}%0A` +
        `🏘️ Bairro: ${formData.bairro || 'Não informado'}%0A` +
        `🏙️ Cidade: ${formData.cidade || 'Não informado'}%0A` +
        `🗺️ Estado: ${formData.estado || 'Não informado'}%0A%0A` +
        `*Dados do Pedido:*%0A` +
        `💊 Produto: ${formData.produto}%0A` +
        `📏 Dosagem: ${formData.dosagem}%0A` +
        `💰 Valor: R$ ${formData.preco.toFixed(2)}%0A%0A` +
        `*Forma de Pagamento:* PIX%0A%0A` +
        `✅ PIX gerado com sucesso! Por favor, realize o pagamento e aguarde a confirmação.`;

      const whatsappUrl = `https://wa.me/5516988142848?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  const formatarBRL = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calcularDescontoCrypto = () => {
    return formData.preco * 0.8; // 20% OFF
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 shadow-md w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="text-gray-900 hover:bg-yellow-300 p-1 sm:p-2"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <img 
              src="https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png" 
              alt="MercadoLivreDoEmagrecimento" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded"
            />
            <span className="font-bold text-lg sm:text-2xl text-gray-900">MercadoLivre<span className="text-blue-600">DoEmagrecimento</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            <Badge className="bg-blue-600 text-white text-xs sm:text-sm">Checkout</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Formulário Principal */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Dados Pessoais (Opcionais) */}
            <Card className="animate-fade-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Dados Pessoais (Opcional)
                </CardTitle>
                <CardDescription>
                  Preencha se desejar atendimento personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.nome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="João Silva (opcional)"
                    />
                    {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.cpf ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="000.000.000-00 (opcional)"
                      maxLength={14}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="text"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.telefone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(00) 00000-0000 (opcional)"
                      maxLength={15}
                    />
                    {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="joao@email.com (opcional)"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega (Opcional) */}
            <Card className="animate-fade-scale animation-delay-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Endereço de Entrega (Opcional)
                </CardTitle>
                <CardDescription>
                  Informe onde deseja receber seu produto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                      errors.cep ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="00000-000 (opcional)"
                    maxLength={9}
                  />
                  {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.endereco ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Rua, Avenida, etc. (opcional)"
                    />
                    {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => handleInputChange('numero', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.numero ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 (opcional)"
                    />
                    {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                    <input
                      type="text"
                      value={formData.complemento}
                      onChange={(e) => handleInputChange('complemento', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.complemento ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Apto, Casa, etc. (opcional)"
                    />
                    {errors.complemento && <p className="text-red-500 text-sm mt-1">{errors.complemento}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange('bairro', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.bairro ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Centro (opcional)"
                    />
                    {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.cidade ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="São Paulo (opcional)"
                    />
                    {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <input
                      type="text"
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                        errors.estado ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="SP (opcional)"
                    />
                    {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forma de Pagamento - PIX PRIORITÁRIO */}
            <Card className="animate-fade-scale animation-delay-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Forma de Pagamento
                </CardTitle>
                <CardDescription>
                  PIX é a forma mais rápida e recomendada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* PIX - PRIMEIRO E PRÉ-SELECIONADO */}
                <label className="flex items-center p-3 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="pix"
                    checked={formData.formaPagamento === 'pix'}
                    onChange={(e) => setFormData(prev => ({ ...prev, formaPagamento: 'pix' }))}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <img 
                      src="https://res.cloudinary.com/dhwqfkhzm/image/upload/v1762957978/Captura_de_tela_2025-11-11_141146_bvmsf6.png" 
                      alt="PIX" 
                      className="h-5 w-5 mr-2"
                    />
                    <div>
                      <div className="font-medium flex items-center">
                        PIX
                        <Badge className="ml-2 bg-green-600 text-white text-xs">RECOMENDADO</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Pagamento instantâneo e mais rápido</div>
                    </div>
                  </div>
                </label>
                
                {/* Criptomoedas */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="crypto"
                    checked={formData.formaPagamento === 'crypto'}
                    onChange={(e) => setFormData(prev => ({ ...prev, formaPagamento: 'crypto' }))}
                    className="mr-3"
                  />
                  <Zap className="h-5 w-5 mr-2 text-purple-600" />
                  <div>
                    <div className="font-medium flex items-center">
                      Criptomoedas
                      <Badge className="ml-2 bg-red-600 text-white text-xs">20% OFF</Badge>
                    </div>
                    <div className="text-sm text-gray-600">Pagamento com desconto especial</div>
                  </div>
                </label>

                {formData.formaPagamento === 'crypto' && (
                  <div className="ml-8 mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selecione a Criptomoeda:</label>
                    <div className="space-y-2">
                      {cryptoOptions.map((crypto) => (
                        <label key={crypto.nome} className="flex items-center p-2 border rounded cursor-pointer hover:bg-purple-100 transition-colors">
                          <input
                            type="radio"
                            name="tipoCrypto"
                            value={crypto.nome}
                            checked={formData.tipoCrypto === crypto.nome}
                            onChange={(e) => setFormData(prev => ({ ...prev, tipoCrypto: e.target.value }))}
                            className="mr-3"
                          />
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{crypto.icone}</span>
                            <div>
                              <div className="font-medium">{crypto.nome}</div>
                              <div className="text-xs text-gray-600 font-mono">{crypto.endereco.slice(0, 20)}...</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Button
                      onClick={() => window.open('/crypto-ajuda', '_blank')}
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                    >
                      Ajuda com Compra de Crypto
                    </Button>
                  </div>
                )}
                
                {/* WhatsApp */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                  <input
                    type="radio"
                    name="formaPagamento"
                    value="whatsapp"
                    checked={formData.formaPagamento === 'whatsapp'}
                    onChange={(e) => setFormData(prev => ({ ...prev, formaPagamento: 'whatsapp' }))}
                    className="mr-3"
                  />
                  <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-600">Fale diretamente com vendedor</div>
                  </div>
                </label>
              </CardContent>
            </Card>

            {/* Botão de Ação */}
            <div className="space-y-3">
              {formData.formaPagamento === 'pix' && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <QrCode className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Processando...' : 'Gerar PIX e Enviar Pedido'}
                </Button>
              )}
              
              {formData.formaPagamento === 'crypto' && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.tipoCrypto}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Processando...' : 'Pagar com Crypto'}
                </Button>
              )}
              
              {formData.formaPagamento === 'whatsapp' && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Processando...' : 'Enviar Pedido via WhatsApp'}
                </Button>
              )}
            </div>

            {/* Informações de Segurança */}
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-yellow-800">
                  <strong>Processo Automatizado:</strong> Ao clicar no botão, você será redirecionado para o pagamento PIX e automaticamente enviaremos seus dados para confirmação via WhatsApp.
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-4 sm:space-y-6">
              <Card className="animate-fade-scale animation-delay-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{formData.produto}</h4>
                    <p className="text-sm text-gray-600">Dosagem: {formData.dosagem}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatarBRL(formData.preco)}</span>
                    </div>
                    
                    {formData.formaPagamento === 'crypto' && (
                      <>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Desconto (20% OFF):</span>
                          <span>-{formatarBRL(formData.preco * 0.2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-green-600">{formatarBRL(calcularDescontoCrypto())}</span>
                        </div>
                      </>
                    )}
                    
                    {formData.formaPagamento !== 'crypto' && (
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{formatarBRL(formData.preco)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-800">
                      <Check className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        {formData.formaPagamento === 'pix' && 'Pagamento PIX processado automaticamente'}
                        {formData.formaPagamento === 'crypto' && '20% de desconto aplicado'}
                        {formData.formaPagamento === 'whatsapp' && 'Atendimento via WhatsApp'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-scale animation-delay-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Vantagens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Entrega expressa para todo Brasil</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Suporte via WhatsApp</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Produtos originais</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
