import { Controller, Get, Param, Patch } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  // @Get('service/:servicePlanId')
  // checkoutForServiceBooking(@Param('servicePlanId') servicePlanId: string) {
  //   try {
  //     return this.stripeService.checkoutForServiceBooking(servicePlanId);
  //   } catch (err) {
  //     return err;
  //   }
  // }

  @Get('/:id')
  async checkoutForTrainingBooking(@Param('id') id: string) {
    try {
      return await this.stripeService.checkoutForBooking(id);
    } catch (err) {
      return err;
    }
  }

  @Patch('/:id/confirmation')
  async confirmationOfPayment (@Param('id') id:string){
    return await this.stripeService.confirmationOfPayment(id);
  }
}
