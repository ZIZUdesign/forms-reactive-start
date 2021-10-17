import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  
  
  ngOnInit(){
    // this is the form we create 
    // A FormGroup aggregates the values of each child FormControl into one object, 
    // with each control name as a key. when instantiating a FormGroup, pass in a collection
    // of child controls as the first argument. the key for each child registers the 
    // name for the control. 
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
         // we need to bind the 'this' key word. this is because we dont call this here but angular which does
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
     
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])

    });

    this.signupForm.setValue({
      'userData': {
        'username': 'Zeray',
        'email': 'zerfine@yahoo.com'
      },
      'gender': 'male',
      'hobbies': ['Football','Cooking']
    }); 
    this.signupForm.patchValue({
      'userData': {
        'username': 'Zeray',
        'email': 'zerfine@yahoo.com'
      },
      'gender': 'male',
      'hobbies': ['Football','Cooking']
    }); 
  }

  onSubmit(){
    console.log(this.signupForm)
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required); 
    (<FormArray>this.signupForm.get('hobbies')).push(control); 

  }

  // custom validator 
  forbiddenNames (control: FormControl ): {[s: string] : boolean }{
    if (this.forbiddenUsernames.indexOf(control.value) !== -1 ){
      return {'nameIsForbidden': true}; 
    }
    // NB: Don't pass {'nameIsForbidden' : false} looks right but this won't work
    return null; 
  }

  forbiddenEmails(controls: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject ) => {
          setTimeout( () => {
            if(controls.value === 'test@test.com'){
              resolve({'emailIsForbidden': true});
            }else {
              resolve(null);
            }
          }, 1500);
    });
    return promise; 
  }

 


}
