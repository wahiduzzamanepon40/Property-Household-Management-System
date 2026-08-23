import { useState, type ReactNode, type ElementType } from "react";
import {
  LayoutDashboard, Building2, Users, CreditCard, Wrench, BarChart3,
  Settings, Search, Bell, ChevronLeft, ChevronRight, Plus,
  Download, Edit, Trash2, Eye, ArrowLeft, Upload,
  Home, MapPin, DollarSign, TrendingUp, TrendingDown,
  CheckCircle, AlertCircle, Clock, Phone,
  Mail, Calendar, FileText, Lock, BellRing, Percent,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────

type Page =
  | "login" | "dashboard" | "properties" | "property-details"
  | "add-property" | "tenants" | "payments" | "maintenance"
  | "reports" | "settings";

type StatusVariant =
  | "paid" | "pending" | "overdue" | "active" | "maintenance"
  | "open" | "in-progress" | "completed" | "high" | "medium" | "low";

// ── Data ───────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 12000 },
  { month: "Feb", revenue: 38000, expenses: 11000 },
  { month: "Mar", revenue: 45000, expenses: 13000 },
  { month: "Apr", revenue: 48000, expenses: 12500 },
  { month: "May", revenue: 52000, expenses: 14000 },
  { month: "Jun", revenue: 49000, expenses: 13200 },
  { month: "Jul", revenue: 55000, expenses: 15000 },
  { month: "Aug", revenue: 58000, expenses: 14800 },
  { month: "Sep", revenue: 54000, expenses: 13900 },
  { month: "Oct", revenue: 61000, expenses: 16200 },
  { month: "Nov", revenue: 59000, expenses: 15400 },
  { month: "Dec", revenue: 64000, expenses: 16800 },
];

const occupancyData = [
  { name: "Occupied", value: 78, color: "#2563EB" },
  { name: "Vacant", value: 22, color: "#E2E8F0" },
];

const paymentStatusData = [
  { name: "Paid", value: 68, color: "#10B981" },
  { name: "Pending", value: 18, color: "#F59E0B" },
  { name: "Overdue", value: 14, color: "#EF4444" },
];

const properties = [
  {
    id: 1,
    name: "Sunset Towers",
    location: "123 Main St, San Francisco, CA",
    type: "Residential",
    occupancy: 85,
    units: 24,
    occupied: 20,
    rent: 3200,
    status: "Active",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=350&fit=crop&auto=format",
    amenities: ["Pool", "Gym", "Parking", "Elevator", "24/7 Security"],
    description: "A modern residential tower in the heart of San Francisco with stunning city views and premium amenities for discerning residents.",
  },
  {
    id: 2,
    name: "Harbor View Condos",
    location: "456 Ocean Blvd, San Diego, CA",
    type: "Commercial",
    occupancy: 92,
    units: 36,
    occupied: 33,
    rent: 5500,
    status: "Active",
    image: "https://images.unsplash.com/photo-1551361415-69c87624334f?w=600&h=350&fit=crop&auto=format",
    amenities: ["Ocean View", "Concierge", "Parking", "Rooftop Terrace"],
    description: "Premium harbor-view condominiums with world-class amenities and breathtaking ocean panoramas in coastal San Diego.",
  },
  {
    id: 3,
    name: "Metro Plaza",
    location: "789 Downtown Ave, Los Angeles, CA",
    type: "Mixed Use",
    occupancy: 67,
    units: 48,
    occupied: 32,
    rent: 4800,
    status: "Active",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=350&fit=crop&auto=format",
    amenities: ["Retail Space", "Gym", "Parking", "Co-working Hub"],
    description: "Mixed-use urban development combining retail, office, and residential spaces at the center of downtown Los Angeles.",
  },
  {
    id: 4,
    name: "Green Valley Homes",
    location: "321 Park Lane, Austin, TX",
    type: "Residential",
    occupancy: 100,
    units: 12,
    occupied: 12,
    rent: 2800,
    status: "Active",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=350&fit=crop&auto=format",
    amenities: ["Garden", "Parking", "Playground", "BBQ Area"],
    description: "Peaceful suburban homes in a leafy valley with family-friendly amenities and excellent school proximity.",
  },
  {
    id: 5,
    name: "City Center Lofts",
    location: "555 Urban St, Chicago, IL",
    type: "Residential",
    occupancy: 45,
    units: 20,
    occupied: 9,
    rent: 3900,
    status: "Maintenance",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=350&fit=crop&auto=format",
    amenities: ["Rooftop Deck", "Bike Storage", "Pet Friendly"],
    description: "Industrial-style lofts in the heart of Chicago with exposed brick, high ceilings, and a vibrant urban neighbourhood.",
  },
];

