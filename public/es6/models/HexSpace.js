const SIDES=6;
const EQUITORIAL_SPACES=2;
class HexSpace {
  constructor(polePosition=0) {
    // const polePosition = sourceHexSpace ? sourceHexSpace.mPolePosition : 0;
    this.mPolePosition=polePosition;

    this.mBorders = [];
    // if (fromBorder) {
    //   this.mBorders[`${((fromBorder+2)%6)+1}`] = sourceHexSpace;
    // }
    // this.createBorders();
  }

  createBorders() {
    const nextPolePosition = this.mPolePosition+1;
    let hasAllBorders = true;
    for(let i = 0; hasAllBorders && i < SIDES; i++) {
      hasAllBorders = hasAllBorders && !!this.mBorders[i];
    }
    if (hasAllBorders || nextPolePosition > EQUITORIAL_SPACES) return;
    for(let i = 0; i < SIDES; i++) {
      this.setBorder(new HexSpace(nextPolePosition), i)
      // this.mBorders[`${i}`] = this.mBorders[`${i}`] || new HexSpace(nextPolePosition, i);
    }

    for(let i=0; i < SIDES; i++) {
      const prevHexIndex = (SIDES+i-1) % SIDES;
      const prevHex = this.mBorders[prevHexIndex];
      const currHex = this.mBorders[i];
      const prevBorderSide = (i+4)%SIDES;
      currHex.setBorder(prevHex, prevBorderSide);
    }

    this.mBorders.forEach(borderHex => {
      borderHex.createBorders();
    })
  }

  setBorder(hexSpace, side) {
    if (!this.mBorders[side]) {
      this.mBorders[side] = hexSpace;
      hexSpace.setBorder(this, (side+3)%6)
    }

  }
}