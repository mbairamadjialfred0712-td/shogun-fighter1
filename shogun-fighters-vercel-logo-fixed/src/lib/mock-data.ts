// Données de démonstration (aucune base de données connectée).
// Structure alignée sur le futur modèle multi-tenant : tout est rattaché à organizationId.

export type SubscriptionStatus =
  | "ACTIVE"
  | "EXPIRING_SOON"
  | "EXPIRED"
  | "SUSPENDED"
  | "CANCELLED";

export type MemberStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type PaymentMethod = "Espèces" | "TMoney" | "Flooz" | "Carte" | "Autre";

export const paymentMethods: PaymentMethod[] = [
  "Espèces",
  "TMoney",
  "Flooz",
  "Carte",
  "Autre",
];

export interface Organization {
  id: string;
  name: string;
  tagline: string;
  city: string;
  currency: string;
  logoLabel: string;
  phone: string;
  email: string;
  address: string;
}

export interface AppUser {
  id: string;
  organizationId: string;
  fullName: string;
  role: "Owner" | "Admin" | "Staff";
  email: string;
  initials: string;
}

export interface Activity {
  id: string;
  organizationId: string;
  name: string;
  monthlyPrice: number;
  activeMembers: number;
  coach: string;
  color: "soft" | "coral" | "mint" | "sun" | "bubble";
}

export interface Member {
  id: string;
  organizationId: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  joinedAt: string;
  status: MemberStatus;
  notes: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  memberId: string;
  activityId: string;
  plan: string;
  months: number;
  monthlyAmount: number;
  totalAmount: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  renewalNumber: number;
  paidAt: string;
}

export interface Payment {
  id: string;
  organizationId: string;
  memberId: string;
  subscriptionId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  time: string;
  kind: "Abonnement" | "Renouvellement" | "Remboursement";
  receiptId: string;
}

export interface Receipt {
  id: string;
  organizationId: string;
  number: string;
  paymentId: string;
  memberId: string;
  subscriptionId: string;
  issuedAt: string;
}

