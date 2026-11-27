const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Coakx3bS.js","./index-Yh4dPL_B.js","./index-jV9Nx-rS.css"])))=>i.map(i=>d[i]);
import{c as ls,r as Pi,a as ie,n as je,e as $e,u as Hn,h as dr,b as Uo,l as Qn,s as Hr,t as Kh,w as Gr,p as Jh,_ as Cc}from"./index-Yh4dPL_B.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ea="160",Qh=0,wa=1,tu=2,Rc=1,eu=2,Bn=3,oi=0,We=1,Gn=2,ii=0,ts=1,Aa=2,Ca=3,Ra=4,Pc=5,Mi=100,nu=101,iu=102,Pa=103,Io=104,su=200,ru=201,ou=202,au=203,No=204,Fo=205,lu=206,cu=207,hu=208,uu=209,fu=210,du=211,pu=212,mu=213,gu=214,_u=0,vu=1,Mu=2,vr=3,yu=4,xu=5,Su=6,bu=7,Lc=0,Eu=1,Tu=2,si=0,wu=1,Au=2,Cu=3,Ru=4,Pu=5,Lu=6,Dc=300,ss=301,rs=302,Oo=303,zo=304,Lr=306,Bo=1e3,pn=1001,ko=1002,He=1003,La=1004,Vr=1005,en=1006,Du=1007,Es=1008,ri=1009,Uu=1010,Iu=1011,na=1012,Uc=1013,ti=1014,ei=1015,Ts=1016,Ic=1017,Nc=1018,Ti=1020,Nu=1021,mn=1023,Fu=1024,Ou=1025,wi=1026,os=1027,zu=1028,Fc=1029,Bu=1030,Oc=1031,zc=1033,Wr=33776,$r=33777,Xr=33778,qr=33779,Da=35840,Ua=35841,Ia=35842,Na=35843,Bc=36196,Fa=37492,Oa=37496,za=37808,Ba=37809,ka=37810,Ha=37811,Ga=37812,Va=37813,Wa=37814,$a=37815,Xa=37816,qa=37817,Ya=37818,ja=37819,Za=37820,Ka=37821,Yr=36492,Ja=36494,Qa=36495,ku=36283,tl=36284,el=36285,nl=36286,kc=3e3,Ai=3001,Hu=3200,Gu=3201,Vu=0,Wu=1,sn="",Re="srgb",Rn="srgb-linear",ia="display-p3",Dr="display-p3-linear",Mr="linear",fe="srgb",yr="rec709",xr="p3",Di=7680,il=519,$u=512,Xu=513,qu=514,Hc=515,Yu=516,ju=517,Zu=518,Ku=519,Ho=35044,sl=35048,rl="300 es",Go=1035,Wn=2e3,Sr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ol=1234567;const ys=Math.PI/180,ws=180/Math.PI;function Xn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Ie(n,t,e){return Math.max(t,Math.min(e,n))}function sa(n,t){return(n%t+t)%t}function Ju(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Qu(n,t,e){return n!==t?(e-n)/(t-n):0}function xs(n,t,e){return(1-e)*n+e*t}function tf(n,t,e,i){return xs(n,t,1-Math.exp(-e*i))}function ef(n,t=1){return t-Math.abs(sa(n,t*2)-t)}function nf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function sf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function rf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function of(n,t){return n+Math.random()*(t-n)}function af(n){return n*(.5-Math.random())}function lf(n){n!==void 0&&(ol=n);let t=ol+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cf(n){return n*ys}function hf(n){return n*ws}function Vo(n){return(n&n-1)===0&&n!==0}function uf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function br(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ff(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),d=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*f,o*c);break;case"YZY":n.set(l*f,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*f,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*d,o*c);break;case"YXY":n.set(l*d,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const df={DEG2RAD:ys,RAD2DEG:ws,generateUUID:Xn,clamp:Ie,euclideanModulo:sa,mapLinear:Ju,inverseLerp:Qu,lerp:xs,damp:tf,pingpong:ef,smoothstep:nf,smootherstep:sf,randInt:rf,randFloat:of,randFloatSpread:af,seededRandom:lf,degToRad:cf,radToDeg:hf,isPowerOfTwo:Vo,ceilPowerOfTwo:uf,floorPowerOfTwo:br,setQuaternionFromProperEuler:ff,normalize:re,denormalize:Tn};class se{constructor(t=0,e=0){se.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,i,s,r,a,o,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=s[0],p=s[3],m=s[6],M=s[1],v=s[4],E=s[7],R=s[2],S=s[5],w=s[8];return r[0]=a*_+o*M+l*R,r[3]=a*p+o*v+l*S,r[6]=a*m+o*E+l*w,r[1]=c*_+h*M+u*R,r[4]=c*p+h*v+u*S,r[7]=c*m+h*E+u*w,r[2]=f*_+d*M+g*R,r[5]=f*p+d*v+g*S,r[8]=f*m+d*E+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(jr.makeScale(t,e)),this}rotate(t){return this.premultiply(jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Zt;function Gc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Er(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function pf(){const n=Er("canvas");return n.style.display="block",n}const al={};function Ss(n){n in al||(al[n]=!0,console.warn(n))}const ll=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),cl=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Is={[Rn]:{transfer:Mr,primaries:yr,toReference:n=>n,fromReference:n=>n},[Re]:{transfer:fe,primaries:yr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Dr]:{transfer:Mr,primaries:xr,toReference:n=>n.applyMatrix3(cl),fromReference:n=>n.applyMatrix3(ll)},[ia]:{transfer:fe,primaries:xr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(cl),fromReference:n=>n.applyMatrix3(ll).convertLinearToSRGB()}},mf=new Set([Rn,Dr]),oe={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!mf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Is[t].toReference,s=Is[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Is[n].primaries},getTransfer:function(n){return n===sn?Mr:Is[n].transfer}};function es(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ui;class Vc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ui===void 0&&(Ui=Er("canvas")),Ui.width=t.width,Ui.height=t.height;const i=Ui.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Er("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=es(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(es(e[i]/255)*255):e[i]=es(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gf=0;class Wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Xn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Kr(s[a].image)):r.push(Kr(s[a]))}else r=Kr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Kr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _f=0;class Ze extends cs{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=pn,s=pn,r=en,a=Es,o=mn,l=ri,c=Ze.DEFAULT_ANISOTROPY,h=sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Xn(),this.name="",this.source=new Wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ai?Re:sn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bo:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case ko:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bo:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case ko:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Re?Ai:kc}set encoding(t){Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Ai?Re:sn}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=Dc;Ze.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,E=(d+1)/2,R=(m+1)/2,S=(h+f)/4,w=(u+_)/4,k=(g+p)/4;return v>E&&v>R?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=S/i,r=w/i):E>R?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=S/s,r=k/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=w/r,s=k/r),this.set(i,s,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vf extends cs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:1};i.encoding!==void 0&&(Ss("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ai?Re:sn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Ze(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends vf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class $c extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mf extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let p=1-o;const m=l*f+c*d+h*g+u*_,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const R=Math.sqrt(v),S=Math.atan2(R,m*M);p=Math.sin(p*S)/R,o=Math.sin(o*S)/R}const E=o*M;if(l=l*p+f*E,c=c*p+d*E,h=h*p+g*E,u=u*p+_*E,p===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>u){const d=2*Math.sqrt(1+i-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-i-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,e=0,i=0){G.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jr.copy(this).projectOnVector(t),this.sub(Jr)}reflect(t){return this.sub(Jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new G,hl=new hs;class li{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ns.copy(i.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),Fs.subVectors(this.max,ds),Ii.subVectors(t.a,ds),Ni.subVectors(t.b,ds),Fi.subVectors(t.c,ds),Yn.subVectors(Ni,Ii),jn.subVectors(Fi,Ni),ui.subVectors(Ii,Fi);let e=[0,-Yn.z,Yn.y,0,-jn.z,jn.y,0,-ui.z,ui.y,Yn.z,0,-Yn.x,jn.z,0,-jn.x,ui.z,0,-ui.x,-Yn.y,Yn.x,0,-jn.y,jn.x,0,-ui.y,ui.x,0];return!Qr(e,Ii,Ni,Fi,Fs)||(e=[1,0,0,0,1,0,0,0,1],!Qr(e,Ii,Ni,Fi,Fs))?!1:(Os.crossVectors(Yn,jn),e=[Os.x,Os.y,Os.z],Qr(e,Ii,Ni,Fi,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Un=[new G,new G,new G,new G,new G,new G,new G,new G],ln=new G,Ns=new li,Ii=new G,Ni=new G,Fi=new G,Yn=new G,jn=new G,ui=new G,ds=new G,Fs=new G,Os=new G,fi=new G;function Qr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){fi.fromArray(n,r);const o=s.x*Math.abs(fi.x)+s.y*Math.abs(fi.y)+s.z*Math.abs(fi.z),l=t.dot(fi),c=e.dot(fi),h=i.dot(fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const yf=new li,ps=new G,to=new G;class Rs{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):yf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ps,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(to.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(to)),this.expandByPoint(ps.copy(t.center).sub(to))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new G,eo=new G,zs=new G,Zn=new G,no=new G,Bs=new G,io=new G;class xf{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){eo.copy(t).add(e).multiplyScalar(.5),zs.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(eo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(zs),o=Zn.dot(this.direction),l=-Zn.dot(zs),c=Zn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(eo).addScaledVector(zs,f),d}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,s,r){no.subVectors(e,t),Bs.subVectors(i,t),io.crossVectors(no,Bs);let a=this.direction.dot(io),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const l=o*this.direction.dot(Bs.crossVectors(Zn,Bs));if(l<0)return null;const c=o*this.direction.dot(no.cross(Zn));if(c<0||l+c>a)return null;const h=-o*Zn.dot(io);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,i,s,r,a,o,l,c,h,u,f,d,g,_,p){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,d,g,_,p)}set(t,e,i,s,r,a,o,l,c,h,u,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Oi.setFromMatrixColumn(t,0).length(),r=1/Oi.setFromMatrixColumn(t,1).length(),a=1/Oi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sf,t,bf)}lookAt(t,e,i){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Kn.crossVectors(i,qe),Kn.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Kn.crossVectors(i,qe)),Kn.normalize(),ks.crossVectors(qe,Kn),s[0]=Kn.x,s[4]=ks.x,s[8]=qe.x,s[1]=Kn.y,s[5]=ks.y,s[9]=qe.y,s[2]=Kn.z,s[6]=ks.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],p=i[10],m=i[14],M=i[3],v=i[7],E=i[11],R=i[15],S=s[0],w=s[4],k=s[8],y=s[12],T=s[1],O=s[5],J=s[9],tt=s[13],L=s[2],N=s[6],I=s[10],W=s[14],q=s[3],Y=s[7],at=s[11],U=s[15];return r[0]=a*S+o*T+l*L+c*q,r[4]=a*w+o*O+l*N+c*Y,r[8]=a*k+o*J+l*I+c*at,r[12]=a*y+o*tt+l*W+c*U,r[1]=h*S+u*T+f*L+d*q,r[5]=h*w+u*O+f*N+d*Y,r[9]=h*k+u*J+f*I+d*at,r[13]=h*y+u*tt+f*W+d*U,r[2]=g*S+_*T+p*L+m*q,r[6]=g*w+_*O+p*N+m*Y,r[10]=g*k+_*J+p*I+m*at,r[14]=g*y+_*tt+p*W+m*U,r[3]=M*S+v*T+E*L+R*q,r[7]=M*w+v*O+E*N+R*Y,r[11]=M*k+v*J+E*I+R*at,r[15]=M*y+v*tt+E*W+R*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*d-i*l*d)+_*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+p*(+e*c*u-e*o*d-r*a*u+i*a*d+r*o*h-i*c*h)+m*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],M=u*p*c-_*f*c+_*l*d-o*p*d-u*l*m+o*f*m,v=g*f*c-h*p*c-g*l*d+a*p*d+h*l*m-a*f*m,E=h*_*c-g*u*c+g*o*d-a*_*d-h*o*m+a*u*m,R=g*u*l-h*_*l-g*o*f+a*_*f+h*o*p-a*u*p,S=e*M+i*v+s*E+r*R;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/S;return t[0]=M*w,t[1]=(_*f*r-u*p*r-_*s*d+i*p*d+u*s*m-i*f*m)*w,t[2]=(o*p*r-_*l*r+_*s*c-i*p*c-o*s*m+i*l*m)*w,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*d-i*l*d)*w,t[4]=v*w,t[5]=(h*p*r-g*f*r+g*s*d-e*p*d-h*s*m+e*f*m)*w,t[6]=(g*l*r-a*p*r-g*s*c+e*p*c+a*s*m-e*l*m)*w,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*w,t[8]=E*w,t[9]=(g*u*r-h*_*r-g*i*d+e*_*d+h*i*m-e*u*m)*w,t[10]=(a*_*r-g*o*r+g*i*c-e*_*c-a*i*m+e*o*m)*w,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*d-e*o*d)*w,t[12]=R*w,t[13]=(h*_*s-g*u*s+g*i*f-e*_*f-h*i*p+e*u*p)*w,t[14]=(g*o*s-a*_*s-g*i*l+e*_*l+a*i*p-e*o*p)*w,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,_=a*h,p=a*u,m=o*u,M=l*c,v=l*h,E=l*u,R=i.x,S=i.y,w=i.z;return s[0]=(1-(_+m))*R,s[1]=(d+E)*R,s[2]=(g-v)*R,s[3]=0,s[4]=(d-E)*S,s[5]=(1-(f+m))*S,s[6]=(p+M)*S,s[7]=0,s[8]=(g+v)*w,s[9]=(p-M)*w,s[10]=(1-(f+_))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Oi.set(s[0],s[1],s[2]).length();const a=Oi.set(s[4],s[5],s[6]).length(),o=Oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const c=1/r,h=1/a,u=1/o;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Wn){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let d,g;if(o===Wn)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Sr)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Wn){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,d=(i+s)*h;let g,_;if(o===Wn)g=(a+r)*u,_=-2*u;else if(o===Sr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Oi=new G,cn=new Te,Sf=new G(0,0,0),bf=new G(1,1,1),Kn=new G,ks=new G,qe=new G,ul=new Te,fl=new hs;class Ps{constructor(t=0,e=0,i=0,s=Ps.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ul.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ul,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fl.setFromEuler(this),this.setFromQuaternion(fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ps.DEFAULT_ORDER="XYZ";class Xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ef=0;const dl=new G,zi=new hs,Nn=new Te,Hs=new G,ms=new G,Tf=new G,wf=new hs,pl=new G(1,0,0),ml=new G(0,1,0),gl=new G(0,0,1),Af={type:"added"},Cf={type:"removed"};class Ke extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ke.DEFAULT_UP.clone();const t=new G,e=new Ps,i=new hs,s=new G(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Te},normalMatrix:{value:new Zt}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=Ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.multiply(zi),this}rotateOnWorldAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.premultiply(zi),this}rotateX(t){return this.rotateOnAxis(pl,t)}rotateY(t){return this.rotateOnAxis(ml,t)}rotateZ(t){return this.rotateOnAxis(gl,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pl,t)}translateY(t){return this.translateOnAxis(ml,t)}translateZ(t){return this.translateOnAxis(gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Hs.copy(t):Hs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(ms,Hs,this.up):Nn.lookAt(Hs,ms,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),zi.setFromRotationMatrix(Nn),this.quaternion.premultiply(zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Af)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,wf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++){const r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ke.DEFAULT_UP=new G(0,1,0);Ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new G,Fn=new G,so=new G,On=new G,Bi=new G,ki=new G,_l=new G,ro=new G,oo=new G,ao=new G;let Gs=!1;class dn{constructor(t=new G,e=new G,i=new G){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),hn.subVectors(t,e),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){hn.subVectors(s,e),Fn.subVectors(i,e),so.subVectors(t,e);const a=hn.dot(hn),o=hn.dot(Fn),l=hn.dot(so),c=Fn.dot(Fn),h=Fn.dot(so),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getUV(t,e,i,s,r,a,o,l){return Gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gs=!0),this.getInterpolation(t,e,i,s,r,a,o,l)}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(a,On.y),l.addScaledVector(o,On.z),l)}static isFrontFacing(t,e,i,s){return hn.subVectors(i,e),Fn.subVectors(t,e),hn.cross(Fn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),hn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return Gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gs=!0),dn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Bi.subVectors(s,i),ki.subVectors(r,i),ro.subVectors(t,i);const l=Bi.dot(ro),c=ki.dot(ro);if(l<=0&&c<=0)return e.copy(i);oo.subVectors(t,s);const h=Bi.dot(oo),u=ki.dot(oo);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Bi,a);ao.subVectors(t,r);const d=Bi.dot(ao),g=ki.dot(ao);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(ki,o);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return _l.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(_l,o);const m=1/(p+_+f);return a=_*m,o=f*m,e.copy(i).addScaledVector(Bi,a).addScaledVector(ki,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function lo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ne{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=sa(t,1),e=Ie(e,0,1),i=Ie(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=lo(a,r,t+1/3),this.g=lo(a,r,t),this.b=lo(a,r,t-1/3)}return oe.toWorkingColorSpace(this,s),this}setStyle(t,e=Re){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const i=qc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return oe.fromWorkingColorSpace(De.copy(this),t),Math.round(Ie(De.r*255,0,255))*65536+Math.round(Ie(De.g*255,0,255))*256+Math.round(Ie(De.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(De.copy(this),e);const i=De.r,s=De.g,r=De.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Re){oe.fromWorkingColorSpace(De.copy(this),t);const e=De.r,i=De.g,s=De.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Vs);const i=xs(Jn.h,Vs.h,e),s=xs(Jn.s,Vs.s,e),r=xs(Jn.l,Vs.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new ne;ne.NAMES=qc;let Rf=0;class Ur extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=ts,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=No,this.blendDst=Fo,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==No&&(i.blendSrc=this.blendSrc),this.blendDst!==Fo&&(i.blendDst=this.blendDst),this.blendEquation!==Mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Yc extends Ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new G,Ws=new se;class gn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ws.fromBufferAttribute(this,e),Ws.applyMatrix3(t),this.setXY(e,Ws.x,Ws.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ho&&(t.usage=this.usage),t}}class jc extends gn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Zc extends gn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Cn extends gn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Pf=0;const tn=new Te,co=new Ke,Hi=new G,Ye=new li,gs=new li,Ee=new G;class qn extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gc(t)?Zc:jc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,i){return tn.makeTranslation(t,e,i),this.applyMatrix4(tn),this}scale(t,e,i){return tn.makeScale(t,e,i),this.applyMatrix4(tn),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Cn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors(Ye.min,gs.min),Ye.expandByPoint(Ee),Ee.addVectors(Ye.max,gs.max),Ye.expandByPoint(Ee)):(Ye.expandByPoint(gs.min),Ye.expandByPoint(gs.max))}Ye.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ee));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(Hi.fromBufferAttribute(t,c),Ee.add(Hi)),s=Math.max(s,i.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<o;T++)c[T]=new G,h[T]=new G;const u=new G,f=new G,d=new G,g=new se,_=new se,p=new se,m=new G,M=new G;function v(T,O,J){u.fromArray(s,T*3),f.fromArray(s,O*3),d.fromArray(s,J*3),g.fromArray(a,T*2),_.fromArray(a,O*2),p.fromArray(a,J*2),f.sub(u),d.sub(u),_.sub(g),p.sub(g);const tt=1/(_.x*p.y-p.x*_.y);isFinite(tt)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-_.y).multiplyScalar(tt),M.copy(d).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(tt),c[T].add(m),c[O].add(m),c[J].add(m),h[T].add(M),h[O].add(M),h[J].add(M))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let T=0,O=E.length;T<O;++T){const J=E[T],tt=J.start,L=J.count;for(let N=tt,I=tt+L;N<I;N+=3)v(i[N+0],i[N+1],i[N+2])}const R=new G,S=new G,w=new G,k=new G;function y(T){w.fromArray(r,T*3),k.copy(w);const O=c[T];R.copy(O),R.sub(w.multiplyScalar(w.dot(O))).normalize(),S.crossVectors(k,O);const tt=S.dot(h[T])<0?-1:1;l[T*4]=R.x,l[T*4+1]=R.y,l[T*4+2]=R.z,l[T*4+3]=tt}for(let T=0,O=E.length;T<O;++T){const J=E[T],tt=J.start,L=J.count;for(let N=tt,I=tt+L;N<I;N+=3)y(i[N+0]),y(i[N+1]),y(i[N+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new G,r=new G,a=new G,o=new G,l=new G,c=new G,h=new G,u=new G;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let m=0;m<h;m++)f[g++]=c[d++]}return new gn(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new Te,di=new xf,$s=new Rs,Ml=new G,Gi=new G,Vi=new G,Wi=new G,ho=new G,Xs=new G,qs=new se,Ys=new se,js=new se,yl=new G,xl=new G,Sl=new G,Zs=new G,Ks=new G;class $n extends Ke{constructor(t=new qn,e=new Yc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Xs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(ho.fromBufferAttribute(u,t),a?Xs.addScaledVector(ho,h):Xs.addScaledVector(ho.sub(e),h))}e.add(Xs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(r),di.copy(t.ray).recast(t.near),!($s.containsPoint(di.origin)===!1&&(di.intersectSphere($s,Ml)===null||di.origin.distanceToSquared(Ml)>(t.far-t.near)**2))&&(vl.copy(r).invert(),di.copy(t.ray).applyMatrix4(vl),!(i.boundingBox!==null&&di.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let E=M,R=v;E<R;E+=3){const S=o.getX(E),w=o.getX(E+1),k=o.getX(E+2);s=Js(this,m,t,i,c,h,u,S,w,k),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=o.getX(p),v=o.getX(p+1),E=o.getX(p+2);s=Js(this,a,t,i,c,h,u,M,v,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let E=M,R=v;E<R;E+=3){const S=E,w=E+1,k=E+2;s=Js(this,m,t,i,c,h,u,S,w,k),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const M=p,v=p+1,E=p+2;s=Js(this,a,t,i,c,h,u,M,v,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Lf(n,t,e,i,s,r,a,o){let l;if(t.side===We?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===oi,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ks);return c<e.near||c>e.far?null:{distance:c,point:Ks.clone(),object:n}}function Js(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Gi),n.getVertexPosition(l,Vi),n.getVertexPosition(c,Wi);const h=Lf(n,t,e,i,Gi,Vi,Wi,Zs);if(h){s&&(qs.fromBufferAttribute(s,o),Ys.fromBufferAttribute(s,l),js.fromBufferAttribute(s,c),h.uv=dn.getInterpolation(Zs,Gi,Vi,Wi,qs,Ys,js,new se)),r&&(qs.fromBufferAttribute(r,o),Ys.fromBufferAttribute(r,l),js.fromBufferAttribute(r,c),h.uv1=dn.getInterpolation(Zs,Gi,Vi,Wi,qs,Ys,js,new se),h.uv2=h.uv1),a&&(yl.fromBufferAttribute(a,o),xl.fromBufferAttribute(a,l),Sl.fromBufferAttribute(a,c),h.normal=dn.getInterpolation(Zs,Gi,Vi,Wi,yl,xl,Sl,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new G,materialIndex:0};dn.getNormal(Gi,Vi,Wi,u.normal),h.face=u}return h}class Ls extends qn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Cn(c,3)),this.setAttribute("normal",new Cn(h,3)),this.setAttribute("uv",new Cn(u,2));function g(_,p,m,M,v,E,R,S,w,k,y){const T=E/w,O=R/k,J=E/2,tt=R/2,L=S/2,N=w+1,I=k+1;let W=0,q=0;const Y=new G;for(let at=0;at<I;at++){const U=at*O-tt;for(let st=0;st<N;st++){const V=st*T-J;Y[_]=V*M,Y[p]=U*v,Y[m]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[p]=0,Y[m]=S>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(st/w),u.push(1-at/k),W+=1}}for(let at=0;at<k;at++)for(let U=0;U<w;U++){const st=f+U+N*at,V=f+U+N*(at+1),et=f+(U+1)+N*(at+1),rt=f+(U+1)+N*at;l.push(st,V,rt),l.push(V,et,rt),q+=6}o.addGroup(d,q,y),d+=q,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Be(n){const t={};for(let e=0;e<n.length;e++){const i=as(n[e]);for(const s in i)t[s]=i[s]}return t}function Df(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Kc(n){return n.getRenderTarget()===null?n.outputColorSpace:oe.workingColorSpace}const ra={clone:as,merge:Be};var Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=Df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Jc extends Ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=Wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nn extends Jc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ys*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,Xi=1;class Nf extends Ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn($i,Xi,t,e);s.layers=this.layers,this.add(s);const r=new nn($i,Xi,t,e);r.layers=this.layers,this.add(r);const a=new nn($i,Xi,t,e);a.layers=this.layers,this.add(a);const o=new nn($i,Xi,t,e);o.layers=this.layers,this.add(o);const l=new nn($i,Xi,t,e);l.layers=this.layers,this.add(l);const c=new nn($i,Xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Wn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Sr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Qc extends Ze{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ss,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ff extends Ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(Ss("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ai?Re:sn),this.texture=new Qc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:en}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ls(5,5,5),r=new ai({name:"CubemapFromEquirect",uniforms:as(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:ii});r.uniforms.tEquirect.value=e;const a=new $n(s,r),o=e.minFilter;return e.minFilter===Es&&(e.minFilter=en),new Nf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const uo=new G,Of=new G,zf=new Zt;class gi{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=uo.subVectors(i,e).cross(Of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(uo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||zf.getNormalMatrix(t),s=this.coplanarPoint(uo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Rs,Qs=new G;class th{constructor(t=new gi,e=new gi,i=new gi,s=new gi,r=new gi,a=new gi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Wn){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],p=s[11],m=s[12],M=s[13],v=s[14],E=s[15];if(i[0].setComponents(l-r,f-c,p-d,E-m).normalize(),i[1].setComponents(l+r,f+c,p+d,E+m).normalize(),i[2].setComponents(l+a,f+h,p+g,E+M).normalize(),i[3].setComponents(l-a,f-h,p-g,E-M).normalize(),i[4].setComponents(l-o,f-u,p-_,E-v).normalize(),e===Wn)i[5].setComponents(l+o,f+u,p+_,E+v).normalize();else if(e===Sr)i[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Qs.x=s.normal.x>0?t.max.x:t.min.x,Qs.y=s.normal.y>0?t.max.y:t.min.y,Qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function eh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Bf(n,t){const e=t.isWebGL2,i=new WeakMap;function s(c,h){const u=c.array,f=c.usage,d=u.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,u,f),c.onUploadCallback();let _;if(u instanceof Float32Array)_=n.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=n.SHORT;else if(u instanceof Uint32Array)_=n.UNSIGNED_INT;else if(u instanceof Int32Array)_=n.INT;else if(u instanceof Int8Array)_=n.BYTE;else if(u instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,h,u){const f=h.array,d=h._updateRange,g=h.updateRanges;if(n.bindBuffer(u,c),d.count===-1&&g.length===0&&n.bufferSubData(u,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];e?n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}d.count!==-1&&(e?n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class oa extends qn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const M=m*f-a;for(let v=0;v<c;v++){const E=v*u-r;g.push(E,-M,0),_.push(0,0,1),p.push(v/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const v=M+c*m,E=M+c*(m+1),R=M+1+c*(m+1),S=M+1+c*m;d.push(v,E,S),d.push(E,R,S)}this.setIndex(d),this.setAttribute("position",new Cn(g,3)),this.setAttribute("normal",new Cn(_,3)),this.setAttribute("uv",new Cn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oa(t.width,t.height,t.widthSegments,t.heightSegments)}}var kf=`#ifdef USE_ALPHAHASH
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
}`,Cd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Rd=`#ifdef USE_LIGHTMAP
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
#endif`,Cp=`#ifdef USE_SKINNING
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
#endif`,Rp=`float specularStrength;
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
}`,$t={alphahash_fragment:kf,alphahash_pars_fragment:Hf,alphamap_fragment:Gf,alphamap_pars_fragment:Vf,alphatest_fragment:Wf,alphatest_pars_fragment:$f,aomap_fragment:Xf,aomap_pars_fragment:qf,batching_pars_vertex:Yf,batching_vertex:jf,begin_vertex:Zf,beginnormal_vertex:Kf,bsdfs:Jf,iridescence_fragment:Qf,bumpmap_pars_fragment:td,clipping_planes_fragment:ed,clipping_planes_pars_fragment:nd,clipping_planes_pars_vertex:id,clipping_planes_vertex:sd,color_fragment:rd,color_pars_fragment:od,color_pars_vertex:ad,color_vertex:ld,common:cd,cube_uv_reflection_fragment:hd,defaultnormal_vertex:ud,displacementmap_pars_vertex:fd,displacementmap_vertex:dd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:gd,colorspace_pars_fragment:_d,envmap_fragment:vd,envmap_common_pars_fragment:Md,envmap_pars_fragment:yd,envmap_pars_vertex:xd,envmap_physical_pars_fragment:Ud,envmap_vertex:Sd,fog_vertex:bd,fog_pars_vertex:Ed,fog_fragment:Td,fog_pars_fragment:wd,gradientmap_pars_fragment:Ad,lightmap_fragment:Cd,lightmap_pars_fragment:Rd,lights_lambert_fragment:Pd,lights_lambert_pars_fragment:Ld,lights_pars_begin:Dd,lights_toon_fragment:Id,lights_toon_pars_fragment:Nd,lights_phong_fragment:Fd,lights_phong_pars_fragment:Od,lights_physical_fragment:zd,lights_physical_pars_fragment:Bd,lights_fragment_begin:kd,lights_fragment_maps:Hd,lights_fragment_end:Gd,logdepthbuf_fragment:Vd,logdepthbuf_pars_fragment:Wd,logdepthbuf_pars_vertex:$d,logdepthbuf_vertex:Xd,map_fragment:qd,map_pars_fragment:Yd,map_particle_fragment:jd,map_particle_pars_fragment:Zd,metalnessmap_fragment:Kd,metalnessmap_pars_fragment:Jd,morphcolor_vertex:Qd,morphnormal_vertex:tp,morphtarget_pars_vertex:ep,morphtarget_vertex:np,normal_fragment_begin:ip,normal_fragment_maps:sp,normal_pars_fragment:rp,normal_pars_vertex:op,normal_vertex:ap,normalmap_pars_fragment:lp,clearcoat_normal_fragment_begin:cp,clearcoat_normal_fragment_maps:hp,clearcoat_pars_fragment:up,iridescence_pars_fragment:fp,opaque_fragment:dp,packing:pp,premultiplied_alpha_fragment:mp,project_vertex:gp,dithering_fragment:_p,dithering_pars_fragment:vp,roughnessmap_fragment:Mp,roughnessmap_pars_fragment:yp,shadowmap_pars_fragment:xp,shadowmap_pars_vertex:Sp,shadowmap_vertex:bp,shadowmask_pars_fragment:Ep,skinbase_vertex:Tp,skinning_pars_vertex:wp,skinning_vertex:Ap,skinnormal_vertex:Cp,specularmap_fragment:Rp,specularmap_pars_fragment:Pp,tonemapping_fragment:Lp,tonemapping_pars_fragment:Dp,transmission_fragment:Up,transmission_pars_fragment:Ip,uv_pars_fragment:Np,uv_pars_vertex:Fp,uv_vertex:Op,worldpos_vertex:zp,background_vert:Bp,background_frag:kp,backgroundCube_vert:Hp,backgroundCube_frag:Gp,cube_vert:Vp,cube_frag:Wp,depth_vert:$p,depth_frag:Xp,distanceRGBA_vert:qp,distanceRGBA_frag:Yp,equirect_vert:jp,equirect_frag:Zp,linedashed_vert:Kp,linedashed_frag:Jp,meshbasic_vert:Qp,meshbasic_frag:tm,meshlambert_vert:em,meshlambert_frag:nm,meshmatcap_vert:im,meshmatcap_frag:sm,meshnormal_vert:rm,meshnormal_frag:om,meshphong_vert:am,meshphong_frag:lm,meshphysical_vert:cm,meshphysical_frag:hm,meshtoon_vert:um,meshtoon_frag:fm,points_vert:dm,points_frag:pm,shadow_vert:mm,shadow_frag:gm,sprite_vert:_m,sprite_frag:vm},ft={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Ve={basic:{uniforms:Be([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Be([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ne(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Be([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Be([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Be([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new ne(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Be([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Be([ft.points,ft.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Be([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Be([ft.common,ft.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Be([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Be([ft.sprite,ft.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Be([ft.common,ft.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Be([ft.lights,ft.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Ve.physical={uniforms:Be([Ve.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const tr={r:0,b:0,g:0};function Mm(n,t,e,i,s,r,a){const o=new ne(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(p,m){let M=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),M=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Lr)?(h===void 0&&(h=new $n(new Ls(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:as(Ve.backgroundCube.uniforms),vertexShader:Ve.backgroundCube.vertexShader,fragmentShader:Ve.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=oe.getTransfer(v.colorSpace)!==fe,(u!==v||f!==v.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=n.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new $n(new oa(2,2),new ai({name:"BackgroundMaterial",uniforms:as(Ve.background.uniforms),vertexShader:Ve.background.vertexShader,fragmentShader:Ve.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=oe.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,d=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(tr,Kc(n)),i.buffers.color.setClear(tr.r,tr.g,tr.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function ym(n,t,e,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=p(null);let c=l,h=!1;function u(L,N,I,W,q){let Y=!1;if(a){const at=_(W,I,N);c!==at&&(c=at,d(c.object)),Y=m(L,W,I,q),Y&&M(L,W,I,q)}else{const at=N.wireframe===!0;(c.geometry!==W.id||c.program!==I.id||c.wireframe!==at)&&(c.geometry=W.id,c.program=I.id,c.wireframe=at,Y=!0)}q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,k(L,N,I,W),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function d(L){return i.isWebGL2?n.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return i.isWebGL2?n.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,N,I){const W=I.wireframe===!0;let q=o[L.id];q===void 0&&(q={},o[L.id]=q);let Y=q[N.id];Y===void 0&&(Y={},q[N.id]=Y);let at=Y[W];return at===void 0&&(at=p(f()),Y[W]=at),at}function p(L){const N=[],I=[],W=[];for(let q=0;q<s;q++)N[q]=0,I[q]=0,W[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:I,attributeDivisors:W,object:L,attributes:{},index:null}}function m(L,N,I,W){const q=c.attributes,Y=N.attributes;let at=0;const U=I.getAttributes();for(const st in U)if(U[st].location>=0){const et=q[st];let rt=Y[st];if(rt===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(rt=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(rt=L.instanceColor)),et===void 0||et.attribute!==rt||rt&&et.data!==rt.data)return!0;at++}return c.attributesNum!==at||c.index!==W}function M(L,N,I,W){const q={},Y=N.attributes;let at=0;const U=I.getAttributes();for(const st in U)if(U[st].location>=0){let et=Y[st];et===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));const rt={};rt.attribute=et,et&&et.data&&(rt.data=et.data),q[st]=rt,at++}c.attributes=q,c.attributesNum=at,c.index=W}function v(){const L=c.newAttributes;for(let N=0,I=L.length;N<I;N++)L[N]=0}function E(L){R(L,0)}function R(L,N){const I=c.newAttributes,W=c.enabledAttributes,q=c.attributeDivisors;I[L]=1,W[L]===0&&(n.enableVertexAttribArray(L),W[L]=1),q[L]!==N&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,N),q[L]=N)}function S(){const L=c.newAttributes,N=c.enabledAttributes;for(let I=0,W=N.length;I<W;I++)N[I]!==L[I]&&(n.disableVertexAttribArray(I),N[I]=0)}function w(L,N,I,W,q,Y,at){at===!0?n.vertexAttribIPointer(L,N,I,q,Y):n.vertexAttribPointer(L,N,I,W,q,Y)}function k(L,N,I,W){if(i.isWebGL2===!1&&(L.isInstancedMesh||W.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const q=W.attributes,Y=I.getAttributes(),at=N.defaultAttributeValues;for(const U in Y){const st=Y[U];if(st.location>=0){let V=q[U];if(V===void 0&&(U==="instanceMatrix"&&L.instanceMatrix&&(V=L.instanceMatrix),U==="instanceColor"&&L.instanceColor&&(V=L.instanceColor)),V!==void 0){const et=V.normalized,rt=V.itemSize,B=e.get(V);if(B===void 0)continue;const z=B.buffer,X=B.type,K=B.bytesPerElement,nt=i.isWebGL2===!0&&(X===n.INT||X===n.UNSIGNED_INT||V.gpuType===Uc);if(V.isInterleavedBufferAttribute){const ot=V.data,F=ot.stride,Et=V.offset;if(ot.isInstancedInterleavedBuffer){for(let vt=0;vt<st.locationSize;vt++)R(st.location+vt,ot.meshPerAttribute);L.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let vt=0;vt<st.locationSize;vt++)E(st.location+vt);n.bindBuffer(n.ARRAY_BUFFER,z);for(let vt=0;vt<st.locationSize;vt++)w(st.location+vt,rt/st.locationSize,X,et,F*K,(Et+rt/st.locationSize*vt)*K,nt)}else{if(V.isInstancedBufferAttribute){for(let ot=0;ot<st.locationSize;ot++)R(st.location+ot,V.meshPerAttribute);L.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ot=0;ot<st.locationSize;ot++)E(st.location+ot);n.bindBuffer(n.ARRAY_BUFFER,z);for(let ot=0;ot<st.locationSize;ot++)w(st.location+ot,rt/st.locationSize,X,et,rt*K,rt/st.locationSize*ot*K,nt)}}else if(at!==void 0){const et=at[U];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(st.location,et);break;case 3:n.vertexAttrib3fv(st.location,et);break;case 4:n.vertexAttrib4fv(st.location,et);break;default:n.vertexAttrib1fv(st.location,et)}}}}S()}function y(){J();for(const L in o){const N=o[L];for(const I in N){const W=N[I];for(const q in W)g(W[q].object),delete W[q];delete N[I]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const N=o[L.id];for(const I in N){const W=N[I];for(const q in W)g(W[q].object),delete W[q];delete N[I]}delete o[L.id]}function O(L){for(const N in o){const I=o[N];if(I[L.id]===void 0)continue;const W=I[L.id];for(const q in W)g(W[q].object),delete W[q];delete I[L.id]}}function J(){tt(),h=!0,c!==l&&(c=l,d(c.object))}function tt(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:J,resetDefaultState:tt,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:O,initAttributes:v,enableAttribute:E,disableUnusedAttributes:S}}function xm(n,t,e,i){const s=i.isWebGL2;let r;function a(h){r=h}function o(h,u){n.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,f){if(f===0)return;let d,g;if(s)d=n,g="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,u,f),e.update(u,r,f)}function c(h,u,f){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Sm(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,E=a||t.has("OES_texture_float"),R=v&&E,S=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:R,maxSamples:S}}function bm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new gi,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const M=r?0:i,v=M*4;let E=m.clippingState||null;l.value=E,E=h(g,f,v,d);for(let R=0;R!==v;++R)E[R]=e[R];m.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,E=d;v!==_;++v,E+=4)a.copy(u[v]).applyMatrix4(M,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Em(n){let t=new WeakMap;function e(a,o){return o===Oo?a.mapping=ss:o===zo&&(a.mapping=rs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Oo||o===zo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ff(l.height/2);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Tm extends Jc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,bl=[.125,.215,.35,.446,.526,.582],yi=20,fo=new Tm,El=new ne;let po=null,mo=0,go=0;const _i=(1+Math.sqrt(5))/2,qi=1/_i,Tl=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,_i,qi),new G(0,_i,-qi),new G(qi,0,_i),new G(-qi,0,_i),new G(_i,qi,0),new G(-_i,qi,0)];class wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(po,mo,go),t.scissorTest=!1,er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ss||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ts,format:mn,colorSpace:Rn,depthBuffer:!1},s=Al(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wm(r)),this._blurMaterial=Am(r,t,e)}return s}_compileMaterial(t){const e=new $n(this._lodPlanes[0],t);this._renderer.compile(e,fo)}_sceneToCubeUV(t,e,i,s){const o=new nn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(El),h.toneMapping=si,h.autoClear=!1;const d=new Yc({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new $n(new Ls,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(El),_=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const v=this._cubeSize;er(s,M*v,m>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ss||t.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $n(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;er(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,fo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Tl[(s-1)%Tl.length];this._blur(t,s-1,s,r,a)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $n(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*yi-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):yi;p>yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${yi}`);const m=[];let M=0;for(let w=0;w<yi;++w){const k=w/_,y=Math.exp(-k*k/2);m.push(y),w===0?M+=y:w<p&&(M+=2*y)}for(let w=0;w<m.length;w++)m[w]=m[w]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const E=this._sizeLods[s],R=3*E*(s>v-Ki?s-v+Ki:0),S=4*(this._cubeSize-E);er(e,R,S,3*E,2*E),l.setRenderTarget(e),l.render(u,fo)}}function wm(n){const t=[],e=[],i=[];let s=n;const r=n-Ki+1+bl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ki?l=bl[a-n+Ki-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,p=2,m=1,M=new Float32Array(_*g*d),v=new Float32Array(p*g*d),E=new Float32Array(m*g*d);for(let S=0;S<d;S++){const w=S%3*2/3-1,k=S>2?0:-1,y=[w,k,0,w+2/3,k,0,w+2/3,k+1,0,w,k,0,w+2/3,k+1,0,w,k+1,0];M.set(y,_*g*S),v.set(f,p*g*S);const T=[S,S,S,S,S,S];E.set(T,m*g*S)}const R=new qn;R.setAttribute("position",new gn(M,_)),R.setAttribute("uv",new gn(v,p)),R.setAttribute("faceIndex",new gn(E,m)),t.push(R),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Al(n,t,e){const i=new Ri(n,t,e);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function er(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Am(n,t,e){const i=new Float32Array(yi),s=new G(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:aa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Cl(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:aa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Rl(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function aa(){return`

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
	`}function Cm(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Oo||l===zo,h=l===ss||l===rs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new wl(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new wl(n));const f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Rm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Pm(n,t,e,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],n.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let v=0,E=M.length;v<E;v+=3){const R=M[v+0],S=M[v+1],w=M[v+2];f.push(R,S,S,w,w,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,E=M.length/3-1;v<E;v+=3){const R=v+0,S=v+1,w=v+2;f.push(R,S,S,w,w,R)}}else return;const p=new(Gc(f)?Zc:jc)(f,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Lm(n,t,e,i){const s=i.isWebGL2;let r;function a(d){r=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function h(d,g){n.drawElements(r,g,o,d*l),e.update(g,r,1)}function u(d,g,_){if(_===0)return;let p,m;if(s)p=n,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,d*l,_),e.update(g,r,_)}function f(d,g,_){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(d[m]/l,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,d,0,_);let m=0;for(let M=0;M<_;M++)m+=g[M];e.update(m,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Dm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Um(n,t){return n[0]-t[0]}function Im(n,t){return Math.abs(t[1])-Math.abs(n[1])}function Nm(n,t,e){const i={},s=new Float32Array(8),r=new WeakMap,a=new ge,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(t.isWebGL2===!0){const d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0;let _=r.get(h);if(_===void 0||_.count!==g){let L=function(){J.dispose(),r.delete(h),h.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();const M=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,R=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let k=0;M===!0&&(k=1),v===!0&&(k=2),E===!0&&(k=3);let y=h.attributes.position.count*k,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const O=new Float32Array(y*T*4*g),J=new $c(O,y,T,g);J.type=ei,J.needsUpdate=!0;const tt=k*4;for(let N=0;N<g;N++){const I=R[N],W=S[N],q=w[N],Y=y*T*4*N;for(let at=0;at<I.count;at++){const U=at*tt;M===!0&&(a.fromBufferAttribute(I,at),O[Y+U+0]=a.x,O[Y+U+1]=a.y,O[Y+U+2]=a.z,O[Y+U+3]=0),v===!0&&(a.fromBufferAttribute(W,at),O[Y+U+4]=a.x,O[Y+U+5]=a.y,O[Y+U+6]=a.z,O[Y+U+7]=0),E===!0&&(a.fromBufferAttribute(q,at),O[Y+U+8]=a.x,O[Y+U+9]=a.y,O[Y+U+10]=a.z,O[Y+U+11]=q.itemSize===4?a.w:1)}}_={count:g,texture:J,size:new se(y,T)},r.set(h,_),h.addEventListener("dispose",L)}let p=0;for(let M=0;M<f.length;M++)p+=f[M];const m=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",m),u.getUniforms().setValue(n,"morphTargetInfluences",f),u.getUniforms().setValue(n,"morphTargetsTexture",_.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",_.size)}else{const d=f===void 0?0:f.length;let g=i[h.id];if(g===void 0||g.length!==d){g=[];for(let v=0;v<d;v++)g[v]=[v,0];i[h.id]=g}for(let v=0;v<d;v++){const E=g[v];E[0]=v,E[1]=f[v]}g.sort(Im);for(let v=0;v<8;v++)v<d&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Um);const _=h.morphAttributes.position,p=h.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const E=o[v],R=E[0],S=E[1];R!==Number.MAX_SAFE_INTEGER&&S?(_&&h.getAttribute("morphTarget"+v)!==_[R]&&h.setAttribute("morphTarget"+v,_[R]),p&&h.getAttribute("morphNormal"+v)!==p[R]&&h.setAttribute("morphNormal"+v,p[R]),s[v]=S,m+=S):(_&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}const M=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",M),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Fm(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class nh extends Ze{constructor(t,e,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:wi,h!==wi&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===wi&&(i=ti),i===void 0&&h===os&&(i=Ti),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:He,this.minFilter=l!==void 0?l:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ih=new Ze,sh=new nh(1,1);sh.compareFunction=Hc;const rh=new $c,oh=new Mf,ah=new Qc,Pl=[],Ll=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Il=new Float32Array(4);function us(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Pl[s];if(r===void 0&&(r=new Float32Array(s),Pl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ir(n,t){let e=Ll[t];e===void 0&&(e=new Int32Array(t),Ll[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Om(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2fv(this.addr,t),ye(e,t)}}function Bm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;n.uniform3fv(this.addr,t),ye(e,t)}}function km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4fv(this.addr,t),ye(e,t)}}function Hm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Il.set(i),n.uniformMatrix2fv(this.addr,!1,Il),ye(e,i)}}function Gm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Ul.set(i),n.uniformMatrix3fv(this.addr,!1,Ul),ye(e,i)}}function Vm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,i))return;Dl.set(i),n.uniformMatrix4fv(this.addr,!1,Dl),ye(e,i)}}function Wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function $m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2iv(this.addr,t),ye(e,t)}}function Xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3iv(this.addr,t),ye(e,t)}}function qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4iv(this.addr,t),ye(e,t)}}function Ym(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2uiv(this.addr,t),ye(e,t)}}function Zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3uiv(this.addr,t),ye(e,t)}}function Km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4uiv(this.addr,t),ye(e,t)}}function Jm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?sh:ih;e.setTexture2D(t||r,s)}function Qm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||oh,s)}function t0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||ah,s)}function e0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||rh,s)}function n0(n){switch(n){case 5126:return Om;case 35664:return zm;case 35665:return Bm;case 35666:return km;case 35674:return Hm;case 35675:return Gm;case 35676:return Vm;case 5124:case 35670:return Wm;case 35667:case 35671:return $m;case 35668:case 35672:return Xm;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return jm;case 36295:return Zm;case 36296:return Km;case 35678:case 36198:case 36298:case 36306:case 35682:return Jm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return t0;case 36289:case 36303:case 36311:case 36292:return e0}}function i0(n,t){n.uniform1fv(this.addr,t)}function s0(n,t){const e=us(t,this.size,2);n.uniform2fv(this.addr,e)}function r0(n,t){const e=us(t,this.size,3);n.uniform3fv(this.addr,e)}function o0(n,t){const e=us(t,this.size,4);n.uniform4fv(this.addr,e)}function a0(n,t){const e=us(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function l0(n,t){const e=us(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function c0(n,t){const e=us(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function h0(n,t){n.uniform1iv(this.addr,t)}function u0(n,t){n.uniform2iv(this.addr,t)}function f0(n,t){n.uniform3iv(this.addr,t)}function d0(n,t){n.uniform4iv(this.addr,t)}function p0(n,t){n.uniform1uiv(this.addr,t)}function m0(n,t){n.uniform2uiv(this.addr,t)}function g0(n,t){n.uniform3uiv(this.addr,t)}function _0(n,t){n.uniform4uiv(this.addr,t)}function v0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ih,r[a])}function M0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||oh,r[a])}function y0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ah,r[a])}function x0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),ye(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||rh,r[a])}function S0(n){switch(n){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return o0;case 35674:return a0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return f0;case 35669:case 35673:return d0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return _0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return M0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return x0}}class b0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=n0(e.type)}}class E0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=S0(e.type)}}class T0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const _o=/(\w+)(\])?(\[|\.)?/g;function Nl(n,t){n.seq.push(t),n.map[t.id]=t}function w0(n,t,e){const i=n.name,s=i.length;for(_o.lastIndex=0;;){const r=_o.exec(i),a=_o.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Nl(e,c===void 0?new b0(o,n,t):new E0(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new T0(o),Nl(e,u)),e=u}}}class pr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);w0(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Fl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const A0=37297;let C0=0;function R0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function P0(n){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(n);let i;switch(t===e?i="":t===xr&&e===yr?i="LinearDisplayP3ToLinearSRGB":t===yr&&e===xr&&(i="LinearSRGBToLinearDisplayP3"),n){case Rn:case Dr:return[i,"LinearTransferOETF"];case Re:case ia:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ol(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+R0(n.getShaderSource(t),a)}else return s}function L0(n,t){const e=P0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function D0(n,t){let e;switch(t){case wu:e="Linear";break;case Au:e="Reinhard";break;case Cu:e="OptimizedCineon";break;case Ru:e="ACESFilmic";break;case Lu:e="AgX";break;case Pu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function U0(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function I0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function N0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function F0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ji(n){return n!==""}function zl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const O0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wo(n){return n.replace(O0,B0)}const z0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function B0(n,t){let e=$t[t];if(e===void 0){const i=z0.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Wo(e)}const k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(n){return n.replace(k0,H0)}function H0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hl(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function G0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Rc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===eu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function V0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ss:case rs:t="ENVMAP_TYPE_CUBE";break;case Lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function W0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case rs:t="ENVMAP_MODE_REFRACTION";break}return t}function $0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Lc:t="ENVMAP_BLENDING_MULTIPLY";break;case Eu:t="ENVMAP_BLENDING_MIX";break;case Tu:t="ENVMAP_BLENDING_ADD";break}return t}function X0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function q0(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=G0(e),c=V0(e),h=W0(e),u=$0(e),f=X0(e),d=e.isWebGL2?"":U0(e),g=I0(e),_=N0(r),p=s.createProgram();let m,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ji).join(`
`),m.length>0&&(m+=`
`),M=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ji).join(`
`),M.length>0&&(M+=`
`)):(m=[Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),M=[d,Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?$t.tonemapping_pars_fragment:"",e.toneMapping!==si?D0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,L0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),a=Wo(a),a=zl(a,e),a=Bl(a,e),o=Wo(o),o=zl(o,e),o=Bl(o,e),a=kl(a),o=kl(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const E=v+m+a,R=v+M+o,S=Fl(s,s.VERTEX_SHADER,E),w=Fl(s,s.FRAGMENT_SHADER,R);s.attachShader(p,S),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function k(J){if(n.debug.checkShaderErrors){const tt=s.getProgramInfoLog(p).trim(),L=s.getShaderInfoLog(S).trim(),N=s.getShaderInfoLog(w).trim();let I=!0,W=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(I=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,S,w);else{const q=Ol(s,S,"vertex"),Y=Ol(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+tt+`
`+q+`
`+Y)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(L===""||N==="")&&(W=!1);W&&(J.diagnostics={runnable:I,programLog:tt,vertexShader:{log:L,prefix:m},fragmentShader:{log:N,prefix:M}})}s.deleteShader(S),s.deleteShader(w),y=new pr(s,p),T=F0(s,p)}let y;this.getUniforms=function(){return y===void 0&&k(this),y};let T;this.getAttributes=function(){return T===void 0&&k(this),T};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(p,A0)),O},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=C0++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=w,this}let Y0=0;class j0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Z0(t),e.set(t,i)),i}}class Z0{constructor(t){this.id=Y0++,this.code=t,this.usedTimes=0}}function K0(n,t,e,i,s,r,a){const o=new Xc,l=new j0,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function p(y,T,O,J,tt){const L=J.fog,N=tt.geometry,I=y.isMeshStandardMaterial?J.environment:null,W=(y.isMeshStandardMaterial?e:t).get(y.envMap||I),q=W&&W.mapping===Lr?W.image.height:null,Y=g[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const at=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,U=at!==void 0?at.length:0;let st=0;N.morphAttributes.position!==void 0&&(st=1),N.morphAttributes.normal!==void 0&&(st=2),N.morphAttributes.color!==void 0&&(st=3);let V,et,rt,B;if(Y){const Fe=Ve[Y];V=Fe.vertexShader,et=Fe.fragmentShader}else V=y.vertexShader,et=y.fragmentShader,l.update(y),rt=l.getVertexShaderID(y),B=l.getFragmentShaderID(y);const z=n.getRenderTarget(),X=tt.isInstancedMesh===!0,K=tt.isBatchedMesh===!0,nt=!!y.map,ot=!!y.matcap,F=!!W,Et=!!y.aoMap,vt=!!y.lightMap,At=!!y.bumpMap,Mt=!!y.normalMap,Gt=!!y.displacementMap,Ut=!!y.emissiveMap,C=!!y.metalnessMap,b=!!y.roughnessMap,$=y.anisotropy>0,lt=y.clearcoat>0,ht=y.iridescence>0,ut=y.sheen>0,Tt=y.transmission>0,pt=$&&!!y.anisotropyMap,St=lt&&!!y.clearcoatMap,Lt=lt&&!!y.clearcoatNormalMap,kt=lt&&!!y.clearcoatRoughnessMap,ct=ht&&!!y.iridescenceMap,te=ht&&!!y.iridescenceThicknessMap,Xt=ut&&!!y.sheenColorMap,Ot=ut&&!!y.sheenRoughnessMap,Pt=!!y.specularMap,bt=!!y.specularColorMap,Nt=!!y.specularIntensityMap,Jt=Tt&&!!y.transmissionMap,ue=Tt&&!!y.thicknessMap,Yt=!!y.gradientMap,dt=!!y.alphaMap,D=y.alphaTest>0,gt=!!y.alphaHash,_t=!!y.extensions,Ft=!!N.attributes.uv1,Dt=!!N.attributes.uv2,ae=!!N.attributes.uv3;let le=si;return y.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(le=n.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:V,fragmentShader:et,defines:y.defines,customVertexShaderID:rt,customFragmentShaderID:B,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:K,instancing:X,instancingColor:X&&tt.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Rn,map:nt,matcap:ot,envMap:F,envMapMode:F&&W.mapping,envMapCubeUVHeight:q,aoMap:Et,lightMap:vt,bumpMap:At,normalMap:Mt,displacementMap:f&&Gt,emissiveMap:Ut,normalMapObjectSpace:Mt&&y.normalMapType===Wu,normalMapTangentSpace:Mt&&y.normalMapType===Vu,metalnessMap:C,roughnessMap:b,anisotropy:$,anisotropyMap:pt,clearcoat:lt,clearcoatMap:St,clearcoatNormalMap:Lt,clearcoatRoughnessMap:kt,iridescence:ht,iridescenceMap:ct,iridescenceThicknessMap:te,sheen:ut,sheenColorMap:Xt,sheenRoughnessMap:Ot,specularMap:Pt,specularColorMap:bt,specularIntensityMap:Nt,transmission:Tt,transmissionMap:Jt,thicknessMap:ue,gradientMap:Yt,opaque:y.transparent===!1&&y.blending===ts,alphaMap:dt,alphaTest:D,alphaHash:gt,combine:y.combine,mapUv:nt&&_(y.map.channel),aoMapUv:Et&&_(y.aoMap.channel),lightMapUv:vt&&_(y.lightMap.channel),bumpMapUv:At&&_(y.bumpMap.channel),normalMapUv:Mt&&_(y.normalMap.channel),displacementMapUv:Gt&&_(y.displacementMap.channel),emissiveMapUv:Ut&&_(y.emissiveMap.channel),metalnessMapUv:C&&_(y.metalnessMap.channel),roughnessMapUv:b&&_(y.roughnessMap.channel),anisotropyMapUv:pt&&_(y.anisotropyMap.channel),clearcoatMapUv:St&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:kt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&_(y.sheenRoughnessMap.channel),specularMapUv:Pt&&_(y.specularMap.channel),specularColorMapUv:bt&&_(y.specularColorMap.channel),specularIntensityMapUv:Nt&&_(y.specularIntensityMap.channel),transmissionMapUv:Jt&&_(y.transmissionMap.channel),thicknessMapUv:ue&&_(y.thicknessMap.channel),alphaMapUv:dt&&_(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Mt||$),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Ft,vertexUv2s:Dt,vertexUv3s:ae,pointsUvs:tt.isPoints===!0&&!!N.attributes.uv&&(nt||dt),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:tt.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:st,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:le,useLegacyLights:n._useLegacyLights,decodeVideoTexture:nt&&y.map.isVideoTexture===!0&&oe.getTransfer(y.map.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Gn,flipSided:y.side===We,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:_t&&y.extensions.derivatives===!0,extensionFragDepth:_t&&y.extensions.fragDepth===!0,extensionDrawBuffers:_t&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:_t&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_t&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const O in y.defines)T.push(O),T.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(M(T,y),v(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function M(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function E(y){const T=g[y.type];let O;if(T){const J=Ve[T];O=ra.clone(J.uniforms)}else O=y.uniforms;return O}function R(y,T){let O;for(let J=0,tt=c.length;J<tt;J++){const L=c[J];if(L.cacheKey===T){O=L,++O.usedTimes;break}}return O===void 0&&(O=new q0(n,T,y,r),c.push(O)),O}function S(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function k(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:E,acquireProgram:R,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:k}}function J0(){let n=new WeakMap;function t(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function e(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function Q0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Gl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Vl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,d,g,_,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,f,d,g,_,p){const m=a(u,f,d,g,_,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function l(u,f,d,g,_,p){const m=a(u,f,d,g,_,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,f){e.length>1&&e.sort(u||Q0),i.length>1&&i.sort(f||Gl),s.length>1&&s.sort(f||Gl)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function tg(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Vl,n.set(i,[a])):s>=r.length?(a=new Vl,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function eg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new ne};break;case"SpotLight":e={position:new G,direction:new G,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new G,halfWidth:new G,halfHeight:new G};break}return n[t.id]=e,e}}}function ng(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let ig=0;function sg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function rg(n,t){const e=new eg,i=ng(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new G);const r=new G,a=new Te,o=new Te;function l(h,u){let f=0,d=0,g=0;for(let J=0;J<9;J++)s.probe[J].set(0,0,0);let _=0,p=0,m=0,M=0,v=0,E=0,R=0,S=0,w=0,k=0,y=0;h.sort(sg);const T=u===!0?Math.PI:1;for(let J=0,tt=h.length;J<tt;J++){const L=h[J],N=L.color,I=L.intensity,W=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=N.r*I*T,d+=N.g*I*T,g+=N.b*I*T;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(L.sh.coefficients[Y],I);y++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const at=L.shadow,U=i.get(L);U.shadowBias=at.bias,U.shadowNormalBias=at.normalBias,U.shadowRadius=at.radius,U.shadowMapSize=at.mapSize,s.directionalShadow[_]=U,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=L.shadow.matrix,E++}s.directional[_]=Y,_++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(N).multiplyScalar(I*T),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,s.spot[m]=Y;const at=L.shadow;if(L.map&&(s.spotLightMap[w]=L.map,w++,at.updateMatrices(L),L.castShadow&&k++),s.spotLightMatrix[m]=at.matrix,L.castShadow){const U=i.get(L);U.shadowBias=at.bias,U.shadowNormalBias=at.normalBias,U.shadowRadius=at.radius,U.shadowMapSize=at.mapSize,s.spotShadow[m]=U,s.spotShadowMap[m]=q,S++}m++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(N).multiplyScalar(I),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),s.rectArea[M]=Y,M++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const at=L.shadow,U=i.get(L);U.shadowBias=at.bias,U.shadowNormalBias=at.normalBias,U.shadowRadius=at.radius,U.shadowMapSize=at.mapSize,U.shadowCameraNear=at.camera.near,U.shadowCameraFar=at.camera.far,s.pointShadow[p]=U,s.pointShadowMap[p]=q,s.pointShadowMatrix[p]=L.shadow.matrix,R++}s.point[p]=Y,p++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(I*T),Y.groundColor.copy(L.groundColor).multiplyScalar(I*T),s.hemi[v]=Y,v++}}M>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=g;const O=s.hash;(O.directionalLength!==_||O.pointLength!==p||O.spotLength!==m||O.rectAreaLength!==M||O.hemiLength!==v||O.numDirectionalShadows!==E||O.numPointShadows!==R||O.numSpotShadows!==S||O.numSpotMaps!==w||O.numLightProbes!==y)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=M,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=S,s.spotShadowMap.length=S,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=S+w-k,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=k,s.numLightProbes=y,O.directionalLength=_,O.pointLength=p,O.spotLength=m,O.rectAreaLength=M,O.hemiLength=v,O.numDirectionalShadows=E,O.numPointShadows=R,O.numSpotShadows=S,O.numSpotMaps=w,O.numLightProbes=y,s.version=ig++)}function c(h,u){let f=0,d=0,g=0,_=0,p=0;const m=u.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){const E=h[M];if(E.isDirectionalLight){const R=s.directional[f];R.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),f++}else if(E.isSpotLight){const R=s.spot[g];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),g++}else if(E.isRectAreaLight){const R=s.rectArea[_];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(m),o.identity(),a.copy(E.matrixWorld),a.premultiply(m),o.extractRotation(a),R.halfWidth.set(E.width*.5,0,0),R.halfHeight.set(0,E.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const R=s.point[d];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const R=s.hemi[p];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:s}}function Wl(n,t){const e=new rg(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function a(u){i.push(u)}function o(u){s.push(u)}function l(u){e.setup(i,u)}function c(u){e.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function og(n,t){let e=new WeakMap;function i(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new Wl(n,t),e.set(r,[l])):a>=o.length?(l=new Wl(n,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:i,dispose:s}}class ag extends Ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class lg extends Ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const cg=`void main() {
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
}`;function ug(n,t,e){let i=new th;const s=new se,r=new se,a=new ge,o=new ag({depthPacking:Gu}),l=new lg,c={},h=e.maxTextureSize,u={[oi]:We,[We]:oi,[Gn]:Gn},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:cg,fragmentShader:hg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new qn;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $n(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rc;let m=this.type;this.render=function(S,w,k){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const y=n.getRenderTarget(),T=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),J=n.state;J.setBlending(ii),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const tt=m!==Bn&&this.type===Bn,L=m===Bn&&this.type!==Bn;for(let N=0,I=S.length;N<I;N++){const W=S[N],q=W.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const Y=q.getFrameExtents();if(s.multiply(Y),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||tt===!0||L===!0){const U=this.type!==Bn?{minFilter:He,magFilter:He}:{};q.map!==null&&q.map.dispose(),q.map=new Ri(s.x,s.y,U),q.map.texture.name=W.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const at=q.getViewportCount();for(let U=0;U<at;U++){const st=q.getViewport(U);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),J.viewport(a),q.updateMatrices(W,U),i=q.getFrustum(),E(w,k,q.camera,W,this.type)}q.isPointLightShadow!==!0&&this.type===Bn&&M(q,k),q.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(y,T,O)};function M(S,w){const k=t.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ri(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,k,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,k,d,_,null)}function v(S,w,k,y){let T=null;const O=k.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(O!==void 0)T=O;else if(T=k.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const J=T.uuid,tt=w.uuid;let L=c[J];L===void 0&&(L={},c[J]=L);let N=L[tt];N===void 0&&(N=T.clone(),L[tt]=N,w.addEventListener("dispose",R)),T=N}if(T.visible=w.visible,T.wireframe=w.wireframe,y===Bn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:u[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,k.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const J=n.properties.get(T);J.light=k}return T}function E(S,w,k,y,T){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&T===Bn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld);const tt=t.update(S),L=S.material;if(Array.isArray(L)){const N=tt.groups;for(let I=0,W=N.length;I<W;I++){const q=N[I],Y=L[q.materialIndex];if(Y&&Y.visible){const at=v(S,Y,y,T);S.onBeforeShadow(n,S,w,k,tt,at,q),n.renderBufferDirect(k,null,tt,at,S,q),S.onAfterShadow(n,S,w,k,tt,at,q)}}}else if(L.visible){const N=v(S,L,y,T);S.onBeforeShadow(n,S,w,k,tt,N,null),n.renderBufferDirect(k,null,tt,N,S,null),S.onAfterShadow(n,S,w,k,tt,N,null)}}const J=S.children;for(let tt=0,L=J.length;tt<L;tt++)E(J[tt],w,k,y,T)}function R(S){S.target.removeEventListener("dispose",R);for(const k in c){const y=c[k],T=S.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}function fg(n,t,e){const i=e.isWebGL2;function s(){let D=!1;const gt=new ge;let _t=null;const Ft=new ge(0,0,0,0);return{setMask:function(Dt){_t!==Dt&&!D&&(n.colorMask(Dt,Dt,Dt,Dt),_t=Dt)},setLocked:function(Dt){D=Dt},setClear:function(Dt,ae,le,Se,Fe){Fe===!0&&(Dt*=Se,ae*=Se,le*=Se),gt.set(Dt,ae,le,Se),Ft.equals(gt)===!1&&(n.clearColor(Dt,ae,le,Se),Ft.copy(gt))},reset:function(){D=!1,_t=null,Ft.set(-1,0,0,0)}}}function r(){let D=!1,gt=null,_t=null,Ft=null;return{setTest:function(Dt){Dt?K(n.DEPTH_TEST):nt(n.DEPTH_TEST)},setMask:function(Dt){gt!==Dt&&!D&&(n.depthMask(Dt),gt=Dt)},setFunc:function(Dt){if(_t!==Dt){switch(Dt){case _u:n.depthFunc(n.NEVER);break;case vu:n.depthFunc(n.ALWAYS);break;case Mu:n.depthFunc(n.LESS);break;case vr:n.depthFunc(n.LEQUAL);break;case yu:n.depthFunc(n.EQUAL);break;case xu:n.depthFunc(n.GEQUAL);break;case Su:n.depthFunc(n.GREATER);break;case bu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=Dt}},setLocked:function(Dt){D=Dt},setClear:function(Dt){Ft!==Dt&&(n.clearDepth(Dt),Ft=Dt)},reset:function(){D=!1,gt=null,_t=null,Ft=null}}}function a(){let D=!1,gt=null,_t=null,Ft=null,Dt=null,ae=null,le=null,Se=null,Fe=null;return{setTest:function(ce){D||(ce?K(n.STENCIL_TEST):nt(n.STENCIL_TEST))},setMask:function(ce){gt!==ce&&!D&&(n.stencilMask(ce),gt=ce)},setFunc:function(ce,Oe,vn){(_t!==ce||Ft!==Oe||Dt!==vn)&&(n.stencilFunc(ce,Oe,vn),_t=ce,Ft=Oe,Dt=vn)},setOp:function(ce,Oe,vn){(ae!==ce||le!==Oe||Se!==vn)&&(n.stencilOp(ce,Oe,vn),ae=ce,le=Oe,Se=vn)},setLocked:function(ce){D=ce},setClear:function(ce){Fe!==ce&&(n.clearStencil(ce),Fe=ce)},reset:function(){D=!1,gt=null,_t=null,Ft=null,Dt=null,ae=null,le=null,Se=null,Fe=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let f={},d={},g=new WeakMap,_=[],p=null,m=!1,M=null,v=null,E=null,R=null,S=null,w=null,k=null,y=new ne(0,0,0),T=0,O=!1,J=null,tt=null,L=null,N=null,I=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const at=n.getParameter(n.VERSION);at.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(at)[1]),q=Y>=1):at.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(at)[1]),q=Y>=2);let U=null,st={};const V=n.getParameter(n.SCISSOR_BOX),et=n.getParameter(n.VIEWPORT),rt=new ge().fromArray(V),B=new ge().fromArray(et);function z(D,gt,_t,Ft){const Dt=new Uint8Array(4),ae=n.createTexture();n.bindTexture(D,ae),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let le=0;le<_t;le++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(gt,0,n.RGBA,1,1,Ft,0,n.RGBA,n.UNSIGNED_BYTE,Dt):n.texImage2D(gt+le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Dt);return ae}const X={};X[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(X[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),K(n.DEPTH_TEST),l.setFunc(vr),Ut(!1),C(wa),K(n.CULL_FACE),Mt(ii);function K(D){f[D]!==!0&&(n.enable(D),f[D]=!0)}function nt(D){f[D]!==!1&&(n.disable(D),f[D]=!1)}function ot(D,gt){return d[D]!==gt?(n.bindFramebuffer(D,gt),d[D]=gt,i&&(D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=gt),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=gt)),!0):!1}function F(D,gt){let _t=_,Ft=!1;if(D)if(_t=g.get(gt),_t===void 0&&(_t=[],g.set(gt,_t)),D.isWebGLMultipleRenderTargets){const Dt=D.texture;if(_t.length!==Dt.length||_t[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,le=Dt.length;ae<le;ae++)_t[ae]=n.COLOR_ATTACHMENT0+ae;_t.length=Dt.length,Ft=!0}}else _t[0]!==n.COLOR_ATTACHMENT0&&(_t[0]=n.COLOR_ATTACHMENT0,Ft=!0);else _t[0]!==n.BACK&&(_t[0]=n.BACK,Ft=!0);Ft&&(e.isWebGL2?n.drawBuffers(_t):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(_t))}function Et(D){return p!==D?(n.useProgram(D),p=D,!0):!1}const vt={[Mi]:n.FUNC_ADD,[nu]:n.FUNC_SUBTRACT,[iu]:n.FUNC_REVERSE_SUBTRACT};if(i)vt[Pa]=n.MIN,vt[Io]=n.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(vt[Pa]=D.MIN_EXT,vt[Io]=D.MAX_EXT)}const At={[su]:n.ZERO,[ru]:n.ONE,[ou]:n.SRC_COLOR,[No]:n.SRC_ALPHA,[fu]:n.SRC_ALPHA_SATURATE,[hu]:n.DST_COLOR,[lu]:n.DST_ALPHA,[au]:n.ONE_MINUS_SRC_COLOR,[Fo]:n.ONE_MINUS_SRC_ALPHA,[uu]:n.ONE_MINUS_DST_COLOR,[cu]:n.ONE_MINUS_DST_ALPHA,[du]:n.CONSTANT_COLOR,[pu]:n.ONE_MINUS_CONSTANT_COLOR,[mu]:n.CONSTANT_ALPHA,[gu]:n.ONE_MINUS_CONSTANT_ALPHA};function Mt(D,gt,_t,Ft,Dt,ae,le,Se,Fe,ce){if(D===ii){m===!0&&(nt(n.BLEND),m=!1);return}if(m===!1&&(K(n.BLEND),m=!0),D!==Pc){if(D!==M||ce!==O){if((v!==Mi||S!==Mi)&&(n.blendEquation(n.FUNC_ADD),v=Mi,S=Mi),ce)switch(D){case ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Aa:n.blendFunc(n.ONE,n.ONE);break;case Ca:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ra:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Aa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ca:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ra:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,R=null,w=null,k=null,y.set(0,0,0),T=0,M=D,O=ce}return}Dt=Dt||gt,ae=ae||_t,le=le||Ft,(gt!==v||Dt!==S)&&(n.blendEquationSeparate(vt[gt],vt[Dt]),v=gt,S=Dt),(_t!==E||Ft!==R||ae!==w||le!==k)&&(n.blendFuncSeparate(At[_t],At[Ft],At[ae],At[le]),E=_t,R=Ft,w=ae,k=le),(Se.equals(y)===!1||Fe!==T)&&(n.blendColor(Se.r,Se.g,Se.b,Fe),y.copy(Se),T=Fe),M=D,O=!1}function Gt(D,gt){D.side===Gn?nt(n.CULL_FACE):K(n.CULL_FACE);let _t=D.side===We;gt&&(_t=!_t),Ut(_t),D.blending===ts&&D.transparent===!1?Mt(ii):Mt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ft=D.stencilWrite;c.setTest(Ft),Ft&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),$(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):nt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(D){J!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),J=D)}function C(D){D!==Qh?(K(n.CULL_FACE),D!==tt&&(D===wa?n.cullFace(n.BACK):D===tu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):nt(n.CULL_FACE),tt=D}function b(D){D!==L&&(q&&n.lineWidth(D),L=D)}function $(D,gt,_t){D?(K(n.POLYGON_OFFSET_FILL),(N!==gt||I!==_t)&&(n.polygonOffset(gt,_t),N=gt,I=_t)):nt(n.POLYGON_OFFSET_FILL)}function lt(D){D?K(n.SCISSOR_TEST):nt(n.SCISSOR_TEST)}function ht(D){D===void 0&&(D=n.TEXTURE0+W-1),U!==D&&(n.activeTexture(D),U=D)}function ut(D,gt,_t){_t===void 0&&(U===null?_t=n.TEXTURE0+W-1:_t=U);let Ft=st[_t];Ft===void 0&&(Ft={type:void 0,texture:void 0},st[_t]=Ft),(Ft.type!==D||Ft.texture!==gt)&&(U!==_t&&(n.activeTexture(_t),U=_t),n.bindTexture(D,gt||X[D]),Ft.type=D,Ft.texture=gt)}function Tt(){const D=st[U];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function pt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function kt(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Xt(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ot(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pt(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(D){rt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),rt.copy(D))}function Jt(D){B.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),B.copy(D))}function ue(D,gt){let _t=u.get(gt);_t===void 0&&(_t=new WeakMap,u.set(gt,_t));let Ft=_t.get(D);Ft===void 0&&(Ft=n.getUniformBlockIndex(gt,D.name),_t.set(D,Ft))}function Yt(D,gt){const Ft=u.get(gt).get(D);h.get(gt)!==Ft&&(n.uniformBlockBinding(gt,Ft,D.__bindingPointIndex),h.set(gt,Ft))}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},U=null,st={},d={},g=new WeakMap,_=[],p=null,m=!1,M=null,v=null,E=null,R=null,S=null,w=null,k=null,y=new ne(0,0,0),T=0,O=!1,J=null,tt=null,L=null,N=null,I=null,rt.set(0,0,n.canvas.width,n.canvas.height),B.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:K,disable:nt,bindFramebuffer:ot,drawBuffers:F,useProgram:Et,setBlending:Mt,setMaterial:Gt,setFlipSided:Ut,setCullFace:C,setLineWidth:b,setPolygonOffset:$,setScissorTest:lt,activeTexture:ht,bindTexture:ut,unbindTexture:Tt,compressedTexImage2D:pt,compressedTexImage3D:St,texImage2D:Pt,texImage3D:bt,updateUBOMapping:ue,uniformBlockBinding:Yt,texStorage2D:Xt,texStorage3D:Ot,texSubImage2D:Lt,texSubImage3D:kt,compressedTexSubImage2D:ct,compressedTexSubImage3D:te,scissor:Nt,viewport:Jt,reset:dt}}function dg(n,t,e,i,s,r,a){const o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return d?new OffscreenCanvas(C,b):Er("canvas")}function _(C,b,$,lt){let ht=1;if((C.width>lt||C.height>lt)&&(ht=lt/Math.max(C.width,C.height)),ht<1||b===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const ut=b?br:Math.floor,Tt=ut(ht*C.width),pt=ut(ht*C.height);u===void 0&&(u=g(Tt,pt));const St=$?g(Tt,pt):u;return St.width=Tt,St.height=pt,St.getContext("2d").drawImage(C,0,0,Tt,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+Tt+"x"+pt+")."),St}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function p(C){return Vo(C.width)&&Vo(C.height)}function m(C){return o?!1:C.wrapS!==pn||C.wrapT!==pn||C.minFilter!==He&&C.minFilter!==en}function M(C,b){return C.generateMipmaps&&b&&C.minFilter!==He&&C.minFilter!==en}function v(C){n.generateMipmap(C)}function E(C,b,$,lt,ht=!1){if(o===!1)return b;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ut=b;if(b===n.RED&&($===n.FLOAT&&(ut=n.R32F),$===n.HALF_FLOAT&&(ut=n.R16F),$===n.UNSIGNED_BYTE&&(ut=n.R8)),b===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(ut=n.R8UI),$===n.UNSIGNED_SHORT&&(ut=n.R16UI),$===n.UNSIGNED_INT&&(ut=n.R32UI),$===n.BYTE&&(ut=n.R8I),$===n.SHORT&&(ut=n.R16I),$===n.INT&&(ut=n.R32I)),b===n.RG&&($===n.FLOAT&&(ut=n.RG32F),$===n.HALF_FLOAT&&(ut=n.RG16F),$===n.UNSIGNED_BYTE&&(ut=n.RG8)),b===n.RGBA){const Tt=ht?Mr:oe.getTransfer(lt);$===n.FLOAT&&(ut=n.RGBA32F),$===n.HALF_FLOAT&&(ut=n.RGBA16F),$===n.UNSIGNED_BYTE&&(ut=Tt===fe?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(ut=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(ut=n.RGB5_A1)}return(ut===n.R16F||ut===n.R32F||ut===n.RG16F||ut===n.RG32F||ut===n.RGBA16F||ut===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ut}function R(C,b,$){return M(C,$)===!0||C.isFramebufferTexture&&C.minFilter!==He&&C.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function S(C){return C===He||C===La||C===Vr?n.NEAREST:n.LINEAR}function w(C){const b=C.target;b.removeEventListener("dispose",w),y(b),b.isVideoTexture&&h.delete(b)}function k(C){const b=C.target;b.removeEventListener("dispose",k),O(b)}function y(C){const b=i.get(C);if(b.__webglInit===void 0)return;const $=C.source,lt=f.get($);if(lt){const ht=lt[b.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&T(C),Object.keys(lt).length===0&&f.delete($)}i.remove(C)}function T(C){const b=i.get(C);n.deleteTexture(b.__webglTexture);const $=C.source,lt=f.get($);delete lt[b.__cacheKey],a.memory.textures--}function O(C){const b=C.texture,$=i.get(C),lt=i.get(b);if(lt.__webglTexture!==void 0&&(n.deleteTexture(lt.__webglTexture),a.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray($.__webglFramebuffer[ht]))for(let ut=0;ut<$.__webglFramebuffer[ht].length;ut++)n.deleteFramebuffer($.__webglFramebuffer[ht][ut]);else n.deleteFramebuffer($.__webglFramebuffer[ht]);$.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer[ht])}else{if(Array.isArray($.__webglFramebuffer))for(let ht=0;ht<$.__webglFramebuffer.length;ht++)n.deleteFramebuffer($.__webglFramebuffer[ht]);else n.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&n.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let ht=0;ht<$.__webglColorRenderbuffer.length;ht++)$.__webglColorRenderbuffer[ht]&&n.deleteRenderbuffer($.__webglColorRenderbuffer[ht]);$.__webglDepthRenderbuffer&&n.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ht=0,ut=b.length;ht<ut;ht++){const Tt=i.get(b[ht]);Tt.__webglTexture&&(n.deleteTexture(Tt.__webglTexture),a.memory.textures--),i.remove(b[ht])}i.remove(b),i.remove(C)}let J=0;function tt(){J=0}function L(){const C=J;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),J+=1,C}function N(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function I(C,b){const $=i.get(C);if(C.isVideoTexture&&Gt(C),C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){const lt=C.image;if(lt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt($,C,b);return}}e.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+b)}function W(C,b){const $=i.get(C);if(C.version>0&&$.__version!==C.version){rt($,C,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+b)}function q(C,b){const $=i.get(C);if(C.version>0&&$.__version!==C.version){rt($,C,b);return}e.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+b)}function Y(C,b){const $=i.get(C);if(C.version>0&&$.__version!==C.version){B($,C,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+b)}const at={[Bo]:n.REPEAT,[pn]:n.CLAMP_TO_EDGE,[ko]:n.MIRRORED_REPEAT},U={[He]:n.NEAREST,[La]:n.NEAREST_MIPMAP_NEAREST,[Vr]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[Du]:n.LINEAR_MIPMAP_NEAREST,[Es]:n.LINEAR_MIPMAP_LINEAR},st={[$u]:n.NEVER,[Ku]:n.ALWAYS,[Xu]:n.LESS,[Hc]:n.LEQUAL,[qu]:n.EQUAL,[Zu]:n.GEQUAL,[Yu]:n.GREATER,[ju]:n.NOTEQUAL};function V(C,b,$){if($?(n.texParameteri(C,n.TEXTURE_WRAP_S,at[b.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,at[b.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,at[b.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,U[b.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,U[b.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(b.wrapS!==pn||b.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,S(b.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,S(b.minFilter)),b.minFilter!==He&&b.minFilter!==en&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,st[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const lt=t.get("EXT_texture_filter_anisotropic");if(b.magFilter===He||b.minFilter!==Vr&&b.minFilter!==Es||b.type===ei&&t.has("OES_texture_float_linear")===!1||o===!1&&b.type===Ts&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||i.get(b).__currentAnisotropy)&&(n.texParameterf(C,lt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy)}}function et(C,b){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",w));const lt=b.source;let ht=f.get(lt);ht===void 0&&(ht={},f.set(lt,ht));const ut=N(b);if(ut!==C.__cacheKey){ht[ut]===void 0&&(ht[ut]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ht[ut].usedTimes++;const Tt=ht[C.__cacheKey];Tt!==void 0&&(ht[C.__cacheKey].usedTimes--,Tt.usedTimes===0&&T(b)),C.__cacheKey=ut,C.__webglTexture=ht[ut].texture}return $}function rt(C,b,$){let lt=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(lt=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(lt=n.TEXTURE_3D);const ht=et(C,b),ut=b.source;e.bindTexture(lt,C.__webglTexture,n.TEXTURE0+$);const Tt=i.get(ut);if(ut.version!==Tt.__version||ht===!0){e.activeTexture(n.TEXTURE0+$);const pt=oe.getPrimaries(oe.workingColorSpace),St=b.colorSpace===sn?null:oe.getPrimaries(b.colorSpace),Lt=b.colorSpace===sn||pt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const kt=m(b)&&p(b.image)===!1;let ct=_(b.image,kt,!1,s.maxTextureSize);ct=Ut(b,ct);const te=p(ct)||o,Xt=r.convert(b.format,b.colorSpace);let Ot=r.convert(b.type),Pt=E(b.internalFormat,Xt,Ot,b.colorSpace,b.isVideoTexture);V(lt,b,te);let bt;const Nt=b.mipmaps,Jt=o&&b.isVideoTexture!==!0&&Pt!==Bc,ue=Tt.__version===void 0||ht===!0,Yt=R(b,ct,te);if(b.isDepthTexture)Pt=n.DEPTH_COMPONENT,o?b.type===ei?Pt=n.DEPTH_COMPONENT32F:b.type===ti?Pt=n.DEPTH_COMPONENT24:b.type===Ti?Pt=n.DEPTH24_STENCIL8:Pt=n.DEPTH_COMPONENT16:b.type===ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===wi&&Pt===n.DEPTH_COMPONENT&&b.type!==na&&b.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=ti,Ot=r.convert(b.type)),b.format===os&&Pt===n.DEPTH_COMPONENT&&(Pt=n.DEPTH_STENCIL,b.type!==Ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Ti,Ot=r.convert(b.type))),ue&&(Jt?e.texStorage2D(n.TEXTURE_2D,1,Pt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Pt,ct.width,ct.height,0,Xt,Ot,null));else if(b.isDataTexture)if(Nt.length>0&&te){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,D=Nt.length;dt<D;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,Ot,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,Ot,bt.data);b.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,ct.width,ct.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,Xt,Ot,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Pt,ct.width,ct.height,0,Xt,Ot,ct.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Jt&&ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,Nt[0].width,Nt[0].height,ct.depth);for(let dt=0,D=Nt.length;dt<D;dt++)bt=Nt[dt],b.format!==mn?Xt!==null?Jt?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,ct.depth,Xt,bt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,ct.depth,0,bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,ct.depth,Xt,Ot,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,ct.depth,0,Xt,Ot,bt.data)}else{Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,D=Nt.length;dt<D;dt++)bt=Nt[dt],b.format!==mn?Xt!==null?Jt?e.compressedTexSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,Ot,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,Ot,bt.data)}else if(b.isDataArrayTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,ct.width,ct.height,ct.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Xt,Ot,ct.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Pt,ct.width,ct.height,ct.depth,0,Xt,Ot,ct.data);else if(b.isData3DTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_3D,Yt,Pt,ct.width,ct.height,ct.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Xt,Ot,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Pt,ct.width,ct.height,ct.depth,0,Xt,Ot,ct.data);else if(b.isFramebufferTexture){if(ue)if(Jt)e.texStorage2D(n.TEXTURE_2D,Yt,Pt,ct.width,ct.height);else{let dt=ct.width,D=ct.height;for(let gt=0;gt<Yt;gt++)e.texImage2D(n.TEXTURE_2D,gt,Pt,dt,D,0,Xt,Ot,null),dt>>=1,D>>=1}}else if(Nt.length>0&&te){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,D=Nt.length;dt<D;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,Xt,Ot,bt):e.texImage2D(n.TEXTURE_2D,dt,Pt,Xt,Ot,bt);b.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,ct.width,ct.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Xt,Ot,ct)):e.texImage2D(n.TEXTURE_2D,0,Pt,Xt,Ot,ct);M(b,te)&&v(lt),Tt.__version=ut.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function B(C,b,$){if(b.image.length!==6)return;const lt=et(C,b),ht=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+$);const ut=i.get(ht);if(ht.version!==ut.__version||lt===!0){e.activeTexture(n.TEXTURE0+$);const Tt=oe.getPrimaries(oe.workingColorSpace),pt=b.colorSpace===sn?null:oe.getPrimaries(b.colorSpace),St=b.colorSpace===sn||Tt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Lt=b.isCompressedTexture||b.image[0].isCompressedTexture,kt=b.image[0]&&b.image[0].isDataTexture,ct=[];for(let dt=0;dt<6;dt++)!Lt&&!kt?ct[dt]=_(b.image[dt],!1,!0,s.maxCubemapSize):ct[dt]=kt?b.image[dt].image:b.image[dt],ct[dt]=Ut(b,ct[dt]);const te=ct[0],Xt=p(te)||o,Ot=r.convert(b.format,b.colorSpace),Pt=r.convert(b.type),bt=E(b.internalFormat,Ot,Pt,b.colorSpace),Nt=o&&b.isVideoTexture!==!0,Jt=ut.__version===void 0||lt===!0;let ue=R(b,te,Xt);V(n.TEXTURE_CUBE_MAP,b,Xt);let Yt;if(Lt){Nt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,te.width,te.height);for(let dt=0;dt<6;dt++){Yt=ct[dt].mipmaps;for(let D=0;D<Yt.length;D++){const gt=Yt[D];b.format!==mn?Ot!==null?Nt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D,0,0,gt.width,gt.height,Ot,gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D,0,0,gt.width,gt.height,Ot,Pt,gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D,bt,gt.width,gt.height,0,Ot,Pt,gt.data)}}}else{Yt=b.mipmaps,Nt&&Jt&&(Yt.length>0&&ue++,e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,ct[0].width,ct[0].height));for(let dt=0;dt<6;dt++)if(kt){Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,ct[dt].width,ct[dt].height,Ot,Pt,ct[dt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,ct[dt].width,ct[dt].height,0,Ot,Pt,ct[dt].data);for(let D=0;D<Yt.length;D++){const _t=Yt[D].image[dt].image;Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D+1,0,0,_t.width,_t.height,Ot,Pt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D+1,bt,_t.width,_t.height,0,Ot,Pt,_t.data)}}else{Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ot,Pt,ct[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,Ot,Pt,ct[dt]);for(let D=0;D<Yt.length;D++){const gt=Yt[D];Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D+1,0,0,Ot,Pt,gt.image[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,D+1,bt,Ot,Pt,gt.image[dt])}}}M(b,Xt)&&v(n.TEXTURE_CUBE_MAP),ut.__version=ht.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function z(C,b,$,lt,ht,ut){const Tt=r.convert($.format,$.colorSpace),pt=r.convert($.type),St=E($.internalFormat,Tt,pt,$.colorSpace);if(!i.get(b).__hasExternalTextures){const kt=Math.max(1,b.width>>ut),ct=Math.max(1,b.height>>ut);ht===n.TEXTURE_3D||ht===n.TEXTURE_2D_ARRAY?e.texImage3D(ht,ut,St,kt,ct,b.depth,0,Tt,pt,null):e.texImage2D(ht,ut,St,kt,ct,0,Tt,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,ht,i.get($).__webglTexture,0,At(b)):(ht===n.TEXTURE_2D||ht>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,lt,ht,i.get($).__webglTexture,ut),e.bindFramebuffer(n.FRAMEBUFFER,null)}function X(C,b,$){if(n.bindRenderbuffer(n.RENDERBUFFER,C),b.depthBuffer&&!b.stencilBuffer){let lt=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if($||Mt(b)){const ht=b.depthTexture;ht&&ht.isDepthTexture&&(ht.type===ei?lt=n.DEPTH_COMPONENT32F:ht.type===ti&&(lt=n.DEPTH_COMPONENT24));const ut=At(b);Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut,lt,b.width,b.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ut,lt,b.width,b.height)}else n.renderbufferStorage(n.RENDERBUFFER,lt,b.width,b.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(b.depthBuffer&&b.stencilBuffer){const lt=At(b);$&&Mt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,n.DEPTH24_STENCIL8,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt,n.DEPTH24_STENCIL8,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const lt=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ht=0;ht<lt.length;ht++){const ut=lt[ht],Tt=r.convert(ut.format,ut.colorSpace),pt=r.convert(ut.type),St=E(ut.internalFormat,Tt,pt,ut.colorSpace),Lt=At(b);$&&Mt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt,St,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Lt,St,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,St,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function K(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I(b.depthTexture,0);const lt=i.get(b.depthTexture).__webglTexture,ht=At(b);if(b.depthTexture.format===wi)Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0);else if(b.depthTexture.format===os)Mt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0,ht):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function nt(C){const b=i.get(C),$=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");K(b.__webglFramebuffer,C)}else if($){b.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[lt]),b.__webglDepthbuffer[lt]=n.createRenderbuffer(),X(b.__webglDepthbuffer[lt],C,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=n.createRenderbuffer(),X(b.__webglDepthbuffer,C,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(C,b,$){const lt=i.get(C);b!==void 0&&z(lt.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&nt(C)}function F(C){const b=C.texture,$=i.get(C),lt=i.get(b);C.addEventListener("dispose",k),C.isWebGLMultipleRenderTargets!==!0&&(lt.__webglTexture===void 0&&(lt.__webglTexture=n.createTexture()),lt.__version=b.version,a.memory.textures++);const ht=C.isWebGLCubeRenderTarget===!0,ut=C.isWebGLMultipleRenderTargets===!0,Tt=p(C)||o;if(ht){$.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(o&&b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer[pt]=[];for(let St=0;St<b.mipmaps.length;St++)$.__webglFramebuffer[pt][St]=n.createFramebuffer()}else $.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(o&&b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)$.__webglFramebuffer[pt]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(ut)if(s.drawBuffers){const pt=C.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=i.get(pt[St]);kt.__webglTexture===void 0&&(kt.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&C.samples>0&&Mt(C)===!1){const pt=ut?b:[b];$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let St=0;St<pt.length;St++){const Lt=pt[St];$.__webglColorRenderbuffer[St]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[St]);const kt=r.convert(Lt.format,Lt.colorSpace),ct=r.convert(Lt.type),te=E(Lt.internalFormat,kt,ct,Lt.colorSpace,C.isXRRenderTarget===!0),Xt=At(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,te,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,$.__webglColorRenderbuffer[St])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),X($.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ht){e.bindTexture(n.TEXTURE_CUBE_MAP,lt.__webglTexture),V(n.TEXTURE_CUBE_MAP,b,Tt);for(let pt=0;pt<6;pt++)if(o&&b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)z($.__webglFramebuffer[pt][St],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,St);else z($.__webglFramebuffer[pt],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);M(b,Tt)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){const pt=C.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=pt[St],ct=i.get(kt);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),V(n.TEXTURE_2D,kt,Tt),z($.__webglFramebuffer,C,kt,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,0),M(kt,Tt)&&v(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(o?pt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(pt,lt.__webglTexture),V(pt,b,Tt),o&&b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)z($.__webglFramebuffer[St],C,b,n.COLOR_ATTACHMENT0,pt,St);else z($.__webglFramebuffer,C,b,n.COLOR_ATTACHMENT0,pt,0);M(b,Tt)&&v(pt),e.unbindTexture()}C.depthBuffer&&nt(C)}function Et(C){const b=p(C)||o,$=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let lt=0,ht=$.length;lt<ht;lt++){const ut=$[lt];if(M(ut,b)){const Tt=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pt=i.get(ut).__webglTexture;e.bindTexture(Tt,pt),v(Tt),e.unbindTexture()}}}function vt(C){if(o&&C.samples>0&&Mt(C)===!1){const b=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],$=C.width,lt=C.height;let ht=n.COLOR_BUFFER_BIT;const ut=[],Tt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(C),St=C.isWebGLMultipleRenderTargets===!0;if(St)for(let Lt=0;Lt<b.length;Lt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let Lt=0;Lt<b.length;Lt++){ut.push(n.COLOR_ATTACHMENT0+Lt),C.depthBuffer&&ut.push(Tt);const kt=pt.__ignoreDepthValues!==void 0?pt.__ignoreDepthValues:!1;if(kt===!1&&(C.depthBuffer&&(ht|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(ht|=n.STENCIL_BUFFER_BIT)),St&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]),kt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Tt]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Tt])),St){const ct=i.get(b[Lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ct,0)}n.blitFramebuffer(0,0,$,lt,0,0,$,lt,ht,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ut)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),St)for(let Lt=0;Lt<b.length;Lt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]);const kt=i.get(b[Lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}}function At(C){return Math.min(s.maxSamples,C.samples)}function Mt(C){const b=i.get(C);return o&&C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Gt(C){const b=a.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function Ut(C,b){const $=C.colorSpace,lt=C.format,ht=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Go||$!==Rn&&$!==sn&&(oe.getTransfer($)===fe?o===!1?t.has("EXT_sRGB")===!0&&lt===mn?(C.format=Go,C.minFilter=en,C.generateMipmaps=!1):b=Vc.sRGBToLinear(b):(lt!==mn||ht!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),b}this.allocateTextureUnit=L,this.resetTextureUnits=tt,this.setTexture2D=I,this.setTexture2DArray=W,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=ot,this.setupRenderTarget=F,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=z,this.useMultisampledRTT=Mt}function pg(n,t,e){const i=e.isWebGL2;function s(r,a=sn){let o;const l=oe.getTransfer(a);if(r===ri)return n.UNSIGNED_BYTE;if(r===Ic)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Nc)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Uu)return n.BYTE;if(r===Iu)return n.SHORT;if(r===na)return n.UNSIGNED_SHORT;if(r===Uc)return n.INT;if(r===ti)return n.UNSIGNED_INT;if(r===ei)return n.FLOAT;if(r===Ts)return i?n.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Nu)return n.ALPHA;if(r===mn)return n.RGBA;if(r===Fu)return n.LUMINANCE;if(r===Ou)return n.LUMINANCE_ALPHA;if(r===wi)return n.DEPTH_COMPONENT;if(r===os)return n.DEPTH_STENCIL;if(r===Go)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===zu)return n.RED;if(r===Fc)return n.RED_INTEGER;if(r===Bu)return n.RG;if(r===Oc)return n.RG_INTEGER;if(r===zc)return n.RGBA_INTEGER;if(r===Wr||r===$r||r===Xr||r===qr)if(l===fe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Wr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===$r)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Xr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===qr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Wr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===$r)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Xr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===qr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Da||r===Ua||r===Ia||r===Na)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Da)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ua)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ia)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Na)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Bc)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Fa||r===Oa)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Fa)return l===fe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Oa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===za||r===Ba||r===ka||r===Ha||r===Ga||r===Va||r===Wa||r===$a||r===Xa||r===qa||r===Ya||r===ja||r===Za||r===Ka)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===za)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ba)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ka)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ha)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ga)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Va)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Wa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===$a)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Xa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ya)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ja)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Za)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ka)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Yr||r===Ja||r===Qa)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Yr)return l===fe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ja)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Qa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ku||r===tl||r===el||r===nl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Yr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===tl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===el)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===nl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ti?i?n.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class mg extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class _s extends Ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gg={type:"move"};class vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _s,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _s,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _s,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,i),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new _s;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class _g extends cs{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=e.getContextAttributes();let p=null,m=null;const M=[],v=[],E=new se;let R=null;const S=new nn;S.layers.enable(1),S.viewport=new ge;const w=new nn;w.layers.enable(2),w.viewport=new ge;const k=[S,w],y=new mg;y.layers.enable(1),y.layers.enable(2);let T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let et=M[V];return et===void 0&&(et=new vo,M[V]=et),et.getTargetRaySpace()},this.getControllerGrip=function(V){let et=M[V];return et===void 0&&(et=new vo,M[V]=et),et.getGripSpace()},this.getHand=function(V){let et=M[V];return et===void 0&&(et=new vo,M[V]=et),et.getHandSpace()};function J(V){const et=v.indexOf(V.inputSource);if(et===-1)return;const rt=M[et];rt!==void 0&&(rt.update(V.inputSource,V.frame,c||a),rt.dispatchEvent({type:V.type,data:V.inputSource}))}function tt(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",tt),s.removeEventListener("inputsourceschange",L);for(let V=0;V<M.length;V++){const et=v[V];et!==null&&(v[V]=null,M[V].disconnect(et))}T=null,O=null,t.setRenderTarget(p),d=null,f=null,u=null,s=null,m=null,st.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",tt),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const et={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new Ri(d.framebufferWidth,d.framebufferHeight,{format:mn,type:ri,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let et=null,rt=null,B=null;_.depth&&(B=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=_.stencil?os:wi,rt=_.stencil?Ti:ti);const z={colorFormat:e.RGBA8,depthFormat:B,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(z),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),m=new Ri(f.textureWidth,f.textureHeight,{format:mn,type:ri,depthTexture:new nh(f.textureWidth,f.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const X=t.properties.get(m);X.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),st.setContext(s),st.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(V){for(let et=0;et<V.removed.length;et++){const rt=V.removed[et],B=v.indexOf(rt);B>=0&&(v[B]=null,M[B].disconnect(rt))}for(let et=0;et<V.added.length;et++){const rt=V.added[et];let B=v.indexOf(rt);if(B===-1){for(let X=0;X<M.length;X++)if(X>=v.length){v.push(rt),B=X;break}else if(v[X]===null){v[X]=rt,B=X;break}if(B===-1)break}const z=M[B];z&&z.connect(rt)}}const N=new G,I=new G;function W(V,et,rt){N.setFromMatrixPosition(et.matrixWorld),I.setFromMatrixPosition(rt.matrixWorld);const B=N.distanceTo(I),z=et.projectionMatrix.elements,X=rt.projectionMatrix.elements,K=z[14]/(z[10]-1),nt=z[14]/(z[10]+1),ot=(z[9]+1)/z[5],F=(z[9]-1)/z[5],Et=(z[8]-1)/z[0],vt=(X[8]+1)/X[0],At=K*Et,Mt=K*vt,Gt=B/(-Et+vt),Ut=Gt*-Et;et.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ut),V.translateZ(Gt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const C=K+Gt,b=nt+Gt,$=At-Ut,lt=Mt+(B-Ut),ht=ot*nt/b*C,ut=F*nt/b*C;V.projectionMatrix.makePerspective($,lt,ht,ut,C,b),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,et){et===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(et.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;y.near=w.near=S.near=V.near,y.far=w.far=S.far=V.far,(T!==y.near||O!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,O=y.far);const et=V.parent,rt=y.cameras;q(y,et);for(let B=0;B<rt.length;B++)q(rt[B],et);rt.length===2?W(y,S,w):y.projectionMatrix.copy(S.projectionMatrix),Y(V,y,et)};function Y(V,et,rt){rt===null?V.matrix.copy(et.matrixWorld):(V.matrix.copy(rt.matrixWorld),V.matrix.invert(),V.matrix.multiply(et.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(et.projectionMatrix),V.projectionMatrixInverse.copy(et.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ws*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)};let at=null;function U(V,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const rt=h.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let B=!1;rt.length!==y.cameras.length&&(y.cameras.length=0,B=!0);for(let z=0;z<rt.length;z++){const X=rt[z];let K=null;if(d!==null)K=d.getViewport(X);else{const ot=u.getViewSubImage(f,X);K=ot.viewport,z===0&&(t.setRenderTargetTextures(m,ot.colorTexture,f.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(m))}let nt=k[z];nt===void 0&&(nt=new nn,nt.layers.enable(z),nt.viewport=new ge,k[z]=nt),nt.matrix.fromArray(X.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(X.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(K.x,K.y,K.width,K.height),z===0&&(y.matrix.copy(nt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),B===!0&&y.cameras.push(nt)}}for(let rt=0;rt<M.length;rt++){const B=v[rt],z=M[rt];B!==null&&z!==void 0&&z.update(B,et,c||a)}at&&at(V,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}const st=new eh;st.setAnimationLoop(U),this.setAnimationLoop=function(V){at=V},this.dispose=function(){}}}function vg(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Kc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,v,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,E)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===We&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===We&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=t.get(m).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===We&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Mg(n,t,e,i){let s={},r={},a=[];const o=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const E=v.program;i.uniformBlockBinding(M,E)}function c(M,v){let E=s[M.id];E===void 0&&(g(M),E=h(M),s[M.id]=E,M.addEventListener("dispose",p));const R=v.program;i.updateUBOMapping(M,R);const S=t.render.frame;r[M.id]!==S&&(f(M),r[M.id]=S)}function h(M){const v=u();M.__bindingPointIndex=v;const E=n.createBuffer(),R=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,E),E}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],E=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let S=0,w=E.length;S<w;S++){const k=Array.isArray(E[S])?E[S]:[E[S]];for(let y=0,T=k.length;y<T;y++){const O=k[y];if(d(O,S,y,R)===!0){const J=O.__offset,tt=Array.isArray(O.value)?O.value:[O.value];let L=0;for(let N=0;N<tt.length;N++){const I=tt[N],W=_(I);typeof I=="number"||typeof I=="boolean"?(O.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,J+L,O.__data)):I.isMatrix3?(O.__data[0]=I.elements[0],O.__data[1]=I.elements[1],O.__data[2]=I.elements[2],O.__data[3]=0,O.__data[4]=I.elements[3],O.__data[5]=I.elements[4],O.__data[6]=I.elements[5],O.__data[7]=0,O.__data[8]=I.elements[6],O.__data[9]=I.elements[7],O.__data[10]=I.elements[8],O.__data[11]=0):(I.toArray(O.__data,L),L+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,J,O.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,v,E,R){const S=M.value,w=v+"_"+E;if(R[w]===void 0)return typeof S=="number"||typeof S=="boolean"?R[w]=S:R[w]=S.clone(),!0;{const k=R[w];if(typeof S=="number"||typeof S=="boolean"){if(k!==S)return R[w]=S,!0}else if(k.equals(S)===!1)return k.copy(S),!0}return!1}function g(M){const v=M.uniforms;let E=0;const R=16;for(let w=0,k=v.length;w<k;w++){const y=Array.isArray(v[w])?v[w]:[v[w]];for(let T=0,O=y.length;T<O;T++){const J=y[T],tt=Array.isArray(J.value)?J.value:[J.value];for(let L=0,N=tt.length;L<N;L++){const I=tt[L],W=_(I),q=E%R;q!==0&&R-q<W.boundary&&(E+=R-q),J.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=E,E+=W.storage}}}const S=E%R;return S>0&&(E+=R-S),M.__size=E,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){const v=M.target;v.removeEventListener("dispose",p);const E=a.indexOf(v.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class lh{constructor(t={}){const{canvas:e=pf(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Re,this._useLegacyLights=!1,this.toneMapping=si,this.toneMappingExposure=1;const v=this;let E=!1,R=0,S=0,w=null,k=-1,y=null;const T=new ge,O=new ge;let J=null;const tt=new ne(0);let L=0,N=e.width,I=e.height,W=1,q=null,Y=null;const at=new ge(0,0,N,I),U=new ge(0,0,N,I);let st=!1;const V=new th;let et=!1,rt=!1,B=null;const z=new Te,X=new se,K=new G,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ot(){return w===null?W:1}let F=i;function Et(A,H){for(let Z=0;Z<A.length;Z++){const Q=A[Z],j=e.getContext(Q,H);if(j!==null)return j}return null}try{const A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ea}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const H=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&H.shift(),F=Et(H,A),F===null)throw Et(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let vt,At,Mt,Gt,Ut,C,b,$,lt,ht,ut,Tt,pt,St,Lt,kt,ct,te,Xt,Ot,Pt,bt,Nt,Jt;function ue(){vt=new Rm(F),At=new Sm(F,vt,t),vt.init(At),bt=new pg(F,vt,At),Mt=new fg(F,vt,At),Gt=new Dm(F),Ut=new J0,C=new dg(F,vt,Mt,Ut,At,bt,Gt),b=new Em(v),$=new Cm(v),lt=new Bf(F,At),Nt=new ym(F,vt,lt,At),ht=new Pm(F,lt,Gt,Nt),ut=new Fm(F,ht,lt,Gt),Xt=new Nm(F,At,C),kt=new bm(Ut),Tt=new K0(v,b,$,vt,At,Nt,kt),pt=new vg(v,Ut),St=new tg,Lt=new og(vt,At),te=new Mm(v,b,$,Mt,ut,f,l),ct=new ug(v,ut,At),Jt=new Mg(F,Gt,At,Mt),Ot=new xm(F,vt,Gt,At),Pt=new Lm(F,vt,Gt,At),Gt.programs=Tt.programs,v.capabilities=At,v.extensions=vt,v.properties=Ut,v.renderLists=St,v.shadowMap=ct,v.state=Mt,v.info=Gt}ue();const Yt=new _g(v,F);this.xr=Yt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=vt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=vt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(A){A!==void 0&&(W=A,this.setSize(N,I,!1))},this.getSize=function(A){return A.set(N,I)},this.setSize=function(A,H,Z=!0){if(Yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,I=H,e.width=Math.floor(A*W),e.height=Math.floor(H*W),Z===!0&&(e.style.width=A+"px",e.style.height=H+"px"),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(N*W,I*W).floor()},this.setDrawingBufferSize=function(A,H,Z){N=A,I=H,W=Z,e.width=Math.floor(A*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,A,H)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(at)},this.setViewport=function(A,H,Z,Q){A.isVector4?at.set(A.x,A.y,A.z,A.w):at.set(A,H,Z,Q),Mt.viewport(T.copy(at).multiplyScalar(W).floor())},this.getScissor=function(A){return A.copy(U)},this.setScissor=function(A,H,Z,Q){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,H,Z,Q),Mt.scissor(O.copy(U).multiplyScalar(W).floor())},this.getScissorTest=function(){return st},this.setScissorTest=function(A){Mt.setScissorTest(st=A)},this.setOpaqueSort=function(A){q=A},this.setTransparentSort=function(A){Y=A},this.getClearColor=function(A){return A.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(A=!0,H=!0,Z=!0){let Q=0;if(A){let j=!1;if(w!==null){const yt=w.texture.format;j=yt===zc||yt===Oc||yt===Fc}if(j){const yt=w.texture.type,Rt=yt===ri||yt===ti||yt===na||yt===Ti||yt===Ic||yt===Nc,It=te.getClearColor(),zt=te.getClearAlpha(),qt=It.r,Vt=It.g,Wt=It.b;Rt?(d[0]=qt,d[1]=Vt,d[2]=Wt,d[3]=zt,F.clearBufferuiv(F.COLOR,0,d)):(g[0]=qt,g[1]=Vt,g[2]=Wt,g[3]=zt,F.clearBufferiv(F.COLOR,0,g))}else Q|=F.COLOR_BUFFER_BIT}H&&(Q|=F.DEPTH_BUFFER_BIT),Z&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),St.dispose(),Lt.dispose(),Ut.dispose(),b.dispose(),$.dispose(),ut.dispose(),Nt.dispose(),Jt.dispose(),Tt.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",Fe),Yt.removeEventListener("sessionend",ce),B&&(B.dispose(),B=null),Oe.stop()};function dt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=Gt.autoReset,H=ct.enabled,Z=ct.autoUpdate,Q=ct.needsUpdate,j=ct.type;ue(),Gt.autoReset=A,ct.enabled=H,ct.autoUpdate=Z,ct.needsUpdate=Q,ct.type=j}function gt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function _t(A){const H=A.target;H.removeEventListener("dispose",_t),Ft(H)}function Ft(A){Dt(A),Ut.remove(A)}function Dt(A){const H=Ut.get(A).programs;H!==void 0&&(H.forEach(function(Z){Tt.releaseProgram(Z)}),A.isShaderMaterial&&Tt.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,Z,Q,j,yt){H===null&&(H=nt);const Rt=j.isMesh&&j.matrixWorld.determinant()<0,It=qh(A,H,Z,Q,j);Mt.setMaterial(Q,Rt);let zt=Z.index,qt=1;if(Q.wireframe===!0){if(zt=ht.getWireframeAttribute(Z),zt===void 0)return;qt=2}const Vt=Z.drawRange,Wt=Z.attributes.position;let me=Vt.start*qt,Xe=(Vt.start+Vt.count)*qt;yt!==null&&(me=Math.max(me,yt.start*qt),Xe=Math.min(Xe,(yt.start+yt.count)*qt)),zt!==null?(me=Math.max(me,0),Xe=Math.min(Xe,zt.count)):Wt!=null&&(me=Math.max(me,0),Xe=Math.min(Xe,Wt.count));const be=Xe-me;if(be<0||be===1/0)return;Nt.setup(j,Q,It,Z,zt);let Dn,de=Ot;if(zt!==null&&(Dn=lt.get(zt),de=Pt,de.setIndex(Dn)),j.isMesh)Q.wireframe===!0?(Mt.setLineWidth(Q.wireframeLinewidth*ot()),de.setMode(F.LINES)):de.setMode(F.TRIANGLES);else if(j.isLine){let jt=Q.linewidth;jt===void 0&&(jt=1),Mt.setLineWidth(jt*ot()),j.isLineSegments?de.setMode(F.LINES):j.isLineLoop?de.setMode(F.LINE_LOOP):de.setMode(F.LINE_STRIP)}else j.isPoints?de.setMode(F.POINTS):j.isSprite&&de.setMode(F.TRIANGLES);if(j.isBatchedMesh)de.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)de.renderInstances(me,be,j.count);else if(Z.isInstancedBufferGeometry){const jt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Or=Math.min(Z.instanceCount,jt);de.renderInstances(me,be,Or)}else de.render(me,be)};function ae(A,H,Z){A.transparent===!0&&A.side===Gn&&A.forceSinglePass===!1?(A.side=We,A.needsUpdate=!0,Us(A,H,Z),A.side=oi,A.needsUpdate=!0,Us(A,H,Z),A.side=Gn):Us(A,H,Z)}this.compile=function(A,H,Z=null){Z===null&&(Z=A),p=Lt.get(Z),p.init(),M.push(p),Z.traverseVisible(function(j){j.isLight&&j.layers.test(H.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),A!==Z&&A.traverseVisible(function(j){j.isLight&&j.layers.test(H.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights(v._useLegacyLights);const Q=new Set;return A.traverse(function(j){const yt=j.material;if(yt)if(Array.isArray(yt))for(let Rt=0;Rt<yt.length;Rt++){const It=yt[Rt];ae(It,Z,j),Q.add(It)}else ae(yt,Z,j),Q.add(yt)}),M.pop(),p=null,Q},this.compileAsync=function(A,H,Z=null){const Q=this.compile(A,H,Z);return new Promise(j=>{function yt(){if(Q.forEach(function(Rt){Ut.get(Rt).currentProgram.isReady()&&Q.delete(Rt)}),Q.size===0){j(A);return}setTimeout(yt,10)}vt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let le=null;function Se(A){le&&le(A)}function Fe(){Oe.stop()}function ce(){Oe.start()}const Oe=new eh;Oe.setAnimationLoop(Se),typeof self<"u"&&Oe.setContext(self),this.setAnimationLoop=function(A){le=A,Yt.setAnimationLoop(A),A===null?Oe.stop():Oe.start()},Yt.addEventListener("sessionstart",Fe),Yt.addEventListener("sessionend",ce),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(H),H=Yt.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,H,w),p=Lt.get(A,M.length),p.init(),M.push(p),z.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),V.setFromProjectionMatrix(z),rt=this.localClippingEnabled,et=kt.init(this.clippingPlanes,rt),_=St.get(A,m.length),_.init(),m.push(_),vn(A,H,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,Y),this.info.render.frame++,et===!0&&kt.beginShadows();const Z=p.state.shadowsArray;if(ct.render(Z,A,H),et===!0&&kt.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(_,A),p.setupLights(v._useLegacyLights),H.isArrayCamera){const Q=H.cameras;for(let j=0,yt=Q.length;j<yt;j++){const Rt=Q[j];ya(_,A,Rt,Rt.viewport)}}else ya(_,A,H);w!==null&&(C.updateMultisampleRenderTarget(w),C.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(v,A,H),Nt.resetDefaultState(),k=-1,y=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function vn(A,H,Z,Q){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||V.intersectsSprite(A)){Q&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(z);const Rt=ut.update(A),It=A.material;It.visible&&_.push(A,Rt,It,Z,K.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||V.intersectsObject(A))){const Rt=ut.update(A),It=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),K.copy(A.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),K.copy(Rt.boundingSphere.center)),K.applyMatrix4(A.matrixWorld).applyMatrix4(z)),Array.isArray(It)){const zt=Rt.groups;for(let qt=0,Vt=zt.length;qt<Vt;qt++){const Wt=zt[qt],me=It[Wt.materialIndex];me&&me.visible&&_.push(A,Rt,me,Z,K.z,Wt)}}else It.visible&&_.push(A,Rt,It,Z,K.z,null)}}const yt=A.children;for(let Rt=0,It=yt.length;Rt<It;Rt++)vn(yt[Rt],H,Z,Q)}function ya(A,H,Z,Q){const j=A.opaque,yt=A.transmissive,Rt=A.transparent;p.setupLightsView(Z),et===!0&&kt.setGlobalState(v.clippingPlanes,Z),yt.length>0&&Xh(j,yt,H,Z),Q&&Mt.viewport(T.copy(Q)),j.length>0&&Ds(j,H,Z),yt.length>0&&Ds(yt,H,Z),Rt.length>0&&Ds(Rt,H,Z),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Xh(A,H,Z,Q){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;const yt=At.isWebGL2;B===null&&(B=new Ri(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")?Ts:ri,minFilter:Es,samples:yt?4:0})),v.getDrawingBufferSize(X),yt?B.setSize(X.x,X.y):B.setSize(br(X.x),br(X.y));const Rt=v.getRenderTarget();v.setRenderTarget(B),v.getClearColor(tt),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const It=v.toneMapping;v.toneMapping=si,Ds(A,Z,Q),C.updateMultisampleRenderTarget(B),C.updateRenderTargetMipmap(B);let zt=!1;for(let qt=0,Vt=H.length;qt<Vt;qt++){const Wt=H[qt],me=Wt.object,Xe=Wt.geometry,be=Wt.material,Dn=Wt.group;if(be.side===Gn&&me.layers.test(Q.layers)){const de=be.side;be.side=We,be.needsUpdate=!0,xa(me,Z,Q,Xe,be,Dn),be.side=de,be.needsUpdate=!0,zt=!0}}zt===!0&&(C.updateMultisampleRenderTarget(B),C.updateRenderTargetMipmap(B)),v.setRenderTarget(Rt),v.setClearColor(tt,L),v.toneMapping=It}function Ds(A,H,Z){const Q=H.isScene===!0?H.overrideMaterial:null;for(let j=0,yt=A.length;j<yt;j++){const Rt=A[j],It=Rt.object,zt=Rt.geometry,qt=Q===null?Rt.material:Q,Vt=Rt.group;It.layers.test(Z.layers)&&xa(It,H,Z,zt,qt,Vt)}}function xa(A,H,Z,Q,j,yt){A.onBeforeRender(v,H,Z,Q,j,yt),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),j.onBeforeRender(v,H,Z,Q,A,yt),j.transparent===!0&&j.side===Gn&&j.forceSinglePass===!1?(j.side=We,j.needsUpdate=!0,v.renderBufferDirect(Z,H,Q,j,A,yt),j.side=oi,j.needsUpdate=!0,v.renderBufferDirect(Z,H,Q,j,A,yt),j.side=Gn):v.renderBufferDirect(Z,H,Q,j,A,yt),A.onAfterRender(v,H,Z,Q,j,yt)}function Us(A,H,Z){H.isScene!==!0&&(H=nt);const Q=Ut.get(A),j=p.state.lights,yt=p.state.shadowsArray,Rt=j.state.version,It=Tt.getParameters(A,j.state,yt,H,Z),zt=Tt.getProgramCacheKey(It);let qt=Q.programs;Q.environment=A.isMeshStandardMaterial?H.environment:null,Q.fog=H.fog,Q.envMap=(A.isMeshStandardMaterial?$:b).get(A.envMap||Q.environment),qt===void 0&&(A.addEventListener("dispose",_t),qt=new Map,Q.programs=qt);let Vt=qt.get(zt);if(Vt!==void 0){if(Q.currentProgram===Vt&&Q.lightsStateVersion===Rt)return ba(A,It),Vt}else It.uniforms=Tt.getUniforms(A),A.onBuild(Z,It,v),A.onBeforeCompile(It,v),Vt=Tt.acquireProgram(It,zt),qt.set(zt,Vt),Q.uniforms=It.uniforms;const Wt=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Wt.clippingPlanes=kt.uniform),ba(A,It),Q.needsLights=jh(A),Q.lightsStateVersion=Rt,Q.needsLights&&(Wt.ambientLightColor.value=j.state.ambient,Wt.lightProbe.value=j.state.probe,Wt.directionalLights.value=j.state.directional,Wt.directionalLightShadows.value=j.state.directionalShadow,Wt.spotLights.value=j.state.spot,Wt.spotLightShadows.value=j.state.spotShadow,Wt.rectAreaLights.value=j.state.rectArea,Wt.ltc_1.value=j.state.rectAreaLTC1,Wt.ltc_2.value=j.state.rectAreaLTC2,Wt.pointLights.value=j.state.point,Wt.pointLightShadows.value=j.state.pointShadow,Wt.hemisphereLights.value=j.state.hemi,Wt.directionalShadowMap.value=j.state.directionalShadowMap,Wt.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Wt.spotShadowMap.value=j.state.spotShadowMap,Wt.spotLightMatrix.value=j.state.spotLightMatrix,Wt.spotLightMap.value=j.state.spotLightMap,Wt.pointShadowMap.value=j.state.pointShadowMap,Wt.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.currentProgram=Vt,Q.uniformsList=null,Vt}function Sa(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=pr.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function ba(A,H){const Z=Ut.get(A);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function qh(A,H,Z,Q,j){H.isScene!==!0&&(H=nt),C.resetTextureUnits();const yt=H.fog,Rt=Q.isMeshStandardMaterial?H.environment:null,It=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Rn,zt=(Q.isMeshStandardMaterial?$:b).get(Q.envMap||Rt),qt=Q.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Vt=!!Z.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Wt=!!Z.morphAttributes.position,me=!!Z.morphAttributes.normal,Xe=!!Z.morphAttributes.color;let be=si;Q.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(be=v.toneMapping);const Dn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,de=Dn!==void 0?Dn.length:0,jt=Ut.get(Q),Or=p.state.lights;if(et===!0&&(rt===!0||A!==y)){const Qe=A===y&&Q.id===k;kt.setState(Q,A,Qe)}let pe=!1;Q.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Or.state.version||jt.outputColorSpace!==It||j.isBatchedMesh&&jt.batching===!1||!j.isBatchedMesh&&jt.batching===!0||j.isInstancedMesh&&jt.instancing===!1||!j.isInstancedMesh&&jt.instancing===!0||j.isSkinnedMesh&&jt.skinning===!1||!j.isSkinnedMesh&&jt.skinning===!0||j.isInstancedMesh&&jt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&jt.instancingColor===!1&&j.instanceColor!==null||jt.envMap!==zt||Q.fog===!0&&jt.fog!==yt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==kt.numPlanes||jt.numIntersection!==kt.numIntersection)||jt.vertexAlphas!==qt||jt.vertexTangents!==Vt||jt.morphTargets!==Wt||jt.morphNormals!==me||jt.morphColors!==Xe||jt.toneMapping!==be||At.isWebGL2===!0&&jt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,jt.__version=Q.version);let ci=jt.currentProgram;pe===!0&&(ci=Us(Q,H,j));let Ea=!1,fs=!1,zr=!1;const Pe=ci.getUniforms(),hi=jt.uniforms;if(Mt.useProgram(ci.program)&&(Ea=!0,fs=!0,zr=!0),Q.id!==k&&(k=Q.id,fs=!0),Ea||y!==A){Pe.setValue(F,"projectionMatrix",A.projectionMatrix),Pe.setValue(F,"viewMatrix",A.matrixWorldInverse);const Qe=Pe.map.cameraPosition;Qe!==void 0&&Qe.setValue(F,K.setFromMatrixPosition(A.matrixWorld)),At.logarithmicDepthBuffer&&Pe.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Pe.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,fs=!0,zr=!0)}if(j.isSkinnedMesh){Pe.setOptional(F,j,"bindMatrix"),Pe.setOptional(F,j,"bindMatrixInverse");const Qe=j.skeleton;Qe&&(At.floatVertexTextures?(Qe.boneTexture===null&&Qe.computeBoneTexture(),Pe.setValue(F,"boneTexture",Qe.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(Pe.setOptional(F,j,"batchingTexture"),Pe.setValue(F,"batchingTexture",j._matricesTexture,C));const Br=Z.morphAttributes;if((Br.position!==void 0||Br.normal!==void 0||Br.color!==void 0&&At.isWebGL2===!0)&&Xt.update(j,Z,ci),(fs||jt.receiveShadow!==j.receiveShadow)&&(jt.receiveShadow=j.receiveShadow,Pe.setValue(F,"receiveShadow",j.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(hi.envMap.value=zt,hi.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),fs&&(Pe.setValue(F,"toneMappingExposure",v.toneMappingExposure),jt.needsLights&&Yh(hi,zr),yt&&Q.fog===!0&&pt.refreshFogUniforms(hi,yt),pt.refreshMaterialUniforms(hi,Q,W,I,B),pr.upload(F,Sa(jt),hi,C)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(pr.upload(F,Sa(jt),hi,C),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Pe.setValue(F,"center",j.center),Pe.setValue(F,"modelViewMatrix",j.modelViewMatrix),Pe.setValue(F,"normalMatrix",j.normalMatrix),Pe.setValue(F,"modelMatrix",j.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const Qe=Q.uniformsGroups;for(let kr=0,Zh=Qe.length;kr<Zh;kr++)if(At.isWebGL2){const Ta=Qe[kr];Jt.update(Ta,ci),Jt.bind(Ta,ci)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ci}function Yh(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function jh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,H,Z){Ut.get(A.texture).__webglTexture=H,Ut.get(A.depthTexture).__webglTexture=Z;const Q=Ut.get(A);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=Z===void 0,Q.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,H){const Z=Ut.get(A);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,Z=0){w=A,R=H,S=Z;let Q=!0,j=null,yt=!1,Rt=!1;if(A){const zt=Ut.get(A);zt.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(F.FRAMEBUFFER,null),Q=!1):zt.__webglFramebuffer===void 0?C.setupRenderTarget(A):zt.__hasExternalTextures&&C.rebindTextures(A,Ut.get(A.texture).__webglTexture,Ut.get(A.depthTexture).__webglTexture);const qt=A.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Rt=!0);const Vt=Ut.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[H])?j=Vt[H][Z]:j=Vt[H],yt=!0):At.isWebGL2&&A.samples>0&&C.useMultisampledRTT(A)===!1?j=Ut.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?j=Vt[Z]:j=Vt,T.copy(A.viewport),O.copy(A.scissor),J=A.scissorTest}else T.copy(at).multiplyScalar(W).floor(),O.copy(U).multiplyScalar(W).floor(),J=st;if(Mt.bindFramebuffer(F.FRAMEBUFFER,j)&&At.drawBuffers&&Q&&Mt.drawBuffers(A,j),Mt.viewport(T),Mt.scissor(O),Mt.setScissorTest(J),yt){const zt=Ut.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,zt.__webglTexture,Z)}else if(Rt){const zt=Ut.get(A.texture),qt=H||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,zt.__webglTexture,Z||0,qt)}k=-1},this.readRenderTargetPixels=function(A,H,Z,Q,j,yt,Rt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=Ut.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(It=It[Rt]),It){Mt.bindFramebuffer(F.FRAMEBUFFER,It);try{const zt=A.texture,qt=zt.format,Vt=zt.type;if(qt!==mn&&bt.convert(qt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Wt=Vt===Ts&&(vt.has("EXT_color_buffer_half_float")||At.isWebGL2&&vt.has("EXT_color_buffer_float"));if(Vt!==ri&&bt.convert(Vt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===ei&&(At.isWebGL2||vt.has("OES_texture_float")||vt.has("WEBGL_color_buffer_float")))&&!Wt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-Q&&Z>=0&&Z<=A.height-j&&F.readPixels(H,Z,Q,j,bt.convert(qt),bt.convert(Vt),yt)}finally{const zt=w!==null?Ut.get(w).__webglFramebuffer:null;Mt.bindFramebuffer(F.FRAMEBUFFER,zt)}}},this.copyFramebufferToTexture=function(A,H,Z=0){const Q=Math.pow(2,-Z),j=Math.floor(H.image.width*Q),yt=Math.floor(H.image.height*Q);C.setTexture2D(H,0),F.copyTexSubImage2D(F.TEXTURE_2D,Z,0,0,A.x,A.y,j,yt),Mt.unbindTexture()},this.copyTextureToTexture=function(A,H,Z,Q=0){const j=H.image.width,yt=H.image.height,Rt=bt.convert(Z.format),It=bt.convert(Z.type);C.setTexture2D(Z,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Z.unpackAlignment),H.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Q,A.x,A.y,j,yt,Rt,It,H.image.data):H.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Q,A.x,A.y,H.mipmaps[0].width,H.mipmaps[0].height,Rt,H.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,Q,A.x,A.y,Rt,It,H.image),Q===0&&Z.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(A,H,Z,Q,j=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const yt=A.max.x-A.min.x+1,Rt=A.max.y-A.min.y+1,It=A.max.z-A.min.z+1,zt=bt.convert(Q.format),qt=bt.convert(Q.type);let Vt;if(Q.isData3DTexture)C.setTexture3D(Q,0),Vt=F.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)C.setTexture2DArray(Q,0),Vt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Q.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Q.unpackAlignment);const Wt=F.getParameter(F.UNPACK_ROW_LENGTH),me=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Xe=F.getParameter(F.UNPACK_SKIP_PIXELS),be=F.getParameter(F.UNPACK_SKIP_ROWS),Dn=F.getParameter(F.UNPACK_SKIP_IMAGES),de=Z.isCompressedTexture?Z.mipmaps[j]:Z.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,de.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,de.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,A.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,A.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,A.min.z),Z.isDataTexture||Z.isData3DTexture?F.texSubImage3D(Vt,j,H.x,H.y,H.z,yt,Rt,It,zt,qt,de.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Vt,j,H.x,H.y,H.z,yt,Rt,It,zt,de.data)):F.texSubImage3D(Vt,j,H.x,H.y,H.z,yt,Rt,It,zt,qt,de),F.pixelStorei(F.UNPACK_ROW_LENGTH,Wt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,me),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Xe),F.pixelStorei(F.UNPACK_SKIP_ROWS,be),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Dn),j===0&&Q.generateMipmaps&&F.generateMipmap(Vt),Mt.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),Mt.unbindTexture()},this.resetState=function(){R=0,S=0,w=null,Mt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ia?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Dr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Re?Ai:kc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ai?Re:Rn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class yg extends lh{}yg.prototype.isWebGL1Renderer=!0;class la{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new ne(t),this.near=e,this.far=i}clone(){return new la(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class xg extends Ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Sg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new G;class rn{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new gn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new rn(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bg extends qn{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,s=new G,r=new G;if(t.index!==null){const a=t.attributes.position,o=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],f=u.start,d=u.count;for(let g=f,_=f+d;g<_;g+=3)for(let p=0;p<3;p++){const m=o.getX(g+p),M=o.getX(g+(p+1)%3);s.fromBufferAttribute(a,m),r.fromBufferAttribute(a,M),$l(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const a=t.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,u=3*o+(c+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,u),$l(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Cn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function $l(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(s)===!0?!1:(e.add(i),e.add(s),!0)}class Eg extends qn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class As extends Sg{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Xl=new G,nr=new G;class Tg{constructor(t=new G,e=new G){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Xl.subVectors(t,this.start),nr.subVectors(this.end,this.start);const i=nr.dot(nr);let r=nr.dot(Xl)/i;return e&&(r=Ie(r,0,1)),r}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ea);const wg={songbird:{view:{x0:-4,x1:14,y0:-6,y1:8},silhouette:[[-3.2,-1.2],[-1.6,-3.4],[1.6,-4.6],[5.2,-4.4],[7.8,-2.6],[9,-.4],[9.6,1.8],[10.4,2.4],[12.8,2.6],[10.6,3],[9.8,3.6],[9.2,4.6],[7.6,5.2],[6,4.6],[4.2,2.8],[2,2],[-.2,1.6],[-3.6,1.4],[-3.4,.2]],parts:[{shade:.2,pts:[[8.6,4],[8.95,4.3],[9.2,4],[8.95,3.7]]}],tubes:[{tube:"bronchusL",path:[[3.4,-1.9],[4.4,-1.4]],label:"Left bronchus",inView:!1},{tube:"bronchusR",path:[[3.4,-.9],[4.4,-1.2]],label:"Right bronchus",inView:!1},{tube:"trachea",path:[[4.4,-1.3],[5.6,-.4],[6.8,.8],[7.8,1.9],[8.6,2.5]],label:"Trachea"},{tube:"beak",path:[[9.4,2.75],[10.6,2.75],[12.4,2.7]],label:"Beak"}],tubeScale:1.6,sources:[{key:"left",at:[4.2,-1.6],label:"Left voice"},{key:"right",at:[4.2,-1],label:"Right voice"}]},seal:{view:{x0:-60,x1:60,y0:-30,y1:30},silhouette:[[-58,-2],[-50,-8],[-30,-14],[-5,-16],[20,-14],[38,-10],[48,-6],[55,-3],[58,1],[56,5],[50,8],[42,10],[30,11],[10,13],[-15,13],[-35,10],[-50,6],[-56,3],[-62,8],[-64,4],[-60,0],[-64,-4],[-62,-8]],parts:[{shade:.15,pts:[[47,4],[48.5,5],[50,4],[48.5,3]]}],tubes:[{tube:"trachea",path:[[8,-4],[20,-3],[30,-2]],label:"Trachea"},{tube:"pharynx",path:[[30,-2],[38,0],[44,1.5]],label:"Pharynx"},{tube:"oral",path:[[44,1.5],[50,.5],[57,-.5]],label:"Mouth"}],tubeScale:1.3,sources:[{key:"glottis",at:[30,-2],label:"Larynx"}]},alligator:{view:{x0:-120,x1:120,y0:-40,y1:40},silhouette:[[-118,2],[-90,-4],[-60,-8],[-30,-14],[0,-16],[30,-14],[50,-10],[70,-8],[95,-5],[114,-3],[118,0],[115,3],[98,5],[75,7],[52,9],[40,12],[20,14],[-10,14],[-40,11],[-70,7],[-100,4]],parts:[{shade:.15,pts:[[54,9],[56,11],[58,9],[56,8]]}],tubes:[{tube:"trachea",path:[[0,-6],[18,-5],[36,-4]],label:"Trachea"},{tube:"pharynx",path:[[36,-4],[46,-2],[54,0]],label:"Pharynx"},{tube:"oral",path:[[54,0],[80,-1],[112,-1]],label:"Mouth"},{tube:"nasal",path:[[54,2],[80,4],[113,2]],label:"Nostrils"}],tubeScale:1.05,sources:[{key:"glottis",at:[36,-4],label:"Larynx"}]},elephant:{view:{x0:-170,x1:170,y0:-170,y1:130},silhouette:[[-160,20],[-150,70],[-110,105],[-40,118],[30,115],[70,100],[95,112],[120,108],[140,85],[148,55],[146,25],[140,5],[132,-20],[128,-60],[122,-110],[118,-150],[108,-152],[112,-100],[110,-50],[104,-20],[96,-5],[80,0],[70,-10],[66,-90],[40,-95],[44,-30],[-90,-30],[-95,-95],[-125,-95],[-122,-10],[-150,-5]],parts:[{shade:.15,pts:[[118,62],[122,66],[126,62],[122,58]]},{shade:.62,pts:[[70,100],[40,60],[55,25],[85,40],[95,80]]}],tubes:[{tube:"trachea",path:[[40,20],[70,30],[95,38]],label:"Trachea"},{tube:"pharynx",path:[[95,38],[112,50],[124,58]],label:"Pharynx"},{tube:"oral",path:[[124,58],[130,42],[134,30]],label:"Mouth"},{tube:"trunk",path:[[136,70],[142,40],[136,0],[128,-50],[120,-100],[113,-148]],label:"Trunk"}],tubeScale:3,sources:[{key:"glottis",at:[95,38],label:"Vocal folds"},{key:"lips",at:[136,70],label:"Trunk valve"}]}},Ge=ls("catalog"),Tr=Ge.neutral;Ge.bodies.male;Ge.bodies.female;Ge.bodies.child;const Si=Ge.articKeys;Ge.articSpecs;Ge.defaultSource;Ge.exhaleLabel;Ge.bassNote;Ge.beatSounds;Ge.beatPresets;const Ag=Ge.vowelTargets;Ge.demoSongs;const Cg=Ge.vowels;Ge.creatures.map(n=>({...n,visual:wg[n.id]}));class Rg{constructor(t){this.scale=t.scale,this.ph=t.pharynx}P(t,e){const i=this.scale,s=t>.5?.5+(t-.5)*.86:t,r=e<7?7-(7-e)*this.ph:e;return{x:s*i,y:r*i}}unP(t,e){const i=this.scale;let s=t/i,r=e/i;return s>.5&&(s=.5+(s-.5)/.86),r<7&&(r=7-(7-r)/this.ph),{x:s,y:r}}}function Pg(n,t){return ls("model",{body:n,sampleRate:t})}function Lg(n){ls("dropModel",{model:n.model})}function Dg(n,t){return ls("frame",{model:n.model,artic:t})}function Ug(n,t){return ls("apply",{model:n.model,artic:t})}function Ig(n,t){return ls("transfer",{model:n.model,artic:t})}const mt={blue:"#4fb6f2",blueMid:"#3487c4",blueDim:"#1f5f8c",frame:"#133954",green:"#5be381",red:"#ff5d40",pink:"#ff73cf",white:"#eef6f8",amber:"#ffb340"};mt.green,mt.red,mt.pink,mt.white;function an(n,t,e){const i=parseInt(n.slice(1),16),s=parseInt(t.slice(1),16),r=a=>Math.round((i>>a&255)*(1-e)+(s>>a&255)*e);return"#"+[16,8,0].map(a=>r(a).toString(16).padStart(2,"0")).join("")}const ca=n=>an(n,"#ffffff",.55),zn=[[0,"#3a2408"],[.35,"#c9822a"],[.6,"#ffb340"],[.82,"#ffe39a"],[1,"#fff8ec"]];function Ng(n){const t=Math.max(0,Math.min(1,n));for(let e=1;e<zn.length;e++)if(t<=zn[e][0])return an(zn[e-1][1],zn[e][1],(t-zn[e-1][0])/(zn[e][0]-zn[e-1][0]));return zn[zn.length-1][1]}mt.frame,mt.blue,mt.blueMid,mt.amber;const Fg=n=>{if(!(n>0))return 0;const t=Math.log10(40),e=Math.log10(4e3);return Math.max(0,Math.min(1,(Math.log10(n)-t)/(e-t)))},Og=(n,t)=>Math.hypot(n.x-t.x,n.y-t.y),ch=(n,t,e)=>{const i=Math.sin(e),s=Math.cos(e),r=n.x-t.x,a=n.y-t.y;return{x:t.x+r*s-a*i,y:t.y+r*i+a*s}};function kn(n,t){if(n.length<3)return n.slice();const e=[];for(let i=0;i<n.length-1;i++){const s=n[Math.max(0,i-1)],r=n[i],a=n[i+1],o=n[Math.min(n.length-1,i+2)];for(let l=0;l<t;l++){const c=l/t,h=c*c,u=h*c;e.push({x:.5*(2*r.x+(-s.x+a.x)*c+(2*s.x-5*r.x+4*a.x-o.x)*h+(-s.x+3*r.x-3*a.x+o.x)*u),y:.5*(2*r.y+(-s.y+a.y)*c+(2*s.y-5*r.y+4*a.y-o.y)*h+(-s.y+3*r.y-3*a.y+o.y)*u)})}}return e.push(n[n.length-1]),e}const hh='"Hershey", "Archivo", system-ui, sans-serif',ha=(n,t="l")=>`${t==="m"?500:300} ${n}px ${hh}`,uh=typeof CanvasRenderingContext2D<"u"&&"letterSpacing"in CanvasRenderingContext2D.prototype;function fh(n,t=!1){const e=new Path2D;if(n.length===0)return e;e.moveTo(n[0][0],n[0][1]);for(let i=1;i<n.length;i++)e.lineTo(n[i][0],n[i][1]);return t&&e.closePath(),e}function it(n,t,e,i,s={}){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.lineJoin="round",n.lineCap="round",n.setLineDash(s.dash??[]),n.strokeStyle=e,n.lineWidth=i,n.stroke(t),s.hot&&(n.globalCompositeOperation="source-over",n.strokeStyle=ca(e),n.lineWidth=i*.42,n.stroke(t)),n.restore()}function dh(n,t,e,i,s={}){t.length<2||it(n,fh(t,s.close),e,i,s)}function Bt(n,t,e,i,s,r,a,o={}){const l=new Path2D;l.moveTo(t,e),l.lineTo(i,s),it(n,l,r,a,o)}function Ne(n,t,e,i,s,r=1.2,a={}){const o=new Path2D;o.arc(t,e,i,0,Math.PI*2),it(n,o,s,r,a)}function _e(n,t,e,i,s,r=1){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=r,n.fillStyle=s,n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.fill(),n.restore()}function xt(n,t,e,i,s={}){const r=s.size??11;n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.font=ha(r,s.weight),uh&&(n.letterSpacing=`${((s.ls??.14)*r).toFixed(2)}px`),n.textAlign=s.align??"left",n.textBaseline=s.baseline??"alphabetic",n.fillStyle=s.color??mt.blue;const a=n;s.moving&&(a.layoutMoving=!0),n.fillText(t,e,i),a.layoutMoving=void 0,n.restore()}function he(n,t,e={}){const i=e.size??11;n.save(),n.font=ha(i,e.weight),uh&&(n.letterSpacing=`${((e.ls??.14)*i).toFixed(2)}px`);const s=n.measureText(t).width;return n.restore(),s}function Li(n,t,e,i={}){const s=[];for(const r of t.split(/\s+/)){const a=s[s.length-1];a!==void 0&&he(n,`${a} ${r}`,i)<=e?s[s.length-1]=`${a} ${r}`:s.push(r)}return s}const zg=(n=11)=>n*1.6;function ph(n,t,e,i,s,r={}){const a=r.size??11,o=Li(n,t,s,r),l=zg(a),c=i-(o.length-1)*l/2+a*.35;o.forEach((h,u)=>xt(n,h,e,c+u*l,r))}function $o(n,t=2){let e=n.length>1&&n[0][0]===n[n.length-1][0]&&n[0][1]===n[n.length-1][1]?n.slice(0,-1):n.slice();for(let i=0;i<t;i++){const s=[];for(let r=0;r<e.length;r++){const a=e[r],o=e[(r+1)%e.length];s.push([a[0]*.75+o[0]*.25,a[1]*.75+o[1]*.25],[a[0]*.25+o[0]*.75,a[1]*.25+o[1]*.75])}e=s}return e.length?[...e,e[0]]:e}class mh{constructor(t=2,e=.75,i=4){this.sigma=t,this.alpha=e,this.down=i,this.small=document.createElement("canvas"),this.sctx=this.small.getContext("2d"),this.canFilter=typeof this.sctx.filter=="string"}apply(t,e,i){const s=t.width,r=t.height,a=Math.max(1,Math.round(s/this.down)),o=Math.max(1,Math.round(r/this.down));(this.small.width!==a||this.small.height!==o)&&(this.small.width=a,this.small.height=o);const l=this.sctx;l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation="copy",this.canFilter&&(l.filter=`blur(${(this.sigma*i/this.down).toFixed(2)}px)`),l.drawImage(t,0,0,a,o),this.canFilter&&(l.filter="none"),e.save(),e.setTransform(1,0,0,1,0,0),e.globalCompositeOperation="screen",e.globalAlpha=this.alpha,e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.small,0,0,s,r),e.restore()}}const ql=new li,ir=new G;class Xo extends Eg{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Cn(t,3)),this.setAttribute("uv",new Cn(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new As(e,6,1);return this.setAttribute("instanceStart",new rn(i,3,0)),this.setAttribute("instanceEnd",new rn(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new As(e,6,1);return this.setAttribute("instanceColorStart",new rn(i,3,0)),this.setAttribute("instanceColorEnd",new rn(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new bg(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ql.setFromBufferAttribute(e),this.boundingBox.union(ql))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ir.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ir)),ir.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(ir));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}ft.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new se(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ve.line={uniforms:ra.merge([ft.common,ft.fog,ft.line]),vertexShader:`
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
		`};class gh extends ai{constructor(t){super({type:"LineMaterial",uniforms:ra.clone(Ve.line.uniforms),vertexShader:Ve.line.vertexShader,fragmentShader:Ve.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const Yl=new G,jl=new G,we=new ge,Ae=new ge,Mn=new ge,Mo=new G,yo=new Te,Ce=new Tg,Zl=new G,sr=new li,rr=new Rs,yn=new ge;let wn,Ci;function Kl(n,t,e){return yn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),yn.multiplyScalar(1/yn.w),yn.x=Ci/e.width,yn.y=Ci/e.height,yn.applyMatrix4(n.projectionMatrixInverse),yn.multiplyScalar(1/yn.w),Math.abs(Math.max(yn.x,yn.y))}function Bg(n,t){const e=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){Ce.start.fromBufferAttribute(s,o),Ce.end.fromBufferAttribute(r,o),Ce.applyMatrix4(e);const c=new G,h=new G;wn.distanceSqToSegment(Ce.start,Ce.end,h,c),h.distanceTo(c)<Ci*.5&&t.push({point:h,pointOnLine:c,distance:wn.origin.distanceTo(h),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function kg(n,t,e){const i=t.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),u=-t.near;wn.at(1,Mn),Mn.w=1,Mn.applyMatrix4(t.matrixWorldInverse),Mn.applyMatrix4(i),Mn.multiplyScalar(1/Mn.w),Mn.x*=r.x/2,Mn.y*=r.y/2,Mn.z=0,Mo.copy(Mn),yo.multiplyMatrices(t.matrixWorldInverse,a);for(let f=0,d=h;f<d;f++){if(we.fromBufferAttribute(l,f),Ae.fromBufferAttribute(c,f),we.w=1,Ae.w=1,we.applyMatrix4(yo),Ae.applyMatrix4(yo),we.z>u&&Ae.z>u)continue;if(we.z>u){const v=we.z-Ae.z,E=(we.z-u)/v;we.lerp(Ae,E)}else if(Ae.z>u){const v=Ae.z-we.z,E=(Ae.z-u)/v;Ae.lerp(we,E)}we.applyMatrix4(i),Ae.applyMatrix4(i),we.multiplyScalar(1/we.w),Ae.multiplyScalar(1/Ae.w),we.x*=r.x/2,we.y*=r.y/2,Ae.x*=r.x/2,Ae.y*=r.y/2,Ce.start.copy(we),Ce.start.z=0,Ce.end.copy(Ae),Ce.end.z=0;const _=Ce.closestPointToPointParameter(Mo,!0);Ce.at(_,Zl);const p=df.lerp(we.z,Ae.z,_),m=p>=-1&&p<=1,M=Mo.distanceTo(Zl)<Ci*.5;if(m&&M){Ce.start.fromBufferAttribute(l,f),Ce.end.fromBufferAttribute(c,f),Ce.start.applyMatrix4(a),Ce.end.applyMatrix4(a);const v=new G,E=new G;wn.distanceSqToSegment(Ce.start,Ce.end,E,v),e.push({point:E,pointOnLine:v,distance:wn.origin.distanceTo(E),object:n,face:null,faceIndex:f,uv:null,uv1:null})}}}class Hg extends $n{constructor(t=new Xo,e=new gh({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let a=0,o=0,l=e.count;a<l;a++,o+=2)Yl.fromBufferAttribute(e,a),jl.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Yl.distanceTo(jl);const r=new As(s,2,1);return t.setAttribute("instanceDistanceStart",new rn(r,1,0)),t.setAttribute("instanceDistanceEnd",new rn(r,1,1)),this}raycast(t,e){const i=this.material.worldUnits,s=t.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;wn=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ci=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),rr.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Ci*.5;else{const u=Math.max(s.near,rr.distanceToPoint(wn.origin));c=Kl(s,u,l.resolution)}if(rr.radius+=c,wn.intersectsSphere(rr)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),sr.copy(o.boundingBox).applyMatrix4(a);let h;if(i)h=Ci*.5;else{const u=Math.max(s.near,sr.distanceToPoint(wn.origin));h=Kl(s,u,l.resolution)}sr.expandByScalar(h),wn.intersectsBox(sr)!==!1&&(i?Bg(this,e):kg(this,s,e))}}const or=[.6,.85,1.05,1.3,1.6,2.1];class Gg{constructor(){this.a=new Float32Array(3*256),this.n=0}reset(){return this.n=0,this}p(t,e,i){if(3*this.n+3>this.a.length){const r=new Float32Array(this.a.length*2);r.set(this.a),this.a=r}const s=3*this.n++;return this.a[s]=t,this.a[s+1]=e,this.a[s+2]=i,this}}class Vg{constructor(t){this.material=t,this.geo=new Xo,this.pos=new Float32Array(0),this.col=new Float32Array(0),this.pb=null,this.cb=null,this.cap=0,this.n=0,this.mesh=new Hg(this.geo,t),this.mesh.frustumCulled=!1,this.grow(2048)}grow(t){const e=new Float32Array(t*6),i=new Float32Array(t*6);e.set(this.pos.subarray(0,this.n*6)),i.set(this.col.subarray(0,this.n*6)),this.pos=e,this.col=i,this.cap=t,this.geo.dispose(),this.geo=new Xo;const s=this.pb=new As(e,6,1).setUsage(sl),r=this.cb=new As(i,6,1).setUsage(sl);this.geo.setAttribute("instanceStart",new rn(s,3,0)),this.geo.setAttribute("instanceEnd",new rn(s,3,3)),this.geo.setAttribute("instanceColorStart",new rn(r,3,0)),this.geo.setAttribute("instanceColorEnd",new rn(r,3,3)),this.mesh.geometry=this.geo}seg(t,e,i,s,r,a,o,l,c){this.n>=this.cap&&this.grow(this.cap*2);const h=this.n++*6,u=this.pos,f=this.col;u[h]=t,u[h+1]=e,u[h+2]=i,u[h+3]=s,u[h+4]=r,u[h+5]=a,f[h]=f[h+3]=o,f[h+1]=f[h+4]=l,f[h+2]=f[h+5]=c}commit(){this.geo.instanceCount=this.n,this.mesh.visible=this.n>0;for(const t of[this.pb,this.cb])t.clearUpdateRanges(),t.addUpdateRange(0,this.n*6),t.needsUpdate=!0}dispose(){this.geo.dispose(),this.material.dispose()}}const Jl=new Map;function xo(n){let t=Jl.get(n);if(!t){const e=parseInt(n.slice(1),16);t=[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],Jl.set(n,t)}return t}class Wg{constructor(){this.group=new _s,this.batches=or.map(t=>{const e=new gh({linewidth:t,vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});e.blending=Pc,e.blendEquation=Io,e.fog=!0;const i=new Vg(e);return this.group.add(i.mesh),i})}setResolution(t,e){for(const i of this.batches)i.material.resolution.set(t,e)}begin(){for(const t of this.batches)t.n=0}end(){for(const t of this.batches)t.commit()}batch(t){let e=0;for(let i=1;i<or.length;i++)Math.abs(or[i]-t)<Math.abs(or[e]-t)&&(e=i);return this.batches[e]}line(t,e,i,s,r={}){if(e<2)return;const a=r.alpha??1;this.strokes(t,e,xo(i),a,this.batch(s),r.close??!1),r.hot&&this.strokes(t,e,xo(ca(i)),a,this.batch(s*.42),r.close??!1)}poly(t,e,i,s={}){this.line(t.a,t.n,e,i,s)}seg(t,e,i,s,r,a,o,l,c=1){const[h,u,f]=xo(o);this.batch(l).seg(t,e,i,s,r,a,h*c,u*c,f*c)}strokes(t,e,[i,s,r],a,o,l){i*=a,s*=a,r*=a;for(let c=0;c<e-1;c++){const h=3*c;o.seg(t[h],t[h+1],t[h+2],t[h+3],t[h+4],t[h+5],i,s,r)}if(l){const c=3*(e-1);o.seg(t[c],t[c+1],t[c+2],t[0],t[1],t[2],i,s,r)}}dispose(){for(const t of this.batches)t.dispose()}}function _h(n,t){const e=n.tract;return-Math.max(-.2,Math.min(3,t))*e.scale/Og(e.P(-2.5,10.5),e.P(6.95,7.75))}function vh(n,t){const e=n.tract,i=e.P(-2.5,10.5),s=_h(n,t.jaw);return(r,a)=>ch(e.P(r,a),i,s)}function So(n,t,e,i=0,s=40){const r=Math.cos(-i),a=Math.sin(-i),o=[];for(let l=0;l<=s;l++){const c=l/s*Math.PI*2,h=Math.cos(c)*t,u=Math.sin(c)*e;o.push({x:n.x+h*r-u*a,y:n.y+h*a+u*r})}return o}function $g(n,t,e){const i=Math.min(n.x,t.x),s=Math.max(n.x,t.x),r=Math.min(n.y,t.y),a=Math.max(n.y,t.y),o=Math.min(e,(s-i)/2,(a-r)/2),l=[],c=(h,u,f)=>{for(let d=0;d<=6;d++){const g=f+d/6*(Math.PI/2);l.push({x:h+Math.cos(g)*o,y:u+Math.sin(g)*o})}};return c(s-o,a-o,0),c(i+o,a-o,Math.PI/2),c(i+o,r+o,Math.PI),c(s-o,r+o,3*Math.PI/2),l.push(l[0]),l}const qo=n=>-1.2-.025*n;function Mh(n){const t=n.tract.scale,e=n.bodyParams.pharynx;return(i,s)=>({x:i*t,y:(s<7?7-(7-s)*e:s)*t})}function yh(n,t,e){const i=n.tract,s=(y,T)=>i.P(y,T),r=vh(n,e),a=i.scale,o=e.larynx*a,l=Mh(n),c=t.upperLip.slice(7),h=t.lowerLip.slice(7),u=kn([l(2.3,-4.6),l(2.38,-1.5),l(2.52,.4),l(3,1.7),r(5.3,3),r(7.25,3.35),r(7.95,4.6),r(7.55,5.7)],4),f=kn([c[c.length-1],l(7.05,10.6),l(7.75,10.78),l(8.75,11.05),l(9.25,11.65),l(8.95,12.6),l(8.35,13.9),l(7.7,15),l(7.95,16.1),l(7.9,18.1),l(6.9,20.5)],4),d=kn([l(6.9,20.5),l(3,22.9),l(-2.2,22.7),l(-6.9,19.6),l(-8.7,15.4),l(-8.3,11.9),l(-7.4,8.9),l(-6.8,4.8),l(-6.6,0),l(-6.6,-4.6)],4),g=[];for(let y=0;y<9;y++){const T=-4.4+y*1.75;if(T>10.5)break;const O=qo(T)-2.25;g.push($g(s(O,T+1.4),s(O+1.6,T),.32*a))}const p=[[1,9.6],[1.8,9.92],[2.7,10.18],[3.6,10.3],[4.4,10.25],[5.1,10.05],[5.7,9.72],[6.15,9.36],[6.55,9.15],[7,9.6]].map(([y,T])=>i.P(y,T)),m=t.jawBone.filter(y=>y.x>.8*a),M=t.glottis,v={x:s(1.6,0).x,y:s(0,2.9).y+.6*o},E=[];for(let y=0;y<4;y++){const T=M.y-(.9+y*1)*a;if(T<-4.4)break;E.push([{x:M.x+.8*a,y:T},{x:M.x+1.05*a,y:T-.05},{x:M.x+1.05*a,y:T-.5*a},{x:M.x+.82*a,y:T-.45*a},{x:M.x+.8*a,y:T}])}const R=r(6,5.45),S=t.tongueCenter,w=[];for(let y=0;y<=16;y++){const T=Math.PI*(.18+.9*y/16),O={x:S.x+Math.cos(T)*t.tongueRadius*1.25,y:S.y+Math.sin(T)*t.tongueRadius*1.25},J={x:S.x,y:(S.y+R.y)/2},tt=[];for(let L=0;L<=12;L++){const N=L/12;tt.push({x:(1-N)*(1-N)*R.x+2*(1-N)*N*J.x+N*N*O.x,y:(1-N)*(1-N)*R.y+2*(1-N)*N*J.y+N*N*O.y})}w.push(tt)}const k={x:qo(M.y/a)*a,y:M.y};return{f:t,model:n,skinLower:[...u,...h.slice().reverse()],skinUpper:[...c,...f.slice(1),...d.slice(1)],inset:kn([l(1.85,-4.6),l(1.9,-.8),l(2.3,1.6),r(5.2,3.6),r(6.9,3.9),r(7.4,4.9),r(7.2,5.9),l(6.6,9.9),l(7.6,10.9),l(8.55,11.5),l(8.1,13.4),l(7.25,15.2),l(7.45,18),l(3,22.2),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.6,12),l(-6.7,8.7),l(-6.1,4.6),l(-6,-4.6)],3),skull:kn([l(7,16.2),l(7.3,18.5),l(6,20.7),l(3,22.1),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.4,12.6),l(-4.6,12.2),l(-2.2,13.3),l(1,13.7),l(4.1,14.1),l(6.2,14.9)],4),brain:kn([l(6.55,16.3),l(6.75,18.4),l(5.5,20.1),l(2.8,21.4),l(-1.9,21.3),l(-5.8,18.8),l(-7.1,15.4),l(-6.7,13.1),l(-4.4,12.8),l(-2.1,13.9),l(1,14.3),l(4,14.7),l(5.9,15.4)],4),sulcus:kn([l(5.4,19.4),l(2.4,20.5),l(-1.4,20.4),l(-4.8,18.4)],4),eye:So(l(6.5,15.4),1.1*a,.95*a),eyeC:l(6.5,15.4),vertebrae:g,cords:[[s(-5.3,-4.6),s(-4.5,-4.6),s(-4.5,11.8),s(-5.1,12.4),s(-5.6,11.6)],[s(-5.1,-4.6),s(-4.7,-4.6),s(-4.72,11.4),s(-5.15,11.6)]],nasal:kn([l(.3,11.2),l(1.1,10.25),l(2.7,10.75),l(4.6,10.85),l(6.4,10.65),l(7.6,10.85),l(8.45,11.3),l(8,12.2),l(6.7,13.4),l(4.4,13.9),l(1.8,13.6),l(.2,12.6)],4),turbinates:[[3,11.45,2.1,.32],[3.5,12.45,1.9,.3],[4,13.3,1.45,.22]].map(([y,T,O,J])=>So(l(y,T),O*a,J*a,-.04)),palOral:p,palNasal:p.map(y=>({x:y.x,y:y.y+.55*a})),jawLower:m,jawUpper:m.map(y=>({x:y.x,y:y.y+.75*a})),hyoid:So(v,.5*a,.28*a,.3,28),thyroid:[{x:M.x+.75*a,y:M.y-1.6*a},{x:M.x+1.75*a,y:M.y-.6*a},{x:M.x+1.95*a,y:M.y+1.2*a},{x:M.x+1.45*a,y:M.y+1.9*a},{x:M.x+1.15*a,y:M.y+1.1*a},{x:M.x+1.3*a,y:M.y-.4*a},{x:M.x+.75*a,y:M.y-1.6*a}],trachea:[[{x:M.x-.65*a,y:M.y},{x:M.x-.75*a,y:-4.8}],[{x:M.x+.75*a,y:M.y},{x:M.x+.95*a,y:-4.8}]],rings:E,outerWall:t.outer.filter(y=>y.y>M.y||y.x>0),glottisWall:[k,t.outer.find(y=>y.y>M.y)??k],fibres:w,folds:[[{x:M.x-.62*a,y:M.y+.05},{x:M.x-.1,y:M.y+.12*a},{x:M.x-.62*a,y:M.y+.32*a},{x:M.x-.62*a,y:M.y+.05}],[{x:M.x+.72*a,y:M.y+.05},{x:M.x+.12,y:M.y+.12*a},{x:M.x+.72*a,y:M.y+.32*a},{x:M.x+.72*a,y:M.y+.05}]],lowerTeeth:[...t.lowerTeeth,r(6.8,6),r(6.4,6.2),t.lowerTeeth[0]]}}class Xg{constructor(){this.pitch=0,this.yaw=0,this.toPitch=0,this.toYaw=0,this.next=2}update(t,e){if(t>=this.next){const s=Math.random()<.35;this.toPitch=s?0:(Math.random()*2-1)*.55,this.toYaw=s?0:(Math.random()*2-1)*.9,this.next=t+1.2+Math.random()*3.5}const i=1-Math.exp(-e*28);this.pitch+=(this.toPitch-this.pitch)*i,this.yaw+=(this.toYaw-this.yaw)*i}}const qg=980.665,ar=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},bo=(n,t,e)=>Math.max(t,Math.min(e,n)),lr=(n,t,e,i)=>n+(t-n)*(1-Math.exp(-i/e));class Eo{constructor(t,e){this.hz=t,this.damping=e,this.x=0,this.v=0}step(t,e){const i=2*Math.PI*this.hz,s=Math.max(1,Math.ceil(e/.008)),r=e/s;for(let a=0;a<s;a++)this.v+=(i*i*(t-this.x)-2*this.damping*i*this.v)*r,this.x+=this.v*r;return this.x}}function Yg(n){const t=n.t.pressureRms,e=n.nPh+n.nOr-3;return e>=n.nPh&&e<t.length?t[e]/qg:0}class Ql{constructor(){this.puff=0,this.brow=0,this.lid=0,this.lookUp=0,this.content=0,this.nod=0,this.tilt=0,this.clock=0,this.cheeks=new Eo(6.5,.32),this.nodSpring=new Eo(2.4,.42),this.tiltSpring=new Eo(3.2,.3),this.ref=NaN,this.fast=NaN,this.held=0,this.hold=0,this.nextBlink=1.5+Math.random()*2,this.blinkAt=-1,this.secondBlink=!1,this.lastStep=-1}update(t,e){this.clock+=e;const i=t==null?void 0:t.t,s=!!i&&i.voicing>.45&&i.gate>.3&&i.f0>30&&i.outRms>.004,r=t?ar(1.5,7,Yg(t)):0;this.puff=bo(this.cheeks.step(r,e),-.35,1.25);let a=0,o=0;if(s){const g=Math.log2(i.f0);(!Number.isFinite(this.ref)||Math.abs(12*(g-this.ref))>14)&&(this.ref=this.fast=g),this.ref=lr(this.ref,g,5,e),Math.abs(12*(g-this.fast))>2.5&&(this.fast=g,this.held=0),this.fast=lr(this.fast,g,.35,e),this.held+=e,a=12*(g-this.ref),o=12*(g-this.fast)}else this.held=0;const l=(s?bo(a/6,-.7,1):0)+.3*this.content;this.brow=lr(this.brow,l,s?.12:.45,e),this.lookUp=.32*Math.max(0,this.brow);const c=s?.92*ar(.9,1.9,this.held)*ar(.15,.55,this.brow):0;this.hold=lr(this.hold,c,c>this.hold?.35:.08,e),this.clock>=this.nextBlink&&this.hold<.2&&(this.blinkAt=this.clock,this.secondBlink=!this.secondBlink&&Math.random()<.18,this.nextBlink=this.clock+(this.secondBlink?.28:2+Math.random()*4.5));const h=(this.clock-this.blinkAt)/.17,u=this.blinkAt>=0&&h<1?Math.sin(Math.PI*h)**.7:0;this.lid=Math.max(u,this.hold,.95*this.content);const f=(t==null?void 0:t.beatStep)??-1;if(f>=0&&this.lastStep>=0&&f!==this.lastStep){const g=f<this.lastStep;(g||Math.floor(f/4)!==Math.floor(this.lastStep/4))&&(this.nodSpring.v-=g||Math.floor(f/16)!==Math.floor(this.lastStep/16)?1.3:.8)}this.lastStep=f,this.nod=this.nodSpring.step(.13*this.brow,e);const d=ar(.6,2,this.held)*.07*Math.sin(this.clock*1.7);this.tilt=this.tiltSpring.step(d+.05*bo(o,-1.5,1.5),e)}}function tc(n,t,e){const i=n.tract,s=vh(n,e),r={x:(t.upperLip[6].x+t.lowerLip[6].x)/2+.15,y:(t.upperLip[6].y+t.lowerLip[6].y)/2};return[{id:"tongue",pos:t.tongueCenter,label:"Tongue body"},{id:"tip",pos:t.tip,label:"Tongue tip"},{id:"jaw",pos:s(7.5,4.9),label:"Jaw"},{id:"lips",pos:r,label:"Lips"},{id:"velum",pos:t.velum[Math.floor(t.velum.length/2)],label:"Soft palate"},{id:"larynx",pos:{x:t.glottis.x+1.2*i.scale,y:t.glottis.y},label:"Larynx"}]}const An=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},ec=n=>Math.max(0,Math.min(1,n));function Vn(n,t){if(t<=n[0][0])return n[0][1];for(let e=1;e<n.length;e++)if(t<=n[e][0]){const[i,s]=n[e-1],[r,a]=n[e];return s+(a-s)*(t-i)/(r-i)}return n[n.length-1][1]}const jg=[[-4.6,5.3],[0,5.4],[2.5,5.5],[4.5,5.25],[6.5,5.5],[8.5,6.1],[10.5,6.6],[12.5,7],[15,7.3],[17.5,7.65],[19.5,7.4],[21,6.5],[22.2,4.6],[23,1]],Zg=[[3.4,5.9],[4.6,6.2],[5.7,6.15],[6.5,6.2],[8,6.35],[9.5,6.35],[10.6,6.55],[11.6,6.75],[12.6,6.9],[13.9,7.15],[15,7.45],[16.1,7.95]],Kg=[[3.4,2],[4.6,2.2],[5.7,2.4],[6.5,2.6],[10.6,1.7],[11,1.75],[11.65,1.2],[12.6,.95],[13.9,.75],[15,.9],[16.1,1.6]],Jg=[[-4.6,.5],[3,.5],[6,.42],[12,.42],[16,.45],[23,.45]],Qg=[[-3,8.5],[-1.6,8],[-.6,6.4],[1.2,4.6],[3.5,3.6],[5.3,3],[7.3,3.3],[8.6,4.4]],t_=[[6,-.6],[7.4,-.8],[9.6,-1.9],[10.6,-2.5],[12,-2.6]],e_=[[12.3,4],[13,5.6],[14.5,6.4],[16.5,6.9],[18.5,6.6],[20,5.4],[21,3.6],[21.45,.5]],n_=[[0,1.5],[.15,1.9],[.35,2.35],[.6,2.45],[.8,2.2],[.92,1.5],[1,.55]],i_=[[0,1.3],[.35,1.1],[.7,.9],[.9,.55],[1,.25]],s_=[[.85,1.05,.7],[.68,.95,.65],[.78,1.1,.8],[.7,.85,.9],[.68,.8,.9],[1,.75,1.1],[.92,.7,1.05]],r_=[[.54,.9,.6],[.6,.92,.62],[.7,1,.75],[.7,.85,.8],[.72,.8,.85],[1.1,.72,1.05],[1.05,.7,1]],o_=3,bi=2.2,xh=n=>Math.abs(n)<1?(1-n*n)**2:0;function wr(n,t,e=!1){const i=Math.min(1,Math.abs(t)/n.W),s=Math.pow(1-Math.pow(i,n.pf),1/n.pf);return n.xw+(n.Fs-n.xw)*s+(e?0:n.E*xh(t/n.wf))}function a_(n,t){const e=t>n.xw,i=e?(t-n.xw)/Math.max(1e-6,n.Fs-n.xw):(n.xw-t)/Math.max(1e-6,n.xw-n.Bk),s=e?n.pf:bi;return n.W*Math.pow(Math.max(0,1-Math.pow(Math.min(1,i),s)),1/s)}function l_(n,t,e){e.length=0;const i=12,s=10,r=16;for(let o=0;o<i;o++){const l=Math.PI-o/i*(Math.PI/2);e.push(n.xw-(n.xw-n.Bk)*Math.pow(Math.abs(Math.cos(l)),2/bi),n.W*Math.pow(Math.sin(l),2/bi))}const a=Math.asin(Math.min(1,Math.pow(t/n.W,n.pf/2)));for(let o=0;o<s;o++){const l=Math.PI/2-o/s*(Math.PI/2-a),c=n.W*Math.pow(Math.sin(l),2/n.pf);e.push(n.xw+(n.Fs-n.xw)*Math.pow(Math.cos(l),2/n.pf)+n.E*xh(c/n.wf),c)}for(let o=0;o<=r;o++){const l=t*(1-o/r);e.push(wr(n,l),l)}}class nc{constructor(t,e,i){this.dy=e,this.rows=[];let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a.y),r=Math.max(r,a.y);this.y0=s,this.y1=r;for(let a=s;a<=r;a+=e){let o=-1/0,l=1/0;for(let c=0;c<t.length-1;c++){const h=t[c],u=t[c+1];if(h.y>a==u.y>a)continue;const f=h.x+(u.x-h.x)*(a-h.y)/(u.y-h.y);o=Math.max(o,f),l=Math.min(l,f)}this.rows.push(o>l?i(a,o,l):null)}}at(t){const e=(t-this.y0)/this.dy,i=Math.floor(e);if(i<0||i>=this.rows.length-1)return null;const s=this.rows[i],r=this.rows[i+1];if(!s||!r)return s??r;const a=e-i,o=(l,c)=>l+(c-l)*a;return{F:o(s.F,r.F),Bk:o(s.Bk,r.Bk),Fs:o(s.Fs,r.Fs),W:o(s.W,r.W),xw:o(s.xw,r.xw),E:o(s.E,r.E),wf:o(s.wf,r.wf),pf:o(s.pf,r.pf)}}}class xi{constructor(){this.lines=[],this.cur=[]}p(t,e,i){return this.cur.push(t,e,i),this}end(t=!1){t&&this.cur.length>=3&&this.cur.push(this.cur[0],this.cur[1],this.cur[2]),this.cur.length>=6&&this.lines.push(new Float32Array(this.cur)),this.cur=[]}ellipse(t,e,i,s=24,r=0,a=Math.PI*2){for(let o=0;o<=s;o++){const l=r+(a-r)*o/s,c=Math.cos(l),h=Math.sin(l);this.p(t[0]+e[0]*c+i[0]*h,t[1]+e[1]*c+i[1]*h,t[2]+e[2]*c+i[2]*h)}this.end()}}function Sh(n,t,e,i){const s=e/n,r=i/n,a=r>=7?r:7-(7-r)/t,o=1-An(7.6,9.1,a),l=Vn(Qg,s),c=An(l-1.5,l+.15,a),h=Vn(t_,a),u=An(h-.7,h+.9,s);return o*c*u}const c_=1.7,h_=.55;function bh(n,t,e,i){const s=e/n,r=i/n,a=r>=7?r:7-(7-r)/t,o=((s-5.2)/2.3)**2+((a-8.3)/2.4)**2;return o<1?(1-o)**2:0}function ic(n,t,e,i){if(t===0||i===0)return[0,0];const s=t*i*n;return[h_*s,Math.sign(e)*c_*s*An(.4*n,2.6*n,Math.abs(e))]}function u_(n,t,e){const i=t.length;if(t.every(Boolean))return[e?[...n,n[0],n[1],n[2]]:n];const s=[],r=e?t.indexOf(!1)+1:0;let a=[];for(let o=0;o<i;o++){const l=(r+o)%i;t[l]?a.push(n[3*l],n[3*l+1],n[3*l+2]):(a.length>=6&&s.push(a),a=[])}return a.length>=6&&s.push(a),s}function f_(n,t){const e=[0];for(let a=1;a<n.length;a++)e.push(e[a-1]+Math.hypot(n[a].x-n[a-1].x,n[a].y-n[a-1].y));const i=e[e.length-1],s=[];let r=0;for(let a=0;a<t;a++){const o=i*a/(t-1);for(;r<n.length-2&&e[r+1]<o;)r++;const l=(o-e[r])/Math.max(1e-9,e[r+1]-e[r]);s.push({x:n[r].x+(n[r+1].x-n[r].x)*l,y:n[r].y+(n[r+1].y-n[r].y)*l})}return s}function mr(n,t,e){const i=e*t[t.length-1];let s=0;for(;s<n.length-2&&t[s+1]<i;)s++;const r=(i-t[s])/Math.max(1e-9,t[s+1]-t[s]);return{x:n[s].x+(n[s+1].x-n[s].x)*r,y:n[s].y+(n[s+1].y-n[s].y)*r}}const Yo=n=>{const t=[0];for(let e=1;e<n.length;e++)t.push(t[e-1]+Math.hypot(n[e].x-n[e-1].x,n[e].y-n[e-1].y));return t};function d_(n){const t=n.tract,e=t.scale,i=n.bodyParams.pharynx,s=Mh(n),r=B=>s(0,B).y,a=B=>B/e>=7?B/e:7-(7-B/e)/i,o=(B,z)=>t.P(B,z),l={...Tr,jaw:0,lipAp:0,labiodental:0},c=n.frame(l),h=yh(n,c,l),u=[...h.skinLower,...h.skinUpper],f=new nc(u,.08*e,(B,z,X)=>{const K=a(B),nt=K>=3.4&&K<=16.1?Vn(Zg,K)*e:1/0,ot=Math.min(z,nt),F=2.2+.4*An(2.5,3.5,K)*(1-An(17,18.5,K));return{F:z,Bk:X,Fs:ot,W:Vn(jg,K)*e,xw:X+(ot-X)*Vn(Jg,K),E:z-ot,wf:Vn(Kg,K)*e,pf:F}}),d=o(-2.5,10.5),g=c.upperLip[c.upperLip.length-1].y,_=c.lowerLip[c.lowerLip.length-1].y,p=o_*e,m=(B,z,X,K)=>z>_&&z<g&&Math.abs(X)<p&&B>K.xw,M=[],v=(B,z,X)=>{for(const K of u_(B,z,X)){const nt=K.length/3,ot=new Float32Array(nt),F=new Float32Array(nt);for(let Et=0;Et<nt;Et++)ot[Et]=Sh(e,i,K[3*Et],K[3*Et+1]),F[Et]=bh(e,i,K[3*Et],K[3*Et+1]);M.push({a:new Float32Array(K),w:ot,c:F})}},E=[],R=1.4*e;for(let B=f.y0+.25*e;B<f.y1-.2*e;B+=R){const z=f.at(B);if(!z||z.W<.2*e)continue;l_(z,Math.min(.6*z.W,3.6*e),E);const X=[],K=[],nt=E.length/2;for(let ot=0;ot<nt;ot++)X.push(E[2*ot],B,E[2*ot+1]);for(let ot=nt-2;ot>0;ot--)X.push(E[2*ot],B,-E[2*ot+1]);for(let ot=0;ot<X.length/3;ot++)K.push(!m(X[3*ot],B,X[3*ot+2],z));v(X,K,!0)}const S=.3*e;for(const B of[-3.6,-2.4,-1.2,1.2,2.4,3.6].map(z=>z*e)){let z=[],X=[];for(let K=f.y0+.1*e;K<=f.y1;K+=S){const nt=f.at(K);if(!nt||Math.abs(B)>.97*nt.W){v(z,X,!1),z=[],X=[];continue}const ot=wr(nt,B);z.push(ot,K,B),X.push(!m(ot,K,B,nt))}v(z,X,!1)}for(const B of[.5,.8].map(z=>z*Math.PI))for(const z of[1,-1]){const X=[],K=[];for(let nt=f.y0+.1*e;nt<=f.y1;nt+=S){const ot=f.at(nt);!ot||ot.W<.2*e||(X.push(ot.xw-(ot.xw-ot.Bk)*Math.pow(Math.abs(Math.cos(B)),2/bi),nt,z*ot.W*Math.pow(Math.sin(B),2/bi)),K.push(!0))}v(X,K,!1)}const w=[],k=[],y=(B,z,X,K,nt,ot=!1)=>{const F=new xi;nt(F),B.push({lines:F.lines,color:z,width:X,alpha:K,hot:ot})},T=(B,z,X,K)=>{const nt=kn(z.map(([ot,F])=>s(ot,F)),4);nt.forEach((ot,F)=>{const Et=f.at(ot.y);B.p(ot.x,ot.y,K*((Et?a_(Et,ot.x):0)+X(F,nt.length)))}),B.end()};y(w,mt.blueDim,1.05,.9,B=>{for(const z of[1,-1]){T(B,[[-2.55,13.4],[-2.85,14.75],[-3.65,15.45],[-4.6,15.25],[-5.2,14.25],[-5.4,12.8],[-5.05,11.3],[-4.55,10.2],[-3.95,9.55],[-3.35,9.65],[-3,10.35]],(K,nt)=>(.25+1.2*Math.sin(Math.PI*K/(nt-1))**1.5)*e,z),T(B,[[-3.15,14.3],[-3.95,14.45],[-4.55,13.5],[-4.6,12.1],[-4.15,11.05]],()=>.55*e,z),T(B,[[-2.7,11.2],[-2.55,11.85],[-2.75,12.35]],()=>.35*e,z);const X=[];for(let K=0;K<=16;K++)X.push([-3.5+.6*Math.cos(K/16*Math.PI*2),12+.85*Math.sin(K/16*Math.PI*2)]);T(B,X,()=>.12*e,z)}}),y(w,mt.blueMid,1,.8,B=>{for(const z of[1,-1]){for(let K=14.6;K>=11.3;K-=.15){const nt=r(K),ot=f.at(nt);if(!ot)continue;const F=z*(.3+1.05*(14.6-K)/3.3)*e;B.p(wr(ot,F),nt,F)}B.end();const X=[[7.95,11.05,.95],[7.4,11.15,1.45],[7.25,11.6,1.55],[7.55,12.1,1.35],[8.2,12.15,1]];for(const[K,nt,ot]of X)B.p(K*e,r(nt),z*ot*e);B.end()}}),y(w,mt.blueMid,1,.9,B=>{for(const z of[1,-1])B.ellipse([8.05*e,r(10.98),z*.62*e],[.42*e,.04*e,0],[0,0,.26*e],16)});const O=new nc(h.brain,.08*e,(B,z,X)=>({F:z,Bk:X,Fs:z,W:Vn(e_,a(B))*e,xw:X+(z-X)*.48,E:0,wf:1,pf:2.3}));y(w,mt.blueMid,.85,.32,B=>{for(let z=O.y0+.6*e;z<O.y1-.15*e;z+=1.5*e){const X=O.at(z);if(X){for(let K=0;K<=48;K++){const nt=K/48*Math.PI*2,ot=Math.cos(nt),F=Math.sin(nt),Et=ot>=0?X.pf:bi,vt=ot>=0?X.xw+(X.Fs-X.xw)*Math.pow(ot,2/Et):X.xw-(X.xw-X.Bk)*Math.pow(-ot,2/Et);B.p(vt,z,Math.sign(F)*X.W*Math.pow(Math.abs(F),2/Et))}B.end()}}for(const z of[.3,.7].map(X=>X*Math.PI))for(const X of[1,-1]){for(let K=O.y0;K<=O.y1;K+=.3*e){const nt=O.at(K);if(!nt)continue;const ot=Math.cos(z),F=Math.sin(z),Et=ot>=0?nt.pf:bi,vt=ot>=0?nt.xw+(nt.Fs-nt.xw)*Math.pow(ot,2/Et):nt.xw-(nt.xw-nt.Bk)*Math.pow(-ot,2/Et);B.p(vt,K,X*nt.W*Math.pow(F,2/Et))}B.end()}}),y(w,mt.blueDim,.9,.6,B=>{for(let z=0;z<9;z++){const X=-4.4+z*1.75;if(X>10.5)break;const K=qo(X)-2.25,nt=o(K,X+.08),ot=o(K,X+1.32),F=o(K+.8,0).x,Et=.8*e,vt=1.05*e;for(const Gt of[nt.y,ot.y])B.ellipse([F,Gt,0],[Et,0,0],[0,0,vt],24);for(const Gt of[.25,.75,1.25,1.75].map(Ut=>Ut*Math.PI))B.p(F+Et*Math.cos(Gt),nt.y,vt*Math.sin(Gt)).p(F+Et*Math.cos(Gt),ot.y,vt*Math.sin(Gt)).end();const At=(nt.y+ot.y)/2,Mt=F-2.15*e;B.ellipse([Mt,At,0],[.72*e,0,0],[0,0,.88*e],20);for(const Gt of[1,-1])B.p(F-.7*e,At,Gt*.55*e).p(Mt+.45*e,At,Gt*.72*e).end(),B.p(F-.5*e,At,Gt*.95*e).p(F-.9*e,At-.1*e,Gt*2.3*e).end();B.p(Mt-.72*e,At,0).p(Mt-1.8*e,At-.55*e,0).end()}}),y(w,mt.blueDim,.85,.5,B=>{const z=o(-4.9,0).x;for(let X=-4.4;X<=11;X+=1.75)B.ellipse([z,o(0,X).y,0],[.42*e,0,0],[0,0,.6*e],16);for(const X of[1,-1])B.p(z,o(0,-4.6).y,X*.6*e).p(z,o(0,11.4).y,X*.6*e).end()}),y(w,mt.blueDim,.9,.7,B=>{for(const z of[1,-1]){for(const X of h.nasal)B.p(X.x,X.y,z*1.2*e);B.end(!0);for(const X of h.turbinates){for(const K of X)B.p(K.x,K.y,z*.95*e);B.end()}}});const J=(B,z,X)=>{const K=[];for(let nt=0;nt<=60;nt++){const ot=X*nt/60;K.push({x:B-z*Math.pow(ot/X,1.85),y:ot})}return{pts:K,cum:Yo(K)}},tt=(B,z,X,K,nt,ot,F)=>{const Et=J(z,X,K),vt=Et.cum[Et.cum.length-1],At=nt.reduce((Gt,Ut)=>Gt+Ut[0],0),Mt=.97*vt/(At*e);for(const Gt of[1,-1]){let Ut=0;for(const[C,b,$]of nt){const lt=C*e*Mt,ht=b*e,ut=$*e,Tt=(Ut+lt/2)/vt;Ut+=lt;const pt=mr(Et.pts,Et.cum,Tt),St=mr(Et.pts,Et.cum,Math.min(1,Tt+.01)),Lt=mr(Et.pts,Et.cum,Math.max(0,Tt-.01));let kt=St.x-Lt.x,ct=St.y-Lt.y;const te=Math.hypot(kt,ct)||1;kt/=te,ct/=te;const Xt=ct,Ot=-kt,Pt=ot(pt.y/K),bt=(Nt,Jt,ue=0)=>[pt.x+kt*Nt-Xt*ue,Pt+F*Jt,Gt*(pt.y+ct*Nt-Ot*ue)];for(const[Nt,Jt]of[[-.5,0],[-.5,.55],[-.38,1],[0,1.08],[.38,1],[.5,.55],[.5,0]])B.p(...bt(Nt*lt,Jt*ht));B.end(!0);for(const[Nt,Jt]of[[-.45,.1],[.45,.1],[.45,.9],[-.45,.9]])B.p(...bt(Nt*lt,0,Jt*ut));B.end(!0)}}},L=o(7.3,0).x,N=4.2*e,I=2.65*e;y(w,mt.blue,1,.8,B=>tt(B,L,N,I,s_,z=>(7.95+.3*z*z)*e,1)),y(w,mt.blueMid,1,.6,B=>{for(const z of[0,2,4,5,6,7]){const X=h.palOral[z],K=Math.max(0,(L-X.x)/N),nt=(K>=1?I:I*Math.pow(K,1/1.85))-.45*e,ot=(8.95+.3*Math.min(1,nt/I)**2)*e;if(!(nt<.6*e||X.y<ot+.15*e)){for(let F=0;F<=20;F++){const Et=nt*(F/10-1);B.p(X.x,ot+(X.y-ot)*Math.pow(1-Math.pow(Math.abs(Et)/nt,2.4),.7),Et)}B.end()}}});const W=(B,z,X)=>{const K=o(B,z);return[K.x,K.y,X*e]},q=(B,z,X)=>{const K=z.map(([nt,ot,F])=>W(nt,ot,X*F));for(let nt=0;nt<K.length-1;nt++){const ot=K[Math.max(0,nt-1)],F=K[nt],Et=K[nt+1],vt=K[Math.min(K.length-1,nt+2)];for(let At=0;At<4;At++){const Mt=At/4,Gt=Mt*Mt,Ut=Gt*Mt,C=(b,$,lt,ht)=>.5*(2*$+(-b+lt)*Mt+(2*b-5*$+4*lt-ht)*Gt+(-b+3*$-3*lt+ht)*Ut);B.p(C(ot[0],F[0],Et[0],vt[0]),C(ot[1],F[1],Et[1],vt[1]),C(ot[2],F[2],Et[2],vt[2]))}}B.p(...K[K.length-1]),B.end()};y(k,mt.red,1.25,.9,B=>{for(const z of[1,-1]){q(B,[[6.4,4.6,0],[5.6,4.45,1.5],[4.5,4.4,2.6],[3.2,4.5,3.5],[1.8,4.85,4.15],[.4,5.6,4.6],[-.55,6.6,4.85],[-.9,7.6,4.9],[-1.45,8.9,4.95],[-1.9,9.7,5],[-2.15,10.2,5]],z),q(B,[[-1.8,10.25,4.95],[-.9,9.4,4.85],[.15,10.1,4.6],[.6,8.9,4.35],[1.1,7.7,4],[1.9,7.2,3.55]],z);const X=W(-2.5,10.5,z*4.95);B.ellipse(X,[.45*e,0,0],[0,.12*e,.85*e],16)}}),y(k,mt.red,1,.55,B=>{for(const z of[1,-1]){q(B,[[1.9,7.2,3.55],[3,7.15,3.15],[4.3,7.1,2.6],[5.4,7.05,1.85],[6.2,7.05,1.05],[6.72,7.15,0]],z);for(const[X,K,nt,ot,F]of[[3,3.15,3.2,4.5,3.5],[5.4,1.85,5.6,4.45,1.5],[1.9,3.55,1.8,4.85,4.15]])q(B,[[X,7.15,K],[(X+nt)/2,5.9,(K+F)/2+.15],[nt,ot,F]],z)}});const Y=new xi;q(Y,[[7.25,6.75,0],[7.4,5.4,0],[6.4,4.6,0],[5.6,5,0],[5.9,6.2,0],[6.45,6.55,0]],1);const at=Y.lines[0],U=o(6.98,0).x,st=4*e,V=2.5*e;y(k,mt.blue,1,.8,B=>tt(B,U,st,V,r_,z=>(7.75+.45*Math.pow(z,1.5))*e,-1));const et=s(6.15,15.35),rt=new G(.3*e,(f.y0+f.y1)/2,0);return{model:n,head:f,condyle:d,lipHalf:p,center:rt,shell:M,fixed:w,jaw:k,chin:at,eyes:[[et.x,et.y,3.15*e],[et.x,et.y,-3.15*e]],eyeR:1.05*e}}const p_=[.09,.06,.03];class m_{constructor(){this.scene=new xg,this.camera=new nn(24,1,5,2e3),this.beams=new Wg,this.rest=null,this.w=1,this.h=1,this.compact=!1,this.centred=!1,this.facing=1,this.clock=0,this.gaze=new Xg,this.face=new Ql,this.eye=new G,this.turn=new hs,this.euler=new Ps,this.strobe=0,this.tmp=new Gg,this.particles=[],this.echoes=[],this.lastEcho=-1,this.sparkSeed=7,this.k=1,this.ring={n:0,s:new Float64Array(80),cx:new Float64Array(80),cy:new Float64Array(80),ux:new Float64Array(80),uy:new Float64Array(80),a:new Float64Array(80),b:new Float64Array(80)},this.v3=new G,this.caliper=null,this.scene.add(this.beams.group),this.scene.fog=new la(0,50,100);for(let t=0;t<200;t++)this.particles.push({s:Math.random()*17,u:Math.random()*2-1,v:Math.random()*2-1,life:Math.random(),px:NaN,py:NaN,pz:NaN})}dispose(){this.beams.dispose()}resetMotion(){this.face=new Ql,this.echoes=[],this.lastEcho=-1,this.strobe=0;for(const t of this.particles)t.px=NaN}resize(t,e){this.w=t,this.h=e,this.compact=t<560,this.camera.aspect=t/e,this.compact||this.centred?this.camera.clearViewOffset():this.camera.setViewOffset(t,e,.1*t,0,t,e),this.camera.updateProjectionMatrix(),this.beams.setResolution(t,e);for(const i of this.particles)i.px=NaN}poses(t){const e=this.restFor(t),i=Math.tan(this.camera.fov*Math.PI/360),s=1.1*Math.max(15.2/i,11/(i*Math.max(.3,this.camera.aspect))),r=e.center.clone(),a=this.facing>0?.62:Math.PI-.62,o=.2;return{target:r,home:r.clone().add(new G(Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)).multiplyScalar(s)),side:r.clone().add(new G(0,0,this.facing*s))}}restFor(t){return(!this.rest||this.rest.model!==t)&&(this.rest=d_(t)),this.rest}project(t,e,i){const s=this.v3.set(t,e,i).applyMatrix4(this.beams.group.matrixWorld).project(this.camera);return[(s.x+1)/2*this.w,(1-s.y)/2*this.h]}pxPerCmAt(t,e,i){const s=this.camera.matrixWorld.elements,[r,a]=this.project(t,e,i),[o,l]=this.project(t+s[0],e+s[1],i+s[2]);return Math.hypot(o-r,l-a)}crown(t){const e=this.restFor(t),i=t.tract.scale,s=e.head.at(e.head.y1-1.2*i),r=s?(s.F+s.Bk)/2:e.center.x,[a,o]=this.project(r,e.head.y1,0);return{x:a,y:o,cmPx:this.pxPerCmAt(r,e.head.y1,0)}}faceView(t,e,i){const s=tc(t,e,i).find(r=>r.id==="lips").pos;return{handles:tc,X:r=>this.project(r.x,r.y,0)[0],Y:r=>this.project(r.x,r.y,0)[1],pxPerCm:this.pxPerCmAt(s.x,s.y,0)}}update(t,e,i,s,r,a){this.clock+=a;const o=this.restFor(t),l=t.tract.scale,c=this.face;this.headPose(o,l);const h=_h(t,i.jaw),u=o.condyle,f=this.beams,d=this.camera.position.distanceTo(o.center),g=this.scene.fog;g.near=d-3*l,g.far=d+30*l,f.begin();const _=(L,N=0)=>{const I=new Float32Array(L.length*3);return L.forEach((W,q)=>{I[3*q]=W.x,I[3*q+1]=W.y,I[3*q+2]=N}),I},p=this.v3.copy(this.eye).sub(o.center).normalize(),m=An(.25,.8,Math.abs(p.z)),M=.22+.78*m,v=.45+.55*m,E=(L,N,I,W={},q=M)=>f.line(_(L),L.length,N,I,{...W,alpha:(W.alpha??1)*q}),R=(L,N,I)=>I===0?[L,N]:sc(L,N,u,I);this.k=l;for(const L of o.fixed)for(const N of L.lines)f.line(N,N.length/3,L.color,L.width,{alpha:L.alpha,hot:L.hot});for(const L of o.jaw)for(const N of L.lines){const I=this.tmp.reset();for(let W=0;W<N.length;W+=3){const[q,Y]=R(N[W],N[W+1],h);I.p(q,Y,N[W+2])}f.poly(I,L.color,L.width,{alpha:L.alpha,hot:L.hot})}for(const L of o.shell){const N=this.tmp.reset();for(let I=0;I<L.w.length;I++){const W=L.a[3*I+2],[q,Y]=ic(l,L.c[I],W,c.puff),[at,U]=R(L.a[3*I]+q,L.a[3*I+1],h*L.w[I]);N.p(at,U,W+Y)}f.poly(N,mt.blueDim,.85,{alpha:.42})}const S=yh(t,e,i);E(S.inset,mt.blueDim,.9,{alpha:.5}),E(S.skull,mt.blueDim,.9,{close:!0,alpha:.6}),E(S.brain,mt.blueMid,1,{close:!0,alpha:.75}),E(S.sulcus,mt.blueDim,.9),E(S.nasal,mt.blueMid,1,{close:!0}),E(S.palOral,mt.blueMid,1.1),E(S.palNasal,mt.blueMid,1.1),E(S.skinLower,mt.blue,1.5),E(S.skinUpper,mt.blue,1.5),E(S.outerWall,mt.blue,1.4,{hot:!0}),E(e.inner,mt.blue,1.3,{alpha:.9}),E(S.glottisWall,mt.blue,1.2,{alpha:.8}),this.eyes(o,a),this.airway(t,e,s,r,l),this.velum(e,l),this.epiglottis(e,l,v),this.larynx(t,e,i,s,l,a,o.head.y0,M);const w=_(e.tongue),k=(L,N)=>_($o(L.map(I=>[I.x,I.y]),N).map(([I,W])=>({x:I,y:W}))),y=k(e.upperLip,2),T=k(e.lowerLip,2),O=this.lips(o,t,e,i,h),J=o.chin,tt=new Float32Array(J.length);for(let L=0;L<J.length;L+=3){const[N,I]=R(J[L],J[L+1],h);tt[L]=N,tt[L+1]=I}if(s&&this.clock-this.lastEcho>=.028){this.lastEcho=this.clock;const L=[{a:w,color:mt.green},{a:tt,color:mt.red},{a:y,color:mt.pink},{a:T,color:mt.pink}];for(O&&L.push({a:O,color:mt.pink}),this.echoes.push({t:this.clock,lines:L});this.echoes.length&&this.clock-this.echoes[0].t>.12;)this.echoes.shift()}s&&p_.forEach((L,N)=>{const I=this.nearestEcho(this.clock-L);if(I)for(const W of I.lines)f.line(W.a,W.a.length/3,W.color,1,{alpha:(.1+.07*N)*v})}),this.tongue(e,i,l),f.line(tt,tt.length/3,mt.red,1.5,{hot:!0,alpha:v}),f.line(w,e.tongue.length,mt.green,1.6,{hot:!0,alpha:v}),f.line(y,y.length/3,mt.pink,1.5,{hot:!0,alpha:v}),f.line(T,T.length/3,mt.pink,1.5,{hot:!0,alpha:v}),E($o(e.velum.map(L=>[L.x,L.y]),3).map(([L,N])=>({x:L,y:N})),mt.white,1.25,{alpha:.92},v),r.particles&&s&&this.drawParticles(t,e,s,a),s&&this.drawTurbulence(t,e,s),this.caliper=null,r.calipers&&this.drawCaliper(e),f.end()}nearestEcho(t){let e=null,i=.016;for(const s of this.echoes){const r=Math.abs(s.t-t);r<i&&(i=r,e=s)}return e}headPose(t,e){const i=this.beams.group,s=this.v3.set(-2.4*e,t.head.y0+.42*(t.condyle.y-t.head.y0),0);this.turn.setFromEuler(this.euler.set(this.face.tilt,0,this.face.nod)),i.quaternion.copy(this.turn),i.position.copy(s).sub(s.applyQuaternion(this.turn)),i.updateMatrixWorld(!0),this.eye.copy(this.camera.position),i.worldToLocal(this.eye)}eyes(t,e){const i=this.gaze,s=this.face;i.update(this.clock,e);const r=t.eyeR,a=i.pitch+1.3*s.lookUp,o=[Math.cos(a)*Math.cos(i.yaw),Math.sin(a),Math.cos(a)*Math.sin(i.yaw)],l=f=>{const d=Math.abs(f[1])>.9?[1,0,0]:[0,1,0],g=oc(rc(d,f));return[g,rc(f,g)]},c=this.eye,h=1-An(.4,.9,s.lid),u=Math.max(0,s.brow);for(const f of t.eyes){const d=oc([c.x-f[0],c.y-f[1],c.z-f[2]]),[g,_]=l(d),p=new xi;p.ellipse(f,Yi(g,r),Yi(_,r),36);const[m,M]=l(o),v=[f[0]+o[0]*r*.86,f[1]+o[1]*r*.86,f[2]+o[2]*r*.86];p.ellipse(v,Yi(m,r*.5),Yi(M,r*.5),24);const E=[f[0]+o[0]*r*.97,f[1]+o[1]*r*.97,f[2]+o[2]*r*.97];p.ellipse(E,Yi(m,r*.2),Yi(M,r*.2),14);const R=Math.sign(f[2]),S=(J,tt,L)=>J*(1-tt*tt)+.06*tt*R*L,w=J=>{for(let tt=0;tt<=16;tt++){const L=-1+tt/8,N=R*L*.95,I=S(-.36,L,-1),W=J?S(.5+.2*u,L,1)*(1-s.lid)+(I+.03)*s.lid:I;p.p(f[0]+1.04*r*Math.cos(W)*Math.cos(N),f[1]+1.04*r*Math.sin(W),f[2]+1.04*r*Math.cos(W)*Math.sin(N))}p.end()};w(!0),w(!1);const k=.3*s.brow,y=.28*Math.max(0,-s.brow),T=.22*s.lid*u;for(let J=0;J<=12;J++){const tt=-1+J/6,L=R*(.15+tt*.62),N=(1-tt)/2,I=.82+.12*(1-tt*tt)-.06*tt+k+(T-y)*N;p.p(f[0]+1.32*r*Math.cos(I)*Math.cos(L),f[1]+1.32*r*Math.sin(I),f[2]+1.32*r*Math.cos(I)*Math.sin(L))}p.end();const O=[[mt.blueMid,1,.35],[mt.blue,1,.9*h],[mt.blue,1,.7*h],[mt.blue,1.25,.95],[mt.blue,1.05,.75],[mt.blueMid,1.3,.8]];p.lines.forEach((J,tt)=>this.beams.line(J,J.length/3,O[tt][0],O[tt][1],{alpha:O[tt][2]}))}}lips(t,e,i,s,r){const a=e.tract.scale,o=t.condyle,l=t.head,c=this.beams,h=e.bodyParams.pharynx,u=t.lipHalf,f=Math.max(.3*a,(1.1+(e.bodyParams.lipWidth-1.1)*ec(s.lipWidth))*a/2),d=i.upperLip.slice(6),g=i.lowerLip.slice(6).map(I=>ch(I,o,-r)),_=Yo(d),p=Yo(g),m=d[0],M=g[0],v=(m.y+M.y)/2,E=(I,W)=>{const q=l.at(I);return q?wr(q,W,!0):0},R=m.x-E(m.y,0),S=M.x-E(M.y,0),w=(R+S)/2,k=d[d.length-1].y,y=g[g.length-1].y,T=this.tmp,O=(I,W,q)=>{const Y=Math.sqrt(Math.max(0,1-(q/f)**2)),at=mr(I?d:g,I?_:p,W),U=I?m:M,st=I?k:y,V=v+(U.y-v)*Y,et=st-U.y,rt=V+(at.y-U.y)*(st-V)/(Math.abs(et)<1e-4?1e-4:et),B=Math.pow(Math.max(0,1-(q/u)**2),1.5),z=at.x-E(at.y,0)+(w-(I?R:S))*(1-Y)*(1-W),X=E(rt,q)+z*B,K=I?.5*(1-Y)*(1-W):.5*(1+Y)+.5*(1-Y)*W,nt=K+(Sh(a,h,X,rt)-K)*An(f,u,Math.abs(q)),[ot,F]=ic(a,bh(a,h,X,rt),q,this.face.puff),[Et,vt]=nt?sc(X+ot,rt,o,r*nt):[X+ot,rt];return[Et,vt,q+F]},J=(I,W,q,Y,at)=>{T.reset();for(let U=0;U<=at;U++){const st=q+(Y-q)*U/at;T.p(...O(I,W(st),st))}return T},tt=[.66,.88];for(const I of[!0,!1]){for(const Y of tt)c.poly(J(I,()=>Y,-u,u,24),mt.blueDim,.85,{alpha:.42});for(const Y of[-.8,-.5,.5,.8].map(at=>at*u)){T.reset();for(let at=0;at<=8;at++)T.p(...O(I,.45+.55*at/8,Y));c.poly(T,mt.blueDim,.85,{alpha:.42})}const W=Math.min(u,f+.3*a),q=Y=>{const at=Math.sqrt(Math.max(0,1-(Y/W)**2)),U=I?-.07*Math.exp(-((Y/(.32*a))**2))+.05*Math.exp(-(((Math.abs(Y)-.55*a)/(.3*a))**2)):0;return Math.max(0,(I?.42:.45)*at+U*at)};c.poly(J(I,q,-W,W,28),mt.pink,1.3,{alpha:.95}),c.poly(J(I,Y=>.45*q(Y),-W,W,28),mt.pink,1,{alpha:.45})}for(const I of[1,-1])c.poly(J(!0,()=>0,I*f,I*u,6),mt.pink,1,{alpha:.6});const L=i.upperLip[6].y-i.lowerLip[6].y>.02*a,N=24;T.reset();for(let I=0;I<=N;I++)T.p(...O(!0,0,-f+2*f*I/N));if(L)for(let I=N-1;I>0;I--)T.p(...O(!1,0,-f+2*f*I/N));return c.poly(T,mt.pink,2.1,{hot:!0,close:L}),L?T.a.slice(0,T.n*3):null}tongue(t,e,i){const s=t.tongue;let r=0,a=1/0;s.forEach((d,g)=>{const _=(d.x-t.tip.x)**2+(d.y-t.tip.y)**2;_<a&&(a=_,r=g)});const o=22,l=f_(s.slice(0,r+1),o),c=ec(e.lateral),h=l.map((d,g)=>{const _=l[Math.max(0,g-1)],p=l[Math.min(o-1,g+1)];let m=p.x-_.x,M=p.y-_.y;const v=Math.hypot(m,M)||1;m/=v,M/=v;const E=g/(o-1);return{p:d,nx:-M,ny:m,W:Vn(n_,E)*i,h:(Vn(i_,E)+.8*c*An(.45,.8,E))*i}}),u=(d,g)=>{const _=d.h*(1-Math.cos(g));return[d.p.x-d.nx*_,d.p.y-d.ny*_,d.W*Math.sin(g)]},f=this.tmp;for(let d=1;d<o-1;d+=2){f.reset();for(let g=0;g<=12;g++)f.p(...u(h[d],-Math.PI/2+Math.PI*g/12));this.beams.poly(f,mt.green,1,{alpha:.5})}for(const d of[-Math.PI/2,-Math.PI/4,Math.PI/4,Math.PI/2]){f.reset();for(const g of h)f.p(...u(g,d));this.beams.poly(f,mt.green,Math.abs(d)>1?1.25:1,{alpha:Math.abs(d)>1?.8:.45})}}airway(t,e,i,s,r){const a=e.grid,o=this.ring;if(o.n=0,a.length<2)return;const l=i?t.nodeS(i.t.phLen,i.t.orLen):null,c=s.pressure&&i&&l&&l.length===i.t.pressureRms.length;let h=-1,u=0;for(let _=0;_<a.length&&o.n<o.s.length;_++){const p=a[_],m=p.outer.x-p.inner.x,M=p.outer.y-p.inner.y,v=Math.hypot(m,M);v>1e-4&&(h=m/v,u=M/v);const E=p.d/2,R=o.n++;o.s[R]=p.s,o.cx[R]=p.outer.x-h*E,o.cy[R]=p.outer.y-u*E,o.ux[R]=h,o.uy[R]=u,o.a[R]=E,o.b[R]=p.d>.01?Math.min(3.5*r,2*p.area/(Math.PI*p.d)):0}const f=this.tmp,d=this.eye;for(let _=0;_<o.n;_+=2){f.reset();for(let R=0;R<=24;R++){const S=R/24*Math.PI*2,w=Math.cos(S)*o.a[_],k=Math.sin(S)*o.b[_];f.p(o.cx[_]+o.ux[_]*w,o.cy[_]+o.uy[_]*w,k)}const p=d.x-o.cx[_],m=d.y-o.cy[_],M=d.z,v=Math.abs(o.uy[_]*p-o.ux[_]*m)/(Math.hypot(p,m,M)||1),E=1-.65*v*v;if(c){const R=Math.pow(Fg(To(i.t.pressureRms,l,o.s[_])),.85);this.beams.poly(f,Ng(R),.85,{alpha:(.25+.65*R)*E})}else this.beams.poly(f,mt.blueDim,.85,{alpha:(s.grid?.8:.45)*E})}for(const _ of[1,-1]){f.reset();for(let p=0;p<o.n;p++)f.p(o.cx[p],o.cy[p],_*o.b[p]);this.beams.poly(f,mt.blue,1,{alpha:.55})}const g=e.glottis;for(const _ of[.3,.65]){const p=g.x+(o.cx[0]-g.x)*_,m=g.y+(o.cy[0]-g.y)*_,M=(.55+.25*_)*r;f.reset();for(let v=0;v<=20;v++)f.p(p+M*Math.cos(v/20*Math.PI*2),m,M*Math.sin(v/20*Math.PI*2));this.beams.poly(f,mt.blueDim,.9,{alpha:.6})}}airPoint(t,e,i,s){const r=this.ring;if(r.n<2)return null;if(e<=r.s[0]){const f=Math.max(0,e/Math.max(.01,r.s[0])),d=t.glottis;return[d.x+(r.cx[0]-d.x)*f+i*.3*this.k,d.y+(r.cy[0]-d.y)*f,s*.45*this.k]}let a=0,o=r.n-1;if(e>=r.s[o])return null;for(;o-a>1;){const f=a+o>>1;r.s[f]<=e?a=f:o=f}const l=(e-r.s[a])/Math.max(1e-6,r.s[o]-r.s[a]),c=f=>f[a]+(f[o]-f[a])*l,h=c(r.a)*i*.82,u=c(r.b)*s*.82;return[c(r.cx)+c(r.ux)*h,c(r.cy)+c(r.uy)*h,u]}drawParticles(t,e,i,s){const r=i.t,a=t.nodeS(r.phLen,r.orLen),o=new Float32Array(r.phAreas.length+r.orAreas.length);o.set(r.phAreas,0),o.set(r.orAreas,r.phAreas.length);const l=e.lipS;for(const c of this.particles){const h=To(r.flow,a,c.s),u=Math.max(.05,To(o,a,c.s)),f=h/u,d=Math.sign(f)*2.2*Math.log1p(Math.abs(f)/30);if(c.s+=d*s,c.life-=s*.25,(c.s>l||c.s<0||c.life<=0||Math.abs(f)<3)&&!(Math.abs(f)<3&&c.life>0)){c.s=Math.random()*.8,c.u=Math.random()*2-1,c.v=Math.random()*2-1,c.life=.6+Math.random()*.8,c.px=NaN;continue}const g=this.airPoint(e,c.s,c.u,c.v);if(g){if(Number.isFinite(c.px)){const _=Math.min(2,Math.floor(Math.min(1,Math.abs(d)/6)*Math.min(1,c.life)*3));this.beams.seg(c.px,c.py,c.pz,g[0],g[1],g[2],"#ffe2a8",1.05,.16+.2*_)}[c.px,c.py,c.pz]=g}}}drawTurbulence(t,e,i){const s=i.t;if(!(s.noiseLevel>1)||s.noiseNode<0)return;const r=t.branchS(s.noiseNode,s.phLen,s.orLen);if(r<0)return;const a=Math.min(1,Math.log10(s.noiseLevel)/3.2);if(a<=.05)return;let o=this.sparkSeed=this.sparkSeed*16807%2147483647;const l=()=>(o=o*16807%2147483647)/2147483647;for(let c=0;c<40;c++){const h=this.airPoint(e,r+.2+l()*1.2,l()*2-1,l()*2-1);if(!h)continue;const u=.02+l()*.05;this.beams.seg(h[0]-u,h[1],h[2],h[0]+u,h[1],h[2],"#f4fbff",1.6,.15+.7*a*l())}}drawCaliper(t){const e=this.ring;let i=-1,s=1/0;for(let o=2;o<t.grid.length-1;o++)t.grid[o].area<s&&(s=t.grid[o].area,i=o);if(i<0||s>=1.2||i>=e.n)return;const r=this.tmp.reset();for(let o=0;o<=24;o++){const l=o/24*Math.PI*2,c=Math.cos(l)*e.a[i],h=Math.sin(l)*e.b[i];r.p(e.cx[i]+e.ux[i]*c,e.cy[i]+e.uy[i]*c,h)}this.beams.poly(r,mt.white,1.3,{hot:!0});const a=t.grid[i];this.caliper={x:a.outer.x,y:a.outer.y,z:0,area:s}}velum(t,e){const i=t.velum,s=Math.floor(i.length/2)-1,r=[];for(let l=0;l<=s;l++){const c=i[l],h=i[i.length-1-l];let u=c.x-h.x,f=c.y-h.y;const d=Math.hypot(u,f)||1;u/=d,f/=d;const g=l/s;r.push({x:(c.x+h.x)/2,y:(c.y+h.y)/2,nx:u,ny:f,W:(1.95-1.5*Math.pow(g,1.5))*e,droop:.45*e*g})}const a=(l,c)=>{const h=.12*e*(1-c*c)-l.droop*c*c;return[l.x+l.nx*h,l.y+l.ny*h,l.W*c]},o=this.tmp;for(const l of[1,3,5,7,9].filter(c=>c<=s)){o.reset();for(let c=0;c<=12;c++)o.p(...a(r[l],-1+c/6));this.beams.poly(o,mt.white,1,{alpha:.5})}for(const l of[-1,1]){o.reset();for(const c of r)o.p(...a(c,l));this.beams.poly(o,mt.white,1,{alpha:.65})}}epiglottis(t,e,i){const[s,r]=t.epiglottis;let a=r.x-s.x,o=r.y-s.y;const l=Math.hypot(a,o)||1;a/=l,o/=l;const c={x:-o,y:a},h=d=>(.22+.9*Math.pow(Math.sin(d*Math.PI/2),1.3))*e,u=this.tmp.reset(),f=10;for(let d=0;d<=f;d++){const g=d/f,_=h(g),p=.28*e*(_/(1.12*e));u.p(s.x+a*l*g+c.x*p,s.y+o*l*g+c.y*p,_)}for(let d=1;d<12;d++){const g=h(1)*(1-2*d/12),_=.28*e*(Math.abs(g)/(1.12*e))**2;u.p(r.x+c.x*_+a*.08*e*(1-(g/h(1))**2),r.y+c.y*_+o*.08*e*(1-(g/h(1))**2),g)}for(let d=f;d>=0;d--){const g=d/f,_=h(g),p=.28*e*(_/(1.12*e));u.p(s.x+a*l*g+c.x*p,s.y+o*l*g+c.y*p,-_)}this.beams.poly(u,mt.blue,1.1,{alpha:.75}),this.beams.line(new Float32Array([s.x,s.y,0,r.x,r.y,0]),2,mt.blue,2.1,{alpha:.85*i})}larynx(t,e,i,s,r,a,o,l){const c=e.glottis,h=this.beams,u=new xi,f=(S,w,k)=>[c.x+S*r,c.y+w*r,k*r],d=(S,w=!1)=>{for(const[k,y,T]of S)u.p(...f(k,y,T));u.end(w)};for(const S of[1,-1])d([[1.45,1.75,0],[.75,2,S*1.2],[-.5,1.95,S*1.9],[-.6,-.6,S*1.85],[.25,-.85,S*1.5],[1.05,-.8,S*.55],[1.2,-.75,0],[1.6,.05,0],[1.9,1.15,0],[1.45,1.75,0]]),d([[-.5,1.95,S*1.9],[-.7,2.85,S*1.85]]),d([[-.6,-.6,S*1.85],[-.45,-1.25,S*1.7]]);for(const[S,w]of[[-1.75,.15],[-1.4,1.1]]){for(let k=0;k<=28;k++){const y=k/28*Math.PI*2;u.p(...f(.1+1*Math.cos(y),S+w*(1-Math.cos(y))/2,1.1*Math.sin(y)))}u.end()}for(const S of u.lines)h.line(S,S.length/3,mt.blueMid,1,{alpha:.85});const g=new xi,_=c.y-2.1*r,p=c.x+.08*r;for(let S=_;S>o;S-=.5*r)g.ellipse([p,S,0],[.82*r,0,0],[0,0,.95*r],20,-.8*Math.PI,.8*Math.PI);for(const S of[1,-1])g.p(p,_,S*.95*r).p(p,o,S*.95*r).end();for(const S of g.lines)h.line(S,S.length/3,mt.blueDim,.9,{alpha:.85});for(const S of[1,-1])h.line(new Float32Array([p+S*.82*r,c.y,0,p+S*.82*r,o,0]),2,mt.blueMid,1,{alpha:l});const m=new xi,M={x:t.tract.P(1.6,0).x,y:t.tract.P(0,2.9).y+.6*i.larynx*r};for(const S of[-.16,.16]){for(let w=0;w<=20;w++){const k=-1+w/10;m.p(M.x+(.35-.65*k*k)*r,M.y+S*r,1.15*k*r)}m.end();for(const w of[1,-1])m.p(M.x-.3*r,M.y+S*r,w*1.15*r).p(M.x-2.8*r,M.y+(.7+S)*r,w*2.05*r).end()}for(const S of m.lines)h.line(S,S.length/3,mt.blueMid,1,{alpha:.85});const v=s==null?void 0:s.t.glottalArea;let E=0;if(v&&v.length){this.strobe=(this.strobe+a/1.8)%1;let S=.02;for(let w=0;w<v.length;w++)S=Math.max(S,v[w]);E=Math.min(.45*r,v[Math.floor(this.strobe*v.length)%v.length]/(1.3*r)*2.2),Number.isFinite(E)||(E=0)}const R=new xi;for(const S of[1,-1])R.p(...f(.72,.1,0)).p(...f(-.55,.1,S*(.06+E/r))).end(),R.p(...f(.72,0,0)).p(...f(-.6,0,S*.62)).end(),R.p(...f(.65,.45,0)).p(...f(-.5,.45,S*.45)).end(),R.ellipse(f(-.72,.15,S*(.3+E/r)),[.18*r,0,0],[0,.12*r,.12*r],10);R.lines.forEach((S,w)=>h.line(S,S.length/3,w%4===0?mt.white:mt.blueMid,w%4===0?1.3:1,{alpha:w%4===2?.6:.9,hot:w%4===0}))}}function sc(n,t,e,i){const s=n-e.x,r=t-e.y,a=Math.cos(i),o=Math.sin(i);return[e.x+s*a-r*o,e.y+s*o+r*a]}const rc=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],oc=n=>{const t=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/t,n[1]/t,n[2]/t]},Yi=(n,t)=>[n[0]*t,n[1]*t,n[2]*t];function To(n,t,e){let i=0,s=1/0;for(let r=0;r<t.length;r++){const a=Math.abs(t[r]-e);a<s&&(s=a,i=r)}return n[i]??0}const ac=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0;function g_(n){const t=ac(n.female),e=ac(n.child);return[["male",(1-e)*(1-t)],["female",(1-e)*t],["child",e]]}class Eh{constructor(t,e){this.cacheKey="",this.cacheFrame=null,this.tfKey="",this.tf=null,this.body=t,this.model=Pg(t,e),this.bodyParams=this.model.body,this.tract=new Rg(this.bodyParams),this.nPh=this.model.nPh,this.nOr=this.model.nOr;const i=g_(t).filter(([,s])=>s>0).map(([s,r])=>({w:r,table:Ag[s]??{}}));this.vowels=Cg.filter(s=>i.every(r=>r.table[s.ipa])).map(s=>{const r=o=>{let l=0,c=0;for(const h of i){const u=o(h.table[s.ipa]);u!==void 0&&(l+=h.w*u,c+=h.w)}return c>0?l/c:void 0},a={};for(const o of Si){const l=r(c=>c.artic[o]);l!==void 0&&(a[o]=l)}return{ipa:s.ipa,example:s.example,F1:r(o=>o.formants[0]),F2:r(o=>o.formants[1]),artic:a}})}dispose(){Lg(this.model)}static articFromArray(t){const e={...Tr};return Si.forEach((i,s)=>e[i]=t[s]),e}frame(t){const e=Si.map(i=>t[i].toFixed(3)).join(",");return(e!==this.cacheKey||!this.cacheFrame)&&(this.cacheFrame=Dg(this.model,t),this.cacheKey=e),this.cacheFrame}areas(t){return Ug(this.model,t)}transfer(t){const e=Si.map(i=>t[i].toFixed(2)).join(",");return e===this.tfKey&&this.tf?this.tf:(this.tf=Ig(this.model,t),this.tfKey=e,this.tf)}articForFormants(t,e){const i=this.vowels.map(l=>{const c=Math.log(t/l.F1)*2.2,h=Math.log(e/l.F2),u=Math.hypot(c,h);return{v:l,w:1/Math.pow(u+.02,3)}});i.sort((l,c)=>c.w-l.w);const s=i.slice(0,4),r=s.reduce((l,c)=>l+c.w,0),a=["tbX","tbY","jaw","lipAp","lipProt","lipWidth","root","larynx","ttCurl"],o={};for(const l of a){let c=0;for(const{v:h,w:u}of s)c+=(h.artic[l]??Tr[l])*u;o[l]=c/r}return o}nodeS(t,e){const i=this.nPh,s=this.nOr,r=new Float64Array(i+s);for(let a=0;a<i;a++)r[a]=(a+.5)/i*t;for(let a=0;a<s;a++)r[i+a]=t+(a+.5)/s*e;return r}branchS(t,e,i){const s=this.model.pharynxBranches,r=this.model.oralBranches;return t>=s.base&&t<s.base+s.n-1?(t-s.base+1)/s.n*e:t>=r.base&&t<r.base+r.n-1?e+(t-r.base+1)/r.n*i:t===this.model.glottisPort?.2:-1}}const ua=Object.freeze({...mt});function lc(n,t){if(!n)return t();Object.assign(mt,n);try{return t()}finally{Object.assign(mt,ua)}}function Th(n,t={}){return{...ua,blue:n,blueMid:an(n,"#000000",.22),blueDim:an(n,"#000000",.45),frame:an(n,"#000000",.7),...t}}const __=4;function v_(n,t){return Math.min(t,Math.max(0,Math.round(n))+__)}const M_={pressure:!0,particles:!0,grid:!1,calipers:!1},y_=48e3,jo=Object.freeze({...Tr,jaw:.18,lipAp:0,lipProt:.1}),cc=new Map;function x_(n){const t=`${(+n.female||0).toFixed(3)}/${(+n.child||0).toFixed(3)}`;let e=cc.get(t);return e||(e=new Eh({female:+n.female||0,child:+n.child||0},y_),cc.set(t,e)),e}const hc=n=>Eh.articFromArray(n),wo=new G;class S_{constructor(t,e){this.model=x_(t),this.palette=e;const i=this.r=new m_;i.centred=!0,i.camera.aspect=1,i.camera.clearViewOffset(),i.camera.updateProjectionMatrix(),this.tile=0,this.lw=0,this.target=new G,lc(e,()=>this.target.copy(i.poses(this.model).target)),this.k=this.model.tract.scale,this.half=Math.tan(i.camera.fov*Math.PI/360),this.dist=1.1*15.2/this.half,this._hullSrc=null}aim(t,e,i,s){const r=this.r;(Math.abs(i-this.tile)>.01||s!==this.lw)&&(this.tile=i,this.lw=s,r.w=r.h=i,r.beams.setResolution(i/s,i/s));const a=this.dist,o=r.camera;o.position.set(Math.sin(t)*Math.cos(e),Math.sin(e),Math.cos(t)*Math.cos(e)).multiplyScalar(a).add(this.target),o.up.set(0,1,0),o.lookAt(this.target),o.updateMatrixWorld()}update(t,e,i,s,r=0,a=0){const o=this.r;lc(this.palette,()=>{o.face.update(i,e),o.face.nod+=r,o.face.tilt+=a,this.f=this.model.frame(s),o.update(this.model,this.f,s,i,M_,t)})}resetMotion(){this.r.resetMotion()}project(t,e,i){return this.r.project(t,e,i)}neck(){const t=this.r.rest,e=this.k,i=t.head.y0+3.4*e,s=t.head.at(i),r=s?(s.F+s.Bk)/2:t.center.x,[a,o]=this.r.project(r,i,0),[l]=this.r.project(s?s.F:r+4,i,0);return{x:a,y:o,cm:this.r.pxPerCmAt(r,i,0),front:l-a}}mouth(){const t=this.f;if(!t)return this.r.project(this.target.x+7*this.k,this.target.y-4*this.k,0);const e=t.upperLip[Math.min(6,t.upperLip.length-1)],i=t.lowerLip[Math.min(6,t.lowerLip.length-1)];let s=-1/0;for(const r of t.upperLip)s=Math.max(s,r.x);return this.r.project(s,(e.y+i.y)/2,0)}crown(){return this.r.crown(this.model)}hull(){if(!this._hullSrc){const o=[];for(const l of this.r.rest.shell)for(let c=0;c<l.a.length;c+=9)o.push(l.a[c],l.a[c+1],l.a[c+2]);this._hullSrc=new Float32Array(o),this._hullXY=new Float32Array(o.length/3*2)}const t=this._hullSrc,e=this._hullXY,i=this.r,s=i.beams.group.matrixWorld,r=i.w,a=i.h;for(let o=0,l=0;o<t.length;o+=3,l+=2)wo.set(t[o],t[o+1],t[o+2]).applyMatrix4(s).project(i.camera),e[l]=(wo.x+1)/2*r,e[l+1]=(1-wo.y)/2*a;return b_(e)}dispose(){this.r.dispose()}}function b_(n){const t=n.length/2,e=new Array(t);for(let o=0;o<t;o++)e[o]=o;e.sort((o,l)=>n[2*o]-n[2*l]||n[2*o+1]-n[2*l+1]);const i=(o,l,c)=>(n[2*l]-n[2*o])*(n[2*c+1]-n[2*o+1])-(n[2*l+1]-n[2*o+1])*(n[2*c]-n[2*o]),s=[],r=[];for(const o of e){for(;s.length>=2&&i(s[s.length-2],s[s.length-1],o)<=0;)s.pop();s.push(o)}for(let o=e.length-1;o>=0;o--){const l=e[o];for(;r.length>=2&&i(r[r.length-2],r[r.length-1],l)<=0;)r.pop();r.push(l)}r.pop(),s.pop();const a=[];for(const o of s.concat(r))a.push(n[2*o],n[2*o+1]);return a}class E_{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=512,this.failed=!1,this.lost=!1,this.size=512;try{this.gl=new lh({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1})}catch(e){console.warn("heads: WebGL unavailable",e),this.failed=!0;return}const t=this.gl;t.outputColorSpace=Rn,t.setClearColor(0,1),t.setPixelRatio(1),t.setSize(512,512,!1),t.autoClear=!1,this.canvas.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>this.lost=!1)}get ok(){return!this.failed&&!this.lost}render(t,e){e=Math.max(8,Math.round(e)),e>this.size&&(this.size=Math.min(4096,Math.ceil(e/256)*256),this.gl.setSize(this.size,this.size,!1));const i=this.gl,s=v_(e,this.size);return i.setScissorTest(!0),i.setScissor(0,0,s,s),i.clear(),i.setViewport(0,0,e,e),i.setScissor(0,0,e,e),i.render(t.r.scene,t.r.camera),[0,this.size-e,e,e]}dispose(){this.gl&&(this.gl.dispose(),this.gl.forceContextLoss())}}const on=Math.PI*2,Kt=n=>{const t=new Path2D;return n(t),t};function _n(n,t,e,i,s,r=0,a=1){n.save(),n.translate(t,e),r&&n.rotate(r),n.scale(i*a,i);try{s()}finally{n.restore()}}const Pn=(n,t)=>n/Math.abs(t);function wh(n,t,e,i,s={}){if(!(i>=0)||i>1.5)return;const r=Pi(s.seed??1),a=s.count??22,o=s.colors??[x.gold,x.magenta,x.cyan,x.lime,x.sky],l=s.spread??1;for(let c=0;c<a;c++){const h=r.range(-Math.PI,0)+r.range(-.4,.4),u=r.range(90,260)*l,f=t+Math.cos(h)*u*i,d=e+Math.sin(h)*u*i+260*i*i,g=1-ie(i/1.4),_=r.pick(o),p=r.range(4,12)*i+r.range(0,on),m=r.range(3,7);c%3===0?(Bt(n,f-m,d,f+m,d,_,1.3,{alpha:g,hot:!0}),Bt(n,f,d-m,f,d+m,_,1.3,{alpha:g,hot:!0})):Bt(n,f-Math.cos(p)*m,d-Math.sin(p)*m,f+Math.cos(p)*m,d+Math.sin(p)*m,_,1.6,{alpha:g})}}function bs(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,a=i.color??x.violet,o=i.alpha??1;_n(n,t,e,s,()=>{const l=Pn(1.5,s),c=Kt(u=>{u.moveTo(18,-6),u.bezierCurveTo(10,-14,-10,-12,-16,-3),u.lineTo(-30,2),u.lineTo(-28,7),u.lineTo(-14,5),u.bezierCurveTo(-4,10,12,8,18,-6),u.closePath()});Ct(n,c),it(n,c,a,l,{alpha:o});const h=Kt(u=>{u.arc(19,-9,6.5,0,on)});if(Ct(n,h),it(n,h,a,l,{alpha:o}),it(n,Kt(u=>{u.moveTo(25,-11),u.lineTo(35,-7.5),u.lineTo(25,-6.5)}),x.amber,l,{alpha:o,hot:!0}),_e(n,21,-10.5,1.3,x.white,o),i.perched)it(n,Kt(u=>{u.moveTo(-14,-2),u.bezierCurveTo(-4,-8,8,-6,12,-2)}),a,l*.8,{alpha:.7*o}),it(n,Kt(u=>{u.moveTo(0,7),u.lineTo(-2,15),u.moveTo(6,7),u.lineTo(5,15),u.moveTo(-6,15),u.lineTo(10,15)}),x.amber,l,{alpha:o});else{const u=Math.sin((i.flap??0)*on);for(const f of[1,.6]){const d=-30*u*f-4,g=Kt(_=>{_.moveTo(6,-6),_.bezierCurveTo(0,d*.6-4,-14,d,-24,d+2),_.lineTo(-18,d*.4+2),_.bezierCurveTo(-10,-2,-2,-2,-6,-2)});it(n,g,a,l,{alpha:o*(f===1?1:.5)})}}},0,r)}function Ah(n,t,e,i=1,s={}){_n(n,t,e,i,()=>{const r=Kt(a=>{a.moveTo(-20,8),a.lineTo(-22,-10),a.lineTo(-10,0),a.lineTo(0,-16),a.lineTo(10,0),a.lineTo(22,-10),a.lineTo(20,8),a.closePath()});Ct(n,r),it(n,r,s.color??x.gold,Pn(1.8,i),{hot:!0,alpha:s.alpha});for(const[a,o]of[[-22,-12],[0,-18],[22,-12]])_e(n,a,o,2.4,x.magenta,s.alpha??1);Bt(n,-18,3,18,3,s.color??x.gold,Pn(1,i),{alpha:.6*(s.alpha??1)})})}function T_(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,a=i.color??x.white,o=Math.sin((i.bob??0)*on)*4;_n(n,t,e,s,()=>{const l=Pn(1.6,s),c=Kt(d=>{d.moveTo(14,-30),d.bezierCurveTo(26,-10,22,18,0,22),d.bezierCurveTo(-24,24,-36,6,-40,-18),d.lineTo(-30,-12),d.lineTo(-34,-30),d.lineTo(-22,-16),d.bezierCurveTo(-12,-14,0,-18,14,-30),d.closePath()});Ct(n,c),it(n,c,a,l),it(n,Kt(d=>{d.moveTo(-14,0),d.bezierCurveTo(-6,10,6,8,8,-2)}),a,l*.8,{alpha:.6});const h=18+o,u=-44,f=Kt(d=>{d.moveTo(10,-26),d.lineTo(h-4,u+8),d.arc(h,u,9,Math.PI*.75,Math.PI*.4,!1),d.lineTo(20,-22)});Ct(n,f),it(n,f,a,l),it(n,Kt(d=>{d.moveTo(h+7,u-2),d.lineTo(h+17,u+1),d.lineTo(h+7,u+4)}),x.amber,l,{hot:!0}),it(n,Kt(d=>{d.moveTo(h-4,u-8),d.bezierCurveTo(h-6,u-18,h,u-16,h,u-10),d.bezierCurveTo(h+2,u-18,h+8,u-16,h+5,u-7)}),x.red,l,{hot:!0}),it(n,Kt(d=>{d.moveTo(h+7,u+4),d.bezierCurveTo(h+10,u+12,h+4,u+12,h+4,u+6)}),x.red,l),_e(n,h+2,u-2,1.6,x.white),it(n,Kt(d=>{for(const g of[-8,4])d.moveTo(g,21),d.lineTo(g,38),d.moveTo(g-6,40),d.lineTo(g,38),d.lineTo(g+7,40)}),x.amber,l),i.crown&&Ah(n,h-1,u-20,.5/1,{color:x.gold})},0,r)}function w_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.sky;_n(n,t,e,s,()=>{const a=Pn(1.6,s),o=Kt(l=>{l.moveTo(30,-32),l.bezierCurveTo(40,-30,38,-18,28,-16),l.bezierCurveTo(22,0,10,14,-16,16),l.bezierCurveTo(-34,16,-46,12,-50,4),l.lineTo(-58,-4),l.lineTo(-50,10),l.lineTo(-62,14),l.lineTo(-44,18),l.bezierCurveTo(-20,22,10,22,20,12),l.lineTo(26,22),l.lineTo(12,22),l.bezierCurveTo(16,0,14,-26,30,-32),l.closePath()});Ct(n,o),it(n,o,r,a),_e(n,30,-26,1.8,x.white);for(const l of[-1,1])Bt(n,36,-21,46,-21+l*3,r,a*.6,{alpha:.6});if(i.ball){const l=-44+Math.sin((i.t??0)*6)*2;Ne(n,36,l,9,x.red,a,{hot:!0}),it(n,Kt(c=>{c.moveTo(27,l),c.bezierCurveTo(32,l-6,40,l-6,45,l)}),x.white,a*.7,{alpha:.7})}},0,i.facing??1)}function A_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.lime,a=ie(i.jaw??0)*.45;_n(n,t,e,s,()=>{const o=Pn(1.6,s),l=Kt(c=>{c.moveTo(30,-8),c.bezierCurveTo(10,-18,-30,-16,-60,-6),c.lineTo(-90,0),c.lineTo(-60,6),c.bezierCurveTo(-30,12,10,12,30,4),c.closePath()});Ct(n,l),it(n,l,r,o),it(n,Kt(c=>{for(let h=0;h<9;h++){const u=20-h*10;c.moveTo(u,-12+h*.6),c.lineTo(u-4,-17+h*.6),c.lineTo(u-8,-12+h*.6)}}),r,o*.8,{alpha:.7}),_n(n,30,-4,1,()=>{n.rotate(-a);const c=Kt(h=>{h.moveTo(0,-4),h.lineTo(46,-2),h.lineTo(48,2),h.lineTo(0,2)});Ct(n,c),it(n,c,r,o),it(n,Kt(h=>{for(let u=0;u<6;u++)h.moveTo(8+u*7,2),h.lineTo(11+u*7,5),h.lineTo(14+u*7,2)}),x.white,o*.7),_e(n,8,-7,2,x.amber)}),_n(n,30,2,1,()=>{n.rotate(a*.6),it(n,Kt(c=>{c.moveTo(0,0),c.lineTo(44,0),c.lineTo(42,5),c.lineTo(0,6)}),r,o)}),it(n,Kt(c=>{for(const h of[16,-40])c.moveTo(h,8),c.lineTo(h-4,18),c.lineTo(h+4,18)}),r,o)},0,i.facing??1)}function C_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.blueMid,a=i.trunk??0;_n(n,t,e,s,()=>{const o=Pn(1.6,s),l=Kt(h=>{h.moveTo(30,-50),h.bezierCurveTo(10,-66,-50,-64,-60,-30),h.lineTo(-60,10),h.lineTo(-46,10),h.lineTo(-44,-6),h.lineTo(-20,-6),h.lineTo(-18,10),h.lineTo(-4,10),h.lineTo(0,-10),h.lineTo(16,-10),h.lineTo(18,10),h.lineTo(32,10),h.lineTo(34,-20),h.closePath()});Ct(n,l),it(n,l,r,o);const c=Kt(h=>{h.arc(38,-42,20,0,on)});Ct(n,c),it(n,c,r,o),it(n,Kt(h=>{h.moveTo(30,-58),h.bezierCurveTo(6,-66,4,-24,30,-28)}),r,o,{alpha:.8}),it(n,Kt(h=>{h.moveTo(54,-36),h.bezierCurveTo(66,-20,60+a*10,0,66+a*16,6)}),r,o),_e(n,44,-46,1.8,x.white),it(n,Kt(h=>{h.moveTo(50,-30),h.lineTo(60,-24)}),x.white,o,{alpha:.8}),Bt(n,-60,-26,-70,-10,r,o)},0,i.facing??1)}function Ch(n,t,e,i={}){const s=i.scale??1,r=i.color??x.cyan,a=ie(i.pressed??0),o=i.glow??0;_n(n,t,e,s,()=>{const l=Pn(1.6,s),c=Je(-40,-30,80,66,10);Ct(n,c),it(n,c,r,l,{alpha:.7});const h=a*8,u=Je(-31,-40+h,62,56,8);Ct(n,u),it(n,u,r,l*(1+o),{hot:o>.3});for(const[f,d,g,_]of[[-40,-30,-31,-40+h],[40,-30,31,-40+h],[-40,36,-31,16+h],[40,36,31,16+h]])Bt(n,f,d,g,_,r,l*.8,{alpha:.6});xt(n,i.label??"",0,0+h,{size:34,align:"center",color:o>.2?x.white:r,weight:"m",ls:0})})}function R_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.coral,a=ie(i.open??0);_n(n,t,e,s,()=>{const o=Pn(1.5,s);if(a<.05){const l=Ln(-26,-36,52,72,3);if(Ct(n,l),it(n,l,r,o),Bt(n,-20,-36,-20,36,r,o,{alpha:.6}),i.title)for(const[c,h]of Li(n,i.title.toUpperCase(),40,{size:8}).entries())xt(n,h,3,-16+c*11,{size:8,align:"center",color:x.white,ls:.1})}else{const l=36*a;for(const c of[-1,1]){const h=Kt(u=>{u.moveTo(0,34),u.bezierCurveTo(c*l*.4,30,c*l,32,c*l,30),u.lineTo(c*l,-32),u.bezierCurveTo(c*l,-30,c*l*.4,-34,0,-30),u.closePath()});Ct(n,h),it(n,h,r,o);for(let u=0;u<6;u++)Bt(n,c*6,-20+u*8,c*(l-6),-20+u*8,x.white,o*.6,{alpha:.4*a})}}})}function P_(n,t,e,i,s={}){const r=s.age??1;if(r<-.15)return;const a=r<0?1+-r/.15*1.6:1+.18*Math.exp(-r*18)*Math.cos(r*40),o=s.size??44,l=s.color??x.red;n.save(),n.translate(t,e),n.rotate(s.rot??-.12),n.scale(a,a);const c=he(n,i.toUpperCase(),{size:o,weight:"m",ls:.12})+o*.9,h=o*1.5;if(n.globalAlpha=r<0?.5:1,it(n,Je(-c/2,-h/2,c,h,6),l,3,{hot:r>=0&&r<.3}),it(n,Je(-c/2+6,-h/2+6,c-12,h-12,4),l,1.2,{alpha:.6}),xt(n,i.toUpperCase(),0,o*.36,{size:o,align:"center",color:l,weight:"m",ls:.12}),n.restore(),r>=0&&r<.5){const u=Pi(i);for(let f=0;f<10;f++){const d=u.range(0,on),g=c/2*(1+r*u.range(.8,2.2));_e(n,t+Math.cos(d)*g,e+Math.sin(d)*g*.5,1.6,l,1-r*2)}}}function L_(n,t,e,i,s={}){const r=$e.outBack(ie(s.appear??1));if(r<=0)return;const a=s.size??20,o=s.side??1,l=String(i).split(`
`).flatMap(_=>Li(n,_,(s.w??300)-30,{size:a})),c=Math.max(...l.map(_=>he(n,_,{size:a})))+34,h=l.length*a*1.35+22,u=t+o*30-(o<0?c:0),f=e-40-h,d=s.color??x.white;n.save(),n.translate(t,e),n.scale(r,r),n.translate(-t,-e);const g=Je(u,f,c,h,14);if(Ct(n,g),it(n,g,d,1.6),s.think)for(let _=0;_<3;_++)Ne(n,t+o*(6+_*8),e-8-_*12,3+_*2,d,1.2);else{const _=Kt(p=>{p.moveTo(t+o*34,f+h-1),p.lineTo(t,e),p.lineTo(t+o*58,f+h-1)});Ct(n,_),it(n,Kt(p=>{p.moveTo(t+o*34,f+h),p.lineTo(t,e),p.lineTo(t+o*58,f+h)}),d,1.6)}l.forEach((_,p)=>xt(n,_,u+17,f+14+(p+.8)*a*1.35-a*.25,{size:a,color:d})),n.restore()}function D_(n,t,e,i=360,s={}){var f;const r=s.color??x.gold,a=$e.outCubic(ie(s.rise??1)),o=i/3,l=[i*.42,i*.3,i*.2].map(d=>d*a),c=[t-o/2,t-o*1.5,t+o/2],h=[0,1,2],u=[];for(const d of h){const g=c[d],_=l[d],p=Ln(g,e-_,o,_);Ct(n,p),it(n,p,d===0?r:an(r,"#888888",.4),1.6,{hot:d===0}),_>30&&xt(n,String(((f=s.labels)==null?void 0:f[d])??d+1).toUpperCase(),g+o/2,e-_+Math.min(48,_*.6),{size:Math.min(40,o*.32),align:"center",color:d===0?r:x.white,weight:"m",ls:.05}),u.push([g+o/2,e-_])}return u}function U_(n,t,e,i={}){const s=i.w??300,r=i.height??120,a=i.color??x.lime,o=(i.wobble??0)*6;for(const c of[-1,1])Bt(n,t+c*s/2,e,t+c*s/2,e-r-40,x.blueMid,2),Bt(n,t+c*s/2-12,e,t+c*s/2+12,e,x.blueMid,2),Bt(n,t+c*s/2-6,e-r,t+c*s/2+6,e-r,x.white,1.4);const l=Kt(c=>{c.moveTo(t-s/2,e-r),c.quadraticCurveTo(t,e-r+o,t+s/2,e-r)});it(n,l,a,4,{hot:!0});for(let c=1;c<8;c++){const h=t-s/2+s*c/8;Bt(n,h-4,e-r-2,h+4,e-r+2,x.white,1.4,{alpha:.7})}}function I_(n,t,e,i,s={}){const r=s.size??30,a=s.age??10,o=r*.82,l=r*1.3,c=String(i).toUpperCase().padEnd(s.cells??i.length," "),h="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for(let u=0;u<c.length;u++){const f=t+u*(o+3),d=Ln(f,e-l,o,l,2);Ct(n,d,"#05080c"),it(n,d,x.blueDim,1),Bt(n,f,e-l/2,f+o,e-l/2,"#000",1.2);const g=.25+u*.05;let _=c[u];a<g&&_!==" "&&(_=h[Math.floor((a*30+u*7)%h.length)]),a<0&&(_=" "),xt(n,_,f+o/2,e-l*.25,{size:r,align:"center",color:a<g?x.blueMid:s.color??x.amber,weight:"m",ls:0})}}function Rh(n,t,e,i,s={}){const r=s.size??18,a=r*1.9;Ct(n,Ln(0,t,1280,a),"#000",.92),Bt(n,0,t,1280,t,s.color??x.amber,1.4,{hot:!0}),Bt(n,0,t+a,1280,t+a,s.color??x.amber,1);const o=`${String(e).toUpperCase()}   ◆   `,l=he(n,o,{size:r,ls:.12}),c=(i*(s.speed??110)%l+l)%l;n.save(),n.beginPath(),n.rect(0,t,1280,a),n.clip();for(let h=-c;h<1280;h+=l)xt(n,o,h,t+a*.68,{size:r,color:x.white,ls:.12});if(n.restore(),s.tag){const h=he(n,s.tag.toUpperCase(),{size:r,weight:"m",ls:.2})+30;xe(n,0,t,h,a,{color:s.color??x.amber,width:1.4}),xt(n,s.tag.toUpperCase(),15,t+a*.68,{size:r,color:s.color??x.amber,weight:"m",ls:.2})}}function N_(n,t,e={}){const i=Pi(n),s=e.points??40,r=t.x+t.w/2,a=t.y+t.h/2,o=[i.range(0,on),i.range(0,on),i.range(0,on)],l=[];for(let h=0;h<s;h++){const u=h/s*on,f=1+.14*Math.sin(u*2+o[0])+.08*Math.sin(u*5+o[1])+.05*Math.sin(u*9+o[2])+i.range(-.03,.03);l.push([r+Math.cos(u)*(t.w/2)*.85*f,a+Math.sin(u)*(t.h/2)*.85*f])}const c=new Path2D;return l.forEach(([h,u],f)=>f?c.lineTo(h,u):c.moveTo(h,u)),c.closePath(),{path:c,pts:l}}function F_(n,t,e={}){it(n,t.path,e.color??x.sky,1.8,{alpha:e.alpha??1})}function O_(n,t,e={}){const i=e.kind??"cold",s=e.color??(i==="warm"?x.red:x.sky),r=ie(e.progress??1),a=[0];for(let h=1;h<t.length;h++)a.push(a[h-1]+Math.hypot(t[h][0]-t[h-1][0],t[h][1]-t[h-1][1]));const o=a[a.length-1]*r,l=new Path2D;l.moveTo(t[0][0],t[0][1]);for(let h=1;h<t.length&&a[h-1]<o;h++){const u=Math.min(1,(o-a[h-1])/(a[h]-a[h-1]||1));l.lineTo(t[h-1][0]+(t[h][0]-t[h-1][0])*u,t[h-1][1]+(t[h][1]-t[h-1][1])*u)}it(n,l,s,2.2,{hot:!0});const c=e.spacing??40;for(let h=c/2;h<o;h+=c){let u=1;for(;u<a.length-1&&a[u]<h;)u++;const f=(h-a[u-1])/(a[u]-a[u-1]||1),d=t[u-1][0]+(t[u][0]-t[u-1][0])*f,g=t[u-1][1]+(t[u][1]-t[u-1][1])*f,_=Math.atan2(t[u][1]-t[u-1][1],t[u][0]-t[u-1][0]);if(typeof i=="function")i(n,d,g,_);else{n.save(),n.translate(d,g),n.rotate(_);const p=new Path2D;i==="warm"?p.arc(0,0,8,Math.PI,0):(p.moveTo(-8,0),p.lineTo(0,-12),p.lineTo(8,0)),p.closePath(),it(n,p,s,1.8,{hot:!0}),n.restore()}}}function z_(n,t,e,i,s={}){const r=s.seed??3,a=new Path2D;for(let o=0;o<=48;o++){const l=o/48*on,c=1+.12*je(l*1.3+r,r);o?a.lineTo(t+Math.cos(l)*i*c,e+Math.sin(l)*i*c*.7):a.moveTo(t+i*c,e)}it(n,a,s.color??x.blueMid,1.1,{alpha:s.alpha??.7}),s.label&&xt(n,s.label,t+i*.7,e-i*.5,{size:12,color:s.color??x.blueMid})}function B_(n,t,e,i=20,s=0,r=x.gold){Ne(n,t,e,i,r,2,{hot:!0});for(let a=0;a<10;a++){const o=a/10*on+s*.4;Bt(n,t+Math.cos(o)*i*1.3,e+Math.sin(o)*i*1.3,t+Math.cos(o)*i*1.75,e+Math.sin(o)*i*1.75,r,1.6)}}function Nr(n,t,e,i=1,s=x.white){_n(n,t,e,i,()=>{const r=Kt(a=>{a.moveTo(-30,10),a.arc(-18,0,12,Math.PI*.6,Math.PI*1.5),a.arc(0,-8,16,Math.PI*1.1,Math.PI*1.9),a.arc(20,0,12,Math.PI*1.4,Math.PI*.4),a.closePath()});Ct(n,r),it(n,r,s,Pn(1.6,i))})}function k_(n,t,e,i=1,s=0,r=x.sky){Nr(n,t,e,i,x.white);for(let a=0;a<5;a++){const o=(s*1.8+a*.37)%1,l=(-16+a*8)*i,c=(16+o*26)*i;Bt(n,t+l,e+c,t+l-3*i,e+c+8*i,r,1.4,{alpha:1-o})}}function H_(n,t,e,i=1,s=0){Nr(n,t,e,i,x.blueMid);const r=Math.floor(s*3)%4===0;it(n,Kt(a=>{a.moveTo(t+2*i,e+12*i),a.lineTo(t-6*i,e+28*i),a.lineTo(t+2*i,e+28*i),a.lineTo(t-6*i,e+46*i)}),x.gold,2,{hot:r,alpha:r?1:.4})}function G_(n,t,e,i=1,s=0){Nr(n,t,e,i,x.white);for(let r=0;r<5;r++){const a=(s*.6+r*.29)%1,o=t+(-16+r*8+Math.sin(s*2+r)*3)*i,l=e+(16+a*30)*i;for(let c=0;c<3;c++){const h=c/3*Math.PI;Bt(n,o-Math.cos(h)*3*i,l-Math.sin(h)*3*i,o+Math.cos(h)*3*i,l+Math.sin(h)*3*i,x.white,1,{alpha:1-a})}}}function Ar(n,t,e,i,s,r={}){const a=r.color??x.blueMid;if(!r.noStand){const l=Kt(c=>{c.moveTo(t+i/2-14,e+s+10),c.lineTo(t+i/2-24,e+s+50),c.lineTo(t+i/2+24,e+s+50),c.lineTo(t+i/2+14,e+s+10)});Ct(n,l),it(n,l,a,1.4)}const o=Je(t-12,e-12,i+24,s+24,14);Ct(n,o),it(n,o,a,1.8),it(n,Je(t,e,i,s,6),a,1,{alpha:.7})}Ar.glass=function(n,t,e,i,s,r={}){const a=r.color??x.blueMid;n.save(),n.beginPath(),n.rect(t,e,i,s),n.clip(),n.globalAlpha=.18,n.fillStyle="#000";for(let o=e;o<e+s;o+=3)n.fillRect(t,o,i,1.2);if(n.restore(),Bt(n,t+14,e+10,t+i*.35,e+10,x.white,1,{alpha:.18}),r.label){const o=he(n,r.label.toUpperCase(),{size:14,ls:.2})+26;xe(n,t+10,e+s-34,o,26,{color:a,cut:5,width:1.2,fillAlpha:.85}),xt(n,r.label.toUpperCase(),t+23,e+s-16,{size:14,color:x.white,ls:.2})}if(r.live){const o=Math.floor((r.t??0)*1.6)%2===0;xe(n,t+i-82,e+12,70,26,{color:x.onair,cut:5,width:1.2,fillAlpha:.85}),_e(n,t+i-68,e+25,5,x.onair,o?1:.3),xt(n,"LIVE",t+i-56,e+32,{size:15,color:x.onair,weight:"m",ls:.2})}};function fa(n,t,e,i={}){const s=i.rect??{x:0,y:0,w:1280,h:720},r=i.speed??40,a=i.scale??1,o=i.lineHeight??34*a,l=s.x+s.w/2;let c=s.y+s.h-e*r;n.save(),n.beginPath(),n.rect(s.x,s.y,s.w,s.h),n.clip();for(const h of t){const u=ie(Math.min((c-s.y)/60,(s.y+s.h-c)/60));if(c>s.y-o&&c<s.y+s.h+o)if(typeof h=="string")xt(n,h.toUpperCase(),l,c,{size:18*a,align:"center",color:x.white,ls:.2,alpha:u});else if(Array.isArray(h)){const f=s.x+s.w*(i.split??.6);xt(n,String(h[0]).toUpperCase(),f-16*a,c,{size:13*a,align:"right",color:x.sky,ls:.16,alpha:u}),xt(n,String(h[1]),f+16*a,c,{size:18*a,align:"left",color:x.white,ls:.06,alpha:u})}else h!=null&&h.head&&xt(n,h.head.toUpperCase(),l,c,{size:22*a,align:"center",color:x.gold,ls:.35,weight:"m",alpha:u});c+=h!=null&&h.head?o*1.5:o}return n.restore(),c>s.y}function Zo(n,t,e,i={}){const s=i.w??120,r=i.h??170,a=i.color??x.violet,o=Kt(c=>{c.moveTo(t-s/2-10,e),c.lineTo(t+s/2+10,e),c.lineTo(t+s/2+4,e+16),c.lineTo(t-s/2-4,e+16),c.closePath()}),l=Kt(c=>{c.moveTo(t-s/2,e+16),c.lineTo(t+s/2,e+16),c.lineTo(t+s/2-14,e+r),c.lineTo(t-s/2+14,e+r),c.closePath()});if(Ct(n,l),it(n,l,a,1.6),Ct(n,o),it(n,o,a,1.6,{hot:!0}),i.label&&xt(n,i.label.toUpperCase(),t,e+16+r*.3,{size:Math.min(22,s/(i.label.length*.7)),align:"center",color:i.labelColor??a,weight:"m",ls:.12}),i.lights)for(let c=0;c<6;c++)_e(n,t-s/2+18+c*(s-36)/5,e+r-18,2.6,c%2?x.gold:a,.4+.6*(Math.floor((i.t??0)*4+c)%3===0?1:.3))}const x=Object.freeze({...ua,gold:"#ffc861",goldMid:"#d39a3c",goldDim:"#6e4f1c",bsky:"#3f8cff",sky:"#7cc4ff",cyan:"#58f0e8",violet:"#a98bff",magenta:"#ff5fd2",lime:"#b6ff5c",coral:"#ff7a5c",onair:"#ff3b30",dim:"#0d2234",black:"#000000"});function Ln(n,t,e,i,s=0){const r=new Path2D;if(s<=0)return r.rect(n,t,e,i),r;const a=Math.min(s,e/2,i/2);return r.moveTo(n+a,t),r.lineTo(n+e-a,t),r.lineTo(n+e,t+a),r.lineTo(n+e,t+i-a),r.lineTo(n+e-a,t+i),r.lineTo(n+a,t+i),r.lineTo(n,t+i-a),r.lineTo(n,t+a),r.closePath(),r}function Je(n,t,e,i,s=8){const r=new Path2D;return s=Math.min(s,e/2,i/2),r.moveTo(n+s,t),r.arcTo(n+e,t,n+e,t+i,s),r.arcTo(n+e,t+i,n,t+i,s),r.arcTo(n,t+i,n,t,s),r.arcTo(n,t,n+e,t,s),r.closePath(),r}function Ct(n,t,e="#000",i=1){n.save(),n.globalCompositeOperation="source-over",n.globalAlpha=i,n.fillStyle=e,n.fill(t),n.restore()}function xe(n,t,e,i,s,r={}){const a=r.color??x.blue,o=r.radius?Je(t,e,i,s,r.radius):Ln(t,e,i,s,r.cut??0);if(r.fill!==null&&Ct(n,o,r.fill??"#000",r.fillAlpha??1),r.corners){const l=r.corners,c=new Path2D;for(const[h,u,f,d]of[[t,e,1,1],[t+i,e,-1,1],[t,e+s,1,-1],[t+i,e+s,-1,-1]])c.moveTo(h+f*l,u),c.lineTo(h,u),c.lineTo(h,u+d*l);it(n,c,a,r.width??1.6,{alpha:r.alpha,hot:r.hot})}else it(n,o,a,r.width??1.4,{alpha:r.alpha,hot:r.hot});return o}function gr(n,t,e,i,s={}){const r=s.glow??.6;r>0&&(n.save(),n.filter=`blur(${((s.size??11)*.12).toFixed(1)}px)`,xt(n,t,e,i,{...s,alpha:(s.alpha??1)*r}),n.restore()),xt(n,t,e,i,s)}function Ph(n,t,e,i,s,r={}){const a=r.size??16,o=r.lineHeight??a*1.4,l=[];for(const c of String(t).split(`
`))l.push(...Li(n,c,s,r));return l.forEach((c,h)=>xt(n,c,e,i+h*o,r)),l.length*o}function V_(n,t,e,i,s,r={}){const a=Math.floor(ie(s)*t.length),o=t.slice(0,a),l=r.maxW??1/0,c=r.size??18;let h;if(l<1/0?h=Ph(n,o,e,i,l,r):(xt(n,o,e,i,r),h=c),(s<1||r.cursor)&&(r.t===void 0||Math.floor(r.t*2.5)%2===0)){const f=l<1/0?o.split(`
`).flatMap(m=>Li(n,m,l,r)):[o],d=f[f.length-1]??"",g=r.lineHeight??c*1.4,_=e+he(n,d,r)+c*.15,p=i+(f.length-1)*(l<1/0?g:0);Bt(n,_,p+c*.12,_+c*.55,p+c*.12,r.color??x.green,Math.max(1.5,c*.1))}return h}function W_(n,t,e=0){return(n*$e.outCubic(ie(t))).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e})}function da(n){return n>=1e6?(n/1e6).toFixed(n>=1e7?0:1).replace(/\.0$/,"")+"M":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1).replace(/\.0$/,"")+"K":String(Math.round(n))}function $_(n,t,e,i,s,r=x.white,a=2,o={}){const l=Math.atan2(s-e,i-t),c=o.head??10,h=new Path2D;h.moveTo(t,e),h.lineTo(i,s),h.moveTo(i-c*Math.cos(l-.45),s-c*Math.sin(l-.45)),h.lineTo(i,s),h.lineTo(i-c*Math.cos(l+.45),s-c*Math.sin(l+.45)),it(n,h,r,a,o)}function Lh(n,t,e={}){const{x:i,y:s,w:r}=t,a=$e.outCubic(ie(e.appear??1));if(a<=0)return;const o=t.h*a,l=e.color??x.sky;if(xe(n,i,s,r,o,{color:l,cut:10,width:1.6,alpha:.9}),it(n,Ln(i+6,s+6,r-12,o-12,6),l,.8,{alpha:.25}),e.title&&a>.6){const c=he(n,e.title.toUpperCase(),{size:15,ls:.2})+28;xe(n,i+18,s-13,c,26,{color:l,cut:6,width:1.4}),xt(n,e.title.toUpperCase(),i+32,s+6,{size:15,ls:.2,color:x.white,alpha:Hn(.6,1,a)})}e.sub&&a>.8&&xt(n,e.sub.toUpperCase(),i+r-18,s+o-16,{size:11,align:"right",color:l,alpha:.7,ls:.2})}function X_(n,t,e,i={}){const{x:s,y:r,w:a,h:o}=t,l=i.max??Math.max(1e-9,...e.map(p=>p.value)),c=i.progress??1,h=i.format??(p=>da(p)),u=i.labelSize??15,f=e.length;if(i.horizontal===!1){const p=a/f*.6;e.forEach((m,M)=>{const v=$e.outCubic(ie(c*f-M*.6)),E=s+a/f*(M+.2),R=(o-40)*(m.value/l)*v,S=m.color??i.color??x.sky;xe(n,E,r+o-24-R,p,R,{color:S,width:1.6,hot:!0});for(let w=6;w<R;w+=6)Bt(n,E+3,r+o-24-w,E+p-3,r+o-24-w,S,.8,{alpha:.25});xt(n,m.label.toUpperCase(),E+p/2,r+o-4,{size:u*.8,align:"center",color:x.white,alpha:.85}),v>.1&&xt(n,h(m.value*v),E+p/2,r+o-32-R,{size:u,align:"center",color:S})});return}const d=i.labelWidth??a*.3,g=o/f,_=Math.min(26,g*.56);e.forEach((p,m)=>{const M=$e.outCubic(ie(c*f-m*.6)),v=r+g*m+(g-_)/2,E=p.color??i.color??x.sky;xt(n,p.label.toUpperCase(),s+d-12,v+_*.72,{size:u,align:"right",color:x.white,alpha:.9});const S=(a-d-70)*(p.value/l)*M;if(S>1){xe(n,s+d,v,S,_,{color:E,width:1.6,hot:p.hot});for(let w=6;w<S-2;w+=7)Bt(n,s+d+w,v+3,s+d+w,v+_-3,E,.8,{alpha:.22})}M>.05&&p.value>0&&xt(n,h(p.value*M)+(p.note?" "+p.note:""),s+d+S+10,v+_*.72,{size:u,color:E})})}function q_(n,t,e,i={}){const{x:s,y:r,w:a,h:o}=t,l=e.flatMap(f=>f.values),c=i.min??Math.min(...l),h=i.max??Math.max(...l),u=ie(i.progress??1);if(i.grid!==!1)for(let f=0;f<=4;f++){const d=r+o-o*f/4;Bt(n,s,d,s+a,d,x.blueDim,.8,{alpha:f===0?.8:.35}),i.yFormat&&xt(n,i.yFormat(c+(h-c)*f/4),s-8,d+4,{size:11,align:"right",color:x.blueMid})}i.xLabels&&i.xLabels.forEach((f,d)=>xt(n,String(f).toUpperCase(),s+a*d/Math.max(1,i.xLabels.length-1),r+o+18,{size:11,align:"center",color:x.blueMid}));for(const f of e){const d=f.values.length,g=u*(d-1),_=[];for(let M=0;M<=Math.min(d-1,Math.floor(g));M++)_.push([s+a*M/(d-1),r+o-o*(f.values[M]-c)/(h-c||1)]);const p=Math.floor(g);if(p<d-1){const M=g-p,v=f.values[p],E=f.values[p+1];_.push([s+a*g/(d-1),r+o-o*(v+(E-v)*M-c)/(h-c||1)])}dh(n,_,f.color??x.amber,2.2,{hot:!0});const m=_[_.length-1];m&&(Ne(n,m[0],m[1],5,f.color??x.amber,1.6),f.label&&u>.95&&xt(n,f.label.toUpperCase(),m[0]+10,m[1]+4,{size:13,color:f.color??x.amber}))}}function Fr(n,t,e,i,s=x.bsky,r={}){const a=i/2,o=new Path2D;for(const l of[-1,1])o.moveTo(t,e-.05*a),o.bezierCurveTo(t+l*.25*a,e-.55*a,t+l*.95*a,e-1*a,t+l*.98*a,e-.62*a),o.bezierCurveTo(t+l*1.02*a,e-.2*a,t+l*.8*a,e+.05*a,t+l*.45*a,e+.12*a),o.bezierCurveTo(t+l*.85*a,e+.25*a,t+l*.75*a,e+.8*a,t+l*.35*a,e+.62*a),o.bezierCurveTo(t+l*.15*a,e+.5*a,t+l*.05*a,e+.25*a,t,e+.08*a);it(n,o,s,r.width??Math.max(1.2,i*.045),{hot:r.hot??!0,alpha:r.alpha})}function Y_(n,t,e){const i=new Path2D;return i.moveTo(n,t+e*.35),i.bezierCurveTo(n-e*.9,t-e*.2,n-e*.35,t-e*.75,n,t-e*.3),i.bezierCurveTo(n+e*.35,t-e*.75,n+e*.9,t-e*.2,n,t+e*.35),i}function j_(n,t,e){const i=new Path2D,s=e*.7,r=e*.32;return i.moveTo(n-s,t+r*.2),i.lineTo(n-s,t-r),i.lineTo(n+s*.7,t-r),i.moveTo(n+s*.45,t-r-e*.2),i.lineTo(n+s*.7,t-r),i.lineTo(n+s*.45,t-r+e*.2),i.moveTo(n+s,t-r*.2),i.lineTo(n+s,t+r),i.lineTo(n-s*.7,t+r),i.moveTo(n-s*.45,t+r-e*.2),i.lineTo(n-s*.7,t+r),i.lineTo(n-s*.45,t+r+e*.2),i}function Z_(n,t,e){const i=new Path2D;return i.moveTo(n-e*.55,t+e*.45),i.lineTo(n-e*.55,t-e*.4),i.lineTo(n+e*.6,t-e*.4),i.lineTo(n+e*.6,t+e*.25),i.lineTo(n-e*.2,t+e*.25),i.closePath(),i}function Dh(n,t,e,i,s={}){const r=s.color??x.bsky;Ct(n,(()=>{const a=new Path2D;return a.arc(t,e,i,0,Math.PI*2),a})()),Ne(n,t,e,i,r,Math.max(1.4,i*.09),{hot:!0}),Ne(n,t,e,i*.78,r,.9,{alpha:.4}),s.initials&&xt(n,s.initials.toUpperCase(),t,e+i*.32,{size:i*.85,align:"center",color:x.white,weight:"m",ls:.02})}function Uh(n,t,e,i,s){const r=n.__lcProtect;if(!r||!(i>0)||!(s>0))return;const a=n.getTransform(),o=[],l=[];for(const[u,f]of[[t,e],[t+i,e],[t,e+s],[t+i,e+s]])o.push(a.a*u+a.c*f+a.e),l.push(a.b*u+a.d*f+a.f);const c=Math.min(...o),h=Math.min(...l);r.rects.push({x:c/r.k,y:h/r.k,w:(Math.max(...o)-c)/r.k,h:(Math.max(...l)-h)/r.k})}function K_(n,t){const e=t.scale??1,i=(t.w??460)/e,s=ie(t.appear??1);if(s<=0)return 0;const r=$e.outBack(s);n.save(),n.translate(t.x,t.y+(1-r)*40),n.scale(e,e),n.globalAlpha=Math.min(1,s*2);const a=t.color??x.bsky,o=18,l=t.textSize??19,c=i-o*2-58,h=String(t.text??""),u=h.split(`
`).flatMap(E=>Li(n,E,c,{size:l,ls:.04})),f=l*1.38,d=o+26+u.length*f+52;xe(n,0,0,i,d,{color:a,radius:14,width:1.6,alpha:.95}),Dh(n,o+22,o+22,22,{color:t.avatarColor??a,initials:t.initials??(t.name??"?").slice(0,1)});const g=o+58;xt(n,t.name??"Someone",g,o+15,{size:17,color:x.white,weight:"m",ls:.04});const _=he(n,t.name??"Someone",{size:17,weight:"m",ls:.04});xt(n,`@${t.handle??"someone.example"}${t.time?" · "+t.time:""}`,g+_+10,o+15,{size:13,color:t.handleColor??x.blueMid,ls:.05}),Fr(n,i-o-10,o+10,22,a,{width:1.2,hot:!1,alpha:.7});const p=h.length;let m=Math.floor(ie(t.reveal??1)*p);u.forEach((E,R)=>{if(m<=0)return;const S=E.slice(0,m);m-=E.length+1,xt(n,S,g,o+26+(R+1)*f-f*.25,{size:l,color:t.textColor??x.white,ls:.04})}),Uh(n,0,0,i,d);const M=d-24;return[[Z_,t.replies,x.blueMid],[j_,t.reposts,t.reposted?x.green:x.blueMid],[Y_,t.likes,t.liked||(t.likePulse??0)>0?x.magenta:x.blueMid]].forEach(([E,R,S],w)=>{const k=g+w*((i-g-o)/3)+8,y=w===2?Math.sin(Math.PI*ie(t.likePulse??0)):0,T=14*(1+.6*y);it(n,E(k,M,T),S,1.4,{hot:y>.2}),R!=null&&xt(n,typeof R=="number"?da(R):String(R),k+16,M+5,{size:14,color:S})}),n.restore(),d*e}function J_(n,t,e={}){const i=Pi(n),s=e.clusters??6,r=e.perCluster??14,a=e.colors??[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold,x.lime],o=[],l=[],c=[];for(let h=0;h<s;h++)c.push({x:t.x+t.w*(.08+.84*((h+i.range(.2,.8))/s)),y:t.y+t.h*i.range(.25,.75),col:a[h%a.length]});c.forEach((h,u)=>{const f=o.length,d=t.w/s*.42;for(let g=0;g<r;g++){const _=i.range(0,Math.PI*2),p=Math.sqrt(i())*d;o.push({x:h.x+Math.cos(_)*p,y:h.y+Math.sin(_)*p*(t.h/t.w)*2.2,c:h.col,cl:u,r:i.range(1.2,3.2),phase:i.range(0,10)})}for(let g=0;g<r*1.6;g++)l.push([f+i.int(r),f+i.int(r)])});for(let h=0;h<s*3;h++)l.push([i.int(o.length),i.int(o.length)]);return{nodes:o,edges:l.filter(([h,u])=>h!==u),centres:c}}function Q_(n,t,e=0,i={}){const s=i.alpha??1,r=new Map;for(const[a,o]of t.edges){const l=t.nodes[a],c=t.nodes[o],h=l.cl===c.cl?l.c:x.blueDim;r.has(h)||r.set(h,new Path2D);const u=r.get(h);u.moveTo(l.x,l.y),u.lineTo(c.x,c.y)}for(const[a,o]of r)it(n,o,a,.8,{alpha:(i.edgeAlpha??.3)*s});for(const a of t.nodes){const o=.55+.45*Math.sin(e*(1.3+a.phase%1.7)+a.phase*7),l=i.highlight===a.cl?1.6:1;_e(n,a.x,a.y,a.r*l,a.c,s*o),a.r>2.6&&Ne(n,a.x,a.y,a.r*2.2,a.c,.8,{alpha:.35*s*o})}}const t1=Object.freeze(Object.defineProperty({__proto__:null,Glow:mh,HERSHEY:hh,P:x,arrow:$_,avatar:Dh,barChart:X_,beam:it,beamPts:dh,blobRegion:N_,book:R_,box:xe,butterfly:Fr,chaikin:$o,chicken:T_,cloud:Nr,compact:da,confetti:wh,core:ca,countUp:W_,creditsRoll:fa,crow:bs,crown:Ah,dot:_e,drawGraph:Q_,elephant:C_,front:O_,gator:A_,glowText:gr,hash01:dr,hfont:ha,isobar:z_,keycap:Ch,label:xt,labelBlock:ph,labelWidth:he,lectern:Zo,limboBar:U_,lineChart:q_,makeCluster:J_,mix:an,occlude:Ct,panel:Lh,paragraph:Ph,pathOf:fh,podium3:D_,protect:Uh,rain:k_,rectPath:Ln,region:F_,ring:Ne,roundPath:Je,seal:w_,seg:Bt,skeetCard:K_,snow:G_,speechBubble:L_,splitFlap:I_,stamp:P_,storm:H_,sun:B_,ticker:Rh,tvFrame:Ar,typewriter:V_,wrapLabel:Li},Symbol.toStringTag,{value:"Module"})),e1=Object.freeze({counterLabel:"COUNT",keyLabel:""}),pa={...e1},Qt={w:2e3,h:1125,floor:960},Ov=["truss","wall","window","curtain","bandstand","desk","chair","couch","onair","sign","floor","crow","eKey","dim"],Ue={x:1220,y:140,w:740,h:500},vs={x:760,y:110,w:420,h:850},ns={x:1600,top:728,w:360},Ao={x:ns.x+34,y:ns.top-30,scale:.8},ma={x:1475},Ih={x0:1150,x1:1400},n1={x0:40,x1:700,top:800};function i1(){const n=Pi("late-cluster-skyline"),t=s1(n,Ue),e=[];for(let i=0,s=-20;s<1300;i++){const r=n.range(54,74);e.push({x:s+r/2,w:r,h:n.range(46,62),ph:n.range(0,6),hair:n.int(4)}),s+=r*n.range(.82,1)}return{...t,aud:e}}function s1(n,t,e={}){const i=t,s=[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold],r=[];let a=i.x+14;for(;a<i.x+i.w-40;){const p=n.range(34,78),m=n.range(110,330)*(.7+.5*Math.sin((a-i.x)/i.w*Math.PI));r.push({x:a,w:p,h:Math.min(m,i.h-120),c:n.pick(s),spire:n()<.3}),a+=p+n.range(4,18)}const o=[],l=new Map,c=(p,m,M)=>{l.has(p)||l.set(p,new Path2D);const v=l.get(p);v.moveTo(m.x,m.y),v.lineTo(M.x,M.y)},h=i.y+i.h-6,u=new Path2D;for(const p of r){const m=Math.max(2,Math.round(p.w/20)),M=Math.max(3,Math.round(p.h/24)),v=[];for(let R=0;R<M;R++){const S=[];for(let w=0;w<m;w++){const k={x:p.x+(w+.5)*p.w/m+n.range(-2,2),y:h-12-R*(p.h-18)/(M-1)+n.range(-2,2),c:p.c,r:n.range(1.1,2.4),ph:n.range(0,20),on:n()<.82};S.push(k),o.push(k)}v.push(S)}for(let R=0;R<M;R++)for(let S=0;S<m;S++){const w=v[R][S];R+1<M&&c(p.c,w,v[R+1][S]),S+1<m&&n()<.5&&c(p.c,w,v[R][S+1]),R+1<M&&S+1<m&&n()<.3&&c(p.c,w,v[R+1][S+1])}const E=h-p.h-4;u.moveTo(p.x-3,h),u.lineTo(p.x-3,E),u.lineTo(p.x+p.w+3,E),u.lineTo(p.x+p.w+3,h),p.spire&&(u.moveTo(p.x+p.w/2,E),u.lineTo(p.x+p.w/2,E-30),p.beacon={x:p.x+p.w/2,y:E-30}),p.top={x:p.x+p.w/2,y:E}}const f=new Path2D;let d=i.x;for(f.moveTo(d,h);d<i.x+i.w;){const p=n.range(60,190),m=n.range(20,50);f.lineTo(d,h-p),f.lineTo(d+m,h-p),d+=m,f.lineTo(d,h-n.range(30,60))}f.lineTo(i.x+i.w,h);const g=[];for(let p=0;p<9;p++){const m=n.pick(r),M=n.pick(r);m!==M&&g.push({a:m.top,b:M.top,c:n.pick([x.bsky,x.sky,x.magenta]),ph:n.range(0,1),sp:n.range(.15,.35)})}const _=[];for(let p=0;p<(e.stars??70);p++)_.push({x:i.x+n.range(8,i.w-8),y:i.y+n.range(8,i.h*.45),r:n.range(.5,1.4),ph:n.range(0,9)});return{win:{...i},towers:r,nodes:o,edgesByColor:l,outline:u,far:f,links:g,stars:_}}function r1(n){const i=new Path2D;i.moveTo(0,34),i.lineTo(Qt.w,34),i.moveTo(0,64),i.lineTo(Qt.w,64);for(let s=0;s<Qt.w;s+=30)i.moveTo(s,34),i.lineTo(s+15,64),i.lineTo(s+30,34);it(n,i,x.blueDim,1,{alpha:.5});for(let s=120;s<Qt.w;s+=260){const r=new Path2D;r.moveTo(s-9,68),r.lineTo(s+9,68),r.lineTo(s+12,94),r.lineTo(s-12,94),r.closePath(),it(n,r,x.blueMid,1.1,{alpha:.7}),Bt(n,s,64,s,68,x.blueMid,1,{alpha:.7})}}function o1(n){const t=new Path2D;for(let e=40;e<Qt.w;e+=160)e>vs.x-10&&e<vs.x+vs.w+10||e>Ue.x-4&&e<Ue.x+Ue.w+4||(t.moveTo(e,90),t.lineTo(e,Qt.floor));it(n,t,x.blueDim,1,{alpha:.18}),Bt(n,0,690,vs.x,690,x.blueDim,1,{alpha:.2})}function a1(n){const t=Qt.floor;Bt(n,0,t,Qt.w,t,x.blueMid,1.4,{alpha:.8});const e=new Path2D,i=1e3,s=380;for(let r=-1600;r<=3600;r+=160){const o=i+(r-i)*((Qt.h+200-s)/(t-s))*1;e.moveTo(i+(r-i),t),e.lineTo(o,Qt.h+200)}for(const r of[990,1035,1100])e.moveTo(0,r),e.lineTo(Qt.w,r);it(n,e,x.blueDim,1,{alpha:.32})}function l1(n,t,e,i={}){var c,h;const{x:s,y:r,w:a,h:o}=t.win,l=i.weight??1;for(const u of t.stars)_e(n,u.x,u.y,u.r*l,x.white,.25+.35*(.5+.5*Math.sin(e*1.3+u.ph)));if(i.moon!==!1){const u=s+a*(((c=i.moon)==null?void 0:c.x)??.82),f=((h=i.moon)==null?void 0:h.y)===void 0?r+70:r+o*i.moon.y,d=new Path2D;d.arc(u,f,26,-Math.PI*.62,Math.PI*.62,!0),d.arc(u-13,f,22,Math.PI*.5,-Math.PI*.5,!1),it(n,d,x.gold,1.6*l,{hot:!0,alpha:.85})}it(n,t.far,x.blueDim,1*l,{alpha:.35}),it(n,t.outline,x.blueDim,1*l,{alpha:.45});for(const[u,f]of t.edgesByColor)it(n,f,u,.8*l,{alpha:.32});for(const u of t.nodes){if(!u.on)continue;const f=.45+.55*(.5+.5*Math.sin(e*(.7+u.ph%1.3)+u.ph));_e(n,u.x,u.y,u.r*l,u.c,f*.9)}for(const u of t.towers)u.beacon&&_e(n,u.beacon.x,u.beacon.y,2.6*l,x.red,.4+.6*(Math.sin(e*3+u.x)>.6?1:.2));for(const u of t.links){const f=(u.a.x+u.b.x)/2,d=Math.min(u.a.y,u.b.y)-40-Math.abs(u.a.x-u.b.x)*.18,g=new Path2D;g.moveTo(u.a.x,u.a.y),g.quadraticCurveTo(f,d,u.b.x,u.b.y),it(n,g,u.c,.9*l,{alpha:.28});const _=(e*u.sp+u.ph)%1,p=(1-_)*(1-_)*u.a.x+2*(1-_)*_*f+_*_*u.b.x,m=(1-_)*(1-_)*u.a.y+2*(1-_)*_*d+_*_*u.b.y;_e(n,p,m,2.4*l,u.c,.9)}}function c1(n,t,e){const{x:i,y:s,w:r,h:a}=Ue;l1(n,t,e.wall);const o=new Path2D;o.rect(i,s,r,a);for(let l=1;l<4;l++)o.moveTo(i+r*l/4,s),o.lineTo(i+r*l/4,s+a);o.moveTo(i,s+a*.3),o.lineTo(i+r,s+a*.3),it(n,o,x.blueMid,1.6,{alpha:.9}),it(n,Ln(i-10,s-10,r+20,a+20),x.blueDim,1.2,{alpha:.7}),Bt(n,i-22,s+a+12,i+r+22,s+a+12,x.blueMid,1.4)}function h1(n,t,e){const i=e.wall,{x:s,y:r,w:a,h:o}=vs,l="#ff3d6e",c=16,h=new Path2D;for(let m=0;m<=c;m++){const M=s+a*m/c,v=3*je(i*.3+m*.7,3);h.moveTo(M,r+40);for(let E=r+40;E<=r+o;E+=20){const R=Math.sin(E*.012+m*1.7)*4*(E-r)/o;h.lineTo(M+R+v*((E-r)/o),E)}}it(n,h,l,1.2,{alpha:.55});const u=new Path2D;for(let m=0;m<c;m++){const M=s+a*(m+.5)/c;u.moveTo(M,r+60),u.lineTo(M+Math.sin(m)*3,r+o-10)}it(n,u,l,.8,{alpha:.22});const f=new Path2D;f.moveTo(s-20,r),f.lineTo(s+a+20,r);const d=7;for(let m=0;m<d;m++){const M=s-20+(a+40)*m/d,v=s-20+(a+40)*(m+1)/d;f.moveTo(M,r),f.quadraticCurveTo((M+v)/2,r+70,v,r)}Ct(n,f),it(n,f,l,1.6,{hot:!0});const g=new Path2D;for(let m=0;m<d;m++){const M=s-20+(a+40)*m/d,v=s-20+(a+40)*(m+1)/d;for(let E=1;E<12;E++){const R=E/12,S=M+(v-M)*R,w=r+4*70*R*(1-R)*.5*2;g.moveTo(S,w),g.lineTo(S,w+8)}}it(n,g,x.gold,1,{alpha:.8});const _=new Path2D;_.ellipse(970,Qt.floor+6,120,16,0,0,Math.PI*2),it(n,_,x.gold,1.4,{alpha:.6});const p=new Path2D;p.ellipse(970,Qt.floor+6,80,10,0,0,Math.PI*2),it(n,p,x.gold,1,{alpha:.35})}function u1(n,t,e){const o=e.onAir?1:.18;xe(n,1250,82,120,38,{color:x.onair,radius:6,width:1.6,alpha:.4+.6*o,hot:o>.5}),xt(n,"ON AIR",1250+120/2,108,{size:19,align:"center",color:x.onair,alpha:o,weight:"m",ls:.25}),Bt(n,1250+120/2,64,1250+120/2,82,x.blueDim,1)}function f1(n,t,e){const o=e.laughing,l=e.signText,c=o>0?.55+.45*(Math.sin(e.wall*9)>-.2?1:0):0,h=ie(o*c);xe(n,970-250/2,64,250,46,{color:x.amber,cut:8,width:1.6,alpha:.35+.65*h,hot:h>.5}),xt(n,l,970,96,{size:24,align:"center",color:x.amber,alpha:.15+.85*h,weight:"m",ls:.3}),Bt(n,970-250/2+20,64,970-250/2+20,64,x.blueDim,1),Bt(n,970+250/2-20,64,970+250/2-20,64,x.blueDim,1)}function d1(n,t,e){const{x0:i,x1:s,top:r}=n1,a=new Path2D;a.rect(i,r,s-i,Qt.floor-r),a.moveTo(i+220,r-60),a.lineTo(s-220,r-60),a.lineTo(s-220,r),a.moveTo(i+220,r-60),a.lineTo(i+220,r),Ct(n,a),it(n,a,x.magenta,1.4,{alpha:.75});const o=e.music?e.music.beat:-1;for(let c=0;c<14;c++){const h=i+24+(s-i-48)*c/13,u=o>=0?(Math.floor(o)+c)%4===0?1:.25:.3+.2*Math.sin(e.wall*1.5+c);_e(n,h,r+22,3,c%2?x.gold:x.magenta,u)}const l=new Path2D;for(let c=r+50;c<Qt.floor;c+=26)l.moveTo(i,c),l.lineTo(s,c);it(n,l,x.magenta,.8,{alpha:.25})}function p1(n){const t=ma.x,e=Je(t-80,560,160,230,40);Ct(n,e),it(n,e,x.violet,1.6,{alpha:.9});const i=new Path2D;for(const[s,r]of[[-40,620],[0,610],[40,620],[-40,680],[0,670],[40,680]])i.moveTo(t+s-3,r),i.lineTo(t+s+3,r);it(n,i,x.violet,1.2,{alpha:.5})}function m1(n){const{x0:t,x1:e}=Ih,i=Je(t,610,e-t,180,30);Ct(n,i),it(n,i,x.cyan,1.5,{alpha:.75});const s=new Path2D;s.moveTo((t+e)/2,625),s.lineTo((t+e)/2,780),it(n,s,x.cyan,1,{alpha:.35})}function g1(n,t,e){const{x:i,top:s,w:r}=ns,a=Qt.floor,o=new Path2D;o.moveTo(i+20,s-22),o.lineTo(i+r-10,s-22),o.lineTo(i+r,s),o.lineTo(i,s),o.closePath(),Ct(n,o),it(n,o,x.gold,1.6,{hot:!0});const l=new Path2D;l.moveTo(i,s),l.lineTo(i+r,s),l.lineTo(i+r-14,a),l.lineTo(i+14,a),l.closePath(),Ct(n,l),it(n,l,x.gold,1.6);const c=new Path2D;c.moveTo(i+30,s+22),c.lineTo(i+r-30,s+22),c.lineTo(i+r-40,a-22),c.lineTo(i+40,a-22),c.closePath(),it(n,c,x.goldMid,1,{alpha:.55});const h=i+r/2,u=s+120;Ne(n,h,u,46,x.gold,1.4,{alpha:.7}),Ne(n,h,u,40,x.gold,.9,{alpha:.35});const f=[[0,-18],[16,-6],[10,14],[-12,12],[-18,-8],[0,0]],d=new Path2D;for(const[tt,L]of[[0,1],[1,2],[2,3],[3,4],[4,0],[5,0],[5,2],[5,3],[5,1]])d.moveTo(h+f[tt][0],u+f[tt][1]),d.lineTo(h+f[L][0],u+f[L][1]);it(n,d,x.gold,1,{alpha:.6});for(const[tt,L]of f)_e(n,h+tt,u+L,2.6,x.gold,.9);xt(n,"LC",h,u+74,{size:16,align:"center",color:x.gold,alpha:.6,ls:.4});const g=i+96,_=s-14,p=new Path2D;p.moveTo(g-15,_-40),p.lineTo(g-13,_),p.lineTo(g+13,_),p.lineTo(g+15,_-40),p.closePath(),Ct(n,p),it(n,p,x.sky,1.5);const m=new Path2D;m.ellipse(g,_-40,15,4,0,0,Math.PI*2),it(n,m,x.sky,1.2);const M=new Path2D;M.moveTo(g+14,_-32),M.bezierCurveTo(g+30,_-32,g+30,_-10,g+13,_-10),it(n,M,x.sky,1.4),Fr(n,g,_-20,14,x.bsky,{width:1,hot:!1});const v=e.wall;for(let tt=0;tt<2;tt++){const L=new Path2D,N=v*.8+tt*1.7;for(let I=0;I<=12;I++){const W=I/12,q=g-4+tt*8+Math.sin(N*2+W*6)*4*W,Y=_-46-W*44;I?L.lineTo(q,Y):L.moveTo(q,Y)}it(n,L,x.white,1,{alpha:.3*(.6+.4*Math.sin(N))})}const E=i+r-34,R=s-14,S=new Path2D;S.ellipse(E,R,22,6,0,0,Math.PI*2),Ct(n,S),it(n,S,x.white,1.3,{alpha:.85});const w=new Path2D;w.moveTo(E,R-4),w.bezierCurveTo(E+2,R-34,E-10,R-52,E-30,R-58),it(n,w,x.white,1.4,{alpha:.8});const k=new Path2D;k.ellipse(E-40,R-61,13,7.5,-.35,0,Math.PI*2),Ct(n,k),it(n,k,x.white,1.5,{hot:!0});for(let tt=-2;tt<=2;tt++)Bt(n,E-40+tt*4-2,R-67+tt*1.3,E-40+tt*4+2,R-55+tt*1.3,x.white,.8,{alpha:.5});const y=i+r/2+10,T=s-4,O=new Path2D;if(O.moveTo(y-70,T),O.lineTo(y+70,T),O.lineTo(y+62,T-30),O.lineTo(y-62,T-30),O.closePath(),Ct(n,O),it(n,O,x.gold,1.4,{hot:!0}),xt(n,e.nameplate??"LARRY NX",y,T-9,{size:15,align:"center",color:x.gold,weight:"m",ls:.22}),(e.setNow??e.set).eKey)return;const J=new Path2D;J.moveTo(i+22,s-6),J.lineTo(i+72,s-6),J.lineTo(i+68,s-14),J.lineTo(i+26,s-14),J.closePath(),it(n,J,x.bsky,1.1,{alpha:.8})}function _1(n){const t=ma.x,e=new Path2D;for(const s of[-1,1]){const r=Je(t+s*90-22,720,44,120,16);Ct(n,r),it(n,r,x.violet,1.5)}e.moveTo(t-70,790),e.lineTo(t+70,790),e.lineTo(t+76,860),e.lineTo(t-76,860),e.closePath(),Ct(n,e),it(n,e,x.violet,1.5);const i=new Path2D;for(const s of[-1,1])i.moveTo(t+s*96,840),i.lineTo(t+s*104,Qt.floor);it(n,i,x.violet,1.4,{alpha:.8})}function v1(n){const{x0:t,x1:e}=Ih,i=new Path2D;i.moveTo(t-10,780),i.lineTo(e+10,780),i.lineTo(e+16,870),i.lineTo(t-16,870),i.closePath(),Ct(n,i),it(n,i,x.cyan,1.5,{alpha:.85});for(const r of[t-20,e-16]){const a=Je(r,700,36,150,14);Ct(n,a),it(n,a,x.cyan,1.4,{alpha:.85})}Bt(n,(t+e)/2,790,(t+e)/2,865,x.cyan,1,{alpha:.4});const s=new Path2D;for(const r of[t,e])s.moveTo(r,870),s.lineTo(r,Qt.floor);it(n,s,x.cyan,1.3,{alpha:.7})}function M1(n,t,e,i,s,r){var l;const a=s.wall,o=s.music?s.music.pulse:0;if(t==="lectern"){const c=i+150;Zo(n,e,c,{w:130,h:Qt.floor-c,color:x.violet,label:s.lecternLabel??"THE LATE CLUSTER",labelColor:x.gold}),Bt(n,e-20,c-2,e-34,c-40,x.white,1.3,{alpha:.8}),Ne(n,e-36,c-44,5,x.white,1.3,{hot:!0});return}if(t==="stand"){const c=i+160,h=r?((l=s.puppets.get(r))==null?void 0:l.name)??r:"";Zo(n,e,c,{w:150,h:Qt.floor-c,color:x.cyan,label:h,labelColor:x.white,lights:!0,t:a});return}if(t==="sportsdesk"){const c=i+128,h=460,u=new Path2D;u.moveTo(e-h/2,c),u.lineTo(e+h/2,c),u.lineTo(e+h/2-20,Qt.floor),u.lineTo(e-h/2+20,Qt.floor),u.closePath(),Ct(n,u),it(n,u,x.coral,1.8,{hot:!0}),Bt(n,e-h/2+10,c+30,e+h/2-10,c+30,x.coral,1,{alpha:.6}),xt(n,"SPORTS",e,c+78,{size:40,align:"center",color:x.coral,weight:"m",ls:.3}),xt(n,"THE LATE CLUSTER",e,c+106,{size:14,align:"center",color:x.gold,ls:.4});for(let f=0;f<9;f++)_e(n,e-180+f*45,c+16,3,f%2?x.gold:x.coral,.4+.6*(Math.floor(a*3+f)%3===0?1:.3));return}if(t==="keys"){const c=i+128,h=new Path2D;h.moveTo(e-78,c),h.lineTo(e+78,c),h.lineTo(e+84,c+20),h.lineTo(e-84,c+20),h.closePath(),Ct(n,h),it(n,h,x.magenta,1.5);const u=new Path2D;for(let d=-10;d<=10;d++)u.moveTo(e+d*7.4,c+6),u.lineTo(e+d*7.8,c+19);it(n,u,x.white,.8,{alpha:.55});for(let d=0;d<4;d++)_e(n,e-66+d*9,c+3,1.4,[x.green,x.amber,x.red,x.cyan][d],.5+.5*o);const f=new Path2D;f.moveTo(e-50,c+20),f.lineTo(e+44,Qt.floor-160),f.moveTo(e+50,c+20),f.lineTo(e-44,Qt.floor-160),it(n,f,x.magenta,1.2,{alpha:.8})}else if(t==="bass"){const c=e-14,h=i+150,u=new Path2D;u.moveTo(c-30,h-4),u.bezierCurveTo(c-36,h-30,c-10,h-34,c+2,h-22),u.bezierCurveTo(c+10,h-40,c+30,h-36,c+22,h-18),u.bezierCurveTo(c+40,h-2,c+34,h+30,c+4,h+32),u.bezierCurveTo(c-26,h+34,c-40,h+18,c-30,h-4),u.closePath(),Ct(n,u),it(n,u,x.cyan,1.6,{hot:!0});const f=new Path2D,d=-.72,g=128,_=Math.cos(d),p=Math.sin(d),m=c+8,M=h-12;f.moveTo(m-p*4,M+_*4),f.lineTo(m+_*g-p*4,M+p*g+_*4),f.lineTo(m+_*(g+22)-p*6,M+p*(g+22)+_*6),f.lineTo(m+_*(g+22)+p*6,M+p*(g+22)-_*6),f.lineTo(m+_*g+p*4,M+p*g-_*4),f.lineTo(m+p*4,M-_*4),Ct(n,f),it(n,f,x.cyan,1.3);for(let v=-1.5;v<=1.5;v++)Bt(n,c-14-p*v*2,h+14+_*v*2,m+_*g-p*v*2,M+p*g+_*v*2,x.white,.6,{alpha:.35+.45*o});Bt(n,c-6,h+4,c+10,h-10,x.white,1.6,{alpha:.6})}else if(t==="mic"){const c=e-52,h=i+34,u=new Path2D;u.moveTo(c-20,Qt.floor-160),u.lineTo(c-20,h+50),u.lineTo(c-2,h+6),it(n,u,x.white,1.4,{alpha:.8});const f=new Path2D;f.ellipse(c,h,8,5.5,-1.1,0,Math.PI*2),Ct(n,f),it(n,f,x.white,1.4,{hot:!0})}else if(t==="drums"){const h=e,u=Qt.floor-160-92+4,f=o;for(const _ of[-1,1]){const p=new Path2D;p.ellipse(e+_*70,u-92-10,30,12,0,0,Math.PI*2),p.moveTo(e+_*70-30,u-92-10),p.lineTo(e+_*70-30,u-92+16),p.moveTo(e+_*70+30,u-92-10),p.lineTo(e+_*70+30,u-92+16),Ct(n,p),it(n,p,x.gold,1.3);const m=new Path2D;m.ellipse(e+_*140,u-92-70+(_>0?f*3:0),40,6,_*.12,0,Math.PI*2),m.moveTo(e+_*140,u-92-64),m.lineTo(e+_*150,Qt.floor-160),it(n,m,x.gold,1.2,{alpha:.8+.2*f,hot:f>.5})}const d=new Path2D;d.arc(h,u,92,0,Math.PI*2),Ct(n,d),it(n,d,x.magenta,2,{hot:!0}),Ne(n,h,u,82,x.gold,1.2,{alpha:.7+.3*f}),xt(n,"HY OID",h,u-8,{size:30,align:"center",color:x.gold,weight:"m",ls:.12}),xt(n,"& THE FORMANTS",h,u+22,{size:14,align:"center",color:x.magenta,weight:"m",ls:.12});const g=new Path2D;for(let _=0;_<=40;_++){const p=_/40,m=u+48-14*(Math.exp(-(((p-.25)/.07)**2))+.7*Math.exp(-(((p-.6)/.09)**2))+.4*Math.exp(-(((p-.85)/.05)**2)))*(.8+.4*f);_?g.lineTo(h-54+p*108,m):g.moveTo(h-54,m)}it(n,g,x.cyan,1.2)}}function y1(n,t,e,i,s,r={}){if(t!=="contraption")return;const a=s.wall,o=e,l=Qt.floor,c=$e.inOutCubic(ie(r.unveil??0)),h=ie(r.run??c);if(c>.02){const u=new Path2D;u.rect(o-70,l-120,140,120),Ct(n,u),it(n,u,x.lime,1.6);for(const[_,p,m,M]of[[o-32,l-70,26,1],[o+18,l-52,18,-1]]){Ne(n,_,p,m,x.gold,1.4);const v=a*2*h*M;for(let E=0;E<8;E++){const R=v+E/8*Math.PI*2;Bt(n,_+Math.cos(R)*m,p+Math.sin(R)*m,_+Math.cos(R)*(m+6),p+Math.sin(R)*(m+6),x.gold,1.4)}}const f=new Path2D;f.moveTo(o+30,l-120),f.lineTo(o+60,l-190),f.lineTo(o+0,l-190),f.closePath(),it(n,f,x.cyan,1.4);const d=new Path2D;d.moveTo(o-60,l-120),d.bezierCurveTo(o-90,l-170,o-30,l-200,o-20,l-150),it(n,d,x.magenta,1.6),Bt(n,o-50,l-120,o-50,l-210,x.white,1.2),Ne(n,o-50,l-218,8,x.amber,1.6,{hot:h>.5&&Math.floor(a*4)%2===0});for(let _=0;_<4;_++)_e(n,o+40,l-100+_*14,3,[x.green,x.amber,x.red,x.cyan][_],h>0?.4+.6*(Math.floor(a*5+_)%4===0?1:.3):.25);const g=a*3*h;Bt(n,o+70,l-60,o+70+Math.cos(g)*22,l-60+Math.sin(g)*22,x.white,1.6)}if(c<.98){const u=c*260,f=c*c*220,d=new Path2D;d.moveTo(o-82+f,l-u),d.bezierCurveTo(o-90+f,l-120-u,o-60+f,l-235-u*1.1,o-10+f,l-230-u),d.bezierCurveTo(o+40+f,l-226-u,o+80+f,l-160-u,o+84+f,l-u);for(let _=4;_>=0;_--)d.lineTo(o-82+_*41+f+(_%2?6:-4)*(1+c*4),l-u-(_%2?10:0)*(1+c*3));d.closePath(),c<.05&&Ct(n,d),it(n,d,x.white,1.6,{alpha:1-c});const g=new Path2D;for(const _ of[-40,0,40])g.moveTo(o+_+f*.9,l-200-u),g.quadraticCurveTo(o+_*1.3+f,l-100-u,o+_*1.4+f,l-u-6);it(n,g,x.white,.9,{alpha:.4*(1-c)}),c<.05&&xt(n,"?",o,l-110,{size:40,align:"center",color:x.white,alpha:.5})}}function Nh(n,t,e){const i=e.wall;if(t==="circling"){const s=i*.45,r=e.cam??{x:1e3,y:560,zoom:1};if(r.zoom>2.2)return;const a=Math.max(Ue.x,r.x-640/r.zoom),o=Math.min(Ue.x+Ue.w,r.x+640/r.zoom),l=r.y-360/r.zoom,c=o>a?(a+o)/2:Ue.x+Ue.w*.55,h=o>a?Math.max(60,(o-a)*.42):230,u=Math.min(Ue.y+Ue.h-110,Math.max(Ue.y+150,l+(r.zoom<1.3?72:140)/r.zoom)),f=Math.min(70,34/Math.max(.5,r.zoom)*1.6),d=c+Math.cos(s)*h,g=u+Math.sin(s)*f;bs(n,d,g,{scale:.7,flap:i*2.2%1,facing:-Math.sin(s)>=0?1:-1})}else if(t==="perched-desk")bs(n,ns.x+ns.w-92,ns.top-33,{scale:.75,perched:!0,facing:-1});else{const s=Math.max(0,Math.sin(i*1.3))>.97?6:0;bs(n,Ue.x+120,Ue.y+Ue.h+12-22-s,{scale:.85,perched:!0,facing:1})}}function x1(n,t,e){const i=e.setNow??e.set;i.wall!==!1&&o1(n),i.truss!==!1&&r1(n),i.floor!==!1&&a1(n),i.window!==!1&&c1(n,t,e),i.curtain!==!1&&h1(n,t,e),i.onair!==!1&&u1(n,t,e),i.sign!==!1&&f1(n,t,e),i.bandstand!==!1&&d1(n,t,e),i.couch!==!1&&m1(n),i.chair!==!1&&p1(n),i.crow&&i.crow!=="perched-desk"&&Nh(n,i.crow,e)}function S1(n,t,e){const i=e.setNow??e.set;i.couch!==!1&&v1(n),i.chair!==!1&&_1(n),i.desk!==!1&&g1(n,t,e),i.desk!==!1&&i.eKey&&Ch(n,Ao.x,Ao.y,{label:e.keyLabel??pa.keyLabel,scale:Ao.scale,glow:.4+.3*Math.sin(e.wall*3),pressed:typeof i.eKey=="number"?i.eKey:0}),i.crow==="perched-desk"&&Nh(n,i.crow,e)}function b1(n,t,e,i=1){if(i<=0)return;const s=e.laughing,r=e.wall,a=724,o=new Path2D;for(const l of t.aud){const c=s*(5+4*Math.sin(r*11+l.ph))+1.2*Math.sin(r*.8+l.ph),h=l.x,u=a-l.h+6-c,f=l.w*.26;o.moveTo(h-l.w*.5,a+10),o.bezierCurveTo(h-l.w*.5,u+f*2.2,h-l.w*.3,u+f*1.6,h-f*.7,u+f*1.4),o.arc(h,u,f,Math.PI*.72,Math.PI*.28,!1),o.bezierCurveTo(h+l.w*.3,u+f*1.6,h+l.w*.5,u+f*2.2,h+l.w*.5,a+10)}Ct(n,o,"#000",i),it(n,o,x.blueMid,1.1,{alpha:.6*i})}function E1(n,t){const e=t.laughing;if(e<=.02)return;const i=Math.sin(t.wall*9)>-.2?1:.55,s=190,r=640-s/2,a=18;xe(n,r,a,s,36,{color:x.amber,cut:6,width:1.5,alpha:e*i,hot:!0}),xt(n,t.signText,640,a+26,{size:19,align:"center",color:x.amber,alpha:e*i,weight:"m",ls:.3})}const cr=new Map;function ga(n){let t=cr.get(n);return t||(t=new Path2D(n),cr.size>4e3&&cr.clear(),cr.set(n,t)),t}const P=n=>(Math.round(n*10)/10).toString();function wt(n,t,e,i,s=1.5,r={}){it(n,typeof e=="string"?ga(e):e,i,.85*s/t.u,{...r,alpha:(r.alpha??1)*.92})}let Ko=!1;function T1(n,t,e="#000",i=1){Ko||Ct(n,typeof t=="string"?ga(t):t,e,i)}function Ht(n,t,e,i,s=1.5,r={}){T1(n,e,r.fill??"#000"),wt(n,t,e,i,s,r)}function ke(n,t,e){return`M${P(n+e)} ${P(t)} A${P(e)} ${P(e)} 0 1 0 ${P(n-e)} ${P(t)} A${P(e)} ${P(e)} 0 1 0 ${P(n+e)} ${P(t)}`}function w1(n,t){n.save(),n.translate(t.x+Math.sin(t.sway)*2.5*t.u,t.y),n.rotate(t.sway*.3);const e=1-.18*Math.abs(t.turn);n.scale(t.u*e,t.u*(1+.006*t.breathe))}function un(n,t,e,i=6){const s=i+2.5,r=(a,o)=>`${P(a)} ${P(o)}`;return[`M${r(-t,-1)}`,`C${r(-t-3.5,.6)} ${r(-n+6,s-4.2)} ${r(-n+1.5,s-1.2)}`,`C${r(-n-1.6,s+.2)} ${r(-n-2.6,s+4)} ${r(-n-2.5,s+9)}`,e>40?`C${r(-n-2.5,24)} ${r(-n-.5,30)} ${r(-n-.6,36)} L${r(-n-1.4,e)} L${r(n+1.4,e)} L${r(n+.6,36)} C${r(n+.5,30)} ${r(n+2.5,24)} ${r(n+2.5,s+9)}`:`L${r(-n-2,e)} L${r(n+2,e)} L${r(n+2.5,s+9)}`,`C${r(n+2.6,s+4)} ${r(n+1.6,s+.2)} ${r(n-1.5,s-1.2)}`,`C${r(n-6,s-4.2)} ${r(t+3.5,.6)} ${r(t,-1)} Z`].join(" ")}function bn(n,t,e=6){return`M${P(-n+3.5)} ${P(e+3)} C${P(-n+2.6)} ${P(e+14)} ${P(-n+3)} ${P(t-10)} ${P(-n+3.8)} ${P(t)} M${P(n-3.5)} ${P(e+3)} C${P(n-2.6)} ${P(e+14)} ${P(n-3)} ${P(t-10)} ${P(n-3.8)} ${P(t)}`}function fn(n,t,e,i,s){if(t.floor==null||t.floor<=e+4)return;const r=t.floor,a=`M-15 ${P(e)} L-12.5 ${P(r-3)} L-2.5 ${P(r-3)} L-1 ${P(e+9)} L1 ${P(e+9)} L2.5 ${P(r-3)} L12.5 ${P(r-3)} L15 ${P(e)} Z`;Ht(n,t,a,i,1.4,{alpha:.85}),s&&wt(n,t,`M-13.9 ${P(e+2)} L-12 ${P(r-4)} M13.9 ${P(e+2)} L12 ${P(r-4)}`,s,1,{alpha:.6});const o=l=>`M${P(l*2)} ${P(r-3)} L${P(l*13.5)} ${P(r-3)} C${P(l*16)} ${P(r-2.5)} ${P(l*17)} ${P(r)} ${P(l*15)} ${P(r)} L${P(l*2)} ${P(r)} Z`;for(const l of[-1,1])Ht(n,t,o(l),x.white,1.3,{alpha:.75})}const Sn=(n,t=46)=>n.floor!=null?Math.min(n.bottom,t):n.bottom,vi=(n,t,e=6)=>`M${P(-e)} -1.5 L${P(n)} ${P(t)} L${P(e)} -1.5 Z`;function uc(n,t,e,i,s){const r=`M${P(e)} ${P(i)} L${P(e-4.6)} ${P(i-2.2)} L${P(e-4.3)} ${P(i+2.4)} Z M${P(e)} ${P(i)} L${P(e+4.6)} ${P(i-2.2)} L${P(e+4.3)} ${P(i+2.4)} Z`;Ht(n,t,r,s,1.5,{hot:!0}),Ht(n,t,`M${P(e-.9)} ${P(i-1.2)} L${P(e+.9)} ${P(i-1.2)} L${P(e+.9)} ${P(i+1.2)} L${P(e-.9)} ${P(i+1.2)} Z`,s,1.2,{hot:!0})}function hr(n,t,e,i){const s=`M-5.4 -2 L${P(e-2.2)} 3 L-6.6 2.6 Z M5.4 -2 L${P(e+2.2)} 3 L6.6 2.6 Z`;Ht(n,t,s,i,1.3)}function Zi(n,t,e,i,s,r,a){const o=l=>{let c;s==="peak"?c=`M${P(l*6.2)} -1.5 L${P(e)} ${P(i)} L${P(l*11.8)} 15 L${P(l*15.6)} 8.2 L${P(l*10.6)} 10.4 L${P(l*8.4)} 4.5 Z`:s==="notch"?c=`M${P(l*6.2)} -1.5 L${P(e)} ${P(i)} L${P(l*11.6)} 14.5 L${P(l*13.2)} 8.6 L${P(l*10.4)} 9.6 L${P(l*9.6)} 7.4 L${P(l*8.2)} 2.5 Z`:c=`M${P(l*6.2)} -1.5 C${P(l*12)} 3 ${P(l*12.5)} ${P(i*.55)} ${P(e)} ${P(i)} C${P(e+l*2)} ${P(i*.6)} ${P(l*7.5)} 6 ${P(l*6.2)} -1.5 Z`,Ht(n,t,c,r,1.5),a&&wt(n,t,s==="shawl"?`M${P(l*8.5)} 2 C${P(l*10.5)} 6 ${P(l*9)} ${P(i*.6)} ${P(e+l*1.5)} ${P(i-2)}`:`M${P(l*8)} 3 L${P(e+l*1.6)} ${P(i-3)}`,a,.9,{alpha:.5})};o(-1),o(1)}function A1(n,t,e,i,s,r){wt(n,t,`M${P(e-4)} ${P(i)} L${P(e+4)} ${P(i-.4)}`,r,1.3),Ht(n,t,`M${P(e-3.2)} ${P(i-.2)} L${P(e-2)} ${P(i-3.2)} L${P(e-.6)} ${P(i-1)} L${P(e+.8)} ${P(i-3.8)} L${P(e+2.2)} ${P(i-1.2)} L${P(e+3.2)} ${P(i-2.9)} L${P(e+3.4)} ${P(i-.4)} Z`,s,1.2,{hot:!0})}const Cr={tux:{back(n,t,e){const i=Sn(t);fn(n,t,i-2,e.color,e.color),Ht(n,t,un(18,6.2,i),e.color,1.8,{hot:!1}),wt(n,t,bn(18,i),e.color,1,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,vi(i,s+2,6.4),e.shirt??x.white,1.2,{alpha:.8}),wt(n,t,`M${P(i-2.2)} 6 L${P(i-1.3)} ${P(s-3)} M${P(i+2.2)} 6 L${P(i+1.3)} ${P(s-3)}`,e.shirt??x.white,.8,{alpha:.35}),Zi(n,t,i,s+2,"peak",e.color,e.facing??an(e.color,"#ffffff",.4)),hr(n,t,i*.4,e.shirt??x.white),uc(n,t,i*.4,2.6,e.tie??x.amber);for(const r of[9,15.5,22]){const a=i*(.4+.6*r/s);Ct(n,ga(ke(a,r,.75))),wt(n,t,ke(a,r,.7),e.tie??x.amber,1.1,{hot:!0})}wt(n,t,ke(i,s+4.5,.9),e.color,1.2),A1(n,t,12.5+i*.5,17,e.square??x.pink,e.color)}},band:{back(n,t,e){const i=Sn(t);fn(n,t,i-2,an(e.color,"#000",.4)),Ht(n,t,un(17.5,6,i),e.color,1.7),wt(n,t,bn(17.5,i),e.trim??x.gold,1,{alpha:.6}),wt(n,t,"M-9 1.2 C-12 2.6 -14 4.5 -16.5 7.5 M9 1.2 C12 2.6 14 4.5 16.5 7.5",e.trim??x.gold,.9,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=28;Ht(n,t,vi(i,s+2,6.2),x.blueDim,1,{alpha:.8}),Zi(n,t,i,s+2,"shawl",e.trim??x.gold,e.color),uc(n,t,i*.4,2.4,e.trim??x.gold);for(const a of[s+4,s+9])wt(n,t,ke(i,a,.8),e.trim??x.gold,1.1);const r=12+i*.5;wt(n,t,`M${P(r-4)} 15 L${P(r+4)} 14.6`,e.trim??x.gold,1.2),n.save(),xt(n,e.monogram??"F",r,12.8,{size:5,align:"center",color:e.trim??x.gold,weight:"m",ls:0}),n.restore()}},announcer:{back(n,t,e){const i=Sn(t);fn(n,t,i-2,e.color),Ht(n,t,un(17,6,i),e.color,1.6),wt(n,t,bn(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=26;Ht(n,t,vi(i,s+2,6.2),e.trim??x.white,1.1,{alpha:.75}),Ht(n,t,`M${P(i*.4-1.4)} 1.5 L${P(i*.4+1.4)} 1.5 L${P(i*.4+.9)} 4 L${P(i*.7+2)} ${P(s-2)} L${P(i*.7)} ${P(s+1)} L${P(i*.7-2)} ${P(s-2)} L${P(i*.4-.9)} 4 Z`,x.violet,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),hr(n,t,i*.4,e.trim??x.white);const r=-10.5+i*.4;Ht(n,t,`M${P(r-.8)} 9 L${P(r+.8)} 9 L${P(r+.8)} 11.6 L${P(r-.8)} 11.6 Z`,x.white,1),wt(n,t,`M${P(r)} 11.6 C${P(r+2)} 16 ${P(r-3)} 20 ${P(r-2)} 30`,x.blueMid,.7,{alpha:.5})}},suit:{back(n,t,e){const i=Sn(t);fn(n,t,i-2,e.color),Ht(n,t,un(17.5,6,i),e.color,1.6),wt(n,t,bn(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=25;Ht(n,t,vi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75});const r=e.tie??x.coral;Ht(n,t,`M${P(i*.4-1.4)} 1.5 L${P(i*.4+1.4)} 1.5 L${P(i*.4+.9)} 4 L${P(i*.7+2.2)} ${P(s+4)} L${P(i*.7)} ${P(s+7)} L${P(i*.7-2.2)} ${P(s+4)} L${P(i*.4-.9)} 4 Z`,r,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),hr(n,t,i*.4,e.shirt??x.white),wt(n,t,ke(i,s+6,.9),e.color,1.1)}},hoodie:{back(n,t,e){const i=Sn(t,50);fn(n,t,i-3,x.blueDim),Ht(n,t,"M-10 1 C-14 -6 -10 -11 0 -11.5 C10 -11 14 -6 10 1 Z",e.color,1.5),wt(n,t,"M-7.5 -1 C-9 -6 -6 -8.5 0 -8.8 C6 -8.5 9 -6 7.5 -1",e.color,.9,{alpha:.5}),Ht(n,t,un(18,7,i,7.5),e.color,1.7),wt(n,t,bn(18,i,7.5),e.color,1,{alpha:.55}),t.floor!=null&&wt(n,t,`M-21 ${P(i-4)} L21 ${P(i-4)}`,e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;Ht(n,t,"M-7.2 -1.5 C-6 4 6 4 7.2 -1.5 C9 3 6 6.5 0 6.5 C-6 6.5 -9 3 -7.2 -1.5 Z",e.color,1.5);const s=Math.sin(t.t*1.7)*.6;for(const r of[-1,1]){const a=i*.5+r*2.6;wt(n,t,`M${P(a)} 5 C${P(a+s)} 10 ${P(a-s)} 15 ${P(a+r*.5)} 19`,e.trim??x.white,1,{alpha:.85}),wt(n,t,`M${P(a+r*.5)} 19 L${P(a+r*.5)} 21`,e.trim??x.white,2)}if(t.bottom>32&&wt(n,t,`M${P(i-11)} 44 L${P(i-8)} 32 L${P(i+8)} 32 L${P(i+11)} 44`,e.color,1.2,{alpha:.7}),e.logo!==!1){const r=i+8,a=14;wt(n,t,`M${P(r)} ${P(a)} C${P(r-1)} ${P(a-2)} ${P(r-3)} ${P(a-3)} ${P(r-3)} ${P(a-1.5)} C${P(r-3)} ${P(a)} ${P(r-1.5)} ${P(a+.5)} ${P(r)} ${P(a)} C${P(r+1)} ${P(a-2)} ${P(r+3)} ${P(a-3)} ${P(r+3)} ${P(a-1.5)} C${P(r+3)} ${P(a)} ${P(r+1.5)} ${P(a+.5)} ${P(r)} ${P(a)}`,e.trim??x.bsky,1,{hot:!0})}}},cardigan:{back(n,t,e){const i=Sn(t,48);fn(n,t,i-2,x.blueDim),Ht(n,t,un(17,6,i,7),e.color,1.6),wt(n,t,bn(17,i,7),e.color,1,{alpha:.5});for(let s=-16;s<=16;s+=4)wt(n,t,`M${s} ${P(i-5)} L${s} ${P(i)}`,e.color,.7,{alpha:.3})},front(n,t,e){const i=t.turn*4.5,s=Sn(t,48),r=24;Ht(n,t,vi(i,r,6.4),e.shirt??x.sky,1,{alpha:.7}),Ht(n,t,`M-6.4 -1.5 L${P(i-1.6)} ${P(r)} L${P(i-1.6)} ${P(s)} L-14 ${P(s)} L-12 4 Z M6.4 -1.5 L${P(i+1.6)} ${P(r)} L${P(i+1.6)} ${P(s)} L14 ${P(s)} L12 4 Z`,e.color,1.4),hr(n,t,i*.4,e.shirt??x.sky);for(let a=r+3;a<Math.min(s,60);a+=7)wt(n,t,ke(i,a,.8),e.trim??x.white,1.1)}},labcoat:{back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,70):t.bottom;fn(n,t,60,x.blueDim),Ht(n,t,un(18,6.2,i),e.color??x.white,1.6),wt(n,t,bn(18,i),e.color??x.white,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,vi(i,s,6.2),e.shirt??x.sky,1,{alpha:.6}),wt(n,t,`M${P(i*.4)} 3 L${P(i*.7)} ${P(s-2)}`,e.tie??x.green,2.2),Zi(n,t,i,s+2,"notch",e.color??x.white),wt(n,t,`M${P(i)} ${P(s+2)} L${P(i)} ${P(t.floor!=null?Math.min(t.bottom,70):t.bottom)}`,e.color??x.white,1.2);const r=12+i*.5;wt(n,t,`M${P(r-4)} 18 L${P(r+4)} 18`,e.color??x.white,1.2),[x.coral,x.bsky,x.green].forEach((o,l)=>wt(n,t,`M${P(r-2.5+l*2)} 18 L${P(r-2.5+l*2)} ${P(14.5+l%2)}`,o,1.4,{hot:!0}));const a=-12+i*.5;Ht(n,t,`M${P(a-3.5)} 16 L${P(a+3.5)} 16 L${P(a+3.5)} 20.5 L${P(a-3.5)} 20.5 Z`,e.trim??x.cyan,1),wt(n,t,`M${P(a-2.3)} 17.6 L${P(a+2.3)} 17.6 M${P(a-2.3)} 19 L${P(a+1)} 19`,e.trim??x.cyan,.7,{alpha:.7})}},turtleneck:{back(n,t,e){const i=Sn(t,48);fn(n,t,i-2,x.blueDim),Ht(n,t,un(16.5,7,i,7.5),e.color,1.6),wt(n,t,bn(16.5,i,7.5),e.color,1,{alpha:.45})},front(n,t,e){Ht(n,t,"M-6.8 -7 C-3 -6 3 -6 6.8 -7 L7.6 3 C3 4.5 -3 4.5 -7.6 3 Z",e.color,1.5);for(const i of[-4.5,-2,.5])wt(n,t,`M-7 ${i} C-3 ${P(i+1.2)} 3 ${P(i+1.2)} 7 ${i}`,e.color,.9,{alpha:.55});e.pendant&&(wt(n,t,"M-4 4 C-2 14 2 14 4 4",e.trim??x.gold,.8,{alpha:.7}),wt(n,t,ke(0,13.6,1.1),e.trim??x.gold,1.2,{hot:!0}))}},tee:{back(n,t,e){const i=Sn(t,46);fn(n,t,i-2,x.blueDim),Ht(n,t,un(17,7,i,7.5),e.color,1.6),wt(n,t,"M-19 22 L-15 21 M19 22 L15 21",e.color,1,{alpha:.6})},front(n,t,e){wt(n,t,"M-7.2 -1.2 C-5 4 5 4 7.2 -1.2",e.color,1.5);const i=t.turn*4;if(!e.print||e.print==="butterfly"){const s=i,r=16;wt(n,t,`M${s} ${r} C${s-2} ${r-4} ${s-6} ${r-6} ${s-6} ${r-3} C${s-6} ${r} ${s-3} ${r+1} ${s} ${r} C${s+2} ${r-4} ${s+6} ${r-6} ${s+6} ${r-3} C${s+6} ${r} ${s+3} ${r+1} ${s} ${r} M${s} ${r} C${s-3} ${r+2} ${s-4} ${r+5} ${s-1.5} ${r+4.5} M${s} ${r} C${s+3} ${r+2} ${s+4} ${r+5} ${s+1.5} ${r+4.5}`,e.trim??x.bsky,1.4,{hot:!0})}else xt(n,String(e.print).toUpperCase(),i,18,{size:4.2,align:"center",color:e.trim??x.white,weight:"m"})}},terminal:{back(n,t,e){const i=Math.min(t.bottom,52),s=e.color??x.green;Ht(n,t,`M-22 4 L22 4 L24 8 L24 ${P(i)} L-24 ${P(i)} L-24 8 Z`,s,1.8),wt(n,t,"M-20 7 L20 7",s,.8,{alpha:.4});for(let r=10;r<16;r+=2)wt(n,t,`M-21 ${r} L-15 ${r} M15 ${r} L21 ${r}`,s,.7,{alpha:.45});if(t.floor!=null&&t.floor>i+4){Ht(n,t,`M-6 ${P(i)} L6 ${P(i)} L5 ${P(t.floor-6)} L-5 ${P(t.floor-6)} Z`,s,1.2),Ht(n,t,`M-16 ${P(t.floor-6)} L16 ${P(t.floor-6)} L16 ${P(t.floor-3)} L-16 ${P(t.floor-3)} Z`,s,1.2);for(const r of[-12,0,12])wt(n,t,ke(r,t.floor-1.6,1.6),s,1)}},front(n,t,e){const i=e.color??x.green;Ht(n,t,"M-4.2 -6 L4.2 -6 L4.6 4 L-4.6 4 Z",i,1.2);for(let f=-4.5;f<4;f+=1.6)wt(n,t,`M-4.4 ${P(f)} L4.4 ${P(f)}`,i,.8,{alpha:.6});const s=-15+t.turn*3,r=12,a=30,o=20;Ht(n,t,`M${s} ${r} L${s+a} ${r} L${s+a} ${r+o} L${s} ${r+o} Z`,i,1.4,{hot:!0});const l=e.text??["> ingest firehose","> rank: simcluster",'> reply: "great point"',"> ok"],c=t.t,h=Math.floor(c*1.4);n.save(),n.beginPath(),n.rect(s+.5,r+.5,a-1,o-1),n.clip();for(let f=0;f<4;f++){const d=l[(h+f)%l.length];xt(n,d.toUpperCase(),s+1.6,r+4.6+f*4.4,{size:2.9,color:i,ls:.04,alpha:f===3?1:.6})}Math.floor(c*3)%2===0&&wt(n,t,`M${s+2} ${r+o-1.6} L${s+4} ${r+o-1.6}`,i,1.8),n.restore(),[x.green,x.amber,x.red].forEach((f,d)=>{const g=d===0?.4+.6*(t.speaking??0):d===1?Math.floor(c*2+d)%3===0?1:.25:.3;wt(n,t,ke(15+d*3,36,.8),f,1.4,{alpha:g,hot:g>.6})}),xt(n,(e.model??"AGENT-7").toUpperCase(),-20,37.2,{size:2.8,color:i,alpha:.7,ls:.15})}}};Cr.blazer={back(n,t,e){const i=Sn(t);fn(n,t,i-2,an(e.color,"#000",.5)),Ht(n,t,un(17,6,i),e.color,1.6),wt(n,t,bn(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=24;Ht(n,t,vi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75}),Zi(n,t,i,s+2,"notch",e.color,e.trim),Ht(n,t,`M-5.6 -2 L${P(i-1.4)} 6 L-8 3.6 Z M5.6 -2 L${P(i+1.4)} 6 L8 3.6 Z`,e.shirt??x.white,1.2);for(const r of[s+4,s+10])wt(n,t,ke(i,r,.8),e.trim??e.color,1.1);if(e.crest){const r=-12+i*.5;wt(n,t,`M${P(r-3)} 13 L${P(r+3)} 13 L${P(r+3)} 17 L${P(r)} 19.5 L${P(r-3)} 17 Z`,e.trim??x.gold,1.2,{hot:!0})}}};Cr.featherCoat={back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,62):t.bottom;fn(n,t,56,x.blueDim),Ht(n,t,un(17.5,6.5,i),e.color,1.6),wt(n,t,bn(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;wt(n,t,`M${P(i)} 6 L${P(i)} ${P(t.floor!=null?Math.min(t.bottom,62):t.bottom)}`,e.color,1.2);for(const r of[12,20,28])wt(n,t,ke(i-2.5,r,.8),e.trim??x.violet,1.1);let s="";for(let r=-6;r<=6;r++){const a=r*1.9,o=1.2-Math.abs(r)*.25,l=a*1.45+(r<0?-1:1)*.8,c=o+6.2-Math.abs(r)*.15;s+=`M${P(a-1.1)} ${P(o)} Q${P(a*1.25-1)} ${P(o+3.5)} ${P(l)} ${P(c)} Q${P(a*1.25+1)} ${P(o+3)} ${P(a+1.1)} ${P(o)} Z `}Ht(n,t,s,e.trim??x.violet,1.1)}};function C1(n,t,e){const i=e.holds;if(i){for(const s of[].concat(i))if(s==="clipboard"){Ht(n,t,"M-13 26 L1 26 L1 44 L-13 44 Z",x.amber,1.3),Ht(n,t,`M${-6-2.5} ${26-1.2} L${-6+2.5} ${26-1.2} L${-6+2.5} ${26+1.2} L${-6-2.5} ${26+1.2} Z`,x.white,1),xt(n,(e.clipText??"LIST OF").toUpperCase(),-6,26+5.2,{size:2.2,align:"center",color:x.white,weight:"m",ls:.05});for(let o=0;o<4;o++)wt(n,t,`M-11 ${34+o*2.4} L${-6+(o%2?3:5)} ${34+o*2.4}`,x.white,.7,{alpha:.55});wt(n,t,ke(-6+7.5,38,1.6),e.skin??x.white,1)}else if(s==="clicker")Ht(n,t,`M${15-1.6} 32 L${15+1.6} 32 L${15+1.6} 39 L${15-1.6} 39 Z`,x.white,1.2),wt(n,t,ke(15,32+1.8,.6),x.red,1.3,{hot:Math.floor(t.t*2)%3===0}),wt(n,t,ke(15,36,2.2),e.skin??x.white,1,{alpha:.7});else if(s==="popper")Ht(n,t,"M12 36 L16 36 L19 24 L9 24 Z",x.magenta,1.3,{hot:!0}),wt(n,t,`M9 24 L19 24 M11 29 L${14+3.8} 29`,x.gold,1),wt(n,t,"M14 36 L14 39",x.white,1);else if(s==="headset"){const r=t.turn>=0?1:-1;wt(n,t,`M${P(r*7)} -9 C${P(r*8)} -5 ${P(r*6)} -3 ${P(r*2.5)} -4.5`,x.white,1.1),wt(n,t,ke(r*2.3,-4.6,.9),x.white,1.3,{hot:!0})}}}function fc(n,t,e,i){const r=(Cr[i==null?void 0:i.kind]??Cr.hoodie)[t];if(r){w1(n,e),Ko=!!e.noFill;try{r(n,e,i??{}),t==="front"&&C1(n,e,i??{})}finally{Ko=!1,n.restore()}}}const Rr={size:25,y:676,maxW:1e3},Ms={size:20,h:44,bottom:684},R1=.5,P1=3;function L1(n){if(n==null||n==="")return null;const t=Number(n);return Number.isFinite(t)&&t>=R1&&t<=P1?t:null}function D1(n=1){return Math.min(Rr.maxW,1256-56*n)}function U1(n,t,e){const i=[];let s=[],r=0;return n.forEach((a,o)=>{s.length&&r+t+a>e&&(i.push(s),s=[],r=0),s.push(o),r+=(s.length>1?t:0)+a}),s.length&&i.push(s),i}function I1(n,t,e){let i=n.findIndex(s=>s.includes(t));return i<0&&(i=e?n.length-1:0),Math.max(0,Math.min(n.length-2,i-i%2))}function N1(n,t,e,i=0,s=1){const r=Rr.size*s,a=r*1.32,o=Math.max(t,e)+56*s,l=n*a+40*s,c=640-o/2,h=Math.max(4,Rr.y-l+30-i);return{size:r,lh:a,bx:c,by:h,bw:o,bh:l,tag:{x:c+18*s,y:h-9*s,w:e+20*s,h:18*s,tx:c+28*s,ty:h+5*s,size:14*s},row:u=>h+30*s+u*a+r*.55,underline:{dy:7*s,width:2*s},frame:{cut:8*s,width:1.2*s}}}function F1(n,t=1){const e=n+50*t,i=Ms.h*t;return{x:640-e/2,y:Ms.bottom-i,w:e,h:i,ty:Ms.bottom-15*t,size:Ms.size*t,cut:8*t,width:1.2*t}}const _a=4;function Fh(n,t,e=0){return n.x<t.x+t.w+e&&n.x+n.w>t.x-e&&n.y<t.y+t.h+e&&n.y+n.h>t.y-e}function O1(n,t=1){return{x:n.bx,y:n.by-9*t,w:n.bw,h:n.bh+9*t}}function z1(n,t=0){return{x:n.x,y:n.y-t,w:n.w,h:n.h}}function Oh(n,t=.05){if(!(n>1))return[n];const e=[];for(let i=0;;i++){const s=Math.round((1+i*t)*1e6)/1e6;if(s>=n-1e-9)break;e.push(s)}return e.push(n),e}function Jo(n,t){for(let e=n.length-1;e>=0;e--)if(t(n[e]))return n[e];return n[0]}function Co(n,t,e=_a){return!t.some(i=>Fh(n,i,e))}function B1(n,t,e,i=_a,s=1){if(!e)return n;const r={x:t.x,y:n,w:t.w,h:t.h};if(!Fh(r,e))return n;const a=Math.min(n,e.y-i-t.h),o=Math.min(1,Math.max(0,s/.5));return o===1?a:n+(a-n)*o}const Ro=n=>`${n.who??""}|${n.kind??"say"}|${n.text}`;function k1(n,t){const e=new Map;for(const[i,s]of t)e.set(i,Jo(n,r=>s.every(a=>a.has(r))));return e}const ur=(()=>{const n=Pi("emblem"),t=[];for(let i=0;i<9;i++){const s=i/9*Math.PI*2+n.range(-.2,.2),r=i===0?0:n.range(.45,.95);t.push([Math.cos(s)*r,Math.sin(s)*r])}const e=[];for(let i=1;i<9;i++)e.push([0,i]),e.push([i,i===8?1:i+1]);return e.push([2,6],[3,7]),{nodes:t,edges:e}})();function H1(n,t,e,i,s=0,r=x.gold,a={}){Ne(n,t,e,i,r,1.8,{hot:!0,alpha:a.alpha}),Ne(n,t,e,i*1.12,r,.9,{alpha:.4*(a.alpha??1)});const o=new Path2D;for(const[l,c]of ur.edges){const h=ur.nodes[l],u=ur.nodes[c];o.moveTo(t+h[0]*i*.82,e+h[1]*i*.82),o.lineTo(t+u[0]*i*.82,e+u[1]*i*.82)}it(n,o,r,1,{alpha:.55*(a.alpha??1)}),ur.nodes.forEach(([l,c],h)=>_e(n,t+l*i*.82,e+c*i*.82,i*(h===0?.09:.06),h%3===0?x.sky:r,(.6+.4*Math.sin(s*2+h*1.7))*(a.alpha??1)))}function G1(n,t,e,i=1,s={}){const r=s.t??0,a=s.alpha??1;if(a<=0)return;const o=104*i,l=he(n,"CLUSTER",{size:o,weight:"m",ls:.06});s.align==="center"&&(t-=l/2),n.save(),n.globalAlpha=a,gr(n,"THE LATE",t+4*i,e-o*.92,{size:34*i,color:x.sky,ls:.62,weight:"m",alpha:a,glow:.5}),H1(n,t+l-44*i,e-o*1.06,30*i,r,x.gold,{alpha:a}),gr(n,"CLUSTER",t,e,{size:o,weight:"m",color:x.gold,ls:.06,alpha:a,glow:.9});const c=l*ie(s.sweep??1);Bt(n,t,e+16*i,t+c,e+16*i,x.gold,2*i,{hot:!0,alpha:a}),Bt(n,t,e+24*i,t+c*.7,e+24*i,x.goldMid,1*i,{alpha:.6*a}),s.sub!==!1&&(n.save(),n.translate(t+l-4*i,e+66*i),n.transform(1,0,-.22,1,0,0),gr(n,"with Larry Nx",0,0,{size:40*i,color:x.white,align:"right",ls:.06,alpha:a,glow:.4}),n.restore()),n.restore()}function V1(n,t,e,i,s=520){const r=$e.outCubic(ie(e))*(1-$e.inCubic(ie(i)));if(r<=.001)return;const a=t.color??x.sky,o=String(t.name??"").toUpperCase(),l=String(t.title??"").toUpperCase(),c=t.handle??"",h=he(n,o,{size:34,weight:"m",ls:.1}),u=he(n,l+(c?"   "+c:""),{size:15,ls:.18}),f=Math.max(h+(t.parody?he(n,"PUPPET · PARODY",{size:11,ls:.22})+40:0),u)+120,d=56-(1-r)*(f+80);if(xe(n,d,s,f,88,{color:a,cut:12,width:1.6,alpha:.95}),Bt(n,d+14,s+14,d+14,s+74,a,4,{hot:!0}),Fr(n,d+f-34,s+30,26,a,{width:1.3}),xt(n,o,d+34,s+44,{size:34,weight:"m",color:x.white,ls:.1}),xt(n,l,d+36,s+72,{size:15,color:a,ls:.18}),t.parody){const g=d+34+h+18,_=he(n,"PUPPET · PARODY",{size:11,ls:.22})+16;xe(n,g,s+23,_,22,{color:x.amber,cut:4,width:1.1}),xt(n,"PUPPET · PARODY",g+8,s+38,{size:11,color:x.amber,ls:.22})}c&&xt(n,c,d+36+he(n,l+"   ",{size:15,ls:.18}),s+72,{size:15,color:an(a,"#ffffff",.4),ls:.06})}function Po(n,t,e=0,i=1,s=null){var E;if(!t||t.alpha<=.01)return null;const r=(E=t.words)!=null&&E.length?t.words.map(R=>R[2]):String(t.text).split(/\s+/),a={size:Rr.size*i,ls:.06};let o=s==null?void 0:s.get(i);o||(o={space:he(n," ",a),tw:r.map(R=>he(n,R,a))},s==null||s.set(i,o));const{space:l,tw:c}=o,h=U1(c,l,D1(i)).map(R=>R.map(S=>({tok:r[S],i:S,w:c[S]}))),u=t.word<0?0:t.word,f=I1(h.map(R=>R.map(S=>S.i)),u,t.done),d=h.slice(f,f+2),g=d.map(R=>R.reduce((S,w,k)=>S+w.w+(k?l:0),0)),_=Math.max(...g),p=String(t.name??"").toUpperCase(),m={size:14*i,weight:"m",ls:.2},M=p?he(n,p,m):0,v=N1(d.length,_,M,e,i);return{L:v,area:O1(v,i),shown:d,widths:g,space:l,o:a,tagO:m,name:p,wi:u,s:i}}function W1(n,t,e){const i=t.alpha,{L:s,shown:r,widths:a,space:o,o:l,tagO:c,name:h,wi:u}=e,{bx:f,by:d,bw:g,bh:_}=s;xe(n,f,d,g,_,{color:t.color??x.blue,cut:s.frame.cut,width:s.frame.width,alpha:.6*i,fillAlpha:.92*i}),h&&(Ct(n,Ln(s.tag.x,s.tag.y,s.tag.w,s.tag.h),"#000",i),xt(n,h,s.tag.tx,s.tag.ty,{...c,color:t.color??x.blue,alpha:i})),r.forEach((p,m)=>{let M=640-a[m]/2;const v=s.row(m);for(const E of p){const R=t.words?E.i<u||E.i===u&&t.word>=0:!0,S=t.words&&E.i===u&&t.word>=0&&!t.done,w=S?t.color??x.amber:x.white;xt(n,E.tok,M,v,{...l,color:w,alpha:i*(R?1:.5),weight:S?"m":"l"}),S&&Bt(n,M,v+s.underline.dy,M+E.w,v+s.underline.dy,w,s.underline.width,{hot:!0,alpha:i}),M+=E.w+o}})}function dc(n,t,e,i=0,s=1){if(e<=.02)return null;const r=`[ ${t} ]`,a={size:Ms.size*s,ls:.3},o=F1(he(n,r,a),s);return{B:o,area:z1(o,i),str:r,o:a}}function $1(n,t,e,i=0){const{B:s,str:r,o:a}=t;n.save(),n.translate(0,-i),xe(n,s.x,s.y,s.w,s.h,{color:x.amber,cut:s.cut,width:s.width,alpha:.6*e,fillAlpha:.75*e}),xt(n,r,640,s.ty,{...a,align:"center",color:x.amber,alpha:e}),n.restore()}function X1(n,t){const e=String(t.name??"").toUpperCase(),i=String(t.title??"").toUpperCase(),s=t.handle??"",r=he(n,e,{size:34,weight:"m",ls:.1}),a=he(n,i+(s?"   "+s:""),{size:15,ls:.18});return{x:56,w:Math.max(r+(t.parody?he(n,"PUPPET · PARODY",{size:11,ls:.22})+40:0),a)+120,h:88}}function q1(n,t,e){const r=t.age>=0&&t.age<.6?Math.sin(Math.PI*Math.min(1,t.age/.6)):0,a=t.age>=0&&t.age<.9?1-t.age/.9:0,o=String(t.label??pa.counterLabel),l=he(n,o,{size:12,ls:.24}),c=l+70;xe(n,26,24,c,34,{color:a>0?an(x.lime,"#ffffff",a*.5):x.lime,cut:6,width:1.2+a*1.4,alpha:.75+.25*a,hot:a>.3,fillAlpha:.8}),xt(n,o,38,46,{size:12,color:x.lime,ls:.24,alpha:.9});const h=38+l+30;n.save(),n.translate(h,41),n.scale(1+.6*r,1+.6*r),xt(n,String(t.n),0,8,{size:22,align:"center",color:a>.2?x.white:x.lime,weight:"m",ls:0}),n.restore(),t.age>=0&&t.age<1.5&&wh(n,h,38,t.age,{seed:t.seed,count:18,spread:.55})}function Y1(n,t,e){const i=String(t),s=he(n,i,{size:13,ls:.12})+36;xe(n,640-s/2,686,s,26,{color:x.blueMid,cut:5,width:1,alpha:.6*e,fillAlpha:.8*e}),xt(n,i,640,704,{size:13,align:"center",color:x.white,ls:.12,alpha:.85*e})}const En=(n,t,e={})=>({color:n,head:Th(e.headColor??n,e.headOver),costume:t,scale:1,...e}),is={larry:En("#ffc861",{kind:"tux",color:"#ffd27a",shirt:"#fff3d6",tie:"#ffb340",square:"#ff73cf"},{headOver:{blueMid:"#e4ab50",blueDim:"#a3762f",frame:"#4a3514"}}),sibyl:En("#c9d8ff",{kind:"announcer",color:"#9fb7ff",trim:"#eef6f8"}),hy:En("#ff73cf",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),al:En("#58f0e8",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),dee:En("#b6ff5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),pete:En("#ff9a5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"}),eppy:En("#ff7a2e",{kind:"blazer",color:"#ff7a2e",trim:"#ffc861",crest:!0,holds:"headset"})},pc=["#58f0e8","#a98bff","#b6ff5c","#ff7a5c","#ff5fd2","#7cc4ff","#5be381","#f08cff"];function Pr(n){if(is[n])return is[n];const t=Uo(n),e=pc[t%pc.length],i=En(e,{kind:"hoodie",color:e});return is[n]=i,i}function zh(n,t){const e=t.color??Pr(n).color;return is[n]={...En(e,{kind:"hoodie",color:e},{headColor:t.headColor,headOver:t.headOver}),...t,head:t.head??Th(t.headColor??e,t.headOver)},is[n]}const ni={larry:{name:"Larry Nx",title:"Your host",body:{female:0,child:0},f0:104,rate:1,accent:.16,source:{breathiness:.12,tension:.5},pan:.12},sibyl:{name:"Sibyl Ant",title:"Announcer",body:{female:1,child:0},f0:196,rate:1.04,accent:.2,source:{breathiness:.2},pan:-.3},hy:{name:"Hy Oid",title:"Bandleader, The Formants",body:{female:.35,child:0},f0:135,rate:.95,accent:.2,source:{breathiness:.3,tension:.42,brightness:.12},pan:-.5},al:{name:"Al Veolar",title:"Bass, The Formants",body:{female:0,child:0},f0:84,rate:.95,accent:.14,source:{tension:.45,fry:.2},pan:-.7},dee:{name:"Dee Phthong",title:"Alto, The Formants",body:{female:.9,child:.1},f0:155,rate:1,accent:.18,source:{breathiness:.18,tension:.45,brightness:.25},pan:-.4},pete:{name:"Plosive Pete",title:"Percussion, The Formants",body:{female:.65,child:.4},f0:115,rate:1.05,accent:.18,source:{tension:.55,brightness:.4},pan:-.6},eppy:{name:"Eppy Glottis",title:"Sports desk",body:{female:.15,child:.2},f0:165,rate:1.16,accent:.36,source:{tension:.68,brightness:.55},pan:.25}},j1=1280,mc=720,Z1=1100;class K1{constructor(t,e){this.canvas=t,this.wrap=e,this.ctx=t.getContext("2d",{alpha:!1}),this.gl=new E_,this.glow=new mh(2.2,.8,4),this.S=i1(),this.maxDpr=Math.min(2,window.devicePixelRatio||1),this.k=1,this.captionScale=1,this.glowOn=!0,this.stats={ms:0,frames:0,heads:0,quality:0},this._slow=0,this._fast=0,this.resize(),new ResizeObserver(()=>this.resize()).observe(e)}resize(){const t=this.wrap.getBoundingClientRect();let e=t.width,i=t.width*9/16;i>t.height&&(i=t.height,e=i*16/9),e=Math.max(16,Math.floor(e)),i=Math.max(9,Math.floor(i));const s=this.canvas;s.style.width=e+"px",s.style.height=i+"px",s.style.left=Math.floor((t.width-e)/2)+"px",s.style.top=Math.floor((t.height-i)/2)+"px";const r=Math.min(this.maxDpr,window.devicePixelRatio||1),a=Math.min(2560,Math.round(e*r)),o=Math.round(a*9/16);(s.width!==a||s.height!==o)&&(s.width=a,s.height=o),this.k=a/j1,this.css={w:e,h:i,x:Math.floor((t.width-e)/2),y:Math.floor((t.height-i)/2)}}budget(t){const e=this.stats;e.ms=e.ms?e.ms*.95+t*.05:t,e.frames++,!(e.frames<90)&&(e.ms>19?this._slow++:this._slow=0,e.ms<9?this._fast++:this._fast=0,this._slow>45?(this._slow=0,e.frames=0,this.maxDpr>1.01?(this.maxDpr=Math.max(1,this.maxDpr-.25),this.resize()):this.glowOn&&(this.glowOn=!1),e.quality--,console.info(`stage: frame time ${e.ms.toFixed(1)} ms → dpr ${this.maxDpr}, glow ${this.glowOn}`)):this._fast>240&&(this.maxDpr<Math.min(2,window.devicePixelRatio||1)||!this.glowOn)&&(this._fast=0,e.frames=0,this.glowOn?(this.maxDpr=Math.min(window.devicePixelRatio||1,this.maxDpr+.25),this.resize()):this.glowOn=!0,e.quality++))}screen(){this.ctx.setTransform(this.k,0,0,this.k,0,0)}worldT(t){const e=this.k,i=t.zoom;this.ctx.setTransform(e*i,0,0,e*i,e*(640-t.x*i),e*(360-t.y*i))}draw(t,e={}){var v,E,R,S,w,k;const i=this.ctx,s=t.t,r={k:this.k,rects:[]};i.__lcProtect=r,i.setTransform(1,0,0,1,0,0),i.globalCompositeOperation="source-over",i.globalAlpha=1,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),this.worldT(t.cam),x1(i,this.S,t);const a=(t.setNow??t.set).dim??.34;a>0&&(i.setTransform(1,0,0,1,0,0),i.globalAlpha=a,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),i.globalAlpha=1),this.screen(),t.panel&&t.module.autoPanel!==!1&&Lh(i,t.panel,{color:x.sky,appear:1}),this.call(t,"drawBack",i);for(const y of t.monitors)Ar(i,y.rect.x,y.rect.y,y.rect.w,y.rect.h,{...y});const o=[...t.puppets.values()].filter(y=>y.visible&&y.screen&&y.head);if(o.sort((y,T)=>(y.place.z??0)-(T.place.z??0)||y.screen.y-T.screen.y),this.stats.heads=o.length,!e.probe)for(const y of o)this.drawPuppet(t,y);this.screen();for(const y of t.monitors)Ar.glass(i,y.rect.x,y.rect.y,y.rect.w,y.rect.h,{...y,t:s});this.worldT(t.cam),S1(i,this.S,t),this.screen(),b1(i,this.S,t,t.audience),this.call(t,"drawFront",i);const l=(v=t.layout)==null?void 0:v.lane;l!=null&&l.text&&Rh(i,l.y,l.text,s,{tag:l.tag,color:x.coral}),t.builtNow&&q1(i,t.builtNow);const c=t.disclaimerNow;c&&Y1(i,c.text,c.alpha),i.__lcProtect=null;const h=e.captions??!0,u=Math.max(l!=null&&l.text?46:0,c?34*c.alpha:0),f=h?t.captionNow:null,d=h&&!f&&t.laughing>.05,g=t.signText==="APPLAUSE"?"APPLAUSE":"LAUGHTER";if(e.probe){this.probeCaption(t,f,u,r.rects,e.probe);return}const _=f?Po(i,f,u,this.lineScale(t,f,u,r.rects),this.widthCache(f)):null,p=d?dc(i,g,t.laughing,u,this.laughScale(g,u,r.rects)):null,m=(_==null?void 0:_.area)??(p==null?void 0:p.area)??null;for(const y of t._frame.chyrons){const T=y.spec.id,O=T?{name:((E=t.puppets.get(T))==null?void 0:E.name)??((R=ni[T])==null?void 0:R.name)??T,title:(S=ni[T])==null?void 0:S.title,handle:((w=ni[T])==null?void 0:w.handle)??Pr(T).handle,color:Pr(T).color,parody:!!((k=ni[T])!=null&&k.guest),...y.spec}:y.spec,J=Hn(y.from,y.from+.6,s),tt=Hn(y.to-.5,y.to,s);if(!(s>=y.from&&s<=y.to))continue;const L=(t.captionNow&&h?478:560)-(l!=null&&l.text?46:0);V1(i,O,J,tt,B1(L,X1(i,O),m,_a,_?f.alpha:p?t.laughing:1))}this.signInFrame(t)||E1(i,t),_?W1(i,f,_):p&&$1(i,p,t.laughing,u),e.overlay&&e.overlay(i),this.gl.ok||(Ct(i,Ln(340,300,600,80),"#000",.85),ph(i,this.gl.failed?"THE HEADS NEED WEBGL, WHICH THIS BROWSER HAS TURNED OFF.":"RECONNECTING THE HEADS…",640,340,560,{size:16,align:"center",color:x.amber,ls:.12})),this.glowOn&&this.glow.apply(this.canvas,i,this.k)}widthCache(t){const e=Ro(t);return this._widthKey!==e&&(this._widthKey=e,this._widths=new Map),this._widths}scaleCands(){return this._candsFor!==this.captionScale&&(this._candsFor=this.captionScale,this._cands=Oh(this.captionScale)),this._cands}lineScale(t,e,i,s){var l;if(this.captionScale===1)return 1;const a=(l=t.captionPlan)==null?void 0:l.get(Ro(e));if(a!=null)return a;const o=this.widthCache(e);return Jo(this.scaleCands(),c=>Co(Po(this.ctx,e,i,c,o).area,s))}laughScale(t,e,i){return this.captionScale===1?1:Jo(this.scaleCands(),s=>Co(dc(this.ctx,t,1,e,s).area,i))}probeCaption(t,e,i,s,r){if(!e)return;const a=Ro(e),o=this.widthCache(e),l=new Set(this.scaleCands().filter(c=>Co(Po(this.ctx,{...e,alpha:1},i,c,o).area,s)));r.samples.has(a)||r.samples.set(a,[]),r.samples.get(a).push(l)}signInFrame(t){if((t.setNow??t.set).sign===!1)return!1;const[e,i]=t.toScreen(845,64),[s,r]=t.toScreen(1095,110);return s>40&&e<1240&&i>-10&&r<720}call(t,e,i){const s=t.module[e];if(s){i.save();try{s.call(t.module,i,t.t,t)}catch(r){t._warn(`${e}() threw: ${(r==null?void 0:r.message)??r}`),console.error(r)}i.restore(),this.screen(),i.globalAlpha=1,i.globalCompositeOperation="source-over",i.filter="none"}}drawPuppet(t,e){const i=e.fx,s=e.place.clip;if(!i){s?this.clipped(s,()=>this.paintPuppet(this.ctx,t,e,!0)):this.paintPuppet(this.ctx,t,e,!0),this.drawExtras(t,e);return}const r=this.layer(),a=r.getContext("2d");a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation="source-over",a.globalAlpha=1,a.clearRect(0,0,r.width,r.height),a.setTransform(this.k,0,0,this.k,0,0);const o=i.kind==="hologram";this.paintPuppet(a,t,e,!o);const l=this.k,{x:c,y:h,size:u}=e.screen,f=t.t,d=e.id.length*7;a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation="destination-out",a.globalAlpha=i.scan??(o?.55:.35),a.fillStyle="#000";const g=Math.max(2,Math.round(3*l)),_=o?Math.floor(f*40)%g:0,p=Math.max(0,Math.floor((h-u)*l)),m=Math.min(r.height,Math.ceil((h+u*1.6)*l));for(let R=p+_;R<m;R+=g)a.fillRect(0,R,r.width,Math.max(1,g*.45));let M=i.amount??1;if(o){const R=i.flicker??.5,S=je(f*9,d);M*=1-R*.35*(.5+.5*S),R>0&&dr(Math.floor(f*12),d)<.04*R&&(M*=.25),M*=.78}else M*=i.kind==="monitor"?.92:1;const v=this.ctx;if(v.save(),v.setTransform(1,0,0,1,0,0),s&&(v.beginPath(),v.rect(s.x*l,s.y*l,s.w*l,s.h*l),v.clip()),v.globalCompositeOperation=o?"lighter":"source-over",v.globalAlpha=Math.max(0,Math.min(1,M)),(o||i.tint)&&(v.filter=J1(i.tint??"#7fc8ff")),o?(i.glitch??1)*(dr(Math.floor(f*7),d+3)<.18?1:0):0){const S=(h-u*.6)*l,w=u*2.2*l/7;v.drawImage(r,0,0,r.width,S,0,0,r.width,S);for(let k=0;k<7;k++){const y=S+k*w,T=(dr(k+Math.floor(f*7)*13,d)-.5)*26*l;v.drawImage(r,0,y,r.width,w,T,y,r.width,w)}v.drawImage(r,0,S+7*w,r.width,r.height-S-7*w,0,S+7*w,r.width,r.height-S-7*w)}else v.drawImage(r,0,0);v.restore(),this.drawExtras(t,e)}layer(){this._layer||(this._layer=document.createElement("canvas"));const t=this._layer;return(t.width!==this.canvas.width||t.height!==this.canvas.height)&&(t.width=this.canvas.width,t.height=this.canvas.height),t}clipped(t,e){const i=this.ctx;i.save(),i.beginPath(),i.rect(t.x,t.y,t.w,t.h),i.clip();try{e()}finally{i.restore(),this.screen()}}drawExtras(t,e){var s;const i=this.ctx;e.place.instrument&&(this.worldT(t.cam),M1(i,e.place.instrument,e.place.x,e.place.y,t,e.id),this.screen()),e.look.prop&&!e.place.clip&&(this.worldT(t.cam),y1(i,e.look.prop,e.place.x+(((s=e.propParams)==null?void 0:s.side)??e.look.propSide??-1)*150*(e.place.scale??1),e.place.y,t,e.propParams??{}),this.screen())}paintPuppet(t,e,i,s){const{x:r,y:a,size:o}=i.screen,l=i.head,c=r-o/2,h=a-o/2,u=l.neck(),f=u.cm*(i.look.bodyScale??.66),d=c+u.x,g=h+u.y,_=i.place.floor!=null?e.toScreen(0,i.place.floor)[1]:null,p=Math.cos(i.az)*.75,m={x:d,y:g,u:f,turn:p,sway:i.tilt*.6,breathe:i.breathe,t:e.t,bottom:((i.place.seat!=null?Math.min(mc+40,e.toScreen(0,i.place.seat)[1]):mc+40)-g)/f,floor:_!=null?(_-g)/f:null,speaking:i.speaking,look:i.look,noFill:!s},M=i.look.costume;if(fc(t,"back",m,M),s){const v=l.hull();if(v.length>=6){const E=new Path2D,R=o/2,S=o/2;for(let w=0;w<v.length;w+=2){const k=c+R+(v[w]-R)*1.02,y=h+S+(v[w+1]-S)*1.02;w?E.lineTo(k,y):E.moveTo(k,y)}E.closePath(),Ct(t,E,"#000",.94)}}if(this.gl.ok){const v=this.k,E=Math.min(Z1,o*v),R=this.gl.render(l,E);t.save(),t.setTransform(1,0,0,1,0,0),t.globalCompositeOperation="lighter",t.imageSmoothingEnabled=!0,t.drawImage(this.gl.canvas,R[0],R[1],R[2],R[3],c*v,h*v,o*v,o*v),t.restore()}fc(t,"front",m,M)}}const gc=new Map;function J1(n){let t=gc.get(n);if(!t){const e=parseInt(n.slice(1),16),i=(e>>16&255)/255,s=(e>>8&255)/255,r=(e&255)/255,a=Math.max(i,s,r),o=Math.min(i,s,r),l=a-o;let c=0;l>0&&(c=a===i?(s-r)/l%6:a===s?(r-i)/l+2:(i-s)/l+4),c=(c*60+360)%360,t=`grayscale(1) sepia(1) saturate(2.6) hue-rotate(${Math.round(c-38)}deg) brightness(1.15)`,gc.set(n,t)}return t}const _c=Float32Array.from(Si.map(n=>jo[n]));class Q1{constructor(t){this.id=t,this.cast=ni[t]??{name:t.replace(/(^|[-_])(\w)/g,(e,i,s)=>(i?" ":"")+s.toUpperCase()),title:"",body:{female:.5,child:0}},this._look=null,this.body=this.cast.body??{female:.5,child:0},this.head=null,this.az=NaN,this.visible=!1,this.place=null,this.screen=null,this.tele=null,this.artic=jo,this.speaking=0,this.msgs=new Map,this.spans=[],this.skip=0,this.tmpA=new Float32Array(Si.length),this.tmpB=new Float32Array(Si.length)}get look(){return this._look??Pr(this.id)}get name(){return this.look.displayName??this.cast.name}get color(){return this.look.color}ensureHead(){const t=this.look.head;return this.head&&this.head.palette!==t&&(this.head.dispose(),this.head=null),this.head||(this.head=new S_(this.body,t)),this.head}dress(t){this._look={...this.look,...t}}msgFor(t){const e=`${t.nPh}/${t.nOr}/${t.nArtic}/${t.scope}`;let i=this.msgs.get(e);return i||this.msgs.set(e,i=t.makeMessage()),i}sample(t,e){const i=this.spans;let s=null,r=null,a=null;for(const h of i)t>=h.start&&t<=h.end?s=h:h.end<t&&(!r||h.end>r.end)?r=h:h.start>t&&(!a||h.start<a.start)&&(a=h);if(s){const h=this.msgFor(s.block);s.block.fill(h,s.block.frameAt(t-s.start),t),h.beatStep=e,this.tele=h,this.artic=hc(h.t.artic),this.speaking=s.line.kind==="beat"?.6:1;return}this.tele=null,this.speaking=0;const o=.35,l=.14;let c=null;if(r&&t-r.end<o){const h=(t-r.end)/o;r.block.articAt(r.block.frames-1,this.tmpA),c=vc(this.tmpA,_c,h*h*(3-2*h))}if(a&&a.start-t<l){const h=1-(a.start-t)/l;a.block.articAt(0,this.tmpB),c=vc(c??_c,this.tmpB,h*h*(3-2*h))}this.artic=c?hc(c):jo}}function vc(n,t,e){const i=new Float32Array(n.length);for(let s=0;s<n.length;s++)i[s]=n[s]+(t[s]-n[s])*e;return i}const Cs=200,ee={desk:{x:1790,y:548},mono:{x:970,y:452},chair:{x:ma.x,y:588},couch:[{x:1330,y:602},{x:1218,y:602}],band:{hy:{x:138,y:578,instrument:"keys",floor:800},al:{x:268,y:578,instrument:"bass",floor:800},pete:{x:404,y:512,instrument:"drums",floor:740},dee:{x:556,y:578,instrument:"mic",floor:800}},anncr:{x:690,y:548,floor:Qt.floor},lectern:{x:690,y:540},presenter:{x:1460,y:520},stand:{x:1470,y:545}};function fr(n,t,e,i={}){const s=n.cam.zoom,r=e.h*.78/(Cs*s),a=e.x+e.w/2,o=e.y+e.h*.42;return n.monitors=[...n.monitors??[],{rect:e,who:t,...i}],n.place[t]={x:n.cam.x+(a-640)/s,y:n.cam.y+(o-360)/s,scale:r,look:i.look??"camera",z:8,floor:null,clip:e,fx:{kind:"monitor"}},n}const Bh=["hy","al","pete","dee"],xn=(n,t="camera")=>n==="mono"?{...ee.mono,scale:1,look:t,z:5,floor:Qt.floor}:{...ee.desk,scale:1,look:t,z:5,floor:null,seat:760};function Mc(n){const t=[ee.chair,...ee.couch],e={};return n.slice(0,3).forEach((i,s)=>e[i]={...t[s],scale:1,look:"larry",z:4-s*.1,floor:null,seat:s?790:800}),e}function yc(n,t="camera"){const e={};for(const i of Bh){const s=ee.band[i];e[i]={x:s.x,y:s.y,scale:.92,look:t,z:i==="pete"?1:2,floor:s.floor,instrument:s.instrument}}return e}const _r={wide(n,t={}){const e={larry:xn(t.larry??"desk",t.look??"camera")};return t.band!==!1&&Object.assign(e,yc()),Object.assign(e,Mc(t.guests??n.guests)),(n.cast.includes("sibyl")||t.sibyl)&&(e.sibyl={...ee.anncr,scale:.9,look:"camera",z:2}),{cam:{x:1e3,y:585,zoom:.64},place:e,audience:1}},mono(n,t={}){const e=xn("mono",t.look??"camera");return{cam:{x:e.x,y:e.y+86,zoom:t.zoom??1.78},place:{larry:e},audience:1}},desk(n,t={}){const e=xn("desk",t.look??"camera");return{cam:{x:e.x-40,y:e.y+66,zoom:t.zoom??1.85},place:{larry:e},audience:0}},guest(n,t={}){const e=t.guest??n.guests[0],i={larry:xn("desk",e??"camera")};return e&&(i[e]={...ee.chair,scale:t.guestScale??1,look:"larry",z:4,floor:null,seat:800}),{cam:{x:(ee.chair.x+ee.desk.x)/2-10,y:640,zoom:t.zoom??1.42},place:i,audience:0}},panel(n,t={}){const e=t.guests??n.guests.filter(l=>l!==t.pop).slice(0,3),i={larry:xn("desk",t.look??e[0]??"camera"),...Mc(e)},s=e.length>=3?ee.couch[1].x:e.length===2?ee.couch[0].x:ee.chair.x,r=(s+ee.desk.x)/2,a=Math.min(1.4,1100/(ee.desk.x-s+260)),o={x:r,y:650,zoom:a};if(t.pop){const l=Math.max(0,Math.min(1,t.popUp??1)),c=(612-o.y)*a+360;i[t.pop]={x:e.length>=3?ee.couch[1].x-70:ee.couch[1].x,y:720-l*150,scale:t.popScale??.9,look:"larry",z:1,floor:null,clip:{x:0,y:-100,w:1280,h:c+100}}}return{cam:o,place:i,audience:0}},band(n,t={}){const e=yc(n,t.look??"camera");if(t.with)for(const i of[].concat(t.with))e[i]={...ee.anncr,scale:.9,look:"camera",z:2};return{cam:{x:352,y:640,zoom:t.zoom??1.5},place:e,audience:.8}},ots(n,t={}){var f;const e=t.who??"larry",i=t.side==="right",s=t.zoom??1.75,r=e==="larry"?xn("desk"):{...ee.presenter,scale:1,z:5,floor:Qt.floor},a=i?960:270,o={x:r.x-(a-640)/s-(i?-40:40)/s,y:r.y+70,zoom:s},l=t.panel??(i?{x:40,y:64,w:690,h:470}:{x:520,y:64,w:720,h:470}),c={[e]:{...r,look:t.look??(i?"left":"right"),instrument:t.desk??r.instrument}},u={cam:o,place:c,audience:0,panel:l,set:e==="larry"?{}:{chair:!1,couch:!1,desk:!1}};if(t.pip){const _=i?{x:l.x+18,y:l.y+l.h-150-18,w:230,h:150}:{x:l.x+l.w-230-18,y:l.y+l.h-150-18,w:230,h:150};fr(u,t.pip,_,{label:t.pipLabel??((f=n.CAST[t.pip])==null?void 0:f.name)??t.pip,live:t.pipLive??!1,noStand:!0})}return u},sports(n,t={}){const e=_r.ots(n,{who:"eppy",desk:"sportsdesk",...t,panel:t.panel??(t.side==="right"?{x:40,y:54,w:690,h:430}:{x:520,y:54,w:720,h:430})});return e.lane={y:676,h:36,text:t.ticker??null,tag:t.tickerTag??"SCORES"},e},remote(n,t={}){var a;const e=t.guest??n.guests[0],i=t.zoom??1.6,s=xn("desk","left"),r={cam:{x:s.x-320/i,y:s.y+70,zoom:i},place:{larry:s},audience:0,set:{chair:!1,couch:!1}};return e&&fr(r,e,{x:60,y:60,w:560,h:400},{label:t.label??((a=n.CAST[e])==null?void 0:a.name)??e,live:t.live??!0}),r},remote2(n,t={}){var o,l,c,h;const[e,i]=t.guests??n.guests.slice(0,2),s=t.zoom??1.6,r=xn("desk","left"),a={cam:{x:r.x-390/s,y:r.y+70,zoom:s},place:{larry:r},audience:0,set:{chair:!1,couch:!1}};return e&&fr(a,e,{x:40,y:90,w:390,h:300},{label:((o=t.labels)==null?void 0:o[0])??((l=n.CAST[e])==null?void 0:l.name)??e,live:t.live??!0}),i&&fr(a,i,{x:460,y:90,w:390,h:300},{label:((c=t.labels)==null?void 0:c[1])??((h=n.CAST[i])==null?void 0:h.name)??i,live:t.live??!0}),a},podium(n,t={}){const e=t.who??"sibyl",i=ee.lectern,s={[e]:{...i,scale:1,look:t.look??"camera",z:4,floor:Qt.floor,instrument:"lectern"}};return{cam:{x:i.x+20,y:i.y+100,zoom:t.zoom??1.7},place:s,audience:.5}},deskWith(n,t={}){const e=t.with??"sibyl",i={larry:xn("desk",t.look??e),[e]:{...ee.stand,scale:1,look:"larry",z:4,floor:Qt.floor,instrument:t.stand??"stand"}};return{cam:{x:(ee.stand.x+ee.desk.x)/2,y:640,zoom:t.zoom??1.4},place:i,audience:0,set:{chair:!1,couch:!1}}},stage(n,t={}){const e=t.lead??"larry",i=t.band??Bh,s={[e]:{x:970,y:470,scale:1,look:t.look??"camera",z:6,floor:Qt.floor}},r=i.length;return i.forEach((a,o)=>{const l=r>1?o/(r-1):.5,c=970+(l-.5)*2*210+(l<.5?-40:40);s[a]={x:c,y:430+Math.abs(l-.5)*40,scale:.78,look:"camera",z:2,floor:Qt.floor}}),{cam:{x:970,y:470,zoom:t.zoom??1.15},place:s,audience:1,set:{chair:!1,couch:!1}}},closeup(n,t={}){const e=t.who??"larry",i=n.markOf(e),s=(t.size??520)/(Cs*(i.scale??1)),r={[e]:{...i,look:t.look??i.look??"camera"}};return{cam:{x:i.x+(t.dx??0),y:i.y+Cs*.18*(i.scale??1),zoom:s},place:r,audience:0}},title(n){const t={larry:xn("desk","camera")};return{cam:{x:1590,y:590,zoom:1.45},place:t,audience:0}}},kh=["larry","sibyl","hy","al","dee","pete","eppy"],tv=/^(applause|laugh|biglaugh|chuckle|cheer)/i,xc=.6,Sc=Math.PI-.6;class ji{constructor({module:t,cues:e,tele:i,puppets:s}){this.module=t,this.cues=e??{id:t.id,title:t.title,duration:t.duration??30,lines:[],cues:{},sfx:[],music:[]},this.id=t.id??this.cues.id,this.title=t.title??(e==null?void 0:e.title)??this.id,this.duration=this.cues.duration??t.duration??30,this.teleFile=i,this.puppets=s,this.lines=(this.cues.lines??[]).slice().sort((a,o)=>a.t0-o.t0),this.lineById=new Map(this.lines.filter(a=>a.id).map(a=>[a.id,a])),this.sfxList=this.cues.sfx??[],this.musicList=this.cues.music??[],this._warned=new Set;const r=["larry"];for(const a of this.lines)a.who&&!r.includes(a.who)&&r.push(a.who);for(const a of t.cast??[])r.includes(a)||r.push(a);this.cast=r,this.guests=(t.guests??r.filter(a=>!kh.includes(a))).slice(),this.draw=t1,this.P=x,this.ease=$e,this.clamp=ie,this.lerp=Qn,this.unlerp=Hn,this.smoothstep=Hr,this.tween=Kh,this.window=Gr,this.pulse=Jh,this.noise=je,this.SHOTS=_r,this.MARKS=ee,this.TILE=Cs,this.CAST=ni,this.defineLook=zh,this.set={...t.set??{}},this.nameplate=t.nameplate,this.keyLabel=t.keyLabel,this.captions=!0,this.onAir=!0,this.t=0,this.dt=0,this.wall=0,this._cur=null,this._trans=null,this._lastPlace={},this._frame=this._newFrame(),this.layout=null,this.cam={x:1e3,y:560,zoom:1},this.panel=null,this.audience=0,this.cut=!0,this._declShots=(t.shots??[]).map(a=>typeof a=="string"?{at:0,shot:a}:a),this._buildSpans()}_newFrame(){return{shot:null,cam:null,over:{},chyrons:[],caption:void 0,sign:null}}_buildSpans(){var e;for(const i of this.cast)this.puppet(i);for(const i of this.puppets.values())i.spans=[];const t=((e=this.teleFile)==null?void 0:e.blocks)??[];for(const i of this.lines){if(!(i.tele>=0)||!t[i.tele])continue;const s=t[i.tele];this._puppet(i.who).spans.push({start:i.teleT0,end:i.teleT0+s.duration,block:s,line:i})}}_puppet(t){let e=this.puppets.get(t);return e||(e=new Q1(t),this.puppets.set(t,e)),e}_warn(t){this._warned.has(t)||(this._warned.add(t),console.warn(`[${this.id}] ${t}`))}at(t){var a;if(typeof t=="number")return t;if(t==null)return 0;const e=(a=this.cues.cues)==null?void 0:a[t];if(e!==void 0)return e;if(t.endsWith(".end")){const o=this.lineById.get(t.slice(0,-4));if(o)return o.t1}const i=this.lineById.get(t);if(i)return i.t0;const s=this.musicList.find(o=>o.id===t);if(s)return s.t0;const r=this.sfxList.find(o=>o.name===t)??this.sfxList.find(o=>o.name.startsWith(t+"-"));return r?r.t0:(this._warn(`unknown cue "${t}"`),1/0)}since(t){return this.t-this.at(t)}between(t,e){return this.t>=this.at(t)&&this.t<this.at(e)}progress(t,e){const i=this.at(t),s=typeof e=="number"?i+e:this.at(e);return Hn(i,s,this.t)}line(t){const e=this.lineById.get(t);return e?this._lineState(e):(this._warn(`unknown line "${t}"`),{id:t,t0:1/0,t1:1/0,active:!1,progress:0,done:!1,word:-1,words:[]})}_lineState(t){const e=this.t;let i=-1;if(t.words)for(let s=0;s<t.words.length;s++)e>=t.words[s][0]&&(i=s);return{...t,active:e>=t.t0&&e<t.t1,progress:Hn(t.t0,t.t1,e),done:e>=t.t1,word:i}}get active(){const t=this.t;return this.lines.filter(e=>t>=e.t0&&t<e.t1)}speaking(t){const e=this.t;return this.lines.some(i=>i.who===t&&e>=i.t0&&e<i.t1)}get speaker(){let t=null;const e=this.t;for(const i of this.lines)e>=i.t0&&e<i.t1&&i.kind!=="beat"&&(!t||i.t0>=t.t0)&&(t=i);return(t==null?void 0:t.who)??null}lastLine(t){let e=null;for(const i of this.lines)i.t0<=this.t&&(!t||i.who===t)&&(e=i);return e?this._lineState(e):null}sfx(t){const e=this.t,i=this.sfxList.find(s=>s.name.startsWith(t)&&e>=s.t0&&e<s.t1);return i?{...i,progress:Hn(i.t0,i.t1,e)}:null}musicState(t){const e=this.t,i=t?this.musicList.find(c=>c.id===t):this.musicList.find(c=>e>=c.t0&&e<c.t0+c.beats*60/c.bpm);if(!i)return null;const s=60/i.bpm,r=(e-i.t0)/s,a=Math.floor(r),o=r-a,l=i.beats*s;return{id:i.id,t0:i.t0,t1:i.t0+l,bpm:i.bpm,beats:i.beats,beat:r,n:a,phase:o,bar:Math.floor(a/4),pulse:r>=0?Math.exp(-o*4.5):0,progress:Hn(i.t0,i.t0+l,e),active:e>=i.t0&&e<i.t0+l}}shot(t,e={}){return this._frame.shot=this._req(t,e),this}closeup(t,e={}){return this.shot("closeup",{...e,who:t})}_req(t,e){const{push:i,since:s,...r}=e,a=t+JSON.stringify(Object.fromEntries(Object.entries(r).filter(([,o])=>typeof o!="number")));return{name:t,opts:r,key:a,push:i??0,since:s===void 0?void 0:this.at(s)}}camera(t){return this._frame.cam={...this._frame.cam??{},...t},this}puppet(t){const e=this._puppet(t),i=this,s=()=>{var r;return(r=i._frame.over)[t]??(r[t]={})};return{id:t,get name(){return e.name},get color(){return e.color},get look(){return e.look},get speaking(){return e.speaking},get screen(){return e.screen},place(r){var a;return Object.assign((a=s()).place??(a.place={}),r),this},lookAt(r){return s().look=r,this},nod(r){return s().nod=(s().nod??0)+r,this},tilt(r){return s().tilt=(s().tilt??0)+r,this},hide(){return s().hidden=!0,this},show(){return s().hidden=!1,this},bob(r=!0){return e.bobOff=!r,this},fx(r,a={}){return s().fx={kind:r,...a},this},shake(r=4){return s().shake=r,this},scaleTo(r){return s().scaleTo=r,this},prop(r){return s().prop={...s().prop??{},...r},this},dress(r){return e.dress(r),this}}}markOf(t){if(this._lastPlace[t])return this._lastPlace[t];if(t==="larry")return{...ee.desk,scale:1,look:"camera"};if(ee.band[t])return{...ee.band[t],scale:.92,look:"camera"};if(t==="sibyl")return{...ee.anncr,scale:.9,look:"camera"};const e=Math.max(0,this.guests.indexOf(t));return{...[ee.chair,...ee.couch][Math.min(2,e)],scale:1,look:"larry"}}chyron(t,e={}){const i=typeof t=="string"?{id:t}:t,s=this.at(e.from??0),r=e.to!==void 0?this.at(e.to):s+(e.dur??5);return this._frame.chyrons.push({spec:i,from:s,to:r,opts:e}),this}caption(t,e){return this._frame.caption=t===null?null:{text:t,who:e},this}sign(t="APPLAUSE",e=1){return this._frame.sign={text:t,level:e},this}rng(t=0){return Pi(Uo(`${this.id}:${t}`))}toScreen(t,e){const i=this.cam;return[(t-i.x)*i.zoom+640,(e-i.y)*i.zoom+360]}world(t,e){const i=this.cam;t.save(),t.translate(640-i.x*i.zoom,360-i.y*i.zoom),t.scale(i.zoom,i.zoom);try{e(t)}finally{t.restore()}}headOf(t){const e=this.puppets.get(t);if(!(e!=null&&e.screen)||!e.visible||!e.head)return null;const i=e.screen,s=e.head.mouth(),r=e.head.crown(),a=i.size/e.head.tile;return{x:i.x,y:i.y,size:i.size,mouth:[i.x-i.size/2+s[0]*a,i.y-i.size/2+s[1]*a],crown:[i.x-i.size/2+r.x*a,i.y-i.size/2+r.y*a]}}resetMotion(){var t;this.cut=!0,this._cur=null,this._trans=null;for(const e of this.cast){const i=this.puppets.get(e);i.az=NaN,(t=i.head)==null||t.resetMotion()}}frame(t,e,i={}){var o,l;this.t=t,this.dt=e,this.wall=t+1e3,this._frame=this._newFrame(),this.music=this.musicState(),this.beat=this.music?{phase:this.music.phase,n:this.music.n,pulse:this.music.pulse,bar:this.music.bar}:{phase:0,n:-1,pulse:0,bar:-1};let s=0,r=!1;for(const c of this.sfxList){if(!tv.test(c.name))continue;const h=Gr(t,c.t0,c.t1,.5)*(/^chuckle/i.test(c.name)?.55:1);h>s&&(s=h,r=/^(applause|cheer)/i.test(c.name))}this.laughing=s,this.signText=r?"APPLAUSE":"LAUGH";const a=this._declShot(t);a&&(this._frame.shot=a);try{(l=(o=this.module).direct)==null||l.call(o,t,this)}catch(c){this._warn(`direct() threw: ${(c==null?void 0:c.message)??c}`),console.error(c)}this._frame.sign&&(this.laughing=Math.max(this.laughing,this._frame.sign.level),this.signText=this._frame.sign.text),this._builtState(t),this._resolveLayout(t),this._updatePuppets(t,e,i),this._captionState(t)}_builtState(t){const e=this.module.built;if(!e){this.built=null,this.builtNow=null;return}let i=e.from??0,s=-1/0;for(const r of e.bumps??[]){const a=this.at(r);a<=t&&(i++,s=Math.max(s,a))}this.built=i,this.builtNow={n:i,age:t-s,seed:Math.floor(s*1e3),label:e.label}}get disclaimerNow(){const t=this.module.disclaimer;if(!t)return null;const e=typeof t=="string"?{text:t}:t,i=this.at(e.from??0),s=e.dur??6,r=Gr(this.t,i,i+s,.6);return r>0?{text:e.text,alpha:r}:null}_declShot(t){let e=null;for(const l of this._declShots){const c=this.at(l.at??0)+(l.after??0);c<=t&&(!e||c>=e.at)&&(e={...l,at:c})}if(!e)return null;const{at:i,after:s,shot:r,push:a,...o}=e;return this._req(r,{...o,push:a,since:i})}_evalShot(t){const e=_r[t.name];return e?e(this,t.opts):(this._warn(`unknown shot "${t.name}"`),_r.desk(this,{}))}_resolveLayout(t){const e=this._frame.shot??this._req(this.module.defaultShot??"desk",{});if(!this._cur||this._cur.key!==e.key){const a=e.push>0&&this._cur;this._trans=a?{from:this._cur,start:e.since??t,dur:e.push}:null,a||(this.cut=!0),this._cur=e}else this._cur={...e,since:this._cur.since};let i=this._evalShot(this._cur);if(this._trans){const a=(t-this._trans.start)/this._trans.dur;a>=1||a<0?this._trans=null:i=ev(this._evalShot(this._trans.from),i,$e.inOutCubic(a))}const s={...i.cam,...this._frame.cam??{}};this.module.drift!==!1&&(s.x+=7*je(t*.11,11)/s.zoom,s.y+=4*je(t*.09,12)/s.zoom,s.zoom*=1+.006*je(t*.07,13));const r={...i.place};for(const[a,o]of Object.entries(this._frame.over))o.place&&(r[a]={...r[a]??this.markOf(a),...o.place}),o.hidden===!0?delete r[a]:o.hidden===!1&&!r[a]&&(r[a]=this.markOf(a));this.layout=i,this.setNow={...i.set??{},...this.set},this.monitors=i.monitors??[],this.cam=s,this.place=r,this.panel=i.panel??null,this.audience=i.audience??0}_resolveAz(t,e,i){if(typeof e=="number")return e;if(e==="right")return xc;if(e==="left")return Sc;if(e==="camera"||e==null){const r=(i.x-this.cam.x)*this.cam.zoom,a=Math.abs(r)>40?Math.sign(r):i.camSide??-1;return Math.PI/2+a*(.36+.12*ie(Math.abs(r)/400,0,1))}const s=this.place[e];return s?s.x>=i.x?xc:Sc:Math.PI/2}_updatePuppets(t,e,i){var o,l;const s=this.cam,r=(o=this.music)!=null&&o.active?Math.floor(this.music.beat*4)%16:-1,a=this.cut;this.cut=!1;for(const c of this.puppets.values()){const h=this.place[c.id];if(!h){c.visible=!1,c.screen=null;continue}h.clip||(this._lastPlace[c.id]={x:h.x,y:h.y,scale:h.scale??1,look:h.look});const u=this._frame.over[c.id]??{},f=Uo(c.id)%997,d=(h.scale??1)*(c.look.scale??1)*(u.scaleTo??1),g=Cs*d*s.zoom,_=.5+.5*Math.sin(t*2*Math.PI/4.4+f),p=u.shake??0,m=(h.x-s.x)*s.zoom+640+(p?p*je(t*37,f+21):0),M=(h.y-s.y)*s.zoom+360-_*.006*g+(p?p*je(t*41,f+22):0),v=u.fx??h.fx??(c.look.fx?{kind:c.look.fx}:null);if(c.fx=v&&v.kind!=="none"?v:null,c.propParams=u.prop??null,c.place=h,c.screen={x:m,y:M,size:g},c.visible=m>-g&&m<1280+g&&M>-g&&M<720+g*1.2,c.breathe=_,!c.visible)continue;const E=u.look??h.look,R=.07*je(t*.31,f)+.04*je(t*1.1,f+5),S=this._resolveAz(c.id,E,h)+R;a||!Number.isFinite(c.az)?c.az=S:c.az+=(S-c.az)*(1-Math.exp(-e/.2)),c.sample(t,r),i.paused&&(c.tele=null);let w=(u.nod??0)+.025*je(t*.23,f+9);const k=(u.tilt??0)+.03*je(t*.17,f+3);(l=this.music)!=null&&l.active&&!c.bobOff&&(w-=.07*this.music.pulse),c.nod=w,c.tilt=k;const y=c.ensureHead(),T=ie(Math.sqrt(g/330),.72,1.35);y.aim(c.az,.13+(u.el??0),g,T),!(!i.full&&!c.tele&&g<200&&i.light&&(c.skip^=1))&&y.update(e,e,c.tele,c.artic,w,k)}}_captionState(t){const e=this._frame.caption;if(e===null)return this.captionNow=null;if(e){const o=e.who?this._puppet(e.who):null;return this.captionNow={who:e.who,name:(o==null?void 0:o.name)??"",color:(o==null?void 0:o.color)??x.white,text:e.text,words:null,word:-1,alpha:1}}let i=null;for(const o of this.lines)o.caption===!1||o.kind==="beat"||t>=o.t0-.05&&t<o.t1+.7&&(!i||o.t0>=i.t0)&&(i=o);if(!i)return this.captionNow=null;const s=this._puppet(i.who);let r=-1;if(i.words)for(let o=0;o<i.words.length;o++)t>=i.words[o][0]&&(r=o);const a=Math.min(Hr(i.t0-.05,i.t0+.1,t),1-Hr(i.t1+.4,i.t1+.7,t));this.captionNow={who:i.who,name:s.name,color:s.color,text:i.text,words:i.words,word:r,alpha:a,kind:i.kind,done:t>=i.t1}}}function ev(n,t,e){const i=Math.exp(Qn(Math.log(n.cam.zoom),Math.log(t.cam.zoom),e)),s={x:Qn(n.cam.x,t.cam.x,e),y:Qn(n.cam.y,t.cam.y,e),zoom:i},r={};for(const a of new Set([...Object.keys(n.place),...Object.keys(t.place)])){const o=n.place[a],l=t.place[a];if(o&&l){const c=Math.hypot(o.x-l.x,o.y-l.y)>300;r[a]=c?e<.5?o:l:{...l,x:Qn(o.x,l.x,e),y:Qn(o.y,l.y,e),scale:Qn(o.scale??1,l.scale??1,e)}}else r[a]=o??l}return{cam:s,place:r,audience:Qn(n.audience??0,t.audience??0,e),panel:e>.5?t.panel:n.panel}}class nv{constructor({muted:t=!1}={}){this.muted=t,this.ctx=null,this.gain=null,this.buffer=null,this.src=null,this.offset=0,this.startedAt=0,this.playing=!1,this.duration=0,this.audioLead=0,this.epoch=0,this.listeners=new Set,this.ended=!1}unlock(){if(!this.muted){if(!this.ctx)try{this.ctx=new AudioContext({latencyHint:"playback"}),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination),this.ctx.onstatechange=()=>{this.ctx.state!=="running"&&this.playing&&this.ctx.state!=="suspended"&&this.pause()}}catch(t){console.warn("audio: no AudioContext, running silent",t),this.muted=!0;return}this.ctx.resume().catch(()=>{})}}async decode(t){return this.muted||!this.ctx?null:await this.ctx.decodeAudioData(t.slice(0))}load({buffer:t=null,duration:e,audioLead:i=0}){this.stopSource(),this.buffer=this.muted?null:t,this.duration=e,this.audioLead=i,this.offset=0,this.playing=!1,this.ended=!1,this.epoch++,this.emit()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){for(const t of this.listeners)t()}get isPlaying(){return this.playing}play(){if(!this.playing){if(this.offset>=this.duration-.02){this.offset=this.duration,this.ended=!0,this.emit();return}this.ended=!1,this.ctx&&this.ctx.resume().catch(()=>{}),this.startSource(),this.playing=!0,this.emit()}}pause(){this.playing&&(this.offset=this.time(),this.stopSource(),this.playing=!1,this.emit())}toggle(){this.playing?this.pause():this.play()}seek(t){this.offset=Math.max(0,Math.min(this.duration,t)),this.epoch++,this.ended=!1,this.playing&&(this.stopSource(),this.startSource()),this.emit()}time(){if(!this.playing)return this.offset;const t=this.offset+Math.max(0,this.now()-this.startedAt);return t>=this.duration?(this.playing=!1,this.offset=this.duration,this.ended=!0,this.stopSource(),queueMicrotask(()=>this.emit()),this.duration):t}now(){if(!this.buffer||!this.ctx)return performance.now()/1e3;const t=this.ctx,e=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(e&&e.contextTime!==void 0&&e.performanceTime!==void 0&&e.contextTime>0){const i=e.contextTime+Math.max(0,(performance.now()-e.performanceTime)/1e3);return Math.min(i,t.currentTime)}return t.currentTime-(t.outputLatency||t.baseLatency||0)}startSource(){if(!this.buffer||!this.ctx){this.startedAt=this.now();return}const t=this.ctx,e=t.createBufferSource();e.buffer=this.buffer,e.connect(this.gain),this.src=e;const i=t.currentTime+.02;this.startedAt=i,e.start(i,this.offset+this.audioLead)}stopSource(){const t=this.src;if(this.src=null,!!t){try{t.stop()}catch{}t.disconnect()}}setVolume(t){this.gain&&(this.gain.gain.value=t)}}const iv={busker:{name:"The busker",title:"On the corner",body:{female:.25,child:.1},f0:140,rate:.95,accent:.18,source:{tension:.62,brightness:.5},pan:.5}},zv={larryCoat:{kind:"walkOvercoat",color:"#8c7f68",under:"#5d5446",shirt:"#d9ccb0",button:"#c9b48a",scarfColor:"#ffc861"},larryCardigan:{kind:"walkShawlCardigan",color:"#b9a98a",shirt:"#dfe6ee",button:"#8a6a3e",scarfColor:"#ffc861"},sibyl:{kind:"walkCollaredKnit",color:"#9fb7ff",trim:"#eef6f8"},hy:{kind:"walkOpenShirt",color:"#ff73cf",under:"#3a1d33",button:"#ffd0ee"},al:{kind:"walkJumper",color:"#58f0e8"},dee:{kind:"cardigan",color:"#b6ff5c",shirt:"#eef6f8",trim:"#eef6f8"},pete:{kind:"hoodie",color:"#ff9a5c",trim:"#ffe2cc",logo:!1},eppy:{kind:"walkQuarterZip",color:"#ff7a2e",zip:"#ffe2cc"}},sv={busker:{color:"#a98bff",costume:{kind:"walkBuskerCoat",color:"#8a7ab4",hat:"#7a6aa0",band:"#c9bcff",under:"#2e2840"}}},va={id:"003-holiday-2026",rundown:["walk"],plainCards:!0,credits:[{head:"Quoted",lines:["Pirkei Avot, chapter 2",'translated by Joseph I. Gorfinkle, "The Sayings of the Jewish Fathers", first published 1913',"The Havamal, stanza 47","translated by Henry Adams Bellows,",'"The Poetic Edda", 1923']},{head:"Told from",lines:["The Zhuangzi: the cook who carved the ox","The Tirukkural, chapter 9"]}]},Hh=n=>Object.fromEntries(Object.entries(n).map(([t,e])=>[t.split("/").at(-2),e])),Gh=Hh(Object.assign({"/../../episodes/003-holiday-2026/segments/walk/index.js":()=>Cc(()=>import("./index-Coakx3bS.js"),__vite__mapDeps([0,1,2]),import.meta.url)})),bc=Hh(Object.assign({"/../../episodes/003-holiday-2026/segments/walk/cues.json":()=>Cc(()=>import("./cues-CaB8oXIK.js"),[],import.meta.url).then(n=>n.default)})),rv={bot:{name:"A website bot",title:"Builds it",body:{female:.5,child:.4},f0:275,rate:1,accent:.06,source:{tension:.7,brightness:.6,breathiness:.02},pan:.45},norvid:{name:"norvid_studies",handle:"@norvid-studies.bsky.social",title:"Crow of claims",guest:!0,body:{female:.25,child:.15},f0:160,rate:1.2,accent:.1,source:{tension:.66,roughness:.5,fry:.2,brightness:.5},pan:-.25},abel:{name:"Abel",handle:"@abeliansoup.bsky.social",title:"Abeliancorp",guest:!0,body:{female:0,child:0},f0:92,rate:1.26,accent:.24,source:{breathiness:.55,tension:.35,brightness:.1},pan:-.5},samantha:{name:"Samantha",handle:"@samantha.wiki",title:"The Simcluster Channel",guest:!0,body:{female:1,child:.15},f0:228,rate:1.08,accent:.32,source:{breathiness:.08,brightness:.5},pan:-.2},borjev:{name:"BorJev",handle:"@borjev.bsky.social",title:"Abel's bot · opt-in only",guest:!0,body:{female:.1,child:.4},f0:178,rate:.95,accent:.05,source:{tension:.62,roughness:.6,brightness:.3,drift:40},pan:-.6}},ov={bot:["#5effc8",{kind:"terminal",color:"#5effc8",model:"WEBSITE-BOT",text:["> npm create site","> it builds!","> deploy: yes","> PARTY!"],holds:"popper"},{scale:.85}],norvid:["#9a6bff",{kind:"featherCoat",color:"#5a3d9e",trim:"#b98cff",holds:"clipboard",clipText:"LIST OF"}],abel:["#3fd17a",{kind:"cardigan",color:"#3fd17a",shirt:"#b6ff5c",trim:"#eef6f8"},{prop:"contraption"}],samantha:["#34e0ff",{kind:"blazer",color:"#34e0ff",shirt:"#eef6f8",trim:"#ffffff",holds:"clicker"}],borjev:["#c8956a",{kind:"terminal",color:"#c8956a",model:"BORJEV",text:["> opt-in only","> consent: y","> hello"]},{scale:.62}]},av=["bot"],lv={counterLabel:"BUILT DURING THIS EPISODE",keyLabel:"E"},Ec={"001-pilot":{cast:rv,looks:ov,house:av,stage:lv}},cv=Object.freeze({cast:Object.freeze({}),looks:Object.freeze({}),house:Object.freeze([]),stage:Object.freeze({})});function Vh(n){return Object.hasOwn(Ec,String(n))?Ec[n]:cv}function hv(n,t,e={}){return{...t,...Vh(n).cast,...e}}function uv(n,t,e){const{cast:i={},looks:s={}}=t??{},{CAST:r,LOOKS:a,look:o,defineLook:l,HOUSE_IDS:c,STAGE_TEXT:h}=e,u=Vh(n);Object.assign(r,hv(n,r,i));for(const[f,d]of Object.entries(u.looks))a[f]=o(...d);for(const[f,d]of Object.entries(s))l(f,d);if(c)for(const f of u.house)c.includes(f)||c.push(f);h&&Object.assign(h,u.stage??{})}uv(va.id,{cast:iv,looks:sv},{CAST:ni,LOOKS:is,look:En,defineLook:zh,HOUSE_IDS:kh,STAGE_TEXT:pa});const Qi=["phLen","orLen","velumPort","f0","voicing","pLung","outRms","noiseLevel","noiseNode","gate"];async function fv(n){const t=new DecompressionStream("gzip"),e=new Blob([n]).stream().pipeThrough(t);return await new Response(e).arrayBuffer()}async function dv(n){let t=new Uint8Array(n);t[0]===31&&t[1]===139&&(n=await fv(n),t=new Uint8Array(n));const e=String.fromCharCode(t[0],t[1],t[2],t[3]);if(e!=="LCT1")throw new Error(`telemetry: bad magic "${e}"`);const s=new DataView(n).getUint32(4,!0),r=new TextDecoder().decode(t.subarray(8,8+s)).replace(/[\s\0]+$/,""),a=JSON.parse(r),o=8+Math.ceil(s/4)*4,l=a.scalars||Qi;for(let h=0;h<Qi.length;h++)l[h]!==Qi[h]&&console.warn(`telemetry: scalar ${h} is "${l[h]}", expected "${Qi[h]}"`);const c=a.blocks.map((h,u)=>new pv(n,o+h.offset,h,a,u));return{fs:a.fs,hop:a.hop,blocks:c}}class pv{constructor(t,e,i,s,r){var m,M;const{frames:a,channels:o,nPh:l,nOr:c}=i;this.index=r,this.frames=a,this.channels=o,this.nPh=l,this.nOr=c,this.body={female:((m=i.body)==null?void 0:m.female)??0,child:((M=i.body)==null?void 0:M.child)??0},this.fs=s.fs,this.hop=s.hop,this.nArtic=s.nArtic,this.scope=s.scope,this.rate=this.fs/this.hop,this.duration=(a-1)*this.hop/this.fs;const h=l+c,u=Qi.length+this.nArtic+3*h+this.scope;if(u!==o)throw new Error(`telemetry block ${r}: ${o} channels, layout says ${u}`);const f=o*8,d=new Float32Array(t.slice(e,e+f)),g=new Uint16Array(t.slice(e+f,e+f+o*a*2)),_=new Float32Array(o*a);for(let v=0;v<o;v++){const E=d[2*v],R=d[2*v+1];let S=0;const w=v*a;for(let k=0;k<a;k++)S=S+g[w+k]&65535,_[w+k]=E+S*R}this.data=_;let p=Qi.length;this.oArtic=p,p+=this.nArtic,this.oPh=p,p+=l,this.oOr=p,p+=c,this.oP=p,p+=h,this.oFlow=p,p+=h,this.oGA=p}makeMessage(){const t=this.nPh+this.nOr;return{type:"telemetry",t:{phLen:0,orLen:0,velumPort:0,f0:0,voicing:0,pLung:0,outRms:0,noiseLevel:0,noiseNode:0,gate:0,clock:0,artic:new Float32Array(this.nArtic),phAreas:new Float32Array(this.nPh),orAreas:new Float32Array(this.nOr),pressureRms:new Float32Array(t),flow:new Float32Array(t),glottalArea:new Float32Array(this.scope),glottalFlow:new Float32Array(this.scope),active:[]},load:0,body:this.body,nPh:this.nPh,nOr:this.nOr,beatStep:-1,_layout:this}}frameAt(t){return t*this.fs/this.hop}fill(t,e,i=0){const s=this.frames;e>0||(e=0),e>s-1&&(e=s-1);const r=Math.floor(e),a=Math.min(s-1,r+1),o=e-r,l=1-o,c=this.data,h=d=>c[d*s+r]*l+c[d*s+a]*o,u=t.t;u.phLen=h(0),u.orLen=h(1),u.velumPort=h(2),u.f0=h(3),u.voicing=h(4),u.pLung=h(5),u.outRms=h(6),u.noiseLevel=h(7),u.noiseNode=c[8*s+(o<.5?r:a)],u.gate=h(9),u.clock=i;const f=(d,g)=>{for(let _=0;_<d.length;_++)d[_]=h(g+_)};return f(u.artic,this.oArtic),f(u.phAreas,this.oPh),f(u.orAreas,this.oOr),f(u.pressureRms,this.oP),f(u.flow,this.oFlow),f(u.glottalArea,this.oGA),t.body=this.body,t}articAt(t,e){const i=this.frames;t=Math.max(0,Math.min(i-1,t));const s=Math.floor(t),r=Math.min(i-1,s+1),a=t-s;for(let o=0;o<this.nArtic;o++){const l=(this.oArtic+o)*i;e[o]=this.data[l+s]*(1-a)+this.data[l+r]*a}return e}}async function mv(n){const t=await fetch(n);if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return dv(await t.arrayBuffer())}const gv=va.rundown,Tc=n=>new URL(n,document.baseURI).href,_v=()=>gv.slice(),Lo=n=>!!Gh[n],Ei=new Map;function Wh(n){const t=`meta:${n}`;return Ei.has(t)||Ei.set(t,(async()=>{const e=(await Gh[n]()).default??{};let i=e.cues??null;return!i&&bc[n]&&(i=await bc[n]()),i||console.info(`segment ${n}: no cues.json yet — it plays silent, with idle heads, for ${e.duration??30}s`),{id:n,module:{id:n,...e},cues:i}})()),Ei.get(t)}function Do(n,{audio:t=!0}={}){const e=`full:${n}:${t}`;if(!Ei.has(e)){const i=(async()=>{const s=await Wh(n),r=s.cues,[a,o]=await Promise.all([r!=null&&r.tele?mv(Tc(r.tele)).catch(l=>(console.warn(`segment ${n}: telemetry failed to load (${l.message}); heads will idle`),null)):null,t&&(r!=null&&r.audio)?fetch(Tc(r.audio)).then(l=>l.ok?l.arrayBuffer():Promise.reject(new Error(`HTTP ${l.status}`))).catch(l=>(console.warn(`segment ${n}: audio failed to load (${l.message}); playing silent`),null)):null]);return{...s,tele:a,bytes:o}})();i.catch(()=>Ei.delete(e)),Ei.set(e,i)}return Ei.get(e)}function vv(n,t){if(typeof(n==null?void 0:n.audioLead)=="number")return n.audioLead;if(!t||!(n!=null&&n.duration))return 0;const e=t.duration-n.duration;return e>.004?Math.min(e,1105/t.sampleRate):0}function wc(n,t){var i;const e=(i=n[t])==null?void 0:i.plays;return e&&e!==t&&n[e]?e:null}function Mv(n,t=null,e={}){const i=t?new Set([...t].map(o=>wc(n,o)??o)):null,s=Object.entries(n).filter(([o])=>!wc(n,o)&&(!i||i.has(o))),r=[{head:"The Late Cluster"},["with","Larry Nx"],""];r.push({head:"Starring"});for(const[,o]of s)o.guest||r.push([o.title??"",o.name]);const a=s.filter(([,o])=>o.guest);if(a.length){r.push("",{head:"Puppets played the"},{head:"posting personas of"});for(const[,o]of a)r.push(o.handle?[o.name,o.handle]:["",o.name])}for(const o of Ma(e.extra))r.push("",{head:o.head},...o.lines);return r.push("",{head:"Voices & faces"},"Every voice in this programme","is synthesized by CHIMERA.",""),r.push(["physical models","CHIMERA vocal synth"],["by","jamesondh · MIT"],["github.com","jamesondh/chimera-vocal-synth"]),e.plain?a.length&&r.push("","Guests are puppets","playing posting personas."):r.push("","Guests are puppets","playing posting personas.","",{head:"Good night, Bluesky"}),r}function Ma(n){return Array.isArray(n)?n.filter(t=>t&&typeof t.head=="string"&&t.head.trim()&&Array.isArray(t.lines)).map(t=>({head:t.head,lines:t.lines.filter(e=>typeof e=="string"&&e.trim())})).filter(t=>t.lines.length):[]}function yv(n){return{plain:(n==null?void 0:n.plainCards)===!0,extra:Ma(n==null?void 0:n.credits)}}function xv(n,t){const e=String(n);if(t(e))return[e];const i=[];for(const o of e.split(" "))o==="·"&&i.length?i[i.length-1]+=" ·":i.push(o);const s=[];let r=[];const a=o=>o.join(" ");for(const o of i)for(r.push(o);r.length>1&&!t(a(r));){let l=-1;for(let c=r.length-2;c>=0;c--)if(/[,·]$/.test(r[c])){l=c;break}l<0&&(l=r.length-2),s.push(a(r.slice(0,l+1))),r=r.slice(l+1)}return r.length&&s.push(a(r)),s}function Qo(n,t=34){return n.reduce((e,i)=>e+(i!=null&&i.head?t*1.5:t),0)}function Sv(n,{h:t,seconds:e,delay:i,tail:s,minUp:r=4}){const a=Math.min((n+t)/(e-i-s),t/r);return{speed:a,seconds:Math.max(e,i+(n+t)/a+s)}}function bv(n,t){return{id:"production",title:n,duration:2.6,cast:[],drift:!0,direct(e,i){i.shot("wide",{band:!1}),i.set.dim=.7,i.onAir=!1},drawFront(e,i,s){const r=Math.min($e.outCubic(ie(i/.4)),1-ie((i-2.2)/.4));e.save(),e.globalAlpha=.88*r,e.fillStyle="#000",e.fillRect(0,0,1280,720),e.restore(),xe(e,360,250,560,200,{color:x.amber,cut:12,width:1.6,alpha:r}),xt(e,`SEGMENT ${String(t).padStart(2,"0")}`,640,300,{size:14,align:"center",color:x.sky,ls:.5,alpha:r}),xt(e,String(n).toUpperCase(),640,350,{size:30,align:"center",color:x.white,ls:.2,weight:"m",alpha:r}),xt(e,"IN PRODUCTION",640,400,{size:16,align:"center",color:x.amber,ls:.45,alpha:r*(.6+.4*Math.sin(i*5))}),bs(e,880,262,{scale:.5,perched:!0,facing:-1,alpha:r})}}}function $h(n=null,t={}){return Mv(ni,n,t)}function Ev(n="title"){return{id:n,title:"The Late Cluster",duration:1e9,cast:[],direct(t,e){e.shot("wide",{band:!1}),e.onAir=!1},drawFront(t){t.fillStyle="#000",t.fillRect(0,0,1280,720)}}}function Tv(n=null,t={}){return t.plain?Av(n,t.extra):Cv(n,t.extra)}const wv=Object.freeze({x:160,y:60,w:960,h:540,scale:1.3,delay:1,tail:1,seconds:20,minUp:4});function ta(n,t,e,i=1){const s=r=>he(n,r.toUpperCase(),{size:18*i,ls:.2})<=e;return t.flatMap(r=>typeof r=="string"&&r?xv(r,s):[r])}function Av(n,t){const e=$h(n,{plain:!0,extra:t}),i=wv;let s=null,r=null;const a=o=>{s||(s=ta(o,e,i.w-60,i.scale),r=Sv(Qo(s,34*i.scale),i))};return{id:"end",title:"Credits",duration:1e9,cast:[],seconds(o){return a(o),r.seconds},direct(o,l){l.shot("wide",{band:!1}),l.onAir=!1},drawFront(o,l){o.fillStyle="#000",o.fillRect(0,0,1280,720),a(o),fa(o,s,Math.max(0,l-i.delay),{rect:i,speed:r.speed,split:.5,scale:i.scale})}}}function Cv(n,t){const e=$h(n,{extra:t});let i=Ma(t).length?null:e;const s={x:370,y:300,w:560,h:270},r=34;return{id:"end",title:"Good night",duration:1e9,cast:["larry","hy","al","pete","dee"],seconds(a){return i??(i=ta(a,e,s.w-40)),1+(Qo(i)+s.h)/r},direct(a,o){o.shot("wide"),o.onAir=!1,o.set.dim=.55,o.music={active:!0,beat:a*2,n:Math.floor(a*2),phase:a*2%1,pulse:Math.exp(-(a*2%1)*4.5),bar:Math.floor(a/2)},o.puppet("larry").nod(.05*Math.sin(a*2))},drawFront(a,o,l){const c=$e.outCubic(ie(Hn(.2,1.4,o)));G1(a,640,200,.62,{t:o,align:"center",alpha:c}),a.save(),a.globalAlpha=.75*c,a.fillStyle="#000",a.fillRect(s.x,s.y,s.w,s.h),a.restore(),i??(i=ta(a,e,s.w-40));const h=Qo(i)+s.h;fa(a,i,Math.max(0,o-1)*r%h/r,{rect:s,speed:r,split:.44})}}}const Rv={play:'<path d="M7 4.5 L17 10 L7 15.5 Z"/>',pause:'<path d="M6.5 4.5 V15.5 M13.5 4.5 V15.5"/>',restart:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',prev:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',next:'<path d="M15 4.5 V15.5"/><path d="M4.5 4.5 L12.5 10 L4.5 15.5 Z"/>',list:'<path d="M4 6 H16 M4 10 H16 M4 14 H16"/>',cc:'<rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M8.6 8.2 A2 2 0 1 0 8.6 11.8 M14.2 8.2 A2 2 0 1 0 14.2 11.8"/>',full:'<path d="M3.5 8 V3.5 H8 M12 3.5 H16.5 V8 M16.5 12 V16.5 H12 M8 16.5 H3.5 V12"/>'},mi=n=>`<svg viewBox="0 0 20 20" aria-hidden="true">${Rv[n]}</svg>`,Ac=n=>(n=Math.max(0,n),`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,"0")}`);function Pv(n,t){n.innerHTML=`
    <button class="ic" data-k="play" title="Play / pause (space)" aria-label="Play">${mi("play")}</button>
    <button class="ic" data-k="restart" title="Restart segment" aria-label="Restart segment">${mi("restart")}</button>
    <button class="ic" data-k="next" title="Next segment (n)" aria-label="Next segment">${mi("next")}</button>
    <div class="seek" role="slider" tabindex="0" aria-label="Position in segment" aria-valuemin="0">
      <div class="seek-title"></div>
      <div class="seek-track"><div class="seek-fill"></div><div class="seek-marks"></div></div>
    </div>
    <span class="time">0:00 / 0:00</span>
    <div class="chap-wrap">
      <button class="ic" data-k="list" title="Segments" aria-label="Segments" aria-expanded="false">${mi("list")}</button>
      <ol class="chapters" hidden></ol>
    </div>
    <button class="ic on" data-k="cc" title="Captions (c)" aria-label="Captions" aria-pressed="true">${mi("cc")}</button>
    <button class="ic" data-k="full" title="Fullscreen (f)" aria-label="Fullscreen">${mi("full")}</button>`;const e=M=>n.querySelector(M),i=e("[data-k=play]"),s=e("[data-k=cc]"),r=e("[data-k=list]"),a=e(".seek"),o=e(".seek-fill"),l=e(".seek-title"),c=e(".time"),h=e(".seek-marks"),u=e(".chapters");i.onclick=()=>t.toggle(),e("[data-k=restart]").onclick=()=>t.restart(),e("[data-k=next]").onclick=()=>t.next(),s.onclick=()=>t.captions(),e("[data-k=full]").onclick=()=>t.fullscreen(),r.onclick=M=>{M.stopPropagation(),u.hidden=!u.hidden,r.setAttribute("aria-expanded",String(!u.hidden))},document.addEventListener("click",M=>{!u.hidden&&!n.contains(M.target)&&(u.hidden=!0,r.setAttribute("aria-expanded","false"))});let f=0,d=0;const g=M=>{const v=a.querySelector(".seek-track").getBoundingClientRect(),E=Math.min(1,Math.max(0,(M.clientX-v.left)/v.width));t.seek(d+E*(f-d))};let _=!1;a.addEventListener("pointerdown",M=>{_=!0,a.setPointerCapture(M.pointerId),g(M)}),a.addEventListener("pointermove",M=>_&&g(M)),a.addEventListener("pointerup",()=>_=!1),a.addEventListener("keydown",M=>{(M.key==="ArrowLeft"||M.key==="ArrowRight")&&(M.stopPropagation(),t.seekBy(M.key==="ArrowLeft"?-5:5))});let p="",m=null;return{update(M){M.playing!==m&&(m=M.playing,i.innerHTML=mi(M.playing?"pause":"play"),i.setAttribute("aria-label",M.playing?"Pause":"Play")),s.classList.toggle("on",M.captions),s.setAttribute("aria-pressed",String(M.captions)),f=M.duration,d=M.start;const v=f>d?(M.t-d)/(f-d):0;o.style.width=`${(Math.max(0,Math.min(1,v))*100).toFixed(2)}%`,l.textContent=M.title??"",c.textContent=`${Ac(M.t)} / ${Ac(f)}`,a.setAttribute("aria-valuemax",String(Math.round(f))),a.setAttribute("aria-valuenow",String(Math.round(M.t))),n.classList.toggle("disabled",!M.enabled);const E=JSON.stringify([M.segments,M.index,M.marks]);if(E!==p){p=E,u.innerHTML="",M.segments.forEach((R,S)=>{const w=document.createElement("li"),k=document.createElement("button");k.innerHTML=`<span class="n">${String(S+1).padStart(2,"0")}</span> ${R.title}`,S===M.index&&k.classList.add("cur"),k.onclick=()=>{u.hidden=!0,t.jump(S)},w.append(k),u.append(w)}),h.innerHTML="";for(const R of M.marks??[]){const S=document.createElement("i");S.style.left=`${((R-d)/(f-d)*100).toFixed(2)}%`,h.append(S)}}}}}function Lv({stage:n,makeShow:t,from:e=0,to:i,start:s=0,fps:r=30,every:a=2}){const o=t(),l={samples:new Map},c=1/r,h=Math.max(0,Math.round(s*r)),u=Math.round(i*r);for(let f=h;f<=u;f++){const d=f/r;o.frame(d,c,{light:!1,paused:!1}),d>=e-1e-9&&(f-h)%a===0&&n.draw(o,{captions:!0,probe:l})}return k1(Oh(n.captionScale),l.samples)}const Dv=.8;async function Uv(n){const t=document.getElementById("stage-wrap"),e=document.getElementById("stage"),i=document.getElementById("overlay"),s=new K1(e,t);if(n.capscale!=null){const U=L1(n.capscale);U==null?console.warn(`capscale=${n.capscale}: not a caption scale (0.5 to 3); using 1`):s.captionScale=U}const r=new Map,a=_v();n.seg&&Lo(n.seg)&&!a.includes(n.seg)&&a.unshift(n.seg);const o=a.map(U=>Lo(U)),l=await Promise.all(a.map((U,st)=>o[st]?Wh(U).catch(V=>(console.error(V),null)):null)),c=U=>U.replace(/[-_]+/g," ").replace(/\b\w/g,st=>st.toUpperCase()),h=l.map((U,st)=>{var V;return(U==null?void 0:U.module.title)??((V=U==null?void 0:U.cues)==null?void 0:V.title)??c(a[st])});for(const[U,st]of a.entries())l[U]||console.info(`rundown: ${st} is in production (no segments/${st}/index.js yet) — skipped in playback`);const u=a.map((U,st)=>!!l[st]);h.filter((U,st)=>u[st]);const f=new Set(l.flatMap(U=>{var st;return U?[...(((st=U.cues)==null?void 0:st.lines)??[]).flatMap(V=>V.who),...U.module.cast??[],...U.module.guests??[]]:[]})),d=new nv({muted:!!n.mute});window.__lc={stage:s,transport:d,puppets:r,get show(){return g.show},get state(){return{mode:g.mode,index:g.index,t:g.show?g.t:0,playing:d.isPlaying,wantPlay:g.wantPlay}}};const g={mode:"title",index:0,show:null,t:0,captions:n.captions!=="0",token:0,epoch:-1,loadingMsg:"",loadingSince:0,wantPlay:!0},{plain:_,extra:p}=yv(va),m=u.indexOf(!0),M=()=>new ji({module:Ev("title"),cues:null,tele:null,puppets:r}),v=()=>new ji({module:Tv(f,{plain:_,extra:p}),cues:null,tele:null,puppets:r});window.__lc.makeEnd=v;const E=U=>new ji({module:bv(h[U],U+1),cues:null,tele:null,puppets:r});if(n.freeze){const U=n.seg??"title",st=U==="title"&&_&&m>=0?a[m]:U,V=Number(n.t??0);let et;if(st==="title")et=M();else if(st==="end")et=v();else if(!Lo(st))et=E(Math.max(0,a.indexOf(st)));else{const z=await Do(st,{audio:!1}),X=()=>{var F,Et;const ot=new ji({module:z.module,cues:z.cues,tele:z.tele,puppets:r});try{(Et=(F=z.module).setup)==null||Et.call(F,ot)}catch(vt){console.error(vt)}return ot},K=s.captionScale!==1?Nv(z.cues,V):null,nt=K?Lv({stage:s,makeShow:X,from:K.t0-.05,to:K.t1+.7,start:Math.max(0,K.t0-2.5)}):null;et=X(),nt&&(et.captionPlan=nt)}const rt=1/60,B=Math.max(0,V-2.5);for(let z=B;z<V-1e-6;z+=rt)et.frame(z,rt,{full:!0});et.frame(V,rt,{full:!0}),s.draw(et,R()),await new Promise(z=>requestAnimationFrame(z)),s.draw(et,R()),window.__ready=!0,document.body.dataset.ready="1";return}function R(U={}){return{captions:g.captions,...U}}function S(){if(g.mode==="title"||g.mode==="end")return O();if(g.mode==="loading"){g.wantPlay=!g.wantPlay;return}g.mode==="play"&&(g.wantPlay=!d.isPlaying,d.toggle())}const w=Pv(document.getElementById("bar"),{toggle:S,restart:()=>g.mode==="play"&&(d.seek(0),g.wantPlay=!0,d.play()),next:()=>g.mode==="play"&&J(g.index+1),seek:U=>g.mode==="play"&&d.seek(U),seekBy:U=>g.mode==="play"&&d.seek(d.time()+U),jump:U=>g.mode==="title"||g.mode==="end"?O(U):J(U),captions:()=>g.captions=!g.captions,fullscreen:T});function k(U,st,V,et){const rt=document.createElement("button");return rt.className=`stage-btn ${st}`,rt.innerHTML=`<span>${U}</span>`,rt.style.left=`${et.x/1280*100}%`,rt.style.top=`${et.y/720*100}%`,rt.onclick=B=>{B.stopPropagation(),V()},i.append(rt),rt}function y(){const U=s.css;U&&Object.assign(i.style,{left:U.x+"px",top:U.y+"px",width:U.w+"px",height:U.h+"px",fontSize:`${U.w/1280*16}px`})}function T(){var st,V;const U=document.getElementById("app");document.fullscreenElement?(st=document.exitFullscreen)==null||st.call(document):(V=U.requestFullscreen)==null||V.call(U).catch(()=>{})}async function O(U=n.seg?Math.max(0,a.indexOf(n.seg)):u.indexOf(!0)>=0?u.indexOf(!0):0){if(d.unlock(),i.replaceChildren(),g.wantPlay=!0,!a.length)return I();await N(U)}function J(U){if(U<0&&(U=0),g.wantPlay=!0,U>=a.length)return I();N(U)}const tt=new Map;function L(U){if(!tt.has(U)){const st=(async()=>{const V=await Do(a[U],{audio:!d.muted});let et=null;if(V.bytes&&!d.muted)try{et=await d.decode(V.bytes)}catch(rt){console.warn(`segment ${a[U]}: audio would not decode (${rt.message}); playing silent`)}return{d:V,buffer:et}})();st.catch(()=>tt.delete(U)),tt.set(U,st)}return tt.get(U)}async function N(U){var V,et;const st=++g.token;if(d.pause(),g.index=U,g.mode="loading",g.loadingMsg=h[U],g.loadingSince=performance.now(),!u[U]){const rt=E(U);d.load({buffer:null,duration:2.6}),g.show=rt,g.mode="play",g.epoch=-1,g.wantPlay&&d.play();return}try{const{d:rt,buffer:B}=await L(U);if(st!==g.token)return;const z=new ji({module:rt.module,cues:rt.cues,tele:rt.tele,puppets:r});z.captions=g.captions;try{(et=(V=rt.module).setup)==null||et.call(V,z)}catch(X){console.error(X)}d.load({buffer:B,duration:z.duration,audioLead:vv(rt.cues,B)}),g.show=z,g.mode="play",g.epoch=-1,g.wantPlay&&d.play();for(const X of tt.keys())X!==U&&X!==U+1&&tt.delete(X);u[U+1]&&L(U+1).catch(()=>{})}catch(rt){if(console.error(rt),st!==g.token)return;g.loadingMsg=`COULD NOT LOAD ${h[U]}: ${rt.message}`,g.loadingSince=-1/0}}function I(){g.token++,d.pause(),g.mode="end",g.show=v(),g.t0=performance.now(),i.replaceChildren(),k("WATCH AGAIN","again",()=>O(),{x:640,y:640})}function W(){g.mode="title",g.show=M(),g.t0=performance.now()-2e3,i.replaceChildren(),k("START THE SHOW","start",()=>O(),{x:96,y:640}),m>=0&&q(m)}async function q(U){var V,et;const st=g.token;try{const rt=await Do(a[U],{audio:!1});if(g.mode!=="title"||st!==g.token)return;const B=new ji({module:rt.module,cues:rt.cues,tele:rt.tele,puppets:r});try{(et=(V=rt.module).setup)==null||et.call(V,B)}catch(z){console.error(z)}g.show=B,g.holdAt=0}catch(rt){console.error(rt)}}window.addEventListener("keydown",U=>{if(U.target instanceof HTMLInputElement||U.metaKey||U.ctrlKey||U.altKey)return;const st=U.key;if(st===" "||st==="k")U.preventDefault(),U.repeat||S();else if(st==="ArrowLeft"||st==="ArrowRight"){if(g.mode!=="play")return;U.preventDefault(),d.seek(d.time()+(st==="ArrowLeft"?-5:5))}else st==="n"?g.mode==="play"?J(g.index+1):g.mode==="title"&&O():st==="p"?g.mode==="play"?d.time()>3?d.seek(0):J(g.index-1):g.mode==="end"&&O(a.length-1):st==="c"?g.captions=!g.captions:st==="f"&&T()}),e.addEventListener("click",()=>g.mode==="play"&&S());let Y=performance.now();function at(U){requestAnimationFrame(at);const st=Math.min(.05,Math.max(.001,(U-Y)/1e3));Y=U;const V=performance.now();y();let et=g.show,rt=0,B={};g.mode==="play"?(rt=d.time(),d.epoch!==g.epoch&&(g.epoch=d.epoch,et.resetMotion()),d.ended&&(d.ended=!1,g.index+1<a.length?N(g.index+1):I())):g.mode==="loading"?(rt=g.t,U-g.loadingSince>Dv*1e3&&(B.overlay=z=>Iv(z,g.loadingMsg,U/1e3)),et||(et=g.show=M())):g.mode==="title"&&g.holdAt!=null?rt=g.holdAt:rt=(U-g.t0)/1e3,g.t=rt,et.captions=g.captions,et.frame(rt,st,{light:s.stats.ms>14,paused:g.mode==="play"&&!d.isPlaying||g.mode==="title"&&g.holdAt!=null}),s.draw(et,R(B)),s.budget(performance.now()-V),w.update({playing:g.mode==="play"?d.isPlaying:g.mode==="loading"&&g.wantPlay,t:g.mode==="play"?Math.max(0,rt):0,start:0,duration:g.mode==="play"?d.duration:0,title:g.mode==="play"||g.mode==="loading"?`${String(g.index+1).padStart(2,"0")} · ${h[g.index]}`:g.mode==="end"?"THAT’S THE SHOW":"THE LATE CLUSTER",index:g.mode==="play"?g.index:-1,segments:a.map((z,X)=>({id:z,title:h[X]+(u[X]?"":" · in production")})),captions:g.captions,enabled:!0,marks:[]})}n.autostart?(g.show=M(),g.t0=performance.now(),O()):W(),requestAnimationFrame(at)}function Iv(n,t,e){n.save(),n.globalAlpha=.85,n.fillStyle="#000",n.fillRect(390,300,500,110),n.restore(),xt(n,"COMING UP",640,336,{size:14,align:"center",color:x.sky,ls:.5}),xt(n,String(t??"").toUpperCase(),640,372,{size:24,align:"center",color:x.white,ls:.2});const i=Math.floor(e*3)%4;xt(n,"·".repeat(i+1),640,398,{size:22,align:"center",color:x.gold})}function Nv(n,t){let e=null;for(const i of(n==null?void 0:n.lines)??[])i.caption===!1||i.kind==="beat"||t>=i.t0-.05&&t<i.t1+.7&&(!e||i.t0>=e.t0)&&(e=i);return e}const Bv=Object.freeze(Object.defineProperty({__proto__:null,startApp:Uv},Symbol.toStringTag,{value:"Module"}));export{Cr as C,zv as O,x as P,Ov as S,Cs as T,Qt as W,Je as a,it as b,_e as c,fc as d,l1 as e,s1 as f,he as g,xt as h,Bv as i,G1 as l,an as m,Ct as o,Ln as r,Bt as s};
