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

const footer = {
  height: 40,
  padding: 4
};

// Sticky Footer
const Footer = props =>
  <div style={{
    '--ft_h': footer.height + 'px',
    '--ft_p': footer.padding + 'px'
  }}>
    <div className="phantom" />
    <div className="footer">{props.children}</div>
  </div>

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
    /* Failed experiment: CSS var() does not work for media query.
    const bps = [
      {name: 's',  value: 600},
      {name: 'm',  value: 900},
      {name: 'l',  value: 1200},
      {name: 'xl', value: 1800}
    ];
    bps.forEach( p => document.documentElement.style.setProperty('--bp_' + p.name, p.value + 'px') );
    console.log("CSS variables set");
    */
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const svgW = Math.floor( winSize.w * .9 );
  const svgH = Math.floor( winSize.h * .5 );
  const asp  = ( winSize.w / winSize.h ).toFixed(2);
  const padding = 0;  // px
  const border  = 10; // px
  const grp = getResponsiveGroup(winSize.w);

  const BPRect = props => {
    const w = [60, 90, 120, 180, 240];
    const c = ["red", "yellow", "pink", "green" , "blue"];

    return (<rect x="1" y="1" width={w[props.g]} height={w[props.g] * 100 / 240} fill={c[props.g]}
          strokeWidth={(props.g === grp) ? 4 : .5} />);
  }

  return (
    <div className="App"
      style={{
        width:  winSize.w - (padding + border)*2,
        height: winSize.h - (padding + border)*2 - (footer.height + footer.padding*2),
        padding: padding + 'px',
        border: `solid ${border}px darkblue`
      }}
    >
      <h3>{winSize.w}x{winSize.h} ({asp}) => g:{grp}</h3>
      <svg width={svgW} height={svgH} viewBox={`0 0 242 102`} preserveAspectRatio="none">
        <g stroke="Black">
          <BPRect g={4} />
          <BPRect g={3} />
          <BPRect g={2} />
          <BPRect g={1} />
          <BPRect g={0} />
        </g>
      </svg>
      <br />
      <Footer>
        <span style={{color: 'green'}}>☰</span>
        &nbsp;&nbsp;Sticky Footer {winSize.w}x{footer.height}, {footer.padding}px padding&nbsp;&nbsp;
        <span style={{color: 'red'}}>✘</span>
      </Footer>
    </div>
  );
}

export default App;
