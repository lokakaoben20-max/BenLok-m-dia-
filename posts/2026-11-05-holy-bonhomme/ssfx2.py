import numpy as np, wave
sr=44100; D=25.5; n=int(D*sr); t=np.arange(n)/sr; M=np.zeros(n); rng=np.random.default_rng(1)
def ar(L,a=0.003,r=0.3):
    x=np.arange(int(L*sr))/sr; return x,np.minimum(1,x/a)*np.exp(-x/r)
def add(s,at,g):
    i=int(at*sr); m=min(len(s),n-i)
    if m>0: M[i:i+m]+=s[:m]*g
def note(m): return 440*2**((m-69)/12)
def pizz(f,L=0.35,r=0.09):
    x,e=ar(L,0.002,r); return (np.sin(2*np.pi*f*x)+0.4*np.sin(2*np.pi*2*f*x)*np.exp(-x*20))*e
def pluck(f,L=1.4,r=0.5):
    x,e=ar(L,0.003,r); return (np.sin(2*np.pi*f*x)+0.3*np.sin(2*np.pi*2*f*x)*np.exp(-x*6))*e
def pad(fs,L,a=0.6,rl=1.5):
    x=np.arange(int(L*sr))/sr; e=np.minimum(1,x/a)*np.clip((L-x)/rl,0,1)
    return sum(np.sin(2*np.pi*f*x)+0.5*np.sin(2*np.pi*f*1.004*x+1) for f in fs)*e/len(fs)

bt=0.4
low=[43,50,43,50,45,52,45,52,43,50,43,50,47,50,43,50,45,52]
for i,m in enumerate(low): add(pizz(note(m),0.5,0.14),i*bt,0.16 if i>=10 else 0.11)
mel=[67,None,69,None,71,69,67,None,66,None,67,69,71,None,None,None,None,None,64,None,62,None,67]
for i,m in enumerate(mel):
    if m and i*bt+0.2<9.6: add(pizz(note(m),0.35,0.08),i*bt+0.2,0.07)
for i,m in enumerate([72,71,70,69,68]): add(pizz(note(m),0.3,0.07),7.0+i*0.2,0.07)
add(pizz(note(48),0.5,0.15),9.6,0.12)
add(pizz(note(76),0.25,0.06),10.1,0.06); add(pizz(note(81),0.3,0.07),10.3,0.07)
for i in range(5): add(pizz(note(72 if i%2 else 67),0.2,0.05),10.6+i*0.22,0.05)
add(pizz(note(84),0.3,0.06),13.2,0.09)
for i in range(3): add(pizz(note(79),0.2,0.04),13.8+i*0.25,0.05)
add(pluck(note(88),1.0,0.3),15.7,0.07)
x=np.arange(int(0.8*sr))/sr; nz=rng.standard_normal(len(x)); c=np.cumsum(np.insert(nz,0,0)); w=30; nzs=np.concatenate([(c[w:]-c[:-w])/w,np.zeros(w-1)])
add(nzs*np.sin(np.pi*x/0.8)**2*3,16.4,0.08)
add(pad([note(m) for m in [55,59,62,67,71]],6.0,0.5,2.5),16.9,0.12)
for i,m in enumerate([79,83,86,91]): add(pluck(note(m)),17.1+i*0.12,0.05)
add(pizz(note(79),0.3,0.08),18.65,0.08); add(pizz(note(86),0.4,0.1),18.85,0.08)
for i,m in enumerate([83,86,91]): add(pluck(note(m),1.2,0.4),19.7+i*0.3,0.035)
add(pad([note(m) for m in [55,62,67,71]],3.8,0.6,2.0),21.7,0.09)
for i,m in enumerate([79,83,86,83,79]): add(pluck(note(m),1.6,0.6),22.4+i*0.55,0.045)
M[int(25*sr):]*=np.linspace(1,0,n-int(25*sr))
M/=np.abs(M).max()/0.9
w=wave.open('smix2.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((M*32767).astype(np.int16).tobytes());w.close()
