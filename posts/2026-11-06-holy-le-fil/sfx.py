import numpy as np, wave
sr=44100; D=54.5; n=int(D*sr); M=np.zeros(n); rng=np.random.default_rng(3)
def add(s,at,g):
    i=int(at*sr); m=min(len(s),n-i)
    if m>0 and i>=0: M[i:i+m]+=s[:m]*g
def note(m): return 440*2**((m-69)/12)
def env(L,a=0.003,r=0.3):
    x=np.arange(int(L*sr))/sr; return x,np.minimum(1,x/a)*np.exp(-x/r)
def pluck(f,L=1.4,r=0.5):
    x,e=env(L,0.003,r); return (np.sin(2*np.pi*f*x)+0.3*np.sin(2*np.pi*2*f*x)*np.exp(-x*6))*e
def piano(f,L=2.2,r=0.9):
    x,e=env(L,0.004,r); return (np.sin(2*np.pi*f*x)+0.45*np.sin(2*np.pi*2*f*x)*np.exp(-x*3)+0.2*np.sin(2*np.pi*3*f*x)*np.exp(-x*5))*e
def pad(fs,L,a=0.8,rl=1.5):
    x=np.arange(int(L*sr))/sr; e=np.minimum(1,x/a)*np.clip((L-x)/rl,0,1)
    return sum(np.sin(2*np.pi*f*x)+0.5*np.sin(2*np.pi*f*1.004*x+1) for f in fs)*e/len(fs)
def smooth(x,w):
    c=np.cumsum(np.insert(x,0,0)); return np.concatenate([(c[w:]-c[:-w])/w,np.zeros(w-1)])
def noise(L): return rng.standard_normal(int(L*sr))
def step(g=1.0):
    L=0.06; x=np.arange(int(L*sr))/sr; nz=smooth(noise(L),18)*np.exp(-x*70); th=np.sin(2*np.pi*110*x)*np.exp(-x*60)
    return (nz*2.2+th*0.6)*g
def click(): L=0.03; x=np.arange(int(L*sr))/sr; nz=noise(L); nz=nz-smooth(nz,4); return nz*np.exp(-x*220)
def thud(f=70,L=0.5): x,e=env(L,0.002,0.12); return np.sin(2*np.pi*f*x*(1-0.3*x))*e
def whoosh(L=0.8):
    x=np.arange(int(L*sr))/sr; return smooth(noise(L),30)*np.sin(np.pi*x/L)**2*3
def boing(L=0.9):
    x=np.arange(int(L*sr))/sr; fr=280+160*np.sin(2*np.pi*9*x)*np.exp(-x*3); ph=2*np.pi*np.cumsum(fr)/sr; return np.sin(ph)*np.exp(-x*3.2)
def twang(f=196,L=1.0):
    x=np.arange(int(L*sr))/sr; ph=2*np.pi*np.cumsum(f*(1+0.02*np.sin(2*np.pi*6*x)))/sr; return (np.sin(ph)+0.3*np.sin(2*ph))*np.exp(-x*3.5)
def chime(f): return pluck(f,2.0,0.7)
# ---- music: A minor gentle piano 0-40
prog=[(57,[57,60,64]),(53,[53,57,60]),(48,[48,52,55]),(55,[55,59,62])]
t=0.6;i=0
while t<36:
    root,ch=prog[i%4]
    add(piano(note(root-12),3.0,1.2),t,0.05)
    for j,m in enumerate(ch): add(piano(note(m+12),2.0,0.8),t+0.5+j*0.5,0.028)
    t+=3.2;i+=1
add(pad([note(m) for m in [57,60,64]],36,3,4),0.4,0.035)
# ---- footsteps
def steps(a,b,per,g):
    x=a
    while x<b: add(step(),x,g); x+=per
steps(4.05,8.6,0.507,0.10); steps(15.45,17.0,0.286,0.12); steps(27.05,31.6,0.507,0.10)
steps(19.6,26.3,0.507,0.04); steps(20.5,26.4,0.507,0.035)
steps(36.05,38.2,0.507,0.07); steps(43.95,49.0,0.449,0.10); steps(43.65,47.2,0.462,0.06)
# ---- effects
add(twang(196),8.62,0.22); add(pluck(note(84),0.4,0.1),9.0,0.06)
x=np.arange(int(2.3*sr))/sr; add(np.sin(2*np.pi*(90+8*np.sin(2*np.pi*3*x))*x)*0.6*np.minimum(1,x/0.3)*np.clip((2.3-x)/0.4,0,1),9.65,0.05)
tt=12.6
while tt<13.8: add(click(),tt,0.35); add(click(),tt+0.06,0.25); tt+=0.449
add(smooth(noise(0.25),3)*np.exp(-np.arange(int(0.25*sr))/sr*25)*2,13.8,0.25); add(click(),14.3,0.3); add(click(),14.42,0.2)
add(pluck(note(76),0.4,0.1),14.4,0.05); add(pluck(note(72),0.4,0.1),14.6,0.05)
add(twang(147,0.6),16.98,0.25); add(boing(),17.05,0.22); add(thud(),17.9,0.5); add(whoosh(0.6),17.85,0.05)
for j,m in enumerate([64,62,60,59,57]): add(piano(note(m),2.5,1.0),20.6+j*0.9,0.035)
for j,m in enumerate([45,47,48]): add(piano(note(m),2.5,1.0),29.4+j*0.75,0.05)
x=np.arange(int(2.0*sr))/sr; add(np.sin(2*np.pi*(95+10*np.sin(2*np.pi*4*x))*x)*np.minimum(1,x/0.3)*np.clip((2-x)/0.4,0,1),32.6,0.05)
add(thud(60,0.4),35.0,0.25)
add(pad([note(m) for m in [57,64,69,73]],8,2.0,2.5),35.8,0.08)
for j,m in enumerate([81,85,88]): add(chime(note(m)),36.4+j*0.35,0.02)
add(chime(note(88)),38.55,0.04); add(chime(note(93)),38.75,0.03)
# snap
L=0.12;add(smooth(noise(L),2)*np.exp(-np.arange(int(L*sr))/sr*40)*3,40.28,0.3); add(thud(90,0.3),40.3,0.25)
for j,m in enumerate([81,85,88,93,97]): add(chime(note(m)),40.35+j*0.09,0.035)
add(pad([note(m) for m in [45,57,61,64,69]],9,0.4,3),40.3,0.12)
add(pluck(note(81),0.4,0.1),42.45,0.08); add(pluck(note(88),0.5,0.12),42.65,0.08)
for j,m in enumerate([69,73,76,81,76,78,81,85]): add(piano(note(m),2.0,0.8),43.6+j*0.55,0.04)
add(whoosh(1.4),48.1,0.07); add(pad([note(m) for m in [57,61,64,69,73]],2.5,0.4,1.5),48.5,0.12)
for j,m in enumerate([93,97,100]): add(chime(note(m)),48.6+j*0.12,0.03)
# end card
add(pad([note(m) for m in [45,52,57,61,64]],5.0,0.8,2.0),49.5,0.09)
for j,m in enumerate([81,85,88,85,81]): add(pluck(note(m),1.6,0.6),50.2+j*0.6,0.04)
M[int(53.8*sr):]*=np.linspace(1,0,n-int(53.8*sr))
M/=np.abs(M).max()/0.9
w=wave.open('mix.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((M*32767).astype(np.int16).tobytes());w.close()
