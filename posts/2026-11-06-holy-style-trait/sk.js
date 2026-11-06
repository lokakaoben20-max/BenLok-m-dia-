const L='#f2f2ef', BG='#0d1116', BLUE='#18cfec';
function P(a,ang,len){return [a[0]+Math.sin(ang)*len,a[1]+Math.cos(ang)*len];}
function pl(pts,w=5,c=L){return `<polyline points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;}
function hand(p,ang,f,pt){if(pt){const q=P(p,ang,10),t=P(p,ang,40);return `<ellipse cx="${q[0]}" cy="${q[1]}" rx="10" ry="13" transform="rotate(${-ang*57.3} ${q[0]} ${q[1]})" fill="${BG}" stroke="${L}" stroke-width="4.5"/>`+pl([P(p,ang,18),t],5);}const q=P(p,ang,14);return `<ellipse cx="${q[0]}" cy="${q[1]}" rx="11" ry="15" transform="rotate(${-ang*57.3} ${q[0]} ${q[1]})" fill="${BG}" stroke="${L}" stroke-width="4.5"/>`;}
function foot(p,f){return `<path d="M${p[0]-6*f} ${p[1]} q${28*f} -16 ${44*f} 4 q${-18*f} 10 ${-44*f} 0" fill="${BG}" stroke="${L}" stroke-width="4.5" stroke-linejoin="round" transform="translate(0,4)"/>`;}
function face(hx,hy,r,ex,f,look=0){let g='';const lx=look*10;
 const ey=hy-r*0.12, e1=hx+f*r*0.0+lx, e2=hx+f*r*0.42+lx;
 const eye=(x,s=1)=>`<ellipse cx="${x}" cy="${ey}" rx="${10*s}" ry="${14*s}" fill="${L}"/><circle cx="${x+f*2+lx*0.2}" cy="${ey+2}" r="${5.5*s}" fill="${BG}"/>`;
 if(ex=='happy'){g+=eye(e1)+eye(e2);g+=`<path d="M${hx-f*r*0.25+lx} ${hy+r*0.18} Q${hx+f*r*0.2+lx} ${hy+r*0.75} ${hx+f*r*0.7+lx} ${hy+r*0.12} Z" fill="${L}" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>`;
   for(let i=1;i<5;i++){const x=hx-f*r*0.25+lx+f*r*0.95*i/5;g+=`<line x1="${x}" y1="${hy+r*0.2}" x2="${x}" y2="${hy+r*0.42}" stroke="${BG}" stroke-width="3"/>`;}
   g+=`<line x1="${hx-f*r*0.28+lx}" y1="${hy+r*0.27}" x2="${hx+f*r*0.66+lx}" y2="${hy+r*0.27}" stroke="${BG}" stroke-width="3"/>`;}
 if(ex=='smile'){g+=eye(e1)+eye(e2);g+=`<path d="M${hx-f*r*0.12+lx} ${hy+r*0.28} Q${hx+f*r*0.22+lx} ${hy+r*0.55} ${hx+f*r*0.55+lx} ${hy+r*0.22}" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`;}
 if(ex=='sad'){g+=eye(e1,0.9)+eye(e2,0.9);g+=`<path d="M${e1-f*8} ${ey-22} L${e1+f*10} ${ey-30}" stroke="${L}" stroke-width="4.5" stroke-linecap="round"/><path d="M${e2+f*8} ${ey-22} L${e2-f*8} ${ey-30}" stroke="${L}" stroke-width="4.5" stroke-linecap="round"/>`;
   g+=`<path d="M${hx-f*r*0.05+lx} ${hy+r*0.48} Q${hx+f*r*0.25+lx} ${hy+r*0.3} ${hx+f*r*0.55+lx} ${hy+r*0.45}" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`;}
 if(ex=='wow'){g+=eye(e1,1.15)+eye(e2,1.15);g+=`<ellipse cx="${hx+f*r*0.25+lx}" cy="${hy+r*0.45}" rx="15" ry="21" fill="none" stroke="${L}" stroke-width="5"/>`;}
 if(ex=='calm'){g+=`<path d="M${e1-8} ${ey} q8 6 16 0 M${e2-8} ${ey} q8 6 16 0" fill="none" stroke="${L}" stroke-width="4.5" stroke-linecap="round"/>`;g+=`<path d="M${hx-f*r*0.05+lx} ${hy+r*0.3} Q${hx+f*r*0.22+lx} ${hy+r*0.5} ${hx+f*r*0.5+lx} ${hy+r*0.28}" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`;}
 return g;}
// po: angles from straight down (+ = forward); lean = torso lean
function sk(x,y,po,o={}){const f=o.f||1,s=o.s||1,r=76*s;
 const A=(v)=>v*f; // mirror
 const hip=[x,y-250*s], neck=P(hip,Math.PI-A(po.t||0),210*s);
 const hc=P(neck,Math.PI-A((po.t||0)+(po.h||0)),r-2*s);
 let g='';
 const leg=(th,sh)=>{const k=P(hip,A(th),125*s),a=P(k,A(sh),125*s);return [k,a];};
 const arm=(u,fa)=>{const sh=P(neck,Math.PI-A(po.t||0),-22*s);const e=P(sh,A(u),95*s),w=P(e,A(fa),90*s);return [sh,e,w];};
 const [k1,a1]=leg(po.th1||0.08,po.sh1||0.02),[k2,a2]=leg(po.th2||-0.08,po.sh2||-0.02);
 const [s1,e1,w1]=arm(po.ua1??0.12,po.fa1??0.08),[s2,e2,w2]=arm(po.ua2??-0.1,po.fa2??-0.05);
 if(o.robe){ // Jesus: simple robe outline
   const bt=y-8*s; g+=`<path d="M${neck[0]-12*s} ${neck[1]} Q${neck[0]-46*s} ${neck[1]+6*s} ${neck[0]-50*s} ${neck[1]+40*s} L${x-74*s} ${bt} Q${x} ${bt+12*s} ${x+74*s} ${bt} L${neck[0]+50*s} ${neck[1]+40*s} Q${neck[0]+46*s} ${neck[1]+6*s} ${neck[0]+12*s} ${neck[1]} Z" fill="${BG}" stroke="${L}" stroke-width="5" stroke-linejoin="round"/>`;
   g+=pl([[x-22*s,bt+2],[x-24*s,y]])+foot([x-24*s,y],f)+pl([[x+22*s,bt+2],[x+24*s,y]])+foot([x+24*s,y],f);
 } else {
   g+=pl([hip,k2,a2])+foot(a2,f)+pl([hip,k1,a1])+foot(a1,f);
   g+=pl([hip,neck]);
 }
 g+=pl([s2,e2,w2])+hand(w2,A(po.fa2??-0.05),f);
 // head
 if(o.glow){g+=`<defs><radialGradient id="hg"><stop offset="0.55" stop-color="${BLUE}" stop-opacity=".45"/><stop offset="1" stop-color="${BLUE}" stop-opacity="0"/></radialGradient></defs><circle cx="${hc[0]}" cy="${hc[1]}" r="${r*1.9}" fill="url(#hg)"/>`;}
 if(0){g+=`<path d="M${hc[0]-f*r*0.2} ${hc[1]-r*0.98} Q${hc[0]-f*r*1.35} ${hc[1]-r*0.7} ${hc[0]-f*r*1.05} ${hc[1]+r*1.25} L${hc[0]-f*r*0.35} ${hc[1]+r*0.85}" fill="${BG}" stroke="${L}" stroke-width="5" stroke-linejoin="round"/>`;}
 g+=`<circle cx="${hc[0]}" cy="${hc[1]}" r="${r}" fill="${BG}" stroke="${L}" stroke-width="5"/>`;
 if(o.tuft)g+=pl([[hc[0]-8,hc[1]-r+2],[hc[0]-14,hc[1]-r-16]],4)+pl([[hc[0]+4,hc[1]-r+1],[hc[0]+4,hc[1]-r-18]],4)+pl([[hc[0]+14,hc[1]-r+3],[hc[0]+22,hc[1]-r-14]],4);
 if(0)g+=`<path d="M${hc[0]-f*r*0.95} ${hc[1]-r*0.25} Q${hc[0]-f*r*0.1} ${hc[1]-r*1.25} ${hc[0]+f*r*0.85} ${hc[1]-r*0.45}" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`;
 g+=face(hc[0],hc[1],r,po.ex||'smile',f,po.look||0);
 g+=pl([s1,e1,w1])+hand(w1,A(po.fa1??0.08),f,po.pt);
 return {svg:g,hc,w1,w2,neck,hip};}