export interface AppNotification {
  id: string;
  organizationId: string;
  memberId: string;
  level: "TODAY" | "TOMORROW" | "D3" | "D7" | "EXPIRED";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export const TODAY = "2026-09-06";

export const organization: Organization = {
  id: "org_1",
  name: "Shogun Fighters",
  tagline: "Association sportive",
  city: "Lomé, Togo",
  currency: "FCFA",
  logoLabel: "SF",
  phone: "+228 90 12 34 56",
  email: "contact@shogunfighters.tg",
  address: "Boulevard du 13 Janvier, Tokoin — Lomé",
};

export const currentUser: AppUser = {
  id: "usr_1",
  organizationId: "org_1",
  fullName: "Kodjo Amegan",
  role: "Owner",
  email: "kodjo@shogunfighters.tg",
  initials: "KA",
};

export const teamUsers: AppUser[] = [
  currentUser,
  {
    id: "usr_2",
    organizationId: "org_1",
    fullName: "Afi Dogbe",
    role: "Admin",
    email: "afi@shogunfighters.tg",
    initials: "AD",
  },
  {
    id: "usr_3",
    organizationId: "org_1",
    fullName: "Yao Mensah",
    role: "Staff",
    email: "yao@shogunfighters.tg",
    initials: "YM",
  },
];

export const activities: Activity[] = [
  {
    id: "act_gym",
    organizationId: "org_1",
    name: "Gym",
    monthlyPrice: 10000,
    activeMembers: 62,
    coach: "Yao Mensah",
    color: "soft",
  },
  {
    id: "act_fitness",
    organizationId: "org_1",
    name: "Fitness",
    monthlyPrice: 15000,
    activeMembers: 48,
    coach: "Afi Dogbe",
    color: "mint",
  },
  {
    id: "act_aikido",
    organizationId: "org_1",
    name: "Aikido",
    monthlyPrice: 20000,
    activeMembers: 22,
    coach: "Kodjo Amegan",
    color: "bubble",
  },
  {
    id: "act_karate",
    organizationId: "org_1",
    name: "Karaté",
    monthlyPrice: 15000,
    activeMembers: 35,
    coach: "Komlan Adjovi",
    color: "coral",
  },
  {
    id: "act_taekwondo",
    organizationId: "org_1",
    name: "Taekwondo",
    monthlyPrice: 15000,
    activeMembers: 27,
    coach: "Essi Lawson",
    color: "sun",
  },
  {
    id: "act_danse",
    organizationId: "org_1",
    name: "Danse",
    monthlyPrice: 5000,
    activeMembers: 30,
    coach: "Akouvi Sena",
    color: "bubble",
  },
];

export const members: Member[] = [
  {
    id: "mem_1",
    organizationId: "org_1",
    memberNumber: "SF-0248",
    firstName: "Moussa",
    lastName: "Koné",
    phone: "+228 90 45 21 88",
    email: "moussa.kone@mail.tg",
    address: "Tokoin, Lomé",
    joinedAt: "2024-02-14",
    status: "ACTIVE",
    notes: "Vient le matin.",
  },
  {
    id: "mem_2",
    organizationId: "org_1",
    memberNumber: "SF-0231",
    firstName: "Afiwa",
    lastName: "Adjo",
    phone: "+228 91 88 30 12",
    email: "afiwa.adjo@mail.tg",
    address: "Agoè, Lomé",
    joinedAt: "2024-06-02",
    status: "ACTIVE",
    notes: "Ceinture verte.",
  },
  {
    id: "mem_3",
    organizationId: "org_1",
    memberNumber: "SF-0187",
    firstName: "Komlan",
    lastName: "Adjovi",
    phone: "+228 70 22 90 45",
    email: "komlan.adjovi@mail.tg",
    address: "Bè, Lomé",
    joinedAt: "2023-11-20",
    status: "ACTIVE",
    notes: "",
  },
  {
    id: "mem_4",
    organizationId: "org_1",
    memberNumber: "SF-0302",
    firstName: "Akouvi",
    lastName: "Sena",
    phone: "+228 92 71 55 03",
    email: "akouvi.sena@mail.tg",
    address: "Adidogomé, Lomé",
    joinedAt: "2025-01-08",
    status: "ACTIVE",
    notes: "Danse le samedi.",
  },
  {
    id: "mem_5",
    organizationId: "org_1",
    memberNumber: "SF-0119",
    firstName: "Ibrahim",
    lastName: "Sylla",
    phone: "+228 96 10 66 78",
    email: "ibrahim.sylla@mail.tg",
    address: "Nyékonakpoè, Lomé",
    joinedAt: "2023-04-30",
    status: "ACTIVE",
    notes: "",
  },
  {
    id: "mem_6",
    organizationId: "org_1",
    memberNumber: "SF-0355",
    firstName: "Essi",
    lastName: "Lawson",
    phone: "+228 79 03 91 20",
    email: "essi.lawson@mail.tg",
    address: "Hédzranawoé, Lomé",
    joinedAt: "2025-09-12",
    status: "ACTIVE",
    notes: "Abonnement payé par l'employeur.",
  },
  {
    id: "mem_7",
    organizationId: "org_1",
    memberNumber: "SF-0098",
    firstName: "Kossi",
    lastName: "Amouzou",
    phone: "+228 90 55 40 77",
    email: "kossi.amouzou@mail.tg",
    address: "Tokoin, Lomé",
    joinedAt: "2022-10-05",
    status: "INACTIVE",
    notes: "N'est pas venu depuis juin.",
  },
  {
    id: "mem_8",
    organizationId: "org_1",
    memberNumber: "SF-0410",
    firstName: "Ama",
    lastName: "Sangaré",
    phone: "+228 93 62 18 34",
    email: "ama.sangare@mail.tg",
    address: "Agoè, Lomé",
    joinedAt: "2026-03-17",
    status: "ACTIVE",
    notes: "",
  },
  {
    id: "mem_9",
    organizationId: "org_1",
    memberNumber: "SF-0277",
    firstName: "Yao",
    lastName: "Kpodar",
    phone: "+228 98 29 84 61",
    email: "yao.kpodar@mail.tg",
    address: "Bè, Lomé",
    joinedAt: "2024-08-23",
    status: "SUSPENDED",
    notes: "Pause — blessure au genou.",
  },
  {
    id: "mem_10",
    organizationId: "org_1",
    memberNumber: "SF-0366",
    firstName: "Clarisse",
    lastName: "Agbeko",
    phone: "+228 91 74 05 29",
    email: "clarisse.agbeko@mail.tg",
    address: "Adidogomé, Lomé",
    joinedAt: "2025-11-02",
    status: "ACTIVE",
    notes: "",
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "sub_1",
    organizationId: "org_1",
    memberId: "mem_1",
    activityId: "act_gym",
    plan: "Trimestriel",
    months: 3,
    monthlyAmount: 10000,
    totalAmount: 30000,
    startDate: "2026-06-09",
    endDate: "2026-09-09",
    status: "EXPIRING_SOON",
    renewalNumber: 4,
    paidAt: "2026-06-09",
  },
  {
    id: "sub_2",
    organizationId: "org_1",
    memberId: "mem_2",
    activityId: "act_aikido",
    plan: "Mensuel",
    months: 1,
    monthlyAmount: 20000,
    totalAmount: 20000,
    startDate: "2026-08-10",
    endDate: "2026-09-10",
    status: "EXPIRING_SOON",
    renewalNumber: 7,
    paidAt: "2026-08-10",
  },
  {
    id: "sub_3",
    organizationId: "org_1",
    memberId: "mem_3",
    activityId: "act_karate",
    plan: "Mensuel",
    months: 1,
    monthlyAmount: 15000,
    totalAmount: 15000,
    startDate: "2026-08-12",
    endDate: "2026-09-12",
    status: "EXPIRING_SOON",
    renewalNumber: 12,
    paidAt: "2026-08-12",
  },
  {
    id: "sub_4",
    organizationId: "org_1",
    memberId: "mem_4",
    activityId: "act_danse",
    plan: "Semestriel",
    months: 6,
    monthlyAmount: 5000,
    totalAmount: 30000,
    startDate: "2026-03-13",
    endDate: "2026-09-13",
    status: "EXPIRING_SOON",
    renewalNumber: 2,
    paidAt: "2026-03-13",
  },
  {
    id: "sub_5",
    organizationId: "org_1",
    memberId: "mem_5",
    activityId: "act_taekwondo",
    plan: "Trimestriel",
    months: 3,
    monthlyAmount: 15000,
    totalAmount: 45000,
    startDate: "2026-07-16",
    endDate: "2026-10-16",
    status: "ACTIVE",
    renewalNumber: 9,
    paidAt: "2026-07-16",
  },
  {
    id: "sub_6",
    organizationId: "org_1",
    memberId: "mem_6",
    activityId: "act_gym",
    plan: "Annuel",
    months: 12,
    monthlyAmount: 10000,
    totalAmount: 120000,
    startDate: "2025-12-01",
    endDate: "2026-12-01",
    status: "ACTIVE",
    renewalNumber: 1,
    paidAt: "2025-12-01",
  },
  {
    id: "sub_7",
    organizationId: "org_1",
    memberId: "mem_7",
    activityId: "act_fitness",
    plan: "Mensuel",
    months: 1,
    monthlyAmount: 15000,
    totalAmount: 15000,
    startDate: "2026-07-01",
    endDate: "2026-08-01",
    status: "EXPIRED",
    renewalNumber: 5,
    paidAt: "2026-07-01",
  },
  {
    id: "sub_8",
    organizationId: "org_1",
    memberId: "mem_8",
    activityId: "act_danse",
    plan: "Trimestriel",
    months: 3,
    monthlyAmount: 5000,
    totalAmount: 15000,
    startDate: "2026-05-11",
    endDate: "2026-08-11",
    status: "EXPIRED",
    renewalNumber: 1,
    paidAt: "2026-05-11",
  },
  {
    id: "sub_9",
    organizationId: "org_1",
    memberId: "mem_9",
    activityId: "act_gym",
    plan: "Trimestriel",
    months: 3,
    monthlyAmount: 10000,
    totalAmount: 30000,
    startDate: "2026-07-05",
    endDate: "2026-10-05",
    status: "SUSPENDED",
    renewalNumber: 3,
    paidAt: "2026-07-05",
  },
  {
    id: "sub_10",
    organizationId: "org_1",
    memberId: "mem_10",
    activityId: "act_fitness",
    plan: "Semestriel",
    months: 6,
    monthlyAmount: 15000,
    totalAmount: 90000,
    startDate: "2026-04-14",
    endDate: "2026-10-14",
    status: "ACTIVE",
    renewalNumber: 2,
    paidAt: "2026-04-14",
  },
  {
    id: "sub_11",
    organizationId: "org_1",
    memberId: "mem_1",
    activityId: "act_gym",
    plan: "Trimestriel",
    months: 3,
    monthlyAmount: 10000,
    totalAmount: 30000,
    startDate: "2026-03-09",
    endDate: "2026-06-09",
    status: "EXPIRED",
    renewalNumber: 3,
    paidAt: "2026-03-09",
  },
  {
    id: "sub_12",
    organizationId: "org_1",
    memberId: "mem_2",
    activityId: "act_aikido",
    plan: "Mensuel",
    months: 1,
    monthlyAmount: 20000,
    totalAmount: 20000,
    startDate: "2026-07-10",
    endDate: "2026-08-10",
    status: "EXPIRED",
    renewalNumber: 6,
    paidAt: "2026-07-10",
  },
];

export const payments: Payment[] = [
  {
    id: "pay_1",
    organizationId: "org_1",
    memberId: "mem_1",
    subscriptionId: "sub_1",
    amount: 30000,
    method: "TMoney",
    date: "2026-09-06",
    time: "09:14",
    kind: "Renouvellement",
    receiptId: "rec_1",
  },
  {
    id: "pay_2",
    organizationId: "org_1",
    memberId: "mem_2",
    subscriptionId: "sub_2",
    amount: 20000,
    method: "Espèces",
    date: "2026-09-06",
    time: "10:02",
    kind: "Abonnement",
    receiptId: "rec_2",
  },
  {
    id: "pay_3",
    organizationId: "org_1",
    memberId: "mem_4",
    subscriptionId: "sub_4",
    amount: 5000,
    method: "Flooz",
    date: "2026-09-06",
    time: "11:30",
    kind: "Abonnement",
    receiptId: "rec_3",
  },
  {
    id: "pay_4",
    organizationId: "org_1",
    memberId: "mem_3",
    subscriptionId: "sub_3",
    amount: 15000,
    method: "Carte",
    date: "2026-09-06",
    time: "12:48",
    kind: "Renouvellement",
    receiptId: "rec_4",
  },
  {
    id: "pay_5",
    organizationId: "org_1",
    memberId: "mem_5",
    subscriptionId: "sub_5",
    amount: 45000,
    method: "TMoney",
    date: "2026-09-05",
    time: "16:20",
    kind: "Renouvellement",
    receiptId: "rec_5",
  },
  {
    id: "pay_6",
    organizationId: "org_1",
    memberId: "mem_10",
    subscriptionId: "sub_10",
    amount: 90000,
    method: "Flooz",
    date: "2026-09-03",
    time: "08:45",
    kind: "Abonnement",
    receiptId: "rec_6",
  },
  {
    id: "pay_7",
    organizationId: "org_1",
    memberId: "mem_6",
    subscriptionId: "sub_6",
    amount: 120000,
    method: "Carte",
    date: "2026-09-01",
    time: "14:05",
    kind: "Abonnement",
    receiptId: "rec_7",
  },
  {
    id: "pay_8",
    organizationId: "org_1",
    memberId: "mem_9",
    subscriptionId: "sub_9",
    amount: 30000,
    method: "Espèces",
    date: "2026-08-28",
    time: "17:32",
    kind: "Renouvellement",
    receiptId: "rec_8",
  },
];

export const receipts: Receipt[] = payments.map((p, i) => ({
  id: p.receiptId,
  organizationId: "org_1",
  number: `REC-2026-${String(1041 + i).padStart(4, "0")}`,
  paymentId: p.id,
  memberId: p.memberId,
  subscriptionId: p.subscriptionId,
  issuedAt: p.date,
}));

export const notifications: AppNotification[] = [
  {
    id: "not_1",
    organizationId: "org_1",
    memberId: "mem_1",
    level: "D3",
    title: "Abonnement bientôt terminé",
    message: "Moussa Koné · Gym · se termine le 09 septembre 2026",
    createdAt: "06 septembre 2026",
    read: false,
  },
  {
    id: "not_2",
    organizationId: "org_1",
    memberId: "mem_2",
    level: "D7",
    title: "Abonnement bientôt terminé",
    message: "Afiwa Adjo · Aikido · se termine le 10 septembre 2026",
    createdAt: "06 septembre 2026",
    read: false,
  },
  {
    id: "not_3",
    organizationId: "org_1",
    memberId: "mem_3",
    level: "D7",
    title: "Abonnement bientôt terminé",
    message: "Komlan Adjovi · Karaté · se termine le 12 septembre 2026",
    createdAt: "06 septembre 2026",
    read: false,
  },
  {
    id: "not_4",
    organizationId: "org_1",
    memberId: "mem_7",
    level: "EXPIRED",
    title: "Abonnement terminé",
    message: "Kossi Amouzou · Fitness · terminé le 01 août 2026",
    createdAt: "02 août 2026",
    read: true,
  },
  {
    id: "not_5",
    organizationId: "org_1",
    memberId: "mem_8",
    level: "EXPIRED",
    title: "Abonnement terminé",
    message: "Ama Sangaré · Danse · terminé le 11 août 2026",
    createdAt: "12 août 2026",
    read: true,
  },
  {
    id: "not_6",
    organizationId: "org_1",
    memberId: "mem_4",
    level: "D7",
    title: "Abonnement bientôt terminé",
    message: "Akouvi Sena · Danse · se termine le 13 septembre 2026",
    createdAt: "06 septembre 2026",
    read: true,
  },
];

/* ---------- Helpers ---------- */

export const currency = (value: number) =>
  `${new Intl.NumberFormat("fr-FR").format(value)} ${organization.currency}`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const formatShortDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const daysLeft = (endDate: string) =>
  Math.round(
    (new Date(`${endDate}T00:00:00`).getTime() - new Date(`${TODAY}T00:00:00`).getTime()) /
      86400000,
  );

/** Ajoute des mois à une date ISO et renvoie la nouvelle date ISO (calcul automatique). */
export const addMonths = (iso: string, months: number) => {
  const d = new Date(`${iso}T00:00:00`);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d.toISOString().slice(0, 10);
};

export const memberById = (id: string) => members.find((m) => m.id === id);
export const activityById = (id: string) => activities.find((a) => a.id === id);
export const subscriptionById = (id: string) => subscriptions.find((s) => s.id === id);
export const paymentById = (id: string) => payments.find((p) => p.id === id);
export const receiptById = (id: string) => receipts.find((r) => r.id === id);
export const memberName = (id: string) => {
  const m = memberById(id);
  return m ? `${m.firstName} ${m.lastName}` : "Membre inconnu";
};

/** Abonnement le plus récent d'un membre. */
export const latestSubscription = (memberId: string) =>
  subscriptions
    .filter((s) => s.memberId === memberId)
    .sort((a, b) => b.endDate.localeCompare(a.endDate))[0];

export const statusLabels: Record<SubscriptionStatus, string> = {
  ACTIVE: "Actif",
  EXPIRING_SOON: "Bientôt terminé",
  EXPIRED: "Expiré",
  SUSPENDED: "En pause",
  CANCELLED: "Annulé",
};

export const memberStatusLabels: Record<MemberStatus, string> = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  SUSPENDED: "En pause",
};

