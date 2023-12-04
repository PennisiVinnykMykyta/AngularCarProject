import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";
import {UserService} from "../services/user.service";

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
   imageType!: string;
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

     uploadImageData.append('imageFile',this.selectedFile, this.selectedFile.name);

     this.userService.uploadProfilePic(uploadImageData,this.id).subscribe(() => this.getImage());
   }

   public getImage(){

     this.userService.downloadProfilePic(this.id).subscribe(image => {
       this.retrievedImage = image.image;
       this.imageType = image.imageType;
       if(this.retrievedImage !== null){
         this.retrievedImage = 'data:image/'+this.imageType+';base64,' + this.retrievedImage;
         //DEVO FARE RESIZE ED IMPLEMENTARE DELETE BUTTON!!!
         this.resizeImage(this.retrievedImage).then(resolve => this.retrievedImage = resolve);
       }

     });

   }

  resizeImage(imageURL: any): Promise<any> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        if (ctx != null) {
          ctx.drawImage(image, 0, 0, 150, 150);
        }
        const data = canvas.toDataURL('image/jpeg', 1);
        resolve(data);
      };
      image.src = imageURL;
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
