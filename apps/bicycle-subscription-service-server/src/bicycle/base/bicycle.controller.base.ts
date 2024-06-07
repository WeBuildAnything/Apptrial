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
import { BicycleService } from "../bicycle.service";
import { BicycleCreateInput } from "./BicycleCreateInput";
import { Bicycle } from "./Bicycle";
import { BicycleFindManyArgs } from "./BicycleFindManyArgs";
import { BicycleWhereUniqueInput } from "./BicycleWhereUniqueInput";
import { BicycleUpdateInput } from "./BicycleUpdateInput";
import { SubscriptionFindManyArgs } from "../../subscription/base/SubscriptionFindManyArgs";
import { Subscription } from "../../subscription/base/Subscription";
import { SubscriptionWhereUniqueInput } from "../../subscription/base/SubscriptionWhereUniqueInput";

export class BicycleControllerBase {
  constructor(protected readonly service: BicycleService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Bicycle })
  async createBicycle(
    @common.Body() data: BicycleCreateInput
  ): Promise<Bicycle> {
    return await this.service.createBicycle({
      data: {
        ...data,

        location: data.location
          ? {
              connect: data.location,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        location: {
          select: {
            id: true,
          },
        },

        model: true,
        serialNumber: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Bicycle] })
  @ApiNestedQuery(BicycleFindManyArgs)
  async bicycles(@common.Req() request: Request): Promise<Bicycle[]> {
    const args = plainToClass(BicycleFindManyArgs, request.query);
    return this.service.bicycles({
      ...args,
      select: {
        createdAt: true,
        id: true,

        location: {
          select: {
            id: true,
          },
        },

        model: true,
        serialNumber: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Bicycle })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async bicycle(
    @common.Param() params: BicycleWhereUniqueInput
  ): Promise<Bicycle | null> {
    const result = await this.service.bicycle({
      where: params,
      select: {
        createdAt: true,
        id: true,

        location: {
          select: {
            id: true,
          },
        },

        model: true,
        serialNumber: true,
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
  @swagger.ApiOkResponse({ type: Bicycle })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateBicycle(
    @common.Param() params: BicycleWhereUniqueInput,
    @common.Body() data: BicycleUpdateInput
  ): Promise<Bicycle | null> {
    try {
      return await this.service.updateBicycle({
        where: params,
        data: {
          ...data,

          location: data.location
            ? {
                connect: data.location,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,

          location: {
            select: {
              id: true,
            },
          },

          model: true,
          serialNumber: true,
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
  @swagger.ApiOkResponse({ type: Bicycle })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteBicycle(
    @common.Param() params: BicycleWhereUniqueInput
  ): Promise<Bicycle | null> {
    try {
      return await this.service.deleteBicycle({
        where: params,
        select: {
          createdAt: true,
          id: true,

          location: {
            select: {
              id: true,
            },
          },

          model: true,
          serialNumber: true,
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

  @common.Get("/:id/subscriptions")
  @ApiNestedQuery(SubscriptionFindManyArgs)
  async findSubscriptions(
    @common.Req() request: Request,
    @common.Param() params: BicycleWhereUniqueInput
  ): Promise<Subscription[]> {
    const query = plainToClass(SubscriptionFindManyArgs, request.query);
    const results = await this.service.findSubscriptions(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/subscriptions")
  async connectSubscriptions(
    @common.Param() params: BicycleWhereUniqueInput,
    @common.Body() body: SubscriptionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        connect: body,
      },
    };
    await this.service.updateBicycle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/subscriptions")
  async updateSubscriptions(
    @common.Param() params: BicycleWhereUniqueInput,
    @common.Body() body: SubscriptionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        set: body,
      },
    };
    await this.service.updateBicycle({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/subscriptions")
  async disconnectSubscriptions(
    @common.Param() params: BicycleWhereUniqueInput,
    @common.Body() body: SubscriptionWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      subscriptions: {
        disconnect: body,
      },
    };
    await this.service.updateBicycle({
      where: params,
      data,
      select: { id: true },
    });
  }
}
