import type { Request, Response, Router } from 'express'
import express from 'express'

const router: Router = express.Router()

/**
 * GET /
 * @summary Home
 * @tags Home
 * @return {object} 200 - OK
 */
router.get('/', function (request: Request, response: Response) {
  response.render('index', { title: 'Bruce World API' })
})

export default router
