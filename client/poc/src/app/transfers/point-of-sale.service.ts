import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointOfSaleResult } from './point-of-sale-result';

@Injectable()
export class PointOfSaleService {

  private baseUrl = 'https://localhost:5001/api/pointofsale';

  constructor(private httpClient: HttpClient) {

  }

  get(first: number, rows: number, name?: string): Observable<PointOfSaleResult> {
    let url = `${this.baseUrl}?first=${first}&rows=${rows}`;
    if (name) {
      url += `&name=${name}`;
    }
    return this.httpClient.get<PointOfSaleResult>(url);
  }
}
