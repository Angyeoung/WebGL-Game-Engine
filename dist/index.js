var t=class e{x;y;z;constructor(r,s,n){this.x=r,this.y=s,this.z=n}static get zero(){return new e(0,0,0)}add(r){return new e(this.x+r.x,this.y+r.y,this.z+r.z)}sub(r){return new e(this.x-r.x,this.y-r.y,this.z-r.z)}mul(r){return new e(this.x*r,this.y*r,this.z*r)}};console.log(t.zero.add(new t(1,1,1)));
//# sourceMappingURL=index.js.map