export const renewalQueue = subscriptions
  .filter((s) => s.status === "EXPIRING_SOON" || s.status === "EXPIRED")
  .sort((a, b) => daysLeft(a.endDate) - daysLeft(b.endDate));

export const dashboardStats = {
  activeMembers: members.filter((m) => m.status === "ACTIVE").length,
  activeSubscriptions: subscriptions.filter(
    (s) => s.status === "ACTIVE" || s.status === "EXPIRING_SOON",
  ).length,
  expiringSoon: subscriptions.filter((s) => s.status === "EXPIRING_SOON").length,
  expired: subscriptions.filter((s) => s.status === "EXPIRED").length,
  monthRevenue: payments
    .filter((p) => p.date.startsWith("2026-09") && p.amount > 0)
    .reduce((sum, p) => sum + p.amount, 0),
  todayRevenue: payments
    .filter((p) => p.date === TODAY)
    .reduce((sum, p) => sum + p.amount, 0),
  todayCount: payments.filter((p) => p.date === TODAY).length,
};

/* ---------- Caisse : entrées et sorties de fonds ---------- */

export type CashDirection = "IN" | "OUT";

export interface CashMovement {
  id: string;
  organizationId: string;
  direction: CashDirection;
  label: string;
  category: string;
  amount: number;
  method: PaymentMethod;
  date: string;
}

