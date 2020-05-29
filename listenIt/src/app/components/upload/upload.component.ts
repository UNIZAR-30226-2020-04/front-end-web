import { Component, OnInit} from '@angular/core';
import { FileService } from '../../services/file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	selectedFiles: FileList;
	currentFile: File;
	public msg;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  selectFile(event) {
  	this.selectedFiles = event.target.files;
  }

  /*upload() {
  	this.currentFile = this.selectedFiles.item(0);
  	this.fileService.uploadFile(this.currentFile,this.currentFile,this.currentFile,this.currentFile).subscribe(response => {

  		if (response instanceof HttpResponse) {
  			this.msg = response.body;
  			console.log(response.body);
  		}
  	});
  }*/

}