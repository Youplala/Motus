import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

constructor(
  private readonly _http: HttpClient
) { }

  public get(container: string, route: string, body?: any, token?: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders()
    return this._http.get('http://'+container+'/'+route, body)
  }

}
