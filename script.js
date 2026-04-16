/* ================================================================
   THE NERD HERD — V2 script.js
   Real dates: April 17–20, 2026 (CDT)
   Trip activates at 7:00 AM CT Friday April 17 2026
   Silent background refresh — no scroll interruption
   ================================================================ */
'use strict';

// ── PEOPLE ───────────────────────────────────────────────────────
const PEOPLE = {
  dino:    { name: 'Dino',    initials: 'D',  color: '#800080' },
  brayden: { name: 'Brayden', initials: 'Br', color: '#9A2A2A' },
  gavin:   { name: 'Gavin',   initials: 'G',  color: '#18bdd6' },
  atticus: { name: 'Atticus', initials: 'At', color: '#00A31B' },
  abby:    { name: 'Abby',    initials: 'Ab', color: '#FFC0CB' },
  jordan:  { name: 'Jordan',  initials: 'J',  color: '#FF7518' },
  lauren:  { name: 'Lauren',  initials: 'L',  color: '#023009' },
  bob:     { name: 'Bob',     initials: 'Bo', color: '#00A36C' },
};

// ── LOCATIONS ────────────────────────────────────────────────────
const LOC = {
  hotel:    { name: 'Home2 Suites — DeSoto',          addr: '1300 E Centre Park Boulevard, DeSoto, TX 75115' },
  ren:      { name: 'Scarborough Renaissance Fest',   addr: '2511 FM-66, Waxahachie, TX 75167' },
  jl:       { name: "Jordan & Lauren's House",        addr: '1102 Hall Dr, Wylie, TX 75098' },
  sixflags: { name: 'Six Flags Over Texas',           addr: '2201 E Road to Six Flags St, Arlington, TX 76011' },
  gavin:    { name: "Gavin's House",                  addr: '520 English Oak St, Georgetown, TX 78626' },
  acu:      { name: 'Abilene Christian University',   addr: '1600 Campus Ct, Abilene, TX 79601' },
  austin:   { name: 'Austin, TX',                     addr: 'Austin, TX' },
  mckinney: { name: 'McKinney, TX',                   addr: 'McKinney, TX' },
  denton:   { name: 'Denton, TX',                     addr: 'Denton, TX' },
};

// ── SCHEDULE ─────────────────────────────────────────────────────
// All times are Central Time (CDT = UTC-5 in April)
// date: JS Date at midnight CDT represented as UTC midnight + offset
// Helper: CDT date string → Date object
function cdt(dateStr, h, m) {
  // dateStr like '2026-04-17', h/m in CDT
  // CDT = UTC-5, so add 5 hours to get UTC
  return new Date(`${dateStr}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00-05:00`);
}

