function m(){}const v=t=>t;function w(t,n){for(const e in n)t[e]=n[e];return t}function j(t){return t()}function A(){return Object.create(null)}function E(t){t.forEach(j)}function q(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let l;function C(t,n){return t===n?!0:(l||(l=document.createElement("a")),l.href=n,t===l.href)}function P(t){return Object.keys(t).length===0}function O(t,...n){if(t==null){for(const r of n)r(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(O(n,e))}function U(t,n,e,r){if(t){const o=x(t,n,e,r);return t[0](o)}}function x(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function G(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const a=[],_=Math.max(n.dirty.length,o.length);for(let u=0;u<_;u+=1)a[u]=n.dirty[u]|o[u];return a}return n.dirty|o}return n.dirty}function H(t,n,e,r,o,a){if(o){const _=x(n,e,r,a);t.p(_,o)}}function I(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function J(t){return t??""}function K(t){return t&&q(t.destroy)?t.destroy:m}function L(t){const n=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[t,"px"]}let f;function d(t){f=t}function y(){if(!f)throw new Error("Function called outside component initialization");return f}function N(t){y().$$.on_mount.push(t)}function Q(t){y().$$.after_update.push(t)}function R(t){y().$$.on_destroy.push(t)}const i=[],g=[];let c=[];const b=[],k=Promise.resolve();let p=!1;function z(){p||(p=!0,k.then(F))}function T(){return z(),k}function D(t){c.push(t)}const h=new Set;let s=0;function F(){if(s!==0)return;const t=f;do{try{for(;s<i.length;){const n=i[s];s++,d(n),M(n.$$)}}catch(n){throw i.length=0,s=0,n}for(d(null),i.length=0,s=0;g.length;)g.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];h.has(e)||(h.add(e),e())}c.length=0}while(i.length);for(;b.length;)b.pop()();p=!1,h.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(D)}}function V(t){const n=[],e=[];c.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),c=n}export{U as A,H as B,I as C,G as D,C as a,Q as b,S as c,g as d,K as e,D as f,v as g,A as h,q as i,F as j,P as k,V as l,f as m,m as n,N as o,d as p,j as q,E as r,B as s,T as t,i as u,z as v,L as w,w as x,R as y,J as z};
//# sourceMappingURL=scheduler.C6iVHy88.js.map
