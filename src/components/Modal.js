import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm, useStep } from 'react-hooks-helper'
import moment from "moment"
import DateTime from 'react-datetime'

import { Step1, Step2, Step3, Step4, Step5 } from "./Steps"
import { l, cl } from '../helpers/Log'

const steps = [ Step1, Step2, Step3, Step4, Step5 ]
, stepData = { initialStep: 0, steps }
, useModal = () => {
  const [isShowing, setIsShowing] = useState(false)
  , [showMoreInfo, setShowMoreInfo] = useState(false)
  , toggle = () => { setIsShowing(!isShowing) }
  , toggleMoreInfo = () => { setShowMoreInfo(!showMoreInfo) }

  return { 
    isShowing, toggle, 
    showMoreInfo, toggleMoreInfo,
  }
}
, Modal = ({ 
  isShowing, toggle, 
  showMoreInfo, toggleMoreInfo,
  vonStadt, nachStadt
}) => {

  // Form data and Navigation
  const textData = {
    passengers: "0",
    fname: "",
    lname: "",
    phone: "",
    email: "",
  }
  , objData = {
    selOpts: "",
    isCare: false,
    selTravelOpts: "",
    startDate: new Date(),
    isStartFlexible: true,
    returnDate: DateTime.moment().add( 1, 'day' ).toDate(),
    isReturnFlexible: true,    
  }
  , [formTextData, setFormText] = useForm(textData)
  , [formObjData, setFormObj] = useState(objData)
  , { index, navigation } = useStep(stepData)
  , props = { 
    isShowing, toggle, 
    showMoreInfo, toggleMoreInfo,
    vonStadt, nachStadt, 
    formTextData, setFormText, 
    formObjData, setFormObj,
    navigation
  }
  , goBack = () => index === 0 ? toggle() : navigation.previous()

  return createPortal(
    <>
      <div className={`modal-outer${isShowing ? " show":""}`}>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal-inner">
            <div className="modal-header">
              <div className="logo">
                <span className="acc">Wegfahren</span>.com
              </div>
              <button 
                type="button" 
                className="close-button" 
                data-dismiss="modal" 
                aria-label="Close" 
                onClick={toggle}
                >
                <span className="acc" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body-custom">
              {
                steps.map((Component, idx) => (
                  <Component // Eg. Step1
                    key={idx}
                    indicators={{
                      isPrev: index === idx + 1 // 2
                      , isCurrent: index === idx  // 1
                      , isNext: index === idx - 1 // 0
                    }}
                    {...props}
                  />
                ))
              } 
            </div>
            <div className="modal-footer-custom">
              <div className="progress">
                <div className="bar" style={{ width: `${20*(index + 1)}%` }}></div>
              </div>
              <div className="content">
                <div className="btn-back" onClick={goBack}>
                  <img src="assets/arr-left-tr.png" alt=""/>
                  <span>Zurück</span>
                </div>
                <div className="footer-text">
                  <img src="assets/alarm.jpg" alt=""/>
                  <span className="acc">3 Minuten</span>&nbsp;um deinen Auftrag mehr als 10.000 Kunden zählt die Plattform bereits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal-outer sec${showMoreInfo ? " show":""}`}>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">          
          <div className="modal-inner">
            <div className="modal-header">
              <div className="logo">
                <span className="acc">Wegfahren</span>.com
              </div>
              <button 
                type="button" 
                className="close-button" 
                data-dismiss="modal" 
                aria-label="Close" 
                onClick={toggleMoreInfo}
                >
                <span className="acc" aria-hidden="true">&times;</span>
              </button>
            </div>
            <h4>Category more Info</h4>
            <p>
              Wenn im Steuerjahr 2019 ausländische Einkünfte erhalten wurden, 
              die nicht der deutschen Einkommensteuer unterliegen, 
              muss diese Frage mit "Ja" beantwortet werden. Andernfalls mit "Nein".<br/><br/>
              Beispiele für ausländische Einkünfte:<br/><br/>
              Lohneinkünfte für eine Tätigkeit im Ausland
            </p>
            <ul>
              <li>Einkünfte aus selbstständigen Tätigkeiten, die im Ausland ausgeübt werden</li>
              <li>Einkünfte aus Land- und Forstwirtschaft, deren bewirtschaftete Flächen im Ausland liegen</li>
              <li>Zinsen, Dividenden und Erträge für Einlagen bei ausländischen Finanzinstituten</li>
            </ul>
            <p>
              <span>VERSTEUERUNG</span><br/>
              Diese stehen unter dem so genannten Progressionsvorbehalt. Sie 
              werden nicht selbst versteuert, beeinflussen aber die Höhe 
              des persönlichen Steuersatzes, mit dem das Einkommen versteuert wird.
            </p>
          </div>
        </div>
      </div>
    </>, document.body
  ) 
}

export { Modal, useModal }
