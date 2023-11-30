import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";
import {UserService} from "../services/user.service";
import {ImageInfoDto} from "../templates/dto-templates/image-info-dto";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnInit{



   @Input() userBarConfig!: NavigationBarConfig;
   @Input() profilePic!: string;
   @Input() id!: number
   @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();

 /*

deletePic(){
    this.profilePic = 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg' ;
  }
}

   */


  ngOnInit() {
    this.getImage();

  }

  addingOverlay: boolean = false;

   selectedFile!: File;
   retrievedImage: any;
   base64Data: any;
   imageName!: string;
   baseImageUrl: string = "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"

   public onFileChanged(event: any){
     this.selectedFile = event.target.files[0];
     this.onUpload();
   }

  openFile(fileInput: any){
    fileInput.click();
  }

   public onUpload(){
     const uploadImageData: FormData = new FormData();

     const fileString: string = this.id.toString()+"_"+this.selectedFile.name
     uploadImageData.append('imageFile',this.selectedFile, fileString);

     this.userService.uploadProfilePic(uploadImageData).subscribe(() => this.getImage());
   }

   public getImage(){

     this.userService.downloadProfilePic(this.id).subscribe(image => {
       console.log("downloaded")
       console.log(image);
       this.retrievedImage = image.image;
       if(this.retrievedImage !== null){
         this.retrievedImage = 'data:image/png;base64,' + this.retrievedImage; //DEVO FARE RESIZE!!!
       }

       console.log(this.retrievedImage);

     });
   }



  constructor(private router: Router,private userService: UserService) {
  }

  clickAction(str: string ){
    if(str === '/'){
      this.logOut.emit(true);
    }
    void this.router.navigate([str]);

  }

}
