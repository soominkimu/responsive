import React from 'react';
import './App.scss';
import { useWindowSize } from './util-ui';
import { px, Layout } from './layout';

function App() {
  const L = new Layout(useWindowSize(), 0, 10, 40, 4);  // layout object: calls custom Hook
  const C = L.c;

  const Content = props => {
    const dv = 10;       // divide by
    const mh = 100;      // maximum height
    const mw = 2400/dv;  // maxium width

    const BPRect = () => {
      const w   = [...C.bp.map(p => p/dv), mw];  // breakpoints / 10, spread array
      const clr = ["red", "yellow", "pink", "green", "blue"];
      const lns = [];
      for (let i=4; i >= 0; i--)
        lns.push(<rect key={i} x="1" y="1" width={w[i]} height={Math.floor( w[i] * mh / mw )} fill={clr[i]}
                  strokeWidth={(i === C.grp) ? 4 : .5} />);
      return <g stroke="Black">{lns}</g>;
    }

    return (
      <>
        <h3>{C.ws.w}x{C.ws.h} ({C.asp}) => g:[{C.grp}]</h3>
        <svg width= {Math.floor( C.ws.w * .8 )}
             height={Math.floor( C.ws.h * .4 )}
             viewBox={`0 0 ${mw + 2} ${mh + 2}`}
             preserveAspectRatio="none">
          <BPRect />
        </svg>
        <br />
      </>
    );
  }

  return (
    <L.Container className="App"
      style={{ border: 'solid ' + px(C.border) + ' darkblue' }}  // with additional styles
    >
      <Content />
      <L.Footer>
        <span style={{color: 'silver'}}>☰</span>
        &nbsp;&nbsp;Sticky Footer {C.ws.w}x{C.f_h}, {C.f_padding}px padding&nbsp;&nbsp;
        <span style={{color: 'red'}}>✘</span>
      </L.Footer>
    </L.Container>
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
