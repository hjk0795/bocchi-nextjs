(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{9535:function(e,t,n){"use strict";var r=n(4836);t.Z=void 0;!function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var i=a?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(r,s,i):r[s]=e[s]}r.default=e,n&&n.set(e,r)}(n(7294));var a=r(n(4938)),s=n(5893);function o(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}var i=(0,a.default)((0,s.jsx)("path",{d:"M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"}),"Google");t.Z=i},4938:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(429)},429:function(e,t,n){"use strict";n.r(t),n.d(t,{capitalize:function(){return a.Z},createChainedFunction:function(){return s},createSvgIcon:function(){return o.Z},debounce:function(){return i},deprecatedPropType:function(){return l},isMuiElement:function(){return u},ownerDocument:function(){return f},ownerWindow:function(){return m},requirePropFactory:function(){return p},setRef:function(){return v},unstable_ClassNameGenerator:function(){return j},unstable_useEnhancedEffect:function(){return h},unstable_useId:function(){return b.Z},unsupportedProp:function(){return x},useControlled:function(){return y.Z},useEventCallback:function(){return w.Z},useForkRef:function(){return N.Z},useIsFocusVisible:function(){return g.Z}});var r=n(7078),a=n(6622);var s=function(...e){return e.reduce(((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)}),(()=>{}))},o=n(8175);var i=function(e,t=166){let n;function r(...r){clearTimeout(n),n=setTimeout((()=>{e.apply(this,r)}),t)}return r.clear=()=>{clearTimeout(n)},r};var l=function(e,t){return()=>null},c=n(7294);var u=function(e,t){return c.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)};function d(e){return e&&e.ownerDocument||document}var f=d;var m=function(e){return d(e).defaultView||window};n(7462);var p=function(e,t){return()=>null},v=n(7960).Z,h=n(6600).Z,b=n(3198);var x=function(e,t,n,r,a){return null},y=n(4591),w=n(6875),N=n(8155),g=n(1625);const j={configure:e=>{console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join("\n")),r.Z.configure(e)}}},6429:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return n(1290)}])},1290:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return J}});var r=n(5893),a=n(7294),s=n(4184),o=n.n(s),i=n(861),l=n(6792);const c=a.forwardRef((({as:e,bsPrefix:t,variant:n,size:a,active:s,className:c,...u},d)=>{const f=(0,l.vE)(t,"btn"),[m,{tagName:p}]=(0,i.FT)({tagName:e,...u}),v=p;return(0,r.jsx)(v,{...m,...u,ref:d,className:o()(c,f,s&&"active",n&&`${f}-${n}`,a&&`${f}-${a}`,u.href&&u.disabled&&"disabled")})}));c.displayName="Button",c.defaultProps={variant:"primary",active:!1,disabled:!1};var u=c,d=n(5697),f=n.n(d);const m={type:f().string,tooltip:f().bool,as:f().elementType},p=a.forwardRef((({as:e="div",className:t,type:n="valid",tooltip:a=!1,...s},i)=>(0,r.jsx)(e,{...s,ref:i,className:o()(t,`${n}-${a?"tooltip":"feedback"}`)})));p.displayName="Feedback",p.propTypes=m;var v=p;var h=a.createContext({});const b=a.forwardRef((({id:e,bsPrefix:t,className:n,type:s="checkbox",isValid:i=!1,isInvalid:c=!1,as:u="input",...d},f)=>{const{controlId:m}=(0,a.useContext)(h);return t=(0,l.vE)(t,"form-check-input"),(0,r.jsx)(u,{...d,ref:f,type:s,id:e||m,className:o()(n,t,i&&"is-valid",c&&"is-invalid")})}));b.displayName="FormCheckInput";var x=b;const y=a.forwardRef((({bsPrefix:e,className:t,htmlFor:n,...s},i)=>{const{controlId:c}=(0,a.useContext)(h);return e=(0,l.vE)(e,"form-check-label"),(0,r.jsx)("label",{...s,ref:i,htmlFor:n||c,className:o()(t,e)})}));y.displayName="FormCheckLabel";var w=y,N=n(3439);const g=a.forwardRef((({id:e,bsPrefix:t,bsSwitchPrefix:n,inline:s=!1,reverse:i=!1,disabled:c=!1,isValid:u=!1,isInvalid:d=!1,feedbackTooltip:f=!1,feedback:m,feedbackType:p,className:b,style:y,title:g="",type:j="checkbox",label:C,children:P,as:k="input",...F},I)=>{t=(0,l.vE)(t,"form-check"),n=(0,l.vE)(n,"form-switch");const{controlId:_}=(0,a.useContext)(h),E=(0,a.useMemo)((()=>({controlId:e||_})),[_,e]),$=!P&&null!=C&&!1!==C||(0,N.XW)(P,w),R=(0,r.jsx)(x,{...F,type:"switch"===j?"checkbox":j,ref:I,isValid:u,isInvalid:d,disabled:c,as:k});return(0,r.jsx)(h.Provider,{value:E,children:(0,r.jsx)("div",{style:y,className:o()(b,$&&t,s&&`${t}-inline`,i&&`${t}-reverse`,"switch"===j&&n),children:P||(0,r.jsxs)(r.Fragment,{children:[R,$&&(0,r.jsx)(w,{title:g,children:C}),m&&(0,r.jsx)(v,{type:p,tooltip:f,children:m})]})})})}));g.displayName="FormCheck";var j=Object.assign(g,{Input:x,Label:w});n(2473);const C=a.forwardRef((({bsPrefix:e,type:t,size:n,htmlSize:s,id:i,className:c,isValid:u=!1,isInvalid:d=!1,plaintext:f,readOnly:m,as:p="input",...v},b)=>{const{controlId:x}=(0,a.useContext)(h);let y;return e=(0,l.vE)(e,"form-control"),y=f?{[`${e}-plaintext`]:!0}:{[e]:!0,[`${e}-${n}`]:n},(0,r.jsx)(p,{...v,type:t,size:s,ref:b,readOnly:m,id:i||x,className:o()(c,y,u&&"is-valid",d&&"is-invalid","color"===t&&`${e}-color`)})}));C.displayName="FormControl";var P=Object.assign(C,{Feedback:v}),k=(0,n(6611).Z)("form-floating");const F=a.forwardRef((({controlId:e,as:t="div",...n},s)=>{const o=(0,a.useMemo)((()=>({controlId:e})),[e]);return(0,r.jsx)(h.Provider,{value:o,children:(0,r.jsx)(t,{...n,ref:s})})}));F.displayName="FormGroup";var I=F,_=n(1555);const E=a.forwardRef((({as:e="label",bsPrefix:t,column:n,visuallyHidden:s,className:i,htmlFor:c,...u},d)=>{const{controlId:f}=(0,a.useContext)(h);t=(0,l.vE)(t,"form-label");let m="col-form-label";"string"===typeof n&&(m=`${m} ${m}-${n}`);const p=o()(i,t,s&&"visually-hidden",n&&m);return c=c||f,n?(0,r.jsx)(_.Z,{ref:d,as:"label",className:p,htmlFor:c,...u}):(0,r.jsx)(e,{ref:d,className:p,htmlFor:c,...u})}));E.displayName="FormLabel",E.defaultProps={column:!1,visuallyHidden:!1};var $=E;const R=a.forwardRef((({bsPrefix:e,className:t,id:n,...s},i)=>{const{controlId:c}=(0,a.useContext)(h);return e=(0,l.vE)(e,"form-range"),(0,r.jsx)("input",{...s,type:"range",ref:i,className:o()(t,e),id:n||c})}));R.displayName="FormRange";var O=R;const T=a.forwardRef((({bsPrefix:e,size:t,htmlSize:n,className:s,isValid:i=!1,isInvalid:c=!1,id:u,...d},f)=>{const{controlId:m}=(0,a.useContext)(h);return e=(0,l.vE)(e,"form-select"),(0,r.jsx)("select",{...d,size:n,ref:f,className:o()(s,e,t&&`${e}-${t}`,i&&"is-valid",c&&"is-invalid"),id:u||m})}));T.displayName="FormSelect";var S=T;const Z=a.forwardRef((({bsPrefix:e,className:t,as:n="small",muted:a,...s},i)=>(e=(0,l.vE)(e,"form-text"),(0,r.jsx)(n,{...s,ref:i,className:o()(t,e,a&&"text-muted")}))));Z.displayName="FormText";var L=Z;const G=a.forwardRef(((e,t)=>(0,r.jsx)(j,{...e,ref:t,type:"switch"})));G.displayName="Switch";var z=Object.assign(G,{Input:j.Input,Label:j.Label});const M=a.forwardRef((({bsPrefix:e,className:t,children:n,controlId:a,label:s,...i},c)=>(e=(0,l.vE)(e,"form-floating"),(0,r.jsxs)(I,{ref:c,className:o()(t,e),controlId:a,...i,children:[n,(0,r.jsx)("label",{htmlFor:a,children:s})]}))));M.displayName="FloatingLabel";var V=M;const W={_ref:f().any,validated:f().bool,as:f().elementType},B=a.forwardRef((({className:e,validated:t,as:n="form",...a},s)=>(0,r.jsx)(n,{...a,ref:s,className:o()(e,t&&"was-validated")})));B.displayName="Form",B.propTypes=W;var D=Object.assign(B,{Group:I,Control:P,Floating:k,Check:j,Switch:z,Label:$,Text:L,Range:O,Select:S,FloatingLabel:V}),q=n(4678),X=n.n(q);function H(){var e=function(e){var t=e.target,n=t.name,r=t.value;l((function(e){return"email"===n?{email:r,password:e.password}:"password"===n?{email:e.email,password:r}:void 0}))},t=(0,a.useState)(!0),n=t[0],s=t[1],o=(0,a.useState)({email:"",password:""}),i=o[0],l=o[1],c=(0,a.useState)(""),d=c[0],f=c[1];return(0,r.jsx)("div",{children:(0,r.jsxs)(D,{action:n?"/api/login":"/api/signup",method:"post",children:[(0,r.jsxs)(D.Group,{className:"mb-3",controlId:"formBasicEmail",children:[(0,r.jsx)(D.Label,{children:"Email address"}),(0,r.jsx)(D.Control,{name:"email",type:"email",placeholder:"Enter email",onChange:e,value:i.email,required:!0})]}),(0,r.jsxs)(D.Group,{className:"mb-3",controlId:"formBasicPassword",children:[(0,r.jsx)(D.Label,{children:"Password"}),(0,r.jsx)(D.Control,{name:"password",type:"password",placeholder:"Password",onChange:e,value:i.password,required:!0})]}),(0,r.jsxs)(D.Group,{className:"mb-3",controlId:"formBasicPassword",style:n?{display:"none"}:{display:"block"},children:[(0,r.jsx)(D.Label,{children:"Confirm Password"}),(0,r.jsx)(D.Control,{name:"confirmPassword",type:"password",placeholder:"Confirm Password",onChange:function(e){f(e.target.value)},value:d})]}),(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,r.jsx)(u,{variant:"primary",type:"submit",name:n?"Login":"Signup",disabled:i.password!==d&&!0!==n,children:n?"Login":"Signup"}),(0,r.jsx)(D.Text,{className:"text-muted ".concat(X().notRegistered),onClick:function(){return s(!n)},children:"Not registered?"})]})]})})}var U=n(3299),K=n(193),Y=n.n(K),A=n(9535);function J(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));return(0,U.useSession)().data?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("button",{onClick:function(){return(0,U.signOut)()},children:"Sign out"})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:Y().container,children:[(0,r.jsx)(H,{}),(0,r.jsx)("div",{children:(0,r.jsxs)("button",{style:{marginTop:"2rem"},class:"btn btn-outline-dark",onClick:function(){(0,U.signIn)("google",{callbackUrl:"http://localhost:3000/dashboard"})},children:[(0,r.jsx)(A.Z,{})," Sign in with Google"]})})]})})}},4678:function(e){e.exports={notRegistered:"loginForm_notRegistered__7R8k5"}},193:function(e){e.exports={container:"login_container__PKLw_"}},1555:function(e,t,n){"use strict";var r=n(4184),a=n.n(r),s=n(7294),o=n(6792),i=n(5893);const l=s.forwardRef(((e,t)=>{const[{className:n,...r},{as:s="div",bsPrefix:l,spans:c}]=function({as:e,bsPrefix:t,className:n,...r}){t=(0,o.vE)(t,"col");const s=(0,o.pi)(),i=(0,o.zG)(),l=[],c=[];return s.forEach((e=>{const n=r[e];let a,s,o;delete r[e],"object"===typeof n&&null!=n?({span:a,offset:s,order:o}=n):a=n;const u=e!==i?`-${e}`:"";a&&l.push(!0===a?`${t}${u}`:`${t}${u}-${a}`),null!=o&&c.push(`order${u}-${o}`),null!=s&&c.push(`offset${u}-${s}`)})),[{...r,className:a()(n,...l,...c)},{as:e,bsPrefix:t,spans:l}]}(e);return(0,i.jsx)(s,{...r,ref:t,className:a()(n,!c.length&&l)})}));l.displayName="Col",t.Z=l},2473:function(e){"use strict";var t=function(){};e.exports=t}},function(e){e.O(0,[597,774,888,179],(function(){return t=6429,e(e.s=t);var t}));var t=e.O();_N_E=t}]);