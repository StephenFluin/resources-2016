import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';




@Pipe({name: 'reFirebase'})
export class ValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
        // create instance vars to store keys and final output
        let keyArr = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach(key => {
            let arrayItem = value[key];
            //arrayItem.$key = key;
            if(key != "$key") {
              arrayItem.$key = key;
              dataArr.push(arrayItem);
            }
        });
        return dataArr;
    }
}

@Component({
  moduleId: module.id,
  selector: 'resources-app',
  templateUrl: 'resources.component.html',
  styleUrls: ['resources.component.css'],
  directives: [ MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_INPUT_DIRECTIVES ],
  pipes: [ValuesPipe]
})
export class ResourcesAppComponent implements OnInit {
  data : Observable<any[]>;
  categories: Observable<any[]>;
  subCategories: Observable<any[]>;

  selectedCategory : string;
  selectedSubcategory : string;
  
  submission : Submission;
  
  constructor(private af: AngularFire) {
    this.data = af.database.list('/').share();
    this.categories = this.data.map((items) =>
    {
      return items.map( (item ) => {
        return item.$key;
      })
    });
   
   
    this.selectedCategory = "Community";
    this.selectedSubcategory = "Groups";

    this.submission = new Submission();
    this.selectCategory(this.selectedCategory);
  }
  
  ngOnInit() {
    
  }
  
  selectCategory(param) {
    console.log("Selecting " , param);
    this.selectedCategory = param;
    this.subCategories = this.af.database.list('/' + param)
    .map(items =>
      items.map( sub => sub.$key)
    );
  }
  
  submit() {
    if(!this.submission.validate() || !this.selectedCategory || !this.selectedSubcategory) {
      alert("Please complete the form before submitting.");
    } else {
      console.log("writing to ",this.selectedCategory, this.selectedSubcategory);
      this.af.database.list('/' + this.selectedCategory + "/" + this.selectedSubcategory + "/resources/")
      .push(this.submission);
      this.submission = new Submission();
    }
      
  }
  
}


class Submission {
  name : string;
  email : string;
  companyName : string;
  title : string;
  url : string;
  notes : string;
  rev: boolean;
  
  constructor() {
    this.name = "Stephen Fluin";
    this.email = "stephenfluin@google.com";
    this.companyName = "Google";
    this.title = "Angularistas";
    this.url = "https://angular.io";
    this.notes = "These are notes";
    this.rev = false;
  }
  
  validate() : boolean {
    return !(
      !this.name ||
      !this.email ||
      !this.title ||
      !this.url);
  }
}

