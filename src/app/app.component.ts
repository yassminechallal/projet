import { Component} from '@angular/core';
import { AppService} from './app.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

constructor(private appService: AppService) {}


ngOnInit() {
  this.initForm();
}

initForm() : void {
  const data: any = this.appService.generateQuestioning();
  if(!data.code){
    data.forEach((element,index) => {
      const options: any[]= [];
      element.listChoixReponse.forEach(item => {
        options.push({label: item.libResponse, value: {idQuestion:element.idQuestion,idResponse: item.idResponse}});
      });
   this.fields.push(
    {
      key: 'selectedResponse' + index,
      type: 'radio',
      templateOptions: {
        label: element.libQuestion,
        required: element.isRequired === 'O',
        options: options
      }
    });
});
}
}

submit(data) {
  console.log(data);
}

}