const tenants = [
  { id: 1, name: "Mr.Akram Hossain", email: "akram.m@email.com", phone: "8801624472117", property: "Sunset Towers", unit: "Unit 4A", rent: 3200, status: "Paid", leaseEnd: "2025-06-30", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "James Rodriguez", email: "j.rodriguez@email.com", phone: "+1 619-555-0202", property: "Harbor View Condos", unit: "Unit 8C", rent: 5500, status: "Paid", leaseEnd: "2025-09-30", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 3, name: "Emily Chen", email: "emily.c@email.com", phone: "+1 213-555-0303", property: "Metro Plaza", unit: "Unit 12B", rent: 4800, status: "Pending", leaseEnd: "2025-12-31", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 4, name: "Michael Thompson", email: "m.thompson@email.com", phone: "+1 512-555-0404", property: "Green Valley Homes", unit: "Unit 3", rent: 2800, status: "Paid", leaseEnd: "2026-01-31", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: 5, name: "Jessica Park", email: "j.park@email.com", phone: "+1 312-555-0505", property: "City Center Lofts", unit: "Unit 7D", rent: 3900, status: "Overdue", leaseEnd: "2025-08-31", avatar: "https://i.pravatar.cc/40?img=9" },
  { id: 6, name: "David Kim", email: "d.kim@email.com", phone: "+1 415-555-0606", property: "Sunset Towers", unit: "Unit 11F", rent: 3200, status: "Paid", leaseEnd: "2025-11-30", avatar: "https://i.pravatar.cc/40?img=11" },
];

const payments = [
  { id: 1, tenant: "Sarah Mitchell", property: "Sunset Towers", unit: "Unit 4A", amount: 3200, date: "2025-06-01", method: "Bank Transfer", status: "Paid" },
  { id: 2, tenant: "James Rodriguez", property: "Harbor View Condos", unit: "Unit 8C", amount: 5500, date: "2025-06-01", method: "Credit Card", status: "Paid" },
  { id: 3, tenant: "Emily Chen", property: "Metro Plaza", unit: "Unit 12B", amount: 4800, date: "2025-06-05", method: "Check", status: "Pending" },
  { id: 4, tenant: "Michael Thompson", property: "Green Valley Homes", unit: "Unit 3", amount: 2800, date: "2025-05-31", method: "Bank Transfer", status: "Paid" },
  { id: 5, tenant: "Jessica Park", property: "City Center Lofts", unit: "Unit 7D", amount: 3900, date: "2025-05-28", method: "—", status: "Overdue" },
  { id: 6, tenant: "David Kim", property: "Sunset Towers", unit: "Unit 11F", amount: 3200, date: "2025-06-02", method: "Credit Card", status: "Paid" },
];

const maintenanceRequests = [
  { id: 1, title: "HVAC Not Cooling", tenant: "Sarah Mitchell", property: "Sunset Towers", unit: "Unit 4A", priority: "High", status: "In Progress", date: "2025-06-10", assignee: "Mike Torres", description: "Air conditioning unit failing to cool. Interior temperature reaching 85°F during peak hours.", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, title: "Leaking Kitchen Faucet", tenant: "Emily Chen", property: "Metro Plaza", unit: "Unit 12B", priority: "Medium", status: "Open", date: "2025-06-11", assignee: "Unassigned", description: "Kitchen faucet has a persistent drip. Water pooling under the sink cabinet.", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 3, title: "Elevator Out of Service", tenant: "James Rodriguez", property: "Harbor View Condos", unit: "Common Area", priority: "High", status: "Open", date: "2025-06-12", assignee: "Elevator Co.", description: "Main elevator stuck between floors 4 and 5. Repair team has been contacted.", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, title: "Window Seal Damaged", tenant: "Jessica Park", property: "City Center Lofts", unit: "Unit 7D", priority: "Low", status: "Completed", date: "2025-06-08", assignee: "Tom Reyes", description: "Bedroom window seal degraded, causing noticeable cold draft. Weatherstripping replaced.", avatar: "https://i.pravatar.cc/40?img=9" },
  { id: 5, title: "Parking Lot Lights Out", tenant: "David Kim", property: "Sunset Towers", unit: "Parking Level", priority: "Medium", status: "In Progress", date: "2025-06-09", assignee: "ElectriPro Inc.", description: "Three parking lot fixtures no longer functioning. Safety concern for late-night residents.", avatar: "https://i.pravatar.cc/40?img=11" },
  { id: 6, title: "Pool Pump Failure", tenant: "Michael Thompson", property: "Green Valley Homes", unit: "Amenity Area", priority: "Medium", status: "Open", date: "2025-06-13", assignee: "AquaTech Services", description: "Pool circulation pump making grinding noise and operating below full capacity.", avatar: "https://i.pravatar.cc/40?img=8" },
];

