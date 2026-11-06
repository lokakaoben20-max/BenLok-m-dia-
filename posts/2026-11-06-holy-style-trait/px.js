// Solid pictogram kit (style of standard pictograms), white on dark
const C='#ffffff', D='#0d1116', BLUE='#18cfec';
function P(a,ang,len,f=1){return [a[0]+Math.sin(ang)*len*f,a[1]+Math.cos(ang)*len];}
function ln(a,b,w,c){return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;}
function limb(pts,w,sep){let g='';if(sep)for(let i=0;i<pts.length-1;i++)g+=ln(pts[i],pts[i+1],w+12,D);for(let i=0;i<pts.length-1;i++)g+=ln(pts[i],pts[i+1],w,C);return g;}
// po angles from straight down (+ forward). t torso lean, h head tilt
function px(x,y,po,o={}){const f=o.f||1,s=o.s||1;
 const wt=104*s,wl=44*s,hr=50*s,Lt=150*s,Lth=118*s,Lsh=118*s,Lu=88*s,Lf=84*s;
 const legLen=Lth+Lsh;
 const hip=[x,y-legLen*0.98- (o.sit?0:0)];
 const chest=P(hip,Math.PI-(po.t||0),Lt,f); // top of torso core
 const sh=P(chest,Math.PI-(po.t||0),-8*s,f);
 const head=P(chest,Math.PI-((po.t||0)+(po.h||0)),wt/2+hr+12*s,f);
 const hipL=P(hip,Math.PI/2,0,f);
 const leg=(th,sk)=>{const k=P(hip,th,Lth,f),a=P(k,sk,Lsh,f);return [hip,k,a];};
 const arm=(u,fa)=>{const e=P(sh,u,Lu,f),w=P(e,fa,Lf,f);return [sh,e,w];};
 const L1=leg(po.th1??0.06,po.sh1??0),L2=leg(po.th2??-0.06,po.sh2??0);
 const A1=arm(po.ua1??0.1,po.fa1??0.05),A2=arm(po.ua2??-0.08,po.fa2??-0.04);
 let g='';
 if(o.front){const Ls=[hip[0]-26*s,hip[1]],Rs=[hip[0]+26*s,hip[1]];
  const ll=[Ls,[Ls[0]-(po.sp||0)*s,y-12*s]],rl=[Rs,[Rs[0]+(po.sp||0)*s,y-12*s]];
  g+=limb(ll,wl,0)+limb(rl,wl,0)+ln(hip,chest,wt,C);
  const sL=[chest[0]-wt*0.36,chest[1]+6*s],sR=[chest[0]+wt*0.36,chest[1]+6*s];
  const aL=[sL,P(sL,po.ua2??0.15,Lu,-1)];aL.push(P(aL[1],po.fa2??0.1,Lf,-1));
  const aR=[sR,P(sR,po.ua1??0.15,Lu,1)];aR.push(P(aR[1],po.fa1??0.1,Lf,1));
  const hd=[chest[0],chest[1]-wt/2-hr-12*s];
  g+=`<circle cx="${hd[0]}" cy="${hd[1]}" r="${hr}" fill="${C}"/>`;
  if(po.ex==='sad')g+=`<path d="M${hd[0]-hr*0.3} ${hd[1]+hr*0.48} Q${hd[0]} ${hd[1]+hr*0.22} ${hd[0]+hr*0.3} ${hd[1]+hr*0.48}" stroke="${D}" stroke-width="${7*s}" fill="none" stroke-linecap="round"/>`;
  g+=limb(aL,wl,1)+limb(aR,wl,1);
  return {svg:g,head:hd,hip};}
 if(o.robe){
  const bw=1.0*s; const top=chest, by=y-4*s;
  g+=limb(A2,wl,0);
  g+=`<path d="M${top[0]-50*s},${top[1]+6*s} Q${top[0]-54*s},${top[1]-wt*0.5} ${top[0]},${top[1]-wt*0.5} Q${top[0]+54*s},${top[1]-wt*0.5} ${top[0]+50*s},${top[1]+6*s} L${x+78*s},${by} L${x-78*s},${by} Z" fill="${C}"/>`;
  g+=ln([top[0]-f*42*s,top[1]-wt*0.25],[x+f*44*s,hip[1]+30*s],9*s,D); // sash
  g+=jhead(head,hr,f,po.ex,s);
  g+=limb(A1,wl,1);
  return {svg:g,head,sh,w1:A1[2],w2:A2[2],hip};
 }
 g+=limb(L2,wl,0)+limb(A2,wl,0);
 g+=ln(hip,chest,wt,C);
 g+=limb(L1,wl,1);
 g+=`<circle cx="${head[0].toFixed(1)}" cy="${head[1].toFixed(1)}" r="${hr}" fill="${C}"/>`;
 const ex=po.ex;if(ex){const hx=head[0]+f*hr*0.28,hy=head[1];
  if(ex==='smile')g+=`<path d="M${hx-hr*0.32} ${hy+hr*0.2} Q${hx} ${hy+hr*0.62} ${hx+hr*0.32} ${hy+hr*0.2}" stroke="${D}" stroke-width="${7*s}" fill="none" stroke-linecap="round"/>`;
  if(ex==='sad')g+=`<path d="M${hx-hr*0.3} ${hy+hr*0.48} Q${hx} ${hy+hr*0.22} ${hx+hr*0.3} ${hy+hr*0.48}" stroke="${D}" stroke-width="${7*s}" fill="none" stroke-linecap="round"/>`;
  if(ex==='wow')g+=`<ellipse cx="${hx}" cy="${hy+hr*0.35}" rx="${hr*0.16}" ry="${hr*0.24}" fill="${D}"/>`;}
 g+=limb(A1,wl,1);
 return {svg:g,head,sh,w1:A1[2],w2:A2[2],hip};}
