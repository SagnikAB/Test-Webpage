import React, { useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const rules = [
  { n:'01', label:'ELIGIBILITY & SQUAD SIZE', status:'CAPACITY: STRICTLY 4 MEMBERS', title:'Team Composition', sub:'& Registration Rules', tags:['Strict 4-Pax','UG & PG Students','Auto-Match Support','Cross-College Allowed'], text:<>Open to undergraduate and postgraduate students. Teams must consist of <strong>strictly 4 members</strong> — no smaller or larger squad configurations are permitted. Individual registrants will receive automated team-matching support prior to dataset release.</>, bg:'#0b0d12', accent:'#70e4ff' },
  { n:'02', label:'PROBLEM DOMAINS & TRACKS', status:'TRACKS: CV / LLM / PREDICTIVE', title:'Specialized', sub:'Engineering Challenges', tags:['Computer Vision','LLM Reasoning & RAG','Predictive Analytics','Kaggle Benchmarks'], text:<>Teams select from distinct tracks featuring <strong>unsealed real-world datasets</strong>, baseline evaluation metrics, and domain-specific challenge parameters revealed at kickoff. Model latency, F1-scores, and resource budgets will be rigorously factored.</>, bg:'#171a21', accent:'#b8c4ff' },
  { n:'03', label:'ACADEMIC INTEGRITY & CODE AUDITS', status:'CHECKPOINTS: MANDATORY', title:'Originality', sub:'& Mentor Checkpoints', tags:['Git Commit Lineage','Mid-Sprint Check (Hour 12)','No Pre-Built Code','Mentor Verification'], text:<>All code must be authored during the <strong>24-hour sprint window</strong>. Senior engineers and industry mentors conduct mandatory code checkpoints to inspect model lineage, repository commit histories, and system architecture.</>, bg:'#252933', accent:'#d5d9e2' },
  { n:'04', label:'CODE FREEZE & DELIVERABLES', status:'FREEZE: HOUR 22', title:'Submission Requirements', sub:'& Jury Pitch', tags:['Live Prototype / API','3-Min Jury Defense','Clean Docker / Readme','Hour 22 Strict Freeze'], text:<>Repositories must be committed to the official GitHub organization before code freeze. Finalists present a live API or web prototype accompanied by a <strong>3-minute technical defense</strong> before the jury panel.</>, bg:'#444852', accent:'#ffffff' }
]

function Header(){
  return <>
    <div id="progress" className="fixed left-0 top-0 z-[100] h-[2px] w-0 bg-black"/>
    <header className="site-header">
      <div className="brand-lockup"><span className="brand-mark">S4</span><div><div className="brand-name">S4DS DATATHON <span>2026</span></div><div className="brand-sub">Society for Data Science</div></div></div>
      <div className="nav-actions"><div className="live-pill"><i/>Registration Active</div><a href="#fee-rules" className="nav-pill">FEE MATRIX <span>↓</span></a><button className="apply">APPLY NOW</button></div>
    </header>
  </>
}

function RuleCard({r, index}){
  const dark = index > 1
  return <article className="stack-card" style={{'--card-bg':r.bg,'--accent':r.accent}}>
    <div className="card-orb"/>
    <div className="card-inner">
      <div className="card-top">
        <div className="card-meta-left"><span className="rule-chip">RULE {r.n}</span><span className="rule-label">{r.label}</span></div>
        <span className="status-chip">{r.status}</span>
      </div>

      <div className="title-block">
        <h2>{r.title}</h2>
        <h3>{r.sub}</h3>
      </div>

      <div className="card-bottom">
        <div className="tags">{r.tags.map(t=><span key={t}>{t}</span>)}</div>
        <div className="card-copy"><span className="asterisk" style={{color:dark?'#fff':r.accent}}>✳</span><p>{r.text}</p></div>
      </div>
    </div>
  </article>
}

function FeeCard({price,title,text,status,foot}){
  return <div className="fee-card"><div className="fee-head"><span>{status}</span><b>{price}</b></div><small>MEMBER ACCESSIBILITY</small><h3>{title}</h3><p>{text}</p><div className="fee-foot"><span>{foot}</span><strong>VERIFIED</strong></div></div>
}

function App(){
  const root = useRef(null)

  useLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      gsap.from('.hero-item',{y:26,opacity:0,duration:.85,stagger:.08,ease:'power3.out'})
      gsap.to('#progress',{width:'100%',ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}})

      const deck = document.querySelector('.deck')
      const cards = gsap.utils.toArray('.stack-card')
      const steps = gsap.utils.toArray('.deck-step')
      const mobile = window.matchMedia('(max-width: 700px)').matches

      cards.forEach((card,i)=>{
        gsap.set(card,{y:i===0?0:24,scale:i===0?1:0.985,opacity:i===0?1:0,filter:i===0?'blur(0px)':'blur(1px)',zIndex:i+1})
      })

      if(!mobile){
        const tl=gsap.timeline({scrollTrigger:{trigger:deck,start:'top top+=88',end:()=>`+=${steps.length*window.innerHeight*.64}`,scrub:.7,pin:true,anticipatePin:1}})
        cards.forEach((card,i)=>{
          if(i===0) return
          const prev=cards[i-1]
          tl.to(prev,{y:-26,scale:.982,opacity:.92,filter:'blur(.4px)',duration:1,ease:'power2.inOut'},`step${i}`)
          tl.fromTo(card,{y:82,scale:.965,opacity:0,filter:'blur(5px)'},{y:0,scale:1,opacity:1,filter:'blur(0px)',duration:1,ease:'power3.out'},`step${i}`)
        })
      } else {
        cards.forEach((card,i)=>{
          if(!i) return
          gsap.to(card,{y:0,opacity:1,filter:'blur(0px)',scrollTrigger:{trigger:steps[i],start:'top 70%',end:'top 30%',scrub:.65}})
          gsap.to(cards[i-1],{y:-16,scale:.985,opacity:.9,scrollTrigger:{trigger:steps[i],start:'top 70%',end:'top 30%',scrub:.65}})
        })
      }

      gsap.from('.fee-card',{y:38,opacity:0,duration:.8,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'#fee-rules',start:'top 80%',once:true}})
      ScrollTrigger.refresh()
    },root)
    return ()=>ctx.revert()
  },[])

  return <div ref={root}>
    <Header/>
    <main>
      <section className="hero-section">
        <div className="hero-item eyebrow">↻ OFFICIAL DIRECTIVES & SPRINT PROTOCOLS</div>
        <h1 className="hero-item hero-title">focusing on transforming your vision into a <span>captivating sprint experience.</span></h1>
        <p className="hero-item hero-copy">Everything you need to know about team formations, code checkpoints, freeze timelines, and submission deliverables — engineered with stacked scroll interaction.</p>
        <div className="hero-item hero-stats"><span>• 4 MANDATORY RULES</span><span>• 24-HOUR HACKATHON</span><span>• SCROLL TO STACK</span></div>
      </section>

      <div className="section-bar"><span><b>SECTION [01]</b> — CORE SPRINT RULES</span><span className="desktop-only">SCROLL DOWN TO UNVEIL & STACK CARDS ↓</span></div>

      <section className="deck-wrap">
        <div className="deck">
          {rules.map((r,i)=><div className="deck-step" key={r.n}><div className="deck-shelf"><RuleCard r={r} index={i}/></div></div>)}
        </div>
      </section>

      <section id="fee-rules" className="fee-section">
        <div className="section-head"><div><span className="eyebrow">SECTION [02] — ENTRY MATRICES</span><h2>Squad Fee Structure</h2><p>Transparent, subsidised participation tiers designed for maximum accessibility and fair resource allocation.</p></div><span className="verify">VERIFIED VIA STUDENT IDENTITY</span></div>
        <div className="fee-grid"><FeeCard price="₹0" status="STATUS: WAIVED" title="100% Free Entry for Society Members" text="Registration is completely free for squads comprised entirely of active S4DS society members." foot="ALL 4 MEMBERS VERIFIED"/><FeeCard price="₹100" status="STATUS: FLAT SQUAD FEE" title="Flat Fee for Mixed & External Squads" text="If a squad includes at least one non-member participant, a single flat fee applies to the entire team." foot="COVERS ALL 4 MEMBERS"/></div>
      </section>
    </main>

    <footer><div><strong>S4DS Datathon 2026</strong><span>Hosted by Society for Data Science. High-velocity machine learning & engineering sprint.</span></div><div className="footer-actions"><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑ Back to top</button><button className="register">Register Squad</button></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
