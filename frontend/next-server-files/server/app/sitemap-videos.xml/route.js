"use strict";(()=>{var e={};e.id=3999,e.ids=[3999],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},88568:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>m,patchFetch:()=>v,requestAsyncStorage:()=>p,routeModule:()=>d,serverHooks:()=>c,staticGenerationAsyncStorage:()=>u});var i={};o.r(i),o.d(i,{GET:()=>s});var a=o(49303),r=o(88716),l=o(60670),n=o(87070);async function s(){let e="https://lexalifestyle.com",t=[];try{let e=await fetch("https://health-check-deploy-3.preview.emergentagent.com/api/videos",{cache:"no-store"});e.ok&&(t=await e.json())}catch(e){}let o="";t.filter(e=>e.url||e.video_url).forEach(t=>{let i=t.url||t.video_url,a=t.thumbnail||t.thumbnail_url||`${e}/images/video-thumbnail.jpg`,r=t.title||"LEXA Lifestyle Video",l=t.description||"Smart home automation video by LEXA Lifestyle",n=t.updated_at?new Date(t.updated_at).toISOString():new Date().toISOString();o+=`
  <url>
    <loc>${e}/videos</loc>
    <video:video>
      <video:thumbnail_loc>${a}</video:thumbnail_loc>
      <video:title>${r}</video:title>
      <video:description>${l}</video:description>
      <video:content_loc>${i}</video:content_loc>
      <video:publication_date>${n}</video:publication_date>
    </video:video>
  </url>`}),""===o&&(o=`
  <url>
    <loc>${e}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`);let i=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${o}
</urlset>`;return new n.NextResponse(i,{status:200,headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=86400"}})}let d=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/sitemap-videos.xml/route",pathname:"/sitemap-videos.xml",filename:"route",bundlePath:"app/sitemap-videos.xml/route"},resolvedPagePath:"/app/frontend/app/sitemap-videos.xml/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:p,staticGenerationAsyncStorage:u,serverHooks:c}=d,m="/sitemap-videos.xml/route";function v(){return(0,l.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:u})}}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),i=t.X(0,[8948,5972],()=>o(88568));module.exports=i})();