import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const cacheKey = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(cacheKey)) {
      return of(this.productsCache.get(cacheKey)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: { limit, offset, gender },
      })
      .pipe(
        // tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(cacheKey, resp))
      );
  }

  getProductBySlug(slug: string): Observable<Product> {
    if (this.productCache.has(slug)) {
      return of(this.productCache.get(slug)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${slug}`)
      .pipe(tap((resp) => this.productCache.set(slug, resp)));
  }
}
