import{h as d,l as e}from"./index-UuHOVMQ-.js";const m=d("errors",()=>{const r=e(!1),l=()=>(r.value=!0,setTimeout(()=>{r.value=!1},5e3)),a=e(!1),u=e(!1),o={errorPhone:{errorText:"Пользователь с таким номером телефона уже существует",errorValue:a},errorEmail:{errorText:"Пользователь с такой почтой уже существует",errorValue:u}},i=c=>{for(let v in o){const s=o[v];if(s.errorText===c)return s.errorValue.value=!0,setTimeout(()=>{s.errorValue.value=!1},5e3)}return setTimeout(()=>{},0)},n=e(!1),f=()=>(n.value=!0,setTimeout(()=>{r.value=!1},5e3)),t=e(!1);return{errorAuth:r,showAndHideAuthError:l,registerErrors:o,showAndHideRegError:i,errorPhoneReg:a,errorEmailReg:u,errorGettingData:n,showAndHideGettingDataError:f,errorLeaveLike:t,showAndHideLeaveLikeError:()=>(t.value=!0,setTimeout(()=>{t.value=!1},3e3))}});export{m as u};
