!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["three"],t):e.hoverEffect=t(e.THREE)}(this,function(e){return function(t){var i="\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",n="\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform float dpr;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\nuniform vec4 res;\nuniform vec2 parent;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n\n  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;\n  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);\n\n\n  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n";function r(){for(var e=arguments,t=0;t<arguments.length;t++)if(void 0!==e[t])return e[t]}console.log("%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ","color: #bada55; font-size: 0.8rem");var a=t.parent,o=t.displacementImage,s=t.image1,f=t.image2,l=r(t.imagesRatio,1),d=r(t.intensity1,t.intensity,1),u=r(t.intensity2,t.intensity,1),v=r(t.angle,Math.PI/4),p=r(t.angle1,v),m=r(t.angle2,3*-v),g=r(t.speedIn,t.speed,1.6),c=r(t.speedOut,t.speed,1.2),h=r(t.hover,!0),y=r(t.easing,Expo.easeOut),F=r(t.video,!1);if(a)if(s&&f&&o){var x=new e.Scene,w=new e.OrthographicCamera(a.offsetWidth/-2,a.offsetWidth/2,a.offsetHeight/2,a.offsetHeight/-2,1,1e3);w.position.z=1;var H=new e.WebGLRenderer({antialias:!1,alpha:!0});H.setPixelRatio(2),H.setClearColor(16777215,0),H.setSize(a.offsetWidth,a.offsetHeight),a.appendChild(H.domElement);var W=function(){H.render(x,w)},L=new e.TextureLoader;L.crossOrigin="";var V,P,R=L.load(o,W);if(R.magFilter=R.minFilter=e.LinearFilter,F){var b=function(){requestAnimationFrame(b),H.render(x,w)};b(),(F=document.createElement("video")).autoplay=!0,F.loop=!0,F.src=s,F.load();var S=document.createElement("video");S.autoplay=!0,S.loop=!0,S.src=f,S.load();var E=new e.VideoTexture(F),M=new e.VideoTexture(S);E.magFilter=M.magFilter=e.LinearFilter,E.minFilter=M.minFilter=e.LinearFilter,S.addEventListener("loadeddata",function(){S.play(),(M=new e.VideoTexture(S)).magFilter=e.LinearFilter,M.minFilter=e.LinearFilter,C.uniforms.texture2.value=M},!1),F.addEventListener("loadeddata",function(){F.play(),(E=new e.VideoTexture(F)).magFilter=e.LinearFilter,E.minFilter=e.LinearFilter,C.uniforms.texture1.value=E},!1)}else E=L.load(s,W),M=L.load(f,W),E.magFilter=M.magFilter=e.LinearFilter,E.minFilter=M.minFilter=e.LinearFilter;var U=l;a.offsetHeight/a.offsetWidth<U?(V=1,P=a.offsetHeight/a.offsetWidth/U):(V=a.offsetWidth/a.offsetHeight*U,P=1);var C=new e.ShaderMaterial({uniforms:{intensity1:{type:"f",value:d},intensity2:{type:"f",value:u},dispFactor:{type:"f",value:0},angle1:{type:"f",value:p},angle2:{type:"f",value:m},texture1:{type:"t",value:E},texture2:{type:"t",value:M},disp:{type:"t",value:R},res:{type:"vec4",value:new e.Vector4(a.offsetWidth,a.offsetHeight,V,P)},dpr:{type:"f",value:window.devicePixelRatio}},vertexShader:i,fragmentShader:n,transparent:!0,opacity:1}),O=new e.PlaneBufferGeometry(a.offsetWidth,a.offsetHeight,1),T=new e.Mesh(O,C);x.add(T);var D=0;h&&a.addEventListener("click",_.bind(this,"decrease"),!1),window.addEventListener("resize",function(t){a.offsetHeight/a.offsetWidth<U?(V=1,P=a.offsetHeight/a.offsetWidth/U):(V=a.offsetWidth/a.offsetHeight*U,P=1),T.material.uniforms.res.value=new e.Vector4(a.offsetWidth,a.offsetHeight,V,P),H.setSize(a.offsetWidth,a.offsetHeight),W()}),this.next=_.bind(this,"increase"),this.previous=_.bind(this,"decrease")}else console.warn("One or more images are missing");else console.warn("Parent missing");function _(t){var r=document.getElementById("img-holder").getAttribute("data-imgArr");r=JSON.parse(r),console.log(r);var s=r;if(console.log(D),orderResult=t,"decrease"!=t||0!=D)if("increase"!=t||D!=s.length-1){if("increase"==orderResult){(V=new e.TextureLoader).crossOrigin="",(P=V.load(o,W)).magFilter=P.minFilter=e.LinearFilter;var f,v,h=V.load(s[D],W),F=V.load(s[D+1],W);h.magFilter=F.magFilter=e.LinearFilter,h.minFilter=F.minFilter=e.LinearFilter,a.offsetHeight/a.offsetWidth<(S=l)?(f=1,v=a.offsetHeight/a.offsetWidth/S):(f=a.offsetWidth/a.offsetHeight*S,v=1);var w=new e.ShaderMaterial({uniforms:{intensity1:{type:"f",value:d},intensity2:{type:"f",value:u},dispFactor:{type:"f",value:0},angle1:{type:"f",value:p},angle2:{type:"f",value:m},texture1:{type:"t",value:h},texture2:{type:"t",value:F},disp:{type:"t",value:P},res:{type:"vec4",value:new e.Vector4(a.offsetWidth,a.offsetHeight,f,v)},dpr:{type:"f",value:window.devicePixelRatio}},vertexShader:i,fragmentShader:n,transparent:!0,opacity:1}),H=new e.PlaneBufferGeometry(a.offsetWidth,a.offsetHeight,1),L=new e.Mesh(H,w);x.add(L),gsap.to(w.uniforms.dispFactor,{duration:g,value:1,ease:y,onUpdate:W,onComplete:W}),D++}else if("decrease"==orderResult){var V,P,R,b,S;(V=new e.TextureLoader).crossOrigin="",(P=V.load(o,W)).magFilter=P.minFilter=e.LinearFilter,h=V.load(s[D],W),F=V.load(s[D-1],W),h.magFilter=F.magFilter=e.LinearFilter,h.minFilter=F.minFilter=e.LinearFilter,a.offsetHeight/a.offsetWidth<(S=l)?(R=1,b=a.offsetHeight/a.offsetWidth/S):(R=a.offsetWidth/a.offsetHeight*S,b=1),w=new e.ShaderMaterial({uniforms:{intensity1:{type:"f",value:d},intensity2:{type:"f",value:u},dispFactor:{type:"f",value:0},angle1:{type:"f",value:p},angle2:{type:"f",value:m},texture1:{type:"t",value:h},texture2:{type:"t",value:F},disp:{type:"t",value:P},res:{type:"vec4",value:new e.Vector4(a.offsetWidth,a.offsetHeight,R,b)},dpr:{type:"f",value:window.devicePixelRatio}},vertexShader:i,fragmentShader:n,transparent:!0,opacity:1}),H=new e.PlaneBufferGeometry(a.offsetWidth,a.offsetHeight,1),L=new e.Mesh(H,w),x.add(L),gsap.to(w.uniforms.dispFactor,{duration:c,value:1,ease:y,onUpdate:W,onComplete:W}),D--}}else console.log("out of bounds imgs");else console.log("out of bounds imgs")}}});
//# sourceMappingURL=hover-effect.umd.js.map
