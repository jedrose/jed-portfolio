export default function Sprite({ x, y, dir, moving, frame }) {
  const lf = frame % 2 === 0 ? 3 : -3;

  return (
    <div style={{ position:"absolute", left:x-16, top:y-40, width:32,
      pointerEvents:"none", zIndex:10 }}>
      {/* Shadow */}
      <div style={{ position:"absolute", bottom:-6, left:"50%", transform:"translateX(-50%)",
        width:24, height:6, borderRadius:"50%", background:"rgba(0,0,0,0.12)" }} />
      {/* Hair */}
      <div style={{ position:"absolute", top:0, left:4, right:4, height:6,
        background:"#92400e", borderRadius:"4px 4px 0 0" }} />
      {/* Head */}
      <div style={{ position:"absolute", top:4, left:5, right:5, height:18,
        background:"#fde68a", borderRadius:4 }}>
        {/* Eyes */}
        <div style={{ position:"absolute", top:7, left:dir==="right"?10:5,
          width:4, height:4, background:"#1e293b", borderRadius:1 }} />
        <div style={{ position:"absolute", top:7, left:dir==="left"?4:10,
          width:4, height:4, background:"#1e293b", borderRadius:1 }} />
      </div>
      {/* Body */}
      <div style={{ position:"absolute", top:20, left:3, right:3, height:14,
        background:"#2563eb", borderRadius:2 }}>
        <div style={{ height:4, background:"#1d4ed8", borderRadius:"2px 2px 0 0" }} />
      </div>
      {/* Left leg */}
      <div style={{ position:"absolute", top:32, left:5, width:9, height:12,
        background:"#1e293b", borderRadius:2,
        transform: moving ? `translateX(${lf}px)` : "none",
        transition:"transform 0.05s" }} />
      {/* Right leg */}
      <div style={{ position:"absolute", top:32, left:17, width:9, height:12,
        background:"#1e293b", borderRadius:2,
        transform: moving ? `translateX(${-lf}px)` : "none",
        transition:"transform 0.05s" }} />
    </div>
  );
}