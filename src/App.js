import React, { useState } from 'react';
import './App.scss';
import { useWindowSize } from './util-ui';
import { px, Layout, EmBtn } from './layout';

function App() {
  const L = new Layout(useWindowSize(), 0, 10, 40, 4);  // layout object: calls custom Hook
  const C = L.c;

  const [mode, setMode] = useState(0);
  const [hori, setHori] = useState(true);
  const [colr, setColr] = useState(true);
  const [emoj, setEmoj] = useState(true);
  const [rota, setRota] = useState(0);
  const [opct, setOpct] = useState(0);
  const [back, setBack] = useState(0);
  const [crdy, setCrdy] = useState(0);

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

  const Controls = React.memo(function Controls(props) {
    const em = {
      mode: ['📃','🌀',],
      hori: ['🚥','🚦'],
      colr: ['🎨','✨'],
      emoj: ['🍀','🈚️'],
      rota: ['🌎','🌍','🌏'],
      opct: ['🌕','🌖','🌗','🌘 ','🌑','🌒 ','🌓','🌔'],
      back: ['🌌','🌃','🌆','🌇','🎆','🎇'],
      crdy: ['🃏','🎴','🀄️']
    };

    const togId = (i, ar) => (i + 1) % ar.length;

    return (
      <>
        <EmBtn em={em.mode[mode]} onClick={() => setMode((mode === 0) ? 1 : 0)}>Carousel</EmBtn>
        <EmBtn em={em.hori[hori ? 0 : 1]} onClick={() => setHori(!hori)}>Horizontal</EmBtn>
        <EmBtn em={em.colr[colr ? 0 : 1]} onClick={() => setColr(!colr)}>Color</EmBtn>
        <EmBtn em={em.emoj[emoj ? 0 : 1]} onClick={() => setEmoj(!emoj)}>Emoji</EmBtn>
        <EmBtn em='⬅️ ' disabled >Rotate-</EmBtn>
        <EmBtn em='🔘'>RotateToday</EmBtn>
        <EmBtn em='➡️ '>Rotate+</EmBtn>
        <EmBtn em={em.rota[rota]} onClick={() => setRota(togId(rota, em.rota))}>Rotate90</EmBtn>
        <EmBtn em='🔃'>Tilt</EmBtn>
        <EmBtn em={em.crdy[crdy]} onClick={() => setCrdy(togId(crdy, em.crdy))}>CardY</EmBtn>
        <EmBtn em={em.opct[opct]} onClick={() => setOpct(togId(opct, em.opct))}>Opacity</EmBtn>
        <EmBtn em={em.back[back]} onClick={() => setBack(togId(back, em.back))}>Background</EmBtn>
      </>
    );
  });

  return (
    <L.Container className="App"
      style={{ border: 'solid ' + px(C.border) + ' darkblue' }}  // with additional styles
    >
      <Content />
      <L.Footer>
        <Controls />
      </L.Footer>
    </L.Container>
  );
}

export default App;

/* 
 *🍵🍺 ✅ 😁 🍙 🍣<span role="img" ariaLabel="stop">🔴</span>
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
 *
 *
        <span style={{color: 'silver'}}>☰</span>
        &nbsp;&nbsp;Sticky Footer {C.ws.w}x{C.f_h}, {C.f_padding}px padding&nbsp;&nbsp;
        <span style={{color: 'red'}}>✘</span>

        <button><span style={{writingMode: "vertical-lr"}}>the Space</span></button>
    */
