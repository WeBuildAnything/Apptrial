/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { SubscriptionService } from "../subscription.service";
import { SubscriptionCreateInput } from "./SubscriptionCreateInput";
import { Subscription } from "./Subscription";
import { SubscriptionFindManyArgs } from "./SubscriptionFindManyArgs";
import { SubscriptionWhereUniqueInput } from "./SubscriptionWhereUniqueInput";
import { SubscriptionUpdateInput } from "./SubscriptionUpdateInput";
import { PaymentFindManyArgs } from "../../payment/base/PaymentFindManyArgs";
import { Payment } from "../../payment/base/Payment";
import { PaymentWhereUniqueInput } from "../../payment/base/PaymentWhereUniqueInput";

export class SubscriptionControllerBase {
  constructor(protected readonly service: SubscriptionService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Subscription })
  async createSubscription(
    @common.Body() data: SubscriptionCreateInput
  ): Promise<Subscription> {
    return await this.service.createSubscription({
      data: {
        ...data,

        bicycle: data.bicycle
          ? {
              connect: data.bicycle,
            }
          : undefined,
      },
      select: {
        bicycle: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        customer: true,
        endDate: true,
        id: true,
        startDate: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Subscription] })
  @ApiNestedQuery(SubscriptionFindManyArgs)
  async subscriptions(@common.Req() request: Request): Promise<Subscription[]> {
    const args = plainToClass(SubscriptionFindManyArgs, request.query);
    return this.service.subscriptions({
      ...args,
      select: {
        bicycle: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        customer: true,
        endDate: true,
        id: true,
        startDate: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async subscription(
    @common.Param() params: SubscriptionWhereUniqueInput
  ): Promise<Subscription | null> {
    const result = await this.service.subscription({
      where: params,
      select: {
        bicycle: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        customer: true,
        endDate: true,
        id: true,
        startDate: true,
        status: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateSubscription(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @common.Body() data: SubscriptionUpdateInput
  ): Promise<Subscription | null> {
    try {
      return await this.service.updateSubscription({
        where: params,
        data: {
          ...data,

          bicycle: data.bicycle
            ? {
                connect: data.bicycle,
              }
            : undefined,
        },
        select: {
          bicycle: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          customer: true,
          endDate: true,
          id: true,
          startDate: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Subscription })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteSubscription(
    @common.Param() params: SubscriptionWhereUniqueInput
  ): Promise<Subscription | null> {
    try {
      return await this.service.deleteSubscription({
        where: params,
        select: {
          bicycle: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          customer: true,
          endDate: true,
          id: true,
          startDate: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Get("/:id/payments")
  @ApiNestedQuery(PaymentFindManyArgs)
  async findPayments(
    @common.Req() request: Request,
    @common.Param() params: SubscriptionWhereUniqueInput
  ): Promise<Payment[]> {
    const query = plainToClass(PaymentFindManyArgs, request.query);
    const results = await this.service.findPayments(params.id, {
      ...query,
      select: {
        amount: true,
        createdAt: true,
        id: true,
        method: true,
        paymentDate: true,
        status: true,

        subscription: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/payments")
  async connectPayments(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @common.Body() body: PaymentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      payments: {
        connect: body,
      },
    };
    await this.service.updateSubscription({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/payments")
  async updatePayments(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @common.Body() body: PaymentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      payments: {
        set: body,
      },
    };
    await this.service.updateSubscription({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/payments")
  async disconnectPayments(
    @common.Param() params: SubscriptionWhereUniqueInput,
    @common.Body() body: PaymentWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      payments: {
        disconnect: body,
      },
    };
    await this.service.updateSubscription({
      where: params,
      data,
      select: { id: true },
    });
  }
}