/** Les encaissements d'abonnements alimentent automatiquement la caisse. */
const paymentMovements: CashMovement[] = payments.map((p) => ({
  id: `cash_in_${p.id}`,
  organizationId: "org_1",
  direction: "IN",
  label: `${p.kind} · ${memberName(p.memberId)}`,
  category: "Abonnements",
  amount: p.amount,
  method: p.method,
  date: p.date,
}));

const expenseMovements: CashMovement[] = [
  {
    id: "cash_out_1",
    organizationId: "org_1",
    direction: "OUT",
    label: "Salaire coach Karaté",
    category: "Salaires",
    amount: 60000,
    method: "Espèces",
    date: "2026-09-05",
  },
  {
    id: "cash_out_2",
    organizationId: "org_1",
    direction: "OUT",
    label: "Facture électricité",
    category: "Charges",
    amount: 32000,
    method: "TMoney",
    date: "2026-09-04",
  },
  {
    id: "cash_out_3",
    organizationId: "org_1",
    direction: "OUT",
    label: "Achat tapis de sol",
    category: "Matériel",
    amount: 45000,
    method: "Flooz",
    date: "2026-09-02",
  },
  {
    id: "cash_out_4",
    organizationId: "org_1",
    direction: "OUT",
    label: "Produits d'entretien",
    category: "Entretien",
    amount: 12000,
    method: "Espèces",
    date: "2026-09-01",
  },
  {
    id: "cash_out_5",
    organizationId: "org_1",
    direction: "OUT",
    label: "Loyer du mois",
    category: "Loyer",
    amount: 150000,
    method: "Carte",
    date: "2026-09-01",
  },
];

