import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData,
} from "next";
import { unstable_getServerSession as serverSession } from "next-auth";
import { ParsedUrlQuery } from "querystring";
import { authOptions as nextAuthOptions } from "./../pages/api/auth/[...nextauth]";

export function getServerSession(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  return serverSession(ctx.req, ctx.res, nextAuthOptions);
}
