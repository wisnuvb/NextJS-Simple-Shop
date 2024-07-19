import type { NextApiRequest, NextApiResponse } from "next";
import { currencies } from "../../common/data";
import { ApiCurrenciesResponse } from "../../common/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCurrenciesResponse>
) {
  res.status(200).json(currencies);
}