export const cashMovements: CashMovement[] = [...paymentMovements, ...expenseMovements].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export const expenseCategories = [
  "Salaires",
  "Loyer",
  "Charges",
  "Matériel",
  "Entretien",
  "Autre",
];

const monthMovements = cashMovements.filter((m) => m.date.startsWith("2026-09"));

export const cashStats = {
  in: monthMovements.filter((m) => m.direction === "IN").reduce((s, m) => s + m.amount, 0),
  out: monthMovements.filter((m) => m.direction === "OUT").reduce((s, m) => s + m.amount, 0),
  get balance() {
    return this.in - this.out;
  },
};

/* ---------- Statistiques simples ---------- */

export const revenueByActivity = activities
  .map((a) => {
    const subIds = subscriptions.filter((s) => s.activityId === a.id).map((s) => s.id);
    return {
      id: a.id,
      name: a.name,
      members: a.activeMembers,
      revenue: payments
        .filter((p) => subIds.includes(p.subscriptionId))
        .reduce((s, p) => s + p.amount, 0),
    };
  })
  .sort((a, b) => b.revenue - a.revenue);

export const revenueByMethod = paymentMethods
  .map((m) => ({
    method: m,
    total: payments.filter((p) => p.method === m).reduce((s, p) => s + p.amount, 0),
  }))
  .filter((r) => r.total > 0)
  .sort((a, b) => b.total - a.total);

