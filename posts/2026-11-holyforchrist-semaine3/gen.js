const { chromium } = require('playwright'); const fs = require('fs');
const dot = 'data:image/png;base64,' + fs.readFileSync('/mnt/project-files/page-chretienne/identite/bulle-bleue.png').toString('base64');
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@200;300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&family=Grandstander:wght@500&display=swap" rel="stylesheet">`;
const CSS = `<style>*{box-sizing:border-box;margin:0}body{width:1080px;height:1350px;background:#141414;color:#d6d3ce;font-family:'Inter Tight';position:relative;overflow:hidden}
em{font-family:'Instrument Serif';font-style:italic;font-weight:400;color:#0ea5d9;letter-spacing:0}
.sig{position:absolute;bottom:94px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:14px;font-family:'JetBrains Mono';font-size:15px;color:#bdbab5}.sig b{color:#fff}
.lab{font-family:'Inter Tight';font-weight:800;font-size:29px;letter-spacing:4px;color:#8a8782;text-transform:uppercase}
.ref{font-family:'JetBrains Mono';font-size:26px;letter-spacing:6px;color:#7d7a75}
.mid{position:absolute;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 110px 60px}
</style>`;
const SIG = `<div class="sig"><img src="${dot}" width="22" height="22"><span>Holyfor<b>christ</b></span></div>`;
const page = b => `<!doctype html><html><head>${FONTS}${CSS}</head><body>${b}${SIG}</body></html>`;

// mur background (from mur.js)
function murBg(W,H,seed){let s=seed;const r=()=>(s=(s*16807)%2147483647)/2147483647;
const words=["Pour ma mère","Guéris-moi","Donne-moi la paix","Pour mes examens","Merci Seigneur","Pour mon frère","Garde ma famille","Je Te fais confiance","Pour mon travail","Relève-moi","Pour mon pays","Ne me lâche pas","Pour mon couple","Apprends-moi à pardonner","Merci pour la vie","Pour mes amis"];
let n='';const cols=Math.ceil(W/230)+1,rows=Math.ceil(H/190)+1;let k=0;
for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=i*230+(j%2)*115-60+(r()-.5)*40,y=j*190-40+(r()-.5)*30,w=180+r()*30,h=130+r()*20,rot=(r()-.5)*14,o=.10+r()*.18;const t=words[(k++)%words.length];
n+=`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="${o}"><rect width="${w}" height="${h}" rx="6" fill="#e8e4dc"/><text x="16" y="44" font-family="Instrument Serif" font-style="italic" font-size="24" fill="#1a1a1a">${t}</text><path d="M16 74H${w-24}M16 98H${w-50}" stroke="#1a1a1a" stroke-opacity=".35" stroke-width="2"/></g>`;}
return `<svg style="position:absolute;left:0;top:0" width="${W}" height="${H}"><defs><radialGradient id="v" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#141414" stop-opacity=".97"/><stop offset=".55" stop-color="#141414" stop-opacity=".75"/><stop offset="1" stop-color="#141414" stop-opacity=".2"/></radialGradient></defs><rect width="${W}" height="${H}" fill="#141414"/>${n}<rect width="${W}" height="${H}" fill="url(#v)"/></svg>`;}

