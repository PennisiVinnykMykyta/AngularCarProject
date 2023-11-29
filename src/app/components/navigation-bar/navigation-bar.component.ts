import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {NavigationBarConfig} from "./navigation-bar.config";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent{

  @ViewChild('avatarImg', { static: true }) avatarImgElement!: ElementRef;

   @Input() userBarConfig!: NavigationBarConfig;
   @Input() profilePic!: string;
   @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() profilePicUpdated?: EventEmitter<string> = new EventEmitter<string>();

   addingOverlay: boolean = false;

  constructor(private router: Router,private userService: UserService) {
  }

  clickAction(str: string ){
    if(str === '/'){
      this.logOut.emit(true);
    }
    void this.router.navigate([str]);

  }

  openFile(fileInput: any){
    fileInput.click();
  }

  addProfilePic($event: any){
    const fileReader = new FileReader();
    fileReader.onload = () => {this.avatarImgElement.nativeElement.src = fileReader.result; };
   /*
    this.userService.uploadProfilePic().subscribe(() =>
      this.userService.downloadProfilePic(userId).subscribe(picture => {
        this.profilePic = picture;
        this.profilePicUpdated!.emit(this.profilePic);
      })
    );
*/
    // save the image in the back end database
    // and get the photo url

    this.profilePic = 'C:/Users/Nikit/Desktop/ProfilePics/chess.png';
    this.profilePicUpdated!.emit(this.profilePic);

    if($event.target.files){

    }
  }

  deletePic(){
    this.avatarImgElement.nativeElement.src = '';
    this.profilePic = 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg' ;
    this.profilePicUpdated!.emit(this.profilePic);
  }

}
