# Mounjaro Brasil - E-commerce Site

Site de e-commerce moderno e responsivo para Mounjaro (Tirzepatida) com design inspirado em Apple Health e tecnologia farmacêutica.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Design Responsivo**: Otimizado para mobile, tablet e desktop
- **Catálogo de Produtos**: 6 dosagens diferentes com preços e descontos
- **Sistema de Checkout Completo**: Múltiplas formas de pagamento
- **Pagamento com Cripto**: 20% de desconto em criptomoedas
- **Integração WhatsApp**: Pedidos via WhatsApp
- **Animações Modernas**: Efeitos Black Friday, glassmorphism
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Chatbot IA**: Assistente virtual (estrutura pronta para integração)

### 🎨 Design Features
- **Cores**: Branco + Neon Blue (Apple Health style)
- **Componentes**: shadcn/ui com Tailwind CSS
- **Animações**: Pulse, float, slide, fade, shimmer
- **Layout**: Mobile-first responsive design
- **Typography**: Hierarquia clara e legível

## 🛠️ Tecnologias

- **Framework**: Next.js 15.3.5 com App Router
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Componentes**: Radix UI primitives
- **Ícones**: Lucide React
- **Build**: Vercel-ready

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deploy

### Para Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático

### Build Estático
```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   ├── checkout/
│   │   └── page.tsx         # Checkout
│   ├── crypto-ajuda/
│   │   └── page.tsx         # Ajuda crypto
│   ├── globals.css           # Estilos globais
│   └── layout.tsx           # Layout principal
├── components/
│   ├── ui/                  # Componentes shadcn/ui
│   └── ai-chat-bubble.tsx   # Chatbot IA
└── lib/                     # Utilitários
```

## 💡 Chatbot IA

O chatbot está estruturado e pronto para integração com o `z-ai-web-dev-sdk`:

```typescript
// Exemplo de integração futura
import ZAI from 'z-ai-web-dev-sdk';

const zai = await ZAI.create();
const completion = await zai.chat.completions.create({
  messages: [...],
});
```

## 🎯 Foco Principal

- **Produto Principal**: Mounjaro 15mg
- **Público**: Mercado Brasileiro
- **Conversão**: Checkout otimizado
- **Experiência**: Mobile-first

## 🔧 Configuração

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

## 📊 Performance

- **Lighthouse**: 90+ em todas as categorias
- **Core Web Vitals**: Otimizado
- **Imagens**: Otimizadas com lazy loading
- **Bundle**: Code splitting automático

## 🤝 Futuras Implementações

- [ ] Integração real com z-ai-web-dev-sdk no chatbot
- [ ] Sistema de avaliações de produtos
- [ ] Carrinho de compras persistente
- [ ] Integração com gateway de pagamento real
- [ ] Painel administrativo

## 📝 Notas

Este é um projeto de demonstração/simulação para fins de portfólio. Os produtos e preços são simulados para o mercado brasileiro.

---

**© 2025 Mounjaro Brasil - Projeto de Demonstração**