const activities = [
  { id: 1, text: "Sarah Mitchell paid $3,200 rent for Unit 4A, Sunset Towers", time: "2 hours ago", dot: "bg-emerald-400" },
  { id: 2, text: "HVAC repair in progress at Sunset Towers — Mike Torres assigned", time: "5 hours ago", dot: "bg-blue-400" },
  { id: 3, text: "New tenant Emily Chen signed lease for Metro Plaza Unit 12B", time: "1 day ago", dot: "bg-purple-400" },
  { id: 4, text: "City Center Lofts listing updated with new photos", time: "2 days ago", dot: "bg-slate-400" },
  { id: 5, text: "Jessica Park payment is overdue — Unit 7D, City Center Lofts", time: "3 days ago", dot: "bg-red-400" },
];

const upcomingPayments = [
  { tenant: "Emily Chen", amount: 4800, due: "Jun 15, 2025", property: "Metro Plaza" },
  { tenant: "Jessica Park", amount: 3900, due: "Jun 15, 2025", property: "City Center Lofts" },
  { tenant: "Sarah Mitchell", amount: 3200, due: "Jul 01, 2025", property: "Sunset Towers" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n: number) => `$${n.toLocaleString()}`;

function Badge({ label, variant }: { label: string; variant: StatusVariant }) {
  const map: Record<StatusVariant, string> = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
    open: "bg-slate-100 text-slate-600 border-slate-200",
    overdue: "bg-red-50 text-red-700 border-red-200",
    maintenance: "bg-orange-50 text-orange-700 border-orange-200",
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[variant]}`}>
      {label}
    </span>
  );
}

function StatCard({
  label, value, sub, icon: Icon, trend, trendVal, color = "blue",
}: {
  label: string; value: string; sub?: string;
  icon: ElementType; trend?: "up" | "down"; trendVal?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-500",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
            {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendVal}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-slate-900 mb-0.5">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ current, onNav, collapsed, onToggle }: {
  current: Page; onNav: (p: Page) => void;
  collapsed: boolean; onToggle: () => void;
}) {
  return (
    <div
      className={`${collapsed ? "w-[64px]" : "w-[240px]"} flex-shrink-0 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 h-screen sticky top-0 overflow-hidden`}
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-100 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
          <Building2 size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="ml-3 font-semibold text-slate-900 text-sm tracking-tight whitespace-nowrap">
            PropManager
          </span>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden">
        <div className={`${collapsed ? "" : "mb-1 px-3 pt-1 pb-2"}`}>
          {!collapsed && (
            <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
              Main Menu
            </span>
          )}
        </div>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = current === id || (current === "property-details" && id === "properties") || (current === "add-property" && id === "properties");
          return (
            <button
              key={id}
              onClick={() => onNav(id as Page)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-3 px-1 mb-3">
            <img src="https://i.pravatar.cc/32?img=12" alt="Admin" className="w-7 h-7 rounded-full flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">Alex Johnson</div>
              <div className="text-[10px] text-slate-400 truncate">Administrator</div>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
    </div>
  );
}

// ── TopNav ────────────────────────────────────────────────────────────────

function TopNav({ pageTitle, onNav }: { pageTitle: string; onNav: (p: Page) => void }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-20 flex-shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-slate-900 truncate">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 w-52">
        <Search size={13} className="text-slate-400 flex-shrink-0" />
        <input
          placeholder="Search anything..."
          className="bg-transparent text-xs text-slate-600 outline-none flex-1 placeholder-slate-400 min-w-0"
        />
      </div>

      <div className="relative">
        <button
          onClick={() => setNotifOpen((o) => !o)}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-900">Notifications</span>
              <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">Mark all read</span>
            </div>
            {activities.map((a) => (
              <div key={a.id} className="flex gap-3 py-2.5 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50/50 rounded-lg px-1 -mx-1 transition-colors">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.dot}`} />
                <div>
                  <div className="text-xs text-slate-700 leading-relaxed">{a.text}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => onNav("settings")} className="flex-shrink-0">
        <img
          src="https://i.pravatar.cc/36?img=12"
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
        />
      </button>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────

