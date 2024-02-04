import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] }
  dataSource: Array<CartItem> = []

  constructor(private cartService: CartService, private orderService: OrderService, private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
   this.dataSource = this.cart.items;
   this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = this.cart.items;
   })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onBuy() {
    if(this.authService.isAuthenticatedUser()) {
      const orderData = {
        userId: this.authService.getUserId(),
        email: this.authService.getUserEmail(),
        total: this.getTotal(this.cart.items),
        items: this.cart.items
      }
      this.orderService.createOrder(orderData).subscribe({
          next: (data: any) => {
            this.cartService.clearCart();
            this.toastr.success("Compra Exitosa!", "Exito!")
            this.router.navigate(['/order'], { queryParams: { id: data.order.id } })
          },
            error: (error) => {
              this.toastr.error(error, "Error")
            }
        });
    } else {
      this.toastr.error("Por favor, inicie sesion para continuar la compra.", "Error")
    }
  }

}