const DAYS = [
  // ── FRIDAY: TRAVEL DAY ──────────────────────────────────────────
  {
    id: 0, label: 'Friday', subtitle: 'Travel Day',
    emoji: '🚗', date: '2026-04-17',
    events: [
      {
        id:'f01', h:7, m:0,
        name:"Dino Leaves Austin", emoji:'🚗',
        tags:['travel'], people:['dino'],
        notes:"Dino heads north to Georgetown to pick up Brayden and Gavin.",
        where:{ dino:'En route — Austin → Georgetown' },
      },
      {
        id:'f02', h:7, m:5,
        name:"Brayden Leaves Cedar Park", emoji:'🚗',
        tags:['travel'], people:['brayden'],
        notes:"Brayden heads to Gavin's house in Georgetown.",
        where:{ brayden:"En route → Gavin's" },
      },
      {
        id:'f03', h:7, m:30,
        name:"Dino Picks Up Brayden & Gavin", emoji:'🤝',
        tags:['travel'], people:['dino','brayden','gavin'],
        loc:'gavin',
        notes:"Car 1 assembles at Gavin's house in Georgetown. Three down, one to go.",
        where:{ dino:"Gavin's House — Georgetown", brayden:"Gavin's House", gavin:"Gavin's House" },
        cars:[{ label:'🚗 Car 1 — Georgetown', people:['dino','brayden','gavin'] }],
      },
      {
        id:'f04', h:7, m:45,
        name:"Abby Leaves for Work", emoji:'💼',
        tags:['travel'], people:['abby'],
        notes:"Abby heads to work in McKinney. Dino will pick her up at 5 PM.",
        where:{ abby:'En route to work — McKinney' },
      },
      {
        id:'f05', h:7, m:50,
        name:"Car 1 Hits the Road for Abilene", emoji:'🛣️',
        tags:['travel'], people:['dino','brayden','gavin'],
        notes:"Breakfast stop somewhere on I-35, then ~3 hrs west to Abilene to get Atticus.",
        where:{ dino:'I-35 → US-84 West', brayden:'I-35 West', gavin:'I-35 West' },
        cars:[{ label:'🚗 Car 1 — Westbound', people:['dino','brayden','gavin'] }],
      },
      {
        id:'f06', h:8, m:0,
        name:"Abby Arrives at Work", emoji:'🏢',
        tags:['travel'], people:['abby'],
        notes:"Abby puts in the day. See you tonight!",
        where:{ abby:'Work — McKinney' },
      },
      {
        id:'f07', h:11, m:20,
        name:"Arrive in Abilene — Pick Up Atticus", emoji:'🤠',
        tags:['travel'], people:['dino','brayden','gavin','atticus'],
        loc:'acu',
        notes:"Car 1 rolls into Abilene. Atticus is on board — full Car 1 crew assembled!",
        where:{ dino:'Abilene, TX', brayden:'Abilene', gavin:'Abilene', atticus:'Abilene' },
        cars:[{ label:'🚗 Car 1 — Now 4 Deep', people:['dino','brayden','gavin','atticus'] }],
      },
      {
        id:'f08', h:11, m:30,
        name:"Lunch & Coffee — Abilene", emoji:'🍔',
        tags:['food'], people:['dino','brayden','gavin','atticus'],
        loc:'acu',
        notes:"One hour fuel stop. Eat well — it's another 3 hours to DeSoto.",
        where:{ dino:'Lunch — Abilene', brayden:'Lunch — Abilene', gavin:'Lunch — Abilene', atticus:'Lunch — Abilene' },
      },
      {
        id:'f09', h:12, m:35,
        name:"Car 1 Departs for DeSoto", emoji:'🛣️',
        tags:['travel'], people:['dino','brayden','gavin','atticus'],
        notes:"~3 hours east to DeSoto. Final leg!",
        where:{ dino:'US-84 East → Dallas', brayden:'US-84 East', gavin:'US-84 East', atticus:'US-84 East' },
        cars:[{ label:'🚗 Car 1 — Eastbound', people:['dino','brayden','gavin','atticus'] }],
      },
      {
        id:'f10', h:13, m:0,
        name:"Bob Heads to Jordan & Lauren's to Help Set Up", emoji:'🔧',
        tags:['travel'], people:['bob'],
        notes:"Bob arrives in the afternoon at J&L's to help with book club prep.",
        where:{ bob:"En route → J&L's — Wylie" },
      },
      {
        id:'f11', h:15, m:30,
        name:"Car 1 Arrives — Hotel Check-In", emoji:'🏨',
        tags:['lodging'], people:['dino','brayden','gavin','atticus'],
        loc:'hotel',
        notes:"Home2 Suites in DeSoto. Drop bags, freshen up — you made it halfway!",
        where:{ dino:'Hotel — DeSoto', brayden:'Hotel — DeSoto', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto' },
      },
      {
        id:'f12', h:16, m:0,
        name:"Leave Hotel for Jordan & Lauren's", emoji:'🚗',
        tags:['travel'], people:['dino','brayden','gavin','atticus'],
        loc:'jl',
        notes:"~25 min drive north to Wylie.",
        where:{ dino:'DeSoto → Wylie', brayden:'DeSoto → Wylie', gavin:'DeSoto → Wylie', atticus:'DeSoto → Wylie' },
      },
      {
        id:'f13', h:17, m:0,
        name:"Dino Drops Group at J&L's, Heads to McKinney", emoji:'🚗',
        tags:['travel'], people:['dino','brayden','gavin','atticus','abby','jordan','lauren'],
        loc:'jl',
        notes:"Brayden, Gavin & Atticus hang at J&L's. Dino drives solo to pick up Abby from work (~35 min each way). Abby gets off at 5:05 PM.",
        where:{ brayden:"J&L's — Wylie", gavin:"J&L's — Wylie", atticus:"J&L's — Wylie", jordan:"J&L's — Wylie", lauren:"J&L's — Wylie", bob:"J&L's — Wylie", dino:'En route → McKinney', abby:'Work — McKinney' },
        cars:[
          { label:"🏠 At J&L's", people:['brayden','gavin','atticus','jordan','lauren','bob'] },
          { label:'🚗 Dino — Solo Run to McKinney', people:['dino'] },
          { label:'💼 Getting off work', people:['abby'] },
        ],
      },
      {
        id:'f14', h:18, m:35,
        name:"Dino & Abby Return to J&L's", emoji:'🎉',
        tags:['travel'], people:['dino','abby'],
        loc:'jl',
        notes:"All 8 Nerd Herd members together for the first time. Weekend officially starts NOW.",
        where:{ dino:"J&L's — Wylie", abby:"J&L's — Wylie" },
      },
      {
        id:'f15', h:18, m:40,
        name:"📚 Book Club & Movie Night", emoji:'📚',
        tags:['event'], people:['dino','brayden','gavin','atticus','abby','jordan','lauren','bob'],
        loc:'jl',
        notes:"Full squad at J&L's for book club discussion and movie night. Rest of the evening is yours.",
        where:{ dino:"J&L's — Wylie", brayden:"J&L's — Wylie", gavin:"J&L's — Wylie", atticus:"J&L's — Wylie", abby:"J&L's — Wylie", jordan:"J&L's — Wylie", lauren:"J&L's — Wylie", bob:"J&L's — Wylie" },
      },
    ],
  },

  // ── SATURDAY: REN FAIRE ─────────────────────────────────────────
  {
    id:1, label:'Saturday', subtitle:'Ren Faire Day!',
    emoji:'⚔️', date:'2026-04-18',
    events:[
      {
        id:'s01', h:8, m:30,
        name:"Jordan, Lauren & Bob Leave for Ren Faire", emoji:'🚗',
        tags:['travel'], people:['jordan','lauren','bob'],
        notes:"Car 2 departs Wylie (~50 miles south to Waxahachie). Light traffic, plenty of time.",
        where:{ jordan:'Wylie → Waxahachie', lauren:'Wylie → Waxahachie', bob:'Wylie → Waxahachie', dino:'Hotel — DeSoto', brayden:'Hotel — DeSoto', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto' },
        cars:[
          { label:'🚗 Car 2 — Wylie', people:['jordan','lauren','bob'] },
          { label:'😴 Hotel — DeSoto', people:['dino','brayden','gavin','atticus'] },
        ],
      },
      {
        id:'s02', h:9, m:0,
        name:"Car 1 Leaves Hotel for Ren Faire", emoji:'🚗',
        tags:['travel'], people:['dino','brayden','gavin','atticus'],
        loc:'hotel',
        notes:"Updated to 9:00 AM (was 9:15) for a comfortable ~40 min drive to Waxahachie. Both cars should arrive around 9:40.",
        where:{ dino:'DeSoto → Waxahachie', brayden:'DeSoto → Waxahachie', gavin:'DeSoto → Waxahachie', atticus:'DeSoto → Waxahachie', jordan:'Wylie → Waxahachie', lauren:'Wylie → Waxahachie', bob:'Wylie → Waxahachie' },
        cars:[
          { label:'🚗 Car 1 — DeSoto', people:['dino','brayden','gavin','atticus'] },
          { label:'🚗 Car 2 — Wylie', people:['jordan','lauren','bob'] },
        ],
      },
      {
        id:'s03', h:9, m:40,
        name:"Everyone Arrives — Secure Good Parking", emoji:'🅿️',
        tags:['event'], people:['dino','brayden','gavin','atticus','jordan','lauren','bob'],
        loc:'ren',
        notes:"Both cars at Scarborough Ren Fest. Grab a great spot before the masses roll in.",
        where:{ dino:'Ren Faire — Waxahachie', brayden:'Ren Faire', gavin:'Ren Faire', atticus:'Ren Faire', jordan:'Ren Faire', lauren:'Ren Faire', bob:'Ren Faire' },
      },
      {
        id:'s04', h:10, m:0,
        name:"⚔️ Gates Open — Scarborough Ren Faire", emoji:'⚔️',
        tags:['event'], people:['dino','brayden','gavin','atticus','jordan','lauren','bob'],
        loc:'ren',
        notes:"HARK! The gates are open! Jousting, turkey legs, mead, performers, and the full medieval experience. Nine hours of Ren Faire awaits.",
        where:{ dino:'Ren Faire', brayden:'Ren Faire', gavin:'Ren Faire', atticus:'Ren Faire', jordan:'Ren Faire', lauren:'Ren Faire', bob:'Ren Faire' },
      },
      {
        id:'s05', h:19, m:0,
        name:"💥 Closing Cannon — Leave Ren Faire", emoji:'💥',
        tags:['event'], people:['dino','brayden','gavin','atticus','jordan','lauren','bob'],
        loc:'ren',
        notes:"The cannon fires! Time to drag yourselves away from the jousting field. Great memories made.",
        where:{ dino:'Ren Faire — Waxahachie', brayden:'Ren Faire', gavin:'Ren Faire', atticus:'Ren Faire', jordan:'Ren Faire', lauren:'Ren Faire', bob:'Ren Faire' },
      },
      {
        id:'s06', h:19, m:5,
        name:"🌙 Saturday Night — TBD / Free Time", emoji:'🌙',
        tags:['free'], people:['dino','brayden','gavin','atticus','jordan','lauren','bob'],
        notes:"Group decision time! Options on the table: Whataburger run, hotel hangout, back to J&L's, or wherever the vibe takes you.",
        where:{},
      },
    ],
  },

  // ── SUNDAY: SIX FLAGS ───────────────────────────────────────────
  {
    id:2, label:'Sunday', subtitle:'Six Flags Day!',
    emoji:'🎢', date:'2026-04-19',
    events:[
      {
        id:'su01', h:8, m:45,
        name:"Dino & Brayden Leave for McKinney", emoji:'🚗',
        tags:['travel'], people:['dino','brayden'],
        notes:"Dino & Brayden head north ~40 min to pick up Abby in McKinney.",
        where:{ dino:'DeSoto → McKinney', brayden:'DeSoto → McKinney', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto', jordan:'Home — Wylie', lauren:'Home — Wylie', bob:'Home — Wylie', abby:'McKinney' },
        cars:[
          { label:'🚗 Car 1 — DeSoto → McKinney', people:['dino','brayden'] },
          { label:'😴 Hotel — DeSoto', people:['gavin','atticus'] },
          { label:'🏠 Home — Wylie', people:['jordan','lauren','bob'] },
          { label:'📍 McKinney', people:['abby'] },
        ],
      },
      {
        id:'su02', h:9, m:25,
        name:"Jordan, Lauren & Bob Leave Wylie for DeSoto", emoji:'🚗',
        tags:['travel'], people:['jordan','lauren','bob'],
        notes:"Car 2 heads to the DeSoto hotel to collect Gavin & Atticus.",
        where:{ jordan:'Wylie → DeSoto', lauren:'Wylie → DeSoto', bob:'Wylie → DeSoto', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto', dino:'McKinney', brayden:'McKinney', abby:'McKinney' },
        cars:[
          { label:'🚗 Car 2 — Wylie → DeSoto', people:['jordan','lauren','bob'] },
          { label:'📍 Ready at Hotel', people:['gavin','atticus'] },
          { label:'🚗 Car 1 — McKinney', people:['dino','brayden','abby'] },
        ],
      },
      {
        id:'su03', h:9, m:45,
        name:"Car 1 Departs McKinney for Six Flags", emoji:'🎢',
        tags:['travel'], people:['dino','brayden','abby'],
        notes:"Abby is on board! ~50 min drive southwest to Arlington. Arrive ~10:35.",
        where:{ dino:'McKinney → Arlington', brayden:'McKinney → Arlington', abby:'McKinney → Arlington', gavin:'En route w/ Car 2', atticus:'En route w/ Car 2', jordan:'Wylie → DeSoto', lauren:'Wylie → DeSoto', bob:'Wylie → DeSoto' },
        cars:[
          { label:'🚗 Car 1 — McKinney → Six Flags', people:['dino','brayden','abby'] },
          { label:'🚗 Car 2 — Wylie → DeSoto → Six Flags', people:['jordan','lauren','bob','gavin','atticus'] },
        ],
      },
      {
        id:'su04', h:10, m:15,
        name:"Car 2 Picks Up Gavin & Atticus at Hotel", emoji:'🚗',
        tags:['travel'], people:['jordan','lauren','bob','gavin','atticus'],
        loc:'hotel',
        notes:"Car 2 swings through DeSoto. 5-person crew loaded — straight shot to Six Flags (~25 min).",
        where:{ jordan:'Hotel — DeSoto', lauren:'Hotel — DeSoto', bob:'Hotel — DeSoto', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto', dino:'I-30 West → Arlington', brayden:'I-30 West', abby:'I-30 West' },
        cars:[
          { label:'🚗 Car 2 Loading — DeSoto', people:['jordan','lauren','bob','gavin','atticus'] },
          { label:'🚗 Car 1 — En Route', people:['dino','brayden','abby'] },
        ],
      },
      {
        id:'su05', h:10, m:35,
        name:"Car 1 Arrives — Save Spots for Car 2", emoji:'🅿️',
        tags:['event'], people:['dino','brayden','abby'],
        loc:'sixflags',
        notes:"Dino, Brayden & Abby arrive first. Save adjacent spots — Car 2 is 5 minutes behind.",
        where:{ dino:'Six Flags Parking', brayden:'Six Flags Parking', abby:'Six Flags Parking', jordan:'DeSoto → Arlington', lauren:'DeSoto → Arlington', bob:'DeSoto → Arlington', gavin:'DeSoto → Arlington', atticus:'DeSoto → Arlington' },
      },
      {
        id:'su06', h:10, m:40,
        name:"Car 2 Arrives — Full Squad Together! 🎉", emoji:'🎉',
        tags:['event'], people:['jordan','lauren','bob','gavin','atticus'],
        loc:'sixflags',
        notes:"All 8 in the parking lot! Gates open in 20 minutes — get hyped.",
        where:{ dino:'Six Flags Parking', brayden:'Six Flags Parking', abby:'Six Flags Parking', gavin:'Six Flags Parking', atticus:'Six Flags Parking', jordan:'Six Flags Parking', lauren:'Six Flags Parking', bob:'Six Flags Parking' },
      },
      {
        id:'su07', h:11, m:0,
        name:"🎢 Gates Open — Six Flags Over Texas", emoji:'🎢',
        tags:['event'], people:['dino','brayden','gavin','atticus','abby','jordan','lauren','bob'],
        loc:'sixflags',
        notes:"IT'S TIME. All 8 Nerd Herd members storm Six Flags Over Texas. Coasters, food, chaos, and memories.",
        where:{ dino:'Six Flags — Arlington', brayden:'Six Flags', gavin:'Six Flags', atticus:'Six Flags', abby:'Six Flags', jordan:'Six Flags', lauren:'Six Flags', bob:'Six Flags' },
      },
    ],
  },

  // ── MONDAY: THE RETURN ──────────────────────────────────────────
  {
    id:3, label:'Monday', subtitle:'The Return',
    emoji:'🏠', date:'2026-04-20',
    events:[
      {
        id:'m01', h:9, m:15,
        name:"Bob Leaves Wylie for Breakfast", emoji:'🚗',
        tags:['travel'], people:['bob'],
        notes:"Bob heads to meet the DeSoto crew for one last group breakfast.",
        where:{ bob:'Wylie → DeSoto', dino:'Hotel — DeSoto', brayden:'Hotel — DeSoto', gavin:'Hotel — DeSoto', atticus:'Hotel — DeSoto' },
      },
      {
        id:'m02', h:10, m:0,
        name:"🍳 Final Group Breakfast", emoji:'🍳',
        tags:['food'], people:['dino','brayden','gavin','atticus','bob'],
        loc:'hotel',
        notes:"Whataburger or Chick-fil-A — whichever D, B & G didn't get on the way to Abilene Friday. Last meal of the Nerd Herd weekend.",
        where:{ dino:'Breakfast — DeSoto', brayden:'Breakfast — DeSoto', gavin:'Breakfast — DeSoto', atticus:'Breakfast — DeSoto', bob:'Breakfast — DeSoto' },
      },
      {
        id:'m03', h:10, m:45,
        name:"Everyone Heads Home 👋", emoji:'👋',
        tags:['travel'], people:['dino','brayden','gavin','atticus','bob'],
        notes:"Atticus & Bob depart for Abilene. Dino, Brayden & Gavin head southwest to Georgetown and Austin. Safe travels, Nerd Herd!",
        where:{ dino:'DeSoto → Georgetown → Austin', brayden:'DeSoto → Georgetown', gavin:'DeSoto → Georgetown', atticus:'DeSoto → Abilene', bob:'Wylie → Denton' },
        cars:[
          { label:'🚗 Car 1 — DeSoto → Georgetown → Austin', people:['dino','brayden','gavin'] },
          { label:'🚗 Car 2 — DeSoto → Abilene → Denton', people:['atticus','bob'] },
        ],
      },
      {
        id:'m04', h:13, m:15,
        name:"Dino Drops Brayden & Gavin in Georgetown", emoji:'🏘️',
        tags:['travel'], people:['dino','brayden','gavin'],
        loc:'gavin',
        notes:"Back where the weekend started. Brayden and Gavin are home.",
        where:{ dino:"Gavin's — Georgetown", brayden:"Gavin's — Georgetown", gavin:'Home — Georgetown' },
      },
      {
        id:'m05', h:13, m:30,
        name:"Bob Drops Atticus in Abilene", emoji:'🤠',
        tags:['travel'], people:['atticus','bob'],
        loc:'acu',
        notes:"Atticus is home. Bob still has ~2 hours to Denton.",
        where:{ atticus:'Home — Abilene', bob:'Abilene → Denton' },
      },
      {
        id:'m06', h:13, m:35,
        name:"Bob Heads Back to Denton", emoji:'🚗',
        tags:['travel'], people:['bob'],
        notes:"Bob departs Abilene, ~2.5 hrs to Denton.",
        where:{ bob:'Abilene → Denton' },
      },
      {
        id:'m07', h:13, m:50,
        name:"Dino Arrives Home in Austin 🎉", emoji:'🏠',
        tags:['travel'], people:['dino'],
        loc:'austin',
        notes:"Dino makes it back to Austin. Trip complete. What a weekend.",
        where:{ dino:'Home — Austin' },
      },
      {
        id:'m08', h:16, m:20,
        name:"Bob Arrives Home in Denton", emoji:'🏠',
        tags:['travel'], people:['bob'],
        loc:'denton',
        notes:"Bob completes the final leg. Everyone is home. Nerd Herd weekend: complete.",
        where:{ bob:'Home — Denton' },
      },
    ],
  },
];

// ── STATE ─────────────────────────────────────────────────────────
let activeDayIndex = 0;
let activeView = 'timeline';
let tickTimer = null;

// ── TIME UTILS ────────────────────────────────────────────────────
function now() { return new Date(); }

function eventDate(dayData, event) {
  return cdt(dayData.date, event.h, event.m);
}

function fmtTime(h, m) {
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2,'0')} ${ampm}`;
}

function fmtCountdown(ms) {
  if (ms <= 0) return 'Now';
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0)  return `in ${h}h ${m}m`;
  if (m > 0)  return `in ${m}m ${sec}s`;
  return `in ${sec}s`;
}

function fmtDuration(ms) {
  if (ms <= 0) return '';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (parts.length === 0) parts.push(`${sec}s`);
  return parts.join(' ');
}

function todayDayIndex() {
  const n = now();
  for (let i = 0; i < DAYS.length; i++) {
    const d = cdt(DAYS[i].date, 0, 0);
    if (n.getFullYear() === d.getFullYear() &&
        n.getMonth()    === d.getMonth()    &&
        n.getDate()     === d.getDate()) return i;
  }
  if (n < cdt(DAYS[0].date, 0, 0)) return 0;
  return DAYS.length - 1;
}

function getEventStatus(dayData, event, evIdx) {
  const n = now();
  const evTime = eventDate(dayData, event);
  const nextEvTime = evIdx < dayData.events.length - 1
    ? eventDate(dayData, dayData.events[evIdx + 1])
    : new Date(evTime.getTime() + 4 * 3600 * 1000);
  if (n >= evTime && n < nextEvTime) return 'active';
  if (n >= nextEvTime) return 'past';
  return 'future';
}

function getCurrentAndNext() {
  const n = now();
  const todayIdx = todayDayIndex();
  const dayData = DAYS[todayIdx];
  let current = null, next = null;

  for (let i = 0; i < dayData.events.length; i++) {
    const ev = dayData.events[i];
    const status = getEventStatus(dayData, ev, i);
    if (status === 'active' && !current) {
      current = { event: ev, day: dayData };
    } else if (status === 'future' && !next) {
      next = { event: ev, day: dayData };
    }
  }
  // If no active yet, use last past as current
  if (!current) {
    for (let i = dayData.events.length - 1; i >= 0; i--) {
      const s = getEventStatus(dayData, dayData.events[i], i);
      if (s === 'past') { current = { event: dayData.events[i], day: dayData }; break; }
    }
  }
  // If no next on today, peek at tomorrow
  if (!next && todayIdx < DAYS.length - 1) {
    const nd = DAYS[todayIdx + 1];
    if (nd.events.length > 0) next = { event: nd.events[0], day: nd };
  }
  return { current, next };
}

// ── AVATAR HELPERS ────────────────────────────────────────────────
function avatarEl(key, size = 'sm') {
  const p = PEOPLE[key];
  if (!p) return '';
  // Ensure text is readable on light colors
  const lightColors = ['#FFC0CB','#FE9FD3','#f0a500','#FFD700'];
  const textColor = lightColors.some(c => p.color.toLowerCase() === c.toLowerCase()) ? '#1a1a24' : '#ffffff';
  return `<span class="avatar avatar-${size}" style="background:${p.color};color:${textColor}" title="${p.name}">${p.initials}</span>`;
}

function personPill(key) {
  const p = PEOPLE[key];
  if (!p) return '';
  return `<span class="person-pill">${avatarEl(key,'sm')}${p.name}</span>`;
}

function personChip(key) {
  return `<span class="person-chip">${avatarEl(key,'sm')}</span>`;
}

// ── MAPS ─────────────────────────────────────────────────────────
function mapsUrl(addr) {
  const enc = encodeURIComponent(addr);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isIOS ? `maps://maps.apple.com/?q=${enc}` : `https://maps.google.com/?q=${enc}`;
}
window.openMaps = function(addr, e) {
  if (e) e.stopPropagation();
  window.open(mapsUrl(addr), '_blank');
};


// ── NOW / NEXT HERO ───────────────────────────────────────────────
function updateNowNext() {
  const { current, next } = getCurrentAndNext();
  const n = now();

  // NOW block
  const nowTitle = document.getElementById('hero-now-title');
  const nowMeta  = document.getElementById('hero-now-meta');
  const nowPpl   = document.getElementById('hero-now-people');

  if (current) {
    nowTitle.textContent = `${current.event.emoji || ''} ${current.event.name}`;
    nowMeta.textContent  = `${fmtTime(current.event.h, current.event.m)} · ${current.day.label}`;
    nowPpl.innerHTML = (current.event.people || []).map(personChip).join('');
  } else {
    nowTitle.textContent = 'Trip is on its way!';
    nowMeta.textContent  = 'Schedule starts Friday 7:00 AM';
    nowPpl.innerHTML = '';
  }

  // NEXT block
  const nextTitle     = document.getElementById('hero-next-title');
  const nextMeta      = document.getElementById('hero-next-meta');
  const nextCountdown = document.getElementById('hero-next-countdown');

  if (next) {
    nextTitle.textContent     = `${next.event.emoji || ''} ${next.event.name}`;
    nextMeta.textContent      = `${fmtTime(next.event.h, next.event.m)} · ${next.day.label}`;
    const diff = eventDate(next.day, next.event) - n;
    nextCountdown.textContent = diff > 0 ? fmtCountdown(diff) : 'Starting now!';
  } else {
    nextTitle.textContent     = 'Trip complete! 🎉';
    nextMeta.textContent      = 'See you next time, Nerd Herd';
    nextCountdown.textContent = '';
  }
}

// ── TIMELINE ─────────────────────────────────────────────────────
function renderTimeline(dayIdx) {
  const dayData = DAYS[dayIdx];
  const list    = document.getElementById('timeline-list');

  // Update header labels
  document.getElementById('timeline-day-label').textContent    = dayData.label;
  document.getElementById('timeline-day-subtitle').textContent = dayData.subtitle;
  document.getElementById('header-day-pill').textContent       = dayData.label;
  document.body.setAttribute('data-day', dayIdx);

  // Update tab accent pip color via CSS var transition (handled by data-day)
  list.innerHTML = '';

  dayData.events.forEach((ev, i) => {
    const status = getEventStatus(dayData, ev, i);
    const loc    = ev.loc ? LOC[ev.loc] : null;

    const row = document.createElement('div');
    row.className = 'tl-event';
    row.style.animationDelay = `${i * 0.035}s`;

    // Dot
    const dotCol = document.createElement('div');
    dotCol.className = 'tl-dot-col';
    const dot = document.createElement('div');
    dot.className = `tl-dot status-${status}`;
    dotCol.appendChild(dot);

    // Card
    const card = document.createElement('div');
    card.className = `tl-card status-${status}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const activeBadge = status === 'active'
      ? `<span class="tl-active-badge">● Now</span>` : '';

    const tagsHtml = (ev.tags || []).map(t =>
      `<span class="tl-tag tag-${t}">${t}</span>`
    ).join('');

    const peopleHtml = (ev.people || []).map(personChip).join('');

    const locHtml = loc
      ? `<div class="tl-location" onclick="openMaps('${loc.addr}', event)">
          📍 <span>${loc.name}</span>
         </div>` : '';

    card.innerHTML = `
      <div class="tl-top">
        <span class="tl-time">${fmtTime(ev.h, ev.m)}</span>
        <span class="tl-name">${ev.emoji || ''} ${ev.name}</span>
        ${activeBadge}
      </div>
      ${tagsHtml ? `<div class="tl-tags">${tagsHtml}</div>` : ''}
      ${ev.notes ? `<div class="tl-notes">${ev.notes}</div>` : ''}
      ${peopleHtml ? `<div class="tl-people">${peopleHtml}</div>` : ''}
      ${locHtml}
    `;

    card.addEventListener('click',  () => openSheet(ev, dayData));
    card.addEventListener('keydown', e => { if(e.key==='Enter') openSheet(ev, dayData); });

    row.appendChild(dotCol);
    row.appendChild(card);
    list.appendChild(row);
  });
}

// Silent update — only refresh status dots & badges without rebuilding DOM
function silentUpdateTimeline() {
  const dayData = DAYS[activeDayIndex];
  const cards   = document.querySelectorAll('#timeline-list .tl-card');
  const dots    = document.querySelectorAll('#timeline-list .tl-dot');

  dayData.events.forEach((ev, i) => {
    const status = getEventStatus(dayData, ev, i);
    if (cards[i]) {
      cards[i].className = `tl-card status-${status}`;
      const badge = cards[i].querySelector('.tl-active-badge');
      if (status === 'active' && !badge) {
        const span = document.createElement('span');
        span.className = 'tl-active-badge';
        span.textContent = '● Now';
        const top = cards[i].querySelector('.tl-top');
        if (top) top.appendChild(span);
      } else if (status !== 'active' && badge) {
        badge.remove();
      }
    }
    if (dots[i]) dots[i].className = `tl-dot status-${status}`;
  });
}

// ── PEOPLE VIEW ───────────────────────────────────────────────────
function renderPeopleView() {
  const list = document.getElementById('people-list');
  const { current } = getCurrentAndNext();
  const where = current?.event?.where || {};

  list.innerHTML = '';
  Object.entries(PEOPLE).forEach(([key, p], i) => {
    const loc = where[key] || '—';
    const card = document.createElement('div');
    card.className = 'person-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      ${avatarEl(key, 'lg')}
      <div class="person-card-info">
        <div class="person-card-name">${p.name}</div>
        <div class="person-card-where">📍 ${loc}</div>
      </div>
    `;
    list.appendChild(card);
  });
}

// ── DETAIL SHEET ──────────────────────────────────────────────────
function openSheet(ev, dayData) {
  const overlay = document.getElementById('sheet-overlay');
  const content = document.getElementById('sheet-content');
  const loc = ev.loc ? LOC[ev.loc] : null;

  let carsHtml = '';
  if (ev.cars && ev.cars.length > 0) {
    carsHtml = `
      <div class="sheet-car-section">
        <div class="sheet-car-label">Car Groups / Locations</div>
        ${ev.cars.map(cg => `
          <div class="sheet-car-group">
            <div class="sheet-car-group-label">${cg.label}</div>
            <div class="sheet-car-group-people">${cg.people.map(k => personPill(k)).join('')}</div>
          </div>
        `).join('')}
      </div>`;
  }

  const peopleHtml = ev.people && ev.people.length > 0
    ? `<div class="sheet-people-label">Who's involved</div>
       <div class="sheet-people-row">${ev.people.map(k => personPill(k)).join('')}</div>`
    : '';

  content.innerHTML = `
    <div class="sheet-eyebrow">${dayData.label} · ${fmtTime(ev.h, ev.m)}</div>
    <div class="sheet-title">${ev.emoji || ''} ${ev.name}</div>
    <div class="sheet-time">${(ev.tags||[]).join(' · ')}</div>
    ${ev.notes ? `<div class="sheet-notes">${ev.notes}</div>` : ''}
    ${peopleHtml}
    ${carsHtml}
    ${loc ? `<button class="sheet-map-btn" onclick="openMaps('${loc.addr}')">🗺️ Open in Maps — ${loc.name}</button>` : ''}
    <button class="sheet-close-btn" onclick="closeSheet()">Close</button>
  `;

  overlay.classList.add('open');
}

window.closeSheet = function() {
  document.getElementById('sheet-overlay').classList.remove('open');
};

// ── VIEW SWITCHING ────────────────────────────────────────────────
window.switchView = function(view) {
  activeView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.bnav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === view);
  });

  const target = document.getElementById(`view-${view}`);
  if (target) target.classList.add('active');

  if (view === 'people') renderPeopleView();
};

