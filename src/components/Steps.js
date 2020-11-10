/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import moment from "moment"
import 'moment/locale/de'
import DateTime from 'react-datetime'

import HttpService from '../helpers/HttpService'
import Dots from '../helpers/Dots'
import { l, cl } from '../helpers/Log'

import 'react-datetime/css/react-datetime.css'


const createFormData = (type, formObjData, formTextData, vonStadt, nachStadt, isGift) => {
  l(formObjData, formTextData, vonStadt, nachStadt, isGift)

  const formData = new FormData()
  , mySqlDate = function(date) {
    const twoDigits = d => {
      if(0 <= d && d < 10) return "0" + d.toString()
      if(-10 < d && d < 0) return "-0" + (-1*d).toString()
      return d.toString()
    }
    return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate())
  }
  
  formData.append("type", type)
  formData.append("vonStadt", vonStadt)
  formData.append("nachStadt", nachStadt)
  formData.append("isGift", isGift)

  for(const key in formTextData){ formData.append(key, formTextData[key]) }
  for(const key in formObjData){
    switch(key){      
      case "startDate":
      case "returnDate": 
        formData.append(key, mySqlDate(formObjData[key])); break;

      default: formData.append(key, formObjData[key]);
    }
  }

  return formData
}

, Step1 = ({ indicators, formObjData, setFormObj, navigation, toggle, toggleMoreInfo }) => {
  const { next } = navigation
  , { isNext, isCurrent, isPrev } = indicators
  , isCurrentClass = isCurrent ? " current" : ""
  , isPrevClass = isPrev ? " prev" : ""
  , isNextClass = isNext ? " next" : ""
  , [isCare, setIsCare] = useState(false)
  , [opts, setOpts] = useState([
    { name: "Sonne und Strand", img: "assets/opt1.png", selected: true },
    { name: "Großstadt<br/>erleben", img: "assets/opt2.png", selected: false },
    { name: "Naturreisen", img: "assets/opt3.png", selected: false },
    { name: "Ski und <br/>Winterreisen", img: "assets/opt4.png", selected: false },
    { name: "Shopping", img: "assets/opt5.png", selected: false },
    { name: "Partyurlaub", img: "assets/opt6.png", selected: false },
  ])
  , setOpt = idx => {
    // To select just one
    // opts.forEach((opt, i) => {
    //   i !== idx && (opt.selected = false)
    //   i === idx && (opt.selected = true)
    // })
    
    // To select multiple
    opts.forEach((opt, i) => (i === idx) && (opt.selected = !opt.selected))
    
    setOpts([...opts])
  }
  , doNext = () => {
    l(formObjData)
    next()
  }

  useEffect(() => {
    setFormObj(prev => ({
      ...prev, 
      selOpts: opts
        .filter(opt => opt.selected)
        .reduce((a, b) => ({
          name: (a.name.length ? (a.name + ', ') : '') + b.name.replace(/<br\s*\/?>/gi, ' ').replace(/-/g, '')
        }), { name: '' }).name,
      isCare
    }))
  }, [opts, isCare, setFormObj])

  return (
    <div className={`step step1${isCurrentClass}${isPrevClass}${isNextClass}`}>
      <div className="inner">
        
        <div className="container">
          <div className="ctn-heading">
            <h4>Art der Reise<img onClick={toggleMoreInfo} src="assets/info.png" alt=""/></h4>
            <div className="subtitle">Schritt 1 von 5</div>
          </div>
          <div className="ctn-content">
            <h5>Haben Sie Anforderungen an Ihrer Überraschungsreise?</h5>
            <div className="ctn-box desktop-only">{
              opts.slice(0, opts.length / 2).map((opt, idx) => (
                <div key={idx}
                  className={`box text-center${opt.selected ? " selected":""}`}
                  onClick={() => {setOpt(idx)}}
                >
                  <img src={opt.img} alt=""/>
                  <span dangerouslySetInnerHTML={{__html: opt.name}}/>
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                </div>
              ))
            }</div>
            <div className="ctn-box desktop-only">{
              opts.slice(opts.length / 2, opts.length).map((opt, idx) => (
                <div key={idx}
                  className={`box text-center${opt.selected ? " selected":""}`}
                  onClick={() => {setOpt(idx + opts.length / 2)}}
                >
                  <img src={opt.img} alt=""/>
                  <span dangerouslySetInnerHTML={{__html: opt.name}}/>
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                </div>
              ))
            }</div>
            <div className="ctn-box mobile-only">{
              opts.map((opt, idx) => (
                <div key={idx}
                  className={`box text-center${opt.selected ? " selected":""}`}
                  onClick={() => {setOpt(idx)}}
                >
                  <img src={opt.img} alt=""/>
                  <span dangerouslySetInnerHTML={{__html: opt.name}}/>
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                </div>
              ))
            }</div>
            <div 
              className={`ctn-check${isCare? " selected" : ""}`}
              onClick={() => setIsCare(!isCare)} 
              >
              <div className="check-ind">
                <div className="check-ind-inner"></div>
              </div>
              <span>Mir ist alles egal.</span>
            </div>
          </div>
          <div className="ctn-btn">
            <button className="btn btn-sec mr-2" onClick={toggle}>Zurück</button>
            <button className="btn btn-acc" onClick={doNext}>Fortfahren</button>
          </div>
        </div>

      </div>
    </div>
  )
}

