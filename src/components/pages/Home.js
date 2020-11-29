/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hooks-helper'
import { Controller, Scene } from 'react-scrollmagic'
import Carousel from 'react-img-carousel'
import * as $ from 'jquery'

import { Modal } from '../common/Modal'
import {l, cl, getTriggerHook} from '../helpers/Log'

import '../../scss/home.scss'
import 'react-img-carousel/lib/carousel.css'

export default function Home({ 
  ref0, ref1, ref2 , ref3, 
  isShowing, toggle, 
  showMoreInfo, toggleMoreInfo,
}){

  const [{ vonStadt, nachStadt, newsEmail }, setValue] = useForm({ 
    vonStadt: '', 
    nachStadt: '',
    newsEmail: ''
  })
  , [isGift, setIsGift] = useState(false)  
  , onFormSubmit = e => {
    // l({ vonStadt, nachStadt })
    e.preventDefault()
    toggle()
  }  
  , goToSection = (e, ref) => {
    e.preventDefault()
    const scrollTop = window.pageYOffset + ref.current.getBoundingClientRect().top - 60
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }
  , onEmailSubmit= e => {
    // l({ newsEmail })
    e.preventDefault()
    toggle()    
  }  
  , showIndicators = !true
  , reverseAnims = !true

  useEffect(() => {
    $('.collapse').on('show.bs.collapse', function (e) {
      const el = $(`a[href="#${this.id}"]`)
      el.addClass("shown")
      el.siblings().addClass("shown")
    })
    $('.collapse').on('hide.bs.collapse', function (e) {
      const el = $(`a[href="#${this.id}"]`)
      el.removeClass("shown")
      el.siblings().removeClass("shown")
    })
  }, [])

  return (
    <>
      <main className="home">
        <Controller>

          <div id="trigger0" />
          <Scene
            // classToggle="visible-content"
            // triggerElement="#trigger0"
            // reverse={reverseAnims}
            // indicators={showIndicators}
            >
            <section className="section0 visible-content" ref={ref0}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 d-none d-lg-block">
                    <h1 className="desktop-only">Überraschungsreisen.<br/> Endlich <span className="sc">wegfahren</span>!</h1>
                    <h4 className="desktop-only">
                      Lass dich einfach überraschen wo es hingeht.<br/>
                      Strandurlaub, Skiurlaub, oder Kulturreisen.
                    </h4>
                  </div>
                  <div className="col-lg-5">
                    <div className="ctn-search">
                      <div className="desktop-only title">Von wo aus wollen Sie fliegen?</div>
                      <div className="mobile-only title">
                        Überraschungsreise buchen und <span className="acc">wegfahren</span>.
                      </div>
                      <div className="subtitle">
                        Lass dich einfach überraschen wo es hingeht.<br/>
                        Strandurlaub, Skiurlaub, oder Kulturreisen.
                      </div>
                      <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                          <label htmlFor="">VON</label>
                          <input
                            className="form-control"
                            type="text"
                            value={vonStadt}
                            onChange={setValue}
                            name="vonStadt"
                            placeholder="Berlin"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">NACH</label>
                          <input
                            className="form-control"
                            type="text"
                            value={nachStadt}
                            onChange={setValue}
                            name="nachStadt"
                            readOnly
                            placeholder="Überraschung"/>
                        </div>
                        <div
                          className={`ctn-check${isGift? " selected" : ""}`}
                          onClick={() => setIsGift(!isGift)}
                          >
                          <div className="check-ind">
                            <div className="check-ind-inner"></div>
                          </div>
                          <span>Als Geschenkgutschein</span>
                        </div>
                        <button className="btn btn-acc btn-block" type="submit">Mehr auswählen</button>
                      </form>
                    </div>
                  </div>
                </div>
                <h4 className="mobile-only text-center">In wenigen Schritten zum Angebot.</h4>
              </div>
            </section>
          </Scene>

          <Scene
            // classToggle="visible"
            // triggerElement="#trigger0"
            // triggerHook={getTriggerHook()}
            // reverse={reverseAnims}
            // indicators={showIndicators}
            >
            <section className="ctn-rating text-center visible">
              <div className="title">
                <span>Kunden bewerten Verschiffen.com mit 4.8 / 5</span>
                <span className="ctn-stars">
                  <img src="assets/star.png" alt=""/>
                  <img src="assets/star.png" alt=""/>
                  <img src="assets/star.png" alt=""/>
                  <img src="assets/star.png" alt=""/>
                  <img src="assets/star.png" alt=""/>
                </span>
              </div>
              <div className="desktop-only subtitle">
                durchschnittlich von <span className="acc">453,123 Bewertungen</span>
              </div>
            </section>
          </Scene>

          <div id="trigger1" ref={ref1}/>
          <Scene
            classToggle="visible"
            triggerElement="#trigger1"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section1">
              <div className="container text-center">
                <h2 className="acc">Funktionsweise</h2>
                <h1 className="desktop-only">So funktioniert es</h1>
                <h1 className="mobile-only">So funktioniert es</h1>
                <div className="points">
                  <div className="ctn-point row">
                    <div className="col-lg-3 d-none d-lg-block">
                      <img src="assets/func1.png" alt=""/>
                    </div>
                    <div className="col-2 col-lg-1 num dashed">1</div>
                    <div className="col-10 col-lg-8 text-left">
                      <h4>Erstellen Sie einen Projektauftrag</h4>
                      <p>
                        Einfaches Einfügen nur von Schlüsselinformationen. Fordern Sie Angebote
                        für Sendungen aller Größen an - von 1 kg bis zu 10 Tonnen
                      </p>
                    </div>
                  </div>
                  <div className="ctn-point row">
                    <div className="col-lg-3 d-none d-lg-block">
                      <img src="assets/func2.png" alt=""/>
                    </div>
                    <div className="col-2 col-lg-1 num dashed">2</div>
                    <div className="col-10 col-lg-8 text-left">
                      <h4>Echtzeit-Kurse vergleichen</h4>
                      <p>
                        Erhalten Sie einen Überblick über alle buchbaren Kapazitäten mehrerer
                        Frachtgesellschaften (inkl. Hauptdeck und Frachter)
                        <span className="desktop-only">
                          Echtzeit-Preise direkt von der Fluggesellschaft erhalten, wie am Telefon.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="ctn-point row">
                    <div className="col-lg-3 d-none d-lg-block">
                      <img src="assets/func3.png" alt=""/>
                    </div>
                    <div className="col-2 col-lg-1 num">3</div>
                    <div className="col-10 col-lg-8 text-left">
                      <h4>Direkt über die Plattform buchen</h4>
                      <p>
                        Alle Angebote mit nur zwei Klicks buchen. Nutzen Sie Ihren vorhandenen
                        AWB-Bestand und wickeln Sie Zahlungen wie gewohnt über CASS ab
                      </p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-acc" onClick={e => goToSection(e, ref0)}>Jetz beginnen</button>
                <div className="mobile-only foot-link">
                  Sie finden nicht wonach Sie suchen?
                  <div><a href={void(0)} className="acc">Alle Vorteile finden Sie hier</a></div>
                </div>
              </div>
            </section>
          </Scene>

          <div id="trigger2" />
          <Scene
            classToggle="visible"
            triggerElement="#trigger2"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section2">
              <div className="container text-center">
                <h2 className="acc">Vorteile</h2>
                <h1 className="desktop-only">Alle Pakete enthalten</h1>
                <h1 className="mobile-only">Alle Pakete enthalten</h1>
                <div className="ctn-boxes">
                  <div className="row">
                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th1.png" alt=""/>
                        <span>Airfares</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th2.png" alt=""/>
                        <span>Hotel</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th3.png" alt=""/>
                        <span>Transfers</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th4.png" alt=""/>
                        <span>Baggage</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th5.png" alt=""/>
                        <span>Sicherheit</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                    <div className="col-6 col-lg-4">
                      <div className="box">
                        <img src="assets/th6.png" alt=""/>
                        <span>Taxes</span>
                        <p>Wir helfen Dir dabei die benötigten Unterlagen auszufüllem</p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="info-box">
                  <div className="row">
                    <div className="col-lg-7">
                      <h4>
                        Lassen Sie sich überraschen unbuchen Sie spontan eine Reise.
                        {/*<span className="desktop-only"> auf einer Plattform</span>.*/}
                      </h4>
                      <p>
                        Reisen ist doch viel spannender und aufgregender, wenn man nicht
                        genau weiß was einen erwartet. Buche jetzt deine Reise.
                        {/*Erhalten Sie Echtzeitpreise für verfügbare Kapazitäten
                        <span className="desktop-only">
                          und buchen Sie direkt in die Systeme der Fluggesellschaften
                        </span>*/}
                      .</p>
                      <button className="desktop-only btn btn-acc" onClick={e => goToSection(e, ref0)}>Jetz beginnen</button>
                    </div>
                    <div className="col-lg-5">
                      <div className="row">
                        <div className="col-6">
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                        </div>
                        <div className="col-6 mt-4">
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                          <div className="ctn-cargo"><img src="assets/cargo.png" alt=""/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="mobile-only btn btn-acc" onClick={e => goToSection(e, ref0)}>Jetz beginnen</button>
                </div>
              </div>
            </section>
          </Scene>

          <div id="trigger3" />
          <Scene
            classToggle="visible"
            triggerElement="#trigger3"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section3">
              <div className="container text-center">
                <h2 className="desktop-only acc">Angebot auswählen</h2>
                <h1 className="desktop-only">Wählen Sie ihr passendes<br/> Angebot</h1>
                <h2 className="mobile-only acc">Angebot auswählen</h2>
                <h1 className="mobile-only">Lass Sie es sich <br/>überraschen</h1>
                <div className="ctn-bm-outer">
                  <div className="ctn-layer0">
                    <div className="row">
                      <div className="col-2"><div></div></div>
                      <div className="col-8"><div></div></div>
                      <div className="col-2"><div></div></div>
                    </div><hr/>
                    <div className="row">
                      <div className="col-2"><div></div></div>
                      <div className="col-8"><div></div></div>
                      <div className="col-2"><div></div></div>
                    </div><hr/>
                    <div className="row">
                      <div className="col-2"><div></div></div>
                      <div className="col-8"><div></div></div>
                      <div className="col-2"><div></div></div>
                    </div><hr/>
                    <div className="row">
                      <div className="col-2"><div></div></div>
                      <div className="col-8"><div></div></div>
                      <div className="col-2"><div></div></div>
                    </div><hr/>
                    <div className="row desktop-only">
                      <div className="col-2"><div></div></div>
                      <div className="col-8"><div></div></div>
                      <div className="col-2"><div></div></div>
                    </div>
                    <div className="site-title">Wegfahren.com</div>
                  </div>
                  <div className="ctn-layer1">
                    <div className="bm">Best Match</div>
                    <img src="assets/lufthansa.png" alt=""/>
                    <div className="ctn-ship-info">
                      <div>
                        <span className="date">Mon. 11.09.20</span>
                        <div>9:00</div>
                        <span className="stadt">BER</span>
                      </div>
                      <div className="ctn-ship-graphic">
                        <div>
                          <img className="con" src="assets/si-left.png" alt=""/>
                          <img src="assets/si-center.png" alt=""/>
                          <img className="con" src="assets/si-right.png" alt=""/>
                        </div>
                        <div className="bar"></div>
                        <span className="stadt">SHA</span>
                      </div>
                      <div>
                        <span className="date">Fri. 15.09.20</span>
                        <div>9:00</div>
                        <span className="stadt">SHA</span>
                      </div>
                    </div>
                    <div className="ctn-price">
                      <div>Gesamtbetrag</div>
                      <div>239 €</div>
                      <button className="btn btn-sm btn-acc">Buchen</button>
                    </div>
                  </div>
                </div>
                <button className="mobile-only btn btn-acc" onClick={e => goToSection(e, ref0)}>Jetz beginnen</button>
              </div>
            </section>
          </Scene>

          <div id="trigger4" ref={ref2}/>
          <Scene
            classToggle="visible"
            triggerElement="#trigger4"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section4">
              <div className="container text-center">
                <h2 className="desktop-only acc">Bewertungen</h2>
                <h1 className="desktop-only">Zufriedene Unternehmen</h1>
                <h2 className="mobile-only acc">Bewertungen</h2>
                <h1 className="mobile-only">Zufriedene Unternehmen</h1>
                <div className="desktop-only">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="box">
                        <div className="ctn-stars">
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                        </div>
                        <div className="r-title">Thank You</div>
                        <p className="r-content">
                          “Send shareable cloud tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately."
                        </p>
                        <div className="r-ft">
                          <img src="assets/r1.png" alt=""/><br/>
                          Sonne & Strande<br/><span className="acc">gebucht</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box">
                        <div className="ctn-stars">
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                        </div>
                        <div className="r-title">All Perfect</div>
                        <p className="r-content">
                          “Send shareable cloud tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately."
                        </p>
                        <div className="r-ft">
                          <img src="assets/r2.png" alt=""/><br/>
                          Erlebnissreise<br/><span className="acc">gebucht</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box">
                        <div className="ctn-stars">
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                          <img src="assets/star2.png" alt=""/>
                        </div>
                        <div className="r-title">Best Experience</div>
                        <p className="r-content">
                          “Send shareable cloud tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately.
                          Send shareable bug tests and get feedback immediately."
                        </p>
                        <div className="r-ft">
                          <img src="assets/r3.png" alt=""/><br/>
                          Umweltbewusst<br/><span className="acc">gebucht</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src="assets/trustpilot.jpg" alt=""/>
                </div>

                <div className="mobile-only">
                  <Carousel
                    cellPadding={-55}
                    lazyLoad={false}
                    dots={false}
                    infinite={false}
                    clickToNavigate={false}
                    >
                    <div className="box">
                      <div className="ctn-stars">
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                      </div>
                      <div className="r-title">Thank You</div>
                      <p className="r-content">
                        “Send shareable cloud tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately."
                      </p>
                      <div className="r-ft">
                        <img src="assets/r1.png" alt=""/><br/>
                        Sonne & Strande<br/><span className="acc">gebucht</span>
                      </div>
                    </div>

                    <div className="box">
                      <div className="ctn-stars">
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                      </div>
                      <div className="r-title">All Perfect</div>
                      <p className="r-content">
                        “Send shareable cloud tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately."
                      </p>
                      <div className="r-ft">
                        <img src="assets/r2.png" alt=""/><br/>
                        Erlebnissreise<br/><span className="acc">gebucht</span>
                      </div>
                    </div>

                    <div className="box">
                      <div className="ctn-stars">
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                        <img src="assets/star2.png" alt=""/>
                      </div>
                      <div className="r-title">Best Experience</div>
                      <p className="r-content">
                        “Send shareable cloud tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately.
                        Send shareable bug tests and get feedback immediately."
                      </p>
                      <div className="r-ft">
                        <img src="assets/r3.png" alt=""/><br/>
                        Umweltbewusst<br/><span className="acc">gebucht</span>
                      </div>
                    </div>

                  </Carousel>
                </div>
              </div>
            </section>
          </Scene>

          <div id="trigger5" />
          <Scene
            classToggle="visible"
            triggerElement="#trigger5"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="mobile-only p0">
              <div className="container text-center">
                <img src="assets/trustpilot.jpg" alt=""/>
                <button className="btn btn-acc mt-4" onClick={toggle}>Jetzt starten</button>
              </div>
            </section>
          </Scene>

          <div id="trigger6" />
          <Scene
            classToggle="visible"
            triggerElement="#trigger6"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section5 desktop-only">
              <div className="container text-center">
                <div className="ctn-news row text-left">
                  <div className="col left"></div>
                  <div className="col right">
                    <h4>Gutscheine verschenken.</h4>
                    <p>Melden sie sich für unseren Newsletter an und entdecken Sie Reiseerlebnisse, die Sie lieben werden.</p>
                    <form onSubmit={onEmailSubmit}>
                      <div className="row">
                        <div className="col-7 pr-0">
                          <input
                            type="email"
                            className="form-control"
                            value={newsEmail}
                            onChange={setValue}
                            name="newsEmail"
                            placeholder="Ihre E-Mail-Adresse" />
                        </div>
                        <div className="col-5">
                          <button type="submit" className="btn btn-acc btn-block">Inspieren lassen</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <span>
                  Mit der Anmeldung erklären Sie sich mit dem Erhalt von Werbe-E-Mails einverstanden.
                  Sie können sich jederzeit wieder abmelden. Weitere Informationen finden Sie in unseren <a href="#" className="acc">Datenschutzrichtlinien</a>.
                </span>
              </div>
            </section>
          </Scene>

          <div id="trigger7" ref={ref3}/>
          <Scene
            classToggle="visible"
            triggerElement="#trigger7"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section6">
              <div className="container text-center">
                <div className="row" ref={ref3}>
                  <div className="desktop-only col-md-6">
                    <div className="act act1 text-left">
                      <span className="acc">Benotigst du weitere Hilfe?</span>
                      <p>Kontakiere uns</p>
                      <button className="btn btn-sec">Hilfe erhalten</button>
                    </div>
                  </div>
                  <div className="desktop-only col-md-6">
                    <div className="act act2 text-left">
                      <span className="acc">Benötigst du sofortige Hilfe?</span>
                      <p>Frag nach Antworten</p>
                      <a href="/faq">
                        <button className="btn btn-acc">FAQ´s öffnen</button>
                      </a>
                    </div>
                  </div>
                  <div className="mobile-only col-md-12 kontakt">
                    <p>Do you have any questions? We are<br/>happy to help you.</p>
                    <div className="block">
                      <span className="acc">Telefon</span><br/>
                      030 320 049 332
                    </div>
                    <div className="block">
                      <span className="acc">Email</span><br/>
                      info@verschiffen.com
                    </div>
                    <div className="block">
                      <span className="acc">Chat</span><br/>
                      Live-support
                    </div>
                  </div>
                </div>
                <div className="desktop-only row info">
                  <div className="ctn-img">
                    <img src="assets/cp1.png" alt=""/>
                    <img src="assets/cp2.png" alt=""/>
                    <img src="assets/cp3.png" alt=""/>
                    <img src="assets/cp4.png" alt=""/>
                  </div>
                  <h1>Sie benötigen Unterstützung bei <br/>der Reisebuchung?</h1>
                  <p>Unser Experten unterstützen Sie bei der Flugbuchung</p>
                  <p className="acc"><img src="assets/phone.png" alt=""/>&nbsp;+49 (175) 91234</p>
                  <p>
                    Telefonisch erreichbar Montag bis Freitag von 8:00 bis 20:00 Uhr (UTC -5).
                    Sie können auch einen <a href="#" className="acc">Rückruf anfordern.</a>
                  </p>
                </div>
              </div>
            </section>
          </Scene>

          <div id="trigger8" />
          <Scene
            classToggle="visible"
            triggerElement="#trigger8"
            triggerHook={getTriggerHook()}
            reverse={reverseAnims}
            indicators={showIndicators}>
            <section className="section-faq mobile-only">
              <div className="container text-center">
                <h2 className="acc">FAQ</h2>
                <h1>Häufig gestellte<br/> Fragen</h1>

                <div className="ctn-qa">
                  <div className="ctn-q">
                    <p>
                      What to observe in case of illness?
                    </p>
                    <a className="ctn-exp-icon" data-toggle="collapse" href="#s-q1">
                      <img className="plus" src="assets/plus.png" alt=""/>
                    </a>
                  </div>
                  <div className="collapse multi-collapse" id="s-q1">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </p>
                  </div>
                </div>

                <div className="ctn-qa">
                  <div className="ctn-q">
                    <p>
                      What to observe in case of illness?
                    </p>
                    <a className="ctn-exp-icon" data-toggle="collapse" href="#s-q2">
                      <img className="plus" src="assets/plus.png" alt=""/>
                    </a>
                  </div>
                  <div className="collapse multi-collapse" id="s-q2">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </p>
                  </div>
                </div>

                <div className="ctn-qa">
                  <div className="ctn-q">
                    <p>
                      What to observe in case of illness?
                    </p>
                    <a className="ctn-exp-icon" data-toggle="collapse" href="#s-q3">
                      <img className="plus" src="assets/plus.png" alt=""/>
                    </a>
                  </div>
                  <div className="collapse multi-collapse" id="s-q3">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </p>
                  </div>
                </div>

                <div className="ctn-qa">
                  <div className="ctn-q">
                    <p>
                      What to observe in case of illness?
                    </p>
                    <a className="ctn-exp-icon" data-toggle="collapse" href="#s-q4">
                      <img className="plus" src="assets/plus.png" alt=""/>
                    </a>
                  </div>
                  <div className="collapse multi-collapse" id="s-q4">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </p>
                  </div>
                </div>

                <div className="ctn-qa">
                  <div className="ctn-q">
                    <p>
                      What to observe in case of illness?
                    </p>
                    <a className="ctn-exp-icon" data-toggle="collapse" href="#s-q5">
                      <img className="plus" src="assets/plus.png" alt=""/>
                    </a>
                  </div>
                  <div className="collapse multi-collapse" id="s-q5">
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </Scene>

          <div id="trigger-foot" />
          <Scene
            // classToggle="visible"
            // triggerElement="#trigger-foot"
            // triggerHook={getTriggerHook()}
            // reverse={reverseAnims}
            // indicators={showIndicators}
            >
            <section className="section7 visible">
              <div className="container text-center">
                <img className="desktop-only" src="assets/starten.png" alt=""/>
                <p className="desktop-only">Jetzt Überraschungsreise buchen</p>
                <p className="mobile-only">Jetzt Überraschungsreise<br/> buchen</p>
                <button className="desktop-only btn btn-acc mr-3" onClick={toggle}>Angebot ansehen</button>
                <button className="desktop-only btn btn-sec" onClick={e => goToSection(e, ref0)}>Jetzt vergleichen</button>
                <button className="mobile-only btn btn-acc" onClick={toggle}>Jetzt starten</button>
              </div>
            </section>
          </Scene>

          <Scene
            // classToggle="visible"
            // triggerElement="#trigger-foot"
            // triggerHook={getTriggerHook()}
            // reverse={reverseAnims}
            // indicators={showIndicators}
            >
            <section className="prefooter visible">
              <div className="container text-center">
                Sie suchen nach Hilfe für die Planung  einer Reise mit einer größeren Gruppe an Personen? Schreiben Sie uns einfach an.
                <hr/>
              </div>
            </section>
          </Scene>

        </Controller>
      </main>

      <Modal 
        isShowing={isShowing}
        toggle={toggle}
        showMoreInfo={showMoreInfo}
        toggleMoreInfo={toggleMoreInfo}
        vonStadt={vonStadt}
        nachStadt={nachStadt}
        isGift={isGift}
      />
    </>
  )
}