function Shell({ children, current, onNav, pageTitle }: {
  children: ReactNode; current: Page;
  onNav: (p: Page) => void; pageTitle: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar current={current} onNav={onNav} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav pageTitle={pageTitle} onNav={onNav} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// ── 1. Login ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&h=1400&fit=crop&auto=format"
          alt="Modern apartment building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/92 via-blue-900/85 to-blue-700/75" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/25">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">PropManager</span>
          </div>

          <div>
            <div className="text-blue-300 text-xs font-semibold mb-4 tracking-widest uppercase">
              Trusted by 2,400+ property managers worldwide
            </div>
            <h2 className="text-white text-4xl font-semibold leading-tight mb-8">
              Manage every property.<br />
              <span className="text-blue-300">In one place.</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Properties managed", value: "12,400+" },
                { label: "Monthly revenue tracked", value: "$48M+" },
                { label: "Active tenants", value: "38,200+" },
                { label: "Client satisfaction", value: "98.6%" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5"
                >
                  <div className="text-white font-bold text-2xl">{s.value}</div>
                  <div className="text-blue-200 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={17} className="text-white" />
            </div>
            <span className="font-semibold text-slate-900">PropManager</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-1.5">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your account to continue managing your properties.</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@propmanager.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm shadow-md shadow-blue-200"
            >
              Sign in to Dashboard
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {"Don't have an account? "}
            <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Create account
            </button>
          </p>

          <p className="text-center text-[10px] text-slate-400 mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 2. Dashboard ──────────────────────────────────────────────────────────

function DashboardPage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Properties" value="5" sub="Across 4 cities" icon={Building2} trend="up" trendVal="+1 this month" color="blue" />
        <StatCard label="Occupied Units" value="106" sub="78% occupancy rate" icon={Home} trend="up" trendVal="+3.2%" color="green" />
        <StatCard label="Vacant Units" value="34" sub="22% vacancy rate" icon={MapPin} trend="down" trendVal="-1.1%" color="amber" />
        <StatCard label="Monthly Revenue" value="$64,200" sub="June 2025" icon={DollarSign} trend="up" trendVal="+8.5%" color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Revenue Overview</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly revenue vs expenses — 2025</p>
            </div>
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 outline-none bg-white">
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#10B981" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Occupancy Rate</h3>
          <p className="text-xs text-slate-400 mb-4">All properties combined</p>
          <div className="relative flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {occupancyData.map((e) => <Cell key={`dash-occ-${e.name}`} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">78%</span>
              <span className="text-xs text-slate-400">Occupied</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {occupancyData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-4">Recent Activity</h3>
          <div className="space-y-1">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Upcoming Payments</h3>
            <div className="space-y-1">
              {upcomingPayments.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{p.tenant}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{p.property} · {p.due}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{fmt(p.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-900 text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Add Property", action: () => onNav("add-property"), icon: Building2, cls: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100" },
                { label: "Add Tenant", action: () => onNav("tenants"), icon: Users, cls: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100" },
                { label: "Record Payment", action: () => onNav("payments"), icon: CreditCard, cls: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100" },
                { label: "New Request", action: () => onNav("maintenance"), icon: Wrench, cls: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100" },
              ].map((q) => (
                <button
                  key={q.label}
                  onClick={q.action}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs font-semibold transition-colors border ${q.cls}`}
                >
                  <q.icon size={16} />
                  <span className="text-center leading-tight">{q.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Properties ─────────────────────────────────────────────────────────

function PropertiesPage({
  onViewDetails, onAddProperty,
}: {
  onViewDetails: (id: number) => void;
  onAddProperty: () => void;
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = properties.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || p.type === typeFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex-1 min-w-48">
          <Search size={14} className="text-slate-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or location..."
            className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-400 min-w-0"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-600 outline-none bg-white"
        >
          <option>All</option><option>Residential</option><option>Commercial</option><option>Mixed Use</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-600 outline-none bg-white"
        >
          <option>All</option><option>Active</option><option>Maintenance</option>
        </select>
        <button
          onClick={onAddProperty}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={15} /> Add Property
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["PROPERTY", "LOCATION", "TYPE", "OCCUPANCY", "RENT", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="text-left py-3.5 px-4 first:px-5 font-semibold text-slate-400 text-[10px] tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                    <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-500 text-xs max-w-44 truncate">{p.location}</td>
                <td className="py-4 px-4 text-slate-600 text-xs">{p.type}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${p.occupancy}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 font-medium">{p.occupancy}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-slate-900">
                  {fmt(p.rent)}<span className="text-slate-400 font-normal">/mo</span>
                </td>
                <td className="py-4 px-4">
                  <Badge label={p.status} variant={p.status.toLowerCase() as StatusVariant} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onViewDetails(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="View details">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors" title="Edit">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} properties
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${n === page ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Property Details ────────────────────────────────────────────────────

function PropertyDetailsPage({ propertyId, onBack }: { propertyId: number; onBack: () => void }) {
  const p = properties.find((x) => x.id === propertyId) || properties[0];
  const propTenants = tenants.filter((t) => t.property === p.name);
  const propMaint = maintenanceRequests.filter((m) => m.property === p.name);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Properties
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
          <Edit size={13} /> Edit Property
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-200">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h2 className="text-white text-2xl font-bold">{p.name}</h2>
          <p className="text-white/80 text-sm mt-1 flex items-center gap-1.5">
            <MapPin size={12} />{p.location}
          </p>
        </div>
        <div className="absolute top-5 right-5">
          <Badge label={p.status} variant={p.status.toLowerCase() as StatusVariant} />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Units" value={String(p.units)} icon={Home} color="blue" />
        <StatCard label="Occupied Units" value={String(p.occupied)} icon={Users} color="green" />
        <StatCard label="Vacant Units" value={String(p.units - p.occupied)} icon={MapPin} color="amber" />
        <StatCard label="Monthly Rent" value={fmt(p.rent)} icon={DollarSign} color="purple" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-sm mb-3">About This Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {p.amenities.map((a) => (
                <span key={a} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">
              Tenants <span className="text-slate-400 font-normal ml-1">({propTenants.length})</span>
            </h3>
            {propTenants.length === 0 ? (
              <p className="text-sm text-slate-400">No tenants currently assigned to this property.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Tenant", "Unit", "Rent", "Status", "Lease End"].map((h) => (
                      <th key={h} className="text-left py-2 text-[10px] font-semibold text-slate-400 tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {propTenants.map((t) => (
                    <tr key={t.id} className="border-b border-slate-50 last:border-0">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full flex-shrink-0" />
                          <span className="text-xs font-semibold text-slate-800">{t.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-slate-500 pr-3">{t.unit}</td>
                      <td className="py-3 text-xs font-semibold text-slate-800 pr-3">{fmt(t.rent)}</td>
                      <td className="py-3 pr-3">
                        <Badge label={t.status} variant={t.status.toLowerCase() as StatusVariant} />
                      </td>
                      <td className="py-3 text-xs text-slate-500">{t.leaseEnd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Occupancy</h3>
            <div className="relative flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie
                    data={[{ value: p.occupancy, color: "#2563EB" }, { value: 100 - p.occupancy, color: "#E2E8F0" }]}
                    cx="50%" cy="50%" innerRadius={38} outerRadius={52}
                    dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}
                  >
                    <Cell key="prop-occ-filled" fill="#2563EB" />
                    <Cell key="prop-occ-empty" fill="#E2E8F0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900">{p.occupancy}%</span>
                <span className="text-[10px] text-slate-400">Occupied</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500">
              {p.occupied} of {p.units} units occupied
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">Maintenance History</h3>
            <div className="space-y-1">
              {propMaint.length === 0 ? (
                <p className="text-xs text-slate-400">No maintenance history.</p>
              ) : (
                propMaint.map((m) => (
                  <div key={m.id} className="flex items-start gap-2.5 py-2.5 border-b border-slate-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${m.status === "Completed" ? "bg-emerald-400" : m.status === "In Progress" ? "bg-blue-400" : "bg-amber-400"}`} />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{m.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{m.date} · {m.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 5. Add Property ────────────────────────────────────────────────────────

function AddPropertyPage({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    name: "", address: "", type: "Residential", rooms: "", units: "", rent: "", description: "",
  });
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>
        <h2 className="text-sm font-semibold text-slate-900">New Property</h2>
        <div className="w-16" />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-4">Property Images</h3>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-slate-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
            <Upload size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Drop images here or <span className="text-blue-600">browse files</span>
          </p>
          <p className="text-xs text-slate-400 mt-1.5">PNG, JPG up to 10MB each · Multiple files supported</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-5">Property Details</h3>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Property Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Sunset Towers"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Property Type</label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white"
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Mixed Use</option>
              <option>Industrial</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Full Address</label>
            <input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Main St, San Francisco, CA 94102"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Number of Rooms</label>
            <input
              type="number"
              value={form.rooms}
              onChange={(e) => update("rooms", e.target.value)}
              placeholder="24"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Number of Units</label>
            <input
              type="number"
              value={form.units}
              onChange={(e) => update("units", e.target.value)}
              placeholder="12"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Monthly Rent (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
              <input
                type="number"
                value={form.rent}
                onChange={(e) => update("rent", e.target.value)}
                placeholder="3,200"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the property, its features, surroundings, and any notable characteristics..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pb-4">
        <button onClick={onBack} className="px-5 py-2.5 border border-slate-200 text-sm text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
          Save Property
        </button>
      </div>
    </div>
  );
}

// ── 6. Tenants ─────────────────────────────────────────────────────────────

function TenantsPage() {
  const [search, setSearch] = useState("");
  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.property.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 flex-1">
          <Search size={14} className="text-slate-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenants by name, email, or property..."
            className="bg-transparent text-sm text-slate-700 outline-none flex-1 placeholder-slate-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
          <Plus size={15} /> Add Tenant
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["TENANT", "CONTACT", "PROPERTY", "RENT", "STATUS", "LEASE END", "ACTIONS"].map((h) => (
                <th key={h} className="text-left py-3.5 px-4 first:px-5 font-semibold text-slate-400 text-[10px] tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{t.unit}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Mail size={10} className="text-slate-400 flex-shrink-0" />
                      {t.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone size={10} className="text-slate-400 flex-shrink-0" />
                      {t.phone}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs text-slate-600">{t.property}</td>
                <td className="py-4 px-4 font-semibold text-slate-900">
                  {fmt(t.rent)}<span className="text-slate-400 font-normal">/mo</span>
                </td>
                <td className="py-4 px-4">
                  <Badge label={t.status} variant={t.status.toLowerCase() as StatusVariant} />
                </td>
                <td className="py-4 px-4 text-xs text-slate-500">{t.leaseEnd}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {tenants.length} tenants</span>
        </div>
      </div>
    </div>
  );
}

// ── 7. Payments ────────────────────────────────────────────────────────────

function PaymentsPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Collected (June)" value="$19,700" icon={DollarSign} color="green" trend="up" trendVal="+4.2%" />
        <StatCard label="Pending" value="$4,800" icon={Clock} color="amber" />
        <StatCard label="Overdue" value="$3,900" icon={AlertCircle} color="red" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Monthly Income</h3>
          <p className="text-xs text-slate-400 mb-4">Revenue collected per month — 2025</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }}
              />
              <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Payment Status</h3>
          <p className="text-xs text-slate-400 mb-3">Current month breakdown</p>
          <div className="relative flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={56} dataKey="value" strokeWidth={0}>
                  {paymentStatusData.map((e) => <Cell key={`pay-status-${e.name}`} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5">
            {paymentStatusData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">Payment History</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              <Download size={12} /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm shadow-blue-200">
              <Plus size={12} /> Record Payment
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["TENANT", "PROPERTY / UNIT", "AMOUNT", "DATE", "METHOD", "STATUS", "ACTIONS"].map((h) => (
                <th key={h} className="text-left py-3.5 px-4 first:px-5 font-semibold text-slate-400 text-[10px] tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5 font-semibold text-slate-900">{p.tenant}</td>
                <td className="py-4 px-4 text-xs text-slate-500">{p.property} · {p.unit}</td>
                <td className="py-4 px-4 font-bold text-slate-900">{fmt(p.amount)}</td>
                <td className="py-4 px-4 text-xs text-slate-500">{p.date}</td>
                <td className="py-4 px-4 text-xs text-slate-600">{p.method}</td>
                <td className="py-4 px-4">
                  <Badge label={p.status} variant={p.status.toLowerCase() as StatusVariant} />
                </td>
                <td className="py-4 px-4">
                  <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold">
                    <Download size={12} /> Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 8. Maintenance ─────────────────────────────────────────────────────────

function MaintenancePage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All"
    ? maintenanceRequests
    : maintenanceRequests.filter((m) => m.status === filter);

  const counts = {
    All: maintenanceRequests.length,
    Open: maintenanceRequests.filter((m) => m.status === "Open").length,
    "In Progress": maintenanceRequests.filter((m) => m.status === "In Progress").length,
    Completed: maintenanceRequests.filter((m) => m.status === "Completed").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        {(["All", "Open", "In Progress", "Completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              filter === f
                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === f ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
              {counts[f]}
            </span>
          </button>
        ))}
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
          <Plus size={14} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <Badge label={m.priority} variant={m.priority.toLowerCase() as StatusVariant} />
              <Badge label={m.status} variant={m.status.toLowerCase().replace(" ", "-") as StatusVariant} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">{m.title}</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">{m.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <img src={m.avatar} alt={m.tenant} className="w-7 h-7 rounded-full flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-800">{m.tenant}</p>
                <p className="text-[10px] text-slate-400">{m.property} · {m.unit}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-4 pb-3 border-b border-slate-50">
              <span className="flex items-center gap-1">
                <Calendar size={10} />{m.date}
              </span>
              <span className="flex items-center gap-1">
                {m.assignee !== "Unassigned"
                  ? <><CheckCircle size={10} className="text-emerald-500" />{m.assignee}</>
                  : <><AlertCircle size={10} className="text-amber-500" />Unassigned</>
                }
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
              {m.status !== "Completed" && (
                <button className="flex-1 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-colors">
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 9. Reports ─────────────────────────────────────────────────────────────

function ReportsPage() {
  const topProperties = [...properties].sort(
    (a, b) => (b.rent * b.occupancy) / 100 - (a.rent * a.occupancy) / 100
  );
  const occTrend = revenueData.map((d, i) => ({
    ...d,
    occupancy: parseFloat((70 + Math.sin(i * 0.8) * 7 + i * 0.6).toFixed(1)),
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Annual Revenue" value="$563,400" icon={DollarSign} trend="up" trendVal="+12.4%" color="blue" />
        <StatCard label="Avg Occupancy" value="77.8%" icon={Percent} trend="up" trendVal="+3.1%" color="green" />
        <StatCard label="Total Expenses" value="$173,000" icon={TrendingDown} trend="down" trendVal="-2.3%" color="amber" />
        <StatCard label="Net Operating Income" value="$390,400" icon={TrendingUp} trend="up" trendVal="+18.6%" color="purple" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Revenue vs Expenses</h3>
          <p className="text-xs text-slate-400 mb-4">Full year 2025 — grouped by month</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={revenueData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(v: number) => [`$${v.toLocaleString()}`]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }}
              />
              <Bar dataKey="revenue" fill="#2563EB" radius={[3, 3, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#10B981" radius={[3, 3, 0, 0]} name="Expenses" />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Occupancy Trend</h3>
          <p className="text-xs text-slate-400 mb-4">Monthly occupancy rate across all properties</p>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={occTrend} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[60, 100]} />
              <Tooltip
                formatter={(v: number) => [`${v.toFixed(1)}%`, "Occupancy"]}
                contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }}
              />
              <Area type="monotone" dataKey="occupancy" stroke="#10B981" strokeWidth={2} fill="url(#occGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Top Performing Properties</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ranked by effective monthly revenue</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              <FileText size={11} /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              <Download size={11} /> Export Excel
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["RANK / PROPERTY", "OCCUPANCY", "MONTHLY RENT", "EFFECTIVE REVENUE", "STATUS"].map((h) => (
                <th key={h} className="text-left py-2.5 pr-4 first:pr-0 text-[10px] font-semibold text-slate-400 tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topProperties.map((p, i) => (
              <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-300 w-5">#{i + 1}</span>
                    <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-slate-100" />
                    <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.occupancy}%` }} />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{p.occupancy}%</span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 font-semibold text-slate-900 text-sm">{fmt(p.rent)}</td>
                <td className="py-3.5 pr-4 font-bold text-slate-900 text-sm">{fmt(Math.round(p.rent * p.occupancy / 100))}</td>
                <td className="py-3.5">
                  <Badge label={p.status} variant={p.status.toLowerCase() as StatusVariant} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 10. Settings ───────────────────────────────────────────────────────────

function SettingsPage() {
  const [name, setName] = useState("Wahiduzzaman Epon");
  const [email, setEmail] = useState("epon@propmanager.com");
  const [phone, setPhone] = useState("01624472117");
  const [notifs, setNotifs] = useState({
    email: true, sms: false, push: true,
    maintenance: true, payments: true, reports: false,
  });

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs((n) => ({ ...n, [key]: !n[key] }));

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Profile */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-5">Profile Information</h3>
        <div className="flex items-center gap-5 mb-6">
          <div className="relative flex-shrink-0">
            <img src="https://i.pravatar.cc/80?img=12" alt="Avatar" className="w-20 h-20 rounded-2xl object-cover" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <Edit size={11} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-bold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500 mt-0.5">Property Manager · Administrator</p>
            <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Change photo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: name, setter: setName, type: "text" },
            { label: "Email Address", value: email, setter: setEmail, type: "email" },
            { label: "Phone Number", value: phone, setter: setPhone, type: "tel" },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
              />
            </div>
          ))}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Role</label>
            <input
              value="Property Manager"
              readOnly
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-400 bg-slate-50 outline-none cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-5 flex items-center gap-2">
          <Lock size={14} className="text-slate-500" /> Change Password
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 tracking-wider mb-1.5 uppercase">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-5 flex items-center gap-2">
          <BellRing size={14} className="text-slate-500" /> Notification Preferences
        </h3>
        <div className="space-y-1">
          {([
            { key: "email" as const, label: "Email notifications", desc: "Receive all updates via email" },
            { key: "sms" as const, label: "SMS notifications", desc: "Get text message alerts for urgent items" },
            { key: "push" as const, label: "Push notifications", desc: "Browser and desktop push notifications" },
            { key: "maintenance" as const, label: "Maintenance alerts", desc: "New requests and status updates" },
            { key: "payments" as const, label: "Payment alerts", desc: "Payment received and overdue reminders" },
            { key: "reports" as const, label: "Monthly reports", desc: "Automated analytics delivered to your inbox" },
          ]).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(key)}
                className={`relative inline-flex w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifs[key] ? "bg-blue-600" : "bg-slate-200"}`}
                role="switch"
                aria-checked={notifs[key]}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifs[key] ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pb-4">
        <button className="px-5 py-2.5 border border-slate-200 text-sm text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200">
          Save Changes
        </button>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

const pageTitles: Record<Page, string> = {
  login: "Login",
  dashboard: "Dashboard",
  properties: "Properties",
  "property-details": "Property Details",
  "add-property": "Add Property",
  tenants: "Tenants",
  payments: "Payments",
  maintenance: "Maintenance Requests",
  reports: "Reports & Analytics",
  settings: "Settings",
};

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(1);

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  }

  return (
    <Shell current={page} onNav={setPage} pageTitle={pageTitles[page]}>
      {page === "dashboard" && <DashboardPage onNav={setPage} />}
      {page === "properties" && (
        <PropertiesPage
          onViewDetails={(id) => { setSelectedPropertyId(id); setPage("property-details"); }}
          onAddProperty={() => setPage("add-property")}
        />
      )}
      {page === "property-details" && (
        <PropertyDetailsPage propertyId={selectedPropertyId} onBack={() => setPage("properties")} />
      )}
      {page === "add-property" && <AddPropertyPage onBack={() => setPage("properties")} />}
      {page === "tenants" && <TenantsPage />}
      {page === "payments" && <PaymentsPage />}
      {page === "maintenance" && <MaintenancePage />}
      {page === "reports" && <ReportsPage />}
      {page === "settings" && <SettingsPage />}
    </Shell>
  );
}
