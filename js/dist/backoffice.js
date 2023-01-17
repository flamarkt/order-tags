(()=>{var t={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return t.d(e,{a:e}),e},d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o),t.d(o,{backoffice:()=>_,common:()=>G});const e=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{}).app;var n=t.n(e);const r=flarum.core.compat["common/extend"],i=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/ActiveLinkButton"];var a=t.n(i);const s=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/BackofficeNav"];var c=t.n(s);function u(t,o){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},u(t,o)}function l(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,u(t,o)}const f=flarum.core.compat["common/components/Page"];var d=t.n(f);const p=flarum.core.compat["common/components/LinkButton"];var g=t.n(p);const h=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["states/AbstractListState"];var y=function(t){function o(){return t.apply(this,arguments)||this}return l(o,t),o.prototype.type=function(){return"flamarkt/order-tags"},o}(t.n(h)());const b=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/AbstractList"];var v=function(t){function o(){return t.apply(this,arguments)||this}l(o,t);var e=o.prototype;return e.head=function(){var o=t.prototype.head.call(this);return o.add("name",m("th","Name")),o},e.columns=function(o){var e=t.prototype.columns.call(this,o);return e.add("name",m("td",o.name()),10),e},e.actions=function(o){var e=t.prototype.actions.call(this,o);return e.add("edit",g().component({className:"Button Button--icon",icon:"fas fa-pen",href:n().route("orderTags.show",{id:o.id()})})),e},o}(t.n(b)()),k=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(o=t.call.apply(t,[this].concat(n))||this).listState=void 0,o}l(o,t);var e=o.prototype;return e.oninit=function(o){t.prototype.oninit.call(this,o),this.listState=new y,this.listState.refresh()},e.view=function(){return m(".OrderTagIndexPage",m(".container",[m(".Form-group",[g().component({className:"Button",href:n().route("orderTags.show",{id:"new"})},"New tag")]),m(v,{state:this.listState})]))},o}(d());const C=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["pages/AbstractShowPage"];var w=t.n(C);const x=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SubmitButton"];var T=t.n(x);const S=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/RichTextInput"];var P=t.n(S);const j=flarum.core.compat["common/components/LoadingIndicator"];var F=t.n(j);const M=flarum.core.compat["common/components/Switch"];var O=t.n(M);const L=flarum.core.compat["common/utils/ItemList"];var A=t.n(L),N=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(o=t.call.apply(t,[this].concat(n))||this).tag=null,o.dirty=!1,o.saving=!1,o.slug="",o.name="",o.description="",o.icon="",o.color="",o.isPrimary=!1,o.visibleCustomer=!1,o.notifyCustomer=!1,o.notifySubject="",o.notifyMessage="",o}l(o,t);var e=o.prototype;return e.newRecord=function(){return n().store.createRecord("flamarkt-order-tags")},e.findType=function(){return"flamarkt/order-tags"},e.show=function(t){this.tag=t,this.slug=t.slug()||"",this.name=t.name()||"",this.description=t.description()||"",this.icon=t.icon()||"",this.color=t.color()||"",this.isPrimary=!!t.isPrimary(),this.visibleCustomer=!!t.visibleCustomer(),this.notifyCustomer=!!t.notifyCustomer(),this.notifySubject=t.notifySubject()||"",this.notifyMessage=t.notifyMessage()||"",n().setTitle(t.name()),n().setTitleCount(0)},e.view=function(){return this.tag?m("form.OrderTagShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container",this.fields().toArray())):F().component()},e.fields=function(){var t=this,o=new(A());return o.add("slug",m(".Form-group",[m("label","Slug"),m("input.FormControl",{type:"text",value:this.slug,oninput:function(o){t.slug=o.target.value,t.dirty=!0},disabled:this.saving})])),o.add("name",m(".Form-group",[m("label","Name"),m("input.FormControl",{type:"text",value:this.name,oninput:function(o){t.name=o.target.value,t.dirty=!0},disabled:this.saving})])),o.add("description",m(".Form-group",[m("label","Description"),m(P(),{value:this.description,onchange:function(o){t.description=o,t.dirty=!0,m.redraw()},disabled:this.saving})])),o.add("icon",m(".Form-group",[m("label","Icon"),m("input.FormControl",{type:"text",value:this.icon,oninput:function(o){t.icon=o.target.value,t.dirty=!0},disabled:this.saving})])),o.add("color",m(".Form-group",[m("label","Color"),m("input.FormControl",{type:"text",value:this.color,oninput:function(o){t.color=o.target.value,t.dirty=!0},disabled:this.saving})])),o.add("isPrimary",m(".Form-group",[O().component({state:this.isPrimary,onchange:function(o){t.isPrimary=o,t.dirty=!0},disabled:this.saving},"Primary tag")])),o.add("visibleCustomer",m(".Form-group",[O().component({state:this.visibleCustomer,onchange:function(o){t.visibleCustomer=o,t.dirty=!0},disabled:this.saving},"Visible to customer")])),o.add("notifyCustomer",m(".Form-group",[O().component({state:this.notifyCustomer,onchange:function(o){t.notifyCustomer=o,t.dirty=!0},disabled:this.saving},"Notify customer when added")])),o.add("notifySubject",m(".Form-group",[m("label","Notification Subject"),m("input.FormControl",{type:"text",value:this.notifySubject,oninput:function(o){t.notifySubject=o.target.value,t.dirty=!0},disabled:this.saving||!this.notifyCustomer&&!this.notifySubject})])),o.add("notifyMessage",m(".Form-group",[m("label","Notification Message"),m(P(),{value:this.notifyMessage,onchange:function(o){t.notifyMessage=o,t.dirty=!0,m.redraw()},disabled:this.saving||!this.notifyCustomer&&!this.notifyMessage})])),o.add("submit",m(".Form-group",[T().component({loading:this.saving,dirty:this.dirty,exists:this.tag.exists})]),-10),o},e.data=function(){return{slug:this.slug,name:this.name,description:this.description,icon:this.icon,color:this.color,isPrimary:this.isPrimary,visibleCustomer:this.visibleCustomer,notifyCustomer:this.notifyCustomer,notifySubject:this.notifySubject,notifyMessage:this.notifyMessage}},e.onsubmit=function(t){var o=this;t.preventDefault(),this.saving=!0,this.tag.save(this.data()).then((function(t){o.tag=t,o.saving=!1,o.dirty=!1,m.redraw(),m.route.set(n().route("orderTags.show",{id:t.id()}))})).catch((function(t){o.saving=!1,m.redraw()}))},o}(w()),_={"components/TagList":v,"pages/TagIndexPage":k,"pages/TagShowPage":N,"states/TagListState":y};const B=flarum.core.compat["common/Component"];var I=t.n(B);const R=flarum.core.compat["common/helpers/icon"];var D=t.n(R),H=function(t){function o(){return t.apply(this,arguments)||this}return l(o,t),o.prototype.view=function(){var t=this.attrs.orderTag.icon(),o=this.attrs.orderTag.color();return m("span.FlamarktOrderTagLabel",o?{className:"colored",style:{"--tag-bg":o}}:{},[t?[D()(t)," "]:null,this.attrs.orderTag.name()])},o}(I()),q=function(t){function o(){return t.apply(this,arguments)||this}return l(o,t),o.prototype.view=function(){return(this.attrs.orderTags||[]).map((function(t){return t?m(H,{orderTag:t}):null}))},o}(I());const z=flarum.core.compat["common/Model"];var E=t.n(z),V=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(o=t.call.apply(t,[this].concat(n))||this).slug=E().attribute("slug"),o.name=E().attribute("name"),o.description=E().attribute("description"),o.descriptionHtml=E().attribute("descriptionHtml"),o.icon=E().attribute("icon"),o.color=E().attribute("color"),o.isPrimary=E().attribute("isPrimary"),o.visibleCustomer=E().attribute("visibleCustomer"),o.notifyCustomer=E().attribute("notifyCustomer"),o.notifySubject=E().attribute("notifySubject"),o.notifyMessage=E().attribute("notifyMessage"),o}return l(o,t),o.prototype.apiEndpoint=function(){return"/flamarkt/order-tags"+(this.exists?"/"+this.data.id:"")},o}(E()),G={"components/TagLabel":H,"components/TagLabels":q,"models/Tag":V};const J=flarum.core.compat["common/app"];var K=t.n(J);const Q=((flarum.extensions["flamarkt-core"]||{}).common||{})["models/Order"];var U=t.n(Q);const W=((flarum.extensions["flamarkt-core"]||{}).backoffice||{})["components/OrderList"];var X=t.n(W);const Y=((flarum.extensions["flamarkt-core"]||{}).backoffice||{})["pages/OrderShowPage"];var Z=t.n(Y);const $=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/AbstractRelationshipSelect"];var tt=t.n($);const ot=flarum.core.compat["common/helpers/highlight"];var et=t.n(ot),nt=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(o=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,o}l(o,t);var e=o.prototype;return e.search=function(t){var o=this;return t?n().store.find("flamarkt/order-tags",{filter:{q:t},page:{limit:5}}).then((function(e){o.resultsCache.set(t,e),m.redraw()})):(m.redraw(),Promise.resolve())},e.results=function(t){if(!t)return[];t=t.toLowerCase();var o=this.resultsCache.get(t);return void 0===o?null:(o||[]).concat(n().store.all("flamarkt-order-tags").filter((function(o){return o.name().toLowerCase().substr(0,t.length)===t}))).filter((function(t,o,e){return e.lastIndexOf(t)===o})).sort((function(t,o){return t.name().localeCompare(o.name())}))},e.item=function(t,o){var e=t.icon();return[e?[D()(e)," "]:null,o?et()(t.name(),o):t.name()]},o}(tt());n().initializers.add("flamarkt-order-tags",(function(){K().store.models["flamarkt-order-tags"]=V,U().prototype.tags=E().hasMany("tags"),(0,r.extend)(X().prototype,"head",(function(t){t.add("tags",m("th","Tags"),60)})),(0,r.extend)(X().prototype,"columns",(function(t,o){t.add("tags",m("td",q.component({orderTags:o.tags()})),60)})),(0,r.extend)(Z().prototype,"show",(function(){var t=this.order.tags();this.tags=Array.isArray(t)?t.filter((function(t){return void 0!==t})):[]})),(0,r.extend)(Z().prototype,"fields",(function(t){var o=this;t.add("tags",m(".Form-group",[m("label","Tags"),nt.component({relationship:this.tags,onchange:function(t){o.tags=t,o.dirty=!0}})]))})),(0,r.extend)(Z().prototype,"data",(function(t){t.relationships=t.relationships||{},t.relationships.tags=this.tags})),n().routes["orderTags.index"]={path:"/order-tags",component:k},n().routes["orderTags.show"]={path:"/order-tags/:id",component:N},(0,r.extend)(c().prototype,"items",(function(t){t.add("order-tags",a().component({href:n().route("orderTags.index"),icon:"fas fa-tag",activeRoutes:["orderTags.*"]},"Order Tags"))}))}))})(),module.exports=o})();
//# sourceMappingURL=backoffice.js.map