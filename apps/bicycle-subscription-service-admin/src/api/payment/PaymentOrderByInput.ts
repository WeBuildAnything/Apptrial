import { SortOrder } from "../../util/SortOrder";

export type PaymentOrderByInput = {
  amount?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  method?: SortOrder;
  paymentDate?: SortOrder;
  status?: SortOrder;
  subscriptionId?: SortOrder;
  updatedAt?: SortOrder;
};
