export const MOCK_BARBERSHOP = {
  id: "davinci-01",
  name: "Barbearia Da Vinci",
  address: "Rua das Artes, 42 — Centro",
  city: "São Paulo",
  state: "SP",
  phone: "(11) 98765-4321",
  cnpj: "12.345.678/0001-90",
  description: "A barbearia premium da Vila Madalena desde 2018.",
  status: "APPROVED" as const,
  rating: 4.8,
  totalReviews: 127,
};

export const MOCK_BARBERS = [
  { id: "b1", name: "Lages", role: "OWNER", initials: "LA", rating: 4.9, appointmentsToday: 5 },
  { id: "b2", name: "Kassiel", role: "BARBER_FIXED", initials: "KA", rating: 4.8, appointmentsToday: 6 },
  { id: "b3", name: "Gabriel", role: "BARBER_FIXED", initials: "GA", rating: 4.7, appointmentsToday: 5 },
  { id: "b4", name: "Josenilson", role: "BARBER_FIXED", initials: "JO", rating: 4.6, appointmentsToday: 4 },
];

export type SlotStatus = "free" | "occupied" | "break";
export interface Slot { status: SlotStatus; client?: string; service?: string; }

const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
];

export { TIME_SLOTS };

export const MOCK_SCHEDULE: Record<string, Record<string, Slot>> = {
  "Lages": {
    "09:00": { status: "occupied", client: "Pedro Costa", service: "Corte + Barba" },
    "09:30": { status: "occupied" },
    "10:00": { status: "occupied", client: "Ricardo Lima", service: "Corte Social" },
    "10:30": { status: "occupied" },
    "11:00": { status: "free" },
    "11:30": { status: "free" },
    "12:00": { status: "break" },
    "12:30": { status: "break" },
    "13:00": { status: "occupied", client: "Lucas Martins", service: "Corte + Barba" },
    "13:30": { status: "occupied" },
    "14:00": { status: "occupied", client: "Fábio Santos", service: "Degradê" },
    "14:30": { status: "occupied" },
    "15:00": { status: "free" },
    "15:30": { status: "free" },
    "16:00": { status: "occupied", client: "Carlos Oliveira", service: "Corte Social" },
    "16:30": { status: "occupied" },
    "17:00": { status: "free" },
    "17:30": { status: "free" },
  },
  "Kassiel": {
    "09:00": { status: "occupied", client: "João Silva", service: "Corte + Barba" },
    "09:30": { status: "occupied" },
    "10:00": { status: "occupied", client: "Diego Pereira", service: "Degradê" },
    "10:30": { status: "occupied" },
    "11:00": { status: "occupied", client: "Marcos Souza", service: "Corte Social" },
    "11:30": { status: "occupied" },
    "12:00": { status: "break" },
    "12:30": { status: "break" },
    "13:00": { status: "free" },
    "13:30": { status: "free" },
    "14:00": { status: "occupied", client: "André Costa", service: "Corte + Barba" },
    "14:30": { status: "occupied" },
    "15:00": { status: "occupied", client: "Vitor Rocha", service: "Barba" },
    "15:30": { status: "free" },
    "16:00": { status: "occupied", client: "Thiago Lima", service: "Degradê" },
    "16:30": { status: "occupied" },
    "17:00": { status: "occupied", client: "Bruno Alves", service: "Corte Social" },
    "17:30": { status: "occupied" },
  },
  "Gabriel": {
    "09:00": { status: "free" },
    "09:30": { status: "occupied", client: "Felipe Gomes", service: "Corte Social" },
    "10:00": { status: "occupied" },
    "10:30": { status: "free" },
    "11:00": { status: "occupied", client: "Rafael Moura", service: "Corte + Barba" },
    "11:30": { status: "occupied" },
    "12:00": { status: "break" },
    "12:30": { status: "break" },
    "13:00": { status: "occupied", client: "Eduardo Lopes", service: "Degradê" },
    "13:30": { status: "occupied" },
    "14:00": { status: "free" },
    "14:30": { status: "free" },
    "15:00": { status: "occupied", client: "Igor Ramos", service: "Corte Social" },
    "15:30": { status: "occupied" },
    "16:00": { status: "occupied", client: "Gabriel S.", service: "Corte + Barba" },
    "16:30": { status: "occupied" },
    "17:00": { status: "free" },
    "17:30": { status: "occupied", client: "Patrick Melo", service: "Barba" },
  },
  "Josenilson": {
    "09:00": { status: "occupied", client: "Henrique Dias", service: "Corte + Barba" },
    "09:30": { status: "occupied" },
    "10:00": { status: "free" },
    "10:30": { status: "free" },
    "11:00": { status: "occupied", client: "Leandro Ferreira", service: "Degradê" },
    "11:30": { status: "occupied" },
    "12:00": { status: "break" },
    "12:30": { status: "break" },
    "13:00": { status: "free" },
    "13:30": { status: "occupied", client: "Samuel Costa", service: "Corte Social" },
    "14:00": { status: "occupied" },
    "14:30": { status: "free" },
    "15:00": { status: "occupied", client: "Matheus Barbosa", service: "Corte + Barba" },
    "15:30": { status: "occupied" },
    "16:00": { status: "free" },
    "16:30": { status: "free" },
    "17:00": { status: "occupied", client: "Rodrigo Neves", service: "Degradê" },
    "17:30": { status: "occupied" },
  },
};

