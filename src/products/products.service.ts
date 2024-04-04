import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { apiUrl } from 'src/constant/constant';
import { Root } from 'src/types';

@Injectable()
export class ProductsService {

    constructor(private httpService: HttpService) { }

    getAllProducts(): Observable<Root> {
        
          return this.httpService.get(apiUrl).pipe(
          map((response: AxiosResponse<Root>) => response.data),
          catchError(error => {
            throw new Error(error.response ? error.response.statusText : 'An error occurred while fetching products');
          })
        );
    }

 
}