// ── DAY SWITCHING ─────────────────────────────────────────────────
function switchDay(idx) {
  activeDayIndex = idx;
  document.querySelectorAll('.day-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  renderTimeline(idx);
}

// ── SILENT TICK ───────────────────────────────────────────────────
function tick() {
  // Live app: silent updates only
  updateNowNext();
  silentUpdateTimeline();
  if (activeView === 'people') renderPeopleView();
}

  // Live app: silent updates only — no DOM rebuild, no scroll jump
  updateNowNext();
  silentUpdateTimeline();
  if (activeView === 'people') renderPeopleView();
}


function bootLiveApp() {
  appState = 'live';
  // Clear pre-trip screen
  const pts = document.getElementById('pre-trip-screen');
  if (pts && !pts.classList.contains('hidden')) pts.classList.add('hidden');

  const app = document.getElementById('app');
  app.classList.remove('hidden');

  // Set current day
  const liveDay = todayDayIndex();
  activeDayIndex = liveDay;

  // Render tabs active state
  document.querySelectorAll('.day-tab').forEach((t, i) => t.classList.toggle('active', i === liveDay));

  // First render
  updateNowNext();
  renderTimeline(liveDay);

  // Start silent background tick
  if (!tickTimer) tickTimer = setInterval(tick, 10000);
}

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Tab listeners
  document.querySelectorAll('.day-tab').forEach((btn, i) => {
    btn.addEventListener('click', () => switchDay(i));
  });

  // Splash → straight to live app (no pre-trip countdown)
  setTimeout(() => {
    document.getElementById('splash').classList.add('out');
    setTimeout(bootLiveApp, 550);
  }, 1400);
});