const P = {
// DIM — Lettre-prière (style dim08)
dim15: () => page(`<div class="mid" style="font-family:'Grandstander';font-weight:500;font-size:41px;line-height:1.37;color:#d6d3ce;gap:34px;padding:0 96px 60px">
<div>Cher <span style="color:#e3a51c">Dieu</span>,</div>
<div>Cette semaine, je ne vais pas tout comprendre. Il y aura des réponses qui tardent et des portes qui restent fermées.</div>
<div>Apprends-moi à Te faire confiance même quand je ne vois rien. À me reposer sur Toi, pas sur mes plans.</div>
<div>Et quand je m'inquiète pour demain, rappelle-moi que Tu y es déjà.</div>
<div style="color:#e3a51c">Amen. 🙏🏾</div></div>`),

// LUN — Phrase (style lun09)
lun16: () => page(`<div class="mid" style="font-weight:800;font-size:104px;line-height:1.0;letter-spacing:-5px;color:#d6d3ce;gap:0">
<div>Tu crois qu'Il<br>t'a oublié.</div>
<div style="margin-top:80px">Il ne t'a jamais<br><em style="font-size:124px">quitté</em> des yeux.</div>
<div class="ref" style="margin-top:56px;letter-spacing:6px">ÉSAÏE 49 : 15</div></div>`),

// MAR — Liste (style mar10)
mar17: () => page(`<div style="position:absolute;left:120px;right:80px;top:380px">
<div class="lab">Ce que Dieu dit de toi</div>
<div style="margin-top:130px;font-size:52px;line-height:1.45;letter-spacing:-1.5px">
${[['AIMÉ','même quand tu tombes.'],['CHOISI','avant ta naissance.'],['PARDONNÉ','pour de vrai.'],['GARDÉ','même la nuit.'],['ATTENDU','chaque fois que tu reviens.']].map(([a,b])=>`<div><b style="font-weight:800;color:#e4e1dc">${a}</b> <span style="font-weight:400;color:#7a7772">${b}</span></div>`).join('')}
</div></div>`),

// MER — Notification de Dieu (style mer11)
mer18: () => page(`<div style="position:absolute;left:0;right:0;top:300px;text-align:center">
<div style="font-weight:400;font-size:200px;letter-spacing:-8px;line-height:1;color:#d6d3ce">6:47</div>
<div style="font-size:36px;font-weight:400;color:#a09d98;margin-top:22px">mercredi matin, avant d'ouvrir WhatsApp</div></div>
<div style="position:absolute;left:130px;right:130px;top:658px;display:flex;flex-direction:column;gap:48px">
${[['Avant les messages, viens me parler deux minutes.'],['Ses compassions ne sont pas à leur terme ; elles se renouvellent chaque matin. <i>Lamentations 3:22-23</i>']].map(([t],i)=>`<div style="background:#363638;border-radius:38px;padding:36px 36px 34px 44px;display:flex;gap:34px;align-items:flex-start">
<div style="width:68px;height:68px;border-radius:50%;background:linear-gradient(90deg,#4fdcf7,#14bde0);flex-shrink:0;margin-top:4px"></div>
<div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:30px;color:#f2f0ec;font-weight:700">Dieu</b><span style="font-size:27px;color:#9c9994">maintenant</span></div>
<div style="font-size:31px;line-height:1.33;color:#e6e3de;margin-top:8px">${t}</div></div></div>`).join('')}
</div>`),

// JEU — Challenge Mur des Prières (style mur)
jeu19: () => page(`${murBg(1080,1350,1919)}
<div style="position:absolute;top:84px;left:0;right:0;text-align:center;font-family:'JetBrains Mono';font-size:30px;letter-spacing:12px;color:#18cfec">LE MUR DES PRIÈRES</div>
<div style="position:absolute;left:140px;top:160px;width:800px;height:720px;background:#ebe7df;border-radius:6px;transform:rotate(-1.2deg);box-shadow:0 30px 60px #0009;padding:70px 66px">
<div style="position:absolute;left:384px;top:-14px;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#bff6ff,#3fd6f5 45%,#0a8fb8);box-shadow:0 4px 8px #0006"></div>
<div style="font-family:'Instrument Serif';font-style:italic;font-size:44px;line-height:1.2;color:#1a1a1a">
<div style="color:#0e8fbf">Seigneur,</div>
<div>aujourd'hui, je ne prie pas pour moi.</div>
<div style="margin-top:34px">Je prie pour celui qui lira ce mur ce soir,<br>et qui n'a même plus la force<br>d'écrire sa propre prière.</div>
<div style="margin-top:34px">Porte-le. Relève-le.<br>Qu'il sache qu'il n'est pas seul.</div>
<div style="margin-top:34px;color:#0e8fbf">Amen.</div></div>
<div style="margin-top:30px;font-family:'Inter Tight';font-weight:700;font-size:40px;color:#0e8fbf">#maprierechallenge</div></div>
<div style="position:absolute;top:960px;left:0;right:0;text-align:center;font-weight:300;font-size:33px;color:#cfccc7">Et toi, pour qui tu pries ? Écris-le avec</div>
<div style="position:absolute;top:1020px;left:50%;transform:translateX(-50%);background:#18cfec;border-radius:60px;padding:16px 46px;font-weight:700;font-size:46px;color:#121212;white-space:nowrap">#maprierechallenge</div>
<div style="position:absolute;top:1132px;left:0;right:0;text-align:center;font-weight:300;font-size:30px;color:#a8a5a0">et toute la page priera avec toi</div>`),

// VEN — Conversation avec Dieu (style jeu12)
ven20: () => { const me=t=>`<div style="align-self:flex-end;width:704px;background:#2c2c30;border-radius:28px 28px 8px 28px;padding:26px 32px;font-size:35px;line-height:1.3;color:#e2dfda">${t}</div>`;
 const god=t=>`<div style="align-self:flex-start;max-width:704px;background:#0ea5d9;border-radius:28px 28px 28px 8px;padding:26px 32px;font-size:35px;line-height:1.3;color:#fff">${t}</div>`;
 const lab=t=>`<div style="font-family:'JetBrains Mono';font-size:22px;letter-spacing:6px;color:#8a8782;margin-bottom:-4px">${t}</div>`;
 return page(`<div style="position:absolute;left:110px;right:110px;top:300px;display:flex;flex-direction:column;gap:18px;letter-spacing:-.5px">
${lab('MOI')}${me("Seigneur, j'ai encore raté. La même chose que la dernière fois.")}
${lab('DIEU')}${god('Je sais. Je suis encore là.')}
${me("Tu n'en as pas marre de moi ?")}
${god('Jamais. Lève-toi, on recommence ensemble. 🤍')}
<div class="ref" style="text-align:center;margin-top:44px;font-size:24px">PROVERBES 24 : 16</div></div>`); },

// SAM — Jésus n'a jamais dit (style sam14)
sam21: () => page(`<div style="position:absolute;left:120px;right:80px;top:362px">
<div class="lab">Phrases que Jésus n'a jamais dites</div>
<div style="margin-top:84px;display:flex;flex-direction:column;gap:30px">
${['« Débrouille-toi seul. »','« Cache tes larmes. »','« Tu es allé trop loin. »','« Je t\'aimerai si… »','« Tu n\'en vaux pas la peine. »'].map(t=>`<div style="font-weight:700;font-size:46px;letter-spacing:-1px;color:#7f7c77;line-height:1.05"><span style="background:linear-gradient(#0ea5d9,#0ea5d9) 0 55%/100% 3px no-repeat">${t}</span></div>`).join('')}
</div>
<div style="margin-top:84px;font-weight:800;font-size:58px;letter-spacing:-2px;line-height:1.12;color:#e4e1dc">Il a dit : « Je suis avec<br>vous <em style="font-size:72px">tous les jours</em>. »</div>
<div class="ref" style="margin-top:30px;font-size:24px">MATTHIEU 28 : 20</div></div>`),
};

(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
 const only = process.argv[2] ? process.argv[2].split(',') : Object.keys(P);
 for (const k of only) { await p.setContent(P[k](), { waitUntil: 'networkidle' }).catch(()=>{}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: `/tmp/md/sem3b/${k}.jpg`, type: 'jpeg', quality: 92 }); console.log(k); }
 await b.close(); })();
