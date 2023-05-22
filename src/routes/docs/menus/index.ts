import { dbPool, prisma } from '@dbContext'
import { type menus } from '@prisma/client'
import type { Request, Response, Router } from 'express'
import express from 'express'

const router: Router = express.Router()

/**
 * GET /docs/menus/v2
 * @summary Docs
 * @tags Docs
 * @return {object} 200 - success response - application/json
 */
router.get('/v2', async (request: Request, response: Response) => {
  try {
    const { rows } = await dbPool.query('SELECT * FROM docs.menus ORDER BY index')
    response.status(200).json(rows)
  } catch (err) {
    response.status(404).json('Server Error')
  }
})

/**
 * GET /docs/menus
 * @summary Docs
 * @tags Docs
 * @return {object} 200 - success response - application/json
 */
router.get('/', async (request: Request, response: Response) => {
  const menus: Array<menus> = await prisma.menus.findMany()
  response.status(200).json(menus)
})

export default router
