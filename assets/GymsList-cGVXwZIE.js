import{E as f}from"./ErrorGetData-W0eNNQN3.js";import{u as g,i as y,M as h}from"./apiMap-MHyzWRGj.js";import{d as b,j as C,F as G,c as w,a as d,b as i,u as A,C as k,f as E,o as l,L as S,_ as j}from"./index-UuHOVMQ-.js";import{g as v,b as x}from"./api-yE4gVfV1.js";import{u as L}from"./errorsStore-f2y3RgbJ.js";const M={class:"gyms"},N={class:"gyms__logo-container"},B={class:"gyms__container"},D="b9792c26-9b3a-42d8-a4f6-5160e8801ffc",P=b({__name:"GymsList",setup(V){const r=g(),a=C(),c=L(),m=`${x}api/coach/addresses`,p=async o=>{try{const s=`https://geocode-maps.yandex.ru/1.x/?apikey=${D}&format=json&geocode=${o}`,e=await fetch(s);if(e.ok){const n=(await e.json()).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");return[Number(n[1]),Number(n[0])]}}catch{console.log("Ошибка при получении координат по адресу:",o)}},_=async()=>{try{const o=r.address,s=[];for(let e of o){const t=await p(e);t!==void 0&&s.push(t)}return s}catch(o){console.log("Ошибка при получении координат:",o)}},u=async()=>{try{const o=await v(m);r.address=o.addresses;const s=await _();y(s)}catch{c.showAndHideGettingDataError()}};return G(async()=>{a.loading=!0,await u(),a.loading=!1}),(o,s)=>(l(),w("div",M,[d("div",N,[i(S,{class:"gyms__logo"})]),d("div",B,[i(h)]),A(c).errorGettingData?(l(),k(f,{key:0})):E("",!0)]))}}),K=j(P,[["__scopeId","data-v-a87d607c"]]);export{K as default};
