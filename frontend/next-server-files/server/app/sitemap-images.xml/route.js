"use strict";(()=>{var e={};e.id=5045,e.ids=[5045],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35663:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>u,patchFetch:()=>d,requestAsyncStorage:()=>g,routeModule:()=>n,serverHooks:()=>p,staticGenerationAsyncStorage:()=>c});var i={};a.r(i),a.d(i,{GET:()=>m});var o=a(49303),r=a(88716),l=a(60670),s=a(87070);async function m(){let e="https://lexalifestyle.com",t="https://health-check-deploy-3.preview.emergentagent.com",a=[];try{let e=await fetch(`${t}/api/projects`,{cache:"no-store"});if(e.ok){let t=await e.json();a=Array.isArray(t)?t:t.projects||[]}}catch(e){}let i=[];try{let e=await fetch(`${t}/api/brands`,{cache:"no-store"});e.ok&&(i=await e.json())}catch(e){}let o=[];try{let e=await fetch(`${t}/api/solutions`,{cache:"no-store"});if(e.ok){let t=await e.json();o=Array.isArray(t)?t:t.solutions||[]}}catch(e){}let r="";a.filter(e=>e.featured_image&&e.slug).forEach(t=>{let a=t.updated_at?new Date(t.updated_at).toISOString():new Date().toISOString();r+=`
  <url>
    <loc>${e}/projects/${t.slug}</loc>
    <lastmod>${a}</lastmod>
    <image:image>
      <image:loc>${t.featured_image}</image:loc>
      <image:title>${t.title||t.name||""}</image:title>
    </image:image>
  </url>`}),i.filter(e=>e.logo&&e.slug).forEach(t=>{r+=`
  <url>
    <loc>${e}/brands/${t.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <image:image>
      <image:loc>${t.logo}</image:loc>
      <image:title>${t.name||""}</image:title>
    </image:image>
  </url>`}),o.filter(e=>e.image&&e.slug).forEach(t=>{let a=t.updated_at?new Date(t.updated_at).toISOString():new Date().toISOString();r+=`
  <url>
    <loc>${e}/solutions/${t.slug}</loc>
    <lastmod>${a}</lastmod>
    <image:image>
      <image:loc>${t.image}</image:loc>
      <image:title>${t.title||t.name||""}</image:title>
    </image:image>
  </url>`});let l=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${r}
</urlset>`;return new s.NextResponse(l,{status:200,headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=86400"}})}let n=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/sitemap-images.xml/route",pathname:"/sitemap-images.xml",filename:"route",bundlePath:"app/sitemap-images.xml/route"},resolvedPagePath:"/app/frontend/app/sitemap-images.xml/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:g,staticGenerationAsyncStorage:c,serverHooks:p}=n,u="/sitemap-images.xml/route";function d(){return(0,l.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:c})}}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[8948,5972],()=>a(35663));module.exports=i})();