, Step2 = ({ indicators, formObjData, setFormObj, navigation, toggleMoreInfo }) => {
  const { previous, next } = navigation
  , { isNext, isCurrent, isPrev } = indicators
  , isCurrentClass = isCurrent ? " current" : ""
  , isPrevClass = isPrev ? " prev" : ""
  , isNextClass = isNext ? " next" : ""
  , [isCare, setIsCare] = useState(false)
  , [opts, setOpts] = useState([
    { name: "Low Budget", img: "assets/€.png", selected: true },
    { name: "Medium Budget", img: "assets/€€.png", selected: false },
    { name: "High Budget", img: "assets/€€€.png", selected: false },
  ])
  , setOpt = idx => {
    // To select just one
    opts.forEach((opt, i) => {
      i !== idx && (opt.selected = false)
      i === idx && (opt.selected = true)
    })
    
    // To select multiple
    // opts.forEach((opt, i) => (i === idx) && (opt.selected = !opt.selected))
    
    setOpts([...opts])
  }
  , [travelOpts, setTravelOpts] = useState([
    { name: "Nur Direktreise", selected: true },
    { name: "Mehre Städte könnten infrage kommen", selected: false },
    { name: "Ich werde mit Haustieren verreisen", selected: true },
    { name: "Keine weiteren Anforderungen", selected: false },
  ])
  , setTravelOpt = idx => {
    
    // To select multiple
    travelOpts.forEach((opt, i) => (i === idx) && (opt.selected = !opt.selected))
    
    setTravelOpts([...travelOpts])
  }
  , doNext = () => {
    l(formObjData)
    next()
  }

  useEffect(() => {
    setFormObj(prev => ({
      ...prev, 

      selOpts: opts
        .filter(opt => opt.selected)
        .reduce((a, b) => ({
          name: (a.name.length ? (a.name + ', ') : '') + b.name.replace(/<br\s*\/?>/gi, ' ').replace(/-/g, '')
        }), { name: '' }).name,

      selTravelOpts: travelOpts
        .filter(opt => opt.selected)
        .reduce((a, b) => ({
          name: (a.name.length ? (a.name + ', ') : '') + b.name.replace(/<br\s*\/?>/gi, ' ').replace(/-/g, '')
        }), { name: '' }).name,
      isCare
    }))
  }, [opts, travelOpts, isCare, setFormObj])

  return (
    <div className={`step step2${isCurrentClass}${isPrevClass}${isNextClass}`}>
      <div className="inner">
        
        <div className="container">
          
          <div className="ctn-heading">
            <h4>Art der Reise<img onClick={toggleMoreInfo} src="assets/info.png" alt=""/></h4>
            <div className="subtitle">Schritt 2 von 5</div>
          </div>

          <div className="ctn-content">
            <h5>Was wollen Sie für Ihre Reise ausgeben?</h5>
            <div className="ctn-box">{
              opts.map((opt, idx) => (
                <div key={idx}
                  className={`box text-center${opt.selected ? " selected":""}`}
                  onClick={() => {setOpt(idx)}}
                >
                  <img src={opt.img} alt=""/>
                  <span dangerouslySetInnerHTML={{__html: opt.name}}/>
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                </div>
              ))
            }</div>

            <div className="ctn-travel-box">
              <h5>Gibt es sonstige Anfoderungen an die Reise?</h5> 
              {
                travelOpts.map((opt, idx) => (
                  <div 
                    key={idx}
                    className={`ctn-check-sq${opt.selected ? " selected":""}`}
                    onClick={() => {setTravelOpt(idx)}}
                    >
                    <div className="check-ind sq">
                      <div className="check-ind-inner"></div>
                    </div>
                    <span>{opt.name}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="ctn-btn">
            <button className="btn btn-sec mr-2" onClick={previous}>Zurück</button>
            <button className="btn btn-acc" onClick={doNext}>Fortfahren</button>
          </div>
        </div>

      </div>
    </div>
  )
}

, Step3 = ({ indicators, formObjData, setFormObj, formTextData, setFormText, navigation, toggleMoreInfo }) => {
  const { startDate, returnDate } = formObjData
  , { passengers } = formTextData
  , { previous, next } = navigation
  , { isNext, isCurrent, isPrev } = indicators
  , isCurrentClass = isCurrent ? " current" : ""
  , isPrevClass = isPrev ? " prev" : ""
  , isNextClass = isNext ? " next" : ""
  , yesterday = DateTime.moment().subtract( 1, 'day' )  
  , validDate = current => current.isAfter(yesterday)
  , validReturnDate = current => current.isAfter(startDate)
  // , setDateValue = e => {
  //   // l(e, typeof e) 
  //   if(typeof e === "object") setDate(e.toDate())
  //   else setDate(e)
  // }
  , handleChange = (e, type) => {
    if(typeof e === "object") {
      switch(type){
        case 'start':
          setFormObj(prev => ({ ...prev, startDate: e.toDate() }))
        break;

        default: // end
          setFormObj(prev => ({ ...prev, returnDate: e.toDate() }))
        break;
      }
    }
  }
  , [isStartFlexible, setIsStartFlexible] = useState(formObjData.isStartFlexible)
  , [isReturnFlexible, setIsReturnFlexible] = useState(formObjData.isReturnFlexible)  
  , passArr = [ 
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "5+", value: 5 },
  ]
  , doNext = () => {
    l(formObjData, formTextData)
    next()
  }

  useEffect(() => {
    setFormObj(prev => ({ ...prev, isStartFlexible, isReturnFlexible }))
  }, [isStartFlexible, isReturnFlexible, setFormObj])

  return (
    <div className={`step step3${isCurrentClass}${isPrevClass}${isNextClass}`}>
      <div className="inner">

        <div className="container">
          <div className="ctn-heading">
            <h4>Zeitpunkt<img onClick={toggleMoreInfo} src="assets/info.png" alt=""/></h4>
            <div className="subtitle">Schritt 3 von 5</div>
          </div>

          <div className="ctn-content">
            <div className="form">
              
              <div className="form-group">
                <h5>Wann wollen sie wehfahren?</h5>
                <DateTime 
                  closeOnSelect 
                  locale="de" 
                  isValidDate={validDate} 
                  value={startDate}
                  timeFormat={false}
                  onChange={e => handleChange(e, 'start')}
                  inputProps={{
                    className: "input form-control",
                    placeholder: "Departure",
                  }}
                />
                <div 
                  className={`ctn-check${isStartFlexible? " selected" : ""}`}
                  onClick={() => setIsStartFlexible(!isStartFlexible)} 
                  >
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                  <span>Ich bin zeitlich flexibel</span>
                </div>
              </div>

              <div className="form-group">
                <h5>Wann wollen Sie zurück reisen?</h5>
                <DateTime 
                  closeOnSelect 
                  locale="de" 
                  isValidDate={validReturnDate} 
                  value={returnDate}
                  timeFormat={false}
                  onChange={e => handleChange(e, 'end')}
                  inputProps={{
                    className: "input form-control",
                    placeholder: "Return",
                  }}
                />
                <div 
                  className={`ctn-check${isReturnFlexible? " selected" : ""}`}
                  onClick={() => setIsReturnFlexible(!isReturnFlexible)} 
                  >
                  <div className="check-ind">
                    <div className="check-ind-inner"></div>
                  </div>
                  <span>Da bin ich zeitlich flexibel</span>
                </div>
              </div>

              <div className="form-group">
                <h5>Wann wollen Sie zurück reisen?</h5>
                <select 
                  className="select form-control"
                  name="passengers" 
                  value={passengers} 
                  onChange={setFormText}>
                    <option value="0">Anzahl der Reisenden</option>
                    {passArr.map((obj, idx) => (
                      <option key={idx} value={obj.value}>{obj.label}</option>
                    ))}
                </select>
              </div>

            </div>
            
          </div>

          <div className="ctn-btn">
            <button className="btn btn-sec mr-2" onClick={previous}>Zurück</button>
            <button className="btn btn-acc" disabled={passengers === "0"} onClick={doNext}>Fortfahren</button>
          </div>
        </div>
      </div>
    </div>
  )
}

, Step4 = ({ indicators, formObjData, formTextData, setFormText, navigation, toggleMoreInfo, vonStadt, nachStadt, isGift }) => {  
  const { fname, lname, email, phone } = formTextData
  , { previous, next } = navigation
  , { isNext, isCurrent, isPrev } = indicators
  , isCurrentClass = isCurrent ? " current" : ""
  , isPrevClass = isPrev ? " prev" : ""
  , isNextClass = isNext ? " next" : ""
  , isEmailValid = emailStr => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(emailStr).toLowerCase())
  }
  , isFormValid = () => (
    fname.length > 0 && 
    lname.length > 0 && 
    phone.length > 0 && 
    isEmailValid(email)
  )
  , [submitted, setSubmitted] = useState(false)  
  , submitForm = e => {
    setSubmitted(true)
    // setTimeout(() => { next() }, 1000)
    
    new HttpService()    
    .post('/process.php', createFormData(
      "addTrip", formObjData, formTextData,
      vonStadt, nachStadt, isGift
    ))
    .then(res => {
      const { data } = res
      l(data)
      if(data.result) next(e)
      else alert(data.message)      
    })
  }

  return (
    <div className={`step step4${isCurrentClass}${isPrevClass}${isNextClass}`}>
      <div className="inner">

        <div className="container">
          <div className="ctn-heading">
            <img className="globe" src="assets/globe.png" alt=""/><br/><br/>
            <h4>Flugangebot erhalten<img onClick={toggleMoreInfo} src="assets/info.png" alt=""/></h4>
            <div className="subtitle">
              Nachdem Sie ihre Kontaktdaten eingetragen haben, werden wir uns mit einem personalisierten Angebot melden.
            </div>
          </div>
          <pre>{isFormValid()}</pre>
          <div className="ctn-content row">
            <div className="col-md-3"></div>
            <div className="form col-md-6">            
              <div className="row">
                <div className="col-6 pr-0">
                  <div className="input-group">
                    <input
                      placeholder="Vorname"
                      className="input form-control"
                      name="fname"
                      type="text"
                      value={fname} 
                      onChange={setFormText}/>
                  </div>
                </div>
                <div className="col-6">                  
                  <div className="input-group">
                    <input
                      placeholder="Nachname"
                      className="input form-control"
                      name="lname"
                      type="text"
                      value={lname} 
                      onChange={setFormText}/>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <input
                  placeholder="Tragen Sie Ihre Telfonnummer ein"
                  className="form-control"
                  name="phone"
                  type="text"
                  value={phone} 
                  onChange={setFormText}/>
              </div>

              <div className="input-group">
                <input
                  placeholder="Tragen hier Ihre E-Mail ein "
                  className="form-control"
                  name="email"
                  type="email"
                  value={email} 
                  onChange={setFormText}/>
              </div>
              
              <div className="ctn-btn">
                <button 
                  className="btn btn-sec mr-2" 
                  onClick={previous}
                  disabled={submitted}
                >Zurück</button>
                <button 
                  className="btn btn-acc" 
                  disabled={!isFormValid() || submitted} 
                  onClick={submitForm}
                >
                  { !submitted && <>Bestätigen</> }
                  { submitted && <Dots /> }
                </button>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

, Step5 = ({ indicators, navigation, toggle, formObjData, formTextData, toggleMoreInfo, vonStadt, nachStadt, isGift }) => {  
  const { isNext, isCurrent, isPrev } = indicators
  , isCurrentClass = isCurrent ? " current" : ""
  , isPrevClass = isPrev ? " prev" : ""
  , isNextClass = isNext ? " next" : ""
  , closeQuestionnaire = () => {
    toggle()
    navigation.next()

    new HttpService()    
    .post('/process.php', createFormData(
      "sendMailToUser", formObjData, formTextData,
      vonStadt, nachStadt, isGift
    ))
    .then(res => {
      const { data } = res
      l(data)
    })
  }

  return (
    <div className={`step step5${isCurrentClass}${isPrevClass}${isNextClass}`}>
      <div className="inner">

        <div className="container">
          <div className="ctn-heading">
            <h4>Fertig<img onClick={toggleMoreInfo} src="assets/info.png" alt=""/></h4>
            <img className="final" src="assets/final.gif" alt=""/>
            <h4>Gratulation!</h4>
            <div className="subtitle">
              Unser System analysiert nun Ihre Anfrage.<br/>
              Sie erhalten innerhalb von 48 Stunden Vorschläge 
              über geeignete on-demand Experten.
            </div>
          </div>
        
          <div className="ctn-btn text-center">
            <button className="btn btn-acc" onClick={closeQuestionnaire}>Zur Startseite</button>
          </div>  
        </div>
        
      </div>
    </div>
  )
}

export { Step1, Step2, Step3, Step4, Step5 }
