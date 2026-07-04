import { useState, useEffect } from "react";
import {
  Shield, Truck, FlaskConical, Stethoscope, FileText,
  ChevronDown, ChevronUp, MapPin, Phone, Mail,
  ArrowRight, CheckCircle, Globe, Users, Award,
  Microscope, ClipboardList, Zap, Lock, Menu, X,
  Building2, PackageCheck, AlertTriangle, Settings,
  BookOpen, BarChart3, HeartPulse
} from "lucide-react";

// ─── COLOUR + DESIGN TOKENS ───────────────────────────────────────────────────
const C = {
  navy:    "#0A1628",
  navyMid: "#0F2340",
  teal:    "#0E7C7B",
  tealLt:  "#14A8A7",
  emerald: "#10B981",
  emeraldLt:"#34D399",
  slate:   "#1E293B",
  muted:   "#64748B",
  border:  "#E2E8F0",
  bg:      "#F8FAFB",
  bgCard:  "#FFFFFF",
  white:   "#FFFFFF",
};

// ─── ANIMATED HERO BACKGROUND ─────────────────────────────────────────────────
function HeroBg() {
  const nodes = [
    {x:"12%",y:"20%"}, {x:"28%",y:"55%"}, {x:"45%",y:"18%"},
    {x:"60%",y:"65%"}, {x:"75%",y:"28%"}, {x:"88%",y:"50%"},
    {x:"20%",y:"80%"}, {x:"55%",y:"85%"}, {x:"82%",y:"78%"},
    {x:"38%",y:"42%"}, {x:"68%",y:"45%"}, {x:"92%",y:"22%"},
  ];
  const lines = [
    [0,2],[0,1],[1,9],[2,9],[2,4],[3,5],[3,9],[4,5],[4,10],
    [5,11],[6,1],[6,7],[7,9],[7,10],[8,5],[8,10],[9,10],[10,5],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.18}}>
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0E7C7B" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#0A1628" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#heroGlow)"/>
      {lines.map(([a,b],i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.5"
        />
      ))}
      {nodes.map((n,i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i%3===0?"4":"2.5"}
          fill={i%4===0 ? "#0E7C7B" : "#10B981"} fillOpacity="0.9"
        />
      ))}
    </svg>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ light = false }) {
  const green = light ? "#34D399" : "#10B981";
  const text  = light ? "#FFFFFF" : C.navy;
  const sub   = light ? "#94A3B8" : C.muted;
  return (
    <div className="flex items-center gap-3 select-none">
      <svg width="36" height="42" viewBox="0 0 36 42" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`lg${light?'l':'d'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E7C7B"/>
            <stop offset="100%" stopColor={green}/>
          </linearGradient>
        </defs>
        <path d="M 4 28 C 4 10, 18 3, 18 3 C 18 3, 32 10, 32 28"
          fill="none" stroke={`url(#lg${light?'l':'d'})`} strokeWidth="2" strokeLinecap="round"/>
        <path d="M 8 32 C 8 18, 18 11, 18 11 C 18 11, 28 18, 28 32"
          fill="none" stroke={green} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <ellipse cx="18" cy="31" rx="6" ry="9" fill={`url(#lg${light?'l':'d'})`} opacity="0.95"/>
        <line x1="18" y1="22" x2="18" y2="40" stroke="white" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
        <circle cx="18" cy="3" r="2.5" fill={green}/>
      </svg>
      <div>
        <div style={{fontFamily:"Georgia,serif", fontSize:"18px", fontWeight:400, color:text, letterSpacing:"0.04em", lineHeight:1}}>
          Bio<span style={{color:green, fontStyle:"italic"}}>syntra</span>
        </div>
        <div style={{fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:sub, marginTop:"2px"}}>
          Life Sciences
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLink = (label, target) => (
    <button
      onClick={() => { setPage(target); setMobileOpen(false); window.scrollTo(0,0); }}
      style={{
        fontSize:"14px", letterSpacing:"0.04em",
        color: page === target ? C.tealLt : "rgba(255,255,255,0.78)",
        fontWeight: page === target ? 500 : 400,
        background:"none", border:"none", cursor:"pointer", padding:"4px 0",
        borderBottom: page === target ? `1.5px solid ${C.tealLt}` : "1.5px solid transparent",
        transition:"all 0.18s",
      }}
    >{label}</button>
  );

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(14,124,123,0.2)` : "none",
      transition:"all 0.3s",
    }}>
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"0 24px"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px"}}>
          <button onClick={() => { setPage("home"); window.scrollTo(0,0); }} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
            <Logo light />
          </button>

          {/* Desktop nav */}
          <div style={{display:"flex", alignItems:"center", gap:"32px"}} className="hidden-mobile">
            {navLink("Home", "home")}
            {navLink("Contact Us", "contact")}
            <button
              onClick={() => { setPage("contact"); window.scrollTo(0,0); }}
              style={{
                background:`linear-gradient(135deg, ${C.teal}, ${C.tealLt})`,
                color:"white", border:"none", borderRadius:"6px",
                padding:"9px 20px", fontSize:"13px", fontWeight:500,
                letterSpacing:"0.05em", cursor:"pointer",
                boxShadow:"0 2px 12px rgba(14,124,123,0.35)",
                transition:"all 0.18s",
              }}
            >Partner With Us</button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{background:"none",border:"none",cursor:"pointer",color:"white",display:"none"}}
            className="show-mobile"
          >
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background:"rgba(10,22,40,0.98)", borderTop:`1px solid rgba(14,124,123,0.2)`,
            padding:"16px 0 20px", display:"flex", flexDirection:"column", gap:"16px",
          }}>
            {navLink("Home", "home")}
            {navLink("Contact Us", "contact")}
            <button
              onClick={() => { setPage("contact"); setMobileOpen(false); window.scrollTo(0,0); }}
              style={{
                background:`linear-gradient(135deg, ${C.teal}, ${C.tealLt})`,
                color:"white", border:"none", borderRadius:"6px",
                padding:"10px 20px", fontSize:"13px", fontWeight:500,
                cursor:"pointer", alignSelf:"flex-start",
              }}
            >Partner With Us</button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── VERTICAL CARDS ───────────────────────────────────────────────────────────
const verticals = [
  {
    icon: <PackageCheck size={22}/>,
    title: "Wholesale Medical & Pharmaceutical Supplies",
    text: "We operate a resilient supply network delivering certified pharmaceuticals and medical essentials across Australia. By partnering with vetted international manufacturers, we maintain structural continuity for high-demand healthcare products.",
    bullets: [
      { icon: <Shield size={14}/>, label:"TGA-Compliant Distribution", desc:"Full adherence to Therapeutic Goods Administration standards" },
      { icon: <Globe size={14}/>,  label:"Bulk Procurement Networks", desc:"Streamlined purchasing economies for hospitals and pharmacy groups" },
      { icon: <Truck size={14}/>,  label:"Cold-Chain Logistics", desc:"Validated temperature-controlled shipping for sensitive biologics" },
      { icon: <BarChart3 size={14}/>, label:"End-to-End Tracking", desc:"Full batch traceability from manufacturing plant to clinical delivery" },
    ],
  },
  {
    icon: <AlertTriangle size={22}/>,
    title: "Section 19A Procurement (Medicine Shortages)",
    text: "Biosyntra acts as an authorised gateway to mitigate critical medicine shortages impacting Australian patients. We source bio-equivalent, regulatory-approved alternative medicines from international markets under the TGA Section 19A framework.",
    bullets: [
      { icon: <Zap size={14}/>,       label:"Shortage Mitigation", desc:"Rapid sourcing of critical medicines absent from the ARTG" },
      { icon: <ClipboardList size={14}/>, label:"Regulatory Navigation", desc:"Efficient processing of Section 19A applications and approvals" },
      { icon: <Globe size={14}/>,     label:"Global Network Access", desc:"Established channels with trusted international pharmaceutical vendors" },
      { icon: <Shield size={14}/>,    label:"Risk Management", desc:"Continuous monitoring of global supply disruptions to preempt local shortfalls" },
    ],
  },
  {
    icon: <Settings size={22}/>,
    title: "Medical Equipment & Machinery",
    text: "We supply hospitals, diagnostic labs, and surgical centres with advanced medical machinery. Our procurement portfolio focuses on technical excellence, durability, and integration capabilities.",
    bullets: [
      { icon: <Microscope size={14}/>, label:"Diagnostic & Surgical Tech", desc:"Sourcing cutting-edge imaging, monitoring, and surgical hardware" },
      { icon: <CheckCircle size={14}/>, label:"Technical Compliance", desc:"All machinery fully meets Australian medical engineering standards" },
      { icon: <Building2 size={14}/>, label:"Lifecycle Procurement", desc:"Capital equipment sourcing tailored to hospital budget structures" },
      { icon: <Globe size={14}/>,     label:"Global Manufacturer Access", desc:"Direct pipelines to certified international hardware innovators" },
    ],
  },
  {
    icon: <ClipboardList size={22}/>,
    title: "Clinical Operations, Quality Assurance & Safety Consultancy",
    text: "Our advisory division provides clinical, regulatory, and safety oversight to pharmaceutical and biotech firms. We help businesses optimise operations, navigate complex compliance pathways, and enforce strict quality management systems.",
    bullets: [
      { icon: <Award size={14}/>,     label:"Quality Assurance Systems", desc:"Design and auditing of GMP, GWP, and GDP compliance frameworks" },
      { icon: <HeartPulse size={14}/>, label:"Safety & Pharmacovigilance", desc:"Comprehensive safety oversight and adverse event monitoring setups" },
      { icon: <Stethoscope size={14}/>, label:"Clinical Operations Support", desc:"Optimising trial logistics, protocol compliance, and site readiness" },
      { icon: <Shield size={14}/>,    label:"TGA Audit Preparation", desc:"Expert guidance for successfully navigating rigorous regulatory reviews" },
    ],
  },
  {
    icon: <BookOpen size={22}/>,
    title: "Pharmaceutical Communication Tools (Digital & Print)",
    text: "We deliver precise, evidence-based scientific communication tools for healthcare providers and patients. Our balance of technical compliance and creative clarity ensures critical clinical data is accurately disseminated.",
    bullets: [
      { icon: <FileText size={14}/>,  label:"Compliant Medical Writing", desc:"Creation of data sheets, product manuals, and clinical brochures" },
      { icon: <Globe size={14}/>,     label:"Digital Communication Hubs", desc:"Secure, interactive online tools for medical education" },
      { icon: <Users size={14}/>,     label:"Patient Engagement Materials", desc:"Accessible, clear, and compliant print educational literature" },
      { icon: <CheckCircle size={14}/>, label:"Regulatory Copy Alignment", desc:"Strict verification that all materials adhere to Medicines Australia codes" },
    ],
  },
];

function VerticalCard({ v, idx }) {
  const [open, setOpen] = useState(false);
  const accent = idx % 2 === 0 ? C.teal : C.emerald;
  return (
    <div style={{
      background:C.bgCard,
      border:`1px solid ${C.border}`,
      borderTop:`3px solid ${accent}`,
      borderRadius:"10px",
      overflow:"hidden",
      transition:"box-shadow 0.2s",
      boxShadow: open ? "0 8px 32px rgba(10,22,40,0.10)" : "0 2px 8px rgba(10,22,40,0.05)",
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:"100%", background:"none", border:"none", cursor:"pointer",
          padding:"22px 24px", display:"flex", alignItems:"flex-start",
          justifyContent:"space-between", gap:"16px", textAlign:"left",
        }}
      >
        <div style={{display:"flex", gap:"14px", alignItems:"flex-start"}}>
          <div style={{
            width:"40px", height:"40px", borderRadius:"8px", flexShrink:0,
            background:`linear-gradient(135deg, ${accent}18, ${accent}30)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            color:accent,
          }}>{v.icon}</div>
          <div>
            <div style={{fontSize:"15px", fontWeight:600, color:C.slate, lineHeight:1.3, fontFamily:"Georgia,serif"}}>
              {v.title}
            </div>
            <div style={{fontSize:"13px", color:C.muted, marginTop:"4px"}}>Click to expand</div>
          </div>
        </div>
        <div style={{color:C.muted, flexShrink:0, marginTop:"8px"}}>
          {open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </div>
      </button>

      {open && (
        <div style={{padding:"0 24px 24px"}}>
          <p style={{fontSize:"14px", color:C.muted, lineHeight:1.7, marginBottom:"18px", borderTop:`1px solid ${C.border}`, paddingTop:"18px"}}>
            {v.text}
          </p>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
            {v.bullets.map((b,i) => (
              <div key={i} style={{display:"flex", gap:"10px", alignItems:"flex-start"}}>
                <div style={{
                  color:accent, marginTop:"2px", flexShrink:0,
                  background:`${accent}15`, borderRadius:"4px",
                  padding:"4px",
                }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{fontSize:"13px", fontWeight:600, color:C.slate}}>{b.label}</div>
                  <div style={{fontSize:"12px", color:C.muted, lineHeight:1.5}}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const whyItems = [
    { icon:<Shield size={20}/>,  title:"Uncompromising Regulatory Compliance",  text:"Every product, pipeline, and consultation we deliver aligns strictly with TGA mandates and international quality standards." },
    { icon:<Truck size={20}/>,   title:"Supply Chain Resilience",               text:"Our redundant global logistics networks protect your operations from unforeseen manufacturing and shipping disruptions." },
    { icon:<Users size={20}/>,   title:"Deep Industry Expertise",               text:"Led by seasoned professionals spanning healthcare procurement, clinical research, and pharmaceutical logistics." },
    { icon:<Award size={20}/>,   title:"Strategic B2B Partnerships",            text:"We reject transactional volume in favour of structured, long-term security integration for hospital and commercial buyers." },
  ];

  const goContact = () => { setPage("contact"); window.scrollTo(0,0); };

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight:"100vh", background:C.navy,
        display:"flex", alignItems:"center", position:"relative", overflow:"hidden",
      }}>
        <HeroBg/>
        {/* Gradient overlay bottom */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"180px",background:`linear-gradient(to bottom, transparent, ${C.navy})`}}/>

        <div style={{maxWidth:"1200px", margin:"0 auto", padding:"120px 24px 80px", position:"relative", zIndex:1, width:"100%"}}>
          {/* Eyebrow */}
          <div style={{display:"inline-flex", alignItems:"center", gap:"8px",
            background:"rgba(14,124,123,0.18)", border:"1px solid rgba(14,124,123,0.35)",
            borderRadius:"20px", padding:"6px 14px", marginBottom:"28px"}}>
            <div style={{width:"6px",height:"6px",borderRadius:"50%",background:C.emerald}}/>
            <span style={{fontSize:"12px", letterSpacing:"0.16em", textTransform:"uppercase", color:C.emeraldLt, fontWeight:500}}>
              TGA-Compliant · Melbourne, Australia
            </span>
          </div>

          <h1 style={{
            fontFamily:"Georgia,serif", fontSize:"clamp(28px,4.5vw,56px)",
            fontWeight:400, color:C.white, lineHeight:1.18,
            maxWidth:"780px", margin:"0 0 24px",
          }}>
            Securing Global Life Science{" "}
            <span style={{color:C.tealLt}}>Supply Chains.</span>{" "}
            Empowering Australian Healthcare.
          </h1>

          <p style={{fontSize:"clamp(15px,1.8vw,18px)", color:"rgba(255,255,255,0.68)", lineHeight:1.72, maxWidth:"680px", margin:"0 0 40px"}}>
            Biosyntra Life Sciences bridges the gap between global innovations and local clinical needs with uncompromising regulatory compliance, structural reliability, and strategic excellence.
          </p>

          <div style={{display:"flex", gap:"14px", flexWrap:"wrap"}}>
            <button onClick={goContact} style={{
              background:`linear-gradient(135deg, ${C.teal}, ${C.tealLt})`,
              color:C.white, border:"none", borderRadius:"7px",
              padding:"13px 26px", fontSize:"14px", fontWeight:500,
              letterSpacing:"0.04em", cursor:"pointer",
              boxShadow:"0 4px 20px rgba(14,124,123,0.4)",
            }}>
              Partner With Us <ArrowRight size={15} style={{display:"inline",marginLeft:"6px",verticalAlign:"middle"}}/>
            </button>
            <button onClick={() => document.getElementById("verticals")?.scrollIntoView({behavior:"smooth"})} style={{
              background:"rgba(255,255,255,0.08)", color:C.white,
              border:"1px solid rgba(255,255,255,0.22)", borderRadius:"7px",
              padding:"13px 26px", fontSize:"14px", fontWeight:400,
              letterSpacing:"0.04em", cursor:"pointer",
            }}>
              Explore Our Services
            </button>
          </div>

          {/* Stat strip */}
          <div style={{display:"flex", gap:"40px", marginTop:"64px", flexWrap:"wrap"}}>
            {[["TGA","Compliant Operations"],["Section 19A","Shortage Management"],["5 Core","Service Verticals"],["B2B","Procurement Focus"]].map(([a,b],i) => (
              <div key={i} style={{borderLeft:`2px solid ${C.teal}`, paddingLeft:"14px"}}>
                <div style={{fontFamily:"Georgia,serif", fontSize:"18px", color:C.white, fontWeight:400}}>{a}</div>
                <div style={{fontSize:"12px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.05em"}}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section style={{background:C.bg, padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center"}}>
          <div>
            <div style={{fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:C.teal, fontWeight:600, marginBottom:"14px"}}>
              About Us
            </div>
            <h2 style={{fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:400, color:C.navy, lineHeight:1.25, margin:"0 0 20px"}}>
              Welcome to Biosyntra Life Sciences
            </h2>
            <div style={{width:"48px", height:"3px", background:`linear-gradient(90deg,${C.teal},${C.emerald})`, borderRadius:"2px", marginBottom:"24px"}}/>
            <p style={{fontSize:"15px", color:C.muted, lineHeight:1.78}}>
              Biosyntra Life Sciences is a premier B2B partner integrated within the Australian healthcare and pharmaceutical ecosystem. We deliver end-to-end supply chain infrastructure, specialised regulatory procurement, and elite consultancy services.
            </p>
            <p style={{fontSize:"15px", color:C.muted, lineHeight:1.78, marginTop:"16px"}}>
              Our mission is to safeguard public health by ensuring hospital networks, pharmacies, and clinical entities access vital medical supplies exactly when they need them.
            </p>
          </div>
          {/* Visual panel */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px"}}>
            {[
              {icon:<Shield size={24}/>, label:"Regulatory Authority", color:C.teal},
              {icon:<Globe size={24}/>,  label:"Global Networks",       color:C.emerald},
              {icon:<HeartPulse size={24}/>, label:"Patient Safety",    color:C.teal},
              {icon:<Award size={24}/>, label:"Quality Assurance",      color:C.emerald},
            ].map((item,i) => (
              <div key={i} style={{
                background:C.bgCard, border:`1px solid ${C.border}`, borderRadius:"10px",
                padding:"24px 20px", display:"flex", flexDirection:"column", gap:"12px",
                boxShadow:"0 2px 8px rgba(10,22,40,0.05)",
              }}>
                <div style={{color:item.color}}>{item.icon}</div>
                <div style={{fontSize:"13px", fontWeight:600, color:C.slate}}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTICALS ────────────────────────────────────── */}
      <section id="verticals" style={{background:C.bgCard, padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px", margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:"48px"}}>
            <div style={{fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:C.teal, fontWeight:600, marginBottom:"12px"}}>
              What We Do
            </div>
            <h2 style={{fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:400, color:C.navy, margin:"0 0 16px"}}>
              Our Core Verticals
            </h2>
            <p style={{fontSize:"15px", color:C.muted, maxWidth:"560px", margin:"0 auto", lineHeight:1.7}}>
              Five integrated service disciplines covering the full spectrum of Australian pharmaceutical and medical supply chain needs.
            </p>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:"14px"}}>
            {verticals.map((v,i) => <VerticalCard key={i} v={v} idx={i}/>)}
          </div>
        </div>
      </section>

      {/* ── WHY BIOSYNTRA ────────────────────────────────── */}
      <section style={{background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, padding:"80px 24px"}}>
        <div style={{maxWidth:"1200px", margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:"52px"}}>
            <div style={{fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:C.tealLt, fontWeight:600, marginBottom:"12px"}}>
              Our Advantage
            </div>
            <h2 style={{fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:400, color:C.white, margin:0}}>
              Why Choose Biosyntra
            </h2>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"24px"}}>
            {whyItems.map((item,i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(14,124,123,0.25)",
                borderRadius:"10px", padding:"28px 24px",
              }}>
                <div style={{
                  width:"44px", height:"44px", borderRadius:"8px",
                  background:"rgba(14,124,123,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:C.tealLt, marginBottom:"16px",
                }}>{item.icon}</div>
                <div style={{fontFamily:"Georgia,serif", fontSize:"16px", color:C.white, fontWeight:400, marginBottom:"10px", lineHeight:1.3}}>
                  {item.title}
                </div>
                <p style={{fontSize:"13px", color:"rgba(255,255,255,0.58)", lineHeight:1.7, margin:0}}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────── */}
      <section style={{background:C.bg, padding:"80px 24px"}}>
        <div style={{maxWidth:"720px", margin:"0 auto", textAlign:"center"}}>
          <div style={{
            width:"56px", height:"3px",
            background:`linear-gradient(90deg,${C.teal},${C.emerald})`,
            borderRadius:"2px", margin:"0 auto 28px",
          }}/>
          <h2 style={{fontFamily:"Georgia,serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:400, color:C.navy, margin:"0 0 16px"}}>
            Secure Your Supply Chain
          </h2>
          <p style={{fontSize:"15px", color:C.muted, lineHeight:1.78, marginBottom:"32px"}}>
            Optimise your healthcare procurement, navigate critical medicine shortages, or elevate your quality assurance standards today. Contact our corporate procurement desk to discuss commercial partnerships, institutional tenders, or advisory requirements.
          </p>
          <button onClick={goContact} style={{
            background:`linear-gradient(135deg, ${C.teal}, ${C.tealLt})`,
            color:C.white, border:"none", borderRadius:"7px",
            padding:"14px 32px", fontSize:"14px", fontWeight:500,
            letterSpacing:"0.05em", cursor:"pointer",
            boxShadow:"0 4px 20px rgba(14,124,123,0.35)",
          }}>
            Initiate B2B Inquiry <ArrowRight size={15} style={{display:"inline",marginLeft:"6px",verticalAlign:"middle"}}/>
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"", org:"", email:"", phone:"", reason:"", message:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Wholesale Medical & Pharmaceutical Supplies",
    "Section 19A Procurement & Shortage Mitigation",
    "Medical Equipment & Machinery Sourcing",
    "Clinical Operations & Quality Assurance Consultancy",
    "Pharmaceutical Communication Tools (Digital/Print)",
    "Tender Invitations & Institutional Procurement",
    "International Manufacturing Partnership Proposals",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required.";
    if (!form.org.trim())     e.org     = "Organisation is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email address is required.";
    if (!form.reason)         e.reason  = "Please select a reason for inquiry.";
    if (!form.message.trim()) e.message = "Please include a message.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const Field = ({ id, label, required, children, error }) => (
    <div style={{display:"flex", flexDirection:"column", gap:"6px"}}>
      <label style={{fontSize:"12px", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:C.slate}}>
        {label}{required && <span style={{color:C.teal}}> *</span>}
      </label>
      {children}
      {error && <div style={{fontSize:"12px", color:"#E53E3E"}}>{error}</div>}
    </div>
  );

  const inputStyle = (err) => ({
    width:"100%", padding:"11px 14px", fontSize:"14px",
    border:`1px solid ${err ? "#E53E3E" : C.border}`,
    borderRadius:"7px", outline:"none", color:C.slate,
    background:C.bgCard, boxSizing:"border-box",
    fontFamily:"inherit",
    transition:"border-color 0.18s",
  });

  return (
    <div style={{background:C.bg, minHeight:"100vh", paddingTop:"64px"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding:"64px 24px 56px"}}>
        <div style={{maxWidth:"800px", margin:"0 auto", textAlign:"center"}}>
          <div style={{fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:C.tealLt, fontWeight:600, marginBottom:"14px"}}>
            Get In Touch
          </div>
          <h1 style={{fontFamily:"Georgia,serif", fontSize:"clamp(22px,3.5vw,42px)", fontWeight:400, color:C.white, margin:"0 0 18px", lineHeight:1.2}}>
            Connect With Our Procurement & Advisory Teams
          </h1>
          <p style={{fontSize:"15px", color:"rgba(255,255,255,0.62)", lineHeight:1.78, maxWidth:"660px", margin:"0 auto"}}>
            Biosyntra Life Sciences welcomes inquiries, commercial tenders, and strategic partnership proposals from healthcare networks, government entities, and international manufacturers. Please utilise the secure channel below to route your inquiry directly to the appropriate corporate division.
          </p>
        </div>
      </div>

      <div style={{maxWidth:"1100px", margin:"0 auto", padding:"56px 24px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:"40px", alignItems:"start"}}>

          {/* ── Contact info panel ── */}
          <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
            <div style={{
              background:C.bgCard, border:`1px solid ${C.border}`,
              borderTop:`3px solid ${C.teal}`,
              borderRadius:"10px", padding:"28px 24px",
              boxShadow:"0 2px 8px rgba(10,22,40,0.05)",
            }}>
              <div style={{fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", color:C.teal, fontWeight:600, marginBottom:"20px"}}>
                Corporate Headquarters
              </div>
              {[
                { icon:<MapPin size={16}/>, label:"Address", value:"9/750 Blackburn Road, Clayton, Victoria – 3168, Australia" },
                { icon:<Phone size={16}/>,  label:"Telephone", value:"+61 433 655 744" },
                { icon:<Mail size={16}/>,   label:"Secure Email", value:"office@biosyntra.com.au" },
              ].map((item,i) => (
                <div key={i} style={{display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:i<2?"20px":"0"}}>
                  <div style={{
                    color:C.teal, flexShrink:0, marginTop:"1px",
                    background:`${C.teal}12`, borderRadius:"6px", padding:"6px",
                  }}>{item.icon}</div>
                  <div>
                    <div style={{fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, marginBottom:"3px"}}>{item.label}</div>
                    <div style={{fontSize:"13.5px", color:C.slate, lineHeight:1.5}}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance badge */}
            <div style={{
              background:`${C.teal}0F`, border:`1px solid ${C.teal}30`,
              borderRadius:"10px", padding:"20px 18px",
            }}>
              <div style={{display:"flex", gap:"10px", alignItems:"flex-start"}}>
                <Lock size={16} style={{color:C.teal, flexShrink:0, marginTop:"1px"}}/>
                <div style={{fontSize:"12.5px", color:C.muted, lineHeight:1.65}}>
                  All communications are handled in accordance with the <strong style={{color:C.slate}}>Australian Privacy Principles (APPs)</strong>.
                </div>
              </div>
            </div>
          </div>

          {/* ── Form panel ── */}
          <div style={{
            background:C.bgCard, border:`1px solid ${C.border}`,
            borderRadius:"10px", padding:"36px 32px",
            boxShadow:"0 2px 8px rgba(10,22,40,0.05)",
          }}>
            {submitted ? (
              <div style={{textAlign:"center", padding:"48px 24px"}}>
                <div style={{
                  width:"64px", height:"64px", borderRadius:"50%",
                  background:`${C.emerald}18`, display:"flex", alignItems:"center",
                  justifyContent:"center", margin:"0 auto 20px",
                }}>
                  <CheckCircle size={30} style={{color:C.emerald}}/>
                </div>
                <h3 style={{fontFamily:"Georgia,serif", fontSize:"22px", color:C.navy, fontWeight:400, margin:"0 0 10px"}}>
                  Inquiry Received
                </h3>
                <p style={{fontSize:"14px", color:C.muted, lineHeight:1.7, maxWidth:"380px", margin:"0 auto 24px"}}>
                  Thank you, {form.name}. Your inquiry has been securely routed to our corporate procurement division. A member of our team will be in contact within 2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({name:"",org:"",email:"",phone:"",reason:"",message:""}); }}
                  style={{
                    background:`${C.teal}15`, color:C.teal, border:`1px solid ${C.teal}40`,
                    borderRadius:"6px", padding:"9px 20px", fontSize:"13px", cursor:"pointer",
                  }}
                >Submit Another Inquiry</button>
              </div>
            ) : (
              <div style={{display:"flex", flexDirection:"column", gap:"22px"}}>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px"}}>
                  <Field id="name" label="Full Name" required error={errors.name}>
                    <input
                      style={inputStyle(errors.name)}
                      placeholder="Dr. Jane Smith"
                      value={form.name}
                      onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(er=>({...er,name:""})); }}
                    />
                  </Field>
                  <Field id="org" label="Organisation" required error={errors.org}>
                    <input
                      style={inputStyle(errors.org)}
                      placeholder="Hospital / Pharma Group"
                      value={form.org}
                      onChange={e => { setForm(f=>({...f,org:e.target.value})); setErrors(er=>({...er,org:""})); }}
                    />
                  </Field>
                </div>

                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px"}}>
                  <Field id="email" label="Email Address" required error={errors.email}>
                    <input
                      style={inputStyle(errors.email)}
                      type="email" placeholder="j.smith@hospital.com.au"
                      value={form.email}
                      onChange={e => { setForm(f=>({...f,email:e.target.value})); setErrors(er=>({...er,email:""})); }}
                    />
                  </Field>
                  <Field id="phone" label="Phone Number" error={errors.phone}>
                    <input
                      style={inputStyle(false)}
                      placeholder="+61 4XX XXX XXX"
                      value={form.phone}
                      onChange={e => setForm(f=>({...f,phone:e.target.value}))}
                    />
                  </Field>
                </div>

                <Field id="reason" label="Reason for Inquiry" required error={errors.reason}>
                  <select
                    style={{...inputStyle(errors.reason), color: form.reason ? C.slate : C.muted, appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center"}}
                    value={form.reason}
                    onChange={e => { setForm(f=>({...f,reason:e.target.value})); setErrors(er=>({...er,reason:""})); }}
                  >
                    <option value="">Select relevant division…</option>
                    {reasons.map((r,i) => <option key={i} value={r}>{r}</option>)}
                  </select>
                </Field>

                <Field id="message" label="Message" required error={errors.message}>
                  <textarea
                    style={{...inputStyle(errors.message), minHeight:"130px", resize:"vertical"}}
                    placeholder="Please describe your procurement requirements, tender details, or partnership proposal…"
                    value={form.message}
                    onChange={e => { setForm(f=>({...f,message:e.target.value})); setErrors(er=>({...er,message:""})); }}
                  />
                </Field>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    background: loading ? C.muted : `linear-gradient(135deg, ${C.teal}, ${C.tealLt})`,
                    color:C.white, border:"none", borderRadius:"7px",
                    padding:"13px 28px", fontSize:"14px", fontWeight:500,
                    letterSpacing:"0.05em", cursor: loading ? "default" : "pointer",
                    width:"100%", transition:"background 0.2s",
                    boxShadow: loading ? "none" : "0 4px 16px rgba(14,124,123,0.3)",
                  }}
                >
                  {loading ? "Routing Inquiry…" : "Submit Secure Inquiry"}
                </button>

                {/* Confidentiality note */}
                <div style={{
                  background:`${C.navy}07`, border:`1px solid ${C.border}`,
                  borderRadius:"7px", padding:"14px 16px",
                  display:"flex", gap:"10px", alignItems:"flex-start",
                }}>
                  <Lock size={14} style={{color:C.muted, flexShrink:0, marginTop:"1px"}}/>
                  <p style={{fontSize:"12px", color:C.muted, lineHeight:1.65, margin:0}}>
                    Biosyntra Life Sciences treats all commercial, clinical, and corporate communications with the highest level of security. Information submitted via this secure portal is handled strictly in accordance with the <strong style={{color:C.slate}}>Australian Privacy Principles (APPs)</strong> and will be routed solely to authorised regulatory and procurement personnel.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{background:C.navy, borderTop:`1px solid rgba(14,124,123,0.2)`}}>
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"48px 24px 32px"}}>
        <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"40px", marginBottom:"40px"}}>
          <div>
            <Logo light/>
            <p style={{fontSize:"13px", color:"rgba(255,255,255,0.45)", lineHeight:1.72, marginTop:"16px", maxWidth:"320px"}}>
              A premier B2B partner within the Australian healthcare and pharmaceutical ecosystem. TGA-compliant supply chain infrastructure, regulatory procurement, and elite consultancy services.
            </p>
          </div>
          <div>
            <div style={{fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", color:C.teal, fontWeight:600, marginBottom:"16px"}}>Navigation</div>
            {["home","contact"].map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo(0,0); }}
                style={{display:"block", background:"none", border:"none", cursor:"pointer",
                  fontSize:"13px", color:"rgba(255,255,255,0.5)", padding:"4px 0",
                  textTransform:"capitalize", letterSpacing:"0.04em", textAlign:"left",
                  transition:"color 0.15s"}}>
                {p === "home" ? "Home" : "Contact Us"}
              </button>
            ))}
          </div>
          <div>
            <div style={{fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", color:C.teal, fontWeight:600, marginBottom:"16px"}}>Contact</div>
            <div style={{fontSize:"13px", color:"rgba(255,255,255,0.45)", lineHeight:1.7}}>
              <div>9/750 Blackburn Road</div>
              <div>Clayton, VIC 3168</div>
              <div style={{marginTop:"8px"}}>+61 433 655 744</div>
              <div>office@biosyntra.com.au</div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.08)",
          paddingTop:"24px", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px",
        }}>
          <div style={{fontSize:"12px", color:"rgba(255,255,255,0.28)", letterSpacing:"0.04em"}}>
            © {new Date().getFullYear()} Biosyntra Life Sciences Pty Ltd. All rights reserved.
          </div>
          <div style={{display:"flex", gap:"16px"}}>
            {["TGA Compliant", "APPs Compliant", "GMP Certified"].map(b => (
              <div key={b} style={{
                fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:"rgba(14,124,123,0.7)", border:"1px solid rgba(14,124,123,0.25)",
                borderRadius:"20px", padding:"3px 9px",
              }}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", margin:0, padding:0, minHeight:"100vh"}}>
      <Navbar page={page} setPage={setPage}/>
      {page === "home"    && <HomePage setPage={setPage}/>}
      {page === "contact" && <ContactPage/>}
      <Footer setPage={setPage}/>
    </div>
  );
}
