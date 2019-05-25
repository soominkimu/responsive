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

export class Layout {
  constructor(ws, padding=0, border=0) {  // window size
    this.bp  = [600, 900, 1200, 1800];  // breakpoints
    this.ws  = ws;
    this.grp = this.getResponsiveGroup(ws.w);
    this.asp = parseFloat( ( ws.w / ws.h ).toFixed(2) );  // aspect ratio
    this.isLandscape = this.asp > 1;
    this.padding = padding;
    this.border  = border;
  }

  setFooter = (h, padding) => {
    this.footer = {
      h:       h,  // should be read as width when Landscape (aspect ratio > 1)
      padding: padding
    };
  }

  getResponsiveGroup = w => {
    if (w < this.bp[1])
      return (w < this.bp[0]) ? 0 : 1;
    if (w < this.bp[2])
      return 2;
    return (w < this.bp[3]) ? 3 : 4;
  }

  bp  = () => this.bp;
  ws  = () => this.ws;
  grp = () => this.grp;
  asp = () => this.asp;
  isLandscape = () => this.isLandscape;
  padding = () => this.padding;
  border  = () => this.border;
  footer  = () => this.footer;
  
  getContainerStyle = style => {
    const pb = (this.padding + this.border) * 2;
    const ft = this.footer ? (this.footer.h + this.footer.padding * 2) : 0;

    return {
      width:  this.ws.w - pb - (this.isLandscape ? ft : 0),
      height: this.ws.h - pb - (this.isLandscape ? 0 : ft),
      padding:    px(this.padding),
      marginLeft: px(this.isLandscape ? ft : 0),
      ...style
    };
  }

  Footer = props =>
    <div style={{ // CSS var
      '--ft_w' : this.isLandscape ? px(this.footer.h) : '100%',  // width
      '--ft_h' : this.isLandscape ? '100%' : px(this.footer.h),  // height
      '--ft_p' : px(this.footer.padding),                        // padding
      '--ft_wm': this.isLandscape ? 'vertical-lr' : 'horizontal-tb', // write-mode
      '--ft_lh': px(this.footer.h)  // line-height
    }}>
      <div className="phantom" />
      <div className="footer">{props.children}</div>
    </div>;
}
