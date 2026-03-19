"use strict";(()=>{var e={};e.id=5628,e.ids=[5628],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},67738:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>x,patchFetch:()=>c,requestAsyncStorage:()=>l,routeModule:()=>m,serverHooks:()=>u,staticGenerationAsyncStorage:()=>d});var s={};a.r(s),a.d(s,{GET:()=>p});var i=a(49303),o=a(88716),n=a(60670),r=a(87070);async function p(){let e="https://lexalifestyle.com",t=new Date().toISOString(),a=`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${e}/sitemap.xml</loc>
    <lastmod>${t}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${e}/sitemap-images.xml</loc>
    <lastmod>${t}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${e}/sitemap-videos.xml</loc>
    <lastmod>${t}</lastmod>
  </sitemap>
</sitemapindex>`;return new r.NextResponse(a,{status:200,headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=86400"}})}let m=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/sitemap_index.xml/route",pathname:"/sitemap_index.xml",filename:"route",bundlePath:"app/sitemap_index.xml/route"},resolvedPagePath:"/app/frontend/app/sitemap_index.xml/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:u}=m,x="/sitemap_index.xml/route";function c(){return(0,n.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:d})}}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[8948,5972],()=>a(67738));module.exports=s})();