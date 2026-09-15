import React, { useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const sharedCardTheme = { bg:'#0b0d12', accent:'#70e4ff' }

const rules = [
  { n:'01', label:'ELIGIBILITY & SQUAD SIZE', status:'CAPACITY: STRICTLY 4 MEMBERS', title:'Team Composition', sub:'& Registration Rules', tags:['Strict 4-Pax','UG & PG Students','Auto-Match Support','Cross-College Allowed'], text:<>Open to undergraduate and postgraduate students. Teams must consist of <strong>strictly 4 members</strong> — no smaller or larger squad configurations are permitted. Individual registrants will receive automated team-matching support prior to dataset release.</>, bg:sharedCardTheme.bg, accent:sharedCardTheme.accent },
  { n:'02', label:'PROBLEM DOMAINS & TRACKS', status:'TRACKS: CV / LLM / PREDICTIVE', title:'Specialized', sub:'Engineering Challenges', tags:['Computer Vision','LLM Reasoning & RAG','Predictive Analytics','Kaggle Benchmarks'], text:<>Teams select from distinct tracks featuring <strong>unsealed real-world datasets</strong>, baseline evaluation metrics, and domain-specific challenge parameters revealed at kickoff. Model latency, F1-scores, and resource budgets will be rigorously factored.</>, bg:sharedCardTheme.bg, accent:sharedCardTheme.accent },
  { n:'03', label:'ACADEMIC INTEGRITY & CODE AUDITS', status:'CHECKPOINTS: MANDATORY', title:'Originality', sub:'& Mentor Checkpoints', tags:['Git Commit Lineage','Mid-Sprint Check (Hour 12)','No Pre-Built Code','Mentor Verification'], text:<>All code must be authored during the <strong>24-hour sprint window</strong>. Senior engineers and industry mentors conduct mandatory code checkpoints to inspect model lineage, repository commit histories, and system architecture.</>, bg:sharedCardTheme.bg, accent:sharedCardTheme.accent },
  { n:'04', label:'CODE FREEZE & DELIVERABLES', status:'FREEZE: HOUR 22', title:'Submission Requirements', sub:'& Jury Pitch', tags:['Live Prototype / API','3-Min Jury Defense','Clean Docker / Readme','Hour 22 Strict Freeze'], text:<>Repositories must be committed to the official GitHub organization before code freeze. Finalists present a live API or web prototype accompanied by a <strong>3-minute technical defense</strong> before the jury panel.</>, bg:sharedCardTheme.bg, accent:sharedCardTheme.accent }
]

function CollegeLogo({className = ''}) {
  return <img src="C:\Users\sagni\Downloads\s4ds-datathon-2026\s4ds-datathon-2026\image.png" alt="Adamas University logo" className={className} />
}

function Header(){
  return <>
    <div id="progress" className="fixed left-0 top-0 z-[100] h-[2px] w-0 bg-black"/>
    <header className="site-header">
      <div className="brand-lockup">
        <CollegeLogo className="brand-mark" />
        <div>
          <div className="brand-name">S4DS DATATHON <span>2026</span></div>
          <div className="brand-sub">Society for Data Science</div>
        </div>
      </div>
      <button className="apply">APPLY NOW</button>
    </header>
  </>
}

function RuleCard({r, index}){
  return <article className="stack-card" style={{'--card-bg':r.bg,'--accent':r.accent}} data-index={index}>
    <div className="card-orb"/>
    <div className="card-inner">
      <div className="card-top">
        <div className="card-meta-left"><span className="rule-chip">RULE {r.n}</span><span className="rule-label">{r.label}</span></div>
        <span className="status-chip">{r.status}</span>
      </div>
      <div className="title-block"><h2>{r.title}</h2><h3>{r.sub}</h3></div>
      <div className="card-bottom">
        <div className="tags">{r.tags.map(t=><span key={t}>{t}</span>)}</div>
        <div className="card-copy"><span className="asterisk" style={{color:r.accent}}>✳</span><p>{r.text}</p></div>
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
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const progress = document.querySelector('#progress')

      if (!reduceMotion) {
        gsap.from('.hero-item',{y:28,opacity:0,duration:.8,stagger:.08,ease:'power3.out'})
      }

      gsap.to(progress,{width:'100%',ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}})

      const stage = document.querySelector('.stack-stage')
      const cards = gsap.utils.toArray('.stack-card')
      if (!stage || cards.length === 0) return

      gsap.set(cards, { zIndex: i => i + 1 })
      gsap.set(cards.slice(1), { y: 80, scale: .96, opacity: 0, filter: 'blur(7px)' })
      gsap.set(cards[0], { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' })

      if (reduceMotion) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top+=88',
          end: () => `+=${Math.max(1, cards.length - 1) * Math.max(460, window.innerHeight * 0.56)}`,
          scrub: 0.65,
          invalidateOnRefresh: true,
          pin: false,
          anticipatePin: 1
        }
      })

      cards.forEach((card, i) => {
        if (i === 0) return
        const prev = cards[i - 1]
        tl.to(prev, { y: -24, scale: .965, opacity: .38, filter: 'blur(2px)', duration: 1, ease:'power2.inOut' }, i - 1)
        tl.fromTo(card,
          { y: 88, scale: .965, opacity: 0, filter: 'blur(7px)' },
          { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease:'power3.out' },
          i - 1
        )
      })

      const feeStage = document.querySelector('.fee-stack-stage')
      const feeCards = gsap.utils.toArray('.fee-card')
      if (feeStage && feeCards.length) {
        gsap.set(feeCards, { zIndex: i => i + 1 })
        gsap.set(feeCards.slice(1), { y: 80, scale: .96, opacity: 0, filter: 'blur(7px)' })
        gsap.set(feeCards[0], { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' })

        if (!reduceMotion) {
          const feeTl = gsap.timeline({
            scrollTrigger: {
              trigger: feeStage,
              start: 'top top+=88',
              end: () => `+=${Math.max(1, feeCards.length - 1) * Math.max(460, window.innerHeight * 0.56)}`,
              scrub: 0.7,
              invalidateOnRefresh: true,
              pin: false,
              anticipatePin: 1
            }
          })

          feeCards.forEach((card, i) => {
            if (i === 0) return
            const prev = feeCards[i - 1]
            feeTl.to(prev, { y: -18, scale: .965, opacity: .38, filter: 'blur(2px)', duration: 1, ease: 'power2.inOut' }, i - 1)
            feeTl.fromTo(card,
              { y: 88, scale: .965, opacity: 0, filter: 'blur(7px)' },
              { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
              i - 1
            )
          })
        }
      }

      ScrollTrigger.refresh()
    }, root)

    return ()=>ctx.revert()
  },[])

  return <div ref={root}>
    <Header/>
    <main>
      <section className="hero-section">
        <h1 className="hero-item hero-title">sprint<br />experience.</h1>
        <p className="hero-item hero-copy">Everything you need to know about team formations,<br />code checkpoints, freeze timelines, and submission<br />deliverables — engineered with stacked scroll<br />interaction.</p>
      </section>

      <div className="section-bar"><span><b>SECTION [01]</b> — CORE SPRINT RULES</span><span className="desktop-only">SCROLL DOWN TO UNVEIL & STACK CARDS ↓</span></div>

      <section className="deck-wrap">
        <div className="deck-track">
          <div className="stack-stage">
            {rules.map((r,i)=><RuleCard r={r} index={i} key={r.n}/>)}</div>
        </div>
      </section>

      <section id="fee-rules" className="fee-section">
        <div className="section-head"><div><span className="eyebrow">SECTION [02] — ENTRY MATRICES</span><h2>Squad Fee Structure</h2><p>Transparent, subsidised participation tiers designed for maximum accessibility and fair resource allocation.</p></div><span className="verify">VERIFIED VIA STUDENT IDENTITY</span></div>
        <div className="fee-deck">
          <div className="fee-stack-stage">
            <FeeCard price="₹0" status="STATUS: WAIVED" title="100% Free Entry for Society Members" text="Registration is completely free for squads comprised entirely of active S4DS society members." foot="ALL 4 MEMBERS VERIFIED"/>
            <FeeCard price="₹100" status="STATUS: FLAT SQUAD FEE" title="Flat Fee for Mixed & External Squads" text="If a squad includes at least one non-member participant, a single flat fee applies to the entire team." foot="COVERS ALL 4 MEMBERS"/>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="footer-brand">
        <CollegeLogo className="footer-logo" />
        <div>
          <strong>S4DS Datathon 2026</strong>
          <span>Hosted by Society for Data Science. High-velocity machine learning & engineering sprint.</span>
        </div>
      </div>
      <div className="footer-actions"><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑ Back to top</button><button className="register">Register Squad</button></div>
    </footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
