import React from 'react';
import './App.scss';
import { useWindowSize } from './util-ui';
import { px, Layout } from './layout';

function App() {
  const lo = new Layout(useWindowSize(), 0, 10);  // layout object: calls custom Hook
  lo.setFooter(40, 4);

  const svg = {
    w: Math.floor( lo.ws.w * .8 ),
    h: Math.floor( lo.ws.h * .4 )
  };
  const dv = 10;
  const mw = 2400/dv;

  const BPRect = ({g}) => {
    const w = [...lo.bp.map(p => p/dv), mw];  // breakpoints / 10, spread array
    const c = ["red", "yellow", "pink", "green" , "blue"];

    return <rect x="1" y="1" width={w[g]} height={w[g] * 100 / mw} fill={c[g]}
                strokeWidth={(g === lo.grp) ? 4 : .5} />;
  }

  const lns = [];
  for (let i=4; i >= 0; i--)
    lns.push(<BPRect key={i} g={i} />);

  return (
    <div className="App"
      style={ lo.getContainerStyle({ border: 'solid ' + px(lo.border) + ' darkblue' }) }
    >
      <h3>{lo.ws.w}x{lo.ws.h} ({lo.asp}) => g:[{lo.grp}]</h3>
      <svg width={svg.w} height={svg.h} viewBox={`0 0 ${mw + 2} 102`} preserveAspectRatio="none">
        <g stroke="Black">
          {lns}
        </g>
      </svg>
      <br />
      <lo.Footer>
        <span style={{color: 'silver'}}>☰</span>
        &nbsp;&nbsp;Sticky Footer {lo.ws.w}x{lo.footer.h}, {lo.footer.padding}px padding&nbsp;&nbsp;
        <span style={{color: 'red'}}>✘</span>
      </lo.Footer>
    </div>
  );
}

export default App;

/* 
      style={{
        ...lo.getContainerStyle(),
        ...{ border: 'solid ' + px(lo.border) + ' darkblue' }
      }}

 * Failed experiment: CSS var() does not work for media query.
    const bps = [
      {name: 's',  value: 600},
      {name: 'm',  value: 900},
      {name: 'l',  value: 1200},
      {name: 'xl', value: 1800}
    ];
    bps.forEach( p => document.documentElement.style.setProperty('--bp_' + p.name, p.value + 'px') );
    console.log("CSS variables set");
    */
