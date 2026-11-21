const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-8IueizZF.js","./index-BDULilNq.js","./index-jV9Nx-rS.css","./index-C8KnCssF.js","./index-CFzkkllz.js","./index-DMPeYZwx.js","./index-yPCyiota.js","./index-CP1vT08V.js","./index-CsstVoCq.js"])))=>i.map(i=>d[i]);
import{c as ls,a as ie,r as Li,n as We,e as qe,u as Gn,h as pr,b as Fo,l as ti,s as Gr,t as Kh,w as Vr,p as Jh,_ as Te}from"./index-BDULilNq.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const na="160",Qh=0,Ta=1,tu=2,Rc=1,eu=2,kn=3,ai=0,Xe=1,Vn=2,si=0,ts=1,wa=2,Aa=3,Ra=4,Cc=5,yi=100,nu=101,iu=102,Ca=103,Oo=104,su=200,ru=201,ou=202,au=203,zo=204,Bo=205,lu=206,cu=207,hu=208,uu=209,fu=210,du=211,pu=212,mu=213,gu=214,_u=0,vu=1,Mu=2,Mr=3,yu=4,xu=5,Su=6,bu=7,Pc=0,Eu=1,Tu=2,ri=0,wu=1,Au=2,Ru=3,Cu=4,Pu=5,Lu=6,Lc=300,ss=301,rs=302,ko=303,Ho=304,Dr=306,Go=1e3,mn=1001,Vo=1002,Ge=1003,Pa=1004,Wr=1005,nn=1006,Du=1007,Ts=1008,oi=1009,Uu=1010,Iu=1011,ia=1012,Dc=1013,ei=1014,ni=1015,ws=1016,Uc=1017,Ic=1018,wi=1020,Nu=1021,gn=1023,Fu=1024,Ou=1025,Ai=1026,os=1027,zu=1028,Nc=1029,Bu=1030,Fc=1031,Oc=1033,$r=33776,Xr=33777,qr=33778,Yr=33779,La=35840,Da=35841,Ua=35842,Ia=35843,zc=36196,Na=37492,Fa=37496,Oa=37808,za=37809,Ba=37810,ka=37811,Ha=37812,Ga=37813,Va=37814,Wa=37815,$a=37816,Xa=37817,qa=37818,Ya=37819,ja=37820,Za=37821,jr=36492,Ka=36494,Ja=36495,ku=36283,Qa=36284,tl=36285,el=36286,Bc=3e3,Ri=3001,Hu=3200,Gu=3201,Vu=0,Wu=1,rn="",Pe="srgb",Pn="srgb-linear",sa="display-p3",Ur="display-p3-linear",yr="linear",fe="srgb",xr="rec709",Sr="p3",Ui=7680,nl=519,$u=512,Xu=513,qu=514,kc=515,Yu=516,ju=517,Zu=518,Ku=519,Wo=35044,il=35048,sl="300 es",$o=1035,$n=2e3,br=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const xs=Math.PI/180,As=180/Math.PI;function qn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]).toLowerCase()}function Ne(n,t,e){return Math.max(t,Math.min(e,n))}function ra(n,t){return(n%t+t)%t}function Ju(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Qu(n,t,e){return n!==t?(e-n)/(t-n):0}function Ss(n,t,e){return(1-e)*n+e*t}function tf(n,t,e,i){return Ss(n,t,1-Math.exp(-e*i))}function ef(n,t=1){return t-Math.abs(ra(n,t*2)-t)}function nf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function sf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function rf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function of(n,t){return n+Math.random()*(t-n)}function af(n){return n*(.5-Math.random())}function lf(n){n!==void 0&&(rl=n);let t=rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cf(n){return n*xs}function hf(n){return n*As}function Xo(n){return(n&n-1)===0&&n!==0}function uf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Er(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ff(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*u,l*f,a*c);break;case"YZY":n.set(l*f,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*f,a*h,a*c);break;case"XZX":n.set(a*h,l*_,l*d,a*c);break;case"YXY":n.set(l*d,a*h,l*_,a*c);break;case"ZYZ":n.set(l*_,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const df={DEG2RAD:xs,RAD2DEG:As,generateUUID:qn,clamp:Ne,euclideanModulo:ra,mapLinear:Ju,inverseLerp:Qu,lerp:Ss,damp:tf,pingpong:ef,smoothstep:nf,smootherstep:sf,randInt:rf,randFloat:of,randFloatSpread:af,seededRandom:lf,degToRad:cf,radToDeg:hf,isPowerOfTwo:Xo,ceilPowerOfTwo:uf,floorPowerOfTwo:Er,setQuaternionFromProperEuler:ff,normalize:re,denormalize:wn};class se{constructor(t=0,e=0){se.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,i,s,r,o,a,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],_=i[8],g=s[0],p=s[3],m=s[6],M=s[1],v=s[4],E=s[7],C=s[2],S=s[5],w=s[8];return r[0]=o*g+a*M+l*C,r[3]=o*p+a*v+l*S,r[6]=o*m+a*E+l*w,r[1]=c*g+h*M+u*C,r[4]=c*p+h*v+u*S,r[7]=c*m+h*E+u*w,r[2]=f*g+d*M+_*C,r[5]=f*p+d*v+_*S,r[8]=f*m+d*E+_*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,_=e*u+i*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(s*c-h*i)*g,t[2]=(a*i-s*o)*g,t[3]=f*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-a*e)*g,t[6]=d*g,t[7]=(i*l-c*e)*g,t[8]=(o*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Zr.makeScale(t,e)),this}rotate(t){return this.premultiply(Zr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Zr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new Zt;function Hc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Tr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function pf(){const n=Tr("canvas");return n.style.display="block",n}const ol={};function bs(n){n in ol||(ol[n]=!0,console.warn(n))}const al=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ll=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ns={[Pn]:{transfer:yr,primaries:xr,toReference:n=>n,fromReference:n=>n},[Pe]:{transfer:fe,primaries:xr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ur]:{transfer:yr,primaries:Sr,toReference:n=>n.applyMatrix3(ll),fromReference:n=>n.applyMatrix3(al)},[sa]:{transfer:fe,primaries:Sr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ll),fromReference:n=>n.applyMatrix3(al).convertLinearToSRGB()}},mf=new Set([Pn,Ur]),oe={enabled:!0,_workingColorSpace:Pn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!mf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Ns[t].toReference,s=Ns[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Ns[n].primaries},getTransfer:function(n){return n===rn?yr:Ns[n].transfer}};function es(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Kr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class Gc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=Tr("canvas")),Ii.width=t.width,Ii.height=t.height;const i=Ii.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=es(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(es(e[i]/255)*255):e[i]=es(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gf=0;class Vc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=qn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Jr(s[o].image)):r.push(Jr(s[o]))}else r=Jr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Jr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _f=0;class Ke extends cs{constructor(t=Ke.DEFAULT_IMAGE,e=Ke.DEFAULT_MAPPING,i=mn,s=mn,r=nn,o=Ts,a=gn,l=oi,c=Ke.DEFAULT_ANISOTROPY,h=rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=qn(),this.name="",this.source=new Vc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(bs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ri?Pe:rn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Go:t.x=t.x-Math.floor(t.x);break;case mn:t.x=t.x<0?0:1;break;case Vo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Go:t.y=t.y-Math.floor(t.y);break;case mn:t.y=t.y<0?0:1;break;case Vo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return bs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pe?Ri:Bc}set encoding(t){bs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Ri?Pe:rn}}Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Lc;Ke.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,E=(d+1)/2,C=(m+1)/2,S=(h+f)/4,w=(u+g)/4,B=(_+p)/4;return v>E&&v>C?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=S/i,r=w/i):E>C?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=S/s,r=B/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=w/r,s=B/r),this.set(i,s,r,e),this}let M=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-_)/M,this.y=(u-g)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vf extends cs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:1};i.encoding!==void 0&&(bs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ri?Pe:rn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Ke(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Vc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends vf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Wc extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mf extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[o+0],d=r[o+1],_=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==f||c!==d||h!==_){let p=1-a;const m=l*f+c*d+h*_+u*g,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const C=Math.sqrt(v),S=Math.atan2(C,m*M);p=Math.sin(p*S)/C,a=Math.sin(a*S)/C}const E=a*M;if(l=l*p+f*E,c=c*p+d*E,h=h*p+_*E,u=u*p+g*E,p===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],_=r[o+3];return t[e]=a*_+h*u+l*d-c*f,t[e+1]=l*_+h*f+c*u-a*d,t[e+2]=c*_+h*d+a*f-l*u,t[e+3]=h*_-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),f=l(i/2),d=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*_,this._y=c*d*u-f*h*_,this._z=c*h*_+f*d*u,this._w=c*h*u-f*d*_;break;case"YXZ":this._x=f*h*u+c*d*_,this._y=c*d*u-f*h*_,this._z=c*h*_-f*d*u,this._w=c*h*u+f*d*_;break;case"ZXY":this._x=f*h*u-c*d*_,this._y=c*d*u+f*h*_,this._z=c*h*_+f*d*u,this._w=c*h*u-f*d*_;break;case"ZYX":this._x=f*h*u-c*d*_,this._y=c*d*u+f*h*_,this._z=c*h*_-f*d*u,this._w=c*h*u+f*d*_;break;case"YZX":this._x=f*h*u+c*d*_,this._y=c*d*u+f*h*_,this._z=c*h*_-f*d*u,this._w=c*h*u-f*d*_;break;case"XZY":this._x=f*h*u-c*d*_,this._y=c*d*u-f*h*_,this._z=c*h*_+f*d*u,this._w=c*h*u+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,i=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Qr.copy(this).projectOnVector(t),this.sub(Qr)}reflect(t){return this.sub(Qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new H,cl=new hs;class ci{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fs.copy(i.boundingBox)),Fs.applyMatrix4(t.matrixWorld),this.union(Fs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),Os.subVectors(this.max,ds),Ni.subVectors(t.a,ds),Fi.subVectors(t.b,ds),Oi.subVectors(t.c,ds),jn.subVectors(Fi,Ni),Zn.subVectors(Oi,Fi),fi.subVectors(Ni,Oi);let e=[0,-jn.z,jn.y,0,-Zn.z,Zn.y,0,-fi.z,fi.y,jn.z,0,-jn.x,Zn.z,0,-Zn.x,fi.z,0,-fi.x,-jn.y,jn.x,0,-Zn.y,Zn.x,0,-fi.y,fi.x,0];return!to(e,Ni,Fi,Oi,Os)||(e=[1,0,0,0,1,0,0,0,1],!to(e,Ni,Fi,Oi,Os))?!1:(zs.crossVectors(jn,Zn),e=[zs.x,zs.y,zs.z],to(e,Ni,Fi,Oi,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const In=[new H,new H,new H,new H,new H,new H,new H,new H],cn=new H,Fs=new ci,Ni=new H,Fi=new H,Oi=new H,jn=new H,Zn=new H,fi=new H,ds=new H,Os=new H,zs=new H,di=new H;function to(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){di.fromArray(n,r);const a=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=i.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const yf=new ci,ps=new H,eo=new H;class Ps{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):yf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ps,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(eo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(eo)),this.expandByPoint(ps.copy(t.center).sub(eo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Nn=new H,no=new H,Bs=new H,Kn=new H,io=new H,ks=new H,so=new H;class xf{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){no.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(no);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Bs),a=Kn.dot(this.direction),l=-Kn.dot(Bs),c=Kn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,_;if(h>0)if(u=o*l-a,f=o*a-l,_=r*h,u>=0)if(f>=-_)if(f<=_){const g=1/h;u*=g,f*=g,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-_?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=_?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(no).addScaledVector(Bs,f),d}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const i=Nn.dot(this.direction),s=Nn.dot(Nn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,i,s,r){io.subVectors(e,t),ks.subVectors(i,t),so.crossVectors(io,ks);let o=this.direction.dot(so),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,t);const l=a*this.direction.dot(ks.crossVectors(Kn,ks));if(l<0)return null;const c=a*this.direction.dot(io.cross(Kn));if(c<0||l+c>o)return null;const h=-a*Kn.dot(so);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class we{constructor(t,e,i,s,r,o,a,l,c,h,u,f,d,_,g,p){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,f,d,_,g,p)}set(t,e,i,s,r,o,a,l,c,h,u,f,d,_,g,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),o=1/zi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+_*c,e[5]=f-g*c,e[9]=-a*l,e[2]=g-f*c,e[6]=_+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,_=c*h,g=c*u;e[0]=f+g*a,e[4]=_*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-_,e[6]=g+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,_=c*h,g=c*u;e[0]=f-g*a,e[4]=-o*u,e[8]=_+d*a,e[1]=d+_*a,e[5]=o*h,e[9]=g-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=_*c-d,e[8]=f*c+g,e[1]=l*u,e[5]=g*c+f,e[9]=d*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-f*u,e[8]=_*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+_,e[10]=f-g*u}else if(t.order==="XZY"){const f=o*l,d=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+g,e[5]=o*h,e[9]=d*u-_,e[2]=_*u-d,e[6]=a*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sf,t,bf)}lookAt(t,e,i){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Jn.crossVectors(i,je),Jn.lengthSq()===0&&(Math.abs(i.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Jn.crossVectors(i,je)),Jn.normalize(),Hs.crossVectors(je,Jn),s[0]=Jn.x,s[4]=Hs.x,s[8]=je.x,s[1]=Jn.y,s[5]=Hs.y,s[9]=je.y,s[2]=Jn.z,s[6]=Hs.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],_=i[2],g=i[6],p=i[10],m=i[14],M=i[3],v=i[7],E=i[11],C=i[15],S=s[0],w=s[4],B=s[8],y=s[12],T=s[1],z=s[5],Q=s[9],tt=s[13],L=s[2],N=s[6],I=s[10],V=s[14],D=s[3],O=s[7],q=s[11],it=s[15];return r[0]=o*S+a*T+l*L+c*D,r[4]=o*w+a*z+l*N+c*O,r[8]=o*B+a*Q+l*I+c*q,r[12]=o*y+a*tt+l*V+c*it,r[1]=h*S+u*T+f*L+d*D,r[5]=h*w+u*z+f*N+d*O,r[9]=h*B+u*Q+f*I+d*q,r[13]=h*y+u*tt+f*V+d*it,r[2]=_*S+g*T+p*L+m*D,r[6]=_*w+g*z+p*N+m*O,r[10]=_*B+g*Q+p*I+m*q,r[14]=_*y+g*tt+p*V+m*it,r[3]=M*S+v*T+E*L+C*D,r[7]=M*w+v*z+E*N+C*O,r[11]=M*B+v*Q+E*I+C*q,r[15]=M*y+v*tt+E*V+C*it,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],_=t[3],g=t[7],p=t[11],m=t[15];return _*(+r*l*u-s*c*u-r*a*f+i*c*f+s*a*d-i*l*d)+g*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+p*(+e*c*u-e*a*d-r*o*u+i*o*d+r*a*h-i*c*h)+m*(-s*a*h-e*l*u+e*a*f+s*o*u-i*o*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],_=t[12],g=t[13],p=t[14],m=t[15],M=u*p*c-g*f*c+g*l*d-a*p*d-u*l*m+a*f*m,v=_*f*c-h*p*c-_*l*d+o*p*d+h*l*m-o*f*m,E=h*g*c-_*u*c+_*a*d-o*g*d-h*a*m+o*u*m,C=_*u*l-h*g*l-_*a*f+o*g*f+h*a*p-o*u*p,S=e*M+i*v+s*E+r*C;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return t[0]=M*w,t[1]=(g*f*r-u*p*r-g*s*d+i*p*d+u*s*m-i*f*m)*w,t[2]=(a*p*r-g*l*r+g*s*c-i*p*c-a*s*m+i*l*m)*w,t[3]=(u*l*r-a*f*r-u*s*c+i*f*c+a*s*d-i*l*d)*w,t[4]=v*w,t[5]=(h*p*r-_*f*r+_*s*d-e*p*d-h*s*m+e*f*m)*w,t[6]=(_*l*r-o*p*r-_*s*c+e*p*c+o*s*m-e*l*m)*w,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*d+e*l*d)*w,t[8]=E*w,t[9]=(_*u*r-h*g*r-_*i*d+e*g*d+h*i*m-e*u*m)*w,t[10]=(o*g*r-_*a*r+_*i*c-e*g*c-o*i*m+e*a*m)*w,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*d-e*a*d)*w,t[12]=C*w,t[13]=(h*g*s-_*u*s+_*i*f-e*g*f-h*i*p+e*u*p)*w,t[14]=(_*a*s-o*g*s-_*i*l+e*g*l+o*i*p-e*a*p)*w,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*f+e*a*f)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,_=r*u,g=o*h,p=o*u,m=a*u,M=l*c,v=l*h,E=l*u,C=i.x,S=i.y,w=i.z;return s[0]=(1-(g+m))*C,s[1]=(d+E)*C,s[2]=(_-v)*C,s[3]=0,s[4]=(d-E)*S,s[5]=(1-(f+m))*S,s[6]=(p+M)*S,s[7]=0,s[8]=(_+v)*w,s[9]=(p-M)*w,s[10]=(1-(f+g))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=zi.set(s[0],s[1],s[2]).length();const o=zi.set(s[4],s[5],s[6]).length(),a=zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const c=1/r,h=1/o,u=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=$n){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let d,_;if(a===$n)d=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===br)d=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=$n){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*c,d=(i+s)*h;let _,g;if(a===$n)_=(o+r)*u,g=-2*u;else if(a===br)_=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const zi=new H,hn=new we,Sf=new H(0,0,0),bf=new H(1,1,1),Jn=new H,Hs=new H,je=new H,hl=new we,ul=new hs;class Ls{constructor(t=0,e=0,i=0,s=Ls.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ul.setFromEuler(this),this.setFromQuaternion(ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ls.DEFAULT_ORDER="XYZ";class $c{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ef=0;const fl=new H,Bi=new hs,Fn=new we,Gs=new H,ms=new H,Tf=new H,wf=new hs,dl=new H(1,0,0),pl=new H(0,1,0),ml=new H(0,0,1),Af={type:"added"},Rf={type:"removed"};class Je extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Je.DEFAULT_UP.clone();const t=new H,e=new Ls,i=new hs,s=new H(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new Zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=Je.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $c,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(dl,t)}rotateY(t){return this.rotateOnAxis(pl,t)}rotateZ(t){return this.rotateOnAxis(ml,t)}translateOnAxis(t,e){return fl.copy(t).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dl,t)}translateY(t){return this.translateOnAxis(pl,t)}translateZ(t){return this.translateOnAxis(ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Gs.copy(t):Gs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(ms,Gs,this.up):Fn.lookAt(Gs,ms,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Af)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,wf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++){const r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Je.DEFAULT_UP=new H(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new H,On=new H,ro=new H,zn=new H,ki=new H,Hi=new H,gl=new H,oo=new H,ao=new H,lo=new H;let Vs=!1;class pn{constructor(t=new H,e=new H,i=new H){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){un.subVectors(s,e),On.subVectors(i,e),ro.subVectors(t,e);const o=un.dot(un),a=un.dot(On),l=un.dot(ro),c=On.dot(On),h=On.dot(ro),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,_=(o*h-a*l)*f;return r.set(1-d-_,_,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getUV(t,e,i,s,r,o,a,l){return Vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vs=!0),this.getInterpolation(t,e,i,s,r,o,a,l)}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static isFrontFacing(t,e,i,s){return un.subVectors(i,e),On.subVectors(t,e),un.cross(On).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),On.subVectors(this.a,this.b),un.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return pn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return pn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return Vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vs=!0),pn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return pn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return pn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return pn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ki.subVectors(s,i),Hi.subVectors(r,i),oo.subVectors(t,i);const l=ki.dot(oo),c=Hi.dot(oo);if(l<=0&&c<=0)return e.copy(i);ao.subVectors(t,s);const h=ki.dot(ao),u=Hi.dot(ao);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ki,o);lo.subVectors(t,r);const d=ki.dot(lo),_=Hi.dot(lo);if(_>=0&&d<=_)return e.copy(r);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(Hi,a);const p=h*_-d*u;if(p<=0&&u-h>=0&&d-_>=0)return gl.subVectors(r,s),a=(u-h)/(u-h+(d-_)),e.copy(s).addScaledVector(gl,a);const m=1/(p+g+f);return o=g*m,a=f*m,e.copy(i).addScaledVector(ki,o).addScaledVector(Hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function co(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ne{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=ra(t,1),e=Ne(e,0,1),i=Ne(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=co(o,r,t+1/3),this.g=co(o,r,t),this.b=co(o,r,t-1/3)}return oe.toWorkingColorSpace(this,s),this}setStyle(t,e=Pe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const i=Xc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=Kr(t.r),this.g=Kr(t.g),this.b=Kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return oe.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ne(Ue.r*255,0,255))*65536+Math.round(Ne(Ue.g*255,0,255))*256+Math.round(Ne(Ue.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(Ue.copy(this),e);const i=Ue.r,s=Ue.g,r=Ue.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Pe){oe.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,i=Ue.g,s=Ue.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(Ws);const i=Ss(Qn.h,Ws.h,e),s=Ss(Qn.s,Ws.s,e),r=Ss(Qn.l,Ws.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new ne;ne.NAMES=Xc;let Cf=0;class Ir extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=ts,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Bo,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zo&&(i.blendSrc=this.blendSrc),this.blendDst!==Bo&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class qc extends Ir{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new H,$s=new se;class _n{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Wo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wo&&(t.usage=this.usage),t}}class Yc extends _n{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class jc extends _n{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Cn extends _n{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Pf=0;const en=new we,ho=new Je,Gi=new H,Ze=new ci,gs=new ci,Ee=new H;class Yn extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hc(t)?jc:Yc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,i){return en.makeTranslation(t,e,i),this.applyMatrix4(en),this}scale(t,e,i){return en.makeScale(t,e,i),this.applyMatrix4(en),this}lookAt(t){return ho.lookAt(t),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Cn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){const i=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(Ze.min,gs.min),Ze.expandByPoint(Ee),Ee.addVectors(Ze.max,gs.max),Ze.expandByPoint(Ee)):(Ze.expandByPoint(gs.min),Ze.expandByPoint(gs.max))}Ze.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ee.fromBufferAttribute(a,c),l&&(Gi.fromBufferAttribute(t,c),Ee.add(Gi)),s=Math.max(s,i.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<a;T++)c[T]=new H,h[T]=new H;const u=new H,f=new H,d=new H,_=new se,g=new se,p=new se,m=new H,M=new H;function v(T,z,Q){u.fromArray(s,T*3),f.fromArray(s,z*3),d.fromArray(s,Q*3),_.fromArray(o,T*2),g.fromArray(o,z*2),p.fromArray(o,Q*2),f.sub(u),d.sub(u),g.sub(_),p.sub(_);const tt=1/(g.x*p.y-p.x*g.y);isFinite(tt)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-g.y).multiplyScalar(tt),M.copy(d).multiplyScalar(g.x).addScaledVector(f,-p.x).multiplyScalar(tt),c[T].add(m),c[z].add(m),c[Q].add(m),h[T].add(M),h[z].add(M),h[Q].add(M))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let T=0,z=E.length;T<z;++T){const Q=E[T],tt=Q.start,L=Q.count;for(let N=tt,I=tt+L;N<I;N+=3)v(i[N+0],i[N+1],i[N+2])}const C=new H,S=new H,w=new H,B=new H;function y(T){w.fromArray(r,T*3),B.copy(w);const z=c[T];C.copy(z),C.sub(w.multiplyScalar(w.dot(z))).normalize(),S.crossVectors(B,z);const tt=S.dot(h[T])<0?-1:1;l[T*4]=C.x,l[T*4+1]=C.y,l[T*4+2]=C.z,l[T*4+3]=tt}for(let T=0,z=E.length;T<z;++T){const Q=E[T],tt=Q.start,L=Q.count;for(let N=tt,I=tt+L;N<I;N+=3)y(i[N+0]),y(i[N+1]),y(i[N+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new H,r=new H,o=new H,a=new H,l=new H,c=new H,h=new H,u=new H;if(t)for(let f=0,d=t.count;f<d;f+=3){const _=t.getX(f+0),g=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,p),a.add(h),l.add(h),c.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*h;for(let m=0;m<h;m++)f[_++]=c[d++]}return new _n(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Yn,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new we,pi=new xf,Xs=new Ps,vl=new H,Vi=new H,Wi=new H,$i=new H,uo=new H,qs=new H,Ys=new se,js=new se,Zs=new se,Ml=new H,yl=new H,xl=new H,Ks=new H,Js=new H;class Xn extends Je{constructor(t=new Yn,e=new qc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(uo.fromBufferAttribute(u,t),o?qs.addScaledVector(uo,h):qs.addScaledVector(uo.sub(e),h))}e.add(qs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xs.copy(i.boundingSphere),Xs.applyMatrix4(r),pi.copy(t.ray).recast(t.near),!(Xs.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Xs,vl)===null||pi.origin.distanceToSquared(vl)>(t.far-t.near)**2))&&(_l.copy(r).invert(),pi.copy(t.ray).applyMatrix4(_l),!(i.boundingBox!==null&&pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,pi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=o[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let E=M,C=v;E<C;E+=3){const S=a.getX(E),w=a.getX(E+1),B=a.getX(E+2);s=Qs(this,m,t,i,c,h,u,S,w,B),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let p=_,m=g;p<m;p+=3){const M=a.getX(p),v=a.getX(p+1),E=a.getX(p+2);s=Qs(this,o,t,i,c,h,u,M,v,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const p=f[_],m=o[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let E=M,C=v;E<C;E+=3){const S=E,w=E+1,B=E+2;s=Qs(this,m,t,i,c,h,u,S,w,B),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let p=_,m=g;p<m;p+=3){const M=p,v=p+1,E=p+2;s=Qs(this,o,t,i,c,h,u,M,v,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Lf(n,t,e,i,s,r,o,a){let l;if(t.side===Xe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ai,a),l===null)return null;Js.copy(a),Js.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Js);return c<e.near||c>e.far?null:{distance:c,point:Js.clone(),object:n}}function Qs(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Vi),n.getVertexPosition(l,Wi),n.getVertexPosition(c,$i);const h=Lf(n,t,e,i,Vi,Wi,$i,Ks);if(h){s&&(Ys.fromBufferAttribute(s,a),js.fromBufferAttribute(s,l),Zs.fromBufferAttribute(s,c),h.uv=pn.getInterpolation(Ks,Vi,Wi,$i,Ys,js,Zs,new se)),r&&(Ys.fromBufferAttribute(r,a),js.fromBufferAttribute(r,l),Zs.fromBufferAttribute(r,c),h.uv1=pn.getInterpolation(Ks,Vi,Wi,$i,Ys,js,Zs,new se),h.uv2=h.uv1),o&&(Ml.fromBufferAttribute(o,a),yl.fromBufferAttribute(o,l),xl.fromBufferAttribute(o,c),h.normal=pn.getInterpolation(Ks,Vi,Wi,$i,Ml,yl,xl,new H),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new H,materialIndex:0};pn.getNormal(Vi,Wi,$i,u.normal),h.face=u}return h}class Ds extends Yn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Cn(c,3)),this.setAttribute("normal",new Cn(h,3)),this.setAttribute("uv",new Cn(u,2));function _(g,p,m,M,v,E,C,S,w,B,y){const T=E/w,z=C/B,Q=E/2,tt=C/2,L=S/2,N=w+1,I=B+1;let V=0,D=0;const O=new H;for(let q=0;q<I;q++){const it=q*z-tt;for(let ot=0;ot<N;ot++){const W=ot*T-Q;O[g]=W*M,O[p]=it*v,O[m]=L,c.push(O.x,O.y,O.z),O[g]=0,O[p]=0,O[m]=S>0?1:-1,h.push(O.x,O.y,O.z),u.push(ot/w),u.push(1-q/B),V+=1}}for(let q=0;q<B;q++)for(let it=0;it<w;it++){const ot=f+it+N*q,W=f+it+N*(q+1),st=f+(it+1)+N*(q+1),ut=f+(it+1)+N*q;l.push(ot,W,ut),l.push(W,st,ut),D+=6}a.addGroup(d,D,y),d+=D,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ds(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ke(n){const t={};for(let e=0;e<n.length;e++){const i=as(n[e]);for(const s in i)t[s]=i[s]}return t}function Df(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Zc(n){return n.getRenderTarget()===null?n.outputColorSpace:oe.workingColorSpace}const oa={clone:as,merge:ke};var Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends Ir{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=Df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Kc extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class sn extends Kc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=As*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return As*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Xi=-90,qi=1;class Nf extends Je{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(Xi,qi,t,e);s.layers=this.layers,this.add(s);const r=new sn(Xi,qi,t,e);r.layers=this.layers,this.add(r);const o=new sn(Xi,qi,t,e);o.layers=this.layers,this.add(o);const a=new sn(Xi,qi,t,e);a.layers=this.layers,this.add(a);const l=new sn(Xi,qi,t,e);l.layers=this.layers,this.add(l);const c=new sn(Xi,qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===$n)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===br)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Jc extends Ke{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ss,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ff extends Pi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(bs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ri?Pe:rn),this.texture=new Jc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ds(5,5,5),r=new li({name:"CubemapFromEquirect",uniforms:as(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:si});r.uniforms.tEquirect.value=e;const o=new Xn(s,r),a=e.minFilter;return e.minFilter===Ts&&(e.minFilter=nn),new Nf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const fo=new H,Of=new H,zf=new Zt;class _i{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=fo.subVectors(i,e).cross(Of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||zf.getNormalMatrix(t),s=this.coplanarPoint(fo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new Ps,tr=new H;class Qc{constructor(t=new _i,e=new _i,i=new _i,s=new _i,r=new _i,o=new _i){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=$n){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],_=s[9],g=s[10],p=s[11],m=s[12],M=s[13],v=s[14],E=s[15];if(i[0].setComponents(l-r,f-c,p-d,E-m).normalize(),i[1].setComponents(l+r,f+c,p+d,E+m).normalize(),i[2].setComponents(l+o,f+h,p+_,E+M).normalize(),i[3].setComponents(l-o,f-h,p-_,E-M).normalize(),i[4].setComponents(l-a,f-u,p-g,E-v).normalize(),e===$n)i[5].setComponents(l+a,f+u,p+g,E+v).normalize();else if(e===br)i[5].setComponents(a,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(t){return mi.center.set(0,0,0),mi.radius=.7071067811865476,mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(tr.x=s.normal.x>0?t.max.x:t.min.x,tr.y=s.normal.y>0?t.max.y:t.min.y,tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function th(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Bf(n,t){const e=t.isWebGL2,i=new WeakMap;function s(c,h){const u=c.array,f=c.usage,d=u.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,u,f),c.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,h,u){const f=h.array,d=h._updateRange,_=h.updateRanges;if(n.bindBuffer(u,c),d.count===-1&&_.length===0&&n.bufferSubData(u,0,f),_.length!==0){for(let g=0,p=_.length;g<p;g++){const m=_[g];e?n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}d.count!==-1&&(e?n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class aa extends Yn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],_=[],g=[],p=[];for(let m=0;m<h;m++){const M=m*f-o;for(let v=0;v<c;v++){const E=v*u-r;_.push(E,-M,0),g.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){const v=M+c*m,E=M+c*(m+1),C=M+1+c*(m+1),S=M+1+c*m;d.push(v,E,S),d.push(E,C,S)}this.setIndex(d),this.setAttribute("position",new Cn(_,3)),this.setAttribute("normal",new Cn(g,3)),this.setAttribute("uv",new Cn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new aa(t.width,t.height,t.widthSegments,t.heightSegments)}}var kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,$f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,td=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ud=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",_d=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ed=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ld=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ud=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$d=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ep=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Up=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,om=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,am=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_m=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:kf,alphahash_pars_fragment:Hf,alphamap_fragment:Gf,alphamap_pars_fragment:Vf,alphatest_fragment:Wf,alphatest_pars_fragment:$f,aomap_fragment:Xf,aomap_pars_fragment:qf,batching_pars_vertex:Yf,batching_vertex:jf,begin_vertex:Zf,beginnormal_vertex:Kf,bsdfs:Jf,iridescence_fragment:Qf,bumpmap_pars_fragment:td,clipping_planes_fragment:ed,clipping_planes_pars_fragment:nd,clipping_planes_pars_vertex:id,clipping_planes_vertex:sd,color_fragment:rd,color_pars_fragment:od,color_pars_vertex:ad,color_vertex:ld,common:cd,cube_uv_reflection_fragment:hd,defaultnormal_vertex:ud,displacementmap_pars_vertex:fd,displacementmap_vertex:dd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:gd,colorspace_pars_fragment:_d,envmap_fragment:vd,envmap_common_pars_fragment:Md,envmap_pars_fragment:yd,envmap_pars_vertex:xd,envmap_physical_pars_fragment:Ud,envmap_vertex:Sd,fog_vertex:bd,fog_pars_vertex:Ed,fog_fragment:Td,fog_pars_fragment:wd,gradientmap_pars_fragment:Ad,lightmap_fragment:Rd,lightmap_pars_fragment:Cd,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Ld,lights_pars_begin:Dd,lights_toon_fragment:Id,lights_toon_pars_fragment:Nd,lights_phong_fragment:Fd,lights_phong_pars_fragment:Od,lights_physical_fragment:zd,lights_physical_pars_fragment:Bd,lights_fragment_begin:kd,lights_fragment_maps:Hd,lights_fragment_end:Gd,logdepthbuf_fragment:Vd,logdepthbuf_pars_fragment:Wd,logdepthbuf_pars_vertex:$d,logdepthbuf_vertex:Xd,map_fragment:qd,map_pars_fragment:Yd,map_particle_fragment:jd,map_particle_pars_fragment:Zd,metalnessmap_fragment:Kd,metalnessmap_pars_fragment:Jd,morphcolor_vertex:Qd,morphnormal_vertex:tp,morphtarget_pars_vertex:ep,morphtarget_vertex:np,normal_fragment_begin:ip,normal_fragment_maps:sp,normal_pars_fragment:rp,normal_pars_vertex:op,normal_vertex:ap,normalmap_pars_fragment:lp,clearcoat_normal_fragment_begin:cp,clearcoat_normal_fragment_maps:hp,clearcoat_pars_fragment:up,iridescence_pars_fragment:fp,opaque_fragment:dp,packing:pp,premultiplied_alpha_fragment:mp,project_vertex:gp,dithering_fragment:_p,dithering_pars_fragment:vp,roughnessmap_fragment:Mp,roughnessmap_pars_fragment:yp,shadowmap_pars_fragment:xp,shadowmap_pars_vertex:Sp,shadowmap_vertex:bp,shadowmask_pars_fragment:Ep,skinbase_vertex:Tp,skinning_pars_vertex:wp,skinning_vertex:Ap,skinnormal_vertex:Rp,specularmap_fragment:Cp,specularmap_pars_fragment:Pp,tonemapping_fragment:Lp,tonemapping_pars_fragment:Dp,transmission_fragment:Up,transmission_pars_fragment:Ip,uv_pars_fragment:Np,uv_pars_vertex:Fp,uv_vertex:Op,worldpos_vertex:zp,background_vert:Bp,background_frag:kp,backgroundCube_vert:Hp,backgroundCube_frag:Gp,cube_vert:Vp,cube_frag:Wp,depth_vert:$p,depth_frag:Xp,distanceRGBA_vert:qp,distanceRGBA_frag:Yp,equirect_vert:jp,equirect_frag:Zp,linedashed_vert:Kp,linedashed_frag:Jp,meshbasic_vert:Qp,meshbasic_frag:tm,meshlambert_vert:em,meshlambert_frag:nm,meshmatcap_vert:im,meshmatcap_frag:sm,meshnormal_vert:rm,meshnormal_frag:om,meshphong_vert:am,meshphong_frag:lm,meshphysical_vert:cm,meshphysical_frag:hm,meshtoon_vert:um,meshtoon_frag:fm,points_vert:dm,points_frag:pm,shadow_vert:mm,shadow_frag:gm,sprite_vert:_m,sprite_frag:vm},ft={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},$e={basic:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ne(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:ke([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:ke([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new ne(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:ke([ft.points,ft.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:ke([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:ke([ft.common,ft.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:ke([ft.sprite,ft.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:ke([ft.common,ft.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:ke([ft.lights,ft.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};$e.physical={uniforms:ke([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const er={r:0,b:0,g:0};function Mm(n,t,e,i,s,r,o){const a=new ne(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function _(p,m){let M=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?g(a,l):v&&v.isColor&&(g(v,1),M=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Dr)?(h===void 0&&(h=new Xn(new Ds(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:as($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=oe.getTransfer(v.colorSpace)!==fe,(u!==v||f!==v.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=n.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Xn(new aa(2,2),new li({name:"BackgroundMaterial",uniforms:as($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=oe.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,d=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function g(p,m){p.getRGB(er,Zc(n)),i.buffers.color.setClear(er.r,er.g,er.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(a,l)},render:_}}function ym(n,t,e,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=p(null);let c=l,h=!1;function u(L,N,I,V,D){let O=!1;if(o){const q=g(V,I,N);c!==q&&(c=q,d(c.object)),O=m(L,V,I,D),O&&M(L,V,I,D)}else{const q=N.wireframe===!0;(c.geometry!==V.id||c.program!==I.id||c.wireframe!==q)&&(c.geometry=V.id,c.program=I.id,c.wireframe=q,O=!0)}D!==null&&e.update(D,n.ELEMENT_ARRAY_BUFFER),(O||h)&&(h=!1,B(L,N,I,V),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function d(L){return i.isWebGL2?n.bindVertexArray(L):r.bindVertexArrayOES(L)}function _(L){return i.isWebGL2?n.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function g(L,N,I){const V=I.wireframe===!0;let D=a[L.id];D===void 0&&(D={},a[L.id]=D);let O=D[N.id];O===void 0&&(O={},D[N.id]=O);let q=O[V];return q===void 0&&(q=p(f()),O[V]=q),q}function p(L){const N=[],I=[],V=[];for(let D=0;D<s;D++)N[D]=0,I[D]=0,V[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:I,attributeDivisors:V,object:L,attributes:{},index:null}}function m(L,N,I,V){const D=c.attributes,O=N.attributes;let q=0;const it=I.getAttributes();for(const ot in it)if(it[ot].location>=0){const st=D[ot];let ut=O[ot];if(ut===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(ut=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(ut=L.instanceColor)),st===void 0||st.attribute!==ut||ut&&st.data!==ut.data)return!0;q++}return c.attributesNum!==q||c.index!==V}function M(L,N,I,V){const D={},O=N.attributes;let q=0;const it=I.getAttributes();for(const ot in it)if(it[ot].location>=0){let st=O[ot];st===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(st=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(st=L.instanceColor));const ut={};ut.attribute=st,st&&st.data&&(ut.data=st.data),D[ot]=ut,q++}c.attributes=D,c.attributesNum=q,c.index=V}function v(){const L=c.newAttributes;for(let N=0,I=L.length;N<I;N++)L[N]=0}function E(L){C(L,0)}function C(L,N){const I=c.newAttributes,V=c.enabledAttributes,D=c.attributeDivisors;I[L]=1,V[L]===0&&(n.enableVertexAttribArray(L),V[L]=1),D[L]!==N&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,N),D[L]=N)}function S(){const L=c.newAttributes,N=c.enabledAttributes;for(let I=0,V=N.length;I<V;I++)N[I]!==L[I]&&(n.disableVertexAttribArray(I),N[I]=0)}function w(L,N,I,V,D,O,q){q===!0?n.vertexAttribIPointer(L,N,I,D,O):n.vertexAttribPointer(L,N,I,V,D,O)}function B(L,N,I,V){if(i.isWebGL2===!1&&(L.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const D=V.attributes,O=I.getAttributes(),q=N.defaultAttributeValues;for(const it in O){const ot=O[it];if(ot.location>=0){let W=D[it];if(W===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(W=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(W=L.instanceColor)),W!==void 0){const st=W.normalized,ut=W.itemSize,G=e.get(W);if(G===void 0)continue;const $=G.buffer,Z=G.type,K=G.bytesPerElement,et=i.isWebGL2===!0&&(Z===n.INT||Z===n.UNSIGNED_INT||W.gpuType===Dc);if(W.isInterleavedBufferAttribute){const rt=W.data,F=rt.stride,wt=W.offset;if(rt.isInstancedInterleavedBuffer){for(let xt=0;xt<ot.locationSize;xt++)C(ot.location+xt,rt.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let xt=0;xt<ot.locationSize;xt++)E(ot.location+xt);n.bindBuffer(n.ARRAY_BUFFER,$);for(let xt=0;xt<ot.locationSize;xt++)w(ot.location+xt,ut/ot.locationSize,Z,st,F*K,(wt+ut/ot.locationSize*xt)*K,et)}else{if(W.isInstancedBufferAttribute){for(let rt=0;rt<ot.locationSize;rt++)C(ot.location+rt,W.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let rt=0;rt<ot.locationSize;rt++)E(ot.location+rt);n.bindBuffer(n.ARRAY_BUFFER,$);for(let rt=0;rt<ot.locationSize;rt++)w(ot.location+rt,ut/ot.locationSize,Z,st,ut*K,ut/ot.locationSize*rt*K,et)}}else if(q!==void 0){const st=q[it];if(st!==void 0)switch(st.length){case 2:n.vertexAttrib2fv(ot.location,st);break;case 3:n.vertexAttrib3fv(ot.location,st);break;case 4:n.vertexAttrib4fv(ot.location,st);break;default:n.vertexAttrib1fv(ot.location,st)}}}}S()}function y(){Q();for(const L in a){const N=a[L];for(const I in N){const V=N[I];for(const D in V)_(V[D].object),delete V[D];delete N[I]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;const N=a[L.id];for(const I in N){const V=N[I];for(const D in V)_(V[D].object),delete V[D];delete N[I]}delete a[L.id]}function z(L){for(const N in a){const I=a[N];if(I[L.id]===void 0)continue;const V=I[L.id];for(const D in V)_(V[D].object),delete V[D];delete I[L.id]}}function Q(){tt(),h=!0,c!==l&&(c=l,d(c.object))}function tt(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:Q,resetDefaultState:tt,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:E,disableUnusedAttributes:S}}function xm(n,t,e,i){const s=i.isWebGL2;let r;function o(h){r=h}function a(h,u){n.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,f){if(f===0)return;let d,_;if(s)d=n,_="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[_](r,h,u,f),e.update(u,r,f)}function c(h,u,f){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<f;_++)this.render(h[_],u[_]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];e.update(_,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Sm(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,E=o||t.has("OES_texture_float"),C=v&&E,S=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:C,maxSamples:S}}function bm(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new _i,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||_===null||_.length===0||r&&!p)r?h(null):c();else{const M=r?0:i,v=M*4;let E=m.clippingState||null;l.value=E,E=h(_,f,v,d);for(let C=0;C!==v;++C)E[C]=e[C];m.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=d+g*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,E=d;v!==g;++v,E+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Em(n){let t=new WeakMap;function e(o,a){return a===ko?o.mapping=ss:a===Ho&&(o.mapping=rs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ko||a===Ho)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ff(l.height/2);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Tm extends Kc{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,Sl=[.125,.215,.35,.446,.526,.582],xi=20,po=new Tm,bl=new ne;let mo=null,go=0,_o=0;const vi=(1+Math.sqrt(5))/2,Yi=1/vi,El=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,vi,Yi),new H(0,vi,-Yi),new H(Yi,0,vi),new H(-Yi,0,vi),new H(vi,Yi,0),new H(-vi,Yi,0)];class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){mo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),_o=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(mo,go,_o),t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ss||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),mo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),_o=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:ws,format:gn,colorSpace:Pn,depthBuffer:!1},s=wl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wm(r)),this._blurMaterial=Am(r,t,e)}return s}_compileMaterial(t){const e=new Xn(this._lodPlanes[0],t);this._renderer.compile(e,po)}_sceneToCubeUV(t,e,i,s){const a=new sn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(bl),h.toneMapping=ri,h.autoClear=!1;const d=new qc({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),_=new Xn(new Ds,d);let g=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,g=!0):(d.color.copy(bl),g=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):M===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;nr(s,M*v,m>2?v:0,v,v),h.setRenderTarget(s),g&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ss||t.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Al());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Xn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;nr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,po)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=El[(s-1)%El.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Xn(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*xi-1),g=r/_,p=isFinite(r)?1+Math.floor(h*g):xi;p>xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${xi}`);const m=[];let M=0;for(let w=0;w<xi;++w){const B=w/g,y=Math.exp(-B*B/2);m.push(y),w===0?M+=y:w<p&&(M+=2*y)}for(let w=0;w<m.length;w++)m[w]=m[w]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-i;const E=this._sizeLods[s],C=3*E*(s>v-Ki?s-v+Ki:0),S=4*(this._cubeSize-E);nr(e,C,S,3*E,2*E),l.setRenderTarget(e),l.render(u,po)}}function wm(n){const t=[],e=[],i=[];let s=n;const r=n-Ki+1+Sl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ki?l=Sl[o-n+Ki-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,_=6,g=3,p=2,m=1,M=new Float32Array(g*_*d),v=new Float32Array(p*_*d),E=new Float32Array(m*_*d);for(let S=0;S<d;S++){const w=S%3*2/3-1,B=S>2?0:-1,y=[w,B,0,w+2/3,B,0,w+2/3,B+1,0,w,B,0,w+2/3,B+1,0,w,B+1,0];M.set(y,g*_*S),v.set(f,p*_*S);const T=[S,S,S,S,S,S];E.set(T,m*_*S)}const C=new Yn;C.setAttribute("position",new _n(M,g)),C.setAttribute("uv",new _n(v,p)),C.setAttribute("faceIndex",new _n(E,m)),t.push(C),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function wl(n,t,e){const i=new Pi(n,t,e);return i.texture.mapping=Dr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Am(n,t,e){const i=new Float32Array(xi),s=new H(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Al(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Rl(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rm(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ko||l===Ho,h=l===ss||l===rs;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Tl(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Tl(n));const f=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Cm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Pm(n,t,e,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)t.remove(g[p])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const _ in f)t.update(f[_],n.ARRAY_BUFFER);const d=u.morphAttributes;for(const _ in d){const g=d[_];for(let p=0,m=g.length;p<m;p++)t.update(g[p],n.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,_=u.attributes.position;let g=0;if(d!==null){const M=d.array;g=d.version;for(let v=0,E=M.length;v<E;v+=3){const C=M[v+0],S=M[v+1],w=M[v+2];f.push(C,S,S,w,w,C)}}else if(_!==void 0){const M=_.array;g=_.version;for(let v=0,E=M.length/3-1;v<E;v+=3){const C=v+0,S=v+1,w=v+2;f.push(C,S,S,w,w,C)}}else return;const p=new(Hc(f)?jc:Yc)(f,1);p.version=g;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Lm(n,t,e,i){const s=i.isWebGL2;let r;function o(d){r=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function h(d,_){n.drawElements(r,_,a,d*l),e.update(_,r,1)}function u(d,_,g){if(g===0)return;let p,m;if(s)p=n,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,_,a,d*l,g),e.update(_,r,g)}function f(d,_,g){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<g;m++)this.render(d[m]/l,_[m]);else{p.multiDrawElementsWEBGL(r,_,0,a,d,0,g);let m=0;for(let M=0;M<g;M++)m+=_[M];e.update(m,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Dm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Um(n,t){return n[0]-t[0]}function Im(n,t){return Math.abs(t[1])-Math.abs(n[1])}function Nm(n,t,e){const i={},s=new Float32Array(8),r=new WeakMap,o=new ge,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(t.isWebGL2===!0){const d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=d!==void 0?d.length:0;let g=r.get(h);if(g===void 0||g.count!==_){let L=function(){Q.dispose(),r.delete(h),h.removeEventListener("dispose",L)};g!==void 0&&g.texture.dispose();const M=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let B=0;M===!0&&(B=1),v===!0&&(B=2),E===!0&&(B=3);let y=h.attributes.position.count*B,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const z=new Float32Array(y*T*4*_),Q=new Wc(z,y,T,_);Q.type=ni,Q.needsUpdate=!0;const tt=B*4;for(let N=0;N<_;N++){const I=C[N],V=S[N],D=w[N],O=y*T*4*N;for(let q=0;q<I.count;q++){const it=q*tt;M===!0&&(o.fromBufferAttribute(I,q),z[O+it+0]=o.x,z[O+it+1]=o.y,z[O+it+2]=o.z,z[O+it+3]=0),v===!0&&(o.fromBufferAttribute(V,q),z[O+it+4]=o.x,z[O+it+5]=o.y,z[O+it+6]=o.z,z[O+it+7]=0),E===!0&&(o.fromBufferAttribute(D,q),z[O+it+8]=o.x,z[O+it+9]=o.y,z[O+it+10]=o.z,z[O+it+11]=D.itemSize===4?o.w:1)}}g={count:_,texture:Q,size:new se(y,T)},r.set(h,g),h.addEventListener("dispose",L)}let p=0;for(let M=0;M<f.length;M++)p+=f[M];const m=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",m),u.getUniforms().setValue(n,"morphTargetInfluences",f),u.getUniforms().setValue(n,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const d=f===void 0?0:f.length;let _=i[h.id];if(_===void 0||_.length!==d){_=[];for(let v=0;v<d;v++)_[v]=[v,0];i[h.id]=_}for(let v=0;v<d;v++){const E=_[v];E[0]=v,E[1]=f[v]}_.sort(Im);for(let v=0;v<8;v++)v<d&&_[v][1]?(a[v][0]=_[v][0],a[v][1]=_[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Um);const g=h.morphAttributes.position,p=h.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const E=a[v],C=E[0],S=E[1];C!==Number.MAX_SAFE_INTEGER&&S?(g&&h.getAttribute("morphTarget"+v)!==g[C]&&h.setAttribute("morphTarget"+v,g[C]),p&&h.getAttribute("morphNormal"+v)!==p[C]&&h.setAttribute("morphNormal"+v,p[C]),s[v]=S,m+=S):(g&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}const M=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",M),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Fm(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class eh extends Ke{constructor(t,e,i,s,r,o,a,l,c,h){if(h=h!==void 0?h:Ai,h!==Ai&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ai&&(i=ei),i===void 0&&h===os&&(i=wi),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ge,this.minFilter=l!==void 0?l:Ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const nh=new Ke,ih=new eh(1,1);ih.compareFunction=kc;const sh=new Wc,rh=new Mf,oh=new Jc,Cl=[],Pl=[],Ll=new Float32Array(16),Dl=new Float32Array(9),Ul=new Float32Array(4);function us(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Cl[s];if(r===void 0&&(r=new Float32Array(s),Cl[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Nr(n,t){let e=Pl[t];e===void 0&&(e=new Int32Array(t),Pl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Om(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2fv(this.addr,t),ye(e,t)}}function Bm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;n.uniform3fv(this.addr,t),ye(e,t)}}function km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4fv(this.addr,t),ye(e,t)}}function Hm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Ul.set(i),n.uniformMatrix2fv(this.addr,!1,Ul),ye(e,i)}}function Gm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Dl.set(i),n.uniformMatrix3fv(this.addr,!1,Dl),ye(e,i)}}function Vm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Ll.set(i),n.uniformMatrix4fv(this.addr,!1,Ll),ye(e,i)}}function Wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function $m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2iv(this.addr,t),ye(e,t)}}function Xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3iv(this.addr,t),ye(e,t)}}function qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4iv(this.addr,t),ye(e,t)}}function Ym(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2uiv(this.addr,t),ye(e,t)}}function Zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3uiv(this.addr,t),ye(e,t)}}function Km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4uiv(this.addr,t),ye(e,t)}}function Jm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?ih:nh;e.setTexture2D(t||r,s)}function Qm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||rh,s)}function t0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||oh,s)}function e0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||sh,s)}function n0(n){switch(n){case 5126:return Om;case 35664:return zm;case 35665:return Bm;case 35666:return km;case 35674:return Hm;case 35675:return Gm;case 35676:return Vm;case 5124:case 35670:return Wm;case 35667:case 35671:return $m;case 35668:case 35672:return Xm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return jm;case 36295:return Zm;case 36296:return Km;case 35678:case 36198:case 36298:case 36306:case 35682:return Jm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return e0}}function i0(n,t){n.uniform1fv(this.addr,t)}function s0(n,t){const e=us(t,this.size,2);n.uniform2fv(this.addr,e)}function r0(n,t){const e=us(t,this.size,3);n.uniform3fv(this.addr,e)}function o0(n,t){const e=us(t,this.size,4);n.uniform4fv(this.addr,e)}function a0(n,t){const e=us(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function l0(n,t){const e=us(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function c0(n,t){const e=us(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function h0(n,t){n.uniform1iv(this.addr,t)}function u0(n,t){n.uniform2iv(this.addr,t)}function f0(n,t){n.uniform3iv(this.addr,t)}function d0(n,t){n.uniform4iv(this.addr,t)}function p0(n,t){n.uniform1uiv(this.addr,t)}function m0(n,t){n.uniform2uiv(this.addr,t)}function g0(n,t){n.uniform3uiv(this.addr,t)}function _0(n,t){n.uniform4uiv(this.addr,t)}function v0(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||nh,r[o])}function M0(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rh,r[o])}function y0(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||oh,r[o])}function x0(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sh,r[o])}function S0(n){switch(n){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return o0;case 35674:return a0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return f0;case 35669:case 35673:return d0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return M0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return x0}}class b0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=n0(e.type)}}class E0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=S0(e.type)}}class T0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const vo=/(\w+)(\])?(\[|\.)?/g;function Il(n,t){n.seq.push(t),n.map[t.id]=t}function w0(n,t,e){const i=n.name,s=i.length;for(vo.lastIndex=0;;){const r=vo.exec(i),o=vo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Il(e,c===void 0?new b0(a,n,t):new E0(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new T0(a),Il(e,u)),e=u}}}class mr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);w0(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Nl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const A0=37297;let R0=0;function C0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function P0(n){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(n);let i;switch(t===e?i="":t===Sr&&e===xr?i="LinearDisplayP3ToLinearSRGB":t===xr&&e===Sr&&(i="LinearSRGBToLinearDisplayP3"),n){case Pn:case Ur:return[i,"LinearTransferOETF"];case Pe:case sa:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Fl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+C0(n.getShaderSource(t),o)}else return s}function L0(n,t){const e=P0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function D0(n,t){let e;switch(t){case wu:e="Linear";break;case Au:e="Reinhard";break;case Ru:e="OptimizedCineon";break;case Cu:e="ACESFilmic";break;case Lu:e="AgX";break;case Pu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function U0(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function I0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function N0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function F0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ji(n){return n!==""}function Ol(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const O0=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(n){return n.replace(O0,B0)}const z0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function B0(n,t){let e=$t[t];if(e===void 0){const i=z0.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return qo(e)}const k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(n){return n.replace(k0,H0)}function H0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kl(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function G0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Rc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===eu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function V0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ss:case rs:t="ENVMAP_TYPE_CUBE";break;case Dr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function W0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case rs:t="ENVMAP_MODE_REFRACTION";break}return t}function $0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Pc:t="ENVMAP_BLENDING_MULTIPLY";break;case Eu:t="ENVMAP_BLENDING_MIX";break;case Tu:t="ENVMAP_BLENDING_ADD";break}return t}function X0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function q0(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=G0(e),c=V0(e),h=W0(e),u=$0(e),f=X0(e),d=e.isWebGL2?"":U0(e),_=I0(e),g=N0(r),p=s.createProgram();let m,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),M=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),M.length>0&&(M+=`
`)):(m=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),M=[d,kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?$t.tonemapping_pars_fragment:"",e.toneMapping!==ri?D0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,L0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),o=qo(o),o=Ol(o,e),o=zl(o,e),a=qo(a),a=Ol(a,e),a=zl(a,e),o=Bl(o),a=Bl(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const E=v+m+o,C=v+M+a,S=Nl(s,s.VERTEX_SHADER,E),w=Nl(s,s.FRAGMENT_SHADER,C);s.attachShader(p,S),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function B(Q){if(n.debug.checkShaderErrors){const tt=s.getProgramInfoLog(p).trim(),L=s.getShaderInfoLog(S).trim(),N=s.getShaderInfoLog(w).trim();let I=!0,V=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(I=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,S,w);else{const D=Fl(s,S,"vertex"),O=Fl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+tt+`
`+D+`
`+O)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(L===""||N==="")&&(V=!1);V&&(Q.diagnostics={runnable:I,programLog:tt,vertexShader:{log:L,prefix:m},fragmentShader:{log:N,prefix:M}})}s.deleteShader(S),s.deleteShader(w),y=new mr(s,p),T=F0(s,p)}let y;this.getUniforms=function(){return y===void 0&&B(this),y};let T;this.getAttributes=function(){return T===void 0&&B(this),T};let z=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(p,A0)),z},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=R0++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=w,this}let Y0=0;class j0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Z0(t),e.set(t,i)),i}}class Z0{constructor(t){this.id=Y0++,this.code=t,this.usedTimes=0}}function K0(n,t,e,i,s,r,o){const a=new $c,l=new j0,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function p(y,T,z,Q,tt){const L=Q.fog,N=tt.geometry,I=y.isMeshStandardMaterial?Q.environment:null,V=(y.isMeshStandardMaterial?e:t).get(y.envMap||I),D=V&&V.mapping===Dr?V.image.height:null,O=_[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,it=q!==void 0?q.length:0;let ot=0;N.morphAttributes.position!==void 0&&(ot=1),N.morphAttributes.normal!==void 0&&(ot=2),N.morphAttributes.color!==void 0&&(ot=3);let W,st,ut,G;if(O){const Oe=$e[O];W=Oe.vertexShader,st=Oe.fragmentShader}else W=y.vertexShader,st=y.fragmentShader,l.update(y),ut=l.getVertexShaderID(y),G=l.getFragmentShaderID(y);const $=n.getRenderTarget(),Z=tt.isInstancedMesh===!0,K=tt.isBatchedMesh===!0,et=!!y.map,rt=!!y.matcap,F=!!V,wt=!!y.aoMap,xt=!!y.lightMap,At=!!y.bumpMap,Mt=!!y.normalMap,Gt=!!y.displacementMap,Ut=!!y.emissiveMap,R=!!y.metalnessMap,b=!!y.roughnessMap,X=y.anisotropy>0,at=y.clearcoat>0,ct=y.iridescence>0,ht=y.sheen>0,Et=y.transmission>0,pt=X&&!!y.anisotropyMap,St=at&&!!y.clearcoatMap,Lt=at&&!!y.clearcoatNormalMap,kt=at&&!!y.clearcoatRoughnessMap,lt=ct&&!!y.iridescenceMap,te=ct&&!!y.iridescenceThicknessMap,Xt=ht&&!!y.sheenColorMap,zt=ht&&!!y.sheenRoughnessMap,Pt=!!y.specularMap,bt=!!y.specularColorMap,Nt=!!y.specularIntensityMap,Jt=Et&&!!y.transmissionMap,ue=Et&&!!y.thicknessMap,Yt=!!y.gradientMap,dt=!!y.alphaMap,U=y.alphaTest>0,gt=!!y.alphaHash,_t=!!y.extensions,Ft=!!N.attributes.uv1,Dt=!!N.attributes.uv2,le=!!N.attributes.uv3;let ce=ri;return y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(ce=n.toneMapping),{isWebGL2:h,shaderID:O,shaderType:y.type,shaderName:y.name,vertexShader:W,fragmentShader:st,defines:y.defines,customVertexShaderID:ut,customFragmentShaderID:G,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:K,instancing:Z,instancingColor:Z&&tt.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Pn,map:et,matcap:rt,envMap:F,envMapMode:F&&V.mapping,envMapCubeUVHeight:D,aoMap:wt,lightMap:xt,bumpMap:At,normalMap:Mt,displacementMap:f&&Gt,emissiveMap:Ut,normalMapObjectSpace:Mt&&y.normalMapType===Wu,normalMapTangentSpace:Mt&&y.normalMapType===Vu,metalnessMap:R,roughnessMap:b,anisotropy:X,anisotropyMap:pt,clearcoat:at,clearcoatMap:St,clearcoatNormalMap:Lt,clearcoatRoughnessMap:kt,iridescence:ct,iridescenceMap:lt,iridescenceThicknessMap:te,sheen:ht,sheenColorMap:Xt,sheenRoughnessMap:zt,specularMap:Pt,specularColorMap:bt,specularIntensityMap:Nt,transmission:Et,transmissionMap:Jt,thicknessMap:ue,gradientMap:Yt,opaque:y.transparent===!1&&y.blending===ts,alphaMap:dt,alphaTest:U,alphaHash:gt,combine:y.combine,mapUv:et&&g(y.map.channel),aoMapUv:wt&&g(y.aoMap.channel),lightMapUv:xt&&g(y.lightMap.channel),bumpMapUv:At&&g(y.bumpMap.channel),normalMapUv:Mt&&g(y.normalMap.channel),displacementMapUv:Gt&&g(y.displacementMap.channel),emissiveMapUv:Ut&&g(y.emissiveMap.channel),metalnessMapUv:R&&g(y.metalnessMap.channel),roughnessMapUv:b&&g(y.roughnessMap.channel),anisotropyMapUv:pt&&g(y.anisotropyMap.channel),clearcoatMapUv:St&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:kt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:zt&&g(y.sheenRoughnessMap.channel),specularMapUv:Pt&&g(y.specularMap.channel),specularColorMapUv:bt&&g(y.specularColorMap.channel),specularIntensityMapUv:Nt&&g(y.specularIntensityMap.channel),transmissionMapUv:Jt&&g(y.transmissionMap.channel),thicknessMapUv:ue&&g(y.thicknessMap.channel),alphaMapUv:dt&&g(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Mt||X),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Ft,vertexUv2s:Dt,vertexUv3s:le,pointsUvs:tt.isPoints===!0&&!!N.attributes.uv&&(et||dt),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:tt.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:ot,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:ce,useLegacyLights:n._useLegacyLights,decodeVideoTexture:et&&y.map.isVideoTexture===!0&&oe.getTransfer(y.map.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Vn,flipSided:y.side===Xe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:_t&&y.extensions.derivatives===!0,extensionFragDepth:_t&&y.extensions.fragDepth===!0,extensionDrawBuffers:_t&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:_t&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_t&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const z in y.defines)T.push(z),T.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(M(T,y),v(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function M(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function E(y){const T=_[y.type];let z;if(T){const Q=$e[T];z=oa.clone(Q.uniforms)}else z=y.uniforms;return z}function C(y,T){let z;for(let Q=0,tt=c.length;Q<tt;Q++){const L=c[Q];if(L.cacheKey===T){z=L,++z.usedTimes;break}}return z===void 0&&(z=new q0(n,T,y,r),c.push(z)),z}function S(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function B(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:E,acquireProgram:C,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:B}}function J0(){let n=new WeakMap;function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function e(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function Q0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Hl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Gl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,_,g,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=p),t++,m}function a(u,f,d,_,g,p){const m=o(u,f,d,_,g,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function l(u,f,d,_,g,p){const m=o(u,f,d,_,g,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,f){e.length>1&&e.sort(u||Q0),i.length>1&&i.sort(f||Hl),s.length>1&&s.sort(f||Hl)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function tg(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Gl,n.set(i,[o])):s>=r.length?(o=new Gl,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function eg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new ne};break;case"SpotLight":e={position:new H,direction:new H,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new H,halfWidth:new H,halfHeight:new H};break}return n[t.id]=e,e}}}function ng(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let ig=0;function sg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function rg(n,t){const e=new eg,i=ng(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new H);const r=new H,o=new we,a=new we;function l(h,u){let f=0,d=0,_=0;for(let Q=0;Q<9;Q++)s.probe[Q].set(0,0,0);let g=0,p=0,m=0,M=0,v=0,E=0,C=0,S=0,w=0,B=0,y=0;h.sort(sg);const T=u===!0?Math.PI:1;for(let Q=0,tt=h.length;Q<tt;Q++){const L=h[Q],N=L.color,I=L.intensity,V=L.distance,D=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=N.r*I*T,d+=N.g*I*T,_+=N.b*I*T;else if(L.isLightProbe){for(let O=0;O<9;O++)s.probe[O].addScaledVector(L.sh.coefficients[O],I);y++}else if(L.isDirectionalLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const q=L.shadow,it=i.get(L);it.shadowBias=q.bias,it.shadowNormalBias=q.normalBias,it.shadowRadius=q.radius,it.shadowMapSize=q.mapSize,s.directionalShadow[g]=it,s.directionalShadowMap[g]=D,s.directionalShadowMatrix[g]=L.shadow.matrix,E++}s.directional[g]=O,g++}else if(L.isSpotLight){const O=e.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(N).multiplyScalar(I*T),O.distance=V,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,s.spot[m]=O;const q=L.shadow;if(L.map&&(s.spotLightMap[w]=L.map,w++,q.updateMatrices(L),L.castShadow&&B++),s.spotLightMatrix[m]=q.matrix,L.castShadow){const it=i.get(L);it.shadowBias=q.bias,it.shadowNormalBias=q.normalBias,it.shadowRadius=q.radius,it.shadowMapSize=q.mapSize,s.spotShadow[m]=it,s.spotShadowMap[m]=D,S++}m++}else if(L.isRectAreaLight){const O=e.get(L);O.color.copy(N).multiplyScalar(I),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),s.rectArea[M]=O,M++}else if(L.isPointLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*T),O.distance=L.distance,O.decay=L.decay,L.castShadow){const q=L.shadow,it=i.get(L);it.shadowBias=q.bias,it.shadowNormalBias=q.normalBias,it.shadowRadius=q.radius,it.shadowMapSize=q.mapSize,it.shadowCameraNear=q.camera.near,it.shadowCameraFar=q.camera.far,s.pointShadow[p]=it,s.pointShadowMap[p]=D,s.pointShadowMatrix[p]=L.shadow.matrix,C++}s.point[p]=O,p++}else if(L.isHemisphereLight){const O=e.get(L);O.skyColor.copy(L.color).multiplyScalar(I*T),O.groundColor.copy(L.groundColor).multiplyScalar(I*T),s.hemi[v]=O,v++}}M>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=_;const z=s.hash;(z.directionalLength!==g||z.pointLength!==p||z.spotLength!==m||z.rectAreaLength!==M||z.hemiLength!==v||z.numDirectionalShadows!==E||z.numPointShadows!==C||z.numSpotShadows!==S||z.numSpotMaps!==w||z.numLightProbes!==y)&&(s.directional.length=g,s.spot.length=m,s.rectArea.length=M,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=S,s.spotShadowMap.length=S,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=S+w-B,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=B,s.numLightProbes=y,z.directionalLength=g,z.pointLength=p,z.spotLength=m,z.rectAreaLength=M,z.hemiLength=v,z.numDirectionalShadows=E,z.numPointShadows=C,z.numSpotShadows=S,z.numSpotMaps=w,z.numLightProbes=y,s.version=ig++)}function c(h,u){let f=0,d=0,_=0,g=0,p=0;const m=u.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){const E=h[M];if(E.isDirectionalLight){const C=s.directional[f];C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),f++}else if(E.isSpotLight){const C=s.spot[_];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),_++}else if(E.isRectAreaLight){const C=s.rectArea[g];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(m),a.identity(),o.copy(E.matrixWorld),o.premultiply(m),a.extractRotation(o),C.halfWidth.set(E.width*.5,0,0),C.halfHeight.set(0,E.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const C=s.point[d];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(E.matrixWorld),C.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:s}}function Vl(n,t){const e=new rg(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function o(u){i.push(u)}function a(u){s.push(u)}function l(u){e.setup(i,u)}function c(u){e.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function og(n,t){let e=new WeakMap;function i(r,o=0){const a=e.get(r);let l;return a===void 0?(l=new Vl(n,t),e.set(r,[l])):o>=a.length?(l=new Vl(n,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:i,dispose:s}}class ag extends Ir{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class lg extends Ir{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const cg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ug(n,t,e){let i=new Qc;const s=new se,r=new se,o=new ge,a=new ag({depthPacking:Gu}),l=new lg,c={},h=e.maxTextureSize,u={[ai]:Xe,[Xe]:ai,[Vn]:Vn},f=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:cg,fragmentShader:hg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Yn;_.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Xn(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rc;let m=this.type;this.render=function(S,w,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const y=n.getRenderTarget(),T=n.getActiveCubeFace(),z=n.getActiveMipmapLevel(),Q=n.state;Q.setBlending(si),Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const tt=m!==kn&&this.type===kn,L=m===kn&&this.type!==kn;for(let N=0,I=S.length;N<I;N++){const V=S[N],D=V.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const O=D.getFrameExtents();if(s.multiply(O),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,D.mapSize.y=r.y)),D.map===null||tt===!0||L===!0){const it=this.type!==kn?{minFilter:Ge,magFilter:Ge}:{};D.map!==null&&D.map.dispose(),D.map=new Pi(s.x,s.y,it),D.map.texture.name=V.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const q=D.getViewportCount();for(let it=0;it<q;it++){const ot=D.getViewport(it);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),Q.viewport(o),D.updateMatrices(V,it),i=D.getFrustum(),E(w,B,D.camera,V,this.type)}D.isPointLightShadow!==!0&&this.type===kn&&M(D,B),D.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(y,T,z)};function M(S,w){const B=t.update(g);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Pi(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,B,f,g,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,B,d,g,null)}function v(S,w,B,y){let T=null;const z=B.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(z!==void 0)T=z;else if(T=B.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const Q=T.uuid,tt=w.uuid;let L=c[Q];L===void 0&&(L={},c[Q]=L);let N=L[tt];N===void 0&&(N=T.clone(),L[tt]=N,w.addEventListener("dispose",C)),T=N}if(T.visible=w.visible,T.wireframe=w.wireframe,y===kn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:u[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,B.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const Q=n.properties.get(T);Q.light=B}return T}function E(S,w,B,y,T){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&T===kn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld);const tt=t.update(S),L=S.material;if(Array.isArray(L)){const N=tt.groups;for(let I=0,V=N.length;I<V;I++){const D=N[I],O=L[D.materialIndex];if(O&&O.visible){const q=v(S,O,y,T);S.onBeforeShadow(n,S,w,B,tt,q,D),n.renderBufferDirect(B,null,tt,q,S,D),S.onAfterShadow(n,S,w,B,tt,q,D)}}}else if(L.visible){const N=v(S,L,y,T);S.onBeforeShadow(n,S,w,B,tt,N,null),n.renderBufferDirect(B,null,tt,N,S,null),S.onAfterShadow(n,S,w,B,tt,N,null)}}const Q=S.children;for(let tt=0,L=Q.length;tt<L;tt++)E(Q[tt],w,B,y,T)}function C(S){S.target.removeEventListener("dispose",C);for(const B in c){const y=c[B],T=S.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}function fg(n,t,e){const i=e.isWebGL2;function s(){let U=!1;const gt=new ge;let _t=null;const Ft=new ge(0,0,0,0);return{setMask:function(Dt){_t!==Dt&&!U&&(n.colorMask(Dt,Dt,Dt,Dt),_t=Dt)},setLocked:function(Dt){U=Dt},setClear:function(Dt,le,ce,Se,Oe){Oe===!0&&(Dt*=Se,le*=Se,ce*=Se),gt.set(Dt,le,ce,Se),Ft.equals(gt)===!1&&(n.clearColor(Dt,le,ce,Se),Ft.copy(gt))},reset:function(){U=!1,_t=null,Ft.set(-1,0,0,0)}}}function r(){let U=!1,gt=null,_t=null,Ft=null;return{setTest:function(Dt){Dt?K(n.DEPTH_TEST):et(n.DEPTH_TEST)},setMask:function(Dt){gt!==Dt&&!U&&(n.depthMask(Dt),gt=Dt)},setFunc:function(Dt){if(_t!==Dt){switch(Dt){case _u:n.depthFunc(n.NEVER);break;case vu:n.depthFunc(n.ALWAYS);break;case Mu:n.depthFunc(n.LESS);break;case Mr:n.depthFunc(n.LEQUAL);break;case yu:n.depthFunc(n.EQUAL);break;case xu:n.depthFunc(n.GEQUAL);break;case Su:n.depthFunc(n.GREATER);break;case bu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=Dt}},setLocked:function(Dt){U=Dt},setClear:function(Dt){Ft!==Dt&&(n.clearDepth(Dt),Ft=Dt)},reset:function(){U=!1,gt=null,_t=null,Ft=null}}}function o(){let U=!1,gt=null,_t=null,Ft=null,Dt=null,le=null,ce=null,Se=null,Oe=null;return{setTest:function(he){U||(he?K(n.STENCIL_TEST):et(n.STENCIL_TEST))},setMask:function(he){gt!==he&&!U&&(n.stencilMask(he),gt=he)},setFunc:function(he,ze,Mn){(_t!==he||Ft!==ze||Dt!==Mn)&&(n.stencilFunc(he,ze,Mn),_t=he,Ft=ze,Dt=Mn)},setOp:function(he,ze,Mn){(le!==he||ce!==ze||Se!==Mn)&&(n.stencilOp(he,ze,Mn),le=he,ce=ze,Se=Mn)},setLocked:function(he){U=he},setClear:function(he){Oe!==he&&(n.clearStencil(he),Oe=he)},reset:function(){U=!1,gt=null,_t=null,Ft=null,Dt=null,le=null,ce=null,Se=null,Oe=null}}}const a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let f={},d={},_=new WeakMap,g=[],p=null,m=!1,M=null,v=null,E=null,C=null,S=null,w=null,B=null,y=new ne(0,0,0),T=0,z=!1,Q=null,tt=null,L=null,N=null,I=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,O=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(q)[1]),D=O>=1):q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),D=O>=2);let it=null,ot={};const W=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),ut=new ge().fromArray(W),G=new ge().fromArray(st);function $(U,gt,_t,Ft){const Dt=new Uint8Array(4),le=n.createTexture();n.bindTexture(U,le),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ce=0;ce<_t;ce++)i&&(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)?n.texImage3D(gt,0,n.RGBA,1,1,Ft,0,n.RGBA,n.UNSIGNED_BYTE,Dt):n.texImage2D(gt+ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Dt);return le}const Z={};Z[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Z[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),K(n.DEPTH_TEST),l.setFunc(Mr),Ut(!1),R(Ta),K(n.CULL_FACE),Mt(si);function K(U){f[U]!==!0&&(n.enable(U),f[U]=!0)}function et(U){f[U]!==!1&&(n.disable(U),f[U]=!1)}function rt(U,gt){return d[U]!==gt?(n.bindFramebuffer(U,gt),d[U]=gt,i&&(U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=gt),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=gt)),!0):!1}function F(U,gt){let _t=g,Ft=!1;if(U)if(_t=_.get(gt),_t===void 0&&(_t=[],_.set(gt,_t)),U.isWebGLMultipleRenderTargets){const Dt=U.texture;if(_t.length!==Dt.length||_t[0]!==n.COLOR_ATTACHMENT0){for(let le=0,ce=Dt.length;le<ce;le++)_t[le]=n.COLOR_ATTACHMENT0+le;_t.length=Dt.length,Ft=!0}}else _t[0]!==n.COLOR_ATTACHMENT0&&(_t[0]=n.COLOR_ATTACHMENT0,Ft=!0);else _t[0]!==n.BACK&&(_t[0]=n.BACK,Ft=!0);Ft&&(e.isWebGL2?n.drawBuffers(_t):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(_t))}function wt(U){return p!==U?(n.useProgram(U),p=U,!0):!1}const xt={[yi]:n.FUNC_ADD,[nu]:n.FUNC_SUBTRACT,[iu]:n.FUNC_REVERSE_SUBTRACT};if(i)xt[Ca]=n.MIN,xt[Oo]=n.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(xt[Ca]=U.MIN_EXT,xt[Oo]=U.MAX_EXT)}const At={[su]:n.ZERO,[ru]:n.ONE,[ou]:n.SRC_COLOR,[zo]:n.SRC_ALPHA,[fu]:n.SRC_ALPHA_SATURATE,[hu]:n.DST_COLOR,[lu]:n.DST_ALPHA,[au]:n.ONE_MINUS_SRC_COLOR,[Bo]:n.ONE_MINUS_SRC_ALPHA,[uu]:n.ONE_MINUS_DST_COLOR,[cu]:n.ONE_MINUS_DST_ALPHA,[du]:n.CONSTANT_COLOR,[pu]:n.ONE_MINUS_CONSTANT_COLOR,[mu]:n.CONSTANT_ALPHA,[gu]:n.ONE_MINUS_CONSTANT_ALPHA};function Mt(U,gt,_t,Ft,Dt,le,ce,Se,Oe,he){if(U===si){m===!0&&(et(n.BLEND),m=!1);return}if(m===!1&&(K(n.BLEND),m=!0),U!==Cc){if(U!==M||he!==z){if((v!==yi||S!==yi)&&(n.blendEquation(n.FUNC_ADD),v=yi,S=yi),he)switch(U){case ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wa:n.blendFunc(n.ONE,n.ONE);break;case Aa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ra:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Aa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ra:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,C=null,w=null,B=null,y.set(0,0,0),T=0,M=U,z=he}return}Dt=Dt||gt,le=le||_t,ce=ce||Ft,(gt!==v||Dt!==S)&&(n.blendEquationSeparate(xt[gt],xt[Dt]),v=gt,S=Dt),(_t!==E||Ft!==C||le!==w||ce!==B)&&(n.blendFuncSeparate(At[_t],At[Ft],At[le],At[ce]),E=_t,C=Ft,w=le,B=ce),(Se.equals(y)===!1||Oe!==T)&&(n.blendColor(Se.r,Se.g,Se.b,Oe),y.copy(Se),T=Oe),M=U,z=!1}function Gt(U,gt){U.side===Vn?et(n.CULL_FACE):K(n.CULL_FACE);let _t=U.side===Xe;gt&&(_t=!_t),Ut(_t),U.blending===ts&&U.transparent===!1?Mt(si):Mt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const Ft=U.stencilWrite;c.setTest(Ft),Ft&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),X(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):et(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(U){Q!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),Q=U)}function R(U){U!==Qh?(K(n.CULL_FACE),U!==tt&&(U===Ta?n.cullFace(n.BACK):U===tu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):et(n.CULL_FACE),tt=U}function b(U){U!==L&&(D&&n.lineWidth(U),L=U)}function X(U,gt,_t){U?(K(n.POLYGON_OFFSET_FILL),(N!==gt||I!==_t)&&(n.polygonOffset(gt,_t),N=gt,I=_t)):et(n.POLYGON_OFFSET_FILL)}function at(U){U?K(n.SCISSOR_TEST):et(n.SCISSOR_TEST)}function ct(U){U===void 0&&(U=n.TEXTURE0+V-1),it!==U&&(n.activeTexture(U),it=U)}function ht(U,gt,_t){_t===void 0&&(it===null?_t=n.TEXTURE0+V-1:_t=it);let Ft=ot[_t];Ft===void 0&&(Ft={type:void 0,texture:void 0},ot[_t]=Ft),(Ft.type!==U||Ft.texture!==gt)&&(it!==_t&&(n.activeTexture(_t),it=_t),n.bindTexture(U,gt||Z[U]),Ft.type=U,Ft.texture=gt)}function Et(){const U=ot[it];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function pt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function kt(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(U){ut.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ut.copy(U))}function Jt(U){G.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),G.copy(U))}function ue(U,gt){let _t=u.get(gt);_t===void 0&&(_t=new WeakMap,u.set(gt,_t));let Ft=_t.get(U);Ft===void 0&&(Ft=n.getUniformBlockIndex(gt,U.name),_t.set(U,Ft))}function Yt(U,gt){const Ft=u.get(gt).get(U);h.get(gt)!==Ft&&(n.uniformBlockBinding(gt,Ft,U.__bindingPointIndex),h.set(gt,Ft))}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},it=null,ot={},d={},_=new WeakMap,g=[],p=null,m=!1,M=null,v=null,E=null,C=null,S=null,w=null,B=null,y=new ne(0,0,0),T=0,z=!1,Q=null,tt=null,L=null,N=null,I=null,ut.set(0,0,n.canvas.width,n.canvas.height),G.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:K,disable:et,bindFramebuffer:rt,drawBuffers:F,useProgram:wt,setBlending:Mt,setMaterial:Gt,setFlipSided:Ut,setCullFace:R,setLineWidth:b,setPolygonOffset:X,setScissorTest:at,activeTexture:ct,bindTexture:ht,unbindTexture:Et,compressedTexImage2D:pt,compressedTexImage3D:St,texImage2D:Pt,texImage3D:bt,updateUBOMapping:ue,uniformBlockBinding:Yt,texStorage2D:Xt,texStorage3D:zt,texSubImage2D:Lt,texSubImage3D:kt,compressedTexSubImage2D:lt,compressedTexSubImage3D:te,scissor:Nt,viewport:Jt,reset:dt}}function dg(n,t,e,i,s,r,o){const a=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,b){return d?new OffscreenCanvas(R,b):Tr("canvas")}function g(R,b,X,at){let ct=1;if((R.width>at||R.height>at)&&(ct=at/Math.max(R.width,R.height)),ct<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ht=b?Er:Math.floor,Et=ht(ct*R.width),pt=ht(ct*R.height);u===void 0&&(u=_(Et,pt));const St=X?_(Et,pt):u;return St.width=Et,St.height=pt,St.getContext("2d").drawImage(R,0,0,Et,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Et+"x"+pt+")."),St}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function p(R){return Xo(R.width)&&Xo(R.height)}function m(R){return a?!1:R.wrapS!==mn||R.wrapT!==mn||R.minFilter!==Ge&&R.minFilter!==nn}function M(R,b){return R.generateMipmaps&&b&&R.minFilter!==Ge&&R.minFilter!==nn}function v(R){n.generateMipmap(R)}function E(R,b,X,at,ct=!1){if(a===!1)return b;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ht=b;if(b===n.RED&&(X===n.FLOAT&&(ht=n.R32F),X===n.HALF_FLOAT&&(ht=n.R16F),X===n.UNSIGNED_BYTE&&(ht=n.R8)),b===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(ht=n.R8UI),X===n.UNSIGNED_SHORT&&(ht=n.R16UI),X===n.UNSIGNED_INT&&(ht=n.R32UI),X===n.BYTE&&(ht=n.R8I),X===n.SHORT&&(ht=n.R16I),X===n.INT&&(ht=n.R32I)),b===n.RG&&(X===n.FLOAT&&(ht=n.RG32F),X===n.HALF_FLOAT&&(ht=n.RG16F),X===n.UNSIGNED_BYTE&&(ht=n.RG8)),b===n.RGBA){const Et=ct?yr:oe.getTransfer(at);X===n.FLOAT&&(ht=n.RGBA32F),X===n.HALF_FLOAT&&(ht=n.RGBA16F),X===n.UNSIGNED_BYTE&&(ht=Et===fe?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(ht=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(ht=n.RGB5_A1)}return(ht===n.R16F||ht===n.R32F||ht===n.RG16F||ht===n.RG32F||ht===n.RGBA16F||ht===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function C(R,b,X){return M(R,X)===!0||R.isFramebufferTexture&&R.minFilter!==Ge&&R.minFilter!==nn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function S(R){return R===Ge||R===Pa||R===Wr?n.NEAREST:n.LINEAR}function w(R){const b=R.target;b.removeEventListener("dispose",w),y(b),b.isVideoTexture&&h.delete(b)}function B(R){const b=R.target;b.removeEventListener("dispose",B),z(b)}function y(R){const b=i.get(R);if(b.__webglInit===void 0)return;const X=R.source,at=f.get(X);if(at){const ct=at[b.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&T(R),Object.keys(at).length===0&&f.delete(X)}i.remove(R)}function T(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const X=R.source,at=f.get(X);delete at[b.__cacheKey],o.memory.textures--}function z(R){const b=R.texture,X=i.get(R),at=i.get(b);if(at.__webglTexture!==void 0&&(n.deleteTexture(at.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(X.__webglFramebuffer[ct]))for(let ht=0;ht<X.__webglFramebuffer[ct].length;ht++)n.deleteFramebuffer(X.__webglFramebuffer[ct][ht]);else n.deleteFramebuffer(X.__webglFramebuffer[ct]);X.__webglDepthbuffer&&n.deleteRenderbuffer(X.__webglDepthbuffer[ct])}else{if(Array.isArray(X.__webglFramebuffer))for(let ct=0;ct<X.__webglFramebuffer.length;ct++)n.deleteFramebuffer(X.__webglFramebuffer[ct]);else n.deleteFramebuffer(X.__webglFramebuffer);if(X.__webglDepthbuffer&&n.deleteRenderbuffer(X.__webglDepthbuffer),X.__webglMultisampledFramebuffer&&n.deleteFramebuffer(X.__webglMultisampledFramebuffer),X.__webglColorRenderbuffer)for(let ct=0;ct<X.__webglColorRenderbuffer.length;ct++)X.__webglColorRenderbuffer[ct]&&n.deleteRenderbuffer(X.__webglColorRenderbuffer[ct]);X.__webglDepthRenderbuffer&&n.deleteRenderbuffer(X.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ct=0,ht=b.length;ct<ht;ct++){const Et=i.get(b[ct]);Et.__webglTexture&&(n.deleteTexture(Et.__webglTexture),o.memory.textures--),i.remove(b[ct])}i.remove(b),i.remove(R)}let Q=0;function tt(){Q=0}function L(){const R=Q;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),Q+=1,R}function N(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function I(R,b){const X=i.get(R);if(R.isVideoTexture&&Gt(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){const at=R.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(X,R,b);return}}e.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+b)}function V(R,b){const X=i.get(R);if(R.version>0&&X.__version!==R.version){ut(X,R,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+b)}function D(R,b){const X=i.get(R);if(R.version>0&&X.__version!==R.version){ut(X,R,b);return}e.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+b)}function O(R,b){const X=i.get(R);if(R.version>0&&X.__version!==R.version){G(X,R,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+b)}const q={[Go]:n.REPEAT,[mn]:n.CLAMP_TO_EDGE,[Vo]:n.MIRRORED_REPEAT},it={[Ge]:n.NEAREST,[Pa]:n.NEAREST_MIPMAP_NEAREST,[Wr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Du]:n.LINEAR_MIPMAP_NEAREST,[Ts]:n.LINEAR_MIPMAP_LINEAR},ot={[$u]:n.NEVER,[Ku]:n.ALWAYS,[Xu]:n.LESS,[kc]:n.LEQUAL,[qu]:n.EQUAL,[Zu]:n.GEQUAL,[Yu]:n.GREATER,[ju]:n.NOTEQUAL};function W(R,b,X){if(X?(n.texParameteri(R,n.TEXTURE_WRAP_S,q[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,q[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,q[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,it[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,it[b.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(b.wrapS!==mn||b.wrapT!==mn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,S(b.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,S(b.minFilter)),b.minFilter!==Ge&&b.minFilter!==nn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ot[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const at=t.get("EXT_texture_filter_anisotropic");if(b.magFilter===Ge||b.minFilter!==Wr&&b.minFilter!==Ts||b.type===ni&&t.has("OES_texture_float_linear")===!1||a===!1&&b.type===ws&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||i.get(b).__currentAnisotropy)&&(n.texParameterf(R,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy)}}function st(R,b){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const at=b.source;let ct=f.get(at);ct===void 0&&(ct={},f.set(at,ct));const ht=N(b);if(ht!==R.__cacheKey){ct[ht]===void 0&&(ct[ht]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ct[ht].usedTimes++;const Et=ct[R.__cacheKey];Et!==void 0&&(ct[R.__cacheKey].usedTimes--,Et.usedTimes===0&&T(b)),R.__cacheKey=ht,R.__webglTexture=ct[ht].texture}return X}function ut(R,b,X){let at=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(at=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(at=n.TEXTURE_3D);const ct=st(R,b),ht=b.source;e.bindTexture(at,R.__webglTexture,n.TEXTURE0+X);const Et=i.get(ht);if(ht.version!==Et.__version||ct===!0){e.activeTexture(n.TEXTURE0+X);const pt=oe.getPrimaries(oe.workingColorSpace),St=b.colorSpace===rn?null:oe.getPrimaries(b.colorSpace),Lt=b.colorSpace===rn||pt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const kt=m(b)&&p(b.image)===!1;let lt=g(b.image,kt,!1,s.maxTextureSize);lt=Ut(b,lt);const te=p(lt)||a,Xt=r.convert(b.format,b.colorSpace);let zt=r.convert(b.type),Pt=E(b.internalFormat,Xt,zt,b.colorSpace,b.isVideoTexture);W(at,b,te);let bt;const Nt=b.mipmaps,Jt=a&&b.isVideoTexture!==!0&&Pt!==zc,ue=Et.__version===void 0||ct===!0,Yt=C(b,lt,te);if(b.isDepthTexture)Pt=n.DEPTH_COMPONENT,a?b.type===ni?Pt=n.DEPTH_COMPONENT32F:b.type===ei?Pt=n.DEPTH_COMPONENT24:b.type===wi?Pt=n.DEPTH24_STENCIL8:Pt=n.DEPTH_COMPONENT16:b.type===ni&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Ai&&Pt===n.DEPTH_COMPONENT&&b.type!==ia&&b.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=ei,zt=r.convert(b.type)),b.format===os&&Pt===n.DEPTH_COMPONENT&&(Pt=n.DEPTH_STENCIL,b.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=wi,zt=r.convert(b.type))),ue&&(Jt?e.texStorage2D(n.TEXTURE_2D,1,Pt,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Pt,lt.width,lt.height,0,Xt,zt,null));else if(b.isDataTexture)if(Nt.length>0&&te){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,zt,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,zt,bt.data);b.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt.width,lt.height,Xt,zt,lt.data)):e.texImage2D(n.TEXTURE_2D,0,Pt,lt.width,lt.height,0,Xt,zt,lt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Jt&&ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,Nt[0].width,Nt[0].height,lt.depth);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],b.format!==gn?Xt!==null?Jt?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,lt.depth,Xt,bt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,lt.depth,0,bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,lt.depth,Xt,zt,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,lt.depth,0,Xt,zt,bt.data)}else{Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],b.format!==gn?Xt!==null?Jt?e.compressedTexSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,zt,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,zt,bt.data)}else if(b.isDataArrayTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,lt.width,lt.height,lt.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Xt,zt,lt.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Pt,lt.width,lt.height,lt.depth,0,Xt,zt,lt.data);else if(b.isData3DTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_3D,Yt,Pt,lt.width,lt.height,lt.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Xt,zt,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Pt,lt.width,lt.height,lt.depth,0,Xt,zt,lt.data);else if(b.isFramebufferTexture){if(ue)if(Jt)e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height);else{let dt=lt.width,U=lt.height;for(let gt=0;gt<Yt;gt++)e.texImage2D(n.TEXTURE_2D,gt,Pt,dt,U,0,Xt,zt,null),dt>>=1,U>>=1}}else if(Nt.length>0&&te){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,Xt,zt,bt):e.texImage2D(n.TEXTURE_2D,dt,Pt,Xt,zt,bt);b.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Xt,zt,lt)):e.texImage2D(n.TEXTURE_2D,0,Pt,Xt,zt,lt);M(b,te)&&v(at),Et.__version=ht.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function G(R,b,X){if(b.image.length!==6)return;const at=st(R,b),ct=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+X);const ht=i.get(ct);if(ct.version!==ht.__version||at===!0){e.activeTexture(n.TEXTURE0+X);const Et=oe.getPrimaries(oe.workingColorSpace),pt=b.colorSpace===rn?null:oe.getPrimaries(b.colorSpace),St=b.colorSpace===rn||Et===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Lt=b.isCompressedTexture||b.image[0].isCompressedTexture,kt=b.image[0]&&b.image[0].isDataTexture,lt=[];for(let dt=0;dt<6;dt++)!Lt&&!kt?lt[dt]=g(b.image[dt],!1,!0,s.maxCubemapSize):lt[dt]=kt?b.image[dt].image:b.image[dt],lt[dt]=Ut(b,lt[dt]);const te=lt[0],Xt=p(te)||a,zt=r.convert(b.format,b.colorSpace),Pt=r.convert(b.type),bt=E(b.internalFormat,zt,Pt,b.colorSpace),Nt=a&&b.isVideoTexture!==!0,Jt=ht.__version===void 0||at===!0;let ue=C(b,te,Xt);W(n.TEXTURE_CUBE_MAP,b,Xt);let Yt;if(Lt){Nt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,te.width,te.height);for(let dt=0;dt<6;dt++){Yt=lt[dt].mipmaps;for(let U=0;U<Yt.length;U++){const gt=Yt[U];b.format!==gn?zt!==null?Nt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,0,0,gt.width,gt.height,zt,Pt,gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,bt,gt.width,gt.height,0,zt,Pt,gt.data)}}}else{Yt=b.mipmaps,Nt&&Jt&&(Yt.length>0&&ue++,e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,lt[0].width,lt[0].height));for(let dt=0;dt<6;dt++)if(kt){Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,lt[dt].width,lt[dt].height,zt,Pt,lt[dt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,lt[dt].width,lt[dt].height,0,zt,Pt,lt[dt].data);for(let U=0;U<Yt.length;U++){const _t=Yt[U].image[dt].image;Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,0,0,_t.width,_t.height,zt,Pt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,bt,_t.width,_t.height,0,zt,Pt,_t.data)}}else{Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,zt,Pt,lt[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,zt,Pt,lt[dt]);for(let U=0;U<Yt.length;U++){const gt=Yt[U];Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,0,0,zt,Pt,gt.image[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,bt,zt,Pt,gt.image[dt])}}}M(b,Xt)&&v(n.TEXTURE_CUBE_MAP),ht.__version=ct.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function $(R,b,X,at,ct,ht){const Et=r.convert(X.format,X.colorSpace),pt=r.convert(X.type),St=E(X.internalFormat,Et,pt,X.colorSpace);if(!i.get(b).__hasExternalTextures){const kt=Math.max(1,b.width>>ht),lt=Math.max(1,b.height>>ht);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,ht,St,kt,lt,b.depth,0,Et,pt,null):e.texImage2D(ct,ht,St,kt,lt,0,Et,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,at,ct,i.get(X).__webglTexture,0,At(b)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,at,ct,i.get(X).__webglTexture,ht),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Z(R,b,X){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let at=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(X||Mt(b)){const ct=b.depthTexture;ct&&ct.isDepthTexture&&(ct.type===ni?at=n.DEPTH_COMPONENT32F:ct.type===ei&&(at=n.DEPTH_COMPONENT24));const ht=At(b);Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht,at,b.width,b.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ht,at,b.width,b.height)}else n.renderbufferStorage(n.RENDERBUFFER,at,b.width,b.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){const at=At(b);X&&Mt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,n.DEPTH24_STENCIL8,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,n.DEPTH24_STENCIL8,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const at=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ct=0;ct<at.length;ct++){const ht=at[ct],Et=r.convert(ht.format,ht.colorSpace),pt=r.convert(ht.type),St=E(ht.internalFormat,Et,pt,ht.colorSpace),Lt=At(b);X&&Mt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt,St,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Lt,St,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,St,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function K(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I(b.depthTexture,0);const at=i.get(b.depthTexture).__webglTexture,ct=At(b);if(b.depthTexture.format===Ai)Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0);else if(b.depthTexture.format===os)Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function et(R){const b=i.get(R),X=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");K(b.__webglFramebuffer,R)}else if(X){b.__webglDepthbuffer=[];for(let at=0;at<6;at++)e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[at]),b.__webglDepthbuffer[at]=n.createRenderbuffer(),Z(b.__webglDepthbuffer[at],R,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=n.createRenderbuffer(),Z(b.__webglDepthbuffer,R,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(R,b,X){const at=i.get(R);b!==void 0&&$(at.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&et(R)}function F(R){const b=R.texture,X=i.get(R),at=i.get(b);R.addEventListener("dispose",B),R.isWebGLMultipleRenderTargets!==!0&&(at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture()),at.__version=b.version,o.memory.textures++);const ct=R.isWebGLCubeRenderTarget===!0,ht=R.isWebGLMultipleRenderTargets===!0,Et=p(R)||a;if(ct){X.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(a&&b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer[pt]=[];for(let St=0;St<b.mipmaps.length;St++)X.__webglFramebuffer[pt][St]=n.createFramebuffer()}else X.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)X.__webglFramebuffer[pt]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(ht)if(s.drawBuffers){const pt=R.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=i.get(pt[St]);kt.__webglTexture===void 0&&(kt.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Mt(R)===!1){const pt=ht?b:[b];X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let St=0;St<pt.length;St++){const Lt=pt[St];X.__webglColorRenderbuffer[St]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[St]);const kt=r.convert(Lt.format,Lt.colorSpace),lt=r.convert(Lt.type),te=E(Lt.internalFormat,kt,lt,Lt.colorSpace,R.isXRRenderTarget===!0),Xt=At(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,te,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,X.__webglColorRenderbuffer[St])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),Z(X.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ct){e.bindTexture(n.TEXTURE_CUBE_MAP,at.__webglTexture),W(n.TEXTURE_CUBE_MAP,b,Et);for(let pt=0;pt<6;pt++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)$(X.__webglFramebuffer[pt][St],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,St);else $(X.__webglFramebuffer[pt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);M(b,Et)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ht){const pt=R.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=pt[St],lt=i.get(kt);e.bindTexture(n.TEXTURE_2D,lt.__webglTexture),W(n.TEXTURE_2D,kt,Et),$(X.__webglFramebuffer,R,kt,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,0),M(kt,Et)&&v(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?pt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(pt,at.__webglTexture),W(pt,b,Et),a&&b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)$(X.__webglFramebuffer[St],R,b,n.COLOR_ATTACHMENT0,pt,St);else $(X.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,pt,0);M(b,Et)&&v(pt),e.unbindTexture()}R.depthBuffer&&et(R)}function wt(R){const b=p(R)||a,X=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let at=0,ct=X.length;at<ct;at++){const ht=X[at];if(M(ht,b)){const Et=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pt=i.get(ht).__webglTexture;e.bindTexture(Et,pt),v(Et),e.unbindTexture()}}}function xt(R){if(a&&R.samples>0&&Mt(R)===!1){const b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],X=R.width,at=R.height;let ct=n.COLOR_BUFFER_BIT;const ht=[],Et=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(R),St=R.isWebGLMultipleRenderTargets===!0;if(St)for(let Lt=0;Lt<b.length;Lt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let Lt=0;Lt<b.length;Lt++){ht.push(n.COLOR_ATTACHMENT0+Lt),R.depthBuffer&&ht.push(Et);const kt=pt.__ignoreDepthValues!==void 0?pt.__ignoreDepthValues:!1;if(kt===!1&&(R.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),St&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]),kt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Et]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Et])),St){const lt=i.get(b[Lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,lt,0)}n.blitFramebuffer(0,0,X,at,0,0,X,at,ct,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),St)for(let Lt=0;Lt<b.length;Lt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]);const kt=i.get(b[Lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}}function At(R){return Math.min(s.maxSamples,R.samples)}function Mt(R){const b=i.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Gt(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function Ut(R,b){const X=R.colorSpace,at=R.format,ct=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===$o||X!==Pn&&X!==rn&&(oe.getTransfer(X)===fe?a===!1?t.has("EXT_sRGB")===!0&&at===gn?(R.format=$o,R.minFilter=nn,R.generateMipmaps=!1):b=Gc.sRGBToLinear(b):(at!==gn||ct!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),b}this.allocateTextureUnit=L,this.resetTextureUnits=tt,this.setTexture2D=I,this.setTexture2DArray=V,this.setTexture3D=D,this.setTextureCube=O,this.rebindTextures=rt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Mt}function pg(n,t,e){const i=e.isWebGL2;function s(r,o=rn){let a;const l=oe.getTransfer(o);if(r===oi)return n.UNSIGNED_BYTE;if(r===Uc)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Ic)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Uu)return n.BYTE;if(r===Iu)return n.SHORT;if(r===ia)return n.UNSIGNED_SHORT;if(r===Dc)return n.INT;if(r===ei)return n.UNSIGNED_INT;if(r===ni)return n.FLOAT;if(r===ws)return i?n.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Nu)return n.ALPHA;if(r===gn)return n.RGBA;if(r===Fu)return n.LUMINANCE;if(r===Ou)return n.LUMINANCE_ALPHA;if(r===Ai)return n.DEPTH_COMPONENT;if(r===os)return n.DEPTH_STENCIL;if(r===$o)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===zu)return n.RED;if(r===Nc)return n.RED_INTEGER;if(r===Bu)return n.RG;if(r===Fc)return n.RG_INTEGER;if(r===Oc)return n.RGBA_INTEGER;if(r===$r||r===Xr||r===qr||r===Yr)if(l===fe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===$r)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===$r)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Xr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===qr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Yr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===La||r===Da||r===Ua||r===Ia)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===La)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Da)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ua)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ia)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===zc)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Na||r===Fa)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Na)return l===fe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Fa)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oa||r===za||r===Ba||r===ka||r===Ha||r===Ga||r===Va||r===Wa||r===$a||r===Xa||r===qa||r===Ya||r===ja||r===Za)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Oa)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===za)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ba)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ka)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ha)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ga)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Va)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Wa)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===$a)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Xa)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===qa)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ya)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ja)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Za)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===jr||r===Ka||r===Ja)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===jr)return l===fe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ka)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ja)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ku||r===Qa||r===tl||r===el)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===jr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Qa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===tl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===el)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===wi?i?n.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class mg extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class vs extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gg={type:"move"};class Mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,i),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new vs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class _g extends cs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,_=null;const g=e.getContextAttributes();let p=null,m=null;const M=[],v=[],E=new se;let C=null;const S=new sn;S.layers.enable(1),S.viewport=new ge;const w=new sn;w.layers.enable(2),w.viewport=new ge;const B=[S,w],y=new mg;y.layers.enable(1),y.layers.enable(2);let T=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let st=M[W];return st===void 0&&(st=new Mo,M[W]=st),st.getTargetRaySpace()},this.getControllerGrip=function(W){let st=M[W];return st===void 0&&(st=new Mo,M[W]=st),st.getGripSpace()},this.getHand=function(W){let st=M[W];return st===void 0&&(st=new Mo,M[W]=st),st.getHandSpace()};function Q(W){const st=v.indexOf(W.inputSource);if(st===-1)return;const ut=M[st];ut!==void 0&&(ut.update(W.inputSource,W.frame,c||o),ut.dispatchEvent({type:W.type,data:W.inputSource}))}function tt(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",tt),s.removeEventListener("inputsourceschange",L);for(let W=0;W<M.length;W++){const st=v[W];st!==null&&(v[W]=null,M[W].disconnect(st))}T=null,z=null,t.setRenderTarget(p),d=null,f=null,u=null,s=null,m=null,ot.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",tt),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(E),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const st={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new Pi(d.framebufferWidth,d.framebufferHeight,{format:gn,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let st=null,ut=null,G=null;g.depth&&(G=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=g.stencil?os:Ai,ut=g.stencil?wi:ei);const $={colorFormat:e.RGBA8,depthFormat:G,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer($),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),m=new Pi(f.textureWidth,f.textureHeight,{format:gn,type:oi,depthTexture:new eh(f.textureWidth,f.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const Z=t.properties.get(m);Z.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ot.setContext(s),ot.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(W){for(let st=0;st<W.removed.length;st++){const ut=W.removed[st],G=v.indexOf(ut);G>=0&&(v[G]=null,M[G].disconnect(ut))}for(let st=0;st<W.added.length;st++){const ut=W.added[st];let G=v.indexOf(ut);if(G===-1){for(let Z=0;Z<M.length;Z++)if(Z>=v.length){v.push(ut),G=Z;break}else if(v[Z]===null){v[Z]=ut,G=Z;break}if(G===-1)break}const $=M[G];$&&$.connect(ut)}}const N=new H,I=new H;function V(W,st,ut){N.setFromMatrixPosition(st.matrixWorld),I.setFromMatrixPosition(ut.matrixWorld);const G=N.distanceTo(I),$=st.projectionMatrix.elements,Z=ut.projectionMatrix.elements,K=$[14]/($[10]-1),et=$[14]/($[10]+1),rt=($[9]+1)/$[5],F=($[9]-1)/$[5],wt=($[8]-1)/$[0],xt=(Z[8]+1)/Z[0],At=K*wt,Mt=K*xt,Gt=G/(-wt+xt),Ut=Gt*-wt;st.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ut),W.translateZ(Gt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const R=K+Gt,b=et+Gt,X=At-Ut,at=Mt+(G-Ut),ct=rt*et/b*R,ht=F*et/b*R;W.projectionMatrix.makePerspective(X,at,ct,ht,R,b),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function D(W,st){st===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(st.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;y.near=w.near=S.near=W.near,y.far=w.far=S.far=W.far,(T!==y.near||z!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,z=y.far);const st=W.parent,ut=y.cameras;D(y,st);for(let G=0;G<ut.length;G++)D(ut[G],st);ut.length===2?V(y,S,w):y.projectionMatrix.copy(S.projectionMatrix),O(W,y,st)};function O(W,st,ut){ut===null?W.matrix.copy(st.matrixWorld):(W.matrix.copy(ut.matrixWorld),W.matrix.invert(),W.matrix.multiply(st.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(st.projectionMatrix),W.projectionMatrixInverse.copy(st.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=As*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)};let q=null;function it(W,st){if(h=st.getViewerPose(c||o),_=st,h!==null){const ut=h.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let G=!1;ut.length!==y.cameras.length&&(y.cameras.length=0,G=!0);for(let $=0;$<ut.length;$++){const Z=ut[$];let K=null;if(d!==null)K=d.getViewport(Z);else{const rt=u.getViewSubImage(f,Z);K=rt.viewport,$===0&&(t.setRenderTargetTextures(m,rt.colorTexture,f.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(m))}let et=B[$];et===void 0&&(et=new sn,et.layers.enable($),et.viewport=new ge,B[$]=et),et.matrix.fromArray(Z.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(Z.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(K.x,K.y,K.width,K.height),$===0&&(y.matrix.copy(et.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),G===!0&&y.cameras.push(et)}}for(let ut=0;ut<M.length;ut++){const G=v[ut],$=M[ut];G!==null&&$!==void 0&&$.update(G,st,c||o)}q&&q(W,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),_=null}const ot=new th;ot.setAnimationLoop(it),this.setAnimationLoop=function(W){q=W},this.dispose=function(){}}}function vg(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Zc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,v,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,E)):m.isMeshMatcapMaterial?(r(p,m),_(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),g(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,M,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Xe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Xe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=t.get(m).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Mg(n,t,e,i){let s={},r={},o=[];const a=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const E=v.program;i.uniformBlockBinding(M,E)}function c(M,v){let E=s[M.id];E===void 0&&(_(M),E=h(M),s[M.id]=E,M.addEventListener("dispose",p));const C=v.program;i.updateUBOMapping(M,C);const S=t.render.frame;r[M.id]!==S&&(f(M),r[M.id]=S)}function h(M){const v=u();M.__bindingPointIndex=v;const E=n.createBuffer(),C=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,E),E}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],E=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let S=0,w=E.length;S<w;S++){const B=Array.isArray(E[S])?E[S]:[E[S]];for(let y=0,T=B.length;y<T;y++){const z=B[y];if(d(z,S,y,C)===!0){const Q=z.__offset,tt=Array.isArray(z.value)?z.value:[z.value];let L=0;for(let N=0;N<tt.length;N++){const I=tt[N],V=g(I);typeof I=="number"||typeof I=="boolean"?(z.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,Q+L,z.__data)):I.isMatrix3?(z.__data[0]=I.elements[0],z.__data[1]=I.elements[1],z.__data[2]=I.elements[2],z.__data[3]=0,z.__data[4]=I.elements[3],z.__data[5]=I.elements[4],z.__data[6]=I.elements[5],z.__data[7]=0,z.__data[8]=I.elements[6],z.__data[9]=I.elements[7],z.__data[10]=I.elements[8],z.__data[11]=0):(I.toArray(z.__data,L),L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Q,z.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,v,E,C){const S=M.value,w=v+"_"+E;if(C[w]===void 0)return typeof S=="number"||typeof S=="boolean"?C[w]=S:C[w]=S.clone(),!0;{const B=C[w];if(typeof S=="number"||typeof S=="boolean"){if(B!==S)return C[w]=S,!0}else if(B.equals(S)===!1)return B.copy(S),!0}return!1}function _(M){const v=M.uniforms;let E=0;const C=16;for(let w=0,B=v.length;w<B;w++){const y=Array.isArray(v[w])?v[w]:[v[w]];for(let T=0,z=y.length;T<z;T++){const Q=y[T],tt=Array.isArray(Q.value)?Q.value:[Q.value];for(let L=0,N=tt.length;L<N;L++){const I=tt[L],V=g(I),D=E%C;D!==0&&C-D<V.boundary&&(E+=C-D),Q.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=E,E+=V.storage}}}const S=E%C;return S>0&&(E+=C-S),M.__size=E,M.__cache={},this}function g(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){const v=M.target;v.removeEventListener("dispose",p);const E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class ah{constructor(t={}){const{canvas:e=pf(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const d=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this._useLegacyLights=!1,this.toneMapping=ri,this.toneMappingExposure=1;const v=this;let E=!1,C=0,S=0,w=null,B=-1,y=null;const T=new ge,z=new ge;let Q=null;const tt=new ne(0);let L=0,N=e.width,I=e.height,V=1,D=null,O=null;const q=new ge(0,0,N,I),it=new ge(0,0,N,I);let ot=!1;const W=new Qc;let st=!1,ut=!1,G=null;const $=new we,Z=new se,K=new H,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function rt(){return w===null?V:1}let F=i;function wt(A,k){for(let j=0;j<A.length;j++){const J=A[j],Y=e.getContext(J,k);if(Y!==null)return Y}return null}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${na}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const k=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&k.shift(),F=wt(k,A),F===null)throw wt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let xt,At,Mt,Gt,Ut,R,b,X,at,ct,ht,Et,pt,St,Lt,kt,lt,te,Xt,zt,Pt,bt,Nt,Jt;function ue(){xt=new Cm(F),At=new Sm(F,xt,t),xt.init(At),bt=new pg(F,xt,At),Mt=new fg(F,xt,At),Gt=new Dm(F),Ut=new J0,R=new dg(F,xt,Mt,Ut,At,bt,Gt),b=new Em(v),X=new Rm(v),at=new Bf(F,At),Nt=new ym(F,xt,at,At),ct=new Pm(F,at,Gt,Nt),ht=new Fm(F,ct,at,Gt),Xt=new Nm(F,At,R),kt=new bm(Ut),Et=new K0(v,b,X,xt,At,Nt,kt),pt=new vg(v,Ut),St=new tg,Lt=new og(xt,At),te=new Mm(v,b,X,Mt,ht,f,l),lt=new ug(v,ht,At),Jt=new Mg(F,Gt,At,Mt),zt=new xm(F,xt,Gt,At),Pt=new Lm(F,xt,Gt,At),Gt.programs=Et.programs,v.capabilities=At,v.extensions=xt,v.properties=Ut,v.renderLists=St,v.shadowMap=lt,v.state=Mt,v.info=Gt}ue();const Yt=new _g(v,F);this.xr=Yt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=xt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=xt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(N,I,!1))},this.getSize=function(A){return A.set(N,I)},this.setSize=function(A,k,j=!0){if(Yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,I=k,e.width=Math.floor(A*V),e.height=Math.floor(k*V),j===!0&&(e.style.width=A+"px",e.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(N*V,I*V).floor()},this.setDrawingBufferSize=function(A,k,j){N=A,I=k,V=j,e.width=Math.floor(A*j),e.height=Math.floor(k*j),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(q)},this.setViewport=function(A,k,j,J){A.isVector4?q.set(A.x,A.y,A.z,A.w):q.set(A,k,j,J),Mt.viewport(T.copy(q).multiplyScalar(V).floor())},this.getScissor=function(A){return A.copy(it)},this.setScissor=function(A,k,j,J){A.isVector4?it.set(A.x,A.y,A.z,A.w):it.set(A,k,j,J),Mt.scissor(z.copy(it).multiplyScalar(V).floor())},this.getScissorTest=function(){return ot},this.setScissorTest=function(A){Mt.setScissorTest(ot=A)},this.setOpaqueSort=function(A){D=A},this.setTransparentSort=function(A){O=A},this.getClearColor=function(A){return A.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(A=!0,k=!0,j=!0){let J=0;if(A){let Y=!1;if(w!==null){const yt=w.texture.format;Y=yt===Oc||yt===Fc||yt===Nc}if(Y){const yt=w.texture.type,Ct=yt===oi||yt===ei||yt===ia||yt===wi||yt===Uc||yt===Ic,It=te.getClearColor(),Bt=te.getClearAlpha(),qt=It.r,Vt=It.g,Wt=It.b;Ct?(d[0]=qt,d[1]=Vt,d[2]=Wt,d[3]=Bt,F.clearBufferuiv(F.COLOR,0,d)):(_[0]=qt,_[1]=Vt,_[2]=Wt,_[3]=Bt,F.clearBufferiv(F.COLOR,0,_))}else J|=F.COLOR_BUFFER_BIT}k&&(J|=F.DEPTH_BUFFER_BIT),j&&(J|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),St.dispose(),Lt.dispose(),Ut.dispose(),b.dispose(),X.dispose(),ht.dispose(),Nt.dispose(),Jt.dispose(),Et.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",Oe),Yt.removeEventListener("sessionend",he),G&&(G.dispose(),G=null),ze.stop()};function dt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=Gt.autoReset,k=lt.enabled,j=lt.autoUpdate,J=lt.needsUpdate,Y=lt.type;ue(),Gt.autoReset=A,lt.enabled=k,lt.autoUpdate=j,lt.needsUpdate=J,lt.type=Y}function gt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function _t(A){const k=A.target;k.removeEventListener("dispose",_t),Ft(k)}function Ft(A){Dt(A),Ut.remove(A)}function Dt(A){const k=Ut.get(A).programs;k!==void 0&&(k.forEach(function(j){Et.releaseProgram(j)}),A.isShaderMaterial&&Et.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,j,J,Y,yt){k===null&&(k=et);const Ct=Y.isMesh&&Y.matrixWorld.determinant()<0,It=qh(A,k,j,J,Y);Mt.setMaterial(J,Ct);let Bt=j.index,qt=1;if(J.wireframe===!0){if(Bt=ct.getWireframeAttribute(j),Bt===void 0)return;qt=2}const Vt=j.drawRange,Wt=j.attributes.position;let me=Vt.start*qt,Ye=(Vt.start+Vt.count)*qt;yt!==null&&(me=Math.max(me,yt.start*qt),Ye=Math.min(Ye,(yt.start+yt.count)*qt)),Bt!==null?(me=Math.max(me,0),Ye=Math.min(Ye,Bt.count)):Wt!=null&&(me=Math.max(me,0),Ye=Math.min(Ye,Wt.count));const be=Ye-me;if(be<0||be===1/0)return;Nt.setup(Y,J,It,j,Bt);let Un,de=zt;if(Bt!==null&&(Un=at.get(Bt),de=Pt,de.setIndex(Un)),Y.isMesh)J.wireframe===!0?(Mt.setLineWidth(J.wireframeLinewidth*rt()),de.setMode(F.LINES)):de.setMode(F.TRIANGLES);else if(Y.isLine){let jt=J.linewidth;jt===void 0&&(jt=1),Mt.setLineWidth(jt*rt()),Y.isLineSegments?de.setMode(F.LINES):Y.isLineLoop?de.setMode(F.LINE_LOOP):de.setMode(F.LINE_STRIP)}else Y.isPoints?de.setMode(F.POINTS):Y.isSprite&&de.setMode(F.TRIANGLES);if(Y.isBatchedMesh)de.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)de.renderInstances(me,be,Y.count);else if(j.isInstancedBufferGeometry){const jt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,zr=Math.min(j.instanceCount,jt);de.renderInstances(me,be,zr)}else de.render(me,be)};function le(A,k,j){A.transparent===!0&&A.side===Vn&&A.forceSinglePass===!1?(A.side=Xe,A.needsUpdate=!0,Is(A,k,j),A.side=ai,A.needsUpdate=!0,Is(A,k,j),A.side=Vn):Is(A,k,j)}this.compile=function(A,k,j=null){j===null&&(j=A),p=Lt.get(j),p.init(),M.push(p),j.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),A!==j&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights(v._useLegacyLights);const J=new Set;return A.traverse(function(Y){const yt=Y.material;if(yt)if(Array.isArray(yt))for(let Ct=0;Ct<yt.length;Ct++){const It=yt[Ct];le(It,j,Y),J.add(It)}else le(yt,j,Y),J.add(yt)}),M.pop(),p=null,J},this.compileAsync=function(A,k,j=null){const J=this.compile(A,k,j);return new Promise(Y=>{function yt(){if(J.forEach(function(Ct){Ut.get(Ct).currentProgram.isReady()&&J.delete(Ct)}),J.size===0){Y(A);return}setTimeout(yt,10)}xt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let ce=null;function Se(A){ce&&ce(A)}function Oe(){ze.stop()}function he(){ze.start()}const ze=new th;ze.setAnimationLoop(Se),typeof self<"u"&&ze.setContext(self),this.setAnimationLoop=function(A){ce=A,Yt.setAnimationLoop(A),A===null?ze.stop():ze.start()},Yt.addEventListener("sessionstart",Oe),Yt.addEventListener("sessionend",he),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(k),k=Yt.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,k,w),p=Lt.get(A,M.length),p.init(),M.push(p),$.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),W.setFromProjectionMatrix($),ut=this.localClippingEnabled,st=kt.init(this.clippingPlanes,ut),g=St.get(A,m.length),g.init(),m.push(g),Mn(A,k,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(D,O),this.info.render.frame++,st===!0&&kt.beginShadows();const j=p.state.shadowsArray;if(lt.render(j,A,k),st===!0&&kt.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(g,A),p.setupLights(v._useLegacyLights),k.isArrayCamera){const J=k.cameras;for(let Y=0,yt=J.length;Y<yt;Y++){const Ct=J[Y];Ma(g,A,Ct,Ct.viewport)}}else Ma(g,A,k);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(v,A,k),Nt.resetDefaultState(),B=-1,y=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Mn(A,k,j,J){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||W.intersectsSprite(A)){J&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4($);const Ct=ht.update(A),It=A.material;It.visible&&g.push(A,Ct,It,j,K.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||W.intersectsObject(A))){const Ct=ht.update(A),It=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),K.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),K.copy(Ct.boundingSphere.center)),K.applyMatrix4(A.matrixWorld).applyMatrix4($)),Array.isArray(It)){const Bt=Ct.groups;for(let qt=0,Vt=Bt.length;qt<Vt;qt++){const Wt=Bt[qt],me=It[Wt.materialIndex];me&&me.visible&&g.push(A,Ct,me,j,K.z,Wt)}}else It.visible&&g.push(A,Ct,It,j,K.z,null)}}const yt=A.children;for(let Ct=0,It=yt.length;Ct<It;Ct++)Mn(yt[Ct],k,j,J)}function Ma(A,k,j,J){const Y=A.opaque,yt=A.transmissive,Ct=A.transparent;p.setupLightsView(j),st===!0&&kt.setGlobalState(v.clippingPlanes,j),yt.length>0&&Xh(Y,yt,k,j),J&&Mt.viewport(T.copy(J)),Y.length>0&&Us(Y,k,j),yt.length>0&&Us(yt,k,j),Ct.length>0&&Us(Ct,k,j),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Xh(A,k,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const yt=At.isWebGL2;G===null&&(G=new Pi(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")?ws:oi,minFilter:Ts,samples:yt?4:0})),v.getDrawingBufferSize(Z),yt?G.setSize(Z.x,Z.y):G.setSize(Er(Z.x),Er(Z.y));const Ct=v.getRenderTarget();v.setRenderTarget(G),v.getClearColor(tt),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const It=v.toneMapping;v.toneMapping=ri,Us(A,j,J),R.updateMultisampleRenderTarget(G),R.updateRenderTargetMipmap(G);let Bt=!1;for(let qt=0,Vt=k.length;qt<Vt;qt++){const Wt=k[qt],me=Wt.object,Ye=Wt.geometry,be=Wt.material,Un=Wt.group;if(be.side===Vn&&me.layers.test(J.layers)){const de=be.side;be.side=Xe,be.needsUpdate=!0,ya(me,j,J,Ye,be,Un),be.side=de,be.needsUpdate=!0,Bt=!0}}Bt===!0&&(R.updateMultisampleRenderTarget(G),R.updateRenderTargetMipmap(G)),v.setRenderTarget(Ct),v.setClearColor(tt,L),v.toneMapping=It}function Us(A,k,j){const J=k.isScene===!0?k.overrideMaterial:null;for(let Y=0,yt=A.length;Y<yt;Y++){const Ct=A[Y],It=Ct.object,Bt=Ct.geometry,qt=J===null?Ct.material:J,Vt=Ct.group;It.layers.test(j.layers)&&ya(It,k,j,Bt,qt,Vt)}}function ya(A,k,j,J,Y,yt){A.onBeforeRender(v,k,j,J,Y,yt),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(v,k,j,J,A,yt),Y.transparent===!0&&Y.side===Vn&&Y.forceSinglePass===!1?(Y.side=Xe,Y.needsUpdate=!0,v.renderBufferDirect(j,k,J,Y,A,yt),Y.side=ai,Y.needsUpdate=!0,v.renderBufferDirect(j,k,J,Y,A,yt),Y.side=Vn):v.renderBufferDirect(j,k,J,Y,A,yt),A.onAfterRender(v,k,j,J,Y,yt)}function Is(A,k,j){k.isScene!==!0&&(k=et);const J=Ut.get(A),Y=p.state.lights,yt=p.state.shadowsArray,Ct=Y.state.version,It=Et.getParameters(A,Y.state,yt,k,j),Bt=Et.getProgramCacheKey(It);let qt=J.programs;J.environment=A.isMeshStandardMaterial?k.environment:null,J.fog=k.fog,J.envMap=(A.isMeshStandardMaterial?X:b).get(A.envMap||J.environment),qt===void 0&&(A.addEventListener("dispose",_t),qt=new Map,J.programs=qt);let Vt=qt.get(Bt);if(Vt!==void 0){if(J.currentProgram===Vt&&J.lightsStateVersion===Ct)return Sa(A,It),Vt}else It.uniforms=Et.getUniforms(A),A.onBuild(j,It,v),A.onBeforeCompile(It,v),Vt=Et.acquireProgram(It,Bt),qt.set(Bt,Vt),J.uniforms=It.uniforms;const Wt=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Wt.clippingPlanes=kt.uniform),Sa(A,It),J.needsLights=jh(A),J.lightsStateVersion=Ct,J.needsLights&&(Wt.ambientLightColor.value=Y.state.ambient,Wt.lightProbe.value=Y.state.probe,Wt.directionalLights.value=Y.state.directional,Wt.directionalLightShadows.value=Y.state.directionalShadow,Wt.spotLights.value=Y.state.spot,Wt.spotLightShadows.value=Y.state.spotShadow,Wt.rectAreaLights.value=Y.state.rectArea,Wt.ltc_1.value=Y.state.rectAreaLTC1,Wt.ltc_2.value=Y.state.rectAreaLTC2,Wt.pointLights.value=Y.state.point,Wt.pointLightShadows.value=Y.state.pointShadow,Wt.hemisphereLights.value=Y.state.hemi,Wt.directionalShadowMap.value=Y.state.directionalShadowMap,Wt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Wt.spotShadowMap.value=Y.state.spotShadowMap,Wt.spotLightMatrix.value=Y.state.spotLightMatrix,Wt.spotLightMap.value=Y.state.spotLightMap,Wt.pointShadowMap.value=Y.state.pointShadowMap,Wt.pointShadowMatrix.value=Y.state.pointShadowMatrix),J.currentProgram=Vt,J.uniformsList=null,Vt}function xa(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=mr.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function Sa(A,k){const j=Ut.get(A);j.outputColorSpace=k.outputColorSpace,j.batching=k.batching,j.instancing=k.instancing,j.instancingColor=k.instancingColor,j.skinning=k.skinning,j.morphTargets=k.morphTargets,j.morphNormals=k.morphNormals,j.morphColors=k.morphColors,j.morphTargetsCount=k.morphTargetsCount,j.numClippingPlanes=k.numClippingPlanes,j.numIntersection=k.numClipIntersection,j.vertexAlphas=k.vertexAlphas,j.vertexTangents=k.vertexTangents,j.toneMapping=k.toneMapping}function qh(A,k,j,J,Y){k.isScene!==!0&&(k=et),R.resetTextureUnits();const yt=k.fog,Ct=J.isMeshStandardMaterial?k.environment:null,It=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Pn,Bt=(J.isMeshStandardMaterial?X:b).get(J.envMap||Ct),qt=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Vt=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Wt=!!j.morphAttributes.position,me=!!j.morphAttributes.normal,Ye=!!j.morphAttributes.color;let be=ri;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(be=v.toneMapping);const Un=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,de=Un!==void 0?Un.length:0,jt=Ut.get(J),zr=p.state.lights;if(st===!0&&(ut===!0||A!==y)){const tn=A===y&&J.id===B;kt.setState(J,A,tn)}let pe=!1;J.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==zr.state.version||jt.outputColorSpace!==It||Y.isBatchedMesh&&jt.batching===!1||!Y.isBatchedMesh&&jt.batching===!0||Y.isInstancedMesh&&jt.instancing===!1||!Y.isInstancedMesh&&jt.instancing===!0||Y.isSkinnedMesh&&jt.skinning===!1||!Y.isSkinnedMesh&&jt.skinning===!0||Y.isInstancedMesh&&jt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&jt.instancingColor===!1&&Y.instanceColor!==null||jt.envMap!==Bt||J.fog===!0&&jt.fog!==yt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==kt.numPlanes||jt.numIntersection!==kt.numIntersection)||jt.vertexAlphas!==qt||jt.vertexTangents!==Vt||jt.morphTargets!==Wt||jt.morphNormals!==me||jt.morphColors!==Ye||jt.toneMapping!==be||At.isWebGL2===!0&&jt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,jt.__version=J.version);let hi=jt.currentProgram;pe===!0&&(hi=Is(J,k,Y));let ba=!1,fs=!1,Br=!1;const Le=hi.getUniforms(),ui=jt.uniforms;if(Mt.useProgram(hi.program)&&(ba=!0,fs=!0,Br=!0),J.id!==B&&(B=J.id,fs=!0),ba||y!==A){Le.setValue(F,"projectionMatrix",A.projectionMatrix),Le.setValue(F,"viewMatrix",A.matrixWorldInverse);const tn=Le.map.cameraPosition;tn!==void 0&&tn.setValue(F,K.setFromMatrixPosition(A.matrixWorld)),At.logarithmicDepthBuffer&&Le.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Le.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,fs=!0,Br=!0)}if(Y.isSkinnedMesh){Le.setOptional(F,Y,"bindMatrix"),Le.setOptional(F,Y,"bindMatrixInverse");const tn=Y.skeleton;tn&&(At.floatVertexTextures?(tn.boneTexture===null&&tn.computeBoneTexture(),Le.setValue(F,"boneTexture",tn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Y.isBatchedMesh&&(Le.setOptional(F,Y,"batchingTexture"),Le.setValue(F,"batchingTexture",Y._matricesTexture,R));const kr=j.morphAttributes;if((kr.position!==void 0||kr.normal!==void 0||kr.color!==void 0&&At.isWebGL2===!0)&&Xt.update(Y,j,hi),(fs||jt.receiveShadow!==Y.receiveShadow)&&(jt.receiveShadow=Y.receiveShadow,Le.setValue(F,"receiveShadow",Y.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(ui.envMap.value=Bt,ui.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),fs&&(Le.setValue(F,"toneMappingExposure",v.toneMappingExposure),jt.needsLights&&Yh(ui,Br),yt&&J.fog===!0&&pt.refreshFogUniforms(ui,yt),pt.refreshMaterialUniforms(ui,J,V,I,G),mr.upload(F,xa(jt),ui,R)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(mr.upload(F,xa(jt),ui,R),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Le.setValue(F,"center",Y.center),Le.setValue(F,"modelViewMatrix",Y.modelViewMatrix),Le.setValue(F,"normalMatrix",Y.normalMatrix),Le.setValue(F,"modelMatrix",Y.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const tn=J.uniformsGroups;for(let Hr=0,Zh=tn.length;Hr<Zh;Hr++)if(At.isWebGL2){const Ea=tn[Hr];Jt.update(Ea,hi),Jt.bind(Ea,hi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return hi}function Yh(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function jh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,k,j){Ut.get(A.texture).__webglTexture=k,Ut.get(A.depthTexture).__webglTexture=j;const J=Ut.get(A);J.__hasExternalTextures=!0,J.__hasExternalTextures&&(J.__autoAllocateDepthBuffer=j===void 0,J.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,k){const j=Ut.get(A);j.__webglFramebuffer=k,j.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,j=0){w=A,C=k,S=j;let J=!0,Y=null,yt=!1,Ct=!1;if(A){const Bt=Ut.get(A);Bt.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(F.FRAMEBUFFER,null),J=!1):Bt.__webglFramebuffer===void 0?R.setupRenderTarget(A):Bt.__hasExternalTextures&&R.rebindTextures(A,Ut.get(A.texture).__webglTexture,Ut.get(A.depthTexture).__webglTexture);const qt=A.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Ct=!0);const Vt=Ut.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[k])?Y=Vt[k][j]:Y=Vt[k],yt=!0):At.isWebGL2&&A.samples>0&&R.useMultisampledRTT(A)===!1?Y=Ut.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?Y=Vt[j]:Y=Vt,T.copy(A.viewport),z.copy(A.scissor),Q=A.scissorTest}else T.copy(q).multiplyScalar(V).floor(),z.copy(it).multiplyScalar(V).floor(),Q=ot;if(Mt.bindFramebuffer(F.FRAMEBUFFER,Y)&&At.drawBuffers&&J&&Mt.drawBuffers(A,Y),Mt.viewport(T),Mt.scissor(z),Mt.setScissorTest(Q),yt){const Bt=Ut.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,Bt.__webglTexture,j)}else if(Ct){const Bt=Ut.get(A.texture),qt=k||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Bt.__webglTexture,j||0,qt)}B=-1},this.readRenderTargetPixels=function(A,k,j,J,Y,yt,Ct){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=Ut.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(It=It[Ct]),It){Mt.bindFramebuffer(F.FRAMEBUFFER,It);try{const Bt=A.texture,qt=Bt.format,Vt=Bt.type;if(qt!==gn&&bt.convert(qt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Wt=Vt===ws&&(xt.has("EXT_color_buffer_half_float")||At.isWebGL2&&xt.has("EXT_color_buffer_float"));if(Vt!==oi&&bt.convert(Vt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===ni&&(At.isWebGL2||xt.has("OES_texture_float")||xt.has("WEBGL_color_buffer_float")))&&!Wt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-J&&j>=0&&j<=A.height-Y&&F.readPixels(k,j,J,Y,bt.convert(qt),bt.convert(Vt),yt)}finally{const Bt=w!==null?Ut.get(w).__webglFramebuffer:null;Mt.bindFramebuffer(F.FRAMEBUFFER,Bt)}}},this.copyFramebufferToTexture=function(A,k,j=0){const J=Math.pow(2,-j),Y=Math.floor(k.image.width*J),yt=Math.floor(k.image.height*J);R.setTexture2D(k,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,A.x,A.y,Y,yt),Mt.unbindTexture()},this.copyTextureToTexture=function(A,k,j,J=0){const Y=k.image.width,yt=k.image.height,Ct=bt.convert(j.format),It=bt.convert(j.type);R.setTexture2D(j,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,j.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,j.unpackAlignment),k.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,J,A.x,A.y,Y,yt,Ct,It,k.image.data):k.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,J,A.x,A.y,k.mipmaps[0].width,k.mipmaps[0].height,Ct,k.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,J,A.x,A.y,Ct,It,k.image),J===0&&j.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(A,k,j,J,Y=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const yt=A.max.x-A.min.x+1,Ct=A.max.y-A.min.y+1,It=A.max.z-A.min.z+1,Bt=bt.convert(J.format),qt=bt.convert(J.type);let Vt;if(J.isData3DTexture)R.setTexture3D(J,0),Vt=F.TEXTURE_3D;else if(J.isDataArrayTexture||J.isCompressedArrayTexture)R.setTexture2DArray(J,0),Vt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,J.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,J.unpackAlignment);const Wt=F.getParameter(F.UNPACK_ROW_LENGTH),me=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ye=F.getParameter(F.UNPACK_SKIP_PIXELS),be=F.getParameter(F.UNPACK_SKIP_ROWS),Un=F.getParameter(F.UNPACK_SKIP_IMAGES),de=j.isCompressedTexture?j.mipmaps[Y]:j.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,de.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,de.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,A.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,A.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,A.min.z),j.isDataTexture||j.isData3DTexture?F.texSubImage3D(Vt,Y,k.x,k.y,k.z,yt,Ct,It,Bt,qt,de.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Vt,Y,k.x,k.y,k.z,yt,Ct,It,Bt,de.data)):F.texSubImage3D(Vt,Y,k.x,k.y,k.z,yt,Ct,It,Bt,qt,de),F.pixelStorei(F.UNPACK_ROW_LENGTH,Wt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,me),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ye),F.pixelStorei(F.UNPACK_SKIP_ROWS,be),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Un),Y===0&&J.generateMipmaps&&F.generateMipmap(Vt),Mt.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),Mt.unbindTexture()},this.resetState=function(){C=0,S=0,w=null,Mt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===sa?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Ur?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pe?Ri:Bc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ri?Pe:Pn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class yg extends ah{}yg.prototype.isWebGL1Renderer=!0;class ca{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new ne(t),this.near=e,this.far=i}clone(){return new ca(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class xg extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Sg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Wo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new H;class on{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new _n(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new on(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bg extends Yn{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,s=new H,r=new H;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],f=u.start,d=u.count;for(let _=f,g=f+d;_<g;_+=3)for(let p=0;p<3;p++){const m=a.getX(_+p),M=a.getX(_+(p+1)%3);s.fromBufferAttribute(o,m),r.fromBufferAttribute(o,M),Wl(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const h=3*a+c,u=3*a+(c+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),Wl(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Cn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Wl(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(s)===!0?!1:(e.add(i),e.add(s),!0)}class Eg extends Yn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Rs extends Sg{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const $l=new H,ir=new H;class Tg{constructor(t=new H,e=new H){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){$l.subVectors(t,this.start),ir.subVectors(this.end,this.start);const i=ir.dot(ir);let r=ir.dot($l)/i;return e&&(r=Ne(r,0,1)),r}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:na}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=na);const wg={songbird:{view:{x0:-4,x1:14,y0:-6,y1:8},silhouette:[[-3.2,-1.2],[-1.6,-3.4],[1.6,-4.6],[5.2,-4.4],[7.8,-2.6],[9,-.4],[9.6,1.8],[10.4,2.4],[12.8,2.6],[10.6,3],[9.8,3.6],[9.2,4.6],[7.6,5.2],[6,4.6],[4.2,2.8],[2,2],[-.2,1.6],[-3.6,1.4],[-3.4,.2]],parts:[{shade:.2,pts:[[8.6,4],[8.95,4.3],[9.2,4],[8.95,3.7]]}],tubes:[{tube:"bronchusL",path:[[3.4,-1.9],[4.4,-1.4]],label:"Left bronchus",inView:!1},{tube:"bronchusR",path:[[3.4,-.9],[4.4,-1.2]],label:"Right bronchus",inView:!1},{tube:"trachea",path:[[4.4,-1.3],[5.6,-.4],[6.8,.8],[7.8,1.9],[8.6,2.5]],label:"Trachea"},{tube:"beak",path:[[9.4,2.75],[10.6,2.75],[12.4,2.7]],label:"Beak"}],tubeScale:1.6,sources:[{key:"left",at:[4.2,-1.6],label:"Left voice"},{key:"right",at:[4.2,-1],label:"Right voice"}]},seal:{view:{x0:-60,x1:60,y0:-30,y1:30},silhouette:[[-58,-2],[-50,-8],[-30,-14],[-5,-16],[20,-14],[38,-10],[48,-6],[55,-3],[58,1],[56,5],[50,8],[42,10],[30,11],[10,13],[-15,13],[-35,10],[-50,6],[-56,3],[-62,8],[-64,4],[-60,0],[-64,-4],[-62,-8]],parts:[{shade:.15,pts:[[47,4],[48.5,5],[50,4],[48.5,3]]}],tubes:[{tube:"trachea",path:[[8,-4],[20,-3],[30,-2]],label:"Trachea"},{tube:"pharynx",path:[[30,-2],[38,0],[44,1.5]],label:"Pharynx"},{tube:"oral",path:[[44,1.5],[50,.5],[57,-.5]],label:"Mouth"}],tubeScale:1.3,sources:[{key:"glottis",at:[30,-2],label:"Larynx"}]},alligator:{view:{x0:-120,x1:120,y0:-40,y1:40},silhouette:[[-118,2],[-90,-4],[-60,-8],[-30,-14],[0,-16],[30,-14],[50,-10],[70,-8],[95,-5],[114,-3],[118,0],[115,3],[98,5],[75,7],[52,9],[40,12],[20,14],[-10,14],[-40,11],[-70,7],[-100,4]],parts:[{shade:.15,pts:[[54,9],[56,11],[58,9],[56,8]]}],tubes:[{tube:"trachea",path:[[0,-6],[18,-5],[36,-4]],label:"Trachea"},{tube:"pharynx",path:[[36,-4],[46,-2],[54,0]],label:"Pharynx"},{tube:"oral",path:[[54,0],[80,-1],[112,-1]],label:"Mouth"},{tube:"nasal",path:[[54,2],[80,4],[113,2]],label:"Nostrils"}],tubeScale:1.05,sources:[{key:"glottis",at:[36,-4],label:"Larynx"}]},elephant:{view:{x0:-170,x1:170,y0:-170,y1:130},silhouette:[[-160,20],[-150,70],[-110,105],[-40,118],[30,115],[70,100],[95,112],[120,108],[140,85],[148,55],[146,25],[140,5],[132,-20],[128,-60],[122,-110],[118,-150],[108,-152],[112,-100],[110,-50],[104,-20],[96,-5],[80,0],[70,-10],[66,-90],[40,-95],[44,-30],[-90,-30],[-95,-95],[-125,-95],[-122,-10],[-150,-5]],parts:[{shade:.15,pts:[[118,62],[122,66],[126,62],[122,58]]},{shade:.62,pts:[[70,100],[40,60],[55,25],[85,40],[95,80]]}],tubes:[{tube:"trachea",path:[[40,20],[70,30],[95,38]],label:"Trachea"},{tube:"pharynx",path:[[95,38],[112,50],[124,58]],label:"Pharynx"},{tube:"oral",path:[[124,58],[130,42],[134,30]],label:"Mouth"},{tube:"trunk",path:[[136,70],[142,40],[136,0],[128,-50],[120,-100],[113,-148]],label:"Trunk"}],tubeScale:3,sources:[{key:"glottis",at:[95,38],label:"Vocal folds"},{key:"lips",at:[136,70],label:"Trunk valve"}]}},Ve=ls("catalog"),wr=Ve.neutral;Ve.bodies.male;Ve.bodies.female;Ve.bodies.child;const bi=Ve.articKeys;Ve.articSpecs;Ve.defaultSource;Ve.exhaleLabel;Ve.bassNote;Ve.beatSounds;Ve.beatPresets;const Ag=Ve.vowelTargets;Ve.demoSongs;const Rg=Ve.vowels;Ve.creatures.map(n=>({...n,visual:wg[n.id]}));class Cg{constructor(t){this.scale=t.scale,this.ph=t.pharynx}P(t,e){const i=this.scale,s=t>.5?.5+(t-.5)*.86:t,r=e<7?7-(7-e)*this.ph:e;return{x:s*i,y:r*i}}unP(t,e){const i=this.scale;let s=t/i,r=e/i;return s>.5&&(s=.5+(s-.5)/.86),r<7&&(r=7-(7-r)/this.ph),{x:s,y:r}}}function Pg(n,t){return ls("model",{body:n,sampleRate:t})}function Lg(n){ls("dropModel",{model:n.model})}function Dg(n,t){return ls("frame",{model:n.model,artic:t})}function Ug(n,t){return ls("apply",{model:n.model,artic:t})}function Ig(n,t){return ls("transfer",{model:n.model,artic:t})}const mt={blue:"#4fb6f2",blueMid:"#3487c4",blueDim:"#1f5f8c",frame:"#133954",green:"#5be381",red:"#ff5d40",pink:"#ff73cf",white:"#eef6f8",amber:"#ffb340"};mt.green,mt.red,mt.pink,mt.white;function ln(n,t,e){const i=parseInt(n.slice(1),16),s=parseInt(t.slice(1),16),r=o=>Math.round((i>>o&255)*(1-e)+(s>>o&255)*e);return"#"+[16,8,0].map(o=>r(o).toString(16).padStart(2,"0")).join("")}const ha=n=>ln(n,"#ffffff",.55),Bn=[[0,"#3a2408"],[.35,"#c9822a"],[.6,"#ffb340"],[.82,"#ffe39a"],[1,"#fff8ec"]];function Ng(n){const t=Math.max(0,Math.min(1,n));for(let e=1;e<Bn.length;e++)if(t<=Bn[e][0])return ln(Bn[e-1][1],Bn[e][1],(t-Bn[e-1][0])/(Bn[e][0]-Bn[e-1][0]));return Bn[Bn.length-1][1]}mt.frame,mt.blue,mt.blueMid,mt.amber;const Fg=n=>{if(!(n>0))return 0;const t=Math.log10(40),e=Math.log10(4e3);return Math.max(0,Math.min(1,(Math.log10(n)-t)/(e-t)))},Og=(n,t)=>Math.hypot(n.x-t.x,n.y-t.y),lh=(n,t,e)=>{const i=Math.sin(e),s=Math.cos(e),r=n.x-t.x,o=n.y-t.y;return{x:t.x+r*s-o*i,y:t.y+r*i+o*s}};function Hn(n,t){if(n.length<3)return n.slice();const e=[];for(let i=0;i<n.length-1;i++){const s=n[Math.max(0,i-1)],r=n[i],o=n[i+1],a=n[Math.min(n.length-1,i+2)];for(let l=0;l<t;l++){const c=l/t,h=c*c,u=h*c;e.push({x:.5*(2*r.x+(-s.x+o.x)*c+(2*s.x-5*r.x+4*o.x-a.x)*h+(-s.x+3*r.x-3*o.x+a.x)*u),y:.5*(2*r.y+(-s.y+o.y)*c+(2*s.y-5*r.y+4*o.y-a.y)*h+(-s.y+3*r.y-3*o.y+a.y)*u)})}}return e.push(n[n.length-1]),e}const ch='"Hershey", "Archivo", system-ui, sans-serif',ua=(n,t="l")=>`${t==="m"?500:300} ${n}px ${ch}`,hh=typeof CanvasRenderingContext2D<"u"&&"letterSpacing"in CanvasRenderingContext2D.prototype;function uh(n,t=!1){const e=new Path2D;if(n.length===0)return e;e.moveTo(n[0][0],n[0][1]);for(let i=1;i<n.length;i++)e.lineTo(n[i][0],n[i][1]);return t&&e.closePath(),e}function nt(n,t,e,i,s={}){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.lineJoin="round",n.lineCap="round",n.setLineDash(s.dash??[]),n.strokeStyle=e,n.lineWidth=i,n.stroke(t),s.hot&&(n.globalCompositeOperation="source-over",n.strokeStyle=ha(e),n.lineWidth=i*.42,n.stroke(t)),n.restore()}function fh(n,t,e,i,s={}){t.length<2||nt(n,uh(t,s.close),e,i,s)}function Ot(n,t,e,i,s,r,o,a={}){const l=new Path2D;l.moveTo(t,e),l.lineTo(i,s),nt(n,l,r,o,a)}function Fe(n,t,e,i,s,r=1.2,o={}){const a=new Path2D;a.arc(t,e,i,0,Math.PI*2),nt(n,a,s,r,o)}function _e(n,t,e,i,s,r=1){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=r,n.fillStyle=s,n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.fill(),n.restore()}function vt(n,t,e,i,s={}){const r=s.size??11;n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.font=ua(r,s.weight),hh&&(n.letterSpacing=`${((s.ls??.14)*r).toFixed(2)}px`),n.textAlign=s.align??"left",n.textBaseline=s.baseline??"alphabetic",n.fillStyle=s.color??mt.blue;const o=n;s.moving&&(o.layoutMoving=!0),n.fillText(t,e,i),o.layoutMoving=void 0,n.restore()}function ae(n,t,e={}){const i=e.size??11;n.save(),n.font=ua(i,e.weight),hh&&(n.letterSpacing=`${((e.ls??.14)*i).toFixed(2)}px`);const s=n.measureText(t).width;return n.restore(),s}function Di(n,t,e,i={}){const s=[];for(const r of t.split(/\s+/)){const o=s[s.length-1];o!==void 0&&ae(n,`${o} ${r}`,i)<=e?s[s.length-1]=`${o} ${r}`:s.push(r)}return s}const zg=(n=11)=>n*1.6;function dh(n,t,e,i,s,r={}){const o=r.size??11,a=Di(n,t,s,r),l=zg(o),c=i-(a.length-1)*l/2+o*.35;a.forEach((h,u)=>vt(n,h,e,c+u*l,r))}function Yo(n,t=2){let e=n.length>1&&n[0][0]===n[n.length-1][0]&&n[0][1]===n[n.length-1][1]?n.slice(0,-1):n.slice();for(let i=0;i<t;i++){const s=[];for(let r=0;r<e.length;r++){const o=e[r],a=e[(r+1)%e.length];s.push([o[0]*.75+a[0]*.25,o[1]*.75+a[1]*.25],[o[0]*.25+a[0]*.75,o[1]*.25+a[1]*.75])}e=s}return e.length?[...e,e[0]]:e}class ph{constructor(t=2,e=.75,i=4){this.sigma=t,this.alpha=e,this.down=i,this.small=document.createElement("canvas"),this.sctx=this.small.getContext("2d"),this.canFilter=typeof this.sctx.filter=="string"}apply(t,e,i){const s=t.width,r=t.height,o=Math.max(1,Math.round(s/this.down)),a=Math.max(1,Math.round(r/this.down));(this.small.width!==o||this.small.height!==a)&&(this.small.width=o,this.small.height=a);const l=this.sctx;l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation="copy",this.canFilter&&(l.filter=`blur(${(this.sigma*i/this.down).toFixed(2)}px)`),l.drawImage(t,0,0,o,a),this.canFilter&&(l.filter="none"),e.save(),e.setTransform(1,0,0,1,0,0),e.globalCompositeOperation="screen",e.globalAlpha=this.alpha,e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.small,0,0,s,r),e.restore()}}const Xl=new ci,sr=new H;class jo extends Eg{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Cn(t,3)),this.setAttribute("uv",new Cn(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Rs(e,6,1);return this.setAttribute("instanceStart",new on(i,3,0)),this.setAttribute("instanceEnd",new on(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Rs(e,6,1);return this.setAttribute("instanceColorStart",new on(i,3,0)),this.setAttribute("instanceColorEnd",new on(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new bg(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Xl.setFromBufferAttribute(e),this.boundingBox.union(Xl))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)sr.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(sr)),sr.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(sr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}ft.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new se(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};$e.line={uniforms:oa.merge([ft.common,ft.fog,ft.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class mh extends li{constructor(t){super({type:"LineMaterial",uniforms:oa.clone($e.line.uniforms),vertexShader:$e.line.vertexShader,fragmentShader:$e.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const ql=new H,Yl=new H,Ae=new ge,Re=new ge,yn=new ge,yo=new H,xo=new we,Ce=new Tg,jl=new H,rr=new ci,or=new Ps,xn=new ge;let An,Ci;function Zl(n,t,e){return xn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),xn.multiplyScalar(1/xn.w),xn.x=Ci/e.width,xn.y=Ci/e.height,xn.applyMatrix4(n.projectionMatrixInverse),xn.multiplyScalar(1/xn.w),Math.abs(Math.max(xn.x,xn.y))}function Bg(n,t){const e=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Ce.start.fromBufferAttribute(s,a),Ce.end.fromBufferAttribute(r,a),Ce.applyMatrix4(e);const c=new H,h=new H;An.distanceSqToSegment(Ce.start,Ce.end,h,c),h.distanceTo(c)<Ci*.5&&t.push({point:h,pointOnLine:c,distance:An.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function kg(n,t,e){const i=t.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-t.near;An.at(1,yn),yn.w=1,yn.applyMatrix4(t.matrixWorldInverse),yn.applyMatrix4(i),yn.multiplyScalar(1/yn.w),yn.x*=r.x/2,yn.y*=r.y/2,yn.z=0,yo.copy(yn),xo.multiplyMatrices(t.matrixWorldInverse,o);for(let f=0,d=h;f<d;f++){if(Ae.fromBufferAttribute(l,f),Re.fromBufferAttribute(c,f),Ae.w=1,Re.w=1,Ae.applyMatrix4(xo),Re.applyMatrix4(xo),Ae.z>u&&Re.z>u)continue;if(Ae.z>u){const v=Ae.z-Re.z,E=(Ae.z-u)/v;Ae.lerp(Re,E)}else if(Re.z>u){const v=Re.z-Ae.z,E=(Re.z-u)/v;Re.lerp(Ae,E)}Ae.applyMatrix4(i),Re.applyMatrix4(i),Ae.multiplyScalar(1/Ae.w),Re.multiplyScalar(1/Re.w),Ae.x*=r.x/2,Ae.y*=r.y/2,Re.x*=r.x/2,Re.y*=r.y/2,Ce.start.copy(Ae),Ce.start.z=0,Ce.end.copy(Re),Ce.end.z=0;const g=Ce.closestPointToPointParameter(yo,!0);Ce.at(g,jl);const p=df.lerp(Ae.z,Re.z,g),m=p>=-1&&p<=1,M=yo.distanceTo(jl)<Ci*.5;if(m&&M){Ce.start.fromBufferAttribute(l,f),Ce.end.fromBufferAttribute(c,f),Ce.start.applyMatrix4(o),Ce.end.applyMatrix4(o);const v=new H,E=new H;An.distanceSqToSegment(Ce.start,Ce.end,E,v),e.push({point:E,pointOnLine:v,distance:An.origin.distanceTo(E),object:n,face:null,faceIndex:f,uv:null,uv1:null})}}}class Hg extends Xn{constructor(t=new jo,e=new mh({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)ql.fromBufferAttribute(e,o),Yl.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+ql.distanceTo(Yl);const r=new Rs(s,2,1);return t.setAttribute("instanceDistanceStart",new on(r,1,0)),t.setAttribute("instanceDistanceEnd",new on(r,1,1)),this}raycast(t,e){const i=this.material.worldUnits,s=t.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;An=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Ci=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),or.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Ci*.5;else{const u=Math.max(s.near,or.distanceToPoint(An.origin));c=Zl(s,u,l.resolution)}if(or.radius+=c,An.intersectsSphere(or)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),rr.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=Ci*.5;else{const u=Math.max(s.near,rr.distanceToPoint(An.origin));h=Zl(s,u,l.resolution)}rr.expandByScalar(h),An.intersectsBox(rr)!==!1&&(i?Bg(this,e):kg(this,s,e))}}const ar=[.6,.85,1.05,1.3,1.6,2.1];class Gg{constructor(){this.a=new Float32Array(3*256),this.n=0}reset(){return this.n=0,this}p(t,e,i){if(3*this.n+3>this.a.length){const r=new Float32Array(this.a.length*2);r.set(this.a),this.a=r}const s=3*this.n++;return this.a[s]=t,this.a[s+1]=e,this.a[s+2]=i,this}}class Vg{constructor(t){this.material=t,this.geo=new jo,this.pos=new Float32Array(0),this.col=new Float32Array(0),this.pb=null,this.cb=null,this.cap=0,this.n=0,this.mesh=new Hg(this.geo,t),this.mesh.frustumCulled=!1,this.grow(2048)}grow(t){const e=new Float32Array(t*6),i=new Float32Array(t*6);e.set(this.pos.subarray(0,this.n*6)),i.set(this.col.subarray(0,this.n*6)),this.pos=e,this.col=i,this.cap=t,this.geo.dispose(),this.geo=new jo;const s=this.pb=new Rs(e,6,1).setUsage(il),r=this.cb=new Rs(i,6,1).setUsage(il);this.geo.setAttribute("instanceStart",new on(s,3,0)),this.geo.setAttribute("instanceEnd",new on(s,3,3)),this.geo.setAttribute("instanceColorStart",new on(r,3,0)),this.geo.setAttribute("instanceColorEnd",new on(r,3,3)),this.mesh.geometry=this.geo}seg(t,e,i,s,r,o,a,l,c){this.n>=this.cap&&this.grow(this.cap*2);const h=this.n++*6,u=this.pos,f=this.col;u[h]=t,u[h+1]=e,u[h+2]=i,u[h+3]=s,u[h+4]=r,u[h+5]=o,f[h]=f[h+3]=a,f[h+1]=f[h+4]=l,f[h+2]=f[h+5]=c}commit(){this.geo.instanceCount=this.n,this.mesh.visible=this.n>0;for(const t of[this.pb,this.cb])t.clearUpdateRanges(),t.addUpdateRange(0,this.n*6),t.needsUpdate=!0}dispose(){this.geo.dispose(),this.material.dispose()}}const Kl=new Map;function So(n){let t=Kl.get(n);if(!t){const e=parseInt(n.slice(1),16);t=[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],Kl.set(n,t)}return t}class Wg{constructor(){this.group=new vs,this.batches=ar.map(t=>{const e=new mh({linewidth:t,vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});e.blending=Cc,e.blendEquation=Oo,e.fog=!0;const i=new Vg(e);return this.group.add(i.mesh),i})}setResolution(t,e){for(const i of this.batches)i.material.resolution.set(t,e)}begin(){for(const t of this.batches)t.n=0}end(){for(const t of this.batches)t.commit()}batch(t){let e=0;for(let i=1;i<ar.length;i++)Math.abs(ar[i]-t)<Math.abs(ar[e]-t)&&(e=i);return this.batches[e]}line(t,e,i,s,r={}){if(e<2)return;const o=r.alpha??1;this.strokes(t,e,So(i),o,this.batch(s),r.close??!1),r.hot&&this.strokes(t,e,So(ha(i)),o,this.batch(s*.42),r.close??!1)}poly(t,e,i,s={}){this.line(t.a,t.n,e,i,s)}seg(t,e,i,s,r,o,a,l,c=1){const[h,u,f]=So(a);this.batch(l).seg(t,e,i,s,r,o,h*c,u*c,f*c)}strokes(t,e,[i,s,r],o,a,l){i*=o,s*=o,r*=o;for(let c=0;c<e-1;c++){const h=3*c;a.seg(t[h],t[h+1],t[h+2],t[h+3],t[h+4],t[h+5],i,s,r)}if(l){const c=3*(e-1);a.seg(t[c],t[c+1],t[c+2],t[0],t[1],t[2],i,s,r)}}dispose(){for(const t of this.batches)t.dispose()}}function gh(n,t){const e=n.tract;return-Math.max(-.2,Math.min(3,t))*e.scale/Og(e.P(-2.5,10.5),e.P(6.95,7.75))}function _h(n,t){const e=n.tract,i=e.P(-2.5,10.5),s=gh(n,t.jaw);return(r,o)=>lh(e.P(r,o),i,s)}function bo(n,t,e,i=0,s=40){const r=Math.cos(-i),o=Math.sin(-i),a=[];for(let l=0;l<=s;l++){const c=l/s*Math.PI*2,h=Math.cos(c)*t,u=Math.sin(c)*e;a.push({x:n.x+h*r-u*o,y:n.y+h*o+u*r})}return a}function $g(n,t,e){const i=Math.min(n.x,t.x),s=Math.max(n.x,t.x),r=Math.min(n.y,t.y),o=Math.max(n.y,t.y),a=Math.min(e,(s-i)/2,(o-r)/2),l=[],c=(h,u,f)=>{for(let d=0;d<=6;d++){const _=f+d/6*(Math.PI/2);l.push({x:h+Math.cos(_)*a,y:u+Math.sin(_)*a})}};return c(s-a,o-a,0),c(i+a,o-a,Math.PI/2),c(i+a,r+a,Math.PI),c(s-a,r+a,3*Math.PI/2),l.push(l[0]),l}const Zo=n=>-1.2-.025*n;function vh(n){const t=n.tract.scale,e=n.bodyParams.pharynx;return(i,s)=>({x:i*t,y:(s<7?7-(7-s)*e:s)*t})}function Mh(n,t,e){const i=n.tract,s=(y,T)=>i.P(y,T),r=_h(n,e),o=i.scale,a=e.larynx*o,l=vh(n),c=t.upperLip.slice(7),h=t.lowerLip.slice(7),u=Hn([l(2.3,-4.6),l(2.38,-1.5),l(2.52,.4),l(3,1.7),r(5.3,3),r(7.25,3.35),r(7.95,4.6),r(7.55,5.7)],4),f=Hn([c[c.length-1],l(7.05,10.6),l(7.75,10.78),l(8.75,11.05),l(9.25,11.65),l(8.95,12.6),l(8.35,13.9),l(7.7,15),l(7.95,16.1),l(7.9,18.1),l(6.9,20.5)],4),d=Hn([l(6.9,20.5),l(3,22.9),l(-2.2,22.7),l(-6.9,19.6),l(-8.7,15.4),l(-8.3,11.9),l(-7.4,8.9),l(-6.8,4.8),l(-6.6,0),l(-6.6,-4.6)],4),_=[];for(let y=0;y<9;y++){const T=-4.4+y*1.75;if(T>10.5)break;const z=Zo(T)-2.25;_.push($g(s(z,T+1.4),s(z+1.6,T),.32*o))}const p=[[1,9.6],[1.8,9.92],[2.7,10.18],[3.6,10.3],[4.4,10.25],[5.1,10.05],[5.7,9.72],[6.15,9.36],[6.55,9.15],[7,9.6]].map(([y,T])=>i.P(y,T)),m=t.jawBone.filter(y=>y.x>.8*o),M=t.glottis,v={x:s(1.6,0).x,y:s(0,2.9).y+.6*a},E=[];for(let y=0;y<4;y++){const T=M.y-(.9+y*1)*o;if(T<-4.4)break;E.push([{x:M.x+.8*o,y:T},{x:M.x+1.05*o,y:T-.05},{x:M.x+1.05*o,y:T-.5*o},{x:M.x+.82*o,y:T-.45*o},{x:M.x+.8*o,y:T}])}const C=r(6,5.45),S=t.tongueCenter,w=[];for(let y=0;y<=16;y++){const T=Math.PI*(.18+.9*y/16),z={x:S.x+Math.cos(T)*t.tongueRadius*1.25,y:S.y+Math.sin(T)*t.tongueRadius*1.25},Q={x:S.x,y:(S.y+C.y)/2},tt=[];for(let L=0;L<=12;L++){const N=L/12;tt.push({x:(1-N)*(1-N)*C.x+2*(1-N)*N*Q.x+N*N*z.x,y:(1-N)*(1-N)*C.y+2*(1-N)*N*Q.y+N*N*z.y})}w.push(tt)}const B={x:Zo(M.y/o)*o,y:M.y};return{f:t,model:n,skinLower:[...u,...h.slice().reverse()],skinUpper:[...c,...f.slice(1),...d.slice(1)],inset:Hn([l(1.85,-4.6),l(1.9,-.8),l(2.3,1.6),r(5.2,3.6),r(6.9,3.9),r(7.4,4.9),r(7.2,5.9),l(6.6,9.9),l(7.6,10.9),l(8.55,11.5),l(8.1,13.4),l(7.25,15.2),l(7.45,18),l(3,22.2),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.6,12),l(-6.7,8.7),l(-6.1,4.6),l(-6,-4.6)],3),skull:Hn([l(7,16.2),l(7.3,18.5),l(6,20.7),l(3,22.1),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.4,12.6),l(-4.6,12.2),l(-2.2,13.3),l(1,13.7),l(4.1,14.1),l(6.2,14.9)],4),brain:Hn([l(6.55,16.3),l(6.75,18.4),l(5.5,20.1),l(2.8,21.4),l(-1.9,21.3),l(-5.8,18.8),l(-7.1,15.4),l(-6.7,13.1),l(-4.4,12.8),l(-2.1,13.9),l(1,14.3),l(4,14.7),l(5.9,15.4)],4),sulcus:Hn([l(5.4,19.4),l(2.4,20.5),l(-1.4,20.4),l(-4.8,18.4)],4),eye:bo(l(6.5,15.4),1.1*o,.95*o),eyeC:l(6.5,15.4),vertebrae:_,cords:[[s(-5.3,-4.6),s(-4.5,-4.6),s(-4.5,11.8),s(-5.1,12.4),s(-5.6,11.6)],[s(-5.1,-4.6),s(-4.7,-4.6),s(-4.72,11.4),s(-5.15,11.6)]],nasal:Hn([l(.3,11.2),l(1.1,10.25),l(2.7,10.75),l(4.6,10.85),l(6.4,10.65),l(7.6,10.85),l(8.45,11.3),l(8,12.2),l(6.7,13.4),l(4.4,13.9),l(1.8,13.6),l(.2,12.6)],4),turbinates:[[3,11.45,2.1,.32],[3.5,12.45,1.9,.3],[4,13.3,1.45,.22]].map(([y,T,z,Q])=>bo(l(y,T),z*o,Q*o,-.04)),palOral:p,palNasal:p.map(y=>({x:y.x,y:y.y+.55*o})),jawLower:m,jawUpper:m.map(y=>({x:y.x,y:y.y+.75*o})),hyoid:bo(v,.5*o,.28*o,.3,28),thyroid:[{x:M.x+.75*o,y:M.y-1.6*o},{x:M.x+1.75*o,y:M.y-.6*o},{x:M.x+1.95*o,y:M.y+1.2*o},{x:M.x+1.45*o,y:M.y+1.9*o},{x:M.x+1.15*o,y:M.y+1.1*o},{x:M.x+1.3*o,y:M.y-.4*o},{x:M.x+.75*o,y:M.y-1.6*o}],trachea:[[{x:M.x-.65*o,y:M.y},{x:M.x-.75*o,y:-4.8}],[{x:M.x+.75*o,y:M.y},{x:M.x+.95*o,y:-4.8}]],rings:E,outerWall:t.outer.filter(y=>y.y>M.y||y.x>0),glottisWall:[B,t.outer.find(y=>y.y>M.y)??B],fibres:w,folds:[[{x:M.x-.62*o,y:M.y+.05},{x:M.x-.1,y:M.y+.12*o},{x:M.x-.62*o,y:M.y+.32*o},{x:M.x-.62*o,y:M.y+.05}],[{x:M.x+.72*o,y:M.y+.05},{x:M.x+.12,y:M.y+.12*o},{x:M.x+.72*o,y:M.y+.32*o},{x:M.x+.72*o,y:M.y+.05}]],lowerTeeth:[...t.lowerTeeth,r(6.8,6),r(6.4,6.2),t.lowerTeeth[0]]}}class Xg{constructor(){this.pitch=0,this.yaw=0,this.toPitch=0,this.toYaw=0,this.next=2}update(t,e){if(t>=this.next){const s=Math.random()<.35;this.toPitch=s?0:(Math.random()*2-1)*.55,this.toYaw=s?0:(Math.random()*2-1)*.9,this.next=t+1.2+Math.random()*3.5}const i=1-Math.exp(-e*28);this.pitch+=(this.toPitch-this.pitch)*i,this.yaw+=(this.toYaw-this.yaw)*i}}const qg=980.665,lr=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},Eo=(n,t,e)=>Math.max(t,Math.min(e,n)),cr=(n,t,e,i)=>n+(t-n)*(1-Math.exp(-i/e));class To{constructor(t,e){this.hz=t,this.damping=e,this.x=0,this.v=0}step(t,e){const i=2*Math.PI*this.hz,s=Math.max(1,Math.ceil(e/.008)),r=e/s;for(let o=0;o<s;o++)this.v+=(i*i*(t-this.x)-2*this.damping*i*this.v)*r,this.x+=this.v*r;return this.x}}function Yg(n){const t=n.t.pressureRms,e=n.nPh+n.nOr-3;return e>=n.nPh&&e<t.length?t[e]/qg:0}class Jl{constructor(){this.puff=0,this.brow=0,this.lid=0,this.lookUp=0,this.content=0,this.nod=0,this.tilt=0,this.clock=0,this.cheeks=new To(6.5,.32),this.nodSpring=new To(2.4,.42),this.tiltSpring=new To(3.2,.3),this.ref=NaN,this.fast=NaN,this.held=0,this.hold=0,this.nextBlink=1.5+Math.random()*2,this.blinkAt=-1,this.secondBlink=!1,this.lastStep=-1}update(t,e){this.clock+=e;const i=t==null?void 0:t.t,s=!!i&&i.voicing>.45&&i.gate>.3&&i.f0>30&&i.outRms>.004,r=t?lr(1.5,7,Yg(t)):0;this.puff=Eo(this.cheeks.step(r,e),-.35,1.25);let o=0,a=0;if(s){const _=Math.log2(i.f0);(!Number.isFinite(this.ref)||Math.abs(12*(_-this.ref))>14)&&(this.ref=this.fast=_),this.ref=cr(this.ref,_,5,e),Math.abs(12*(_-this.fast))>2.5&&(this.fast=_,this.held=0),this.fast=cr(this.fast,_,.35,e),this.held+=e,o=12*(_-this.ref),a=12*(_-this.fast)}else this.held=0;const l=(s?Eo(o/6,-.7,1):0)+.3*this.content;this.brow=cr(this.brow,l,s?.12:.45,e),this.lookUp=.32*Math.max(0,this.brow);const c=s?.92*lr(.9,1.9,this.held)*lr(.15,.55,this.brow):0;this.hold=cr(this.hold,c,c>this.hold?.35:.08,e),this.clock>=this.nextBlink&&this.hold<.2&&(this.blinkAt=this.clock,this.secondBlink=!this.secondBlink&&Math.random()<.18,this.nextBlink=this.clock+(this.secondBlink?.28:2+Math.random()*4.5));const h=(this.clock-this.blinkAt)/.17,u=this.blinkAt>=0&&h<1?Math.sin(Math.PI*h)**.7:0;this.lid=Math.max(u,this.hold,.95*this.content);const f=(t==null?void 0:t.beatStep)??-1;if(f>=0&&this.lastStep>=0&&f!==this.lastStep){const _=f<this.lastStep;(_||Math.floor(f/4)!==Math.floor(this.lastStep/4))&&(this.nodSpring.v-=_||Math.floor(f/16)!==Math.floor(this.lastStep/16)?1.3:.8)}this.lastStep=f,this.nod=this.nodSpring.step(.13*this.brow,e);const d=lr(.6,2,this.held)*.07*Math.sin(this.clock*1.7);this.tilt=this.tiltSpring.step(d+.05*Eo(a,-1.5,1.5),e)}}function Ql(n,t,e){const i=n.tract,s=_h(n,e),r={x:(t.upperLip[6].x+t.lowerLip[6].x)/2+.15,y:(t.upperLip[6].y+t.lowerLip[6].y)/2};return[{id:"tongue",pos:t.tongueCenter,label:"Tongue body"},{id:"tip",pos:t.tip,label:"Tongue tip"},{id:"jaw",pos:s(7.5,4.9),label:"Jaw"},{id:"lips",pos:r,label:"Lips"},{id:"velum",pos:t.velum[Math.floor(t.velum.length/2)],label:"Soft palate"},{id:"larynx",pos:{x:t.glottis.x+1.2*i.scale,y:t.glottis.y},label:"Larynx"}]}const Rn=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},tc=n=>Math.max(0,Math.min(1,n));function Wn(n,t){if(t<=n[0][0])return n[0][1];for(let e=1;e<n.length;e++)if(t<=n[e][0]){const[i,s]=n[e-1],[r,o]=n[e];return s+(o-s)*(t-i)/(r-i)}return n[n.length-1][1]}const jg=[[-4.6,5.3],[0,5.4],[2.5,5.5],[4.5,5.25],[6.5,5.5],[8.5,6.1],[10.5,6.6],[12.5,7],[15,7.3],[17.5,7.65],[19.5,7.4],[21,6.5],[22.2,4.6],[23,1]],Zg=[[3.4,5.9],[4.6,6.2],[5.7,6.15],[6.5,6.2],[8,6.35],[9.5,6.35],[10.6,6.55],[11.6,6.75],[12.6,6.9],[13.9,7.15],[15,7.45],[16.1,7.95]],Kg=[[3.4,2],[4.6,2.2],[5.7,2.4],[6.5,2.6],[10.6,1.7],[11,1.75],[11.65,1.2],[12.6,.95],[13.9,.75],[15,.9],[16.1,1.6]],Jg=[[-4.6,.5],[3,.5],[6,.42],[12,.42],[16,.45],[23,.45]],Qg=[[-3,8.5],[-1.6,8],[-.6,6.4],[1.2,4.6],[3.5,3.6],[5.3,3],[7.3,3.3],[8.6,4.4]],t_=[[6,-.6],[7.4,-.8],[9.6,-1.9],[10.6,-2.5],[12,-2.6]],e_=[[12.3,4],[13,5.6],[14.5,6.4],[16.5,6.9],[18.5,6.6],[20,5.4],[21,3.6],[21.45,.5]],n_=[[0,1.5],[.15,1.9],[.35,2.35],[.6,2.45],[.8,2.2],[.92,1.5],[1,.55]],i_=[[0,1.3],[.35,1.1],[.7,.9],[.9,.55],[1,.25]],s_=[[.85,1.05,.7],[.68,.95,.65],[.78,1.1,.8],[.7,.85,.9],[.68,.8,.9],[1,.75,1.1],[.92,.7,1.05]],r_=[[.54,.9,.6],[.6,.92,.62],[.7,1,.75],[.7,.85,.8],[.72,.8,.85],[1.1,.72,1.05],[1.05,.7,1]],o_=3,Ei=2.2,yh=n=>Math.abs(n)<1?(1-n*n)**2:0;function Ar(n,t,e=!1){const i=Math.min(1,Math.abs(t)/n.W),s=Math.pow(1-Math.pow(i,n.pf),1/n.pf);return n.xw+(n.Fs-n.xw)*s+(e?0:n.E*yh(t/n.wf))}function a_(n,t){const e=t>n.xw,i=e?(t-n.xw)/Math.max(1e-6,n.Fs-n.xw):(n.xw-t)/Math.max(1e-6,n.xw-n.Bk),s=e?n.pf:Ei;return n.W*Math.pow(Math.max(0,1-Math.pow(Math.min(1,i),s)),1/s)}function l_(n,t,e){e.length=0;const i=12,s=10,r=16;for(let a=0;a<i;a++){const l=Math.PI-a/i*(Math.PI/2);e.push(n.xw-(n.xw-n.Bk)*Math.pow(Math.abs(Math.cos(l)),2/Ei),n.W*Math.pow(Math.sin(l),2/Ei))}const o=Math.asin(Math.min(1,Math.pow(t/n.W,n.pf/2)));for(let a=0;a<s;a++){const l=Math.PI/2-a/s*(Math.PI/2-o),c=n.W*Math.pow(Math.sin(l),2/n.pf);e.push(n.xw+(n.Fs-n.xw)*Math.pow(Math.cos(l),2/n.pf)+n.E*yh(c/n.wf),c)}for(let a=0;a<=r;a++){const l=t*(1-a/r);e.push(Ar(n,l),l)}}class ec{constructor(t,e,i){this.dy=e,this.rows=[];let s=1/0,r=-1/0;for(const o of t)s=Math.min(s,o.y),r=Math.max(r,o.y);this.y0=s,this.y1=r;for(let o=s;o<=r;o+=e){let a=-1/0,l=1/0;for(let c=0;c<t.length-1;c++){const h=t[c],u=t[c+1];if(h.y>o==u.y>o)continue;const f=h.x+(u.x-h.x)*(o-h.y)/(u.y-h.y);a=Math.max(a,f),l=Math.min(l,f)}this.rows.push(a>l?i(o,a,l):null)}}at(t){const e=(t-this.y0)/this.dy,i=Math.floor(e);if(i<0||i>=this.rows.length-1)return null;const s=this.rows[i],r=this.rows[i+1];if(!s||!r)return s??r;const o=e-i,a=(l,c)=>l+(c-l)*o;return{F:a(s.F,r.F),Bk:a(s.Bk,r.Bk),Fs:a(s.Fs,r.Fs),W:a(s.W,r.W),xw:a(s.xw,r.xw),E:a(s.E,r.E),wf:a(s.wf,r.wf),pf:a(s.pf,r.pf)}}}class Si{constructor(){this.lines=[],this.cur=[]}p(t,e,i){return this.cur.push(t,e,i),this}end(t=!1){t&&this.cur.length>=3&&this.cur.push(this.cur[0],this.cur[1],this.cur[2]),this.cur.length>=6&&this.lines.push(new Float32Array(this.cur)),this.cur=[]}ellipse(t,e,i,s=24,r=0,o=Math.PI*2){for(let a=0;a<=s;a++){const l=r+(o-r)*a/s,c=Math.cos(l),h=Math.sin(l);this.p(t[0]+e[0]*c+i[0]*h,t[1]+e[1]*c+i[1]*h,t[2]+e[2]*c+i[2]*h)}this.end()}}function xh(n,t,e,i){const s=e/n,r=i/n,o=r>=7?r:7-(7-r)/t,a=1-Rn(7.6,9.1,o),l=Wn(Qg,s),c=Rn(l-1.5,l+.15,o),h=Wn(t_,o),u=Rn(h-.7,h+.9,s);return a*c*u}const c_=1.7,h_=.55;function Sh(n,t,e,i){const s=e/n,r=i/n,o=r>=7?r:7-(7-r)/t,a=((s-5.2)/2.3)**2+((o-8.3)/2.4)**2;return a<1?(1-a)**2:0}function nc(n,t,e,i){if(t===0||i===0)return[0,0];const s=t*i*n;return[h_*s,Math.sign(e)*c_*s*Rn(.4*n,2.6*n,Math.abs(e))]}function u_(n,t,e){const i=t.length;if(t.every(Boolean))return[e?[...n,n[0],n[1],n[2]]:n];const s=[],r=e?t.indexOf(!1)+1:0;let o=[];for(let a=0;a<i;a++){const l=(r+a)%i;t[l]?o.push(n[3*l],n[3*l+1],n[3*l+2]):(o.length>=6&&s.push(o),o=[])}return o.length>=6&&s.push(o),s}function f_(n,t){const e=[0];for(let o=1;o<n.length;o++)e.push(e[o-1]+Math.hypot(n[o].x-n[o-1].x,n[o].y-n[o-1].y));const i=e[e.length-1],s=[];let r=0;for(let o=0;o<t;o++){const a=i*o/(t-1);for(;r<n.length-2&&e[r+1]<a;)r++;const l=(a-e[r])/Math.max(1e-9,e[r+1]-e[r]);s.push({x:n[r].x+(n[r+1].x-n[r].x)*l,y:n[r].y+(n[r+1].y-n[r].y)*l})}return s}function gr(n,t,e){const i=e*t[t.length-1];let s=0;for(;s<n.length-2&&t[s+1]<i;)s++;const r=(i-t[s])/Math.max(1e-9,t[s+1]-t[s]);return{x:n[s].x+(n[s+1].x-n[s].x)*r,y:n[s].y+(n[s+1].y-n[s].y)*r}}const Ko=n=>{const t=[0];for(let e=1;e<n.length;e++)t.push(t[e-1]+Math.hypot(n[e].x-n[e-1].x,n[e].y-n[e-1].y));return t};function d_(n){const t=n.tract,e=t.scale,i=n.bodyParams.pharynx,s=vh(n),r=G=>s(0,G).y,o=G=>G/e>=7?G/e:7-(7-G/e)/i,a=(G,$)=>t.P(G,$),l={...wr,jaw:0,lipAp:0,labiodental:0},c=n.frame(l),h=Mh(n,c,l),u=[...h.skinLower,...h.skinUpper],f=new ec(u,.08*e,(G,$,Z)=>{const K=o(G),et=K>=3.4&&K<=16.1?Wn(Zg,K)*e:1/0,rt=Math.min($,et),F=2.2+.4*Rn(2.5,3.5,K)*(1-Rn(17,18.5,K));return{F:$,Bk:Z,Fs:rt,W:Wn(jg,K)*e,xw:Z+(rt-Z)*Wn(Jg,K),E:$-rt,wf:Wn(Kg,K)*e,pf:F}}),d=a(-2.5,10.5),_=c.upperLip[c.upperLip.length-1].y,g=c.lowerLip[c.lowerLip.length-1].y,p=o_*e,m=(G,$,Z,K)=>$>g&&$<_&&Math.abs(Z)<p&&G>K.xw,M=[],v=(G,$,Z)=>{for(const K of u_(G,$,Z)){const et=K.length/3,rt=new Float32Array(et),F=new Float32Array(et);for(let wt=0;wt<et;wt++)rt[wt]=xh(e,i,K[3*wt],K[3*wt+1]),F[wt]=Sh(e,i,K[3*wt],K[3*wt+1]);M.push({a:new Float32Array(K),w:rt,c:F})}},E=[],C=1.4*e;for(let G=f.y0+.25*e;G<f.y1-.2*e;G+=C){const $=f.at(G);if(!$||$.W<.2*e)continue;l_($,Math.min(.6*$.W,3.6*e),E);const Z=[],K=[],et=E.length/2;for(let rt=0;rt<et;rt++)Z.push(E[2*rt],G,E[2*rt+1]);for(let rt=et-2;rt>0;rt--)Z.push(E[2*rt],G,-E[2*rt+1]);for(let rt=0;rt<Z.length/3;rt++)K.push(!m(Z[3*rt],G,Z[3*rt+2],$));v(Z,K,!0)}const S=.3*e;for(const G of[-3.6,-2.4,-1.2,1.2,2.4,3.6].map($=>$*e)){let $=[],Z=[];for(let K=f.y0+.1*e;K<=f.y1;K+=S){const et=f.at(K);if(!et||Math.abs(G)>.97*et.W){v($,Z,!1),$=[],Z=[];continue}const rt=Ar(et,G);$.push(rt,K,G),Z.push(!m(rt,K,G,et))}v($,Z,!1)}for(const G of[.5,.8].map($=>$*Math.PI))for(const $ of[1,-1]){const Z=[],K=[];for(let et=f.y0+.1*e;et<=f.y1;et+=S){const rt=f.at(et);!rt||rt.W<.2*e||(Z.push(rt.xw-(rt.xw-rt.Bk)*Math.pow(Math.abs(Math.cos(G)),2/Ei),et,$*rt.W*Math.pow(Math.sin(G),2/Ei)),K.push(!0))}v(Z,K,!1)}const w=[],B=[],y=(G,$,Z,K,et,rt=!1)=>{const F=new Si;et(F),G.push({lines:F.lines,color:$,width:Z,alpha:K,hot:rt})},T=(G,$,Z,K)=>{const et=Hn($.map(([rt,F])=>s(rt,F)),4);et.forEach((rt,F)=>{const wt=f.at(rt.y);G.p(rt.x,rt.y,K*((wt?a_(wt,rt.x):0)+Z(F,et.length)))}),G.end()};y(w,mt.blueDim,1.05,.9,G=>{for(const $ of[1,-1]){T(G,[[-2.55,13.4],[-2.85,14.75],[-3.65,15.45],[-4.6,15.25],[-5.2,14.25],[-5.4,12.8],[-5.05,11.3],[-4.55,10.2],[-3.95,9.55],[-3.35,9.65],[-3,10.35]],(K,et)=>(.25+1.2*Math.sin(Math.PI*K/(et-1))**1.5)*e,$),T(G,[[-3.15,14.3],[-3.95,14.45],[-4.55,13.5],[-4.6,12.1],[-4.15,11.05]],()=>.55*e,$),T(G,[[-2.7,11.2],[-2.55,11.85],[-2.75,12.35]],()=>.35*e,$);const Z=[];for(let K=0;K<=16;K++)Z.push([-3.5+.6*Math.cos(K/16*Math.PI*2),12+.85*Math.sin(K/16*Math.PI*2)]);T(G,Z,()=>.12*e,$)}}),y(w,mt.blueMid,1,.8,G=>{for(const $ of[1,-1]){for(let K=14.6;K>=11.3;K-=.15){const et=r(K),rt=f.at(et);if(!rt)continue;const F=$*(.3+1.05*(14.6-K)/3.3)*e;G.p(Ar(rt,F),et,F)}G.end();const Z=[[7.95,11.05,.95],[7.4,11.15,1.45],[7.25,11.6,1.55],[7.55,12.1,1.35],[8.2,12.15,1]];for(const[K,et,rt]of Z)G.p(K*e,r(et),$*rt*e);G.end()}}),y(w,mt.blueMid,1,.9,G=>{for(const $ of[1,-1])G.ellipse([8.05*e,r(10.98),$*.62*e],[.42*e,.04*e,0],[0,0,.26*e],16)});const z=new ec(h.brain,.08*e,(G,$,Z)=>({F:$,Bk:Z,Fs:$,W:Wn(e_,o(G))*e,xw:Z+($-Z)*.48,E:0,wf:1,pf:2.3}));y(w,mt.blueMid,.85,.32,G=>{for(let $=z.y0+.6*e;$<z.y1-.15*e;$+=1.5*e){const Z=z.at($);if(Z){for(let K=0;K<=48;K++){const et=K/48*Math.PI*2,rt=Math.cos(et),F=Math.sin(et),wt=rt>=0?Z.pf:Ei,xt=rt>=0?Z.xw+(Z.Fs-Z.xw)*Math.pow(rt,2/wt):Z.xw-(Z.xw-Z.Bk)*Math.pow(-rt,2/wt);G.p(xt,$,Math.sign(F)*Z.W*Math.pow(Math.abs(F),2/wt))}G.end()}}for(const $ of[.3,.7].map(Z=>Z*Math.PI))for(const Z of[1,-1]){for(let K=z.y0;K<=z.y1;K+=.3*e){const et=z.at(K);if(!et)continue;const rt=Math.cos($),F=Math.sin($),wt=rt>=0?et.pf:Ei,xt=rt>=0?et.xw+(et.Fs-et.xw)*Math.pow(rt,2/wt):et.xw-(et.xw-et.Bk)*Math.pow(-rt,2/wt);G.p(xt,K,Z*et.W*Math.pow(F,2/wt))}G.end()}}),y(w,mt.blueDim,.9,.6,G=>{for(let $=0;$<9;$++){const Z=-4.4+$*1.75;if(Z>10.5)break;const K=Zo(Z)-2.25,et=a(K,Z+.08),rt=a(K,Z+1.32),F=a(K+.8,0).x,wt=.8*e,xt=1.05*e;for(const Gt of[et.y,rt.y])G.ellipse([F,Gt,0],[wt,0,0],[0,0,xt],24);for(const Gt of[.25,.75,1.25,1.75].map(Ut=>Ut*Math.PI))G.p(F+wt*Math.cos(Gt),et.y,xt*Math.sin(Gt)).p(F+wt*Math.cos(Gt),rt.y,xt*Math.sin(Gt)).end();const At=(et.y+rt.y)/2,Mt=F-2.15*e;G.ellipse([Mt,At,0],[.72*e,0,0],[0,0,.88*e],20);for(const Gt of[1,-1])G.p(F-.7*e,At,Gt*.55*e).p(Mt+.45*e,At,Gt*.72*e).end(),G.p(F-.5*e,At,Gt*.95*e).p(F-.9*e,At-.1*e,Gt*2.3*e).end();G.p(Mt-.72*e,At,0).p(Mt-1.8*e,At-.55*e,0).end()}}),y(w,mt.blueDim,.85,.5,G=>{const $=a(-4.9,0).x;for(let Z=-4.4;Z<=11;Z+=1.75)G.ellipse([$,a(0,Z).y,0],[.42*e,0,0],[0,0,.6*e],16);for(const Z of[1,-1])G.p($,a(0,-4.6).y,Z*.6*e).p($,a(0,11.4).y,Z*.6*e).end()}),y(w,mt.blueDim,.9,.7,G=>{for(const $ of[1,-1]){for(const Z of h.nasal)G.p(Z.x,Z.y,$*1.2*e);G.end(!0);for(const Z of h.turbinates){for(const K of Z)G.p(K.x,K.y,$*.95*e);G.end()}}});const Q=(G,$,Z)=>{const K=[];for(let et=0;et<=60;et++){const rt=Z*et/60;K.push({x:G-$*Math.pow(rt/Z,1.85),y:rt})}return{pts:K,cum:Ko(K)}},tt=(G,$,Z,K,et,rt,F)=>{const wt=Q($,Z,K),xt=wt.cum[wt.cum.length-1],At=et.reduce((Gt,Ut)=>Gt+Ut[0],0),Mt=.97*xt/(At*e);for(const Gt of[1,-1]){let Ut=0;for(const[R,b,X]of et){const at=R*e*Mt,ct=b*e,ht=X*e,Et=(Ut+at/2)/xt;Ut+=at;const pt=gr(wt.pts,wt.cum,Et),St=gr(wt.pts,wt.cum,Math.min(1,Et+.01)),Lt=gr(wt.pts,wt.cum,Math.max(0,Et-.01));let kt=St.x-Lt.x,lt=St.y-Lt.y;const te=Math.hypot(kt,lt)||1;kt/=te,lt/=te;const Xt=lt,zt=-kt,Pt=rt(pt.y/K),bt=(Nt,Jt,ue=0)=>[pt.x+kt*Nt-Xt*ue,Pt+F*Jt,Gt*(pt.y+lt*Nt-zt*ue)];for(const[Nt,Jt]of[[-.5,0],[-.5,.55],[-.38,1],[0,1.08],[.38,1],[.5,.55],[.5,0]])G.p(...bt(Nt*at,Jt*ct));G.end(!0);for(const[Nt,Jt]of[[-.45,.1],[.45,.1],[.45,.9],[-.45,.9]])G.p(...bt(Nt*at,0,Jt*ht));G.end(!0)}}},L=a(7.3,0).x,N=4.2*e,I=2.65*e;y(w,mt.blue,1,.8,G=>tt(G,L,N,I,s_,$=>(7.95+.3*$*$)*e,1)),y(w,mt.blueMid,1,.6,G=>{for(const $ of[0,2,4,5,6,7]){const Z=h.palOral[$],K=Math.max(0,(L-Z.x)/N),et=(K>=1?I:I*Math.pow(K,1/1.85))-.45*e,rt=(8.95+.3*Math.min(1,et/I)**2)*e;if(!(et<.6*e||Z.y<rt+.15*e)){for(let F=0;F<=20;F++){const wt=et*(F/10-1);G.p(Z.x,rt+(Z.y-rt)*Math.pow(1-Math.pow(Math.abs(wt)/et,2.4),.7),wt)}G.end()}}});const V=(G,$,Z)=>{const K=a(G,$);return[K.x,K.y,Z*e]},D=(G,$,Z)=>{const K=$.map(([et,rt,F])=>V(et,rt,Z*F));for(let et=0;et<K.length-1;et++){const rt=K[Math.max(0,et-1)],F=K[et],wt=K[et+1],xt=K[Math.min(K.length-1,et+2)];for(let At=0;At<4;At++){const Mt=At/4,Gt=Mt*Mt,Ut=Gt*Mt,R=(b,X,at,ct)=>.5*(2*X+(-b+at)*Mt+(2*b-5*X+4*at-ct)*Gt+(-b+3*X-3*at+ct)*Ut);G.p(R(rt[0],F[0],wt[0],xt[0]),R(rt[1],F[1],wt[1],xt[1]),R(rt[2],F[2],wt[2],xt[2]))}}G.p(...K[K.length-1]),G.end()};y(B,mt.red,1.25,.9,G=>{for(const $ of[1,-1]){D(G,[[6.4,4.6,0],[5.6,4.45,1.5],[4.5,4.4,2.6],[3.2,4.5,3.5],[1.8,4.85,4.15],[.4,5.6,4.6],[-.55,6.6,4.85],[-.9,7.6,4.9],[-1.45,8.9,4.95],[-1.9,9.7,5],[-2.15,10.2,5]],$),D(G,[[-1.8,10.25,4.95],[-.9,9.4,4.85],[.15,10.1,4.6],[.6,8.9,4.35],[1.1,7.7,4],[1.9,7.2,3.55]],$);const Z=V(-2.5,10.5,$*4.95);G.ellipse(Z,[.45*e,0,0],[0,.12*e,.85*e],16)}}),y(B,mt.red,1,.55,G=>{for(const $ of[1,-1]){D(G,[[1.9,7.2,3.55],[3,7.15,3.15],[4.3,7.1,2.6],[5.4,7.05,1.85],[6.2,7.05,1.05],[6.72,7.15,0]],$);for(const[Z,K,et,rt,F]of[[3,3.15,3.2,4.5,3.5],[5.4,1.85,5.6,4.45,1.5],[1.9,3.55,1.8,4.85,4.15]])D(G,[[Z,7.15,K],[(Z+et)/2,5.9,(K+F)/2+.15],[et,rt,F]],$)}});const O=new Si;D(O,[[7.25,6.75,0],[7.4,5.4,0],[6.4,4.6,0],[5.6,5,0],[5.9,6.2,0],[6.45,6.55,0]],1);const q=O.lines[0],it=a(6.98,0).x,ot=4*e,W=2.5*e;y(B,mt.blue,1,.8,G=>tt(G,it,ot,W,r_,$=>(7.75+.45*Math.pow($,1.5))*e,-1));const st=s(6.15,15.35),ut=new H(.3*e,(f.y0+f.y1)/2,0);return{model:n,head:f,condyle:d,lipHalf:p,center:ut,shell:M,fixed:w,jaw:B,chin:q,eyes:[[st.x,st.y,3.15*e],[st.x,st.y,-3.15*e]],eyeR:1.05*e}}const p_=[.09,.06,.03];class m_{constructor(){this.scene=new xg,this.camera=new sn(24,1,5,2e3),this.beams=new Wg,this.rest=null,this.w=1,this.h=1,this.compact=!1,this.centred=!1,this.facing=1,this.clock=0,this.gaze=new Xg,this.face=new Jl,this.eye=new H,this.turn=new hs,this.euler=new Ls,this.strobe=0,this.tmp=new Gg,this.particles=[],this.echoes=[],this.lastEcho=-1,this.sparkSeed=7,this.k=1,this.ring={n:0,s:new Float64Array(80),cx:new Float64Array(80),cy:new Float64Array(80),ux:new Float64Array(80),uy:new Float64Array(80),a:new Float64Array(80),b:new Float64Array(80)},this.v3=new H,this.caliper=null,this.scene.add(this.beams.group),this.scene.fog=new ca(0,50,100);for(let t=0;t<200;t++)this.particles.push({s:Math.random()*17,u:Math.random()*2-1,v:Math.random()*2-1,life:Math.random(),px:NaN,py:NaN,pz:NaN})}dispose(){this.beams.dispose()}resetMotion(){this.face=new Jl,this.echoes=[],this.lastEcho=-1,this.strobe=0;for(const t of this.particles)t.px=NaN}resize(t,e){this.w=t,this.h=e,this.compact=t<560,this.camera.aspect=t/e,this.compact||this.centred?this.camera.clearViewOffset():this.camera.setViewOffset(t,e,.1*t,0,t,e),this.camera.updateProjectionMatrix(),this.beams.setResolution(t,e);for(const i of this.particles)i.px=NaN}poses(t){const e=this.restFor(t),i=Math.tan(this.camera.fov*Math.PI/360),s=1.1*Math.max(15.2/i,11/(i*Math.max(.3,this.camera.aspect))),r=e.center.clone(),o=this.facing>0?.62:Math.PI-.62,a=.2;return{target:r,home:r.clone().add(new H(Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)).multiplyScalar(s)),side:r.clone().add(new H(0,0,this.facing*s))}}restFor(t){return(!this.rest||this.rest.model!==t)&&(this.rest=d_(t)),this.rest}project(t,e,i){const s=this.v3.set(t,e,i).applyMatrix4(this.beams.group.matrixWorld).project(this.camera);return[(s.x+1)/2*this.w,(1-s.y)/2*this.h]}pxPerCmAt(t,e,i){const s=this.camera.matrixWorld.elements,[r,o]=this.project(t,e,i),[a,l]=this.project(t+s[0],e+s[1],i+s[2]);return Math.hypot(a-r,l-o)}crown(t){const e=this.restFor(t),i=t.tract.scale,s=e.head.at(e.head.y1-1.2*i),r=s?(s.F+s.Bk)/2:e.center.x,[o,a]=this.project(r,e.head.y1,0);return{x:o,y:a,cmPx:this.pxPerCmAt(r,e.head.y1,0)}}faceView(t,e,i){const s=Ql(t,e,i).find(r=>r.id==="lips").pos;return{handles:Ql,X:r=>this.project(r.x,r.y,0)[0],Y:r=>this.project(r.x,r.y,0)[1],pxPerCm:this.pxPerCmAt(s.x,s.y,0)}}update(t,e,i,s,r,o){this.clock+=o;const a=this.restFor(t),l=t.tract.scale,c=this.face;this.headPose(a,l);const h=gh(t,i.jaw),u=a.condyle,f=this.beams,d=this.camera.position.distanceTo(a.center),_=this.scene.fog;_.near=d-3*l,_.far=d+30*l,f.begin();const g=(L,N=0)=>{const I=new Float32Array(L.length*3);return L.forEach((V,D)=>{I[3*D]=V.x,I[3*D+1]=V.y,I[3*D+2]=N}),I},p=this.v3.copy(this.eye).sub(a.center).normalize(),m=Rn(.25,.8,Math.abs(p.z)),M=.22+.78*m,v=.45+.55*m,E=(L,N,I,V={},D=M)=>f.line(g(L),L.length,N,I,{...V,alpha:(V.alpha??1)*D}),C=(L,N,I)=>I===0?[L,N]:ic(L,N,u,I);this.k=l;for(const L of a.fixed)for(const N of L.lines)f.line(N,N.length/3,L.color,L.width,{alpha:L.alpha,hot:L.hot});for(const L of a.jaw)for(const N of L.lines){const I=this.tmp.reset();for(let V=0;V<N.length;V+=3){const[D,O]=C(N[V],N[V+1],h);I.p(D,O,N[V+2])}f.poly(I,L.color,L.width,{alpha:L.alpha,hot:L.hot})}for(const L of a.shell){const N=this.tmp.reset();for(let I=0;I<L.w.length;I++){const V=L.a[3*I+2],[D,O]=nc(l,L.c[I],V,c.puff),[q,it]=C(L.a[3*I]+D,L.a[3*I+1],h*L.w[I]);N.p(q,it,V+O)}f.poly(N,mt.blueDim,.85,{alpha:.42})}const S=Mh(t,e,i);E(S.inset,mt.blueDim,.9,{alpha:.5}),E(S.skull,mt.blueDim,.9,{close:!0,alpha:.6}),E(S.brain,mt.blueMid,1,{close:!0,alpha:.75}),E(S.sulcus,mt.blueDim,.9),E(S.nasal,mt.blueMid,1,{close:!0}),E(S.palOral,mt.blueMid,1.1),E(S.palNasal,mt.blueMid,1.1),E(S.skinLower,mt.blue,1.5),E(S.skinUpper,mt.blue,1.5),E(S.outerWall,mt.blue,1.4,{hot:!0}),E(e.inner,mt.blue,1.3,{alpha:.9}),E(S.glottisWall,mt.blue,1.2,{alpha:.8}),this.eyes(a,o),this.airway(t,e,s,r,l),this.velum(e,l),this.epiglottis(e,l,v),this.larynx(t,e,i,s,l,o,a.head.y0,M);const w=g(e.tongue),B=(L,N)=>g(Yo(L.map(I=>[I.x,I.y]),N).map(([I,V])=>({x:I,y:V}))),y=B(e.upperLip,2),T=B(e.lowerLip,2),z=this.lips(a,t,e,i,h),Q=a.chin,tt=new Float32Array(Q.length);for(let L=0;L<Q.length;L+=3){const[N,I]=C(Q[L],Q[L+1],h);tt[L]=N,tt[L+1]=I}if(s&&this.clock-this.lastEcho>=.028){this.lastEcho=this.clock;const L=[{a:w,color:mt.green},{a:tt,color:mt.red},{a:y,color:mt.pink},{a:T,color:mt.pink}];for(z&&L.push({a:z,color:mt.pink}),this.echoes.push({t:this.clock,lines:L});this.echoes.length&&this.clock-this.echoes[0].t>.12;)this.echoes.shift()}s&&p_.forEach((L,N)=>{const I=this.nearestEcho(this.clock-L);if(I)for(const V of I.lines)f.line(V.a,V.a.length/3,V.color,1,{alpha:(.1+.07*N)*v})}),this.tongue(e,i,l),f.line(tt,tt.length/3,mt.red,1.5,{hot:!0,alpha:v}),f.line(w,e.tongue.length,mt.green,1.6,{hot:!0,alpha:v}),f.line(y,y.length/3,mt.pink,1.5,{hot:!0,alpha:v}),f.line(T,T.length/3,mt.pink,1.5,{hot:!0,alpha:v}),E(Yo(e.velum.map(L=>[L.x,L.y]),3).map(([L,N])=>({x:L,y:N})),mt.white,1.25,{alpha:.92},v),r.particles&&s&&this.drawParticles(t,e,s,o),s&&this.drawTurbulence(t,e,s),this.caliper=null,r.calipers&&this.drawCaliper(e),f.end()}nearestEcho(t){let e=null,i=.016;for(const s of this.echoes){const r=Math.abs(s.t-t);r<i&&(i=r,e=s)}return e}headPose(t,e){const i=this.beams.group,s=this.v3.set(-2.4*e,t.head.y0+.42*(t.condyle.y-t.head.y0),0);this.turn.setFromEuler(this.euler.set(this.face.tilt,0,this.face.nod)),i.quaternion.copy(this.turn),i.position.copy(s).sub(s.applyQuaternion(this.turn)),i.updateMatrixWorld(!0),this.eye.copy(this.camera.position),i.worldToLocal(this.eye)}eyes(t,e){const i=this.gaze,s=this.face;i.update(this.clock,e);const r=t.eyeR,o=i.pitch+1.3*s.lookUp,a=[Math.cos(o)*Math.cos(i.yaw),Math.sin(o),Math.cos(o)*Math.sin(i.yaw)],l=f=>{const d=Math.abs(f[1])>.9?[1,0,0]:[0,1,0],_=rc(sc(d,f));return[_,sc(f,_)]},c=this.eye,h=1-Rn(.4,.9,s.lid),u=Math.max(0,s.brow);for(const f of t.eyes){const d=rc([c.x-f[0],c.y-f[1],c.z-f[2]]),[_,g]=l(d),p=new Si;p.ellipse(f,ji(_,r),ji(g,r),36);const[m,M]=l(a),v=[f[0]+a[0]*r*.86,f[1]+a[1]*r*.86,f[2]+a[2]*r*.86];p.ellipse(v,ji(m,r*.5),ji(M,r*.5),24);const E=[f[0]+a[0]*r*.97,f[1]+a[1]*r*.97,f[2]+a[2]*r*.97];p.ellipse(E,ji(m,r*.2),ji(M,r*.2),14);const C=Math.sign(f[2]),S=(Q,tt,L)=>Q*(1-tt*tt)+.06*tt*C*L,w=Q=>{for(let tt=0;tt<=16;tt++){const L=-1+tt/8,N=C*L*.95,I=S(-.36,L,-1),V=Q?S(.5+.2*u,L,1)*(1-s.lid)+(I+.03)*s.lid:I;p.p(f[0]+1.04*r*Math.cos(V)*Math.cos(N),f[1]+1.04*r*Math.sin(V),f[2]+1.04*r*Math.cos(V)*Math.sin(N))}p.end()};w(!0),w(!1);const B=.3*s.brow,y=.28*Math.max(0,-s.brow),T=.22*s.lid*u;for(let Q=0;Q<=12;Q++){const tt=-1+Q/6,L=C*(.15+tt*.62),N=(1-tt)/2,I=.82+.12*(1-tt*tt)-.06*tt+B+(T-y)*N;p.p(f[0]+1.32*r*Math.cos(I)*Math.cos(L),f[1]+1.32*r*Math.sin(I),f[2]+1.32*r*Math.cos(I)*Math.sin(L))}p.end();const z=[[mt.blueMid,1,.35],[mt.blue,1,.9*h],[mt.blue,1,.7*h],[mt.blue,1.25,.95],[mt.blue,1.05,.75],[mt.blueMid,1.3,.8]];p.lines.forEach((Q,tt)=>this.beams.line(Q,Q.length/3,z[tt][0],z[tt][1],{alpha:z[tt][2]}))}}lips(t,e,i,s,r){const o=e.tract.scale,a=t.condyle,l=t.head,c=this.beams,h=e.bodyParams.pharynx,u=t.lipHalf,f=Math.max(.3*o,(1.1+(e.bodyParams.lipWidth-1.1)*tc(s.lipWidth))*o/2),d=i.upperLip.slice(6),_=i.lowerLip.slice(6).map(I=>lh(I,a,-r)),g=Ko(d),p=Ko(_),m=d[0],M=_[0],v=(m.y+M.y)/2,E=(I,V)=>{const D=l.at(I);return D?Ar(D,V,!0):0},C=m.x-E(m.y,0),S=M.x-E(M.y,0),w=(C+S)/2,B=d[d.length-1].y,y=_[_.length-1].y,T=this.tmp,z=(I,V,D)=>{const O=Math.sqrt(Math.max(0,1-(D/f)**2)),q=gr(I?d:_,I?g:p,V),it=I?m:M,ot=I?B:y,W=v+(it.y-v)*O,st=ot-it.y,ut=W+(q.y-it.y)*(ot-W)/(Math.abs(st)<1e-4?1e-4:st),G=Math.pow(Math.max(0,1-(D/u)**2),1.5),$=q.x-E(q.y,0)+(w-(I?C:S))*(1-O)*(1-V),Z=E(ut,D)+$*G,K=I?.5*(1-O)*(1-V):.5*(1+O)+.5*(1-O)*V,et=K+(xh(o,h,Z,ut)-K)*Rn(f,u,Math.abs(D)),[rt,F]=nc(o,Sh(o,h,Z,ut),D,this.face.puff),[wt,xt]=et?ic(Z+rt,ut,a,r*et):[Z+rt,ut];return[wt,xt,D+F]},Q=(I,V,D,O,q)=>{T.reset();for(let it=0;it<=q;it++){const ot=D+(O-D)*it/q;T.p(...z(I,V(ot),ot))}return T},tt=[.66,.88];for(const I of[!0,!1]){for(const O of tt)c.poly(Q(I,()=>O,-u,u,24),mt.blueDim,.85,{alpha:.42});for(const O of[-.8,-.5,.5,.8].map(q=>q*u)){T.reset();for(let q=0;q<=8;q++)T.p(...z(I,.45+.55*q/8,O));c.poly(T,mt.blueDim,.85,{alpha:.42})}const V=Math.min(u,f+.3*o),D=O=>{const q=Math.sqrt(Math.max(0,1-(O/V)**2)),it=I?-.07*Math.exp(-((O/(.32*o))**2))+.05*Math.exp(-(((Math.abs(O)-.55*o)/(.3*o))**2)):0;return Math.max(0,(I?.42:.45)*q+it*q)};c.poly(Q(I,D,-V,V,28),mt.pink,1.3,{alpha:.95}),c.poly(Q(I,O=>.45*D(O),-V,V,28),mt.pink,1,{alpha:.45})}for(const I of[1,-1])c.poly(Q(!0,()=>0,I*f,I*u,6),mt.pink,1,{alpha:.6});const L=i.upperLip[6].y-i.lowerLip[6].y>.02*o,N=24;T.reset();for(let I=0;I<=N;I++)T.p(...z(!0,0,-f+2*f*I/N));if(L)for(let I=N-1;I>0;I--)T.p(...z(!1,0,-f+2*f*I/N));return c.poly(T,mt.pink,2.1,{hot:!0,close:L}),L?T.a.slice(0,T.n*3):null}tongue(t,e,i){const s=t.tongue;let r=0,o=1/0;s.forEach((d,_)=>{const g=(d.x-t.tip.x)**2+(d.y-t.tip.y)**2;g<o&&(o=g,r=_)});const a=22,l=f_(s.slice(0,r+1),a),c=tc(e.lateral),h=l.map((d,_)=>{const g=l[Math.max(0,_-1)],p=l[Math.min(a-1,_+1)];let m=p.x-g.x,M=p.y-g.y;const v=Math.hypot(m,M)||1;m/=v,M/=v;const E=_/(a-1);return{p:d,nx:-M,ny:m,W:Wn(n_,E)*i,h:(Wn(i_,E)+.8*c*Rn(.45,.8,E))*i}}),u=(d,_)=>{const g=d.h*(1-Math.cos(_));return[d.p.x-d.nx*g,d.p.y-d.ny*g,d.W*Math.sin(_)]},f=this.tmp;for(let d=1;d<a-1;d+=2){f.reset();for(let _=0;_<=12;_++)f.p(...u(h[d],-Math.PI/2+Math.PI*_/12));this.beams.poly(f,mt.green,1,{alpha:.5})}for(const d of[-Math.PI/2,-Math.PI/4,Math.PI/4,Math.PI/2]){f.reset();for(const _ of h)f.p(...u(_,d));this.beams.poly(f,mt.green,Math.abs(d)>1?1.25:1,{alpha:Math.abs(d)>1?.8:.45})}}airway(t,e,i,s,r){const o=e.grid,a=this.ring;if(a.n=0,o.length<2)return;const l=i?t.nodeS(i.t.phLen,i.t.orLen):null,c=s.pressure&&i&&l&&l.length===i.t.pressureRms.length;let h=-1,u=0;for(let g=0;g<o.length&&a.n<a.s.length;g++){const p=o[g],m=p.outer.x-p.inner.x,M=p.outer.y-p.inner.y,v=Math.hypot(m,M);v>1e-4&&(h=m/v,u=M/v);const E=p.d/2,C=a.n++;a.s[C]=p.s,a.cx[C]=p.outer.x-h*E,a.cy[C]=p.outer.y-u*E,a.ux[C]=h,a.uy[C]=u,a.a[C]=E,a.b[C]=p.d>.01?Math.min(3.5*r,2*p.area/(Math.PI*p.d)):0}const f=this.tmp,d=this.eye;for(let g=0;g<a.n;g+=2){f.reset();for(let C=0;C<=24;C++){const S=C/24*Math.PI*2,w=Math.cos(S)*a.a[g],B=Math.sin(S)*a.b[g];f.p(a.cx[g]+a.ux[g]*w,a.cy[g]+a.uy[g]*w,B)}const p=d.x-a.cx[g],m=d.y-a.cy[g],M=d.z,v=Math.abs(a.uy[g]*p-a.ux[g]*m)/(Math.hypot(p,m,M)||1),E=1-.65*v*v;if(c){const C=Math.pow(Fg(wo(i.t.pressureRms,l,a.s[g])),.85);this.beams.poly(f,Ng(C),.85,{alpha:(.25+.65*C)*E})}else this.beams.poly(f,mt.blueDim,.85,{alpha:(s.grid?.8:.45)*E})}for(const g of[1,-1]){f.reset();for(let p=0;p<a.n;p++)f.p(a.cx[p],a.cy[p],g*a.b[p]);this.beams.poly(f,mt.blue,1,{alpha:.55})}const _=e.glottis;for(const g of[.3,.65]){const p=_.x+(a.cx[0]-_.x)*g,m=_.y+(a.cy[0]-_.y)*g,M=(.55+.25*g)*r;f.reset();for(let v=0;v<=20;v++)f.p(p+M*Math.cos(v/20*Math.PI*2),m,M*Math.sin(v/20*Math.PI*2));this.beams.poly(f,mt.blueDim,.9,{alpha:.6})}}airPoint(t,e,i,s){const r=this.ring;if(r.n<2)return null;if(e<=r.s[0]){const f=Math.max(0,e/Math.max(.01,r.s[0])),d=t.glottis;return[d.x+(r.cx[0]-d.x)*f+i*.3*this.k,d.y+(r.cy[0]-d.y)*f,s*.45*this.k]}let o=0,a=r.n-1;if(e>=r.s[a])return null;for(;a-o>1;){const f=o+a>>1;r.s[f]<=e?o=f:a=f}const l=(e-r.s[o])/Math.max(1e-6,r.s[a]-r.s[o]),c=f=>f[o]+(f[a]-f[o])*l,h=c(r.a)*i*.82,u=c(r.b)*s*.82;return[c(r.cx)+c(r.ux)*h,c(r.cy)+c(r.uy)*h,u]}drawParticles(t,e,i,s){const r=i.t,o=t.nodeS(r.phLen,r.orLen),a=new Float32Array(r.phAreas.length+r.orAreas.length);a.set(r.phAreas,0),a.set(r.orAreas,r.phAreas.length);const l=e.lipS;for(const c of this.particles){const h=wo(r.flow,o,c.s),u=Math.max(.05,wo(a,o,c.s)),f=h/u,d=Math.sign(f)*2.2*Math.log1p(Math.abs(f)/30);if(c.s+=d*s,c.life-=s*.25,(c.s>l||c.s<0||c.life<=0||Math.abs(f)<3)&&!(Math.abs(f)<3&&c.life>0)){c.s=Math.random()*.8,c.u=Math.random()*2-1,c.v=Math.random()*2-1,c.life=.6+Math.random()*.8,c.px=NaN;continue}const _=this.airPoint(e,c.s,c.u,c.v);if(_){if(Number.isFinite(c.px)){const g=Math.min(2,Math.floor(Math.min(1,Math.abs(d)/6)*Math.min(1,c.life)*3));this.beams.seg(c.px,c.py,c.pz,_[0],_[1],_[2],"#ffe2a8",1.05,.16+.2*g)}[c.px,c.py,c.pz]=_}}}drawTurbulence(t,e,i){const s=i.t;if(!(s.noiseLevel>1)||s.noiseNode<0)return;const r=t.branchS(s.noiseNode,s.phLen,s.orLen);if(r<0)return;const o=Math.min(1,Math.log10(s.noiseLevel)/3.2);if(o<=.05)return;let a=this.sparkSeed=this.sparkSeed*16807%2147483647;const l=()=>(a=a*16807%2147483647)/2147483647;for(let c=0;c<40;c++){const h=this.airPoint(e,r+.2+l()*1.2,l()*2-1,l()*2-1);if(!h)continue;const u=.02+l()*.05;this.beams.seg(h[0]-u,h[1],h[2],h[0]+u,h[1],h[2],"#f4fbff",1.6,.15+.7*o*l())}}drawCaliper(t){const e=this.ring;let i=-1,s=1/0;for(let a=2;a<t.grid.length-1;a++)t.grid[a].area<s&&(s=t.grid[a].area,i=a);if(i<0||s>=1.2||i>=e.n)return;const r=this.tmp.reset();for(let a=0;a<=24;a++){const l=a/24*Math.PI*2,c=Math.cos(l)*e.a[i],h=Math.sin(l)*e.b[i];r.p(e.cx[i]+e.ux[i]*c,e.cy[i]+e.uy[i]*c,h)}this.beams.poly(r,mt.white,1.3,{hot:!0});const o=t.grid[i];this.caliper={x:o.outer.x,y:o.outer.y,z:0,area:s}}velum(t,e){const i=t.velum,s=Math.floor(i.length/2)-1,r=[];for(let l=0;l<=s;l++){const c=i[l],h=i[i.length-1-l];let u=c.x-h.x,f=c.y-h.y;const d=Math.hypot(u,f)||1;u/=d,f/=d;const _=l/s;r.push({x:(c.x+h.x)/2,y:(c.y+h.y)/2,nx:u,ny:f,W:(1.95-1.5*Math.pow(_,1.5))*e,droop:.45*e*_})}const o=(l,c)=>{const h=.12*e*(1-c*c)-l.droop*c*c;return[l.x+l.nx*h,l.y+l.ny*h,l.W*c]},a=this.tmp;for(const l of[1,3,5,7,9].filter(c=>c<=s)){a.reset();for(let c=0;c<=12;c++)a.p(...o(r[l],-1+c/6));this.beams.poly(a,mt.white,1,{alpha:.5})}for(const l of[-1,1]){a.reset();for(const c of r)a.p(...o(c,l));this.beams.poly(a,mt.white,1,{alpha:.65})}}epiglottis(t,e,i){const[s,r]=t.epiglottis;let o=r.x-s.x,a=r.y-s.y;const l=Math.hypot(o,a)||1;o/=l,a/=l;const c={x:-a,y:o},h=d=>(.22+.9*Math.pow(Math.sin(d*Math.PI/2),1.3))*e,u=this.tmp.reset(),f=10;for(let d=0;d<=f;d++){const _=d/f,g=h(_),p=.28*e*(g/(1.12*e));u.p(s.x+o*l*_+c.x*p,s.y+a*l*_+c.y*p,g)}for(let d=1;d<12;d++){const _=h(1)*(1-2*d/12),g=.28*e*(Math.abs(_)/(1.12*e))**2;u.p(r.x+c.x*g+o*.08*e*(1-(_/h(1))**2),r.y+c.y*g+a*.08*e*(1-(_/h(1))**2),_)}for(let d=f;d>=0;d--){const _=d/f,g=h(_),p=.28*e*(g/(1.12*e));u.p(s.x+o*l*_+c.x*p,s.y+a*l*_+c.y*p,-g)}this.beams.poly(u,mt.blue,1.1,{alpha:.75}),this.beams.line(new Float32Array([s.x,s.y,0,r.x,r.y,0]),2,mt.blue,2.1,{alpha:.85*i})}larynx(t,e,i,s,r,o,a,l){const c=e.glottis,h=this.beams,u=new Si,f=(S,w,B)=>[c.x+S*r,c.y+w*r,B*r],d=(S,w=!1)=>{for(const[B,y,T]of S)u.p(...f(B,y,T));u.end(w)};for(const S of[1,-1])d([[1.45,1.75,0],[.75,2,S*1.2],[-.5,1.95,S*1.9],[-.6,-.6,S*1.85],[.25,-.85,S*1.5],[1.05,-.8,S*.55],[1.2,-.75,0],[1.6,.05,0],[1.9,1.15,0],[1.45,1.75,0]]),d([[-.5,1.95,S*1.9],[-.7,2.85,S*1.85]]),d([[-.6,-.6,S*1.85],[-.45,-1.25,S*1.7]]);for(const[S,w]of[[-1.75,.15],[-1.4,1.1]]){for(let B=0;B<=28;B++){const y=B/28*Math.PI*2;u.p(...f(.1+1*Math.cos(y),S+w*(1-Math.cos(y))/2,1.1*Math.sin(y)))}u.end()}for(const S of u.lines)h.line(S,S.length/3,mt.blueMid,1,{alpha:.85});const _=new Si,g=c.y-2.1*r,p=c.x+.08*r;for(let S=g;S>a;S-=.5*r)_.ellipse([p,S,0],[.82*r,0,0],[0,0,.95*r],20,-.8*Math.PI,.8*Math.PI);for(const S of[1,-1])_.p(p,g,S*.95*r).p(p,a,S*.95*r).end();for(const S of _.lines)h.line(S,S.length/3,mt.blueDim,.9,{alpha:.85});for(const S of[1,-1])h.line(new Float32Array([p+S*.82*r,c.y,0,p+S*.82*r,a,0]),2,mt.blueMid,1,{alpha:l});const m=new Si,M={x:t.tract.P(1.6,0).x,y:t.tract.P(0,2.9).y+.6*i.larynx*r};for(const S of[-.16,.16]){for(let w=0;w<=20;w++){const B=-1+w/10;m.p(M.x+(.35-.65*B*B)*r,M.y+S*r,1.15*B*r)}m.end();for(const w of[1,-1])m.p(M.x-.3*r,M.y+S*r,w*1.15*r).p(M.x-2.8*r,M.y+(.7+S)*r,w*2.05*r).end()}for(const S of m.lines)h.line(S,S.length/3,mt.blueMid,1,{alpha:.85});const v=s==null?void 0:s.t.glottalArea;let E=0;if(v&&v.length){this.strobe=(this.strobe+o/1.8)%1;let S=.02;for(let w=0;w<v.length;w++)S=Math.max(S,v[w]);E=Math.min(.45*r,v[Math.floor(this.strobe*v.length)%v.length]/(1.3*r)*2.2),Number.isFinite(E)||(E=0)}const C=new Si;for(const S of[1,-1])C.p(...f(.72,.1,0)).p(...f(-.55,.1,S*(.06+E/r))).end(),C.p(...f(.72,0,0)).p(...f(-.6,0,S*.62)).end(),C.p(...f(.65,.45,0)).p(...f(-.5,.45,S*.45)).end(),C.ellipse(f(-.72,.15,S*(.3+E/r)),[.18*r,0,0],[0,.12*r,.12*r],10);C.lines.forEach((S,w)=>h.line(S,S.length/3,w%4===0?mt.white:mt.blueMid,w%4===0?1.3:1,{alpha:w%4===2?.6:.9,hot:w%4===0}))}}function ic(n,t,e,i){const s=n-e.x,r=t-e.y,o=Math.cos(i),a=Math.sin(i);return[e.x+s*o-r*a,e.y+s*a+r*o]}const sc=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],rc=n=>{const t=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/t,n[1]/t,n[2]/t]},ji=(n,t)=>[n[0]*t,n[1]*t,n[2]*t];function wo(n,t,e){let i=0,s=1/0;for(let r=0;r<t.length;r++){const o=Math.abs(t[r]-e);o<s&&(s=o,i=r)}return n[i]??0}const oc=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0;function g_(n){const t=oc(n.female),e=oc(n.child);return[["male",(1-e)*(1-t)],["female",(1-e)*t],["child",e]]}class bh{constructor(t,e){this.cacheKey="",this.cacheFrame=null,this.tfKey="",this.tf=null,this.body=t,this.model=Pg(t,e),this.bodyParams=this.model.body,this.tract=new Cg(this.bodyParams),this.nPh=this.model.nPh,this.nOr=this.model.nOr;const i=g_(t).filter(([,s])=>s>0).map(([s,r])=>({w:r,table:Ag[s]??{}}));this.vowels=Rg.filter(s=>i.every(r=>r.table[s.ipa])).map(s=>{const r=a=>{let l=0,c=0;for(const h of i){const u=a(h.table[s.ipa]);u!==void 0&&(l+=h.w*u,c+=h.w)}return c>0?l/c:void 0},o={};for(const a of bi){const l=r(c=>c.artic[a]);l!==void 0&&(o[a]=l)}return{ipa:s.ipa,example:s.example,F1:r(a=>a.formants[0]),F2:r(a=>a.formants[1]),artic:o}})}dispose(){Lg(this.model)}static articFromArray(t){const e={...wr};return bi.forEach((i,s)=>e[i]=t[s]),e}frame(t){const e=bi.map(i=>t[i].toFixed(3)).join(",");return(e!==this.cacheKey||!this.cacheFrame)&&(this.cacheFrame=Dg(this.model,t),this.cacheKey=e),this.cacheFrame}areas(t){return Ug(this.model,t)}transfer(t){const e=bi.map(i=>t[i].toFixed(2)).join(",");return e===this.tfKey&&this.tf?this.tf:(this.tf=Ig(this.model,t),this.tfKey=e,this.tf)}articForFormants(t,e){const i=this.vowels.map(l=>{const c=Math.log(t/l.F1)*2.2,h=Math.log(e/l.F2),u=Math.hypot(c,h);return{v:l,w:1/Math.pow(u+.02,3)}});i.sort((l,c)=>c.w-l.w);const s=i.slice(0,4),r=s.reduce((l,c)=>l+c.w,0),o=["tbX","tbY","jaw","lipAp","lipProt","lipWidth","root","larynx","ttCurl"],a={};for(const l of o){let c=0;for(const{v:h,w:u}of s)c+=(h.artic[l]??wr[l])*u;a[l]=c/r}return a}nodeS(t,e){const i=this.nPh,s=this.nOr,r=new Float64Array(i+s);for(let o=0;o<i;o++)r[o]=(o+.5)/i*t;for(let o=0;o<s;o++)r[i+o]=t+(o+.5)/s*e;return r}branchS(t,e,i){const s=this.model.pharynxBranches,r=this.model.oralBranches;return t>=s.base&&t<s.base+s.n-1?(t-s.base+1)/s.n*e:t>=r.base&&t<r.base+r.n-1?e+(t-r.base+1)/r.n*i:t===this.model.glottisPort?.2:-1}}const fa=Object.freeze({...mt});function ac(n,t){if(!n)return t();Object.assign(mt,n);try{return t()}finally{Object.assign(mt,fa)}}function Eh(n,t={}){return{...fa,blue:n,blueMid:ln(n,"#000000",.22),blueDim:ln(n,"#000000",.45),frame:ln(n,"#000000",.7),...t}}const __=4;function v_(n,t){return Math.min(t,Math.max(0,Math.round(n))+__)}const M_={pressure:!0,particles:!0,grid:!1,calipers:!1},y_=48e3,Jo=Object.freeze({...wr,jaw:.18,lipAp:0,lipProt:.1}),lc=new Map;function x_(n){const t=`${(+n.female||0).toFixed(3)}/${(+n.child||0).toFixed(3)}`;let e=lc.get(t);return e||(e=new bh({female:+n.female||0,child:+n.child||0},y_),lc.set(t,e)),e}const cc=n=>bh.articFromArray(n),Ao=new H;class S_{constructor(t,e){this.model=x_(t),this.palette=e;const i=this.r=new m_;i.centred=!0,i.camera.aspect=1,i.camera.clearViewOffset(),i.camera.updateProjectionMatrix(),this.tile=0,this.lw=0,this.target=new H,ac(e,()=>this.target.copy(i.poses(this.model).target)),this.k=this.model.tract.scale,this.half=Math.tan(i.camera.fov*Math.PI/360),this.dist=1.1*15.2/this.half,this._hullSrc=null}aim(t,e,i,s){const r=this.r;(Math.abs(i-this.tile)>.01||s!==this.lw)&&(this.tile=i,this.lw=s,r.w=r.h=i,r.beams.setResolution(i/s,i/s));const o=this.dist,a=r.camera;a.position.set(Math.sin(t)*Math.cos(e),Math.sin(e),Math.cos(t)*Math.cos(e)).multiplyScalar(o).add(this.target),a.up.set(0,1,0),a.lookAt(this.target),a.updateMatrixWorld()}update(t,e,i,s,r=0,o=0){const a=this.r;ac(this.palette,()=>{a.face.update(i,e),a.face.nod+=r,a.face.tilt+=o,this.f=this.model.frame(s),a.update(this.model,this.f,s,i,M_,t)})}resetMotion(){this.r.resetMotion()}project(t,e,i){return this.r.project(t,e,i)}neck(){const t=this.r.rest,e=this.k,i=t.head.y0+3.4*e,s=t.head.at(i),r=s?(s.F+s.Bk)/2:t.center.x,[o,a]=this.r.project(r,i,0),[l]=this.r.project(s?s.F:r+4,i,0);return{x:o,y:a,cm:this.r.pxPerCmAt(r,i,0),front:l-o}}mouth(){const t=this.f;if(!t)return this.r.project(this.target.x+7*this.k,this.target.y-4*this.k,0);const e=t.upperLip[Math.min(6,t.upperLip.length-1)],i=t.lowerLip[Math.min(6,t.lowerLip.length-1)];let s=-1/0;for(const r of t.upperLip)s=Math.max(s,r.x);return this.r.project(s,(e.y+i.y)/2,0)}crown(){return this.r.crown(this.model)}hull(){if(!this._hullSrc){const a=[];for(const l of this.r.rest.shell)for(let c=0;c<l.a.length;c+=9)a.push(l.a[c],l.a[c+1],l.a[c+2]);this._hullSrc=new Float32Array(a),this._hullXY=new Float32Array(a.length/3*2)}const t=this._hullSrc,e=this._hullXY,i=this.r,s=i.beams.group.matrixWorld,r=i.w,o=i.h;for(let a=0,l=0;a<t.length;a+=3,l+=2)Ao.set(t[a],t[a+1],t[a+2]).applyMatrix4(s).project(i.camera),e[l]=(Ao.x+1)/2*r,e[l+1]=(1-Ao.y)/2*o;return b_(e)}dispose(){this.r.dispose()}}function b_(n){const t=n.length/2,e=new Array(t);for(let a=0;a<t;a++)e[a]=a;e.sort((a,l)=>n[2*a]-n[2*l]||n[2*a+1]-n[2*l+1]);const i=(a,l,c)=>(n[2*l]-n[2*a])*(n[2*c+1]-n[2*a+1])-(n[2*l+1]-n[2*a+1])*(n[2*c]-n[2*a]),s=[],r=[];for(const a of e){for(;s.length>=2&&i(s[s.length-2],s[s.length-1],a)<=0;)s.pop();s.push(a)}for(let a=e.length-1;a>=0;a--){const l=e[a];for(;r.length>=2&&i(r[r.length-2],r[r.length-1],l)<=0;)r.pop();r.push(l)}r.pop(),s.pop();const o=[];for(const a of s.concat(r))o.push(n[2*a],n[2*a+1]);return o}class E_{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=512,this.failed=!1,this.lost=!1,this.size=512;try{this.gl=new ah({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1})}catch(e){console.warn("heads: WebGL unavailable",e),this.failed=!0;return}const t=this.gl;t.outputColorSpace=Pn,t.setClearColor(0,1),t.setPixelRatio(1),t.setSize(512,512,!1),t.autoClear=!1,this.canvas.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>this.lost=!1)}get ok(){return!this.failed&&!this.lost}render(t,e){e=Math.max(8,Math.round(e)),e>this.size&&(this.size=Math.min(4096,Math.ceil(e/256)*256),this.gl.setSize(this.size,this.size,!1));const i=this.gl,s=v_(e,this.size);return i.setScissorTest(!0),i.setScissor(0,0,s,s),i.clear(),i.setViewport(0,0,e,e),i.setScissor(0,0,e,e),i.render(t.r.scene,t.r.camera),[0,this.size-e,e,e]}dispose(){this.gl&&(this.gl.dispose(),this.gl.forceContextLoss())}}const an=Math.PI*2,Kt=n=>{const t=new Path2D;return n(t),t};function vn(n,t,e,i,s,r=0,o=1){n.save(),n.translate(t,e),r&&n.rotate(r),n.scale(i*o,i);try{s()}finally{n.restore()}}const Ln=(n,t)=>n/Math.abs(t);function Th(n,t,e,i,s={}){if(!(i>=0)||i>1.5)return;const r=Li(s.seed??1),o=s.count??22,a=s.colors??[x.gold,x.magenta,x.cyan,x.lime,x.sky],l=s.spread??1;for(let c=0;c<o;c++){const h=r.range(-Math.PI,0)+r.range(-.4,.4),u=r.range(90,260)*l,f=t+Math.cos(h)*u*i,d=e+Math.sin(h)*u*i+260*i*i,_=1-ie(i/1.4),g=r.pick(a),p=r.range(4,12)*i+r.range(0,an),m=r.range(3,7);c%3===0?(Ot(n,f-m,d,f+m,d,g,1.3,{alpha:_,hot:!0}),Ot(n,f,d-m,f,d+m,g,1.3,{alpha:_,hot:!0})):Ot(n,f-Math.cos(p)*m,d-Math.sin(p)*m,f+Math.cos(p)*m,d+Math.sin(p)*m,g,1.6,{alpha:_})}}function Es(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,o=i.color??x.violet,a=i.alpha??1;vn(n,t,e,s,()=>{const l=Ln(1.5,s),c=Kt(u=>{u.moveTo(18,-6),u.bezierCurveTo(10,-14,-10,-12,-16,-3),u.lineTo(-30,2),u.lineTo(-28,7),u.lineTo(-14,5),u.bezierCurveTo(-4,10,12,8,18,-6),u.closePath()});Rt(n,c),nt(n,c,o,l,{alpha:a});const h=Kt(u=>{u.arc(19,-9,6.5,0,an)});if(Rt(n,h),nt(n,h,o,l,{alpha:a}),nt(n,Kt(u=>{u.moveTo(25,-11),u.lineTo(35,-7.5),u.lineTo(25,-6.5)}),x.amber,l,{alpha:a,hot:!0}),_e(n,21,-10.5,1.3,x.white,a),i.perched)nt(n,Kt(u=>{u.moveTo(-14,-2),u.bezierCurveTo(-4,-8,8,-6,12,-2)}),o,l*.8,{alpha:.7*a}),nt(n,Kt(u=>{u.moveTo(0,7),u.lineTo(-2,15),u.moveTo(6,7),u.lineTo(5,15),u.moveTo(-6,15),u.lineTo(10,15)}),x.amber,l,{alpha:a});else{const u=Math.sin((i.flap??0)*an);for(const f of[1,.6]){const d=-30*u*f-4,_=Kt(g=>{g.moveTo(6,-6),g.bezierCurveTo(0,d*.6-4,-14,d,-24,d+2),g.lineTo(-18,d*.4+2),g.bezierCurveTo(-10,-2,-2,-2,-6,-2)});nt(n,_,o,l,{alpha:a*(f===1?1:.5)})}}},0,r)}function wh(n,t,e,i=1,s={}){vn(n,t,e,i,()=>{const r=Kt(o=>{o.moveTo(-20,8),o.lineTo(-22,-10),o.lineTo(-10,0),o.lineTo(0,-16),o.lineTo(10,0),o.lineTo(22,-10),o.lineTo(20,8),o.closePath()});Rt(n,r),nt(n,r,s.color??x.gold,Ln(1.8,i),{hot:!0,alpha:s.alpha});for(const[o,a]of[[-22,-12],[0,-18],[22,-12]])_e(n,o,a,2.4,x.magenta,s.alpha??1);Ot(n,-18,3,18,3,s.color??x.gold,Ln(1,i),{alpha:.6*(s.alpha??1)})})}function T_(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,o=i.color??x.white,a=Math.sin((i.bob??0)*an)*4;vn(n,t,e,s,()=>{const l=Ln(1.6,s),c=Kt(d=>{d.moveTo(14,-30),d.bezierCurveTo(26,-10,22,18,0,22),d.bezierCurveTo(-24,24,-36,6,-40,-18),d.lineTo(-30,-12),d.lineTo(-34,-30),d.lineTo(-22,-16),d.bezierCurveTo(-12,-14,0,-18,14,-30),d.closePath()});Rt(n,c),nt(n,c,o,l),nt(n,Kt(d=>{d.moveTo(-14,0),d.bezierCurveTo(-6,10,6,8,8,-2)}),o,l*.8,{alpha:.6});const h=18+a,u=-44,f=Kt(d=>{d.moveTo(10,-26),d.lineTo(h-4,u+8),d.arc(h,u,9,Math.PI*.75,Math.PI*.4,!1),d.lineTo(20,-22)});Rt(n,f),nt(n,f,o,l),nt(n,Kt(d=>{d.moveTo(h+7,u-2),d.lineTo(h+17,u+1),d.lineTo(h+7,u+4)}),x.amber,l,{hot:!0}),nt(n,Kt(d=>{d.moveTo(h-4,u-8),d.bezierCurveTo(h-6,u-18,h,u-16,h,u-10),d.bezierCurveTo(h+2,u-18,h+8,u-16,h+5,u-7)}),x.red,l,{hot:!0}),nt(n,Kt(d=>{d.moveTo(h+7,u+4),d.bezierCurveTo(h+10,u+12,h+4,u+12,h+4,u+6)}),x.red,l),_e(n,h+2,u-2,1.6,x.white),nt(n,Kt(d=>{for(const _ of[-8,4])d.moveTo(_,21),d.lineTo(_,38),d.moveTo(_-6,40),d.lineTo(_,38),d.lineTo(_+7,40)}),x.amber,l),i.crown&&wh(n,h-1,u-20,.5/1,{color:x.gold})},0,r)}function w_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.sky;vn(n,t,e,s,()=>{const o=Ln(1.6,s),a=Kt(l=>{l.moveTo(30,-32),l.bezierCurveTo(40,-30,38,-18,28,-16),l.bezierCurveTo(22,0,10,14,-16,16),l.bezierCurveTo(-34,16,-46,12,-50,4),l.lineTo(-58,-4),l.lineTo(-50,10),l.lineTo(-62,14),l.lineTo(-44,18),l.bezierCurveTo(-20,22,10,22,20,12),l.lineTo(26,22),l.lineTo(12,22),l.bezierCurveTo(16,0,14,-26,30,-32),l.closePath()});Rt(n,a),nt(n,a,r,o),_e(n,30,-26,1.8,x.white);for(const l of[-1,1])Ot(n,36,-21,46,-21+l*3,r,o*.6,{alpha:.6});if(i.ball){const l=-44+Math.sin((i.t??0)*6)*2;Fe(n,36,l,9,x.red,o,{hot:!0}),nt(n,Kt(c=>{c.moveTo(27,l),c.bezierCurveTo(32,l-6,40,l-6,45,l)}),x.white,o*.7,{alpha:.7})}},0,i.facing??1)}function A_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.lime,o=ie(i.jaw??0)*.45;vn(n,t,e,s,()=>{const a=Ln(1.6,s),l=Kt(c=>{c.moveTo(30,-8),c.bezierCurveTo(10,-18,-30,-16,-60,-6),c.lineTo(-90,0),c.lineTo(-60,6),c.bezierCurveTo(-30,12,10,12,30,4),c.closePath()});Rt(n,l),nt(n,l,r,a),nt(n,Kt(c=>{for(let h=0;h<9;h++){const u=20-h*10;c.moveTo(u,-12+h*.6),c.lineTo(u-4,-17+h*.6),c.lineTo(u-8,-12+h*.6)}}),r,a*.8,{alpha:.7}),vn(n,30,-4,1,()=>{n.rotate(-o);const c=Kt(h=>{h.moveTo(0,-4),h.lineTo(46,-2),h.lineTo(48,2),h.lineTo(0,2)});Rt(n,c),nt(n,c,r,a),nt(n,Kt(h=>{for(let u=0;u<6;u++)h.moveTo(8+u*7,2),h.lineTo(11+u*7,5),h.lineTo(14+u*7,2)}),x.white,a*.7),_e(n,8,-7,2,x.amber)}),vn(n,30,2,1,()=>{n.rotate(o*.6),nt(n,Kt(c=>{c.moveTo(0,0),c.lineTo(44,0),c.lineTo(42,5),c.lineTo(0,6)}),r,a)}),nt(n,Kt(c=>{for(const h of[16,-40])c.moveTo(h,8),c.lineTo(h-4,18),c.lineTo(h+4,18)}),r,a)},0,i.facing??1)}function R_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.blueMid,o=i.trunk??0;vn(n,t,e,s,()=>{const a=Ln(1.6,s),l=Kt(h=>{h.moveTo(30,-50),h.bezierCurveTo(10,-66,-50,-64,-60,-30),h.lineTo(-60,10),h.lineTo(-46,10),h.lineTo(-44,-6),h.lineTo(-20,-6),h.lineTo(-18,10),h.lineTo(-4,10),h.lineTo(0,-10),h.lineTo(16,-10),h.lineTo(18,10),h.lineTo(32,10),h.lineTo(34,-20),h.closePath()});Rt(n,l),nt(n,l,r,a);const c=Kt(h=>{h.arc(38,-42,20,0,an)});Rt(n,c),nt(n,c,r,a),nt(n,Kt(h=>{h.moveTo(30,-58),h.bezierCurveTo(6,-66,4,-24,30,-28)}),r,a,{alpha:.8}),nt(n,Kt(h=>{h.moveTo(54,-36),h.bezierCurveTo(66,-20,60+o*10,0,66+o*16,6)}),r,a),_e(n,44,-46,1.8,x.white),nt(n,Kt(h=>{h.moveTo(50,-30),h.lineTo(60,-24)}),x.white,a,{alpha:.8}),Ot(n,-60,-26,-70,-10,r,a)},0,i.facing??1)}function Ah(n,t,e,i={}){const s=i.scale??1,r=i.color??x.cyan,o=ie(i.pressed??0),a=i.glow??0;vn(n,t,e,s,()=>{const l=Ln(1.6,s),c=Qe(-40,-30,80,66,10);Rt(n,c),nt(n,c,r,l,{alpha:.7});const h=o*8,u=Qe(-31,-40+h,62,56,8);Rt(n,u),nt(n,u,r,l*(1+a),{hot:a>.3});for(const[f,d,_,g]of[[-40,-30,-31,-40+h],[40,-30,31,-40+h],[-40,36,-31,16+h],[40,36,31,16+h]])Ot(n,f,d,_,g,r,l*.8,{alpha:.6});vt(n,i.label??"",0,0+h,{size:34,align:"center",color:a>.2?x.white:r,weight:"m",ls:0})})}function C_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.coral,o=ie(i.open??0);vn(n,t,e,s,()=>{const a=Ln(1.5,s);if(o<.05){const l=Dn(-26,-36,52,72,3);if(Rt(n,l),nt(n,l,r,a),Ot(n,-20,-36,-20,36,r,a,{alpha:.6}),i.title)for(const[c,h]of Di(n,i.title.toUpperCase(),40,{size:8}).entries())vt(n,h,3,-16+c*11,{size:8,align:"center",color:x.white,ls:.1})}else{const l=36*o;for(const c of[-1,1]){const h=Kt(u=>{u.moveTo(0,34),u.bezierCurveTo(c*l*.4,30,c*l,32,c*l,30),u.lineTo(c*l,-32),u.bezierCurveTo(c*l,-30,c*l*.4,-34,0,-30),u.closePath()});Rt(n,h),nt(n,h,r,a);for(let u=0;u<6;u++)Ot(n,c*6,-20+u*8,c*(l-6),-20+u*8,x.white,a*.6,{alpha:.4*o})}}})}function P_(n,t,e,i,s={}){const r=s.age??1;if(r<-.15)return;const o=r<0?1+-r/.15*1.6:1+.18*Math.exp(-r*18)*Math.cos(r*40),a=s.size??44,l=s.color??x.red;n.save(),n.translate(t,e),n.rotate(s.rot??-.12),n.scale(o,o);const c=ae(n,i.toUpperCase(),{size:a,weight:"m",ls:.12})+a*.9,h=a*1.5;if(n.globalAlpha=r<0?.5:1,nt(n,Qe(-c/2,-h/2,c,h,6),l,3,{hot:r>=0&&r<.3}),nt(n,Qe(-c/2+6,-h/2+6,c-12,h-12,4),l,1.2,{alpha:.6}),vt(n,i.toUpperCase(),0,a*.36,{size:a,align:"center",color:l,weight:"m",ls:.12}),n.restore(),r>=0&&r<.5){const u=Li(i);for(let f=0;f<10;f++){const d=u.range(0,an),_=c/2*(1+r*u.range(.8,2.2));_e(n,t+Math.cos(d)*_,e+Math.sin(d)*_*.5,1.6,l,1-r*2)}}}function L_(n,t,e,i,s={}){const r=qe.outBack(ie(s.appear??1));if(r<=0)return;const o=s.size??20,a=s.side??1,l=String(i).split(`
`).flatMap(g=>Di(n,g,(s.w??300)-30,{size:o})),c=Math.max(...l.map(g=>ae(n,g,{size:o})))+34,h=l.length*o*1.35+22,u=t+a*30-(a<0?c:0),f=e-40-h,d=s.color??x.white;n.save(),n.translate(t,e),n.scale(r,r),n.translate(-t,-e);const _=Qe(u,f,c,h,14);if(Rt(n,_),nt(n,_,d,1.6),s.think)for(let g=0;g<3;g++)Fe(n,t+a*(6+g*8),e-8-g*12,3+g*2,d,1.2);else{const g=Kt(p=>{p.moveTo(t+a*34,f+h-1),p.lineTo(t,e),p.lineTo(t+a*58,f+h-1)});Rt(n,g),nt(n,Kt(p=>{p.moveTo(t+a*34,f+h),p.lineTo(t,e),p.lineTo(t+a*58,f+h)}),d,1.6)}l.forEach((g,p)=>vt(n,g,u+17,f+14+(p+.8)*o*1.35-o*.25,{size:o,color:d})),n.restore()}function D_(n,t,e,i=360,s={}){var f;const r=s.color??x.gold,o=qe.outCubic(ie(s.rise??1)),a=i/3,l=[i*.42,i*.3,i*.2].map(d=>d*o),c=[t-a/2,t-a*1.5,t+a/2],h=[0,1,2],u=[];for(const d of h){const _=c[d],g=l[d],p=Dn(_,e-g,a,g);Rt(n,p),nt(n,p,d===0?r:ln(r,"#888888",.4),1.6,{hot:d===0}),g>30&&vt(n,String(((f=s.labels)==null?void 0:f[d])??d+1).toUpperCase(),_+a/2,e-g+Math.min(48,g*.6),{size:Math.min(40,a*.32),align:"center",color:d===0?r:x.white,weight:"m",ls:.05}),u.push([_+a/2,e-g])}return u}function U_(n,t,e,i={}){const s=i.w??300,r=i.height??120,o=i.color??x.lime,a=(i.wobble??0)*6;for(const c of[-1,1])Ot(n,t+c*s/2,e,t+c*s/2,e-r-40,x.blueMid,2),Ot(n,t+c*s/2-12,e,t+c*s/2+12,e,x.blueMid,2),Ot(n,t+c*s/2-6,e-r,t+c*s/2+6,e-r,x.white,1.4);const l=Kt(c=>{c.moveTo(t-s/2,e-r),c.quadraticCurveTo(t,e-r+a,t+s/2,e-r)});nt(n,l,o,4,{hot:!0});for(let c=1;c<8;c++){const h=t-s/2+s*c/8;Ot(n,h-4,e-r-2,h+4,e-r+2,x.white,1.4,{alpha:.7})}}function I_(n,t,e,i,s={}){const r=s.size??30,o=s.age??10,a=r*.82,l=r*1.3,c=String(i).toUpperCase().padEnd(s.cells??i.length," "),h="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for(let u=0;u<c.length;u++){const f=t+u*(a+3),d=Dn(f,e-l,a,l,2);Rt(n,d,"#05080c"),nt(n,d,x.blueDim,1),Ot(n,f,e-l/2,f+a,e-l/2,"#000",1.2);const _=.25+u*.05;let g=c[u];o<_&&g!==" "&&(g=h[Math.floor((o*30+u*7)%h.length)]),o<0&&(g=" "),vt(n,g,f+a/2,e-l*.25,{size:r,align:"center",color:o<_?x.blueMid:s.color??x.amber,weight:"m",ls:0})}}function Rh(n,t,e,i,s={}){const r=s.size??18,o=r*1.9;Rt(n,Dn(0,t,1280,o),"#000",.92),Ot(n,0,t,1280,t,s.color??x.amber,1.4,{hot:!0}),Ot(n,0,t+o,1280,t+o,s.color??x.amber,1);const a=`${String(e).toUpperCase()}   ◆   `,l=ae(n,a,{size:r,ls:.12}),c=(i*(s.speed??110)%l+l)%l;n.save(),n.beginPath(),n.rect(0,t,1280,o),n.clip();for(let h=-c;h<1280;h+=l)vt(n,a,h,t+o*.68,{size:r,color:x.white,ls:.12});if(n.restore(),s.tag){const h=ae(n,s.tag.toUpperCase(),{size:r,weight:"m",ls:.2})+30;xe(n,0,t,h,o,{color:s.color??x.amber,width:1.4}),vt(n,s.tag.toUpperCase(),15,t+o*.68,{size:r,color:s.color??x.amber,weight:"m",ls:.2})}}function N_(n,t,e={}){const i=Li(n),s=e.points??40,r=t.x+t.w/2,o=t.y+t.h/2,a=[i.range(0,an),i.range(0,an),i.range(0,an)],l=[];for(let h=0;h<s;h++){const u=h/s*an,f=1+.14*Math.sin(u*2+a[0])+.08*Math.sin(u*5+a[1])+.05*Math.sin(u*9+a[2])+i.range(-.03,.03);l.push([r+Math.cos(u)*(t.w/2)*.85*f,o+Math.sin(u)*(t.h/2)*.85*f])}const c=new Path2D;return l.forEach(([h,u],f)=>f?c.lineTo(h,u):c.moveTo(h,u)),c.closePath(),{path:c,pts:l}}function F_(n,t,e={}){nt(n,t.path,e.color??x.sky,1.8,{alpha:e.alpha??1})}function O_(n,t,e={}){const i=e.kind??"cold",s=e.color??(i==="warm"?x.red:x.sky),r=ie(e.progress??1),o=[0];for(let h=1;h<t.length;h++)o.push(o[h-1]+Math.hypot(t[h][0]-t[h-1][0],t[h][1]-t[h-1][1]));const a=o[o.length-1]*r,l=new Path2D;l.moveTo(t[0][0],t[0][1]);for(let h=1;h<t.length&&o[h-1]<a;h++){const u=Math.min(1,(a-o[h-1])/(o[h]-o[h-1]||1));l.lineTo(t[h-1][0]+(t[h][0]-t[h-1][0])*u,t[h-1][1]+(t[h][1]-t[h-1][1])*u)}nt(n,l,s,2.2,{hot:!0});const c=e.spacing??40;for(let h=c/2;h<a;h+=c){let u=1;for(;u<o.length-1&&o[u]<h;)u++;const f=(h-o[u-1])/(o[u]-o[u-1]||1),d=t[u-1][0]+(t[u][0]-t[u-1][0])*f,_=t[u-1][1]+(t[u][1]-t[u-1][1])*f,g=Math.atan2(t[u][1]-t[u-1][1],t[u][0]-t[u-1][0]);if(typeof i=="function")i(n,d,_,g);else{n.save(),n.translate(d,_),n.rotate(g);const p=new Path2D;i==="warm"?p.arc(0,0,8,Math.PI,0):(p.moveTo(-8,0),p.lineTo(0,-12),p.lineTo(8,0)),p.closePath(),nt(n,p,s,1.8,{hot:!0}),n.restore()}}}function z_(n,t,e,i,s={}){const r=s.seed??3,o=new Path2D;for(let a=0;a<=48;a++){const l=a/48*an,c=1+.12*We(l*1.3+r,r);a?o.lineTo(t+Math.cos(l)*i*c,e+Math.sin(l)*i*c*.7):o.moveTo(t+i*c,e)}nt(n,o,s.color??x.blueMid,1.1,{alpha:s.alpha??.7}),s.label&&vt(n,s.label,t+i*.7,e-i*.5,{size:12,color:s.color??x.blueMid})}function B_(n,t,e,i=20,s=0,r=x.gold){Fe(n,t,e,i,r,2,{hot:!0});for(let o=0;o<10;o++){const a=o/10*an+s*.4;Ot(n,t+Math.cos(a)*i*1.3,e+Math.sin(a)*i*1.3,t+Math.cos(a)*i*1.75,e+Math.sin(a)*i*1.75,r,1.6)}}function Fr(n,t,e,i=1,s=x.white){vn(n,t,e,i,()=>{const r=Kt(o=>{o.moveTo(-30,10),o.arc(-18,0,12,Math.PI*.6,Math.PI*1.5),o.arc(0,-8,16,Math.PI*1.1,Math.PI*1.9),o.arc(20,0,12,Math.PI*1.4,Math.PI*.4),o.closePath()});Rt(n,r),nt(n,r,s,Ln(1.6,i))})}function k_(n,t,e,i=1,s=0,r=x.sky){Fr(n,t,e,i,x.white);for(let o=0;o<5;o++){const a=(s*1.8+o*.37)%1,l=(-16+o*8)*i,c=(16+a*26)*i;Ot(n,t+l,e+c,t+l-3*i,e+c+8*i,r,1.4,{alpha:1-a})}}function H_(n,t,e,i=1,s=0){Fr(n,t,e,i,x.blueMid);const r=Math.floor(s*3)%4===0;nt(n,Kt(o=>{o.moveTo(t+2*i,e+12*i),o.lineTo(t-6*i,e+28*i),o.lineTo(t+2*i,e+28*i),o.lineTo(t-6*i,e+46*i)}),x.gold,2,{hot:r,alpha:r?1:.4})}function G_(n,t,e,i=1,s=0){Fr(n,t,e,i,x.white);for(let r=0;r<5;r++){const o=(s*.6+r*.29)%1,a=t+(-16+r*8+Math.sin(s*2+r)*3)*i,l=e+(16+o*30)*i;for(let c=0;c<3;c++){const h=c/3*Math.PI;Ot(n,a-Math.cos(h)*3*i,l-Math.sin(h)*3*i,a+Math.cos(h)*3*i,l+Math.sin(h)*3*i,x.white,1,{alpha:1-o})}}}function Rr(n,t,e,i,s,r={}){const o=r.color??x.blueMid;if(!r.noStand){const l=Kt(c=>{c.moveTo(t+i/2-14,e+s+10),c.lineTo(t+i/2-24,e+s+50),c.lineTo(t+i/2+24,e+s+50),c.lineTo(t+i/2+14,e+s+10)});Rt(n,l),nt(n,l,o,1.4)}const a=Qe(t-12,e-12,i+24,s+24,14);Rt(n,a),nt(n,a,o,1.8),nt(n,Qe(t,e,i,s,6),o,1,{alpha:.7})}Rr.glass=function(n,t,e,i,s,r={}){const o=r.color??x.blueMid;n.save(),n.beginPath(),n.rect(t,e,i,s),n.clip(),n.globalAlpha=.18,n.fillStyle="#000";for(let a=e;a<e+s;a+=3)n.fillRect(t,a,i,1.2);if(n.restore(),Ot(n,t+14,e+10,t+i*.35,e+10,x.white,1,{alpha:.18}),r.label){const a=ae(n,r.label.toUpperCase(),{size:14,ls:.2})+26;xe(n,t+10,e+s-34,a,26,{color:o,cut:5,width:1.2,fillAlpha:.85}),vt(n,r.label.toUpperCase(),t+23,e+s-16,{size:14,color:x.white,ls:.2})}if(r.live){const a=Math.floor((r.t??0)*1.6)%2===0;xe(n,t+i-82,e+12,70,26,{color:x.onair,cut:5,width:1.2,fillAlpha:.85}),_e(n,t+i-68,e+25,5,x.onair,a?1:.3),vt(n,"LIVE",t+i-56,e+32,{size:15,color:x.onair,weight:"m",ls:.2})}};function Ch(n,t,e,i={}){const s=i.rect??{x:0,y:0,w:1280,h:720},r=i.speed??40,o=i.lineHeight??34,a=s.x+s.w/2;let l=s.y+s.h-e*r;n.save(),n.beginPath(),n.rect(s.x,s.y,s.w,s.h),n.clip();for(const c of t){const h=ie(Math.min((l-s.y)/60,(s.y+s.h-l)/60));if(l>s.y-o&&l<s.y+s.h+o)if(typeof c=="string")vt(n,c.toUpperCase(),a,l,{size:18,align:"center",color:x.white,ls:.2,alpha:h});else if(Array.isArray(c)){const u=s.x+s.w*(i.split??.6);vt(n,String(c[0]).toUpperCase(),u-16,l,{size:13,align:"right",color:x.sky,ls:.16,alpha:h}),vt(n,String(c[1]),u+16,l,{size:18,align:"left",color:x.white,ls:.06,alpha:h})}else c!=null&&c.head&&vt(n,c.head.toUpperCase(),a,l,{size:22,align:"center",color:x.gold,ls:.35,weight:"m",alpha:h});l+=c!=null&&c.head?o*1.5:o}return n.restore(),l>s.y}function Qo(n,t,e,i={}){const s=i.w??120,r=i.h??170,o=i.color??x.violet,a=Kt(c=>{c.moveTo(t-s/2-10,e),c.lineTo(t+s/2+10,e),c.lineTo(t+s/2+4,e+16),c.lineTo(t-s/2-4,e+16),c.closePath()}),l=Kt(c=>{c.moveTo(t-s/2,e+16),c.lineTo(t+s/2,e+16),c.lineTo(t+s/2-14,e+r),c.lineTo(t-s/2+14,e+r),c.closePath()});if(Rt(n,l),nt(n,l,o,1.6),Rt(n,a),nt(n,a,o,1.6,{hot:!0}),i.label&&vt(n,i.label.toUpperCase(),t,e+16+r*.3,{size:Math.min(22,s/(i.label.length*.7)),align:"center",color:i.labelColor??o,weight:"m",ls:.12}),i.lights)for(let c=0;c<6;c++)_e(n,t-s/2+18+c*(s-36)/5,e+r-18,2.6,c%2?x.gold:o,.4+.6*(Math.floor((i.t??0)*4+c)%3===0?1:.3))}const x=Object.freeze({...fa,gold:"#ffc861",goldMid:"#d39a3c",goldDim:"#6e4f1c",bsky:"#3f8cff",sky:"#7cc4ff",cyan:"#58f0e8",violet:"#a98bff",magenta:"#ff5fd2",lime:"#b6ff5c",coral:"#ff7a5c",onair:"#ff3b30",dim:"#0d2234",black:"#000000"});function Dn(n,t,e,i,s=0){const r=new Path2D;if(s<=0)return r.rect(n,t,e,i),r;const o=Math.min(s,e/2,i/2);return r.moveTo(n+o,t),r.lineTo(n+e-o,t),r.lineTo(n+e,t+o),r.lineTo(n+e,t+i-o),r.lineTo(n+e-o,t+i),r.lineTo(n+o,t+i),r.lineTo(n,t+i-o),r.lineTo(n,t+o),r.closePath(),r}function Qe(n,t,e,i,s=8){const r=new Path2D;return s=Math.min(s,e/2,i/2),r.moveTo(n+s,t),r.arcTo(n+e,t,n+e,t+i,s),r.arcTo(n+e,t+i,n,t+i,s),r.arcTo(n,t+i,n,t,s),r.arcTo(n,t,n+e,t,s),r.closePath(),r}function Rt(n,t,e="#000",i=1){n.save(),n.globalCompositeOperation="source-over",n.globalAlpha=i,n.fillStyle=e,n.fill(t),n.restore()}function xe(n,t,e,i,s,r={}){const o=r.color??x.blue,a=r.radius?Qe(t,e,i,s,r.radius):Dn(t,e,i,s,r.cut??0);if(r.fill!==null&&Rt(n,a,r.fill??"#000",r.fillAlpha??1),r.corners){const l=r.corners,c=new Path2D;for(const[h,u,f,d]of[[t,e,1,1],[t+i,e,-1,1],[t,e+s,1,-1],[t+i,e+s,-1,-1]])c.moveTo(h+f*l,u),c.lineTo(h,u),c.lineTo(h,u+d*l);nt(n,c,o,r.width??1.6,{alpha:r.alpha,hot:r.hot})}else nt(n,a,o,r.width??1.4,{alpha:r.alpha,hot:r.hot});return a}function _r(n,t,e,i,s={}){const r=s.glow??.6;r>0&&(n.save(),n.filter=`blur(${((s.size??11)*.12).toFixed(1)}px)`,vt(n,t,e,i,{...s,alpha:(s.alpha??1)*r}),n.restore()),vt(n,t,e,i,s)}function Ph(n,t,e,i,s,r={}){const o=r.size??16,a=r.lineHeight??o*1.4,l=[];for(const c of String(t).split(`
`))l.push(...Di(n,c,s,r));return l.forEach((c,h)=>vt(n,c,e,i+h*a,r)),l.length*a}function V_(n,t,e,i,s,r={}){const o=Math.floor(ie(s)*t.length),a=t.slice(0,o),l=r.maxW??1/0,c=r.size??18;let h;if(l<1/0?h=Ph(n,a,e,i,l,r):(vt(n,a,e,i,r),h=c),(s<1||r.cursor)&&(r.t===void 0||Math.floor(r.t*2.5)%2===0)){const f=l<1/0?a.split(`
`).flatMap(m=>Di(n,m,l,r)):[a],d=f[f.length-1]??"",_=r.lineHeight??c*1.4,g=e+ae(n,d,r)+c*.15,p=i+(f.length-1)*(l<1/0?_:0);Ot(n,g,p+c*.12,g+c*.55,p+c*.12,r.color??x.green,Math.max(1.5,c*.1))}return h}function W_(n,t,e=0){return(n*qe.outCubic(ie(t))).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e})}function da(n){return n>=1e6?(n/1e6).toFixed(n>=1e7?0:1).replace(/\.0$/,"")+"M":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1).replace(/\.0$/,"")+"K":String(Math.round(n))}function $_(n,t,e,i,s,r=x.white,o=2,a={}){const l=Math.atan2(s-e,i-t),c=a.head??10,h=new Path2D;h.moveTo(t,e),h.lineTo(i,s),h.moveTo(i-c*Math.cos(l-.45),s-c*Math.sin(l-.45)),h.lineTo(i,s),h.lineTo(i-c*Math.cos(l+.45),s-c*Math.sin(l+.45)),nt(n,h,r,o,a)}function Lh(n,t,e={}){const{x:i,y:s,w:r}=t,o=qe.outCubic(ie(e.appear??1));if(o<=0)return;const a=t.h*o,l=e.color??x.sky;if(xe(n,i,s,r,a,{color:l,cut:10,width:1.6,alpha:.9}),nt(n,Dn(i+6,s+6,r-12,a-12,6),l,.8,{alpha:.25}),e.title&&o>.6){const c=ae(n,e.title.toUpperCase(),{size:15,ls:.2})+28;xe(n,i+18,s-13,c,26,{color:l,cut:6,width:1.4}),vt(n,e.title.toUpperCase(),i+32,s+6,{size:15,ls:.2,color:x.white,alpha:Gn(.6,1,o)})}e.sub&&o>.8&&vt(n,e.sub.toUpperCase(),i+r-18,s+a-16,{size:11,align:"right",color:l,alpha:.7,ls:.2})}function X_(n,t,e,i={}){const{x:s,y:r,w:o,h:a}=t,l=i.max??Math.max(1e-9,...e.map(p=>p.value)),c=i.progress??1,h=i.format??(p=>da(p)),u=i.labelSize??15,f=e.length;if(i.horizontal===!1){const p=o/f*.6;e.forEach((m,M)=>{const v=qe.outCubic(ie(c*f-M*.6)),E=s+o/f*(M+.2),C=(a-40)*(m.value/l)*v,S=m.color??i.color??x.sky;xe(n,E,r+a-24-C,p,C,{color:S,width:1.6,hot:!0});for(let w=6;w<C;w+=6)Ot(n,E+3,r+a-24-w,E+p-3,r+a-24-w,S,.8,{alpha:.25});vt(n,m.label.toUpperCase(),E+p/2,r+a-4,{size:u*.8,align:"center",color:x.white,alpha:.85}),v>.1&&vt(n,h(m.value*v),E+p/2,r+a-32-C,{size:u,align:"center",color:S})});return}const d=i.labelWidth??o*.3,_=a/f,g=Math.min(26,_*.56);e.forEach((p,m)=>{const M=qe.outCubic(ie(c*f-m*.6)),v=r+_*m+(_-g)/2,E=p.color??i.color??x.sky;vt(n,p.label.toUpperCase(),s+d-12,v+g*.72,{size:u,align:"right",color:x.white,alpha:.9});const S=(o-d-70)*(p.value/l)*M;if(S>1){xe(n,s+d,v,S,g,{color:E,width:1.6,hot:p.hot});for(let w=6;w<S-2;w+=7)Ot(n,s+d+w,v+3,s+d+w,v+g-3,E,.8,{alpha:.22})}M>.05&&p.value>0&&vt(n,h(p.value*M)+(p.note?" "+p.note:""),s+d+S+10,v+g*.72,{size:u,color:E})})}function q_(n,t,e,i={}){const{x:s,y:r,w:o,h:a}=t,l=e.flatMap(f=>f.values),c=i.min??Math.min(...l),h=i.max??Math.max(...l),u=ie(i.progress??1);if(i.grid!==!1)for(let f=0;f<=4;f++){const d=r+a-a*f/4;Ot(n,s,d,s+o,d,x.blueDim,.8,{alpha:f===0?.8:.35}),i.yFormat&&vt(n,i.yFormat(c+(h-c)*f/4),s-8,d+4,{size:11,align:"right",color:x.blueMid})}i.xLabels&&i.xLabels.forEach((f,d)=>vt(n,String(f).toUpperCase(),s+o*d/Math.max(1,i.xLabels.length-1),r+a+18,{size:11,align:"center",color:x.blueMid}));for(const f of e){const d=f.values.length,_=u*(d-1),g=[];for(let M=0;M<=Math.min(d-1,Math.floor(_));M++)g.push([s+o*M/(d-1),r+a-a*(f.values[M]-c)/(h-c||1)]);const p=Math.floor(_);if(p<d-1){const M=_-p,v=f.values[p],E=f.values[p+1];g.push([s+o*_/(d-1),r+a-a*(v+(E-v)*M-c)/(h-c||1)])}fh(n,g,f.color??x.amber,2.2,{hot:!0});const m=g[g.length-1];m&&(Fe(n,m[0],m[1],5,f.color??x.amber,1.6),f.label&&u>.95&&vt(n,f.label.toUpperCase(),m[0]+10,m[1]+4,{size:13,color:f.color??x.amber}))}}function Or(n,t,e,i,s=x.bsky,r={}){const o=i/2,a=new Path2D;for(const l of[-1,1])a.moveTo(t,e-.05*o),a.bezierCurveTo(t+l*.25*o,e-.55*o,t+l*.95*o,e-1*o,t+l*.98*o,e-.62*o),a.bezierCurveTo(t+l*1.02*o,e-.2*o,t+l*.8*o,e+.05*o,t+l*.45*o,e+.12*o),a.bezierCurveTo(t+l*.85*o,e+.25*o,t+l*.75*o,e+.8*o,t+l*.35*o,e+.62*o),a.bezierCurveTo(t+l*.15*o,e+.5*o,t+l*.05*o,e+.25*o,t,e+.08*o);nt(n,a,s,r.width??Math.max(1.2,i*.045),{hot:r.hot??!0,alpha:r.alpha})}function Y_(n,t,e){const i=new Path2D;return i.moveTo(n,t+e*.35),i.bezierCurveTo(n-e*.9,t-e*.2,n-e*.35,t-e*.75,n,t-e*.3),i.bezierCurveTo(n+e*.35,t-e*.75,n+e*.9,t-e*.2,n,t+e*.35),i}function j_(n,t,e){const i=new Path2D,s=e*.7,r=e*.32;return i.moveTo(n-s,t+r*.2),i.lineTo(n-s,t-r),i.lineTo(n+s*.7,t-r),i.moveTo(n+s*.45,t-r-e*.2),i.lineTo(n+s*.7,t-r),i.lineTo(n+s*.45,t-r+e*.2),i.moveTo(n+s,t-r*.2),i.lineTo(n+s,t+r),i.lineTo(n-s*.7,t+r),i.moveTo(n-s*.45,t+r-e*.2),i.lineTo(n-s*.7,t+r),i.lineTo(n-s*.45,t+r+e*.2),i}function Z_(n,t,e){const i=new Path2D;return i.moveTo(n-e*.55,t+e*.45),i.lineTo(n-e*.55,t-e*.4),i.lineTo(n+e*.6,t-e*.4),i.lineTo(n+e*.6,t+e*.25),i.lineTo(n-e*.2,t+e*.25),i.closePath(),i}function Dh(n,t,e,i,s={}){const r=s.color??x.bsky;Rt(n,(()=>{const o=new Path2D;return o.arc(t,e,i,0,Math.PI*2),o})()),Fe(n,t,e,i,r,Math.max(1.4,i*.09),{hot:!0}),Fe(n,t,e,i*.78,r,.9,{alpha:.4}),s.initials&&vt(n,s.initials.toUpperCase(),t,e+i*.32,{size:i*.85,align:"center",color:x.white,weight:"m",ls:.02})}function Uh(n,t,e,i,s){const r=n.__lcProtect;if(!r||!(i>0)||!(s>0))return;const o=n.getTransform(),a=[],l=[];for(const[u,f]of[[t,e],[t+i,e],[t,e+s],[t+i,e+s]])a.push(o.a*u+o.c*f+o.e),l.push(o.b*u+o.d*f+o.f);const c=Math.min(...a),h=Math.min(...l);r.rects.push({x:c/r.k,y:h/r.k,w:(Math.max(...a)-c)/r.k,h:(Math.max(...l)-h)/r.k})}function K_(n,t){const e=t.scale??1,i=(t.w??460)/e,s=ie(t.appear??1);if(s<=0)return 0;const r=qe.outBack(s);n.save(),n.translate(t.x,t.y+(1-r)*40),n.scale(e,e),n.globalAlpha=Math.min(1,s*2);const o=t.color??x.bsky,a=18,l=t.textSize??19,c=i-a*2-58,h=String(t.text??""),u=h.split(`
`).flatMap(E=>Di(n,E,c,{size:l,ls:.04})),f=l*1.38,d=a+26+u.length*f+52;xe(n,0,0,i,d,{color:o,radius:14,width:1.6,alpha:.95}),Dh(n,a+22,a+22,22,{color:t.avatarColor??o,initials:t.initials??(t.name??"?").slice(0,1)});const _=a+58;vt(n,t.name??"Someone",_,a+15,{size:17,color:x.white,weight:"m",ls:.04});const g=ae(n,t.name??"Someone",{size:17,weight:"m",ls:.04});vt(n,`@${t.handle??"someone.example"}${t.time?" · "+t.time:""}`,_+g+10,a+15,{size:13,color:t.handleColor??x.blueMid,ls:.05}),Or(n,i-a-10,a+10,22,o,{width:1.2,hot:!1,alpha:.7});const p=h.length;let m=Math.floor(ie(t.reveal??1)*p);u.forEach((E,C)=>{if(m<=0)return;const S=E.slice(0,m);m-=E.length+1,vt(n,S,_,a+26+(C+1)*f-f*.25,{size:l,color:t.textColor??x.white,ls:.04})}),Uh(n,0,0,i,d);const M=d-24;return[[Z_,t.replies,x.blueMid],[j_,t.reposts,t.reposted?x.green:x.blueMid],[Y_,t.likes,t.liked||(t.likePulse??0)>0?x.magenta:x.blueMid]].forEach(([E,C,S],w)=>{const B=_+w*((i-_-a)/3)+8,y=w===2?Math.sin(Math.PI*ie(t.likePulse??0)):0,T=14*(1+.6*y);nt(n,E(B,M,T),S,1.4,{hot:y>.2}),C!=null&&vt(n,typeof C=="number"?da(C):String(C),B+16,M+5,{size:14,color:S})}),n.restore(),d*e}function J_(n,t,e={}){const i=Li(n),s=e.clusters??6,r=e.perCluster??14,o=e.colors??[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold,x.lime],a=[],l=[],c=[];for(let h=0;h<s;h++)c.push({x:t.x+t.w*(.08+.84*((h+i.range(.2,.8))/s)),y:t.y+t.h*i.range(.25,.75),col:o[h%o.length]});c.forEach((h,u)=>{const f=a.length,d=t.w/s*.42;for(let _=0;_<r;_++){const g=i.range(0,Math.PI*2),p=Math.sqrt(i())*d;a.push({x:h.x+Math.cos(g)*p,y:h.y+Math.sin(g)*p*(t.h/t.w)*2.2,c:h.col,cl:u,r:i.range(1.2,3.2),phase:i.range(0,10)})}for(let _=0;_<r*1.6;_++)l.push([f+i.int(r),f+i.int(r)])});for(let h=0;h<s*3;h++)l.push([i.int(a.length),i.int(a.length)]);return{nodes:a,edges:l.filter(([h,u])=>h!==u),centres:c}}function Q_(n,t,e=0,i={}){const s=i.alpha??1,r=new Map;for(const[o,a]of t.edges){const l=t.nodes[o],c=t.nodes[a],h=l.cl===c.cl?l.c:x.blueDim;r.has(h)||r.set(h,new Path2D);const u=r.get(h);u.moveTo(l.x,l.y),u.lineTo(c.x,c.y)}for(const[o,a]of r)nt(n,a,o,.8,{alpha:(i.edgeAlpha??.3)*s});for(const o of t.nodes){const a=.55+.45*Math.sin(e*(1.3+o.phase%1.7)+o.phase*7),l=i.highlight===o.cl?1.6:1;_e(n,o.x,o.y,o.r*l,o.c,s*a),o.r>2.6&&Fe(n,o.x,o.y,o.r*2.2,o.c,.8,{alpha:.35*s*a})}}const t1=Object.freeze(Object.defineProperty({__proto__:null,Glow:ph,HERSHEY:ch,P:x,arrow:$_,avatar:Dh,barChart:X_,beam:nt,beamPts:fh,blobRegion:N_,book:C_,box:xe,butterfly:Or,chaikin:Yo,chicken:T_,cloud:Fr,compact:da,confetti:Th,core:ha,countUp:W_,creditsRoll:Ch,crow:Es,crown:wh,dot:_e,drawGraph:Q_,elephant:R_,front:O_,gator:A_,glowText:_r,hash01:pr,hfont:ua,isobar:z_,keycap:Ah,label:vt,labelBlock:dh,labelWidth:ae,lectern:Qo,limboBar:U_,lineChart:q_,makeCluster:J_,mix:ln,occlude:Rt,panel:Lh,paragraph:Ph,pathOf:uh,podium3:D_,protect:Uh,rain:k_,rectPath:Dn,region:F_,ring:Fe,roundPath:Qe,seal:w_,seg:Ot,skeetCard:K_,snow:G_,speechBubble:L_,splitFlap:I_,stamp:P_,storm:H_,sun:B_,ticker:Rh,tvFrame:Rr,typewriter:V_,wrapLabel:Di},Symbol.toStringTag,{value:"Module"})),e1=Object.freeze({counterLabel:"COUNT",keyLabel:""}),pa={...e1},Qt={w:2e3,h:1125,floor:960},Ie={x:1220,y:140,w:740,h:500},Ms={x:760,y:110,w:420,h:850},ns={x:1600,top:728,w:360},Ro={x:ns.x+34,y:ns.top-30,scale:.8},ma={x:1475},Ih={x0:1150,x1:1400},n1={x0:40,x1:700,top:800};function i1(){const n=Li("late-cluster-skyline"),t=s1(n,Ie),e=[];for(let i=0,s=-20;s<1300;i++){const r=n.range(54,74);e.push({x:s+r/2,w:r,h:n.range(46,62),ph:n.range(0,6),hair:n.int(4)}),s+=r*n.range(.82,1)}return{...t,aud:e}}function s1(n,t,e={}){const i=t,s=[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold],r=[];let o=i.x+14;for(;o<i.x+i.w-40;){const p=n.range(34,78),m=n.range(110,330)*(.7+.5*Math.sin((o-i.x)/i.w*Math.PI));r.push({x:o,w:p,h:Math.min(m,i.h-120),c:n.pick(s),spire:n()<.3}),o+=p+n.range(4,18)}const a=[],l=new Map,c=(p,m,M)=>{l.has(p)||l.set(p,new Path2D);const v=l.get(p);v.moveTo(m.x,m.y),v.lineTo(M.x,M.y)},h=i.y+i.h-6,u=new Path2D;for(const p of r){const m=Math.max(2,Math.round(p.w/20)),M=Math.max(3,Math.round(p.h/24)),v=[];for(let C=0;C<M;C++){const S=[];for(let w=0;w<m;w++){const B={x:p.x+(w+.5)*p.w/m+n.range(-2,2),y:h-12-C*(p.h-18)/(M-1)+n.range(-2,2),c:p.c,r:n.range(1.1,2.4),ph:n.range(0,20),on:n()<.82};S.push(B),a.push(B)}v.push(S)}for(let C=0;C<M;C++)for(let S=0;S<m;S++){const w=v[C][S];C+1<M&&c(p.c,w,v[C+1][S]),S+1<m&&n()<.5&&c(p.c,w,v[C][S+1]),C+1<M&&S+1<m&&n()<.3&&c(p.c,w,v[C+1][S+1])}const E=h-p.h-4;u.moveTo(p.x-3,h),u.lineTo(p.x-3,E),u.lineTo(p.x+p.w+3,E),u.lineTo(p.x+p.w+3,h),p.spire&&(u.moveTo(p.x+p.w/2,E),u.lineTo(p.x+p.w/2,E-30),p.beacon={x:p.x+p.w/2,y:E-30}),p.top={x:p.x+p.w/2,y:E}}const f=new Path2D;let d=i.x;for(f.moveTo(d,h);d<i.x+i.w;){const p=n.range(60,190),m=n.range(20,50);f.lineTo(d,h-p),f.lineTo(d+m,h-p),d+=m,f.lineTo(d,h-n.range(30,60))}f.lineTo(i.x+i.w,h);const _=[];for(let p=0;p<9;p++){const m=n.pick(r),M=n.pick(r);m!==M&&_.push({a:m.top,b:M.top,c:n.pick([x.bsky,x.sky,x.magenta]),ph:n.range(0,1),sp:n.range(.15,.35)})}const g=[];for(let p=0;p<(e.stars??70);p++)g.push({x:i.x+n.range(8,i.w-8),y:i.y+n.range(8,i.h*.45),r:n.range(.5,1.4),ph:n.range(0,9)});return{win:{...i},towers:r,nodes:a,edgesByColor:l,outline:u,far:f,links:_,stars:g}}function r1(n){const i=new Path2D;i.moveTo(0,34),i.lineTo(Qt.w,34),i.moveTo(0,64),i.lineTo(Qt.w,64);for(let s=0;s<Qt.w;s+=30)i.moveTo(s,34),i.lineTo(s+15,64),i.lineTo(s+30,34);nt(n,i,x.blueDim,1,{alpha:.5});for(let s=120;s<Qt.w;s+=260){const r=new Path2D;r.moveTo(s-9,68),r.lineTo(s+9,68),r.lineTo(s+12,94),r.lineTo(s-12,94),r.closePath(),nt(n,r,x.blueMid,1.1,{alpha:.7}),Ot(n,s,64,s,68,x.blueMid,1,{alpha:.7})}}function o1(n){const t=new Path2D;for(let e=40;e<Qt.w;e+=160)e>Ms.x-10&&e<Ms.x+Ms.w+10||e>Ie.x-4&&e<Ie.x+Ie.w+4||(t.moveTo(e,90),t.lineTo(e,Qt.floor));nt(n,t,x.blueDim,1,{alpha:.18}),Ot(n,0,690,Ms.x,690,x.blueDim,1,{alpha:.2})}function a1(n){const t=Qt.floor;Ot(n,0,t,Qt.w,t,x.blueMid,1.4,{alpha:.8});const e=new Path2D,i=1e3,s=380;for(let r=-1600;r<=3600;r+=160){const a=i+(r-i)*((Qt.h+200-s)/(t-s))*1;e.moveTo(i+(r-i),t),e.lineTo(a,Qt.h+200)}for(const r of[990,1035,1100])e.moveTo(0,r),e.lineTo(Qt.w,r);nt(n,e,x.blueDim,1,{alpha:.32})}function l1(n,t,e,i={}){var c,h;const{x:s,y:r,w:o,h:a}=t.win,l=i.weight??1;for(const u of t.stars)_e(n,u.x,u.y,u.r*l,x.white,.25+.35*(.5+.5*Math.sin(e*1.3+u.ph)));if(i.moon!==!1){const u=s+o*(((c=i.moon)==null?void 0:c.x)??.82),f=((h=i.moon)==null?void 0:h.y)===void 0?r+70:r+a*i.moon.y,d=new Path2D;d.arc(u,f,26,-Math.PI*.62,Math.PI*.62,!0),d.arc(u-13,f,22,Math.PI*.5,-Math.PI*.5,!1),nt(n,d,x.gold,1.6*l,{hot:!0,alpha:.85})}nt(n,t.far,x.blueDim,1*l,{alpha:.35}),nt(n,t.outline,x.blueDim,1*l,{alpha:.45});for(const[u,f]of t.edgesByColor)nt(n,f,u,.8*l,{alpha:.32});for(const u of t.nodes){if(!u.on)continue;const f=.45+.55*(.5+.5*Math.sin(e*(.7+u.ph%1.3)+u.ph));_e(n,u.x,u.y,u.r*l,u.c,f*.9)}for(const u of t.towers)u.beacon&&_e(n,u.beacon.x,u.beacon.y,2.6*l,x.red,.4+.6*(Math.sin(e*3+u.x)>.6?1:.2));for(const u of t.links){const f=(u.a.x+u.b.x)/2,d=Math.min(u.a.y,u.b.y)-40-Math.abs(u.a.x-u.b.x)*.18,_=new Path2D;_.moveTo(u.a.x,u.a.y),_.quadraticCurveTo(f,d,u.b.x,u.b.y),nt(n,_,u.c,.9*l,{alpha:.28});const g=(e*u.sp+u.ph)%1,p=(1-g)*(1-g)*u.a.x+2*(1-g)*g*f+g*g*u.b.x,m=(1-g)*(1-g)*u.a.y+2*(1-g)*g*d+g*g*u.b.y;_e(n,p,m,2.4*l,u.c,.9)}}function c1(n,t,e){const{x:i,y:s,w:r,h:o}=Ie;l1(n,t,e.wall);const a=new Path2D;a.rect(i,s,r,o);for(let l=1;l<4;l++)a.moveTo(i+r*l/4,s),a.lineTo(i+r*l/4,s+o);a.moveTo(i,s+o*.3),a.lineTo(i+r,s+o*.3),nt(n,a,x.blueMid,1.6,{alpha:.9}),nt(n,Dn(i-10,s-10,r+20,o+20),x.blueDim,1.2,{alpha:.7}),Ot(n,i-22,s+o+12,i+r+22,s+o+12,x.blueMid,1.4)}function h1(n,t,e){const i=e.wall,{x:s,y:r,w:o,h:a}=Ms,l="#ff3d6e",c=16,h=new Path2D;for(let m=0;m<=c;m++){const M=s+o*m/c,v=3*We(i*.3+m*.7,3);h.moveTo(M,r+40);for(let E=r+40;E<=r+a;E+=20){const C=Math.sin(E*.012+m*1.7)*4*(E-r)/a;h.lineTo(M+C+v*((E-r)/a),E)}}nt(n,h,l,1.2,{alpha:.55});const u=new Path2D;for(let m=0;m<c;m++){const M=s+o*(m+.5)/c;u.moveTo(M,r+60),u.lineTo(M+Math.sin(m)*3,r+a-10)}nt(n,u,l,.8,{alpha:.22});const f=new Path2D;f.moveTo(s-20,r),f.lineTo(s+o+20,r);const d=7;for(let m=0;m<d;m++){const M=s-20+(o+40)*m/d,v=s-20+(o+40)*(m+1)/d;f.moveTo(M,r),f.quadraticCurveTo((M+v)/2,r+70,v,r)}Rt(n,f),nt(n,f,l,1.6,{hot:!0});const _=new Path2D;for(let m=0;m<d;m++){const M=s-20+(o+40)*m/d,v=s-20+(o+40)*(m+1)/d;for(let E=1;E<12;E++){const C=E/12,S=M+(v-M)*C,w=r+4*70*C*(1-C)*.5*2;_.moveTo(S,w),_.lineTo(S,w+8)}}nt(n,_,x.gold,1,{alpha:.8});const g=new Path2D;g.ellipse(970,Qt.floor+6,120,16,0,0,Math.PI*2),nt(n,g,x.gold,1.4,{alpha:.6});const p=new Path2D;p.ellipse(970,Qt.floor+6,80,10,0,0,Math.PI*2),nt(n,p,x.gold,1,{alpha:.35})}function u1(n,t,e){const a=e.onAir?1:.18;xe(n,1250,82,120,38,{color:x.onair,radius:6,width:1.6,alpha:.4+.6*a,hot:a>.5}),vt(n,"ON AIR",1250+120/2,108,{size:19,align:"center",color:x.onair,alpha:a,weight:"m",ls:.25}),Ot(n,1250+120/2,64,1250+120/2,82,x.blueDim,1)}function f1(n,t,e){const a=e.laughing,l=e.signText,c=a>0?.55+.45*(Math.sin(e.wall*9)>-.2?1:0):0,h=ie(a*c);xe(n,970-250/2,64,250,46,{color:x.amber,cut:8,width:1.6,alpha:.35+.65*h,hot:h>.5}),vt(n,l,970,96,{size:24,align:"center",color:x.amber,alpha:.15+.85*h,weight:"m",ls:.3}),Ot(n,970-250/2+20,64,970-250/2+20,64,x.blueDim,1),Ot(n,970+250/2-20,64,970+250/2-20,64,x.blueDim,1)}function d1(n,t,e){const{x0:i,x1:s,top:r}=n1,o=new Path2D;o.rect(i,r,s-i,Qt.floor-r),o.moveTo(i+220,r-60),o.lineTo(s-220,r-60),o.lineTo(s-220,r),o.moveTo(i+220,r-60),o.lineTo(i+220,r),Rt(n,o),nt(n,o,x.magenta,1.4,{alpha:.75});const a=e.music?e.music.beat:-1;for(let c=0;c<14;c++){const h=i+24+(s-i-48)*c/13,u=a>=0?(Math.floor(a)+c)%4===0?1:.25:.3+.2*Math.sin(e.wall*1.5+c);_e(n,h,r+22,3,c%2?x.gold:x.magenta,u)}const l=new Path2D;for(let c=r+50;c<Qt.floor;c+=26)l.moveTo(i,c),l.lineTo(s,c);nt(n,l,x.magenta,.8,{alpha:.25})}function p1(n){const t=ma.x,e=Qe(t-80,560,160,230,40);Rt(n,e),nt(n,e,x.violet,1.6,{alpha:.9});const i=new Path2D;for(const[s,r]of[[-40,620],[0,610],[40,620],[-40,680],[0,670],[40,680]])i.moveTo(t+s-3,r),i.lineTo(t+s+3,r);nt(n,i,x.violet,1.2,{alpha:.5})}function m1(n){const{x0:t,x1:e}=Ih,i=Qe(t,610,e-t,180,30);Rt(n,i),nt(n,i,x.cyan,1.5,{alpha:.75});const s=new Path2D;s.moveTo((t+e)/2,625),s.lineTo((t+e)/2,780),nt(n,s,x.cyan,1,{alpha:.35})}function g1(n,t,e){const{x:i,top:s,w:r}=ns,o=Qt.floor,a=new Path2D;a.moveTo(i+20,s-22),a.lineTo(i+r-10,s-22),a.lineTo(i+r,s),a.lineTo(i,s),a.closePath(),Rt(n,a),nt(n,a,x.gold,1.6,{hot:!0});const l=new Path2D;l.moveTo(i,s),l.lineTo(i+r,s),l.lineTo(i+r-14,o),l.lineTo(i+14,o),l.closePath(),Rt(n,l),nt(n,l,x.gold,1.6);const c=new Path2D;c.moveTo(i+30,s+22),c.lineTo(i+r-30,s+22),c.lineTo(i+r-40,o-22),c.lineTo(i+40,o-22),c.closePath(),nt(n,c,x.goldMid,1,{alpha:.55});const h=i+r/2,u=s+120;Fe(n,h,u,46,x.gold,1.4,{alpha:.7}),Fe(n,h,u,40,x.gold,.9,{alpha:.35});const f=[[0,-18],[16,-6],[10,14],[-12,12],[-18,-8],[0,0]],d=new Path2D;for(const[tt,L]of[[0,1],[1,2],[2,3],[3,4],[4,0],[5,0],[5,2],[5,3],[5,1]])d.moveTo(h+f[tt][0],u+f[tt][1]),d.lineTo(h+f[L][0],u+f[L][1]);nt(n,d,x.gold,1,{alpha:.6});for(const[tt,L]of f)_e(n,h+tt,u+L,2.6,x.gold,.9);vt(n,"LC",h,u+74,{size:16,align:"center",color:x.gold,alpha:.6,ls:.4});const _=i+96,g=s-14,p=new Path2D;p.moveTo(_-15,g-40),p.lineTo(_-13,g),p.lineTo(_+13,g),p.lineTo(_+15,g-40),p.closePath(),Rt(n,p),nt(n,p,x.sky,1.5);const m=new Path2D;m.ellipse(_,g-40,15,4,0,0,Math.PI*2),nt(n,m,x.sky,1.2);const M=new Path2D;M.moveTo(_+14,g-32),M.bezierCurveTo(_+30,g-32,_+30,g-10,_+13,g-10),nt(n,M,x.sky,1.4),Or(n,_,g-20,14,x.bsky,{width:1,hot:!1});const v=e.wall;for(let tt=0;tt<2;tt++){const L=new Path2D,N=v*.8+tt*1.7;for(let I=0;I<=12;I++){const V=I/12,D=_-4+tt*8+Math.sin(N*2+V*6)*4*V,O=g-46-V*44;I?L.lineTo(D,O):L.moveTo(D,O)}nt(n,L,x.white,1,{alpha:.3*(.6+.4*Math.sin(N))})}const E=i+r-34,C=s-14,S=new Path2D;S.ellipse(E,C,22,6,0,0,Math.PI*2),Rt(n,S),nt(n,S,x.white,1.3,{alpha:.85});const w=new Path2D;w.moveTo(E,C-4),w.bezierCurveTo(E+2,C-34,E-10,C-52,E-30,C-58),nt(n,w,x.white,1.4,{alpha:.8});const B=new Path2D;B.ellipse(E-40,C-61,13,7.5,-.35,0,Math.PI*2),Rt(n,B),nt(n,B,x.white,1.5,{hot:!0});for(let tt=-2;tt<=2;tt++)Ot(n,E-40+tt*4-2,C-67+tt*1.3,E-40+tt*4+2,C-55+tt*1.3,x.white,.8,{alpha:.5});const y=i+r/2+10,T=s-4,z=new Path2D;if(z.moveTo(y-70,T),z.lineTo(y+70,T),z.lineTo(y+62,T-30),z.lineTo(y-62,T-30),z.closePath(),Rt(n,z),nt(n,z,x.gold,1.4,{hot:!0}),vt(n,e.nameplate??"LARRY NX",y,T-9,{size:15,align:"center",color:x.gold,weight:"m",ls:.22}),(e.setNow??e.set).eKey)return;const Q=new Path2D;Q.moveTo(i+22,s-6),Q.lineTo(i+72,s-6),Q.lineTo(i+68,s-14),Q.lineTo(i+26,s-14),Q.closePath(),nt(n,Q,x.bsky,1.1,{alpha:.8})}function _1(n){const t=ma.x,e=new Path2D;for(const s of[-1,1]){const r=Qe(t+s*90-22,720,44,120,16);Rt(n,r),nt(n,r,x.violet,1.5)}e.moveTo(t-70,790),e.lineTo(t+70,790),e.lineTo(t+76,860),e.lineTo(t-76,860),e.closePath(),Rt(n,e),nt(n,e,x.violet,1.5);const i=new Path2D;for(const s of[-1,1])i.moveTo(t+s*96,840),i.lineTo(t+s*104,Qt.floor);nt(n,i,x.violet,1.4,{alpha:.8})}function v1(n){const{x0:t,x1:e}=Ih,i=new Path2D;i.moveTo(t-10,780),i.lineTo(e+10,780),i.lineTo(e+16,870),i.lineTo(t-16,870),i.closePath(),Rt(n,i),nt(n,i,x.cyan,1.5,{alpha:.85});for(const r of[t-20,e-16]){const o=Qe(r,700,36,150,14);Rt(n,o),nt(n,o,x.cyan,1.4,{alpha:.85})}Ot(n,(t+e)/2,790,(t+e)/2,865,x.cyan,1,{alpha:.4});const s=new Path2D;for(const r of[t,e])s.moveTo(r,870),s.lineTo(r,Qt.floor);nt(n,s,x.cyan,1.3,{alpha:.7})}function M1(n,t,e,i,s,r){var l;const o=s.wall,a=s.music?s.music.pulse:0;if(t==="lectern"){const c=i+150;Qo(n,e,c,{w:130,h:Qt.floor-c,color:x.violet,label:s.lecternLabel??"THE LATE CLUSTER",labelColor:x.gold}),Ot(n,e-20,c-2,e-34,c-40,x.white,1.3,{alpha:.8}),Fe(n,e-36,c-44,5,x.white,1.3,{hot:!0});return}if(t==="stand"){const c=i+160,h=r?((l=s.puppets.get(r))==null?void 0:l.name)??r:"";Qo(n,e,c,{w:150,h:Qt.floor-c,color:x.cyan,label:h,labelColor:x.white,lights:!0,t:o});return}if(t==="sportsdesk"){const c=i+128,h=460,u=new Path2D;u.moveTo(e-h/2,c),u.lineTo(e+h/2,c),u.lineTo(e+h/2-20,Qt.floor),u.lineTo(e-h/2+20,Qt.floor),u.closePath(),Rt(n,u),nt(n,u,x.coral,1.8,{hot:!0}),Ot(n,e-h/2+10,c+30,e+h/2-10,c+30,x.coral,1,{alpha:.6}),vt(n,"SPORTS",e,c+78,{size:40,align:"center",color:x.coral,weight:"m",ls:.3}),vt(n,"THE LATE CLUSTER",e,c+106,{size:14,align:"center",color:x.gold,ls:.4});for(let f=0;f<9;f++)_e(n,e-180+f*45,c+16,3,f%2?x.gold:x.coral,.4+.6*(Math.floor(o*3+f)%3===0?1:.3));return}if(t==="keys"){const c=i+128,h=new Path2D;h.moveTo(e-78,c),h.lineTo(e+78,c),h.lineTo(e+84,c+20),h.lineTo(e-84,c+20),h.closePath(),Rt(n,h),nt(n,h,x.magenta,1.5);const u=new Path2D;for(let d=-10;d<=10;d++)u.moveTo(e+d*7.4,c+6),u.lineTo(e+d*7.8,c+19);nt(n,u,x.white,.8,{alpha:.55});for(let d=0;d<4;d++)_e(n,e-66+d*9,c+3,1.4,[x.green,x.amber,x.red,x.cyan][d],.5+.5*a);const f=new Path2D;f.moveTo(e-50,c+20),f.lineTo(e+44,Qt.floor-160),f.moveTo(e+50,c+20),f.lineTo(e-44,Qt.floor-160),nt(n,f,x.magenta,1.2,{alpha:.8})}else if(t==="bass"){const c=e-14,h=i+150,u=new Path2D;u.moveTo(c-30,h-4),u.bezierCurveTo(c-36,h-30,c-10,h-34,c+2,h-22),u.bezierCurveTo(c+10,h-40,c+30,h-36,c+22,h-18),u.bezierCurveTo(c+40,h-2,c+34,h+30,c+4,h+32),u.bezierCurveTo(c-26,h+34,c-40,h+18,c-30,h-4),u.closePath(),Rt(n,u),nt(n,u,x.cyan,1.6,{hot:!0});const f=new Path2D,d=-.72,_=128,g=Math.cos(d),p=Math.sin(d),m=c+8,M=h-12;f.moveTo(m-p*4,M+g*4),f.lineTo(m+g*_-p*4,M+p*_+g*4),f.lineTo(m+g*(_+22)-p*6,M+p*(_+22)+g*6),f.lineTo(m+g*(_+22)+p*6,M+p*(_+22)-g*6),f.lineTo(m+g*_+p*4,M+p*_-g*4),f.lineTo(m+p*4,M-g*4),Rt(n,f),nt(n,f,x.cyan,1.3);for(let v=-1.5;v<=1.5;v++)Ot(n,c-14-p*v*2,h+14+g*v*2,m+g*_-p*v*2,M+p*_+g*v*2,x.white,.6,{alpha:.35+.45*a});Ot(n,c-6,h+4,c+10,h-10,x.white,1.6,{alpha:.6})}else if(t==="mic"){const c=e-52,h=i+34,u=new Path2D;u.moveTo(c-20,Qt.floor-160),u.lineTo(c-20,h+50),u.lineTo(c-2,h+6),nt(n,u,x.white,1.4,{alpha:.8});const f=new Path2D;f.ellipse(c,h,8,5.5,-1.1,0,Math.PI*2),Rt(n,f),nt(n,f,x.white,1.4,{hot:!0})}else if(t==="drums"){const h=e,u=Qt.floor-160-92+4,f=a;for(const g of[-1,1]){const p=new Path2D;p.ellipse(e+g*70,u-92-10,30,12,0,0,Math.PI*2),p.moveTo(e+g*70-30,u-92-10),p.lineTo(e+g*70-30,u-92+16),p.moveTo(e+g*70+30,u-92-10),p.lineTo(e+g*70+30,u-92+16),Rt(n,p),nt(n,p,x.gold,1.3);const m=new Path2D;m.ellipse(e+g*140,u-92-70+(g>0?f*3:0),40,6,g*.12,0,Math.PI*2),m.moveTo(e+g*140,u-92-64),m.lineTo(e+g*150,Qt.floor-160),nt(n,m,x.gold,1.2,{alpha:.8+.2*f,hot:f>.5})}const d=new Path2D;d.arc(h,u,92,0,Math.PI*2),Rt(n,d),nt(n,d,x.magenta,2,{hot:!0}),Fe(n,h,u,82,x.gold,1.2,{alpha:.7+.3*f}),vt(n,"HY OID",h,u-8,{size:30,align:"center",color:x.gold,weight:"m",ls:.12}),vt(n,"& THE FORMANTS",h,u+22,{size:14,align:"center",color:x.magenta,weight:"m",ls:.12});const _=new Path2D;for(let g=0;g<=40;g++){const p=g/40,m=u+48-14*(Math.exp(-(((p-.25)/.07)**2))+.7*Math.exp(-(((p-.6)/.09)**2))+.4*Math.exp(-(((p-.85)/.05)**2)))*(.8+.4*f);g?_.lineTo(h-54+p*108,m):_.moveTo(h-54,m)}nt(n,_,x.cyan,1.2)}}function y1(n,t,e,i,s,r={}){if(t!=="contraption")return;const o=s.wall,a=e,l=Qt.floor,c=qe.inOutCubic(ie(r.unveil??0)),h=ie(r.run??c);if(c>.02){const u=new Path2D;u.rect(a-70,l-120,140,120),Rt(n,u),nt(n,u,x.lime,1.6);for(const[g,p,m,M]of[[a-32,l-70,26,1],[a+18,l-52,18,-1]]){Fe(n,g,p,m,x.gold,1.4);const v=o*2*h*M;for(let E=0;E<8;E++){const C=v+E/8*Math.PI*2;Ot(n,g+Math.cos(C)*m,p+Math.sin(C)*m,g+Math.cos(C)*(m+6),p+Math.sin(C)*(m+6),x.gold,1.4)}}const f=new Path2D;f.moveTo(a+30,l-120),f.lineTo(a+60,l-190),f.lineTo(a+0,l-190),f.closePath(),nt(n,f,x.cyan,1.4);const d=new Path2D;d.moveTo(a-60,l-120),d.bezierCurveTo(a-90,l-170,a-30,l-200,a-20,l-150),nt(n,d,x.magenta,1.6),Ot(n,a-50,l-120,a-50,l-210,x.white,1.2),Fe(n,a-50,l-218,8,x.amber,1.6,{hot:h>.5&&Math.floor(o*4)%2===0});for(let g=0;g<4;g++)_e(n,a+40,l-100+g*14,3,[x.green,x.amber,x.red,x.cyan][g],h>0?.4+.6*(Math.floor(o*5+g)%4===0?1:.3):.25);const _=o*3*h;Ot(n,a+70,l-60,a+70+Math.cos(_)*22,l-60+Math.sin(_)*22,x.white,1.6)}if(c<.98){const u=c*260,f=c*c*220,d=new Path2D;d.moveTo(a-82+f,l-u),d.bezierCurveTo(a-90+f,l-120-u,a-60+f,l-235-u*1.1,a-10+f,l-230-u),d.bezierCurveTo(a+40+f,l-226-u,a+80+f,l-160-u,a+84+f,l-u);for(let g=4;g>=0;g--)d.lineTo(a-82+g*41+f+(g%2?6:-4)*(1+c*4),l-u-(g%2?10:0)*(1+c*3));d.closePath(),c<.05&&Rt(n,d),nt(n,d,x.white,1.6,{alpha:1-c});const _=new Path2D;for(const g of[-40,0,40])_.moveTo(a+g+f*.9,l-200-u),_.quadraticCurveTo(a+g*1.3+f,l-100-u,a+g*1.4+f,l-u-6);nt(n,_,x.white,.9,{alpha:.4*(1-c)}),c<.05&&vt(n,"?",a,l-110,{size:40,align:"center",color:x.white,alpha:.5})}}function Nh(n,t,e){const i=e.wall;if(t==="circling"){const s=i*.45,r=e.cam??{x:1e3,y:560,zoom:1};if(r.zoom>2.2)return;const o=Math.max(Ie.x,r.x-640/r.zoom),a=Math.min(Ie.x+Ie.w,r.x+640/r.zoom),l=r.y-360/r.zoom,c=a>o?(o+a)/2:Ie.x+Ie.w*.55,h=a>o?Math.max(60,(a-o)*.42):230,u=Math.min(Ie.y+Ie.h-110,Math.max(Ie.y+150,l+(r.zoom<1.3?72:140)/r.zoom)),f=Math.min(70,34/Math.max(.5,r.zoom)*1.6),d=c+Math.cos(s)*h,_=u+Math.sin(s)*f;Es(n,d,_,{scale:.7,flap:i*2.2%1,facing:-Math.sin(s)>=0?1:-1})}else if(t==="perched-desk")Es(n,ns.x+ns.w-92,ns.top-33,{scale:.75,perched:!0,facing:-1});else{const s=Math.max(0,Math.sin(i*1.3))>.97?6:0;Es(n,Ie.x+120,Ie.y+Ie.h+12-22-s,{scale:.85,perched:!0,facing:1})}}function x1(n,t,e){const i=e.setNow??e.set;i.wall!==!1&&o1(n),i.truss!==!1&&r1(n),i.floor!==!1&&a1(n),i.window!==!1&&c1(n,t,e),i.curtain!==!1&&h1(n,t,e),i.onair!==!1&&u1(n,t,e),i.sign!==!1&&f1(n,t,e),i.bandstand!==!1&&d1(n,t,e),i.couch!==!1&&m1(n),i.chair!==!1&&p1(n),i.crow&&i.crow!=="perched-desk"&&Nh(n,i.crow,e)}function S1(n,t,e){const i=e.setNow??e.set;i.couch!==!1&&v1(n),i.chair!==!1&&_1(n),i.desk!==!1&&g1(n,t,e),i.desk!==!1&&i.eKey&&Ah(n,Ro.x,Ro.y,{label:e.keyLabel??pa.keyLabel,scale:Ro.scale,glow:.4+.3*Math.sin(e.wall*3),pressed:typeof i.eKey=="number"?i.eKey:0}),i.crow==="perched-desk"&&Nh(n,i.crow,e)}function b1(n,t,e,i=1){if(i<=0)return;const s=e.laughing,r=e.wall,o=724,a=new Path2D;for(const l of t.aud){const c=s*(5+4*Math.sin(r*11+l.ph))+1.2*Math.sin(r*.8+l.ph),h=l.x,u=o-l.h+6-c,f=l.w*.26;a.moveTo(h-l.w*.5,o+10),a.bezierCurveTo(h-l.w*.5,u+f*2.2,h-l.w*.3,u+f*1.6,h-f*.7,u+f*1.4),a.arc(h,u,f,Math.PI*.72,Math.PI*.28,!1),a.bezierCurveTo(h+l.w*.3,u+f*1.6,h+l.w*.5,u+f*2.2,h+l.w*.5,o+10)}Rt(n,a,"#000",i),nt(n,a,x.blueMid,1.1,{alpha:.6*i})}function E1(n,t){const e=t.laughing;if(e<=.02)return;const i=Math.sin(t.wall*9)>-.2?1:.55,s=190,r=640-s/2,o=18;xe(n,r,o,s,36,{color:x.amber,cut:6,width:1.5,alpha:e*i,hot:!0}),vt(n,t.signText,640,o+26,{size:19,align:"center",color:x.amber,alpha:e*i,weight:"m",ls:.3})}const hr=new Map;function ga(n){let t=hr.get(n);return t||(t=new Path2D(n),hr.size>4e3&&hr.clear(),hr.set(n,t)),t}const P=n=>(Math.round(n*10)/10).toString();function Tt(n,t,e,i,s=1.5,r={}){nt(n,typeof e=="string"?ga(e):e,i,.85*s/t.u,{...r,alpha:(r.alpha??1)*.92})}let ta=!1;function T1(n,t,e="#000",i=1){ta||Rt(n,typeof t=="string"?ga(t):t,e,i)}function Ht(n,t,e,i,s=1.5,r={}){T1(n,e,r.fill??"#000"),Tt(n,t,e,i,s,r)}function He(n,t,e){return`M${P(n+e)} ${P(t)} A${P(e)} ${P(e)} 0 1 0 ${P(n-e)} ${P(t)} A${P(e)} ${P(e)} 0 1 0 ${P(n+e)} ${P(t)}`}function w1(n,t){n.save(),n.translate(t.x+Math.sin(t.sway)*2.5*t.u,t.y),n.rotate(t.sway*.3);const e=1-.18*Math.abs(t.turn);n.scale(t.u*e,t.u*(1+.006*t.breathe))}function fn(n,t,e,i=6){const s=i+2.5,r=(o,a)=>`${P(o)} ${P(a)}`;return[`M${r(-t,-1)}`,`C${r(-t-3.5,.6)} ${r(-n+6,s-4.2)} ${r(-n+1.5,s-1.2)}`,`C${r(-n-1.6,s+.2)} ${r(-n-2.6,s+4)} ${r(-n-2.5,s+9)}`,e>40?`C${r(-n-2.5,24)} ${r(-n-.5,30)} ${r(-n-.6,36)} L${r(-n-1.4,e)} L${r(n+1.4,e)} L${r(n+.6,36)} C${r(n+.5,30)} ${r(n+2.5,24)} ${r(n+2.5,s+9)}`:`L${r(-n-2,e)} L${r(n+2,e)} L${r(n+2.5,s+9)}`,`C${r(n+2.6,s+4)} ${r(n+1.6,s+.2)} ${r(n-1.5,s-1.2)}`,`C${r(n-6,s-4.2)} ${r(t+3.5,.6)} ${r(t,-1)} Z`].join(" ")}function En(n,t,e=6){return`M${P(-n+3.5)} ${P(e+3)} C${P(-n+2.6)} ${P(e+14)} ${P(-n+3)} ${P(t-10)} ${P(-n+3.8)} ${P(t)} M${P(n-3.5)} ${P(e+3)} C${P(n-2.6)} ${P(e+14)} ${P(n-3)} ${P(t-10)} ${P(n-3.8)} ${P(t)}`}function dn(n,t,e,i,s){if(t.floor==null||t.floor<=e+4)return;const r=t.floor,o=`M-15 ${P(e)} L-12.5 ${P(r-3)} L-2.5 ${P(r-3)} L-1 ${P(e+9)} L1 ${P(e+9)} L2.5 ${P(r-3)} L12.5 ${P(r-3)} L15 ${P(e)} Z`;Ht(n,t,o,i,1.4,{alpha:.85}),s&&Tt(n,t,`M-13.9 ${P(e+2)} L-12 ${P(r-4)} M13.9 ${P(e+2)} L12 ${P(r-4)}`,s,1,{alpha:.6});const a=l=>`M${P(l*2)} ${P(r-3)} L${P(l*13.5)} ${P(r-3)} C${P(l*16)} ${P(r-2.5)} ${P(l*17)} ${P(r)} ${P(l*15)} ${P(r)} L${P(l*2)} ${P(r)} Z`;for(const l of[-1,1])Ht(n,t,a(l),x.white,1.3,{alpha:.75})}const bn=(n,t=46)=>n.floor!=null?Math.min(n.bottom,t):n.bottom,Mi=(n,t,e=6)=>`M${P(-e)} -1.5 L${P(n)} ${P(t)} L${P(e)} -1.5 Z`;function hc(n,t,e,i,s){const r=`M${P(e)} ${P(i)} L${P(e-4.6)} ${P(i-2.2)} L${P(e-4.3)} ${P(i+2.4)} Z M${P(e)} ${P(i)} L${P(e+4.6)} ${P(i-2.2)} L${P(e+4.3)} ${P(i+2.4)} Z`;Ht(n,t,r,s,1.5,{hot:!0}),Ht(n,t,`M${P(e-.9)} ${P(i-1.2)} L${P(e+.9)} ${P(i-1.2)} L${P(e+.9)} ${P(i+1.2)} L${P(e-.9)} ${P(i+1.2)} Z`,s,1.2,{hot:!0})}function ur(n,t,e,i){const s=`M-5.4 -2 L${P(e-2.2)} 3 L-6.6 2.6 Z M5.4 -2 L${P(e+2.2)} 3 L6.6 2.6 Z`;Ht(n,t,s,i,1.3)}function Zi(n,t,e,i,s,r,o){const a=l=>{let c;s==="peak"?c=`M${P(l*6.2)} -1.5 L${P(e)} ${P(i)} L${P(l*11.8)} 15 L${P(l*15.6)} 8.2 L${P(l*10.6)} 10.4 L${P(l*8.4)} 4.5 Z`:s==="notch"?c=`M${P(l*6.2)} -1.5 L${P(e)} ${P(i)} L${P(l*11.6)} 14.5 L${P(l*13.2)} 8.6 L${P(l*10.4)} 9.6 L${P(l*9.6)} 7.4 L${P(l*8.2)} 2.5 Z`:c=`M${P(l*6.2)} -1.5 C${P(l*12)} 3 ${P(l*12.5)} ${P(i*.55)} ${P(e)} ${P(i)} C${P(e+l*2)} ${P(i*.6)} ${P(l*7.5)} 6 ${P(l*6.2)} -1.5 Z`,Ht(n,t,c,r,1.5),o&&Tt(n,t,s==="shawl"?`M${P(l*8.5)} 2 C${P(l*10.5)} 6 ${P(l*9)} ${P(i*.6)} ${P(e+l*1.5)} ${P(i-2)}`:`M${P(l*8)} 3 L${P(e+l*1.6)} ${P(i-3)}`,o,.9,{alpha:.5})};a(-1),a(1)}function A1(n,t,e,i,s,r){Tt(n,t,`M${P(e-4)} ${P(i)} L${P(e+4)} ${P(i-.4)}`,r,1.3),Ht(n,t,`M${P(e-3.2)} ${P(i-.2)} L${P(e-2)} ${P(i-3.2)} L${P(e-.6)} ${P(i-1)} L${P(e+.8)} ${P(i-3.8)} L${P(e+2.2)} ${P(i-1.2)} L${P(e+3.2)} ${P(i-2.9)} L${P(e+3.4)} ${P(i-.4)} Z`,s,1.2,{hot:!0})}const Cr={tux:{back(n,t,e){const i=bn(t);dn(n,t,i-2,e.color,e.color),Ht(n,t,fn(18,6.2,i),e.color,1.8,{hot:!1}),Tt(n,t,En(18,i),e.color,1,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,Mi(i,s+2,6.4),e.shirt??x.white,1.2,{alpha:.8}),Tt(n,t,`M${P(i-2.2)} 6 L${P(i-1.3)} ${P(s-3)} M${P(i+2.2)} 6 L${P(i+1.3)} ${P(s-3)}`,e.shirt??x.white,.8,{alpha:.35}),Zi(n,t,i,s+2,"peak",e.color,e.facing??ln(e.color,"#ffffff",.4)),ur(n,t,i*.4,e.shirt??x.white),hc(n,t,i*.4,2.6,e.tie??x.amber);for(const r of[9,15.5,22]){const o=i*(.4+.6*r/s);Rt(n,ga(He(o,r,.75))),Tt(n,t,He(o,r,.7),e.tie??x.amber,1.1,{hot:!0})}Tt(n,t,He(i,s+4.5,.9),e.color,1.2),A1(n,t,12.5+i*.5,17,e.square??x.pink,e.color)}},band:{back(n,t,e){const i=bn(t);dn(n,t,i-2,ln(e.color,"#000",.4)),Ht(n,t,fn(17.5,6,i),e.color,1.7),Tt(n,t,En(17.5,i),e.trim??x.gold,1,{alpha:.6}),Tt(n,t,"M-9 1.2 C-12 2.6 -14 4.5 -16.5 7.5 M9 1.2 C12 2.6 14 4.5 16.5 7.5",e.trim??x.gold,.9,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=28;Ht(n,t,Mi(i,s+2,6.2),x.blueDim,1,{alpha:.8}),Zi(n,t,i,s+2,"shawl",e.trim??x.gold,e.color),hc(n,t,i*.4,2.4,e.trim??x.gold);for(const o of[s+4,s+9])Tt(n,t,He(i,o,.8),e.trim??x.gold,1.1);const r=12+i*.5;Tt(n,t,`M${P(r-4)} 15 L${P(r+4)} 14.6`,e.trim??x.gold,1.2),n.save(),vt(n,e.monogram??"F",r,12.8,{size:5,align:"center",color:e.trim??x.gold,weight:"m",ls:0}),n.restore()}},announcer:{back(n,t,e){const i=bn(t);dn(n,t,i-2,e.color),Ht(n,t,fn(17,6,i),e.color,1.6),Tt(n,t,En(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=26;Ht(n,t,Mi(i,s+2,6.2),e.trim??x.white,1.1,{alpha:.75}),Ht(n,t,`M${P(i*.4-1.4)} 1.5 L${P(i*.4+1.4)} 1.5 L${P(i*.4+.9)} 4 L${P(i*.7+2)} ${P(s-2)} L${P(i*.7)} ${P(s+1)} L${P(i*.7-2)} ${P(s-2)} L${P(i*.4-.9)} 4 Z`,x.violet,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),ur(n,t,i*.4,e.trim??x.white);const r=-10.5+i*.4;Ht(n,t,`M${P(r-.8)} 9 L${P(r+.8)} 9 L${P(r+.8)} 11.6 L${P(r-.8)} 11.6 Z`,x.white,1),Tt(n,t,`M${P(r)} 11.6 C${P(r+2)} 16 ${P(r-3)} 20 ${P(r-2)} 30`,x.blueMid,.7,{alpha:.5})}},suit:{back(n,t,e){const i=bn(t);dn(n,t,i-2,e.color),Ht(n,t,fn(17.5,6,i),e.color,1.6),Tt(n,t,En(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=25;Ht(n,t,Mi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75});const r=e.tie??x.coral;Ht(n,t,`M${P(i*.4-1.4)} 1.5 L${P(i*.4+1.4)} 1.5 L${P(i*.4+.9)} 4 L${P(i*.7+2.2)} ${P(s+4)} L${P(i*.7)} ${P(s+7)} L${P(i*.7-2.2)} ${P(s+4)} L${P(i*.4-.9)} 4 Z`,r,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),ur(n,t,i*.4,e.shirt??x.white),Tt(n,t,He(i,s+6,.9),e.color,1.1)}},hoodie:{back(n,t,e){const i=bn(t,50);dn(n,t,i-3,x.blueDim),Ht(n,t,"M-10 1 C-14 -6 -10 -11 0 -11.5 C10 -11 14 -6 10 1 Z",e.color,1.5),Tt(n,t,"M-7.5 -1 C-9 -6 -6 -8.5 0 -8.8 C6 -8.5 9 -6 7.5 -1",e.color,.9,{alpha:.5}),Ht(n,t,fn(18,7,i,7.5),e.color,1.7),Tt(n,t,En(18,i,7.5),e.color,1,{alpha:.55}),t.floor!=null&&Tt(n,t,`M-21 ${P(i-4)} L21 ${P(i-4)}`,e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;Ht(n,t,"M-7.2 -1.5 C-6 4 6 4 7.2 -1.5 C9 3 6 6.5 0 6.5 C-6 6.5 -9 3 -7.2 -1.5 Z",e.color,1.5);const s=Math.sin(t.t*1.7)*.6;for(const r of[-1,1]){const o=i*.5+r*2.6;Tt(n,t,`M${P(o)} 5 C${P(o+s)} 10 ${P(o-s)} 15 ${P(o+r*.5)} 19`,e.trim??x.white,1,{alpha:.85}),Tt(n,t,`M${P(o+r*.5)} 19 L${P(o+r*.5)} 21`,e.trim??x.white,2)}if(t.bottom>32&&Tt(n,t,`M${P(i-11)} 44 L${P(i-8)} 32 L${P(i+8)} 32 L${P(i+11)} 44`,e.color,1.2,{alpha:.7}),e.logo!==!1){const r=i+8,o=14;Tt(n,t,`M${P(r)} ${P(o)} C${P(r-1)} ${P(o-2)} ${P(r-3)} ${P(o-3)} ${P(r-3)} ${P(o-1.5)} C${P(r-3)} ${P(o)} ${P(r-1.5)} ${P(o+.5)} ${P(r)} ${P(o)} C${P(r+1)} ${P(o-2)} ${P(r+3)} ${P(o-3)} ${P(r+3)} ${P(o-1.5)} C${P(r+3)} ${P(o)} ${P(r+1.5)} ${P(o+.5)} ${P(r)} ${P(o)}`,e.trim??x.bsky,1,{hot:!0})}}},cardigan:{back(n,t,e){const i=bn(t,48);dn(n,t,i-2,x.blueDim),Ht(n,t,fn(17,6,i,7),e.color,1.6),Tt(n,t,En(17,i,7),e.color,1,{alpha:.5});for(let s=-16;s<=16;s+=4)Tt(n,t,`M${s} ${P(i-5)} L${s} ${P(i)}`,e.color,.7,{alpha:.3})},front(n,t,e){const i=t.turn*4.5,s=bn(t,48),r=24;Ht(n,t,Mi(i,r,6.4),e.shirt??x.sky,1,{alpha:.7}),Ht(n,t,`M-6.4 -1.5 L${P(i-1.6)} ${P(r)} L${P(i-1.6)} ${P(s)} L-14 ${P(s)} L-12 4 Z M6.4 -1.5 L${P(i+1.6)} ${P(r)} L${P(i+1.6)} ${P(s)} L14 ${P(s)} L12 4 Z`,e.color,1.4),ur(n,t,i*.4,e.shirt??x.sky);for(let o=r+3;o<Math.min(s,60);o+=7)Tt(n,t,He(i,o,.8),e.trim??x.white,1.1)}},labcoat:{back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,70):t.bottom;dn(n,t,60,x.blueDim),Ht(n,t,fn(18,6.2,i),e.color??x.white,1.6),Tt(n,t,En(18,i),e.color??x.white,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,Mi(i,s,6.2),e.shirt??x.sky,1,{alpha:.6}),Tt(n,t,`M${P(i*.4)} 3 L${P(i*.7)} ${P(s-2)}`,e.tie??x.green,2.2),Zi(n,t,i,s+2,"notch",e.color??x.white),Tt(n,t,`M${P(i)} ${P(s+2)} L${P(i)} ${P(t.floor!=null?Math.min(t.bottom,70):t.bottom)}`,e.color??x.white,1.2);const r=12+i*.5;Tt(n,t,`M${P(r-4)} 18 L${P(r+4)} 18`,e.color??x.white,1.2),[x.coral,x.bsky,x.green].forEach((a,l)=>Tt(n,t,`M${P(r-2.5+l*2)} 18 L${P(r-2.5+l*2)} ${P(14.5+l%2)}`,a,1.4,{hot:!0}));const o=-12+i*.5;Ht(n,t,`M${P(o-3.5)} 16 L${P(o+3.5)} 16 L${P(o+3.5)} 20.5 L${P(o-3.5)} 20.5 Z`,e.trim??x.cyan,1),Tt(n,t,`M${P(o-2.3)} 17.6 L${P(o+2.3)} 17.6 M${P(o-2.3)} 19 L${P(o+1)} 19`,e.trim??x.cyan,.7,{alpha:.7})}},turtleneck:{back(n,t,e){const i=bn(t,48);dn(n,t,i-2,x.blueDim),Ht(n,t,fn(16.5,7,i,7.5),e.color,1.6),Tt(n,t,En(16.5,i,7.5),e.color,1,{alpha:.45})},front(n,t,e){Ht(n,t,"M-6.8 -7 C-3 -6 3 -6 6.8 -7 L7.6 3 C3 4.5 -3 4.5 -7.6 3 Z",e.color,1.5);for(const i of[-4.5,-2,.5])Tt(n,t,`M-7 ${i} C-3 ${P(i+1.2)} 3 ${P(i+1.2)} 7 ${i}`,e.color,.9,{alpha:.55});e.pendant&&(Tt(n,t,"M-4 4 C-2 14 2 14 4 4",e.trim??x.gold,.8,{alpha:.7}),Tt(n,t,He(0,13.6,1.1),e.trim??x.gold,1.2,{hot:!0}))}},tee:{back(n,t,e){const i=bn(t,46);dn(n,t,i-2,x.blueDim),Ht(n,t,fn(17,7,i,7.5),e.color,1.6),Tt(n,t,"M-19 22 L-15 21 M19 22 L15 21",e.color,1,{alpha:.6})},front(n,t,e){Tt(n,t,"M-7.2 -1.2 C-5 4 5 4 7.2 -1.2",e.color,1.5);const i=t.turn*4;if(!e.print||e.print==="butterfly"){const s=i,r=16;Tt(n,t,`M${s} ${r} C${s-2} ${r-4} ${s-6} ${r-6} ${s-6} ${r-3} C${s-6} ${r} ${s-3} ${r+1} ${s} ${r} C${s+2} ${r-4} ${s+6} ${r-6} ${s+6} ${r-3} C${s+6} ${r} ${s+3} ${r+1} ${s} ${r} M${s} ${r} C${s-3} ${r+2} ${s-4} ${r+5} ${s-1.5} ${r+4.5} M${s} ${r} C${s+3} ${r+2} ${s+4} ${r+5} ${s+1.5} ${r+4.5}`,e.trim??x.bsky,1.4,{hot:!0})}else vt(n,String(e.print).toUpperCase(),i,18,{size:4.2,align:"center",color:e.trim??x.white,weight:"m"})}},terminal:{back(n,t,e){const i=Math.min(t.bottom,52),s=e.color??x.green;Ht(n,t,`M-22 4 L22 4 L24 8 L24 ${P(i)} L-24 ${P(i)} L-24 8 Z`,s,1.8),Tt(n,t,"M-20 7 L20 7",s,.8,{alpha:.4});for(let r=10;r<16;r+=2)Tt(n,t,`M-21 ${r} L-15 ${r} M15 ${r} L21 ${r}`,s,.7,{alpha:.45});if(t.floor!=null&&t.floor>i+4){Ht(n,t,`M-6 ${P(i)} L6 ${P(i)} L5 ${P(t.floor-6)} L-5 ${P(t.floor-6)} Z`,s,1.2),Ht(n,t,`M-16 ${P(t.floor-6)} L16 ${P(t.floor-6)} L16 ${P(t.floor-3)} L-16 ${P(t.floor-3)} Z`,s,1.2);for(const r of[-12,0,12])Tt(n,t,He(r,t.floor-1.6,1.6),s,1)}},front(n,t,e){const i=e.color??x.green;Ht(n,t,"M-4.2 -6 L4.2 -6 L4.6 4 L-4.6 4 Z",i,1.2);for(let f=-4.5;f<4;f+=1.6)Tt(n,t,`M-4.4 ${P(f)} L4.4 ${P(f)}`,i,.8,{alpha:.6});const s=-15+t.turn*3,r=12,o=30,a=20;Ht(n,t,`M${s} ${r} L${s+o} ${r} L${s+o} ${r+a} L${s} ${r+a} Z`,i,1.4,{hot:!0});const l=e.text??["> ingest firehose","> rank: simcluster",'> reply: "great point"',"> ok"],c=t.t,h=Math.floor(c*1.4);n.save(),n.beginPath(),n.rect(s+.5,r+.5,o-1,a-1),n.clip();for(let f=0;f<4;f++){const d=l[(h+f)%l.length];vt(n,d.toUpperCase(),s+1.6,r+4.6+f*4.4,{size:2.9,color:i,ls:.04,alpha:f===3?1:.6})}Math.floor(c*3)%2===0&&Tt(n,t,`M${s+2} ${r+a-1.6} L${s+4} ${r+a-1.6}`,i,1.8),n.restore(),[x.green,x.amber,x.red].forEach((f,d)=>{const _=d===0?.4+.6*(t.speaking??0):d===1?Math.floor(c*2+d)%3===0?1:.25:.3;Tt(n,t,He(15+d*3,36,.8),f,1.4,{alpha:_,hot:_>.6})}),vt(n,(e.model??"AGENT-7").toUpperCase(),-20,37.2,{size:2.8,color:i,alpha:.7,ls:.15})}}};Cr.blazer={back(n,t,e){const i=bn(t);dn(n,t,i-2,ln(e.color,"#000",.5)),Ht(n,t,fn(17,6,i),e.color,1.6),Tt(n,t,En(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=24;Ht(n,t,Mi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75}),Zi(n,t,i,s+2,"notch",e.color,e.trim),Ht(n,t,`M-5.6 -2 L${P(i-1.4)} 6 L-8 3.6 Z M5.6 -2 L${P(i+1.4)} 6 L8 3.6 Z`,e.shirt??x.white,1.2);for(const r of[s+4,s+10])Tt(n,t,He(i,r,.8),e.trim??e.color,1.1);if(e.crest){const r=-12+i*.5;Tt(n,t,`M${P(r-3)} 13 L${P(r+3)} 13 L${P(r+3)} 17 L${P(r)} 19.5 L${P(r-3)} 17 Z`,e.trim??x.gold,1.2,{hot:!0})}}};Cr.featherCoat={back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,62):t.bottom;dn(n,t,56,x.blueDim),Ht(n,t,fn(17.5,6.5,i),e.color,1.6),Tt(n,t,En(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;Tt(n,t,`M${P(i)} 6 L${P(i)} ${P(t.floor!=null?Math.min(t.bottom,62):t.bottom)}`,e.color,1.2);for(const r of[12,20,28])Tt(n,t,He(i-2.5,r,.8),e.trim??x.violet,1.1);let s="";for(let r=-6;r<=6;r++){const o=r*1.9,a=1.2-Math.abs(r)*.25,l=o*1.45+(r<0?-1:1)*.8,c=a+6.2-Math.abs(r)*.15;s+=`M${P(o-1.1)} ${P(a)} Q${P(o*1.25-1)} ${P(a+3.5)} ${P(l)} ${P(c)} Q${P(o*1.25+1)} ${P(a+3)} ${P(o+1.1)} ${P(a)} Z `}Ht(n,t,s,e.trim??x.violet,1.1)}};function R1(n,t,e){const i=e.holds;if(i){for(const s of[].concat(i))if(s==="clipboard"){Ht(n,t,"M-13 26 L1 26 L1 44 L-13 44 Z",x.amber,1.3),Ht(n,t,`M${-6-2.5} ${26-1.2} L${-6+2.5} ${26-1.2} L${-6+2.5} ${26+1.2} L${-6-2.5} ${26+1.2} Z`,x.white,1),vt(n,(e.clipText??"LIST OF").toUpperCase(),-6,26+5.2,{size:2.2,align:"center",color:x.white,weight:"m",ls:.05});for(let a=0;a<4;a++)Tt(n,t,`M-11 ${34+a*2.4} L${-6+(a%2?3:5)} ${34+a*2.4}`,x.white,.7,{alpha:.55});Tt(n,t,He(-6+7.5,38,1.6),e.skin??x.white,1)}else if(s==="clicker")Ht(n,t,`M${15-1.6} 32 L${15+1.6} 32 L${15+1.6} 39 L${15-1.6} 39 Z`,x.white,1.2),Tt(n,t,He(15,32+1.8,.6),x.red,1.3,{hot:Math.floor(t.t*2)%3===0}),Tt(n,t,He(15,36,2.2),e.skin??x.white,1,{alpha:.7});else if(s==="popper")Ht(n,t,"M12 36 L16 36 L19 24 L9 24 Z",x.magenta,1.3,{hot:!0}),Tt(n,t,`M9 24 L19 24 M11 29 L${14+3.8} 29`,x.gold,1),Tt(n,t,"M14 36 L14 39",x.white,1);else if(s==="headset"){const r=t.turn>=0?1:-1;Tt(n,t,`M${P(r*7)} -9 C${P(r*8)} -5 ${P(r*6)} -3 ${P(r*2.5)} -4.5`,x.white,1.1),Tt(n,t,He(r*2.3,-4.6,.9),x.white,1.3,{hot:!0})}}}function uc(n,t,e,i){const r=(Cr[i==null?void 0:i.kind]??Cr.hoodie)[t];if(r){w1(n,e),ta=!!e.noFill;try{r(n,e,i??{}),t==="front"&&R1(n,e,i??{})}finally{ta=!1,n.restore()}}}const Pr={size:25,y:676,maxW:1e3},ys={size:20,h:44,bottom:684},C1=.5,P1=3;function L1(n){if(n==null||n==="")return null;const t=Number(n);return Number.isFinite(t)&&t>=C1&&t<=P1?t:null}function D1(n=1){return Math.min(Pr.maxW,1256-56*n)}function U1(n,t,e){const i=[];let s=[],r=0;return n.forEach((o,a)=>{s.length&&r+t+o>e&&(i.push(s),s=[],r=0),s.push(a),r+=(s.length>1?t:0)+o}),s.length&&i.push(s),i}function I1(n,t,e){let i=n.findIndex(s=>s.includes(t));return i<0&&(i=e?n.length-1:0),Math.max(0,Math.min(n.length-2,i-i%2))}function N1(n,t,e,i=0,s=1){const r=Pr.size*s,o=r*1.32,a=Math.max(t,e)+56*s,l=n*o+40*s,c=640-a/2,h=Math.max(4,Pr.y-l+30-i);return{size:r,lh:o,bx:c,by:h,bw:a,bh:l,tag:{x:c+18*s,y:h-9*s,w:e+20*s,h:18*s,tx:c+28*s,ty:h+5*s,size:14*s},row:u=>h+30*s+u*o+r*.55,underline:{dy:7*s,width:2*s},frame:{cut:8*s,width:1.2*s}}}function F1(n,t=1){const e=n+50*t,i=ys.h*t;return{x:640-e/2,y:ys.bottom-i,w:e,h:i,ty:ys.bottom-15*t,size:ys.size*t,cut:8*t,width:1.2*t}}const _a=4;function Fh(n,t,e=0){return n.x<t.x+t.w+e&&n.x+n.w>t.x-e&&n.y<t.y+t.h+e&&n.y+n.h>t.y-e}function O1(n,t=1){return{x:n.bx,y:n.by-9*t,w:n.bw,h:n.bh+9*t}}function z1(n,t=0){return{x:n.x,y:n.y-t,w:n.w,h:n.h}}function Oh(n,t=.05){if(!(n>1))return[n];const e=[];for(let i=0;;i++){const s=Math.round((1+i*t)*1e6)/1e6;if(s>=n-1e-9)break;e.push(s)}return e.push(n),e}function ea(n,t){for(let e=n.length-1;e>=0;e--)if(t(n[e]))return n[e];return n[0]}function Co(n,t,e=_a){return!t.some(i=>Fh(n,i,e))}function B1(n,t,e,i=_a,s=1){if(!e)return n;const r={x:t.x,y:n,w:t.w,h:t.h};if(!Fh(r,e))return n;const o=Math.min(n,e.y-i-t.h),a=Math.min(1,Math.max(0,s/.5));return a===1?o:n+(o-n)*a}const Po=n=>`${n.who??""}|${n.kind??"say"}|${n.text}`;function k1(n,t){const e=new Map;for(const[i,s]of t)e.set(i,ea(n,r=>s.every(o=>o.has(r))));return e}const fr=(()=>{const n=Li("emblem"),t=[];for(let i=0;i<9;i++){const s=i/9*Math.PI*2+n.range(-.2,.2),r=i===0?0:n.range(.45,.95);t.push([Math.cos(s)*r,Math.sin(s)*r])}const e=[];for(let i=1;i<9;i++)e.push([0,i]),e.push([i,i===8?1:i+1]);return e.push([2,6],[3,7]),{nodes:t,edges:e}})();function H1(n,t,e,i,s=0,r=x.gold,o={}){Fe(n,t,e,i,r,1.8,{hot:!0,alpha:o.alpha}),Fe(n,t,e,i*1.12,r,.9,{alpha:.4*(o.alpha??1)});const a=new Path2D;for(const[l,c]of fr.edges){const h=fr.nodes[l],u=fr.nodes[c];a.moveTo(t+h[0]*i*.82,e+h[1]*i*.82),a.lineTo(t+u[0]*i*.82,e+u[1]*i*.82)}nt(n,a,r,1,{alpha:.55*(o.alpha??1)}),fr.nodes.forEach(([l,c],h)=>_e(n,t+l*i*.82,e+c*i*.82,i*(h===0?.09:.06),h%3===0?x.sky:r,(.6+.4*Math.sin(s*2+h*1.7))*(o.alpha??1)))}function zh(n,t,e,i=1,s={}){const r=s.t??0,o=s.alpha??1;if(o<=0)return;const a=104*i,l=ae(n,"CLUSTER",{size:a,weight:"m",ls:.06});s.align==="center"&&(t-=l/2),n.save(),n.globalAlpha=o,_r(n,"THE LATE",t+4*i,e-a*.92,{size:34*i,color:x.sky,ls:.62,weight:"m",alpha:o,glow:.5}),H1(n,t+l-44*i,e-a*1.06,30*i,r,x.gold,{alpha:o}),_r(n,"CLUSTER",t,e,{size:a,weight:"m",color:x.gold,ls:.06,alpha:o,glow:.9});const c=l*ie(s.sweep??1);Ot(n,t,e+16*i,t+c,e+16*i,x.gold,2*i,{hot:!0,alpha:o}),Ot(n,t,e+24*i,t+c*.7,e+24*i,x.goldMid,1*i,{alpha:.6*o}),s.sub!==!1&&(n.save(),n.translate(t+l-4*i,e+66*i),n.transform(1,0,-.22,1,0,0),_r(n,"with Larry Nx",0,0,{size:40*i,color:x.white,align:"right",ls:.06,alpha:o,glow:.4}),n.restore()),n.restore()}function G1(n,t,e,i,s=520){const r=qe.outCubic(ie(e))*(1-qe.inCubic(ie(i)));if(r<=.001)return;const o=t.color??x.sky,a=String(t.name??"").toUpperCase(),l=String(t.title??"").toUpperCase(),c=t.handle??"",h=ae(n,a,{size:34,weight:"m",ls:.1}),u=ae(n,l+(c?"   "+c:""),{size:15,ls:.18}),f=Math.max(h+(t.parody?ae(n,"PUPPET · PARODY",{size:11,ls:.22})+40:0),u)+120,d=56-(1-r)*(f+80);if(xe(n,d,s,f,88,{color:o,cut:12,width:1.6,alpha:.95}),Ot(n,d+14,s+14,d+14,s+74,o,4,{hot:!0}),Or(n,d+f-34,s+30,26,o,{width:1.3}),vt(n,a,d+34,s+44,{size:34,weight:"m",color:x.white,ls:.1}),vt(n,l,d+36,s+72,{size:15,color:o,ls:.18}),t.parody){const _=d+34+h+18,g=ae(n,"PUPPET · PARODY",{size:11,ls:.22})+16;xe(n,_,s+23,g,22,{color:x.amber,cut:4,width:1.1}),vt(n,"PUPPET · PARODY",_+8,s+38,{size:11,color:x.amber,ls:.22})}c&&vt(n,c,d+36+ae(n,l+"   ",{size:15,ls:.18}),s+72,{size:15,color:ln(o,"#ffffff",.4),ls:.06})}function Lo(n,t,e=0,i=1,s=null){var E;if(!t||t.alpha<=.01)return null;const r=(E=t.words)!=null&&E.length?t.words.map(C=>C[2]):String(t.text).split(/\s+/),o={size:Pr.size*i,ls:.06};let a=s==null?void 0:s.get(i);a||(a={space:ae(n," ",o),tw:r.map(C=>ae(n,C,o))},s==null||s.set(i,a));const{space:l,tw:c}=a,h=U1(c,l,D1(i)).map(C=>C.map(S=>({tok:r[S],i:S,w:c[S]}))),u=t.word<0?0:t.word,f=I1(h.map(C=>C.map(S=>S.i)),u,t.done),d=h.slice(f,f+2),_=d.map(C=>C.reduce((S,w,B)=>S+w.w+(B?l:0),0)),g=Math.max(..._),p=String(t.name??"").toUpperCase(),m={size:14*i,weight:"m",ls:.2},M=p?ae(n,p,m):0,v=N1(d.length,g,M,e,i);return{L:v,area:O1(v,i),shown:d,widths:_,space:l,o,tagO:m,name:p,wi:u,s:i}}function V1(n,t,e){const i=t.alpha,{L:s,shown:r,widths:o,space:a,o:l,tagO:c,name:h,wi:u}=e,{bx:f,by:d,bw:_,bh:g}=s;xe(n,f,d,_,g,{color:t.color??x.blue,cut:s.frame.cut,width:s.frame.width,alpha:.6*i,fillAlpha:.92*i}),h&&(Rt(n,Dn(s.tag.x,s.tag.y,s.tag.w,s.tag.h),"#000",i),vt(n,h,s.tag.tx,s.tag.ty,{...c,color:t.color??x.blue,alpha:i})),r.forEach((p,m)=>{let M=640-o[m]/2;const v=s.row(m);for(const E of p){const C=t.words?E.i<u||E.i===u&&t.word>=0:!0,S=t.words&&E.i===u&&t.word>=0&&!t.done,w=S?t.color??x.amber:x.white;vt(n,E.tok,M,v,{...l,color:w,alpha:i*(C?1:.5),weight:S?"m":"l"}),S&&Ot(n,M,v+s.underline.dy,M+E.w,v+s.underline.dy,w,s.underline.width,{hot:!0,alpha:i}),M+=E.w+a}})}function fc(n,t,e,i=0,s=1){if(e<=.02)return null;const r=`[ ${t} ]`,o={size:ys.size*s,ls:.3},a=F1(ae(n,r,o),s);return{B:a,area:z1(a,i),str:r,o}}function W1(n,t,e,i=0){const{B:s,str:r,o}=t;n.save(),n.translate(0,-i),xe(n,s.x,s.y,s.w,s.h,{color:x.amber,cut:s.cut,width:s.width,alpha:.6*e,fillAlpha:.75*e}),vt(n,r,640,s.ty,{...o,align:"center",color:x.amber,alpha:e}),n.restore()}function $1(n,t){const e=String(t.name??"").toUpperCase(),i=String(t.title??"").toUpperCase(),s=t.handle??"",r=ae(n,e,{size:34,weight:"m",ls:.1}),o=ae(n,i+(s?"   "+s:""),{size:15,ls:.18});return{x:56,w:Math.max(r+(t.parody?ae(n,"PUPPET · PARODY",{size:11,ls:.22})+40:0),o)+120,h:88}}function X1(n,t,e){const r=t.age>=0&&t.age<.6?Math.sin(Math.PI*Math.min(1,t.age/.6)):0,o=t.age>=0&&t.age<.9?1-t.age/.9:0,a=String(t.label??pa.counterLabel),l=ae(n,a,{size:12,ls:.24}),c=l+70;xe(n,26,24,c,34,{color:o>0?ln(x.lime,"#ffffff",o*.5):x.lime,cut:6,width:1.2+o*1.4,alpha:.75+.25*o,hot:o>.3,fillAlpha:.8}),vt(n,a,38,46,{size:12,color:x.lime,ls:.24,alpha:.9});const h=38+l+30;n.save(),n.translate(h,41),n.scale(1+.6*r,1+.6*r),vt(n,String(t.n),0,8,{size:22,align:"center",color:o>.2?x.white:x.lime,weight:"m",ls:0}),n.restore(),t.age>=0&&t.age<1.5&&Th(n,h,38,t.age,{seed:t.seed,count:18,spread:.55})}function q1(n,t,e){const i=String(t),s=ae(n,i,{size:13,ls:.12})+36;xe(n,640-s/2,686,s,26,{color:x.blueMid,cut:5,width:1,alpha:.6*e,fillAlpha:.8*e}),vt(n,i,640,704,{size:13,align:"center",color:x.white,ls:.12,alpha:.85*e})}const Tn=(n,t,e={})=>({color:n,head:Eh(e.headColor??n,e.headOver),costume:t,scale:1,...e}),is={larry:Tn("#ffc861",{kind:"tux",color:"#ffd27a",shirt:"#fff3d6",tie:"#ffb340",square:"#ff73cf"},{headOver:{blueMid:"#e4ab50",blueDim:"#a3762f",frame:"#4a3514"}}),sibyl:Tn("#c9d8ff",{kind:"announcer",color:"#9fb7ff",trim:"#eef6f8"}),hy:Tn("#ff73cf",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),al:Tn("#58f0e8",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),dee:Tn("#b6ff5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),pete:Tn("#ff9a5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),eppy:Tn("#ff7a2e",{kind:"blazer",color:"#ff7a2e",trim:"#ffc861",crest:!0,holds:"headset"})},dc=["#58f0e8","#a98bff","#b6ff5c","#ff7a5c","#ff5fd2","#7cc4ff","#5be381","#f08cff"];function Lr(n){if(is[n])return is[n];const t=Fo(n),e=dc[t%dc.length],i=Tn(e,{kind:"hoodie",color:e});return is[n]=i,i}function Bh(n,t){const e=t.color??Lr(n).color;return is[n]={...Tn(e,{kind:"hoodie",color:e},{headColor:t.headColor,headOver:t.headOver}),...t,head:t.head??Eh(t.headColor??e,t.headOver)},is[n]}const ii={larry:{name:"Larry Nx",title:"Your host",body:{female:0,child:0},f0:104,rate:1,accent:.16,source:{breathiness:.12,tension:.5},pan:.12},sibyl:{name:"Sibyl Ant",title:"Announcer",body:{female:1,child:0},f0:196,rate:1.04,accent:.2,source:{breathiness:.2},pan:-.3},hy:{name:"Hy Oid",title:"Bandleader, The Formants",body:{female:.35,child:0},f0:135,rate:.95,accent:.2,source:{breathiness:.3,tension:.42,brightness:.12},pan:-.5},al:{name:"Al Veolar",title:"Bass, The Formants",body:{female:0,child:0},f0:84,rate:.95,accent:.14,source:{tension:.45,fry:.2},pan:-.7},dee:{name:"Dee Phthong",title:"Alto, The Formants",body:{female:.9,child:.1},f0:155,rate:1,accent:.18,source:{breathiness:.18,tension:.45,brightness:.25},pan:-.4},pete:{name:"Plosive Pete",title:"Percussion, The Formants",body:{female:.65,child:.4},f0:115,rate:1.05,accent:.18,source:{tension:.55,brightness:.4},pan:-.6},eppy:{name:"Eppy Glottis",title:"Sports desk",body:{female:.15,child:.2},f0:165,rate:1.16,accent:.36,source:{tension:.68,brightness:.55},pan:.25}},Y1=1280,pc=720,j1=1100;class Z1{constructor(t,e){this.canvas=t,this.wrap=e,this.ctx=t.getContext("2d",{alpha:!1}),this.gl=new E_,this.glow=new ph(2.2,.8,4),this.S=i1(),this.maxDpr=Math.min(2,window.devicePixelRatio||1),this.k=1,this.captionScale=1,this.glowOn=!0,this.stats={ms:0,frames:0,heads:0,quality:0},this._slow=0,this._fast=0,this.resize(),new ResizeObserver(()=>this.resize()).observe(e)}resize(){const t=this.wrap.getBoundingClientRect();let e=t.width,i=t.width*9/16;i>t.height&&(i=t.height,e=i*16/9),e=Math.max(16,Math.floor(e)),i=Math.max(9,Math.floor(i));const s=this.canvas;s.style.width=e+"px",s.style.height=i+"px",s.style.left=Math.floor((t.width-e)/2)+"px",s.style.top=Math.floor((t.height-i)/2)+"px";const r=Math.min(this.maxDpr,window.devicePixelRatio||1),o=Math.min(2560,Math.round(e*r)),a=Math.round(o*9/16);(s.width!==o||s.height!==a)&&(s.width=o,s.height=a),this.k=o/Y1,this.css={w:e,h:i,x:Math.floor((t.width-e)/2),y:Math.floor((t.height-i)/2)}}budget(t){const e=this.stats;e.ms=e.ms?e.ms*.95+t*.05:t,e.frames++,!(e.frames<90)&&(e.ms>19?this._slow++:this._slow=0,e.ms<9?this._fast++:this._fast=0,this._slow>45?(this._slow=0,e.frames=0,this.maxDpr>1.01?(this.maxDpr=Math.max(1,this.maxDpr-.25),this.resize()):this.glowOn&&(this.glowOn=!1),e.quality--,console.info(`stage: frame time ${e.ms.toFixed(1)} ms → dpr ${this.maxDpr}, glow ${this.glowOn}`)):this._fast>240&&(this.maxDpr<Math.min(2,window.devicePixelRatio||1)||!this.glowOn)&&(this._fast=0,e.frames=0,this.glowOn?(this.maxDpr=Math.min(window.devicePixelRatio||1,this.maxDpr+.25),this.resize()):this.glowOn=!0,e.quality++))}screen(){this.ctx.setTransform(this.k,0,0,this.k,0,0)}worldT(t){const e=this.k,i=t.zoom;this.ctx.setTransform(e*i,0,0,e*i,e*(640-t.x*i),e*(360-t.y*i))}draw(t,e={}){var v,E,C,S,w,B;const i=this.ctx,s=t.t,r={k:this.k,rects:[]};i.__lcProtect=r,i.setTransform(1,0,0,1,0,0),i.globalCompositeOperation="source-over",i.globalAlpha=1,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),this.worldT(t.cam),x1(i,this.S,t);const o=(t.setNow??t.set).dim??.34;o>0&&(i.setTransform(1,0,0,1,0,0),i.globalAlpha=o,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),i.globalAlpha=1),this.screen(),t.panel&&t.module.autoPanel!==!1&&Lh(i,t.panel,{color:x.sky,appear:1}),this.call(t,"drawBack",i);for(const y of t.monitors)Rr(i,y.rect.x,y.rect.y,y.rect.w,y.rect.h,{...y});const a=[...t.puppets.values()].filter(y=>y.visible&&y.screen&&y.head);if(a.sort((y,T)=>(y.place.z??0)-(T.place.z??0)||y.screen.y-T.screen.y),this.stats.heads=a.length,!e.probe)for(const y of a)this.drawPuppet(t,y);this.screen();for(const y of t.monitors)Rr.glass(i,y.rect.x,y.rect.y,y.rect.w,y.rect.h,{...y,t:s});this.worldT(t.cam),S1(i,this.S,t),this.screen(),b1(i,this.S,t,t.audience),this.call(t,"drawFront",i);const l=(v=t.layout)==null?void 0:v.lane;l!=null&&l.text&&Rh(i,l.y,l.text,s,{tag:l.tag,color:x.coral}),t.builtNow&&X1(i,t.builtNow);const c=t.disclaimerNow;c&&q1(i,c.text,c.alpha),i.__lcProtect=null;const h=e.captions??!0,u=Math.max(l!=null&&l.text?46:0,c?34*c.alpha:0),f=h?t.captionNow:null,d=h&&!f&&t.laughing>.05,_=t.signText==="APPLAUSE"?"APPLAUSE":"LAUGHTER";if(e.probe){this.probeCaption(t,f,u,r.rects,e.probe);return}const g=f?Lo(i,f,u,this.lineScale(t,f,u,r.rects),this.widthCache(f)):null,p=d?fc(i,_,t.laughing,u,this.laughScale(_,u,r.rects)):null,m=(g==null?void 0:g.area)??(p==null?void 0:p.area)??null;for(const y of t._frame.chyrons){const T=y.spec.id,z=T?{name:((E=t.puppets.get(T))==null?void 0:E.name)??((C=ii[T])==null?void 0:C.name)??T,title:(S=ii[T])==null?void 0:S.title,handle:((w=ii[T])==null?void 0:w.handle)??Lr(T).handle,color:Lr(T).color,parody:!!((B=ii[T])!=null&&B.guest),...y.spec}:y.spec,Q=Gn(y.from,y.from+.6,s),tt=Gn(y.to-.5,y.to,s);if(!(s>=y.from&&s<=y.to))continue;const L=(t.captionNow&&h?478:560)-(l!=null&&l.text?46:0);G1(i,z,Q,tt,B1(L,$1(i,z),m,_a,g?f.alpha:p?t.laughing:1))}this.signInFrame(t)||E1(i,t),g?V1(i,f,g):p&&W1(i,p,t.laughing,u),e.overlay&&e.overlay(i),this.gl.ok||(Rt(i,Dn(340,300,600,80),"#000",.85),dh(i,this.gl.failed?"THE HEADS NEED WEBGL, WHICH THIS BROWSER HAS TURNED OFF.":"RECONNECTING THE HEADS…",640,340,560,{size:16,align:"center",color:x.amber,ls:.12})),this.glowOn&&this.glow.apply(this.canvas,i,this.k)}widthCache(t){const e=Po(t);return this._widthKey!==e&&(this._widthKey=e,this._widths=new Map),this._widths}scaleCands(){return this._candsFor!==this.captionScale&&(this._candsFor=this.captionScale,this._cands=Oh(this.captionScale)),this._cands}lineScale(t,e,i,s){var l;if(this.captionScale===1)return 1;const o=(l=t.captionPlan)==null?void 0:l.get(Po(e));if(o!=null)return o;const a=this.widthCache(e);return ea(this.scaleCands(),c=>Co(Lo(this.ctx,e,i,c,a).area,s))}laughScale(t,e,i){return this.captionScale===1?1:ea(this.scaleCands(),s=>Co(fc(this.ctx,t,1,e,s).area,i))}probeCaption(t,e,i,s,r){if(!e)return;const o=Po(e),a=this.widthCache(e),l=new Set(this.scaleCands().filter(c=>Co(Lo(this.ctx,{...e,alpha:1},i,c,a).area,s)));r.samples.has(o)||r.samples.set(o,[]),r.samples.get(o).push(l)}signInFrame(t){if((t.setNow??t.set).sign===!1)return!1;const[e,i]=t.toScreen(845,64),[s,r]=t.toScreen(1095,110);return s>40&&e<1240&&i>-10&&r<720}call(t,e,i){const s=t.module[e];if(s){i.save();try{s.call(t.module,i,t.t,t)}catch(r){t._warn(`${e}() threw: ${(r==null?void 0:r.message)??r}`),console.error(r)}i.restore(),this.screen(),i.globalAlpha=1,i.globalCompositeOperation="source-over",i.filter="none"}}drawPuppet(t,e){const i=e.fx,s=e.place.clip;if(!i){s?this.clipped(s,()=>this.paintPuppet(this.ctx,t,e,!0)):this.paintPuppet(this.ctx,t,e,!0),this.drawExtras(t,e);return}const r=this.layer(),o=r.getContext("2d");o.setTransform(1,0,0,1,0,0),o.globalCompositeOperation="source-over",o.globalAlpha=1,o.clearRect(0,0,r.width,r.height),o.setTransform(this.k,0,0,this.k,0,0);const a=i.kind==="hologram";this.paintPuppet(o,t,e,!a);const l=this.k,{x:c,y:h,size:u}=e.screen,f=t.t,d=e.id.length*7;o.setTransform(1,0,0,1,0,0),o.globalCompositeOperation="destination-out",o.globalAlpha=i.scan??(a?.55:.35),o.fillStyle="#000";const _=Math.max(2,Math.round(3*l)),g=a?Math.floor(f*40)%_:0,p=Math.max(0,Math.floor((h-u)*l)),m=Math.min(r.height,Math.ceil((h+u*1.6)*l));for(let C=p+g;C<m;C+=_)o.fillRect(0,C,r.width,Math.max(1,_*.45));let M=i.amount??1;if(a){const C=i.flicker??.5,S=We(f*9,d);M*=1-C*.35*(.5+.5*S),C>0&&pr(Math.floor(f*12),d)<.04*C&&(M*=.25),M*=.78}else M*=i.kind==="monitor"?.92:1;const v=this.ctx;if(v.save(),v.setTransform(1,0,0,1,0,0),s&&(v.beginPath(),v.rect(s.x*l,s.y*l,s.w*l,s.h*l),v.clip()),v.globalCompositeOperation=a?"lighter":"source-over",v.globalAlpha=Math.max(0,Math.min(1,M)),(a||i.tint)&&(v.filter=K1(i.tint??"#7fc8ff")),a?(i.glitch??1)*(pr(Math.floor(f*7),d+3)<.18?1:0):0){const S=(h-u*.6)*l,w=u*2.2*l/7;v.drawImage(r,0,0,r.width,S,0,0,r.width,S);for(let B=0;B<7;B++){const y=S+B*w,T=(pr(B+Math.floor(f*7)*13,d)-.5)*26*l;v.drawImage(r,0,y,r.width,w,T,y,r.width,w)}v.drawImage(r,0,S+7*w,r.width,r.height-S-7*w,0,S+7*w,r.width,r.height-S-7*w)}else v.drawImage(r,0,0);v.restore(),this.drawExtras(t,e)}layer(){this._layer||(this._layer=document.createElement("canvas"));const t=this._layer;return(t.width!==this.canvas.width||t.height!==this.canvas.height)&&(t.width=this.canvas.width,t.height=this.canvas.height),t}clipped(t,e){const i=this.ctx;i.save(),i.beginPath(),i.rect(t.x,t.y,t.w,t.h),i.clip();try{e()}finally{i.restore(),this.screen()}}drawExtras(t,e){var s;const i=this.ctx;e.place.instrument&&(this.worldT(t.cam),M1(i,e.place.instrument,e.place.x,e.place.y,t,e.id),this.screen()),e.look.prop&&!e.place.clip&&(this.worldT(t.cam),y1(i,e.look.prop,e.place.x+(((s=e.propParams)==null?void 0:s.side)??e.look.propSide??-1)*150*(e.place.scale??1),e.place.y,t,e.propParams??{}),this.screen())}paintPuppet(t,e,i,s){const{x:r,y:o,size:a}=i.screen,l=i.head,c=r-a/2,h=o-a/2,u=l.neck(),f=u.cm*(i.look.bodyScale??.66),d=c+u.x,_=h+u.y,g=i.place.floor!=null?e.toScreen(0,i.place.floor)[1]:null,p=Math.cos(i.az)*.75,m={x:d,y:_,u:f,turn:p,sway:i.tilt*.6,breathe:i.breathe,t:e.t,bottom:((i.place.seat!=null?Math.min(pc+40,e.toScreen(0,i.place.seat)[1]):pc+40)-_)/f,floor:g!=null?(g-_)/f:null,speaking:i.speaking,look:i.look,noFill:!s},M=i.look.costume;if(uc(t,"back",m,M),s){const v=l.hull();if(v.length>=6){const E=new Path2D,C=a/2,S=a/2;for(let w=0;w<v.length;w+=2){const B=c+C+(v[w]-C)*1.02,y=h+S+(v[w+1]-S)*1.02;w?E.lineTo(B,y):E.moveTo(B,y)}E.closePath(),Rt(t,E,"#000",.94)}}if(this.gl.ok){const v=this.k,E=Math.min(j1,a*v),C=this.gl.render(l,E);t.save(),t.setTransform(1,0,0,1,0,0),t.globalCompositeOperation="lighter",t.imageSmoothingEnabled=!0,t.drawImage(this.gl.canvas,C[0],C[1],C[2],C[3],c*v,h*v,a*v,a*v),t.restore()}uc(t,"front",m,M)}}const mc=new Map;function K1(n){let t=mc.get(n);if(!t){const e=parseInt(n.slice(1),16),i=(e>>16&255)/255,s=(e>>8&255)/255,r=(e&255)/255,o=Math.max(i,s,r),a=Math.min(i,s,r),l=o-a;let c=0;l>0&&(c=o===i?(s-r)/l%6:o===s?(r-i)/l+2:(i-s)/l+4),c=(c*60+360)%360,t=`grayscale(1) sepia(1) saturate(2.6) hue-rotate(${Math.round(c-38)}deg) brightness(1.15)`,mc.set(n,t)}return t}const gc=Float32Array.from(bi.map(n=>Jo[n]));class J1{constructor(t){this.id=t,this.cast=ii[t]??{name:t.replace(/(^|[-_])(\w)/g,(e,i,s)=>(i?" ":"")+s.toUpperCase()),title:"",body:{female:.5,child:0}},this._look=null,this.body=this.cast.body??{female:.5,child:0},this.head=null,this.az=NaN,this.visible=!1,this.place=null,this.screen=null,this.tele=null,this.artic=Jo,this.speaking=0,this.msgs=new Map,this.spans=[],this.skip=0,this.tmpA=new Float32Array(bi.length),this.tmpB=new Float32Array(bi.length)}get look(){return this._look??Lr(this.id)}get name(){return this.look.displayName??this.cast.name}get color(){return this.look.color}ensureHead(){const t=this.look.head;return this.head&&this.head.palette!==t&&(this.head.dispose(),this.head=null),this.head||(this.head=new S_(this.body,t)),this.head}dress(t){this._look={...this.look,...t}}msgFor(t){const e=`${t.nPh}/${t.nOr}/${t.nArtic}/${t.scope}`;let i=this.msgs.get(e);return i||this.msgs.set(e,i=t.makeMessage()),i}sample(t,e){const i=this.spans;let s=null,r=null,o=null;for(const h of i)t>=h.start&&t<=h.end?s=h:h.end<t&&(!r||h.end>r.end)?r=h:h.start>t&&(!o||h.start<o.start)&&(o=h);if(s){const h=this.msgFor(s.block);s.block.fill(h,s.block.frameAt(t-s.start),t),h.beatStep=e,this.tele=h,this.artic=cc(h.t.artic),this.speaking=s.line.kind==="beat"?.6:1;return}this.tele=null,this.speaking=0;const a=.35,l=.14;let c=null;if(r&&t-r.end<a){const h=(t-r.end)/a;r.block.articAt(r.block.frames-1,this.tmpA),c=_c(this.tmpA,gc,h*h*(3-2*h))}if(o&&o.start-t<l){const h=1-(o.start-t)/l;o.block.articAt(0,this.tmpB),c=_c(c??gc,this.tmpB,h*h*(3-2*h))}this.artic=c?cc(c):Jo}}function _c(n,t,e){const i=new Float32Array(n.length);for(let s=0;s<n.length;s++)i[s]=n[s]+(t[s]-n[s])*e;return i}const Cs=200,ee={desk:{x:1790,y:548},mono:{x:970,y:452},chair:{x:ma.x,y:588},couch:[{x:1330,y:602},{x:1218,y:602}],band:{hy:{x:138,y:578,instrument:"keys",floor:800},al:{x:268,y:578,instrument:"bass",floor:800},pete:{x:404,y:512,instrument:"drums",floor:740},dee:{x:556,y:578,instrument:"mic",floor:800}},anncr:{x:690,y:548,floor:Qt.floor},lectern:{x:690,y:540},presenter:{x:1460,y:520},stand:{x:1470,y:545}};function dr(n,t,e,i={}){const s=n.cam.zoom,r=e.h*.78/(Cs*s),o=e.x+e.w/2,a=e.y+e.h*.42;return n.monitors=[...n.monitors??[],{rect:e,who:t,...i}],n.place[t]={x:n.cam.x+(o-640)/s,y:n.cam.y+(a-360)/s,scale:r,look:i.look??"camera",z:8,floor:null,clip:e,fx:{kind:"monitor"}},n}const kh=["hy","al","pete","dee"],Sn=(n,t="camera")=>n==="mono"?{...ee.mono,scale:1,look:t,z:5,floor:Qt.floor}:{...ee.desk,scale:1,look:t,z:5,floor:null,seat:760};function vc(n){const t=[ee.chair,...ee.couch],e={};return n.slice(0,3).forEach((i,s)=>e[i]={...t[s],scale:1,look:"larry",z:4-s*.1,floor:null,seat:s?790:800}),e}function Mc(n,t="camera"){const e={};for(const i of kh){const s=ee.band[i];e[i]={x:s.x,y:s.y,scale:.92,look:t,z:i==="pete"?1:2,floor:s.floor,instrument:s.instrument}}return e}const vr={wide(n,t={}){const e={larry:Sn(t.larry??"desk",t.look??"camera")};return t.band!==!1&&Object.assign(e,Mc()),Object.assign(e,vc(t.guests??n.guests)),(n.cast.includes("sibyl")||t.sibyl)&&(e.sibyl={...ee.anncr,scale:.9,look:"camera",z:2}),{cam:{x:1e3,y:585,zoom:.64},place:e,audience:1}},mono(n,t={}){const e=Sn("mono",t.look??"camera");return{cam:{x:e.x,y:e.y+86,zoom:t.zoom??1.78},place:{larry:e},audience:1}},desk(n,t={}){const e=Sn("desk",t.look??"camera");return{cam:{x:e.x-40,y:e.y+66,zoom:t.zoom??1.85},place:{larry:e},audience:0}},guest(n,t={}){const e=t.guest??n.guests[0],i={larry:Sn("desk",e??"camera")};return e&&(i[e]={...ee.chair,scale:t.guestScale??1,look:"larry",z:4,floor:null,seat:800}),{cam:{x:(ee.chair.x+ee.desk.x)/2-10,y:640,zoom:t.zoom??1.42},place:i,audience:0}},panel(n,t={}){const e=t.guests??n.guests.filter(l=>l!==t.pop).slice(0,3),i={larry:Sn("desk",t.look??e[0]??"camera"),...vc(e)},s=e.length>=3?ee.couch[1].x:e.length===2?ee.couch[0].x:ee.chair.x,r=(s+ee.desk.x)/2,o=Math.min(1.4,1100/(ee.desk.x-s+260)),a={x:r,y:650,zoom:o};if(t.pop){const l=Math.max(0,Math.min(1,t.popUp??1)),c=(612-a.y)*o+360;i[t.pop]={x:e.length>=3?ee.couch[1].x-70:ee.couch[1].x,y:720-l*150,scale:t.popScale??.9,look:"larry",z:1,floor:null,clip:{x:0,y:-100,w:1280,h:c+100}}}return{cam:a,place:i,audience:0}},band(n,t={}){const e=Mc(n,t.look??"camera");if(t.with)for(const i of[].concat(t.with))e[i]={...ee.anncr,scale:.9,look:"camera",z:2};return{cam:{x:352,y:640,zoom:t.zoom??1.5},place:e,audience:.8}},ots(n,t={}){var f;const e=t.who??"larry",i=t.side==="right",s=t.zoom??1.75,r=e==="larry"?Sn("desk"):{...ee.presenter,scale:1,z:5,floor:Qt.floor},o=i?960:270,a={x:r.x-(o-640)/s-(i?-40:40)/s,y:r.y+70,zoom:s},l=t.panel??(i?{x:40,y:64,w:690,h:470}:{x:520,y:64,w:720,h:470}),c={[e]:{...r,look:t.look??(i?"left":"right"),instrument:t.desk??r.instrument}},u={cam:a,place:c,audience:0,panel:l,set:e==="larry"?{}:{chair:!1,couch:!1,desk:!1}};if(t.pip){const g=i?{x:l.x+18,y:l.y+l.h-150-18,w:230,h:150}:{x:l.x+l.w-230-18,y:l.y+l.h-150-18,w:230,h:150};dr(u,t.pip,g,{label:t.pipLabel??((f=n.CAST[t.pip])==null?void 0:f.name)??t.pip,live:t.pipLive??!1,noStand:!0})}return u},sports(n,t={}){const e=vr.ots(n,{who:"eppy",desk:"sportsdesk",...t,panel:t.panel??(t.side==="right"?{x:40,y:54,w:690,h:430}:{x:520,y:54,w:720,h:430})});return e.lane={y:676,h:36,text:t.ticker??null,tag:t.tickerTag??"SCORES"},e},remote(n,t={}){var o;const e=t.guest??n.guests[0],i=t.zoom??1.6,s=Sn("desk","left"),r={cam:{x:s.x-320/i,y:s.y+70,zoom:i},place:{larry:s},audience:0,set:{chair:!1,couch:!1}};return e&&dr(r,e,{x:60,y:60,w:560,h:400},{label:t.label??((o=n.CAST[e])==null?void 0:o.name)??e,live:t.live??!0}),r},remote2(n,t={}){var a,l,c,h;const[e,i]=t.guests??n.guests.slice(0,2),s=t.zoom??1.6,r=Sn("desk","left"),o={cam:{x:r.x-390/s,y:r.y+70,zoom:s},place:{larry:r},audience:0,set:{chair:!1,couch:!1}};return e&&dr(o,e,{x:40,y:90,w:390,h:300},{label:((a=t.labels)==null?void 0:a[0])??((l=n.CAST[e])==null?void 0:l.name)??e,live:t.live??!0}),i&&dr(o,i,{x:460,y:90,w:390,h:300},{label:((c=t.labels)==null?void 0:c[1])??((h=n.CAST[i])==null?void 0:h.name)??i,live:t.live??!0}),o},podium(n,t={}){const e=t.who??"sibyl",i=ee.lectern,s={[e]:{...i,scale:1,look:t.look??"camera",z:4,floor:Qt.floor,instrument:"lectern"}};return{cam:{x:i.x+20,y:i.y+100,zoom:t.zoom??1.7},place:s,audience:.5}},deskWith(n,t={}){const e=t.with??"sibyl",i={larry:Sn("desk",t.look??e),[e]:{...ee.stand,scale:1,look:"larry",z:4,floor:Qt.floor,instrument:t.stand??"stand"}};return{cam:{x:(ee.stand.x+ee.desk.x)/2,y:640,zoom:t.zoom??1.4},place:i,audience:0,set:{chair:!1,couch:!1}}},stage(n,t={}){const e=t.lead??"larry",i=t.band??kh,s={[e]:{x:970,y:470,scale:1,look:t.look??"camera",z:6,floor:Qt.floor}},r=i.length;return i.forEach((o,a)=>{const l=r>1?a/(r-1):.5,c=970+(l-.5)*2*210+(l<.5?-40:40);s[o]={x:c,y:430+Math.abs(l-.5)*40,scale:.78,look:"camera",z:2,floor:Qt.floor}}),{cam:{x:970,y:470,zoom:t.zoom??1.15},place:s,audience:1,set:{chair:!1,couch:!1}}},closeup(n,t={}){const e=t.who??"larry",i=n.markOf(e),s=(t.size??520)/(Cs*(i.scale??1)),r={[e]:{...i,look:t.look??i.look??"camera"}};return{cam:{x:i.x+(t.dx??0),y:i.y+Cs*.18*(i.scale??1),zoom:s},place:r,audience:0}},title(n){const t={larry:Sn("desk","camera")};return{cam:{x:1590,y:590,zoom:1.45},place:t,audience:0}}},Hh=["larry","sibyl","hy","al","dee","pete","eppy"],Q1=/^(applause|laugh|biglaugh|chuckle|cheer)/i,yc=.6,xc=Math.PI-.6;class _s{constructor({module:t,cues:e,tele:i,puppets:s}){this.module=t,this.cues=e??{id:t.id,title:t.title,duration:t.duration??30,lines:[],cues:{},sfx:[],music:[]},this.id=t.id??this.cues.id,this.title=t.title??(e==null?void 0:e.title)??this.id,this.duration=this.cues.duration??t.duration??30,this.teleFile=i,this.puppets=s,this.lines=(this.cues.lines??[]).slice().sort((o,a)=>o.t0-a.t0),this.lineById=new Map(this.lines.filter(o=>o.id).map(o=>[o.id,o])),this.sfxList=this.cues.sfx??[],this.musicList=this.cues.music??[],this._warned=new Set;const r=["larry"];for(const o of this.lines)o.who&&!r.includes(o.who)&&r.push(o.who);for(const o of t.cast??[])r.includes(o)||r.push(o);this.cast=r,this.guests=(t.guests??r.filter(o=>!Hh.includes(o))).slice(),this.draw=t1,this.P=x,this.ease=qe,this.clamp=ie,this.lerp=ti,this.unlerp=Gn,this.smoothstep=Gr,this.tween=Kh,this.window=Vr,this.pulse=Jh,this.noise=We,this.SHOTS=vr,this.MARKS=ee,this.TILE=Cs,this.CAST=ii,this.defineLook=Bh,this.set={...t.set??{}},this.nameplate=t.nameplate,this.keyLabel=t.keyLabel,this.captions=!0,this.onAir=!0,this.t=0,this.dt=0,this.wall=0,this._cur=null,this._trans=null,this._lastPlace={},this._frame=this._newFrame(),this.layout=null,this.cam={x:1e3,y:560,zoom:1},this.panel=null,this.audience=0,this.cut=!0,this._declShots=(t.shots??[]).map(o=>typeof o=="string"?{at:0,shot:o}:o),this._buildSpans()}_newFrame(){return{shot:null,cam:null,over:{},chyrons:[],caption:void 0,sign:null}}_buildSpans(){var e;for(const i of this.cast)this.puppet(i);for(const i of this.puppets.values())i.spans=[];const t=((e=this.teleFile)==null?void 0:e.blocks)??[];for(const i of this.lines){if(!(i.tele>=0)||!t[i.tele])continue;const s=t[i.tele];this._puppet(i.who).spans.push({start:i.teleT0,end:i.teleT0+s.duration,block:s,line:i})}}_puppet(t){let e=this.puppets.get(t);return e||(e=new J1(t),this.puppets.set(t,e)),e}_warn(t){this._warned.has(t)||(this._warned.add(t),console.warn(`[${this.id}] ${t}`))}at(t){var o;if(typeof t=="number")return t;if(t==null)return 0;const e=(o=this.cues.cues)==null?void 0:o[t];if(e!==void 0)return e;if(t.endsWith(".end")){const a=this.lineById.get(t.slice(0,-4));if(a)return a.t1}const i=this.lineById.get(t);if(i)return i.t0;const s=this.musicList.find(a=>a.id===t);if(s)return s.t0;const r=this.sfxList.find(a=>a.name===t)??this.sfxList.find(a=>a.name.startsWith(t+"-"));return r?r.t0:(this._warn(`unknown cue "${t}"`),1/0)}since(t){return this.t-this.at(t)}between(t,e){return this.t>=this.at(t)&&this.t<this.at(e)}progress(t,e){const i=this.at(t),s=typeof e=="number"?i+e:this.at(e);return Gn(i,s,this.t)}line(t){const e=this.lineById.get(t);return e?this._lineState(e):(this._warn(`unknown line "${t}"`),{id:t,t0:1/0,t1:1/0,active:!1,progress:0,done:!1,word:-1,words:[]})}_lineState(t){const e=this.t;let i=-1;if(t.words)for(let s=0;s<t.words.length;s++)e>=t.words[s][0]&&(i=s);return{...t,active:e>=t.t0&&e<t.t1,progress:Gn(t.t0,t.t1,e),done:e>=t.t1,word:i}}get active(){const t=this.t;return this.lines.filter(e=>t>=e.t0&&t<e.t1)}speaking(t){const e=this.t;return this.lines.some(i=>i.who===t&&e>=i.t0&&e<i.t1)}get speaker(){let t=null;const e=this.t;for(const i of this.lines)e>=i.t0&&e<i.t1&&i.kind!=="beat"&&(!t||i.t0>=t.t0)&&(t=i);return(t==null?void 0:t.who)??null}lastLine(t){let e=null;for(const i of this.lines)i.t0<=this.t&&(!t||i.who===t)&&(e=i);return e?this._lineState(e):null}sfx(t){const e=this.t,i=this.sfxList.find(s=>s.name.startsWith(t)&&e>=s.t0&&e<s.t1);return i?{...i,progress:Gn(i.t0,i.t1,e)}:null}musicState(t){const e=this.t,i=t?this.musicList.find(c=>c.id===t):this.musicList.find(c=>e>=c.t0&&e<c.t0+c.beats*60/c.bpm);if(!i)return null;const s=60/i.bpm,r=(e-i.t0)/s,o=Math.floor(r),a=r-o,l=i.beats*s;return{id:i.id,t0:i.t0,t1:i.t0+l,bpm:i.bpm,beats:i.beats,beat:r,n:o,phase:a,bar:Math.floor(o/4),pulse:r>=0?Math.exp(-a*4.5):0,progress:Gn(i.t0,i.t0+l,e),active:e>=i.t0&&e<i.t0+l}}shot(t,e={}){return this._frame.shot=this._req(t,e),this}closeup(t,e={}){return this.shot("closeup",{...e,who:t})}_req(t,e){const{push:i,since:s,...r}=e,o=t+JSON.stringify(Object.fromEntries(Object.entries(r).filter(([,a])=>typeof a!="number")));return{name:t,opts:r,key:o,push:i??0,since:s===void 0?void 0:this.at(s)}}camera(t){return this._frame.cam={...this._frame.cam??{},...t},this}puppet(t){const e=this._puppet(t),i=this,s=()=>{var r;return(r=i._frame.over)[t]??(r[t]={})};return{id:t,get name(){return e.name},get color(){return e.color},get look(){return e.look},get speaking(){return e.speaking},get screen(){return e.screen},place(r){var o;return Object.assign((o=s()).place??(o.place={}),r),this},lookAt(r){return s().look=r,this},nod(r){return s().nod=(s().nod??0)+r,this},tilt(r){return s().tilt=(s().tilt??0)+r,this},hide(){return s().hidden=!0,this},show(){return s().hidden=!1,this},bob(r=!0){return e.bobOff=!r,this},fx(r,o={}){return s().fx={kind:r,...o},this},shake(r=4){return s().shake=r,this},scaleTo(r){return s().scaleTo=r,this},prop(r){return s().prop={...s().prop??{},...r},this},dress(r){return e.dress(r),this}}}markOf(t){if(this._lastPlace[t])return this._lastPlace[t];if(t==="larry")return{...ee.desk,scale:1,look:"camera"};if(ee.band[t])return{...ee.band[t],scale:.92,look:"camera"};if(t==="sibyl")return{...ee.anncr,scale:.9,look:"camera"};const e=Math.max(0,this.guests.indexOf(t));return{...[ee.chair,...ee.couch][Math.min(2,e)],scale:1,look:"larry"}}chyron(t,e={}){const i=typeof t=="string"?{id:t}:t,s=this.at(e.from??0),r=e.to!==void 0?this.at(e.to):s+(e.dur??5);return this._frame.chyrons.push({spec:i,from:s,to:r,opts:e}),this}caption(t,e){return this._frame.caption=t===null?null:{text:t,who:e},this}sign(t="APPLAUSE",e=1){return this._frame.sign={text:t,level:e},this}rng(t=0){return Li(Fo(`${this.id}:${t}`))}toScreen(t,e){const i=this.cam;return[(t-i.x)*i.zoom+640,(e-i.y)*i.zoom+360]}world(t,e){const i=this.cam;t.save(),t.translate(640-i.x*i.zoom,360-i.y*i.zoom),t.scale(i.zoom,i.zoom);try{e(t)}finally{t.restore()}}headOf(t){const e=this.puppets.get(t);if(!(e!=null&&e.screen)||!e.visible||!e.head)return null;const i=e.screen,s=e.head.mouth(),r=e.head.crown(),o=i.size/e.head.tile;return{x:i.x,y:i.y,size:i.size,mouth:[i.x-i.size/2+s[0]*o,i.y-i.size/2+s[1]*o],crown:[i.x-i.size/2+r.x*o,i.y-i.size/2+r.y*o]}}resetMotion(){var t;this.cut=!0,this._cur=null,this._trans=null;for(const e of this.cast){const i=this.puppets.get(e);i.az=NaN,(t=i.head)==null||t.resetMotion()}}frame(t,e,i={}){var a,l;this.t=t,this.dt=e,this.wall=t+1e3,this._frame=this._newFrame(),this.music=this.musicState(),this.beat=this.music?{phase:this.music.phase,n:this.music.n,pulse:this.music.pulse,bar:this.music.bar}:{phase:0,n:-1,pulse:0,bar:-1};let s=0,r=!1;for(const c of this.sfxList){if(!Q1.test(c.name))continue;const h=Vr(t,c.t0,c.t1,.5)*(/^chuckle/i.test(c.name)?.55:1);h>s&&(s=h,r=/^(applause|cheer)/i.test(c.name))}this.laughing=s,this.signText=r?"APPLAUSE":"LAUGH";const o=this._declShot(t);o&&(this._frame.shot=o);try{(l=(a=this.module).direct)==null||l.call(a,t,this)}catch(c){this._warn(`direct() threw: ${(c==null?void 0:c.message)??c}`),console.error(c)}this._frame.sign&&(this.laughing=Math.max(this.laughing,this._frame.sign.level),this.signText=this._frame.sign.text),this._builtState(t),this._resolveLayout(t),this._updatePuppets(t,e,i),this._captionState(t)}_builtState(t){const e=this.module.built;if(!e){this.built=null,this.builtNow=null;return}let i=e.from??0,s=-1/0;for(const r of e.bumps??[]){const o=this.at(r);o<=t&&(i++,s=Math.max(s,o))}this.built=i,this.builtNow={n:i,age:t-s,seed:Math.floor(s*1e3),label:e.label}}get disclaimerNow(){const t=this.module.disclaimer;if(!t)return null;const e=typeof t=="string"?{text:t}:t,i=this.at(e.from??0),s=e.dur??6,r=Vr(this.t,i,i+s,.6);return r>0?{text:e.text,alpha:r}:null}_declShot(t){let e=null;for(const l of this._declShots){const c=this.at(l.at??0)+(l.after??0);c<=t&&(!e||c>=e.at)&&(e={...l,at:c})}if(!e)return null;const{at:i,after:s,shot:r,push:o,...a}=e;return this._req(r,{...a,push:o,since:i})}_evalShot(t){const e=vr[t.name];return e?e(this,t.opts):(this._warn(`unknown shot "${t.name}"`),vr.desk(this,{}))}_resolveLayout(t){const e=this._frame.shot??this._req(this.module.defaultShot??"desk",{});if(!this._cur||this._cur.key!==e.key){const o=e.push>0&&this._cur;this._trans=o?{from:this._cur,start:e.since??t,dur:e.push}:null,o||(this.cut=!0),this._cur=e}else this._cur={...e,since:this._cur.since};let i=this._evalShot(this._cur);if(this._trans){const o=(t-this._trans.start)/this._trans.dur;o>=1||o<0?this._trans=null:i=tv(this._evalShot(this._trans.from),i,qe.inOutCubic(o))}const s={...i.cam,...this._frame.cam??{}};this.module.drift!==!1&&(s.x+=7*We(t*.11,11)/s.zoom,s.y+=4*We(t*.09,12)/s.zoom,s.zoom*=1+.006*We(t*.07,13));const r={...i.place};for(const[o,a]of Object.entries(this._frame.over))a.place&&(r[o]={...r[o]??this.markOf(o),...a.place}),a.hidden===!0?delete r[o]:a.hidden===!1&&!r[o]&&(r[o]=this.markOf(o));this.layout=i,this.setNow={...i.set??{},...this.set},this.monitors=i.monitors??[],this.cam=s,this.place=r,this.panel=i.panel??null,this.audience=i.audience??0}_resolveAz(t,e,i){if(typeof e=="number")return e;if(e==="right")return yc;if(e==="left")return xc;if(e==="camera"||e==null){const r=(i.x-this.cam.x)*this.cam.zoom,o=Math.abs(r)>40?Math.sign(r):i.camSide??-1;return Math.PI/2+o*(.36+.12*ie(Math.abs(r)/400,0,1))}const s=this.place[e];return s?s.x>=i.x?yc:xc:Math.PI/2}_updatePuppets(t,e,i){var a,l;const s=this.cam,r=(a=this.music)!=null&&a.active?Math.floor(this.music.beat*4)%16:-1,o=this.cut;this.cut=!1;for(const c of this.puppets.values()){const h=this.place[c.id];if(!h){c.visible=!1,c.screen=null;continue}h.clip||(this._lastPlace[c.id]={x:h.x,y:h.y,scale:h.scale??1,look:h.look});const u=this._frame.over[c.id]??{},f=Fo(c.id)%997,d=(h.scale??1)*(c.look.scale??1)*(u.scaleTo??1),_=Cs*d*s.zoom,g=.5+.5*Math.sin(t*2*Math.PI/4.4+f),p=u.shake??0,m=(h.x-s.x)*s.zoom+640+(p?p*We(t*37,f+21):0),M=(h.y-s.y)*s.zoom+360-g*.006*_+(p?p*We(t*41,f+22):0),v=u.fx??h.fx??(c.look.fx?{kind:c.look.fx}:null);if(c.fx=v&&v.kind!=="none"?v:null,c.propParams=u.prop??null,c.place=h,c.screen={x:m,y:M,size:_},c.visible=m>-_&&m<1280+_&&M>-_&&M<720+_*1.2,c.breathe=g,!c.visible)continue;const E=u.look??h.look,C=.07*We(t*.31,f)+.04*We(t*1.1,f+5),S=this._resolveAz(c.id,E,h)+C;o||!Number.isFinite(c.az)?c.az=S:c.az+=(S-c.az)*(1-Math.exp(-e/.2)),c.sample(t,r),i.paused&&(c.tele=null);let w=(u.nod??0)+.025*We(t*.23,f+9);const B=(u.tilt??0)+.03*We(t*.17,f+3);(l=this.music)!=null&&l.active&&!c.bobOff&&(w-=.07*this.music.pulse),c.nod=w,c.tilt=B;const y=c.ensureHead(),T=ie(Math.sqrt(_/330),.72,1.35);y.aim(c.az,.13+(u.el??0),_,T),!(!i.full&&!c.tele&&_<200&&i.light&&(c.skip^=1))&&y.update(e,e,c.tele,c.artic,w,B)}}_captionState(t){const e=this._frame.caption;if(e===null)return this.captionNow=null;if(e){const a=e.who?this._puppet(e.who):null;return this.captionNow={who:e.who,name:(a==null?void 0:a.name)??"",color:(a==null?void 0:a.color)??x.white,text:e.text,words:null,word:-1,alpha:1}}let i=null;for(const a of this.lines)a.caption===!1||a.kind==="beat"||t>=a.t0-.05&&t<a.t1+.7&&(!i||a.t0>=i.t0)&&(i=a);if(!i)return this.captionNow=null;const s=this._puppet(i.who);let r=-1;if(i.words)for(let a=0;a<i.words.length;a++)t>=i.words[a][0]&&(r=a);const o=Math.min(Gr(i.t0-.05,i.t0+.1,t),1-Gr(i.t1+.4,i.t1+.7,t));this.captionNow={who:i.who,name:s.name,color:s.color,text:i.text,words:i.words,word:r,alpha:o,kind:i.kind,done:t>=i.t1}}}function tv(n,t,e){const i=Math.exp(ti(Math.log(n.cam.zoom),Math.log(t.cam.zoom),e)),s={x:ti(n.cam.x,t.cam.x,e),y:ti(n.cam.y,t.cam.y,e),zoom:i},r={};for(const o of new Set([...Object.keys(n.place),...Object.keys(t.place)])){const a=n.place[o],l=t.place[o];if(a&&l){const c=Math.hypot(a.x-l.x,a.y-l.y)>300;r[o]=c?e<.5?a:l:{...l,x:ti(a.x,l.x,e),y:ti(a.y,l.y,e),scale:ti(a.scale??1,l.scale??1,e)}}else r[o]=a??l}return{cam:s,place:r,audience:ti(n.audience??0,t.audience??0,e),panel:e>.5?t.panel:n.panel}}class ev{constructor({muted:t=!1}={}){this.muted=t,this.ctx=null,this.gain=null,this.buffer=null,this.src=null,this.offset=0,this.startedAt=0,this.playing=!1,this.duration=0,this.audioLead=0,this.epoch=0,this.listeners=new Set,this.ended=!1}unlock(){if(!this.muted){if(!this.ctx)try{this.ctx=new AudioContext({latencyHint:"playback"}),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination),this.ctx.onstatechange=()=>{this.ctx.state!=="running"&&this.playing&&this.ctx.state!=="suspended"&&this.pause()}}catch(t){console.warn("audio: no AudioContext, running silent",t),this.muted=!0;return}this.ctx.resume().catch(()=>{})}}async decode(t){return this.muted||!this.ctx?null:await this.ctx.decodeAudioData(t.slice(0))}load({buffer:t=null,duration:e,audioLead:i=0}){this.stopSource(),this.buffer=this.muted?null:t,this.duration=e,this.audioLead=i,this.offset=0,this.playing=!1,this.ended=!1,this.epoch++,this.emit()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){for(const t of this.listeners)t()}get isPlaying(){return this.playing}play(){if(!this.playing){if(this.offset>=this.duration-.02){this.offset=this.duration,this.ended=!0,this.emit();return}this.ended=!1,this.ctx&&this.ctx.resume().catch(()=>{}),this.startSource(),this.playing=!0,this.emit()}}pause(){this.playing&&(this.offset=this.time(),this.stopSource(),this.playing=!1,this.emit())}toggle(){this.playing?this.pause():this.play()}seek(t){this.offset=Math.max(0,Math.min(this.duration,t)),this.epoch++,this.ended=!1,this.playing&&(this.stopSource(),this.startSource()),this.emit()}time(){if(!this.playing)return this.offset;const t=this.offset+Math.max(0,this.now()-this.startedAt);return t>=this.duration?(this.playing=!1,this.offset=this.duration,this.ended=!0,this.stopSource(),queueMicrotask(()=>this.emit()),this.duration):t}now(){if(!this.buffer||!this.ctx)return performance.now()/1e3;const t=this.ctx,e=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(e&&e.contextTime!==void 0&&e.performanceTime!==void 0&&e.contextTime>0){const i=e.contextTime+Math.max(0,(performance.now()-e.performanceTime)/1e3);return Math.min(i,t.currentTime)}return t.currentTime-(t.outputLatency||t.baseLatency||0)}startSource(){if(!this.buffer||!this.ctx){this.startedAt=this.now();return}const t=this.ctx,e=t.createBufferSource();e.buffer=this.buffer,e.connect(this.gain),this.src=e;const i=t.currentTime+.02;this.startedAt=i,e.start(i,this.offset+this.audioLead)}stopSource(){const t=this.src;if(this.src=null,!!t){try{t.stop()}catch{}t.disconnect()}}setVolume(t){this.gain&&(this.gain.gain.value=t)}}const nv={verooo:{name:"ver.ooo 🗿",handle:"@ver.ooo",title:"In line for the pen",guest:!0,body:{female:0,child:0},f0:96,rate:.96,accent:.2,source:{breathiness:.4,tension:.4,brightness:.05},pan:-.25},dave:{name:"Dave",handle:"@dave.9000ish.uk",title:"Made the coffee simulator",guest:!0,body:{female:.1,child:0},f0:86,rate:.94,accent:.16,source:{tension:.6,brightness:.45},pan:-.4},amber:{name:"Amber 🌸",handle:"@shimmermathlabs.com",title:"Owner, one pink mug",guest:!0,body:{female:1,child:0},f0:250,source:{breathiness:.25,tension:.35,brightness:0}},mokkenstorm:{name:"👩‍💻 tbd : Option<name>",handle:"@mokkenstorm.dev",title:"Made ringmate",guest:!0,body:{female:.8,child:.25},f0:262,rate:.96,accent:.2,source:{tension:.5},pan:-.55},minormobius:{name:"Minor Mobius",handle:"@minormobius.bsky.social",title:"Asked for a link",guest:!0,body:{female:.5,child:0},f0:215,rate:.96,accent:.2,source:{tension:.62,brightness:.5},pan:-.35},david:{name:"David",handle:"@yonderdavid.bsky.social",title:"Supplied the missing cat",guest:!0,body:{female:0,child:0},f0:172,rate:.94,accent:.12,source:{tension:.55,brightness:.4},pan:-.25},davidcrespo:{name:"conputer dipshit",handle:"@davidcrespo.bsky.social",title:"Posted the chart",body:{female:.25,child:.1},f0:140,source:{tension:.62,brightness:.5},guest:!0},moultano:{name:"Ryan Moulton",handle:"@moultano.bsky.social",title:"Quoted the chart",body:{female:1,child:0},f0:270,source:{tension:.62,brightness:.5},guest:!0},"hy-bass":{plays:"hy",name:"Hy Oid",title:"Bandleader, The Formants",body:{female:0,child:0},f0:84,rate:.95,accent:.14,source:{tension:.45},pan:-.5}},iv={verooo:{color:"#6f9bff",costume:{kind:"hoodie",color:"#6f9bff"}},dave:{color:"#d99a5b",costume:{kind:"cardigan",color:"#d99a5b",shirt:"#f4e4c8",trim:"#f4e4c8"}},amber:{color:"#a98bff",costume:{kind:"cardigan",color:"#8a6cf0",shirt:"#e6ddff",trim:"#cbbcff"}},mokkenstorm:{color:"#5be381",costume:{kind:"tee",color:"#5be381",print:"1D",trim:"#eef6f8"}},minormobius:{color:"#c79bff",costume:{kind:"tee",color:"#c79bff",print:"4D",trim:"#eef6f8"}},david:{color:"#4fd8c4",costume:{kind:"cardigan",color:"#4fd8c4",shirt:"#e6fbf7",trim:"#e6fbf7"}},davidcrespo:{color:"#7cc4ff",costume:{kind:"hoodie",color:"#4f93d6",trim:"#cfe9ff"}},moultano:{color:"#ee7dff",costume:{kind:"labcoat",color:"#e9c8ff",shirt:"#f6e6ff",tie:"#b84de0",trim:"#ee7dff"}}},va={id:"002-2026-w47",number:2,title:"Eighty-Eight Replies, One Pen",airDate:"2026-11-21",rundown:["made-pen-plotter-replies","bluesky-account","interview-yonderdavid","riemann-breaking-news","making-of-inward","top-chicken","made-polyhedral-coffee-simulator","made-mobius-chess-ringmate","music-alt"]},Gh=n=>Object.fromEntries(Object.entries(n).map(([t,e])=>[t.split("/").at(-2),e])),Vh=Gh(Object.assign({"/../../episodes/002-2026-w47/segments/bluesky-account/index.js":()=>Te(()=>import("./index-8IueizZF.js"),__vite__mapDeps([0,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/interview-yonderdavid/index.js":()=>Te(()=>import("./index-C8KnCssF.js"),__vite__mapDeps([3,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/made-mobius-chess-ringmate/index.js":()=>Te(()=>import("./index-BioRfXy3.js"),[],import.meta.url),"/../../episodes/002-2026-w47/segments/made-pen-plotter-replies/index.js":()=>Te(()=>import("./index-CFzkkllz.js"),__vite__mapDeps([4,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/made-polyhedral-coffee-simulator/index.js":()=>Te(()=>import("./index-C4QvPK-E.js"),[],import.meta.url),"/../../episodes/002-2026-w47/segments/making-of-inward/index.js":()=>Te(()=>import("./index-DMPeYZwx.js"),__vite__mapDeps([5,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/music-alt/index.js":()=>Te(()=>import("./index-yPCyiota.js"),__vite__mapDeps([6,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/riemann-breaking-news/index.js":()=>Te(()=>import("./index-CP1vT08V.js"),__vite__mapDeps([7,1,2]),import.meta.url),"/../../episodes/002-2026-w47/segments/top-chicken/index.js":()=>Te(()=>import("./index-CsstVoCq.js"),__vite__mapDeps([8,1,2]),import.meta.url)})),Sc=Gh(Object.assign({"/../../episodes/002-2026-w47/segments/bluesky-account/cues.json":()=>Te(()=>import("./cues-CF77FyrF.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/interview-yonderdavid/cues.json":()=>Te(()=>import("./cues-Ctn-IpWE.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/made-mobius-chess-ringmate/cues.json":()=>Te(()=>import("./cues-B0qYHmA2.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/made-pen-plotter-replies/cues.json":()=>Te(()=>import("./cues-BHt2PFCN.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/made-polyhedral-coffee-simulator/cues.json":()=>Te(()=>import("./cues-BlMAEOmm.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/making-of-inward/cues.json":()=>Te(()=>import("./cues-bMP9jWMS.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/music-alt/cues.json":()=>Te(()=>import("./cues-Bc6exkpB.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/riemann-breaking-news/cues.json":()=>Te(()=>import("./cues-wOL0-og0.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/002-2026-w47/segments/top-chicken/cues.json":()=>Te(()=>import("./cues-DIuvPh9Q.js"),[],import.meta.url).then(n=>n.default)})),sv={bot:{name:"A website bot",title:"Builds it",body:{female:.5,child:.4},f0:275,rate:1,accent:.06,source:{tension:.7,brightness:.6,breathiness:.02},pan:.45},norvid:{name:"norvid_studies",handle:"@norvid-studies.bsky.social",title:"Crow of claims",guest:!0,body:{female:.25,child:.15},f0:160,rate:1.2,accent:.1,source:{tension:.66,roughness:.5,fry:.2,brightness:.5},pan:-.25},abel:{name:"Abel",handle:"@abeliansoup.bsky.social",title:"Abeliancorp",guest:!0,body:{female:0,child:0},f0:92,rate:1.26,accent:.24,source:{breathiness:.55,tension:.35,brightness:.1},pan:-.5},samantha:{name:"Samantha",handle:"@samantha.wiki",title:"The Simcluster Channel",guest:!0,body:{female:1,child:.15},f0:228,rate:1.08,accent:.32,source:{breathiness:.08,brightness:.5},pan:-.2},borjev:{name:"BorJev",handle:"@borjev.bsky.social",title:"Abel's bot · opt-in only",guest:!0,body:{female:.1,child:.4},f0:178,rate:.95,accent:.05,source:{tension:.62,roughness:.6,brightness:.3,drift:40},pan:-.6}},rv={bot:["#5effc8",{kind:"terminal",color:"#5effc8",model:"WEBSITE-BOT",text:["> npm create site","> it builds!","> deploy: yes","> PARTY!"],holds:"popper"},{scale:.85}],norvid:["#9a6bff",{kind:"featherCoat",color:"#5a3d9e",trim:"#b98cff",holds:"clipboard",clipText:"LIST OF"}],abel:["#3fd17a",{kind:"cardigan",color:"#3fd17a",shirt:"#b6ff5c",trim:"#eef6f8"},{prop:"contraption"}],samantha:["#34e0ff",{kind:"blazer",color:"#34e0ff",shirt:"#eef6f8",trim:"#ffffff",holds:"clicker"}],borjev:["#c8956a",{kind:"terminal",color:"#c8956a",model:"BORJEV",text:["> opt-in only","> consent: y","> hello"]},{scale:.62}]},ov=["bot"],av={counterLabel:"BUILT DURING THIS EPISODE",keyLabel:"E"},bc={"001-pilot":{cast:sv,looks:rv,house:ov,stage:av}},lv=Object.freeze({cast:Object.freeze({}),looks:Object.freeze({}),house:Object.freeze([]),stage:Object.freeze({})});function Wh(n){return Object.hasOwn(bc,String(n))?bc[n]:lv}function cv(n,t,e={}){return{...t,...Wh(n).cast,...e}}function hv(n,t,e){const{cast:i={},looks:s={}}=t??{},{CAST:r,LOOKS:o,look:a,defineLook:l,HOUSE_IDS:c,STAGE_TEXT:h}=e,u=Wh(n);Object.assign(r,cv(n,r,i));for(const[f,d]of Object.entries(u.looks))o[f]=a(...d);for(const[f,d]of Object.entries(s))l(f,d);if(c)for(const f of u.house)c.includes(f)||c.push(f);h&&Object.assign(h,u.stage??{})}hv(va.id,{cast:nv,looks:iv},{CAST:ii,LOOKS:is,look:Tn,defineLook:Bh,HOUSE_IDS:Hh,STAGE_TEXT:pa});const Qi=["phLen","orLen","velumPort","f0","voicing","pLung","outRms","noiseLevel","noiseNode","gate"];async function uv(n){const t=new DecompressionStream("gzip"),e=new Blob([n]).stream().pipeThrough(t);return await new Response(e).arrayBuffer()}async function fv(n){let t=new Uint8Array(n);t[0]===31&&t[1]===139&&(n=await uv(n),t=new Uint8Array(n));const e=String.fromCharCode(t[0],t[1],t[2],t[3]);if(e!=="LCT1")throw new Error(`telemetry: bad magic "${e}"`);const s=new DataView(n).getUint32(4,!0),r=new TextDecoder().decode(t.subarray(8,8+s)).replace(/[\s\0]+$/,""),o=JSON.parse(r),a=8+Math.ceil(s/4)*4,l=o.scalars||Qi;for(let h=0;h<Qi.length;h++)l[h]!==Qi[h]&&console.warn(`telemetry: scalar ${h} is "${l[h]}", expected "${Qi[h]}"`);const c=o.blocks.map((h,u)=>new dv(n,a+h.offset,h,o,u));return{fs:o.fs,hop:o.hop,blocks:c}}class dv{constructor(t,e,i,s,r){var m,M;const{frames:o,channels:a,nPh:l,nOr:c}=i;this.index=r,this.frames=o,this.channels=a,this.nPh=l,this.nOr=c,this.body={female:((m=i.body)==null?void 0:m.female)??0,child:((M=i.body)==null?void 0:M.child)??0},this.fs=s.fs,this.hop=s.hop,this.nArtic=s.nArtic,this.scope=s.scope,this.rate=this.fs/this.hop,this.duration=(o-1)*this.hop/this.fs;const h=l+c,u=Qi.length+this.nArtic+3*h+this.scope;if(u!==a)throw new Error(`telemetry block ${r}: ${a} channels, layout says ${u}`);const f=a*8,d=new Float32Array(t.slice(e,e+f)),_=new Uint16Array(t.slice(e+f,e+f+a*o*2)),g=new Float32Array(a*o);for(let v=0;v<a;v++){const E=d[2*v],C=d[2*v+1];let S=0;const w=v*o;for(let B=0;B<o;B++)S=S+_[w+B]&65535,g[w+B]=E+S*C}this.data=g;let p=Qi.length;this.oArtic=p,p+=this.nArtic,this.oPh=p,p+=l,this.oOr=p,p+=c,this.oP=p,p+=h,this.oFlow=p,p+=h,this.oGA=p}makeMessage(){const t=this.nPh+this.nOr;return{type:"telemetry",t:{phLen:0,orLen:0,velumPort:0,f0:0,voicing:0,pLung:0,outRms:0,noiseLevel:0,noiseNode:0,gate:0,clock:0,artic:new Float32Array(this.nArtic),phAreas:new Float32Array(this.nPh),orAreas:new Float32Array(this.nOr),pressureRms:new Float32Array(t),flow:new Float32Array(t),glottalArea:new Float32Array(this.scope),glottalFlow:new Float32Array(this.scope),active:[]},load:0,body:this.body,nPh:this.nPh,nOr:this.nOr,beatStep:-1,_layout:this}}frameAt(t){return t*this.fs/this.hop}fill(t,e,i=0){const s=this.frames;e>0||(e=0),e>s-1&&(e=s-1);const r=Math.floor(e),o=Math.min(s-1,r+1),a=e-r,l=1-a,c=this.data,h=d=>c[d*s+r]*l+c[d*s+o]*a,u=t.t;u.phLen=h(0),u.orLen=h(1),u.velumPort=h(2),u.f0=h(3),u.voicing=h(4),u.pLung=h(5),u.outRms=h(6),u.noiseLevel=h(7),u.noiseNode=c[8*s+(a<.5?r:o)],u.gate=h(9),u.clock=i;const f=(d,_)=>{for(let g=0;g<d.length;g++)d[g]=h(_+g)};return f(u.artic,this.oArtic),f(u.phAreas,this.oPh),f(u.orAreas,this.oOr),f(u.pressureRms,this.oP),f(u.flow,this.oFlow),f(u.glottalArea,this.oGA),t.body=this.body,t}articAt(t,e){const i=this.frames;t=Math.max(0,Math.min(i-1,t));const s=Math.floor(t),r=Math.min(i-1,s+1),o=t-s;for(let a=0;a<this.nArtic;a++){const l=(this.oArtic+a)*i;e[a]=this.data[l+s]*(1-o)+this.data[l+r]*o}return e}}async function pv(n){const t=await fetch(n);if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return fv(await t.arrayBuffer())}const mv=va.rundown,Ec=n=>new URL(n,document.baseURI).href,gv=()=>mv.slice(),Do=n=>!!Vh[n],Ti=new Map;function $h(n){const t=`meta:${n}`;return Ti.has(t)||Ti.set(t,(async()=>{const e=(await Vh[n]()).default??{};let i=e.cues??null;return!i&&Sc[n]&&(i=await Sc[n]()),i||console.info(`segment ${n}: no cues.json yet — it plays silent, with idle heads, for ${e.duration??30}s`),{id:n,module:{id:n,...e},cues:i}})()),Ti.get(t)}function Tc(n,{audio:t=!0}={}){const e=`full:${n}:${t}`;if(!Ti.has(e)){const i=(async()=>{const s=await $h(n),r=s.cues,[o,a]=await Promise.all([r!=null&&r.tele?pv(Ec(r.tele)).catch(l=>(console.warn(`segment ${n}: telemetry failed to load (${l.message}); heads will idle`),null)):null,t&&(r!=null&&r.audio)?fetch(Ec(r.audio)).then(l=>l.ok?l.arrayBuffer():Promise.reject(new Error(`HTTP ${l.status}`))).catch(l=>(console.warn(`segment ${n}: audio failed to load (${l.message}); playing silent`),null)):null]);return{...s,tele:o,bytes:a}})();i.catch(()=>Ti.delete(e)),Ti.set(e,i)}return Ti.get(e)}function _v(n,t){if(typeof(n==null?void 0:n.audioLead)=="number")return n.audioLead;if(!t||!(n!=null&&n.duration))return 0;const e=t.duration-n.duration;return e>.004?Math.min(e,1105/t.sampleRate):0}function wc(n,t){var i;const e=(i=n[t])==null?void 0:i.plays;return e&&e!==t&&n[e]?e:null}function vv(n,t=null){const e=t?new Set([...t].map(o=>wc(n,o)??o)):null,i=Object.entries(n).filter(([o])=>!wc(n,o)&&(!e||e.has(o))),s=[{head:"The Late Cluster"},["with","Larry Nx"],""];s.push({head:"Starring"});for(const[,o]of i)o.guest||s.push([o.title??"",o.name]);const r=i.filter(([,o])=>o.guest);if(r.length){s.push("",{head:"Puppets played the"},{head:"posting personas of"});for(const[,o]of r)s.push(o.handle?[o.name,o.handle]:["",o.name])}return s.push("",{head:"Voices & faces"},"Every voice in this programme","is synthesized by CHIMERA.",""),s.push(["physical models","CHIMERA vocal synth"],["by","jamesondh · MIT"],["github.com","jamesondh/chimera-vocal-synth"],""),s.push("Guests are puppets","playing posting personas.","",{head:"Good night, Bluesky"}),s}const Mv=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];function yv(n){if(!n)return"";const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(n.airDate??"");return[typeof n.number=="number"?`NO. ${String(n.number).padStart(3,"0")}`:"",n.title?String(n.title).toUpperCase():"",t?`${Number(t[3])} ${Mv[Number(t[2])-1]} ${t[1]}`:""].filter(Boolean).join(" · ")}const Uo=388,Io=478,No=352;function xv(n,t,e){const i={size:13,color:x.gold,ls:.3,alpha:.85};if(ae(n,e,i)<=No)return vt(n,e,Uo,Io,i);for(const[a,l]of[[12,.22],[11,.16]]){const c={...i,size:a,ls:l};if(ae(n,e,c)<=No)return vt(n,e,Uo,Io,c)}const s={...i,size:12,ls:.2},r=e.split(" · "),o=[];for(const a of r){const l=o[o.length-1];l!==void 0&&ae(n,`${l} · ${a}`,s)<=No?o[o.length-1]=`${l} · ${a}`:o.push(a)}o.forEach((a,l)=>vt(n,a,Uo,Io-(o.length-1-l)*18,s))}function Sv(n=[],t=null){const e=yv(t);return{id:"title",title:"The Late Cluster",duration:1e9,cast:["larry"],direct(i,s){s.onAir=!1,s.set.chair=s.set.couch=!1,s.shot("title");const r=We(i*.13,77),o=s.puppet("larry");r>.45?o.lookAt("left"):r<-.55&&o.lookAt(Math.PI/2+.55).nod(-.12)},drawFront(i,s,r){if(zh(i,92,262,.98,{t:s}),e&&xv(i,t,e),n.length){vt(i,"TONIGHT",98,478,{size:17,color:x.sky,ls:.5,weight:"m"}),Ot(i,98,490,330,490,x.sky,1.2,{alpha:.6});const o=n.slice(0,10).map(l=>String(l).split(":")[0].trim().toUpperCase()),a=Math.ceil(o.length/2);o.forEach((l,c)=>{const h=o.length>5?Math.floor(c/a):0,u=o.length>5?c%a:c,f=98+h*290,d=514+u*22;vt(i,String(c+1).padStart(2,"0"),f,d,{size:12,color:x.gold,ls:.1,alpha:.8}),vt(i,l,f+28,d,{size:14,color:x.white,ls:.12,alpha:.9})})}}}}function bv(n,t){return{id:"production",title:n,duration:2.6,cast:[],drift:!0,direct(e,i){i.shot("wide",{band:!1}),i.set.dim=.7,i.onAir=!1},drawFront(e,i,s){const r=Math.min(qe.outCubic(ie(i/.4)),1-ie((i-2.2)/.4));e.save(),e.globalAlpha=.88*r,e.fillStyle="#000",e.fillRect(0,0,1280,720),e.restore(),xe(e,360,250,560,200,{color:x.amber,cut:12,width:1.6,alpha:r}),vt(e,`SEGMENT ${String(t).padStart(2,"0")}`,640,300,{size:14,align:"center",color:x.sky,ls:.5,alpha:r}),vt(e,String(n).toUpperCase(),640,350,{size:30,align:"center",color:x.white,ls:.2,weight:"m",alpha:r}),vt(e,"IN PRODUCTION",640,400,{size:16,align:"center",color:x.amber,ls:.45,alpha:r*(.6+.4*Math.sin(i*5))}),Es(e,880,262,{scale:.5,perched:!0,facing:-1,alpha:r})}}}function Ev(n=null){return vv(ii,n)}function Tv(n=null){const t=Ev(n);return{id:"end",title:"Good night",duration:1e9,cast:["larry","hy","al","pete","dee"],direct(e,i){i.shot("wide"),i.onAir=!1,i.set.dim=.55,i.music={active:!0,beat:e*2,n:Math.floor(e*2),phase:e*2%1,pulse:Math.exp(-(e*2%1)*4.5),bar:Math.floor(e/2)},i.puppet("larry").nod(.05*Math.sin(e*2))},drawFront(e,i,s){const r=qe.outCubic(ie(Gn(.2,1.4,i)));zh(e,640,200,.62,{t:i,align:"center",alpha:r});const o={x:370,y:300,w:560,h:270};e.save(),e.globalAlpha=.75*r,e.fillStyle="#000",e.fillRect(o.x,o.y,o.w,o.h),e.restore();const a=34,l=t.reduce((c,h)=>c+(h!=null&&h.head?51:34),0)+o.h;Ch(e,t,Math.max(0,i-1)*a%l/a,{rect:o,speed:a,split:.44})}}}const wv={play:'<path d="M7 4.5 L17 10 L7 15.5 Z"/>',pause:'<path d="M6.5 4.5 V15.5 M13.5 4.5 V15.5"/>',restart:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',prev:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',next:'<path d="M15 4.5 V15.5"/><path d="M4.5 4.5 L12.5 10 L4.5 15.5 Z"/>',list:'<path d="M4 6 H16 M4 10 H16 M4 14 H16"/>',cc:'<rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M8.6 8.2 A2 2 0 1 0 8.6 11.8 M14.2 8.2 A2 2 0 1 0 14.2 11.8"/>',full:'<path d="M3.5 8 V3.5 H8 M12 3.5 H16.5 V8 M16.5 12 V16.5 H12 M8 16.5 H3.5 V12"/>'},gi=n=>`<svg viewBox="0 0 20 20" aria-hidden="true">${wv[n]}</svg>`,Ac=n=>(n=Math.max(0,n),`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,"0")}`);function Av(n,t){n.innerHTML=`
    <button class="ic" data-k="play" title="Play / pause (space)" aria-label="Play">${gi("play")}</button>
    <button class="ic" data-k="restart" title="Restart segment" aria-label="Restart segment">${gi("restart")}</button>
    <button class="ic" data-k="next" title="Next segment (n)" aria-label="Next segment">${gi("next")}</button>
    <div class="seek" role="slider" tabindex="0" aria-label="Position in segment" aria-valuemin="0">
      <div class="seek-title"></div>
      <div class="seek-track"><div class="seek-fill"></div><div class="seek-marks"></div></div>
    </div>
    <span class="time">0:00 / 0:00</span>
    <div class="chap-wrap">
      <button class="ic" data-k="list" title="Segments" aria-label="Segments" aria-expanded="false">${gi("list")}</button>
      <ol class="chapters" hidden></ol>
    </div>
    <button class="ic on" data-k="cc" title="Captions (c)" aria-label="Captions" aria-pressed="true">${gi("cc")}</button>
    <button class="ic" data-k="full" title="Fullscreen (f)" aria-label="Fullscreen">${gi("full")}</button>`;const e=M=>n.querySelector(M),i=e("[data-k=play]"),s=e("[data-k=cc]"),r=e("[data-k=list]"),o=e(".seek"),a=e(".seek-fill"),l=e(".seek-title"),c=e(".time"),h=e(".seek-marks"),u=e(".chapters");i.onclick=()=>t.toggle(),e("[data-k=restart]").onclick=()=>t.restart(),e("[data-k=next]").onclick=()=>t.next(),s.onclick=()=>t.captions(),e("[data-k=full]").onclick=()=>t.fullscreen(),r.onclick=M=>{M.stopPropagation(),u.hidden=!u.hidden,r.setAttribute("aria-expanded",String(!u.hidden))},document.addEventListener("click",M=>{!u.hidden&&!n.contains(M.target)&&(u.hidden=!0,r.setAttribute("aria-expanded","false"))});let f=0,d=0;const _=M=>{const v=o.querySelector(".seek-track").getBoundingClientRect(),E=Math.min(1,Math.max(0,(M.clientX-v.left)/v.width));t.seek(d+E*(f-d))};let g=!1;o.addEventListener("pointerdown",M=>{g=!0,o.setPointerCapture(M.pointerId),_(M)}),o.addEventListener("pointermove",M=>g&&_(M)),o.addEventListener("pointerup",()=>g=!1),o.addEventListener("keydown",M=>{(M.key==="ArrowLeft"||M.key==="ArrowRight")&&(M.stopPropagation(),t.seekBy(M.key==="ArrowLeft"?-5:5))});let p="",m=null;return{update(M){M.playing!==m&&(m=M.playing,i.innerHTML=gi(M.playing?"pause":"play"),i.setAttribute("aria-label",M.playing?"Pause":"Play")),s.classList.toggle("on",M.captions),s.setAttribute("aria-pressed",String(M.captions)),f=M.duration,d=M.start;const v=f>d?(M.t-d)/(f-d):0;a.style.width=`${(Math.max(0,Math.min(1,v))*100).toFixed(2)}%`,l.textContent=M.title??"",c.textContent=`${Ac(M.t)} / ${Ac(f)}`,o.setAttribute("aria-valuemax",String(Math.round(f))),o.setAttribute("aria-valuenow",String(Math.round(M.t))),n.classList.toggle("disabled",!M.enabled);const E=JSON.stringify([M.segments,M.index,M.marks]);if(E!==p){p=E,u.innerHTML="",M.segments.forEach((C,S)=>{const w=document.createElement("li"),B=document.createElement("button");B.innerHTML=`<span class="n">${String(S+1).padStart(2,"0")}</span> ${C.title}`,S===M.index&&B.classList.add("cur"),B.onclick=()=>{u.hidden=!0,t.jump(S)},w.append(B),u.append(w)}),h.innerHTML="";for(const C of M.marks??[]){const S=document.createElement("i");S.style.left=`${((C-d)/(f-d)*100).toFixed(2)}%`,h.append(S)}}}}}function Rv({stage:n,makeShow:t,from:e=0,to:i,start:s=0,fps:r=30,every:o=2}){const a=t(),l={samples:new Map},c=1/r,h=Math.max(0,Math.round(s*r)),u=Math.round(i*r);for(let f=h;f<=u;f++){const d=f/r;a.frame(d,c,{light:!1,paused:!1}),d>=e-1e-9&&(f-h)%o===0&&n.draw(a,{captions:!0,probe:l})}return k1(Oh(n.captionScale),l.samples)}const Cv=.8;async function Pv(n){const t=document.getElementById("stage-wrap"),e=document.getElementById("stage"),i=document.getElementById("overlay"),s=new Z1(e,t);if(n.capscale!=null){const D=L1(n.capscale);D==null?console.warn(`capscale=${n.capscale}: not a caption scale (0.5 to 3); using 1`):s.captionScale=D}const r=new Map,o=gv();n.seg&&Do(n.seg)&&!o.includes(n.seg)&&o.unshift(n.seg);const a=o.map(D=>Do(D)),l=await Promise.all(o.map((D,O)=>a[O]?$h(D).catch(q=>(console.error(q),null)):null)),c=D=>D.replace(/[-_]+/g," ").replace(/\b\w/g,O=>O.toUpperCase()),h=l.map((D,O)=>{var q;return(D==null?void 0:D.module.title)??((q=D==null?void 0:D.cues)==null?void 0:q.title)??c(o[O])});for(const[D,O]of o.entries())l[D]||console.info(`rundown: ${O} is in production (no segments/${O}/index.js yet) — skipped in playback`);const u=o.map((D,O)=>!!l[O]),f=h.filter((D,O)=>u[O]),d=new Set(l.flatMap(D=>{var O;return D?[...(((O=D.cues)==null?void 0:O.lines)??[]).flatMap(q=>q.who),...D.module.cast??[],...D.module.guests??[]]:[]})),_=new ev({muted:!!n.mute});window.__lc={stage:s,transport:_,puppets:r,get show(){return g.show},get state(){return{mode:g.mode,index:g.index,t:g.show?g.t:0,playing:_.isPlaying,wantPlay:g.wantPlay}}};const g={mode:"title",index:0,show:null,t:0,captions:n.captions!=="0",token:0,epoch:-1,loadingMsg:"",loadingSince:0,wantPlay:!0},p=()=>new _s({module:Sv(f,va),cues:null,tele:null,puppets:r}),m=()=>new _s({module:Tv(d),cues:null,tele:null,puppets:r}),M=D=>new _s({module:bv(h[D],D+1),cues:null,tele:null,puppets:r});if(n.freeze){const D=n.seg??"title",O=Number(n.t??0);let q;if(D==="title")q=p();else if(D==="end")q=m();else if(!Do(D))q=M(Math.max(0,o.indexOf(D)));else{const W=await Tc(D,{audio:!1}),st=()=>{var Z,K;const $=new _s({module:W.module,cues:W.cues,tele:W.tele,puppets:r});try{(K=(Z=W.module).setup)==null||K.call(Z,$)}catch(et){console.error(et)}return $},ut=s.captionScale!==1?Dv(W.cues,O):null,G=ut?Rv({stage:s,makeShow:st,from:ut.t0-.05,to:ut.t1+.7,start:Math.max(0,ut.t0-2.5)}):null;q=st(),G&&(q.captionPlan=G)}const it=1/60,ot=Math.max(0,O-2.5);for(let W=ot;W<O-1e-6;W+=it)q.frame(W,it,{full:!0});q.frame(O,it,{full:!0}),s.draw(q,v()),await new Promise(W=>requestAnimationFrame(W)),s.draw(q,v()),window.__ready=!0,document.body.dataset.ready="1";return}function v(D={}){return{captions:g.captions,...D}}function E(){if(g.mode==="title"||g.mode==="end")return y();if(g.mode==="loading"){g.wantPlay=!g.wantPlay;return}g.mode==="play"&&(g.wantPlay=!_.isPlaying,_.toggle())}const C=Av(document.getElementById("bar"),{toggle:E,restart:()=>g.mode==="play"&&(_.seek(0),g.wantPlay=!0,_.play()),next:()=>g.mode==="play"&&T(g.index+1),seek:D=>g.mode==="play"&&_.seek(D),seekBy:D=>g.mode==="play"&&_.seek(_.time()+D),jump:D=>g.mode==="title"||g.mode==="end"?y(D):T(D),captions:()=>g.captions=!g.captions,fullscreen:B});function S(D,O,q,it){const ot=document.createElement("button");return ot.className=`stage-btn ${O}`,ot.innerHTML=`<span>${D}</span>`,ot.style.left=`${it.x/1280*100}%`,ot.style.top=`${it.y/720*100}%`,ot.onclick=W=>{W.stopPropagation(),q()},i.append(ot),ot}function w(){const D=s.css;D&&Object.assign(i.style,{left:D.x+"px",top:D.y+"px",width:D.w+"px",height:D.h+"px",fontSize:`${D.w/1280*16}px`})}function B(){var O,q;const D=document.getElementById("app");document.fullscreenElement?(O=document.exitFullscreen)==null||O.call(document):(q=D.requestFullscreen)==null||q.call(D).catch(()=>{})}async function y(D=n.seg?Math.max(0,o.indexOf(n.seg)):u.indexOf(!0)>=0?u.indexOf(!0):0){if(_.unlock(),i.replaceChildren(),g.wantPlay=!0,!o.length)return L();await tt(D)}function T(D){if(D<0&&(D=0),g.wantPlay=!0,D>=o.length)return L();tt(D)}const z=new Map;function Q(D){if(!z.has(D)){const O=(async()=>{const q=await Tc(o[D],{audio:!_.muted});let it=null;if(q.bytes&&!_.muted)try{it=await _.decode(q.bytes)}catch(ot){console.warn(`segment ${o[D]}: audio would not decode (${ot.message}); playing silent`)}return{d:q,buffer:it}})();O.catch(()=>z.delete(D)),z.set(D,O)}return z.get(D)}async function tt(D){var q,it;const O=++g.token;if(_.pause(),g.index=D,g.mode="loading",g.loadingMsg=h[D],g.loadingSince=performance.now(),!u[D]){const ot=M(D);_.load({buffer:null,duration:2.6}),g.show=ot,g.mode="play",g.epoch=-1,g.wantPlay&&_.play();return}try{const{d:ot,buffer:W}=await Q(D);if(O!==g.token)return;const st=new _s({module:ot.module,cues:ot.cues,tele:ot.tele,puppets:r});st.captions=g.captions;try{(it=(q=ot.module).setup)==null||it.call(q,st)}catch(ut){console.error(ut)}_.load({buffer:W,duration:st.duration,audioLead:_v(ot.cues,W)}),g.show=st,g.mode="play",g.epoch=-1,g.wantPlay&&_.play();for(const ut of z.keys())ut!==D&&ut!==D+1&&z.delete(ut);u[D+1]&&Q(D+1).catch(()=>{})}catch(ot){if(console.error(ot),O!==g.token)return;g.loadingMsg=`COULD NOT LOAD ${h[D]}: ${ot.message}`,g.loadingSince=-1/0}}function L(){g.token++,_.pause(),g.mode="end",g.show=m(),g.t0=performance.now(),i.replaceChildren(),S("WATCH AGAIN","again",()=>y(),{x:640,y:640})}function N(){g.mode="title",g.show=p(),g.t0=performance.now()-2e3,i.replaceChildren(),S("START THE SHOW","start",()=>y(),{x:96,y:640})}window.addEventListener("keydown",D=>{if(D.target instanceof HTMLInputElement||D.metaKey||D.ctrlKey||D.altKey)return;const O=D.key;if(O===" "||O==="k")D.preventDefault(),D.repeat||E();else if(O==="ArrowLeft"||O==="ArrowRight"){if(g.mode!=="play")return;D.preventDefault(),_.seek(_.time()+(O==="ArrowLeft"?-5:5))}else O==="n"?g.mode==="play"?T(g.index+1):g.mode==="title"&&y():O==="p"?g.mode==="play"?_.time()>3?_.seek(0):T(g.index-1):g.mode==="end"&&y(o.length-1):O==="c"?g.captions=!g.captions:O==="f"&&B()}),e.addEventListener("click",()=>g.mode==="play"&&E());let I=performance.now();function V(D){requestAnimationFrame(V);const O=Math.min(.05,Math.max(.001,(D-I)/1e3));I=D;const q=performance.now();w();let it=g.show,ot=0,W={};g.mode==="play"?(ot=_.time(),_.epoch!==g.epoch&&(g.epoch=_.epoch,it.resetMotion()),_.ended&&(_.ended=!1,g.index+1<o.length?tt(g.index+1):L())):g.mode==="loading"?(ot=g.t,D-g.loadingSince>Cv*1e3&&(W.overlay=st=>Lv(st,g.loadingMsg,D/1e3)),it||(it=g.show=p())):ot=(D-g.t0)/1e3,g.t=ot,it.captions=g.captions,it.frame(ot,O,{light:s.stats.ms>14,paused:g.mode==="play"&&!_.isPlaying}),s.draw(it,v(W)),s.budget(performance.now()-q),C.update({playing:g.mode==="play"?_.isPlaying:g.mode==="loading"&&g.wantPlay,t:g.mode==="play"?Math.max(0,ot):0,start:0,duration:g.mode==="play"?_.duration:0,title:g.mode==="play"||g.mode==="loading"?`${String(g.index+1).padStart(2,"0")} · ${h[g.index]}`:g.mode==="end"?"THAT’S THE SHOW":"THE LATE CLUSTER",index:g.mode==="play"?g.index:-1,segments:o.map((st,ut)=>({id:st,title:h[ut]+(u[ut]?"":" · in production")})),captions:g.captions,enabled:!0,marks:[]})}n.autostart?(g.show=p(),g.t0=performance.now(),y()):N(),requestAnimationFrame(V)}function Lv(n,t,e){n.save(),n.globalAlpha=.85,n.fillStyle="#000",n.fillRect(390,300,500,110),n.restore(),vt(n,"COMING UP",640,336,{size:14,align:"center",color:x.sky,ls:.5}),vt(n,String(t??"").toUpperCase(),640,372,{size:24,align:"center",color:x.white,ls:.2});const i=Math.floor(e*3)%4;vt(n,"·".repeat(i+1),640,398,{size:22,align:"center",color:x.gold})}function Dv(n,t){let e=null;for(const i of(n==null?void 0:n.lines)??[])i.caption===!1||i.kind==="beat"||t>=i.t0-.05&&t<i.t1+.7&&(!e||i.t0>=e.t0)&&(e=i);return e}const Iv=Object.freeze(Object.defineProperty({__proto__:null,startApp:Pv},Symbol.toStringTag,{value:"Module"}));export{E_ as G,S_ as H,ee as M,x as P,Jo as R,Cs as T,ae as a,nt as b,G1 as c,uc as d,vt as e,fh as f,_e as g,Lr as h,xe as i,Dh as j,Dn as k,zh as l,ln as m,da as n,Rt as o,Uh as p,Qe as q,Fe as r,Ot as s,dr as t,Iv as u};
