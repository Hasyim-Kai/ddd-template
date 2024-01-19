// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/forms`
  | `/forms/login`
  | `/forms/panel/assy`
  | `/forms/panel/g2`
  | `/forms/panel/g2/components/BasicInfoFactory`
  | `/forms/panel/g2/components/DropRingFactory`
  | `/forms/panel/g2/components/G2LotOut`
  | `/forms/panel/g2/components/G2ScrapLine`
  | `/forms/panel/g2/components/ScradKdRingFactory`
  | `/forms/panel/g2/components/Scrap100`
  | `/forms/panel/g2/components/ScrapHgFactory`
  | `/forms/panel/g2/components/ScrapLaFactory`
  | `/forms/panel/g2/components/ScrapReGrinding`
  | `/forms/panel/g2/components/TestPieceFactory`
  | `/forms/panel/g2/components/UnMatching`
  | `/forms/panel/g2/components/WetBarrel`
  | `/forms/panel/hg`
  | `/forms/panel/la`
  | `/forms/panel/la/log`
  | `/forms/panel/noise`
  | `/forms/panel/packing`
  | `/forms/panel/qn`
  | `/login`
  | `/web-admin/dashboard/cost-total-monthly`
  | `/web-admin/dashboard/noise/cost-noise-ratio`
  | `/web-admin/dashboard/noise/ratio-composition`
  | `/web-admin/dashboard/section/abn`
  | `/web-admin/dashboard/section/assy`
  | `/web-admin/dashboard/section/f1`
  | `/web-admin/dashboard/section/f2`
  | `/web-admin/dashboard/section/f3`
  | `/web-admin/dashboard/section/g2`
  | `/web-admin/dashboard/section/hg`
  | `/web-admin/dashboard/section/la`
  | `/web-admin/dashboard/section/noise`
  | `/web-admin/dashboard/section/total`
  | `/web-admin/dashboard/total`
  | `/web-admin/master-data/cost/external`
  | `/web-admin/master-data/cost/external/edit/:id`
  | `/web-admin/master-data/cost/external/log-cost`
  | `/web-admin/master-data/cost/internal`
  | `/web-admin/master-data/cost/internal/edit/:id`
  | `/web-admin/master-data/cost/internal/log-cost`
  | `/web-admin/master-data/factory`
  | `/web-admin/master-data/packing`
  | `/web-admin/master-data/target/cost-ratio`
  | `/web-admin/master-data/target/cost-ratio/log-target`
  | `/web-admin/master-data/target/general`
  | `/web-admin/master-data/target/general/edit/:id`
  | `/web-admin/master-data/target/general/log-target`
  | `/web-admin/master-data/target/noise`
  | `/web-admin/master-data/target/noise/log-target`
  | `/web-admin/master-data/target/section`
  | `/web-admin/master-data/target/section/edit/:id`
  | `/web-admin/master-data/target/section/log-target`
  | `/web-admin/report/G2`
  | `/web-admin/report/G2/detail/:id`
  | `/web-admin/report/G2/log`
  | `/web-admin/report/HG`
  | `/web-admin/report/HG/detail/:id`
  | `/web-admin/report/HG/log`
  | `/web-admin/report/LA`
  | `/web-admin/report/LA/detail/:id`
  | `/web-admin/report/LA/log`
  | `/web-admin/report/QN`
  | `/web-admin/report/QN/detail/:id`
  | `/web-admin/report/QN/log`
  | `/web-admin/report/assy`
  | `/web-admin/report/assy/detail/:id`
  | `/web-admin/report/assy/log`
  | `/web-admin/report/noise`
  | `/web-admin/report/noise/detail/:id`
  | `/web-admin/report/noise/log`
  | `/web-admin/report/packing`
  | `/web-admin/report/packing/detail/:id`
  | `/web-admin/report/packing/log`
  | `/web-admin/role`
  | `/web-admin/role/create`
  | `/web-admin/role/edit/:id`
  | `/web-admin/role/mapping-menu/:id`
  | `/web-admin/user`
  | `/web-admin/user/create`
  | `/web-admin/user/detail/:id`
  | `/web-admin/user/edit/:id`
  | `/web-admin/user/profile/detail/:id`
  | `/web-admin/user/profile/edit/:id`

export type Params = {
  '/web-admin/master-data/cost/external/edit/:id': { id: string }
  '/web-admin/master-data/cost/internal/edit/:id': { id: string }
  '/web-admin/master-data/target/general/edit/:id': { id: string }
  '/web-admin/master-data/target/section/edit/:id': { id: string }
  '/web-admin/report/G2/detail/:id': { id: string }
  '/web-admin/report/HG/detail/:id': { id: string }
  '/web-admin/report/LA/detail/:id': { id: string }
  '/web-admin/report/QN/detail/:id': { id: string }
  '/web-admin/report/assy/detail/:id': { id: string }
  '/web-admin/report/noise/detail/:id': { id: string }
  '/web-admin/report/packing/detail/:id': { id: string }
  '/web-admin/role/edit/:id': { id: string }
  '/web-admin/role/mapping-menu/:id': { id: string }
  '/web-admin/user/detail/:id': { id: string }
  '/web-admin/user/edit/:id': { id: string }
  '/web-admin/user/profile/detail/:id': { id: string }
  '/web-admin/user/profile/edit/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
