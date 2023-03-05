import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})

export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user?: User | null;
  public fileOver: boolean = false;

  constructor(private accountService: AccountService, private memberService: MembersService, private http: HttpClient) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  public fileOverBase(e: any): void {
    this.fileOver = e;
  }

  public fileDropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.uploadFile(file);
        });
      }
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('File', file, file.name);

    const headers = {
      'Authorization': 'Bearer ' + this.user!.token
    };

    this.http.post(this.baseUrl + 'users/add-photo', formData, { headers }).subscribe((response: any) => {
      const photo = response;
      this.member.photos.push(photo);
      if (photo.isMain) {
        this.user!.photoUrl = photo.url;
        this.member.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user!);
      }
    });
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      if (photo.url) {
        this.user!.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user!);
        this.member.photoUrl = photo.url;
        this.member.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        })
      }
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }

}
