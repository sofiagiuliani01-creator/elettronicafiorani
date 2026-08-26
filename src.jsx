import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowDownRight, ArrowRight, Play} from 'lucide-react';
import './style.css';

const releases=[
 {title:'Aerial Forms',artist:'Nora Vale',code:'EF—024',year:'2026',tone:'#E8913C',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88'},
 {title:'Soft Machinery',artist:'Martina Lune',code:'EF—023',year:'2025',tone:'#2E6B72',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88&sat=-45'},
 {title:'Night Geometry',artist:'Vetro',code:'EF—022',year:'2025',tone:'#44515a',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88&hue=120'},
 {title:'Distant Current',artist:'Arco',code:'EF—021',year:'2024',tone:'#aa6435',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88&hue=40'}
];
const artists=[['Nora Vale','03'],['Martina Lune','05'],['Vetro','02'],['Arco','04']];
const dates=[['12.09.26','Nora Vale','C2C Festival','Torino, IT'],['26.09.26','Martina Lune','Acquario Romano','Roma, IT'],['08.10.26','Vetro','Klub Próżność','Warsaw, PL'],['21.11.26','Arco','Le Botanique','Brussels, BE']];

function Deck(){
 const [order,setOrder]=useState(releases.map((_,i)=>i)); const [drag,setDrag]=useState(null); const box=useRef();
 const throwCard=(dir)=>{const top=order[0];setDrag({x:dir*(box.current?.offsetWidth||400)*1.3,y:-35,thrown:true});setTimeout(()=>{setOrder(o=>[...o.slice(1),top]);setDrag(null)},380)};
 const down=e=>{e.currentTarget.setPointerCapture(e.pointerId);setDrag({start:e.clientX,x:0,y:0})};
 const move=e=>drag&&!drag.thrown&&setDrag(d=>({...d,x:e.clientX-d.start}));
 const up=()=>{if(!drag)return;Math.abs(drag.x)>(box.current?.offsetWidth||400)*.1?throwCard(Math.sign(drag.x)||1):setDrag(null)};
 return <div className="deck-wrap"><div className="deck" ref={box} tabIndex="0" aria-label="Catalogo uscite. Usa le frecce per sfogliare" onKeyDown={e=>{if(e.key==='ArrowLeft')throwCard(-1);if(e.key==='ArrowRight')throwCard(1)}}>
  {[...order].reverse().map((idx,reverseI)=>{const depth=order.length-1-reverseI,top=depth===0,r=releases[idx];return <article key={idx} className={'sleeve '+(top?'top':'')} onPointerDown={top?down:undefined} onPointerMove={top?move:undefined} onPointerUp={top?up:undefined} onPointerCancel={top?up:undefined} style={{'--depth':depth,'--tone':r.tone,transform:top&&drag?`translate(${drag.x}px,${drag.y||0}px) rotate(${drag.x/18}deg) scale(1.015)`:undefined,transition:top&&drag&&!drag.thrown?'none':undefined}}>
   <img src={r.image} alt="" draggable="false"/><div className="sleeve-wash"/><span className="sleeve-code">{r.code}</span><div className="sleeve-title"><small>{r.artist}</small><strong>{r.title}</strong></div><span className="sleeve-year">{r.year}</span>
  </article>})}
 </div><div className="deck-meta"><span>DRAG / USE ARROWS</span><div>{order.map((_,i)=><i className={i===0?'active':''} key={i}/>)}</div><span>{String(order[0]+1).padStart(2,'0')} / 04</span></div></div>
}

function App(){
 const hero=useRef(); const float=useRef();
 useEffect(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!reduce)document.documentElement.classList.add('motion');
  const scroll=()=>{if(hero.current&&!reduce){const p=Math.max(0,Math.min(1,-hero.current.getBoundingClientRect().top/(hero.current.offsetHeight-innerHeight)));document.documentElement.style.setProperty('--portal',p)}if(float.current&&!reduce){const r=float.current.parentElement.getBoundingClientRect();float.current.style.transform=`translateY(${r.top*.06}px) rotate(${r.top*.008-8}deg)`}};scroll();addEventListener('scroll',scroll,{passive:true});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.14});document.querySelectorAll('.reveal').forEach(n=>io.observe(n));return()=>{removeEventListener('scroll',scroll);io.disconnect()}
 },[]);
 return <>
 <header><a className="mark" href="#top">Fiorani<span>.</span></a><nav><a href="#releases">Releases</a><a href="#artists">Artists</a><a href="#dates">Dates</a></nav><a className="pill" href="mailto:studio@fiorani.records">Get in touch <ArrowDownRight/></a></header>
 <main>
  <section className="portal" id="top" ref={hero}><div className="portal-stage">
   <img className="portal-image" src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=90" alt="Silhouette of a mountain beneath a dramatic amber sky"/>
   <div className="duotone"/><div className="veil"/><div className="door left"/><div className="door right"/><i className="spark spark-a"/><i className="spark spark-b"/>
   <div className="hero-meta top"><span>INDEPENDENT SOUND / IT</span><span>EST. MMXVIII</span></div>
   <h1 className="portal-title" aria-label="Fiorani Records"><span>FIORANI</span><span>RECORDS</span></h1>
   <div className="hero-meta bottom"><span>LISTEN BEYOND THE FRAME</span><span>SCROLL TO OPEN ↓</span></div>
  </div></section>
  <section className="statement"><div className="reveal"><span className="label">01 / OUR FREQUENCY</span><p>We release music that lives between <em>instinct and architecture</em> — singular voices, built to travel.</p></div><b className="outline">01</b><div className="orbit-photo" ref={float}><img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80" alt="Crowd at a live performance"/></div></section>
  <section className="releases" id="releases"><div className="release-copy reveal"><span className="label">02 / CATALOGUE</span><h2>New signals.<br/>Pressed to last.</h2><p>Limited physical editions and digital releases from the artists shaping our frequency.</p><div className="button-row"><a className="solid" href="#dates">Explore catalogue <ArrowRight/></a><a className="line-button" href="#artists"><Play/> Listen now</a></div></div><Deck/></section>
  <section className="roster" id="artists"><div className="section-heading reveal"><span className="label">03 / ROSTER</span><h2>Distinct voices.<br/>One current.</h2></div>{artists.map((a,i)=><a className="artist-row reveal" href="#dates" key={a[0]}><span>0{i+1}</span><strong>{a[0]}</strong><small>{a[1]} RELEASES</small><ArrowDownRight/></a>)}</section>
  <section className="dates" id="dates"><div className="section-heading reveal"><span className="label">04 / LIVE TRANSMISSIONS</span><h2>In the room.</h2></div><div className="date-head"><span>DATE</span><span>ARTIST</span><span>VENUE</span><span>CITY</span></div>{dates.map(d=><div className="date-row reveal" key={d[0]}><strong>{d[0]}</strong><span>{d[1]}</span><span>{d[2]}</span><span>{d[3]}</span><a href="mailto:tickets@fiorani.records">TICKETS <ArrowRight/></a></div>)}</section>
  <section className="close"><div><span className="label">KEEP THE SIGNAL OPEN</span><h2>Something worth<br/>hearing?</h2><p>DEMOS / COLLABORATIONS / LICENSING</p></div><div className="button-row"><a className="solid" href="mailto:studio@fiorani.records">Send a transmission <ArrowRight/></a><a className="line-button" href="#top">Back to top ↑</a></div></section>
 </main><footer><div><span>© 2026 FIORANI RECORDS</span><a href="#">INSTAGRAM ↗</a><span>TORINO / IT</span></div><strong>FIORANI<span>.</span></strong></footer>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
