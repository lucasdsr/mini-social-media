import { Post } from '@/models'

export const MOCK_POSTS: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Bem-vindo ao Mini Social Media!',
    body: 'Este é o primeiro post da nossa plataforma. Aqui você pode compartilhar suas ideias, pensamentos e experiências com a comunidade. Explore os recursos disponíveis e conecte-se com outros usuários!'
  },
  {
    userId: 2,
    id: 2,
    title: 'Dicas para Desenvolvedores React',
    body: 'Algumas dicas essenciais para quem está começando com React: use hooks, mantenha componentes pequenos, aplique TypeScript para melhor tipagem, e sempre teste seus componentes. A prática leva à perfeição!'
  },
  {
    userId: 3,
    id: 3,
    title: 'Atomic Design: Organizando Componentes',
    body: 'O Atomic Design é uma metodologia que nos ajuda a organizar componentes de forma hierárquica: Atoms (elementos básicos), Molecules (combinações de atoms), Organisms (grupos de molecules), Templates e Pages. Isso facilita a manutenção e reutilização do código.'
  },
  {
    userId: 4,
    id: 4,
    title: 'Clean Architecture em Frontend',
    body: 'A Clean Architecture aplicada ao frontend separa as responsabilidades em camadas: Presentation (UI), Application (lógica de negócio), Infrastructure (serviços externos) e Models (entidades). Isso resulta em código mais testável, manutenível e escalável.'
  },
  {
    userId: 5,
    id: 5,
    title: 'Material-UI: Design System Consistente',
    body: 'O Material-UI oferece componentes prontos que seguem o Material Design do Google. Com temas customizáveis, responsividade nativa e acessibilidade integrada, é uma excelente escolha para criar interfaces modernas e consistentes.'
  }
]
