import { Controller, Get, Param } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('/:servicePlanId')
  checkoutForServiceBooking(@Param('servicePlanId') servicePlanId: string) {
    try {
      return this.stripeService.checkoutForServiceBooking(servicePlanId);
    } catch (err) {
      return err;
    }
  }

  @Get('/:TrainingPlanId')
  checkoutForTrainingBooking(@Param('TrainingPlanId') TrainingPlanId: string) {
    try {
      return this.stripeService.checkoutForTrainingBooking(TrainingPlanId);
    } catch (err) {
      return err;
    }
  }
}
