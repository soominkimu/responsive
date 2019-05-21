import React, { useState, useEffect } from 'react';
import './App.scss';

/* Binary Search for the Range (At list 2 if-checks, maximum 3 if-checks)
 *|    w < 900    |         else            -> comparison (1)
 *+-------+-------+-------+-------+--------
 *|w<600  | else  |w<1200 |      else       -> comparison (2)
 *|       |       |       |-------+--------
 *|       |       |       |w<1800 |  else   -> comparison (3)
 *+----------------------------------------
 *|  [0]  |  [1]  |  [2]  |  [3]  |  [4]    Responsive Range Group in my application
 *+-------+-------+-------+-------+--------
 *|       |600px  |900px  |1200px |1800px   : media query breakpoints
 *|       |       |       |       |
 *|       |       |       |       +--[4] big-desktop-up
 *|       |       |       +--[3] desktop-up
 *|       |       +--[2] tablet-landscape-up
 *|       +--[1] tablet-portrait-up
 *+--[0] phone-only
*/
const getResponsiveGroup = w => {
  if (w < 900)
    return (w < 600) ? 0 : 1;
  if (w < 1200)
    return 2;
  return (w < 1800) ? 3 : 4;
}

function App() {
  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });

  const handleWindowResize = () => setWinSize({
    w: window.innerWidth,
    h: window.innerHeight
  });

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const BPRect = props =>
    <rect x="1" y="1" width={props.width} height={props.width * 100 / 240} fill={props.fill}
          strokeWidth={props.isGroup ? 4 : .5} />

  const svgW = Math.floor( winSize.w * .9 );

  const g = getResponsiveGroup(winSize.w);

  return (
    <div className="App"
      style={{
        width:  winSize.w - 20,
        height: winSize.h - 20
      }}
    >
      <h3>{winSize.w}x{winSize.h} => {g}</h3>
      <svg width={svgW} viewBox={`0 0 242 102`}>
        <g stroke="Black">
          <BPRect width="240" fill="blue"   isGroup={g === 4} />
          <BPRect width="180" fill="green"  isGroup={g === 3} />
          <BPRect width="120" fill="pink"   isGroup={g === 2} />
          <BPRect width="90"  fill="yellow" isGroup={g === 1} />
          <BPRect width="60"  fill="red"    isGroup={g === 0} />
        </g>
      </svg>
    </div>
  );
}

export default App;
