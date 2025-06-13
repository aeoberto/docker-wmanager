import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HTTPClientService {
  private url = 'http://localhost:3000'
  private delete_url = 'http://localhost:3000/delete/'
  private create_url = 'http://localhost:3000/create/'
  private stat_urs = 'http://localhost:3000/startostop/'
  constructor(private http:HttpClient) { }

  getID(){
    
    return this.http.get(this.url)
  }

  create_container(name:any){
    console.log('hello')
    let curl = this.create_url
    curl = curl + name
    curl = curl + '/wordpress'
    
    const body = { title: ' PUT Request ' };
  return this.http.put(curl, body, { responseType: 'text' });
  }

  delete_container(pos:any){
    let durl = this.delete_url
    durl = durl + pos
    return this.http.delete(durl, { responseType: 'text' })
  }

  status(pos:any){
    
    const body = { title: ' PUT Request ' };
    let surl = this.stat_urs
    surl = surl + pos
    return this.http.put<any>(surl,body)

  }
}
