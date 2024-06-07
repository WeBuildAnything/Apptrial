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
import { SubscriptionPlanService } from "../subscriptionPlan.service";
import { SubscriptionPlanCreateInput } from "./SubscriptionPlanCreateInput";
import { SubscriptionPlan } from "./SubscriptionPlan";
import { SubscriptionPlanFindManyArgs } from "./SubscriptionPlanFindManyArgs";
import { SubscriptionPlanWhereUniqueInput } from "./SubscriptionPlanWhereUniqueInput";
import { SubscriptionPlanUpdateInput } from "./SubscriptionPlanUpdateInput";

export class SubscriptionPlanControllerBase {
  constructor(protected readonly service: SubscriptionPlanService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: SubscriptionPlan })
  async createSubscriptionPlan(
    @common.Body() data: SubscriptionPlanCreateInput
  ): Promise<SubscriptionPlan> {
    return await this.service.createSubscriptionPlan({
      data: data,
      select: {
        createdAt: true,
        description: true,
        durationMonths: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [SubscriptionPlan] })
  @ApiNestedQuery(SubscriptionPlanFindManyArgs)
  async subscriptionPlans(
    @common.Req() request: Request
  ): Promise<SubscriptionPlan[]> {
    const args = plainToClass(SubscriptionPlanFindManyArgs, request.query);
    return this.service.subscriptionPlans({
      ...args,
      select: {
        createdAt: true,
        description: true,
        durationMonths: true,
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: SubscriptionPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async subscriptionPlan(
    @common.Param() params: SubscriptionPlanWhereUniqueInput
  ): Promise<SubscriptionPlan | null> {
    const result = await this.service.subscriptionPlan({
      where: params,
      select: {
        createdAt: true,
        description: true,
        durationMonths: true,
        id: true,
        name: true,
        price: true,
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
  @swagger.ApiOkResponse({ type: SubscriptionPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateSubscriptionPlan(
    @common.Param() params: SubscriptionPlanWhereUniqueInput,
    @common.Body() data: SubscriptionPlanUpdateInput
  ): Promise<SubscriptionPlan | null> {
    try {
      return await this.service.updateSubscriptionPlan({
        where: params,
        data: data,
        select: {
          createdAt: true,
          description: true,
          durationMonths: true,
          id: true,
          name: true,
          price: true,
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
  @swagger.ApiOkResponse({ type: SubscriptionPlan })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteSubscriptionPlan(
    @common.Param() params: SubscriptionPlanWhereUniqueInput
  ): Promise<SubscriptionPlan | null> {
    try {
      return await this.service.deleteSubscriptionPlan({
        where: params,
        select: {
          createdAt: true,
          description: true,
          durationMonths: true,
          id: true,
          name: true,
          price: true,
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
}