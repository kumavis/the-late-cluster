const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-WP4gK3i7.js","./index-Be5Upjiw.js","./index-jV9Nx-rS.css","./index-CBLmfiNt.js","./index-Csf3Hoyi.js","./index-CqrVlHMg.js"])))=>i.map(i=>d[i]);
import{c as as,r as Li,a as se,n as $e,e as Ye,u as Gn,h as pr,b as Co,l as ti,s as Hr,t as Uh,w as Gr,p as Ih,_ as Ie}from"./index-Be5Upjiw.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yo="160",Nh=0,pa=1,Fh=2,pc=1,Oh=2,kn=3,ai=0,qe=1,Vn=2,si=0,ts=1,ma=2,ga=3,_a=4,mc=5,yi=100,zh=101,Bh=102,va=103,Po=104,kh=200,Hh=201,Gh=202,Vh=203,Lo=204,Do=205,Wh=206,$h=207,Xh=208,qh=209,Yh=210,jh=211,Zh=212,Kh=213,Jh=214,Qh=0,tu=1,eu=2,Mr=3,nu=4,iu=5,su=6,ru=7,gc=0,ou=1,au=2,ri=0,lu=1,cu=2,hu=3,uu=4,fu=5,du=6,_c=300,is=301,ss=302,Uo=303,Io=304,Lr=306,No=1e3,gn=1001,Fo=1002,Ge=1003,Ma=1004,Vr=1005,sn=1006,pu=1007,Ts=1008,oi=1009,mu=1010,gu=1011,jo=1012,vc=1013,ei=1014,ni=1015,ws=1016,Mc=1017,yc=1018,wi=1020,_u=1021,_n=1023,vu=1024,Mu=1025,Ai=1026,rs=1027,yu=1028,xc=1029,xu=1030,Sc=1031,bc=1033,Wr=33776,$r=33777,Xr=33778,qr=33779,ya=35840,xa=35841,Sa=35842,ba=35843,Ec=36196,Ea=37492,Ta=37496,wa=37808,Aa=37809,Ra=37810,Ca=37811,Pa=37812,La=37813,Da=37814,Ua=37815,Ia=37816,Na=37817,Fa=37818,Oa=37819,za=37820,Ba=37821,Yr=36492,ka=36494,Ha=36495,Su=36283,Ga=36284,Va=36285,Wa=36286,Tc=3e3,Ri=3001,bu=3200,Eu=3201,Tu=0,wu=1,on="",Pe="srgb",Pn="srgb-linear",Zo="display-p3",Dr="display-p3-linear",yr="linear",fe="srgb",xr="rec709",Sr="p3",Ui=7680,$a=519,Au=512,Ru=513,Cu=514,wc=515,Pu=516,Lu=517,Du=518,Uu=519,Oo=35044,Xa=35048,qa="300 es",zo=1035,$n=2e3,br=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ya=1234567;const ys=Math.PI/180,As=180/Math.PI;function qn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]).toLowerCase()}function Ne(n,t,e){return Math.max(t,Math.min(e,n))}function Ko(n,t){return(n%t+t)%t}function Iu(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Nu(n,t,e){return n!==t?(e-n)/(t-n):0}function xs(n,t,e){return(1-e)*n+e*t}function Fu(n,t,e,i){return xs(n,t,1-Math.exp(-e*i))}function Ou(n,t=1){return t-Math.abs(Ko(n,t*2)-t)}function zu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Bu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function ku(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Hu(n,t){return n+Math.random()*(t-n)}function Gu(n){return n*(.5-Math.random())}function Vu(n){n!==void 0&&(Ya=n);let t=Ya+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wu(n){return n*ys}function $u(n){return n*As}function Bo(n){return(n&n-1)===0&&n!==0}function Xu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Er(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function qu(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),f=r((t-i)/2),u=a((t-i)/2),p=r((i-t)/2),_=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*f,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*f,o*c);break;case"ZXZ":n.set(l*f,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function oe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Yu={DEG2RAD:ys,RAD2DEG:As,generateUUID:qn,clamp:Ne,euclideanModulo:Ko,mapLinear:Iu,inverseLerp:Nu,lerp:xs,damp:Fu,pingpong:Ou,smoothstep:zu,smootherstep:Bu,randInt:ku,randFloat:Hu,randFloatSpread:Gu,seededRandom:Vu,degToRad:Wu,radToDeg:$u,isPowerOfTwo:Bo,ceilPowerOfTwo:Xu,floorPowerOfTwo:Er,setQuaternionFromProperEuler:qu,normalize:oe,denormalize:wn};class re{constructor(t=0,e=0){re.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,i,s,r,a,o,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],p=i[5],_=i[8],g=s[0],d=s[3],m=s[6],M=s[1],v=s[4],b=s[7],P=s[2],E=s[5],A=s[8];return r[0]=a*g+o*M+l*P,r[3]=a*d+o*v+l*E,r[6]=a*m+o*b+l*A,r[1]=c*g+h*M+f*P,r[4]=c*d+h*v+f*E,r[7]=c*m+h*b+f*A,r[2]=u*g+p*M+_*P,r[5]=u*d+p*v+_*E,r[8]=u*m+p*b+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,p=c*r-a*l,_=e*f+i*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=f*g,t[1]=(s*c-h*i)*g,t[2]=(o*i-s*a)*g,t[3]=u*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=p*g,t[7]=(i*l-c*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(jr.makeScale(t,e)),this}rotate(t){return this.premultiply(jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Zt;function Ac(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Tr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ju(){const n=Tr("canvas");return n.style.display="block",n}const ja={};function Ss(n){n in ja||(ja[n]=!0,console.warn(n))}const Za=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ka=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ns={[Pn]:{transfer:yr,primaries:xr,toReference:n=>n,fromReference:n=>n},[Pe]:{transfer:fe,primaries:xr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Dr]:{transfer:yr,primaries:Sr,toReference:n=>n.applyMatrix3(Ka),fromReference:n=>n.applyMatrix3(Za)},[Zo]:{transfer:fe,primaries:Sr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Ka),fromReference:n=>n.applyMatrix3(Za).convertLinearToSRGB()}},Zu=new Set([Pn,Dr]),ae={enabled:!0,_workingColorSpace:Pn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Zu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Ns[t].toReference,s=Ns[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Ns[n].primaries},getTransfer:function(n){return n===on?yr:Ns[n].transfer}};function es(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class Rc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=Tr("canvas")),Ii.width=t.width,Ii.height=t.height;const i=Ii.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=es(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(es(e[i]/255)*255):e[i]=es(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ku=0;class Cc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=qn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Kr(s[a].image)):r.push(Kr(s[a]))}else r=Kr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Kr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Rc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ju=0;class Je extends ls{constructor(t=Je.DEFAULT_IMAGE,e=Je.DEFAULT_MAPPING,i=gn,s=gn,r=sn,a=Ts,o=_n,l=oi,c=Je.DEFAULT_ANISOTROPY,h=on){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=qn(),this.name="",this.source=new Cc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ri?Pe:on),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_c)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case No:t.x=t.x-Math.floor(t.x);break;case gn:t.x=t.x<0?0:1;break;case Fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case No:t.y=t.y-Math.floor(t.y);break;case gn:t.y=t.y<0?0:1;break;case Fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pe?Ri:Tc}set encoding(t){Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Ri?Pe:on}}Je.DEFAULT_IMAGE=null;Je.DEFAULT_MAPPING=_c;Je.DEFAULT_ANISOTROPY=1;class _e{constructor(t=0,e=0,i=0,s=1){_e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],p=l[5],_=l[9],g=l[2],d=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-g)<.01&&Math.abs(_-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+g)<.1&&Math.abs(_+d)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,b=(p+1)/2,P=(m+1)/2,E=(h+u)/4,A=(f+g)/4,z=(_+d)/4;return v>b&&v>P?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=E/i,r=A/i):b>P?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=E/s,r=z/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=A/r,s=z/r),this.set(i,s,r,e),this}let M=Math.sqrt((d-_)*(d-_)+(f-g)*(f-g)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(d-_)/M,this.y=(f-g)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qu extends ls{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);const s={width:t,height:e,depth:1};i.encoding!==void 0&&(Ss("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ri?Pe:on),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Je(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Cc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends Qu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Pc extends Je{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tf extends Je{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3];const u=r[a+0],p=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=u,t[e+1]=p,t[e+2]=_,t[e+3]=g;return}if(f!==g||l!==u||c!==p||h!==_){let d=1-o;const m=l*u+c*p+h*_+f*g,M=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const P=Math.sqrt(v),E=Math.atan2(P,m*M);d=Math.sin(d*E)/P,o=Math.sin(o*E)/P}const b=o*M;if(l=l*d+u*b,c=c*d+p*b,h=h*d+_*b,f=f*d+g*b,d===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=P,c*=P,h*=P,f*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],u=r[a+1],p=r[a+2],_=r[a+3];return t[e]=o*_+h*f+l*p-c*u,t[e+1]=l*_+h*u+c*f-o*p,t[e+2]=c*_+h*p+o*u-l*f,t[e+3]=h*_-o*f-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),u=l(i/2),p=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*p*_,this._y=c*p*f-u*h*_,this._z=c*h*_+u*p*f,this._w=c*h*f-u*p*_;break;case"YXZ":this._x=u*h*f+c*p*_,this._y=c*p*f-u*h*_,this._z=c*h*_-u*p*f,this._w=c*h*f+u*p*_;break;case"ZXY":this._x=u*h*f-c*p*_,this._y=c*p*f+u*h*_,this._z=c*h*_+u*p*f,this._w=c*h*f-u*p*_;break;case"ZYX":this._x=u*h*f-c*p*_,this._y=c*p*f+u*h*_,this._z=c*h*_-u*p*f,this._w=c*h*f+u*p*_;break;case"YZX":this._x=u*h*f+c*p*_,this._y=c*p*f+u*h*_,this._z=c*h*_-u*p*f,this._w=c*h*f-u*p*_;break;case"XZY":this._x=u*h*f-c*p*_,this._y=c*p*f-u*h*_,this._z=c*h*_+u*p*f,this._w=c*h*f+u*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*f+this._w*u,this._x=i*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,i=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ja.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ja.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jr.copy(this).projectOnVector(t),this.sub(Jr)}reflect(t){return this.sub(Jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new H,Ja=new cs;class ci{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fs.copy(i.boundingBox)),Fs.applyMatrix4(t.matrixWorld),this.union(Fs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),Os.subVectors(this.max,fs),Ni.subVectors(t.a,fs),Fi.subVectors(t.b,fs),Oi.subVectors(t.c,fs),jn.subVectors(Fi,Ni),Zn.subVectors(Oi,Fi),fi.subVectors(Ni,Oi);let e=[0,-jn.z,jn.y,0,-Zn.z,Zn.y,0,-fi.z,fi.y,jn.z,0,-jn.x,Zn.z,0,-Zn.x,fi.z,0,-fi.x,-jn.y,jn.x,0,-Zn.y,Zn.x,0,-fi.y,fi.x,0];return!Qr(e,Ni,Fi,Oi,Os)||(e=[1,0,0,0,1,0,0,0,1],!Qr(e,Ni,Fi,Oi,Os))?!1:(zs.crossVectors(jn,Zn),e=[zs.x,zs.y,zs.z],Qr(e,Ni,Fi,Oi,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const In=[new H,new H,new H,new H,new H,new H,new H,new H],hn=new H,Fs=new ci,Ni=new H,Fi=new H,Oi=new H,jn=new H,Zn=new H,fi=new H,fs=new H,Os=new H,zs=new H,di=new H;function Qr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){di.fromArray(n,r);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=i.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ef=new ci,ds=new H,to=new H;class Ps{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ef.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);const e=ds.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ds,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(to.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(to)),this.expandByPoint(ds.copy(t.center).sub(to))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Nn=new H,eo=new H,Bs=new H,Kn=new H,no=new H,ks=new H,io=new H;class nf{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){eo.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(eo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Bs),o=Kn.dot(this.direction),l=-Kn.dot(Bs),c=Kn.lengthSq(),h=Math.abs(1-a*a);let f,u,p,_;if(h>0)if(f=a*l-o,u=a*o-l,_=r*h,f>=0)if(u>=-_)if(u<=_){const g=1/h;f*=g,u*=g,p=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-_?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c):u<=_?(f=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(eo).addScaledVector(Bs,u),p}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const i=Nn.dot(this.direction),s=Nn.dot(Nn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,i,s,r){no.subVectors(e,t),ks.subVectors(i,t),io.crossVectors(no,ks);let a=this.direction.dot(io),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);const l=o*this.direction.dot(ks.crossVectors(Kn,ks));if(l<0)return null;const c=o*this.direction.dot(no.cross(Kn));if(c<0||l+c>a)return null;const h=-o*Kn.dot(io);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class we{constructor(t,e,i,s,r,a,o,l,c,h,f,u,p,_,g,d){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,f,u,p,_,g,d)}set(t,e,i,s,r,a,o,l,c,h,f,u,p,_,g,d){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=p,m[7]=_,m[11]=g,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),a=1/zi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,p=a*f,_=o*h,g=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=p+_*c,e[5]=u-g*c,e[9]=-o*l,e[2]=g-u*c,e[6]=_+p*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,p=l*f,_=c*h,g=c*f;e[0]=u+g*o,e[4]=_*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=p*o-_,e[6]=g+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,p=l*f,_=c*h,g=c*f;e[0]=u-g*o,e[4]=-a*f,e[8]=_+p*o,e[1]=p+_*o,e[5]=a*h,e[9]=g-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,p=a*f,_=o*h,g=o*f;e[0]=l*h,e[4]=_*c-p,e[8]=u*c+g,e[1]=l*f,e[5]=g*c+u,e[9]=p*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,p=a*c,_=o*l,g=o*c;e[0]=l*h,e[4]=g-u*f,e[8]=_*f+p,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*f+_,e[10]=u-g*f}else if(t.order==="XZY"){const u=a*l,p=a*c,_=o*l,g=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+g,e[5]=a*h,e[9]=p*f-_,e[2]=_*f-p,e[6]=o*h,e[10]=g*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sf,t,rf)}lookAt(t,e,i){const s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Jn.crossVectors(i,Ze),Jn.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Jn.crossVectors(i,Ze)),Jn.normalize(),Hs.crossVectors(Ze,Jn),s[0]=Jn.x,s[4]=Hs.x,s[8]=Ze.x,s[1]=Jn.y,s[5]=Hs.y,s[9]=Ze.y,s[2]=Jn.z,s[6]=Hs.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],p=i[13],_=i[2],g=i[6],d=i[10],m=i[14],M=i[3],v=i[7],b=i[11],P=i[15],E=s[0],A=s[4],z=s[8],y=s[12],T=s[1],O=s[5],K=s[9],nt=s[13],L=s[2],I=s[6],N=s[10],V=s[14],q=s[3],Y=s[7],D=s[11],X=s[15];return r[0]=a*E+o*T+l*L+c*q,r[4]=a*A+o*O+l*I+c*Y,r[8]=a*z+o*K+l*N+c*D,r[12]=a*y+o*nt+l*V+c*X,r[1]=h*E+f*T+u*L+p*q,r[5]=h*A+f*O+u*I+p*Y,r[9]=h*z+f*K+u*N+p*D,r[13]=h*y+f*nt+u*V+p*X,r[2]=_*E+g*T+d*L+m*q,r[6]=_*A+g*O+d*I+m*Y,r[10]=_*z+g*K+d*N+m*D,r[14]=_*y+g*nt+d*V+m*X,r[3]=M*E+v*T+b*L+P*q,r[7]=M*A+v*O+b*I+P*Y,r[11]=M*z+v*K+b*N+P*D,r[15]=M*y+v*nt+b*V+P*X,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],p=t[14],_=t[3],g=t[7],d=t[11],m=t[15];return _*(+r*l*f-s*c*f-r*o*u+i*c*u+s*o*p-i*l*p)+g*(+e*l*p-e*c*u+r*a*u-s*a*p+s*c*h-r*l*h)+d*(+e*c*f-e*o*p-r*a*f+i*a*p+r*o*h-i*c*h)+m*(-s*o*h-e*l*f+e*o*u+s*a*f-i*a*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],p=t[11],_=t[12],g=t[13],d=t[14],m=t[15],M=f*d*c-g*u*c+g*l*p-o*d*p-f*l*m+o*u*m,v=_*u*c-h*d*c-_*l*p+a*d*p+h*l*m-a*u*m,b=h*g*c-_*f*c+_*o*p-a*g*p-h*o*m+a*f*m,P=_*f*l-h*g*l-_*o*u+a*g*u+h*o*d-a*f*d,E=e*M+i*v+s*b+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=M*A,t[1]=(g*u*r-f*d*r-g*s*p+i*d*p+f*s*m-i*u*m)*A,t[2]=(o*d*r-g*l*r+g*s*c-i*d*c-o*s*m+i*l*m)*A,t[3]=(f*l*r-o*u*r-f*s*c+i*u*c+o*s*p-i*l*p)*A,t[4]=v*A,t[5]=(h*d*r-_*u*r+_*s*p-e*d*p-h*s*m+e*u*m)*A,t[6]=(_*l*r-a*d*r-_*s*c+e*d*c+a*s*m-e*l*m)*A,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*p+e*l*p)*A,t[8]=b*A,t[9]=(_*f*r-h*g*r-_*i*p+e*g*p+h*i*m-e*f*m)*A,t[10]=(a*g*r-_*o*r+_*i*c-e*g*c-a*i*m+e*o*m)*A,t[11]=(h*o*r-a*f*r-h*i*c+e*f*c+a*i*p-e*o*p)*A,t[12]=P*A,t[13]=(h*g*s-_*f*s+_*i*u-e*g*u-h*i*d+e*f*d)*A,t[14]=(_*o*s-a*g*s-_*i*l+e*g*l+a*i*d-e*o*d)*A,t[15]=(a*f*s-h*o*s+h*i*l-e*f*l-a*i*u+e*o*u)*A,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,p=r*h,_=r*f,g=a*h,d=a*f,m=o*f,M=l*c,v=l*h,b=l*f,P=i.x,E=i.y,A=i.z;return s[0]=(1-(g+m))*P,s[1]=(p+b)*P,s[2]=(_-v)*P,s[3]=0,s[4]=(p-b)*E,s[5]=(1-(u+m))*E,s[6]=(d+M)*E,s[7]=0,s[8]=(_+v)*A,s[9]=(d-M)*A,s[10]=(1-(u+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=zi.set(s[0],s[1],s[2]).length();const a=zi.set(s[4],s[5],s[6]).length(),o=zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);const c=1/r,h=1/a,f=1/o;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=f,un.elements[9]*=f,un.elements[10]*=f,e.setFromRotationMatrix(un),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=$n){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),u=(i+s)/(i-s);let p,_;if(o===$n)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===br)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=$n){const l=this.elements,c=1/(e-t),h=1/(i-s),f=1/(a-r),u=(e+t)*c,p=(i+s)*h;let _,g;if(o===$n)_=(a+r)*f,g=-2*f;else if(o===br)_=r*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const zi=new H,un=new we,sf=new H(0,0,0),rf=new H(1,1,1),Jn=new H,Hs=new H,Ze=new H,Qa=new we,tl=new cs;class Ls{constructor(t=0,e=0,i=0,s=Ls.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qa,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tl.setFromEuler(this),this.setFromQuaternion(tl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ls.DEFAULT_ORDER="XYZ";class Lc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let of=0;const el=new H,Bi=new cs,Fn=new we,Gs=new H,ps=new H,af=new H,lf=new cs,nl=new H(1,0,0),il=new H(0,1,0),sl=new H(0,0,1),cf={type:"added"},hf={type:"removed"};class Qe extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qe.DEFAULT_UP.clone();const t=new H,e=new Ls,i=new cs,s=new H(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new Zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=Qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(nl,t)}rotateY(t){return this.rotateOnAxis(il,t)}rotateZ(t){return this.rotateOnAxis(sl,t)}translateOnAxis(t,e){return el.copy(t).applyQuaternion(this.quaternion),this.position.add(el.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nl,t)}translateY(t){return this.translateOnAxis(il,t)}translateZ(t){return this.translateOnAxis(sl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Gs.copy(t):Gs.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(ps,Gs,this.up):Fn.lookAt(Gs,ps,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(cf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,t,af),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,lf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++){const r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Qe.DEFAULT_UP=new H(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new H,On=new H,so=new H,zn=new H,ki=new H,Hi=new H,rl=new H,ro=new H,oo=new H,ao=new H;let Vs=!1;class mn{constructor(t=new H,e=new H,i=new H){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){fn.subVectors(s,e),On.subVectors(i,e),so.subVectors(t,e);const a=fn.dot(fn),o=fn.dot(On),l=fn.dot(so),c=On.dot(On),h=On.dot(so),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*l-o*h)*u,_=(a*h-o*l)*u;return r.set(1-p-_,_,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getUV(t,e,i,s,r,a,o,l){return Vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vs=!0),this.getInterpolation(t,e,i,s,r,a,o,l)}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static isFrontFacing(t,e,i,s){return fn.subVectors(i,e),On.subVectors(t,e),fn.cross(On).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),fn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return Vs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vs=!0),mn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;ki.subVectors(s,i),Hi.subVectors(r,i),ro.subVectors(t,i);const l=ki.dot(ro),c=Hi.dot(ro);if(l<=0&&c<=0)return e.copy(i);oo.subVectors(t,s);const h=ki.dot(oo),f=Hi.dot(oo);if(h>=0&&f<=h)return e.copy(s);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(ki,a);ao.subVectors(t,r);const p=ki.dot(ao),_=Hi.dot(ao);if(_>=0&&p<=_)return e.copy(r);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(Hi,o);const d=h*_-p*f;if(d<=0&&f-h>=0&&p-_>=0)return rl.subVectors(r,s),o=(f-h)/(f-h+(p-_)),e.copy(s).addScaledVector(rl,o);const m=1/(d+g+u);return a=g*m,o=u*m,e.copy(i).addScaledVector(ki,a).addScaledVector(Hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function lo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ie{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=Ko(t,1),e=Ne(e,0,1),i=Ne(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=lo(a,r,t+1/3),this.g=lo(a,r,t),this.b=lo(a,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Pe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const i=Dc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return ae.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ne(Ue.r*255,0,255))*65536+Math.round(Ne(Ue.g*255,0,255))*256+Math.round(Ne(Ue.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Ue.copy(this),e);const i=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Pe){ae.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,i=Ue.g,s=Ue.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(Ws);const i=xs(Qn.h,Ws.h,e),s=xs(Qn.s,Ws.s,e),r=xs(Qn.l,Ws.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new ie;ie.NAMES=Dc;let uf=0;class Ur extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=ts,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lo,this.blendDst=Do,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Lo&&(i.blendSrc=this.blendSrc),this.blendDst!==Do&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Uc extends Ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new H,$s=new re;class vn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Oo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=wn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=oe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array),s=oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Oo&&(t.usage=this.usage),t}}class Ic extends vn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Nc extends vn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Cn extends vn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ff=0;const nn=new we,co=new Qe,Gi=new H,Ke=new ci,ms=new ci,Te=new H;class Yn extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ac(t)?Nc:Ic)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,i){return nn.makeTranslation(t,e,i),this.applyMatrix4(nn),this}scale(t,e,i){return nn.makeScale(t,e,i),this.applyMatrix4(nn),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Cn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){const i=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ke.min,ms.min),Ke.expandByPoint(Te),Te.addVectors(Ke.max,ms.max),Ke.expandByPoint(Te)):(Ke.expandByPoint(ms.min),Ke.expandByPoint(ms.max))}Ke.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(Gi.fromBufferAttribute(t,c),Te.add(Gi)),s=Math.max(s,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<o;T++)c[T]=new H,h[T]=new H;const f=new H,u=new H,p=new H,_=new re,g=new re,d=new re,m=new H,M=new H;function v(T,O,K){f.fromArray(s,T*3),u.fromArray(s,O*3),p.fromArray(s,K*3),_.fromArray(a,T*2),g.fromArray(a,O*2),d.fromArray(a,K*2),u.sub(f),p.sub(f),g.sub(_),d.sub(_);const nt=1/(g.x*d.y-d.x*g.y);isFinite(nt)&&(m.copy(u).multiplyScalar(d.y).addScaledVector(p,-g.y).multiplyScalar(nt),M.copy(p).multiplyScalar(g.x).addScaledVector(u,-d.x).multiplyScalar(nt),c[T].add(m),c[O].add(m),c[K].add(m),h[T].add(M),h[O].add(M),h[K].add(M))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let T=0,O=b.length;T<O;++T){const K=b[T],nt=K.start,L=K.count;for(let I=nt,N=nt+L;I<N;I+=3)v(i[I+0],i[I+1],i[I+2])}const P=new H,E=new H,A=new H,z=new H;function y(T){A.fromArray(r,T*3),z.copy(A);const O=c[T];P.copy(O),P.sub(A.multiplyScalar(A.dot(O))).normalize(),E.crossVectors(z,O);const nt=E.dot(h[T])<0?-1:1;l[T*4]=P.x,l[T*4+1]=P.y,l[T*4+2]=P.z,l[T*4+3]=nt}for(let T=0,O=b.length;T<O;++T){const K=b[T],nt=K.start,L=K.count;for(let I=nt,N=nt+L;I<N;I+=3)y(i[I+0]),y(i[I+1]),y(i[I+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new H,r=new H,a=new H,o=new H,l=new H,c=new H,h=new H,f=new H;if(t)for(let u=0,p=t.count;u<p;u+=3){const _=t.getX(u+0),g=t.getX(u+1),d=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,d),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,d),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let p=0,_=0;for(let g=0,d=l.length;g<d;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*h;for(let m=0;m<h;m++)u[_++]=c[p++]}return new vn(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Yn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],p=t(u,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ol=new we,pi=new nf,Xs=new Ps,al=new H,Vi=new H,Wi=new H,$i=new H,ho=new H,qs=new H,Ys=new re,js=new re,Zs=new re,ll=new H,cl=new H,hl=new H,Ks=new H,Js=new H;class Xn extends Qe{constructor(t=new Yn,e=new Uc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(ho.fromBufferAttribute(f,t),a?qs.addScaledVector(ho,h):qs.addScaledVector(ho.sub(e),h))}e.add(qs)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xs.copy(i.boundingSphere),Xs.applyMatrix4(r),pi.copy(t.ray).recast(t.near),!(Xs.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Xs,al)===null||pi.origin.distanceToSquared(al)>(t.far-t.near)**2))&&(ol.copy(r).invert(),pi.copy(t.ray).applyMatrix4(ol),!(i.boundingBox!==null&&pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,pi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=u.length;_<g;_++){const d=u[_],m=a[d.materialIndex],M=Math.max(d.start,p.start),v=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let b=M,P=v;b<P;b+=3){const E=o.getX(b),A=o.getX(b+1),z=o.getX(b+2);s=Qs(this,m,t,i,c,h,f,E,A,z),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let d=_,m=g;d<m;d+=3){const M=o.getX(d),v=o.getX(d+1),b=o.getX(d+2);s=Qs(this,a,t,i,c,h,f,M,v,b),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=u.length;_<g;_++){const d=u[_],m=a[d.materialIndex],M=Math.max(d.start,p.start),v=Math.min(l.count,Math.min(d.start+d.count,p.start+p.count));for(let b=M,P=v;b<P;b+=3){const E=b,A=b+1,z=b+2;s=Qs(this,m,t,i,c,h,f,E,A,z),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let d=_,m=g;d<m;d+=3){const M=d,v=d+1,b=d+2;s=Qs(this,a,t,i,c,h,f,M,v,b),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}}function df(n,t,e,i,s,r,a,o){let l;if(t.side===qe?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ai,o),l===null)return null;Js.copy(o),Js.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Js);return c<e.near||c>e.far?null:{distance:c,point:Js.clone(),object:n}}function Qs(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Vi),n.getVertexPosition(l,Wi),n.getVertexPosition(c,$i);const h=df(n,t,e,i,Vi,Wi,$i,Ks);if(h){s&&(Ys.fromBufferAttribute(s,o),js.fromBufferAttribute(s,l),Zs.fromBufferAttribute(s,c),h.uv=mn.getInterpolation(Ks,Vi,Wi,$i,Ys,js,Zs,new re)),r&&(Ys.fromBufferAttribute(r,o),js.fromBufferAttribute(r,l),Zs.fromBufferAttribute(r,c),h.uv1=mn.getInterpolation(Ks,Vi,Wi,$i,Ys,js,Zs,new re),h.uv2=h.uv1),a&&(ll.fromBufferAttribute(a,o),cl.fromBufferAttribute(a,l),hl.fromBufferAttribute(a,c),h.normal=mn.getInterpolation(Ks,Vi,Wi,$i,ll,cl,hl,new H),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new H,materialIndex:0};mn.getNormal(Vi,Wi,$i,f.normal),h.face=f}return h}class Ds extends Yn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,p=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Cn(c,3)),this.setAttribute("normal",new Cn(h,3)),this.setAttribute("uv",new Cn(f,2));function _(g,d,m,M,v,b,P,E,A,z,y){const T=b/A,O=P/z,K=b/2,nt=P/2,L=E/2,I=A+1,N=z+1;let V=0,q=0;const Y=new H;for(let D=0;D<N;D++){const X=D*O-nt;for(let ot=0;ot<I;ot++){const W=ot*T-K;Y[g]=W*M,Y[d]=X*v,Y[m]=L,c.push(Y.x,Y.y,Y.z),Y[g]=0,Y[d]=0,Y[m]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),f.push(ot/A),f.push(1-D/z),V+=1}}for(let D=0;D<z;D++)for(let X=0;X<A;X++){const ot=u+X+I*D,W=u+X+I*(D+1),Q=u+(X+1)+I*(D+1),ht=u+(X+1)+I*D;l.push(ot,W,ht),l.push(W,Q,ht),q+=6}o.addGroup(p,q,y),p+=q,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ds(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ke(n){const t={};for(let e=0;e<n.length;e++){const i=os(n[e]);for(const s in i)t[s]=i[s]}return t}function pf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Fc(n){return n.getRenderTarget()===null?n.outputColorSpace:ae.workingColorSpace}const Jo={clone:os,merge:ke};var mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends Ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mf,this.fragmentShader=gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=pf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Oc extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class rn extends Oc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=As*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return As*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ys*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Xi=-90,qi=1;class _f extends Qe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Xi,qi,t,e);s.layers=this.layers,this.add(s);const r=new rn(Xi,qi,t,e);r.layers=this.layers,this.add(r);const a=new rn(Xi,qi,t,e);a.layers=this.layers,this.add(a);const o=new rn(Xi,qi,t,e);o.layers=this.layers,this.add(o);const l=new rn(Xi,qi,t,e);l.layers=this.layers,this.add(l);const c=new rn(Xi,qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===$n)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===br)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class zc extends Je{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vf extends Pi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(Ss("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ri?Pe:on),this.texture=new zc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ds(5,5,5),r=new li({name:"CubemapFromEquirect",uniforms:os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qe,blending:si});r.uniforms.tEquirect.value=e;const a=new Xn(s,r),o=e.minFilter;return e.minFilter===Ts&&(e.minFilter=sn),new _f(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const uo=new H,Mf=new H,yf=new Zt;class _i{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=uo.subVectors(i,e).cross(Mf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(uo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||yf.getNormalMatrix(t),s=this.coplanarPoint(uo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new Ps,tr=new H;class Bc{constructor(t=new _i,e=new _i,i=new _i,s=new _i,r=new _i,a=new _i){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=$n){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],f=s[6],u=s[7],p=s[8],_=s[9],g=s[10],d=s[11],m=s[12],M=s[13],v=s[14],b=s[15];if(i[0].setComponents(l-r,u-c,d-p,b-m).normalize(),i[1].setComponents(l+r,u+c,d+p,b+m).normalize(),i[2].setComponents(l+a,u+h,d+_,b+M).normalize(),i[3].setComponents(l-a,u-h,d-_,b-M).normalize(),i[4].setComponents(l-o,u-f,d-g,b-v).normalize(),e===$n)i[5].setComponents(l+o,u+f,d+g,b+v).normalize();else if(e===br)i[5].setComponents(o,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(t){return mi.center.set(0,0,0),mi.radius=.7071067811865476,mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(tr.x=s.normal.x>0?t.max.x:t.min.x,tr.y=s.normal.y>0?t.max.y:t.min.y,tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kc(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function xf(n,t){const e=t.isWebGL2,i=new WeakMap;function s(c,h){const f=c.array,u=c.usage,p=f.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,f,u),c.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,f){const u=h.array,p=h._updateRange,_=h.updateRanges;if(n.bindBuffer(f,c),p.count===-1&&_.length===0&&n.bufferSubData(f,0,u),_.length!==0){for(let g=0,d=_.length;g<d;g++){const m=_[g];e?n.bufferSubData(f,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):n.bufferSubData(f,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}p.count!==-1&&(e?n.bufferSubData(f,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):n.bufferSubData(f,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,s(c,h));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(f.buffer,c,h),f.version=c.version}}return{get:a,remove:o,update:l}}class Qo extends Yn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=t/o,u=e/l,p=[],_=[],g=[],d=[];for(let m=0;m<h;m++){const M=m*u-a;for(let v=0;v<c;v++){const b=v*f-r;_.push(b,-M,0),g.push(0,0,1),d.push(v/o),d.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const v=M+c*m,b=M+c*(m+1),P=M+1+c*(m+1),E=M+1+c*m;p.push(v,b,E),p.push(b,P,E)}this.setIndex(p),this.setAttribute("position",new Cn(_,3)),this.setAttribute("normal",new Cn(g,3)),this.setAttribute("uv",new Cn(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qo(t.width,t.height,t.widthSegments,t.heightSegments)}}var Sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
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
#endif`,Ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rf=`#ifdef USE_AOMAP
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
#endif`,Cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pf=`#ifdef USE_BATCHING
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
#endif`,Lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,If=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nf=`#ifdef USE_IRIDESCENCE
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
#endif`,Ff=`#ifdef USE_BUMPMAP
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
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$f=`#define PI 3.141592653589793
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
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qf=`vec3 transformedNormal = objectNormal;
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
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qf=`
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
}`,td=`#ifdef USE_ENVMAP
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
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nd=`#ifdef USE_ENVMAP
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
#endif`,id=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
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
#endif`,rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ad=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ld=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cd=`#ifdef USE_GRADIENTMAP
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
}`,hd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
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
#endif`,md=`#ifdef USE_ENVMAP
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
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
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
#endif`,xd=`struct PhysicalMaterial {
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
}`,Sd=`
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
#endif`,bd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ld=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dd=`#if defined( USE_POINTS_UV )
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
#endif`,Ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Id=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fd=`#ifdef USE_MORPHNORMALS
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
#endif`,Od=`#ifdef USE_MORPHTARGETS
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
#endif`,zd=`#ifdef USE_MORPHTARGETS
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
#endif`,Bd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wd=`#ifdef USE_NORMALMAP
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
#endif`,$d=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,op=`float getShadowMask() {
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
}`,ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hp=`#ifdef USE_SKINNING
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
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
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
}`,Rp=`#if DEPTH_PACKING == 3200
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
}`,Cp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Op=`#define LAMBERT
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
}`,zp=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,kp=`#define MATCAP
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
}`,Hp=`#define NORMAL
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
}`,Gp=`#define NORMAL
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
}`,Vp=`#define PHONG
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
}`,Wp=`#define PHONG
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
}`,$p=`#define STANDARD
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define TOON
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
}`,Yp=`#define TOON
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
}`,jp=`uniform float size;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,Jp=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,tm=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:Sf,alphahash_pars_fragment:bf,alphamap_fragment:Ef,alphamap_pars_fragment:Tf,alphatest_fragment:wf,alphatest_pars_fragment:Af,aomap_fragment:Rf,aomap_pars_fragment:Cf,batching_pars_vertex:Pf,batching_vertex:Lf,begin_vertex:Df,beginnormal_vertex:Uf,bsdfs:If,iridescence_fragment:Nf,bumpmap_pars_fragment:Ff,clipping_planes_fragment:Of,clipping_planes_pars_fragment:zf,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:kf,color_fragment:Hf,color_pars_fragment:Gf,color_pars_vertex:Vf,color_vertex:Wf,common:$f,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:Yf,displacementmap_vertex:jf,emissivemap_fragment:Zf,emissivemap_pars_fragment:Kf,colorspace_fragment:Jf,colorspace_pars_fragment:Qf,envmap_fragment:td,envmap_common_pars_fragment:ed,envmap_pars_fragment:nd,envmap_pars_vertex:id,envmap_physical_pars_fragment:md,envmap_vertex:sd,fog_vertex:rd,fog_pars_vertex:od,fog_fragment:ad,fog_pars_fragment:ld,gradientmap_pars_fragment:cd,lightmap_fragment:hd,lightmap_pars_fragment:ud,lights_lambert_fragment:fd,lights_lambert_pars_fragment:dd,lights_pars_begin:pd,lights_toon_fragment:gd,lights_toon_pars_fragment:_d,lights_phong_fragment:vd,lights_phong_pars_fragment:Md,lights_physical_fragment:yd,lights_physical_pars_fragment:xd,lights_fragment_begin:Sd,lights_fragment_maps:bd,lights_fragment_end:Ed,logdepthbuf_fragment:Td,logdepthbuf_pars_fragment:wd,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:Rd,map_fragment:Cd,map_pars_fragment:Pd,map_particle_fragment:Ld,map_particle_pars_fragment:Dd,metalnessmap_fragment:Ud,metalnessmap_pars_fragment:Id,morphcolor_vertex:Nd,morphnormal_vertex:Fd,morphtarget_pars_vertex:Od,morphtarget_vertex:zd,normal_fragment_begin:Bd,normal_fragment_maps:kd,normal_pars_fragment:Hd,normal_pars_vertex:Gd,normal_vertex:Vd,normalmap_pars_fragment:Wd,clearcoat_normal_fragment_begin:$d,clearcoat_normal_fragment_maps:Xd,clearcoat_pars_fragment:qd,iridescence_pars_fragment:Yd,opaque_fragment:jd,packing:Zd,premultiplied_alpha_fragment:Kd,project_vertex:Jd,dithering_fragment:Qd,dithering_pars_fragment:tp,roughnessmap_fragment:ep,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:rp,shadowmask_pars_fragment:op,skinbase_vertex:ap,skinning_pars_vertex:lp,skinning_vertex:cp,skinnormal_vertex:hp,specularmap_fragment:up,specularmap_pars_fragment:fp,tonemapping_fragment:dp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:_p,uv_pars_vertex:vp,uv_vertex:Mp,worldpos_vertex:yp,background_vert:xp,background_frag:Sp,backgroundCube_vert:bp,backgroundCube_frag:Ep,cube_vert:Tp,cube_frag:wp,depth_vert:Ap,depth_frag:Rp,distanceRGBA_vert:Cp,distanceRGBA_frag:Pp,equirect_vert:Lp,equirect_frag:Dp,linedashed_vert:Up,linedashed_frag:Ip,meshbasic_vert:Np,meshbasic_frag:Fp,meshlambert_vert:Op,meshlambert_frag:zp,meshmatcap_vert:Bp,meshmatcap_frag:kp,meshnormal_vert:Hp,meshnormal_frag:Gp,meshphong_vert:Vp,meshphong_frag:Wp,meshphysical_vert:$p,meshphysical_frag:Xp,meshtoon_vert:qp,meshtoon_frag:Yp,points_vert:jp,points_frag:Zp,shadow_vert:Kp,shadow_frag:Jp,sprite_vert:Qp,sprite_frag:tm},ft={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Xe={basic:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ie(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:ke([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:ke([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new ie(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:ke([ft.points,ft.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:ke([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:ke([ft.common,ft.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:ke([ft.sprite,ft.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:ke([ft.common,ft.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:ke([ft.lights,ft.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Xe.physical={uniforms:ke([Xe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const er={r:0,b:0,g:0};function em(n,t,e,i,s,r,a){const o=new ie(0);let l=r===!0?0:1,c,h,f=null,u=0,p=null;function _(d,m){let M=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?g(o,l):v&&v.isColor&&(g(v,1),M=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Lr)?(h===void 0&&(h=new Xn(new Ds(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:os(Xe.backgroundCube.uniforms),vertexShader:Xe.backgroundCube.vertexShader,fragmentShader:Xe.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=ae.getTransfer(v.colorSpace)!==fe,(f!==v||u!==v.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,f=v,u=v.version,p=n.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Xn(new Qo(2,2),new li({name:"BackgroundMaterial",uniforms:os(Xe.background.uniforms),vertexShader:Xe.background.vertexShader,fragmentShader:Xe.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=ae.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||u!==v.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,u=v.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function g(d,m){d.getRGB(er,Fc(n)),i.buffers.color.setClear(er.r,er.g,er.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(d,m=1){o.set(d),l=m,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,g(o,l)},render:_}}function nm(n,t,e,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=d(null);let c=l,h=!1;function f(L,I,N,V,q){let Y=!1;if(a){const D=g(V,N,I);c!==D&&(c=D,p(c.object)),Y=m(L,V,N,q),Y&&M(L,V,N,q)}else{const D=I.wireframe===!0;(c.geometry!==V.id||c.program!==N.id||c.wireframe!==D)&&(c.geometry=V.id,c.program=N.id,c.wireframe=D,Y=!0)}q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,z(L,I,N,V),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function u(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(L){return i.isWebGL2?n.bindVertexArray(L):r.bindVertexArrayOES(L)}function _(L){return i.isWebGL2?n.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function g(L,I,N){const V=N.wireframe===!0;let q=o[L.id];q===void 0&&(q={},o[L.id]=q);let Y=q[I.id];Y===void 0&&(Y={},q[I.id]=Y);let D=Y[V];return D===void 0&&(D=d(u()),Y[V]=D),D}function d(L){const I=[],N=[],V=[];for(let q=0;q<s;q++)I[q]=0,N[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:V,object:L,attributes:{},index:null}}function m(L,I,N,V){const q=c.attributes,Y=I.attributes;let D=0;const X=N.getAttributes();for(const ot in X)if(X[ot].location>=0){const Q=q[ot];let ht=Y[ot];if(ht===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(ht=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(ht=L.instanceColor)),Q===void 0||Q.attribute!==ht||ht&&Q.data!==ht.data)return!0;D++}return c.attributesNum!==D||c.index!==V}function M(L,I,N,V){const q={},Y=I.attributes;let D=0;const X=N.getAttributes();for(const ot in X)if(X[ot].location>=0){let Q=Y[ot];Q===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor));const ht={};ht.attribute=Q,Q&&Q.data&&(ht.data=Q.data),q[ot]=ht,D++}c.attributes=q,c.attributesNum=D,c.index=V}function v(){const L=c.newAttributes;for(let I=0,N=L.length;I<N;I++)L[I]=0}function b(L){P(L,0)}function P(L,I){const N=c.newAttributes,V=c.enabledAttributes,q=c.attributeDivisors;N[L]=1,V[L]===0&&(n.enableVertexAttribArray(L),V[L]=1),q[L]!==I&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,I),q[L]=I)}function E(){const L=c.newAttributes,I=c.enabledAttributes;for(let N=0,V=I.length;N<V;N++)I[N]!==L[N]&&(n.disableVertexAttribArray(N),I[N]=0)}function A(L,I,N,V,q,Y,D){D===!0?n.vertexAttribIPointer(L,I,N,q,Y):n.vertexAttribPointer(L,I,N,V,q,Y)}function z(L,I,N,V){if(i.isWebGL2===!1&&(L.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const q=V.attributes,Y=N.getAttributes(),D=I.defaultAttributeValues;for(const X in Y){const ot=Y[X];if(ot.location>=0){let W=q[X];if(W===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(W=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(W=L.instanceColor)),W!==void 0){const Q=W.normalized,ht=W.itemSize,B=e.get(W);if(B===void 0)continue;const G=B.buffer,tt=B.type,et=B.bytesPerElement,st=i.isWebGL2===!0&&(tt===n.INT||tt===n.UNSIGNED_INT||W.gpuType===vc);if(W.isInterleavedBufferAttribute){const rt=W.data,F=rt.stride,wt=W.offset;if(rt.isInstancedInterleavedBuffer){for(let xt=0;xt<ot.locationSize;xt++)P(ot.location+xt,rt.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let xt=0;xt<ot.locationSize;xt++)b(ot.location+xt);n.bindBuffer(n.ARRAY_BUFFER,G);for(let xt=0;xt<ot.locationSize;xt++)A(ot.location+xt,ht/ot.locationSize,tt,Q,F*et,(wt+ht/ot.locationSize*xt)*et,st)}else{if(W.isInstancedBufferAttribute){for(let rt=0;rt<ot.locationSize;rt++)P(ot.location+rt,W.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let rt=0;rt<ot.locationSize;rt++)b(ot.location+rt);n.bindBuffer(n.ARRAY_BUFFER,G);for(let rt=0;rt<ot.locationSize;rt++)A(ot.location+rt,ht/ot.locationSize,tt,Q,ht*et,ht/ot.locationSize*rt*et,st)}}else if(D!==void 0){const Q=D[X];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(ot.location,Q);break;case 3:n.vertexAttrib3fv(ot.location,Q);break;case 4:n.vertexAttrib4fv(ot.location,Q);break;default:n.vertexAttrib1fv(ot.location,Q)}}}}E()}function y(){K();for(const L in o){const I=o[L];for(const N in I){const V=I[N];for(const q in V)_(V[q].object),delete V[q];delete I[N]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const I=o[L.id];for(const N in I){const V=I[N];for(const q in V)_(V[q].object),delete V[q];delete I[N]}delete o[L.id]}function O(L){for(const I in o){const N=o[I];if(N[L.id]===void 0)continue;const V=N[L.id];for(const q in V)_(V[q].object),delete V[q];delete N[L.id]}}function K(){nt(),h=!0,c!==l&&(c=l,p(c.object))}function nt(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:K,resetDefaultState:nt,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfProgram:O,initAttributes:v,enableAttribute:b,disableUnusedAttributes:E}}function im(n,t,e,i){const s=i.isWebGL2;let r;function a(h){r=h}function o(h,f){n.drawArrays(r,h,f),e.update(f,r,1)}function l(h,f,u){if(u===0)return;let p,_;if(s)p=n,_="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](r,h,f,u),e.update(f,r,u)}function c(h,f,u){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<u;_++)this.render(h[_],f[_]);else{p.multiDrawArraysWEBGL(r,h,0,f,0,u);let _=0;for(let g=0;g<u;g++)_+=f[g];e.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function sm(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,b=a||t.has("OES_texture_float"),P=v&&b,E=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:d,maxVaryings:m,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:P,maxSamples:E}}function rm(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new _i,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,p){const _=f.clippingPlanes,g=f.clipIntersection,d=f.clipShadows,m=n.get(f);if(!s||_===null||_.length===0||r&&!d)r?h(null):c();else{const M=r?0:i,v=M*4;let b=m.clippingState||null;l.value=b,b=h(_,u,v,p);for(let P=0;P!==v;++P)b[P]=e[P];m.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,p,_){const g=f!==null?f.length:0;let d=null;if(g!==0){if(d=l.value,_!==!0||d===null){const m=p+g*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(d===null||d.length<m)&&(d=new Float32Array(m));for(let v=0,b=p;v!==g;++v,b+=4)a.copy(f[v]).applyMatrix4(M,o),a.normal.toArray(d,b),d[b+3]=a.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,d}}function om(n){let t=new WeakMap;function e(a,o){return o===Uo?a.mapping=is:o===Io&&(a.mapping=ss),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Uo||o===Io)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new vf(l.height/2);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class am extends Oc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,ul=[.125,.215,.35,.446,.526,.582],xi=20,fo=new am,fl=new ie;let po=null,mo=0,go=0;const vi=(1+Math.sqrt(5))/2,Yi=1/vi,dl=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,vi,Yi),new H(0,vi,-Yi),new H(Yi,0,vi),new H(-Yi,0,vi),new H(vi,Yi,0),new H(-vi,Yi,0)];class pl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(po,mo,go),t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:ws,format:_n,colorSpace:Pn,depthBuffer:!1},s=ml(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ml(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lm(r)),this._blurMaterial=cm(r,t,e)}return s}_compileMaterial(t){const e=new Xn(this._lodPlanes[0],t);this._renderer.compile(e,fo)}_sceneToCubeUV(t,e,i,s){const o=new rn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(fl),h.toneMapping=ri,h.autoClear=!1;const p=new Uc({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),_=new Xn(new Ds,p);let g=!1;const d=t.background;d?d.isColor&&(p.color.copy(d),t.background=null,g=!0):(p.color.copy(fl),g=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const v=this._cubeSize;nr(s,M*v,m>2?v:0,v,v),h.setRenderTarget(s),g&&h.render(_,o),h.render(t,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=u,h.autoClear=f,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===is||t.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_l()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Xn(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;nr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,fo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=dl[(s-1)%dl.length];this._blur(t,s-1,s,r,a)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Xn(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*xi-1),g=r/_,d=isFinite(r)?1+Math.floor(h*g):xi;d>xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${xi}`);const m=[];let M=0;for(let A=0;A<xi;++A){const z=A/g,y=Math.exp(-z*z/2);m.push(y),A===0?M+=y:A<d&&(M+=2*y)}for(let A=0;A<m.length;A++)m[A]=m[A]/M;u.envMap.value=t.texture,u.samples.value=d,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:v}=this;u.dTheta.value=_,u.mipInt.value=v-i;const b=this._sizeLods[s],P=3*b*(s>v-Ki?s-v+Ki:0),E=4*(this._cubeSize-b);nr(e,P,E,3*b,2*b),l.setRenderTarget(e),l.render(f,fo)}}function lm(n){const t=[],e=[],i=[];let s=n;const r=n-Ki+1+ul.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ki?l=ul[a-n+Ki-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,_=6,g=3,d=2,m=1,M=new Float32Array(g*_*p),v=new Float32Array(d*_*p),b=new Float32Array(m*_*p);for(let E=0;E<p;E++){const A=E%3*2/3-1,z=E>2?0:-1,y=[A,z,0,A+2/3,z,0,A+2/3,z+1,0,A,z,0,A+2/3,z+1,0,A,z+1,0];M.set(y,g*_*E),v.set(u,d*_*E);const T=[E,E,E,E,E,E];b.set(T,m*_*E)}const P=new Yn;P.setAttribute("position",new vn(M,g)),P.setAttribute("uv",new vn(v,d)),P.setAttribute("faceIndex",new vn(b,m)),t.push(P),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function ml(n,t,e){const i=new Pi(n,t,e);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function cm(n,t,e){const i=new Float32Array(xi),s=new H(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ta(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function gl(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function _l(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function ta(){return`

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
	`}function hm(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Uo||l===Io,h=l===is||l===ss;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=t.get(o);return e===null&&(e=new pl(n)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),t.set(o,f),f.texture}else{if(t.has(o))return t.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||h&&f&&s(f)){e===null&&(e=new pl(n));const u=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function um(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function fm(n,t,e,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const _ in u.attributes)t.remove(u.attributes[_]);for(const _ in u.morphAttributes){const g=u.morphAttributes[_];for(let d=0,m=g.length;d<m;d++)t.remove(g[d])}u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(f){const u=f.attributes;for(const _ in u)t.update(u[_],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const g=p[_];for(let d=0,m=g.length;d<m;d++)t.update(g[d],n.ARRAY_BUFFER)}}function c(f){const u=[],p=f.index,_=f.attributes.position;let g=0;if(p!==null){const M=p.array;g=p.version;for(let v=0,b=M.length;v<b;v+=3){const P=M[v+0],E=M[v+1],A=M[v+2];u.push(P,E,E,A,A,P)}}else if(_!==void 0){const M=_.array;g=_.version;for(let v=0,b=M.length/3-1;v<b;v+=3){const P=v+0,E=v+1,A=v+2;u.push(P,E,E,A,A,P)}}else return;const d=new(Ac(u)?Nc:Ic)(u,1);d.version=g;const m=r.get(f);m&&t.remove(m),r.set(f,d)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function dm(n,t,e,i){const s=i.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,_){n.drawElements(r,_,o,p*l),e.update(_,r,1)}function f(p,_,g){if(g===0)return;let d,m;if(s)d=n,m="drawElementsInstanced";else if(d=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](r,_,o,p*l,g),e.update(_,r,g)}function u(p,_,g){if(g===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<g;m++)this.render(p[m]/l,_[m]);else{d.multiDrawElementsWEBGL(r,_,0,o,p,0,g);let m=0;for(let M=0;M<g;M++)m+=_[M];e.update(m,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=f,this.renderMultiDraw=u}function pm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function mm(n,t){return n[0]-t[0]}function gm(n,t){return Math.abs(t[1])-Math.abs(n[1])}function _m(n,t,e){const i={},s=new Float32Array(8),r=new WeakMap,a=new _e,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,f){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=p!==void 0?p.length:0;let g=r.get(h);if(g===void 0||g.count!==_){let L=function(){K.dispose(),r.delete(h),h.removeEventListener("dispose",L)};g!==void 0&&g.texture.dispose();const M=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,P=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let z=0;M===!0&&(z=1),v===!0&&(z=2),b===!0&&(z=3);let y=h.attributes.position.count*z,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const O=new Float32Array(y*T*4*_),K=new Pc(O,y,T,_);K.type=ni,K.needsUpdate=!0;const nt=z*4;for(let I=0;I<_;I++){const N=P[I],V=E[I],q=A[I],Y=y*T*4*I;for(let D=0;D<N.count;D++){const X=D*nt;M===!0&&(a.fromBufferAttribute(N,D),O[Y+X+0]=a.x,O[Y+X+1]=a.y,O[Y+X+2]=a.z,O[Y+X+3]=0),v===!0&&(a.fromBufferAttribute(V,D),O[Y+X+4]=a.x,O[Y+X+5]=a.y,O[Y+X+6]=a.z,O[Y+X+7]=0),b===!0&&(a.fromBufferAttribute(q,D),O[Y+X+8]=a.x,O[Y+X+9]=a.y,O[Y+X+10]=a.z,O[Y+X+11]=q.itemSize===4?a.w:1)}}g={count:_,texture:K,size:new re(y,T)},r.set(h,g),h.addEventListener("dispose",L)}let d=0;for(let M=0;M<u.length;M++)d+=u[M];const m=h.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",m),f.getUniforms().setValue(n,"morphTargetInfluences",u),f.getUniforms().setValue(n,"morphTargetsTexture",g.texture,e),f.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const p=u===void 0?0:u.length;let _=i[h.id];if(_===void 0||_.length!==p){_=[];for(let v=0;v<p;v++)_[v]=[v,0];i[h.id]=_}for(let v=0;v<p;v++){const b=_[v];b[0]=v,b[1]=u[v]}_.sort(gm);for(let v=0;v<8;v++)v<p&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(mm);const g=h.morphAttributes.position,d=h.morphAttributes.normal;let m=0;for(let v=0;v<8;v++){const b=o[v],P=b[0],E=b[1];P!==Number.MAX_SAFE_INTEGER&&E?(g&&h.getAttribute("morphTarget"+v)!==g[P]&&h.setAttribute("morphTarget"+v,g[P]),d&&h.getAttribute("morphNormal"+v)!==d[P]&&h.setAttribute("morphNormal"+v,d[P]),s[v]=E,m+=E):(g&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),d&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}const M=h.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",M),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function vm(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return f}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Hc extends Je{constructor(t,e,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:Ai,h!==Ai&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ai&&(i=ei),i===void 0&&h===rs&&(i=wi),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ge,this.minFilter=l!==void 0?l:Ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Gc=new Je,Vc=new Hc(1,1);Vc.compareFunction=wc;const Wc=new Pc,$c=new tf,Xc=new zc,vl=[],Ml=[],yl=new Float32Array(16),xl=new Float32Array(9),Sl=new Float32Array(4);function hs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=vl[s];if(r===void 0&&(r=new Float32Array(s),vl[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ye(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ir(n,t){let e=Ml[t];e===void 0&&(e=new Int32Array(t),Ml[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Mm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2fv(this.addr,t),xe(e,t)}}function xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;n.uniform3fv(this.addr,t),xe(e,t)}}function Sm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4fv(this.addr,t),xe(e,t)}}function bm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ye(e,i))return;Sl.set(i),n.uniformMatrix2fv(this.addr,!1,Sl),xe(e,i)}}function Em(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ye(e,i))return;xl.set(i),n.uniformMatrix3fv(this.addr,!1,xl),xe(e,i)}}function Tm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ye(e,i))return;yl.set(i),n.uniformMatrix4fv(this.addr,!1,yl),xe(e,i)}}function wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2iv(this.addr,t),xe(e,t)}}function Rm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3iv(this.addr,t),xe(e,t)}}function Cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4iv(this.addr,t),xe(e,t)}}function Pm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Lm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2uiv(this.addr,t),xe(e,t)}}function Dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3uiv(this.addr,t),xe(e,t)}}function Um(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4uiv(this.addr,t),xe(e,t)}}function Im(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Vc:Gc;e.setTexture2D(t||r,s)}function Nm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||$c,s)}function Fm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Xc,s)}function Om(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Wc,s)}function zm(n){switch(n){case 5126:return Mm;case 35664:return ym;case 35665:return xm;case 35666:return Sm;case 35674:return bm;case 35675:return Em;case 35676:return Tm;case 5124:case 35670:return wm;case 35667:case 35671:return Am;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Lm;case 36295:return Dm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Fm;case 36289:case 36303:case 36311:case 36292:return Om}}function Bm(n,t){n.uniform1fv(this.addr,t)}function km(n,t){const e=hs(t,this.size,2);n.uniform2fv(this.addr,e)}function Hm(n,t){const e=hs(t,this.size,3);n.uniform3fv(this.addr,e)}function Gm(n,t){const e=hs(t,this.size,4);n.uniform4fv(this.addr,e)}function Vm(n,t){const e=hs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Wm(n,t){const e=hs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $m(n,t){const e=hs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Xm(n,t){n.uniform1iv(this.addr,t)}function qm(n,t){n.uniform2iv(this.addr,t)}function Ym(n,t){n.uniform3iv(this.addr,t)}function jm(n,t){n.uniform4iv(this.addr,t)}function Zm(n,t){n.uniform1uiv(this.addr,t)}function Km(n,t){n.uniform2uiv(this.addr,t)}function Jm(n,t){n.uniform3uiv(this.addr,t)}function Qm(n,t){n.uniform4uiv(this.addr,t)}function t0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);ye(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Gc,r[a])}function e0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);ye(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$c,r[a])}function n0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);ye(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Xc,r[a])}function i0(n,t,e){const i=this.cache,s=t.length,r=Ir(e,s);ye(i,r)||(n.uniform1iv(this.addr,r),xe(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Wc,r[a])}function s0(n){switch(n){case 5126:return Bm;case 35664:return km;case 35665:return Hm;case 35666:return Gm;case 35674:return Vm;case 35675:return Wm;case 35676:return $m;case 5124:case 35670:return Xm;case 35667:case 35671:return qm;case 35668:case 35672:return Ym;case 35669:case 35673:return jm;case 5125:return Zm;case 36294:return Km;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}class r0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=zm(e.type)}}class o0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s0(e.type)}}class a0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const _o=/(\w+)(\])?(\[|\.)?/g;function bl(n,t){n.seq.push(t),n.map[t.id]=t}function l0(n,t,e){const i=n.name,s=i.length;for(_o.lastIndex=0;;){const r=_o.exec(i),a=_o.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){bl(e,c===void 0?new r0(o,n,t):new o0(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new a0(o),bl(e,f)),e=f}}}class mr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);l0(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function El(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const c0=37297;let h0=0;function u0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function f0(n){const t=ae.getPrimaries(ae.workingColorSpace),e=ae.getPrimaries(n);let i;switch(t===e?i="":t===Sr&&e===xr?i="LinearDisplayP3ToLinearSRGB":t===xr&&e===Sr&&(i="LinearSRGBToLinearDisplayP3"),n){case Pn:case Dr:return[i,"LinearTransferOETF"];case Pe:case Zo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Tl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+u0(n.getShaderSource(t),a)}else return s}function d0(n,t){const e=f0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function p0(n,t){let e;switch(t){case lu:e="Linear";break;case cu:e="Reinhard";break;case hu:e="OptimizedCineon";break;case uu:e="ACESFilmic";break;case du:e="AgX";break;case fu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function m0(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function g0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function _0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function v0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ji(n){return n!==""}function wl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Al(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const M0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ko(n){return n.replace(M0,x0)}const y0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function x0(n,t){let e=$t[t];if(e===void 0){const i=y0.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ko(e)}const S0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(n){return n.replace(S0,b0)}function b0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cl(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function E0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===pc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Oh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function T0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case Lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function w0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function A0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gc:t="ENVMAP_BLENDING_MULTIPLY";break;case ou:t="ENVMAP_BLENDING_MIX";break;case au:t="ENVMAP_BLENDING_ADD";break}return t}function R0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function C0(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=E0(e),c=T0(e),h=w0(e),f=A0(e),u=R0(e),p=e.isWebGL2?"":m0(e),_=g0(e),g=_0(r),d=s.createProgram();let m,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),M=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ji).join(`
`),M.length>0&&(M+=`
`)):(m=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),M=[p,Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?$t.tonemapping_pars_fragment:"",e.toneMapping!==ri?p0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,d0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),a=ko(a),a=wl(a,e),a=Al(a,e),o=ko(o),o=wl(o,e),o=Al(o,e),a=Rl(a),o=Rl(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const b=v+m+a,P=v+M+o,E=El(s,s.VERTEX_SHADER,b),A=El(s,s.FRAGMENT_SHADER,P);s.attachShader(d,E),s.attachShader(d,A),e.index0AttributeName!==void 0?s.bindAttribLocation(d,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(d,0,"position"),s.linkProgram(d);function z(K){if(n.debug.checkShaderErrors){const nt=s.getProgramInfoLog(d).trim(),L=s.getShaderInfoLog(E).trim(),I=s.getShaderInfoLog(A).trim();let N=!0,V=!0;if(s.getProgramParameter(d,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,d,E,A);else{const q=Tl(s,E,"vertex"),Y=Tl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(d,s.VALIDATE_STATUS)+`

Program Info Log: `+nt+`
`+q+`
`+Y)}else nt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",nt):(L===""||I==="")&&(V=!1);V&&(K.diagnostics={runnable:N,programLog:nt,vertexShader:{log:L,prefix:m},fragmentShader:{log:I,prefix:M}})}s.deleteShader(E),s.deleteShader(A),y=new mr(s,d),T=v0(s,d)}let y;this.getUniforms=function(){return y===void 0&&z(this),y};let T;this.getAttributes=function(){return T===void 0&&z(this),T};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(d,c0)),O},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(d),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=h0++,this.cacheKey=t,this.usedTimes=1,this.program=d,this.vertexShader=E,this.fragmentShader=A,this}let P0=0;class L0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new D0(t),e.set(t,i)),i}}class D0{constructor(t){this.id=P0++,this.code=t,this.usedTimes=0}}function U0(n,t,e,i,s,r,a){const o=new Lc,l=new L0,c=[],h=s.isWebGL2,f=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return y===0?"uv":`uv${y}`}function d(y,T,O,K,nt){const L=K.fog,I=nt.geometry,N=y.isMeshStandardMaterial?K.environment:null,V=(y.isMeshStandardMaterial?e:t).get(y.envMap||N),q=V&&V.mapping===Lr?V.image.height:null,Y=_[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const D=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,X=D!==void 0?D.length:0;let ot=0;I.morphAttributes.position!==void 0&&(ot=1),I.morphAttributes.normal!==void 0&&(ot=2),I.morphAttributes.color!==void 0&&(ot=3);let W,Q,ht,B;if(Y){const Oe=Xe[Y];W=Oe.vertexShader,Q=Oe.fragmentShader}else W=y.vertexShader,Q=y.fragmentShader,l.update(y),ht=l.getVertexShaderID(y),B=l.getFragmentShaderID(y);const G=n.getRenderTarget(),tt=nt.isInstancedMesh===!0,et=nt.isBatchedMesh===!0,st=!!y.map,rt=!!y.matcap,F=!!V,wt=!!y.aoMap,xt=!!y.lightMap,At=!!y.bumpMap,Mt=!!y.normalMap,Gt=!!y.displacementMap,Ut=!!y.emissiveMap,R=!!y.metalnessMap,S=!!y.roughnessMap,$=y.anisotropy>0,at=y.clearcoat>0,ct=y.iridescence>0,ut=y.sheen>0,Et=y.transmission>0,pt=$&&!!y.anisotropyMap,St=at&&!!y.clearcoatMap,Lt=at&&!!y.clearcoatNormalMap,kt=at&&!!y.clearcoatRoughnessMap,lt=ct&&!!y.iridescenceMap,ee=ct&&!!y.iridescenceThicknessMap,Xt=ut&&!!y.sheenColorMap,zt=ut&&!!y.sheenRoughnessMap,Pt=!!y.specularMap,bt=!!y.specularColorMap,Nt=!!y.specularIntensityMap,Jt=Et&&!!y.transmissionMap,ue=Et&&!!y.thicknessMap,Yt=!!y.gradientMap,dt=!!y.alphaMap,U=y.alphaTest>0,gt=!!y.alphaHash,_t=!!y.extensions,Ft=!!I.attributes.uv1,Dt=!!I.attributes.uv2,le=!!I.attributes.uv3;let ce=ri;return y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(ce=n.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:W,fragmentShader:Q,defines:y.defines,customVertexShaderID:ht,customFragmentShaderID:B,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:et,instancing:tt,instancingColor:tt&&nt.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:G===null?n.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Pn,map:st,matcap:rt,envMap:F,envMapMode:F&&V.mapping,envMapCubeUVHeight:q,aoMap:wt,lightMap:xt,bumpMap:At,normalMap:Mt,displacementMap:u&&Gt,emissiveMap:Ut,normalMapObjectSpace:Mt&&y.normalMapType===wu,normalMapTangentSpace:Mt&&y.normalMapType===Tu,metalnessMap:R,roughnessMap:S,anisotropy:$,anisotropyMap:pt,clearcoat:at,clearcoatMap:St,clearcoatNormalMap:Lt,clearcoatRoughnessMap:kt,iridescence:ct,iridescenceMap:lt,iridescenceThicknessMap:ee,sheen:ut,sheenColorMap:Xt,sheenRoughnessMap:zt,specularMap:Pt,specularColorMap:bt,specularIntensityMap:Nt,transmission:Et,transmissionMap:Jt,thicknessMap:ue,gradientMap:Yt,opaque:y.transparent===!1&&y.blending===ts,alphaMap:dt,alphaTest:U,alphaHash:gt,combine:y.combine,mapUv:st&&g(y.map.channel),aoMapUv:wt&&g(y.aoMap.channel),lightMapUv:xt&&g(y.lightMap.channel),bumpMapUv:At&&g(y.bumpMap.channel),normalMapUv:Mt&&g(y.normalMap.channel),displacementMapUv:Gt&&g(y.displacementMap.channel),emissiveMapUv:Ut&&g(y.emissiveMap.channel),metalnessMapUv:R&&g(y.metalnessMap.channel),roughnessMapUv:S&&g(y.roughnessMap.channel),anisotropyMapUv:pt&&g(y.anisotropyMap.channel),clearcoatMapUv:St&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:kt&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:zt&&g(y.sheenRoughnessMap.channel),specularMapUv:Pt&&g(y.specularMap.channel),specularColorMapUv:bt&&g(y.specularColorMap.channel),specularIntensityMapUv:Nt&&g(y.specularIntensityMap.channel),transmissionMapUv:Jt&&g(y.transmissionMap.channel),thicknessMapUv:ue&&g(y.thicknessMap.channel),alphaMapUv:dt&&g(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Mt||$),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Ft,vertexUv2s:Dt,vertexUv3s:le,pointsUvs:nt.isPoints===!0&&!!I.attributes.uv&&(st||dt),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:nt.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:ot,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:ce,useLegacyLights:n._useLegacyLights,decodeVideoTexture:st&&y.map.isVideoTexture===!0&&ae.getTransfer(y.map.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Vn,flipSided:y.side===qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:_t&&y.extensions.derivatives===!0,extensionFragDepth:_t&&y.extensions.fragDepth===!0,extensionDrawBuffers:_t&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:_t&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_t&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function m(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const O in y.defines)T.push(O),T.push(y.defines[O]);return y.isRawShaderMaterial===!1&&(M(T,y),v(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function M(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function b(y){const T=_[y.type];let O;if(T){const K=Xe[T];O=Jo.clone(K.uniforms)}else O=y.uniforms;return O}function P(y,T){let O;for(let K=0,nt=c.length;K<nt;K++){const L=c[K];if(L.cacheKey===T){O=L,++O.usedTimes;break}}return O===void 0&&(O=new C0(n,T,y,r),c.push(O)),O}function E(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function z(){l.dispose()}return{getParameters:d,getProgramCacheKey:m,getUniforms:b,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:c,dispose:z}}function I0(){let n=new WeakMap;function t(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function e(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function N0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Pl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ll(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(f,u,p,_,g,d){let m=n[t];return m===void 0?(m={id:f.id,object:f,geometry:u,material:p,groupOrder:_,renderOrder:f.renderOrder,z:g,group:d},n[t]=m):(m.id=f.id,m.object=f,m.geometry=u,m.material=p,m.groupOrder=_,m.renderOrder=f.renderOrder,m.z=g,m.group=d),t++,m}function o(f,u,p,_,g,d){const m=a(f,u,p,_,g,d);p.transmission>0?i.push(m):p.transparent===!0?s.push(m):e.push(m)}function l(f,u,p,_,g,d){const m=a(f,u,p,_,g,d);p.transmission>0?i.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function c(f,u){e.length>1&&e.sort(f||N0),i.length>1&&i.sort(u||Pl),s.length>1&&s.sort(u||Pl)}function h(){for(let f=t,u=n.length;f<u;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function F0(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Ll,n.set(i,[a])):s>=r.length?(a=new Ll,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function O0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new ie};break;case"SpotLight":e={position:new H,direction:new H,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new H,halfWidth:new H,halfHeight:new H};break}return n[t.id]=e,e}}}function z0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let B0=0;function k0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function H0(n,t){const e=new O0,i=z0(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new H);const r=new H,a=new we,o=new we;function l(h,f){let u=0,p=0,_=0;for(let K=0;K<9;K++)s.probe[K].set(0,0,0);let g=0,d=0,m=0,M=0,v=0,b=0,P=0,E=0,A=0,z=0,y=0;h.sort(k0);const T=f===!0?Math.PI:1;for(let K=0,nt=h.length;K<nt;K++){const L=h[K],I=L.color,N=L.intensity,V=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=I.r*N*T,p+=I.g*N*T,_+=I.b*N*T;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(L.sh.coefficients[Y],N);y++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const D=L.shadow,X=i.get(L);X.shadowBias=D.bias,X.shadowNormalBias=D.normalBias,X.shadowRadius=D.radius,X.shadowMapSize=D.mapSize,s.directionalShadow[g]=X,s.directionalShadowMap[g]=q,s.directionalShadowMatrix[g]=L.shadow.matrix,b++}s.directional[g]=Y,g++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(I).multiplyScalar(N*T),Y.distance=V,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,s.spot[m]=Y;const D=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,D.updateMatrices(L),L.castShadow&&z++),s.spotLightMatrix[m]=D.matrix,L.castShadow){const X=i.get(L);X.shadowBias=D.bias,X.shadowNormalBias=D.normalBias,X.shadowRadius=D.radius,X.shadowMapSize=D.mapSize,s.spotShadow[m]=X,s.spotShadowMap[m]=q,E++}m++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(I).multiplyScalar(N),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),s.rectArea[M]=Y,M++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const D=L.shadow,X=i.get(L);X.shadowBias=D.bias,X.shadowNormalBias=D.normalBias,X.shadowRadius=D.radius,X.shadowMapSize=D.mapSize,X.shadowCameraNear=D.camera.near,X.shadowCameraFar=D.camera.far,s.pointShadow[d]=X,s.pointShadowMap[d]=q,s.pointShadowMatrix[d]=L.shadow.matrix,P++}s.point[d]=Y,d++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(N*T),Y.groundColor.copy(L.groundColor).multiplyScalar(N*T),s.hemi[v]=Y,v++}}M>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_FLOAT_1,s.rectAreaLTC2=ft.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ft.LTC_HALF_1,s.rectAreaLTC2=ft.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=p,s.ambient[2]=_;const O=s.hash;(O.directionalLength!==g||O.pointLength!==d||O.spotLength!==m||O.rectAreaLength!==M||O.hemiLength!==v||O.numDirectionalShadows!==b||O.numPointShadows!==P||O.numSpotShadows!==E||O.numSpotMaps!==A||O.numLightProbes!==y)&&(s.directional.length=g,s.spot.length=m,s.rectArea.length=M,s.point.length=d,s.hemi.length=v,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=E+A-z,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=y,O.directionalLength=g,O.pointLength=d,O.spotLength=m,O.rectAreaLength=M,O.hemiLength=v,O.numDirectionalShadows=b,O.numPointShadows=P,O.numSpotShadows=E,O.numSpotMaps=A,O.numLightProbes=y,s.version=B0++)}function c(h,f){let u=0,p=0,_=0,g=0,d=0;const m=f.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){const b=h[M];if(b.isDirectionalLight){const P=s.directional[u];P.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(m),u++}else if(b.isSpotLight){const P=s.spot[_];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(m),P.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(m),_++}else if(b.isRectAreaLight){const P=s.rectArea[g];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(m),o.identity(),a.copy(b.matrixWorld),a.premultiply(m),o.extractRotation(a),P.halfWidth.set(b.width*.5,0,0),P.halfHeight.set(0,b.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const P=s.point[p];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const P=s.hemi[d];P.direction.setFromMatrixPosition(b.matrixWorld),P.direction.transformDirection(m),d++}}}return{setup:l,setupView:c,state:s}}function Dl(n,t){const e=new H0(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function a(f){i.push(f)}function o(f){s.push(f)}function l(f){e.setup(i,f)}function c(f){e.setupView(i,f)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function G0(n,t){let e=new WeakMap;function i(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new Dl(n,t),e.set(r,[l])):a>=o.length?(l=new Dl(n,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:i,dispose:s}}class V0 extends Ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class W0 extends Ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const $0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X0=`uniform sampler2D shadow_pass;
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
}`;function q0(n,t,e){let i=new Bc;const s=new re,r=new re,a=new _e,o=new V0({depthPacking:Eu}),l=new W0,c={},h=e.maxTextureSize,f={[ai]:qe,[qe]:ai,[Vn]:Vn},u=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:$0,fragmentShader:X0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Yn;_.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Xn(_,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pc;let m=this.type;this.render=function(E,A,z){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||E.length===0)return;const y=n.getRenderTarget(),T=n.getActiveCubeFace(),O=n.getActiveMipmapLevel(),K=n.state;K.setBlending(si),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const nt=m!==kn&&this.type===kn,L=m===kn&&this.type!==kn;for(let I=0,N=E.length;I<N;I++){const V=E[I],q=V.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const Y=q.getFrameExtents();if(s.multiply(Y),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||nt===!0||L===!0){const X=this.type!==kn?{minFilter:Ge,magFilter:Ge}:{};q.map!==null&&q.map.dispose(),q.map=new Pi(s.x,s.y,X),q.map.texture.name=V.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const D=q.getViewportCount();for(let X=0;X<D;X++){const ot=q.getViewport(X);a.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),K.viewport(a),q.updateMatrices(V,X),i=q.getFrustum(),b(A,z,q.camera,V,this.type)}q.isPointLightShadow!==!0&&this.type===kn&&M(q,z),q.needsUpdate=!1}m=this.type,d.needsUpdate=!1,n.setRenderTarget(y,T,O)};function M(E,A){const z=t.update(g);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Pi(s.x,s.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(A,null,z,u,g,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(A,null,z,p,g,null)}function v(E,A,z,y){let T=null;const O=z.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(O!==void 0)T=O;else if(T=z.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const K=T.uuid,nt=A.uuid;let L=c[K];L===void 0&&(L={},c[K]=L);let I=L[nt];I===void 0&&(I=T.clone(),L[nt]=I,A.addEventListener("dispose",P)),T=I}if(T.visible=A.visible,T.wireframe=A.wireframe,y===kn?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:f[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,z.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const K=n.properties.get(T);K.light=z}return T}function b(E,A,z,y,T){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&T===kn)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld);const nt=t.update(E),L=E.material;if(Array.isArray(L)){const I=nt.groups;for(let N=0,V=I.length;N<V;N++){const q=I[N],Y=L[q.materialIndex];if(Y&&Y.visible){const D=v(E,Y,y,T);E.onBeforeShadow(n,E,A,z,nt,D,q),n.renderBufferDirect(z,null,nt,D,E,q),E.onAfterShadow(n,E,A,z,nt,D,q)}}}else if(L.visible){const I=v(E,L,y,T);E.onBeforeShadow(n,E,A,z,nt,I,null),n.renderBufferDirect(z,null,nt,I,E,null),E.onAfterShadow(n,E,A,z,nt,I,null)}}const K=E.children;for(let nt=0,L=K.length;nt<L;nt++)b(K[nt],A,z,y,T)}function P(E){E.target.removeEventListener("dispose",P);for(const z in c){const y=c[z],T=E.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}function Y0(n,t,e){const i=e.isWebGL2;function s(){let U=!1;const gt=new _e;let _t=null;const Ft=new _e(0,0,0,0);return{setMask:function(Dt){_t!==Dt&&!U&&(n.colorMask(Dt,Dt,Dt,Dt),_t=Dt)},setLocked:function(Dt){U=Dt},setClear:function(Dt,le,ce,be,Oe){Oe===!0&&(Dt*=be,le*=be,ce*=be),gt.set(Dt,le,ce,be),Ft.equals(gt)===!1&&(n.clearColor(Dt,le,ce,be),Ft.copy(gt))},reset:function(){U=!1,_t=null,Ft.set(-1,0,0,0)}}}function r(){let U=!1,gt=null,_t=null,Ft=null;return{setTest:function(Dt){Dt?et(n.DEPTH_TEST):st(n.DEPTH_TEST)},setMask:function(Dt){gt!==Dt&&!U&&(n.depthMask(Dt),gt=Dt)},setFunc:function(Dt){if(_t!==Dt){switch(Dt){case Qh:n.depthFunc(n.NEVER);break;case tu:n.depthFunc(n.ALWAYS);break;case eu:n.depthFunc(n.LESS);break;case Mr:n.depthFunc(n.LEQUAL);break;case nu:n.depthFunc(n.EQUAL);break;case iu:n.depthFunc(n.GEQUAL);break;case su:n.depthFunc(n.GREATER);break;case ru:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=Dt}},setLocked:function(Dt){U=Dt},setClear:function(Dt){Ft!==Dt&&(n.clearDepth(Dt),Ft=Dt)},reset:function(){U=!1,gt=null,_t=null,Ft=null}}}function a(){let U=!1,gt=null,_t=null,Ft=null,Dt=null,le=null,ce=null,be=null,Oe=null;return{setTest:function(he){U||(he?et(n.STENCIL_TEST):st(n.STENCIL_TEST))},setMask:function(he){gt!==he&&!U&&(n.stencilMask(he),gt=he)},setFunc:function(he,ze,yn){(_t!==he||Ft!==ze||Dt!==yn)&&(n.stencilFunc(he,ze,yn),_t=he,Ft=ze,Dt=yn)},setOp:function(he,ze,yn){(le!==he||ce!==ze||be!==yn)&&(n.stencilOp(he,ze,yn),le=he,ce=ze,be=yn)},setLocked:function(he){U=he},setClear:function(he){Oe!==he&&(n.clearStencil(he),Oe=he)},reset:function(){U=!1,gt=null,_t=null,Ft=null,Dt=null,le=null,ce=null,be=null,Oe=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,f=new WeakMap;let u={},p={},_=new WeakMap,g=[],d=null,m=!1,M=null,v=null,b=null,P=null,E=null,A=null,z=null,y=new ie(0,0,0),T=0,O=!1,K=null,nt=null,L=null,I=null,N=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(D)[1]),q=Y>=1):D.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),q=Y>=2);let X=null,ot={};const W=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),ht=new _e().fromArray(W),B=new _e().fromArray(Q);function G(U,gt,_t,Ft){const Dt=new Uint8Array(4),le=n.createTexture();n.bindTexture(U,le),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ce=0;ce<_t;ce++)i&&(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)?n.texImage3D(gt,0,n.RGBA,1,1,Ft,0,n.RGBA,n.UNSIGNED_BYTE,Dt):n.texImage2D(gt+ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Dt);return le}const tt={};tt[n.TEXTURE_2D]=G(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=G(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(tt[n.TEXTURE_2D_ARRAY]=G(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=G(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),et(n.DEPTH_TEST),l.setFunc(Mr),Ut(!1),R(pa),et(n.CULL_FACE),Mt(si);function et(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function st(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function rt(U,gt){return p[U]!==gt?(n.bindFramebuffer(U,gt),p[U]=gt,i&&(U===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=gt),U===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=gt)),!0):!1}function F(U,gt){let _t=g,Ft=!1;if(U)if(_t=_.get(gt),_t===void 0&&(_t=[],_.set(gt,_t)),U.isWebGLMultipleRenderTargets){const Dt=U.texture;if(_t.length!==Dt.length||_t[0]!==n.COLOR_ATTACHMENT0){for(let le=0,ce=Dt.length;le<ce;le++)_t[le]=n.COLOR_ATTACHMENT0+le;_t.length=Dt.length,Ft=!0}}else _t[0]!==n.COLOR_ATTACHMENT0&&(_t[0]=n.COLOR_ATTACHMENT0,Ft=!0);else _t[0]!==n.BACK&&(_t[0]=n.BACK,Ft=!0);Ft&&(e.isWebGL2?n.drawBuffers(_t):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(_t))}function wt(U){return d!==U?(n.useProgram(U),d=U,!0):!1}const xt={[yi]:n.FUNC_ADD,[zh]:n.FUNC_SUBTRACT,[Bh]:n.FUNC_REVERSE_SUBTRACT};if(i)xt[va]=n.MIN,xt[Po]=n.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(xt[va]=U.MIN_EXT,xt[Po]=U.MAX_EXT)}const At={[kh]:n.ZERO,[Hh]:n.ONE,[Gh]:n.SRC_COLOR,[Lo]:n.SRC_ALPHA,[Yh]:n.SRC_ALPHA_SATURATE,[Xh]:n.DST_COLOR,[Wh]:n.DST_ALPHA,[Vh]:n.ONE_MINUS_SRC_COLOR,[Do]:n.ONE_MINUS_SRC_ALPHA,[qh]:n.ONE_MINUS_DST_COLOR,[$h]:n.ONE_MINUS_DST_ALPHA,[jh]:n.CONSTANT_COLOR,[Zh]:n.ONE_MINUS_CONSTANT_COLOR,[Kh]:n.CONSTANT_ALPHA,[Jh]:n.ONE_MINUS_CONSTANT_ALPHA};function Mt(U,gt,_t,Ft,Dt,le,ce,be,Oe,he){if(U===si){m===!0&&(st(n.BLEND),m=!1);return}if(m===!1&&(et(n.BLEND),m=!0),U!==mc){if(U!==M||he!==O){if((v!==yi||E!==yi)&&(n.blendEquation(n.FUNC_ADD),v=yi,E=yi),he)switch(U){case ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ma:n.blendFunc(n.ONE,n.ONE);break;case ga:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _a:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ma:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case ga:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _a:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,P=null,A=null,z=null,y.set(0,0,0),T=0,M=U,O=he}return}Dt=Dt||gt,le=le||_t,ce=ce||Ft,(gt!==v||Dt!==E)&&(n.blendEquationSeparate(xt[gt],xt[Dt]),v=gt,E=Dt),(_t!==b||Ft!==P||le!==A||ce!==z)&&(n.blendFuncSeparate(At[_t],At[Ft],At[le],At[ce]),b=_t,P=Ft,A=le,z=ce),(be.equals(y)===!1||Oe!==T)&&(n.blendColor(be.r,be.g,be.b,Oe),y.copy(be),T=Oe),M=U,O=!1}function Gt(U,gt){U.side===Vn?st(n.CULL_FACE):et(n.CULL_FACE);let _t=U.side===qe;gt&&(_t=!_t),Ut(_t),U.blending===ts&&U.transparent===!1?Mt(si):Mt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),o.setMask(U.colorWrite);const Ft=U.stencilWrite;c.setTest(Ft),Ft&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),$(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?et(n.SAMPLE_ALPHA_TO_COVERAGE):st(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(U){K!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),K=U)}function R(U){U!==Nh?(et(n.CULL_FACE),U!==nt&&(U===pa?n.cullFace(n.BACK):U===Fh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):st(n.CULL_FACE),nt=U}function S(U){U!==L&&(q&&n.lineWidth(U),L=U)}function $(U,gt,_t){U?(et(n.POLYGON_OFFSET_FILL),(I!==gt||N!==_t)&&(n.polygonOffset(gt,_t),I=gt,N=_t)):st(n.POLYGON_OFFSET_FILL)}function at(U){U?et(n.SCISSOR_TEST):st(n.SCISSOR_TEST)}function ct(U){U===void 0&&(U=n.TEXTURE0+V-1),X!==U&&(n.activeTexture(U),X=U)}function ut(U,gt,_t){_t===void 0&&(X===null?_t=n.TEXTURE0+V-1:_t=X);let Ft=ot[_t];Ft===void 0&&(Ft={type:void 0,texture:void 0},ot[_t]=Ft),(Ft.type!==U||Ft.texture!==gt)&&(X!==_t&&(n.activeTexture(_t),X=_t),n.bindTexture(U,gt||tt[U]),Ft.type=U,Ft.texture=gt)}function Et(){const U=ot[X];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function pt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function kt(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(U){ht.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ht.copy(U))}function Jt(U){B.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),B.copy(U))}function ue(U,gt){let _t=f.get(gt);_t===void 0&&(_t=new WeakMap,f.set(gt,_t));let Ft=_t.get(U);Ft===void 0&&(Ft=n.getUniformBlockIndex(gt,U.name),_t.set(U,Ft))}function Yt(U,gt){const Ft=f.get(gt).get(U);h.get(gt)!==Ft&&(n.uniformBlockBinding(gt,Ft,U.__bindingPointIndex),h.set(gt,Ft))}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},X=null,ot={},p={},_=new WeakMap,g=[],d=null,m=!1,M=null,v=null,b=null,P=null,E=null,A=null,z=null,y=new ie(0,0,0),T=0,O=!1,K=null,nt=null,L=null,I=null,N=null,ht.set(0,0,n.canvas.width,n.canvas.height),B.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:et,disable:st,bindFramebuffer:rt,drawBuffers:F,useProgram:wt,setBlending:Mt,setMaterial:Gt,setFlipSided:Ut,setCullFace:R,setLineWidth:S,setPolygonOffset:$,setScissorTest:at,activeTexture:ct,bindTexture:ut,unbindTexture:Et,compressedTexImage2D:pt,compressedTexImage3D:St,texImage2D:Pt,texImage3D:bt,updateUBOMapping:ue,uniformBlockBinding:Yt,texStorage2D:Xt,texStorage3D:zt,texSubImage2D:Lt,texSubImage3D:kt,compressedTexSubImage2D:lt,compressedTexSubImage3D:ee,scissor:Nt,viewport:Jt,reset:dt}}function j0(n,t,e,i,s,r,a){const o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return p?new OffscreenCanvas(R,S):Tr("canvas")}function g(R,S,$,at){let ct=1;if((R.width>at||R.height>at)&&(ct=at/Math.max(R.width,R.height)),ct<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ut=S?Er:Math.floor,Et=ut(ct*R.width),pt=ut(ct*R.height);f===void 0&&(f=_(Et,pt));const St=$?_(Et,pt):f;return St.width=Et,St.height=pt,St.getContext("2d").drawImage(R,0,0,Et,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Et+"x"+pt+")."),St}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function d(R){return Bo(R.width)&&Bo(R.height)}function m(R){return o?!1:R.wrapS!==gn||R.wrapT!==gn||R.minFilter!==Ge&&R.minFilter!==sn}function M(R,S){return R.generateMipmaps&&S&&R.minFilter!==Ge&&R.minFilter!==sn}function v(R){n.generateMipmap(R)}function b(R,S,$,at,ct=!1){if(o===!1)return S;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ut=S;if(S===n.RED&&($===n.FLOAT&&(ut=n.R32F),$===n.HALF_FLOAT&&(ut=n.R16F),$===n.UNSIGNED_BYTE&&(ut=n.R8)),S===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(ut=n.R8UI),$===n.UNSIGNED_SHORT&&(ut=n.R16UI),$===n.UNSIGNED_INT&&(ut=n.R32UI),$===n.BYTE&&(ut=n.R8I),$===n.SHORT&&(ut=n.R16I),$===n.INT&&(ut=n.R32I)),S===n.RG&&($===n.FLOAT&&(ut=n.RG32F),$===n.HALF_FLOAT&&(ut=n.RG16F),$===n.UNSIGNED_BYTE&&(ut=n.RG8)),S===n.RGBA){const Et=ct?yr:ae.getTransfer(at);$===n.FLOAT&&(ut=n.RGBA32F),$===n.HALF_FLOAT&&(ut=n.RGBA16F),$===n.UNSIGNED_BYTE&&(ut=Et===fe?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(ut=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(ut=n.RGB5_A1)}return(ut===n.R16F||ut===n.R32F||ut===n.RG16F||ut===n.RG32F||ut===n.RGBA16F||ut===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ut}function P(R,S,$){return M(R,$)===!0||R.isFramebufferTexture&&R.minFilter!==Ge&&R.minFilter!==sn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function E(R){return R===Ge||R===Ma||R===Vr?n.NEAREST:n.LINEAR}function A(R){const S=R.target;S.removeEventListener("dispose",A),y(S),S.isVideoTexture&&h.delete(S)}function z(R){const S=R.target;S.removeEventListener("dispose",z),O(S)}function y(R){const S=i.get(R);if(S.__webglInit===void 0)return;const $=R.source,at=u.get($);if(at){const ct=at[S.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&T(R),Object.keys(at).length===0&&u.delete($)}i.remove(R)}function T(R){const S=i.get(R);n.deleteTexture(S.__webglTexture);const $=R.source,at=u.get($);delete at[S.__cacheKey],a.memory.textures--}function O(R){const S=R.texture,$=i.get(R),at=i.get(S);if(at.__webglTexture!==void 0&&(n.deleteTexture(at.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray($.__webglFramebuffer[ct]))for(let ut=0;ut<$.__webglFramebuffer[ct].length;ut++)n.deleteFramebuffer($.__webglFramebuffer[ct][ut]);else n.deleteFramebuffer($.__webglFramebuffer[ct]);$.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer[ct])}else{if(Array.isArray($.__webglFramebuffer))for(let ct=0;ct<$.__webglFramebuffer.length;ct++)n.deleteFramebuffer($.__webglFramebuffer[ct]);else n.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&n.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&n.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let ct=0;ct<$.__webglColorRenderbuffer.length;ct++)$.__webglColorRenderbuffer[ct]&&n.deleteRenderbuffer($.__webglColorRenderbuffer[ct]);$.__webglDepthRenderbuffer&&n.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ct=0,ut=S.length;ct<ut;ct++){const Et=i.get(S[ct]);Et.__webglTexture&&(n.deleteTexture(Et.__webglTexture),a.memory.textures--),i.remove(S[ct])}i.remove(S),i.remove(R)}let K=0;function nt(){K=0}function L(){const R=K;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),K+=1,R}function I(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function N(R,S){const $=i.get(R);if(R.isVideoTexture&&Gt(R),R.isRenderTargetTexture===!1&&R.version>0&&$.__version!==R.version){const at=R.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ht($,R,S);return}}e.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+S)}function V(R,S){const $=i.get(R);if(R.version>0&&$.__version!==R.version){ht($,R,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+S)}function q(R,S){const $=i.get(R);if(R.version>0&&$.__version!==R.version){ht($,R,S);return}e.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+S)}function Y(R,S){const $=i.get(R);if(R.version>0&&$.__version!==R.version){B($,R,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+S)}const D={[No]:n.REPEAT,[gn]:n.CLAMP_TO_EDGE,[Fo]:n.MIRRORED_REPEAT},X={[Ge]:n.NEAREST,[Ma]:n.NEAREST_MIPMAP_NEAREST,[Vr]:n.NEAREST_MIPMAP_LINEAR,[sn]:n.LINEAR,[pu]:n.LINEAR_MIPMAP_NEAREST,[Ts]:n.LINEAR_MIPMAP_LINEAR},ot={[Au]:n.NEVER,[Uu]:n.ALWAYS,[Ru]:n.LESS,[wc]:n.LEQUAL,[Cu]:n.EQUAL,[Du]:n.GEQUAL,[Pu]:n.GREATER,[Lu]:n.NOTEQUAL};function W(R,S,$){if($?(n.texParameteri(R,n.TEXTURE_WRAP_S,D[S.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,D[S.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,D[S.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,X[S.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,X[S.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(S.wrapS!==gn||S.wrapT!==gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,E(S.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,E(S.minFilter)),S.minFilter!==Ge&&S.minFilter!==sn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ot[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const at=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===Ge||S.minFilter!==Vr&&S.minFilter!==Ts||S.type===ni&&t.has("OES_texture_float_linear")===!1||o===!1&&S.type===ws&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(n.texParameterf(R,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Q(R,S){let $=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const at=S.source;let ct=u.get(at);ct===void 0&&(ct={},u.set(at,ct));const ut=I(S);if(ut!==R.__cacheKey){ct[ut]===void 0&&(ct[ut]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,$=!0),ct[ut].usedTimes++;const Et=ct[R.__cacheKey];Et!==void 0&&(ct[R.__cacheKey].usedTimes--,Et.usedTimes===0&&T(S)),R.__cacheKey=ut,R.__webglTexture=ct[ut].texture}return $}function ht(R,S,$){let at=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(at=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(at=n.TEXTURE_3D);const ct=Q(R,S),ut=S.source;e.bindTexture(at,R.__webglTexture,n.TEXTURE0+$);const Et=i.get(ut);if(ut.version!==Et.__version||ct===!0){e.activeTexture(n.TEXTURE0+$);const pt=ae.getPrimaries(ae.workingColorSpace),St=S.colorSpace===on?null:ae.getPrimaries(S.colorSpace),Lt=S.colorSpace===on||pt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const kt=m(S)&&d(S.image)===!1;let lt=g(S.image,kt,!1,s.maxTextureSize);lt=Ut(S,lt);const ee=d(lt)||o,Xt=r.convert(S.format,S.colorSpace);let zt=r.convert(S.type),Pt=b(S.internalFormat,Xt,zt,S.colorSpace,S.isVideoTexture);W(at,S,ee);let bt;const Nt=S.mipmaps,Jt=o&&S.isVideoTexture!==!0&&Pt!==Ec,ue=Et.__version===void 0||ct===!0,Yt=P(S,lt,ee);if(S.isDepthTexture)Pt=n.DEPTH_COMPONENT,o?S.type===ni?Pt=n.DEPTH_COMPONENT32F:S.type===ei?Pt=n.DEPTH_COMPONENT24:S.type===wi?Pt=n.DEPTH24_STENCIL8:Pt=n.DEPTH_COMPONENT16:S.type===ni&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Ai&&Pt===n.DEPTH_COMPONENT&&S.type!==jo&&S.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=ei,zt=r.convert(S.type)),S.format===rs&&Pt===n.DEPTH_COMPONENT&&(Pt=n.DEPTH_STENCIL,S.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=wi,zt=r.convert(S.type))),ue&&(Jt?e.texStorage2D(n.TEXTURE_2D,1,Pt,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Pt,lt.width,lt.height,0,Xt,zt,null));else if(S.isDataTexture)if(Nt.length>0&&ee){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,zt,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,zt,bt.data);S.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt.width,lt.height,Xt,zt,lt.data)):e.texImage2D(n.TEXTURE_2D,0,Pt,lt.width,lt.height,0,Xt,zt,lt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Jt&&ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,Nt[0].width,Nt[0].height,lt.depth);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],S.format!==_n?Xt!==null?Jt?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,lt.depth,Xt,bt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,lt.depth,0,bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage3D(n.TEXTURE_2D_ARRAY,dt,0,0,0,bt.width,bt.height,lt.depth,Xt,zt,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,dt,Pt,bt.width,bt.height,lt.depth,0,Xt,zt,bt.data)}else{Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],S.format!==_n?Xt!==null?Jt?e.compressedTexSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,bt.width,bt.height,Xt,zt,bt.data):e.texImage2D(n.TEXTURE_2D,dt,Pt,bt.width,bt.height,0,Xt,zt,bt.data)}else if(S.isDataArrayTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Yt,Pt,lt.width,lt.height,lt.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Xt,zt,lt.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Pt,lt.width,lt.height,lt.depth,0,Xt,zt,lt.data);else if(S.isData3DTexture)Jt?(ue&&e.texStorage3D(n.TEXTURE_3D,Yt,Pt,lt.width,lt.height,lt.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Xt,zt,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Pt,lt.width,lt.height,lt.depth,0,Xt,zt,lt.data);else if(S.isFramebufferTexture){if(ue)if(Jt)e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height);else{let dt=lt.width,U=lt.height;for(let gt=0;gt<Yt;gt++)e.texImage2D(n.TEXTURE_2D,gt,Pt,dt,U,0,Xt,zt,null),dt>>=1,U>>=1}}else if(Nt.length>0&&ee){Jt&&ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,Nt[0].width,Nt[0].height);for(let dt=0,U=Nt.length;dt<U;dt++)bt=Nt[dt],Jt?e.texSubImage2D(n.TEXTURE_2D,dt,0,0,Xt,zt,bt):e.texImage2D(n.TEXTURE_2D,dt,Pt,Xt,zt,bt);S.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(n.TEXTURE_2D,Yt,Pt,lt.width,lt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Xt,zt,lt)):e.texImage2D(n.TEXTURE_2D,0,Pt,Xt,zt,lt);M(S,ee)&&v(at),Et.__version=ut.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function B(R,S,$){if(S.image.length!==6)return;const at=Q(R,S),ct=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+$);const ut=i.get(ct);if(ct.version!==ut.__version||at===!0){e.activeTexture(n.TEXTURE0+$);const Et=ae.getPrimaries(ae.workingColorSpace),pt=S.colorSpace===on?null:ae.getPrimaries(S.colorSpace),St=S.colorSpace===on||Et===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Lt=S.isCompressedTexture||S.image[0].isCompressedTexture,kt=S.image[0]&&S.image[0].isDataTexture,lt=[];for(let dt=0;dt<6;dt++)!Lt&&!kt?lt[dt]=g(S.image[dt],!1,!0,s.maxCubemapSize):lt[dt]=kt?S.image[dt].image:S.image[dt],lt[dt]=Ut(S,lt[dt]);const ee=lt[0],Xt=d(ee)||o,zt=r.convert(S.format,S.colorSpace),Pt=r.convert(S.type),bt=b(S.internalFormat,zt,Pt,S.colorSpace),Nt=o&&S.isVideoTexture!==!0,Jt=ut.__version===void 0||at===!0;let ue=P(S,ee,Xt);W(n.TEXTURE_CUBE_MAP,S,Xt);let Yt;if(Lt){Nt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,ee.width,ee.height);for(let dt=0;dt<6;dt++){Yt=lt[dt].mipmaps;for(let U=0;U<Yt.length;U++){const gt=Yt[U];S.format!==_n?zt!==null?Nt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,bt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,0,0,gt.width,gt.height,zt,Pt,gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U,bt,gt.width,gt.height,0,zt,Pt,gt.data)}}}else{Yt=S.mipmaps,Nt&&Jt&&(Yt.length>0&&ue++,e.texStorage2D(n.TEXTURE_CUBE_MAP,ue,bt,lt[0].width,lt[0].height));for(let dt=0;dt<6;dt++)if(kt){Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,lt[dt].width,lt[dt].height,zt,Pt,lt[dt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,lt[dt].width,lt[dt].height,0,zt,Pt,lt[dt].data);for(let U=0;U<Yt.length;U++){const _t=Yt[U].image[dt].image;Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,0,0,_t.width,_t.height,zt,Pt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,bt,_t.width,_t.height,0,zt,Pt,_t.data)}}else{Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,zt,Pt,lt[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,bt,zt,Pt,lt[dt]);for(let U=0;U<Yt.length;U++){const gt=Yt[U];Nt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,0,0,zt,Pt,gt.image[dt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,U+1,bt,zt,Pt,gt.image[dt])}}}M(S,Xt)&&v(n.TEXTURE_CUBE_MAP),ut.__version=ct.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function G(R,S,$,at,ct,ut){const Et=r.convert($.format,$.colorSpace),pt=r.convert($.type),St=b($.internalFormat,Et,pt,$.colorSpace);if(!i.get(S).__hasExternalTextures){const kt=Math.max(1,S.width>>ut),lt=Math.max(1,S.height>>ut);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,ut,St,kt,lt,S.depth,0,Et,pt,null):e.texImage2D(ct,ut,St,kt,lt,0,Et,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Mt(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,at,ct,i.get($).__webglTexture,0,At(S)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,at,ct,i.get($).__webglTexture,ut),e.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(R,S,$){if(n.bindRenderbuffer(n.RENDERBUFFER,R),S.depthBuffer&&!S.stencilBuffer){let at=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if($||Mt(S)){const ct=S.depthTexture;ct&&ct.isDepthTexture&&(ct.type===ni?at=n.DEPTH_COMPONENT32F:ct.type===ei&&(at=n.DEPTH_COMPONENT24));const ut=At(S);Mt(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut,at,S.width,S.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ut,at,S.width,S.height)}else n.renderbufferStorage(n.RENDERBUFFER,at,S.width,S.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(S.depthBuffer&&S.stencilBuffer){const at=At(S);$&&Mt(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,n.DEPTH24_STENCIL8,S.width,S.height):Mt(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,n.DEPTH24_STENCIL8,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const at=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ct=0;ct<at.length;ct++){const ut=at[ct],Et=r.convert(ut.format,ut.colorSpace),pt=r.convert(ut.type),St=b(ut.internalFormat,Et,pt,ut.colorSpace),Lt=At(S);$&&Mt(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt,St,S.width,S.height):Mt(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Lt,St,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,St,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function et(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),N(S.depthTexture,0);const at=i.get(S.depthTexture).__webglTexture,ct=At(S);if(S.depthTexture.format===Ai)Mt(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0);else if(S.depthTexture.format===rs)Mt(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function st(R){const S=i.get(R),$=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");et(S.__webglFramebuffer,R)}else if($){S.__webglDepthbuffer=[];for(let at=0;at<6;at++)e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[at]),S.__webglDepthbuffer[at]=n.createRenderbuffer(),tt(S.__webglDepthbuffer[at],R,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),tt(S.__webglDepthbuffer,R,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(R,S,$){const at=i.get(R);S!==void 0&&G(at.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&st(R)}function F(R){const S=R.texture,$=i.get(R),at=i.get(S);R.addEventListener("dispose",z),R.isWebGLMultipleRenderTargets!==!0&&(at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture()),at.__version=S.version,a.memory.textures++);const ct=R.isWebGLCubeRenderTarget===!0,ut=R.isWebGLMultipleRenderTargets===!0,Et=d(R)||o;if(ct){$.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(o&&S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer[pt]=[];for(let St=0;St<S.mipmaps.length;St++)$.__webglFramebuffer[pt][St]=n.createFramebuffer()}else $.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){$.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)$.__webglFramebuffer[pt]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(ut)if(s.drawBuffers){const pt=R.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=i.get(pt[St]);kt.__webglTexture===void 0&&(kt.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&Mt(R)===!1){const pt=ut?S:[S];$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let St=0;St<pt.length;St++){const Lt=pt[St];$.__webglColorRenderbuffer[St]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[St]);const kt=r.convert(Lt.format,Lt.colorSpace),lt=r.convert(Lt.type),ee=b(Lt.internalFormat,kt,lt,Lt.colorSpace,R.isXRRenderTarget===!0),Xt=At(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,ee,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,$.__webglColorRenderbuffer[St])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),tt($.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ct){e.bindTexture(n.TEXTURE_CUBE_MAP,at.__webglTexture),W(n.TEXTURE_CUBE_MAP,S,Et);for(let pt=0;pt<6;pt++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)G($.__webglFramebuffer[pt][St],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,St);else G($.__webglFramebuffer[pt],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);M(S,Et)&&v(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){const pt=R.texture;for(let St=0,Lt=pt.length;St<Lt;St++){const kt=pt[St],lt=i.get(kt);e.bindTexture(n.TEXTURE_2D,lt.__webglTexture),W(n.TEXTURE_2D,kt,Et),G($.__webglFramebuffer,R,kt,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,0),M(kt,Et)&&v(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?pt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(pt,at.__webglTexture),W(pt,S,Et),o&&S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)G($.__webglFramebuffer[St],R,S,n.COLOR_ATTACHMENT0,pt,St);else G($.__webglFramebuffer,R,S,n.COLOR_ATTACHMENT0,pt,0);M(S,Et)&&v(pt),e.unbindTexture()}R.depthBuffer&&st(R)}function wt(R){const S=d(R)||o,$=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let at=0,ct=$.length;at<ct;at++){const ut=$[at];if(M(ut,S)){const Et=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pt=i.get(ut).__webglTexture;e.bindTexture(Et,pt),v(Et),e.unbindTexture()}}}function xt(R){if(o&&R.samples>0&&Mt(R)===!1){const S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],$=R.width,at=R.height;let ct=n.COLOR_BUFFER_BIT;const ut=[],Et=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(R),St=R.isWebGLMultipleRenderTargets===!0;if(St)for(let Lt=0;Lt<S.length;Lt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let Lt=0;Lt<S.length;Lt++){ut.push(n.COLOR_ATTACHMENT0+Lt),R.depthBuffer&&ut.push(Et);const kt=pt.__ignoreDepthValues!==void 0?pt.__ignoreDepthValues:!1;if(kt===!1&&(R.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),St&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]),kt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Et]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Et])),St){const lt=i.get(S[Lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,lt,0)}n.blitFramebuffer(0,0,$,at,0,0,$,at,ct,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ut)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),St)for(let Lt=0;Lt<S.length;Lt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Lt]);const kt=i.get(S[Lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,kt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}}function At(R){return Math.min(s.maxSamples,R.samples)}function Mt(R){const S=i.get(R);return o&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Gt(R){const S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function Ut(R,S){const $=R.colorSpace,at=R.format,ct=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===zo||$!==Pn&&$!==on&&(ae.getTransfer($)===fe?o===!1?t.has("EXT_sRGB")===!0&&at===_n?(R.format=zo,R.minFilter=sn,R.generateMipmaps=!1):S=Rc.sRGBToLinear(S):(at!==_n||ct!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),S}this.allocateTextureUnit=L,this.resetTextureUnits=nt,this.setTexture2D=N,this.setTexture2DArray=V,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=rt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Mt}function Z0(n,t,e){const i=e.isWebGL2;function s(r,a=on){let o;const l=ae.getTransfer(a);if(r===oi)return n.UNSIGNED_BYTE;if(r===Mc)return n.UNSIGNED_SHORT_4_4_4_4;if(r===yc)return n.UNSIGNED_SHORT_5_5_5_1;if(r===mu)return n.BYTE;if(r===gu)return n.SHORT;if(r===jo)return n.UNSIGNED_SHORT;if(r===vc)return n.INT;if(r===ei)return n.UNSIGNED_INT;if(r===ni)return n.FLOAT;if(r===ws)return i?n.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===_u)return n.ALPHA;if(r===_n)return n.RGBA;if(r===vu)return n.LUMINANCE;if(r===Mu)return n.LUMINANCE_ALPHA;if(r===Ai)return n.DEPTH_COMPONENT;if(r===rs)return n.DEPTH_STENCIL;if(r===zo)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===yu)return n.RED;if(r===xc)return n.RED_INTEGER;if(r===xu)return n.RG;if(r===Sc)return n.RG_INTEGER;if(r===bc)return n.RGBA_INTEGER;if(r===Wr||r===$r||r===Xr||r===qr)if(l===fe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Wr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===$r)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Xr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===qr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Wr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===$r)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Xr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===qr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ya||r===xa||r===Sa||r===ba)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===ya)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===xa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Sa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ba)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ec)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ea||r===Ta)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Ea)return l===fe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Ta)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===wa||r===Aa||r===Ra||r===Ca||r===Pa||r===La||r===Da||r===Ua||r===Ia||r===Na||r===Fa||r===Oa||r===za||r===Ba)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===wa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Aa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ra)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ca)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Pa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===La)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Da)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ua)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ia)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Na)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Fa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Oa)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===za)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ba)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Yr||r===ka||r===Ha)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Yr)return l===fe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ka)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ha)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Su||r===Ga||r===Va||r===Wa)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Yr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ga)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Va)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Wa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===wi?i?n.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class K0 extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class vs extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const J0={type:"move"};class vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const d=e.getJointPose(g,i),m=this._getHandJoint(c,g);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&u>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(J0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new vs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Q0 extends ls{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,p=null,_=null;const g=e.getContextAttributes();let d=null,m=null;const M=[],v=[],b=new re;let P=null;const E=new rn;E.layers.enable(1),E.viewport=new _e;const A=new rn;A.layers.enable(2),A.viewport=new _e;const z=[E,A],y=new K0;y.layers.enable(1),y.layers.enable(2);let T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=M[W];return Q===void 0&&(Q=new vo,M[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=M[W];return Q===void 0&&(Q=new vo,M[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=M[W];return Q===void 0&&(Q=new vo,M[W]=Q),Q.getHandSpace()};function K(W){const Q=v.indexOf(W.inputSource);if(Q===-1)return;const ht=M[Q];ht!==void 0&&(ht.update(W.inputSource,W.frame,c||a),ht.dispatchEvent({type:W.type,data:W.inputSource}))}function nt(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",L);for(let W=0;W<M.length;W++){const Q=v[W];Q!==null&&(v[W]=null,M[W].disconnect(Q))}T=null,O=null,t.setRenderTarget(d),p=null,u=null,f=null,s=null,m=null,ot.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(b),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const Q={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),m=new Pi(p.framebufferWidth,p.framebufferHeight,{format:_n,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Q=null,ht=null,B=null;g.depth&&(B=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=g.stencil?rs:Ai,ht=g.stencil?wi:ei);const G={colorFormat:e.RGBA8,depthFormat:B,scaleFactor:r};f=new XRWebGLBinding(s,e),u=f.createProjectionLayer(G),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new Pi(u.textureWidth,u.textureHeight,{format:_n,type:oi,depthTexture:new Hc(u.textureWidth,u.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const tt=t.properties.get(m);tt.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ot.setContext(s),ot.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(W){for(let Q=0;Q<W.removed.length;Q++){const ht=W.removed[Q],B=v.indexOf(ht);B>=0&&(v[B]=null,M[B].disconnect(ht))}for(let Q=0;Q<W.added.length;Q++){const ht=W.added[Q];let B=v.indexOf(ht);if(B===-1){for(let tt=0;tt<M.length;tt++)if(tt>=v.length){v.push(ht),B=tt;break}else if(v[tt]===null){v[tt]=ht,B=tt;break}if(B===-1)break}const G=M[B];G&&G.connect(ht)}}const I=new H,N=new H;function V(W,Q,ht){I.setFromMatrixPosition(Q.matrixWorld),N.setFromMatrixPosition(ht.matrixWorld);const B=I.distanceTo(N),G=Q.projectionMatrix.elements,tt=ht.projectionMatrix.elements,et=G[14]/(G[10]-1),st=G[14]/(G[10]+1),rt=(G[9]+1)/G[5],F=(G[9]-1)/G[5],wt=(G[8]-1)/G[0],xt=(tt[8]+1)/tt[0],At=et*wt,Mt=et*xt,Gt=B/(-wt+xt),Ut=Gt*-wt;Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ut),W.translateZ(Gt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const R=et+Gt,S=st+Gt,$=At-Ut,at=Mt+(B-Ut),ct=rt*st/S*R,ut=F*st/S*R;W.projectionMatrix.makePerspective($,at,ct,ut,R,S),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function q(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;y.near=A.near=E.near=W.near,y.far=A.far=E.far=W.far,(T!==y.near||O!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,O=y.far);const Q=W.parent,ht=y.cameras;q(y,Q);for(let B=0;B<ht.length;B++)q(ht[B],Q);ht.length===2?V(y,E,A):y.projectionMatrix.copy(E.projectionMatrix),Y(W,y,Q)};function Y(W,Q,ht){ht===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(ht.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=As*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(W){l=W,u!==null&&(u.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)};let D=null;function X(W,Q){if(h=Q.getViewerPose(c||a),_=Q,h!==null){const ht=h.views;p!==null&&(t.setRenderTargetFramebuffer(m,p.framebuffer),t.setRenderTarget(m));let B=!1;ht.length!==y.cameras.length&&(y.cameras.length=0,B=!0);for(let G=0;G<ht.length;G++){const tt=ht[G];let et=null;if(p!==null)et=p.getViewport(tt);else{const rt=f.getViewSubImage(u,tt);et=rt.viewport,G===0&&(t.setRenderTargetTextures(m,rt.colorTexture,u.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(m))}let st=z[G];st===void 0&&(st=new rn,st.layers.enable(G),st.viewport=new _e,z[G]=st),st.matrix.fromArray(tt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(tt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(et.x,et.y,et.width,et.height),G===0&&(y.matrix.copy(st.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),B===!0&&y.cameras.push(st)}}for(let ht=0;ht<M.length;ht++){const B=v[ht],G=M[ht];B!==null&&G!==void 0&&G.update(B,Q,c||a)}D&&D(W,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const ot=new kc;ot.setAnimationLoop(X),this.setAnimationLoop=function(W){D=W},this.dispose=function(){}}}function tg(n,t){function e(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function i(d,m){m.color.getRGB(d.fogColor.value,Fc(n)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,M,v,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(d,m):m.isMeshToonMaterial?(r(d,m),f(d,m)):m.isMeshPhongMaterial?(r(d,m),h(d,m)):m.isMeshStandardMaterial?(r(d,m),u(d,m),m.isMeshPhysicalMaterial&&p(d,m,b)):m.isMeshMatcapMaterial?(r(d,m),_(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),g(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(a(d,m),m.isLineDashedMaterial&&o(d,m)):m.isPointsMaterial?l(d,m,M,v):m.isSpriteMaterial?c(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,e(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===qe&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,e(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===qe&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,e(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,e(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const M=t.get(m).envMap;if(M&&(d.envMap.value=M,d.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap){d.lightMap.value=m.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,d.lightMapTransform)}m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,d.aoMapTransform))}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform))}function o(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,M,v){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*M,d.scale.value=v*.5,m.map&&(d.map.value=m.map,e(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function c(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function h(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function u(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,d.roughnessMapTransform)),t.get(m).envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,M){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qe&&d.clearcoatNormalScale.value.negate())),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=M.texture,d.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,d.specularIntensityMapTransform))}function _(d,m){m.matcap&&(d.matcap.value=m.matcap)}function g(d,m){const M=t.get(m).light;d.referencePosition.value.setFromMatrixPosition(M.matrixWorld),d.nearDistance.value=M.shadow.camera.near,d.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function eg(n,t,e,i){let s={},r={},a=[];const o=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const b=v.program;i.uniformBlockBinding(M,b)}function c(M,v){let b=s[M.id];b===void 0&&(_(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",d));const P=v.program;i.updateUBOMapping(M,P);const E=t.render.frame;r[M.id]!==E&&(u(M),r[M.id]=E)}function h(M){const v=f();M.__bindingPointIndex=v;const b=n.createBuffer(),P=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,P,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,b),b}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const v=s[M.id],b=M.uniforms,P=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let E=0,A=b.length;E<A;E++){const z=Array.isArray(b[E])?b[E]:[b[E]];for(let y=0,T=z.length;y<T;y++){const O=z[y];if(p(O,E,y,P)===!0){const K=O.__offset,nt=Array.isArray(O.value)?O.value:[O.value];let L=0;for(let I=0;I<nt.length;I++){const N=nt[I],V=g(N);typeof N=="number"||typeof N=="boolean"?(O.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,K+L,O.__data)):N.isMatrix3?(O.__data[0]=N.elements[0],O.__data[1]=N.elements[1],O.__data[2]=N.elements[2],O.__data[3]=0,O.__data[4]=N.elements[3],O.__data[5]=N.elements[4],O.__data[6]=N.elements[5],O.__data[7]=0,O.__data[8]=N.elements[6],O.__data[9]=N.elements[7],O.__data[10]=N.elements[8],O.__data[11]=0):(N.toArray(O.__data,L),L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,K,O.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,v,b,P){const E=M.value,A=v+"_"+b;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{const z=P[A];if(typeof E=="number"||typeof E=="boolean"){if(z!==E)return P[A]=E,!0}else if(z.equals(E)===!1)return z.copy(E),!0}return!1}function _(M){const v=M.uniforms;let b=0;const P=16;for(let A=0,z=v.length;A<z;A++){const y=Array.isArray(v[A])?v[A]:[v[A]];for(let T=0,O=y.length;T<O;T++){const K=y[T],nt=Array.isArray(K.value)?K.value:[K.value];for(let L=0,I=nt.length;L<I;L++){const N=nt[L],V=g(N),q=b%P;q!==0&&P-q<V.boundary&&(b+=P-q),K.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=b,b+=V.storage}}}const E=b%P;return E>0&&(b+=P-E),M.__size=b,M.__cache={},this}function g(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function d(M){const v=M.target;v.removeEventListener("dispose",d);const b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class qc{constructor(t={}){const{canvas:e=ju(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this._useLegacyLights=!1,this.toneMapping=ri,this.toneMappingExposure=1;const v=this;let b=!1,P=0,E=0,A=null,z=-1,y=null;const T=new _e,O=new _e;let K=null;const nt=new ie(0);let L=0,I=e.width,N=e.height,V=1,q=null,Y=null;const D=new _e(0,0,I,N),X=new _e(0,0,I,N);let ot=!1;const W=new Bc;let Q=!1,ht=!1,B=null;const G=new we,tt=new re,et=new H,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function rt(){return A===null?V:1}let F=i;function wt(w,k){for(let Z=0;Z<w.length;Z++){const J=w[Z],j=e.getContext(J,k);if(j!==null)return j}return null}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yo}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const k=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&k.shift(),F=wt(k,w),F===null)throw wt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let xt,At,Mt,Gt,Ut,R,S,$,at,ct,ut,Et,pt,St,Lt,kt,lt,ee,Xt,zt,Pt,bt,Nt,Jt;function ue(){xt=new um(F),At=new sm(F,xt,t),xt.init(At),bt=new Z0(F,xt,At),Mt=new Y0(F,xt,At),Gt=new pm(F),Ut=new I0,R=new j0(F,xt,Mt,Ut,At,bt,Gt),S=new om(v),$=new hm(v),at=new xf(F,At),Nt=new nm(F,xt,at,At),ct=new fm(F,at,Gt,Nt),ut=new vm(F,ct,at,Gt),Xt=new _m(F,At,R),kt=new rm(Ut),Et=new U0(v,S,$,xt,At,Nt,kt),pt=new tg(v,Ut),St=new F0,Lt=new G0(xt,At),ee=new em(v,S,$,Mt,ut,u,l),lt=new q0(v,ut,At),Jt=new eg(F,Gt,At,Mt),zt=new im(F,xt,Gt,At),Pt=new dm(F,xt,Gt,At),Gt.programs=Et.programs,v.capabilities=At,v.extensions=xt,v.properties=Ut,v.renderLists=St,v.shadowMap=lt,v.state=Mt,v.info=Gt}ue();const Yt=new Q0(v,F);this.xr=Yt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const w=xt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=xt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(w){w!==void 0&&(V=w,this.setSize(I,N,!1))},this.getSize=function(w){return w.set(I,N)},this.setSize=function(w,k,Z=!0){if(Yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=w,N=k,e.width=Math.floor(w*V),e.height=Math.floor(k*V),Z===!0&&(e.style.width=w+"px",e.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(I*V,N*V).floor()},this.setDrawingBufferSize=function(w,k,Z){I=w,N=k,V=Z,e.width=Math.floor(w*Z),e.height=Math.floor(k*Z),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(T)},this.getViewport=function(w){return w.copy(D)},this.setViewport=function(w,k,Z,J){w.isVector4?D.set(w.x,w.y,w.z,w.w):D.set(w,k,Z,J),Mt.viewport(T.copy(D).multiplyScalar(V).floor())},this.getScissor=function(w){return w.copy(X)},this.setScissor=function(w,k,Z,J){w.isVector4?X.set(w.x,w.y,w.z,w.w):X.set(w,k,Z,J),Mt.scissor(O.copy(X).multiplyScalar(V).floor())},this.getScissorTest=function(){return ot},this.setScissorTest=function(w){Mt.setScissorTest(ot=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){Y=w},this.getClearColor=function(w){return w.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor.apply(ee,arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha.apply(ee,arguments)},this.clear=function(w=!0,k=!0,Z=!0){let J=0;if(w){let j=!1;if(A!==null){const yt=A.texture.format;j=yt===bc||yt===Sc||yt===xc}if(j){const yt=A.texture.type,Ct=yt===oi||yt===ei||yt===jo||yt===wi||yt===Mc||yt===yc,It=ee.getClearColor(),Bt=ee.getClearAlpha(),qt=It.r,Vt=It.g,Wt=It.b;Ct?(p[0]=qt,p[1]=Vt,p[2]=Wt,p[3]=Bt,F.clearBufferuiv(F.COLOR,0,p)):(_[0]=qt,_[1]=Vt,_[2]=Wt,_[3]=Bt,F.clearBufferiv(F.COLOR,0,_))}else J|=F.COLOR_BUFFER_BIT}k&&(J|=F.DEPTH_BUFFER_BIT),Z&&(J|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),St.dispose(),Lt.dispose(),Ut.dispose(),S.dispose(),$.dispose(),ut.dispose(),Nt.dispose(),Jt.dispose(),Et.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",Oe),Yt.removeEventListener("sessionend",he),B&&(B.dispose(),B=null),ze.stop()};function dt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const w=Gt.autoReset,k=lt.enabled,Z=lt.autoUpdate,J=lt.needsUpdate,j=lt.type;ue(),Gt.autoReset=w,lt.enabled=k,lt.autoUpdate=Z,lt.needsUpdate=J,lt.type=j}function gt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function _t(w){const k=w.target;k.removeEventListener("dispose",_t),Ft(k)}function Ft(w){Dt(w),Ut.remove(w)}function Dt(w){const k=Ut.get(w).programs;k!==void 0&&(k.forEach(function(Z){Et.releaseProgram(Z)}),w.isShaderMaterial&&Et.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,Z,J,j,yt){k===null&&(k=st);const Ct=j.isMesh&&j.matrixWorld.determinant()<0,It=Ch(w,k,Z,J,j);Mt.setMaterial(J,Ct);let Bt=Z.index,qt=1;if(J.wireframe===!0){if(Bt=ct.getWireframeAttribute(Z),Bt===void 0)return;qt=2}const Vt=Z.drawRange,Wt=Z.attributes.position;let ge=Vt.start*qt,je=(Vt.start+Vt.count)*qt;yt!==null&&(ge=Math.max(ge,yt.start*qt),je=Math.min(je,(yt.start+yt.count)*qt)),Bt!==null?(ge=Math.max(ge,0),je=Math.min(je,Bt.count)):Wt!=null&&(ge=Math.max(ge,0),je=Math.min(je,Wt.count));const Ee=je-ge;if(Ee<0||Ee===1/0)return;Nt.setup(j,J,It,Z,Bt);let Un,de=zt;if(Bt!==null&&(Un=at.get(Bt),de=Pt,de.setIndex(Un)),j.isMesh)J.wireframe===!0?(Mt.setLineWidth(J.wireframeLinewidth*rt()),de.setMode(F.LINES)):de.setMode(F.TRIANGLES);else if(j.isLine){let jt=J.linewidth;jt===void 0&&(jt=1),Mt.setLineWidth(jt*rt()),j.isLineSegments?de.setMode(F.LINES):j.isLineLoop?de.setMode(F.LINE_LOOP):de.setMode(F.LINE_STRIP)}else j.isPoints?de.setMode(F.POINTS):j.isSprite&&de.setMode(F.TRIANGLES);if(j.isBatchedMesh)de.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)de.renderInstances(ge,Ee,j.count);else if(Z.isInstancedBufferGeometry){const jt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Or=Math.min(Z.instanceCount,jt);de.renderInstances(ge,Ee,Or)}else de.render(ge,Ee)};function le(w,k,Z){w.transparent===!0&&w.side===Vn&&w.forceSinglePass===!1?(w.side=qe,w.needsUpdate=!0,Is(w,k,Z),w.side=ai,w.needsUpdate=!0,Is(w,k,Z),w.side=Vn):Is(w,k,Z)}this.compile=function(w,k,Z=null){Z===null&&(Z=w),d=Lt.get(Z),d.init(),M.push(d),Z.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),w!==Z&&w.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),d.setupLights(v._useLegacyLights);const J=new Set;return w.traverse(function(j){const yt=j.material;if(yt)if(Array.isArray(yt))for(let Ct=0;Ct<yt.length;Ct++){const It=yt[Ct];le(It,Z,j),J.add(It)}else le(yt,Z,j),J.add(yt)}),M.pop(),d=null,J},this.compileAsync=function(w,k,Z=null){const J=this.compile(w,k,Z);return new Promise(j=>{function yt(){if(J.forEach(function(Ct){Ut.get(Ct).currentProgram.isReady()&&J.delete(Ct)}),J.size===0){j(w);return}setTimeout(yt,10)}xt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let ce=null;function be(w){ce&&ce(w)}function Oe(){ze.stop()}function he(){ze.start()}const ze=new kc;ze.setAnimationLoop(be),typeof self<"u"&&ze.setContext(self),this.setAnimationLoop=function(w){ce=w,Yt.setAnimationLoop(w),w===null?ze.stop():ze.start()},Yt.addEventListener("sessionstart",Oe),Yt.addEventListener("sessionend",he),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(k),k=Yt.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,k,A),d=Lt.get(w,M.length),d.init(),M.push(d),G.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),W.setFromProjectionMatrix(G),ht=this.localClippingEnabled,Q=kt.init(this.clippingPlanes,ht),g=St.get(w,m.length),g.init(),m.push(g),yn(w,k,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(q,Y),this.info.render.frame++,Q===!0&&kt.beginShadows();const Z=d.state.shadowsArray;if(lt.render(Z,w,k),Q===!0&&kt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ee.render(g,w),d.setupLights(v._useLegacyLights),k.isArrayCamera){const J=k.cameras;for(let j=0,yt=J.length;j<yt;j++){const Ct=J[j];la(g,w,Ct,Ct.viewport)}}else la(g,w,k);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(v,w,k),Nt.resetDefaultState(),z=-1,y=null,M.pop(),M.length>0?d=M[M.length-1]:d=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function yn(w,k,Z,J){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)Z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)d.pushLight(w),w.castShadow&&d.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){J&&et.setFromMatrixPosition(w.matrixWorld).applyMatrix4(G);const Ct=ut.update(w),It=w.material;It.visible&&g.push(w,Ct,It,Z,et.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const Ct=ut.update(w),It=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),et.copy(w.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),et.copy(Ct.boundingSphere.center)),et.applyMatrix4(w.matrixWorld).applyMatrix4(G)),Array.isArray(It)){const Bt=Ct.groups;for(let qt=0,Vt=Bt.length;qt<Vt;qt++){const Wt=Bt[qt],ge=It[Wt.materialIndex];ge&&ge.visible&&g.push(w,Ct,ge,Z,et.z,Wt)}}else It.visible&&g.push(w,Ct,It,Z,et.z,null)}}const yt=w.children;for(let Ct=0,It=yt.length;Ct<It;Ct++)yn(yt[Ct],k,Z,J)}function la(w,k,Z,J){const j=w.opaque,yt=w.transmissive,Ct=w.transparent;d.setupLightsView(Z),Q===!0&&kt.setGlobalState(v.clippingPlanes,Z),yt.length>0&&Rh(j,yt,k,Z),J&&Mt.viewport(T.copy(J)),j.length>0&&Us(j,k,Z),yt.length>0&&Us(yt,k,Z),Ct.length>0&&Us(Ct,k,Z),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Rh(w,k,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;const yt=At.isWebGL2;B===null&&(B=new Pi(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")?ws:oi,minFilter:Ts,samples:yt?4:0})),v.getDrawingBufferSize(tt),yt?B.setSize(tt.x,tt.y):B.setSize(Er(tt.x),Er(tt.y));const Ct=v.getRenderTarget();v.setRenderTarget(B),v.getClearColor(nt),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const It=v.toneMapping;v.toneMapping=ri,Us(w,Z,J),R.updateMultisampleRenderTarget(B),R.updateRenderTargetMipmap(B);let Bt=!1;for(let qt=0,Vt=k.length;qt<Vt;qt++){const Wt=k[qt],ge=Wt.object,je=Wt.geometry,Ee=Wt.material,Un=Wt.group;if(Ee.side===Vn&&ge.layers.test(J.layers)){const de=Ee.side;Ee.side=qe,Ee.needsUpdate=!0,ca(ge,Z,J,je,Ee,Un),Ee.side=de,Ee.needsUpdate=!0,Bt=!0}}Bt===!0&&(R.updateMultisampleRenderTarget(B),R.updateRenderTargetMipmap(B)),v.setRenderTarget(Ct),v.setClearColor(nt,L),v.toneMapping=It}function Us(w,k,Z){const J=k.isScene===!0?k.overrideMaterial:null;for(let j=0,yt=w.length;j<yt;j++){const Ct=w[j],It=Ct.object,Bt=Ct.geometry,qt=J===null?Ct.material:J,Vt=Ct.group;It.layers.test(Z.layers)&&ca(It,k,Z,Bt,qt,Vt)}}function ca(w,k,Z,J,j,yt){w.onBeforeRender(v,k,Z,J,j,yt),w.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),j.onBeforeRender(v,k,Z,J,w,yt),j.transparent===!0&&j.side===Vn&&j.forceSinglePass===!1?(j.side=qe,j.needsUpdate=!0,v.renderBufferDirect(Z,k,J,j,w,yt),j.side=ai,j.needsUpdate=!0,v.renderBufferDirect(Z,k,J,j,w,yt),j.side=Vn):v.renderBufferDirect(Z,k,J,j,w,yt),w.onAfterRender(v,k,Z,J,j,yt)}function Is(w,k,Z){k.isScene!==!0&&(k=st);const J=Ut.get(w),j=d.state.lights,yt=d.state.shadowsArray,Ct=j.state.version,It=Et.getParameters(w,j.state,yt,k,Z),Bt=Et.getProgramCacheKey(It);let qt=J.programs;J.environment=w.isMeshStandardMaterial?k.environment:null,J.fog=k.fog,J.envMap=(w.isMeshStandardMaterial?$:S).get(w.envMap||J.environment),qt===void 0&&(w.addEventListener("dispose",_t),qt=new Map,J.programs=qt);let Vt=qt.get(Bt);if(Vt!==void 0){if(J.currentProgram===Vt&&J.lightsStateVersion===Ct)return ua(w,It),Vt}else It.uniforms=Et.getUniforms(w),w.onBuild(Z,It,v),w.onBeforeCompile(It,v),Vt=Et.acquireProgram(It,Bt),qt.set(Bt,Vt),J.uniforms=It.uniforms;const Wt=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Wt.clippingPlanes=kt.uniform),ua(w,It),J.needsLights=Lh(w),J.lightsStateVersion=Ct,J.needsLights&&(Wt.ambientLightColor.value=j.state.ambient,Wt.lightProbe.value=j.state.probe,Wt.directionalLights.value=j.state.directional,Wt.directionalLightShadows.value=j.state.directionalShadow,Wt.spotLights.value=j.state.spot,Wt.spotLightShadows.value=j.state.spotShadow,Wt.rectAreaLights.value=j.state.rectArea,Wt.ltc_1.value=j.state.rectAreaLTC1,Wt.ltc_2.value=j.state.rectAreaLTC2,Wt.pointLights.value=j.state.point,Wt.pointLightShadows.value=j.state.pointShadow,Wt.hemisphereLights.value=j.state.hemi,Wt.directionalShadowMap.value=j.state.directionalShadowMap,Wt.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Wt.spotShadowMap.value=j.state.spotShadowMap,Wt.spotLightMatrix.value=j.state.spotLightMatrix,Wt.spotLightMap.value=j.state.spotLightMap,Wt.pointShadowMap.value=j.state.pointShadowMap,Wt.pointShadowMatrix.value=j.state.pointShadowMatrix),J.currentProgram=Vt,J.uniformsList=null,Vt}function ha(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=mr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function ua(w,k){const Z=Ut.get(w);Z.outputColorSpace=k.outputColorSpace,Z.batching=k.batching,Z.instancing=k.instancing,Z.instancingColor=k.instancingColor,Z.skinning=k.skinning,Z.morphTargets=k.morphTargets,Z.morphNormals=k.morphNormals,Z.morphColors=k.morphColors,Z.morphTargetsCount=k.morphTargetsCount,Z.numClippingPlanes=k.numClippingPlanes,Z.numIntersection=k.numClipIntersection,Z.vertexAlphas=k.vertexAlphas,Z.vertexTangents=k.vertexTangents,Z.toneMapping=k.toneMapping}function Ch(w,k,Z,J,j){k.isScene!==!0&&(k=st),R.resetTextureUnits();const yt=k.fog,Ct=J.isMeshStandardMaterial?k.environment:null,It=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Pn,Bt=(J.isMeshStandardMaterial?$:S).get(J.envMap||Ct),qt=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Vt=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Wt=!!Z.morphAttributes.position,ge=!!Z.morphAttributes.normal,je=!!Z.morphAttributes.color;let Ee=ri;J.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ee=v.toneMapping);const Un=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,de=Un!==void 0?Un.length:0,jt=Ut.get(J),Or=d.state.lights;if(Q===!0&&(ht===!0||w!==y)){const en=w===y&&J.id===z;kt.setState(J,w,en)}let pe=!1;J.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Or.state.version||jt.outputColorSpace!==It||j.isBatchedMesh&&jt.batching===!1||!j.isBatchedMesh&&jt.batching===!0||j.isInstancedMesh&&jt.instancing===!1||!j.isInstancedMesh&&jt.instancing===!0||j.isSkinnedMesh&&jt.skinning===!1||!j.isSkinnedMesh&&jt.skinning===!0||j.isInstancedMesh&&jt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&jt.instancingColor===!1&&j.instanceColor!==null||jt.envMap!==Bt||J.fog===!0&&jt.fog!==yt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==kt.numPlanes||jt.numIntersection!==kt.numIntersection)||jt.vertexAlphas!==qt||jt.vertexTangents!==Vt||jt.morphTargets!==Wt||jt.morphNormals!==ge||jt.morphColors!==je||jt.toneMapping!==Ee||At.isWebGL2===!0&&jt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,jt.__version=J.version);let hi=jt.currentProgram;pe===!0&&(hi=Is(J,k,j));let fa=!1,us=!1,zr=!1;const Le=hi.getUniforms(),ui=jt.uniforms;if(Mt.useProgram(hi.program)&&(fa=!0,us=!0,zr=!0),J.id!==z&&(z=J.id,us=!0),fa||y!==w){Le.setValue(F,"projectionMatrix",w.projectionMatrix),Le.setValue(F,"viewMatrix",w.matrixWorldInverse);const en=Le.map.cameraPosition;en!==void 0&&en.setValue(F,et.setFromMatrixPosition(w.matrixWorld)),At.logarithmicDepthBuffer&&Le.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Le.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,us=!0,zr=!0)}if(j.isSkinnedMesh){Le.setOptional(F,j,"bindMatrix"),Le.setOptional(F,j,"bindMatrixInverse");const en=j.skeleton;en&&(At.floatVertexTextures?(en.boneTexture===null&&en.computeBoneTexture(),Le.setValue(F,"boneTexture",en.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(Le.setOptional(F,j,"batchingTexture"),Le.setValue(F,"batchingTexture",j._matricesTexture,R));const Br=Z.morphAttributes;if((Br.position!==void 0||Br.normal!==void 0||Br.color!==void 0&&At.isWebGL2===!0)&&Xt.update(j,Z,hi),(us||jt.receiveShadow!==j.receiveShadow)&&(jt.receiveShadow=j.receiveShadow,Le.setValue(F,"receiveShadow",j.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(ui.envMap.value=Bt,ui.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),us&&(Le.setValue(F,"toneMappingExposure",v.toneMappingExposure),jt.needsLights&&Ph(ui,zr),yt&&J.fog===!0&&pt.refreshFogUniforms(ui,yt),pt.refreshMaterialUniforms(ui,J,V,N,B),mr.upload(F,ha(jt),ui,R)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(mr.upload(F,ha(jt),ui,R),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Le.setValue(F,"center",j.center),Le.setValue(F,"modelViewMatrix",j.modelViewMatrix),Le.setValue(F,"normalMatrix",j.normalMatrix),Le.setValue(F,"modelMatrix",j.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const en=J.uniformsGroups;for(let kr=0,Dh=en.length;kr<Dh;kr++)if(At.isWebGL2){const da=en[kr];Jt.update(da,hi),Jt.bind(da,hi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return hi}function Ph(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Lh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,k,Z){Ut.get(w.texture).__webglTexture=k,Ut.get(w.depthTexture).__webglTexture=Z;const J=Ut.get(w);J.__hasExternalTextures=!0,J.__hasExternalTextures&&(J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,k){const Z=Ut.get(w);Z.__webglFramebuffer=k,Z.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,Z=0){A=w,P=k,E=Z;let J=!0,j=null,yt=!1,Ct=!1;if(w){const Bt=Ut.get(w);Bt.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(F.FRAMEBUFFER,null),J=!1):Bt.__webglFramebuffer===void 0?R.setupRenderTarget(w):Bt.__hasExternalTextures&&R.rebindTextures(w,Ut.get(w.texture).__webglTexture,Ut.get(w.depthTexture).__webglTexture);const qt=w.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Ct=!0);const Vt=Ut.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Vt[k])?j=Vt[k][Z]:j=Vt[k],yt=!0):At.isWebGL2&&w.samples>0&&R.useMultisampledRTT(w)===!1?j=Ut.get(w).__webglMultisampledFramebuffer:Array.isArray(Vt)?j=Vt[Z]:j=Vt,T.copy(w.viewport),O.copy(w.scissor),K=w.scissorTest}else T.copy(D).multiplyScalar(V).floor(),O.copy(X).multiplyScalar(V).floor(),K=ot;if(Mt.bindFramebuffer(F.FRAMEBUFFER,j)&&At.drawBuffers&&J&&Mt.drawBuffers(w,j),Mt.viewport(T),Mt.scissor(O),Mt.setScissorTest(K),yt){const Bt=Ut.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,Bt.__webglTexture,Z)}else if(Ct){const Bt=Ut.get(w.texture),qt=k||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Bt.__webglTexture,Z||0,qt)}z=-1},this.readRenderTargetPixels=function(w,k,Z,J,j,yt,Ct){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=Ut.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ct!==void 0&&(It=It[Ct]),It){Mt.bindFramebuffer(F.FRAMEBUFFER,It);try{const Bt=w.texture,qt=Bt.format,Vt=Bt.type;if(qt!==_n&&bt.convert(qt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Wt=Vt===ws&&(xt.has("EXT_color_buffer_half_float")||At.isWebGL2&&xt.has("EXT_color_buffer_float"));if(Vt!==oi&&bt.convert(Vt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===ni&&(At.isWebGL2||xt.has("OES_texture_float")||xt.has("WEBGL_color_buffer_float")))&&!Wt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-J&&Z>=0&&Z<=w.height-j&&F.readPixels(k,Z,J,j,bt.convert(qt),bt.convert(Vt),yt)}finally{const Bt=A!==null?Ut.get(A).__webglFramebuffer:null;Mt.bindFramebuffer(F.FRAMEBUFFER,Bt)}}},this.copyFramebufferToTexture=function(w,k,Z=0){const J=Math.pow(2,-Z),j=Math.floor(k.image.width*J),yt=Math.floor(k.image.height*J);R.setTexture2D(k,0),F.copyTexSubImage2D(F.TEXTURE_2D,Z,0,0,w.x,w.y,j,yt),Mt.unbindTexture()},this.copyTextureToTexture=function(w,k,Z,J=0){const j=k.image.width,yt=k.image.height,Ct=bt.convert(Z.format),It=bt.convert(Z.type);R.setTexture2D(Z,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Z.unpackAlignment),k.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,J,w.x,w.y,j,yt,Ct,It,k.image.data):k.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,J,w.x,w.y,k.mipmaps[0].width,k.mipmaps[0].height,Ct,k.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,J,w.x,w.y,Ct,It,k.image),J===0&&Z.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(w,k,Z,J,j=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const yt=w.max.x-w.min.x+1,Ct=w.max.y-w.min.y+1,It=w.max.z-w.min.z+1,Bt=bt.convert(J.format),qt=bt.convert(J.type);let Vt;if(J.isData3DTexture)R.setTexture3D(J,0),Vt=F.TEXTURE_3D;else if(J.isDataArrayTexture||J.isCompressedArrayTexture)R.setTexture2DArray(J,0),Vt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,J.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,J.unpackAlignment);const Wt=F.getParameter(F.UNPACK_ROW_LENGTH),ge=F.getParameter(F.UNPACK_IMAGE_HEIGHT),je=F.getParameter(F.UNPACK_SKIP_PIXELS),Ee=F.getParameter(F.UNPACK_SKIP_ROWS),Un=F.getParameter(F.UNPACK_SKIP_IMAGES),de=Z.isCompressedTexture?Z.mipmaps[j]:Z.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,de.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,de.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,w.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,w.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,w.min.z),Z.isDataTexture||Z.isData3DTexture?F.texSubImage3D(Vt,j,k.x,k.y,k.z,yt,Ct,It,Bt,qt,de.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Vt,j,k.x,k.y,k.z,yt,Ct,It,Bt,de.data)):F.texSubImage3D(Vt,j,k.x,k.y,k.z,yt,Ct,It,Bt,qt,de),F.pixelStorei(F.UNPACK_ROW_LENGTH,Wt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ge),F.pixelStorei(F.UNPACK_SKIP_PIXELS,je),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ee),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Un),j===0&&J.generateMipmaps&&F.generateMipmap(Vt),Mt.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Mt.unbindTexture()},this.resetState=function(){P=0,E=0,A=null,Mt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Zo?"display-p3":"srgb",e.unpackColorSpace=ae.workingColorSpace===Dr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pe?Ri:Tc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ri?Pe:Pn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class ng extends qc{}ng.prototype.isWebGL1Renderer=!0;class ea{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new ie(t),this.near=e,this.far=i}clone(){return new ea(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ig extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class sg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Oo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new H;class an{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array),s=oe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),i=oe(i,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new vn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new an(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class rg extends Yn{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,s=new H,r=new H;if(t.index!==null){const a=t.attributes.position,o=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const f=l[c],u=f.start,p=f.count;for(let _=u,g=u+p;_<g;_+=3)for(let d=0;d<3;d++){const m=o.getX(_+d),M=o.getX(_+(d+1)%3);s.fromBufferAttribute(a,m),r.fromBufferAttribute(a,M),Ul(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const a=t.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,f=3*o+(c+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,f),Ul(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Cn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Ul(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(s)===!0?!1:(e.add(i),e.add(s),!0)}class og extends Yn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Rs extends sg{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Il=new H,ir=new H;class ag{constructor(t=new H,e=new H){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Il.subVectors(t,this.start),ir.subVectors(this.end,this.start);const i=ir.dot(ir);let r=ir.dot(Il)/i;return e&&(r=Ne(r,0,1)),r}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);const lg={songbird:{view:{x0:-4,x1:14,y0:-6,y1:8},silhouette:[[-3.2,-1.2],[-1.6,-3.4],[1.6,-4.6],[5.2,-4.4],[7.8,-2.6],[9,-.4],[9.6,1.8],[10.4,2.4],[12.8,2.6],[10.6,3],[9.8,3.6],[9.2,4.6],[7.6,5.2],[6,4.6],[4.2,2.8],[2,2],[-.2,1.6],[-3.6,1.4],[-3.4,.2]],parts:[{shade:.2,pts:[[8.6,4],[8.95,4.3],[9.2,4],[8.95,3.7]]}],tubes:[{tube:"bronchusL",path:[[3.4,-1.9],[4.4,-1.4]],label:"Left bronchus",inView:!1},{tube:"bronchusR",path:[[3.4,-.9],[4.4,-1.2]],label:"Right bronchus",inView:!1},{tube:"trachea",path:[[4.4,-1.3],[5.6,-.4],[6.8,.8],[7.8,1.9],[8.6,2.5]],label:"Trachea"},{tube:"beak",path:[[9.4,2.75],[10.6,2.75],[12.4,2.7]],label:"Beak"}],tubeScale:1.6,sources:[{key:"left",at:[4.2,-1.6],label:"Left voice"},{key:"right",at:[4.2,-1],label:"Right voice"}]},seal:{view:{x0:-60,x1:60,y0:-30,y1:30},silhouette:[[-58,-2],[-50,-8],[-30,-14],[-5,-16],[20,-14],[38,-10],[48,-6],[55,-3],[58,1],[56,5],[50,8],[42,10],[30,11],[10,13],[-15,13],[-35,10],[-50,6],[-56,3],[-62,8],[-64,4],[-60,0],[-64,-4],[-62,-8]],parts:[{shade:.15,pts:[[47,4],[48.5,5],[50,4],[48.5,3]]}],tubes:[{tube:"trachea",path:[[8,-4],[20,-3],[30,-2]],label:"Trachea"},{tube:"pharynx",path:[[30,-2],[38,0],[44,1.5]],label:"Pharynx"},{tube:"oral",path:[[44,1.5],[50,.5],[57,-.5]],label:"Mouth"}],tubeScale:1.3,sources:[{key:"glottis",at:[30,-2],label:"Larynx"}]},alligator:{view:{x0:-120,x1:120,y0:-40,y1:40},silhouette:[[-118,2],[-90,-4],[-60,-8],[-30,-14],[0,-16],[30,-14],[50,-10],[70,-8],[95,-5],[114,-3],[118,0],[115,3],[98,5],[75,7],[52,9],[40,12],[20,14],[-10,14],[-40,11],[-70,7],[-100,4]],parts:[{shade:.15,pts:[[54,9],[56,11],[58,9],[56,8]]}],tubes:[{tube:"trachea",path:[[0,-6],[18,-5],[36,-4]],label:"Trachea"},{tube:"pharynx",path:[[36,-4],[46,-2],[54,0]],label:"Pharynx"},{tube:"oral",path:[[54,0],[80,-1],[112,-1]],label:"Mouth"},{tube:"nasal",path:[[54,2],[80,4],[113,2]],label:"Nostrils"}],tubeScale:1.05,sources:[{key:"glottis",at:[36,-4],label:"Larynx"}]},elephant:{view:{x0:-170,x1:170,y0:-170,y1:130},silhouette:[[-160,20],[-150,70],[-110,105],[-40,118],[30,115],[70,100],[95,112],[120,108],[140,85],[148,55],[146,25],[140,5],[132,-20],[128,-60],[122,-110],[118,-150],[108,-152],[112,-100],[110,-50],[104,-20],[96,-5],[80,0],[70,-10],[66,-90],[40,-95],[44,-30],[-90,-30],[-95,-95],[-125,-95],[-122,-10],[-150,-5]],parts:[{shade:.15,pts:[[118,62],[122,66],[126,62],[122,58]]},{shade:.62,pts:[[70,100],[40,60],[55,25],[85,40],[95,80]]}],tubes:[{tube:"trachea",path:[[40,20],[70,30],[95,38]],label:"Trachea"},{tube:"pharynx",path:[[95,38],[112,50],[124,58]],label:"Pharynx"},{tube:"oral",path:[[124,58],[130,42],[134,30]],label:"Mouth"},{tube:"trunk",path:[[136,70],[142,40],[136,0],[128,-50],[120,-100],[113,-148]],label:"Trunk"}],tubeScale:3,sources:[{key:"glottis",at:[95,38],label:"Vocal folds"},{key:"lips",at:[136,70],label:"Trunk valve"}]}},Ve=as("catalog"),wr=Ve.neutral;Ve.bodies.male;Ve.bodies.female;Ve.bodies.child;const bi=Ve.articKeys;Ve.articSpecs;Ve.defaultSource;Ve.exhaleLabel;Ve.bassNote;Ve.beatSounds;Ve.beatPresets;const cg=Ve.vowelTargets;Ve.demoSongs;const hg=Ve.vowels;Ve.creatures.map(n=>({...n,visual:lg[n.id]}));class ug{constructor(t){this.scale=t.scale,this.ph=t.pharynx}P(t,e){const i=this.scale,s=t>.5?.5+(t-.5)*.86:t,r=e<7?7-(7-e)*this.ph:e;return{x:s*i,y:r*i}}unP(t,e){const i=this.scale;let s=t/i,r=e/i;return s>.5&&(s=.5+(s-.5)/.86),r<7&&(r=7-(7-r)/this.ph),{x:s,y:r}}}function fg(n,t){return as("model",{body:n,sampleRate:t})}function dg(n){as("dropModel",{model:n.model})}function pg(n,t){return as("frame",{model:n.model,artic:t})}function mg(n,t){return as("apply",{model:n.model,artic:t})}function gg(n,t){return as("transfer",{model:n.model,artic:t})}const mt={blue:"#4fb6f2",blueMid:"#3487c4",blueDim:"#1f5f8c",frame:"#133954",green:"#5be381",red:"#ff5d40",pink:"#ff73cf",white:"#eef6f8",amber:"#ffb340"};mt.green,mt.red,mt.pink,mt.white;function cn(n,t,e){const i=parseInt(n.slice(1),16),s=parseInt(t.slice(1),16),r=a=>Math.round((i>>a&255)*(1-e)+(s>>a&255)*e);return"#"+[16,8,0].map(a=>r(a).toString(16).padStart(2,"0")).join("")}const na=n=>cn(n,"#ffffff",.55),Bn=[[0,"#3a2408"],[.35,"#c9822a"],[.6,"#ffb340"],[.82,"#ffe39a"],[1,"#fff8ec"]];function _g(n){const t=Math.max(0,Math.min(1,n));for(let e=1;e<Bn.length;e++)if(t<=Bn[e][0])return cn(Bn[e-1][1],Bn[e][1],(t-Bn[e-1][0])/(Bn[e][0]-Bn[e-1][0]));return Bn[Bn.length-1][1]}mt.frame,mt.blue,mt.blueMid,mt.amber;const vg=n=>{if(!(n>0))return 0;const t=Math.log10(40),e=Math.log10(4e3);return Math.max(0,Math.min(1,(Math.log10(n)-t)/(e-t)))},Mg=(n,t)=>Math.hypot(n.x-t.x,n.y-t.y),Yc=(n,t,e)=>{const i=Math.sin(e),s=Math.cos(e),r=n.x-t.x,a=n.y-t.y;return{x:t.x+r*s-a*i,y:t.y+r*i+a*s}};function Hn(n,t){if(n.length<3)return n.slice();const e=[];for(let i=0;i<n.length-1;i++){const s=n[Math.max(0,i-1)],r=n[i],a=n[i+1],o=n[Math.min(n.length-1,i+2)];for(let l=0;l<t;l++){const c=l/t,h=c*c,f=h*c;e.push({x:.5*(2*r.x+(-s.x+a.x)*c+(2*s.x-5*r.x+4*a.x-o.x)*h+(-s.x+3*r.x-3*a.x+o.x)*f),y:.5*(2*r.y+(-s.y+a.y)*c+(2*s.y-5*r.y+4*a.y-o.y)*h+(-s.y+3*r.y-3*a.y+o.y)*f)})}}return e.push(n[n.length-1]),e}const jc='"Hershey", "Archivo", system-ui, sans-serif',ia=(n,t="l")=>`${t==="m"?500:300} ${n}px ${jc}`,Zc=typeof CanvasRenderingContext2D<"u"&&"letterSpacing"in CanvasRenderingContext2D.prototype;function Kc(n,t=!1){const e=new Path2D;if(n.length===0)return e;e.moveTo(n[0][0],n[0][1]);for(let i=1;i<n.length;i++)e.lineTo(n[i][0],n[i][1]);return t&&e.closePath(),e}function it(n,t,e,i,s={}){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.lineJoin="round",n.lineCap="round",n.setLineDash(s.dash??[]),n.strokeStyle=e,n.lineWidth=i,n.stroke(t),s.hot&&(n.globalCompositeOperation="source-over",n.strokeStyle=na(e),n.lineWidth=i*.42,n.stroke(t)),n.restore()}function Jc(n,t,e,i,s={}){t.length<2||it(n,Kc(t,s.close),e,i,s)}function Ot(n,t,e,i,s,r,a,o={}){const l=new Path2D;l.moveTo(t,e),l.lineTo(i,s),it(n,l,r,a,o)}function Fe(n,t,e,i,s,r=1.2,a={}){const o=new Path2D;o.arc(t,e,i,0,Math.PI*2),it(n,o,s,r,a)}function ve(n,t,e,i,s,r=1){n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=r,n.fillStyle=s,n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.fill(),n.restore()}function vt(n,t,e,i,s={}){const r=s.size??11;n.save(),n.globalCompositeOperation="lighter",n.globalAlpha=s.alpha??1,n.font=ia(r,s.weight),Zc&&(n.letterSpacing=`${((s.ls??.14)*r).toFixed(2)}px`),n.textAlign=s.align??"left",n.textBaseline=s.baseline??"alphabetic",n.fillStyle=s.color??mt.blue;const a=n;s.moving&&(a.layoutMoving=!0),n.fillText(t,e,i),a.layoutMoving=void 0,n.restore()}function me(n,t,e={}){const i=e.size??11;n.save(),n.font=ia(i,e.weight),Zc&&(n.letterSpacing=`${((e.ls??.14)*i).toFixed(2)}px`);const s=n.measureText(t).width;return n.restore(),s}function Di(n,t,e,i={}){const s=[];for(const r of t.split(/\s+/)){const a=s[s.length-1];a!==void 0&&me(n,`${a} ${r}`,i)<=e?s[s.length-1]=`${a} ${r}`:s.push(r)}return s}const yg=(n=11)=>n*1.6;function Qc(n,t,e,i,s,r={}){const a=r.size??11,o=Di(n,t,s,r),l=yg(a),c=i-(o.length-1)*l/2+a*.35;o.forEach((h,f)=>vt(n,h,e,c+f*l,r))}function Ho(n,t=2){let e=n.length>1&&n[0][0]===n[n.length-1][0]&&n[0][1]===n[n.length-1][1]?n.slice(0,-1):n.slice();for(let i=0;i<t;i++){const s=[];for(let r=0;r<e.length;r++){const a=e[r],o=e[(r+1)%e.length];s.push([a[0]*.75+o[0]*.25,a[1]*.75+o[1]*.25],[a[0]*.25+o[0]*.75,a[1]*.25+o[1]*.75])}e=s}return e.length?[...e,e[0]]:e}class th{constructor(t=2,e=.75,i=4){this.sigma=t,this.alpha=e,this.down=i,this.small=document.createElement("canvas"),this.sctx=this.small.getContext("2d"),this.canFilter=typeof this.sctx.filter=="string"}apply(t,e,i){const s=t.width,r=t.height,a=Math.max(1,Math.round(s/this.down)),o=Math.max(1,Math.round(r/this.down));(this.small.width!==a||this.small.height!==o)&&(this.small.width=a,this.small.height=o);const l=this.sctx;l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation="copy",this.canFilter&&(l.filter=`blur(${(this.sigma*i/this.down).toFixed(2)}px)`),l.drawImage(t,0,0,a,o),this.canFilter&&(l.filter="none"),e.save(),e.setTransform(1,0,0,1,0,0),e.globalCompositeOperation="screen",e.globalAlpha=this.alpha,e.imageSmoothingEnabled=!0,e.imageSmoothingQuality="high",e.drawImage(this.small,0,0,s,r),e.restore()}}const Nl=new ci,sr=new H;class Go extends og{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Cn(t,3)),this.setAttribute("uv",new Cn(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Rs(e,6,1);return this.setAttribute("instanceStart",new an(i,3,0)),this.setAttribute("instanceEnd",new an(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Rs(e,6,1);return this.setAttribute("instanceColorStart",new an(i,3,0)),this.setAttribute("instanceColorEnd",new an(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new rg(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Nl.setFromBufferAttribute(e),this.boundingBox.union(Nl))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)sr.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(sr)),sr.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(sr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}ft.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new re(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Xe.line={uniforms:Jo.merge([ft.common,ft.fog,ft.line]),vertexShader:`
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
		`};class eh extends li{constructor(t){super({type:"LineMaterial",uniforms:Jo.clone(Xe.line.uniforms),vertexShader:Xe.line.vertexShader,fragmentShader:Xe.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const Fl=new H,Ol=new H,Ae=new _e,Re=new _e,xn=new _e,Mo=new H,yo=new we,Ce=new ag,zl=new H,rr=new ci,or=new Ps,Sn=new _e;let An,Ci;function Bl(n,t,e){return Sn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),Sn.multiplyScalar(1/Sn.w),Sn.x=Ci/e.width,Sn.y=Ci/e.height,Sn.applyMatrix4(n.projectionMatrixInverse),Sn.multiplyScalar(1/Sn.w),Math.abs(Math.max(Sn.x,Sn.y))}function xg(n,t){const e=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){Ce.start.fromBufferAttribute(s,o),Ce.end.fromBufferAttribute(r,o),Ce.applyMatrix4(e);const c=new H,h=new H;An.distanceSqToSegment(Ce.start,Ce.end,h,c),h.distanceTo(c)<Ci*.5&&t.push({point:h,pointOnLine:c,distance:An.origin.distanceTo(h),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Sg(n,t,e){const i=t.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),f=-t.near;An.at(1,xn),xn.w=1,xn.applyMatrix4(t.matrixWorldInverse),xn.applyMatrix4(i),xn.multiplyScalar(1/xn.w),xn.x*=r.x/2,xn.y*=r.y/2,xn.z=0,Mo.copy(xn),yo.multiplyMatrices(t.matrixWorldInverse,a);for(let u=0,p=h;u<p;u++){if(Ae.fromBufferAttribute(l,u),Re.fromBufferAttribute(c,u),Ae.w=1,Re.w=1,Ae.applyMatrix4(yo),Re.applyMatrix4(yo),Ae.z>f&&Re.z>f)continue;if(Ae.z>f){const v=Ae.z-Re.z,b=(Ae.z-f)/v;Ae.lerp(Re,b)}else if(Re.z>f){const v=Re.z-Ae.z,b=(Re.z-f)/v;Re.lerp(Ae,b)}Ae.applyMatrix4(i),Re.applyMatrix4(i),Ae.multiplyScalar(1/Ae.w),Re.multiplyScalar(1/Re.w),Ae.x*=r.x/2,Ae.y*=r.y/2,Re.x*=r.x/2,Re.y*=r.y/2,Ce.start.copy(Ae),Ce.start.z=0,Ce.end.copy(Re),Ce.end.z=0;const g=Ce.closestPointToPointParameter(Mo,!0);Ce.at(g,zl);const d=Yu.lerp(Ae.z,Re.z,g),m=d>=-1&&d<=1,M=Mo.distanceTo(zl)<Ci*.5;if(m&&M){Ce.start.fromBufferAttribute(l,u),Ce.end.fromBufferAttribute(c,u),Ce.start.applyMatrix4(a),Ce.end.applyMatrix4(a);const v=new H,b=new H;An.distanceSqToSegment(Ce.start,Ce.end,b,v),e.push({point:b,pointOnLine:v,distance:An.origin.distanceTo(b),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}class bg extends Xn{constructor(t=new Go,e=new eh({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let a=0,o=0,l=e.count;a<l;a++,o+=2)Fl.fromBufferAttribute(e,a),Ol.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Fl.distanceTo(Ol);const r=new Rs(s,2,1);return t.setAttribute("instanceDistanceStart",new an(r,1,0)),t.setAttribute("instanceDistanceEnd",new an(r,1,1)),this}raycast(t,e){const i=this.material.worldUnits,s=t.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;An=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Ci=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),or.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Ci*.5;else{const f=Math.max(s.near,or.distanceToPoint(An.origin));c=Bl(s,f,l.resolution)}if(or.radius+=c,An.intersectsSphere(or)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),rr.copy(o.boundingBox).applyMatrix4(a);let h;if(i)h=Ci*.5;else{const f=Math.max(s.near,rr.distanceToPoint(An.origin));h=Bl(s,f,l.resolution)}rr.expandByScalar(h),An.intersectsBox(rr)!==!1&&(i?xg(this,e):Sg(this,s,e))}}const ar=[.6,.85,1.05,1.3,1.6,2.1];class Eg{constructor(){this.a=new Float32Array(3*256),this.n=0}reset(){return this.n=0,this}p(t,e,i){if(3*this.n+3>this.a.length){const r=new Float32Array(this.a.length*2);r.set(this.a),this.a=r}const s=3*this.n++;return this.a[s]=t,this.a[s+1]=e,this.a[s+2]=i,this}}class Tg{constructor(t){this.material=t,this.geo=new Go,this.pos=new Float32Array(0),this.col=new Float32Array(0),this.pb=null,this.cb=null,this.cap=0,this.n=0,this.mesh=new bg(this.geo,t),this.mesh.frustumCulled=!1,this.grow(2048)}grow(t){const e=new Float32Array(t*6),i=new Float32Array(t*6);e.set(this.pos.subarray(0,this.n*6)),i.set(this.col.subarray(0,this.n*6)),this.pos=e,this.col=i,this.cap=t,this.geo.dispose(),this.geo=new Go;const s=this.pb=new Rs(e,6,1).setUsage(Xa),r=this.cb=new Rs(i,6,1).setUsage(Xa);this.geo.setAttribute("instanceStart",new an(s,3,0)),this.geo.setAttribute("instanceEnd",new an(s,3,3)),this.geo.setAttribute("instanceColorStart",new an(r,3,0)),this.geo.setAttribute("instanceColorEnd",new an(r,3,3)),this.mesh.geometry=this.geo}seg(t,e,i,s,r,a,o,l,c){this.n>=this.cap&&this.grow(this.cap*2);const h=this.n++*6,f=this.pos,u=this.col;f[h]=t,f[h+1]=e,f[h+2]=i,f[h+3]=s,f[h+4]=r,f[h+5]=a,u[h]=u[h+3]=o,u[h+1]=u[h+4]=l,u[h+2]=u[h+5]=c}commit(){this.geo.instanceCount=this.n,this.mesh.visible=this.n>0;for(const t of[this.pb,this.cb])t.clearUpdateRanges(),t.addUpdateRange(0,this.n*6),t.needsUpdate=!0}dispose(){this.geo.dispose(),this.material.dispose()}}const kl=new Map;function xo(n){let t=kl.get(n);if(!t){const e=parseInt(n.slice(1),16);t=[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],kl.set(n,t)}return t}class wg{constructor(){this.group=new vs,this.batches=ar.map(t=>{const e=new eh({linewidth:t,vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});e.blending=mc,e.blendEquation=Po,e.fog=!0;const i=new Tg(e);return this.group.add(i.mesh),i})}setResolution(t,e){for(const i of this.batches)i.material.resolution.set(t,e)}begin(){for(const t of this.batches)t.n=0}end(){for(const t of this.batches)t.commit()}batch(t){let e=0;for(let i=1;i<ar.length;i++)Math.abs(ar[i]-t)<Math.abs(ar[e]-t)&&(e=i);return this.batches[e]}line(t,e,i,s,r={}){if(e<2)return;const a=r.alpha??1;this.strokes(t,e,xo(i),a,this.batch(s),r.close??!1),r.hot&&this.strokes(t,e,xo(na(i)),a,this.batch(s*.42),r.close??!1)}poly(t,e,i,s={}){this.line(t.a,t.n,e,i,s)}seg(t,e,i,s,r,a,o,l,c=1){const[h,f,u]=xo(o);this.batch(l).seg(t,e,i,s,r,a,h*c,f*c,u*c)}strokes(t,e,[i,s,r],a,o,l){i*=a,s*=a,r*=a;for(let c=0;c<e-1;c++){const h=3*c;o.seg(t[h],t[h+1],t[h+2],t[h+3],t[h+4],t[h+5],i,s,r)}if(l){const c=3*(e-1);o.seg(t[c],t[c+1],t[c+2],t[0],t[1],t[2],i,s,r)}}dispose(){for(const t of this.batches)t.dispose()}}function nh(n,t){const e=n.tract;return-Math.max(-.2,Math.min(3,t))*e.scale/Mg(e.P(-2.5,10.5),e.P(6.95,7.75))}function ih(n,t){const e=n.tract,i=e.P(-2.5,10.5),s=nh(n,t.jaw);return(r,a)=>Yc(e.P(r,a),i,s)}function So(n,t,e,i=0,s=40){const r=Math.cos(-i),a=Math.sin(-i),o=[];for(let l=0;l<=s;l++){const c=l/s*Math.PI*2,h=Math.cos(c)*t,f=Math.sin(c)*e;o.push({x:n.x+h*r-f*a,y:n.y+h*a+f*r})}return o}function Ag(n,t,e){const i=Math.min(n.x,t.x),s=Math.max(n.x,t.x),r=Math.min(n.y,t.y),a=Math.max(n.y,t.y),o=Math.min(e,(s-i)/2,(a-r)/2),l=[],c=(h,f,u)=>{for(let p=0;p<=6;p++){const _=u+p/6*(Math.PI/2);l.push({x:h+Math.cos(_)*o,y:f+Math.sin(_)*o})}};return c(s-o,a-o,0),c(i+o,a-o,Math.PI/2),c(i+o,r+o,Math.PI),c(s-o,r+o,3*Math.PI/2),l.push(l[0]),l}const Vo=n=>-1.2-.025*n;function sh(n){const t=n.tract.scale,e=n.bodyParams.pharynx;return(i,s)=>({x:i*t,y:(s<7?7-(7-s)*e:s)*t})}function rh(n,t,e){const i=n.tract,s=(y,T)=>i.P(y,T),r=ih(n,e),a=i.scale,o=e.larynx*a,l=sh(n),c=t.upperLip.slice(7),h=t.lowerLip.slice(7),f=Hn([l(2.3,-4.6),l(2.38,-1.5),l(2.52,.4),l(3,1.7),r(5.3,3),r(7.25,3.35),r(7.95,4.6),r(7.55,5.7)],4),u=Hn([c[c.length-1],l(7.05,10.6),l(7.75,10.78),l(8.75,11.05),l(9.25,11.65),l(8.95,12.6),l(8.35,13.9),l(7.7,15),l(7.95,16.1),l(7.9,18.1),l(6.9,20.5)],4),p=Hn([l(6.9,20.5),l(3,22.9),l(-2.2,22.7),l(-6.9,19.6),l(-8.7,15.4),l(-8.3,11.9),l(-7.4,8.9),l(-6.8,4.8),l(-6.6,0),l(-6.6,-4.6)],4),_=[];for(let y=0;y<9;y++){const T=-4.4+y*1.75;if(T>10.5)break;const O=Vo(T)-2.25;_.push(Ag(s(O,T+1.4),s(O+1.6,T),.32*a))}const d=[[1,9.6],[1.8,9.92],[2.7,10.18],[3.6,10.3],[4.4,10.25],[5.1,10.05],[5.7,9.72],[6.15,9.36],[6.55,9.15],[7,9.6]].map(([y,T])=>i.P(y,T)),m=t.jawBone.filter(y=>y.x>.8*a),M=t.glottis,v={x:s(1.6,0).x,y:s(0,2.9).y+.6*o},b=[];for(let y=0;y<4;y++){const T=M.y-(.9+y*1)*a;if(T<-4.4)break;b.push([{x:M.x+.8*a,y:T},{x:M.x+1.05*a,y:T-.05},{x:M.x+1.05*a,y:T-.5*a},{x:M.x+.82*a,y:T-.45*a},{x:M.x+.8*a,y:T}])}const P=r(6,5.45),E=t.tongueCenter,A=[];for(let y=0;y<=16;y++){const T=Math.PI*(.18+.9*y/16),O={x:E.x+Math.cos(T)*t.tongueRadius*1.25,y:E.y+Math.sin(T)*t.tongueRadius*1.25},K={x:E.x,y:(E.y+P.y)/2},nt=[];for(let L=0;L<=12;L++){const I=L/12;nt.push({x:(1-I)*(1-I)*P.x+2*(1-I)*I*K.x+I*I*O.x,y:(1-I)*(1-I)*P.y+2*(1-I)*I*K.y+I*I*O.y})}A.push(nt)}const z={x:Vo(M.y/a)*a,y:M.y};return{f:t,model:n,skinLower:[...f,...h.slice().reverse()],skinUpper:[...c,...u.slice(1),...p.slice(1)],inset:Hn([l(1.85,-4.6),l(1.9,-.8),l(2.3,1.6),r(5.2,3.6),r(6.9,3.9),r(7.4,4.9),r(7.2,5.9),l(6.6,9.9),l(7.6,10.9),l(8.55,11.5),l(8.1,13.4),l(7.25,15.2),l(7.45,18),l(3,22.2),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.6,12),l(-6.7,8.7),l(-6.1,4.6),l(-6,-4.6)],3),skull:Hn([l(7,16.2),l(7.3,18.5),l(6,20.7),l(3,22.1),l(-2,22),l(-6.3,19.2),l(-7.9,15.3),l(-7.4,12.6),l(-4.6,12.2),l(-2.2,13.3),l(1,13.7),l(4.1,14.1),l(6.2,14.9)],4),brain:Hn([l(6.55,16.3),l(6.75,18.4),l(5.5,20.1),l(2.8,21.4),l(-1.9,21.3),l(-5.8,18.8),l(-7.1,15.4),l(-6.7,13.1),l(-4.4,12.8),l(-2.1,13.9),l(1,14.3),l(4,14.7),l(5.9,15.4)],4),sulcus:Hn([l(5.4,19.4),l(2.4,20.5),l(-1.4,20.4),l(-4.8,18.4)],4),eye:So(l(6.5,15.4),1.1*a,.95*a),eyeC:l(6.5,15.4),vertebrae:_,cords:[[s(-5.3,-4.6),s(-4.5,-4.6),s(-4.5,11.8),s(-5.1,12.4),s(-5.6,11.6)],[s(-5.1,-4.6),s(-4.7,-4.6),s(-4.72,11.4),s(-5.15,11.6)]],nasal:Hn([l(.3,11.2),l(1.1,10.25),l(2.7,10.75),l(4.6,10.85),l(6.4,10.65),l(7.6,10.85),l(8.45,11.3),l(8,12.2),l(6.7,13.4),l(4.4,13.9),l(1.8,13.6),l(.2,12.6)],4),turbinates:[[3,11.45,2.1,.32],[3.5,12.45,1.9,.3],[4,13.3,1.45,.22]].map(([y,T,O,K])=>So(l(y,T),O*a,K*a,-.04)),palOral:d,palNasal:d.map(y=>({x:y.x,y:y.y+.55*a})),jawLower:m,jawUpper:m.map(y=>({x:y.x,y:y.y+.75*a})),hyoid:So(v,.5*a,.28*a,.3,28),thyroid:[{x:M.x+.75*a,y:M.y-1.6*a},{x:M.x+1.75*a,y:M.y-.6*a},{x:M.x+1.95*a,y:M.y+1.2*a},{x:M.x+1.45*a,y:M.y+1.9*a},{x:M.x+1.15*a,y:M.y+1.1*a},{x:M.x+1.3*a,y:M.y-.4*a},{x:M.x+.75*a,y:M.y-1.6*a}],trachea:[[{x:M.x-.65*a,y:M.y},{x:M.x-.75*a,y:-4.8}],[{x:M.x+.75*a,y:M.y},{x:M.x+.95*a,y:-4.8}]],rings:b,outerWall:t.outer.filter(y=>y.y>M.y||y.x>0),glottisWall:[z,t.outer.find(y=>y.y>M.y)??z],fibres:A,folds:[[{x:M.x-.62*a,y:M.y+.05},{x:M.x-.1,y:M.y+.12*a},{x:M.x-.62*a,y:M.y+.32*a},{x:M.x-.62*a,y:M.y+.05}],[{x:M.x+.72*a,y:M.y+.05},{x:M.x+.12,y:M.y+.12*a},{x:M.x+.72*a,y:M.y+.32*a},{x:M.x+.72*a,y:M.y+.05}]],lowerTeeth:[...t.lowerTeeth,r(6.8,6),r(6.4,6.2),t.lowerTeeth[0]]}}class Rg{constructor(){this.pitch=0,this.yaw=0,this.toPitch=0,this.toYaw=0,this.next=2}update(t,e){if(t>=this.next){const s=Math.random()<.35;this.toPitch=s?0:(Math.random()*2-1)*.55,this.toYaw=s?0:(Math.random()*2-1)*.9,this.next=t+1.2+Math.random()*3.5}const i=1-Math.exp(-e*28);this.pitch+=(this.toPitch-this.pitch)*i,this.yaw+=(this.toYaw-this.yaw)*i}}const Cg=980.665,lr=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},bo=(n,t,e)=>Math.max(t,Math.min(e,n)),cr=(n,t,e,i)=>n+(t-n)*(1-Math.exp(-i/e));class Eo{constructor(t,e){this.hz=t,this.damping=e,this.x=0,this.v=0}step(t,e){const i=2*Math.PI*this.hz,s=Math.max(1,Math.ceil(e/.008)),r=e/s;for(let a=0;a<s;a++)this.v+=(i*i*(t-this.x)-2*this.damping*i*this.v)*r,this.x+=this.v*r;return this.x}}function Pg(n){const t=n.t.pressureRms,e=n.nPh+n.nOr-3;return e>=n.nPh&&e<t.length?t[e]/Cg:0}class Hl{constructor(){this.puff=0,this.brow=0,this.lid=0,this.lookUp=0,this.content=0,this.nod=0,this.tilt=0,this.clock=0,this.cheeks=new Eo(6.5,.32),this.nodSpring=new Eo(2.4,.42),this.tiltSpring=new Eo(3.2,.3),this.ref=NaN,this.fast=NaN,this.held=0,this.hold=0,this.nextBlink=1.5+Math.random()*2,this.blinkAt=-1,this.secondBlink=!1,this.lastStep=-1}update(t,e){this.clock+=e;const i=t==null?void 0:t.t,s=!!i&&i.voicing>.45&&i.gate>.3&&i.f0>30&&i.outRms>.004,r=t?lr(1.5,7,Pg(t)):0;this.puff=bo(this.cheeks.step(r,e),-.35,1.25);let a=0,o=0;if(s){const _=Math.log2(i.f0);(!Number.isFinite(this.ref)||Math.abs(12*(_-this.ref))>14)&&(this.ref=this.fast=_),this.ref=cr(this.ref,_,5,e),Math.abs(12*(_-this.fast))>2.5&&(this.fast=_,this.held=0),this.fast=cr(this.fast,_,.35,e),this.held+=e,a=12*(_-this.ref),o=12*(_-this.fast)}else this.held=0;const l=(s?bo(a/6,-.7,1):0)+.3*this.content;this.brow=cr(this.brow,l,s?.12:.45,e),this.lookUp=.32*Math.max(0,this.brow);const c=s?.92*lr(.9,1.9,this.held)*lr(.15,.55,this.brow):0;this.hold=cr(this.hold,c,c>this.hold?.35:.08,e),this.clock>=this.nextBlink&&this.hold<.2&&(this.blinkAt=this.clock,this.secondBlink=!this.secondBlink&&Math.random()<.18,this.nextBlink=this.clock+(this.secondBlink?.28:2+Math.random()*4.5));const h=(this.clock-this.blinkAt)/.17,f=this.blinkAt>=0&&h<1?Math.sin(Math.PI*h)**.7:0;this.lid=Math.max(f,this.hold,.95*this.content);const u=(t==null?void 0:t.beatStep)??-1;if(u>=0&&this.lastStep>=0&&u!==this.lastStep){const _=u<this.lastStep;(_||Math.floor(u/4)!==Math.floor(this.lastStep/4))&&(this.nodSpring.v-=_||Math.floor(u/16)!==Math.floor(this.lastStep/16)?1.3:.8)}this.lastStep=u,this.nod=this.nodSpring.step(.13*this.brow,e);const p=lr(.6,2,this.held)*.07*Math.sin(this.clock*1.7);this.tilt=this.tiltSpring.step(p+.05*bo(o,-1.5,1.5),e)}}function Gl(n,t,e){const i=n.tract,s=ih(n,e),r={x:(t.upperLip[6].x+t.lowerLip[6].x)/2+.15,y:(t.upperLip[6].y+t.lowerLip[6].y)/2};return[{id:"tongue",pos:t.tongueCenter,label:"Tongue body"},{id:"tip",pos:t.tip,label:"Tongue tip"},{id:"jaw",pos:s(7.5,4.9),label:"Jaw"},{id:"lips",pos:r,label:"Lips"},{id:"velum",pos:t.velum[Math.floor(t.velum.length/2)],label:"Soft palate"},{id:"larynx",pos:{x:t.glottis.x+1.2*i.scale,y:t.glottis.y},label:"Larynx"}]}const Rn=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},Vl=n=>Math.max(0,Math.min(1,n));function Wn(n,t){if(t<=n[0][0])return n[0][1];for(let e=1;e<n.length;e++)if(t<=n[e][0]){const[i,s]=n[e-1],[r,a]=n[e];return s+(a-s)*(t-i)/(r-i)}return n[n.length-1][1]}const Lg=[[-4.6,5.3],[0,5.4],[2.5,5.5],[4.5,5.25],[6.5,5.5],[8.5,6.1],[10.5,6.6],[12.5,7],[15,7.3],[17.5,7.65],[19.5,7.4],[21,6.5],[22.2,4.6],[23,1]],Dg=[[3.4,5.9],[4.6,6.2],[5.7,6.15],[6.5,6.2],[8,6.35],[9.5,6.35],[10.6,6.55],[11.6,6.75],[12.6,6.9],[13.9,7.15],[15,7.45],[16.1,7.95]],Ug=[[3.4,2],[4.6,2.2],[5.7,2.4],[6.5,2.6],[10.6,1.7],[11,1.75],[11.65,1.2],[12.6,.95],[13.9,.75],[15,.9],[16.1,1.6]],Ig=[[-4.6,.5],[3,.5],[6,.42],[12,.42],[16,.45],[23,.45]],Ng=[[-3,8.5],[-1.6,8],[-.6,6.4],[1.2,4.6],[3.5,3.6],[5.3,3],[7.3,3.3],[8.6,4.4]],Fg=[[6,-.6],[7.4,-.8],[9.6,-1.9],[10.6,-2.5],[12,-2.6]],Og=[[12.3,4],[13,5.6],[14.5,6.4],[16.5,6.9],[18.5,6.6],[20,5.4],[21,3.6],[21.45,.5]],zg=[[0,1.5],[.15,1.9],[.35,2.35],[.6,2.45],[.8,2.2],[.92,1.5],[1,.55]],Bg=[[0,1.3],[.35,1.1],[.7,.9],[.9,.55],[1,.25]],kg=[[.85,1.05,.7],[.68,.95,.65],[.78,1.1,.8],[.7,.85,.9],[.68,.8,.9],[1,.75,1.1],[.92,.7,1.05]],Hg=[[.54,.9,.6],[.6,.92,.62],[.7,1,.75],[.7,.85,.8],[.72,.8,.85],[1.1,.72,1.05],[1.05,.7,1]],Gg=3,Ei=2.2,oh=n=>Math.abs(n)<1?(1-n*n)**2:0;function Ar(n,t,e=!1){const i=Math.min(1,Math.abs(t)/n.W),s=Math.pow(1-Math.pow(i,n.pf),1/n.pf);return n.xw+(n.Fs-n.xw)*s+(e?0:n.E*oh(t/n.wf))}function Vg(n,t){const e=t>n.xw,i=e?(t-n.xw)/Math.max(1e-6,n.Fs-n.xw):(n.xw-t)/Math.max(1e-6,n.xw-n.Bk),s=e?n.pf:Ei;return n.W*Math.pow(Math.max(0,1-Math.pow(Math.min(1,i),s)),1/s)}function Wg(n,t,e){e.length=0;const i=12,s=10,r=16;for(let o=0;o<i;o++){const l=Math.PI-o/i*(Math.PI/2);e.push(n.xw-(n.xw-n.Bk)*Math.pow(Math.abs(Math.cos(l)),2/Ei),n.W*Math.pow(Math.sin(l),2/Ei))}const a=Math.asin(Math.min(1,Math.pow(t/n.W,n.pf/2)));for(let o=0;o<s;o++){const l=Math.PI/2-o/s*(Math.PI/2-a),c=n.W*Math.pow(Math.sin(l),2/n.pf);e.push(n.xw+(n.Fs-n.xw)*Math.pow(Math.cos(l),2/n.pf)+n.E*oh(c/n.wf),c)}for(let o=0;o<=r;o++){const l=t*(1-o/r);e.push(Ar(n,l),l)}}class Wl{constructor(t,e,i){this.dy=e,this.rows=[];let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a.y),r=Math.max(r,a.y);this.y0=s,this.y1=r;for(let a=s;a<=r;a+=e){let o=-1/0,l=1/0;for(let c=0;c<t.length-1;c++){const h=t[c],f=t[c+1];if(h.y>a==f.y>a)continue;const u=h.x+(f.x-h.x)*(a-h.y)/(f.y-h.y);o=Math.max(o,u),l=Math.min(l,u)}this.rows.push(o>l?i(a,o,l):null)}}at(t){const e=(t-this.y0)/this.dy,i=Math.floor(e);if(i<0||i>=this.rows.length-1)return null;const s=this.rows[i],r=this.rows[i+1];if(!s||!r)return s??r;const a=e-i,o=(l,c)=>l+(c-l)*a;return{F:o(s.F,r.F),Bk:o(s.Bk,r.Bk),Fs:o(s.Fs,r.Fs),W:o(s.W,r.W),xw:o(s.xw,r.xw),E:o(s.E,r.E),wf:o(s.wf,r.wf),pf:o(s.pf,r.pf)}}}class Si{constructor(){this.lines=[],this.cur=[]}p(t,e,i){return this.cur.push(t,e,i),this}end(t=!1){t&&this.cur.length>=3&&this.cur.push(this.cur[0],this.cur[1],this.cur[2]),this.cur.length>=6&&this.lines.push(new Float32Array(this.cur)),this.cur=[]}ellipse(t,e,i,s=24,r=0,a=Math.PI*2){for(let o=0;o<=s;o++){const l=r+(a-r)*o/s,c=Math.cos(l),h=Math.sin(l);this.p(t[0]+e[0]*c+i[0]*h,t[1]+e[1]*c+i[1]*h,t[2]+e[2]*c+i[2]*h)}this.end()}}function ah(n,t,e,i){const s=e/n,r=i/n,a=r>=7?r:7-(7-r)/t,o=1-Rn(7.6,9.1,a),l=Wn(Ng,s),c=Rn(l-1.5,l+.15,a),h=Wn(Fg,a),f=Rn(h-.7,h+.9,s);return o*c*f}const $g=1.7,Xg=.55;function lh(n,t,e,i){const s=e/n,r=i/n,a=r>=7?r:7-(7-r)/t,o=((s-5.2)/2.3)**2+((a-8.3)/2.4)**2;return o<1?(1-o)**2:0}function $l(n,t,e,i){if(t===0||i===0)return[0,0];const s=t*i*n;return[Xg*s,Math.sign(e)*$g*s*Rn(.4*n,2.6*n,Math.abs(e))]}function qg(n,t,e){const i=t.length;if(t.every(Boolean))return[e?[...n,n[0],n[1],n[2]]:n];const s=[],r=e?t.indexOf(!1)+1:0;let a=[];for(let o=0;o<i;o++){const l=(r+o)%i;t[l]?a.push(n[3*l],n[3*l+1],n[3*l+2]):(a.length>=6&&s.push(a),a=[])}return a.length>=6&&s.push(a),s}function Yg(n,t){const e=[0];for(let a=1;a<n.length;a++)e.push(e[a-1]+Math.hypot(n[a].x-n[a-1].x,n[a].y-n[a-1].y));const i=e[e.length-1],s=[];let r=0;for(let a=0;a<t;a++){const o=i*a/(t-1);for(;r<n.length-2&&e[r+1]<o;)r++;const l=(o-e[r])/Math.max(1e-9,e[r+1]-e[r]);s.push({x:n[r].x+(n[r+1].x-n[r].x)*l,y:n[r].y+(n[r+1].y-n[r].y)*l})}return s}function gr(n,t,e){const i=e*t[t.length-1];let s=0;for(;s<n.length-2&&t[s+1]<i;)s++;const r=(i-t[s])/Math.max(1e-9,t[s+1]-t[s]);return{x:n[s].x+(n[s+1].x-n[s].x)*r,y:n[s].y+(n[s+1].y-n[s].y)*r}}const Wo=n=>{const t=[0];for(let e=1;e<n.length;e++)t.push(t[e-1]+Math.hypot(n[e].x-n[e-1].x,n[e].y-n[e-1].y));return t};function jg(n){const t=n.tract,e=t.scale,i=n.bodyParams.pharynx,s=sh(n),r=B=>s(0,B).y,a=B=>B/e>=7?B/e:7-(7-B/e)/i,o=(B,G)=>t.P(B,G),l={...wr,jaw:0,lipAp:0,labiodental:0},c=n.frame(l),h=rh(n,c,l),f=[...h.skinLower,...h.skinUpper],u=new Wl(f,.08*e,(B,G,tt)=>{const et=a(B),st=et>=3.4&&et<=16.1?Wn(Dg,et)*e:1/0,rt=Math.min(G,st),F=2.2+.4*Rn(2.5,3.5,et)*(1-Rn(17,18.5,et));return{F:G,Bk:tt,Fs:rt,W:Wn(Lg,et)*e,xw:tt+(rt-tt)*Wn(Ig,et),E:G-rt,wf:Wn(Ug,et)*e,pf:F}}),p=o(-2.5,10.5),_=c.upperLip[c.upperLip.length-1].y,g=c.lowerLip[c.lowerLip.length-1].y,d=Gg*e,m=(B,G,tt,et)=>G>g&&G<_&&Math.abs(tt)<d&&B>et.xw,M=[],v=(B,G,tt)=>{for(const et of qg(B,G,tt)){const st=et.length/3,rt=new Float32Array(st),F=new Float32Array(st);for(let wt=0;wt<st;wt++)rt[wt]=ah(e,i,et[3*wt],et[3*wt+1]),F[wt]=lh(e,i,et[3*wt],et[3*wt+1]);M.push({a:new Float32Array(et),w:rt,c:F})}},b=[],P=1.4*e;for(let B=u.y0+.25*e;B<u.y1-.2*e;B+=P){const G=u.at(B);if(!G||G.W<.2*e)continue;Wg(G,Math.min(.6*G.W,3.6*e),b);const tt=[],et=[],st=b.length/2;for(let rt=0;rt<st;rt++)tt.push(b[2*rt],B,b[2*rt+1]);for(let rt=st-2;rt>0;rt--)tt.push(b[2*rt],B,-b[2*rt+1]);for(let rt=0;rt<tt.length/3;rt++)et.push(!m(tt[3*rt],B,tt[3*rt+2],G));v(tt,et,!0)}const E=.3*e;for(const B of[-3.6,-2.4,-1.2,1.2,2.4,3.6].map(G=>G*e)){let G=[],tt=[];for(let et=u.y0+.1*e;et<=u.y1;et+=E){const st=u.at(et);if(!st||Math.abs(B)>.97*st.W){v(G,tt,!1),G=[],tt=[];continue}const rt=Ar(st,B);G.push(rt,et,B),tt.push(!m(rt,et,B,st))}v(G,tt,!1)}for(const B of[.5,.8].map(G=>G*Math.PI))for(const G of[1,-1]){const tt=[],et=[];for(let st=u.y0+.1*e;st<=u.y1;st+=E){const rt=u.at(st);!rt||rt.W<.2*e||(tt.push(rt.xw-(rt.xw-rt.Bk)*Math.pow(Math.abs(Math.cos(B)),2/Ei),st,G*rt.W*Math.pow(Math.sin(B),2/Ei)),et.push(!0))}v(tt,et,!1)}const A=[],z=[],y=(B,G,tt,et,st,rt=!1)=>{const F=new Si;st(F),B.push({lines:F.lines,color:G,width:tt,alpha:et,hot:rt})},T=(B,G,tt,et)=>{const st=Hn(G.map(([rt,F])=>s(rt,F)),4);st.forEach((rt,F)=>{const wt=u.at(rt.y);B.p(rt.x,rt.y,et*((wt?Vg(wt,rt.x):0)+tt(F,st.length)))}),B.end()};y(A,mt.blueDim,1.05,.9,B=>{for(const G of[1,-1]){T(B,[[-2.55,13.4],[-2.85,14.75],[-3.65,15.45],[-4.6,15.25],[-5.2,14.25],[-5.4,12.8],[-5.05,11.3],[-4.55,10.2],[-3.95,9.55],[-3.35,9.65],[-3,10.35]],(et,st)=>(.25+1.2*Math.sin(Math.PI*et/(st-1))**1.5)*e,G),T(B,[[-3.15,14.3],[-3.95,14.45],[-4.55,13.5],[-4.6,12.1],[-4.15,11.05]],()=>.55*e,G),T(B,[[-2.7,11.2],[-2.55,11.85],[-2.75,12.35]],()=>.35*e,G);const tt=[];for(let et=0;et<=16;et++)tt.push([-3.5+.6*Math.cos(et/16*Math.PI*2),12+.85*Math.sin(et/16*Math.PI*2)]);T(B,tt,()=>.12*e,G)}}),y(A,mt.blueMid,1,.8,B=>{for(const G of[1,-1]){for(let et=14.6;et>=11.3;et-=.15){const st=r(et),rt=u.at(st);if(!rt)continue;const F=G*(.3+1.05*(14.6-et)/3.3)*e;B.p(Ar(rt,F),st,F)}B.end();const tt=[[7.95,11.05,.95],[7.4,11.15,1.45],[7.25,11.6,1.55],[7.55,12.1,1.35],[8.2,12.15,1]];for(const[et,st,rt]of tt)B.p(et*e,r(st),G*rt*e);B.end()}}),y(A,mt.blueMid,1,.9,B=>{for(const G of[1,-1])B.ellipse([8.05*e,r(10.98),G*.62*e],[.42*e,.04*e,0],[0,0,.26*e],16)});const O=new Wl(h.brain,.08*e,(B,G,tt)=>({F:G,Bk:tt,Fs:G,W:Wn(Og,a(B))*e,xw:tt+(G-tt)*.48,E:0,wf:1,pf:2.3}));y(A,mt.blueMid,.85,.32,B=>{for(let G=O.y0+.6*e;G<O.y1-.15*e;G+=1.5*e){const tt=O.at(G);if(tt){for(let et=0;et<=48;et++){const st=et/48*Math.PI*2,rt=Math.cos(st),F=Math.sin(st),wt=rt>=0?tt.pf:Ei,xt=rt>=0?tt.xw+(tt.Fs-tt.xw)*Math.pow(rt,2/wt):tt.xw-(tt.xw-tt.Bk)*Math.pow(-rt,2/wt);B.p(xt,G,Math.sign(F)*tt.W*Math.pow(Math.abs(F),2/wt))}B.end()}}for(const G of[.3,.7].map(tt=>tt*Math.PI))for(const tt of[1,-1]){for(let et=O.y0;et<=O.y1;et+=.3*e){const st=O.at(et);if(!st)continue;const rt=Math.cos(G),F=Math.sin(G),wt=rt>=0?st.pf:Ei,xt=rt>=0?st.xw+(st.Fs-st.xw)*Math.pow(rt,2/wt):st.xw-(st.xw-st.Bk)*Math.pow(-rt,2/wt);B.p(xt,et,tt*st.W*Math.pow(F,2/wt))}B.end()}}),y(A,mt.blueDim,.9,.6,B=>{for(let G=0;G<9;G++){const tt=-4.4+G*1.75;if(tt>10.5)break;const et=Vo(tt)-2.25,st=o(et,tt+.08),rt=o(et,tt+1.32),F=o(et+.8,0).x,wt=.8*e,xt=1.05*e;for(const Gt of[st.y,rt.y])B.ellipse([F,Gt,0],[wt,0,0],[0,0,xt],24);for(const Gt of[.25,.75,1.25,1.75].map(Ut=>Ut*Math.PI))B.p(F+wt*Math.cos(Gt),st.y,xt*Math.sin(Gt)).p(F+wt*Math.cos(Gt),rt.y,xt*Math.sin(Gt)).end();const At=(st.y+rt.y)/2,Mt=F-2.15*e;B.ellipse([Mt,At,0],[.72*e,0,0],[0,0,.88*e],20);for(const Gt of[1,-1])B.p(F-.7*e,At,Gt*.55*e).p(Mt+.45*e,At,Gt*.72*e).end(),B.p(F-.5*e,At,Gt*.95*e).p(F-.9*e,At-.1*e,Gt*2.3*e).end();B.p(Mt-.72*e,At,0).p(Mt-1.8*e,At-.55*e,0).end()}}),y(A,mt.blueDim,.85,.5,B=>{const G=o(-4.9,0).x;for(let tt=-4.4;tt<=11;tt+=1.75)B.ellipse([G,o(0,tt).y,0],[.42*e,0,0],[0,0,.6*e],16);for(const tt of[1,-1])B.p(G,o(0,-4.6).y,tt*.6*e).p(G,o(0,11.4).y,tt*.6*e).end()}),y(A,mt.blueDim,.9,.7,B=>{for(const G of[1,-1]){for(const tt of h.nasal)B.p(tt.x,tt.y,G*1.2*e);B.end(!0);for(const tt of h.turbinates){for(const et of tt)B.p(et.x,et.y,G*.95*e);B.end()}}});const K=(B,G,tt)=>{const et=[];for(let st=0;st<=60;st++){const rt=tt*st/60;et.push({x:B-G*Math.pow(rt/tt,1.85),y:rt})}return{pts:et,cum:Wo(et)}},nt=(B,G,tt,et,st,rt,F)=>{const wt=K(G,tt,et),xt=wt.cum[wt.cum.length-1],At=st.reduce((Gt,Ut)=>Gt+Ut[0],0),Mt=.97*xt/(At*e);for(const Gt of[1,-1]){let Ut=0;for(const[R,S,$]of st){const at=R*e*Mt,ct=S*e,ut=$*e,Et=(Ut+at/2)/xt;Ut+=at;const pt=gr(wt.pts,wt.cum,Et),St=gr(wt.pts,wt.cum,Math.min(1,Et+.01)),Lt=gr(wt.pts,wt.cum,Math.max(0,Et-.01));let kt=St.x-Lt.x,lt=St.y-Lt.y;const ee=Math.hypot(kt,lt)||1;kt/=ee,lt/=ee;const Xt=lt,zt=-kt,Pt=rt(pt.y/et),bt=(Nt,Jt,ue=0)=>[pt.x+kt*Nt-Xt*ue,Pt+F*Jt,Gt*(pt.y+lt*Nt-zt*ue)];for(const[Nt,Jt]of[[-.5,0],[-.5,.55],[-.38,1],[0,1.08],[.38,1],[.5,.55],[.5,0]])B.p(...bt(Nt*at,Jt*ct));B.end(!0);for(const[Nt,Jt]of[[-.45,.1],[.45,.1],[.45,.9],[-.45,.9]])B.p(...bt(Nt*at,0,Jt*ut));B.end(!0)}}},L=o(7.3,0).x,I=4.2*e,N=2.65*e;y(A,mt.blue,1,.8,B=>nt(B,L,I,N,kg,G=>(7.95+.3*G*G)*e,1)),y(A,mt.blueMid,1,.6,B=>{for(const G of[0,2,4,5,6,7]){const tt=h.palOral[G],et=Math.max(0,(L-tt.x)/I),st=(et>=1?N:N*Math.pow(et,1/1.85))-.45*e,rt=(8.95+.3*Math.min(1,st/N)**2)*e;if(!(st<.6*e||tt.y<rt+.15*e)){for(let F=0;F<=20;F++){const wt=st*(F/10-1);B.p(tt.x,rt+(tt.y-rt)*Math.pow(1-Math.pow(Math.abs(wt)/st,2.4),.7),wt)}B.end()}}});const V=(B,G,tt)=>{const et=o(B,G);return[et.x,et.y,tt*e]},q=(B,G,tt)=>{const et=G.map(([st,rt,F])=>V(st,rt,tt*F));for(let st=0;st<et.length-1;st++){const rt=et[Math.max(0,st-1)],F=et[st],wt=et[st+1],xt=et[Math.min(et.length-1,st+2)];for(let At=0;At<4;At++){const Mt=At/4,Gt=Mt*Mt,Ut=Gt*Mt,R=(S,$,at,ct)=>.5*(2*$+(-S+at)*Mt+(2*S-5*$+4*at-ct)*Gt+(-S+3*$-3*at+ct)*Ut);B.p(R(rt[0],F[0],wt[0],xt[0]),R(rt[1],F[1],wt[1],xt[1]),R(rt[2],F[2],wt[2],xt[2]))}}B.p(...et[et.length-1]),B.end()};y(z,mt.red,1.25,.9,B=>{for(const G of[1,-1]){q(B,[[6.4,4.6,0],[5.6,4.45,1.5],[4.5,4.4,2.6],[3.2,4.5,3.5],[1.8,4.85,4.15],[.4,5.6,4.6],[-.55,6.6,4.85],[-.9,7.6,4.9],[-1.45,8.9,4.95],[-1.9,9.7,5],[-2.15,10.2,5]],G),q(B,[[-1.8,10.25,4.95],[-.9,9.4,4.85],[.15,10.1,4.6],[.6,8.9,4.35],[1.1,7.7,4],[1.9,7.2,3.55]],G);const tt=V(-2.5,10.5,G*4.95);B.ellipse(tt,[.45*e,0,0],[0,.12*e,.85*e],16)}}),y(z,mt.red,1,.55,B=>{for(const G of[1,-1]){q(B,[[1.9,7.2,3.55],[3,7.15,3.15],[4.3,7.1,2.6],[5.4,7.05,1.85],[6.2,7.05,1.05],[6.72,7.15,0]],G);for(const[tt,et,st,rt,F]of[[3,3.15,3.2,4.5,3.5],[5.4,1.85,5.6,4.45,1.5],[1.9,3.55,1.8,4.85,4.15]])q(B,[[tt,7.15,et],[(tt+st)/2,5.9,(et+F)/2+.15],[st,rt,F]],G)}});const Y=new Si;q(Y,[[7.25,6.75,0],[7.4,5.4,0],[6.4,4.6,0],[5.6,5,0],[5.9,6.2,0],[6.45,6.55,0]],1);const D=Y.lines[0],X=o(6.98,0).x,ot=4*e,W=2.5*e;y(z,mt.blue,1,.8,B=>nt(B,X,ot,W,Hg,G=>(7.75+.45*Math.pow(G,1.5))*e,-1));const Q=s(6.15,15.35),ht=new H(.3*e,(u.y0+u.y1)/2,0);return{model:n,head:u,condyle:p,lipHalf:d,center:ht,shell:M,fixed:A,jaw:z,chin:D,eyes:[[Q.x,Q.y,3.15*e],[Q.x,Q.y,-3.15*e]],eyeR:1.05*e}}const Zg=[.09,.06,.03];class Kg{constructor(){this.scene=new ig,this.camera=new rn(24,1,5,2e3),this.beams=new wg,this.rest=null,this.w=1,this.h=1,this.compact=!1,this.centred=!1,this.facing=1,this.clock=0,this.gaze=new Rg,this.face=new Hl,this.eye=new H,this.turn=new cs,this.euler=new Ls,this.strobe=0,this.tmp=new Eg,this.particles=[],this.echoes=[],this.lastEcho=-1,this.sparkSeed=7,this.k=1,this.ring={n:0,s:new Float64Array(80),cx:new Float64Array(80),cy:new Float64Array(80),ux:new Float64Array(80),uy:new Float64Array(80),a:new Float64Array(80),b:new Float64Array(80)},this.v3=new H,this.caliper=null,this.scene.add(this.beams.group),this.scene.fog=new ea(0,50,100);for(let t=0;t<200;t++)this.particles.push({s:Math.random()*17,u:Math.random()*2-1,v:Math.random()*2-1,life:Math.random(),px:NaN,py:NaN,pz:NaN})}dispose(){this.beams.dispose()}resetMotion(){this.face=new Hl,this.echoes=[],this.lastEcho=-1,this.strobe=0;for(const t of this.particles)t.px=NaN}resize(t,e){this.w=t,this.h=e,this.compact=t<560,this.camera.aspect=t/e,this.compact||this.centred?this.camera.clearViewOffset():this.camera.setViewOffset(t,e,.1*t,0,t,e),this.camera.updateProjectionMatrix(),this.beams.setResolution(t,e);for(const i of this.particles)i.px=NaN}poses(t){const e=this.restFor(t),i=Math.tan(this.camera.fov*Math.PI/360),s=1.1*Math.max(15.2/i,11/(i*Math.max(.3,this.camera.aspect))),r=e.center.clone(),a=this.facing>0?.62:Math.PI-.62,o=.2;return{target:r,home:r.clone().add(new H(Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)).multiplyScalar(s)),side:r.clone().add(new H(0,0,this.facing*s))}}restFor(t){return(!this.rest||this.rest.model!==t)&&(this.rest=jg(t)),this.rest}project(t,e,i){const s=this.v3.set(t,e,i).applyMatrix4(this.beams.group.matrixWorld).project(this.camera);return[(s.x+1)/2*this.w,(1-s.y)/2*this.h]}pxPerCmAt(t,e,i){const s=this.camera.matrixWorld.elements,[r,a]=this.project(t,e,i),[o,l]=this.project(t+s[0],e+s[1],i+s[2]);return Math.hypot(o-r,l-a)}crown(t){const e=this.restFor(t),i=t.tract.scale,s=e.head.at(e.head.y1-1.2*i),r=s?(s.F+s.Bk)/2:e.center.x,[a,o]=this.project(r,e.head.y1,0);return{x:a,y:o,cmPx:this.pxPerCmAt(r,e.head.y1,0)}}faceView(t,e,i){const s=Gl(t,e,i).find(r=>r.id==="lips").pos;return{handles:Gl,X:r=>this.project(r.x,r.y,0)[0],Y:r=>this.project(r.x,r.y,0)[1],pxPerCm:this.pxPerCmAt(s.x,s.y,0)}}update(t,e,i,s,r,a){this.clock+=a;const o=this.restFor(t),l=t.tract.scale,c=this.face;this.headPose(o,l);const h=nh(t,i.jaw),f=o.condyle,u=this.beams,p=this.camera.position.distanceTo(o.center),_=this.scene.fog;_.near=p-3*l,_.far=p+30*l,u.begin();const g=(L,I=0)=>{const N=new Float32Array(L.length*3);return L.forEach((V,q)=>{N[3*q]=V.x,N[3*q+1]=V.y,N[3*q+2]=I}),N},d=this.v3.copy(this.eye).sub(o.center).normalize(),m=Rn(.25,.8,Math.abs(d.z)),M=.22+.78*m,v=.45+.55*m,b=(L,I,N,V={},q=M)=>u.line(g(L),L.length,I,N,{...V,alpha:(V.alpha??1)*q}),P=(L,I,N)=>N===0?[L,I]:Xl(L,I,f,N);this.k=l;for(const L of o.fixed)for(const I of L.lines)u.line(I,I.length/3,L.color,L.width,{alpha:L.alpha,hot:L.hot});for(const L of o.jaw)for(const I of L.lines){const N=this.tmp.reset();for(let V=0;V<I.length;V+=3){const[q,Y]=P(I[V],I[V+1],h);N.p(q,Y,I[V+2])}u.poly(N,L.color,L.width,{alpha:L.alpha,hot:L.hot})}for(const L of o.shell){const I=this.tmp.reset();for(let N=0;N<L.w.length;N++){const V=L.a[3*N+2],[q,Y]=$l(l,L.c[N],V,c.puff),[D,X]=P(L.a[3*N]+q,L.a[3*N+1],h*L.w[N]);I.p(D,X,V+Y)}u.poly(I,mt.blueDim,.85,{alpha:.42})}const E=rh(t,e,i);b(E.inset,mt.blueDim,.9,{alpha:.5}),b(E.skull,mt.blueDim,.9,{close:!0,alpha:.6}),b(E.brain,mt.blueMid,1,{close:!0,alpha:.75}),b(E.sulcus,mt.blueDim,.9),b(E.nasal,mt.blueMid,1,{close:!0}),b(E.palOral,mt.blueMid,1.1),b(E.palNasal,mt.blueMid,1.1),b(E.skinLower,mt.blue,1.5),b(E.skinUpper,mt.blue,1.5),b(E.outerWall,mt.blue,1.4,{hot:!0}),b(e.inner,mt.blue,1.3,{alpha:.9}),b(E.glottisWall,mt.blue,1.2,{alpha:.8}),this.eyes(o,a),this.airway(t,e,s,r,l),this.velum(e,l),this.epiglottis(e,l,v),this.larynx(t,e,i,s,l,a,o.head.y0,M);const A=g(e.tongue),z=(L,I)=>g(Ho(L.map(N=>[N.x,N.y]),I).map(([N,V])=>({x:N,y:V}))),y=z(e.upperLip,2),T=z(e.lowerLip,2),O=this.lips(o,t,e,i,h),K=o.chin,nt=new Float32Array(K.length);for(let L=0;L<K.length;L+=3){const[I,N]=P(K[L],K[L+1],h);nt[L]=I,nt[L+1]=N}if(s&&this.clock-this.lastEcho>=.028){this.lastEcho=this.clock;const L=[{a:A,color:mt.green},{a:nt,color:mt.red},{a:y,color:mt.pink},{a:T,color:mt.pink}];for(O&&L.push({a:O,color:mt.pink}),this.echoes.push({t:this.clock,lines:L});this.echoes.length&&this.clock-this.echoes[0].t>.12;)this.echoes.shift()}s&&Zg.forEach((L,I)=>{const N=this.nearestEcho(this.clock-L);if(N)for(const V of N.lines)u.line(V.a,V.a.length/3,V.color,1,{alpha:(.1+.07*I)*v})}),this.tongue(e,i,l),u.line(nt,nt.length/3,mt.red,1.5,{hot:!0,alpha:v}),u.line(A,e.tongue.length,mt.green,1.6,{hot:!0,alpha:v}),u.line(y,y.length/3,mt.pink,1.5,{hot:!0,alpha:v}),u.line(T,T.length/3,mt.pink,1.5,{hot:!0,alpha:v}),b(Ho(e.velum.map(L=>[L.x,L.y]),3).map(([L,I])=>({x:L,y:I})),mt.white,1.25,{alpha:.92},v),r.particles&&s&&this.drawParticles(t,e,s,a),s&&this.drawTurbulence(t,e,s),this.caliper=null,r.calipers&&this.drawCaliper(e),u.end()}nearestEcho(t){let e=null,i=.016;for(const s of this.echoes){const r=Math.abs(s.t-t);r<i&&(i=r,e=s)}return e}headPose(t,e){const i=this.beams.group,s=this.v3.set(-2.4*e,t.head.y0+.42*(t.condyle.y-t.head.y0),0);this.turn.setFromEuler(this.euler.set(this.face.tilt,0,this.face.nod)),i.quaternion.copy(this.turn),i.position.copy(s).sub(s.applyQuaternion(this.turn)),i.updateMatrixWorld(!0),this.eye.copy(this.camera.position),i.worldToLocal(this.eye)}eyes(t,e){const i=this.gaze,s=this.face;i.update(this.clock,e);const r=t.eyeR,a=i.pitch+1.3*s.lookUp,o=[Math.cos(a)*Math.cos(i.yaw),Math.sin(a),Math.cos(a)*Math.sin(i.yaw)],l=u=>{const p=Math.abs(u[1])>.9?[1,0,0]:[0,1,0],_=Yl(ql(p,u));return[_,ql(u,_)]},c=this.eye,h=1-Rn(.4,.9,s.lid),f=Math.max(0,s.brow);for(const u of t.eyes){const p=Yl([c.x-u[0],c.y-u[1],c.z-u[2]]),[_,g]=l(p),d=new Si;d.ellipse(u,ji(_,r),ji(g,r),36);const[m,M]=l(o),v=[u[0]+o[0]*r*.86,u[1]+o[1]*r*.86,u[2]+o[2]*r*.86];d.ellipse(v,ji(m,r*.5),ji(M,r*.5),24);const b=[u[0]+o[0]*r*.97,u[1]+o[1]*r*.97,u[2]+o[2]*r*.97];d.ellipse(b,ji(m,r*.2),ji(M,r*.2),14);const P=Math.sign(u[2]),E=(K,nt,L)=>K*(1-nt*nt)+.06*nt*P*L,A=K=>{for(let nt=0;nt<=16;nt++){const L=-1+nt/8,I=P*L*.95,N=E(-.36,L,-1),V=K?E(.5+.2*f,L,1)*(1-s.lid)+(N+.03)*s.lid:N;d.p(u[0]+1.04*r*Math.cos(V)*Math.cos(I),u[1]+1.04*r*Math.sin(V),u[2]+1.04*r*Math.cos(V)*Math.sin(I))}d.end()};A(!0),A(!1);const z=.3*s.brow,y=.28*Math.max(0,-s.brow),T=.22*s.lid*f;for(let K=0;K<=12;K++){const nt=-1+K/6,L=P*(.15+nt*.62),I=(1-nt)/2,N=.82+.12*(1-nt*nt)-.06*nt+z+(T-y)*I;d.p(u[0]+1.32*r*Math.cos(N)*Math.cos(L),u[1]+1.32*r*Math.sin(N),u[2]+1.32*r*Math.cos(N)*Math.sin(L))}d.end();const O=[[mt.blueMid,1,.35],[mt.blue,1,.9*h],[mt.blue,1,.7*h],[mt.blue,1.25,.95],[mt.blue,1.05,.75],[mt.blueMid,1.3,.8]];d.lines.forEach((K,nt)=>this.beams.line(K,K.length/3,O[nt][0],O[nt][1],{alpha:O[nt][2]}))}}lips(t,e,i,s,r){const a=e.tract.scale,o=t.condyle,l=t.head,c=this.beams,h=e.bodyParams.pharynx,f=t.lipHalf,u=Math.max(.3*a,(1.1+(e.bodyParams.lipWidth-1.1)*Vl(s.lipWidth))*a/2),p=i.upperLip.slice(6),_=i.lowerLip.slice(6).map(N=>Yc(N,o,-r)),g=Wo(p),d=Wo(_),m=p[0],M=_[0],v=(m.y+M.y)/2,b=(N,V)=>{const q=l.at(N);return q?Ar(q,V,!0):0},P=m.x-b(m.y,0),E=M.x-b(M.y,0),A=(P+E)/2,z=p[p.length-1].y,y=_[_.length-1].y,T=this.tmp,O=(N,V,q)=>{const Y=Math.sqrt(Math.max(0,1-(q/u)**2)),D=gr(N?p:_,N?g:d,V),X=N?m:M,ot=N?z:y,W=v+(X.y-v)*Y,Q=ot-X.y,ht=W+(D.y-X.y)*(ot-W)/(Math.abs(Q)<1e-4?1e-4:Q),B=Math.pow(Math.max(0,1-(q/f)**2),1.5),G=D.x-b(D.y,0)+(A-(N?P:E))*(1-Y)*(1-V),tt=b(ht,q)+G*B,et=N?.5*(1-Y)*(1-V):.5*(1+Y)+.5*(1-Y)*V,st=et+(ah(a,h,tt,ht)-et)*Rn(u,f,Math.abs(q)),[rt,F]=$l(a,lh(a,h,tt,ht),q,this.face.puff),[wt,xt]=st?Xl(tt+rt,ht,o,r*st):[tt+rt,ht];return[wt,xt,q+F]},K=(N,V,q,Y,D)=>{T.reset();for(let X=0;X<=D;X++){const ot=q+(Y-q)*X/D;T.p(...O(N,V(ot),ot))}return T},nt=[.66,.88];for(const N of[!0,!1]){for(const Y of nt)c.poly(K(N,()=>Y,-f,f,24),mt.blueDim,.85,{alpha:.42});for(const Y of[-.8,-.5,.5,.8].map(D=>D*f)){T.reset();for(let D=0;D<=8;D++)T.p(...O(N,.45+.55*D/8,Y));c.poly(T,mt.blueDim,.85,{alpha:.42})}const V=Math.min(f,u+.3*a),q=Y=>{const D=Math.sqrt(Math.max(0,1-(Y/V)**2)),X=N?-.07*Math.exp(-((Y/(.32*a))**2))+.05*Math.exp(-(((Math.abs(Y)-.55*a)/(.3*a))**2)):0;return Math.max(0,(N?.42:.45)*D+X*D)};c.poly(K(N,q,-V,V,28),mt.pink,1.3,{alpha:.95}),c.poly(K(N,Y=>.45*q(Y),-V,V,28),mt.pink,1,{alpha:.45})}for(const N of[1,-1])c.poly(K(!0,()=>0,N*u,N*f,6),mt.pink,1,{alpha:.6});const L=i.upperLip[6].y-i.lowerLip[6].y>.02*a,I=24;T.reset();for(let N=0;N<=I;N++)T.p(...O(!0,0,-u+2*u*N/I));if(L)for(let N=I-1;N>0;N--)T.p(...O(!1,0,-u+2*u*N/I));return c.poly(T,mt.pink,2.1,{hot:!0,close:L}),L?T.a.slice(0,T.n*3):null}tongue(t,e,i){const s=t.tongue;let r=0,a=1/0;s.forEach((p,_)=>{const g=(p.x-t.tip.x)**2+(p.y-t.tip.y)**2;g<a&&(a=g,r=_)});const o=22,l=Yg(s.slice(0,r+1),o),c=Vl(e.lateral),h=l.map((p,_)=>{const g=l[Math.max(0,_-1)],d=l[Math.min(o-1,_+1)];let m=d.x-g.x,M=d.y-g.y;const v=Math.hypot(m,M)||1;m/=v,M/=v;const b=_/(o-1);return{p,nx:-M,ny:m,W:Wn(zg,b)*i,h:(Wn(Bg,b)+.8*c*Rn(.45,.8,b))*i}}),f=(p,_)=>{const g=p.h*(1-Math.cos(_));return[p.p.x-p.nx*g,p.p.y-p.ny*g,p.W*Math.sin(_)]},u=this.tmp;for(let p=1;p<o-1;p+=2){u.reset();for(let _=0;_<=12;_++)u.p(...f(h[p],-Math.PI/2+Math.PI*_/12));this.beams.poly(u,mt.green,1,{alpha:.5})}for(const p of[-Math.PI/2,-Math.PI/4,Math.PI/4,Math.PI/2]){u.reset();for(const _ of h)u.p(...f(_,p));this.beams.poly(u,mt.green,Math.abs(p)>1?1.25:1,{alpha:Math.abs(p)>1?.8:.45})}}airway(t,e,i,s,r){const a=e.grid,o=this.ring;if(o.n=0,a.length<2)return;const l=i?t.nodeS(i.t.phLen,i.t.orLen):null,c=s.pressure&&i&&l&&l.length===i.t.pressureRms.length;let h=-1,f=0;for(let g=0;g<a.length&&o.n<o.s.length;g++){const d=a[g],m=d.outer.x-d.inner.x,M=d.outer.y-d.inner.y,v=Math.hypot(m,M);v>1e-4&&(h=m/v,f=M/v);const b=d.d/2,P=o.n++;o.s[P]=d.s,o.cx[P]=d.outer.x-h*b,o.cy[P]=d.outer.y-f*b,o.ux[P]=h,o.uy[P]=f,o.a[P]=b,o.b[P]=d.d>.01?Math.min(3.5*r,2*d.area/(Math.PI*d.d)):0}const u=this.tmp,p=this.eye;for(let g=0;g<o.n;g+=2){u.reset();for(let P=0;P<=24;P++){const E=P/24*Math.PI*2,A=Math.cos(E)*o.a[g],z=Math.sin(E)*o.b[g];u.p(o.cx[g]+o.ux[g]*A,o.cy[g]+o.uy[g]*A,z)}const d=p.x-o.cx[g],m=p.y-o.cy[g],M=p.z,v=Math.abs(o.uy[g]*d-o.ux[g]*m)/(Math.hypot(d,m,M)||1),b=1-.65*v*v;if(c){const P=Math.pow(vg(To(i.t.pressureRms,l,o.s[g])),.85);this.beams.poly(u,_g(P),.85,{alpha:(.25+.65*P)*b})}else this.beams.poly(u,mt.blueDim,.85,{alpha:(s.grid?.8:.45)*b})}for(const g of[1,-1]){u.reset();for(let d=0;d<o.n;d++)u.p(o.cx[d],o.cy[d],g*o.b[d]);this.beams.poly(u,mt.blue,1,{alpha:.55})}const _=e.glottis;for(const g of[.3,.65]){const d=_.x+(o.cx[0]-_.x)*g,m=_.y+(o.cy[0]-_.y)*g,M=(.55+.25*g)*r;u.reset();for(let v=0;v<=20;v++)u.p(d+M*Math.cos(v/20*Math.PI*2),m,M*Math.sin(v/20*Math.PI*2));this.beams.poly(u,mt.blueDim,.9,{alpha:.6})}}airPoint(t,e,i,s){const r=this.ring;if(r.n<2)return null;if(e<=r.s[0]){const u=Math.max(0,e/Math.max(.01,r.s[0])),p=t.glottis;return[p.x+(r.cx[0]-p.x)*u+i*.3*this.k,p.y+(r.cy[0]-p.y)*u,s*.45*this.k]}let a=0,o=r.n-1;if(e>=r.s[o])return null;for(;o-a>1;){const u=a+o>>1;r.s[u]<=e?a=u:o=u}const l=(e-r.s[a])/Math.max(1e-6,r.s[o]-r.s[a]),c=u=>u[a]+(u[o]-u[a])*l,h=c(r.a)*i*.82,f=c(r.b)*s*.82;return[c(r.cx)+c(r.ux)*h,c(r.cy)+c(r.uy)*h,f]}drawParticles(t,e,i,s){const r=i.t,a=t.nodeS(r.phLen,r.orLen),o=new Float32Array(r.phAreas.length+r.orAreas.length);o.set(r.phAreas,0),o.set(r.orAreas,r.phAreas.length);const l=e.lipS;for(const c of this.particles){const h=To(r.flow,a,c.s),f=Math.max(.05,To(o,a,c.s)),u=h/f,p=Math.sign(u)*2.2*Math.log1p(Math.abs(u)/30);if(c.s+=p*s,c.life-=s*.25,(c.s>l||c.s<0||c.life<=0||Math.abs(u)<3)&&!(Math.abs(u)<3&&c.life>0)){c.s=Math.random()*.8,c.u=Math.random()*2-1,c.v=Math.random()*2-1,c.life=.6+Math.random()*.8,c.px=NaN;continue}const _=this.airPoint(e,c.s,c.u,c.v);if(_){if(Number.isFinite(c.px)){const g=Math.min(2,Math.floor(Math.min(1,Math.abs(p)/6)*Math.min(1,c.life)*3));this.beams.seg(c.px,c.py,c.pz,_[0],_[1],_[2],"#ffe2a8",1.05,.16+.2*g)}[c.px,c.py,c.pz]=_}}}drawTurbulence(t,e,i){const s=i.t;if(!(s.noiseLevel>1)||s.noiseNode<0)return;const r=t.branchS(s.noiseNode,s.phLen,s.orLen);if(r<0)return;const a=Math.min(1,Math.log10(s.noiseLevel)/3.2);if(a<=.05)return;let o=this.sparkSeed=this.sparkSeed*16807%2147483647;const l=()=>(o=o*16807%2147483647)/2147483647;for(let c=0;c<40;c++){const h=this.airPoint(e,r+.2+l()*1.2,l()*2-1,l()*2-1);if(!h)continue;const f=.02+l()*.05;this.beams.seg(h[0]-f,h[1],h[2],h[0]+f,h[1],h[2],"#f4fbff",1.6,.15+.7*a*l())}}drawCaliper(t){const e=this.ring;let i=-1,s=1/0;for(let o=2;o<t.grid.length-1;o++)t.grid[o].area<s&&(s=t.grid[o].area,i=o);if(i<0||s>=1.2||i>=e.n)return;const r=this.tmp.reset();for(let o=0;o<=24;o++){const l=o/24*Math.PI*2,c=Math.cos(l)*e.a[i],h=Math.sin(l)*e.b[i];r.p(e.cx[i]+e.ux[i]*c,e.cy[i]+e.uy[i]*c,h)}this.beams.poly(r,mt.white,1.3,{hot:!0});const a=t.grid[i];this.caliper={x:a.outer.x,y:a.outer.y,z:0,area:s}}velum(t,e){const i=t.velum,s=Math.floor(i.length/2)-1,r=[];for(let l=0;l<=s;l++){const c=i[l],h=i[i.length-1-l];let f=c.x-h.x,u=c.y-h.y;const p=Math.hypot(f,u)||1;f/=p,u/=p;const _=l/s;r.push({x:(c.x+h.x)/2,y:(c.y+h.y)/2,nx:f,ny:u,W:(1.95-1.5*Math.pow(_,1.5))*e,droop:.45*e*_})}const a=(l,c)=>{const h=.12*e*(1-c*c)-l.droop*c*c;return[l.x+l.nx*h,l.y+l.ny*h,l.W*c]},o=this.tmp;for(const l of[1,3,5,7,9].filter(c=>c<=s)){o.reset();for(let c=0;c<=12;c++)o.p(...a(r[l],-1+c/6));this.beams.poly(o,mt.white,1,{alpha:.5})}for(const l of[-1,1]){o.reset();for(const c of r)o.p(...a(c,l));this.beams.poly(o,mt.white,1,{alpha:.65})}}epiglottis(t,e,i){const[s,r]=t.epiglottis;let a=r.x-s.x,o=r.y-s.y;const l=Math.hypot(a,o)||1;a/=l,o/=l;const c={x:-o,y:a},h=p=>(.22+.9*Math.pow(Math.sin(p*Math.PI/2),1.3))*e,f=this.tmp.reset(),u=10;for(let p=0;p<=u;p++){const _=p/u,g=h(_),d=.28*e*(g/(1.12*e));f.p(s.x+a*l*_+c.x*d,s.y+o*l*_+c.y*d,g)}for(let p=1;p<12;p++){const _=h(1)*(1-2*p/12),g=.28*e*(Math.abs(_)/(1.12*e))**2;f.p(r.x+c.x*g+a*.08*e*(1-(_/h(1))**2),r.y+c.y*g+o*.08*e*(1-(_/h(1))**2),_)}for(let p=u;p>=0;p--){const _=p/u,g=h(_),d=.28*e*(g/(1.12*e));f.p(s.x+a*l*_+c.x*d,s.y+o*l*_+c.y*d,-g)}this.beams.poly(f,mt.blue,1.1,{alpha:.75}),this.beams.line(new Float32Array([s.x,s.y,0,r.x,r.y,0]),2,mt.blue,2.1,{alpha:.85*i})}larynx(t,e,i,s,r,a,o,l){const c=e.glottis,h=this.beams,f=new Si,u=(E,A,z)=>[c.x+E*r,c.y+A*r,z*r],p=(E,A=!1)=>{for(const[z,y,T]of E)f.p(...u(z,y,T));f.end(A)};for(const E of[1,-1])p([[1.45,1.75,0],[.75,2,E*1.2],[-.5,1.95,E*1.9],[-.6,-.6,E*1.85],[.25,-.85,E*1.5],[1.05,-.8,E*.55],[1.2,-.75,0],[1.6,.05,0],[1.9,1.15,0],[1.45,1.75,0]]),p([[-.5,1.95,E*1.9],[-.7,2.85,E*1.85]]),p([[-.6,-.6,E*1.85],[-.45,-1.25,E*1.7]]);for(const[E,A]of[[-1.75,.15],[-1.4,1.1]]){for(let z=0;z<=28;z++){const y=z/28*Math.PI*2;f.p(...u(.1+1*Math.cos(y),E+A*(1-Math.cos(y))/2,1.1*Math.sin(y)))}f.end()}for(const E of f.lines)h.line(E,E.length/3,mt.blueMid,1,{alpha:.85});const _=new Si,g=c.y-2.1*r,d=c.x+.08*r;for(let E=g;E>o;E-=.5*r)_.ellipse([d,E,0],[.82*r,0,0],[0,0,.95*r],20,-.8*Math.PI,.8*Math.PI);for(const E of[1,-1])_.p(d,g,E*.95*r).p(d,o,E*.95*r).end();for(const E of _.lines)h.line(E,E.length/3,mt.blueDim,.9,{alpha:.85});for(const E of[1,-1])h.line(new Float32Array([d+E*.82*r,c.y,0,d+E*.82*r,o,0]),2,mt.blueMid,1,{alpha:l});const m=new Si,M={x:t.tract.P(1.6,0).x,y:t.tract.P(0,2.9).y+.6*i.larynx*r};for(const E of[-.16,.16]){for(let A=0;A<=20;A++){const z=-1+A/10;m.p(M.x+(.35-.65*z*z)*r,M.y+E*r,1.15*z*r)}m.end();for(const A of[1,-1])m.p(M.x-.3*r,M.y+E*r,A*1.15*r).p(M.x-2.8*r,M.y+(.7+E)*r,A*2.05*r).end()}for(const E of m.lines)h.line(E,E.length/3,mt.blueMid,1,{alpha:.85});const v=s==null?void 0:s.t.glottalArea;let b=0;if(v&&v.length){this.strobe=(this.strobe+a/1.8)%1;let E=.02;for(let A=0;A<v.length;A++)E=Math.max(E,v[A]);b=Math.min(.45*r,v[Math.floor(this.strobe*v.length)%v.length]/(1.3*r)*2.2),Number.isFinite(b)||(b=0)}const P=new Si;for(const E of[1,-1])P.p(...u(.72,.1,0)).p(...u(-.55,.1,E*(.06+b/r))).end(),P.p(...u(.72,0,0)).p(...u(-.6,0,E*.62)).end(),P.p(...u(.65,.45,0)).p(...u(-.5,.45,E*.45)).end(),P.ellipse(u(-.72,.15,E*(.3+b/r)),[.18*r,0,0],[0,.12*r,.12*r],10);P.lines.forEach((E,A)=>h.line(E,E.length/3,A%4===0?mt.white:mt.blueMid,A%4===0?1.3:1,{alpha:A%4===2?.6:.9,hot:A%4===0}))}}function Xl(n,t,e,i){const s=n-e.x,r=t-e.y,a=Math.cos(i),o=Math.sin(i);return[e.x+s*a-r*o,e.y+s*o+r*a]}const ql=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],Yl=n=>{const t=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/t,n[1]/t,n[2]/t]},ji=(n,t)=>[n[0]*t,n[1]*t,n[2]*t];function To(n,t,e){let i=0,s=1/0;for(let r=0;r<t.length;r++){const a=Math.abs(t[r]-e);a<s&&(s=a,i=r)}return n[i]??0}const jl=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0;function Jg(n){const t=jl(n.female),e=jl(n.child);return[["male",(1-e)*(1-t)],["female",(1-e)*t],["child",e]]}class ch{constructor(t,e){this.cacheKey="",this.cacheFrame=null,this.tfKey="",this.tf=null,this.body=t,this.model=fg(t,e),this.bodyParams=this.model.body,this.tract=new ug(this.bodyParams),this.nPh=this.model.nPh,this.nOr=this.model.nOr;const i=Jg(t).filter(([,s])=>s>0).map(([s,r])=>({w:r,table:cg[s]??{}}));this.vowels=hg.filter(s=>i.every(r=>r.table[s.ipa])).map(s=>{const r=o=>{let l=0,c=0;for(const h of i){const f=o(h.table[s.ipa]);f!==void 0&&(l+=h.w*f,c+=h.w)}return c>0?l/c:void 0},a={};for(const o of bi){const l=r(c=>c.artic[o]);l!==void 0&&(a[o]=l)}return{ipa:s.ipa,example:s.example,F1:r(o=>o.formants[0]),F2:r(o=>o.formants[1]),artic:a}})}dispose(){dg(this.model)}static articFromArray(t){const e={...wr};return bi.forEach((i,s)=>e[i]=t[s]),e}frame(t){const e=bi.map(i=>t[i].toFixed(3)).join(",");return(e!==this.cacheKey||!this.cacheFrame)&&(this.cacheFrame=pg(this.model,t),this.cacheKey=e),this.cacheFrame}areas(t){return mg(this.model,t)}transfer(t){const e=bi.map(i=>t[i].toFixed(2)).join(",");return e===this.tfKey&&this.tf?this.tf:(this.tf=gg(this.model,t),this.tfKey=e,this.tf)}articForFormants(t,e){const i=this.vowels.map(l=>{const c=Math.log(t/l.F1)*2.2,h=Math.log(e/l.F2),f=Math.hypot(c,h);return{v:l,w:1/Math.pow(f+.02,3)}});i.sort((l,c)=>c.w-l.w);const s=i.slice(0,4),r=s.reduce((l,c)=>l+c.w,0),a=["tbX","tbY","jaw","lipAp","lipProt","lipWidth","root","larynx","ttCurl"],o={};for(const l of a){let c=0;for(const{v:h,w:f}of s)c+=(h.artic[l]??wr[l])*f;o[l]=c/r}return o}nodeS(t,e){const i=this.nPh,s=this.nOr,r=new Float64Array(i+s);for(let a=0;a<i;a++)r[a]=(a+.5)/i*t;for(let a=0;a<s;a++)r[i+a]=t+(a+.5)/s*e;return r}branchS(t,e,i){const s=this.model.pharynxBranches,r=this.model.oralBranches;return t>=s.base&&t<s.base+s.n-1?(t-s.base+1)/s.n*e:t>=r.base&&t<r.base+r.n-1?e+(t-r.base+1)/r.n*i:t===this.model.glottisPort?.2:-1}}const sa=Object.freeze({...mt});function Zl(n,t){if(!n)return t();Object.assign(mt,n);try{return t()}finally{Object.assign(mt,sa)}}function hh(n,t={}){return{...sa,blue:n,blueMid:cn(n,"#000000",.22),blueDim:cn(n,"#000000",.45),frame:cn(n,"#000000",.7),...t}}const Qg={pressure:!0,particles:!0,grid:!1,calipers:!1},t_=48e3,$o=Object.freeze({...wr,jaw:.18,lipAp:0,lipProt:.1}),Kl=new Map;function e_(n){const t=`${(+n.female||0).toFixed(3)}/${(+n.child||0).toFixed(3)}`;let e=Kl.get(t);return e||(e=new ch({female:+n.female||0,child:+n.child||0},t_),Kl.set(t,e)),e}const Jl=n=>ch.articFromArray(n),wo=new H;class n_{constructor(t,e){this.model=e_(t),this.palette=e;const i=this.r=new Kg;i.centred=!0,i.camera.aspect=1,i.camera.clearViewOffset(),i.camera.updateProjectionMatrix(),this.tile=0,this.lw=0,this.target=new H,Zl(e,()=>this.target.copy(i.poses(this.model).target)),this.k=this.model.tract.scale,this.half=Math.tan(i.camera.fov*Math.PI/360),this.dist=1.1*15.2/this.half,this._hullSrc=null}aim(t,e,i,s){const r=this.r;(Math.abs(i-this.tile)>.01||s!==this.lw)&&(this.tile=i,this.lw=s,r.w=r.h=i,r.beams.setResolution(i/s,i/s));const a=this.dist,o=r.camera;o.position.set(Math.sin(t)*Math.cos(e),Math.sin(e),Math.cos(t)*Math.cos(e)).multiplyScalar(a).add(this.target),o.up.set(0,1,0),o.lookAt(this.target),o.updateMatrixWorld()}update(t,e,i,s,r=0,a=0){const o=this.r;Zl(this.palette,()=>{o.face.update(i,e),o.face.nod+=r,o.face.tilt+=a,this.f=this.model.frame(s),o.update(this.model,this.f,s,i,Qg,t)})}resetMotion(){this.r.resetMotion()}project(t,e,i){return this.r.project(t,e,i)}neck(){const t=this.r.rest,e=this.k,i=t.head.y0+3.4*e,s=t.head.at(i),r=s?(s.F+s.Bk)/2:t.center.x,[a,o]=this.r.project(r,i,0),[l]=this.r.project(s?s.F:r+4,i,0);return{x:a,y:o,cm:this.r.pxPerCmAt(r,i,0),front:l-a}}mouth(){const t=this.f;if(!t)return this.r.project(this.target.x+7*this.k,this.target.y-4*this.k,0);const e=t.upperLip[Math.min(6,t.upperLip.length-1)],i=t.lowerLip[Math.min(6,t.lowerLip.length-1)];let s=-1/0;for(const r of t.upperLip)s=Math.max(s,r.x);return this.r.project(s,(e.y+i.y)/2,0)}crown(){return this.r.crown(this.model)}hull(){if(!this._hullSrc){const o=[];for(const l of this.r.rest.shell)for(let c=0;c<l.a.length;c+=9)o.push(l.a[c],l.a[c+1],l.a[c+2]);this._hullSrc=new Float32Array(o),this._hullXY=new Float32Array(o.length/3*2)}const t=this._hullSrc,e=this._hullXY,i=this.r,s=i.beams.group.matrixWorld,r=i.w,a=i.h;for(let o=0,l=0;o<t.length;o+=3,l+=2)wo.set(t[o],t[o+1],t[o+2]).applyMatrix4(s).project(i.camera),e[l]=(wo.x+1)/2*r,e[l+1]=(1-wo.y)/2*a;return i_(e)}dispose(){this.r.dispose()}}function i_(n){const t=n.length/2,e=new Array(t);for(let o=0;o<t;o++)e[o]=o;e.sort((o,l)=>n[2*o]-n[2*l]||n[2*o+1]-n[2*l+1]);const i=(o,l,c)=>(n[2*l]-n[2*o])*(n[2*c+1]-n[2*o+1])-(n[2*l+1]-n[2*o+1])*(n[2*c]-n[2*o]),s=[],r=[];for(const o of e){for(;s.length>=2&&i(s[s.length-2],s[s.length-1],o)<=0;)s.pop();s.push(o)}for(let o=e.length-1;o>=0;o--){const l=e[o];for(;r.length>=2&&i(r[r.length-2],r[r.length-1],l)<=0;)r.pop();r.push(l)}r.pop(),s.pop();const a=[];for(const o of s.concat(r))a.push(n[2*o],n[2*o+1]);return a}class s_{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=512,this.failed=!1,this.lost=!1,this.size=512;try{this.gl=new qc({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1})}catch(e){console.warn("heads: WebGL unavailable",e),this.failed=!0;return}const t=this.gl;t.outputColorSpace=Pn,t.setClearColor(0,1),t.setPixelRatio(1),t.setSize(512,512,!1),t.autoClear=!1,this.canvas.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.lost=!0}),this.canvas.addEventListener("webglcontextrestored",()=>this.lost=!1)}get ok(){return!this.failed&&!this.lost}render(t,e){e=Math.max(8,Math.round(e)),e>this.size&&(this.size=Math.min(4096,Math.ceil(e/256)*256),this.gl.setSize(this.size,this.size,!1));const i=this.gl;return i.setViewport(0,0,e,e),i.setScissor(0,0,e,e),i.setScissorTest(!0),i.clear(),i.render(t.r.scene,t.r.camera),[0,this.size-e,e,e]}dispose(){this.gl&&(this.gl.dispose(),this.gl.forceContextLoss())}}const ln=Math.PI*2,Kt=n=>{const t=new Path2D;return n(t),t};function Mn(n,t,e,i,s,r=0,a=1){n.save(),n.translate(t,e),r&&n.rotate(r),n.scale(i*a,i);try{s()}finally{n.restore()}}const Ln=(n,t)=>n/Math.abs(t);function uh(n,t,e,i,s={}){if(!(i>=0)||i>1.5)return;const r=Li(s.seed??1),a=s.count??22,o=s.colors??[x.gold,x.magenta,x.cyan,x.lime,x.sky],l=s.spread??1;for(let c=0;c<a;c++){const h=r.range(-Math.PI,0)+r.range(-.4,.4),f=r.range(90,260)*l,u=t+Math.cos(h)*f*i,p=e+Math.sin(h)*f*i+260*i*i,_=1-se(i/1.4),g=r.pick(o),d=r.range(4,12)*i+r.range(0,ln),m=r.range(3,7);c%3===0?(Ot(n,u-m,p,u+m,p,g,1.3,{alpha:_,hot:!0}),Ot(n,u,p-m,u,p+m,g,1.3,{alpha:_,hot:!0})):Ot(n,u-Math.cos(d)*m,p-Math.sin(d)*m,u+Math.cos(d)*m,p+Math.sin(d)*m,g,1.6,{alpha:_})}}function bs(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,a=i.color??x.violet,o=i.alpha??1;Mn(n,t,e,s,()=>{const l=Ln(1.5,s),c=Kt(f=>{f.moveTo(18,-6),f.bezierCurveTo(10,-14,-10,-12,-16,-3),f.lineTo(-30,2),f.lineTo(-28,7),f.lineTo(-14,5),f.bezierCurveTo(-4,10,12,8,18,-6),f.closePath()});Rt(n,c),it(n,c,a,l,{alpha:o});const h=Kt(f=>{f.arc(19,-9,6.5,0,ln)});if(Rt(n,h),it(n,h,a,l,{alpha:o}),it(n,Kt(f=>{f.moveTo(25,-11),f.lineTo(35,-7.5),f.lineTo(25,-6.5)}),x.amber,l,{alpha:o,hot:!0}),ve(n,21,-10.5,1.3,x.white,o),i.perched)it(n,Kt(f=>{f.moveTo(-14,-2),f.bezierCurveTo(-4,-8,8,-6,12,-2)}),a,l*.8,{alpha:.7*o}),it(n,Kt(f=>{f.moveTo(0,7),f.lineTo(-2,15),f.moveTo(6,7),f.lineTo(5,15),f.moveTo(-6,15),f.lineTo(10,15)}),x.amber,l,{alpha:o});else{const f=Math.sin((i.flap??0)*ln);for(const u of[1,.6]){const p=-30*f*u-4,_=Kt(g=>{g.moveTo(6,-6),g.bezierCurveTo(0,p*.6-4,-14,p,-24,p+2),g.lineTo(-18,p*.4+2),g.bezierCurveTo(-10,-2,-2,-2,-6,-2)});it(n,_,a,l,{alpha:o*(u===1?1:.5)})}}},0,r)}function fh(n,t,e,i=1,s={}){Mn(n,t,e,i,()=>{const r=Kt(a=>{a.moveTo(-20,8),a.lineTo(-22,-10),a.lineTo(-10,0),a.lineTo(0,-16),a.lineTo(10,0),a.lineTo(22,-10),a.lineTo(20,8),a.closePath()});Rt(n,r),it(n,r,s.color??x.gold,Ln(1.8,i),{hot:!0,alpha:s.alpha});for(const[a,o]of[[-22,-12],[0,-18],[22,-12]])ve(n,a,o,2.4,x.magenta,s.alpha??1);Ot(n,-18,3,18,3,s.color??x.gold,Ln(1,i),{alpha:.6*(s.alpha??1)})})}function r_(n,t,e,i={}){const s=i.scale??1,r=i.facing??1,a=i.color??x.white,o=Math.sin((i.bob??0)*ln)*4;Mn(n,t,e,s,()=>{const l=Ln(1.6,s),c=Kt(p=>{p.moveTo(14,-30),p.bezierCurveTo(26,-10,22,18,0,22),p.bezierCurveTo(-24,24,-36,6,-40,-18),p.lineTo(-30,-12),p.lineTo(-34,-30),p.lineTo(-22,-16),p.bezierCurveTo(-12,-14,0,-18,14,-30),p.closePath()});Rt(n,c),it(n,c,a,l),it(n,Kt(p=>{p.moveTo(-14,0),p.bezierCurveTo(-6,10,6,8,8,-2)}),a,l*.8,{alpha:.6});const h=18+o,f=-44,u=Kt(p=>{p.moveTo(10,-26),p.lineTo(h-4,f+8),p.arc(h,f,9,Math.PI*.75,Math.PI*.4,!1),p.lineTo(20,-22)});Rt(n,u),it(n,u,a,l),it(n,Kt(p=>{p.moveTo(h+7,f-2),p.lineTo(h+17,f+1),p.lineTo(h+7,f+4)}),x.amber,l,{hot:!0}),it(n,Kt(p=>{p.moveTo(h-4,f-8),p.bezierCurveTo(h-6,f-18,h,f-16,h,f-10),p.bezierCurveTo(h+2,f-18,h+8,f-16,h+5,f-7)}),x.red,l,{hot:!0}),it(n,Kt(p=>{p.moveTo(h+7,f+4),p.bezierCurveTo(h+10,f+12,h+4,f+12,h+4,f+6)}),x.red,l),ve(n,h+2,f-2,1.6,x.white),it(n,Kt(p=>{for(const _ of[-8,4])p.moveTo(_,21),p.lineTo(_,38),p.moveTo(_-6,40),p.lineTo(_,38),p.lineTo(_+7,40)}),x.amber,l),i.crown&&fh(n,h-1,f-20,.5/1,{color:x.gold})},0,r)}function o_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.sky;Mn(n,t,e,s,()=>{const a=Ln(1.6,s),o=Kt(l=>{l.moveTo(30,-32),l.bezierCurveTo(40,-30,38,-18,28,-16),l.bezierCurveTo(22,0,10,14,-16,16),l.bezierCurveTo(-34,16,-46,12,-50,4),l.lineTo(-58,-4),l.lineTo(-50,10),l.lineTo(-62,14),l.lineTo(-44,18),l.bezierCurveTo(-20,22,10,22,20,12),l.lineTo(26,22),l.lineTo(12,22),l.bezierCurveTo(16,0,14,-26,30,-32),l.closePath()});Rt(n,o),it(n,o,r,a),ve(n,30,-26,1.8,x.white);for(const l of[-1,1])Ot(n,36,-21,46,-21+l*3,r,a*.6,{alpha:.6});if(i.ball){const l=-44+Math.sin((i.t??0)*6)*2;Fe(n,36,l,9,x.red,a,{hot:!0}),it(n,Kt(c=>{c.moveTo(27,l),c.bezierCurveTo(32,l-6,40,l-6,45,l)}),x.white,a*.7,{alpha:.7})}},0,i.facing??1)}function a_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.lime,a=se(i.jaw??0)*.45;Mn(n,t,e,s,()=>{const o=Ln(1.6,s),l=Kt(c=>{c.moveTo(30,-8),c.bezierCurveTo(10,-18,-30,-16,-60,-6),c.lineTo(-90,0),c.lineTo(-60,6),c.bezierCurveTo(-30,12,10,12,30,4),c.closePath()});Rt(n,l),it(n,l,r,o),it(n,Kt(c=>{for(let h=0;h<9;h++){const f=20-h*10;c.moveTo(f,-12+h*.6),c.lineTo(f-4,-17+h*.6),c.lineTo(f-8,-12+h*.6)}}),r,o*.8,{alpha:.7}),Mn(n,30,-4,1,()=>{n.rotate(-a);const c=Kt(h=>{h.moveTo(0,-4),h.lineTo(46,-2),h.lineTo(48,2),h.lineTo(0,2)});Rt(n,c),it(n,c,r,o),it(n,Kt(h=>{for(let f=0;f<6;f++)h.moveTo(8+f*7,2),h.lineTo(11+f*7,5),h.lineTo(14+f*7,2)}),x.white,o*.7),ve(n,8,-7,2,x.amber)}),Mn(n,30,2,1,()=>{n.rotate(a*.6),it(n,Kt(c=>{c.moveTo(0,0),c.lineTo(44,0),c.lineTo(42,5),c.lineTo(0,6)}),r,o)}),it(n,Kt(c=>{for(const h of[16,-40])c.moveTo(h,8),c.lineTo(h-4,18),c.lineTo(h+4,18)}),r,o)},0,i.facing??1)}function l_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.blueMid,a=i.trunk??0;Mn(n,t,e,s,()=>{const o=Ln(1.6,s),l=Kt(h=>{h.moveTo(30,-50),h.bezierCurveTo(10,-66,-50,-64,-60,-30),h.lineTo(-60,10),h.lineTo(-46,10),h.lineTo(-44,-6),h.lineTo(-20,-6),h.lineTo(-18,10),h.lineTo(-4,10),h.lineTo(0,-10),h.lineTo(16,-10),h.lineTo(18,10),h.lineTo(32,10),h.lineTo(34,-20),h.closePath()});Rt(n,l),it(n,l,r,o);const c=Kt(h=>{h.arc(38,-42,20,0,ln)});Rt(n,c),it(n,c,r,o),it(n,Kt(h=>{h.moveTo(30,-58),h.bezierCurveTo(6,-66,4,-24,30,-28)}),r,o,{alpha:.8}),it(n,Kt(h=>{h.moveTo(54,-36),h.bezierCurveTo(66,-20,60+a*10,0,66+a*16,6)}),r,o),ve(n,44,-46,1.8,x.white),it(n,Kt(h=>{h.moveTo(50,-30),h.lineTo(60,-24)}),x.white,o,{alpha:.8}),Ot(n,-60,-26,-70,-10,r,o)},0,i.facing??1)}function dh(n,t,e,i={}){const s=i.scale??1,r=i.color??x.cyan,a=se(i.pressed??0),o=i.glow??0;Mn(n,t,e,s,()=>{const l=Ln(1.6,s),c=tn(-40,-30,80,66,10);Rt(n,c),it(n,c,r,l,{alpha:.7});const h=a*8,f=tn(-31,-40+h,62,56,8);Rt(n,f),it(n,f,r,l*(1+o),{hot:o>.3});for(const[u,p,_,g]of[[-40,-30,-31,-40+h],[40,-30,31,-40+h],[-40,36,-31,16+h],[40,36,31,16+h]])Ot(n,u,p,_,g,r,l*.8,{alpha:.6});vt(n,i.label??"E",0,0+h,{size:34,align:"center",color:o>.2?x.white:r,weight:"m",ls:0})})}function c_(n,t,e,i={}){const s=i.scale??1,r=i.color??x.coral,a=se(i.open??0);Mn(n,t,e,s,()=>{const o=Ln(1.5,s);if(a<.05){const l=Dn(-26,-36,52,72,3);if(Rt(n,l),it(n,l,r,o),Ot(n,-20,-36,-20,36,r,o,{alpha:.6}),i.title)for(const[c,h]of Di(n,i.title.toUpperCase(),40,{size:8}).entries())vt(n,h,3,-16+c*11,{size:8,align:"center",color:x.white,ls:.1})}else{const l=36*a;for(const c of[-1,1]){const h=Kt(f=>{f.moveTo(0,34),f.bezierCurveTo(c*l*.4,30,c*l,32,c*l,30),f.lineTo(c*l,-32),f.bezierCurveTo(c*l,-30,c*l*.4,-34,0,-30),f.closePath()});Rt(n,h),it(n,h,r,o);for(let f=0;f<6;f++)Ot(n,c*6,-20+f*8,c*(l-6),-20+f*8,x.white,o*.6,{alpha:.4*a})}}})}function h_(n,t,e,i,s={}){const r=s.age??1;if(r<-.15)return;const a=r<0?1+-r/.15*1.6:1+.18*Math.exp(-r*18)*Math.cos(r*40),o=s.size??44,l=s.color??x.red;n.save(),n.translate(t,e),n.rotate(s.rot??-.12),n.scale(a,a);const c=me(n,i.toUpperCase(),{size:o,weight:"m",ls:.12})+o*.9,h=o*1.5;if(n.globalAlpha=r<0?.5:1,it(n,tn(-c/2,-h/2,c,h,6),l,3,{hot:r>=0&&r<.3}),it(n,tn(-c/2+6,-h/2+6,c-12,h-12,4),l,1.2,{alpha:.6}),vt(n,i.toUpperCase(),0,o*.36,{size:o,align:"center",color:l,weight:"m",ls:.12}),n.restore(),r>=0&&r<.5){const f=Li(i);for(let u=0;u<10;u++){const p=f.range(0,ln),_=c/2*(1+r*f.range(.8,2.2));ve(n,t+Math.cos(p)*_,e+Math.sin(p)*_*.5,1.6,l,1-r*2)}}}function u_(n,t,e,i,s={}){const r=Ye.outBack(se(s.appear??1));if(r<=0)return;const a=s.size??20,o=s.side??1,l=String(i).split(`
`).flatMap(g=>Di(n,g,(s.w??300)-30,{size:a})),c=Math.max(...l.map(g=>me(n,g,{size:a})))+34,h=l.length*a*1.35+22,f=t+o*30-(o<0?c:0),u=e-40-h,p=s.color??x.white;n.save(),n.translate(t,e),n.scale(r,r),n.translate(-t,-e);const _=tn(f,u,c,h,14);if(Rt(n,_),it(n,_,p,1.6),s.think)for(let g=0;g<3;g++)Fe(n,t+o*(6+g*8),e-8-g*12,3+g*2,p,1.2);else{const g=Kt(d=>{d.moveTo(t+o*34,u+h-1),d.lineTo(t,e),d.lineTo(t+o*58,u+h-1)});Rt(n,g),it(n,Kt(d=>{d.moveTo(t+o*34,u+h),d.lineTo(t,e),d.lineTo(t+o*58,u+h)}),p,1.6)}l.forEach((g,d)=>vt(n,g,f+17,u+14+(d+.8)*a*1.35-a*.25,{size:a,color:p})),n.restore()}function f_(n,t,e,i=360,s={}){var u;const r=s.color??x.gold,a=Ye.outCubic(se(s.rise??1)),o=i/3,l=[i*.42,i*.3,i*.2].map(p=>p*a),c=[t-o/2,t-o*1.5,t+o/2],h=[0,1,2],f=[];for(const p of h){const _=c[p],g=l[p],d=Dn(_,e-g,o,g);Rt(n,d),it(n,d,p===0?r:cn(r,"#888888",.4),1.6,{hot:p===0}),g>30&&vt(n,String(((u=s.labels)==null?void 0:u[p])??p+1).toUpperCase(),_+o/2,e-g+Math.min(48,g*.6),{size:Math.min(40,o*.32),align:"center",color:p===0?r:x.white,weight:"m",ls:.05}),f.push([_+o/2,e-g])}return f}function d_(n,t,e,i={}){const s=i.w??300,r=i.height??120,a=i.color??x.lime,o=(i.wobble??0)*6;for(const c of[-1,1])Ot(n,t+c*s/2,e,t+c*s/2,e-r-40,x.blueMid,2),Ot(n,t+c*s/2-12,e,t+c*s/2+12,e,x.blueMid,2),Ot(n,t+c*s/2-6,e-r,t+c*s/2+6,e-r,x.white,1.4);const l=Kt(c=>{c.moveTo(t-s/2,e-r),c.quadraticCurveTo(t,e-r+o,t+s/2,e-r)});it(n,l,a,4,{hot:!0});for(let c=1;c<8;c++){const h=t-s/2+s*c/8;Ot(n,h-4,e-r-2,h+4,e-r+2,x.white,1.4,{alpha:.7})}}function p_(n,t,e,i,s={}){const r=s.size??30,a=s.age??10,o=r*.82,l=r*1.3,c=String(i).toUpperCase().padEnd(s.cells??i.length," "),h="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";for(let f=0;f<c.length;f++){const u=t+f*(o+3),p=Dn(u,e-l,o,l,2);Rt(n,p,"#05080c"),it(n,p,x.blueDim,1),Ot(n,u,e-l/2,u+o,e-l/2,"#000",1.2);const _=.25+f*.05;let g=c[f];a<_&&g!==" "&&(g=h[Math.floor((a*30+f*7)%h.length)]),a<0&&(g=" "),vt(n,g,u+o/2,e-l*.25,{size:r,align:"center",color:a<_?x.blueMid:s.color??x.amber,weight:"m",ls:0})}}function ph(n,t,e,i,s={}){const r=s.size??18,a=r*1.9;Rt(n,Dn(0,t,1280,a),"#000",.92),Ot(n,0,t,1280,t,s.color??x.amber,1.4,{hot:!0}),Ot(n,0,t+a,1280,t+a,s.color??x.amber,1);const o=`${String(e).toUpperCase()}   ◆   `,l=me(n,o,{size:r,ls:.12}),c=(i*(s.speed??110)%l+l)%l;n.save(),n.beginPath(),n.rect(0,t,1280,a),n.clip();for(let h=-c;h<1280;h+=l)vt(n,o,h,t+a*.68,{size:r,color:x.white,ls:.12});if(n.restore(),s.tag){const h=me(n,s.tag.toUpperCase(),{size:r,weight:"m",ls:.2})+30;Se(n,0,t,h,a,{color:s.color??x.amber,width:1.4}),vt(n,s.tag.toUpperCase(),15,t+a*.68,{size:r,color:s.color??x.amber,weight:"m",ls:.2})}}function m_(n,t,e={}){const i=Li(n),s=e.points??40,r=t.x+t.w/2,a=t.y+t.h/2,o=[i.range(0,ln),i.range(0,ln),i.range(0,ln)],l=[];for(let h=0;h<s;h++){const f=h/s*ln,u=1+.14*Math.sin(f*2+o[0])+.08*Math.sin(f*5+o[1])+.05*Math.sin(f*9+o[2])+i.range(-.03,.03);l.push([r+Math.cos(f)*(t.w/2)*.85*u,a+Math.sin(f)*(t.h/2)*.85*u])}const c=new Path2D;return l.forEach(([h,f],u)=>u?c.lineTo(h,f):c.moveTo(h,f)),c.closePath(),{path:c,pts:l}}function g_(n,t,e={}){it(n,t.path,e.color??x.sky,1.8,{alpha:e.alpha??1})}function __(n,t,e={}){const i=e.kind??"cold",s=e.color??(i==="warm"?x.red:x.sky),r=se(e.progress??1),a=[0];for(let h=1;h<t.length;h++)a.push(a[h-1]+Math.hypot(t[h][0]-t[h-1][0],t[h][1]-t[h-1][1]));const o=a[a.length-1]*r,l=new Path2D;l.moveTo(t[0][0],t[0][1]);for(let h=1;h<t.length&&a[h-1]<o;h++){const f=Math.min(1,(o-a[h-1])/(a[h]-a[h-1]||1));l.lineTo(t[h-1][0]+(t[h][0]-t[h-1][0])*f,t[h-1][1]+(t[h][1]-t[h-1][1])*f)}it(n,l,s,2.2,{hot:!0});const c=e.spacing??40;for(let h=c/2;h<o;h+=c){let f=1;for(;f<a.length-1&&a[f]<h;)f++;const u=(h-a[f-1])/(a[f]-a[f-1]||1),p=t[f-1][0]+(t[f][0]-t[f-1][0])*u,_=t[f-1][1]+(t[f][1]-t[f-1][1])*u,g=Math.atan2(t[f][1]-t[f-1][1],t[f][0]-t[f-1][0]);if(typeof i=="function")i(n,p,_,g);else{n.save(),n.translate(p,_),n.rotate(g);const d=new Path2D;i==="warm"?d.arc(0,0,8,Math.PI,0):(d.moveTo(-8,0),d.lineTo(0,-12),d.lineTo(8,0)),d.closePath(),it(n,d,s,1.8,{hot:!0}),n.restore()}}}function v_(n,t,e,i,s={}){const r=s.seed??3,a=new Path2D;for(let o=0;o<=48;o++){const l=o/48*ln,c=1+.12*$e(l*1.3+r,r);o?a.lineTo(t+Math.cos(l)*i*c,e+Math.sin(l)*i*c*.7):a.moveTo(t+i*c,e)}it(n,a,s.color??x.blueMid,1.1,{alpha:s.alpha??.7}),s.label&&vt(n,s.label,t+i*.7,e-i*.5,{size:12,color:s.color??x.blueMid})}function M_(n,t,e,i=20,s=0,r=x.gold){Fe(n,t,e,i,r,2,{hot:!0});for(let a=0;a<10;a++){const o=a/10*ln+s*.4;Ot(n,t+Math.cos(o)*i*1.3,e+Math.sin(o)*i*1.3,t+Math.cos(o)*i*1.75,e+Math.sin(o)*i*1.75,r,1.6)}}function Nr(n,t,e,i=1,s=x.white){Mn(n,t,e,i,()=>{const r=Kt(a=>{a.moveTo(-30,10),a.arc(-18,0,12,Math.PI*.6,Math.PI*1.5),a.arc(0,-8,16,Math.PI*1.1,Math.PI*1.9),a.arc(20,0,12,Math.PI*1.4,Math.PI*.4),a.closePath()});Rt(n,r),it(n,r,s,Ln(1.6,i))})}function y_(n,t,e,i=1,s=0,r=x.sky){Nr(n,t,e,i,x.white);for(let a=0;a<5;a++){const o=(s*1.8+a*.37)%1,l=(-16+a*8)*i,c=(16+o*26)*i;Ot(n,t+l,e+c,t+l-3*i,e+c+8*i,r,1.4,{alpha:1-o})}}function x_(n,t,e,i=1,s=0){Nr(n,t,e,i,x.blueMid);const r=Math.floor(s*3)%4===0;it(n,Kt(a=>{a.moveTo(t+2*i,e+12*i),a.lineTo(t-6*i,e+28*i),a.lineTo(t+2*i,e+28*i),a.lineTo(t-6*i,e+46*i)}),x.gold,2,{hot:r,alpha:r?1:.4})}function S_(n,t,e,i=1,s=0){Nr(n,t,e,i,x.white);for(let r=0;r<5;r++){const a=(s*.6+r*.29)%1,o=t+(-16+r*8+Math.sin(s*2+r)*3)*i,l=e+(16+a*30)*i;for(let c=0;c<3;c++){const h=c/3*Math.PI;Ot(n,o-Math.cos(h)*3*i,l-Math.sin(h)*3*i,o+Math.cos(h)*3*i,l+Math.sin(h)*3*i,x.white,1,{alpha:1-a})}}}function Rr(n,t,e,i,s,r={}){const a=r.color??x.blueMid;if(!r.noStand){const l=Kt(c=>{c.moveTo(t+i/2-14,e+s+10),c.lineTo(t+i/2-24,e+s+50),c.lineTo(t+i/2+24,e+s+50),c.lineTo(t+i/2+14,e+s+10)});Rt(n,l),it(n,l,a,1.4)}const o=tn(t-12,e-12,i+24,s+24,14);Rt(n,o),it(n,o,a,1.8),it(n,tn(t,e,i,s,6),a,1,{alpha:.7})}Rr.glass=function(n,t,e,i,s,r={}){const a=r.color??x.blueMid;n.save(),n.beginPath(),n.rect(t,e,i,s),n.clip(),n.globalAlpha=.18,n.fillStyle="#000";for(let o=e;o<e+s;o+=3)n.fillRect(t,o,i,1.2);if(n.restore(),Ot(n,t+14,e+10,t+i*.35,e+10,x.white,1,{alpha:.18}),r.label){const o=me(n,r.label.toUpperCase(),{size:14,ls:.2})+26;Se(n,t+10,e+s-34,o,26,{color:a,cut:5,width:1.2,fillAlpha:.85}),vt(n,r.label.toUpperCase(),t+23,e+s-16,{size:14,color:x.white,ls:.2})}if(r.live){const o=Math.floor((r.t??0)*1.6)%2===0;Se(n,t+i-82,e+12,70,26,{color:x.onair,cut:5,width:1.2,fillAlpha:.85}),ve(n,t+i-68,e+25,5,x.onair,o?1:.3),vt(n,"LIVE",t+i-56,e+32,{size:15,color:x.onair,weight:"m",ls:.2})}};function mh(n,t,e,i={}){const s=i.rect??{x:0,y:0,w:1280,h:720},r=i.speed??40,a=i.lineHeight??34,o=s.x+s.w/2;let l=s.y+s.h-e*r;n.save(),n.beginPath(),n.rect(s.x,s.y,s.w,s.h),n.clip();for(const c of t){const h=se(Math.min((l-s.y)/60,(s.y+s.h-l)/60));if(l>s.y-a&&l<s.y+s.h+a)if(typeof c=="string")vt(n,c.toUpperCase(),o,l,{size:18,align:"center",color:x.white,ls:.2,alpha:h});else if(Array.isArray(c)){const f=s.x+s.w*(i.split??.6);vt(n,String(c[0]).toUpperCase(),f-16,l,{size:13,align:"right",color:x.sky,ls:.16,alpha:h}),vt(n,String(c[1]),f+16,l,{size:18,align:"left",color:x.white,ls:.06,alpha:h})}else c!=null&&c.head&&vt(n,c.head.toUpperCase(),o,l,{size:22,align:"center",color:x.gold,ls:.35,weight:"m",alpha:h});l+=c!=null&&c.head?a*1.5:a}return n.restore(),l>s.y}function Xo(n,t,e,i={}){const s=i.w??120,r=i.h??170,a=i.color??x.violet,o=Kt(c=>{c.moveTo(t-s/2-10,e),c.lineTo(t+s/2+10,e),c.lineTo(t+s/2+4,e+16),c.lineTo(t-s/2-4,e+16),c.closePath()}),l=Kt(c=>{c.moveTo(t-s/2,e+16),c.lineTo(t+s/2,e+16),c.lineTo(t+s/2-14,e+r),c.lineTo(t-s/2+14,e+r),c.closePath()});if(Rt(n,l),it(n,l,a,1.6),Rt(n,o),it(n,o,a,1.6,{hot:!0}),i.label&&vt(n,i.label.toUpperCase(),t,e+16+r*.3,{size:Math.min(22,s/(i.label.length*.7)),align:"center",color:i.labelColor??a,weight:"m",ls:.12}),i.lights)for(let c=0;c<6;c++)ve(n,t-s/2+18+c*(s-36)/5,e+r-18,2.6,c%2?x.gold:a,.4+.6*(Math.floor((i.t??0)*4+c)%3===0?1:.3))}const x=Object.freeze({...sa,gold:"#ffc861",goldMid:"#d39a3c",goldDim:"#6e4f1c",bsky:"#3f8cff",sky:"#7cc4ff",cyan:"#58f0e8",violet:"#a98bff",magenta:"#ff5fd2",lime:"#b6ff5c",coral:"#ff7a5c",onair:"#ff3b30",dim:"#0d2234",black:"#000000"});function Dn(n,t,e,i,s=0){const r=new Path2D;if(s<=0)return r.rect(n,t,e,i),r;const a=Math.min(s,e/2,i/2);return r.moveTo(n+a,t),r.lineTo(n+e-a,t),r.lineTo(n+e,t+a),r.lineTo(n+e,t+i-a),r.lineTo(n+e-a,t+i),r.lineTo(n+a,t+i),r.lineTo(n,t+i-a),r.lineTo(n,t+a),r.closePath(),r}function tn(n,t,e,i,s=8){const r=new Path2D;return s=Math.min(s,e/2,i/2),r.moveTo(n+s,t),r.arcTo(n+e,t,n+e,t+i,s),r.arcTo(n+e,t+i,n,t+i,s),r.arcTo(n,t+i,n,t,s),r.arcTo(n,t,n+e,t,s),r.closePath(),r}function Rt(n,t,e="#000",i=1){n.save(),n.globalCompositeOperation="source-over",n.globalAlpha=i,n.fillStyle=e,n.fill(t),n.restore()}function Se(n,t,e,i,s,r={}){const a=r.color??x.blue,o=r.radius?tn(t,e,i,s,r.radius):Dn(t,e,i,s,r.cut??0);if(r.fill!==null&&Rt(n,o,r.fill??"#000",r.fillAlpha??1),r.corners){const l=r.corners,c=new Path2D;for(const[h,f,u,p]of[[t,e,1,1],[t+i,e,-1,1],[t,e+s,1,-1],[t+i,e+s,-1,-1]])c.moveTo(h+u*l,f),c.lineTo(h,f),c.lineTo(h,f+p*l);it(n,c,a,r.width??1.6,{alpha:r.alpha,hot:r.hot})}else it(n,o,a,r.width??1.4,{alpha:r.alpha,hot:r.hot});return o}function _r(n,t,e,i,s={}){const r=s.glow??.6;r>0&&(n.save(),n.filter=`blur(${((s.size??11)*.12).toFixed(1)}px)`,vt(n,t,e,i,{...s,alpha:(s.alpha??1)*r}),n.restore()),vt(n,t,e,i,s)}function gh(n,t,e,i,s,r={}){const a=r.size??16,o=r.lineHeight??a*1.4,l=[];for(const c of String(t).split(`
`))l.push(...Di(n,c,s,r));return l.forEach((c,h)=>vt(n,c,e,i+h*o,r)),l.length*o}function b_(n,t,e,i,s,r={}){const a=Math.floor(se(s)*t.length),o=t.slice(0,a),l=r.maxW??1/0,c=r.size??18;let h;if(l<1/0?h=gh(n,o,e,i,l,r):(vt(n,o,e,i,r),h=c),(s<1||r.cursor)&&(r.t===void 0||Math.floor(r.t*2.5)%2===0)){const u=l<1/0?o.split(`
`).flatMap(m=>Di(n,m,l,r)):[o],p=u[u.length-1]??"",_=r.lineHeight??c*1.4,g=e+me(n,p,r)+c*.15,d=i+(u.length-1)*(l<1/0?_:0);Ot(n,g,d+c*.12,g+c*.55,d+c*.12,r.color??x.green,Math.max(1.5,c*.1))}return h}function E_(n,t,e=0){return(n*Ye.outCubic(se(t))).toLocaleString("en-US",{minimumFractionDigits:e,maximumFractionDigits:e})}function ra(n){return n>=1e6?(n/1e6).toFixed(n>=1e7?0:1).replace(/\.0$/,"")+"M":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1).replace(/\.0$/,"")+"K":String(Math.round(n))}function T_(n,t,e,i,s,r=x.white,a=2,o={}){const l=Math.atan2(s-e,i-t),c=o.head??10,h=new Path2D;h.moveTo(t,e),h.lineTo(i,s),h.moveTo(i-c*Math.cos(l-.45),s-c*Math.sin(l-.45)),h.lineTo(i,s),h.lineTo(i-c*Math.cos(l+.45),s-c*Math.sin(l+.45)),it(n,h,r,a,o)}function _h(n,t,e={}){const{x:i,y:s,w:r}=t,a=Ye.outCubic(se(e.appear??1));if(a<=0)return;const o=t.h*a,l=e.color??x.sky;if(Se(n,i,s,r,o,{color:l,cut:10,width:1.6,alpha:.9}),it(n,Dn(i+6,s+6,r-12,o-12,6),l,.8,{alpha:.25}),e.title&&a>.6){const c=me(n,e.title.toUpperCase(),{size:15,ls:.2})+28;Se(n,i+18,s-13,c,26,{color:l,cut:6,width:1.4}),vt(n,e.title.toUpperCase(),i+32,s+6,{size:15,ls:.2,color:x.white,alpha:Gn(.6,1,a)})}e.sub&&a>.8&&vt(n,e.sub.toUpperCase(),i+r-18,s+o-16,{size:11,align:"right",color:l,alpha:.7,ls:.2})}function w_(n,t,e,i={}){const{x:s,y:r,w:a,h:o}=t,l=i.max??Math.max(1e-9,...e.map(d=>d.value)),c=i.progress??1,h=i.format??(d=>ra(d)),f=i.labelSize??15,u=e.length;if(i.horizontal===!1){const d=a/u*.6;e.forEach((m,M)=>{const v=Ye.outCubic(se(c*u-M*.6)),b=s+a/u*(M+.2),P=(o-40)*(m.value/l)*v,E=m.color??i.color??x.sky;Se(n,b,r+o-24-P,d,P,{color:E,width:1.6,hot:!0});for(let A=6;A<P;A+=6)Ot(n,b+3,r+o-24-A,b+d-3,r+o-24-A,E,.8,{alpha:.25});vt(n,m.label.toUpperCase(),b+d/2,r+o-4,{size:f*.8,align:"center",color:x.white,alpha:.85}),v>.1&&vt(n,h(m.value*v),b+d/2,r+o-32-P,{size:f,align:"center",color:E})});return}const p=i.labelWidth??a*.3,_=o/u,g=Math.min(26,_*.56);e.forEach((d,m)=>{const M=Ye.outCubic(se(c*u-m*.6)),v=r+_*m+(_-g)/2,b=d.color??i.color??x.sky;vt(n,d.label.toUpperCase(),s+p-12,v+g*.72,{size:f,align:"right",color:x.white,alpha:.9});const E=(a-p-70)*(d.value/l)*M;if(E>1){Se(n,s+p,v,E,g,{color:b,width:1.6,hot:d.hot});for(let A=6;A<E-2;A+=7)Ot(n,s+p+A,v+3,s+p+A,v+g-3,b,.8,{alpha:.22})}M>.05&&d.value>0&&vt(n,h(d.value*M)+(d.note?" "+d.note:""),s+p+E+10,v+g*.72,{size:f,color:b})})}function A_(n,t,e,i={}){const{x:s,y:r,w:a,h:o}=t,l=e.flatMap(u=>u.values),c=i.min??Math.min(...l),h=i.max??Math.max(...l),f=se(i.progress??1);if(i.grid!==!1)for(let u=0;u<=4;u++){const p=r+o-o*u/4;Ot(n,s,p,s+a,p,x.blueDim,.8,{alpha:u===0?.8:.35}),i.yFormat&&vt(n,i.yFormat(c+(h-c)*u/4),s-8,p+4,{size:11,align:"right",color:x.blueMid})}i.xLabels&&i.xLabels.forEach((u,p)=>vt(n,String(u).toUpperCase(),s+a*p/Math.max(1,i.xLabels.length-1),r+o+18,{size:11,align:"center",color:x.blueMid}));for(const u of e){const p=u.values.length,_=f*(p-1),g=[];for(let M=0;M<=Math.min(p-1,Math.floor(_));M++)g.push([s+a*M/(p-1),r+o-o*(u.values[M]-c)/(h-c||1)]);const d=Math.floor(_);if(d<p-1){const M=_-d,v=u.values[d],b=u.values[d+1];g.push([s+a*_/(p-1),r+o-o*(v+(b-v)*M-c)/(h-c||1)])}Jc(n,g,u.color??x.amber,2.2,{hot:!0});const m=g[g.length-1];m&&(Fe(n,m[0],m[1],5,u.color??x.amber,1.6),u.label&&f>.95&&vt(n,u.label.toUpperCase(),m[0]+10,m[1]+4,{size:13,color:u.color??x.amber}))}}function Fr(n,t,e,i,s=x.bsky,r={}){const a=i/2,o=new Path2D;for(const l of[-1,1])o.moveTo(t,e-.05*a),o.bezierCurveTo(t+l*.25*a,e-.55*a,t+l*.95*a,e-1*a,t+l*.98*a,e-.62*a),o.bezierCurveTo(t+l*1.02*a,e-.2*a,t+l*.8*a,e+.05*a,t+l*.45*a,e+.12*a),o.bezierCurveTo(t+l*.85*a,e+.25*a,t+l*.75*a,e+.8*a,t+l*.35*a,e+.62*a),o.bezierCurveTo(t+l*.15*a,e+.5*a,t+l*.05*a,e+.25*a,t,e+.08*a);it(n,o,s,r.width??Math.max(1.2,i*.045),{hot:r.hot??!0,alpha:r.alpha})}function R_(n,t,e){const i=new Path2D;return i.moveTo(n,t+e*.35),i.bezierCurveTo(n-e*.9,t-e*.2,n-e*.35,t-e*.75,n,t-e*.3),i.bezierCurveTo(n+e*.35,t-e*.75,n+e*.9,t-e*.2,n,t+e*.35),i}function C_(n,t,e){const i=new Path2D,s=e*.7,r=e*.32;return i.moveTo(n-s,t+r*.2),i.lineTo(n-s,t-r),i.lineTo(n+s*.7,t-r),i.moveTo(n+s*.45,t-r-e*.2),i.lineTo(n+s*.7,t-r),i.lineTo(n+s*.45,t-r+e*.2),i.moveTo(n+s,t-r*.2),i.lineTo(n+s,t+r),i.lineTo(n-s*.7,t+r),i.moveTo(n-s*.45,t+r-e*.2),i.lineTo(n-s*.7,t+r),i.lineTo(n-s*.45,t+r+e*.2),i}function P_(n,t,e){const i=new Path2D;return i.moveTo(n-e*.55,t+e*.45),i.lineTo(n-e*.55,t-e*.4),i.lineTo(n+e*.6,t-e*.4),i.lineTo(n+e*.6,t+e*.25),i.lineTo(n-e*.2,t+e*.25),i.closePath(),i}function vh(n,t,e,i,s={}){const r=s.color??x.bsky;Rt(n,(()=>{const a=new Path2D;return a.arc(t,e,i,0,Math.PI*2),a})()),Fe(n,t,e,i,r,Math.max(1.4,i*.09),{hot:!0}),Fe(n,t,e,i*.78,r,.9,{alpha:.4}),s.initials&&vt(n,s.initials.toUpperCase(),t,e+i*.32,{size:i*.85,align:"center",color:x.white,weight:"m",ls:.02})}function L_(n,t){const e=t.scale??1,i=(t.w??460)/e,s=se(t.appear??1);if(s<=0)return 0;const r=Ye.outBack(s);n.save(),n.translate(t.x,t.y+(1-r)*40),n.scale(e,e),n.globalAlpha=Math.min(1,s*2);const a=t.color??x.bsky,o=18,l=t.textSize??19,c=i-o*2-58,h=String(t.text??""),f=h.split(`
`).flatMap(b=>Di(n,b,c,{size:l,ls:.04})),u=l*1.38,p=o+26+f.length*u+52;Se(n,0,0,i,p,{color:a,radius:14,width:1.6,alpha:.95}),vh(n,o+22,o+22,22,{color:t.avatarColor??a,initials:t.initials??(t.name??"?").slice(0,1)});const _=o+58;vt(n,t.name??"Someone",_,o+15,{size:17,color:x.white,weight:"m",ls:.04});const g=me(n,t.name??"Someone",{size:17,weight:"m",ls:.04});vt(n,`@${t.handle??"someone.bsky.social"}${t.time?" · "+t.time:""}`,_+g+10,o+15,{size:13,color:t.handleColor??x.blueMid,ls:.05}),Fr(n,i-o-10,o+10,22,a,{width:1.2,hot:!1,alpha:.7});const d=h.length;let m=Math.floor(se(t.reveal??1)*d);f.forEach((b,P)=>{if(m<=0)return;const E=b.slice(0,m);m-=b.length+1,vt(n,E,_,o+26+(P+1)*u-u*.25,{size:l,color:t.textColor??x.white,ls:.04})});const M=p-24;return[[P_,t.replies,x.blueMid],[C_,t.reposts,t.reposted?x.green:x.blueMid],[R_,t.likes,t.liked||(t.likePulse??0)>0?x.magenta:x.blueMid]].forEach(([b,P,E],A)=>{const z=_+A*((i-_-o)/3)+8,y=A===2?Math.sin(Math.PI*se(t.likePulse??0)):0,T=14*(1+.6*y);it(n,b(z,M,T),E,1.4,{hot:y>.2}),P!=null&&vt(n,typeof P=="number"?ra(P):String(P),z+16,M+5,{size:14,color:E})}),n.restore(),p*e}function D_(n,t,e={}){const i=Li(n),s=e.clusters??6,r=e.perCluster??14,a=e.colors??[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold,x.lime],o=[],l=[],c=[];for(let h=0;h<s;h++)c.push({x:t.x+t.w*(.08+.84*((h+i.range(.2,.8))/s)),y:t.y+t.h*i.range(.25,.75),col:a[h%a.length]});c.forEach((h,f)=>{const u=o.length,p=t.w/s*.42;for(let _=0;_<r;_++){const g=i.range(0,Math.PI*2),d=Math.sqrt(i())*p;o.push({x:h.x+Math.cos(g)*d,y:h.y+Math.sin(g)*d*(t.h/t.w)*2.2,c:h.col,cl:f,r:i.range(1.2,3.2),phase:i.range(0,10)})}for(let _=0;_<r*1.6;_++)l.push([u+i.int(r),u+i.int(r)])});for(let h=0;h<s*3;h++)l.push([i.int(o.length),i.int(o.length)]);return{nodes:o,edges:l.filter(([h,f])=>h!==f),centres:c}}function U_(n,t,e=0,i={}){const s=i.alpha??1,r=new Map;for(const[a,o]of t.edges){const l=t.nodes[a],c=t.nodes[o],h=l.cl===c.cl?l.c:x.blueDim;r.has(h)||r.set(h,new Path2D);const f=r.get(h);f.moveTo(l.x,l.y),f.lineTo(c.x,c.y)}for(const[a,o]of r)it(n,o,a,.8,{alpha:(i.edgeAlpha??.3)*s});for(const a of t.nodes){const o=.55+.45*Math.sin(e*(1.3+a.phase%1.7)+a.phase*7),l=i.highlight===a.cl?1.6:1;ve(n,a.x,a.y,a.r*l,a.c,s*o),a.r>2.6&&Fe(n,a.x,a.y,a.r*2.2,a.c,.8,{alpha:.35*s*o})}}const I_=Object.freeze(Object.defineProperty({__proto__:null,Glow:th,HERSHEY:jc,P:x,arrow:T_,avatar:vh,barChart:w_,beam:it,beamPts:Jc,blobRegion:m_,book:c_,box:Se,butterfly:Fr,chaikin:Ho,chicken:r_,cloud:Nr,compact:ra,confetti:uh,core:na,countUp:E_,creditsRoll:mh,crow:bs,crown:fh,dot:ve,drawGraph:U_,elephant:l_,front:__,gator:a_,glowText:_r,hash01:pr,hfont:ia,isobar:v_,keycap:dh,label:vt,labelBlock:Qc,labelWidth:me,lectern:Xo,limboBar:d_,lineChart:A_,makeCluster:D_,mix:cn,occlude:Rt,panel:_h,paragraph:gh,pathOf:Kc,podium3:f_,rain:y_,rectPath:Dn,region:g_,ring:Fe,roundPath:tn,seal:o_,seg:Ot,skeetCard:L_,snow:S_,speechBubble:u_,splitFlap:p_,stamp:h_,storm:x_,sun:M_,ticker:ph,tvFrame:Rr,typewriter:b_,wrapLabel:Di},Symbol.toStringTag,{value:"Module"})),Qt={w:2e3,h:1125,floor:960},te={x:1220,y:140,w:740,h:500},Ms={x:760,y:110,w:420,h:850},ns={x:1600,top:728,w:360},Ao={x:ns.x+34,y:ns.top-30,scale:.8},oa={x:1475},Mh={x0:1150,x1:1400},N_={x0:40,x1:700,top:800};function F_(){const n=Li("late-cluster-skyline"),t=[x.bsky,x.sky,x.cyan,x.violet,x.magenta,x.gold],e=[];let i=te.x+14;for(;i<te.x+te.w-40;){const _=n.range(34,78),g=n.range(110,330)*(.7+.5*Math.sin((i-te.x)/te.w*Math.PI));e.push({x:i,w:_,h:Math.min(g,te.h-120),c:n.pick(t),spire:n()<.3}),i+=_+n.range(4,18)}const s=[],r=new Map,a=(_,g,d)=>{r.has(_)||r.set(_,new Path2D);const m=r.get(_);m.moveTo(g.x,g.y),m.lineTo(d.x,d.y)},o=te.y+te.h-6,l=new Path2D;for(const _ of e){const g=Math.max(2,Math.round(_.w/20)),d=Math.max(3,Math.round(_.h/24)),m=[];for(let v=0;v<d;v++){const b=[];for(let P=0;P<g;P++){const E={x:_.x+(P+.5)*_.w/g+n.range(-2,2),y:o-12-v*(_.h-18)/(d-1)+n.range(-2,2),c:_.c,r:n.range(1.1,2.4),ph:n.range(0,20),on:n()<.82};b.push(E),s.push(E)}m.push(b)}for(let v=0;v<d;v++)for(let b=0;b<g;b++){const P=m[v][b];v+1<d&&a(_.c,P,m[v+1][b]),b+1<g&&n()<.5&&a(_.c,P,m[v][b+1]),v+1<d&&b+1<g&&n()<.3&&a(_.c,P,m[v+1][b+1])}const M=o-_.h-4;l.moveTo(_.x-3,o),l.lineTo(_.x-3,M),l.lineTo(_.x+_.w+3,M),l.lineTo(_.x+_.w+3,o),_.spire&&(l.moveTo(_.x+_.w/2,M),l.lineTo(_.x+_.w/2,M-30),_.beacon={x:_.x+_.w/2,y:M-30}),_.top={x:_.x+_.w/2,y:M}}const c=new Path2D;let h=te.x;for(c.moveTo(h,o);h<te.x+te.w;){const _=n.range(60,190),g=n.range(20,50);c.lineTo(h,o-_),c.lineTo(h+g,o-_),h+=g,c.lineTo(h,o-n.range(30,60))}c.lineTo(te.x+te.w,o);const f=[];for(let _=0;_<9;_++){const g=n.pick(e),d=n.pick(e);g!==d&&f.push({a:g.top,b:d.top,c:n.pick([x.bsky,x.sky,x.magenta]),ph:n.range(0,1),sp:n.range(.15,.35)})}const u=[];for(let _=0;_<70;_++)u.push({x:te.x+n.range(8,te.w-8),y:te.y+n.range(8,te.h*.45),r:n.range(.5,1.4),ph:n.range(0,9)});const p=[];for(let _=0,g=-20;g<1300;_++){const d=n.range(54,74);p.push({x:g+d/2,w:d,h:n.range(46,62),ph:n.range(0,6),hair:n.int(4)}),g+=d*n.range(.82,1)}return{towers:e,nodes:s,edgesByColor:r,outline:l,far:c,links:f,stars:u,aud:p}}function O_(n){const i=new Path2D;i.moveTo(0,34),i.lineTo(Qt.w,34),i.moveTo(0,64),i.lineTo(Qt.w,64);for(let s=0;s<Qt.w;s+=30)i.moveTo(s,34),i.lineTo(s+15,64),i.lineTo(s+30,34);it(n,i,x.blueDim,1,{alpha:.5});for(let s=120;s<Qt.w;s+=260){const r=new Path2D;r.moveTo(s-9,68),r.lineTo(s+9,68),r.lineTo(s+12,94),r.lineTo(s-12,94),r.closePath(),it(n,r,x.blueMid,1.1,{alpha:.7}),Ot(n,s,64,s,68,x.blueMid,1,{alpha:.7})}}function z_(n){const t=new Path2D;for(let e=40;e<Qt.w;e+=160)e>Ms.x-10&&e<Ms.x+Ms.w+10||e>te.x-4&&e<te.x+te.w+4||(t.moveTo(e,90),t.lineTo(e,Qt.floor));it(n,t,x.blueDim,1,{alpha:.18}),Ot(n,0,690,Ms.x,690,x.blueDim,1,{alpha:.2})}function B_(n){const t=Qt.floor;Ot(n,0,t,Qt.w,t,x.blueMid,1.4,{alpha:.8});const e=new Path2D,i=1e3,s=380;for(let r=-1600;r<=3600;r+=160){const o=i+(r-i)*((Qt.h+200-s)/(t-s))*1;e.moveTo(i+(r-i),t),e.lineTo(o,Qt.h+200)}for(const r of[990,1035,1100])e.moveTo(0,r),e.lineTo(Qt.w,r);it(n,e,x.blueDim,1,{alpha:.32})}function k_(n,t,e){const i=e.wall,{x:s,y:r,w:a,h:o}=te;for(const u of t.stars)ve(n,u.x,u.y,u.r,x.white,.25+.35*(.5+.5*Math.sin(i*1.3+u.ph)));const l=s+a*.82,c=r+70,h=new Path2D;h.arc(l,c,26,-Math.PI*.62,Math.PI*.62,!0),h.arc(l-13,c,22,Math.PI*.5,-Math.PI*.5,!1),it(n,h,x.gold,1.6,{hot:!0,alpha:.85}),it(n,t.far,x.blueDim,1,{alpha:.35}),it(n,t.outline,x.blueDim,1,{alpha:.45});for(const[u,p]of t.edgesByColor)it(n,p,u,.8,{alpha:.32});for(const u of t.nodes){if(!u.on)continue;const p=.45+.55*(.5+.5*Math.sin(i*(.7+u.ph%1.3)+u.ph));ve(n,u.x,u.y,u.r,u.c,p*.9)}for(const u of t.towers)u.beacon&&ve(n,u.beacon.x,u.beacon.y,2.6,x.red,.4+.6*(Math.sin(i*3+u.x)>.6?1:.2));for(const u of t.links){const p=(u.a.x+u.b.x)/2,_=Math.min(u.a.y,u.b.y)-40-Math.abs(u.a.x-u.b.x)*.18,g=new Path2D;g.moveTo(u.a.x,u.a.y),g.quadraticCurveTo(p,_,u.b.x,u.b.y),it(n,g,u.c,.9,{alpha:.28});const d=(i*u.sp+u.ph)%1,m=(1-d)*(1-d)*u.a.x+2*(1-d)*d*p+d*d*u.b.x,M=(1-d)*(1-d)*u.a.y+2*(1-d)*d*_+d*d*u.b.y;ve(n,m,M,2.4,u.c,.9)}const f=new Path2D;f.rect(s,r,a,o);for(let u=1;u<4;u++)f.moveTo(s+a*u/4,r),f.lineTo(s+a*u/4,r+o);f.moveTo(s,r+o*.3),f.lineTo(s+a,r+o*.3),it(n,f,x.blueMid,1.6,{alpha:.9}),it(n,Dn(s-10,r-10,a+20,o+20),x.blueDim,1.2,{alpha:.7}),Ot(n,s-22,r+o+12,s+a+22,r+o+12,x.blueMid,1.4)}function H_(n,t,e){const i=e.wall,{x:s,y:r,w:a,h:o}=Ms,l="#ff3d6e",c=16,h=new Path2D;for(let m=0;m<=c;m++){const M=s+a*m/c,v=3*$e(i*.3+m*.7,3);h.moveTo(M,r+40);for(let b=r+40;b<=r+o;b+=20){const P=Math.sin(b*.012+m*1.7)*4*(b-r)/o;h.lineTo(M+P+v*((b-r)/o),b)}}it(n,h,l,1.2,{alpha:.55});const f=new Path2D;for(let m=0;m<c;m++){const M=s+a*(m+.5)/c;f.moveTo(M,r+60),f.lineTo(M+Math.sin(m)*3,r+o-10)}it(n,f,l,.8,{alpha:.22});const u=new Path2D;u.moveTo(s-20,r),u.lineTo(s+a+20,r);const p=7;for(let m=0;m<p;m++){const M=s-20+(a+40)*m/p,v=s-20+(a+40)*(m+1)/p;u.moveTo(M,r),u.quadraticCurveTo((M+v)/2,r+70,v,r)}Rt(n,u),it(n,u,l,1.6,{hot:!0});const _=new Path2D;for(let m=0;m<p;m++){const M=s-20+(a+40)*m/p,v=s-20+(a+40)*(m+1)/p;for(let b=1;b<12;b++){const P=b/12,E=M+(v-M)*P,A=r+4*70*P*(1-P)*.5*2;_.moveTo(E,A),_.lineTo(E,A+8)}}it(n,_,x.gold,1,{alpha:.8});const g=new Path2D;g.ellipse(970,Qt.floor+6,120,16,0,0,Math.PI*2),it(n,g,x.gold,1.4,{alpha:.6});const d=new Path2D;d.ellipse(970,Qt.floor+6,80,10,0,0,Math.PI*2),it(n,d,x.gold,1,{alpha:.35})}function G_(n,t,e){const o=e.onAir?1:.18;Se(n,1250,82,120,38,{color:x.onair,radius:6,width:1.6,alpha:.4+.6*o,hot:o>.5}),vt(n,"ON AIR",1250+120/2,108,{size:19,align:"center",color:x.onair,alpha:o,weight:"m",ls:.25}),Ot(n,1250+120/2,64,1250+120/2,82,x.blueDim,1)}function V_(n,t,e){const o=e.laughing,l=e.signText,c=o>0?.55+.45*(Math.sin(e.wall*9)>-.2?1:0):0,h=se(o*c);Se(n,970-250/2,64,250,46,{color:x.amber,cut:8,width:1.6,alpha:.35+.65*h,hot:h>.5}),vt(n,l,970,96,{size:24,align:"center",color:x.amber,alpha:.15+.85*h,weight:"m",ls:.3}),Ot(n,970-250/2+20,64,970-250/2+20,64,x.blueDim,1),Ot(n,970+250/2-20,64,970+250/2-20,64,x.blueDim,1)}function W_(n,t,e){const{x0:i,x1:s,top:r}=N_,a=new Path2D;a.rect(i,r,s-i,Qt.floor-r),a.moveTo(i+220,r-60),a.lineTo(s-220,r-60),a.lineTo(s-220,r),a.moveTo(i+220,r-60),a.lineTo(i+220,r),Rt(n,a),it(n,a,x.magenta,1.4,{alpha:.75});const o=e.music?e.music.beat:-1;for(let c=0;c<14;c++){const h=i+24+(s-i-48)*c/13,f=o>=0?(Math.floor(o)+c)%4===0?1:.25:.3+.2*Math.sin(e.wall*1.5+c);ve(n,h,r+22,3,c%2?x.gold:x.magenta,f)}const l=new Path2D;for(let c=r+50;c<Qt.floor;c+=26)l.moveTo(i,c),l.lineTo(s,c);it(n,l,x.magenta,.8,{alpha:.25})}function $_(n){const t=oa.x,e=tn(t-80,560,160,230,40);Rt(n,e),it(n,e,x.violet,1.6,{alpha:.9});const i=new Path2D;for(const[s,r]of[[-40,620],[0,610],[40,620],[-40,680],[0,670],[40,680]])i.moveTo(t+s-3,r),i.lineTo(t+s+3,r);it(n,i,x.violet,1.2,{alpha:.5})}function X_(n){const{x0:t,x1:e}=Mh,i=tn(t,610,e-t,180,30);Rt(n,i),it(n,i,x.cyan,1.5,{alpha:.75});const s=new Path2D;s.moveTo((t+e)/2,625),s.lineTo((t+e)/2,780),it(n,s,x.cyan,1,{alpha:.35})}function q_(n,t,e){const{x:i,top:s,w:r}=ns,a=Qt.floor,o=new Path2D;o.moveTo(i+20,s-22),o.lineTo(i+r-10,s-22),o.lineTo(i+r,s),o.lineTo(i,s),o.closePath(),Rt(n,o),it(n,o,x.gold,1.6,{hot:!0});const l=new Path2D;l.moveTo(i,s),l.lineTo(i+r,s),l.lineTo(i+r-14,a),l.lineTo(i+14,a),l.closePath(),Rt(n,l),it(n,l,x.gold,1.6);const c=new Path2D;c.moveTo(i+30,s+22),c.lineTo(i+r-30,s+22),c.lineTo(i+r-40,a-22),c.lineTo(i+40,a-22),c.closePath(),it(n,c,x.goldMid,1,{alpha:.55});const h=i+r/2,f=s+120;Fe(n,h,f,46,x.gold,1.4,{alpha:.7}),Fe(n,h,f,40,x.gold,.9,{alpha:.35});const u=[[0,-18],[16,-6],[10,14],[-12,12],[-18,-8],[0,0]],p=new Path2D;for(const[nt,L]of[[0,1],[1,2],[2,3],[3,4],[4,0],[5,0],[5,2],[5,3],[5,1]])p.moveTo(h+u[nt][0],f+u[nt][1]),p.lineTo(h+u[L][0],f+u[L][1]);it(n,p,x.gold,1,{alpha:.6});for(const[nt,L]of u)ve(n,h+nt,f+L,2.6,x.gold,.9);vt(n,"LC",h,f+74,{size:16,align:"center",color:x.gold,alpha:.6,ls:.4});const _=i+96,g=s-14,d=new Path2D;d.moveTo(_-15,g-40),d.lineTo(_-13,g),d.lineTo(_+13,g),d.lineTo(_+15,g-40),d.closePath(),Rt(n,d),it(n,d,x.sky,1.5);const m=new Path2D;m.ellipse(_,g-40,15,4,0,0,Math.PI*2),it(n,m,x.sky,1.2);const M=new Path2D;M.moveTo(_+14,g-32),M.bezierCurveTo(_+30,g-32,_+30,g-10,_+13,g-10),it(n,M,x.sky,1.4),Fr(n,_,g-20,14,x.bsky,{width:1,hot:!1});const v=e.wall;for(let nt=0;nt<2;nt++){const L=new Path2D,I=v*.8+nt*1.7;for(let N=0;N<=12;N++){const V=N/12,q=_-4+nt*8+Math.sin(I*2+V*6)*4*V,Y=g-46-V*44;N?L.lineTo(q,Y):L.moveTo(q,Y)}it(n,L,x.white,1,{alpha:.3*(.6+.4*Math.sin(I))})}const b=i+r-34,P=s-14,E=new Path2D;E.ellipse(b,P,22,6,0,0,Math.PI*2),Rt(n,E),it(n,E,x.white,1.3,{alpha:.85});const A=new Path2D;A.moveTo(b,P-4),A.bezierCurveTo(b+2,P-34,b-10,P-52,b-30,P-58),it(n,A,x.white,1.4,{alpha:.8});const z=new Path2D;z.ellipse(b-40,P-61,13,7.5,-.35,0,Math.PI*2),Rt(n,z),it(n,z,x.white,1.5,{hot:!0});for(let nt=-2;nt<=2;nt++)Ot(n,b-40+nt*4-2,P-67+nt*1.3,b-40+nt*4+2,P-55+nt*1.3,x.white,.8,{alpha:.5});const y=i+r/2+10,T=s-4,O=new Path2D;if(O.moveTo(y-70,T),O.lineTo(y+70,T),O.lineTo(y+62,T-30),O.lineTo(y-62,T-30),O.closePath(),Rt(n,O),it(n,O,x.gold,1.4,{hot:!0}),vt(n,e.nameplate??"LARRY NX",y,T-9,{size:15,align:"center",color:x.gold,weight:"m",ls:.22}),(e.setNow??e.set).eKey)return;const K=new Path2D;K.moveTo(i+22,s-6),K.lineTo(i+72,s-6),K.lineTo(i+68,s-14),K.lineTo(i+26,s-14),K.closePath(),it(n,K,x.bsky,1.1,{alpha:.8})}function Y_(n){const t=oa.x,e=new Path2D;for(const s of[-1,1]){const r=tn(t+s*90-22,720,44,120,16);Rt(n,r),it(n,r,x.violet,1.5)}e.moveTo(t-70,790),e.lineTo(t+70,790),e.lineTo(t+76,860),e.lineTo(t-76,860),e.closePath(),Rt(n,e),it(n,e,x.violet,1.5);const i=new Path2D;for(const s of[-1,1])i.moveTo(t+s*96,840),i.lineTo(t+s*104,Qt.floor);it(n,i,x.violet,1.4,{alpha:.8})}function j_(n){const{x0:t,x1:e}=Mh,i=new Path2D;i.moveTo(t-10,780),i.lineTo(e+10,780),i.lineTo(e+16,870),i.lineTo(t-16,870),i.closePath(),Rt(n,i),it(n,i,x.cyan,1.5,{alpha:.85});for(const r of[t-20,e-16]){const a=tn(r,700,36,150,14);Rt(n,a),it(n,a,x.cyan,1.4,{alpha:.85})}Ot(n,(t+e)/2,790,(t+e)/2,865,x.cyan,1,{alpha:.4});const s=new Path2D;for(const r of[t,e])s.moveTo(r,870),s.lineTo(r,Qt.floor);it(n,s,x.cyan,1.3,{alpha:.7})}function Z_(n,t,e,i,s,r){var l;const a=s.wall,o=s.music?s.music.pulse:0;if(t==="lectern"){const c=i+150;Xo(n,e,c,{w:130,h:Qt.floor-c,color:x.violet,label:s.lecternLabel??"THE LATE CLUSTER",labelColor:x.gold}),Ot(n,e-20,c-2,e-34,c-40,x.white,1.3,{alpha:.8}),Fe(n,e-36,c-44,5,x.white,1.3,{hot:!0});return}if(t==="stand"){const c=i+160,h=r?((l=s.puppets.get(r))==null?void 0:l.name)??r:"";Xo(n,e,c,{w:150,h:Qt.floor-c,color:x.cyan,label:h,labelColor:x.white,lights:!0,t:a});return}if(t==="sportsdesk"){const c=i+128,h=460,f=new Path2D;f.moveTo(e-h/2,c),f.lineTo(e+h/2,c),f.lineTo(e+h/2-20,Qt.floor),f.lineTo(e-h/2+20,Qt.floor),f.closePath(),Rt(n,f),it(n,f,x.coral,1.8,{hot:!0}),Ot(n,e-h/2+10,c+30,e+h/2-10,c+30,x.coral,1,{alpha:.6}),vt(n,"SPORTS",e,c+78,{size:40,align:"center",color:x.coral,weight:"m",ls:.3}),vt(n,"THE LATE CLUSTER",e,c+106,{size:14,align:"center",color:x.gold,ls:.4});for(let u=0;u<9;u++)ve(n,e-180+u*45,c+16,3,u%2?x.gold:x.coral,.4+.6*(Math.floor(a*3+u)%3===0?1:.3));return}if(t==="keys"){const c=i+128,h=new Path2D;h.moveTo(e-78,c),h.lineTo(e+78,c),h.lineTo(e+84,c+20),h.lineTo(e-84,c+20),h.closePath(),Rt(n,h),it(n,h,x.magenta,1.5);const f=new Path2D;for(let p=-10;p<=10;p++)f.moveTo(e+p*7.4,c+6),f.lineTo(e+p*7.8,c+19);it(n,f,x.white,.8,{alpha:.55});for(let p=0;p<4;p++)ve(n,e-66+p*9,c+3,1.4,[x.green,x.amber,x.red,x.cyan][p],.5+.5*o);const u=new Path2D;u.moveTo(e-50,c+20),u.lineTo(e+44,Qt.floor-160),u.moveTo(e+50,c+20),u.lineTo(e-44,Qt.floor-160),it(n,u,x.magenta,1.2,{alpha:.8})}else if(t==="bass"){const c=e-14,h=i+150,f=new Path2D;f.moveTo(c-30,h-4),f.bezierCurveTo(c-36,h-30,c-10,h-34,c+2,h-22),f.bezierCurveTo(c+10,h-40,c+30,h-36,c+22,h-18),f.bezierCurveTo(c+40,h-2,c+34,h+30,c+4,h+32),f.bezierCurveTo(c-26,h+34,c-40,h+18,c-30,h-4),f.closePath(),Rt(n,f),it(n,f,x.cyan,1.6,{hot:!0});const u=new Path2D,p=-.72,_=128,g=Math.cos(p),d=Math.sin(p),m=c+8,M=h-12;u.moveTo(m-d*4,M+g*4),u.lineTo(m+g*_-d*4,M+d*_+g*4),u.lineTo(m+g*(_+22)-d*6,M+d*(_+22)+g*6),u.lineTo(m+g*(_+22)+d*6,M+d*(_+22)-g*6),u.lineTo(m+g*_+d*4,M+d*_-g*4),u.lineTo(m+d*4,M-g*4),Rt(n,u),it(n,u,x.cyan,1.3);for(let v=-1.5;v<=1.5;v++)Ot(n,c-14-d*v*2,h+14+g*v*2,m+g*_-d*v*2,M+d*_+g*v*2,x.white,.6,{alpha:.35+.45*o});Ot(n,c-6,h+4,c+10,h-10,x.white,1.6,{alpha:.6})}else if(t==="mic"){const c=e-52,h=i+34,f=new Path2D;f.moveTo(c-20,Qt.floor-160),f.lineTo(c-20,h+50),f.lineTo(c-2,h+6),it(n,f,x.white,1.4,{alpha:.8});const u=new Path2D;u.ellipse(c,h,8,5.5,-1.1,0,Math.PI*2),Rt(n,u),it(n,u,x.white,1.4,{hot:!0})}else if(t==="drums"){const h=e,f=Qt.floor-160-92+4,u=o;for(const g of[-1,1]){const d=new Path2D;d.ellipse(e+g*70,f-92-10,30,12,0,0,Math.PI*2),d.moveTo(e+g*70-30,f-92-10),d.lineTo(e+g*70-30,f-92+16),d.moveTo(e+g*70+30,f-92-10),d.lineTo(e+g*70+30,f-92+16),Rt(n,d),it(n,d,x.gold,1.3);const m=new Path2D;m.ellipse(e+g*140,f-92-70+(g>0?u*3:0),40,6,g*.12,0,Math.PI*2),m.moveTo(e+g*140,f-92-64),m.lineTo(e+g*150,Qt.floor-160),it(n,m,x.gold,1.2,{alpha:.8+.2*u,hot:u>.5})}const p=new Path2D;p.arc(h,f,92,0,Math.PI*2),Rt(n,p),it(n,p,x.magenta,2,{hot:!0}),Fe(n,h,f,82,x.gold,1.2,{alpha:.7+.3*u}),vt(n,"HY OID",h,f-8,{size:30,align:"center",color:x.gold,weight:"m",ls:.12}),vt(n,"& THE FORMANTS",h,f+22,{size:14,align:"center",color:x.magenta,weight:"m",ls:.12});const _=new Path2D;for(let g=0;g<=40;g++){const d=g/40,m=f+48-14*(Math.exp(-(((d-.25)/.07)**2))+.7*Math.exp(-(((d-.6)/.09)**2))+.4*Math.exp(-(((d-.85)/.05)**2)))*(.8+.4*u);g?_.lineTo(h-54+d*108,m):_.moveTo(h-54,m)}it(n,_,x.cyan,1.2)}}function K_(n,t,e,i,s,r={}){if(t!=="contraption")return;const a=s.wall,o=e,l=Qt.floor,c=Ye.inOutCubic(se(r.unveil??0)),h=se(r.run??c);if(c>.02){const f=new Path2D;f.rect(o-70,l-120,140,120),Rt(n,f),it(n,f,x.lime,1.6);for(const[g,d,m,M]of[[o-32,l-70,26,1],[o+18,l-52,18,-1]]){Fe(n,g,d,m,x.gold,1.4);const v=a*2*h*M;for(let b=0;b<8;b++){const P=v+b/8*Math.PI*2;Ot(n,g+Math.cos(P)*m,d+Math.sin(P)*m,g+Math.cos(P)*(m+6),d+Math.sin(P)*(m+6),x.gold,1.4)}}const u=new Path2D;u.moveTo(o+30,l-120),u.lineTo(o+60,l-190),u.lineTo(o+0,l-190),u.closePath(),it(n,u,x.cyan,1.4);const p=new Path2D;p.moveTo(o-60,l-120),p.bezierCurveTo(o-90,l-170,o-30,l-200,o-20,l-150),it(n,p,x.magenta,1.6),Ot(n,o-50,l-120,o-50,l-210,x.white,1.2),Fe(n,o-50,l-218,8,x.amber,1.6,{hot:h>.5&&Math.floor(a*4)%2===0});for(let g=0;g<4;g++)ve(n,o+40,l-100+g*14,3,[x.green,x.amber,x.red,x.cyan][g],h>0?.4+.6*(Math.floor(a*5+g)%4===0?1:.3):.25);const _=a*3*h;Ot(n,o+70,l-60,o+70+Math.cos(_)*22,l-60+Math.sin(_)*22,x.white,1.6)}if(c<.98){const f=c*260,u=c*c*220,p=new Path2D;p.moveTo(o-82+u,l-f),p.bezierCurveTo(o-90+u,l-120-f,o-60+u,l-235-f*1.1,o-10+u,l-230-f),p.bezierCurveTo(o+40+u,l-226-f,o+80+u,l-160-f,o+84+u,l-f);for(let g=4;g>=0;g--)p.lineTo(o-82+g*41+u+(g%2?6:-4)*(1+c*4),l-f-(g%2?10:0)*(1+c*3));p.closePath(),c<.05&&Rt(n,p),it(n,p,x.white,1.6,{alpha:1-c});const _=new Path2D;for(const g of[-40,0,40])_.moveTo(o+g+u*.9,l-200-f),_.quadraticCurveTo(o+g*1.3+u,l-100-f,o+g*1.4+u,l-f-6);it(n,_,x.white,.9,{alpha:.4*(1-c)}),c<.05&&vt(n,"?",o,l-110,{size:40,align:"center",color:x.white,alpha:.5})}}function yh(n,t,e){const i=e.wall;if(t==="circling"){const s=i*.45,r=e.cam??{x:1e3,y:560,zoom:1};if(r.zoom>2.2)return;const a=Math.max(te.x,r.x-640/r.zoom),o=Math.min(te.x+te.w,r.x+640/r.zoom),l=r.y-360/r.zoom,c=o>a?(a+o)/2:te.x+te.w*.55,h=o>a?Math.max(60,(o-a)*.42):230,f=Math.min(te.y+te.h-110,Math.max(te.y+150,l+(r.zoom<1.3?72:140)/r.zoom)),u=Math.min(70,34/Math.max(.5,r.zoom)*1.6),p=c+Math.cos(s)*h,_=f+Math.sin(s)*u;bs(n,p,_,{scale:.7,flap:i*2.2%1,facing:-Math.sin(s)>=0?1:-1})}else if(t==="perched-desk")bs(n,ns.x+ns.w-92,ns.top-33,{scale:.75,perched:!0,facing:-1});else{const s=Math.max(0,Math.sin(i*1.3))>.97?6:0;bs(n,te.x+120,te.y+te.h+12-22-s,{scale:.85,perched:!0,facing:1})}}function J_(n,t,e){const i=e.setNow??e.set;i.wall!==!1&&z_(n),i.truss!==!1&&O_(n),i.floor!==!1&&B_(n),i.window!==!1&&k_(n,t,e),i.curtain!==!1&&H_(n,t,e),i.onair!==!1&&G_(n,t,e),i.sign!==!1&&V_(n,t,e),i.bandstand!==!1&&W_(n,t,e),i.couch!==!1&&X_(n),i.chair!==!1&&$_(n),i.crow&&i.crow!=="perched-desk"&&yh(n,i.crow,e)}function Q_(n,t,e){const i=e.setNow??e.set;i.couch!==!1&&j_(n),i.chair!==!1&&Y_(n),i.desk!==!1&&q_(n,t,e),i.desk!==!1&&i.eKey&&dh(n,Ao.x,Ao.y,{label:"E",scale:Ao.scale,glow:.4+.3*Math.sin(e.wall*3),pressed:typeof i.eKey=="number"?i.eKey:0}),i.crow==="perched-desk"&&yh(n,i.crow,e)}function t1(n,t,e,i=1){if(i<=0)return;const s=e.laughing,r=e.wall,a=724,o=new Path2D;for(const l of t.aud){const c=s*(5+4*Math.sin(r*11+l.ph))+1.2*Math.sin(r*.8+l.ph),h=l.x,f=a-l.h+6-c,u=l.w*.26;o.moveTo(h-l.w*.5,a+10),o.bezierCurveTo(h-l.w*.5,f+u*2.2,h-l.w*.3,f+u*1.6,h-u*.7,f+u*1.4),o.arc(h,f,u,Math.PI*.72,Math.PI*.28,!1),o.bezierCurveTo(h+l.w*.3,f+u*1.6,h+l.w*.5,f+u*2.2,h+l.w*.5,a+10)}Rt(n,o,"#000",i),it(n,o,x.blueMid,1.1,{alpha:.6*i})}function e1(n,t){const e=t.laughing;if(e<=.02)return;const i=Math.sin(t.wall*9)>-.2?1:.55,s=190,r=640-s/2,a=18;Se(n,r,a,s,36,{color:x.amber,cut:6,width:1.5,alpha:e*i,hot:!0}),vt(n,t.signText,640,a+26,{size:19,align:"center",color:x.amber,alpha:e*i,weight:"m",ls:.3})}const hr=new Map;function aa(n){let t=hr.get(n);return t||(t=new Path2D(n),hr.size>4e3&&hr.clear(),hr.set(n,t)),t}const C=n=>(Math.round(n*10)/10).toString();function Tt(n,t,e,i,s=1.5,r={}){it(n,typeof e=="string"?aa(e):e,i,.85*s/t.u,{...r,alpha:(r.alpha??1)*.92})}let qo=!1;function n1(n,t,e="#000",i=1){qo||Rt(n,typeof t=="string"?aa(t):t,e,i)}function Ht(n,t,e,i,s=1.5,r={}){n1(n,e,r.fill??"#000"),Tt(n,t,e,i,s,r)}function He(n,t,e){return`M${C(n+e)} ${C(t)} A${C(e)} ${C(e)} 0 1 0 ${C(n-e)} ${C(t)} A${C(e)} ${C(e)} 0 1 0 ${C(n+e)} ${C(t)}`}function i1(n,t){n.save(),n.translate(t.x+Math.sin(t.sway)*2.5*t.u,t.y),n.rotate(t.sway*.3);const e=1-.18*Math.abs(t.turn);n.scale(t.u*e,t.u*(1+.006*t.breathe))}function dn(n,t,e,i=6){const s=i+2.5,r=(a,o)=>`${C(a)} ${C(o)}`;return[`M${r(-t,-1)}`,`C${r(-t-3.5,.6)} ${r(-n+6,s-4.2)} ${r(-n+1.5,s-1.2)}`,`C${r(-n-1.6,s+.2)} ${r(-n-2.6,s+4)} ${r(-n-2.5,s+9)}`,e>40?`C${r(-n-2.5,24)} ${r(-n-.5,30)} ${r(-n-.6,36)} L${r(-n-1.4,e)} L${r(n+1.4,e)} L${r(n+.6,36)} C${r(n+.5,30)} ${r(n+2.5,24)} ${r(n+2.5,s+9)}`:`L${r(-n-2,e)} L${r(n+2,e)} L${r(n+2.5,s+9)}`,`C${r(n+2.6,s+4)} ${r(n+1.6,s+.2)} ${r(n-1.5,s-1.2)}`,`C${r(n-6,s-4.2)} ${r(t+3.5,.6)} ${r(t,-1)} Z`].join(" ")}function Tn(n,t,e=6){return`M${C(-n+3.5)} ${C(e+3)} C${C(-n+2.6)} ${C(e+14)} ${C(-n+3)} ${C(t-10)} ${C(-n+3.8)} ${C(t)} M${C(n-3.5)} ${C(e+3)} C${C(n-2.6)} ${C(e+14)} ${C(n-3)} ${C(t-10)} ${C(n-3.8)} ${C(t)}`}function pn(n,t,e,i,s){if(t.floor==null||t.floor<=e+4)return;const r=t.floor,a=`M-15 ${C(e)} L-12.5 ${C(r-3)} L-2.5 ${C(r-3)} L-1 ${C(e+9)} L1 ${C(e+9)} L2.5 ${C(r-3)} L12.5 ${C(r-3)} L15 ${C(e)} Z`;Ht(n,t,a,i,1.4,{alpha:.85}),s&&Tt(n,t,`M-13.9 ${C(e+2)} L-12 ${C(r-4)} M13.9 ${C(e+2)} L12 ${C(r-4)}`,s,1,{alpha:.6});const o=l=>`M${C(l*2)} ${C(r-3)} L${C(l*13.5)} ${C(r-3)} C${C(l*16)} ${C(r-2.5)} ${C(l*17)} ${C(r)} ${C(l*15)} ${C(r)} L${C(l*2)} ${C(r)} Z`;for(const l of[-1,1])Ht(n,t,o(l),x.white,1.3,{alpha:.75})}const En=(n,t=46)=>n.floor!=null?Math.min(n.bottom,t):n.bottom,Mi=(n,t,e=6)=>`M${C(-e)} -1.5 L${C(n)} ${C(t)} L${C(e)} -1.5 Z`;function Ql(n,t,e,i,s){const r=`M${C(e)} ${C(i)} L${C(e-4.6)} ${C(i-2.2)} L${C(e-4.3)} ${C(i+2.4)} Z M${C(e)} ${C(i)} L${C(e+4.6)} ${C(i-2.2)} L${C(e+4.3)} ${C(i+2.4)} Z`;Ht(n,t,r,s,1.5,{hot:!0}),Ht(n,t,`M${C(e-.9)} ${C(i-1.2)} L${C(e+.9)} ${C(i-1.2)} L${C(e+.9)} ${C(i+1.2)} L${C(e-.9)} ${C(i+1.2)} Z`,s,1.2,{hot:!0})}function ur(n,t,e,i){const s=`M-5.4 -2 L${C(e-2.2)} 3 L-6.6 2.6 Z M5.4 -2 L${C(e+2.2)} 3 L6.6 2.6 Z`;Ht(n,t,s,i,1.3)}function Zi(n,t,e,i,s,r,a){const o=l=>{let c;s==="peak"?c=`M${C(l*6.2)} -1.5 L${C(e)} ${C(i)} L${C(l*11.8)} 15 L${C(l*15.6)} 8.2 L${C(l*10.6)} 10.4 L${C(l*8.4)} 4.5 Z`:s==="notch"?c=`M${C(l*6.2)} -1.5 L${C(e)} ${C(i)} L${C(l*11.6)} 14.5 L${C(l*13.2)} 8.6 L${C(l*10.4)} 9.6 L${C(l*9.6)} 7.4 L${C(l*8.2)} 2.5 Z`:c=`M${C(l*6.2)} -1.5 C${C(l*12)} 3 ${C(l*12.5)} ${C(i*.55)} ${C(e)} ${C(i)} C${C(e+l*2)} ${C(i*.6)} ${C(l*7.5)} 6 ${C(l*6.2)} -1.5 Z`,Ht(n,t,c,r,1.5),a&&Tt(n,t,s==="shawl"?`M${C(l*8.5)} 2 C${C(l*10.5)} 6 ${C(l*9)} ${C(i*.6)} ${C(e+l*1.5)} ${C(i-2)}`:`M${C(l*8)} 3 L${C(e+l*1.6)} ${C(i-3)}`,a,.9,{alpha:.5})};o(-1),o(1)}function s1(n,t,e,i,s,r){Tt(n,t,`M${C(e-4)} ${C(i)} L${C(e+4)} ${C(i-.4)}`,r,1.3),Ht(n,t,`M${C(e-3.2)} ${C(i-.2)} L${C(e-2)} ${C(i-3.2)} L${C(e-.6)} ${C(i-1)} L${C(e+.8)} ${C(i-3.8)} L${C(e+2.2)} ${C(i-1.2)} L${C(e+3.2)} ${C(i-2.9)} L${C(e+3.4)} ${C(i-.4)} Z`,s,1.2,{hot:!0})}const Cr={tux:{back(n,t,e){const i=En(t);pn(n,t,i-2,e.color,e.color),Ht(n,t,dn(18,6.2,i),e.color,1.8,{hot:!1}),Tt(n,t,Tn(18,i),e.color,1,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,Mi(i,s+2,6.4),e.shirt??x.white,1.2,{alpha:.8}),Tt(n,t,`M${C(i-2.2)} 6 L${C(i-1.3)} ${C(s-3)} M${C(i+2.2)} 6 L${C(i+1.3)} ${C(s-3)}`,e.shirt??x.white,.8,{alpha:.35}),Zi(n,t,i,s+2,"peak",e.color,e.facing??cn(e.color,"#ffffff",.4)),ur(n,t,i*.4,e.shirt??x.white),Ql(n,t,i*.4,2.6,e.tie??x.amber);for(const r of[9,15.5,22]){const a=i*(.4+.6*r/s);Rt(n,aa(He(a,r,.75))),Tt(n,t,He(a,r,.7),e.tie??x.amber,1.1,{hot:!0})}Tt(n,t,He(i,s+4.5,.9),e.color,1.2),s1(n,t,12.5+i*.5,17,e.square??x.pink,e.color)}},band:{back(n,t,e){const i=En(t);pn(n,t,i-2,cn(e.color,"#000",.4)),Ht(n,t,dn(17.5,6,i),e.color,1.7),Tt(n,t,Tn(17.5,i),e.trim??x.gold,1,{alpha:.6}),Tt(n,t,"M-9 1.2 C-12 2.6 -14 4.5 -16.5 7.5 M9 1.2 C12 2.6 14 4.5 16.5 7.5",e.trim??x.gold,.9,{alpha:.55})},front(n,t,e){const i=t.turn*4.5,s=28;Ht(n,t,Mi(i,s+2,6.2),x.blueDim,1,{alpha:.8}),Zi(n,t,i,s+2,"shawl",e.trim??x.gold,e.color),Ql(n,t,i*.4,2.4,e.trim??x.gold);for(const a of[s+4,s+9])Tt(n,t,He(i,a,.8),e.trim??x.gold,1.1);const r=12+i*.5;Tt(n,t,`M${C(r-4)} 15 L${C(r+4)} 14.6`,e.trim??x.gold,1.2),n.save(),vt(n,e.monogram??"F",r,12.8,{size:5,align:"center",color:e.trim??x.gold,weight:"m",ls:0}),n.restore()}},announcer:{back(n,t,e){const i=En(t);pn(n,t,i-2,e.color),Ht(n,t,dn(17,6,i),e.color,1.6),Tt(n,t,Tn(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=26;Ht(n,t,Mi(i,s+2,6.2),e.trim??x.white,1.1,{alpha:.75}),Ht(n,t,`M${C(i*.4-1.4)} 1.5 L${C(i*.4+1.4)} 1.5 L${C(i*.4+.9)} 4 L${C(i*.7+2)} ${C(s-2)} L${C(i*.7)} ${C(s+1)} L${C(i*.7-2)} ${C(s-2)} L${C(i*.4-.9)} 4 Z`,x.violet,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),ur(n,t,i*.4,e.trim??x.white);const r=-10.5+i*.4;Ht(n,t,`M${C(r-.8)} 9 L${C(r+.8)} 9 L${C(r+.8)} 11.6 L${C(r-.8)} 11.6 Z`,x.white,1),Tt(n,t,`M${C(r)} 11.6 C${C(r+2)} 16 ${C(r-3)} 20 ${C(r-2)} 30`,x.blueMid,.7,{alpha:.5})}},suit:{back(n,t,e){const i=En(t);pn(n,t,i-2,e.color),Ht(n,t,dn(17.5,6,i),e.color,1.6),Tt(n,t,Tn(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=25;Ht(n,t,Mi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75});const r=e.tie??x.coral;Ht(n,t,`M${C(i*.4-1.4)} 1.5 L${C(i*.4+1.4)} 1.5 L${C(i*.4+.9)} 4 L${C(i*.7+2.2)} ${C(s+4)} L${C(i*.7)} ${C(s+7)} L${C(i*.7-2.2)} ${C(s+4)} L${C(i*.4-.9)} 4 Z`,r,1.3,{hot:!0}),Zi(n,t,i,s+2,"notch",e.color),ur(n,t,i*.4,e.shirt??x.white),Tt(n,t,He(i,s+6,.9),e.color,1.1)}},hoodie:{back(n,t,e){const i=En(t,50);pn(n,t,i-3,x.blueDim),Ht(n,t,"M-10 1 C-14 -6 -10 -11 0 -11.5 C10 -11 14 -6 10 1 Z",e.color,1.5),Tt(n,t,"M-7.5 -1 C-9 -6 -6 -8.5 0 -8.8 C6 -8.5 9 -6 7.5 -1",e.color,.9,{alpha:.5}),Ht(n,t,dn(18,7,i,7.5),e.color,1.7),Tt(n,t,Tn(18,i,7.5),e.color,1,{alpha:.55}),t.floor!=null&&Tt(n,t,`M-21 ${C(i-4)} L21 ${C(i-4)}`,e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;Ht(n,t,"M-7.2 -1.5 C-6 4 6 4 7.2 -1.5 C9 3 6 6.5 0 6.5 C-6 6.5 -9 3 -7.2 -1.5 Z",e.color,1.5);const s=Math.sin(t.t*1.7)*.6;for(const r of[-1,1]){const a=i*.5+r*2.6;Tt(n,t,`M${C(a)} 5 C${C(a+s)} 10 ${C(a-s)} 15 ${C(a+r*.5)} 19`,e.trim??x.white,1,{alpha:.85}),Tt(n,t,`M${C(a+r*.5)} 19 L${C(a+r*.5)} 21`,e.trim??x.white,2)}if(t.bottom>32&&Tt(n,t,`M${C(i-11)} 44 L${C(i-8)} 32 L${C(i+8)} 32 L${C(i+11)} 44`,e.color,1.2,{alpha:.7}),e.logo!==!1){const r=i+8,a=14;Tt(n,t,`M${C(r)} ${C(a)} C${C(r-1)} ${C(a-2)} ${C(r-3)} ${C(a-3)} ${C(r-3)} ${C(a-1.5)} C${C(r-3)} ${C(a)} ${C(r-1.5)} ${C(a+.5)} ${C(r)} ${C(a)} C${C(r+1)} ${C(a-2)} ${C(r+3)} ${C(a-3)} ${C(r+3)} ${C(a-1.5)} C${C(r+3)} ${C(a)} ${C(r+1.5)} ${C(a+.5)} ${C(r)} ${C(a)}`,e.trim??x.bsky,1,{hot:!0})}}},cardigan:{back(n,t,e){const i=En(t,48);pn(n,t,i-2,x.blueDim),Ht(n,t,dn(17,6,i,7),e.color,1.6),Tt(n,t,Tn(17,i,7),e.color,1,{alpha:.5});for(let s=-16;s<=16;s+=4)Tt(n,t,`M${s} ${C(i-5)} L${s} ${C(i)}`,e.color,.7,{alpha:.3})},front(n,t,e){const i=t.turn*4.5,s=En(t,48),r=24;Ht(n,t,Mi(i,r,6.4),e.shirt??x.sky,1,{alpha:.7}),Ht(n,t,`M-6.4 -1.5 L${C(i-1.6)} ${C(r)} L${C(i-1.6)} ${C(s)} L-14 ${C(s)} L-12 4 Z M6.4 -1.5 L${C(i+1.6)} ${C(r)} L${C(i+1.6)} ${C(s)} L14 ${C(s)} L12 4 Z`,e.color,1.4),ur(n,t,i*.4,e.shirt??x.sky);for(let a=r+3;a<Math.min(s,60);a+=7)Tt(n,t,He(i,a,.8),e.trim??x.white,1.1)}},labcoat:{back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,70):t.bottom;pn(n,t,60,x.blueDim),Ht(n,t,dn(18,6.2,i),e.color??x.white,1.6),Tt(n,t,Tn(18,i),e.color??x.white,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=30;Ht(n,t,Mi(i,s,6.2),e.shirt??x.sky,1,{alpha:.6}),Tt(n,t,`M${C(i*.4)} 3 L${C(i*.7)} ${C(s-2)}`,e.tie??x.green,2.2),Zi(n,t,i,s+2,"notch",e.color??x.white),Tt(n,t,`M${C(i)} ${C(s+2)} L${C(i)} ${C(t.floor!=null?Math.min(t.bottom,70):t.bottom)}`,e.color??x.white,1.2);const r=12+i*.5;Tt(n,t,`M${C(r-4)} 18 L${C(r+4)} 18`,e.color??x.white,1.2),[x.coral,x.bsky,x.green].forEach((o,l)=>Tt(n,t,`M${C(r-2.5+l*2)} 18 L${C(r-2.5+l*2)} ${C(14.5+l%2)}`,o,1.4,{hot:!0}));const a=-12+i*.5;Ht(n,t,`M${C(a-3.5)} 16 L${C(a+3.5)} 16 L${C(a+3.5)} 20.5 L${C(a-3.5)} 20.5 Z`,e.trim??x.cyan,1),Tt(n,t,`M${C(a-2.3)} 17.6 L${C(a+2.3)} 17.6 M${C(a-2.3)} 19 L${C(a+1)} 19`,e.trim??x.cyan,.7,{alpha:.7})}},turtleneck:{back(n,t,e){const i=En(t,48);pn(n,t,i-2,x.blueDim),Ht(n,t,dn(16.5,7,i,7.5),e.color,1.6),Tt(n,t,Tn(16.5,i,7.5),e.color,1,{alpha:.45})},front(n,t,e){Ht(n,t,"M-6.8 -7 C-3 -6 3 -6 6.8 -7 L7.6 3 C3 4.5 -3 4.5 -7.6 3 Z",e.color,1.5);for(const i of[-4.5,-2,.5])Tt(n,t,`M-7 ${i} C-3 ${C(i+1.2)} 3 ${C(i+1.2)} 7 ${i}`,e.color,.9,{alpha:.55});e.pendant&&(Tt(n,t,"M-4 4 C-2 14 2 14 4 4",e.trim??x.gold,.8,{alpha:.7}),Tt(n,t,He(0,13.6,1.1),e.trim??x.gold,1.2,{hot:!0}))}},tee:{back(n,t,e){const i=En(t,46);pn(n,t,i-2,x.blueDim),Ht(n,t,dn(17,7,i,7.5),e.color,1.6),Tt(n,t,"M-19 22 L-15 21 M19 22 L15 21",e.color,1,{alpha:.6})},front(n,t,e){Tt(n,t,"M-7.2 -1.2 C-5 4 5 4 7.2 -1.2",e.color,1.5);const i=t.turn*4;if(!e.print||e.print==="butterfly"){const s=i,r=16;Tt(n,t,`M${s} ${r} C${s-2} ${r-4} ${s-6} ${r-6} ${s-6} ${r-3} C${s-6} ${r} ${s-3} ${r+1} ${s} ${r} C${s+2} ${r-4} ${s+6} ${r-6} ${s+6} ${r-3} C${s+6} ${r} ${s+3} ${r+1} ${s} ${r} M${s} ${r} C${s-3} ${r+2} ${s-4} ${r+5} ${s-1.5} ${r+4.5} M${s} ${r} C${s+3} ${r+2} ${s+4} ${r+5} ${s+1.5} ${r+4.5}`,e.trim??x.bsky,1.4,{hot:!0})}else vt(n,String(e.print).toUpperCase(),i,18,{size:4.2,align:"center",color:e.trim??x.white,weight:"m"})}},terminal:{back(n,t,e){const i=Math.min(t.bottom,52),s=e.color??x.green;Ht(n,t,`M-22 4 L22 4 L24 8 L24 ${C(i)} L-24 ${C(i)} L-24 8 Z`,s,1.8),Tt(n,t,"M-20 7 L20 7",s,.8,{alpha:.4});for(let r=10;r<16;r+=2)Tt(n,t,`M-21 ${r} L-15 ${r} M15 ${r} L21 ${r}`,s,.7,{alpha:.45});if(t.floor!=null&&t.floor>i+4){Ht(n,t,`M-6 ${C(i)} L6 ${C(i)} L5 ${C(t.floor-6)} L-5 ${C(t.floor-6)} Z`,s,1.2),Ht(n,t,`M-16 ${C(t.floor-6)} L16 ${C(t.floor-6)} L16 ${C(t.floor-3)} L-16 ${C(t.floor-3)} Z`,s,1.2);for(const r of[-12,0,12])Tt(n,t,He(r,t.floor-1.6,1.6),s,1)}},front(n,t,e){const i=e.color??x.green;Ht(n,t,"M-4.2 -6 L4.2 -6 L4.6 4 L-4.6 4 Z",i,1.2);for(let u=-4.5;u<4;u+=1.6)Tt(n,t,`M-4.4 ${C(u)} L4.4 ${C(u)}`,i,.8,{alpha:.6});const s=-15+t.turn*3,r=12,a=30,o=20;Ht(n,t,`M${s} ${r} L${s+a} ${r} L${s+a} ${r+o} L${s} ${r+o} Z`,i,1.4,{hot:!0});const l=e.text??["> ingest firehose","> rank: simcluster",'> reply: "great point"',"> ok"],c=t.t,h=Math.floor(c*1.4);n.save(),n.beginPath(),n.rect(s+.5,r+.5,a-1,o-1),n.clip();for(let u=0;u<4;u++){const p=l[(h+u)%l.length];vt(n,p.toUpperCase(),s+1.6,r+4.6+u*4.4,{size:2.9,color:i,ls:.04,alpha:u===3?1:.6})}Math.floor(c*3)%2===0&&Tt(n,t,`M${s+2} ${r+o-1.6} L${s+4} ${r+o-1.6}`,i,1.8),n.restore(),[x.green,x.amber,x.red].forEach((u,p)=>{const _=p===0?.4+.6*(t.speaking??0):p===1?Math.floor(c*2+p)%3===0?1:.25:.3;Tt(n,t,He(15+p*3,36,.8),u,1.4,{alpha:_,hot:_>.6})}),vt(n,(e.model??"AGENT-7").toUpperCase(),-20,37.2,{size:2.8,color:i,alpha:.7,ls:.15})}}};Cr.blazer={back(n,t,e){const i=En(t);pn(n,t,i-2,cn(e.color,"#000",.5)),Ht(n,t,dn(17,6,i),e.color,1.6),Tt(n,t,Tn(17,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5,s=24;Ht(n,t,Mi(i,s+2,6.2),e.shirt??x.white,1.1,{alpha:.75}),Zi(n,t,i,s+2,"notch",e.color,e.trim),Ht(n,t,`M-5.6 -2 L${C(i-1.4)} 6 L-8 3.6 Z M5.6 -2 L${C(i+1.4)} 6 L8 3.6 Z`,e.shirt??x.white,1.2);for(const r of[s+4,s+10])Tt(n,t,He(i,r,.8),e.trim??e.color,1.1);if(e.crest){const r=-12+i*.5;Tt(n,t,`M${C(r-3)} 13 L${C(r+3)} 13 L${C(r+3)} 17 L${C(r)} 19.5 L${C(r-3)} 17 Z`,e.trim??x.gold,1.2,{hot:!0})}}};Cr.featherCoat={back(n,t,e){const i=t.floor!=null?Math.min(t.bottom,62):t.bottom;pn(n,t,56,x.blueDim),Ht(n,t,dn(17.5,6.5,i),e.color,1.6),Tt(n,t,Tn(17.5,i),e.color,1,{alpha:.5})},front(n,t,e){const i=t.turn*4.5;Tt(n,t,`M${C(i)} 6 L${C(i)} ${C(t.floor!=null?Math.min(t.bottom,62):t.bottom)}`,e.color,1.2);for(const r of[12,20,28])Tt(n,t,He(i-2.5,r,.8),e.trim??x.violet,1.1);let s="";for(let r=-6;r<=6;r++){const a=r*1.9,o=1.2-Math.abs(r)*.25,l=a*1.45+(r<0?-1:1)*.8,c=o+6.2-Math.abs(r)*.15;s+=`M${C(a-1.1)} ${C(o)} Q${C(a*1.25-1)} ${C(o+3.5)} ${C(l)} ${C(c)} Q${C(a*1.25+1)} ${C(o+3)} ${C(a+1.1)} ${C(o)} Z `}Ht(n,t,s,e.trim??x.violet,1.1)}};function r1(n,t,e){const i=e.holds;if(i){for(const s of[].concat(i))if(s==="clipboard"){Ht(n,t,"M-13 26 L1 26 L1 44 L-13 44 Z",x.amber,1.3),Ht(n,t,`M${-6-2.5} ${26-1.2} L${-6+2.5} ${26-1.2} L${-6+2.5} ${26+1.2} L${-6-2.5} ${26+1.2} Z`,x.white,1),vt(n,(e.clipText??"LIST OF").toUpperCase(),-6,26+5.2,{size:2.2,align:"center",color:x.white,weight:"m",ls:.05});for(let o=0;o<4;o++)Tt(n,t,`M-11 ${34+o*2.4} L${-6+(o%2?3:5)} ${34+o*2.4}`,x.white,.7,{alpha:.55});Tt(n,t,He(-6+7.5,38,1.6),e.skin??x.white,1)}else if(s==="clicker")Ht(n,t,`M${15-1.6} 32 L${15+1.6} 32 L${15+1.6} 39 L${15-1.6} 39 Z`,x.white,1.2),Tt(n,t,He(15,32+1.8,.6),x.red,1.3,{hot:Math.floor(t.t*2)%3===0}),Tt(n,t,He(15,36,2.2),e.skin??x.white,1,{alpha:.7});else if(s==="popper")Ht(n,t,"M12 36 L16 36 L19 24 L9 24 Z",x.magenta,1.3,{hot:!0}),Tt(n,t,`M9 24 L19 24 M11 29 L${14+3.8} 29`,x.gold,1),Tt(n,t,"M14 36 L14 39",x.white,1);else if(s==="headset"){const r=t.turn>=0?1:-1;Tt(n,t,`M${C(r*7)} -9 C${C(r*8)} -5 ${C(r*6)} -3 ${C(r*2.5)} -4.5`,x.white,1.1),Tt(n,t,He(r*2.3,-4.6,.9),x.white,1.3,{hot:!0})}}}function tc(n,t,e,i){const r=(Cr[i==null?void 0:i.kind]??Cr.hoodie)[t];if(r){i1(n,e),qo=!!e.noFill;try{r(n,e,i??{}),t==="front"&&r1(n,e,i??{})}finally{qo=!1,n.restore()}}}const fr=(()=>{const n=Li("emblem"),t=[];for(let i=0;i<9;i++){const s=i/9*Math.PI*2+n.range(-.2,.2),r=i===0?0:n.range(.45,.95);t.push([Math.cos(s)*r,Math.sin(s)*r])}const e=[];for(let i=1;i<9;i++)e.push([0,i]),e.push([i,i===8?1:i+1]);return e.push([2,6],[3,7]),{nodes:t,edges:e}})();function o1(n,t,e,i,s=0,r=x.gold,a={}){Fe(n,t,e,i,r,1.8,{hot:!0,alpha:a.alpha}),Fe(n,t,e,i*1.12,r,.9,{alpha:.4*(a.alpha??1)});const o=new Path2D;for(const[l,c]of fr.edges){const h=fr.nodes[l],f=fr.nodes[c];o.moveTo(t+h[0]*i*.82,e+h[1]*i*.82),o.lineTo(t+f[0]*i*.82,e+f[1]*i*.82)}it(n,o,r,1,{alpha:.55*(a.alpha??1)}),fr.nodes.forEach(([l,c],h)=>ve(n,t+l*i*.82,e+c*i*.82,i*(h===0?.09:.06),h%3===0?x.sky:r,(.6+.4*Math.sin(s*2+h*1.7))*(a.alpha??1)))}function xh(n,t,e,i=1,s={}){const r=s.t??0,a=s.alpha??1;if(a<=0)return;const o=104*i,l=me(n,"CLUSTER",{size:o,weight:"m",ls:.06});s.align==="center"&&(t-=l/2),n.save(),n.globalAlpha=a,_r(n,"THE LATE",t+4*i,e-o*.92,{size:34*i,color:x.sky,ls:.62,weight:"m",alpha:a,glow:.5}),o1(n,t+l-44*i,e-o*1.06,30*i,r,x.gold,{alpha:a}),_r(n,"CLUSTER",t,e,{size:o,weight:"m",color:x.gold,ls:.06,alpha:a,glow:.9});const c=l*se(s.sweep??1);Ot(n,t,e+16*i,t+c,e+16*i,x.gold,2*i,{hot:!0,alpha:a}),Ot(n,t,e+24*i,t+c*.7,e+24*i,x.goldMid,1*i,{alpha:.6*a}),s.sub!==!1&&(n.save(),n.translate(t+l-4*i,e+66*i),n.transform(1,0,-.22,1,0,0),_r(n,"with Larry Nx",0,0,{size:40*i,color:x.white,align:"right",ls:.06,alpha:a,glow:.4}),n.restore()),n.restore()}function a1(n,t,e,i,s=520){const r=Ye.outCubic(se(e))*(1-Ye.inCubic(se(i)));if(r<=.001)return;const a=t.color??x.sky,o=String(t.name??"").toUpperCase(),l=String(t.title??"").toUpperCase(),c=t.handle??"",h=me(n,o,{size:34,weight:"m",ls:.1}),f=me(n,l+(c?"   "+c:""),{size:15,ls:.18}),u=Math.max(h+(t.parody?me(n,"PUPPET · PARODY",{size:11,ls:.22})+40:0),f)+120,p=56-(1-r)*(u+80);if(Se(n,p,s,u,88,{color:a,cut:12,width:1.6,alpha:.95}),Ot(n,p+14,s+14,p+14,s+74,a,4,{hot:!0}),Fr(n,p+u-34,s+30,26,a,{width:1.3}),vt(n,o,p+34,s+44,{size:34,weight:"m",color:x.white,ls:.1}),vt(n,l,p+36,s+72,{size:15,color:a,ls:.18}),t.parody){const _=p+34+h+18,g=me(n,"PUPPET · PARODY",{size:11,ls:.22})+16;Se(n,_,s+23,g,22,{color:x.amber,cut:4,width:1.1}),vt(n,"PUPPET · PARODY",_+8,s+38,{size:11,color:x.amber,ls:.22})}c&&vt(n,c,p+36+me(n,l+"   ",{size:15,ls:.18}),s+72,{size:15,color:cn(a,"#ffffff",.4),ls:.06})}const gs={size:25,y:676,maxW:1e3};function l1(n,t,e=0){var A;if(!t||t.alpha<=.01)return;const i=t.alpha,s=(A=t.words)!=null&&A.length?t.words.map(z=>z[2]):String(t.text).split(/\s+/),r={size:gs.size,ls:.06},a=[];let o=[],l=0;const c=me(n," ",r);s.forEach((z,y)=>{const T=me(n,z,r);o.length&&l+c+T>gs.maxW&&(a.push(o),o=[],l=0),o.push({tok:z,i:y,w:T}),l+=(o.length>1?c:0)+T}),o.length&&a.push(o);const h=t.word<0?0:t.word;let f=a.findIndex(z=>z.some(y=>y.i===h));f<0&&(f=t.done?a.length-1:0);const u=Math.max(0,Math.min(a.length-2,f-f%2)),p=a.slice(u,u+2),_=gs.size*1.32,g=p.map(z=>z.reduce((y,T,O)=>y+T.w+(O?c:0),0)),d=Math.max(...g),m=String(t.name??"").toUpperCase(),M=m?me(n,m,{size:14,weight:"m",ls:.2}):0,v=Math.max(d,M)+56,b=p.length*_+40,P=640-v/2,E=gs.y-b+30-e;Se(n,P,E,v,b,{color:t.color??x.blue,cut:8,width:1.2,alpha:.6*i,fillAlpha:.92*i}),m&&(Rt(n,Dn(P+18,E-9,M+20,18),"#000",i),vt(n,m,P+28,E+5,{size:14,weight:"m",color:t.color??x.blue,ls:.2,alpha:i})),p.forEach((z,y)=>{let T=640-g[y]/2;const O=E+30+y*_+gs.size*.55;for(const K of z){const nt=t.words?K.i<h||K.i===h&&t.word>=0:!0,L=t.words&&K.i===h&&t.word>=0&&!t.done,I=L?t.color??x.amber:x.white;vt(n,K.tok,T,O,{...r,color:I,alpha:i*(nt?1:.5),weight:L?"m":"l"}),L&&Ot(n,T,O+7,T+K.w,O+7,I,2,{hot:!0,alpha:i}),T+=K.w+c}})}function c1(n,t,e,i=0){if(n.save(),n.translate(0,-i),e<=.02)return;const s=`[ ${t} ]`,r=me(n,s,{size:20,ls:.3})+50;Se(n,640-r/2,640,r,44,{color:x.amber,cut:8,width:1.2,alpha:.6*e,fillAlpha:.75*e}),vt(n,s,640,669,{size:20,align:"center",color:x.amber,ls:.3,alpha:e}),n.restore()}function h1(n,t,e){const r=t.age>=0&&t.age<.6?Math.sin(Math.PI*Math.min(1,t.age/.6)):0,a=t.age>=0&&t.age<.9?1-t.age/.9:0,o="BUILT DURING THIS EPISODE",l=me(n,o,{size:12,ls:.24}),c=l+70;Se(n,26,24,c,34,{color:a>0?cn(x.lime,"#ffffff",a*.5):x.lime,cut:6,width:1.2+a*1.4,alpha:.75+.25*a,hot:a>.3,fillAlpha:.8}),vt(n,o,38,46,{size:12,color:x.lime,ls:.24,alpha:.9});const h=38+l+30;n.save(),n.translate(h,41),n.scale(1+.6*r,1+.6*r),vt(n,String(t.n),0,8,{size:22,align:"center",color:a>.2?x.white:x.lime,weight:"m",ls:0}),n.restore(),t.age>=0&&t.age<1.5&&uh(n,h,38,t.age,{seed:t.seed,count:18,spread:.55})}function u1(n,t,e){const i=String(t),s=me(n,i,{size:13,ls:.12})+36;Se(n,640-s/2,686,s,26,{color:x.blueMid,cut:5,width:1,alpha:.6*e,fillAlpha:.8*e}),vt(n,i,640,704,{size:13,align:"center",color:x.white,ls:.12,alpha:.85*e})}const We=(n,t,e={})=>({color:n,head:hh(e.headColor??n,e.headOver),costume:t,scale:1,...e}),Es={larry:We("#ffc861",{kind:"tux",color:"#ffd27a",shirt:"#fff3d6",tie:"#ffb340",square:"#ff73cf"},{handle:"@larry.nx",headOver:{blueMid:"#e4ab50",blueDim:"#a3762f",frame:"#4a3514"}}),sibyl:We("#c9d8ff",{kind:"announcer",color:"#9fb7ff",trim:"#eef6f8"},{handle:"@sibyl.ant"}),hy:We("#ff73cf",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"},{handle:"@hyoid.band"}),al:We("#58f0e8",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"},{handle:"@alveolar.band"}),dee:We("#b6ff5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"},{handle:"@deephthong.band"}),pete:We("#ff9a5c",{kind:"band",color:"#ff5fd2",trim:"#ffc861",monogram:"F"},{handle:"@plosivepete.band"}),eppy:We("#ff7a2e",{kind:"blazer",color:"#ff7a2e",trim:"#ffc861",crest:!0,holds:"headset"}),bot:We("#5effc8",{kind:"terminal",color:"#5effc8",model:"WEBSITE-BOT",text:["> npm create site","> it builds!","> deploy: yes","> PARTY!"],holds:"popper"},{scale:.85}),norvid:We("#9a6bff",{kind:"featherCoat",color:"#5a3d9e",trim:"#b98cff",holds:"clipboard",clipText:"LIST OF"}),abel:We("#3fd17a",{kind:"cardigan",color:"#3fd17a",shirt:"#b6ff5c",trim:"#eef6f8"},{prop:"contraption"}),samantha:We("#34e0ff",{kind:"blazer",color:"#34e0ff",shirt:"#eef6f8",trim:"#ffffff",holds:"clicker"}),borjev:We("#c8956a",{kind:"terminal",color:"#c8956a",model:"BORJEV",text:["> opt-in only","> consent: y","> hello"]},{scale:.62})},ec=["#58f0e8","#a98bff","#b6ff5c","#ff7a5c","#ff5fd2","#7cc4ff","#5be381","#f08cff"];function Pr(n){if(Es[n])return Es[n];const t=Co(n),e=ec[t%ec.length],i=We(e,{kind:"hoodie",color:e});return Es[n]=i,i}function Sh(n,t){const e=t.color??Pr(n).color;return Es[n]={...We(e,{kind:"hoodie",color:e},{headColor:t.headColor,headOver:t.headOver}),...t,head:t.head??hh(t.headColor??e,t.headOver)},Es[n]}const ii={larry:{name:"Larry Nx",title:"Your host",body:{female:0,child:0},f0:104,rate:1,accent:.16,source:{breathiness:.12,tension:.5},pan:.12},sibyl:{name:"Sibyl Ant",title:"Announcer",body:{female:1,child:0},f0:196,rate:1.04,accent:.2,source:{breathiness:.2},pan:-.3},hy:{name:"Hy Oid",title:"Bandleader, The Formants",body:{female:.35,child:0},f0:135,rate:.95,accent:.2,source:{breathiness:.3,tension:.42,brightness:.12},pan:-.5},al:{name:"Al Veolar",title:"Bass, The Formants",body:{female:0,child:0},f0:84,rate:.95,accent:.14,source:{tension:.45,fry:.2},pan:-.7},dee:{name:"Dee Phthong",title:"Alto, The Formants",body:{female:.9,child:.1},f0:155,rate:1,accent:.18,source:{breathiness:.18,tension:.45,brightness:.25},pan:-.4},pete:{name:"Plosive Pete",title:"Percussion, The Formants",body:{female:.65,child:.4},f0:115,rate:1.05,accent:.18,source:{tension:.55,brightness:.4},pan:-.6},eppy:{name:"Eppy Glottis",title:"Sports desk",body:{female:.15,child:.2},f0:165,rate:1.16,accent:.36,source:{tension:.68,brightness:.55},pan:.25},bot:{name:"A website bot",title:"Builds it",body:{female:.5,child:.4},f0:275,rate:1,accent:.06,source:{tension:.7,brightness:.6,breathiness:.02},pan:.45},norvid:{name:"norvid_studies",handle:"@norvid-studies.bsky.social",title:"Crow of claims",guest:!0,body:{female:.25,child:.15},f0:160,rate:1.2,accent:.1,source:{tension:.66,roughness:.5,fry:.2,brightness:.5},pan:-.25},abel:{name:"Abel",handle:"@abeliansoup.bsky.social",title:"Abeliancorp",guest:!0,body:{female:0,child:0},f0:92,rate:1.26,accent:.24,source:{breathiness:.55,tension:.35,brightness:.1},pan:-.5},samantha:{name:"Samantha",handle:"@samantha.wiki",title:"The Simcluster Channel",guest:!0,body:{female:1,child:.15},f0:228,rate:1.08,accent:.32,source:{breathiness:.08,brightness:.5},pan:-.2},borjev:{name:"BorJev",handle:"@borjev.bsky.social",title:"Abel's bot · opt-in only",guest:!0,body:{female:.1,child:.4},f0:178,rate:.95,accent:.05,source:{tension:.62,roughness:.6,brightness:.3,drift:40},pan:-.6}},f1=1280,nc=720,d1=1100;class p1{constructor(t,e){this.canvas=t,this.wrap=e,this.ctx=t.getContext("2d",{alpha:!1}),this.gl=new s_,this.glow=new th(2.2,.8,4),this.S=F_(),this.maxDpr=Math.min(2,window.devicePixelRatio||1),this.k=1,this.glowOn=!0,this.stats={ms:0,frames:0,heads:0,quality:0},this._slow=0,this._fast=0,this.resize(),new ResizeObserver(()=>this.resize()).observe(e)}resize(){const t=this.wrap.getBoundingClientRect();let e=t.width,i=t.width*9/16;i>t.height&&(i=t.height,e=i*16/9),e=Math.max(16,Math.floor(e)),i=Math.max(9,Math.floor(i));const s=this.canvas;s.style.width=e+"px",s.style.height=i+"px",s.style.left=Math.floor((t.width-e)/2)+"px",s.style.top=Math.floor((t.height-i)/2)+"px";const r=Math.min(this.maxDpr,window.devicePixelRatio||1),a=Math.min(2560,Math.round(e*r)),o=Math.round(a*9/16);(s.width!==a||s.height!==o)&&(s.width=a,s.height=o),this.k=a/f1,this.css={w:e,h:i,x:Math.floor((t.width-e)/2),y:Math.floor((t.height-i)/2)}}budget(t){const e=this.stats;e.ms=e.ms?e.ms*.95+t*.05:t,e.frames++,!(e.frames<90)&&(e.ms>19?this._slow++:this._slow=0,e.ms<9?this._fast++:this._fast=0,this._slow>45?(this._slow=0,e.frames=0,this.maxDpr>1.01?(this.maxDpr=Math.max(1,this.maxDpr-.25),this.resize()):this.glowOn&&(this.glowOn=!1),e.quality--,console.info(`stage: frame time ${e.ms.toFixed(1)} ms → dpr ${this.maxDpr}, glow ${this.glowOn}`)):this._fast>240&&(this.maxDpr<Math.min(2,window.devicePixelRatio||1)||!this.glowOn)&&(this._fast=0,e.frames=0,this.glowOn?(this.maxDpr=Math.min(window.devicePixelRatio||1,this.maxDpr+.25),this.resize()):this.glowOn=!0,e.quality++))}screen(){this.ctx.setTransform(this.k,0,0,this.k,0,0)}worldT(t){const e=this.k,i=t.zoom;this.ctx.setTransform(e*i,0,0,e*i,e*(640-t.x*i),e*(360-t.y*i))}draw(t,e={}){var h,f,u,p,_,g;const i=this.ctx,s=t.t;i.setTransform(1,0,0,1,0,0),i.globalCompositeOperation="source-over",i.globalAlpha=1,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),this.worldT(t.cam),J_(i,this.S,t);const r=(t.setNow??t.set).dim??.34;r>0&&(i.setTransform(1,0,0,1,0,0),i.globalAlpha=r,i.fillStyle="#000",i.fillRect(0,0,this.canvas.width,this.canvas.height),i.globalAlpha=1),this.screen(),t.panel&&t.module.autoPanel!==!1&&_h(i,t.panel,{color:x.sky,appear:1}),this.call(t,"drawBack",i);for(const d of t.monitors)Rr(i,d.rect.x,d.rect.y,d.rect.w,d.rect.h,{...d});const a=[...t.puppets.values()].filter(d=>d.visible&&d.screen&&d.head);a.sort((d,m)=>(d.place.z??0)-(m.place.z??0)||d.screen.y-m.screen.y),this.stats.heads=a.length;for(const d of a)this.drawPuppet(t,d);this.screen();for(const d of t.monitors)Rr.glass(i,d.rect.x,d.rect.y,d.rect.w,d.rect.h,{...d,t:s});this.worldT(t.cam),Q_(i,this.S,t),this.screen(),t1(i,this.S,t,t.audience),this.call(t,"drawFront",i);const o=(h=t.layout)==null?void 0:h.lane;o!=null&&o.text&&ph(i,o.y,o.text,s,{tag:o.tag,color:x.coral}),t.builtNow&&h1(i,t.builtNow);const l=t.disclaimerNow;l&&u1(i,l.text,l.alpha);for(const d of t._frame.chyrons){const m=d.spec.id,M=m?{name:((f=t.puppets.get(m))==null?void 0:f.name)??((u=ii[m])==null?void 0:u.name)??m,title:(p=ii[m])==null?void 0:p.title,handle:((_=ii[m])==null?void 0:_.handle)??Pr(m).handle,color:Pr(m).color,parody:!!((g=ii[m])!=null&&g.guest),...d.spec}:d.spec,v=Gn(d.from,d.from+.6,s),b=Gn(d.to-.5,d.to,s);s>=d.from&&s<=d.to&&a1(i,M,v,b,(t.captionNow&&(e.captions??!0)?478:560)-(o!=null&&o.text?46:0))}if(this.signInFrame(t)||e1(i,t),e.captions??!0){const d=Math.max(o!=null&&o.text?46:0,l?34*l.alpha:0);t.captionNow?l1(i,t.captionNow,d):t.laughing>.05&&c1(i,t.signText==="APPLAUSE"?"APPLAUSE":"LAUGHTER",t.laughing,d)}e.overlay&&e.overlay(i),this.gl.ok||(Rt(i,Dn(340,300,600,80),"#000",.85),Qc(i,this.gl.failed?"THE HEADS NEED WEBGL, WHICH THIS BROWSER HAS TURNED OFF.":"RECONNECTING THE HEADS…",640,340,560,{size:16,align:"center",color:x.amber,ls:.12})),this.glowOn&&this.glow.apply(this.canvas,i,this.k)}signInFrame(t){if((t.setNow??t.set).sign===!1)return!1;const[e,i]=t.toScreen(845,64),[s,r]=t.toScreen(1095,110);return s>40&&e<1240&&i>-10&&r<720}call(t,e,i){const s=t.module[e];if(s){i.save();try{s.call(t.module,i,t.t,t)}catch(r){t._warn(`${e}() threw: ${(r==null?void 0:r.message)??r}`),console.error(r)}i.restore(),this.screen(),i.globalAlpha=1,i.globalCompositeOperation="source-over",i.filter="none"}}drawPuppet(t,e){const i=e.fx,s=e.place.clip;if(!i){s?this.clipped(s,()=>this.paintPuppet(this.ctx,t,e,!0)):this.paintPuppet(this.ctx,t,e,!0),this.drawExtras(t,e);return}const r=this.layer(),a=r.getContext("2d");a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation="source-over",a.globalAlpha=1,a.clearRect(0,0,r.width,r.height),a.setTransform(this.k,0,0,this.k,0,0);const o=i.kind==="hologram";this.paintPuppet(a,t,e,!o);const l=this.k,{x:c,y:h,size:f}=e.screen,u=t.t,p=e.id.length*7;a.setTransform(1,0,0,1,0,0),a.globalCompositeOperation="destination-out",a.globalAlpha=i.scan??(o?.55:.35),a.fillStyle="#000";const _=Math.max(2,Math.round(3*l)),g=o?Math.floor(u*40)%_:0,d=Math.max(0,Math.floor((h-f)*l)),m=Math.min(r.height,Math.ceil((h+f*1.6)*l));for(let P=d+g;P<m;P+=_)a.fillRect(0,P,r.width,Math.max(1,_*.45));let M=i.amount??1;if(o){const P=i.flicker??.5,E=$e(u*9,p);M*=1-P*.35*(.5+.5*E),P>0&&pr(Math.floor(u*12),p)<.04*P&&(M*=.25),M*=.78}else M*=i.kind==="monitor"?.92:1;const v=this.ctx;if(v.save(),v.setTransform(1,0,0,1,0,0),s&&(v.beginPath(),v.rect(s.x*l,s.y*l,s.w*l,s.h*l),v.clip()),v.globalCompositeOperation=o?"lighter":"source-over",v.globalAlpha=Math.max(0,Math.min(1,M)),(o||i.tint)&&(v.filter=m1(i.tint??"#7fc8ff")),o?(i.glitch??1)*(pr(Math.floor(u*7),p+3)<.18?1:0):0){const E=(h-f*.6)*l,A=f*2.2*l/7;v.drawImage(r,0,0,r.width,E,0,0,r.width,E);for(let z=0;z<7;z++){const y=E+z*A,T=(pr(z+Math.floor(u*7)*13,p)-.5)*26*l;v.drawImage(r,0,y,r.width,A,T,y,r.width,A)}v.drawImage(r,0,E+7*A,r.width,r.height-E-7*A,0,E+7*A,r.width,r.height-E-7*A)}else v.drawImage(r,0,0);v.restore(),this.drawExtras(t,e)}layer(){this._layer||(this._layer=document.createElement("canvas"));const t=this._layer;return(t.width!==this.canvas.width||t.height!==this.canvas.height)&&(t.width=this.canvas.width,t.height=this.canvas.height),t}clipped(t,e){const i=this.ctx;i.save(),i.beginPath(),i.rect(t.x,t.y,t.w,t.h),i.clip();try{e()}finally{i.restore(),this.screen()}}drawExtras(t,e){var s;const i=this.ctx;e.place.instrument&&(this.worldT(t.cam),Z_(i,e.place.instrument,e.place.x,e.place.y,t,e.id),this.screen()),e.look.prop&&!e.place.clip&&(this.worldT(t.cam),K_(i,e.look.prop,e.place.x+(((s=e.propParams)==null?void 0:s.side)??e.look.propSide??-1)*150*(e.place.scale??1),e.place.y,t,e.propParams??{}),this.screen())}paintPuppet(t,e,i,s){const{x:r,y:a,size:o}=i.screen,l=i.head,c=r-o/2,h=a-o/2,f=l.neck(),u=f.cm*(i.look.bodyScale??.66),p=c+f.x,_=h+f.y,g=i.place.floor!=null?e.toScreen(0,i.place.floor)[1]:null,d=Math.cos(i.az)*.75,m={x:p,y:_,u,turn:d,sway:i.tilt*.6,breathe:i.breathe,t:e.t,bottom:((i.place.seat!=null?Math.min(nc+40,e.toScreen(0,i.place.seat)[1]):nc+40)-_)/u,floor:g!=null?(g-_)/u:null,speaking:i.speaking,look:i.look,noFill:!s},M=i.look.costume;if(tc(t,"back",m,M),s){const v=l.hull();if(v.length>=6){const b=new Path2D,P=o/2,E=o/2;for(let A=0;A<v.length;A+=2){const z=c+P+(v[A]-P)*1.02,y=h+E+(v[A+1]-E)*1.02;A?b.lineTo(z,y):b.moveTo(z,y)}b.closePath(),Rt(t,b,"#000",.94)}}if(this.gl.ok){const v=this.k,b=Math.min(d1,o*v),P=this.gl.render(l,b);t.save(),t.setTransform(1,0,0,1,0,0),t.globalCompositeOperation="lighter",t.imageSmoothingEnabled=!0,t.drawImage(this.gl.canvas,P[0],P[1],P[2],P[3],c*v,h*v,o*v,o*v),t.restore()}tc(t,"front",m,M)}}const ic=new Map;function m1(n){let t=ic.get(n);if(!t){const e=parseInt(n.slice(1),16),i=(e>>16&255)/255,s=(e>>8&255)/255,r=(e&255)/255,a=Math.max(i,s,r),o=Math.min(i,s,r),l=a-o;let c=0;l>0&&(c=a===i?(s-r)/l%6:a===s?(r-i)/l+2:(i-s)/l+4),c=(c*60+360)%360,t=`grayscale(1) sepia(1) saturate(2.6) hue-rotate(${Math.round(c-38)}deg) brightness(1.15)`,ic.set(n,t)}return t}const sc=Float32Array.from(bi.map(n=>$o[n]));class g1{constructor(t){this.id=t,this.cast=ii[t]??{name:t.replace(/(^|[-_])(\w)/g,(e,i,s)=>(i?" ":"")+s.toUpperCase()),title:"",body:{female:.5,child:0}},this._look=null,this.body=this.cast.body??{female:.5,child:0},this.head=null,this.az=NaN,this.visible=!1,this.place=null,this.screen=null,this.tele=null,this.artic=$o,this.speaking=0,this.msgs=new Map,this.spans=[],this.skip=0,this.tmpA=new Float32Array(bi.length),this.tmpB=new Float32Array(bi.length)}get look(){return this._look??Pr(this.id)}get name(){return this.look.displayName??this.cast.name}get color(){return this.look.color}ensureHead(){const t=this.look.head;return this.head&&this.head.palette!==t&&(this.head.dispose(),this.head=null),this.head||(this.head=new n_(this.body,t)),this.head}dress(t){this._look={...this.look,...t}}msgFor(t){const e=`${t.nPh}/${t.nOr}/${t.nArtic}/${t.scope}`;let i=this.msgs.get(e);return i||this.msgs.set(e,i=t.makeMessage()),i}sample(t,e){const i=this.spans;let s=null,r=null,a=null;for(const h of i)t>=h.start&&t<=h.end?s=h:h.end<t&&(!r||h.end>r.end)?r=h:h.start>t&&(!a||h.start<a.start)&&(a=h);if(s){const h=this.msgFor(s.block);s.block.fill(h,s.block.frameAt(t-s.start),t),h.beatStep=e,this.tele=h,this.artic=Jl(h.t.artic),this.speaking=s.line.kind==="beat"?.6:1;return}this.tele=null,this.speaking=0;const o=.35,l=.14;let c=null;if(r&&t-r.end<o){const h=(t-r.end)/o;r.block.articAt(r.block.frames-1,this.tmpA),c=rc(this.tmpA,sc,h*h*(3-2*h))}if(a&&a.start-t<l){const h=1-(a.start-t)/l;a.block.articAt(0,this.tmpB),c=rc(c??sc,this.tmpB,h*h*(3-2*h))}this.artic=c?Jl(c):$o}}function rc(n,t,e){const i=new Float32Array(n.length);for(let s=0;s<n.length;s++)i[s]=n[s]+(t[s]-n[s])*e;return i}const Cs=200,ne={desk:{x:1790,y:548},mono:{x:970,y:452},chair:{x:oa.x,y:588},couch:[{x:1330,y:602},{x:1218,y:602}],band:{hy:{x:138,y:578,instrument:"keys",floor:800},al:{x:268,y:578,instrument:"bass",floor:800},pete:{x:404,y:512,instrument:"drums",floor:740},dee:{x:556,y:578,instrument:"mic",floor:800}},anncr:{x:690,y:548,floor:Qt.floor},lectern:{x:690,y:540},presenter:{x:1460,y:520},stand:{x:1470,y:545}};function dr(n,t,e,i={}){const s=n.cam.zoom,r=e.h*.78/(Cs*s),a=e.x+e.w/2,o=e.y+e.h*.42;return n.monitors=[...n.monitors??[],{rect:e,who:t,...i}],n.place[t]={x:n.cam.x+(a-640)/s,y:n.cam.y+(o-360)/s,scale:r,look:i.look??"camera",z:8,floor:null,clip:e,fx:{kind:"monitor"}},n}const bh=["hy","al","pete","dee"],bn=(n,t="camera")=>n==="mono"?{...ne.mono,scale:1,look:t,z:5,floor:Qt.floor}:{...ne.desk,scale:1,look:t,z:5,floor:null,seat:760};function oc(n){const t=[ne.chair,...ne.couch],e={};return n.slice(0,3).forEach((i,s)=>e[i]={...t[s],scale:1,look:"larry",z:4-s*.1,floor:null,seat:s?790:800}),e}function ac(n,t="camera"){const e={};for(const i of bh){const s=ne.band[i];e[i]={x:s.x,y:s.y,scale:.92,look:t,z:i==="pete"?1:2,floor:s.floor,instrument:s.instrument}}return e}const vr={wide(n,t={}){const e={larry:bn(t.larry??"desk",t.look??"camera")};return t.band!==!1&&Object.assign(e,ac()),Object.assign(e,oc(t.guests??n.guests)),(n.cast.includes("sibyl")||t.sibyl)&&(e.sibyl={...ne.anncr,scale:.9,look:"camera",z:2}),{cam:{x:1e3,y:585,zoom:.64},place:e,audience:1}},mono(n,t={}){const e=bn("mono",t.look??"camera");return{cam:{x:e.x,y:e.y+86,zoom:t.zoom??1.78},place:{larry:e},audience:1}},desk(n,t={}){const e=bn("desk",t.look??"camera");return{cam:{x:e.x-40,y:e.y+66,zoom:t.zoom??1.85},place:{larry:e},audience:0}},guest(n,t={}){const e=t.guest??n.guests[0],i={larry:bn("desk",e??"camera")};return e&&(i[e]={...ne.chair,scale:t.guestScale??1,look:"larry",z:4,floor:null,seat:800}),{cam:{x:(ne.chair.x+ne.desk.x)/2-10,y:640,zoom:t.zoom??1.42},place:i,audience:0}},panel(n,t={}){const e=t.guests??n.guests.filter(l=>l!==t.pop).slice(0,3),i={larry:bn("desk",t.look??e[0]??"camera"),...oc(e)},s=e.length>=3?ne.couch[1].x:e.length===2?ne.couch[0].x:ne.chair.x,r=(s+ne.desk.x)/2,a=Math.min(1.4,1100/(ne.desk.x-s+260)),o={x:r,y:650,zoom:a};if(t.pop){const l=Math.max(0,Math.min(1,t.popUp??1)),c=(612-o.y)*a+360;i[t.pop]={x:e.length>=3?ne.couch[1].x-70:ne.couch[1].x,y:720-l*150,scale:t.popScale??.9,look:"larry",z:1,floor:null,clip:{x:0,y:-100,w:1280,h:c+100}}}return{cam:o,place:i,audience:0}},band(n,t={}){const e=ac(n,t.look??"camera");if(t.with)for(const i of[].concat(t.with))e[i]={...ne.anncr,scale:.9,look:"camera",z:2};return{cam:{x:352,y:640,zoom:t.zoom??1.5},place:e,audience:.8}},ots(n,t={}){var u;const e=t.who??"larry",i=t.side==="right",s=t.zoom??1.75,r=e==="larry"?bn("desk"):{...ne.presenter,scale:1,z:5,floor:Qt.floor},a=i?960:270,o={x:r.x-(a-640)/s-(i?-40:40)/s,y:r.y+70,zoom:s},l=t.panel??(i?{x:40,y:64,w:690,h:470}:{x:520,y:64,w:720,h:470}),c={[e]:{...r,look:t.look??(i?"left":"right"),instrument:t.desk??r.instrument}},f={cam:o,place:c,audience:0,panel:l,set:e==="larry"?{}:{chair:!1,couch:!1,desk:!1}};if(t.pip){const g=i?{x:l.x+18,y:l.y+l.h-150-18,w:230,h:150}:{x:l.x+l.w-230-18,y:l.y+l.h-150-18,w:230,h:150};dr(f,t.pip,g,{label:t.pipLabel??((u=n.CAST[t.pip])==null?void 0:u.name)??t.pip,live:t.pipLive??!1,noStand:!0})}return f},sports(n,t={}){const e=vr.ots(n,{who:"eppy",desk:"sportsdesk",...t,panel:t.panel??(t.side==="right"?{x:40,y:54,w:690,h:430}:{x:520,y:54,w:720,h:430})});return e.lane={y:676,h:36,text:t.ticker??null,tag:t.tickerTag??"SCORES"},e},remote(n,t={}){var a;const e=t.guest??n.guests[0],i=t.zoom??1.6,s=bn("desk","left"),r={cam:{x:s.x-320/i,y:s.y+70,zoom:i},place:{larry:s},audience:0,set:{chair:!1,couch:!1}};return e&&dr(r,e,{x:60,y:60,w:560,h:400},{label:t.label??((a=n.CAST[e])==null?void 0:a.name)??e,live:t.live??!0}),r},remote2(n,t={}){var o,l,c,h;const[e,i]=t.guests??n.guests.slice(0,2),s=t.zoom??1.6,r=bn("desk","left"),a={cam:{x:r.x-390/s,y:r.y+70,zoom:s},place:{larry:r},audience:0,set:{chair:!1,couch:!1}};return e&&dr(a,e,{x:40,y:90,w:390,h:300},{label:((o=t.labels)==null?void 0:o[0])??((l=n.CAST[e])==null?void 0:l.name)??e,live:t.live??!0}),i&&dr(a,i,{x:460,y:90,w:390,h:300},{label:((c=t.labels)==null?void 0:c[1])??((h=n.CAST[i])==null?void 0:h.name)??i,live:t.live??!0}),a},podium(n,t={}){const e=t.who??"sibyl",i=ne.lectern,s={[e]:{...i,scale:1,look:t.look??"camera",z:4,floor:Qt.floor,instrument:"lectern"}};return{cam:{x:i.x+20,y:i.y+100,zoom:t.zoom??1.7},place:s,audience:.5}},deskWith(n,t={}){const e=t.with??"sibyl",i={larry:bn("desk",t.look??e),[e]:{...ne.stand,scale:1,look:"larry",z:4,floor:Qt.floor,instrument:t.stand??"stand"}};return{cam:{x:(ne.stand.x+ne.desk.x)/2,y:640,zoom:t.zoom??1.4},place:i,audience:0,set:{chair:!1,couch:!1}}},stage(n,t={}){const e=t.lead??"larry",i=t.band??bh,s={[e]:{x:970,y:470,scale:1,look:t.look??"camera",z:6,floor:Qt.floor}},r=i.length;return i.forEach((a,o)=>{const l=r>1?o/(r-1):.5,c=970+(l-.5)*2*210+(l<.5?-40:40);s[a]={x:c,y:430+Math.abs(l-.5)*40,scale:.78,look:"camera",z:2,floor:Qt.floor}}),{cam:{x:970,y:470,zoom:t.zoom??1.15},place:s,audience:1,set:{chair:!1,couch:!1}}},closeup(n,t={}){const e=t.who??"larry",i=n.markOf(e),s=(t.size??520)/(Cs*(i.scale??1)),r={[e]:{...i,look:t.look??i.look??"camera"}};return{cam:{x:i.x+(t.dx??0),y:i.y+Cs*.18*(i.scale??1),zoom:s},place:r,audience:0}},title(n){const t={larry:bn("desk","camera")};return{cam:{x:1590,y:590,zoom:1.45},place:t,audience:0}}},_1=["larry","sibyl","hy","al","dee","pete","eppy","bot"],v1=/^(applause|laugh|biglaugh|chuckle|cheer)/i,lc=.6,cc=Math.PI-.6;class _s{constructor({module:t,cues:e,tele:i,puppets:s}){this.module=t,this.cues=e??{id:t.id,title:t.title,duration:t.duration??30,lines:[],cues:{},sfx:[],music:[]},this.id=t.id??this.cues.id,this.title=t.title??(e==null?void 0:e.title)??this.id,this.duration=this.cues.duration??t.duration??30,this.teleFile=i,this.puppets=s,this.lines=(this.cues.lines??[]).slice().sort((a,o)=>a.t0-o.t0),this.lineById=new Map(this.lines.filter(a=>a.id).map(a=>[a.id,a])),this.sfxList=this.cues.sfx??[],this.musicList=this.cues.music??[],this._warned=new Set;const r=["larry"];for(const a of this.lines)a.who&&!r.includes(a.who)&&r.push(a.who);for(const a of t.cast??[])r.includes(a)||r.push(a);this.cast=r,this.guests=(t.guests??r.filter(a=>!_1.includes(a))).slice(),this.draw=I_,this.P=x,this.ease=Ye,this.clamp=se,this.lerp=ti,this.unlerp=Gn,this.smoothstep=Hr,this.tween=Uh,this.window=Gr,this.pulse=Ih,this.noise=$e,this.SHOTS=vr,this.MARKS=ne,this.TILE=Cs,this.CAST=ii,this.defineLook=Sh,this.set={...t.set??{}},this.nameplate=t.nameplate,this.captions=!0,this.onAir=!0,this.t=0,this.dt=0,this.wall=0,this._cur=null,this._trans=null,this._lastPlace={},this._frame=this._newFrame(),this.layout=null,this.cam={x:1e3,y:560,zoom:1},this.panel=null,this.audience=0,this.cut=!0,this._declShots=(t.shots??[]).map(a=>typeof a=="string"?{at:0,shot:a}:a),this._buildSpans()}_newFrame(){return{shot:null,cam:null,over:{},chyrons:[],caption:void 0,sign:null}}_buildSpans(){var e;for(const i of this.cast)this.puppet(i);for(const i of this.puppets.values())i.spans=[];const t=((e=this.teleFile)==null?void 0:e.blocks)??[];for(const i of this.lines){if(!(i.tele>=0)||!t[i.tele])continue;const s=t[i.tele];this._puppet(i.who).spans.push({start:i.teleT0,end:i.teleT0+s.duration,block:s,line:i})}}_puppet(t){let e=this.puppets.get(t);return e||(e=new g1(t),this.puppets.set(t,e)),e}_warn(t){this._warned.has(t)||(this._warned.add(t),console.warn(`[${this.id}] ${t}`))}at(t){var a;if(typeof t=="number")return t;if(t==null)return 0;const e=(a=this.cues.cues)==null?void 0:a[t];if(e!==void 0)return e;if(t.endsWith(".end")){const o=this.lineById.get(t.slice(0,-4));if(o)return o.t1}const i=this.lineById.get(t);if(i)return i.t0;const s=this.musicList.find(o=>o.id===t);if(s)return s.t0;const r=this.sfxList.find(o=>o.name===t)??this.sfxList.find(o=>o.name.startsWith(t+"-"));return r?r.t0:(this._warn(`unknown cue "${t}"`),1/0)}since(t){return this.t-this.at(t)}between(t,e){return this.t>=this.at(t)&&this.t<this.at(e)}progress(t,e){const i=this.at(t),s=typeof e=="number"?i+e:this.at(e);return Gn(i,s,this.t)}line(t){const e=this.lineById.get(t);return e?this._lineState(e):(this._warn(`unknown line "${t}"`),{id:t,t0:1/0,t1:1/0,active:!1,progress:0,done:!1,word:-1,words:[]})}_lineState(t){const e=this.t;let i=-1;if(t.words)for(let s=0;s<t.words.length;s++)e>=t.words[s][0]&&(i=s);return{...t,active:e>=t.t0&&e<t.t1,progress:Gn(t.t0,t.t1,e),done:e>=t.t1,word:i}}get active(){const t=this.t;return this.lines.filter(e=>t>=e.t0&&t<e.t1)}speaking(t){const e=this.t;return this.lines.some(i=>i.who===t&&e>=i.t0&&e<i.t1)}get speaker(){let t=null;const e=this.t;for(const i of this.lines)e>=i.t0&&e<i.t1&&i.kind!=="beat"&&(!t||i.t0>=t.t0)&&(t=i);return(t==null?void 0:t.who)??null}lastLine(t){let e=null;for(const i of this.lines)i.t0<=this.t&&(!t||i.who===t)&&(e=i);return e?this._lineState(e):null}sfx(t){const e=this.t,i=this.sfxList.find(s=>s.name.startsWith(t)&&e>=s.t0&&e<s.t1);return i?{...i,progress:Gn(i.t0,i.t1,e)}:null}musicState(t){const e=this.t,i=t?this.musicList.find(c=>c.id===t):this.musicList.find(c=>e>=c.t0&&e<c.t0+c.beats*60/c.bpm);if(!i)return null;const s=60/i.bpm,r=(e-i.t0)/s,a=Math.floor(r),o=r-a,l=i.beats*s;return{id:i.id,t0:i.t0,t1:i.t0+l,bpm:i.bpm,beats:i.beats,beat:r,n:a,phase:o,bar:Math.floor(a/4),pulse:r>=0?Math.exp(-o*4.5):0,progress:Gn(i.t0,i.t0+l,e),active:e>=i.t0&&e<i.t0+l}}shot(t,e={}){return this._frame.shot=this._req(t,e),this}closeup(t,e={}){return this.shot("closeup",{...e,who:t})}_req(t,e){const{push:i,since:s,...r}=e,a=t+JSON.stringify(Object.fromEntries(Object.entries(r).filter(([,o])=>typeof o!="number")));return{name:t,opts:r,key:a,push:i??0,since:s===void 0?void 0:this.at(s)}}camera(t){return this._frame.cam={...this._frame.cam??{},...t},this}puppet(t){const e=this._puppet(t),i=this,s=()=>{var r;return(r=i._frame.over)[t]??(r[t]={})};return{id:t,get name(){return e.name},get color(){return e.color},get look(){return e.look},get speaking(){return e.speaking},get screen(){return e.screen},place(r){var a;return Object.assign((a=s()).place??(a.place={}),r),this},lookAt(r){return s().look=r,this},nod(r){return s().nod=(s().nod??0)+r,this},tilt(r){return s().tilt=(s().tilt??0)+r,this},hide(){return s().hidden=!0,this},show(){return s().hidden=!1,this},bob(r=!0){return e.bobOff=!r,this},fx(r,a={}){return s().fx={kind:r,...a},this},shake(r=4){return s().shake=r,this},scaleTo(r){return s().scaleTo=r,this},prop(r){return s().prop={...s().prop??{},...r},this},dress(r){return e.dress(r),this}}}markOf(t){if(this._lastPlace[t])return this._lastPlace[t];if(t==="larry")return{...ne.desk,scale:1,look:"camera"};if(ne.band[t])return{...ne.band[t],scale:.92,look:"camera"};if(t==="sibyl")return{...ne.anncr,scale:.9,look:"camera"};const e=Math.max(0,this.guests.indexOf(t));return{...[ne.chair,...ne.couch][Math.min(2,e)],scale:1,look:"larry"}}chyron(t,e={}){const i=typeof t=="string"?{id:t}:t,s=this.at(e.from??0),r=e.to!==void 0?this.at(e.to):s+(e.dur??5);return this._frame.chyrons.push({spec:i,from:s,to:r,opts:e}),this}caption(t,e){return this._frame.caption=t===null?null:{text:t,who:e},this}sign(t="APPLAUSE",e=1){return this._frame.sign={text:t,level:e},this}rng(t=0){return Li(Co(`${this.id}:${t}`))}toScreen(t,e){const i=this.cam;return[(t-i.x)*i.zoom+640,(e-i.y)*i.zoom+360]}world(t,e){const i=this.cam;t.save(),t.translate(640-i.x*i.zoom,360-i.y*i.zoom),t.scale(i.zoom,i.zoom);try{e(t)}finally{t.restore()}}headOf(t){const e=this.puppets.get(t);if(!(e!=null&&e.screen)||!e.visible||!e.head)return null;const i=e.screen,s=e.head.mouth(),r=e.head.crown(),a=i.size/e.head.tile;return{x:i.x,y:i.y,size:i.size,mouth:[i.x-i.size/2+s[0]*a,i.y-i.size/2+s[1]*a],crown:[i.x-i.size/2+r.x*a,i.y-i.size/2+r.y*a]}}resetMotion(){var t;this.cut=!0,this._cur=null,this._trans=null;for(const e of this.cast){const i=this.puppets.get(e);i.az=NaN,(t=i.head)==null||t.resetMotion()}}frame(t,e,i={}){var o,l;this.t=t,this.dt=e,this.wall=t+1e3,this._frame=this._newFrame(),this.music=this.musicState(),this.beat=this.music?{phase:this.music.phase,n:this.music.n,pulse:this.music.pulse,bar:this.music.bar}:{phase:0,n:-1,pulse:0,bar:-1};let s=0,r=!1;for(const c of this.sfxList){if(!v1.test(c.name))continue;const h=Gr(t,c.t0,c.t1,.5)*(/^chuckle/i.test(c.name)?.55:1);h>s&&(s=h,r=/^(applause|cheer)/i.test(c.name))}this.laughing=s,this.signText=r?"APPLAUSE":"LAUGH";const a=this._declShot(t);a&&(this._frame.shot=a);try{(l=(o=this.module).direct)==null||l.call(o,t,this)}catch(c){this._warn(`direct() threw: ${(c==null?void 0:c.message)??c}`),console.error(c)}this._frame.sign&&(this.laughing=Math.max(this.laughing,this._frame.sign.level),this.signText=this._frame.sign.text),this._builtState(t),this._resolveLayout(t),this._updatePuppets(t,e,i),this._captionState(t)}_builtState(t){const e=this.module.built;if(!e){this.built=null,this.builtNow=null;return}let i=e.from??0,s=-1/0;for(const r of e.bumps??[]){const a=this.at(r);a<=t&&(i++,s=Math.max(s,a))}this.built=i,this.builtNow={n:i,age:t-s,seed:Math.floor(s*1e3)}}get disclaimerNow(){const t=this.module.disclaimer;if(!t)return null;const e=typeof t=="string"?{text:t}:t,i=this.at(e.from??0),s=e.dur??6,r=Gr(this.t,i,i+s,.6);return r>0?{text:e.text,alpha:r}:null}_declShot(t){let e=null;for(const l of this._declShots){const c=this.at(l.at??0)+(l.after??0);c<=t&&(!e||c>=e.at)&&(e={...l,at:c})}if(!e)return null;const{at:i,after:s,shot:r,push:a,...o}=e;return this._req(r,{...o,push:a,since:i})}_evalShot(t){const e=vr[t.name];return e?e(this,t.opts):(this._warn(`unknown shot "${t.name}"`),vr.desk(this,{}))}_resolveLayout(t){const e=this._frame.shot??this._req(this.module.defaultShot??"desk",{});if(!this._cur||this._cur.key!==e.key){const a=e.push>0&&this._cur;this._trans=a?{from:this._cur,start:e.since??t,dur:e.push}:null,a||(this.cut=!0),this._cur=e}else this._cur={...e,since:this._cur.since};let i=this._evalShot(this._cur);if(this._trans){const a=(t-this._trans.start)/this._trans.dur;a>=1||a<0?this._trans=null:i=M1(this._evalShot(this._trans.from),i,Ye.inOutCubic(a))}const s={...i.cam,...this._frame.cam??{}};this.module.drift!==!1&&(s.x+=7*$e(t*.11,11)/s.zoom,s.y+=4*$e(t*.09,12)/s.zoom,s.zoom*=1+.006*$e(t*.07,13));const r={...i.place};for(const[a,o]of Object.entries(this._frame.over))o.place&&(r[a]={...r[a]??this.markOf(a),...o.place}),o.hidden===!0?delete r[a]:o.hidden===!1&&!r[a]&&(r[a]=this.markOf(a));this.layout=i,this.setNow={...i.set??{},...this.set},this.monitors=i.monitors??[],this.cam=s,this.place=r,this.panel=i.panel??null,this.audience=i.audience??0}_resolveAz(t,e,i){if(typeof e=="number")return e;if(e==="right")return lc;if(e==="left")return cc;if(e==="camera"||e==null){const r=(i.x-this.cam.x)*this.cam.zoom,a=Math.abs(r)>40?Math.sign(r):i.camSide??-1;return Math.PI/2+a*(.36+.12*se(Math.abs(r)/400,0,1))}const s=this.place[e];return s?s.x>=i.x?lc:cc:Math.PI/2}_updatePuppets(t,e,i){var o,l;const s=this.cam,r=(o=this.music)!=null&&o.active?Math.floor(this.music.beat*4)%16:-1,a=this.cut;this.cut=!1;for(const c of this.puppets.values()){const h=this.place[c.id];if(!h){c.visible=!1,c.screen=null;continue}h.clip||(this._lastPlace[c.id]={x:h.x,y:h.y,scale:h.scale??1,look:h.look});const f=this._frame.over[c.id]??{},u=Co(c.id)%997,p=(h.scale??1)*(c.look.scale??1)*(f.scaleTo??1),_=Cs*p*s.zoom,g=.5+.5*Math.sin(t*2*Math.PI/4.4+u),d=f.shake??0,m=(h.x-s.x)*s.zoom+640+(d?d*$e(t*37,u+21):0),M=(h.y-s.y)*s.zoom+360-g*.006*_+(d?d*$e(t*41,u+22):0),v=f.fx??h.fx??(c.look.fx?{kind:c.look.fx}:null);if(c.fx=v&&v.kind!=="none"?v:null,c.propParams=f.prop??null,c.place=h,c.screen={x:m,y:M,size:_},c.visible=m>-_&&m<1280+_&&M>-_&&M<720+_*1.2,c.breathe=g,!c.visible)continue;const b=f.look??h.look,P=.07*$e(t*.31,u)+.04*$e(t*1.1,u+5),E=this._resolveAz(c.id,b,h)+P;a||!Number.isFinite(c.az)?c.az=E:c.az+=(E-c.az)*(1-Math.exp(-e/.2)),c.sample(t,r),i.paused&&(c.tele=null);let A=(f.nod??0)+.025*$e(t*.23,u+9);const z=(f.tilt??0)+.03*$e(t*.17,u+3);(l=this.music)!=null&&l.active&&!c.bobOff&&(A-=.07*this.music.pulse),c.nod=A,c.tilt=z;const y=c.ensureHead(),T=se(Math.sqrt(_/330),.72,1.35);y.aim(c.az,.13+(f.el??0),_,T),!(!i.full&&!c.tele&&_<200&&i.light&&(c.skip^=1))&&y.update(e,e,c.tele,c.artic,A,z)}}_captionState(t){const e=this._frame.caption;if(e===null)return this.captionNow=null;if(e){const o=e.who?this._puppet(e.who):null;return this.captionNow={who:e.who,name:(o==null?void 0:o.name)??"",color:(o==null?void 0:o.color)??x.white,text:e.text,words:null,word:-1,alpha:1}}let i=null;for(const o of this.lines)o.caption===!1||o.kind==="beat"||t>=o.t0-.05&&t<o.t1+.7&&(!i||o.t0>=i.t0)&&(i=o);if(!i)return this.captionNow=null;const s=this._puppet(i.who);let r=-1;if(i.words)for(let o=0;o<i.words.length;o++)t>=i.words[o][0]&&(r=o);const a=Math.min(Hr(i.t0-.05,i.t0+.1,t),1-Hr(i.t1+.4,i.t1+.7,t));this.captionNow={who:i.who,name:s.name,color:s.color,text:i.text,words:i.words,word:r,alpha:a,kind:i.kind,done:t>=i.t1}}}function M1(n,t,e){const i=Math.exp(ti(Math.log(n.cam.zoom),Math.log(t.cam.zoom),e)),s={x:ti(n.cam.x,t.cam.x,e),y:ti(n.cam.y,t.cam.y,e),zoom:i},r={};for(const a of new Set([...Object.keys(n.place),...Object.keys(t.place)])){const o=n.place[a],l=t.place[a];if(o&&l){const c=Math.hypot(o.x-l.x,o.y-l.y)>300;r[a]=c?e<.5?o:l:{...l,x:ti(o.x,l.x,e),y:ti(o.y,l.y,e),scale:ti(o.scale??1,l.scale??1,e)}}else r[a]=o??l}return{cam:s,place:r,audience:ti(n.audience??0,t.audience??0,e),panel:e>.5?t.panel:n.panel}}class y1{constructor({muted:t=!1}={}){this.muted=t,this.ctx=null,this.gain=null,this.buffer=null,this.src=null,this.offset=0,this.startedAt=0,this.playing=!1,this.duration=0,this.audioLead=0,this.epoch=0,this.listeners=new Set,this.ended=!1}unlock(){if(!this.muted){if(!this.ctx)try{this.ctx=new AudioContext({latencyHint:"playback"}),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination),this.ctx.onstatechange=()=>{this.ctx.state!=="running"&&this.playing&&this.ctx.state!=="suspended"&&this.pause()}}catch(t){console.warn("audio: no AudioContext, running silent",t),this.muted=!0;return}this.ctx.resume().catch(()=>{})}}async decode(t){return this.muted||!this.ctx?null:await this.ctx.decodeAudioData(t.slice(0))}load({buffer:t=null,duration:e,audioLead:i=0}){this.stopSource(),this.buffer=this.muted?null:t,this.duration=e,this.audioLead=i,this.offset=0,this.playing=!1,this.ended=!1,this.epoch++,this.emit()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){for(const t of this.listeners)t()}get isPlaying(){return this.playing}play(){if(!this.playing){if(this.offset>=this.duration-.02){this.offset=this.duration,this.ended=!0,this.emit();return}this.ended=!1,this.ctx&&this.ctx.resume().catch(()=>{}),this.startSource(),this.playing=!0,this.emit()}}pause(){this.playing&&(this.offset=this.time(),this.stopSource(),this.playing=!1,this.emit())}toggle(){this.playing?this.pause():this.play()}seek(t){this.offset=Math.max(0,Math.min(this.duration,t)),this.epoch++,this.ended=!1,this.playing&&(this.stopSource(),this.startSource()),this.emit()}time(){if(!this.playing)return this.offset;const t=this.offset+Math.max(0,this.now()-this.startedAt);return t>=this.duration?(this.playing=!1,this.offset=this.duration,this.ended=!0,this.stopSource(),queueMicrotask(()=>this.emit()),this.duration):t}now(){if(!this.buffer||!this.ctx)return performance.now()/1e3;const t=this.ctx,e=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(e&&e.contextTime!==void 0&&e.performanceTime!==void 0&&e.contextTime>0){const i=e.contextTime+Math.max(0,(performance.now()-e.performanceTime)/1e3);return Math.min(i,t.currentTime)}return t.currentTime-(t.outputLatency||t.baseLatency||0)}startSource(){if(!this.buffer||!this.ctx){this.startedAt=this.now();return}const t=this.ctx,e=t.createBufferSource();e.buffer=this.buffer,e.connect(this.gain),this.src=e;const i=t.currentTime+.02;this.startedAt=i,e.start(i,this.offset+this.audioLead)}stopSource(){const t=this.src;if(this.src=null,!!t){try{t.stop()}catch{}t.disconnect()}}setVolume(t){this.gain&&(this.gain.gain.value=t)}}const Eh={number:1,title:"Pilot",airDate:"2026-11-13",rundown:["cold-open","monologue","weather","top-chicken","built-or-bit","panel","song","goodnight"]},Th=n=>Object.fromEntries(Object.entries(n).map(([t,e])=>[t.split("/").at(-2),e])),wh=Th(Object.assign({"/../../episodes/001-pilot/segments/built-or-bit/index.js":()=>Ie(()=>import("./index-WP4gK3i7.js"),__vite__mapDeps([0,1,2]),import.meta.url),"/../../episodes/001-pilot/segments/cold-open/index.js":()=>Ie(()=>import("./index-CBLmfiNt.js"),__vite__mapDeps([3,1,2]),import.meta.url),"/../../episodes/001-pilot/segments/goodnight/index.js":()=>Ie(()=>import("./index-Csf3Hoyi.js"),__vite__mapDeps([4,1,2]),import.meta.url),"/../../episodes/001-pilot/segments/monologue/index.js":()=>Ie(()=>import("./index-Ma-dkhZs.js"),[],import.meta.url),"/../../episodes/001-pilot/segments/panel/index.js":()=>Ie(()=>import("./index-CqrVlHMg.js"),__vite__mapDeps([5,1,2]),import.meta.url),"/../../episodes/001-pilot/segments/song/index.js":()=>Ie(()=>import("./index-BcC1dmf6.js"),[],import.meta.url),"/../../episodes/001-pilot/segments/top-chicken/index.js":()=>Ie(()=>import("./index-BdwWD3vC.js"),[],import.meta.url),"/../../episodes/001-pilot/segments/weather/index.js":()=>Ie(()=>import("./index--JGW4Qr-.js"),[],import.meta.url)})),hc=Th(Object.assign({"/../../episodes/001-pilot/segments/built-or-bit/cues.json":()=>Ie(()=>import("./cues-CkoGA0h_.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/cold-open/cues.json":()=>Ie(()=>import("./cues-BoBkaIrI.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/goodnight/cues.json":()=>Ie(()=>import("./cues-DFVBD6t1.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/monologue/cues.json":()=>Ie(()=>import("./cues-CUCA2bkW.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/panel/cues.json":()=>Ie(()=>import("./cues-D7QKIXr4.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/song/cues.json":()=>Ie(()=>import("./cues-DVOR02-9.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/top-chicken/cues.json":()=>Ie(()=>import("./cues-nMf5Tow3.js"),[],import.meta.url).then(n=>n.default),"/../../episodes/001-pilot/segments/weather/cues.json":()=>Ie(()=>import("./cues-DqZMTlPX.js"),[],import.meta.url).then(n=>n.default)})),x1={},S1={};Object.assign(ii,x1);for(const[n,t]of Object.entries(S1))Sh(n,t);const Qi=["phLen","orLen","velumPort","f0","voicing","pLung","outRms","noiseLevel","noiseNode","gate"];async function b1(n){const t=new DecompressionStream("gzip"),e=new Blob([n]).stream().pipeThrough(t);return await new Response(e).arrayBuffer()}async function E1(n){let t=new Uint8Array(n);t[0]===31&&t[1]===139&&(n=await b1(n),t=new Uint8Array(n));const e=String.fromCharCode(t[0],t[1],t[2],t[3]);if(e!=="LCT1")throw new Error(`telemetry: bad magic "${e}"`);const s=new DataView(n).getUint32(4,!0),r=new TextDecoder().decode(t.subarray(8,8+s)).replace(/[\s\0]+$/,""),a=JSON.parse(r),o=8+Math.ceil(s/4)*4,l=a.scalars||Qi;for(let h=0;h<Qi.length;h++)l[h]!==Qi[h]&&console.warn(`telemetry: scalar ${h} is "${l[h]}", expected "${Qi[h]}"`);const c=a.blocks.map((h,f)=>new T1(n,o+h.offset,h,a,f));return{fs:a.fs,hop:a.hop,blocks:c}}class T1{constructor(t,e,i,s,r){var m,M;const{frames:a,channels:o,nPh:l,nOr:c}=i;this.index=r,this.frames=a,this.channels=o,this.nPh=l,this.nOr=c,this.body={female:((m=i.body)==null?void 0:m.female)??0,child:((M=i.body)==null?void 0:M.child)??0},this.fs=s.fs,this.hop=s.hop,this.nArtic=s.nArtic,this.scope=s.scope,this.rate=this.fs/this.hop,this.duration=(a-1)*this.hop/this.fs;const h=l+c,f=Qi.length+this.nArtic+3*h+this.scope;if(f!==o)throw new Error(`telemetry block ${r}: ${o} channels, layout says ${f}`);const u=o*8,p=new Float32Array(t.slice(e,e+u)),_=new Uint16Array(t.slice(e+u,e+u+o*a*2)),g=new Float32Array(o*a);for(let v=0;v<o;v++){const b=p[2*v],P=p[2*v+1];let E=0;const A=v*a;for(let z=0;z<a;z++)E=E+_[A+z]&65535,g[A+z]=b+E*P}this.data=g;let d=Qi.length;this.oArtic=d,d+=this.nArtic,this.oPh=d,d+=l,this.oOr=d,d+=c,this.oP=d,d+=h,this.oFlow=d,d+=h,this.oGA=d}makeMessage(){const t=this.nPh+this.nOr;return{type:"telemetry",t:{phLen:0,orLen:0,velumPort:0,f0:0,voicing:0,pLung:0,outRms:0,noiseLevel:0,noiseNode:0,gate:0,clock:0,artic:new Float32Array(this.nArtic),phAreas:new Float32Array(this.nPh),orAreas:new Float32Array(this.nOr),pressureRms:new Float32Array(t),flow:new Float32Array(t),glottalArea:new Float32Array(this.scope),glottalFlow:new Float32Array(this.scope),active:[]},load:0,body:this.body,nPh:this.nPh,nOr:this.nOr,beatStep:-1,_layout:this}}frameAt(t){return t*this.fs/this.hop}fill(t,e,i=0){const s=this.frames;e>0||(e=0),e>s-1&&(e=s-1);const r=Math.floor(e),a=Math.min(s-1,r+1),o=e-r,l=1-o,c=this.data,h=p=>c[p*s+r]*l+c[p*s+a]*o,f=t.t;f.phLen=h(0),f.orLen=h(1),f.velumPort=h(2),f.f0=h(3),f.voicing=h(4),f.pLung=h(5),f.outRms=h(6),f.noiseLevel=h(7),f.noiseNode=c[8*s+(o<.5?r:a)],f.gate=h(9),f.clock=i;const u=(p,_)=>{for(let g=0;g<p.length;g++)p[g]=h(_+g)};return u(f.artic,this.oArtic),u(f.phAreas,this.oPh),u(f.orAreas,this.oOr),u(f.pressureRms,this.oP),u(f.flow,this.oFlow),u(f.glottalArea,this.oGA),t.body=this.body,t}articAt(t,e){const i=this.frames;t=Math.max(0,Math.min(i-1,t));const s=Math.floor(t),r=Math.min(i-1,s+1),a=t-s;for(let o=0;o<this.nArtic;o++){const l=(this.oArtic+o)*i;e[o]=this.data[l+s]*(1-a)+this.data[l+r]*a}return e}}async function w1(n){const t=await fetch(n);if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return E1(await t.arrayBuffer())}const A1=Eh.rundown,uc=n=>new URL(n,document.baseURI).href,R1=()=>A1.slice(),Ro=n=>!!wh[n],Ti=new Map;function Ah(n){const t=`meta:${n}`;return Ti.has(t)||Ti.set(t,(async()=>{const e=(await wh[n]()).default??{};let i=e.cues??null;return!i&&hc[n]&&(i=await hc[n]()),i||console.info(`segment ${n}: no cues.json yet — it plays silent, with idle heads, for ${e.duration??30}s`),{id:n,module:{id:n,...e},cues:i}})()),Ti.get(t)}function fc(n,{audio:t=!0}={}){const e=`full:${n}:${t}`;if(!Ti.has(e)){const i=(async()=>{const s=await Ah(n),r=s.cues,[a,o]=await Promise.all([r!=null&&r.tele?w1(uc(r.tele)).catch(l=>(console.warn(`segment ${n}: telemetry failed to load (${l.message}); heads will idle`),null)):null,t&&(r!=null&&r.audio)?fetch(uc(r.audio)).then(l=>l.ok?l.arrayBuffer():Promise.reject(new Error(`HTTP ${l.status}`))).catch(l=>(console.warn(`segment ${n}: audio failed to load (${l.message}); playing silent`),null)):null]);return{...s,tele:a,bytes:o}})();i.catch(()=>Ti.delete(e)),Ti.set(e,i)}return Ti.get(e)}function C1(n,t){if(typeof(n==null?void 0:n.audioLead)=="number")return n.audioLead;if(!t||!(n!=null&&n.duration))return 0;const e=t.duration-n.duration;return e>.004?Math.min(e,1105/t.sampleRate):0}const P1=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];function L1(n){if(!n)return"";const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(n.airDate??"");return[typeof n.number=="number"?`NO. ${String(n.number).padStart(3,"0")}`:"",n.title?String(n.title).toUpperCase():"",t?`${Number(t[3])} ${P1[Number(t[2])-1]} ${t[1]}`:""].filter(Boolean).join(" · ")}function D1(n=[],t=null){const e=L1(t);return{id:"title",title:"The Late Cluster",duration:1e9,cast:["larry"],direct(i,s){s.onAir=!1,s.set.chair=s.set.couch=!1,s.shot("title");const r=$e(i*.13,77),a=s.puppet("larry");r>.45?a.lookAt("left"):r<-.55&&a.lookAt(Math.PI/2+.55).nod(-.12)},drawFront(i,s,r){if(xh(i,92,262,.98,{t:s}),e&&vt(i,e,388,478,{size:13,color:x.gold,ls:.3,alpha:.85}),n.length){vt(i,"TONIGHT",98,478,{size:17,color:x.sky,ls:.5,weight:"m"}),Ot(i,98,490,330,490,x.sky,1.2,{alpha:.6});const a=n.slice(0,10).map(l=>String(l).split(":")[0].trim().toUpperCase()),o=Math.ceil(a.length/2);a.forEach((l,c)=>{const h=a.length>5?Math.floor(c/o):0,f=a.length>5?c%o:c,u=98+h*290,p=514+f*22;vt(i,String(c+1).padStart(2,"0"),u,p,{size:12,color:x.gold,ls:.1,alpha:.8}),vt(i,l,u+28,p,{size:14,color:x.white,ls:.12,alpha:.9})})}}}}function U1(n,t){return{id:"production",title:n,duration:2.6,cast:[],drift:!0,direct(e,i){i.shot("wide",{band:!1}),i.set.dim=.7,i.onAir=!1},drawFront(e,i,s){const r=Math.min(Ye.outCubic(se(i/.4)),1-se((i-2.2)/.4));e.save(),e.globalAlpha=.88*r,e.fillStyle="#000",e.fillRect(0,0,1280,720),e.restore(),Se(e,360,250,560,200,{color:x.amber,cut:12,width:1.6,alpha:r}),vt(e,`SEGMENT ${String(t).padStart(2,"0")}`,640,300,{size:14,align:"center",color:x.sky,ls:.5,alpha:r}),vt(e,String(n).toUpperCase(),640,350,{size:30,align:"center",color:x.white,ls:.2,weight:"m",alpha:r}),vt(e,"IN PRODUCTION",640,400,{size:16,align:"center",color:x.amber,ls:.45,alpha:r*(.6+.4*Math.sin(i*5))}),bs(e,880,262,{scale:.5,perched:!0,facing:-1,alpha:r})}}}function I1(n=null){const t=[{head:"The Late Cluster"},["with","Larry Nx"],""];t.push({head:"Starring"});for(const[e,i]of Object.entries(ii))(!n||n.has(e))&&t.push([i.title??"",i.guest?`${i.name} (puppet)`:i.name]);return t.push("",{head:"Voices & faces"},["physical models","CHIMERA vocal synth"],["by","jamesondh · MIT"],["","github.com/jamesondh/chimera-vocal-synth"],""),t.push("Guests are puppets playing posting personas.","No accounts were simclustered in the making of this programme.","",{head:"Good night, Bluesky"}),t}function N1(n=null){const t=I1(n);return{id:"end",title:"Good night",duration:1e9,cast:["larry","hy","al","pete","dee"],direct(e,i){i.shot("wide"),i.onAir=!1,i.set.dim=.55,i.music={active:!0,beat:e*2,n:Math.floor(e*2),phase:e*2%1,pulse:Math.exp(-(e*2%1)*4.5),bar:Math.floor(e/2)},i.puppet("larry").nod(.05*Math.sin(e*2))},drawFront(e,i,s){const r=Ye.outCubic(se(Gn(.2,1.4,i)));xh(e,640,200,.62,{t:i,align:"center",alpha:r});const a={x:390,y:300,w:500,h:270};e.save(),e.globalAlpha=.75*r,e.fillStyle="#000",e.fillRect(a.x,a.y,a.w,a.h),e.restore();const o=34,l=t.length*40+a.h;mh(e,t,Math.max(0,i-1)*o%l/o,{rect:a,speed:o})}}}const F1={play:'<path d="M7 4.5 L17 10 L7 15.5 Z"/>',pause:'<path d="M6.5 4.5 V15.5 M13.5 4.5 V15.5"/>',restart:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',prev:'<path d="M5 4.5 V15.5"/><path d="M15.5 4.5 L7.5 10 L15.5 15.5 Z"/>',next:'<path d="M15 4.5 V15.5"/><path d="M4.5 4.5 L12.5 10 L4.5 15.5 Z"/>',list:'<path d="M4 6 H16 M4 10 H16 M4 14 H16"/>',cc:'<rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M8.6 8.2 A2 2 0 1 0 8.6 11.8 M14.2 8.2 A2 2 0 1 0 14.2 11.8"/>',full:'<path d="M3.5 8 V3.5 H8 M12 3.5 H16.5 V8 M16.5 12 V16.5 H12 M8 16.5 H3.5 V12"/>'},gi=n=>`<svg viewBox="0 0 20 20" aria-hidden="true">${F1[n]}</svg>`,dc=n=>(n=Math.max(0,n),`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,"0")}`);function O1(n,t){n.innerHTML=`
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
    <button class="ic" data-k="full" title="Fullscreen (f)" aria-label="Fullscreen">${gi("full")}</button>`;const e=M=>n.querySelector(M),i=e("[data-k=play]"),s=e("[data-k=cc]"),r=e("[data-k=list]"),a=e(".seek"),o=e(".seek-fill"),l=e(".seek-title"),c=e(".time"),h=e(".seek-marks"),f=e(".chapters");i.onclick=()=>t.toggle(),e("[data-k=restart]").onclick=()=>t.restart(),e("[data-k=next]").onclick=()=>t.next(),s.onclick=()=>t.captions(),e("[data-k=full]").onclick=()=>t.fullscreen(),r.onclick=M=>{M.stopPropagation(),f.hidden=!f.hidden,r.setAttribute("aria-expanded",String(!f.hidden))},document.addEventListener("click",M=>{!f.hidden&&!n.contains(M.target)&&(f.hidden=!0,r.setAttribute("aria-expanded","false"))});let u=0,p=0;const _=M=>{const v=a.querySelector(".seek-track").getBoundingClientRect(),b=Math.min(1,Math.max(0,(M.clientX-v.left)/v.width));t.seek(p+b*(u-p))};let g=!1;a.addEventListener("pointerdown",M=>{g=!0,a.setPointerCapture(M.pointerId),_(M)}),a.addEventListener("pointermove",M=>g&&_(M)),a.addEventListener("pointerup",()=>g=!1),a.addEventListener("keydown",M=>{(M.key==="ArrowLeft"||M.key==="ArrowRight")&&(M.stopPropagation(),t.seekBy(M.key==="ArrowLeft"?-5:5))});let d="",m=null;return{update(M){M.playing!==m&&(m=M.playing,i.innerHTML=gi(M.playing?"pause":"play"),i.setAttribute("aria-label",M.playing?"Pause":"Play")),s.classList.toggle("on",M.captions),s.setAttribute("aria-pressed",String(M.captions)),u=M.duration,p=M.start;const v=u>p?(M.t-p)/(u-p):0;o.style.width=`${(Math.max(0,Math.min(1,v))*100).toFixed(2)}%`,l.textContent=M.title??"",c.textContent=`${dc(M.t)} / ${dc(u)}`,a.setAttribute("aria-valuemax",String(Math.round(u))),a.setAttribute("aria-valuenow",String(Math.round(M.t))),n.classList.toggle("disabled",!M.enabled);const b=JSON.stringify([M.segments,M.index,M.marks]);if(b!==d){d=b,f.innerHTML="",M.segments.forEach((P,E)=>{const A=document.createElement("li"),z=document.createElement("button");z.innerHTML=`<span class="n">${String(E+1).padStart(2,"0")}</span> ${P.title}`,E===M.index&&z.classList.add("cur"),z.onclick=()=>{f.hidden=!0,t.jump(E)},A.append(z),f.append(A)}),h.innerHTML="";for(const P of M.marks??[]){const E=document.createElement("i");E.style.left=`${((P-p)/(u-p)*100).toFixed(2)}%`,h.append(E)}}}}}const z1=.8;async function B1(n){var q,Y;const t=document.getElementById("stage-wrap"),e=document.getElementById("stage"),i=document.getElementById("overlay"),s=new p1(e,t),r=new Map,a=R1();n.seg&&Ro(n.seg)&&!a.includes(n.seg)&&a.unshift(n.seg);const o=a.map(D=>Ro(D)),l=await Promise.all(a.map((D,X)=>o[X]?Ah(D).catch(ot=>(console.error(ot),null)):null)),c=D=>D.replace(/[-_]+/g," ").replace(/\b\w/g,X=>X.toUpperCase()),h=l.map((D,X)=>{var ot;return(D==null?void 0:D.module.title)??((ot=D==null?void 0:D.cues)==null?void 0:ot.title)??c(a[X])});for(const[D,X]of a.entries())l[D]||console.info(`rundown: ${X} is in production (no segments/${X}/index.js yet) — skipped in playback`);const f=a.map((D,X)=>!!l[X]),u=h.filter((D,X)=>f[X]),p=new Set(l.flatMap(D=>{var X;return D?[...(((X=D.cues)==null?void 0:X.lines)??[]).flatMap(ot=>ot.who),...D.module.cast??[],...D.module.guests??[]]:[]})),_=new y1({muted:!!n.mute});window.__lc={stage:s,transport:_,puppets:r,get show(){return g.show},get state(){return{mode:g.mode,index:g.index,t:g.show?g.t:0,playing:_.isPlaying,wantPlay:g.wantPlay}}};const g={mode:"title",index:0,show:null,t:0,captions:n.captions!=="0",token:0,epoch:-1,loadingMsg:"",loadingSince:0,wantPlay:!0},d=()=>new _s({module:D1(u,Eh),cues:null,tele:null,puppets:r}),m=()=>new _s({module:N1(p),cues:null,tele:null,puppets:r}),M=D=>new _s({module:U1(h[D],D+1),cues:null,tele:null,puppets:r});if(n.freeze){const D=n.seg??"title",X=Number(n.t??0);let ot;if(D==="title")ot=d();else if(D==="end")ot=m();else if(!Ro(D))ot=M(Math.max(0,a.indexOf(D)));else{const ht=await fc(D,{audio:!1});ot=new _s({module:ht.module,cues:ht.cues,tele:ht.tele,puppets:r});try{(Y=(q=ht.module).setup)==null||Y.call(q,ot)}catch(B){console.error(B)}}const W=1/60,Q=Math.max(0,X-2.5);for(let ht=Q;ht<X-1e-6;ht+=W)ot.frame(ht,W,{full:!0});ot.frame(X,W,{full:!0}),s.draw(ot,v()),await new Promise(ht=>requestAnimationFrame(ht)),s.draw(ot,v()),window.__ready=!0,document.body.dataset.ready="1";return}function v(D={}){return{captions:g.captions,...D}}function b(){if(g.mode==="title"||g.mode==="end")return y();if(g.mode==="loading"){g.wantPlay=!g.wantPlay;return}g.mode==="play"&&(g.wantPlay=!_.isPlaying,_.toggle())}const P=O1(document.getElementById("bar"),{toggle:b,restart:()=>g.mode==="play"&&(_.seek(0),g.wantPlay=!0,_.play()),next:()=>g.mode==="play"&&T(g.index+1),seek:D=>g.mode==="play"&&_.seek(D),seekBy:D=>g.mode==="play"&&_.seek(_.time()+D),jump:D=>g.mode==="title"||g.mode==="end"?y(D):T(D),captions:()=>g.captions=!g.captions,fullscreen:z});function E(D,X,ot,W){const Q=document.createElement("button");return Q.className=`stage-btn ${X}`,Q.innerHTML=`<span>${D}</span>`,Q.style.left=`${W.x/1280*100}%`,Q.style.top=`${W.y/720*100}%`,Q.onclick=ht=>{ht.stopPropagation(),ot()},i.append(Q),Q}function A(){const D=s.css;D&&Object.assign(i.style,{left:D.x+"px",top:D.y+"px",width:D.w+"px",height:D.h+"px",fontSize:`${D.w/1280*16}px`})}function z(){var X,ot;const D=document.getElementById("app");document.fullscreenElement?(X=document.exitFullscreen)==null||X.call(document):(ot=D.requestFullscreen)==null||ot.call(D).catch(()=>{})}async function y(D=n.seg?Math.max(0,a.indexOf(n.seg)):f.indexOf(!0)>=0?f.indexOf(!0):0){if(_.unlock(),i.replaceChildren(),g.wantPlay=!0,!a.length)return L();await nt(D)}function T(D){if(D<0&&(D=0),g.wantPlay=!0,D>=a.length)return L();nt(D)}const O=new Map;function K(D){if(!O.has(D)){const X=(async()=>{const ot=await fc(a[D],{audio:!_.muted});let W=null;if(ot.bytes&&!_.muted)try{W=await _.decode(ot.bytes)}catch(Q){console.warn(`segment ${a[D]}: audio would not decode (${Q.message}); playing silent`)}return{d:ot,buffer:W}})();X.catch(()=>O.delete(D)),O.set(D,X)}return O.get(D)}async function nt(D){var ot,W;const X=++g.token;if(_.pause(),g.index=D,g.mode="loading",g.loadingMsg=h[D],g.loadingSince=performance.now(),!f[D]){const Q=M(D);_.load({buffer:null,duration:2.6}),g.show=Q,g.mode="play",g.epoch=-1,g.wantPlay&&_.play();return}try{const{d:Q,buffer:ht}=await K(D);if(X!==g.token)return;const B=new _s({module:Q.module,cues:Q.cues,tele:Q.tele,puppets:r});B.captions=g.captions;try{(W=(ot=Q.module).setup)==null||W.call(ot,B)}catch(G){console.error(G)}_.load({buffer:ht,duration:B.duration,audioLead:C1(Q.cues,ht)}),g.show=B,g.mode="play",g.epoch=-1,g.wantPlay&&_.play();for(const G of O.keys())G!==D&&G!==D+1&&O.delete(G);f[D+1]&&K(D+1).catch(()=>{})}catch(Q){if(console.error(Q),X!==g.token)return;g.loadingMsg=`COULD NOT LOAD ${h[D]}: ${Q.message}`,g.loadingSince=-1/0}}function L(){g.token++,_.pause(),g.mode="end",g.show=m(),g.t0=performance.now(),i.replaceChildren(),E("WATCH AGAIN","again",()=>y(),{x:640,y:640})}function I(){g.mode="title",g.show=d(),g.t0=performance.now()-2e3,i.replaceChildren(),E("START THE SHOW","start",()=>y(),{x:96,y:640})}window.addEventListener("keydown",D=>{if(D.target instanceof HTMLInputElement||D.metaKey||D.ctrlKey||D.altKey)return;const X=D.key;if(X===" "||X==="k")D.preventDefault(),D.repeat||b();else if(X==="ArrowLeft"||X==="ArrowRight"){if(g.mode!=="play")return;D.preventDefault(),_.seek(_.time()+(X==="ArrowLeft"?-5:5))}else X==="n"?g.mode==="play"?T(g.index+1):g.mode==="title"&&y():X==="p"?g.mode==="play"?_.time()>3?_.seek(0):T(g.index-1):g.mode==="end"&&y(a.length-1):X==="c"?g.captions=!g.captions:X==="f"&&z()}),e.addEventListener("click",()=>g.mode==="play"&&b());let N=performance.now();function V(D){requestAnimationFrame(V);const X=Math.min(.05,Math.max(.001,(D-N)/1e3));N=D;const ot=performance.now();A();let W=g.show,Q=0,ht={};g.mode==="play"?(Q=_.time(),_.epoch!==g.epoch&&(g.epoch=_.epoch,W.resetMotion()),_.ended&&(_.ended=!1,g.index+1<a.length?nt(g.index+1):L())):g.mode==="loading"?(Q=g.t,D-g.loadingSince>z1*1e3&&(ht.overlay=B=>k1(B,g.loadingMsg,D/1e3)),W||(W=g.show=d())):Q=(D-g.t0)/1e3,g.t=Q,W.captions=g.captions,W.frame(Q,X,{light:s.stats.ms>14,paused:g.mode==="play"&&!_.isPlaying}),s.draw(W,v(ht)),s.budget(performance.now()-ot),P.update({playing:g.mode==="play"?_.isPlaying:g.mode==="loading"&&g.wantPlay,t:g.mode==="play"?Math.max(0,Q):0,start:0,duration:g.mode==="play"?_.duration:0,title:g.mode==="play"||g.mode==="loading"?`${String(g.index+1).padStart(2,"0")} · ${h[g.index]}`:g.mode==="end"?"THAT’S THE SHOW":"THE LATE CLUSTER",index:g.mode==="play"?g.index:-1,segments:a.map((B,G)=>({id:B,title:h[G]+(f[G]?"":" · in production")})),captions:g.captions,enabled:!0,marks:[]})}n.autostart?(g.show=d(),g.t0=performance.now(),y()):I(),requestAnimationFrame(V)}function k1(n,t,e){n.save(),n.globalAlpha=.85,n.fillStyle="#000",n.fillRect(390,300,500,110),n.restore(),vt(n,"COMING UP",640,336,{size:14,align:"center",color:x.sky,ls:.5}),vt(n,String(t??"").toUpperCase(),640,372,{size:24,align:"center",color:x.white,ls:.2});const i=Math.floor(e*3)%4;vt(n,"·".repeat(i+1),640,398,{size:22,align:"center",color:x.gold})}const G1=Object.freeze(Object.defineProperty({__proto__:null,startApp:B1},Symbol.toStringTag,{value:"Module"}));export{Ao as E,G1 as a,F_ as b,hh as h,xh as l};
