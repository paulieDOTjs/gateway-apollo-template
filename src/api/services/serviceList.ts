import { parseServices } from "./parseServices";

import service from "./endpoints/service.json";

export const serviceList = parseServices(service);
