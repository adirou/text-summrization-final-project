import React from 'react';
import { Button } from '@material-ui/core';
import {saveAs} from 'save-as';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const testsHeadersDefault = [
    { id: 'name', label: 'Test Id/Name'},
    { id: 'creation_date', label: 'Creation Date', type:'date' },
    { id: 'testPlanId', label: 'Test Plan Id'},
    { id: 'formId', label: 'Form Name' },
];
  
export const createHeadersFromForm = (form, experimentName, openQuestionModal, isAnsTrue) => {
  let headers = [...testsHeadersDefault];
  if(form.isFillAnswers){
    headers = [
      ...headers,
      ...form.questionIds.map((id,ind) => ({ 
        id: 'answers',
        labelFormat: (qId) => <span style={{cursor:'pointer'}} onClick={() => openQuestionModal(qId)}>Q{ind}</span>,
        index: ind,
        type:'array',
        format: (answer,qid) => 
        (
          <span style={{display:'flex', alignItems:'flex-end'}}>
            {answer.ans}
            {
              isAnsTrue(qid,answer) ?
                <CheckCircleOutlineIcon style={{ margin:'0 3px',color:'#b1c36d'}}/> :
                <HighlightOffIcon style={{margin:'0 3px', color:'red'}}/> 
            }
            {answer.time/1000}sec
           </span>
          )
      })), 
      { id: 'score', label: 'Score' },
    ];
  }
  
  if(form.withFixations){
    headers.push({ id: 'name', label: 'fixations-summary', type: 'custom', format: (name) => <Button onClick={() => window.open(`/article/${experimentName}/eyes/${name}`,'_blank')}>view</Button> })
  }

  if(form.isRankSentences){
    headers.push({ id: 'sentanceWeights', label: 'rank-sentences', type: 'custom', format: (sentanceWeights) => <Button onClick={() => saveAs(new Blob([JSON.stringify(sentanceWeights)]), 'weights.json')}> download </Button> });
  }
  
  return headers;
}