import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel, RouterLink],
  templateUrl: './product-page.html',
})
export class ProductPage {
  activateRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug = this.activateRoute.snapshot.params['idSlug'] ?? '';

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productsService.getProductBySlug(params.idSlug);
    },
  });
}
