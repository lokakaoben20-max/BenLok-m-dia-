// Holy ambiance helpers, 1920x1080
const BGC='#0d1116', FG='#eef1f4', BL='#18cfec', GY='#9aa0a6'; const GRD=900;
INK=FG; PAPER='#10161d';
let _id=0;
function defs(){return `<defs>
<radialGradient id="sky" cx="50%" cy="35%" r="80%"><stop offset="0" stop-color="#16202b"/><stop offset="0.6" stop-color="#0d1116"/><stop offset="1" stop-color="#07090c"/></radialGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b23"/><stop offset="1" stop-color="#07090c"/></linearGradient>
<radialGradient id="glowB"><stop offset="0" stop-color="${BL}" stop-opacity="0.55"/><stop offset="0.45" stop-color="${BL}" stop-opacity="0.16"/><stop offset="1" stop-color="${BL}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowW"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.5" stop-color="#bff4ff" stop-opacity="0.35"/><stop offset="1" stop-color="${BL}" stop-opacity="0"/></radialGradient>
<linearGradient id="doorIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9eeeff"/></linearGradient>
<radialGradient id="shadow"><stop offset="0" stop-color="#000" stop-opacity="0.55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="dark"><stop offset="0" stop-color="#000" stop-opacity="0.7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
</defs>`;}
function scene(){let g=defs()+`<rect width="1920" height="1080" fill="url(#sky)"/><rect y="${GRD}" width="1920" height="${1080-GRD}" fill="url(#floor)"/><line x1="0" y1="${GRD}" x2="1920" y2="${GRD}" stroke="#2a3542" stroke-width="3"/>`;
 // dust particles
 let r=7;const rnd=()=>{r=(r*9301+49297)%233280;return r/233280;};
 for(let i=0;i<60;i++){const x=rnd()*1920,y=rnd()*GRD,s=rnd()*2.2+0.6;g+=`<circle cx="${x}" cy="${y}" r="${s}" fill="#cfe9f0" opacity="${0.08+rnd()*0.25}"/>`;}
 return g;}
function vignette(){return `<rect width="1920" height="1080" fill="url(#vig)"/><defs><radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.6"/></radialGradient></defs>`;}
function shadow(x,w=150){return `<ellipse cx="${x}" cy="${GRD+6}" rx="${w}" ry="18" fill="url(#shadow)"/>`;}
function doorH(x,int=1,w=190,h=400){let g='';
 g+=`<ellipse cx="${x}" cy="${GRD-h/2}" rx="${w*2.6*int}" ry="${h*1.1*int}" fill="url(#glowB)"/>`;
 g+=`<ellipse cx="${x-120}" cy="${GRD+30}" rx="${520*int}" ry="60" fill="url(#glowB)" opacity="0.8"/>`; // light spill on floor
 for(let i=0;i<11;i++){const a=-Math.PI/2+(i-5)*0.27;g+=`<line x1="${x+Math.cos(a)*w*0.72}" y1="${GRD-h/2+Math.sin(a)*h*0.6}" x2="${x+Math.cos(a)*w*(1.0+0.15*(i%2))}" y2="${GRD-h/2+Math.sin(a)*h*(0.75+0.1*(i%2))}" stroke="${BL}" stroke-width="5" stroke-linecap="round" opacity="${0.75*int}"/>`;}
 g+=`<rect x="${x-w/2}" y="${GRD-h}" width="${w}" height="${h}" rx="6" fill="url(#doorIn)"/><rect x="${x-w/2}" y="${GRD-h}" width="${w}" height="${h}" rx="6" fill="none" stroke="${FG}" stroke-width="10"/>`;
 g+=`<text x="${x}" y="${GRD-h-110}" text-anchor="middle" font-family="Inter" font-weight="800" letter-spacing="6" font-size="34" fill="${FG}">AVENIR</text>`;
 return g;}
function labH(p,t,c=FG,dy=150){return `<text x="${p[0]}" y="${p[1]-dy}" text-anchor="middle" font-family="Inter" font-weight="800" letter-spacing="3" font-size="40" fill="${c}">${t}</text>`;}
function threadH(a,b,sag=0,w=5){const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2+sag;return `<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" stroke="#c9ced4" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;}
function ringH(p){return `<ellipse cx="${p[0]}" cy="${p[1]-6}" rx="26" ry="11" fill="none" stroke="#c9ced4" stroke-width="7"/>`;}
function knotH(x){let g=`<ellipse cx="${x}" cy="${GRD-60}" rx="240" ry="160" fill="url(#dark)"/>`;
 g+=`<path d="M${x-95} ${GRD} q18 -120 95 -122 q84 0 98 122 z" fill="#2b323b" stroke="#c9ced4" stroke-width="5"/>`;
 for(let i=0;i<6;i++)g+=`<path d="M${x-75+i*12} ${GRD-20-i*14} q70 -50 ${130-i*20} ${6+i*5}" stroke="#c9ced4" stroke-width="4" fill="none" opacity=".8"/>`;
 g+=`<rect x="${x-80}" y="${GRD-210}" width="160" height="54" rx="10" fill="#1b2129" stroke="#c9ced4" stroke-width="4"/><text x="${x}" y="${GRD-173}" text-anchor="middle" font-family="Inter" font-weight="800" letter-spacing="3" font-size="30" fill="${FG}">PÉCHÉ</text>`;return g;}
function tagH(x,y,t){const w=t.length*19+34;return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+24}" stroke="#c9ced4" stroke-width="4"/><rect x="${x-w/2}" y="${y+24}" width="${w}" height="46" rx="8" fill="#1b2129" stroke="#c9ced4" stroke-width="3.5"/><text x="${x}" y="${y+56}" text-anchor="middle" font-family="Inter" font-weight="800" letter-spacing="2" font-size="24" fill="${FG}">${t}</text>`;}
function halo(p,r=260,o=1){return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="url(#glowB)" opacity="${o}"/>`;}
function sig(){return `<g opacity="0.9"><circle cx="1620" cy="1030" r="11" fill="${BL}"/><text x="1640" y="1040" font-family="JetBrains Mono" font-size="26" fill="${GY}">Holyfor<tspan fill="${FG}">christ</tspan></text></g>`;}
