import { Injectable } from '@angular/core';
import { request } from 'http';
import { Observable } from 'rxjs';
import { SkillOwnerEntity } from 'src/app/api/flexcub-api/models';
import { FileReadingControllerService, SkillOwnerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class TalentsService {

  constructor(
    private readonly _fileService: FileReadingControllerService,
    private readonly _ownerService: SkillOwnerControllerService,) { }

  downloadTemplate() {
    return this._fileService.downloadTemplate();
  }

  saveTalent(j: SkillOwnerEntity): Observable<SkillOwnerEntity[]> {
    return this._ownerService.insertDetails3({ body: [j] });
  }

}
