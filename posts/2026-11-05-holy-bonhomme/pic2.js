// Pictogram figure kit (browser)
const BG='#0d1116', W='#ffffff';
function P(p,a,L,f){return [p[0]+f*Math.sin(a)*L, p[1]+Math.cos(a)*L];}
function seg(a,b,w,c){return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c||W}" stroke-width="${w}" stroke-linecap="round"/>`;}
// pose: {t:torso lean, h:head offset angle, ua1,fa1 (front arm), ua2,fa2 (back arm), th1,sh1, th2,sh2}
function fig(x,y,po,o={}){
  const f=o.f||1,s=o.s||1,c=o.c||W, R=o.robe;
  const Lt=190*s,Lu=112*s,Lf=104*s,Lth=140*s,Lsh=136*s,wt=94*s,wl=62*s,hr=62*s;
  const hip=[x,y], sh=P(hip,Math.PI-po.t,Lt,f); // up
  const neck=P(hip,Math.PI-po.t,Lt+ (hr+42*s),f);
  const head=P(sh,Math.PI-(po.t+(po.h||0)),hr+44*s,f);
  const k1=P(hip,po.th1,Lth,f), a1=P(k1,po.sh1,Lsh,f);
  const k2=P(hip,po.th2,Lth,f), a2=P(k2,po.sh2,Lsh,f);
  const e1=P(sh,po.ua1,Lu,f), w1=P(e1,po.fa1,Lf,f);
  const e2=P(sh,po.ua2,Lu,f), w2=P(e2,po.fa2,Lf,f);
  let g='';
  if(R){ // robe + hair (Jesus)
    const bw=150*s, top=[sh[0],sh[1]+10*s];
    const by=y+Lth+Lsh-6*s;
    g+=`<path d="M${top[0]-52*s},${top[1]} L${top[0]+52*s},${top[1]} L${x+bw*0.62},${by} Q${x},${by+18*s} ${x-bw*0.62},${by} Z" fill="${c}" stroke="${c}" stroke-width="${30*s}" stroke-linejoin="round"/>`;
    g+=seg(e2,w2,wl*0.9,c)+seg(sh,e2,wl,c);
    // hair behind head
    g+=`<ellipse cx="${head[0]-f*hr*0.38}" cy="${head[1]+hr*0.55}" rx="${hr*0.78}" ry="${hr*1.2}" fill="${c}"/>`;
    g+=`<circle cx="${head[0]}" cy="${head[1]}" r="${hr}" fill="${c}"/>`;
    g+=seg(sh,e1,wl+16*s,BG)+seg(e1,w1,wl*0.9+16*s,BG); // separation line
    g+=seg(sh,e1,wl,c)+seg(e1,w1,wl*0.9,c);
    return {svg:g,hip,sh,head,w1,w2};
  }
  const ft=(a,kk)=>seg([a[0],a[1]+6*s],[a[0]+f*30*s,a[1]+10*s],wl*0.78,c);
  g+=seg(hip,k2,wl,c)+seg(k2,a2,wl,c)+ft(a2)+seg(sh,e2,wl,c)+seg(e2,w2,wl,c);
  g+=seg(hip,sh,wt,c);
  g+=seg(hip,k1,wl,c)+seg(k1,a1,wl,c)+ft(a1);
  g+=`<circle cx="${head[0].toFixed(1)}" cy="${head[1].toFixed(1)}" r="${hr}" fill="${c}"/>`;
  g+=seg(sh,e1,wl+10*s,BG)+seg(e1,w1,wl+10*s,BG)+seg(sh,e1,wl,c)+seg(e1,w1,wl,c);
  return {svg:g,hip,sh,head,w1,w2};
}
function battery(x,y,lvl,col,o={}){ // x,y top-left; horizontal battery
  const w=o.w||150,h=o.h||78,sw=12;
  const v=o.vert;
  let g=`<g transform="translate(${x},${y}) ${o.rot?`rotate(${o.rot} ${w/2} ${h/2})`:''}">`;
  g+=`<rect x="0" y="0" width="${w}" height="${h}" rx="${h*0.24}" fill="none" stroke="${o.stroke||W}" stroke-width="${sw}"/>`;
  g+=`<rect x="${w+4}" y="${h*0.3}" width="${14}" height="${h*0.4}" rx="5" fill="${o.stroke||W}"/>`;
  const iw=(w-sw*2-12)*Math.max(0.0,Math.min(1,lvl));
  g+=`<rect x="${sw+6}" y="${sw+6}" width="${iw}" height="${h-sw*2-12}" rx="${h*0.1}" fill="${col}"/>`;
  if(o.bolt) g+=`<path transform="translate(${w/2-18},${h/2-28}) scale(${h/78})" d="M22 0 L4 32 L18 32 L12 56 L34 20 L20 20 L28 0 Z" fill="${W}" stroke="${BG}" stroke-width="5" stroke-linejoin="round"/>`;
  if(o.heart) g+=`<path transform="translate(${w/2-22},${h/2-19}) scale(${h/78})" d="M22 38 C-8 18 4 -6 22 8 C40 -6 52 18 22 38 Z" fill="${W}"/>`;
  return g+'</g>';
}
function lerp(a,b,t){return a+(b-a)*t;}
function lp(A,B,t){const o={};for(const k in A)o[k]=lerp(A[k],B[k]??A[k],t);return o;}
function ease(t){t=Math.max(0,Math.min(1,t));return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
