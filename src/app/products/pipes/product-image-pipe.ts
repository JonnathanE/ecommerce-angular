import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment.development';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    const noImage = './assets/images/no-image.jpg';

    if (!value) {
      return noImage;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);
    if (!image) {
      return noImage;
    }

    return `${baseUrl}/files/product/${image}`;
  }
}
