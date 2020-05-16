import { Injectable } from '@angular/core';
import * as data from '../assets/data/file.json';

@Injectable({
  providedIn: 'root'
})
export class AppService {



  constructor() { }

  
  
generateQuestioning(): [] | {}{
    let questioning: any[] = [];
    const responseMessage = data.result.envelope.body.voOut.msgRets.msg;
    
    if(!responseMessage || responseMessage.codeMsg != "00000"){
    return {code : responseMessage.codeMsg, message :responseMessage.libMsg};
    }
    
    const questions: any = data.result.envelope.body.voOut.objOut.listSection.section.listQuestion.question;
    if(!!questions){
    questions.forEach((question) => {
    let responses: any[] = [];
    const listChoix: any = question.listChoixReponse.choixReponse;
    if(listChoix){
    listChoix.forEach((response) => {
    responses.push({idResponse : response.idReponse, libResponse:response.libReponse});
    });
    }
    questioning.push(
    {
    idQuestion : question.idQuestion, 
    typeQuestion: question.typeQuestion.codeTypeQuestion,
    topActive : question.topActive,
    libQuestion: question.libQuestion,
    isRequired: question.isRequired,
    listChoixReponse: responses
    }
    );
    }); 
    }
return questioning;
}

}