/* ---------- Séries mensuelles (démonstration) ---------- */

export interface MonthPoint {
  month: string;
  revenue: number;
  expenses: number;
  members: number;
  renewals: number;
  newMembers: number;
}

/** 6 derniers mois de la salle (données de démonstration réalistes, Lomé). */
export const monthlySeries: MonthPoint[] = [
  { month: "Avr", revenue: 385000, expenses: 262000, members: 96, renewals: 21, newMembers: 9 },
  { month: "Mai", revenue: 430000, expenses: 271000, members: 103, renewals: 25, newMembers: 12 },
  { month: "Juin", revenue: 412000, expenses: 258000, members: 108, renewals: 23, newMembers: 8 },
  { month: "Juil", revenue: 475000, expenses: 283000, members: 116, renewals: 28, newMembers: 14 },
  { month: "Août", revenue: 508000, expenses: 291000, members: 122, renewals: 31, newMembers: 11 },
  { month: "Sept", revenue: 545000, expenses: 299000, members: 128, renewals: 34, newMembers: 13 },
];

const lastMonth = monthlySeries[monthlySeries.length - 1];
const prevMonth = monthlySeries[monthlySeries.length - 2];

const pct = (now: number, before: number) =>
  before === 0 ? 0 : Math.round(((now - before) / before) * 100);

export const monthlyTrends = {
  revenue: pct(lastMonth.revenue, prevMonth.revenue),
  members: pct(lastMonth.members, prevMonth.members),
  renewals: pct(lastMonth.renewals, prevMonth.renewals),
  profit: pct(
    lastMonth.revenue - lastMonth.expenses,
    prevMonth.revenue - prevMonth.expenses,
  ),
  profitAmount: lastMonth.revenue - lastMonth.expenses,
  renewalRate: Math.round(
    (lastMonth.renewals / Math.max(1, lastMonth.renewals + dashboardStats.expired)) * 100,
  ),
};