function jhead(h,hr,f,ex,s){let g='';const [x,y]=h;
 // hair falling to shoulders behind head
 g+=`<path d="M${x-hr*0.95} ${y} L${x-hr*1.0} ${y+hr*1.2} Q${x-hr*0.8} ${y+hr*1.35} ${x-hr*0.5} ${y+hr*1.1} L${x+hr*0.5} ${y+hr*1.1} Q${x+hr*0.8} ${y+hr*1.35} ${x+hr*1.0} ${y+hr*1.2} L${x+hr*0.95} ${y} Z" fill="${C}"/>`;
 g+=`<circle cx="${x}" cy="${y}" r="${hr*1.02}" fill="${C}"/>`;
 g+=`<path d="M${x-hr*0.7} ${y+hr*0.6} Q${x+f*hr*0.1} ${y+hr*1.55} ${x+hr*0.7} ${y+hr*0.6} Z" fill="${C}"/>`;
 const sw=6*s, fx=x+f*hr*0.1;
 // hairline: arc across forehead then down both sides of face
 g+=`<path d="M${fx-hr*0.62} ${y+hr*0.55} L${fx-hr*0.62} ${y-hr*0.15} Q${fx-hr*0.55} ${y-hr*0.6} ${fx} ${y-hr*0.62} Q${fx+hr*0.55} ${y-hr*0.6} ${fx+hr*0.62} ${y-hr*0.15} L${fx+hr*0.62} ${y+hr*0.55}" stroke="${D}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 // beard/moustache line
 g+=`<path d="M${fx-hr*0.62} ${y+hr*0.1} Q${fx-hr*0.5} ${y+hr*0.45} ${fx-hr*0.2} ${y+hr*0.3} L${fx+hr*0.2} ${y+hr*0.3} Q${fx+hr*0.5} ${y+hr*0.45} ${fx+hr*0.62} ${y+hr*0.1}" stroke="${D}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
 g+=`<circle cx="${fx-hr*0.25}" cy="${y-hr*0.12}" r="${5.5*s}" fill="${D}"/><circle cx="${fx+hr*0.25}" cy="${y-hr*0.12}" r="${5.5*s}" fill="${D}"/>`;
 return g;}
function sweat(x,y,s=1){return `<path transform="translate(${x},${y}) scale(${s})" d="M0 0 q8 10 0 16 q-8 -6 0 -16z M18 -10 q6 8 0 12 q-6 -4 0 -12z" fill="${BLUE}"/>`;}
function steam(x,y){let g='';for(let i=0;i<3;i++)g+=`<path d="M${x+i*20} ${y} q-8 -10 0 -20 q8 -10 0 -20" stroke="${C}" stroke-width="5" fill="none" stroke-linecap="round"/>`;return g;}
