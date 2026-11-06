// Pictogram kit measured from reference sheet (head D=100 units)
let INK='#000', PAPER='#fff';
function R(p,a){const c=Math.cos(a),s=Math.sin(a);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];}
function V(a,len){return [Math.sin(a)*len,Math.cos(a)*len];} // angle from down, + forward
function add(a,b){return [a[0]+b[0],a[1]+b[1]];}
function smooth(P){const n=P.length;let d=`M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}return d+'Z';}
function L(a,b,w,c){return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;}
function limb(p,w,sep){let g='';if(sep)for(let i=0;i<p.length-1;i++)g+=L(p[i],p[i+1],w+11,PAPER);for(let i=0;i<p.length-1;i++)g+=L(p[i],p[i+1],w,INK);return g;}
// pose: lean (torso, rad, + forward), head (extra tilt), arms ua/fa, legs th/sh (angles from down, + forward)
function man(x,y,po,o={}){const s=o.s||1,f=o.f||1;
 const TH=112,SH=122,WL=50,WA=38,UA=92,FA=88,HR=54;
 const lean=po.lean||0;
 // legs determine hip height
 const leg=(th,sh)=>{const k=V(th,TH),a=add(k,V(sh,SH));return [[0,0],k,a];};
 const l1=leg(po.th1??0.04,po.sh1??0), l2=leg(po.th2??-0.04,po.sh2??0);
 const low=Math.max(l1[2][1],l2[2][1]);
 // torso outline in local coords (hip at 0,0, up = -y), then rotate by lean
 const T=[[32,0],[40,-70],[44,-130],[34,-180],[8,-200],[-24,-194],[-46,-160],[-56,-100],[-50,-40],[-34,0]];
 const rot=p=>R(p,lean);
 const tor=T.map(rot);
 const path=smooth(tor);
 const shJ=rot([6,-168]);
 const neck=rot([10,-200]);
 const hc=add(neck,V(Math.PI-(lean+(po.head||0))*1-0.0,0)); 
 const hpos=add(rot([20,-266]), V(0,0));
 const hpos2=po.head?add(rot([10,-205]),V(Math.PI-(lean+po.head),62)):hpos;
 const arm=(u,fa)=>{const e=add(shJ,V(u,UA)),w=add(e,V(fa,FA));return [shJ,e,w];};
 const a1=arm(po.ua1??0.06,po.fa1??0.22), a2=arm(po.ua2??-0.05,po.fa2??0.1);
 let g='';
 g+=limb(a2,WA,0)+limb(l2,WL,0);
 g+=limb(l1,WL,0);
 g+=`<path d="${path}" fill="${INK}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>`;
 g+=L([0,-6],rot([0,-30]),WL*1.6,INK); // hip mass joining legs
 if(o.beard){const [bx,by]=hpos2;const a=lean+(po.head||0);const rp=p=>{const q=R(p,a);return [bx+q[0],by+q[1]];};
   const B=[[-6,46],[22,44],[44,30],[54,18],[60,44],[54,70],[44,98],[30,80],[10,62]].map(rp);
   const d=smooth(B);
   g+=`<path d="${d}" fill="${INK}" stroke="${PAPER}" stroke-width="8" stroke-linejoin="round"/>`;}
 g+=`<circle cx="${hpos2[0]}" cy="${hpos2[1]}" r="${HR}" fill="${INK}"/>`;
 if(o.beard){const [bx,by]=hpos2;const a=lean+(po.head||0);const rp=p=>{const q=R(p,a);return [bx+q[0],by+q[1]];};
   const B=[[-6,46],[22,44],[44,30],[54,18],[60,44],[54,70],[44,98],[30,80],[10,62]].map(rp);g+=`<path d="${smooth(B)}" fill="${INK}"/>`;}
 g+=limb(a1,WA,1);
 const ty=y-low*s;
 return {svg:`<g transform="translate(${x},${ty}) scale(${f*s},${s})">${g}</g>`};
}
// Jesus, front view, outline style (white robe, black outlines, black hair/beard)
function jesus(x,y,po={},o={}){const s=o.s||1;const SW=7;
 const H=0,ny=-300; // neck y (feet at 0)
 let g='';
 const sideArm=(side,u,fa)=>{const sh=[side*54,ny+26];const e=add(sh,[side*Math.sin(u)*70,Math.cos(u)*70]);const w=add(e,[side*Math.sin(fa)*58,Math.cos(fa)*58]);return [sh,e,w];};
 const arms=[sideArm(-1,po.ua2??0.2,po.fa2??0.1),sideArm(1,po.ua1??0.2,po.fa1??0.1)];
 const drawArm=a=>L(a[0],a[1],44+SW*2,INK)+L(a[1],a[2],40+SW*2,INK)+L(a[0],a[1],44,PAPER)+L(a[1],a[2],40,PAPER)+`<circle cx="${a[2][0]}" cy="${a[2][1]}" r="13" fill="${INK}"/>`;
 // feet
 g+=`<ellipse cx="-26" cy="-6" rx="22" ry="12" fill="${INK}"/><ellipse cx="26" cy="-6" rx="22" ry="12" fill="${INK}"/>`;
 // robe
 const robe=`M-40 ${ny} Q-78 ${ny+4} -84 ${ny+50} L-92 -14 Q0 -4 92 -14 L84 ${ny+50} Q78 ${ny+4} 40 ${ny} Z`;
 g+=arms.map(a=>a[1][1]<ny+60?'':'').join('');
 g+=`<path d="${robe}" fill="${PAPER}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
 // hem line
 g+=`<path d="M-88 -34 Q0 -24 88 -34" stroke="${INK}" stroke-width="4" fill="none"/>`;
 // sash: band from left shoulder (viewer right) to right hip (viewer left)
 g+=`<path d="M50 ${ny+6} L-86 ${ny+190} L-88 ${ny+236} L70 ${ny+40} Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
 g+=`<path d="M40 ${ny+40} L-70 ${ny+190}" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
 // arms over robe
 g+=drawArm(arms[0])+drawArm(arms[1]);
 // head: hair mass
 const hy=ny-62;
 g+=`<path d="M-56 ${hy+40} Q-62 ${hy-62} 0 ${hy-64} Q62 ${hy-62} 56 ${hy+40} L58 ${hy+78} Q30 ${hy+70} 24 ${hy+50} L-24 ${hy+50} Q-30 ${hy+70} -58 ${hy+78} Z" fill="${INK}"/>`;
 // face
 g+=`<ellipse cx="0" cy="${hy+2}" rx="30" ry="36" fill="${PAPER}"/>`;
 // beard
 g+=`<path d="M-31 ${hy-6} Q-32 ${hy+50} 0 ${hy+70} Q32 ${hy+50} 31 ${hy-6} Q24 ${hy+12} 12 ${hy+8} Q0 ${hy+4} -12 ${hy+8} Q-24 ${hy+12} -31 ${hy-6} Z" fill="${INK}"/>`;
 g+=`<path d="M-7 ${hy+24} Q0 ${hy+28} 7 ${hy+24}" stroke="${PAPER}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
 if(po.eyes!==0)g+=`<circle cx="-12" cy="${hy-14}" r="4" fill="${INK}"/><circle cx="12" cy="${hy-14}" r="4" fill="${INK}"/>`;
 return {svg:`<g transform="translate(${x},${y}) scale(${s})">${g}</g>`};
}
