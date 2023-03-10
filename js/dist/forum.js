(()=>{var t={n:r=>{var o=r&&r.__esModule?()=>r.default:()=>r;return t.d(o,{a:o}),o},d:(r,o)=>{for(var e in o)t.o(o,e)&&!t.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:o[e]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};(()=>{"use strict";t.r(r),t.d(r,{common:()=>b,forum:()=>n});const o=flarum.core.compat["forum/app"];var e=t.n(o),n={};function a(t,r){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},a(t,r)}function s(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,a(t,r)}const i=flarum.core.compat["common/Component"];var c=t.n(i);const u=flarum.core.compat["common/helpers/icon"];var l=t.n(u),p=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.view=function(){var t=this.attrs.orderTag.icon(),r=this.attrs.orderTag.color();return m("span.FlamarktOrderTagLabel",r?{className:"colored",style:{"--tag-bg":r}}:{},[t?[l()(t)," "]:null,this.attrs.orderTag.name()])},r}(c()),d=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.view=function(){return(this.attrs.orderTags||[]).map((function(t){return t?m(p,{orderTag:t}):null}))},r}(c());const f=flarum.core.compat["common/Model"];var y=t.n(f),g=function(t){function r(){for(var r,o=arguments.length,e=new Array(o),n=0;n<o;n++)e[n]=arguments[n];return(r=t.call.apply(t,[this].concat(e))||this).slug=y().attribute("slug"),r.name=y().attribute("name"),r.description=y().attribute("description"),r.descriptionHtml=y().attribute("descriptionHtml"),r.icon=y().attribute("icon"),r.color=y().attribute("color"),r.isPrimary=y().attribute("isPrimary"),r.visibleCustomer=y().attribute("visibleCustomer"),r.notifyCustomer=y().attribute("notifyCustomer"),r.notifySubject=y().attribute("notifySubject"),r.notifyMessage=y().attribute("notifyMessage"),r}return s(r,t),r.prototype.apiEndpoint=function(){return"/flamarkt/order-tags"+(this.exists?"/"+this.data.id:"")},r}(y()),b={"components/TagLabel":p,"components/TagLabels":d,"models/Tag":g};const h=flarum.core.compat["common/app"];var v=t.n(h);const O=((flarum.extensions["flamarkt-core"]||{}).common||{})["models/Order"];var T=t.n(O);const x=flarum.core.compat["common/extend"],j=((flarum.extensions["flamarkt-core"]||{}).forum||{})["layouts/OrderIndexLayout"];var k=t.n(j);const S=((flarum.extensions["flamarkt-core"]||{}).forum||{})["components/OrderFact"];var P=t.n(S);const _=((flarum.extensions["flamarkt-core"]||{}).forum||{})["components/OrderFacts"];var w=t.n(_);e().initializers.add("flamarkt-order-tags",(function(){v().store.models["flamarkt-order-tags"]=g,T().prototype.tags=y().hasMany("tags"),(0,x.extend)(k().prototype,"headerRow",(function(t){t.add("tags",m("th","Status"),50)})),(0,x.extend)(k().prototype,"orderRow",(function(t,r){t.add("tags",m("td",d.component({orderTags:r.tags()})),50)})),(0,x.extend)(w().prototype,"items",(function(t){t.add("tags",m(P(),{title:"Status",className:"FlamarktOrderFact--tags"},this.wrapContent(d.component({orderTags:this.attrs.order.tags()}))),150)}))}))})(),module.exports=r})();
//# sourceMappingURL=forum.js.map