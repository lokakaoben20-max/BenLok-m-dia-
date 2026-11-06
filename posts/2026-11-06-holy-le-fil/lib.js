const GR=440, S=0.52;
function lab(p,t,dy=80){return `<text x="${p[0]}" y="${p[1]-dy}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#000">${t}</text>`;}
function thread(a,b,sag=0,w=4){const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2+sag;return `<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" stroke="#000" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;}
function ring(p){return `<ellipse cx="${p[0]}" cy="${p[1]-4}" rx="16" ry="7" fill="none" stroke="#000" stroke-width="5"/>`;}
function door(x,lit=1,w=110,h=230){let g='';if(lit)for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*0.32;g+=`<line x1="${x+Math.cos(a)*(w*0.75)}" y1="${GR-h/2+Math.sin(a)*(h*0.62)}" x2="${x+Math.cos(a)*(w*1.05)}" y2="${GR-h/2+Math.sin(a)*(h*0.8)}" stroke="#000" stroke-width="4" stroke-linecap="round"/>`;}
 g+=`<rect x="${x-w/2}" y="${GR-h}" width="${w}" height="${h}" fill="#fff" stroke="#000" stroke-width="7"/><rect x="${x-w/2+14}" y="${GR-h+14}" width="${w-28}" height="${h-14}" fill="#f2f2f2"/>`;
 g+=`<text x="${x}" y="${GR-h+56}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="#000">AVENIR</text>`;return g;}
function knot(x){let g=`<path d="M${x-50} ${GR} q10 -60 50 -62 q44 0 52 62 z" fill="#000"/>`;for(let i=0;i<5;i++)g+=`<path d="M${x-40+i*8} ${GR-12-i*8} q40 -30 ${70-i*12} ${4+i*3}" stroke="#fff" stroke-width="3" fill="none"/>`;
 g+=`<rect x="${x-45}" y="${GR-112}" width="90" height="34" rx="6" fill="#fff" stroke="#000" stroke-width="4"/><text x="${x}" y="${GR-88}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20">PÉCHÉ</text>`;return g;}
function tag(x,y,t){const w=t.length*13+20;return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+16}" stroke="#000" stroke-width="3"/><rect x="${x-w/2}" y="${y+16}" width="${w}" height="30" rx="5" fill="#fff" stroke="#000" stroke-width="3.5"/><text x="${x}" y="${y+38}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="16">${t}</text>`;}
function ground(){return `<line x1="0" y1="${GR+2}" x2="920" y2="${GR+2}" stroke="#ccc" stroke-width="4"/>`;}
const PZ={
 stand:{lean:0.06,ua1:0.05,fa1:0.3,th1:0.02,sh1:0.02,th2:-0.03,sh2:0},
 walk:{lean:0.1,ua1:-0.1,fa1:0.6,ua2:0.3,fa2:0.5,th1:0.4,sh1:0.1,th2:-0.35,sh2:-0.5},
 pulled:{lean:-0.15,head:-0.1,ua1:1.2,fa1:1.4,ua2:-0.5,fa2:-0.3,th1:0.35,sh1:0.05,th2:-0.15,sh2:-0.7},
 pull:{lean:-0.35,ua1:-0.9,fa1:-0.9,ua2:-0.8,fa2:-0.8,th1:0.45,sh1:0.15,th2:-0.1,sh2:-0.1},
 run:{lean:0.35,ua1:-0.9,fa1:0.4,ua2:0.9,fa2:1.9,th1:1.1,sh1:-0.1,th2:-0.5,sh2:-1.4},
 sit:{lean:0.35,head:0.5,ua1:0.7,fa1:1.0,ua2:0.6,fa2:0.9,th1:2.0,sh1:0.35,th2:1.9,sh2:0.3},
 kneel:{lean:0.25,head:0.35,ua1:0.25,fa1:0.15,ua2:0.15,fa2:0.05,th1:0.15,sh1:-1.5,th2:0.05,sh2:-1.55},
 kneelpull:{lean:-0.1,head:0.1,ua1:0.9,fa1:1.0,ua2:0.8,fa2:0.9,th1:0.15,sh1:-1.5,th2:0.05,sh2:-1.55},
 hand:{lean:0.12,head:0.25,ua1:1.15,fa1:1.0,ua2:-0.05,fa2:0.1,th1:0.02,sh1:0.02,th2:-0.03,sh2:0},
 joy:{lean:0.05,head:-0.15,ua1:2.7,fa1:2.9,ua2:2.5,fa2:2.7,th1:0.6,sh1:-0.4,th2:-0.4,sh2:-1.2},
};
