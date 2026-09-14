import {
  LayoutDashboard,
  UserRound,
  FileText,
  Sparkles,
  Siren,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Início', icon: LayoutDashboard },
  { href: '/incident-reports', label: 'Boletim de ocorrência', icon: FileText },
  { href: '/face-generation', label: 'Retrato falado (IA)', icon: Sparkles },
  { href: '/complaints', label: 'Denúncia anônima', icon: Siren },
  { href: '/appointments', label: 'Agendar atendimento', icon: CalendarClock },
  { href: '/profile', label: 'Meu perfil', icon: UserRound },
];
