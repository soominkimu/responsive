import React from 'react';
import './layout.scss';

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
// Sticky Footer
export const px = v => v + 'px';

// Both container and footer need to be responsive to the changed window size.
export class Layout {
  constructor(ws, padding, border, f_h, f_padding) {  // window size
    this.c = {
      bp:  [600, 900, 1200, 1800],  // breakpoints
      ws:  ws,
      asp: parseFloat( ( ws.w / ws.h ).toFixed(2) ),  // aspect ratio
      padding:   padding,
      border:    border,
      f_h:       f_h,  // should be read as width when Landscape (aspect ratio > 1)
      f_padding: f_padding
    };
    this.c.grp = this.getResponsiveGroup(ws.w); 
    this.c.isLandscape = this.c.asp > 1;
  }

  getResponsiveGroup = w => {
    if (w < this.c.bp[1])
      return (w < this.c.bp[0]) ? 0 : 1;
    if (w < this.c.bp[2])
      return 2;
    return (w < this.c.bp[3]) ? 3 : 4;
  }

  // React stateless component in JS class
  Container = props => {
    const pb = (this.c.padding + this.c.border) * 2;
    const ft = (this.c.f_h > 0) ? (this.c.f_h + this.c.f_padding * 2) : 0;

    return (
      <div className={props.className}
        style={{
        width:  this.c.ws.w - pb - (this.c.isLandscape ? ft : 0),
        height: this.c.ws.h - pb - (this.c.isLandscape ? 0 : ft),
        padding:    px(this.c.padding),
        marginLeft: px(this.c.isLandscape ? ft : 0),
        ...props.style
      }}>
        {props.children}
      </div>
    );
  }

  Footer = props =>
    <div style={{ // CSS var
      '--f_w' : this.c.isLandscape ? px(this.c.f_h) : '100%',  // width
      '--f_h' : this.c.isLandscape ? '100%' : px(this.c.f_h),  // height
      '--f_p' : px(this.c.f_padding),                        // padding
      '--f_wm': this.c.isLandscape ? 'vertical-lr' : 'horizontal-tb', // write-mode
      '--f_lh': px(this.c.f_h)  // line-height
    }}>
      <div className="phantom" />
      <div className="footer">{props.children}</div>
    </div>;
}