export const MOCK_REVIEWS = [
  { id: "r1", client: "João Silva", initials: "JS", rating: 5, comment: "Kassiel é o melhor! Corte perfeito, barbearia top demais.", barber: "Kassiel", date: "28 Jul 2026" },
  { id: "r2", client: "Diego Pereira", initials: "DP", rating: 5, comment: "Ambiente incrível, atendimento impecável. Recomendo demais!", barber: "Gabriel", date: "27 Jul 2026" },
  { id: "r3", client: "Ricardo Lima", initials: "RL", rating: 4, comment: "Ótimo serviço, Lages entende exatamente o que você quer.", barber: "Lages", date: "26 Jul 2026" },
  { id: "r4", client: "Marcos Souza", initials: "MS", rating: 5, comment: "Melhor barbearia da cidade, sem dúvida. Voltarei sempre.", barber: "Kassiel", date: "25 Jul 2026" },
  { id: "r5", client: "Henrique Dias", initials: "HD", rating: 4, comment: "Josenilson fez um trabalho excelente na barba. Recomendo!", barber: "Josenilson", date: "24 Jul 2026" },
  { id: "r6", client: "Felipe Gomes", initials: "FG", rating: 5, comment: "Gabriel arrasou no degradê! Ambiente moderno e aconchegante.", barber: "Gabriel", date: "23 Jul 2026" },
  { id: "r7", client: "André Costa", initials: "AC", rating: 5, comment: "Da Vinci é referência! Equipe muito profissional.", barber: "Kassiel", date: "22 Jul 2026" },
  { id: "r8", client: "Lucas Martins", initials: "LM", rating: 4, comment: "Ótima experiência, atendimento rápido e preciso.", barber: "Lages", date: "21 Jul 2026" },
];

export const MOCK_STATS_OWNER = {
  appointmentsToday: 20,
  appointmentsWeek: 84,
  revenue: "R$ 3.960,00",
  avgRating: 4.8,
};

export const MOCK_STATS_BARBER: Record<string, { appointmentsToday: number; nextSlot: string; avgRating: number }> = {
  "Kassiel": { appointmentsToday: 6, nextSlot: "13:00", avgRating: 4.8 },
  "Gabriel":  { appointmentsToday: 5, nextSlot: "10:30", avgRating: 4.7 },
  "Josenilson": { appointmentsToday: 4, nextSlot: "10:00", avgRating: 4.6 },
  "Lages":    { appointmentsToday: 5, nextSlot: "11:00", avgRating: 4.9 },
};
