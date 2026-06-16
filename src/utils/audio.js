export function createAudioCtx() {
  try { return new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
}

export function playBoot(ctx) {
  if (!ctx) return;
  [261,329,392,523,659,784,1046].forEach((f,i) => {
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="square";o.frequency.value=f;
    const t=ctx.currentTime+i*0.08;
    g.gain.setValueAtTime(0.12,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.15);
    o.start(t);o.stop(t+0.18);
  });
  [523,659,784].forEach(f=>{
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="triangle";o.frequency.value=f;
    const t=ctx.currentTime+0.75;
    g.gain.setValueAtTime(0.12,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.7);
    o.start(t);o.stop(t+0.8);
  });
}

export function playSelect(ctx) {
  if (!ctx) return;
  [440,660].forEach((f,i)=>{
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="square";o.frequency.value=f;
    const t=ctx.currentTime+i*0.07;
    g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.1);
    o.start(t);o.stop(t+0.12);
  });
}

export function playStep(ctx, frame) {
  if (!ctx||frame%2!==0) return;
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  o.type="square";o.frequency.value=90+Math.random()*20;
  g.gain.setValueAtTime(0.025,ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.05);
  o.start();o.stop(ctx.currentTime+0.06);
}